import { createClient } from "@/lib/supabase/server";

type PageRow = { path: string; parent_path: string | null; title: string; page_type: string; custom_path: string | null };

/** Schema image/url fields must be absolute — resolve a relative "/foo.webp" against the site URL. */
function toAbsoluteUrl(url: string | null | undefined, siteUrl: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${siteUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Renders per-page JSON-LD:
 *  - BreadcrumbList, built from the page's position in the Pages tree
 *    (walked via parent_path — no manual entry needed)
 *  - A type-specific schema chosen from the page's page_type (Article for
 *    insights, JobPosting for careers, Service for service pages,
 *    CreativeWork for portfolio/case-study/social/video pages) — using only
 *    fields already collected elsewhere in the dashboard, never invented
 *  - Any custom schema blocks an admin added on this page's SEO tab
 *
 * Organization/WebSite schema is injected once, site-wide, in the root
 * layout — this only adds what's specific to one page.
 */
export async function PageSchema({ path }: { path: string }) {
  const supabase = await createClient();

  const [{ data: page }, { data: seo }, { data: settings }, { data: customSchemas }] = await Promise.all([
    supabase.from("pages").select("path, parent_path, title, page_type, custom_path").eq("path", path).maybeSingle<PageRow>(),
    supabase
      .from("seo_meta")
      .select("article_author, article_published_at, seo_title, meta_description, og_image")
      .eq("page_path", path)
      .maybeSingle(),
    supabase
      .from("site_settings")
      .select("site_url, org_name, org_logo_url, default_share_image, org_street, org_city, org_region, org_postal_code, org_country")
      .single(),
    supabase.from("page_schemas").select("id, schema_json").eq("page_path", path),
  ]);

  if (!page) return null;

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const effectivePath = page.custom_path || page.path;
  const title = seo?.seo_title || page.title;
  const description = seo?.meta_description || undefined;

  // Walk parent_path up to the root to build the breadcrumb chain.
  const crumbs: { name: string; path: string }[] = [{ name: page.title, path: effectivePath }];
  let parentPath = page.parent_path;
  const visited = new Set([page.path]);
  while (parentPath && !visited.has(parentPath)) {
    visited.add(parentPath);
    const { data: parent } = await supabase
      .from("pages")
      .select("path, parent_path, title, page_type, custom_path")
      .eq("path", parentPath)
      .maybeSingle<PageRow>();
    if (!parent) break;
    crumbs.unshift({ name: parent.title, path: parent.custom_path || parent.path });
    parentPath = parent.parent_path;
  }
  if (crumbs[0]?.path !== "/") crumbs.unshift({ name: "Home", path: "/" });

  const breadcrumbSchema =
    crumbs.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${siteUrl}${c.path === "/" ? "" : c.path}`,
          })),
        }
      : null;

  const mainEntityId = { "@id": `${siteUrl}${effectivePath}` };
  const publisher = { "@id": `${siteUrl}/#organization` };
  const pageUrl = `${siteUrl}${effectivePath}`;
  // Always resolve to an absolute URL, falling back through the page's own
  // image, the site-wide default share image, then the org logo — so
  // `image` is essentially never missing (Google flags it as a warning
  // when absent, even though it's technically optional).
  const fallbackImage =
    toAbsoluteUrl(seo?.og_image, siteUrl) ||
    toAbsoluteUrl(settings?.default_share_image, siteUrl) ||
    toAbsoluteUrl(settings?.org_logo_url, siteUrl);

  const hasAddress = settings?.org_street || settings?.org_city || settings?.org_country;
  const orgAddress = hasAddress
    ? {
        "@type": "PostalAddress",
        ...(settings?.org_street ? { streetAddress: settings.org_street } : {}),
        ...(settings?.org_city ? { addressLocality: settings.org_city } : {}),
        ...(settings?.org_region ? { addressRegion: settings.org_region } : {}),
        ...(settings?.org_postal_code ? { postalCode: settings.org_postal_code } : {}),
        ...(settings?.org_country ? { addressCountry: settings.org_country } : {}),
      }
    : undefined;

  let typeSchema: Record<string, unknown> | null = null;

  if (page.page_type === "article") {
    typeSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      url: pageUrl,
      ...(description ? { description } : {}),
      ...(fallbackImage ? { image: fallbackImage } : {}),
      ...(seo?.article_published_at ? { datePublished: seo.article_published_at } : {}),
      author: { "@type": "Person", name: seo?.article_author || settings?.org_name || "ARQQA" },
      publisher,
      mainEntityOfPage: { "@type": "WebPage", ...mainEntityId },
    };
  } else if (page.page_type === "job") {
    typeSchema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title,
      ...(description ? { description } : { description: title }),
      hiringOrganization: {
        "@type": "Organization",
        name: settings?.org_name || "ARQQA",
        sameAs: siteUrl,
      },
      ...(orgAddress ? { jobLocation: { "@type": "Place", address: orgAddress } } : {}),
    };
  } else if (page.page_type === "service" || page.page_type === "service-approach") {
    typeSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      ...(description ? { description } : {}),
      provider: { "@type": "Organization", ...publisher },
      areaServed: settings?.org_country || undefined,
      url: `${siteUrl}${effectivePath}`,
    };
  } else if (["case-study", "branding", "social", "video", "industry"].includes(page.page_type)) {
    typeSchema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      ...(description ? { description } : {}),
      ...(fallbackImage ? { image: fallbackImage } : {}),
      creator: { "@type": "Organization", ...publisher },
      url: pageUrl,
    };
  }

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {typeSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(typeSchema) }}
        />
      )}
      {(customSchemas ?? []).map((row) => (
        <script
          key={row.id}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(row.schema_json) }}
        />
      ))}
    </>
  );
}

import { createClient } from "@/lib/supabase/server";

type PageRow = { path: string; parent_path: string | null; title: string; page_type: string; custom_path: string | null };

/**
 * Renders per-page JSON-LD: a BreadcrumbList built from the page's position
 * in the Pages tree (walked via parent_path — no manual entry needed), plus
 * an Article schema for article-type pages using the author/published date
 * set on that page's SEO tab. Organization/WebSite schema is injected once,
 * site-wide, in the root layout — this only adds what's specific to one page.
 */
export async function PageSchema({ path }: { path: string }) {
  const supabase = await createClient();

  const [{ data: page }, { data: seo }, { data: settings }] = await Promise.all([
    supabase.from("pages").select("path, parent_path, title, page_type, custom_path").eq("path", path).maybeSingle<PageRow>(),
    supabase
      .from("seo_meta")
      .select("article_author, article_published_at, seo_title, og_image")
      .eq("page_path", path)
      .maybeSingle(),
    supabase.from("site_settings").select("site_url").single(),
  ]);

  if (!page) return null;

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const effectivePath = page.custom_path || page.path;

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

  const articleSchema =
    page.page_type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: seo?.seo_title || page.title,
          ...(seo?.og_image ? { image: seo.og_image } : {}),
          ...(seo?.article_published_at ? { datePublished: seo.article_published_at } : {}),
          author: { "@type": "Person", name: seo?.article_author || "ARQQA" },
          publisher: { "@id": `${siteUrl}/#organization` },
          mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${effectivePath}` },
        }
      : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}

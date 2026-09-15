import { createPublicClient } from "@/lib/supabase/public";
import type { Metadata } from "next";

type SeoMetaRow = {
  seo_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string;
  robots_directive: string;
};

type SiteSettingsRow = {
  site_url: string;
  org_name: string;
};

export type SeoFallback = {
  title: string;
  description: string;
  image?: string;
};

/**
 * The canonical a page self-references when no override is set. The dashboard
 * shows this same value on the SEO tab, so both must build it identically.
 */
export function buildCanonicalUrl(siteUrl: string, effectivePath: string): string {
  return `${siteUrl}${effectivePath === "/" ? "" : effectivePath}`;
}

/** Resolves a page's current public path — its dashboard-set custom_path if one exists, else the original path. */
export async function getEffectivePath(path: string): Promise<string> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("pages").select("custom_path").eq("path", path).maybeSingle();
  return data?.custom_path || path;
}

/**
 * Resolves the effective SEO fields for a path: per-page `seo_meta`
 * overrides layered on top of the page's own hardcoded `fallback` (its
 * existing title/description), with `site_settings` only as the last resort.
 *
 * Called from every route's `generateMetadata()`, passing that route's
 * existing title/description as `fallback` — so a page with no dashboard
 * override yet keeps working exactly as it does today, and once an admin
 * fills in the SEO tab for that page, their values take over without a
 * redeploy.
 */
export async function getPageSeo(path: string, fallback: SeoFallback): Promise<Metadata> {
  const supabase = createPublicClient();

  const [{ data: seo }, { data: settings }, { data: pageRow }] = await Promise.all([
    supabase
      .from("seo_meta")
      .select(
        "seo_title, meta_description, keywords, canonical_url, og_title, og_description, og_image, twitter_card, robots_directive",
      )
      .eq("page_path", path)
      .maybeSingle<SeoMetaRow>(),
    supabase.from("site_settings").select("site_url, org_name").single<SiteSettingsRow>(),
    supabase.from("pages").select("custom_path").eq("path", path).maybeSingle(),
  ]);

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const effectivePath = pageRow?.custom_path || path;
  const title = seo?.seo_title || fallback.title;
  const description = seo?.meta_description || fallback.description;
  const canonical = seo?.canonical_url || buildCanonicalUrl(siteUrl, effectivePath);
  const ogImage = seo?.og_image || fallback.image;
  const robots =
    seo?.robots_directive === "noindex,nofollow"
      ? { index: false, follow: false }
      : { index: true, follow: true };

  // Left unset until an admin fills the SEO tab's Keywords field, so pages
  // with none emit no empty <meta name="keywords">.
  const keywords = seo?.keywords
    ?.split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    robots,
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      siteName: settings?.org_name ?? "ARQQA",
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: (seo?.twitter_card as "summary_large_image" | "summary") || "summary_large_image",
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

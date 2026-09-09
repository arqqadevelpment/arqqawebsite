import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

type SeoMetaRow = {
  seo_title: string | null;
  meta_description: string | null;
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
  const supabase = await createClient();

  const [{ data: seo }, { data: settings }] = await Promise.all([
    supabase
      .from("seo_meta")
      .select(
        "seo_title, meta_description, canonical_url, og_title, og_description, og_image, twitter_card, robots_directive",
      )
      .eq("page_path", path)
      .maybeSingle<SeoMetaRow>(),
    supabase.from("site_settings").select("site_url, org_name").single<SiteSettingsRow>(),
  ]);

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const title = seo?.seo_title || fallback.title;
  const description = seo?.meta_description || fallback.description;
  const canonical = seo?.canonical_url || `${siteUrl}${path === "/" ? "" : path}`;
  const ogImage = seo?.og_image || fallback.image;
  const robots =
    seo?.robots_directive === "noindex,nofollow"
      ? { index: false, follow: false }
      : { index: true, follow: true };

  return {
    title,
    description,
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

import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("site_url, robots_extra_rules")
    .single();

  const siteUrl = settings?.site_url ?? "https://arqqa.net";

  const extraDisallow = (settings?.robots_extra_rules ?? "")
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line: string) => line.startsWith("/"));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", ...extraDisallow],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

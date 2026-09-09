import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: settings }, { data: pages }] = await Promise.all([
    supabase.from("site_settings").select("site_url").single(),
    supabase.from("pages").select("path, custom_path, updated_at"),
  ]);

  const siteUrl = settings?.site_url ?? "https://arqqa.net";

  return (pages ?? []).map((p) => {
    const effectivePath = p.custom_path || p.path;
    return {
      url: `${siteUrl}${effectivePath === "/" ? "" : effectivePath}`,
      lastModified: p.updated_at,
    };
  });
}

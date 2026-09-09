import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SeoForm } from "./SeoForm";

export default async function PageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("pages")
    .select("id, path, title, page_type, updated_at")
    .eq("id", id)
    .single();

  if (!page) notFound();

  const { data: seo } = await supabase
    .from("seo_meta")
    .select(
      "seo_title, meta_description, canonical_url, og_title, og_description, og_image, twitter_card, robots_directive, article_author, article_published_at",
    )
    .eq("page_path", page.path)
    .maybeSingle();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("site_url")
    .single();

  const siteUrl = settings?.site_url ?? "https://arqqa.net";

  return (
    <div>
      <Link href="/dashboard/pages" style={{ color: "#a3a3a3", fontSize: 13 }}>
        ← Back to Pages
      </Link>

      <h1 style={{ fontSize: 20, margin: "12px 0 4px" }}>{page.title}</h1>
      <p style={{ color: "#737373", fontSize: 13, marginBottom: 24 }}>{page.path}</p>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: 10,
            padding: 20,
            background: "#111111",
            width: 460,
            maxWidth: "100%",
          }}
        >
          <h2 style={{ fontSize: 14, color: "#a3a3a3", marginBottom: 14 }}>SEO</h2>
          <SeoForm pagePath={page.path} isArticle={page.page_type === "article"} initial={seo ?? null} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 380, maxWidth: "100%" }}>
          <div
            style={{
              border: "1px solid #262626",
              borderRadius: 10,
              padding: 16,
              background: "#111111",
            }}
          >
            <h2 style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 10 }}>Overview</h2>
            <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12.5 }}>
              <dt style={{ color: "#737373" }}>Path</dt>
              <dd>{page.path}</dd>
              <dt style={{ color: "#737373" }}>Type</dt>
              <dd>{page.page_type}</dd>
              <dt style={{ color: "#737373" }}>Last updated</dt>
              <dd>{new Date(page.updated_at).toLocaleString()}</dd>
            </dl>
          </div>

          <div
            style={{
              border: "1px solid #262626",
              borderRadius: 10,
              padding: 16,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 11, color: "#737373", marginBottom: 10 }}>Google preview</h2>
            <div style={{ fontFamily: "arial, sans-serif" }}>
              <div style={{ color: "#1a0dab", fontSize: 18, lineHeight: 1.3, marginBottom: 2 }}>
                {seo?.seo_title || page.title}
              </div>
              <div style={{ color: "#006621", fontSize: 13, marginBottom: 3 }}>
                {siteUrl}
                {page.path === "/" ? "" : page.path}
              </div>
              <div style={{ color: "#545454", fontSize: 13, lineHeight: 1.4 }}>
                {seo?.meta_description || "No description set — falls back to the site default."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

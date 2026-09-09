import { createClient } from "@/lib/supabase/server";
import { RobotsForm } from "./RobotsForm";

export default async function RobotsPage() {
  const supabase = await createClient();
  const [{ data: settings }, { count }] = await Promise.all([
    supabase.from("site_settings").select("site_url, robots_extra_rules").single(),
    supabase.from("pages").select("id", { count: "exact", head: true }),
  ]);

  const siteUrl = settings?.site_url ?? "https://arqqa.net";

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Robots &amp; Sitemap</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Crawl rules and the auto-generated sitemap — both served live, no redeploy needed.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
        <div style={{ border: "1px solid #262626", borderRadius: 10, padding: 20, background: "#111111" }}>
          <h2 style={{ fontSize: 14, marginBottom: 14 }}>robots.txt</h2>
          <RobotsForm initial={settings?.robots_extra_rules ?? ""} />
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", marginTop: 14, color: "#60a5fa", fontSize: 12.5 }}
          >
            View live /robots.txt →
          </a>
        </div>

        <div style={{ border: "1px solid #262626", borderRadius: 10, padding: 20, background: "#111111" }}>
          <h2 style={{ fontSize: 14, marginBottom: 6 }}>Sitemap</h2>
          <p style={{ color: "#a3a3a3", fontSize: 12.5, marginBottom: 12 }}>
            Generated automatically from the Pages tree — currently <strong>{count ?? 0}</strong> URLs.
            Add or remove a page in the Pages tab and it updates automatically.
          </p>
          <a href="/sitemap.xml" target="_blank" rel="noreferrer" style={{ color: "#60a5fa", fontSize: 12.5 }}>
            View live /sitemap.xml →
          </a>
          <p style={{ color: "#525252", fontSize: 11.5, marginTop: 10 }}>
            Referenced automatically: {siteUrl}/sitemap.xml
          </p>
        </div>
      </div>
    </div>
  );
}

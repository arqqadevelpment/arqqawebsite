import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const cardStyle: React.CSSProperties = {
  border: "1px solid #262626",
  borderRadius: 10,
  padding: 20,
  background: "#111111",
  display: "block",
  textDecoration: "none",
  color: "inherit",
  minWidth: 180,
};

function StatCard({ label, value, href }: { label: string; value: number | string; href: string }) {
  return (
    <Link href={href} style={cardStyle}>
      <div style={{ color: "#a3a3a3", fontSize: 12.5, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 600, color: "#fff" }}>{value}</div>
    </Link>
  );
}

export default async function DashboardHomePage() {
  const supabase = await createClient();

  const [{ count: pagesCount }, { count: submissionsCount }] = await Promise.all([
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Overview</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        A quick look at the site — click either card to see the details.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard label="Pages" value={pagesCount ?? 0} href="/dashboard/pages" />
        <StatCard label="Form Submissions" value={submissionsCount ?? 0} href="/dashboard/forms" />
      </div>
    </div>
  );
}

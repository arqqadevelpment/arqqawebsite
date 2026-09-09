import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./SignOutButton";
import { Sidebar } from "./Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", display: "flex" }}>
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid #262626",
          display: "flex",
          flexDirection: "column",
          padding: "18px 12px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arqqa-logo.webp"
            alt="ARQQA"
            style={{ height: "1.25rem", width: "auto" }}
          />
          <strong style={{ fontWeight: 500, color: "#a3a3a3", fontSize: 13 }}>Dashboard</strong>
        </div>

        <Sidebar />

        <div style={{ marginTop: "auto", padding: "12px 8px 0", borderTop: "1px solid #262626" }}>
          <div style={{ color: "#a3a3a3", fontSize: 12, marginBottom: 10, wordBreak: "break-all" }}>
            {user?.email}
          </div>
          <SignOutButton />
        </div>
      </aside>

      <main style={{ flex: 1, padding: 24, minWidth: 0 }}>{children}</main>
    </div>
  );
}

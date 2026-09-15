import Link from "next/link";
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
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid #262626",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/arqqa-logo.webp" alt="ARQQA" style={{ height: "1.25rem", width: "auto" }} />
          <strong style={{ fontWeight: 500, color: "#a3a3a3", fontSize: 13 }}>Dashboard</strong>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 13px",
              borderRadius: 7,
              border: "1px solid #262626",
              background: "transparent",
              color: "#fff",
              fontSize: 12.5,
              textDecoration: "none",
            }}
          >
            Live Preview <span aria-hidden="true">↗</span>
          </Link>
          <span style={{ color: "#a3a3a3", fontSize: 12.5 }}>{user?.email}</span>
          <SignOutButton />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <aside
          style={{
            width: 200,
            flexShrink: 0,
            borderRight: "1px solid #262626",
            padding: "18px 12px",
          }}
        >
          <Sidebar />
        </aside>

        <main style={{ flex: 1, padding: 24, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}

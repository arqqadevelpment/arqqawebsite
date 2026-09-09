"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/pages", label: "Pages" },
  {
    label: "SEO",
    children: [
      { href: "/dashboard/seo/redirects", label: "Redirects" },
      { href: "/dashboard/seo/marketing", label: "Marketing" },
      { href: "/dashboard/seo/site-settings", label: "Site Settings" },
      { href: "/dashboard/seo/robots", label: "Robots & Sitemap" },
    ],
  },
  { href: "/dashboard/forms", label: "Forms" },
];

function linkStyle(active: boolean, indent = 0): React.CSSProperties {
  return {
    color: active ? "#fff" : "#a3a3a3",
    background: active ? "#1f1f1f" : "transparent",
    fontSize: 13.5,
    textDecoration: "none",
    padding: "9px 14px",
    paddingLeft: 14 + indent,
    borderRadius: 7,
    fontWeight: active ? 600 : 400,
    display: "block",
  };
}

export function Sidebar() {
  const pathname = usePathname();
  const seoActive = pathname.startsWith("/dashboard/seo");
  const [seoOpen, setSeoOpen] = useState(seoActive);

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {NAV.map((item) => {
        if (!item.children) {
          const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href!);
          return (
            <Link key={item.href} href={item.href!} style={linkStyle(active)}>
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => setSeoOpen((v) => !v)}
              style={{
                ...linkStyle(seoActive && !seoOpen),
                width: "100%",
                textAlign: "left",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {item.label}
              <span style={{ fontSize: 10, color: "#737373" }}>{seoOpen ? "▾" : "▸"}</span>
            </button>
            {seoOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }}>
                {item.children.map((child) => {
                  const active = pathname.startsWith(child.href);
                  return (
                    <Link key={child.href} href={child.href} style={linkStyle(active, 12)}>
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

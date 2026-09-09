"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/pages", label: "Pages" },
  { href: "/dashboard/seo", label: "SEO" },
  { href: "/dashboard/forms", label: "Forms" },
  { href: "/dashboard/resend", label: "Resend" },
  { href: "/dashboard/site-settings", label: "Site Settings" },
];

function linkStyle(active: boolean): React.CSSProperties {
  return {
    color: active ? "#fff" : "#a3a3a3",
    background: active ? "#1f1f1f" : "transparent",
    fontSize: 13.5,
    textDecoration: "none",
    padding: "9px 14px",
    borderRadius: 7,
    fontWeight: active ? 600 : 400,
    display: "block",
  };
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {NAV.map((item) => {
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} style={linkStyle(active)}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

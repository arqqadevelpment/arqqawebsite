"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard/seo/redirects", label: "Redirects" },
  { href: "/dashboard/seo/site-settings", label: "Social & Schema" },
  { href: "/dashboard/seo/robots", label: "Feeds & Robots" },
  { href: "/dashboard/seo/marketing", label: "Marketing" },
];

export function SeoTabs() {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 3,
        borderRadius: 10,
        border: "1px solid #262626",
        background: "#111111",
        marginBottom: 22,
      }}
    >
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "7px 14px",
              borderRadius: 7,
              fontSize: 13,
              textDecoration: "none",
              color: active ? "#0a0a0a" : "#a3a3a3",
              background: active ? "#fff" : "transparent",
              fontWeight: active ? 600 : 400,
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

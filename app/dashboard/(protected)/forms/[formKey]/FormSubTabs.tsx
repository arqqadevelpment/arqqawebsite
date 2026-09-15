"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// These two forms are wired for submission only, not for dynamic field
// editing (Get Started is a custom multi-step wizard; Newsletter is a single
// email box) — so there's nothing for a Fields tab to configure.
const NO_FIELDS_TAB = new Set(["brief", "newsletter"]);

export function FormSubTabs({ formKey }: { formKey: string }) {
  const pathname = usePathname();
  const tabs = [
    ...(NO_FIELDS_TAB.has(formKey) ? [] : [{ href: `/dashboard/forms/${formKey}/fields`, label: "Fields" }]),
    { href: `/dashboard/forms/${formKey}/submissions`, label: "Submissions" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #262626", marginBottom: 18 }}>
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "8px 2px",
              fontSize: 13.5,
              textDecoration: "none",
              color: active ? "#fff" : "#a3a3a3",
              borderBottom: active ? "2px solid #fff" : "2px solid transparent",
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

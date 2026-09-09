"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FORM_KEYS, FORM_LABELS } from "./form-labels";

export function FormsTabs() {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 10, border: "1px solid #262626", background: "#111111", flexWrap: "wrap" }}>
      {FORM_KEYS.map((key) => {
        const href = `/dashboard/forms/${key}/submissions`;
        const active = pathname.startsWith(`/dashboard/forms/${key}`);
        return (
          <Link
            key={key}
            href={href}
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
            {FORM_LABELS[key]}
          </Link>
        );
      })}
    </div>
  );
}

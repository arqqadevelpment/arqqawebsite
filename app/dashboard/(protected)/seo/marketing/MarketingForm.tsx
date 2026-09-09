"use client";

import { useState, useTransition } from "react";
import { saveSiteSettings } from "../actions";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 7,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 13,
  outline: "none",
  fontFamily: "monospace",
};

const labelStyle: React.CSSProperties = { color: "#a3a3a3", fontSize: 12, marginBottom: 5, display: "block" };
const cardStyle: React.CSSProperties = { border: "1px solid #262626", borderRadius: 10, padding: 20, background: "#111111" };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {hint && <span style={{ color: "#525252", fontSize: 11, marginTop: 4, display: "block" }}>{hint}</span>}
    </label>
  );
}

type Tracking = {
  ga4_id: string | null;
  gtm_id: string | null;
  meta_pixel_id: string | null;
};

export function MarketingForm({ initial }: { initial: Tracking }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    const result = await saveSiteSettings(formData);
    setStatus(result.ok ? "saved" : "error");
    if (!result.ok) setErrorMsg(result.error ?? "Failed to save");
  }

  return (
    <form
      action={(fd) => startTransition(() => handleSubmit(fd))}
      style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}
    >
      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>Tracking &amp; Analytics</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Google Analytics 4 — Measurement ID" hint="e.g. G-XXXXXXXXXX. Loaded directly via gtag.js if no GTM ID is set below.">
            <input name="ga4_id" defaultValue={initial.ga4_id ?? ""} style={inputStyle} placeholder="G-XXXXXXXXXX" />
          </Field>
          <Field label="Google Tag Manager — Container ID" hint="e.g. GTM-XXXXXXX. When set, GTM loads instead of gtag.js directly — manage GA4 and other tags from inside GTM.">
            <input name="gtm_id" defaultValue={initial.gtm_id ?? ""} style={inputStyle} placeholder="GTM-XXXXXXX" />
          </Field>
          <Field label="Meta (Facebook) Pixel ID" hint="Numeric Pixel ID from Meta Events Manager.">
            <input name="meta_pixel_id" defaultValue={initial.meta_pixel_id ?? ""} style={inputStyle} placeholder="123456789012345" />
          </Field>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "9px 18px",
            borderRadius: 7,
            border: "none",
            background: isPending ? "#404040" : "#fff",
            color: isPending ? "#a3a3a3" : "#0a0a0a",
            fontWeight: 600,
            fontSize: 13,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Saving…" : "Save"}
        </button>
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 13 }}>Saved — live on the site within a minute</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 13 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}

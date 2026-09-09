"use client";

import { useState, useTransition } from "react";
import { saveSiteSettings } from "../../actions";

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

const codeStyle: React.CSSProperties = { ...inputStyle, resize: "vertical" as const };

const labelStyle: React.CSSProperties = { color: "#a3a3a3", fontSize: 12, marginBottom: 5, display: "block" };
const cardStyle: React.CSSProperties = { border: "1px solid #262626", borderRadius: 10, padding: 20, background: "#111111" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {hint && <span style={{ color: "#525252", fontSize: 11, marginTop: 4, display: "block" }}>{hint}</span>}
    </label>
  );
}

type Marketing = {
  ga4_id: string | null;
  gtm_id: string | null;
  meta_pixel_id: string | null;
  linkedin_partner_id: string | null;
  gsc_verification: string | null;
  clarity_id: string | null;
  head_snippet: string | null;
  body_snippet: string | null;
};

export function MarketingForm({ initial }: { initial: Marketing }) {
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
      style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}
    >
      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 6 }}>Analytics</h2>
        <div style={gridStyle}>
          <Field label="Google Analytics 4 (Measurement ID)">
            <input name="ga4_id" defaultValue={initial.ga4_id ?? ""} style={inputStyle} placeholder="G-XXXXXXXXXX" />
          </Field>
          <Field label="Google Tag Manager (Container ID)">
            <input name="gtm_id" defaultValue={initial.gtm_id ?? ""} style={inputStyle} placeholder="GTM-XXXXXXX" />
          </Field>
        </div>
        <p style={{ color: "#525252", fontSize: 11, marginTop: 10 }}>
          Tags load on public pages only — never inside the dashboard. Page views are tracked on every route change.
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 6 }}>Advertising</h2>
        <div style={gridStyle}>
          <Field label="Meta (Facebook) Pixel ID">
            <input name="meta_pixel_id" defaultValue={initial.meta_pixel_id ?? ""} style={inputStyle} placeholder="1234567890" />
          </Field>
          <Field label="LinkedIn Partner ID">
            <input name="linkedin_partner_id" defaultValue={initial.linkedin_partner_id ?? ""} style={inputStyle} placeholder="123456" />
          </Field>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 6 }}>Verification</h2>
        <div style={gridStyle}>
          <Field
            label="Google Search Console verification"
            hint="Paste the token or the whole meta tag — added to the public site's <head> automatically."
          >
            <input
              name="gsc_verification"
              defaultValue={initial.gsc_verification ?? ""}
              style={inputStyle}
              placeholder='<meta name="google-site-verification" content="...">'
            />
          </Field>
          <Field label="Microsoft Clarity Project ID" hint="Loads the official Clarity script on public pages only.">
            <input name="clarity_id" defaultValue={initial.clarity_id ?? ""} style={inputStyle} placeholder="abcd1234ef" />
          </Field>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 6 }}>Custom code</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Head snippet" hint="Good place for other verification meta tags (Bing, Pinterest...).">
            <textarea
              name="head_snippet"
              defaultValue={initial.head_snippet ?? ""}
              rows={4}
              style={codeStyle}
              placeholder={"<!-- verification meta tags, other marketing scripts -->"}
            />
          </Field>
          <Field label="Body snippet" hint="Only paste code from providers you trust — it runs on every public page.">
            <textarea
              name="body_snippet"
              defaultValue={initial.body_snippet ?? ""}
              rows={4}
              style={codeStyle}
              placeholder={"<!-- chat widgets, noscript pixels -->"}
            />
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
          {isPending ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 13 }}>Saved — live within a minute</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 13 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}

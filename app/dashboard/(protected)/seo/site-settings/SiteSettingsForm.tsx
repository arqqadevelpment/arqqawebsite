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
};

const labelStyle: React.CSSProperties = { color: "#a3a3a3", fontSize: 12, marginBottom: 5, display: "block" };
const cardStyle: React.CSSProperties = { border: "1px solid #262626", borderRadius: 10, padding: 20, background: "#111111" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

function Field({ label, hint, dir, children }: { label: string; hint?: string; dir?: "rtl"; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }} dir={dir}>
      <span style={{ ...labelStyle, textAlign: dir === "rtl" ? "right" : "left" }}>{label}</span>
      {children}
      {hint && <span style={{ color: "#525252", fontSize: 11, marginTop: 4, display: "block" }}>{hint}</span>}
    </label>
  );
}

type SiteSettings = {
  default_share_image: string | null;
  twitter_handle: string | null;
  default_title: string;
  site_url: string;
  site_alternate_name: string | null;
  org_name: string;
  org_name_ar: string | null;
  org_legal_name: string | null;
  org_logo_url: string | null;
  org_phone: string | null;
  org_email: string | null;
  org_street: string | null;
  org_city: string | null;
  org_region: string | null;
  org_postal_code: string | null;
  org_country: string | null;
  social_profiles: string[];
};

export function SiteSettingsForm({ initial }: { initial: SiteSettings }) {
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
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>Social sharing defaults</h2>
        <div style={gridStyle}>
          <Field label="Default share image (Open Graph / Twitter)" hint="Used whenever a page has no image of its own. Recommended 1200×630.">
            <input name="default_share_image" defaultValue={initial.default_share_image ?? ""} style={inputStyle} placeholder="/og-default.webp" />
          </Field>
          <Field label="Twitter / X handle">
            <input name="twitter_handle" defaultValue={initial.twitter_handle ?? ""} style={inputStyle} placeholder="@arqqa" />
          </Field>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>Website (structured data)</h2>
        <div style={gridStyle}>
          <Field label="Site name">
            <input name="default_title" defaultValue={initial.default_title} style={inputStyle} />
          </Field>
          <Field label="Site URL">
            <input name="site_url" defaultValue={initial.site_url} style={inputStyle} />
          </Field>
        </div>
        <div style={{ marginTop: 14 }}>
          <Field label="Alternate name (optional)" hint="Short name or acronym, e.g. ARQQA">
            <input name="site_alternate_name" defaultValue={initial.site_alternate_name ?? ""} style={inputStyle} />
          </Field>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>Organization (structured data)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={gridStyle}>
            <Field label="Name (EN)">
              <input name="org_name" defaultValue={initial.org_name} style={inputStyle} />
            </Field>
            <Field label="الاسم (AR)" dir="rtl">
              <input name="org_name_ar" defaultValue={initial.org_name_ar ?? ""} style={{ ...inputStyle, textAlign: "right" }} dir="rtl" />
            </Field>
          </div>

          <div style={gridStyle}>
            <Field label="Legal name">
              <input name="org_legal_name" defaultValue={initial.org_legal_name ?? ""} style={inputStyle} />
            </Field>
            <Field label="Logo URL" hint="Falls back to site logo">
              <input name="org_logo_url" defaultValue={initial.org_logo_url ?? ""} style={inputStyle} placeholder="/arqqa-logo.webp" />
            </Field>
          </div>

          <div style={gridStyle}>
            <Field label="Phone">
              <input name="org_phone" defaultValue={initial.org_phone ?? ""} style={inputStyle} placeholder="+20 11 1011 5557" />
            </Field>
            <Field label="Email">
              <input name="org_email" defaultValue={initial.org_email ?? ""} style={inputStyle} placeholder="info@arqqa.net" />
            </Field>
          </div>

          <div style={gridStyle}>
            <Field label="Street">
              <input name="org_street" defaultValue={initial.org_street ?? ""} style={inputStyle} />
            </Field>
            <Field label="City">
              <input name="org_city" defaultValue={initial.org_city ?? ""} style={inputStyle} />
            </Field>
          </div>

          <div style={gridStyle}>
            <Field label="Region / State">
              <input name="org_region" defaultValue={initial.org_region ?? ""} style={inputStyle} />
            </Field>
            <Field label="Postal code">
              <input name="org_postal_code" defaultValue={initial.org_postal_code ?? ""} style={inputStyle} />
            </Field>
          </div>

          <Field label="Country">
            <input name="org_country" defaultValue={initial.org_country ?? ""} style={inputStyle} />
          </Field>

          <Field label="Social profiles (one URL per line)" hint="Helps Google connect your website with your official profiles (knowledge panel).">
            <textarea
              name="social_profiles"
              defaultValue={initial.social_profiles.join("\n")}
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              placeholder={"https://linkedin.com/company/arqqa\nhttps://x.com/arqqa"}
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
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 13 }}>Saved</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 13 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}

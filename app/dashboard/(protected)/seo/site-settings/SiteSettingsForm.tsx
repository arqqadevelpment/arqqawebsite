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

type SiteSettings = {
  site_url: string;
  default_title: string;
  default_description: string;
  org_name: string;
  org_logo_url: string | null;
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
      style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}
    >
      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>Site Identity</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Site URL">
            <input name="site_url" defaultValue={initial.site_url} style={inputStyle} />
          </Field>
          <Field label="Organization Name">
            <input name="org_name" defaultValue={initial.org_name} style={inputStyle} />
          </Field>
          <Field label="Logo URL">
            <input name="org_logo_url" defaultValue={initial.org_logo_url ?? ""} style={inputStyle} placeholder="/arqqa-logo.webp" />
          </Field>
          <Field label="Default SEO Title">
            <input name="default_title" defaultValue={initial.default_title} style={inputStyle} />
          </Field>
          <Field label="Default Meta Description">
            <textarea
              name="default_description"
              defaultValue={initial.default_description}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </Field>
          <Field label="Social profile URLs" hint="One per line — also feeds the Organization schema's sameAs list, injected as JSON-LD on every page">
            <textarea
              name="social_profiles"
              defaultValue={initial.social_profiles.join("\n")}
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              placeholder={"https://instagram.com/arqqa\nhttps://linkedin.com/company/arqqa"}
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
          {isPending ? "Saving…" : "Save"}
        </button>
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 13 }}>Saved</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 13 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}

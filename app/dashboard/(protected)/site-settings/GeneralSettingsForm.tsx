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

type General = {
  default_title: string;
  default_description: string;
  site_url: string;
  admin_email: string | null;
  favicon_url: string | null;
};

export function GeneralSettingsForm({ initial }: { initial: General }) {
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
      style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}
    >
      <div style={cardStyle}>
        <h2 style={{ fontSize: 14, marginBottom: 14 }}>General</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Site Title">
            <input name="default_title" defaultValue={initial.default_title} style={inputStyle} />
          </Field>
          <Field label="Tagline" hint="Used as the default meta description when a page has none of its own.">
            <textarea
              name="default_description"
              defaultValue={initial.default_description}
              rows={2}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </Field>
          <div style={gridStyle}>
            <Field label="Site URL">
              <input name="site_url" defaultValue={initial.site_url} style={inputStyle} />
            </Field>
            <Field label="Administration Email">
              <input name="admin_email" type="email" defaultValue={initial.admin_email ?? ""} style={inputStyle} placeholder="admin@arqqa.net" />
            </Field>
          </div>
          <Field label="Site Icon / Favicon URL">
            <input name="favicon_url" defaultValue={initial.favicon_url ?? ""} style={inputStyle} placeholder="/favicon.ico" />
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

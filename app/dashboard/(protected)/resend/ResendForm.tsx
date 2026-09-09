"use client";

import { useState, useTransition } from "react";
import { saveResendSettings } from "./actions";

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

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {hint && <span style={{ color: "#525252", fontSize: 11, marginTop: 4, display: "block" }}>{hint}</span>}
    </label>
  );
}

export function ResendForm({
  hasApiKey,
  fromEmail,
  fromName,
}: {
  hasApiKey: boolean;
  fromEmail: string | null;
  fromName: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    const result = await saveResendSettings(formData);
    setStatus(result.ok ? "saved" : "error");
    if (!result.ok) setErrorMsg(result.error ?? "Failed to save");
  }

  return (
    <form
      action={(fd) => startTransition(() => handleSubmit(fd))}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 480,
        border: "1px solid #262626",
        borderRadius: 10,
        padding: 20,
        background: "#111111",
      }}
    >
      <Field label="Resend API Key" hint={hasApiKey ? "A key is already saved — leave blank to keep it." : "Get this from resend.com/api-keys"}>
        <input name="api_key" type="password" style={inputStyle} placeholder={hasApiKey ? "•••••••••••••••• (saved)" : "re_xxxxxxxxxxxx"} />
      </Field>

      <Field label="From Email" hint="Must be on a domain verified in your Resend account.">
        <input name="from_email" type="email" defaultValue={fromEmail ?? ""} style={inputStyle} placeholder="notifications@arqqa.net" />
      </Field>

      <Field label="From Name">
        <input name="from_name" defaultValue={fromName ?? ""} style={inputStyle} placeholder="ARQQA Website" />
      </Field>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
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

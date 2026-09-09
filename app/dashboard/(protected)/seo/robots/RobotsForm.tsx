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

export function RobotsForm({ initial }: { initial: string }) {
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
      style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}
    >
      <label style={{ display: "block" }}>
        <span style={{ color: "#a3a3a3", fontSize: 12, marginBottom: 5, display: "block" }}>
          Extra Disallow rules
        </span>
        <textarea name="robots_extra_rules" defaultValue={initial} rows={6} style={inputStyle} placeholder="/some-private-page" />
        <span style={{ color: "#525252", fontSize: 11, marginTop: 4, display: "block" }}>
          One path per line. <code>/dashboard</code> and <code>/login</code> are always disallowed automatically.
        </span>
      </label>

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

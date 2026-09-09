"use client";

import { useState, useTransition } from "react";
import { saveCustomPath } from "./url-actions";

export function UrlForm({
  pageId,
  originalPath,
  customPath,
  siteUrl,
}: {
  pageId: string;
  originalPath: string;
  customPath: string | null;
  siteUrl: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPublicPath, setCurrentPublicPath] = useState(customPath || originalPath);

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    const result = await saveCustomPath(pageId, originalPath, customPath, formData);
    if (!result.ok) {
      setStatus("error");
      setErrorMsg(result.error ?? "Failed to save");
      return;
    }
    setCurrentPublicPath(result.path ?? originalPath);
    setStatus("saved");
  }

  const isCustom = currentPublicPath !== originalPath;

  return (
    <form action={(fd) => startTransition(() => handleSubmit(fd))} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label style={{ display: "block" }}>
        <span style={{ color: "#a3a3a3", fontSize: 12, marginBottom: 5, display: "block" }}>Public URL</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#525252", fontSize: 12.5, marginRight: 4 }}>{siteUrl}</span>
          <input
            name="custom_path"
            defaultValue={currentPublicPath}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 7,
              border: "1px solid #262626",
              background: "#0a0a0a",
              color: "#fff",
              fontSize: 13,
              fontFamily: "monospace",
              outline: "none",
            }}
          />
        </div>
      </label>

      {isCustom && (
        <p style={{ color: "#525252", fontSize: 11, margin: 0 }}>
          Original: <code>{originalPath}</code> — still works, redirects here automatically.
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "7px 14px",
            borderRadius: 7,
            border: "1px solid #262626",
            background: isPending ? "#1a1a1a" : "transparent",
            color: "#fff",
            fontSize: 12.5,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Saving…" : "Save URL"}
        </button>
        {status === "saved" && <span style={{ color: "#4ade80", fontSize: 12.5 }}>Saved</span>}
        {status === "error" && <span style={{ color: "#f87171", fontSize: 12.5 }}>{errorMsg}</span>}
      </div>
    </form>
  );
}

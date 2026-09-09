"use client";

import { useRef, useState, useTransition } from "react";
import { createRedirect } from "./actions";

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 7,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 13,
  outline: "none",
};

export function NewRedirectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createRedirect(formData);
    if (!result.ok) {
      setError(result.error ?? "Failed to create redirect");
      return;
    }
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={(fd) => startTransition(() => handleSubmit(fd))}
      style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ color: "#a3a3a3", fontSize: 12 }}>Source path</span>
        <input name="source_path" placeholder="/old-page" style={{ ...inputStyle, width: 200 }} required />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ color: "#a3a3a3", fontSize: 12 }}>Destination path</span>
        <input name="destination_path" placeholder="/new-page" style={{ ...inputStyle, width: 200 }} required />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ color: "#a3a3a3", fontSize: 12 }}>Type</span>
        <select name="status_code" defaultValue="301" style={{ ...inputStyle, width: 110 }}>
          <option value="301">301</option>
          <option value="302">302</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: "9px 16px",
          borderRadius: 7,
          border: "none",
          background: isPending ? "#404040" : "#fff",
          color: isPending ? "#a3a3a3" : "#0a0a0a",
          fontWeight: 600,
          fontSize: 13,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Adding…" : "Add redirect"}
      </button>

      {error && <span style={{ color: "#f87171", fontSize: 12.5 }}>{error}</span>}
    </form>
  );
}

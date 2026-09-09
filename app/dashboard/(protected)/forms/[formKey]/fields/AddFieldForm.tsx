"use client";

import { useRef, useState, useTransition } from "react";
import { addField } from "./actions";

const inputStyle: React.CSSProperties = {
  padding: "7px 9px",
  borderRadius: 6,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 12.5,
};

export function AddFieldForm({ formKey }: { formKey: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await addField(formKey, formData);
    if (!result.ok) {
      setError(result.error ?? "Failed to add field");
      return;
    }
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={(fd) => startTransition(() => handleSubmit(fd))}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", flexWrap: "wrap" }}
    >
      <input name="field_key" placeholder="field_key" required style={{ ...inputStyle, width: 130, fontFamily: "monospace" }} />
      <input name="label" placeholder="Label" required style={{ ...inputStyle, width: 200 }} />
      <select name="field_type" defaultValue="text" style={{ ...inputStyle, width: 100 }}>
        <option value="text">text</option>
        <option value="email">email</option>
        <option value="tel">tel</option>
        <option value="textarea">textarea</option>
        <option value="select">select</option>
        <option value="file">file</option>
      </select>
      <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#a3a3a3" }}>
        <input type="checkbox" name="required" defaultChecked />
        Required
      </label>
      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: "7px 14px",
          borderRadius: 7,
          border: "none",
          background: isPending ? "#404040" : "#fff",
          color: isPending ? "#a3a3a3" : "#0a0a0a",
          fontWeight: 600,
          fontSize: 12.5,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        {isPending ? "Adding…" : "Add field"}
      </button>
      {error && <span style={{ color: "#f87171", fontSize: 12 }}>{error}</span>}
    </form>
  );
}

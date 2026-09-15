"use client";

import { useTransition } from "react";
import { updateField, deleteField } from "./actions";

const FIELD_TYPES = ["text", "email", "tel", "textarea", "select", "file"];

const inputStyle: React.CSSProperties = {
  padding: "6px 9px",
  borderRadius: 6,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 12.5,
};

export function FieldRow({
  id,
  formKey,
  fieldKey,
  label,
  fieldType,
  required,
}: {
  id: string;
  formKey: string;
  fieldKey: string;
  label: string;
  fieldType: string;
  required: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => updateField(id, formKey, fd))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderTop: "1px solid #262626",
        flexWrap: "wrap",
      }}
    >
      <span style={{ width: 130, fontSize: 12, fontFamily: "monospace", color: "#737373" }}>{fieldKey}</span>

      <input name="label" defaultValue={label} style={{ ...inputStyle, width: 200 }} />

      <select name="field_type" defaultValue={fieldType} style={{ ...inputStyle, width: 100 }}>
        {FIELD_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#a3a3a3" }}>
        <input type="checkbox" name="required" defaultChecked={required} />
        Required
      </label>

      <button
        type="submit"
        disabled={isPending}
        style={{ fontSize: 11.5, padding: "4px 10px", borderRadius: 6, border: "1px solid #262626", background: "transparent", color: "#fff", cursor: "pointer" }}
      >
        {isPending ? "…" : "Save"}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => deleteField(id, formKey))}
        style={{ fontSize: 11.5, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", marginLeft: "auto" }}
      >
        Remove
      </button>
    </form>
  );
}

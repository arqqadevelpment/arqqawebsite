"use client";

import { useRef, useState, useTransition } from "react";
import { addSchema, deleteSchema } from "./schema-actions";

type SchemaRow = { id: string; label: string; schema_json: unknown };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "7px 9px",
  borderRadius: 7,
  border: "1px solid #262626",
  background: "#0a0a0a",
  color: "#fff",
  fontSize: 12.5,
  outline: "none",
};

export function SchemaManager({ pagePath, initial }: { pagePath: string; initial: SchemaRow[] }) {
  const [rows, setRows] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [, forceRefresh] = useState(0);

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteSchema(id, pagePath);
      setRows((r) => r.filter((row) => row.id !== id));
    });
  }

  async function handleAdd(formData: FormData) {
    setError(null);
    const result = await addSchema(pagePath, formData);
    if (!result.ok) {
      setError(result.error ?? "Failed to add");
      return;
    }
    formRef.current?.reset();
    setAdding(false);
    forceRefresh((n) => n + 1);
    // Re-fetch isn't wired for the new row's real id — a full page reload on
    // next navigation will show it; for immediate feedback, just note success.
    setError("saved");
  }

  return (
    <div>
      {rows.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {rows.map((row) => (
            <div
              key={row.id}
              style={{
                border: "1px solid #262626",
                borderRadius: 8,
                padding: "8px 10px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "#fff", marginBottom: 4 }}>{row.label}</div>
                <pre
                  style={{
                    margin: 0,
                    fontSize: 10.5,
                    color: "#737373",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    maxHeight: 60,
                    overflow: "hidden",
                  }}
                >
                  {JSON.stringify(row.schema_json)}
                </pre>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDelete(row.id)}
                style={{ fontSize: 11.5, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", flexShrink: 0 }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <form
          ref={formRef}
          action={(fd) => startTransition(() => handleAdd(fd))}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input name="label" placeholder="Label (e.g. FAQPage)" style={inputStyle} />
          <textarea
            name="schema_json"
            placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  ...\n}'}
            rows={6}
            required
            style={{ ...inputStyle, fontFamily: "monospace", resize: "vertical" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              type="submit"
              disabled={isPending}
              style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#fff", color: "#0a0a0a", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              {isPending ? "Saving…" : "Save schema"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setError(null);
              }}
              style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #262626", background: "transparent", color: "#a3a3a3", fontSize: 12, cursor: "pointer" }}
            >
              Cancel
            </button>
            {error && error !== "saved" && <span style={{ color: "#f87171", fontSize: 11.5 }}>{error}</span>}
            {error === "saved" && <span style={{ color: "#4ade80", fontSize: 11.5 }}>Saved — reload to see it in the list</span>}
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          style={{
            padding: "7px 14px",
            borderRadius: 7,
            border: "1px solid #262626",
            background: "transparent",
            color: "#fff",
            fontSize: 12.5,
            cursor: "pointer",
          }}
        >
          + Add Schema
        </button>
      )}
    </div>
  );
}

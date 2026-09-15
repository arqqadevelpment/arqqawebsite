"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteSubmission, setSubmissionStatus } from "../../actions";

type Submission = {
  id: string;
  fields: Record<string, unknown>;
  email_status: string;
  status: "new" | "draft";
  created_at: string;
};

const EMAIL_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  sent: { bg: "#052e1a", color: "#4ade80", label: "Sent" },
  not_sent: { bg: "#262626", color: "#a3a3a3", label: "Not sent" },
  failed: { bg: "#2d0f0f", color: "#f87171", label: "Failed" },
};

function toCsv(rows: Submission[]): string {
  const fieldKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.fields))));
  const headers = ["Received", "Status", "Email", ...fieldKeys];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  const lines = rows.map((r) =>
    [
      new Date(r.created_at).toLocaleString(),
      r.status,
      r.email_status,
      ...fieldKeys.map((k) => escape(r.fields[k])),
    ]
      .map(escape)
      .join(","),
  );

  return [headers.map(escape).join(","), ...lines].join("\n");
}

export function SubmissionsTable({ formKey, initial }: { formKey: string; initial: Submission[] }) {
  const [rows, setRows] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "draft">("all");

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  function handleDelete(id: string) {
    if (!confirm("Delete this submission? This can't be undone.")) return;
    setPendingId(id);
    startTransition(async () => {
      await deleteSubmission(formKey, id);
      setRows((r) => r.filter((row) => row.id !== id));
      setPendingId(null);
    });
  }

  function handleToggleDraft(id: string, current: "new" | "draft") {
    const next = current === "draft" ? "new" : "draft";
    setPendingId(id);
    startTransition(async () => {
      await setSubmissionStatus(formKey, id, next);
      setRows((r) => r.map((row) => (row.id === id ? { ...row, status: next } : row)));
      setPendingId(null);
    });
  }

  function handleExport() {
    const csv = toCsv(visible);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formKey}-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "new", "draft"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 12px",
                borderRadius: 7,
                border: "1px solid #262626",
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? "#0a0a0a" : "#a3a3a3",
                fontSize: 12,
                fontWeight: filter === f ? 600 : 400,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f} {f !== "all" && `(${rows.filter((r) => r.status === f).length})`}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={visible.length === 0}
          style={{
            padding: "7px 14px",
            borderRadius: 7,
            border: "1px solid #262626",
            background: "transparent",
            color: "#fff",
            fontSize: 12.5,
            cursor: visible.length === 0 ? "not-allowed" : "pointer",
            opacity: visible.length === 0 ? 0.5 : 1,
          }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((s) => {
          const badge = EMAIL_BADGE[s.email_status] ?? EMAIL_BADGE.not_sent;
          const rowPending = isPending && pendingId === s.id;

          return (
            <div
              key={s.id}
              style={{
                border: "1px solid #262626",
                borderRadius: 10,
                background: "#111111",
                padding: "14px 16px",
                opacity: rowPending ? 0.5 : 1,
                transition: "opacity 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11.5, color: "#737373" }}>
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                  {s.status === "draft" && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: "#2a1e05",
                        color: "#facc15",
                      }}
                    >
                      Draft
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 14 }}>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggleDraft(s.id, s.status)}
                    style={{ fontSize: 11.5, color: "#a3a3a3", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    {s.status === "draft" ? "Mark as new" : "Mark as draft"}
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(s.id)}
                    style={{ fontSize: 11.5, color: "#f87171", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px 20px", margin: 0 }}>
                {Object.entries(s.fields).map(([k, v]) => (
                  <div key={k} style={{ minWidth: 0 }}>
                    <dt style={{ fontSize: 10.5, color: "#525252", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 2 }}>
                      {k}
                    </dt>
                    <dd style={{ fontSize: 12.5, color: "#d4d4d4", margin: 0, wordBreak: "break-word" }}>{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{ padding: 30, textAlign: "center", color: "#737373", fontSize: 13, border: "1px solid #262626", borderRadius: 10 }}>
            No submissions{filter !== "all" ? ` in "${filter}"` : ""} yet.
          </div>
        )}
      </div>
    </div>
  );
}

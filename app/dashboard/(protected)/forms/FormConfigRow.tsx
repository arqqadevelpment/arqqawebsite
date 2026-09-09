"use client";

import { useTransition } from "react";
import { updateFormConfig } from "./actions";

export function FormConfigRow({
  formKey,
  notifyEmail,
  emailEnabled,
}: {
  formKey: string;
  notifyEmail: string | null;
  emailEnabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => updateFormConfig(formKey, fd))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderTop: "1px solid #262626",
        flexWrap: "wrap",
      }}
    >
      <span style={{ width: 150, fontSize: 13, fontFamily: "monospace" }}>{formKey}</span>

      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#a3a3a3" }}>
        <input type="checkbox" name="email_enabled" defaultChecked={emailEnabled} />
        Email notify
      </label>

      <input
        name="notify_email"
        type="email"
        defaultValue={notifyEmail ?? ""}
        placeholder="team@arqqa.net"
        style={{
          padding: "6px 9px",
          borderRadius: 6,
          border: "1px solid #262626",
          background: "#0a0a0a",
          color: "#fff",
          fontSize: 12.5,
          width: 220,
        }}
      />

      <button
        type="submit"
        disabled={isPending}
        style={{
          fontSize: 12,
          padding: "5px 12px",
          borderRadius: 6,
          border: "1px solid #262626",
          background: "transparent",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {isPending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

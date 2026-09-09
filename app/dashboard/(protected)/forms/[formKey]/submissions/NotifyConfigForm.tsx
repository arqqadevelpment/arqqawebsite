"use client";

import { useState, useTransition } from "react";
import { updateFormConfig } from "../../actions";

export function NotifyConfigForm({
  formKey,
  notifyEmail,
  emailEnabled,
}: {
  formKey: string;
  notifyEmail: string | null;
  emailEnabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  return (
    <form
      action={(fd) =>
        startTransition(async () => {
          await updateFormConfig(formKey, fd);
          setStatus("saved");
        })
      }
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        border: "1px solid #262626",
        borderRadius: 10,
        background: "#111111",
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#a3a3a3" }}>
        <input type="checkbox" name="email_enabled" defaultChecked={emailEnabled} />
        Email a notification for every submission
      </label>

      <input
        name="notify_email"
        type="email"
        defaultValue={notifyEmail ?? ""}
        placeholder="team@arqqa.net"
        style={{
          padding: "7px 10px",
          borderRadius: 7,
          border: "1px solid #262626",
          background: "#0a0a0a",
          color: "#fff",
          fontSize: 13,
          width: 240,
        }}
      />

      <button
        type="submit"
        disabled={isPending}
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
        {isPending ? "Saving…" : "Save"}
      </button>
      {status === "saved" && !isPending && <span style={{ color: "#4ade80", fontSize: 12.5 }}>Saved</span>}
    </form>
  );
}

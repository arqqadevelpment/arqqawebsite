"use client";

import { useTransition } from "react";
import { toggleRedirect, deleteRedirect } from "./actions";

export function RedirectRow({
  id,
  sourcePath,
  destinationPath,
  statusCode,
  isActive,
}: {
  id: string;
  sourcePath: string;
  destinationPath: string;
  statusCode: number;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr style={{ borderTop: "1px solid #262626" }}>
      <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12.5 }}>{sourcePath}</td>
      <td style={{ padding: "10px 12px", color: "#737373" }}>→</td>
      <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12.5 }}>{destinationPath}</td>
      <td style={{ padding: "10px 12px", fontSize: 12.5, color: "#a3a3a3" }}>{statusCode}</td>
      <td style={{ padding: "10px 12px" }}>
        <button
          disabled={isPending}
          onClick={() => startTransition(() => toggleRedirect(id, !isActive))}
          style={{
            fontSize: 11.5,
            padding: "3px 10px",
            borderRadius: 999,
            border: "1px solid #262626",
            background: isActive ? "#052e1a" : "transparent",
            color: isActive ? "#4ade80" : "#737373",
            cursor: "pointer",
          }}
        >
          {isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <button
          disabled={isPending}
          onClick={() => startTransition(() => deleteRedirect(id))}
          style={{
            fontSize: 12,
            color: "#f87171",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

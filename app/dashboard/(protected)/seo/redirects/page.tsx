import { createClient } from "@/lib/supabase/server";
import { NewRedirectForm } from "./NewRedirectForm";
import { RedirectRow } from "./RedirectRow";

export default async function RedirectsPage() {
  const supabase = await createClient();
  const { data: redirects } = await supabase
    .from("redirects")
    .select("id, source_path, destination_path, status_code, is_active")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div
        style={{
          border: "1px solid #262626",
          borderRadius: 10,
          padding: 16,
          background: "#111111",
          marginBottom: 20,
        }}
      >
        <NewRedirectForm />
      </div>

      <div style={{ border: "1px solid #262626", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#111111", textAlign: "left" }}>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Source</th>
              <th />
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Destination</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Type</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(redirects ?? []).map((r) => (
              <RedirectRow
                key={r.id}
                id={r.id}
                sourcePath={r.source_path}
                destinationPath={r.destination_path}
                statusCode={r.status_code}
                isActive={r.is_active}
              />
            ))}
            {(redirects ?? []).length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 20, textAlign: "center", color: "#737373", fontSize: 13 }}>
                  No redirects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

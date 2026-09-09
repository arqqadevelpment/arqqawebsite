import { createClient } from "@/lib/supabase/server";
import { NotifyConfigForm } from "./NotifyConfigForm";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ formKey: string }>;
}) {
  const { formKey } = await params;
  const supabase = await createClient();

  const [{ data: config }, { data: submissions }] = await Promise.all([
    supabase.from("forms_config").select("notify_email, email_enabled").eq("form_key", formKey).single(),
    supabase
      .from("form_submissions")
      .select("id, fields, email_status, created_at")
      .eq("form_key", formKey)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div>
      <NotifyConfigForm formKey={formKey} notifyEmail={config?.notify_email ?? null} emailEnabled={config?.email_enabled ?? false} />

      <div style={{ border: "1px solid #262626", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#111111", textAlign: "left" }}>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Fields</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Email</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Received</th>
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((s) => (
              <tr key={s.id} style={{ borderTop: "1px solid #262626" }}>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#d4d4d4", maxWidth: 480 }}>
                  {Object.entries(s.fields as Record<string, unknown>)
                    .map(([k, v]) => `${k}: ${String(v)}`)
                    .join(" · ")}
                </td>
                <td style={{ padding: "10px 12px", fontSize: 11.5, color: "#a3a3a3" }}>{s.email_status}</td>
                <td style={{ padding: "10px 12px", fontSize: 11.5, color: "#737373", whiteSpace: "nowrap" }}>
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(submissions ?? []).length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: 20, textAlign: "center", color: "#737373", fontSize: 13 }}>
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

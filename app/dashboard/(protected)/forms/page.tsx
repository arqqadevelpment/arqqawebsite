import { createClient } from "@/lib/supabase/server";
import { FormConfigRow } from "./FormConfigRow";

export default async function FormsPage() {
  const supabase = await createClient();

  const [{ data: configs }, { data: submissions }] = await Promise.all([
    supabase.from("forms_config").select("form_key, notify_email, email_enabled").order("form_key"),
    supabase
      .from("form_submissions")
      .select("id, form_key, fields, email_status, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Forms</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Every submission from the site&apos;s forms, plus which ones also send an email notification.
      </p>

      <div style={{ border: "1px solid #262626", borderRadius: 10, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ padding: "10px 12px", background: "#111111", fontSize: 12, color: "#737373" }}>
          Form routing
        </div>
        {(configs ?? []).map((c) => (
          <FormConfigRow key={c.form_key} formKey={c.form_key} notifyEmail={c.notify_email} emailEnabled={c.email_enabled} />
        ))}
      </div>

      <div style={{ border: "1px solid #262626", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#111111", textAlign: "left" }}>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Form</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Fields</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Email</th>
              <th style={{ padding: "10px 12px", fontSize: 11, color: "#737373" }}>Received</th>
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((s) => (
              <tr key={s.id} style={{ borderTop: "1px solid #262626" }}>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontFamily: "monospace" }}>{s.form_key}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#d4d4d4", maxWidth: 420 }}>
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
                <td colSpan={4} style={{ padding: 20, textAlign: "center", color: "#737373", fontSize: 13 }}>
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

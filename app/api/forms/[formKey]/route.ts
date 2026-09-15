import { NextResponse, type NextRequest } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

/**
 * Generic handler for every site form. Always stores the submission (so it
 * shows up in the dashboard's Forms tab); only sends a Resend notification
 * email when the form's `forms_config.email_enabled` is true AND a Resend
 * API key is configured (dashboard Resend tab, falling back to the
 * RESEND_API_KEY env var) — so this works today (dashboard-only) even before
 * Resend is connected, and starts emailing the moment both are true.
 *
 * Uses the service_role key: this is a trusted server route, and it needs to
 * read `resend_settings`, which has no anon RLS policy since it holds a
 * secret API key.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ formKey: string }> },
) {
  const { formKey } = await params;

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const [{ data: config }, { data: resendSettings }] = await Promise.all([
    supabase.from("forms_config").select("email_enabled, notify_email, is_active").eq("form_key", formKey).maybeSingle(),
    supabase.from("resend_settings").select("api_key, from_email, from_name").maybeSingle(),
  ]);

  if (!config || !config.is_active) {
    return NextResponse.json({ error: "Unknown or inactive form" }, { status: 404 });
  }

  let fields: Record<string, unknown>;
  try {
    fields = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let emailStatus: "not_sent" | "sent" | "failed" | "disabled" = "disabled";

  if (config.email_enabled && config.notify_email) {
    const apiKey = resendSettings?.api_key || process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(`[forms] email_enabled for "${formKey}" but no Resend API key is connected — skipping.`);
      emailStatus = "not_sent";
    } else {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        const rows = Object.entries(fields)
          .map(([k, v]) => `<tr><td style="padding:4px 10px;color:#666">${k}</td><td style="padding:4px 10px">${String(v)}</td></tr>`)
          .join("");

        const fromName = resendSettings?.from_name || "ARQQA Website";
        const fromEmail = resendSettings?.from_email || "onboarding@resend.dev";

        await resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: config.notify_email,
          subject: `New "${formKey}" submission`,
          html: `<table>${rows}</table>`,
        });
        emailStatus = "sent";
      } catch (err) {
        console.error(`[forms] Resend send failed for "${formKey}":`, err);
        emailStatus = "failed";
      }
    }
  }

  const { error } = await supabase.from("form_submissions").insert({
    form_key: formKey,
    fields,
    email_status: emailStatus,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

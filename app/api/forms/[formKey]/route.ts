import { NextResponse, type NextRequest } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

/**
 * Generic handler for every site form. Always stores the submission (so it
 * shows up in the dashboard's Forms tab); only sends a Resend notification
 * email when the form's `forms_config.email_enabled` is true AND
 * RESEND_API_KEY is set — so this works today (dashboard-only) even before a
 * Resend account exists, and starts emailing the moment both are true.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ formKey: string }> },
) {
  const { formKey } = await params;

  // Public form submissions use the anon key — RLS's "anyone can submit a
  // form" insert policy allows it, but reads stay admin-only.
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: config } = await supabase
    .from("forms_config")
    .select("email_enabled, notify_email, is_active")
    .eq("form_key", formKey)
    .maybeSingle();

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
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(`[forms] email_enabled for "${formKey}" but RESEND_API_KEY is not set — skipping.`);
      emailStatus = "not_sent";
    } else {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        const rows = Object.entries(fields)
          .map(([k, v]) => `<tr><td style="padding:4px 10px;color:#666">${k}</td><td style="padding:4px 10px">${String(v)}</td></tr>`)
          .join("");

        await resend.emails.send({
          from: "ARQQA Website <onboarding@resend.dev>",
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

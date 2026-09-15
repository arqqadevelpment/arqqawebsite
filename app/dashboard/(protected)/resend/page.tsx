import { createClient } from "@/lib/supabase/server";
import { ResendForm } from "./ResendForm";

export default async function ResendPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("resend_settings")
    .select("api_key, from_email, from_name")
    .single();

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Resend</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Connect Resend to actually send the email notifications configured on each form&apos;s Submissions tab.
      </p>
      <ResendForm hasApiKey={!!settings?.api_key} fromEmail={settings?.from_email ?? null} fromName={settings?.from_name ?? null} />
    </div>
  );
}

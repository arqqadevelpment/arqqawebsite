import { createClient } from "@/lib/supabase/server";
import { NotifyConfigForm } from "./NotifyConfigForm";
import { SubmissionsTable } from "./SubmissionsTable";

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
      .select("id, fields, email_status, status, created_at")
      .eq("form_key", formKey)
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  return (
    <div>
      <NotifyConfigForm formKey={formKey} notifyEmail={config?.notify_email ?? null} emailEnabled={config?.email_enabled ?? false} />
      <SubmissionsTable formKey={formKey} initial={submissions ?? []} />
    </div>
  );
}

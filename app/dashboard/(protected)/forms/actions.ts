"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateFormConfig(formKey: string, formData: FormData) {
  const supabase = await createClient();
  const notifyEmail = (formData.get("notify_email") as string)?.trim() || null;
  const emailEnabled = formData.get("email_enabled") === "on";

  await supabase
    .from("forms_config")
    .update({ notify_email: notifyEmail, email_enabled: emailEnabled })
    .eq("form_key", formKey);

  revalidatePath(`/dashboard/forms/${formKey}/submissions`);
}

export async function deleteSubmission(formKey: string, id: string) {
  const supabase = await createClient();
  await supabase.from("form_submissions").delete().eq("id", id);
  revalidatePath(`/dashboard/forms/${formKey}/submissions`);
}

export async function setSubmissionStatus(formKey: string, id: string, status: "new" | "draft") {
  const supabase = await createClient();
  await supabase.from("form_submissions").update({ status }).eq("id", id);
  revalidatePath(`/dashboard/forms/${formKey}/submissions`);
}

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

  revalidatePath("/dashboard/forms");
}

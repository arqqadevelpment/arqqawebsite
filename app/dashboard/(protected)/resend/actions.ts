"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveResendSettings(formData: FormData) {
  const supabase = await createClient();

  const apiKey = (formData.get("api_key") as string)?.trim();
  const fromEmail = (formData.get("from_email") as string)?.trim() || null;
  const fromName = (formData.get("from_name") as string)?.trim() || null;

  const update: Record<string, unknown> = { from_email: fromEmail, from_name: fromName };
  // Keep the existing key if the field was left as the masked placeholder (blank submit).
  if (apiKey) update.api_key = apiKey;

  const { error } = await supabase.from("resend_settings").update(update).eq("id", true);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/resend");
  return { ok: true };
}

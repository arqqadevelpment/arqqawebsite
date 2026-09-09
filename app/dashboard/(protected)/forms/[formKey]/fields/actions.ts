"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addField(formKey: string, formData: FormData) {
  const supabase = await createClient();

  const fieldKey = (formData.get("field_key") as string)?.trim();
  const label = (formData.get("label") as string)?.trim();
  const fieldType = (formData.get("field_type") as string) || "text";
  const required = formData.get("required") === "on";

  if (!fieldKey || !label) return { ok: false, error: "Field key and label are required" };

  const { data: existing } = await supabase
    .from("form_fields")
    .select("sort_order")
    .eq("form_key", formKey)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("form_fields").insert({
    form_key: formKey,
    field_key: fieldKey,
    label,
    field_type: fieldType,
    required,
    sort_order: (existing?.sort_order ?? 0) + 1,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/dashboard/forms/${formKey}/fields`);
  return { ok: true };
}

export async function updateField(id: string, formKey: string, formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("form_fields")
    .update({
      label: (formData.get("label") as string)?.trim(),
      field_type: (formData.get("field_type") as string) || "text",
      required: formData.get("required") === "on",
    })
    .eq("id", id);

  revalidatePath(`/dashboard/forms/${formKey}/fields`);
}

export async function deleteField(id: string, formKey: string) {
  const supabase = await createClient();
  await supabase.from("form_fields").delete().eq("id", id);
  revalidatePath(`/dashboard/forms/${formKey}/fields`);
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addSchema(pagePath: string, formData: FormData) {
  const supabase = await createClient();

  const label = ((formData.get("label") as string) || "Custom Schema").trim();
  const raw = (formData.get("schema_json") as string) ?? "";

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "That's not valid JSON — check for a missing comma or bracket." };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "Schema must be a JSON object (or array of objects)." };
  }

  const { error } = await supabase.from("page_schemas").insert({
    page_path: pagePath,
    label,
    schema_json: parsed,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath(pagePath);
  return { ok: true };
}

export async function deleteSchema(id: string, pagePath: string) {
  const supabase = await createClient();
  await supabase.from("page_schemas").delete().eq("id", id);
  revalidatePath(pagePath);
}

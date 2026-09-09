"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createRedirect(formData: FormData) {
  const supabase = await createClient();

  const source = (formData.get("source_path") as string)?.trim();
  const destination = (formData.get("destination_path") as string)?.trim();
  const statusCode = Number(formData.get("status_code")) || 301;

  if (!source || !destination) return { ok: false, error: "Both paths are required" };
  if (!source.startsWith("/")) return { ok: false, error: "Source path must start with /" };

  const { error } = await supabase.from("redirects").insert({
    source_path: source,
    destination_path: destination,
    status_code: statusCode,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/seo/redirects");
  return { ok: true };
}

export async function toggleRedirect(id: string, isActive: boolean) {
  const supabase = await createClient();
  await supabase.from("redirects").update({ is_active: isActive }).eq("id", id);
  revalidatePath("/dashboard/seo/redirects");
}

export async function deleteRedirect(id: string) {
  const supabase = await createClient();
  await supabase.from("redirects").delete().eq("id", id);
  revalidatePath("/dashboard/seo/redirects");
}

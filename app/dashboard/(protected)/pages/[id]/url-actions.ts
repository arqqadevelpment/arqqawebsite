"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function normalizePath(input: string): string {
  let p = input.trim();
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export async function saveCustomPath(
  pageId: string,
  originalPath: string,
  currentCustomPath: string | null,
  formData: FormData,
) {
  const supabase = await createClient();

  const raw = (formData.get("custom_path") as string) ?? "";
  const previousPublicPath = currentCustomPath || originalPath;

  // Empty input (or set back to the original path) clears the alias.
  if (!raw.trim() || normalizePath(raw) === originalPath) {
    const { error } = await supabase.from("pages").update({ custom_path: null }).eq("id", pageId);
    if (error) return { ok: false, error: error.message };

    if (currentCustomPath) {
      await supabase.from("redirects").delete().eq("source_path", originalPath).eq("destination_path", currentCustomPath);
    }

    revalidatePath(originalPath);
    if (currentCustomPath) revalidatePath(currentCustomPath);
    revalidatePath("/sitemap.xml");
    return { ok: true, path: originalPath };
  }

  const newPath = normalizePath(raw);

  if (newPath === previousPublicPath) {
    return { ok: true, path: newPath };
  }

  const { data: clash } = await supabase
    .from("pages")
    .select("id")
    .or(`path.eq.${newPath},custom_path.eq.${newPath}`)
    .neq("id", pageId)
    .maybeSingle();

  if (clash) {
    return { ok: false, error: `"${newPath}" is already in use by another page.` };
  }

  const { error: updateError } = await supabase.from("pages").update({ custom_path: newPath }).eq("id", pageId);
  if (updateError) return { ok: false, error: updateError.message };

  const { error: redirectError } = await supabase
    .from("redirects")
    .upsert(
      { source_path: previousPublicPath, destination_path: newPath, status_code: 301, is_active: true },
      { onConflict: "source_path" },
    );
  if (redirectError) return { ok: false, error: `URL saved, but the redirect failed: ${redirectError.message}` };

  revalidatePath(originalPath);
  revalidatePath(previousPublicPath);
  revalidatePath(newPath);
  revalidatePath("/sitemap.xml");
  revalidatePath("/dashboard/seo/redirects");

  return { ok: true, path: newPath };
}

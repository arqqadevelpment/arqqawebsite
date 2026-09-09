"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Shared by the Marketing and Robots forms — each only submits its own
 * fields, so this builds the update from whatever keys are actually present
 * in the FormData rather than assuming the full site_settings shape.
 */
export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();
  const update: Record<string, unknown> = {};

  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : null;
  };

  if (formData.has("site_url")) update.site_url = text("site_url") || "https://arqqa.net";
  if (formData.has("org_name")) update.org_name = text("org_name") || "ARQQA";
  if (formData.has("org_logo_url")) update.org_logo_url = text("org_logo_url") || null;
  if (formData.has("default_title")) update.default_title = text("default_title") || "";
  if (formData.has("default_description")) update.default_description = text("default_description") || "";
  if (formData.has("social_profiles")) {
    update.social_profiles = (text("social_profiles") ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }
  if (formData.has("robots_extra_rules")) update.robots_extra_rules = text("robots_extra_rules") || null;
  if (formData.has("ga4_id")) update.ga4_id = text("ga4_id") || null;
  if (formData.has("gtm_id")) update.gtm_id = text("gtm_id") || null;
  if (formData.has("meta_pixel_id")) update.meta_pixel_id = text("meta_pixel_id") || null;

  const { error } = await supabase.from("site_settings").update(update).eq("id", true);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");

  return { ok: true };
}

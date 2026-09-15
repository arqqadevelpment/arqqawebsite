"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const TEXT_FIELDS = [
  "site_url",
  "org_name",
  "org_logo_url",
  "default_title",
  "default_description",
  "robots_extra_rules",
  "ga4_id",
  "gtm_id",
  "meta_pixel_id",
  "linkedin_partner_id",
  "gsc_verification",
  "clarity_id",
  "head_snippet",
  "body_snippet",
  "admin_email",
  "favicon_url",
  "default_share_image",
  "twitter_handle",
  "site_alternate_name",
  "org_name_ar",
  "org_legal_name",
  "org_phone",
  "org_email",
  "org_street",
  "org_city",
  "org_region",
  "org_postal_code",
  "org_country",
];

/**
 * Shared by every form across the SEO and Site Settings tabs — each only
 * submits its own fields, so this builds the update from whatever keys are
 * actually present in the FormData rather than assuming the full
 * site_settings shape.
 */
export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();
  const update: Record<string, unknown> = {};

  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : null;
  };

  for (const key of TEXT_FIELDS) {
    if (formData.has(key)) update[key] = text(key) || null;
  }
  // A couple of fields fall back to a non-null default rather than null.
  if (formData.has("site_url")) update.site_url = text("site_url") || "https://arqqa.net";
  if (formData.has("org_name")) update.org_name = text("org_name") || "ARQQA";
  if (formData.has("default_title")) update.default_title = text("default_title") || "";
  if (formData.has("default_description")) update.default_description = text("default_description") || "";

  if (formData.has("social_profiles")) {
    update.social_profiles = (text("social_profiles") ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  const { error } = await supabase.from("site_settings").update(update).eq("id", true);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");

  return { ok: true };
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SaveSeoResult = { ok: true } | { ok: false; error: string };

export async function saveSeoMeta(
  pagePath: string,
  formData: FormData,
): Promise<SaveSeoResult> {
  const supabase = await createClient();

  const nullableText = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
  };

  const { error } = await supabase.from("seo_meta").upsert(
    {
      page_path: pagePath,
      seo_title: nullableText("seo_title"),
      meta_description: nullableText("meta_description"),
      canonical_url: nullableText("canonical_url"),
      og_title: nullableText("og_title"),
      og_description: nullableText("og_description"),
      og_image: nullableText("og_image"),
      twitter_card: (formData.get("twitter_card") as string) || "summary_large_image",
      robots_directive: (formData.get("robots_directive") as string) || "index,follow",
      article_author: nullableText("article_author"),
      article_published_at: nullableText("article_published_at"),
    },
    { onConflict: "page_path" },
  );

  if (error) return { ok: false, error: error.message };

  // The live page reads this via getSeoForPath() in generateMetadata() — bust
  // its cache so the edit shows up without waiting for the next deploy.
  revalidatePath(pagePath);

  return { ok: true };
}

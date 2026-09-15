import { createClient } from "@/lib/supabase/server";
import { MarketingForm } from "./MarketingForm";

export default async function MarketingPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("ga4_id, gtm_id, meta_pixel_id, linkedin_partner_id, gsc_verification, clarity_id, head_snippet, body_snippet")
    .single();

  return (
    <MarketingForm
      initial={{
        ga4_id: settings?.ga4_id ?? null,
        gtm_id: settings?.gtm_id ?? null,
        meta_pixel_id: settings?.meta_pixel_id ?? null,
        linkedin_partner_id: settings?.linkedin_partner_id ?? null,
        gsc_verification: settings?.gsc_verification ?? null,
        clarity_id: settings?.clarity_id ?? null,
        head_snippet: settings?.head_snippet ?? null,
        body_snippet: settings?.body_snippet ?? null,
      }}
    />
  );
}

import { createClient } from "@/lib/supabase/server";
import { MarketingForm } from "./MarketingForm";

export default async function MarketingPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("ga4_id, gtm_id, meta_pixel_id")
    .single();

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Marketing</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Analytics and ad-tracking IDs — injected on every page of the live site, no redeploy needed.
      </p>
      <MarketingForm
        initial={{
          ga4_id: settings?.ga4_id ?? null,
          gtm_id: settings?.gtm_id ?? null,
          meta_pixel_id: settings?.meta_pixel_id ?? null,
        }}
      />
    </div>
  );
}

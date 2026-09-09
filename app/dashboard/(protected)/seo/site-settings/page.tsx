import { createClient } from "@/lib/supabase/server";
import { SiteSettingsForm } from "./SiteSettingsForm";

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "default_share_image, twitter_handle, default_title, site_url, site_alternate_name, org_name, org_name_ar, org_legal_name, org_logo_url, org_phone, org_email, org_street, org_city, org_region, org_postal_code, org_country, social_profiles",
    )
    .single();

  return (
    <div>
      <SiteSettingsForm
        initial={{
          default_share_image: settings?.default_share_image ?? null,
          twitter_handle: settings?.twitter_handle ?? null,
          default_title: settings?.default_title ?? "",
          site_url: settings?.site_url ?? "https://arqqa.net",
          site_alternate_name: settings?.site_alternate_name ?? null,
          org_name: settings?.org_name ?? "ARQQA",
          org_name_ar: settings?.org_name_ar ?? null,
          org_legal_name: settings?.org_legal_name ?? null,
          org_logo_url: settings?.org_logo_url ?? null,
          org_phone: settings?.org_phone ?? null,
          org_email: settings?.org_email ?? null,
          org_street: settings?.org_street ?? null,
          org_city: settings?.org_city ?? null,
          org_region: settings?.org_region ?? null,
          org_postal_code: settings?.org_postal_code ?? null,
          org_country: settings?.org_country ?? null,
          social_profiles: settings?.social_profiles ?? [],
        }}
      />
    </div>
  );
}

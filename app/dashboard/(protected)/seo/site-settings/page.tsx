import { createClient } from "@/lib/supabase/server";
import { SiteSettingsForm } from "./SiteSettingsForm";

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("site_url, default_title, default_description, org_name, org_logo_url, social_profiles")
    .single();

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Site Settings</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        Site identity, defaults, and social links — also drives the Organization schema injected on every page.
      </p>
      <SiteSettingsForm
        initial={{
          site_url: settings?.site_url ?? "https://arqqa.net",
          default_title: settings?.default_title ?? "",
          default_description: settings?.default_description ?? "",
          org_name: settings?.org_name ?? "ARQQA",
          org_logo_url: settings?.org_logo_url ?? null,
          social_profiles: settings?.social_profiles ?? [],
        }}
      />
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { GeneralSettingsForm } from "./GeneralSettingsForm";

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("default_title, default_description, site_url, admin_email, favicon_url")
    .single();

  return (
    <div>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Site Settings</h1>
      <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 20 }}>
        General site configuration.
      </p>
      <GeneralSettingsForm
        initial={{
          default_title: settings?.default_title ?? "",
          default_description: settings?.default_description ?? "",
          site_url: settings?.site_url ?? "https://arqqa.net",
          admin_email: settings?.admin_email ?? null,
          favicon_url: settings?.favicon_url ?? null,
        }}
      />
    </div>
  );
}

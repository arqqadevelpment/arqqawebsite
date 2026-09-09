import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { getFormFields } from "@/lib/forms/getFormFields";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/start", {
    title: "Start | ARQQA",
    description: "Two ways to start with ARQQA. Book a strategy call if you're ready to move, or download the Growth System Audit if you're still exploring.",
  });
}

export default async function StartPage() {
  const fields = await getFormFields("contact");

  return (
    <PageShell>
      <PageSchema path={"/start"} />
      <ContactPageContent fields={fields} />
    </PageShell>
  );
}

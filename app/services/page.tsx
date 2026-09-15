import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/services", {
    title: "Services | ARQQA",
    description: "Eight integrated verticals. One unified system. Marketing Strategy & Digital Assessment, Brand Strategy & Positioning, The Catalyst System™, Web & App Development, Social Media Management, Social Media Video Production, Performance Marketing & App Growth, and CRM, Automation & AI Solutions, engineered to compound each other.",
  });
}

export default function ServicesPage() {
  return (
    <PageShell>
      <PageSchema path={"/services"} />
      <ServicesPageContent />
    </PageShell>
  );
}

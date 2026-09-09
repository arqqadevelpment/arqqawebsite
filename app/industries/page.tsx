import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { IndustriesPageContent } from "@/components/industries/IndustriesPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/industries", {
    title: "Industries | ARQQA",
    description: "Proven operational models across five high-growth sectors in the MENA region: fintech, airlines, technology, retail, and telco.",
  });
}

export default function IndustriesPage() {
  return (
    <PageShell>
      <IndustriesPageContent />
    </PageShell>
  );
}

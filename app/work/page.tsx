import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/work", {
    title: "Work | ARQQA",
    description: "Outcomes, not portfolios. Every ARQQA project measured in business impact. Filter by industry, market, or service.",
  });
}

export default function WorkPage() {
  return (
    <PageShell>
      <PortfolioPageContent />
    </PageShell>
  );
}

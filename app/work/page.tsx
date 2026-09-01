import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Work — ARQQA",
  description:
    "Outcomes, not portfolios. Every ARQQA project measured in business impact — filter by industry, market, or service.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <PortfolioPageContent />
    </PageShell>
  );
}

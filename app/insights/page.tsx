import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/insights", {
    title: "Insights | ARQQA",
    description: "Frameworks, case breakdowns, and contrarian insights from 13 years of building growth systems across MENA.",
  });
}

export default function InsightsPage() {
  return (
    <PageShell>
      <PageSchema path={"/insights"} />
      <InsightsPageContent />
    </PageShell>
  );
}

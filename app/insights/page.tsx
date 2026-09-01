import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";

export const metadata: Metadata = {
  title: "Insights — ARQQA",
  description:
    "Frameworks, case breakdowns, and contrarian insights from 13 years of building growth systems across MENA.",
};

export default function InsightsPage() {
  return (
    <PageShell>
      <InsightsPageContent />
    </PageShell>
  );
}

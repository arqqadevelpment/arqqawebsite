import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { IndustriesPageContent } from "@/components/industries/IndustriesPageContent";

export const metadata: Metadata = {
  title: "Industries — ARQQA",
  description:
    "Proven operational models across five high-growth sectors in the MENA region — fintech, airlines, technology, retail, and telco.",
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <IndustriesPageContent />
    </PageShell>
  );
}

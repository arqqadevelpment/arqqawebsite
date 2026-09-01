import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — ARQQA",
  description:
    "Founded in Cairo, forged under pressure. ARQQA is a MarTech Growth System: 13 years, 4 markets, 50+ specialists, one integrated engine.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutContent />
    </PageShell>
  );
}

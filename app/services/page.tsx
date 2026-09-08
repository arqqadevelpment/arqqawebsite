import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services — ARQQA",
  description:
    "Eight integrated verticals. One unified system. Marketing Strategy & Digital Assessment, Brand Strategy & Positioning, The Catalyst System™, Web & App Development, Social Media Management, Social Media Video Production, Performance Marketing & App Growth, and CRM, Automation & AI Solutions — engineered to compound each other.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesPageContent />
    </PageShell>
  );
}

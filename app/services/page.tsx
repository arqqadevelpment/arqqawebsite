import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services — ARQQA",
  description:
    "Six integrated verticals. One unified system. Strategy, Asset Building, The Catalyst System™, Technology, Community Management, and Social Media Video Production — engineered to compound each other.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesPageContent />
    </PageShell>
  );
}

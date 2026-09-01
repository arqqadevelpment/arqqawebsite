import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CatalystSystemPageContent } from "@/components/catalyst-system/CatalystSystemPageContent";

export const metadata: Metadata = {
  title: "The Catalyst System™ — ARQQA",
  description:
    "One partner. One strategy. Infinite growth. The Catalyst System™ is ARQQA's proprietary engine that guarantees synergy between social media, performance campaigns, and digital operations.",
};

export default function CatalystSystemPage() {
  return (
    <PageShell variant="catalyst">
      <CatalystSystemPageContent />
    </PageShell>
  );
}

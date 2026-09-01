import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/hero/HeroSection";
import { FactsSection } from "@/components/facts/FactsSection";
import { FolkloreSection } from "@/components/folklore/FolkloreSection";
import { CatalystSection } from "@/components/catalyst/CatalystSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ShiftSection } from "@/components/shift/ShiftSection";
import { TrustSection } from "@/components/trust/TrustSection";
import { ClosingSection } from "@/components/closing/ClosingSection";

export default function Home() {
  return (
    <PageShell
      variant="home"
      above={<HeroSection />}
      seam
    >
      <FactsSection />
      <FolkloreSection />
      <CatalystSection />
      <ProofSection />
      <ServicesSection />
      <ShiftSection />
      <TrustSection />
      <ClosingSection />
    </PageShell>
  );
}

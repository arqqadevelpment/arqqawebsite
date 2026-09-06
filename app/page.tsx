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

/**
 * Section order below the hero, per the 2026-09-06 homepage feedback:
 * By the Numbers -> The Catalyst System(tm) -> Service Ecosystem ->
 * Trust Signals -> Myth vs. Fact -> From Agency to System.
 *
 * Two sections outside that list keep their prior positions: Proof
 * ("Numbers That Speak") wasn't named in the requested order, so it's kept
 * — placed after the named seven rather than dropped — and Closing stays
 * last as the page's closing CTA, as it did before this reorder.
 */
export default function Home() {
  return (
    <PageShell
      variant="home"
      above={<HeroSection />}
      seam
    >
      <FactsSection />
      <CatalystSection />
      <ServicesSection />
      <TrustSection />
      <FolkloreSection />
      <ShiftSection />
      <ProofSection />
      <ClosingSection />
    </PageShell>
  );
}

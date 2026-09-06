import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/hero/HeroSection";
import { FactsSection } from "@/components/facts/FactsSection";
import { FolkloreSection } from "@/components/folklore/FolkloreSection";
import { CatalystSection } from "@/components/catalyst/CatalystSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ShiftSection } from "@/components/shift/ShiftSection";
import { TrustSignalsSection } from "@/components/trust/TrustSignalsSection";
import { TestimonialsSection } from "@/components/trust/TestimonialsSection";
import { ClosingSection } from "@/components/closing/ClosingSection";

/**
 * Section order below the hero, per the 2026-09-06 homepage feedback (as
 * refined the same day): By the Numbers -> The Catalyst System(tm) ->
 * Service Ecosystem -> Trust Signals -> Numbers That Speak -> Myth vs. Fact ->
 * From Agency to System -> Testimonials.
 *
 * Trust Signals and Testimonials used to be two halves of one component
 * (TrustSection) — split into TrustSignalsSection and TestimonialsSection so
 * each could be positioned independently, since the two needed to land in
 * different parts of the page rather than staying adjacent.
 *
 * Closing (the dual-CTA fork) stays last, as it did before this reorder —
 * it wasn't named in the requested order and is kept as the page's closer.
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
      <TrustSignalsSection />
      <ProofSection />
      <FolkloreSection />
      <ShiftSection />
      <TestimonialsSection />
      <ClosingSection />
    </PageShell>
  );
}

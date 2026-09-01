import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { TestimonialsPageContent } from "@/components/testimonials/TestimonialsPageContent";

export const metadata: Metadata = {
  title: "Testimonials — ARQQA",
  description:
    "What clients say about working inside one accountable growth system — 13 years, four MENA markets, 100+ brands.",
};

export default function TestimonialsPage() {
  return (
    <PageShell>
      <TestimonialsPageContent />
    </PageShell>
  );
}

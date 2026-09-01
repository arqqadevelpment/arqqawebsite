import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CareerPageContent } from "@/components/career/CareerPageContent";

export const metadata: Metadata = {
  title: "Careers — ARQQA",
  description:
    "Open roles at ARQQA. 50+ in-house specialists across marketing, sales, and design — building growth systems across MENA from Cairo.",
};

export default function CareerPage() {
  return (
    <PageShell>
      <CareerPageContent />
    </PageShell>
  );
}

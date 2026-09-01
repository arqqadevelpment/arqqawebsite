import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Start — ARQQA",
  description:
    "Two ways to start with ARQQA. Book a strategy call if you're ready to move, or download the Growth System Audit if you're still exploring.",
};

export default function StartPage() {
  return (
    <PageShell>
      <ContactPageContent />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AutonomousPageContent } from "@/components/autonomous/AutonomousPageContent";

export const metadata: Metadata = {
  title: "Autonomous — ARQQA",
  description:
    "Four AI agents inside every inbox and comment section your customers already use. Live in a day.",
};

export default function AutonomousPage() {
  return (
    <PageShell>
      <AutonomousPageContent />
    </PageShell>
  );
}

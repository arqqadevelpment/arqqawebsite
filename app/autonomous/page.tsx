import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { AutonomousPageContent } from "@/components/autonomous/AutonomousPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/autonomous", {
    title: "Autonomous | ARQQA",
    description: "Four AI agents inside every inbox and comment section your customers already use. Live in a day.",
  });
}

export default function AutonomousPage() {
  return (
    <PageShell>
      <PageSchema path={"/autonomous"} />
      <AutonomousPageContent />
    </PageShell>
  );
}

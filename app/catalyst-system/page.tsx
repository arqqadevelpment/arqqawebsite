import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { CatalystSystemPageContent } from "@/components/catalyst-system/CatalystSystemPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/catalyst-system", {
    title: "The Catalyst System™ | ARQQA",
    description: "One partner. One strategy. Infinite growth. The Catalyst System™ is ARQQA's proprietary engine that guarantees synergy between social media, performance campaigns, and digital operations.",
  });
}

export default function CatalystSystemPage() {
  return (
    <PageShell variant="catalyst">
      <PageSchema path={"/catalyst-system"} />
      <CatalystSystemPageContent />
    </PageShell>
  );
}

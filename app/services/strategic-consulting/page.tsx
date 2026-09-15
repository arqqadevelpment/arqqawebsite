import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { GrowthStepPageContent } from "@/components/services/GrowthStepPageContent";
import { getGrowthStep } from "@/components/services/growth-steps-data";

/* A static segment takes precedence over the dynamic /services/[slug] route,
   so this Growth Ecosystem step page replaces the generic service template
   at the same URL. */

const SLUG = "strategic-consulting";

export async function generateMetadata(): Promise<Metadata> {
  const step = getGrowthStep(SLUG);
  return getPageSeo(`/services/${SLUG}`, {
    title: `${step?.title ?? "Strategic Consulting"} | ARQQA`,
    description: step?.heroSub ?? "ARQQA growth ecosystem step.",
  });
}

export default function StrategicConsultingPage() {
  const step = getGrowthStep(SLUG);
  if (!step) notFound();

  return (
    <PageShell>
      <PageSchema path={`/services/${SLUG}`} />
      <GrowthStepPageContent step={step} />
    </PageShell>
  );
}

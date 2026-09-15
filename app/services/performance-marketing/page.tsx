import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { GrowthStepPageContent } from "@/components/services/GrowthStepPageContent";
import { getGrowthStep } from "@/components/services/growth-steps-data";

/* A static segment takes precedence over the dynamic /services/[slug] route,
   so this Growth Ecosystem step page replaces the generic service template
   at the same URL. Not to be confused with the dedicated, ad-traffic
   Performance Marketing landing page at
   /services/performance-marketing-app-growth — that one is a standalone
   conversion page outside this structure; this one is Step 4 of the Growth
   Ecosystem, covering every performance-marketing sub-service in full. */

const SLUG = "performance-marketing";

export async function generateMetadata(): Promise<Metadata> {
  const step = getGrowthStep(SLUG);
  return getPageSeo(`/services/${SLUG}`, {
    title: `${step?.title ?? "Performance Marketing"} | ARQQA`,
    description: step?.heroSub ?? "ARQQA growth ecosystem step.",
  });
}

export default function PerformanceMarketingStepPage() {
  const step = getGrowthStep(SLUG);
  if (!step) notFound();

  return (
    <PageShell>
      <PageSchema path={`/services/${SLUG}`} />
      <GrowthStepPageContent step={step} />
    </PageShell>
  );
}

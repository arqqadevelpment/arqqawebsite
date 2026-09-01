import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudyPageContent } from "@/components/case-studies/CaseStudyPageContent";
import {
  PERFORMANCE_CASE_STUDIES,
  getCaseStudy,
} from "@/components/case-studies/case-study-data";

/* Pre-render every case study at build time */
export function generateStaticParams() {
  return PERFORMANCE_CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study — ARQQA" };

  return {
    title: `${study.client} — ${study.category} | ARQQA`,
    description: study.heroSub,
  };
}

export default async function PerformanceCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <PageShell>
      <CaseStudyPageContent study={study} />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudyTemplate } from "@/components/portfolio/CaseStudyTemplate";
import { CASE_STUDIES, getCaseStudy } from "@/components/portfolio/portfolio-data";

/* Pre-render every case study at build time */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return { title: "Case Study — ARQQA" };

  return {
    title: `${caseStudy.client} — ARQQA`,
    description: caseStudy.heroLine,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <PageShell>
      <CaseStudyTemplate caseStudy={caseStudy} />
    </PageShell>
  );
}

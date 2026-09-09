import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
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
  if (!caseStudy) return { title: "Case Study | ARQQA" };

  return getPageSeo(`/work/${slug}`, {
    title: `${caseStudy.client} | ARQQA`,
    description: caseStudy.heroLine,
  });
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
      <PageSchema path={`/work/${slug}`} />
      <CaseStudyTemplate caseStudy={caseStudy} />
    </PageShell>
  );
}

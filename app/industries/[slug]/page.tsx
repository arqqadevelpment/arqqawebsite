import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { IndustryPageTemplate } from "@/components/industries/IndustryPageTemplate";
import { INDUSTRIES, getIndustry } from "@/components/industries/industries-data";

/* Pre-render every industry page at build time */
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry — ARQQA" };

  return {
    title: `${industry.name} — ARQQA`,
    description: industry.heroHeadline,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <PageShell>
      <IndustryPageTemplate industry={industry} />
    </PageShell>
  );
}

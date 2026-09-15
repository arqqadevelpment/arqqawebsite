import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { JobPageContent } from "@/components/career/JobPageContent";
import { JOBS, getJob } from "@/components/career/career-data";

/* Pre-render every open role at build time */
export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Careers | ARQQA" };

  return getPageSeo(`/career/${slug}`, {
    title: `${job.title} | Careers at ARQQA`,
    description: job.intro,
  });
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <PageShell>
      <PageSchema path={`/career/${slug}`} />
      <JobPageContent job={job} />
    </PageShell>
  );
}

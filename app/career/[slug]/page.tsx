import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
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
  if (!job) return { title: "Careers — ARQQA" };

  return {
    title: `${job.title} — Careers at ARQQA`,
    description: job.intro,
  };
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
      <JobPageContent job={job} />
    </PageShell>
  );
}

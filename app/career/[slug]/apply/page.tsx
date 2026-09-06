import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JobApplyPageContent } from "@/components/career/JobApplyPageContent";
import { JOBS, getJob } from "@/components/career/career-data";

/* Pre-render an apply page for every open role at build time */
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
  if (!job) return { title: "Apply — Careers at ARQQA" };

  return {
    title: `Apply — ${job.title} — Careers at ARQQA`,
    description: `Apply for the ${job.title} role at ARQQA.`,
  };
}

export default async function JobApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <PageShell>
      <JobApplyPageContent job={job} />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ShowcaseTemplate } from "@/components/showcase/ShowcaseTemplate";
import {
  SHOWCASE_PROJECTS,
  getShowcaseProject,
} from "@/components/showcase/showcase-data";

/* Pre-render every project page at build time */
export function generateStaticParams() {
  return SHOWCASE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getShowcaseProject(slug);
  if (!project) return { title: "Our Work — ARQQA" };

  return {
    title: `${project.title} — ARQQA`,
    description: project.intro,
  };
}

export default async function ShowcaseProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getShowcaseProject(slug);
  if (!project) notFound();

  return (
    <PageShell>
      <ShowcaseTemplate project={project} />
    </PageShell>
  );
}

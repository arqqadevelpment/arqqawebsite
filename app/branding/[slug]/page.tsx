import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ShowcaseTemplate } from "@/components/showcase/ShowcaseTemplate";
import { BRANDING_PROJECTS, getBrandingProject } from "@/components/branding/branding-data";

/* Pre-render every project page at build time */
export function generateStaticParams() {
  return BRANDING_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getBrandingProject(slug);
  if (!project) return { title: "Our Work — ARQQA" };

  return {
    title: `${project.title} — ARQQA`,
    description: project.intro,
  };
}

export default async function BrandingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getBrandingProject(slug);
  if (!project) notFound();

  const next = getBrandingProject(project.next);

  return (
    <PageShell>
      <ShowcaseTemplate project={project} basePath="/branding" nextProject={next} />
    </PageShell>
  );
}

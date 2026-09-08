import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ShowcaseTemplate } from "@/components/showcase/ShowcaseTemplate";
import { SOCIAL_PROJECTS, getSocialProject } from "@/components/social/social-data";

/* Pre-render every project page at build time */
export function generateStaticParams() {
  return SOCIAL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getSocialProject(slug);
  if (!project) return { title: "Our Work | ARQQA" };

  return {
    title: `${project.title} | ARQQA`,
    description: project.intro,
  };
}

export default async function SocialProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSocialProject(slug);
  if (!project) notFound();

  const next = getSocialProject(project.next);

  return (
    <PageShell>
      <ShowcaseTemplate project={project} basePath="/social" nextProject={next} />
    </PageShell>
  );
}

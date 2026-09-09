import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { VideoPageContent } from "@/components/videos/VideoPageContent";
import { VIDEO_PROJECTS, getVideoProject } from "@/components/videos/video-data";

/* Pre-render every video page at build time */
export function generateStaticParams() {
  return VIDEO_PROJECTS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getVideoProject(slug);
  if (!project) return { title: "Our Work — ARQQA" };

  return getPageSeo(`/videos/${slug}`, {
    title: `${project.title} — ARQQA`,
    description: project.subtitle,
  });
}

export default async function VideoProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getVideoProject(slug);
  if (!project) notFound();

  return (
    <PageShell>
      <VideoPageContent project={project} />
    </PageShell>
  );
}

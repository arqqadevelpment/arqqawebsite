import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ApproachPageTemplate } from "@/components/services/ApproachPageTemplate";
import { WebsiteDevPageContent } from "@/components/services/WebsiteDevPageContent";
import { APPROACH_PAGES, getApproachPage } from "@/components/services/approach-pages-data";

/* Pre-render every approach sub-page at build time */
export function generateStaticParams() {
  return APPROACH_PAGES.map((p) => ({ slug: p.parentSlug, subslug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}): Promise<Metadata> {
  const { slug, subslug } = await params;
  const page = getApproachPage(slug, subslug);
  if (!page) return { title: "Service — ARQQA" };

  return {
    title: `${page.title} — ARQQA`,
    description: page.intro,
  };
}

export default async function ApproachSubPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;
  const page = getApproachPage(slug, subslug);
  if (!page) notFound();

  return (
    <PageShell>
      {slug === "technology" && subslug === "website" ? (
        <WebsiteDevPageContent page={page} />
      ) : (
        <ApproachPageTemplate page={page} />
      )}
    </PageShell>
  );
}

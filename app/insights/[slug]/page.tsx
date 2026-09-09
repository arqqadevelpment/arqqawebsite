import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { ArticleTemplate } from "@/components/insights/ArticleTemplate";
import { ARTICLES, getArticle } from "@/components/insights/insights-data";

/* Pre-render every article at build time */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Insights | ARQQA" };

  return getPageSeo(`/insights/${slug}`, {
    title: `${article.title} | ARQQA`,
    description: article.excerpt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <PageShell>
      <PageSchema path={`/insights/${slug}`} />
      <ArticleTemplate article={article} />
    </PageShell>
  );
}

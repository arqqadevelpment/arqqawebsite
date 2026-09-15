import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageSchema } from "@/components/seo/PageSchema";
import { ArticleTemplate } from "@/components/insights/ArticleTemplate";
import { ARTICLES, categorySlug, getArticle, getArticleUrl } from "@/components/insights/insights-data";

/* Pre-render every article at build time, at its category-prefixed URL */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ category: categorySlug(a.category), slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || categorySlug(article.category) !== category) return { title: "Insights | ARQQA" };

  return getPageSeo(getArticleUrl(article), {
    title: `${article.title} | ARQQA`,
    description: article.excerpt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || categorySlug(article.category) !== category) notFound();

  return (
    <PageShell>
      <PageSchema path={getArticleUrl(article)} />
      <ArticleTemplate article={article} />
    </PageShell>
  );
}

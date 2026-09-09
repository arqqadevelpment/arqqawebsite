import type { Metadata } from "next";
import { getPageSeo } from "@/lib/content/seo";
import { PageShell } from "@/components/layout/PageShell";
import { CareerPageContent } from "@/components/career/CareerPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("/career", {
    title: "Careers | ARQQA",
    description: "Open roles at ARQQA. 50+ in-house specialists across marketing, sales, and design, building growth systems across MENA from Cairo.",
  });
}

export default function CareerPage() {
  return (
    <PageShell>
      <CareerPageContent />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { CatalystSystemPageContent } from "@/components/catalyst-system/CatalystSystemPageContent";
import { SERVICES, getService } from "@/components/services/service-data";

/* Pre-render every service page at build time */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — ARQQA" };

  if (slug === "catalyst-system") {
    return {
      title: "The Catalyst System™ — ARQQA",
      description:
        "One partner. One strategy. Infinite growth. The Catalyst System™ is ARQQA's proprietary engine that guarantees synergy between social media, performance campaigns, and digital operations.",
    };
  }

  return {
    title: `${service.title} — ARQQA`,
    description: service.positioning,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <PageShell>
      {slug === "catalyst-system" ? (
        <CatalystSystemPageContent />
      ) : (
        <ServicePageTemplate service={service} />
      )}
    </PageShell>
  );
}

import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PerformanceMarketingPageContent } from "@/components/services/PerformanceMarketingPageContent";
import { FAQS } from "@/components/services/performance-marketing-data";

/* A static segment takes precedence over the dynamic /services/[slug] route,
   so this landing page replaces the generic service template at the same URL. */

export const metadata: Metadata = {
  title: "Performance Marketing Agency | Proven Results Across MENA | ARQQA",
  description:
    "101M+ impressions served, 17,350+ leads generated. ARQQA runs performance marketing systems for brands across MENA. Get a free audit.",
};

/* FAQPage schema — Google rich results, which also feed Ads Quality Score. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PerformanceMarketingPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PerformanceMarketingPageContent />
    </PageShell>
  );
}

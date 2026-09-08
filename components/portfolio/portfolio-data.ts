/**
 * Single source of truth for the Portfolio hub (/work) and every case
 * study detail page (/work/<slug>). Structure is defined once here; the
 * hub and the template both read from it.
 */

export type CaseStudy = {
  /** URL slug — the page lives at /work/<slug> */
  slug: string;
  client: string;
  /** Filter tag shown on the hub and used by the filter tabs */
  industry: "Fintech" | "Airlines" | "E-commerce" | "Entertainment";
  market: string;
  services: string[];
  accent: "blue" | "orange";
  /** Big one-line result headline, e.g. "237x ROAS in 12 Months" */
  heroLine: string;
  /** Short card copy for the hub grid */
  summary: string;
  /** Headline metric shown on the hub card */
  metric: string;
  metricLabel: string;
  /** Revealed on hover behind the hub card */
  image: string;
  /** Client mark shown on the hub card; omitted where no logo file exists */
  logo?: string;
  /** Optical scale for logos whose source file carries heavy whitespace */
  logoScale?: number;
  /** Optional full-bleed background for this case study's hero banner */
  heroImage?: string;
  /** Optional supporting visual for the Challenge section */
  challengeImage?: string;
  /** Optional full-bleed background for the closing CTA section */
  ctaImage?: string;
  /** Optional full-bleed background for the Client Voice testimonial section */
  testimonialImage?: string;
  /** Extra campaign visuals shown side by side, right after Results. */
  extraVisuals?: string[];
  /** Full-width banner shown just above The Results section. */
  resultsBanner?: string;

  challenge: string;

  approach: {
    body: string;
    moves: string[];
  };

  execution: {
    channels: string[];
    creative: string;
    technology: string;
    timeline: string;
    team: string;
  };

  results: { value: string; label: string }[];

  testimonial: {
    quote: string;
    role: string;
  };

  /** Slugs of 2–3 related case studies */
  related: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fawry",
    client: "Fawry",
    industry: "Fintech",
    market: "Egypt",
    services: ["Performance Marketing", "App Growth", "ASO"],
    accent: "blue",
    heroLine: "6 Million Downloads. 1 Million Active Users. Zero Shortcuts.",
    summary:
      "Building MENA's first fintech super-app, mass adoption without a single vanity install.",
    metric: "6M",
    metricLabel: "App installs",
    image: "/portfolio/fawry.webp",
    logo: "/logos/clients/fawry.webp",
    heroImage: "/portfolio/fawry-hero.webp",
    challengeImage: "/portfolio/fawry-challenge.webp",
    ctaImage: "/portfolio/fawry-cta-bg.webp",
    testimonialImage: "/portfolio/fawry-testimonial.webp",
    extraVisuals: ["/portfolio/fawry-extra-01.webp", "/portfolio/fawry-extra-02.webp"],
    resultsBanner: "/portfolio/fawry-extra-banner.webp",
    challenge:
      "Fawry needed to transition from a payments infrastructure brand to a consumer-facing fintech app, in a market where digital financial literacy was still emerging. The goal: mass adoption. The constraint: every install had to be a real user, not a vanity metric.",
    approach: {
      body: "We activated the full Catalyst System™, with strategy setting the terms every later phase had to answer to.",
      moves: [
        "Audience segmentation by financial behavior, not demographics",
        "Performance campaigns built on CPA models with aggressive down-funnel optimization",
        "ASO deployed in parallel to capture organic intent",
        "Creative production localized, platform-native, refreshed on 2-week cycles",
      ],
    },
    execution: {
      channels: ["Meta", "Google UAC", "TikTok", "Apple Search Ads"],
      creative:
        "Platform-native vertical testimonials shot in Egyptian Arabic, rebriefed every sprint against install-quality data rather than impressions.",
      technology:
        "MMP integration with fraud-filtered attribution, so spend only ever chased installs that converted to real financial activity.",
      timeline: "6-month phased rollout, from segmentation to national scale.",
      team: "A dedicated performance pod paired with a creative strike team on a 2-week refresh cycle.",
    },
    results: [
      { value: "6M+", label: "App installs across iOS and Android" },
      { value: "1M", label: "Monthly active users within 18 months" },
      { value: "100K", label: "Organic installs through ASO alone" },
      { value: "#1", label: "First fintech app in MENA by install volume" },
    ],
    testimonial: {
      quote:
        "ARQQA treated every install like it had to earn its place. That discipline is the only reason we can say our growth is real.",
      role: "Head of Growth, Fawry",
    },
    related: [],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getRelatedCaseStudies(slugs: string[]) {
  return slugs
    .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));
}

/* Three sources feed the one grid:
     "Web Design"  → components/showcase/showcase-data.ts   (/our-work/…)
     "Performance" → components/case-studies/case-study-data.ts (/case-studies/…)
     everything else → CASE_STUDIES below                    (/work/…)
   Merova appears twice on purpose, once for the Shopify build and once for
   the Meta performance program. They are separate engagements with separate
   pages, and the category label on each card tells them apart. */
export const INDUSTRY_FILTERS = [
  "All",
  "Web Design",
  "Performance",
  "Video & Animation",
  "Branding",
  "Social Media Production",
] as const;

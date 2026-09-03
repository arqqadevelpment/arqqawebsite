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
      "Building MENA's first fintech super-app — mass adoption without a single vanity install.",
    metric: "6M",
    metricLabel: "App installs",
    image: "/portfolio/fawry.webp",
    logo: "/logos/clients/fawry.webp",
    heroImage: "/portfolio/fawry-hero.webp",
    challengeImage: "/portfolio/fawry-challenge.webp",
    ctaImage: "/portfolio/fawry-cta-bg.webp",
    testimonialImage: "/portfolio/fawry-testimonial.webp",
    challenge:
      "Fawry needed to transition from a payments infrastructure brand to a consumer-facing fintech app — in a market where digital financial literacy was still emerging. The goal: mass adoption. The constraint: every install had to be a real user, not a vanity metric.",
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
    related: ["nile-air", "kenzup"],
  },
  {
    slug: "nile-air",
    client: "Nile Air",
    industry: "Airlines",
    market: "KSA",
    services: ["Strategy & Consulting", "Technology", "Performance Marketing"],
    accent: "orange",
    heroLine: "237x ROAS in 12 Months",
    summary:
      "A repositioning audit and a conversion-first booking rebuild turned a leaking funnel into the airline's top revenue channel.",
    metric: "237x",
    metricLabel: "Return on ad spend",
    image: "/portfolio/nile-air.webp",
    logo: "/logos/clients/nile-air.webp",
    challenge:
      "Nile Air was bidding against itself across three separate agencies, with no unified measurement framework and a booking funnel that leaked at every step between search and confirmed ticket.",
    approach: {
      body: "Strategy came first and stayed the anchor: no media was consolidated and no line of code shipped until the blueprint was signed off.",
      moves: [
        "Repositioning audit consolidating spend across three agencies into one accountable system",
        "Amadeus platform integration wired directly into the booking flow",
        "Conversion-first booking rebuild, engineered before traffic was scaled",
        "Unified KPI framework so every channel reported into the same number",
      ],
    },
    execution: {
      channels: ["Google Search & Performance Max", "Meta", "Programmatic display"],
      creative: "Route-specific dynamic creative, swapped by origin market and fare season.",
      technology:
        "Amadeus PSS integration, server-side event tracking, and a rebuilt booking flow holding a sub-2-second median load.",
      timeline: "4-month conversion rebuild, followed by an ongoing media retainer.",
      team: "A strategy lead, a technology squad, and a dedicated media buying team.",
    },
    results: [
      { value: "237x", label: "Return on ad spend achieved" },
      { value: "83M", label: "SAR digital revenue unlocked" },
      { value: "350K", label: "SAR total spend behind it" },
      { value: "<2s", label: "Median booking-flow load time" },
    ],
    testimonial: {
      quote:
        "We were paying three agencies to compete with each other. ARQQA gave us one system and one number to trust.",
      role: "Director of Digital, Nile Air",
    },
    related: ["fawry", "kenzup"],
  },
  {
    slug: "kenzup",
    client: "Kenz'Up",
    industry: "E-commerce",
    market: "Morocco",
    services: ["Asset Building", "Technology", "App Growth"],
    accent: "blue",
    heroLine: "25% Registration Conversion. 5M+ Installs.",
    summary:
      "A full identity and onboarding rebuild turned a leaking registration funnel into the marketplace's strongest growth lever.",
    metric: "25%",
    metricLabel: "Registration conversion",
    image: "/portfolio/kenzup.webp",
    logo: "/logos/clients/kenzup.webp",
    challenge:
      "Kenz'Up needed to launch a new marketplace app into a crowded category with no brand recognition — and an onboarding flow that lost seven in ten users before registration ever completed.",
    approach: {
      body: "Identity and product were rebuilt together, so the brand people met in an ad was the same one they met inside the app.",
      moves: [
        "Full identity system built for recognition, not decoration",
        "Onboarding UX rebuilt around the registration event, not the download",
        "Localized Darija content calendar mapped to acquisition channels",
        "Influencer seeding paired with performance media at launch",
      ],
    },
    execution: {
      channels: ["Meta", "TikTok", "Google UAC", "Influencer seeding"],
      creative: "Onboarding motion assets and localized Darija copy, tested against drop-off data, not opinion.",
      technology: "Full onboarding UX rebuild with event tracking wired to every step of registration.",
      timeline: "8 weeks for the identity system, 6 weeks for the app rebuild, run in parallel.",
      team: "A brand pod and a UX/engineering pod sharing one weekly review.",
    },
    results: [
      { value: "25%", label: "Registration conversion, up from 7%" },
      { value: "5M+", label: "App installs" },
      { value: "3.5x", label: "Conversion lift after rebuild" },
      { value: "14 wks", label: "From kickoff to national launch" },
    ],
    testimonial: {
      quote:
        "Every previous agency treated our app like a media budget. ARQQA treated it like a product problem — and fixed it like one.",
      role: "Co-Founder, Kenz'Up",
    },
    related: ["fawry", "africa-music-initiative"],
  },
  {
    slug: "africa-music-initiative",
    client: "Africa Music Initiative",
    industry: "Entertainment",
    market: "UAE / Africa",
    services: ["Community Management", "Content", "Strategy & Consulting"],
    accent: "orange",
    heroLine: "52 Countries. Zero Unresolved Escalations.",
    summary:
      "A pan-continental submissions campaign run as customer-experience operations, not posting.",
    metric: "52",
    metricLabel: "Countries engaged",
    image: "/portfolio/africa-music-initiative.webp",
    challenge:
      "Africa Music Initiative needed to run a submissions campaign across 52 countries with no existing listening infrastructure and no escalation path — a single mishandled complaint could have compromised the entire continent-wide launch.",
    approach: {
      body: "Community was run as a customer-experience channel with SLAs and an escalation ladder, not a content calendar.",
      moves: [
        "Listening setup configured across every relevant regional platform",
        "Response framework with tone guidelines and SLA tiers by message type",
        "Multi-language content calendar mapped to submission deadlines",
        "Crisis protocol rehearsed before the campaign went live in a single market",
      ],
    },
    execution: {
      channels: ["Instagram", "Facebook", "WhatsApp community groups", "X"],
      creative: "A multi-language content calendar sequenced against submission deadlines across all 52 markets.",
      technology: "Social listening and sentiment tracking routed straight into a ticketing queue with tiered SLAs.",
      timeline: "2-week rapid deployment, then a 6-month campaign run.",
      team: "A community operations pod backed by regional-language moderators.",
    },
    results: [
      { value: "52", label: "Countries engaged" },
      { value: "50K", label: "Artist submissions" },
      { value: "120K", label: "Campaign visits" },
      { value: "0", label: "Unresolved escalations" },
    ],
    testimonial: {
      quote:
        "Fifty-two countries is fifty-two ways for a campaign to go wrong in public. ARQQA made sure none of them did.",
      role: "Campaign Director, Africa Music Initiative",
    },
    related: ["fawry", "nile-air"],
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
   Merova appears twice on purpose — once for the Shopify build and once for
   the Meta performance program. They are separate engagements with separate
   pages, and the category label on each card tells them apart. */
export const INDUSTRY_FILTERS = [
  "All",
  "Web Design",
  "Performance",
  "Fintech",
  "Airlines",
  "E-commerce",
  "Entertainment",
] as const;

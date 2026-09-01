/**
 * Single source of truth for the Industries hub (/industries) and every
 * industry landing page (/industries/<slug>). Structure is defined once
 * here; the hub and the template both read from it.
 */

export type Industry = {
  /** URL slug — the page lives at /industries/<slug> */
  slug: string;
  name: string;
  accent: "blue" | "orange";
  /** Industry-specific hero headline */
  heroHeadline: string;
  /** Credibility stat shown under the hero headline */
  credibilityStat: { value: string; label: string };
  /** Card copy on the industries hub */
  summary: string;

  problem: {
    heading: string;
    body: string;
  };

  approach: {
    body: string;
    moves: string[];
  };

  featuredCaseStudy: {
    client: string;
    market: string;
    result: string;
    body: string;
    /** Slug of a matching /work case study, when one exists */
    workSlug?: string;
  };

  services: string[];

  /** Nurture CTA label — the lead magnet named in the brief */
  playbook: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "fintech",
    name: "Fintech & Banking",
    accent: "blue",
    heroHeadline: "The trust economy runs on proof, not promises.",
    credibilityStat: { value: "6M+", label: "installs shipped for MENA's first fintech super-app" },
    summary:
      "App growth. CPA optimization. Regulatory-aware creative. From Fawry to financial services across MENA.",
    problem: {
      heading: "Fintech growth dies in the compliance review, not the ad account.",
      body: "Every creative line has to clear legal before it clears media. Most agencies design campaigns first and negotiate compliance after — burning weeks and budget on assets that never launch. In a category where trust is the product, a rejected ad isn't a delay, it's a missed adoption window.",
    },
    approach: {
      body: "We build the compliance frame into the brief before a single asset is produced, so creative and legal move in parallel instead of in sequence.",
      moves: [
        "Regulatory-aware creative frameworks signed off before production starts",
        "CPA models built on financial-behavior segments, not broad demographics",
        "ASO and paid running in parallel to capture both intent and discovery",
        "Fraud-filtered attribution so spend only chases installs that convert to real activity",
      ],
    },
    featuredCaseStudy: {
      client: "Fawry",
      market: "Egypt — Fintech",
      result: "6M+ installs, 1M active users within 18 months",
      body: "Fawry needed mass adoption without a single vanity install. Audience segmentation by financial behavior — not demographics — plus fraud-filtered attribution turned installs into MENA's first fintech super-app by volume.",
      workSlug: "fawry",
    },
    services: ["Performance Marketing", "App Growth", "ASO", "Regulatory-Aware Creative"],
    playbook: "The Fintech Growth Playbook: From Install to Active User",
  },
  {
    slug: "airlines",
    name: "Airlines & Travel",
    accent: "orange",
    heroHeadline: "Every empty seat is a media plan that failed.",
    credibilityStat: { value: "237x", label: "ROAS delivered on a route-level booking rebuild" },
    summary:
      "Route-level performance. Amadeus integration. Dynamic budget allocation by seat availability. Booking-direct strategy.",
    problem: {
      heading: "Airline media is bought by market. It should be bought by route.",
      body: "Most carriers run one national campaign across routes with wildly different demand curves, load factors, and booking windows. Budget gets spread evenly across a business that isn't even. The result: high-demand routes are under-fed and low-demand routes waste spend that will never convert.",
    },
    approach: {
      body: "Media follows the booking system, not the other way around — every route gets its own budget curve, driven by live seat availability.",
      moves: [
        "Amadeus PSS integration wired directly into the booking flow and reporting",
        "Dynamic budget allocation by route, season, and seat availability",
        "Booking-direct strategy that reduces dependency on OTA commission",
        "Conversion-first funnel engineering before traffic is ever scaled",
      ],
    },
    featuredCaseStudy: {
      client: "Nile Air",
      market: "KSA — Airlines",
      result: "237x ROAS, 83M SAR digital revenue on 350K SAR spend",
      body: "Nile Air was bidding against itself across three agencies with no unified measurement. Consolidating strategy and rebuilding the booking flow around conversion — not just traffic — turned digital into the airline's top revenue channel.",
      workSlug: "nile-air",
    },
    services: ["Strategy & Consulting", "Technology", "Performance Marketing", "Amadeus Integration"],
    playbook: "Digital Revenue for Airlines: The Attribution Framework",
  },
  {
    slug: "technology",
    name: "Technology & SaaS",
    accent: "blue",
    heroHeadline: "B2B buyers are three demos deep before your ad ever mattered.",
    credibilityStat: { value: "4x", label: "pipeline velocity from event-led demand generation" },
    summary:
      "Product launches. B2B demand generation. Event marketing. Cloud and enterprise positioning across GCC.",
    problem: {
      heading: "Enterprise buyers don't click ads. They ask their network.",
      body: "B2B and cloud positioning in the GCC still gets executed like consumer performance marketing — reach and frequency, no account targeting, no event motion. Long sales cycles get shorter demand-gen budgets, and the launch moment that should build category trust gets treated like a product announcement instead of a pipeline event.",
    },
    approach: {
      body: "Every launch is built as a pipeline motion first, an announcement second — so the campaign still has a job to do after the first week.",
      moves: [
        "Account-based targeting layered under broader category awareness",
        "Event marketing sequenced with paid and content, not run in isolation",
        "Cloud and enterprise positioning built around GCC-specific buying committees",
        "Demand-gen reporting tied to sales-qualified pipeline, not impressions",
      ],
    },
    featuredCaseStudy: {
      client: "A regional cloud platform",
      market: "GCC — Enterprise Technology",
      result: "4x qualified pipeline within one launch quarter",
      body: "A regional SaaS platform's category launch was competing for attention against far larger global vendors. Sequencing event marketing with account-based paid media turned one launch quarter into 4x the qualified pipeline of the previous two combined.",
    },
    services: ["B2B Demand Generation", "Event Marketing", "Content Strategy", "Enterprise Positioning"],
    playbook: "The B2B Tech Launch Checklist",
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    accent: "orange",
    heroHeadline: "Traffic is cheap. A funnel that converts it isn't.",
    credibilityStat: { value: "25%", label: "registration conversion, up from 7%, after a funnel rebuild" },
    summary:
      "Shopify/Salla deployment. Full-funnel e-commerce campaigns. Social commerce integration. AOV optimization.",
    problem: {
      heading: "Most e-commerce budgets buy traffic for a store that leaks it.",
      body: "Retail brands scale acquisition spend against checkout flows, onboarding screens, and product pages that were never tested for drop-off. Social commerce gets bolted on as an afterthought instead of built into the funnel. Average order value stays flat because nothing downstream was engineered to lift it.",
    },
    approach: {
      body: "We fix the store before we scale the spend — platform, funnel, and AOV mechanics built to convert the traffic you're already paying for.",
      moves: [
        "Shopify or Salla deployment engineered around the conversion event",
        "Full-funnel campaigns spanning discovery, retargeting, and retention",
        "Social commerce integrated directly into the acquisition funnel",
        "AOV optimization through bundling, upsell logic, and checkout testing",
      ],
    },
    featuredCaseStudy: {
      client: "Kenz'Up",
      market: "Morocco — E-commerce",
      result: "25% registration conversion, 5M+ installs",
      body: "Kenz'Up's marketplace app lost seven in ten users before registration completed. Rebuilding the identity system and onboarding funnel together lifted registration conversion from 7% to 25%, without adding a dirham of acquisition spend.",
      workSlug: "kenzup",
    },
    services: ["Shopify & Salla", "Full-Funnel Campaigns", "Social Commerce", "AOV Optimization"],
    playbook: "The E-Commerce Growth Audit Template",
  },
  {
    slug: "telco",
    name: "Telco & Enterprise",
    accent: "blue",
    heroHeadline: "At carrier scale, a community strategy is a crisis strategy.",
    credibilityStat: { value: "52", label: "countries run as one coordinated community operation" },
    summary:
      "App store optimization. Carrier launches. Large-scale digital campaigns. Enterprise community management.",
    problem: {
      heading: "Telco launches are large-scale by default. Most community teams aren't.",
      body: "Carrier launches and large-scale digital campaigns generate a volume of public conversation that a standard social team was never built to handle. Without listening infrastructure and an escalation ladder, the loudest unresolved complaint becomes the story — at exactly the scale where that story travels fastest.",
    },
    approach: {
      body: "Community is run as operations at carrier scale — SLAs, escalation paths, and listening that feeds back into the next campaign cycle.",
      moves: [
        "App store optimization sequenced with the carrier launch calendar",
        "Large-scale digital campaigns backed by real-time listening infrastructure",
        "Enterprise community management with tiered response SLAs",
        "Rehearsed crisis protocol before any campaign goes live at scale",
      ],
    },
    featuredCaseStudy: {
      client: "Africa Music Initiative",
      market: "UAE / Africa",
      result: "52 countries engaged, zero unresolved escalations",
      body: "Running a pan-continental campaign across 52 countries with no existing listening infrastructure was a crisis risk by default. Treating community as customer-experience operations — not posting — delivered 50,000 submissions with zero unresolved escalations.",
      workSlug: "africa-music-initiative",
    },
    services: ["App Store Optimization", "Carrier Launches", "Community Management", "Crisis Protocol"],
    playbook: "Telco Digital Transformation: The First 90 Days",
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

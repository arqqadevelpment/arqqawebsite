/**
 * Performance case studies — one page each at /case-studies/<slug>.
 *
 * Content is taken from ARQQA_Performance_Case_Studies.docx and follows the
 * data policy stated in that document:
 *
 *   INCLUDED — growth percentages, efficiency ratios (ROAS, CTR, CPL, CPM),
 *   volume counts (leads, impressions, followers, campaigns, purchases), and
 *   the strategic narrative.
 *
 *   EXCLUDED — absolute ad spend, absolute revenue, and any figure that would
 *   let a competitor reverse-engineer a client's media budget or revenue.
 *
 * Where a source deck carried only absolute totals (GTS, Zenith Arabia AI,
 * Allure Clinics, Perfect Body) the page leads with ratios and volume counts
 * instead. Zenith's figures are explicitly projections, not completed
 * results, and are labelled as such on the page — the same accuracy issue
 * flagged on the Performance Marketing landing page.
 */

export type CaseStudyMove = {
  num?: string;
  title: string;
  body: string;
};

export type PerformanceCaseStudy = {
  slug: string;
  client: string;
  category: string;
  market: string;
  /** Flag emoji for the market pill */
  flag: string;
  service: string;
  logo?: string;
  /** Optical scale for logos whose source file carries heavy whitespace —
      the frame height is fixed, so a mark filling 28% of its frame renders
      far smaller than one filling 86%. */
  logoScale?: number;
  accent: "blue" | "violet" | "orange" | "teal" | "amber";

  heroHeadline: string;
  heroSub: string;

  challenge: string;

  approach: {
    intro?: string;
    moves: CaseStudyMove[];
    /** Force every phase onto a single row, scrolling if they do not fit.
        Off by default: the cards wrap into a grid. */
    oneRow?: boolean;
  };

  results: {
    intro?: string;
    metrics: { value: string; label: string }[];
    note?: string;
    /** True when the figures are forecasts rather than delivered results */
    projected?: boolean;
  };

  /** "The Takeaway" / "The Outcome" bullets, where the source has them */
  outcome?: { title: string; points: string[] };

  whatsNext?: string;

  /** How this case study shows up as a card on the /work hub. */
  card: {
    /** Short sector label for the card's footer pill */
    sector: string;
    /** Card copy — one line, the result in plain terms */
    summary: string;
    /** Revealed on hover behind the hub card */
    image?: string;
  };

  /** Slugs of related case studies */
  related: string[];
};

export const PERFORMANCE_CASE_STUDIES: PerformanceCaseStudy[] = [
  {
    slug: "everher",
    client: "Everher",
    category: "Beauty & Wellness · E-Commerce",
    market: "Egypt",
    flag: "🇪🇬",
    service: "Full-Funnel Performance Marketing",
    logo: "/logos/clients/everher.webp",
    accent: "orange",
    heroHeadline: "From a Struggling Brand to a Sold-Out Season.",
    heroSub:
      "A full-funnel transformation that took Everher from near-zero profitability to a consistently profitable, sold-out operation — without increasing spend.",
    challenge:
      "Everher entered the year with a fragmented paid social presence. Campaign structure was weak, brand positioning didn't match the product (a luxury aesthetic applied to an everyday wellness item), content relevance was low, and inventory sat stagnant despite heavy ad activity. The brand was burning budget with no sustainable growth path.",
    approach: {
      intro: "A 7-phase transformation, built in sequence so each phase compounded the last:",
      moves: [
        {
          num: "01",
          title: "Testing & Problem ID",
          body: "Comprehensive testing across creatives, messaging, and website surfaced the real issue: customers didn't understand the product, and brand perception was confused.",
        },
        {
          num: "02",
          title: "Creative & Messaging Transformation",
          body: "A complete creative overhaul, repositioning the brand from “luxury” to “accessible wellness” based on audience-first, data-driven insight.",
        },
        {
          num: "03",
          title: "Conversion Rate Optimization",
          body: "Data-driven landing page and UX optimization using behavioral analytics tools to fix the user journey.",
        },
        {
          num: "04",
          title: "Offers, Content & Scaling Foundation",
          body: "A UGC system for authentic social proof, strategic bundles, and a structured audience-testing framework.",
        },
        {
          num: "05",
          title: "Online + Offline Expansion",
          body: "Distributor activation created a multi-channel reinforcement loop between online and offline demand.",
        },
        {
          num: "06",
          title: "Aggressive Scaling",
          body: "Full-funnel optimization scaled the campaigns with the strongest proven return.",
        },
        {
          num: "07",
          title: "Influencer & PR Strategy",
          body: "Authentic beauty and wellness influencer partnerships plus a coordinated PR push built brand authority and accelerated sales velocity.",
        },
      ],
    },
    results: {
      metrics: [
        { value: "+105%", label: "Increase in ROAS" },
        { value: "-54%", label: "Reduction in ad spend, with revenue maintained" },
        { value: "+272%", label: "Peak conversion rate uplift" },
        { value: "100%", label: "Inventory sold out — complete sellout of previously stagnant stock" },
      ],
    },
    card: {
      sector: "Beauty & Wellness",
      summary:
        "+105% ROAS and a complete sellout of stagnant stock — a full-funnel rebuild that raised return while cutting spend.",
      image: "/portfolio/everher.webp",
    },
    related: ["merova", "perfect-body"],
  },

  {
    slug: "merova",
    client: "Merova",
    category: "Women's Fashion & Outfits",
    market: "Egypt",
    flag: "🇪🇬",
    service: "E-Commerce Growth — Meta Performance Marketing",
    logo: "/logos/clients/merova.webp",
    accent: "violet",
    heroHeadline: "Winning Winter — On Merova's Terms.",
    heroSub:
      "A premium Egyptian fashion brand held its ground against heavy seasonal discounting from competitors — and grew instead of retreating.",
    challenge:
      "Merova positions itself as a premium, Turkish-inspired fashion destination in the Egyptian market. Every winter, competitors flood the market with cheaper, high-volume collections that pressure both acquisition cost and perceived value. The objective: protect performance and maintain premium pricing without competing on discount depth alone.",
    approach: {
      moves: [
        {
          title: "Structured Testing Framework",
          body: "Every growth lever — platforms, campaign levels, product categories, individual SKUs, and creative angles — was isolated and tested before a single unit of budget was scaled.",
        },
        {
          title: "Evidence-Based Scaling",
          body: "Once winners were identified, budget and creative focus shifted decisively toward the highest-performing areas of the catalog. Campaign architecture was rebuilt leaner: fewer, stronger campaigns replaced fragmented testing sets.",
        },
        {
          title: "Retention Strategy",
          body: "As acquisition matured, focus expanded to customer lifetime value — building repeat-purchase behavior so the brand wasn't solely reliant on new-customer acquisition to absorb seasonal competitive pressure.",
        },
        {
          title: "Infrastructure Rebuild",
          body: "A structural tracking gap on the brand's original WordPress setup was inflating conversion numbers and distorting every optimization signal. Migrating to Shopify restored accurate attribution and gave the media team reliable data to scale on.",
        },
        {
          title: "Conversion Rate Optimization",
          body: "With accurate tracking in place, focus turned to the on-site experience — streamlined navigation, product presentation, and checkout flow, closing the gap between traffic and completed purchases.",
        },
        {
          title: "Offer Engineering",
          body: "Rather than defaulting to blanket discounts, offer mechanics were treated as a testable growth lever — bundle incentives and volume rewards were tested against a discount baseline, each measured on incremental margin impact, not just redemption volume.",
        },
        {
          title: "Brand Expansion",
          body: "A first-time mega-influencer collaboration introduced the brand to a significantly larger, more diverse audience — compounding trust and feeding both acquisition and retention.",
        },
      ],
    },
    results: {
      intro: "A month-over-month comparison against Merova's typical winter performance:",
      metrics: [
        { value: "~2x", label: "Monthly sales nearly doubled versus the brand's prior winter maximum" },
        { value: "3.5–4.0x", label: "Average ROAS sustained through the winter season" },
        { value: "Premium", label: "Pricing maintained throughout — no discount-depth compromise" },
      ],
      note: "These results were achieved against a backdrop of heavier competitor discounting and seasonal market saturation — validating the testing, tracking, and CRO investments made earlier in the engagement.",
    },
    whatsNext:
      "Continued scaling on the proven Meta foundation, expansion into Google Search & Shopping, a TikTok Ads launch, and broader channel diversification to reduce platform dependency.",
    card: {
      sector: "Fashion E-Commerce",
      summary:
        "Monthly sales nearly doubled and 3.5–4.0x ROAS held through peak season, without discounting on price.",
      image: "/portfolio/merova.webp",
    },
    related: ["everher", "perfect-body"],
  },

  {
    slug: "ntra",
    client: "NTRA",
    category: "Government & Public Sector",
    market: "Egypt",
    flag: "🇪🇬",
    service: "Social Media Growth — Meta Ads Program",
    logo: "/logos/clients/ntra.webp",
    accent: "blue",
    heroHeadline: "Scaling a National Regulator's Voice — 71.5% Follower Growth in Six Months.",
    heroSub:
      "Egypt's National Telecom Regulatory Authority needed to grow its digital voice for public-service messaging. ARQQA built an always-on, multi-objective Meta Ads program that nearly doubled its audience.",
    challenge:
      "NTRA is Egypt's official telecommunications regulator — protecting consumers, licensing operators, and communicating public policy directly to citizens. The brand had a large but under-engaged Facebook and Instagram audience, with limited reach for awareness campaigns and citizen-facing programs, including child-safety initiatives.",
    approach: {
      intro:
        "Rather than a single campaign, ARQQA ran a continuous portfolio across five months, each objective tuned and iterated as performance data came in:",
      moves: [
        {
          title: "Page Likes & Follows",
          body: "Recurring ‘new creative’ waves grew the Facebook fan base, including a dedicated Children Campaign track.",
        },
        {
          title: "Engagement",
          body: "High-volume post engagement campaigns amplified reach on owned content at very low cost per result.",
        },
        {
          title: "Instagram Profile Visits",
          body: "Targeted traffic campaigns drove qualified visits to NTRA's Instagram profile, building a second channel.",
        },
        {
          title: "Awareness & Telephony",
          body: "Reach and call-driving formats extended the toolkit for public-service and hotline messaging.",
        },
      ],
    },
    results: {
      intro: "Before and after — six months of sustained program activity:",
      metrics: [
        { value: "+71.5%", label: "Growth in total Facebook Page audience — from roughly 606K to over 1.03M followers" },
        { value: "7.37M", label: "Total Page engagements — reactions, comments, shares, saves, and clicks" },
        { value: "34.6M", label: "Impressions delivered across the program" },
        { value: "376,927", label: "New Facebook likes generated" },
        { value: "9,775", label: "New Instagram follows generated" },
      ],
      note: "The engagement layer was especially efficient: one single-day post-engagement campaign delivered over 300,000 results at a fraction of a cent per result — the clearest signal in the program for where budget worked hardest.",
    },
    card: {
      sector: "Government & Public Sector",
      summary:
        "+71.5% follower growth and 7.37M engagements in six months, scaling a national regulator's public voice.",
      image: "/portfolio/ntra.webp",
    },
    related: ["gts-holding", "zenith-arabia-ai"],
  },

  {
    slug: "allure-clinics",
    client: "Allure Clinics",
    category: "Healthcare",
    market: "Saudi Arabia",
    flag: "🇸🇦",
    service: "Paid Social — Lead Generation (Meta, TikTok, Snapchat)",
    logo: "/logos/clients/allure.webp",
    accent: "teal",
    heroHeadline: "Two Years. Three Platforms. One Repeatable Lead Engine.",
    heroSub:
      "A healthcare brand's paid social program grew from single-channel dependency into a diversified, always-on acquisition system across Meta, TikTok, and Snapchat.",
    challenge:
      "Before scaling with ARQQA, Allure Clinics faced two compounding problems. Lead flow was inconsistent across clinics and doctors, with heavy reliance on a single channel leaving the account exposed. Acquisition costs fluctuated widely between doctors and offers, with budget concentrated in a single, increasingly saturated auction — and no cross-platform benchmark to guide where spend worked hardest.",
    approach: {
      moves: [
        {
          title: "Multi-Platform Expansion",
          body: "Launched dedicated lead-generation programs on Snapchat and TikTok alongside Meta, spreading acquisition risk and unlocking new, lower-cost audiences.",
        },
        {
          title: "Doctor & Offer Segmentation",
          body: "Built individual campaigns per doctor and per seasonal offer, so budget and creative could be optimized independently rather than blended into one undifferentiated pool.",
        },
        {
          title: "Full-Funnel, Video-First Testing",
          body: "Ran video-view campaigns to build warm audience pools on TikTok and Snapchat, feeding cheaper, higher-intent traffic into the lead campaigns that followed.",
        },
      ],
    },
    results: {
      intro: "Two-year impact, combined across all three platforms:",
      metrics: [
        { value: "17,367+", label: "Total leads generated" },
        { value: "300+", label: "Active campaigns run simultaneously across Meta, TikTok, and Snapchat" },
        { value: "64.4M", label: "Total impressions delivered" },
      ],
      note: "Meta carried the largest share of volume, spanning lead generation and video views across every doctor and offer. Snapchat became the account's most cost-efficient lead channel, consistently posting the lowest cost-per-click of the three platforms. TikTok added the account's largest reach footprint through video-first content.",
    },
    outcome: {
      title: "The Takeaway",
      points: [
        "Diversified lead flow — no longer dependent on a single platform, with Meta, TikTok, and Snapchat each contributing a reliable share of leads.",
        "Scaled from a handful of campaigns to 300+ active campaigns across platforms while improving cost efficiency.",
        "Doctor-level and offer-level segmentation is now a proven, reusable framework for every new launch.",
        "Two years of cross-platform data now guide where every new unit of budget works hardest, by doctor, offer, and channel.",
      ],
    },
    card: {
      sector: "Healthcare",
      summary:
        "17,367+ leads across Meta, TikTok and Snapchat — single-channel dependency turned into a diversified engine.",
      image: "/portfolio/allure-clinics.webp",
    },
    related: ["everher", "perfect-body"],
  },

  {
    slug: "gts-holding",
    client: "GTS Holding",
    category: "Enterprise IT & Cybersecurity",
    market: "Egypt · Saudi Arabia · UAE",
    flag: "🇪🇬",
    service: "LinkedIn — Structured B2B Social Program",
    logo: "/logos/clients/gts.webp",
    accent: "blue",
    heroHeadline: "From Occasional Brand Moments to a Structured, Always-On Channel.",
    heroSub:
      "A regional enterprise IT and cybersecurity leader turned an inconsistent LinkedIn presence into a disciplined, multi-objective program reaching the CIOs and CISOs who make up its buying audience.",
    challenge:
      "GTS Holding is a regional enterprise IT and cybersecurity partner operating across Egypt, Saudi Arabia, and the UAE. LinkedIn is the primary channel for reaching the CIOs, CISOs, and IT directors who make up its buying audience — but the presence consisted of single-flight brand moments (an award announcement, an event activation) rather than a sustained program.",
    approach: {
      intro:
        "ARQQA evolved the program from occasional flights into a structured, always-on mix of four objectives running side by side on disciplined daily budgets:",
      moves: [
        {
          title: "Brand Awareness",
          body: "A major industry-event activation and a partner-award announcement — flagship moments that built reach ahead of a dedicated lead-generation push.",
        },
        {
          title: "Engagement",
          body: "Sustained engagement activity on owned content, keeping the brand present between flagship moments rather than only around them.",
        },
        {
          title: "Website Traffic",
          body: "Traffic campaigns running alongside awareness, routing a qualified enterprise audience to the site on a disciplined daily budget.",
        },
        {
          title: "Lead Generation",
          body: "Three lead-generation flights run and compared against each other, with video-led creative carrying the majority of the program's watch time.",
        },
      ],
    },
    results: {
      intro: "Program totals across the full engagement period:",
      metrics: [
        { value: "26", label: "Leads generated through a structured, always-on LinkedIn program" },
        { value: "1.89M", label: "Impressions delivered" },
        { value: "9,456", label: "Clicks generated" },
        { value: "0.50%", label: "Blended click-through rate across all objectives" },
        { value: "30.6%", label: "Video view-through rate" },
      ],
      note: "Three lead-generation flights were run and compared against each other. The sustained daily-budget flight delivered the strongest form-completion rate and the largest volume of leads — the clearest signal identified for scaling going forward.",
    },
    outcome: {
      title: "The Outcome",
      points: [
        "A single LinkedIn program now carries brand awareness, engagement, website traffic, and lead generation on disciplined daily budgets.",
        "Video-led lead-gen creative drove the majority of watch time and the highest form-completion rate in the program.",
        "A repeatable reporting baseline now exists for GTS to compare future flights against.",
      ],
    },
    card: {
      sector: "Enterprise IT & Cybersecurity",
      summary:
        "1.89M impressions from a structured, always-on LinkedIn program built for CIO and CISO buying committees.",
      image: "/portfolio/gts-holding.webp",
    },
    related: ["zenith-arabia-ai", "ntra"],
  },

  {
    slug: "zenith-arabia-ai",
    client: "Zenith Arabia AI",
    category: "Financial Services · AI · Data Science",
    market: "Saudi Arabia",
    flag: "🇸🇦",
    service: "Account-Based Marketing — Full Acquisition System",
    logo: "/logos/clients/Zenith-Arabia-AI.webp",
    logoScale: 2.2,
    accent: "amber",
    heroHeadline: "Building an Account-Based Demand Engine for AI in KSA Banking.",
    heroSub:
      "A sophisticated AI and data science offer, translated into a structured, measurable acquisition system for one of the most stakeholder-heavy buying committees in the region: KSA financial services.",
    challenge:
      "Zenith Arabia AI needed to communicate complex, technical AI use cases to senior banking leaders spanning technology, data, operations, risk, compliance, customer experience, and digital transformation — a market where buying decisions are inherently complex and stakeholder-heavy. The mandate: make sophisticated AI solutions understandable, build credibility, segment messaging by banking use case and persona, and convert qualified attention into measurable leads.",
    approach: {
      oneRow: true,
      intro:
        "A two-phase acquisition model, connecting strategic messaging, use-case content, paid acquisition, ABM outreach, SEO, landing pages, and lead nurturing into one measurable system:",
      moves: [
        {
          num: "01",
          title: "Phase 1 — Attention to Owned Assets",
          body: "Target accounts introduced to Zenith Arabia AI through paid advertising, LinkedIn, Google campaigns, SEO, social content, email outreach, and dedicated landing pages.",
        },
        {
          num: "02",
          title: "Phase 2 — Lead Generation & Nurturing",
          body: "Once prospects engage, the system moves them into a direct relationship through gated content, demo requests, email nurture sequences, webinars, product education, and CRM/marketing automation.",
        },
        {
          title: "Persona Segmentation",
          body: "Messaging segmented across four persona clusters — Customer Intelligence, Risk & Compliance, Operational Efficiency, and Advanced Analytics — each mapped to specific banking use cases: customer lifetime value, KYC and credit scoring, fraud detection, generative AI for banking, and more.",
        },
        {
          title: "Media & ABM Plan",
          body: "The full media plan spans Google Display Network, Performance Max, Google Search, and LinkedIn traffic, lead, and video-view campaigns — combined with Apollo-based account identification, contact enrichment, and personalized outreach sequences.",
        },
        {
          title: "Operating Scope",
          body: "Up to 20 monthly multimedia content pieces across 4 social platforms with daily moderation; ABM outreach of 2 sequences at 4–6 messages each, reaching up to 25,000 prospects per month; SEO across KSA in English and Arabic with 15 articles per month; and full marketing automation covering lead scoring, segmentation, A/B testing, and marketing-to-sales feedback loops.",
        },
      ],
    },
    results: {
      projected: true,
      metrics: [
        { value: "1.60%", label: "Projected blended click-through rate across the all-segments campaign layer" },
        { value: "4", label: "Persona-specific campaign layers, each with its own budget, targeting, and lead projection" },
      ],
    },
    outcome: {
      title: "The Outcome",
      points: [
        "A launch-ready acquisition framework connecting awareness, landing-page traffic, lead generation, and nurturing.",
        "Banking-specific use-case messaging with full persona segmentation.",
        "A paid-media plan across Google and LinkedIn.",
        "An ABM operating model built on Apollo for account identification, enrichment, and structured outreach.",
      ],
    },
    card: {
      sector: "Financial Services & AI",
      summary:
        "A full-funnel ABM system across Google, LinkedIn, SEO and automation, built for KSA banking.",
      image: "/portfolio/zenith-arabia-ai.webp",
    },
    related: ["gts-holding", "ntra"],
  },

  {
    slug: "perfect-body",
    client: "Perfect Body",
    category: "Fashion E-Commerce",
    market: "Kuwait",
    flag: "🇰🇼",
    service: "Full-Funnel Performance Marketing — Meta",
    logo: "/logos/clients/perfect-body-white.webp",
    accent: "orange",
    heroHeadline: "A Year of Full-Funnel Performance — 4.07x Return on Every Dollar Spent.",
    heroSub:
      "A corset brand in Kuwait built a full-funnel Meta program that turned engaged shoppers into a sustained, scalable return across a full year of testing and optimization.",
    challenge:
      "Perfect Body needed a Meta performance program that could scale efficiently across a full calendar year — not just a single successful campaign, but a repeatable system spanning awareness, traffic, engagement, and retargeting.",
    approach: {
      intro: "A layered, full-funnel strategy tested and scaled across four stages:",
      moves: [
        {
          num: "01",
          title: "Awareness",
          body: "Efficient reach at scale, engineered for a very low cost per result across a large volume of impressions.",
        },
        {
          num: "02",
          title: "Traffic",
          body: "A dedicated traffic campaign drove qualified landing-page visitors at a very low cost per view, feeding the funnel with high-intent prospects.",
        },
        {
          num: "03",
          title: "Engagement",
          body: "A profile-visit campaign built brand presence on Instagram, bringing new visitors into the brand's owned audience.",
        },
        {
          num: "04",
          title: "Retargeting",
          body: "The retargeting layer closed the loop, converting engaged shoppers into paying customers at the strongest ROAS of any layer in the funnel.",
        },
      ],
    },
    results: {
      metrics: [
        { value: "4.07x", label: "Average return on ad spend across the full year" },
        { value: "512", label: "Purchases generated" },
        { value: "2.7%", label: "View-to-purchase conversion rate across the full year" },
        { value: "78%", label: "Of shoppers who added to cart went on to initiate checkout" },
      ],
      note: "The retargeting layer alone closed at a 3.13x ROAS, turning engaged shoppers into paying customers efficiently — validating the full-funnel approach across 76 campaigns and a full year of testing, scaling, and optimization on Meta.",
    },
    card: {
      sector: "Fashion E-Commerce",
      summary:
        "4.07x average ROAS sustained across a full year and 76 campaigns of continuous testing.",
      image: "/portfolio/perfect-body.webp",
    },
    related: ["merova", "everher"],
  },
];

export function getCaseStudy(slug: string) {
  return PERFORMANCE_CASE_STUDIES.find((c) => c.slug === slug);
}

export function getRelated(slugs: string[]) {
  return slugs
    .map((s) => PERFORMANCE_CASE_STUDIES.find((c) => c.slug === s))
    .filter((c): c is PerformanceCaseStudy => Boolean(c));
}

export const CASE_STUDY_WASH: Record<PerformanceCaseStudy["accent"], string> = {
  blue: "linear-gradient(150deg, #101a33 0%, #0a0f1e 55%, #06080f 100%)",
  violet: "linear-gradient(150deg, #1a1430 0%, #100a1e 55%, #06080f 100%)",
  orange: "linear-gradient(150deg, #2a1520 0%, #1a0c14 55%, #06080f 100%)",
  teal: "linear-gradient(150deg, #10261f 0%, #0a1613 55%, #06080f 100%)",
  amber: "linear-gradient(150deg, #2a2113 0%, #1a140a 55%, #06080f 100%)",
};

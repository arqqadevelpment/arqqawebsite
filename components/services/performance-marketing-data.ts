/**
 * Content for the Performance Marketing landing page
 * (/services/performance-marketing).
 *
 * This is a Google Ads landing page rather than a standard service page: it
 * leads with aggregate proof and drives one CTA throughout — the free
 * performance audit — instead of offering tier choices.
 *
 * ── Data provenance ────────────────────────────────────────────────────────
 * The headline figures are the sum of results across seven client case
 * studies (Everher, Merova, NTRA, Allure Clinics, GTS Holding, Zenith Arabia
 * AI, Perfect Body). Per the data policy, no client spend or revenue figures
 * appear here — only volume metrics and growth ratios.
 *
 * The source document's raw totals were 101,077,387 impressions and 17,416
 * leads, but both included Zenith Arabia AI's figures, which are campaign
 * *projections* from a planning deck rather than completed results. The
 * document flags this as a factual-accuracy risk and recommends actuals-only
 * totals before the page goes live, so the figures below have Zenith's
 * projections removed: impressions less 16,700, leads less 49.
 */

export type BigNumber = {
  /** Numeric target the counter animates to */
  value: number;
  /** How the finished number is rendered */
  display: string;
  label: string;
};

/* Actuals only — see the provenance note above. */
export const IMPRESSIONS_ACTUAL = 101_060_687;
export const LEADS_ACTUAL = 17_367;

export const BIG_NUMBERS: BigNumber[] = [
  { value: 101, display: "101M+", label: "Impressions Served" },
  { value: 17350, display: "17,350+", label: "Leads Generated" },
  { value: 386, display: "386K+", label: "New Followers Gained" },
  { value: 7.3, display: "7.3M+", label: "Engagements Driven" },
];

export const HERO = {
  headline: "We Don't Promise Results.",
  headlineAccent: "We've Already Delivered Them.",
  sub: "Performance marketing for brands across MENA — built on the same system that has driven millions of impressions, tens of thousands of leads, and measurable growth for clients across fintech, healthcare, fashion, and enterprise.",
  ctaLabel: "Get Your Free Performance Audit",
};

export const PROBLEM = {
  heading: "Most Performance Marketing",
  headingAccent: "Isn't Performing.",
  body: "You've run ads before. Maybe you're running them right now. But impressions without strategy is just spend. Clicks without a funnel is just traffic. And leads without qualification is just noise. The problem isn't that performance marketing doesn't work — it's that most of it isn't built as a system.",
  cards: [
    {
      pain: "I'm spending on ads but I can't tell what's actually working.",
      solution:
        "Every campaign we run is structured for attribution from day one — you'll always know exactly what's driving results.",
    },
    {
      pain: "My agency shows me impressions, but not outcomes.",
      solution:
        "We report on leads, conversions, and growth — not vanity metrics dressed up as wins.",
    },
    {
      pain: "I've scaled spend before and just burned more budget faster.",
      solution:
        "We scale only on validated winners — tested, proven, then scaled. Never the other way around.",
    },
  ],
};

/* Each capability is presented as a full-bleed showcase panel, selected by a
   pill above it — the same pattern the Website Design page uses for its build
   tiers. `media` is optional: until artwork lands, the panel falls back to a
   branded gradient wash keyed by `accent`, so the section is complete and
   reviewable before a single image exists. */
export type Capability = {
  key: string;
  num: string;
  title: string;
  /** Short label under the title — who this is for */
  forWhom: string;
  body: string;
  /** Revealed by the What's Included tab */
  items: string[];
  cta: string;
  accent: "blue" | "violet" | "orange" | "teal" | "amber";
  /** Drop artwork in and the wash is replaced automatically */
  media?: { src: string; type: "image" | "video" };
};

export const WHAT_WE_DO = {
  heading: "Performance Marketing,",
  headingAccent: "Engineered Like a System.",
  body: "Not a checklist of deliverables. A structured, testable, scalable approach to paid growth — built on the same Catalyst System™ methodology behind every case study on this page.",
  capabilities: [
    {
      key: "paid-media",
      num: "01",
      title: "Paid Search & Social",
      forWhom: "Brands that need demand captured and created at the same time.",
      body: "Google Search, Performance Max, Meta, TikTok, Snapchat, and LinkedIn — platform-native campaigns built for your specific funnel stage, not a one-size-fits-all template.",
      items: [
        "Google Search and Performance Max campaigns",
        "Meta, TikTok, and Snapchat paid social",
        "LinkedIn campaigns for B2B demand generation",
        "Platform selection based on where your buyers actually are",
        "Campaign structure built per funnel stage",
        "Creative formats native to each platform",
      ],
      cta: "Get Your Free Performance Audit",
      media: { src: "/services/perf-paid-media.webp", type: "image" as const },
      accent: "blue" as const,
    },
    {
      key: "testing",
      num: "02",
      title: "Structured Testing",
      forWhom: "Brands that have scaled spend before and burned budget doing it.",
      body: "Every growth lever — platform, audience, creative angle, offer — is isolated and tested before a single unit of budget is scaled. Scaling on assumption burns budget. Scaling on validated winners compounds it.",
      items: [
        "One variable isolated per test, never bundled",
        "Platform, audience, creative angle, and offer tested separately",
        "Documented read-outs on every test cycle",
        "Winners fed back into the creative pipeline",
        "Losers cut on evidence, not opinion",
        "Budget scaled only after a result is validated",
      ],
      cta: "Get Your Free Performance Audit",
      media: { src: "/services/perf-testing.webp", type: "image" as const },
      accent: "violet" as const,
    },
    {
      key: "cro",
      num: "03",
      title: "Conversion Rate Optimization",
      forWhom: "Brands with traffic that is not turning into completed conversions.",
      body: "Landing pages, checkout flows, and lead forms optimized using real behavioral data — closing the gap between traffic and completed conversions.",
      items: [
        "Landing page structure built around a single conversion goal",
        "Checkout and lead-form flow analysis",
        "Behavioral data review — where users drop, and why",
        "Page speed and Core Web Vitals work",
        "Mobile-first optimization for MENA traffic",
        "Iterative testing against a live control",
      ],
      cta: "Get Your Free Performance Audit",
      media: { src: "/services/perf-cro.webp", type: "image" as const },
      accent: "orange" as const,
    },
    {
      key: "attribution",
      num: "04",
      title: "Attribution & Reporting",
      forWhom: "Brands whose agency shows impressions but never outcomes.",
      body: "Clean tracking infrastructure and live dashboards. You always know what's working, what isn't, and why — not a static monthly PDF.",
      items: [
        "Tracking infrastructure verified before launch",
        "Every lead tagged by campaign, platform, and creative angle",
        "Live dashboards, open any time",
        "Real-time spend pacing and cost per result",
        "Shared KPIs built around your outcomes, not ours",
        "Monthly strategic reviews on top of live data",
      ],
      cta: "Get Your Free Performance Audit",
      media: { src: "/services/perf-attribution.webp", type: "image" as const },
      accent: "teal" as const,
    },
    {
      key: "full-funnel",
      num: "05",
      title: "Full-Funnel Strategy",
      forWhom: "Brands running isolated campaigns that compete with each other.",
      body: "Awareness, traffic, engagement, and retargeting working together — not isolated campaigns competing for the same budget.",
      items: [
        "Awareness, consideration, and retention built as one structure",
        "Retargeting sequenced against funnel stage",
        "Audience overlap resolved so campaigns stop bidding against each other",
        "Budget allocated across the funnel, not per campaign",
        "Channel mapping tied to a single KPI framework",
        "Creative angles matched to intent level",
      ],
      cta: "Get Your Free Performance Audit",
      media: { src: "/services/perf-full-funnel.webp", type: "image" as const },
      accent: "amber" as const,
    },
  ] as Capability[],
};

/* Fallback backdrops, used until each capability has real artwork. */
export const CAPABILITY_WASH: Record<Capability["accent"], string> = {
  blue: "linear-gradient(150deg, #101a33 0%, #0a0f1e 55%, #06080f 100%)",
  violet: "linear-gradient(150deg, #1a1430 0%, #100a1e 55%, #06080f 100%)",
  orange: "linear-gradient(150deg, #2a1520 0%, #1a0c14 55%, #06080f 100%)",
  teal: "linear-gradient(150deg, #10261f 0%, #0a1613 55%, #06080f 100%)",
  amber: "linear-gradient(150deg, #2a2113 0%, #1a140a 55%, #06080f 100%)",
};

export const CAPABILITY_GLOW: Record<Capability["accent"], string> = {
  blue: "rgba(60,125,255,",
  violet: "rgba(140,110,255,",
  orange: "rgba(255,122,61,",
  teal: "rgba(60,200,170,",
  amber: "rgba(255,180,60,",
};

export type MetricIcon = "eye" | "magnet" | "users" | "spark" | "grid";

export const BREAKDOWN = {
  heading: "Every Number on This Page",
  headingAccent: "Came From a Real Campaign.",
  body: "These aren't projections or industry benchmarks. They're the combined results of campaigns we've run for real clients across fintech, healthcare, fashion, government, and enterprise IT.",
  metrics: [
    {
      figure: "101,060,687",
      icon: "eye" as MetricIcon,
      label: "Impressions Served",
      body: "Across LinkedIn B2B campaigns, government-sector Meta programs, healthcare lead generation, and financial-services demand generation — delivered across Egypt, Saudi Arabia, UAE, and multi-market MEA campaigns.",
    },
    {
      figure: "17,367",
      icon: "magnet" as MetricIcon,
      label: "Leads Generated",
      body: "From structured lead-generation programs across enterprise IT, healthcare, and financial services — each lead attributed to a specific campaign, platform, and creative angle, not a blended guess.",
    },
    {
      figure: "386,702",
      icon: "users" as MetricIcon,
      label: "New Followers Gained",
      body: "Audience growth for a national public-sector brand, built through a disciplined, always-on social program — not a single viral moment.",
    },
    {
      figure: "7,370,000",
      icon: "spark" as MetricIcon,
      label: "Engagements Driven",
      body: "Reactions, comments, shares, saves, and clicks across owned social content — proof that the creative wasn't just seen, it was acted on.",
    },
    {
      figure: "376",
      icon: "grid" as MetricIcon,
      label: "Campaigns Executed",
      body: "Individually structured, tested, and optimized campaigns across healthcare and fashion e-commerce clients — each one a data point in a repeatable system, not a one-off bet.",
    },
  ],
  cta: { label: "See the Full Case Studies", href: "/work" },
};

/* Each highlight is a vertical card in an auto-scrolling rail, linking to its
   full case study at /case-studies/<slug>. `logo` is optional — a card falls
   back to a monogram tile if artwork is missing. */
export type Highlight = {
  slug: string;
  client: string;
  sector: string;
  market: string;
  /** Flag emoji — no image asset needed, and renders correctly on every OS */
  flag: string;
  body: string;
  logo?: string;
  /** Optical scale for logos whose source file carries heavy whitespace —
      the frame height is the same for all, so a mark occupying 28% of its
      frame renders far smaller than one occupying 86%. */
  logoScale?: number;
};

export const HIGHLIGHTS = {
  heading: "A Few of the Systems",
  headingAccent: "Behind These Numbers.",
  cards: [
    {
      slug: "everher",
      client: "Everher",
      logo: "/logos/clients/everher.webp",
      sector: "Beauty & Wellness",
      market: "Egypt",
      flag: "🇪🇬",
      body: "+105% ROAS, +272% peak conversion lift, 100% inventory sold out — a full-funnel transformation from struggling to profitable.",
    },
    {
      slug: "ntra",
      client: "NTRA",
      logo: "/logos/clients/ntra.webp",
      sector: "Government & Public Sector",
      market: "Egypt",
      flag: "🇪🇬",
      body: "+71.5% follower growth and 7.37M engagements in six months — scaling a national regulator's public voice.",
    },
    {
      slug: "perfect-body",
      client: "Perfect Body",
      logo: "/logos/clients/perfect-body-white.webp",
      sector: "Fashion E-Commerce",
      market: "Kuwait",
      flag: "🇰🇼",
      body: "4.07x average ROAS sustained across a full year and 76 campaigns of continuous testing and scaling.",
    },
    {
      slug: "allure-clinics",
      client: "Allure Clinics",
      logo: "/logos/clients/allure.webp",
      sector: "Healthcare",
      market: "Saudi Arabia",
      flag: "🇸🇦",
      body: "17,367+ leads generated across three platforms — a diversified, repeatable acquisition engine for a multi-doctor healthcare brand.",
    },
    {
      slug: "merova",
      client: "Merova",
      logo: "/logos/clients/merova.webp",
      sector: "Fashion E-Commerce",
      market: "Egypt",
      flag: "🇪🇬",
      body: "Monthly sales nearly doubled and 3.5–4.0x ROAS sustained through peak season — premium pricing held against heavy competitor discounting.",
    },
    {
      slug: "gts-holding",
      client: "GTS Holding",
      logo: "/logos/clients/gts.webp",
      logoScale: 1.5,
      sector: "Enterprise IT & Cybersecurity",
      market: "Egypt · KSA · UAE",
      flag: "🇪🇬",
      body: "1.89M impressions and a structured, always-on LinkedIn program reaching the CIOs and CISOs who make up the buying audience.",
    },
    {
      slug: "zenith-arabia-ai",
      client: "Zenith Arabia AI",
      logo: "/logos/clients/Zenith-Arabia-AI.webp",
      logoScale: 1.9,
      sector: "Financial Services & AI",
      market: "Saudi Arabia",
      flag: "🇸🇦",
      body: "A full-funnel ABM system across Google, LinkedIn, SEO, and automation — built for KSA banking's stakeholder-heavy buying committees.",
    },
  ] as Highlight[],
  cta: { label: "View All Case Studies", href: "/work" },
};

/* Marquee roster. Every mark here is a light/white or high-contrast version —
   the slate perfect-body.png in the same folder is for light backgrounds and
   would disappear against this page. `scale` nudges a mark up or down so the
   row reads as optically even rather than mathematically equal. */
export const CLIENTS = {
  heading: "Brands That Trusted Us",
  headingAccent: "With Their Growth.",
  body: "From national regulators to regional fintech leaders to fashion and healthcare brands scaling across MENA — these are some of the partners behind the numbers on this page.",
  logos: [
    { name: "QNB", logo: "/logos/clients/QNB.webp" },
    { name: "Air Cairo", logo: "/logos/clients/Air-aciro.webp" },
    { name: "Fawry", logo: "/logos/clients/fawry.webp" },
    { name: "Kenz'Up", logo: "/logos/clients/kenzup.webp" },
    { name: "Nile Air", logo: "/logos/clients/nile-air.webp" },
    { name: "Allure Clinics", logo: "/logos/clients/allure.webp", scale: 1.15 },
    { name: "NTRA", logo: "/logos/clients/ntra.webp", scale: 1.1 },
    { name: "Perfect Body", logo: "/logos/clients/perfect-body-white.webp", scale: 1.1 },
    { name: "Everher", logo: "/logos/clients/everher.webp" },
    { name: "Merova", logo: "/logos/clients/merova.webp" },
  ] as { name: string; logo: string; scale?: number }[],
};

export type StepIcon = "compass" | "blueprint" | "flask" | "growth" | "gauge";

export const PROCESS = {
  heading: "From Audit to Scale.",
  headingAccent: "Every Step Measured.",
  steps: [
    {
      icon: "compass" as StepIcon,
      num: "01",
      title: "Free Performance Audit",
      body: "We review your current campaigns, tracking setup, and funnel — and tell you exactly where budget is being wasted and where the opportunity is.",
    },
    {
      icon: "blueprint" as StepIcon,
      num: "02",
      title: "Strategic Input",
      body: "Market analysis, competitive audit, KPI alignment, and channel mapping — your growth blueprint before a single dollar moves.",
    },
    {
      icon: "flask" as StepIcon,
      num: "03",
      title: "Structured Testing",
      body: "Every growth lever isolated and tested — platforms, audiences, creative angles, offers — before any budget is scaled.",
    },
    {
      icon: "growth" as StepIcon,
      num: "04",
      title: "Evidence-Based Scaling",
      body: "Budget shifts decisively toward validated winners. Campaign architecture gets leaner and stronger, not more fragmented.",
    },
    {
      icon: "gauge" as StepIcon,
      num: "05",
      title: "Live Reporting & Optimization",
      body: "Real-time dashboards, not static monthly PDFs. You always know what's working and why — and so do we, so we can keep improving it.",
    },
  ],
};

/* Radical Transparency runs as a full-screen scroll sequence — one slide per
   capability — mirroring the Core Value Proposition section on the Catalyst
   System page. `media` is optional: until artwork lands each slide falls back
   to a branded wash, so the sequence is complete and reviewable now. */
export type TransparencySlide = {
  title: string;
  body: string;
  accent: "blue" | "violet" | "orange" | "teal" | "amber";
  media?: { src: string; type: "image" | "video" };
};

export const TRANSPARENCY = {
  heading: "You Don't Wait for a Report.",
  headingAccent: "You Watch It Happen.",
  body: "Most agencies show you what happened a month ago. We show you what's happening right now. Every impression, click, and lead is tracked in a live dashboard you can open any time — not a static PDF that's already out of date by the time it lands in your inbox.",
  slides: [
    {
      title: "Every Impression, As It Happens",
      body: "Live delivery data across every platform and campaign — not a delayed export, not a summary. The same numbers we're looking at.",
      media: { src: "/services/tp-impressions.webp", type: "image" as const },
      accent: "blue" as const,
    },
    {
      title: "Spend Pacing & Efficiency",
      body: "Real-time cost per result, budget pacing, and platform-by-platform performance — so you always know where every unit of spend is working hardest.",
      media: { src: "/services/tp-spend-pacing.webp", type: "image" as const },
      accent: "violet" as const,
    },
    {
      title: "Lead-Level Visibility",
      body: "Every lead tracked from the moment it's captured, tagged by campaign, platform, and creative angle — not a blended monthly total with no attribution.",
      media: { src: "/services/tp-lead-visibility.webp", type: "image" as const },
      accent: "orange" as const,
    },
    {
      title: "Campaign & Task Status",
      body: "The same ClickUp-powered workspace we use internally — you see task status, timelines, and what's in progress, not just what's already finished.",
      media: { src: "/services/tp-task-status.webp", type: "image" as const },
      accent: "teal" as const,
    },
    {
      title: "Shared KPIs, Not Just Our Metrics",
      body: "Dashboards built around the outcomes that matter to your business — leads, conversions, growth — not vanity numbers that make a report look good.",
      media: { src: "/services/tp-shared-kpis.webp", type: "image" as const },
      accent: "amber" as const,
    },
  ] as TransparencySlide[],
};

/* Fallback backdrops for transparency slides, used until artwork lands. */
export const TRANSPARENCY_WASH: Record<TransparencySlide["accent"], string> = {
  blue: "linear-gradient(150deg, #101a33 0%, #0a0f1e 55%, #06080f 100%)",
  violet: "linear-gradient(150deg, #1a1430 0%, #100a1e 55%, #06080f 100%)",
  orange: "linear-gradient(150deg, #2a1520 0%, #1a0c14 55%, #06080f 100%)",
  teal: "linear-gradient(150deg, #10261f 0%, #0a1613 55%, #06080f 100%)",
  amber: "linear-gradient(150deg, #2a2113 0%, #1a140a 55%, #06080f 100%)",
};

export type WhyIcon = "shield" | "badge" | "team" | "globe";

export const WHY = {
  heading: "Why Brands Across MENA",
  headingAccent: "Trust Us With Their Growth.",
  items: [
    {
      icon: "shield" as WhyIcon,
      title: "13 Years. Not 13 Months.",
      body: "We've survived revolutions, pandemics, and market crashes. We're not going anywhere — and neither is your campaign history.",
    },
    {
      icon: "badge" as WhyIcon,
      title: "Google Premier Partner",
      body: "Elite certification. Top-tier platform access, beta features, and direct platform support.",
    },
    {
      icon: "team" as WhyIcon,
      title: "One Team. No Outsourcing.",
      body: "50+ in-house specialists. Your campaigns are never handed off to freelancers — the strategist who plans it is accountable for it.",
    },
    {
      icon: "globe" as WhyIcon,
      title: "Regional Expertise",
      body: "We understand the MENA buyer, the regional platforms, and the market dynamics — not a generic playbook applied to every geography.",
    },
  ],
};

export type IndustryIcon =
  | "sparkle"
  | "hanger"
  | "pulse"
  | "landmark"
  | "lock"
  | "coins";

export const INDUSTRIES = {
  heading: "Different Industries.",
  headingAccent: "Same Disciplined System.",
  items: [
    { icon: "sparkle" as IndustryIcon, name: "Beauty & Wellness", detail: "E-Commerce" },
    { icon: "hanger" as IndustryIcon, name: "Fashion & Apparel", detail: "E-Commerce" },
    { icon: "pulse" as IndustryIcon, name: "Healthcare", detail: "Lead Generation" },
    { icon: "landmark" as IndustryIcon, name: "Government & Public Sector", detail: "Audience Growth" },
    { icon: "lock" as IndustryIcon, name: "Enterprise IT & Cybersecurity", detail: "B2B Demand Generation" },
    { icon: "coins" as IndustryIcon, name: "Financial Services & AI", detail: "Account-Based Marketing" },
  ],
};

export const FAQS = [
  {
    q: "How quickly will I see results?",
    a: "Testing typically surfaces early signal within 2–4 weeks. Meaningful scaling decisions follow once we have enough data to trust the pattern — usually 6–8 weeks in.",
  },
  {
    q: "Do you work with my industry?",
    a: "We've run performance programs across fintech, healthcare, fashion e-commerce, government, enterprise IT, and financial services. Book a free audit and we'll tell you honestly if we're a fit.",
  },
  {
    q: "What platforms do you manage?",
    a: "Google Search, Performance Max, Meta, TikTok, Snapchat, and LinkedIn — selected based on where your actual buyers are, not a fixed package.",
  },
  {
    q: "How do you report results?",
    a: "Live dashboards with shared KPIs, plus monthly strategic reviews. You'll never be waiting on an end-of-month PDF to know if something's working.",
  },
  {
    q: "What does the free audit include?",
    a: "A full review of your current campaigns, tracking setup, and funnel — with specific, actionable recommendations, whether or not you move forward with us.",
  },
  {
    q: "Is there a minimum budget?",
    a: "It depends on your industry and goals — we'll be upfront about what's realistic during your audit call, not after you've signed a contract.",
  },
];

export const LEAD_FORM = {
  heading: "See What a System Like This",
  headingAccent: "Could Do for Your Brand.",
  body: "Fill out the form below and a senior strategist will review your current setup and get back to you within 24 hours with specific, actionable findings — no generic pitch deck.",
  submitLabel: "Get My Free Audit",
  trustSignals: [
    "Response within 24 hours",
    "No commitment",
    "Honest recommendation, even if we're not the right fit",
  ],
  industryOptions: [
    "Fintech & Banking",
    "Airlines & Travel",
    "Government & Public Sector",
    "Beauty & Wellness",
    "Fashion & E-Commerce",
    "Healthcare",
    "Enterprise IT & Cybersecurity",
    "Financial Services & AI",
    "Other",
  ],
  spendOptions: [
    "Under $1K",
    "$1K–$5K",
    "$5K–$20K",
    "$20K+",
    "Not currently running ads",
  ],
};

export const CLOSING = {
  line: "101M+ Impressions. 17,350+ Leads. 386K+ Followers. 7.3M+ Engagements.",
  body: "Every number on this page is a result we've already delivered — not a projection of what we might do for you.",
  ctaLabel: "Get Your Free Performance Audit",
};

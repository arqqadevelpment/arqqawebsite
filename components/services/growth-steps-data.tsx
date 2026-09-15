/**
 * The ARQQA Growth Ecosystem — four Step pages, 28 services within.
 *
 * Source: ARQQA_Services_4_Step_Pages.docx (Aug 2026 revision). Each Step
 * page covers every sub-service in its stage as its own titled section
 * (headline, CEP, body, 4 bullets, one proof line) on a single URL, rather
 * than each sub-service getting its own standalone page — keeps the sitemap
 * lean while a card's bullet point can still deep-link straight to its
 * section via the URL hash.
 *
 * The Catalyst System™ and the dedicated Performance Marketing ad-landing
 * page (/services/performance-marketing-app-growth) are separate, standalone
 * products outside this structure — not duplicated here.
 */

export type SubService = {
  /** Anchor id — the section renders `id={slug}`, and a card's bullet point
      links to `/services/<step slug>#<slug>`. */
  slug: string;
  title: string;
  /** Category Entry Point — the trigger moment a client feels */
  cep: string;
  body: string;
  bullets: string[];
  proof: string;
  /** Set only on the one sub-service (Performance Analytics, on Step 2) that
      is a cross-link stub rather than a full section — points at the real
      section, which lives in full on another Step's page. */
  crossLinkHref?: string;
};

export type GrowthStep = {
  step: string;
  /** URL: /services/<slug> */
  slug: string;
  title: string;
  accent: "blue" | "orange";
  icon: React.ReactNode;
  /** Full-bleed hero background, one per page, named for its page. */
  heroImage: string;
  heroHeadline: string;
  heroSub: string;
  subServices: SubService[];
  ctaPrimaryLabel: string;
  /** Omitted entirely on pages with no secondary CTA. */
  ctaSecondaryLabel?: string;
};

export const GROWTH_STEPS: GrowthStep[] = [
  {
    step: "Step 1",
    slug: "strategic-consulting",
    title: "Strategic Consulting",
    accent: "blue",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" stroke="url(#growthEcosystemStroke)" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="3" stroke="url(#growthEcosystemStroke)" strokeWidth="1.4" />
        <path d="M12 3.4V6M12 18v2.6M3.4 12H6M18 12h2.6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    heroImage: "/Strategic-Consulting.webp",
    heroHeadline: "Every Growth Plan Starts With a Real Answer to ‘Why?’",
    heroSub:
      "Before creative gets made or a dollar of media gets spent, we define the strategy that makes every following step accountable to something real.",
    ctaPrimaryLabel: "Book a Strategy Consultation",
    ctaSecondaryLabel: "Download the Strategic Consulting Overview",
    subServices: [
      {
        slug: "brand-strategy",
        title: "Brand Strategy",
        cep: "When your brand doesn’t know what it stands for.",
        body: "We define what your brand stands for, who it's for, and why it wins — before a single asset gets designed. Without a documented strategy, every designer and media buyer ends up guessing at the brand's voice, and guesses don't compound.",
        bullets: [
          "Positioning definition and territory mapping",
          "Audience and persona research, grounded in real behavior",
          "Messaging architecture every future asset inherits",
          "Brand narrative that makes the strategy memorable",
        ],
        proof:
          "The same foundation that repositioned Merova into a ‘Turkish-inspired destination brand’ — language now anchoring every campaign the brand runs.",
      },
      {
        slug: "marketing-strategy",
        title: "Marketing Strategy",
        cep: "When your marketing activity has no unifying plan.",
        body: "We build the roadmap connecting every channel, campaign, and budget decision to a single business objective. Activity without a connecting strategy means every channel optimizes for itself, not the business.",
        bullets: [
          "Objective alignment across the full funnel",
          "Channel prioritization based on where your audience already is",
          "The 60/40 budget principle: brand-building vs. activation",
          "A quarterly roadmap that sequences initiatives, not a free-for-all",
        ],
        proof:
          "The same funnel-logic approach that let Joviality scale spend +103% while gross sales grew +114% — growth outpacing spend because the plan came first.",
      },
      {
        slug: "go-to-market-strategy",
        title: "Go-to-Market (GTM) Strategy",
        cep: "When you're launching something new and can't afford to get it wrong.",
        body: "We build the launch sequence — audience, message, channel, and timing — for products, markets, or brands entering somewhere new. Launches fail more often from sequencing mistakes than from bad products.",
        bullets: [
          "Market and readiness assessment before budget commits",
          "Phased launch sequencing: awareness before conversion",
          "Channel and budget plan by launch phase",
          "Post-launch measurement and pivot triggers",
        ],
        proof:
          "The same phased logic behind Zenith Arabia AI’s KSA banking market entry — a setup phase, a traffic-learning window, then lead activation once signal was in.",
      },
      {
        slug: "growth-strategy",
        title: "Growth Strategy",
        cep: "When your growth has stagnated.",
        body: "A structured audit of your funnel, channels, and data — identifying exactly where growth is leaking before we recommend a single fix. Diagnosis comes before spend, not after.",
        bullets: [
          "Full-funnel diagnosis: where prospects drop off, and why",
          "Channel performance audit — underperforming vs. untested",
          "The 2–3 highest-leverage growth opportunities, ranked",
          "A specific, sequenced 90-day plan",
        ],
        proof:
          "The same diagnostic discipline that uncovered Merova’s tracking gap — a data problem masking true campaign efficiency until it was found.",
      },
      {
        slug: "marketing-audit-assessment",
        title: "Marketing Audit & Assessment",
        cep: "When you don't know if your current marketing is actually working.",
        body: "An unbiased, evidence-based review of your current marketing — campaigns, tracking, content, spend — with specific findings, not vague impressions.",
        bullets: [
          "Line-by-line campaign and channel review",
          "Tracking and attribution accuracy check",
          "Content and creative performance assessment",
          "A prioritized, actionable findings report",
        ],
        proof:
          "The same audit discipline that caught Merova’s WordPress setup inflating conversion numbers — the catalyst for a full infrastructure rebuild.",
      },
      {
        slug: "market-research-competitive-analysis",
        title: "Market Research & Competitive Analysis",
        cep: "When you're deciding without knowing what the market looks like.",
        body: "Structured research into your audience, competitors, and category — so strategy is built on evidence, not assumption.",
        bullets: [
          "Competitive landscape mapping",
          "Primary or secondary audience research",
          "Category and trend analysis",
          "Specific, defensible opportunity-gap identification",
        ],
        proof:
          "The same research discipline behind Merova’s premium positioning — identifying Egyptian shoppers wanted Turkish-inspired fashion without traveling for it.",
      },
      {
        slug: "digital-transformation-advisory",
        title: "Digital Transformation Advisory",
        cep: "When your systems and tools can't keep up with your growth.",
        body: "Advisory on the platforms, tools, and workflows your business needs to actually support the growth you're chasing. Many growth ceilings are infrastructural, not strategic.",
        bullets: [
          "Current-state technology assessment",
          "Infrastructure gap analysis against your growth plan",
          "Evaluated, specific platform recommendations",
          "A migration roadmap that doesn't break what's working",
        ],
        proof:
          "The exact advisory work that moved Merova off a data-inflating WordPress setup onto Shopify — restoring accurate attribution.",
      },
    ],
  },
  {
    step: "Step 2",
    slug: "asset-building",
    title: "Assets Building",
    accent: "orange",
    icon: (
      <>
        <rect x="3.4" y="4" width="17.2" height="12" rx="2" stroke="url(#growthEcosystemStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.04)" />
        <path d="M7 20h10M12 16v4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7.2 12.4l2.6-3 2.4 2.2 3.6-4.4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    heroImage: "/_Assets-Building2.png",
    heroHeadline: "The Assets That Everything Else Gets Built On.",
    heroSub:
      "Design, development, and brand infrastructure — the tangible things your strategy needs in order to actually launch.",
    ctaPrimaryLabel: "Book an Assets Consultation",
    subServices: [
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        cep: "When your product doesn't convert.",
        body: "User interface and experience design built around how people actually behave, not how a mockup looks in isolation. A beautiful interface that confuses users at checkout isn't good design — it's decoration.",
        bullets: [
          "User research and journey mapping",
          "Wireframing and information architecture before style",
          "High-fidelity design across every breakpoint",
          "Usability validation against real behavior",
        ],
        proof:
          "The same CRO discipline that took Everher’s peak conversion rate from 0.94% to 3.5% — a +272% uplift from fixing the journey, not just the visuals.",
      },
      {
        slug: "web-app-development",
        title: "Web & App Development",
        cep: "When your website or app can't support your growth.",
        body: "Website and mobile app development engineered for speed, conversion, and the infrastructure your growth actually needs — every campaign you run either converts on this or wastes on it.",
        bullets: [
          "Technical architecture built for your scale, not a template",
          "CRM, payment, and analytics integration from day one",
          "Speed optimization for Core Web Vitals and Ads Quality Score",
          "Cross-device QA before a single visitor arrives",
        ],
        proof:
          "The same infrastructure discipline that moved Merova onto a platform capable of accurate attribution — the foundation a full-funnel strategy needed.",
      },
      {
        slug: "company-profile",
        title: "Company Profile",
        cep: "When you don't have a credible document to send a serious prospect.",
        body: "A professionally designed company profile that communicates who you are and why you're credible — built for the moments you can't be in the room to explain it yourself.",
        bullets: [
          "Content strategy built for fastest credibility",
          "Full visual design applying your brand system",
          "Case studies and proof woven into the narrative",
          "Print-ready and digital delivery from one source",
        ],
        proof:
          "Built on the same proof-forward structure as ARQQA’s own case study library — leading with outcomes, not adjectives.",
      },
      {
        slug: "brand-identity-guidelines",
        title: "Brand Identity & Guidelines",
        cep: "When nobody remembers your brand.",
        body: "Visual identity systems and the guidelines that keep every future asset — built by anyone, anywhere — unmistakably yours. A logo isn't a brand identity; a documented system is.",
        bullets: [
          "Logo, color system, and typography design",
          "A guidelines document that keeps consistency without you in every review",
          "Application design across digital, print, and social",
          "A rollout kit for fast team and agency adoption",
        ],
        proof:
          "The same consistency discipline this site is built on: gradual evolution, never a Tropicana-style redesign that destroys existing memory structures.",
      },
      {
        slug: "brand-photography-video-library",
        title: "Brand Photography & Video Library",
        cep: "When you're relying on stock imagery that looks like everyone else's.",
        body: "A library of original brand photography and video, shot once and reusable across every future campaign, page, and platform — a one-time investment that pays back repeatedly.",
        bullets: [
          "Shot-list planning tied to actual future use cases",
          "Professional production directed to brand guidelines",
          "Full post-production and format optimization",
          "An organized, tagged asset library on delivery",
        ],
        proof:
          "Built on the same production discipline behind the Content Factory phase of every ARQQA content program — platform-native, never generic.",
      },
      {
        slug: "digital-platforms-setup",
        title: "Digital Platforms Setup",
        cep: "When your tools aren't talking to each other.",
        body: "CRM, analytics, ad accounts, and marketing tools configured and connected properly from the start, so every future campaign has clean data to work with. Most platforms fail from setup, not capability.",
        bullets: [
          "Platform audit and fit recommendation",
          "Correct tracking, conversion event, and integration setup",
          "Lead-routing and automation workflow configuration",
          "Team training so the setup actually gets used",
        ],
        proof:
          "This is the exact gap that inflated Merova’s conversion numbers for months — proof that setup quality, not platform choice, is usually the real constraint.",
      },
    ],
  },
  {
    step: "Step 3",
    slug: "content-social",
    title: "Creative Content & Social Media Management",
    accent: "blue",
    icon: (
      <>
        <path
          d="M4 6.4A2.4 2.4 0 0 1 6.4 4h11.2A2.4 2.4 0 0 1 20 6.4v6.2a2.4 2.4 0 0 1-2.4 2.4H10l-4.4 3.8v-3.8H6.4A2.4 2.4 0 0 1 4 12.6z"
          stroke="url(#growthEcosystemStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.04)"
        />
        <path d="M8 8.6h8M8 11.4h5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    heroImage: "/Creative-Content-&-Social-Media-Management.png",
    heroHeadline: "Content That's Planned, Produced, and Managed as One System.",
    heroSub:
      "Strategy, production, and day-to-day management working together — not three disconnected teams producing in isolation.",
    ctaPrimaryLabel: "Book a Content & Social Consultation",
    ctaSecondaryLabel: "Download the Content & Social Overview",
    subServices: [
      {
        slug: "content-strategy-planning",
        title: "Content Strategy & Planning",
        cep: "When your content has no plan behind it.",
        body: "A documented content plan connecting every post, video, and article to a specific objective — not a calendar filled on instinct.",
        bullets: [
          "3–5 content pillars tied to brand and business goals",
          "Funnel-mapped content: awareness vs. consideration vs. conversion",
          "A planned editorial calendar, not a weekly scramble",
          "A performance feedback loop into future planning",
        ],
        proof:
          "The same phase-one discipline behind Everher’s turnaround: every asset mapped to a specific objective, not created on instinct.",
      },
      {
        slug: "social-media-management",
        title: "Social Media Management",
        cep: "When your social presence is inconsistent or unmanaged.",
        body: "Day-to-day management of your social channels — publishing, response, platform-specific optimization — handled continuously. An always-on presence compounds; a sporadic one restarts from zero.",
        bullets: [
          "Day-to-day ownership across every active platform",
          "Publishing on the schedule the strategy calls for",
          "Platform-specific formatting, not recycled posts",
          "Ongoing performance monitoring feeding the content plan",
        ],
        proof:
          "The same always-on discipline that grew NTRA’s Facebook audience +71.5% and drove 7.37M engagements in six months.",
      },
      {
        slug: "creative-content-production",
        title: "Creative Content Production",
        cep: "When your content doesn't connect.",
        body: "Design, motion, and video production for every piece your strategy calls for — built for the platform it's going to live on, not repurposed after the fact.",
        bullets: [
          "Format-native production per platform",
          "Consistent creative direction tied to brand guidelines",
          "Multiple creative angles tested, not one guess scaled",
          "Data-informed refinement of what performs",
        ],
        proof:
          "The same rebalancing discipline behind Joviality’s creative mix: human-element product content scaled to 35% once it proved the top ROAS performer.",
      },
      {
        slug: "copywriting-visual-content",
        title: "Copywriting & Visual Content",
        cep: "When your words don't match the quality of your visuals.",
        body: "Copy for every touchpoint — captions, ad copy, website content — written with strategic purpose, not filled in as an afterthought.",
        bullets: [
          "Consistent brand voice across every piece",
          "Platform-specific copywriting, not one-size-fits-all",
          "Conversion-focused writing, not just description",
          "Words and imagery designed together, not bolted on",
        ],
        proof:
          "The same copy discipline behind this site’s own rule: no adjective survives without earning its place.",
      },
      {
        slug: "campaign-content-creative-development",
        title: "Campaign Content & Creative Development",
        cep: "When your campaigns need a big creative moment, not just daily content.",
        body: "Dedicated creative development for major campaigns, launches, and seasonal moments — built with more depth than day-to-day content.",
        bullets: [
          "A dedicated campaign creative brief and strategy",
          "Multiple concept directions before one is produced",
          "A full, cohesive asset set: video, static, copy",
          "Correct cross-platform adaptation of one concept",
        ],
        proof:
          "The same flagship-moment thinking behind GTS Holding’s GITEX activation and partner-award announcement, ahead of a dedicated lead-gen push.",
      },
      {
        slug: "community-management-engagement",
        title: "Community Management & Engagement",
        cep: "When your community is unmanaged.",
        body: "Ongoing moderation, response, and engagement across your social channels — protecting and building your brand presence in real time. An unanswered comment is visible to everyone.",
        bullets: [
          "Clear response protocol for tone and timing",
          "Proactive engagement, not just reactive replies",
          "An escalation path for sensitive issues",
          "Ongoing sentiment monitoring, not just volume",
        ],
        proof:
          "Part of the same always-on discipline behind NTRA’s 7.37M engagements — a public-sector brand where response quality carries real weight.",
      },
      {
        slug: "influencer-creator-content",
        title: "Influencer & Creator Content",
        cep: "When paid media alone isn't reaching new audiences.",
        body: "Influencer and creator partnerships that extend your reach into audiences paid media hasn't touched — selected for fit, not follower count alone.",
        bullets: [
          "Partner vetting for authentic audience alignment",
          "Content direction that preserves creator authenticity",
          "End-to-end campaign coordination and rights management",
          "Performance tracking beyond just posting confirmation",
        ],
        proof:
          "The same logic behind Everher’s influencer and PR strategy — partnerships that accelerated sales velocity as part of a broader transformation.",
      },
      {
        slug: "content-performance-optimization",
        title: "Content Performance Optimization",
        cep: "When you're producing content but not learning from it.",
        body: "Ongoing analysis of what content performs and why — feeding directly back into what gets planned and produced next, not just measuring output.",
        bullets: [
          "Regular performance analysis by format, topic, platform",
          "Pattern identification, separating signal from flukes",
          "Content mix rebalancing toward what the data supports",
          "Clear, actionable findings for the content team",
        ],
        proof:
          "The exact discipline behind Joviality’s creative rebalancing — mix decisions set from same-month-prior-year performance data, not assumption.",
      },
    ],
  },
  {
    step: "Step 4",
    slug: "performance-marketing",
    title: "Performance Marketing",
    accent: "orange",
    icon: (
      <>
        <path d="M4 19.5h16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M4.5 16.2l4.4-5.2 3.6 3 6-7.4"
          stroke="url(#growthEcosystemStroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.5 6.6h4v4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    heroImage: "/Performance-Marketing.png",
    heroHeadline: "Where the Strategy, Assets, and Content Get Put to Work.",
    heroSub:
      "Paid media, conversion optimization, and continuous testing — the step where everything built so far starts generating measurable return.",
    ctaPrimaryLabel: "Book a Performance Marketing Consultation",
    ctaSecondaryLabel: "See the Full Performance Marketing Landing Page",
    subServices: [
      {
        slug: "paid-media-strategy-management",
        title: "Paid Media Strategy & Management",
        cep: "When your ROI is bleeding.",
        body: "Full paid media strategy and hands-on management across Google, Meta, TikTok, Snapchat, and LinkedIn — built and run as one coordinated system, not isolated platform bets.",
        bullets: [
          "Channel strategy fit to your specific funnel",
          "Campaign structure built for scalable, clean attribution",
          "Always-on management, not set-and-forget",
          "Cross-channel budget coordination",
        ],
        proof:
          "The same always-on structure that let Joviality scale spend +103% while ROAS improved +5.7% — growth without paying more per result.",
      },
      {
        slug: "digital-media-buying-optimization",
        title: "Digital Media Buying & Optimization",
        cep: "When you're spending more but not getting more.",
        body: "Hands-on, day-to-day media buying and optimization — bid strategy, audience refinement, and budget reallocation based on live performance, not a launch-and-leave setup.",
        bullets: [
          "Bid strategy management matched to objectives",
          "Continuous audience refinement based on real conversion",
          "Real-time budget reallocation toward what's working",
          "Creative rotation ahead of fatigue",
        ],
        proof:
          "The same buying discipline behind Joviality’s 12-stage Google restructure — conversion volume grew 4.7x while cost-per-conversion held flat.",
      },
      {
        slug: "conversion-funnel-optimization",
        title: "Conversion & Funnel Optimization",
        cep: "When traffic isn't turning into customers.",
        body: "Systematic optimization of your funnel — landing pages, checkout, forms — closing the gap between a click and a completed action with evidence, not guesswork.",
        bullets: [
          "Behavioral analysis: heatmaps, session recordings, analytics",
          "Hypothesis-driven testing, not a redesign for its own sake",
          "Structured A/B and multivariate testing",
          "Iterative rollout of proven winners",
        ],
        proof:
          "The exact discipline behind Everher’s +272% peak conversion uplift — data-driven optimization, not a guess at what ‘looks better.’",
      },
      {
        slug: "app-growth-user-acquisition",
        title: "App Growth & User Acquisition",
        cep: "When app installs aren't turning into active users.",
        body: "Full-funnel app growth strategy — acquisition, activation, retention — built to grow users who actually stay, not just install counts.",
        bullets: [
          "Paid acquisition where your real audience actually is",
          "Activation funnel design so new users reach core value fast",
          "Retention-focused targeting, not install-count optimization",
          "Full post-install event tracking and attribution",
        ],
        proof:
          "The same full-funnel discipline behind Fawry’s 6M+ installs and 1M monthly active users — mass adoption where every install had to be real.",
      },
      {
        slug: "app-store-optimization-aso",
        title: "App Store Optimization (ASO)",
        cep: "When your app isn't found organically.",
        body: "App Store and Google Play optimization — metadata, screenshots, review strategy — built to capture organic install intent so paid acquisition isn't doing all the work.",
        bullets: [
          "Keyword and metadata optimization matched to search behavior",
          "A/B tested screenshots and preview videos",
          "Review velocity and rating management",
          "Continuous iteration as algorithms and listings shift",
        ],
        proof:
          "Part of the same system behind Fawry’s 100,000 organic installs generated through ASO alone — discovery with no paid click required.",
      },
      {
        slug: "continuous-testing-optimization",
        title: "Continuous Testing & Optimization",
        cep: "When you've scaled spend before and just burned more budget faster.",
        body: "An ongoing testing discipline across creative, audience, and offer — so every scaling decision is backed by evidence. Scaling on assumption burns budget; scaling on validated winners compounds it.",
        bullets: [
          "Every growth lever isolated and tested individually",
          "Statistical validation before a result is trusted",
          "Budget follows only what testing has proven",
          "Testing never fully stops as conditions shift",
        ],
        proof:
          "The exact discipline that let Merova hold ground through its most competitive season — every lever tested before a unit of budget scaled.",
      },
      {
        slug: "performance-analytics-tracking-attribution",
        title: "Performance Analytics & Tracking / Attribution",
        cep: "When you can't tell what's actually driving results.",
        body: "Tracking infrastructure setup and ongoing attribution reporting — the foundation every other service on this page depends on to prove what's actually working. Inaccurate data doesn't just distort reporting; it puts every scaling decision at risk.",
        bullets: [
          "Pixel and conversion event setup done correctly the first time",
          "Attribution modeling beyond a last-click default",
          "Live dashboard configuration, not a static monthly PDF",
          "Ongoing accuracy audits to catch tracking drift early",
        ],
        proof:
          "This is the exact issue that inflated Merova’s conversion numbers for months — a structural tracking gap masking efficiency until a full rebuild restored it.",
      },
    ],
  },
];

export function getGrowthStep(slug: string) {
  return GROWTH_STEPS.find((s) => s.slug === slug);
}

/**
 * Dedicated sub-pages for individual "Our Approach" steps on a service page.
 *
 * A service's approach.steps entry can optionally link to one of these — the
 * step becomes clickable and opens its own full page (hero, problem,
 * framework, scope, related links, CTA), reusing the same design system as
 * every other inner page via ApproachPageTemplate.
 */

export type ApproachPage = {
  /** Slug of the parent ServiceDetail this page belongs to */
  parentSlug: string;
  parentTitle: string;
  /** URL: /services/<parentSlug>/<slug> */
  slug: string;
  title: string;
  /** Bold hero headline */
  tagline: string;
  /** Hero paragraph under the tagline */
  intro: string;
  /** Category Entry Point — the trigger moment a client feels */
  cep: string;
  accent: "blue" | "orange";
  /** Optional full-bleed hero background image — falls back to the accent gradient wash when absent */
  image?: string;
  /** Optional background image for the closing CTA panel */
  ctaImage?: string;

  problem: {
    heading: string;
    body: string;
  };

  approach: {
    heading: string;
    steps: { title: string; body: string }[];
  };

  included: {
    items: string[];
    /** e.g. "Tooling: ...", "Delivery: ...", "Format: ..." */
    note?: string;
    /** Optional supporting image shown beside the scope list */
    image?: string;
  };

  proof?: {
    body: string;
  };

  related: { label: string; description: string; href: string }[];

  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export const APPROACH_PAGES: ApproachPage[] = [
  {
    parentSlug: "strategy-consulting",
    parentTitle: "Strategy & Consulting",
    slug: "go-to-market",
    title: "Go-to-Market Strategy",
    tagline: "You Don't Have a Launch Problem. You Have a Strategy Problem.",
    intro:
      "A new product, a new market, a new positioning — they all require the same thing before execution begins: a single, aligned plan that tells every team exactly what to do and why. ARQQA's Go-to-Market Strategy service translates business objectives into a sequenced growth roadmap with measurable milestones.",
    cep: "When you're about to launch but the brief is still being argued over.",
    accent: "blue",
    image: "/services/go-to-market-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Most go-to-market failures aren't execution failures. They're alignment failures.",
      body: "Teams move in different directions. Creative builds for the wrong audience. Media buys on the wrong channels. The brand launches — and nothing moves. A go-to-market strategy isn't a presentation. It's a decision-making framework that every team operates from on day one.",
    },
    approach: {
      heading: "From market map to growth blueprint.",
      steps: [
        {
          title: "Market Mapping",
          body: "We analyze the category, the competitive set, and the whitespace. Where is demand unmet? Where is competition weakest? Where does your brand have a credible right to win?",
        },
        {
          title: "Audience Architecture",
          body: "Segmentation by behavior and intent, not just demographics. We define the primary growth audience, the expansion audience, and the messaging hierarchy for each.",
        },
        {
          title: "Channel Selection",
          body: "Which channels reach your audience at the lowest CPA, with the highest conversion probability? We model channel mix against budget and timeline before a single booking is made.",
        },
        {
          title: "The Growth Blueprint",
          body: "A phased, milestone-driven roadmap: 30-day launch, 90-day growth, 180-day scale. Clear KPIs at every gate. Decision trees for budget reallocation. A single source of truth for every stakeholder.",
        },
      ],
    },
    included: {
      items: [
        "Market analysis report",
        "Audience segmentation framework",
        "Competitive landscape mapping",
        "Channel mix recommendation with rationale",
        "Phased go-to-market roadmap (30/90/180 days)",
        "KPI dashboard setup",
        "Budget allocation model",
        "Stakeholder alignment presentation",
      ],
      note: "Tooling: Google Market Finder, Meta Audience Insights, SEMrush, ClickUp, HubSpot",
      image: "/services/go-to-market-included.webp",
    },
    related: [
      {
        label: "Growth Audit",
        description: "Validate your current baseline before launching.",
        href: "/services/strategy-consulting/growth-audit",
      },
      {
        label: "The Catalyst System™",
        description: "Execute the strategy with full integration.",
        href: "/services/catalyst-system",
      },
      {
        label: "Social Media & Community Management",
        description: "Activate the channel plan.",
        href: "/services/community-management",
      },
    ],
    cta: {
      primary: { label: "Start a Discovery Call", href: "/start#book-strategy-call" },
      secondary: { label: "Download the GTM Planning Framework", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "strategy-consulting",
    parentTitle: "Strategy & Consulting",
    slug: "growth-audit",
    title: "Growth Audit",
    tagline: "You Can't Fix What You Haven't Diagnosed.",
    intro:
      "The Growth Audit is a structured diagnostic of your entire marketing infrastructure. Seven dimensions. Scored. Benchmarked against category norms. Delivered with a prioritized action plan and a clear verdict on where your biggest growth levers are buried.",
    cep: "When performance has plateaued and nobody agrees on why.",
    accent: "orange",
    image: "/services/go-to-market-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Most brands are sitting on hidden performance gaps they've never quantified.",
      body: "Inefficient media buying. Disconnected creative and media teams. Reporting that measures activity, not outcomes. Most brands operating in the MENA market have never quantified where these gaps actually sit. The Growth Audit surfaces all of it — with precision, not opinion.",
    },
    approach: {
      heading: "The 7-dimension diagnostic framework.",
      steps: [
        { title: "Strategy Clarity", body: "Is your positioning defensible and consistent?" },
        { title: "Creative Integration", body: "Is your creative built for the channel, or against it?" },
        { title: "Media Efficiency", body: "What is your true cost-per-outcome, fully attributed?" },
        { title: "Technology Stack", body: "Are your tools integrated or siloed?" },
        { title: "Data Maturity", body: "Are decisions made on insight or instinct?" },
        { title: "Team Structure", body: "Who owns growth? Is accountability clear?" },
        { title: "Reporting Quality", body: "Do your reports show what changed, or just what happened?" },
      ],
    },
    included: {
      items: [
        "Pre-audit questionnaire and data access request",
        "7-dimension audit scorecard with benchmarks",
        "Gap analysis against category-level performance norms",
        "Prioritized opportunity map (quick wins vs. structural fixes)",
        "90-day action plan with ownership assignments",
        "Executive summary presentation (board-ready)",
      ],
      note: "Delivery: 10 business days from data access. Format: PDF report + live presentation.",
      image: "/services/go-to-market-included.webp",
    },
    proof: {
      body: "Before the Nile Air engagement, ARQQA completed a channel efficiency audit that identified a 67% budget concentration in low-intent placements. Reallocating to route-level intent targeting contributed directly to a 237x ROAS outcome.",
    },
    related: [
      {
        label: "Go-to-Market Strategy",
        description: "Act on what the audit reveals.",
        href: "/services/strategy-consulting/go-to-market",
      },
      {
        label: "Technology",
        description: "Restructure the media mix and fix the data infrastructure.",
        href: "/services/technology",
      },
      {
        label: "The Catalyst System™",
        description: "Restructure the media mix with accountability.",
        href: "/services/catalyst-system",
      },
    ],
    cta: {
      primary: { label: "Request a Growth Audit", href: "/start#growth-audit" },
      secondary: { label: "Download the Self-Assessment Version", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "strategy-consulting",
    parentTitle: "Strategy & Consulting",
    slug: "competitive-analysis",
    title: "Competitive Analysis",
    tagline: "Know Exactly What You're Up Against. And Where They're Weak.",
    intro:
      "Competitive Analysis at ARQQA is not a slide with competitor logos and a feature checklist. It's an intelligence operation. Messaging deconstruction. Media spend estimation. Positioning gap identification. The output is not a report — it's a competitive advantage.",
    cep: "When you're losing market share and you don't know to whom or why.",
    accent: "blue",
    image: "/services/go-to-market-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Most brands make competitive decisions based on noise, not intelligence.",
      body: "A competitor's Instagram feed. A few Google ads. A redesigned website. That's surface-level, not intelligence. Real competitive analysis examines the architecture beneath — how they're positioned, where they're investing, what audiences they're targeting, and crucially, where they've left the door open.",
    },
    approach: {
      heading: "From competitive universe to opportunity matrix.",
      steps: [
        {
          title: "Competitive Universe Mapping",
          body: "We define the full competitive landscape: direct competitors, indirect substitutes, and emerging challengers. We prioritize by threat level and market overlap.",
        },
        {
          title: "Messaging & Positioning Deconstruction",
          body: "Every competitor's messaging hierarchy is analyzed: what they lead with, what they avoid, what audiences they address. We identify the whitespace your brand can occupy credibly.",
        },
        {
          title: "Media & Channel Intelligence",
          body: "Using platform-level tools, we estimate spend allocation, creative volume, and channel emphasis across the competitive set. Where is money moving? What's working for them?",
        },
        {
          title: "Opportunity Matrix",
          body: "A scored matrix of positioning opportunities ranked by accessibility, differentiation potential, and audience size. This becomes the strategic input for your messaging and media decisions.",
        },
      ],
    },
    included: {
      items: [
        "Competitive landscape map (up to 8 competitors)",
        "Messaging and positioning analysis per competitor",
        "Media spend and channel allocation estimates",
        "Creative strategy assessment (formats, frequency, tone)",
        "SEO and content gap analysis",
        "Whitespace opportunity matrix",
        "Strategic recommendations report",
      ],
      note: "Tooling: SEMrush, SimilarWeb, Meta Ad Library, Google Ads Transparency Center, Sprout Social",
      image: "/services/go-to-market-included.webp",
    },
    related: [
      {
        label: "Go-to-Market Strategy",
        description: "Use the intelligence to build the plan.",
        href: "/services/strategy-consulting/go-to-market",
      },
      {
        label: "Asset Building",
        description: "Differentiate visually as well as strategically.",
        href: "/services/asset-building",
      },
      {
        label: "The Catalyst System™",
        description: "Target the gaps the analysis reveals.",
        href: "/services/catalyst-system",
      },
    ],
    cta: {
      primary: { label: "Commission a Competitive Analysis", href: "/start#book-strategy-call" },
      secondary: { label: "See How We Applied This for Fawry", href: "/work/fawry" },
    },
  },
  {
    parentSlug: "strategy-consulting",
    parentTitle: "Strategy & Consulting",
    slug: "discovery-workshops",
    title: "Paid Discovery Workshops",
    tagline: "Clarity Has a Price. It's Worth Every Dirham.",
    intro:
      "The Paid Discovery Workshop is a structured half-day or full-day working session with ARQQA's senior strategists. By the end, your team leaves with a single, agreed growth direction — documented, assigned, and ready to execute. No more six-week onboarding. No more briefing decks that never become strategy.",
    cep: "When alignment meetings have stopped producing alignment.",
    accent: "orange",
    image: "/services/go-to-market-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "\"Free discovery\" is a misnomer.",
      body: "The real cost of an unpaid, informal briefing process is borne in misaligned execution — creative built on assumptions, campaigns launched without consensus, retainer months lost to scope correction. The ARQQA Discovery Workshop front-loads alignment with rigor. Paid because it's structured. Valuable because it's structured.",
    },
    approach: {
      heading: "Three phases. One agreed direction.",
      steps: [
        {
          title: "Pre-Workshop — Data & Brief Collection",
          body: "Two weeks before the session, we send a structured pre-brief questionnaire. We analyze current performance data, review existing brand assets, and audit the competitive context. We arrive prepared.",
        },
        {
          title: "The Workshop — Structured Strategic Alignment",
          body: "Three to four hours. A facilitated agenda covering: business objectives → growth challenges → audience definition → channel priorities → success metrics. Every decision is documented in real time in a shared workspace. Disagreements are surfaced and resolved, not buried.",
        },
        {
          title: "Post-Workshop — The Strategic Output Package",
          body: "Within five business days: a completed strategy brief, a prioritized challenge list, an agreed KPI framework, and a recommended 90-day roadmap. The foundation for every team to start executing from.",
        },
      ],
    },
    included: {
      items: [
        "Pre-workshop questionnaire and data request",
        "Senior strategist facilitation (2 ARQQA leads)",
        "Real-time documentation in shared ClickUp workspace",
        "Post-workshop strategy brief document",
        "KPI alignment framework",
        "90-day priority roadmap",
        "Workshop recording (video, upon request)",
      ],
      note: "Format: Half-day (3h) or Full-day (6h). Available in-person (Cairo, Dubai, Riyadh) or remote.",
      image: "/services/go-to-market-included.webp",
    },
    related: [
      {
        label: "Go-to-Market Strategy",
        description: "The natural next step after the workshop.",
        href: "/services/strategy-consulting/go-to-market",
      },
      {
        label: "The Catalyst System™",
        description: "Full execution following strategic alignment.",
        href: "/services/catalyst-system",
      },
      {
        label: "Growth Audit",
        description: "If a deeper diagnostic is needed before the workshop.",
        href: "/services/strategy-consulting/growth-audit",
      },
    ],
    cta: {
      primary: { label: "Book a Discovery Workshop", href: "/start#book-strategy-call" },
      secondary: { label: "Download the Workshop Agenda Template", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "asset-building",
    parentTitle: "Asset Building",
    slug: "branding",
    title: "Brand Identity & Design",
    tagline: "A Brand Is a System. Not a Logo.",
    intro:
      "ARQQA's Brand Identity & Design service builds the complete visual and verbal foundation of your brand — from logo architecture and color systems to typography, tone of voice, and usage guidelines. The output is a brand that performs consistently across every channel, every market, and every team member who deploys it.",
    cep: "When your brand looks different on every platform and nobody knows why.",
    accent: "orange",
    image: "/services/asset-building-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Brand inconsistency is a tax on your marketing budget.",
      body: "Every campaign that launches without a coherent identity spends twice — once to reach the audience, and again to remind them who you are. ARQQA builds brands as systems: documented, scalable, and deployable without constant creative supervision.",
    },
    approach: {
      heading: "From meaning to master guidelines.",
      steps: [
        {
          title: "Brand Discovery",
          body: "Workshops to extract positioning, values, personality, and competitive differentiation. This is the strategic foundation that all visual decisions derive from — not aesthetics first, but meaning first.",
        },
        {
          title: "Visual Identity Development",
          body: "Logo architecture (primary, secondary, icon variants), color system, typography hierarchy, iconography style, photography and illustration direction. Every element validated against both digital and print environments.",
        },
        {
          title: "Verbal Identity",
          body: "Brand voice definition. Tone of voice guidelines across contexts: formal, conversational, social, crisis. Tagline development. Key messaging hierarchy for primary audiences.",
        },
        {
          title: "Brand Guidelines Document",
          body: "A complete, master brand guidelines document: the single source of truth for every designer, copywriter, and agency who works with your brand. Built to be used, not filed.",
        },
      ],
    },
    included: {
      items: [
        "Brand discovery workshop (2 sessions)",
        "Logo system (primary + secondary + icon + monochrome variants)",
        "Color palette with digital and print specifications",
        "Typography system with hierarchy guidelines",
        "Iconography set (20 custom icons)",
        "Photography and visual direction guide",
        "Brand voice and tone of voice manual",
        "Tagline development (3 concepts, 1 selected and refined)",
        "Master brand guidelines PDF (30–50 pages)",
        "All source files (Adobe Illustrator, Figma, packaged fonts)",
      ],
      note: "Tooling: Figma, Adobe Illustrator, Adobe InDesign. Timeline: 6–8 weeks from brief sign-off.",
      image: "/services/asset-building-approach-included.webp",
    },
    related: [
      {
        label: "Visual Identity Rollout Kits",
        description: "Deploy the brand across all channels.",
        href: "/services/asset-building/visual-identity",
      },
      {
        label: "Technology",
        description: "Translate the brand to digital.",
        href: "/services/technology",
      },
      {
        label: "Social Media Video Production",
        description: "Bring the brand to life in motion.",
        href: "/services/video-production",
      },
    ],
    cta: {
      primary: { label: "Start a Brand Project", href: "/start#book-strategy-call" },
      secondary: { label: "See Our Brand Identity Work", href: "/work/kenzup" },
    },
  },
  {
    parentSlug: "asset-building",
    parentTitle: "Asset Building",
    slug: "company-profiles",
    title: "Company Profiles & Collateral",
    tagline: "Every Touchpoint Is a Brand Impression. Make It Count.",
    intro:
      "From corporate profiles and pitch decks to capability statements and credential documents — ARQQA designs and writes the collateral that represents your business in every high-stakes communication. Designed for impact. Written for decision-makers.",
    cep: "When your pitch deck looks like it was built in a hurry — because it was.",
    accent: "blue",
    image: "/services/asset-building-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Collateral is often the first thing a prospect judges.",
      body: "A poorly designed company profile or a generic capability statement signals that your attention to detail stops at the front door. ARQQA builds collateral that communicates credibility before you've said a word.",
    },
    approach: {
      heading: "From narrative to production-ready deliverable.",
      steps: [
        {
          title: "Content Architecture",
          body: "We define the narrative structure before design begins. What story are we telling, in what order, for which audience? Company profiles tell a different story than pitch decks. Capability statements serve a different function than credentials documents.",
        },
        {
          title: "Copywriting",
          body: "All copy is written by ARQQA's team. Strategic, empirical, and aligned to your brand voice. No filler, no superlatives. Every sentence earns its place.",
        },
        {
          title: "Design & Layout",
          body: "Visual design that reflects your brand identity. Grid-based layouts for readability at print and screen scale. Every design is delivered in both print-ready and screen-optimized formats.",
        },
      ],
    },
    included: {
      items: [
        "Corporate profile / company brochure (print & digital)",
        "Capability statement (2-page and extended versions)",
        "Pitch deck template (10–15 slides, editable in PowerPoint/Keynote)",
        "Credentials presentation (bespoke per pitch, upon request)",
        "Executive bio cards",
        "Business card design",
        "Email signature design",
      ],
      note: "Tooling: Adobe InDesign, Figma, PowerPoint/Keynote templates. Timeline: 3–4 weeks per deliverable set.",
      image: "/services/asset-building-approach-included.webp",
    },
    related: [
      {
        label: "Brand Identity & Design",
        description: "Ensure collateral is built on a solid brand foundation.",
        href: "/services/asset-building/branding",
      },
      {
        label: "Visual Identity Rollout Kits",
        description: "Deploy across all additional touchpoints.",
        href: "/services/asset-building/visual-identity",
      },
      {
        label: "Social Media Video Production",
        description: "Extend the narrative into motion.",
        href: "/services/video-production",
      },
    ],
    cta: {
      primary: { label: "Get a Collateral Package Quote", href: "/start#book-strategy-call" },
      secondary: { label: "Download a Sample Company Profile", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "asset-building",
    parentTitle: "Asset Building",
    slug: "visual-identity",
    title: "Visual Identity Rollout Kits",
    tagline: "A Brand That Exists Only in a Guidelines PDF Is Not a Brand.",
    intro:
      "The Visual Identity Rollout Kit is the deployment layer of your brand. Everything your team needs to activate the identity consistently across every digital and physical channel — built, sized, and production-ready from day one.",
    cep: "When your brand exists on paper but looks inconsistent everywhere else.",
    accent: "orange",
    image: "/services/asset-building-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Brand guidelines without rollout kits are instructions without tools.",
      body: "Teams default to improvisation. Agencies recreate assets from scratch. Consistency erodes. The Rollout Kit eliminates that gap by delivering every template, asset, and sized variant your team will actually need — pre-built and ready to deploy.",
    },
    approach: {
      heading: "From channel audit to activation guide.",
      steps: [
        {
          title: "Channel Audit",
          body: "We map every channel and touchpoint where the brand will appear. Social platforms, digital advertising, email, print, signage, merchandise, event materials. The audit determines the exact asset list.",
        },
        {
          title: "Template Production",
          body: "Every template is built in the tool your team uses — Canva, Figma, Adobe, PowerPoint. Locked brand elements. Editable content zones. Size variants for every platform specification.",
        },
        {
          title: "Brand Activation Guide",
          body: "A practical, non-designer-friendly guide for your internal team: how to use each template, what can and cannot be changed, and what to do when something doesn't fit the template.",
        },
      ],
    },
    included: {
      items: [
        "Social media template suite (Instagram, LinkedIn, Facebook, TikTok, X — feed, story, cover)",
        "Digital advertising templates (all standard IAB sizes + Meta/Google native sizes)",
        "Email template (header, footer, body blocks)",
        "Presentation master template (PowerPoint and Keynote)",
        "Document templates (letterhead, report, proposal)",
        "Signage and out-of-home templates (on request)",
        "Brand activation guide (non-designer edition)",
      ],
      note: "Tooling: Figma, Canva Brand Kit setup, Adobe Illustrator/InDesign, PowerPoint/Keynote. Timeline: 4–6 weeks from approved brand identity.",
      image: "/services/asset-building-approach-included.webp",
    },
    related: [
      {
        label: "Brand Identity & Design",
        description: "The prerequisite for any rollout kit.",
        href: "/services/asset-building/branding",
      },
      {
        label: "Social Media & Community Management",
        description: "Operate with the templates day-to-day.",
        href: "/services/community-management",
      },
      {
        label: "Social Media Video Production",
        description: "Add motion to the visual identity.",
        href: "/services/video-production",
      },
    ],
    cta: {
      primary: { label: "Get a Rollout Kit Built", href: "/start#book-strategy-call" },
      secondary: { label: "See What's Inside a Full Kit", href: "/work/kenzup" },
    },
  },
  {
    parentSlug: "technology",
    parentTitle: "Technology",
    slug: "website",
    title: "Website Design & Development",
    tagline: "Your Website Is Your Best Salesperson. Is It Doing Its Job?",
    intro:
      "ARQQA builds websites that convert. Not websites that win awards. The difference: a conversion-first architecture, performance-engineered development, and a content strategy that speaks directly to the in-market buyer. Every project is designed to achieve a Lighthouse score above 90, load in under 2.5 seconds, and close the gap between traffic and revenue.",
    cep: "When your website looks good but your conversion rate tells a different story.",
    accent: "blue",
    image: "/services/technology-website-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Most agency-built websites optimize for impression, not performance.",
      body: "Slow load times. Unclear CTAs. No consideration of the buyer's journey. ARQQA approaches every website as a business tool first and a design artifact second. The aesthetic serves the objective — always.",
    },
    approach: {
      heading: "From information architecture to a live, performant build.",
      steps: [
        {
          title: "Information Architecture",
          body: "Before design begins, we define the sitemap, user journeys, and conversion paths. Where does each persona enter? What is the minimum number of steps to conversion? What content must exist on every page?",
        },
        {
          title: "UX Design & Prototyping",
          body: "Wireframes, then interactive prototypes. Every design decision tested against the information architecture before a line of code is written. Mobile-first by default.",
        },
        {
          title: "Visual Design",
          body: "High-fidelity designs aligned to brand identity. Interaction states. Responsive breakpoints. Animation specifications. A complete visual blueprint handed to development.",
        },
        {
          title: "Development",
          body: "Built for performance: Core Web Vitals compliance (LCP < 2.5s, CLS < 0.1), clean codebase, CMS integration, analytics setup, and SEO architecture baked in from day one.",
        },
      ],
    },
    included: {
      items: [
        "Discovery and information architecture document",
        "Sitemap and user journey mapping",
        "Wireframes (all key pages)",
        "Interactive prototype (Figma)",
        "High-fidelity UI design (all pages and states)",
        "Responsive development (mobile, tablet, desktop)",
        "CMS setup and training (WordPress / Webflow / custom)",
        "SEO architecture (meta, schema, sitemap, robots.txt)",
        "Analytics integration (GA4, Meta Pixel, GTM)",
        "Performance optimization (Lighthouse 90+)",
        "30-day post-launch support",
      ],
      note: "Tooling: Figma, Webflow / WordPress / Next.js, Google Tag Manager, GA4. Timeline: 8–14 weeks depending on scope.",
      image: "/services/technology-website-included.webp",
    },
    related: [
      {
        label: "UI/UX Design",
        description: "Deep-dive UX research for complex products.",
        href: "/services/technology/ux-design",
      },
      {
        label: "CRM Integration & Automation",
        description: "Connect the website to your sales pipeline.",
        href: "/services/technology/crm",
      },
      {
        label: "The Catalyst System™",
        description: "Drive qualified traffic to the new site.",
        href: "/services/catalyst-system",
      },
    ],
    cta: {
      primary: { label: "Start a Website Project", href: "/start#book-strategy-call" },
      secondary: { label: "See Our Website Portfolio", href: "/work/nile-air" },
    },
  },
  {
    parentSlug: "technology",
    parentTitle: "Technology",
    slug: "mobile-apps",
    title: "Mobile App Design & Development",
    tagline: "An App Nobody Uses Is Infrastructure Nobody Needed.",
    intro:
      "ARQQA designs and builds mobile applications that users return to. Not just download. Our practice combines deep UX research, conversion-optimized onboarding design, and performance-engineered development — built for iOS and Android with the MENA user's behavior, language, and digital context in mind.",
    cep: "When your app installs aren't becoming active users.",
    accent: "orange",
    image: "/services/technology-website-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "App abandonment is a design and onboarding problem, not a marketing problem.",
      body: "Most apps lose 77% of their daily active users within three days of install. The failure point is almost always the onboarding experience — too many steps, too little clarity, too much friction before the first value moment. We eliminate that friction before launch.",
    },
    approach: {
      heading: "From user research to a shipped, staged release.",
      steps: [
        {
          title: "User Research & App Strategy",
          body: "Who is the primary user? What is their first value moment? What is the minimum viable onboarding flow? We define the app strategy before the first screen is designed.",
        },
        {
          title: "UX Architecture & Flows",
          body: "Complete user flow mapping. Every screen. Every state. Every edge case. The UX architecture is signed off before visual design begins.",
        },
        {
          title: "UI Design",
          body: "Platform-native design systems (iOS Human Interface Guidelines, Android Material Design). Full design system with components, colors, typography, and interaction patterns. Dark mode and accessibility compliant.",
        },
        {
          title: "Development & QA",
          body: "React Native or native development depending on requirements. Staged releases: internal alpha → beta testing → production. Full QA cycle including regression, performance, and accessibility testing.",
        },
      ],
    },
    included: {
      items: [
        "App strategy document and technical brief",
        "User research and persona definition",
        "Complete UX flow architecture",
        "Wireframes and interactive prototype",
        "Full UI design system (iOS and Android)",
        "Development (React Native or native)",
        "App Store Optimization (ASO) — metadata, screenshots, preview video",
        "App Store and Google Play submission",
        "Post-launch monitoring and crash reporting setup",
      ],
      note: "Tooling: Figma, React Native / Swift / Kotlin, Firebase, Mixpanel, Crashlytics.",
      image: "/services/technology-website-included.webp",
    },
    proof: {
      body: "Fawry: 6M+ app installs. 1M monthly active users within 18 months. First fintech super-app in MENA by install volume. ASO alone generated 100K organic installs.",
    },
    related: [
      {
        label: "UI/UX Design",
        description: "Extended research for complex product experiences.",
        href: "/services/technology/ux-design",
      },
      {
        label: "The Catalyst System™",
        description: "Drive installs with full attribution.",
        href: "/services/catalyst-system",
      },
      {
        label: "CRM Integration & Automation",
        description: "Connect app user data to the marketing stack.",
        href: "/services/technology/crm",
      },
    ],
    cta: {
      primary: { label: "Start an App Project", href: "/start#book-strategy-call" },
      secondary: { label: "See the Fawry App Case Study", href: "/work/fawry" },
    },
  },
  {
    parentSlug: "technology",
    parentTitle: "Technology",
    slug: "ux-design",
    title: "UI/UX Design",
    tagline: "Good Design Is Invisible. Bad Design Is Expensive.",
    intro:
      "ARQQA's UI/UX Design practice exists independently of development — for brands that need a product or experience designed, validated, and handed off to an internal or third-party development team. Research-driven. Evidence-based. Designed for real users, not hypothetical ones.",
    cep: "When your product works technically but users can't figure it out.",
    accent: "blue",
    image: "/services/technology-website-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Usability failures cost more than redesigns.",
      body: "Every percentage point of drop-off in a conversion funnel, every support ticket generated by a confusing interface, every user who abandons onboarding — all of these have a measurable cost. UX design is not a polish step. It's a revenue protection strategy.",
    },
    approach: {
      heading: "From evidence to a development-ready design system.",
      steps: [
        {
          title: "Discovery & Research",
          body: "User interviews, competitor UX benchmarking, heuristic analysis of existing product, analytics review (drop-off points, rage clicks, session recordings). Evidence-based problem definition before any design begins.",
        },
        {
          title: "Information Architecture & Flows",
          body: "Sitemap, user flows, content hierarchy. The structural layer that makes every design decision defensible rather than arbitrary.",
        },
        {
          title: "Wireframing & Prototyping",
          body: "Low-fidelity wireframes for rapid iteration. Interactive prototypes for user testing. We validate with real users before investing in high-fidelity design.",
        },
        {
          title: "High-Fidelity Design & Design System",
          body: "Final UI with complete component library. Annotation layer for development handoff. Interaction specifications. Accessibility compliance documentation.",
        },
      ],
    },
    included: {
      items: [
        "UX audit of existing product (if applicable)",
        "User research (interviews + analytics)",
        "Information architecture and user flow documentation",
        "Low-fidelity wireframes",
        "Interactive prototype (Figma)",
        "Usability testing (3 rounds minimum)",
        "High-fidelity UI design with full component library",
        "Developer handoff documentation (Figma with annotations)",
      ],
      note: "Tooling: Figma, Maze (usability testing), Hotjar, Mixpanel.",
      image: "/services/technology-website-included.webp",
    },
    related: [
      {
        label: "Website Design & Development",
        description: "Full-stack execution of the UX design.",
        href: "/services/technology/website",
      },
      {
        label: "Mobile App Design & Development",
        description: "Product design with development included.",
        href: "/services/technology/mobile-apps",
      },
      {
        label: "E-commerce",
        description: "Conversion-optimized UX for store experiences.",
        href: "/services/technology/ecommerce",
      },
    ],
    cta: {
      primary: { label: "Book a UX Audit", href: "/start#book-strategy-call" },
      secondary: { label: "Download the UX Heuristics Checklist", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "technology",
    parentTitle: "Technology",
    slug: "crm",
    title: "CRM Integration & Automation",
    tagline: "A Lead That Isn't Followed Up in Four Hours Is a Lead That's Gone.",
    intro:
      "ARQQA's CRM practice connects your marketing stack, sales pipeline, and customer data into one automated, accountable system. We implement, integrate, and automate HubSpot, Salesforce, or custom CRM solutions — so that every lead captured is tracked, scored, nurtured, and handed to sales at exactly the right moment.",
    cep: "When leads fall through the cracks between marketing and sales.",
    accent: "orange",
    image: "/services/technology-website-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "The gap between qualified leads and closed revenue is a process problem.",
      body: "Leads captured on landing pages that never reach the CRM. Follow-up sequences that run manually when they should run automatically. Sales teams without lead scoring who treat every inquiry identically. We close that gap.",
    },
    approach: {
      heading: "From CRM audit to a fully automated pipeline.",
      steps: [
        {
          title: "CRM Audit & Architecture",
          body: "Whether you have an existing CRM or are starting from scratch, we map your customer journey, define pipeline stages, and design the data architecture before any tool configuration begins.",
        },
        {
          title: "Platform Implementation",
          body: "HubSpot is our primary platform — we are certified HubSpot partners. We also work with Salesforce, Zoho, and custom solutions. Implementation includes deal pipeline setup, contact properties, lead scoring models, and user permission architecture.",
        },
        {
          title: "Integration",
          body: "Your CRM connected to: website forms, landing pages, paid media platforms (Meta, Google), email marketing, WhatsApp Business, and any other touchpoint in your stack. Every lead source tracked. Every touchpoint attributed.",
        },
        {
          title: "Automation",
          body: "Lead nurture sequences. Sales task automation. Onboarding workflows. Re-engagement campaigns. Internal notification triggers. Every repetitive process that currently runs manually is mapped and automated.",
        },
      ],
    },
    included: {
      items: [
        "CRM strategy and architecture document",
        "Platform implementation (HubSpot / Salesforce / Zoho)",
        "Pipeline and deal stage configuration",
        "Lead scoring model design and setup",
        "Integration with website, ad platforms, and communication tools",
        "Email automation sequences (5 workflows minimum)",
        "WhatsApp Business API integration (where applicable)",
        "Team training and SOP documentation",
        "30-day post-implementation support",
      ],
      note: "Tooling: HubSpot (certified), Salesforce, Zapier / Make, WhatsApp Business API.",
      image: "/services/technology-website-included.webp",
    },
    related: [
      {
        label: "The Catalyst System™",
        description: "Close the attribution loop from ad to CRM.",
        href: "/services/catalyst-system",
      },
      {
        label: "Website Design & Development",
        description: "Ensure the site feeds the CRM correctly.",
        href: "/services/technology/website",
      },
      {
        label: "Strategy & Consulting",
        description: "Define the pipeline before the CRM is built.",
        href: "/services/strategy-consulting/go-to-market",
      },
    ],
    cta: {
      primary: { label: "Start a CRM Project", href: "/start#book-strategy-call" },
      secondary: { label: "Download the CRM Implementation Checklist", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "technology",
    parentTitle: "Technology",
    slug: "ecommerce",
    title: "E-commerce",
    tagline: "Traffic Without Conversion Architecture Is Just an Audience.",
    intro:
      "ARQQA builds e-commerce experiences that sell. From Shopify and Salla store builds to full conversion funnel optimization — every element of the store is designed to reduce friction, increase average order value, and build repeat purchase behavior. For the MENA market, by a team that has operated in it for 13 years.",
    cep: "When your store gets visitors but not orders.",
    accent: "blue",
    image: "/services/technology-website-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "E-commerce failure is almost always a conversion architecture problem.",
      body: "Product pages that don't sell, checkout flows that create friction, mobile experiences that lose the sale. The average MENA e-commerce store converts at 1–2%. ARQQA-optimized stores target 4–6% through systematic funnel improvement.",
    },
    approach: {
      heading: "From platform selection to ongoing conversion optimization.",
      steps: [
        {
          title: "Store Strategy & Platform Selection",
          body: "Shopify for international and English-first brands. Salla for Arabic-first and Saudi-market brands. Custom solutions for complex catalog or B2B requirements. Platform selection is a business decision, not a preference.",
        },
        {
          title: "Store Architecture & UX",
          body: "Navigation, collection structure, product page design, cart and checkout flow. Every element designed against conversion data and MENA consumer behavior benchmarks.",
        },
        {
          title: "Build & Integration",
          body: "Store build with payment gateway integration (HyperPay, Telr, Stripe, PayTabs), logistics integration, inventory management, and analytics setup.",
        },
        {
          title: "Conversion Optimization",
          body: "Post-launch: heatmap analysis, cart abandonment recovery sequences, upsell and cross-sell configuration, A/B testing of product pages and CTAs. Conversion optimization is ongoing, not a one-time event.",
        },
      ],
    },
    included: {
      items: [
        "Platform recommendation and setup (Shopify / Salla / custom)",
        "Store UX design and development",
        "Product catalog setup and optimization",
        "Payment gateway integration",
        "Logistics and fulfillment integration",
        "Analytics and conversion tracking (GA4 + Meta Pixel)",
        "Cart abandonment recovery automation",
        "Post-launch CRO audit (30 days)",
      ],
      note: "Platforms: Shopify, Salla, WooCommerce, custom headless commerce.",
      image: "/services/technology-website-included.webp",
    },
    related: [
      {
        label: "The Catalyst System™",
        description: "Drive qualified traffic to the store.",
        href: "/services/catalyst-system",
      },
      {
        label: "Social Media & Community Management",
        description: "Build the social audience that feeds the store.",
        href: "/services/community-management",
      },
      {
        label: "CRM Integration & Automation",
        description: "Connect the store to your customer data stack.",
        href: "/services/technology/crm",
      },
    ],
    cta: {
      primary: { label: "Start an E-commerce Project", href: "/start#book-strategy-call" },
      secondary: { label: "Download the E-commerce Audit Template", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "community-management",
    parentTitle: "Social Media & Community Management",
    slug: "moderation",
    title: "Community Moderation",
    tagline: "Every Unanswered Comment Is a Missed Opportunity.",
    intro:
      "ARQQA provides dedicated, brand-trained community moderation across all your social platforms — Arabic and English, 7 days a week. We respond, engage, escalate, and report with the consistency and tone that protect and grow your brand reputation.",
    cep: "When your comments section is active and your brand is invisible in it.",
    accent: "blue",
    image: "/services/community-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Response time is a brand signal.",
      body: "Studies consistently show that 40% of social media users who receive a response from a brand within 60 minutes are more likely to recommend that brand. For most brands, the gap between a comment being posted and receiving a response is measured in days. ARQQA closes that gap.",
    },
    approach: {
      heading: "From brand voice training to a defined escalation path.",
      steps: [
        {
          title: "Brand Voice Training",
          body: "Every moderation team member is trained on your brand voice, escalation thresholds, approved response templates, and topics requiring senior review. Brand consistency is non-negotiable.",
        },
        {
          title: "Response Framework",
          body: "We build a response matrix: question types, sentiment categories, escalation triggers, and approved action per scenario. Fast, consistent, and always on-brand.",
        },
        {
          title: "Escalation Protocol",
          body: "Not everything is moderated — some comments require human judgment at senior level, PR involvement, or legal review. Our escalation protocol ensures the right eyes see the right content within defined SLAs.",
        },
      ],
    },
    included: {
      items: [
        "Platform coverage: Instagram, Facebook, LinkedIn, TikTok, X, Snapchat, YouTube",
        "Arabic and English response capability",
        "7-day coverage with defined response SLAs",
        "Brand voice training and response matrix",
        "Escalation protocol and internal notification system",
        "Weekly moderation report (volume, sentiment, flagged items)",
        "Monthly community health report",
      ],
      note: "Response SLA: 2 hours during business hours, 4 hours outside (standard). Custom SLAs available.",
      image: "/services/community-approach-included.webp",
    },
    related: [
      {
        label: "Social Listening",
        description: "Monitor beyond your own profiles.",
        href: "/services/community-management/listening",
      },
      {
        label: "Crisis Handling",
        description: "Rapid response when moderation becomes a PR situation.",
        href: "/services/community-management/crisis",
      },
      {
        label: "Social CX Automation",
        description: "Automate high-volume, low-complexity responses.",
        href: "/services/community-management/cx-automation",
      },
    ],
    cta: {
      primary: { label: "Activate Community Moderation", href: "/start#book-strategy-call" },
      secondary: { label: "See Our Community Management SLA", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "community-management",
    parentTitle: "Social Media & Community Management",
    slug: "listening",
    title: "Social Listening",
    tagline: "The Most Important Conversations About Your Brand Happen Without Tagging You.",
    intro:
      "Social listening is the practice of monitoring brand mentions, competitor activity, industry conversations, and sentiment signals across the entire digital landscape — not just your owned channels. ARQQA's social listening service delivers weekly intelligence reports that inform content, product, and communications strategy.",
    cep: "When you have no visibility on what the market is saying about your brand.",
    accent: "orange",
    image: "/services/community-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Most brands monitor their own mentions. Almost none monitor the rest.",
      body: "Fewer track untagged brand mentions. Almost none systematically monitor competitor sentiment, category conversations, or emerging customer language — the intelligence that actually informs strategy. Social listening converts the noise of the internet into actionable strategic signals.",
    },
    approach: {
      heading: "From listening architecture to strategic signal.",
      steps: [
        {
          title: "Listening Architecture Setup",
          body: "We configure your listening dashboard with: brand keyword sets (name + variations + misspellings), competitor keyword sets, industry and category terms, product and service terms, Arabic and English language variants, and regional dialect considerations.",
        },
        {
          title: "Sentiment Analysis & Reporting",
          body: "Weekly sentiment reports: volume trends, positive/negative/neutral split, top themes, emerging topics, and competitor comparison. Monthly strategic intelligence briefing: what the market is saying about your category and how to respond.",
        },
        {
          title: "Signal-to-Strategy Conversion",
          body: "The real value of social listening is not the data — it's what you do with it. ARQQA translates listening signals into content recommendations, communications adjustments, and strategic opportunities.",
        },
      ],
    },
    included: {
      items: [
        "Listening setup across all major platforms plus news and forums",
        "Arabic and English keyword monitoring",
        "Competitor monitoring (up to 5 competitors)",
        "Weekly sentiment and volume report",
        "Monthly strategic intelligence briefing",
        "Real-time alerts for sentiment spikes or brand mentions above threshold",
        "Share of voice analysis (brand vs. competitors)",
      ],
      note: "Tooling: Brandwatch / Mention / Sprout Social Listening, custom dashboards.",
      image: "/services/community-approach-included.webp",
    },
    related: [
      {
        label: "Crisis Handling",
        description: "Act immediately on the intelligence listening surfaces.",
        href: "/services/community-management/crisis",
      },
      {
        label: "Community Moderation",
        description: "Respond to what listening uncovers on owned channels.",
        href: "/services/community-management/moderation",
      },
      {
        label: "Competitive Analysis",
        description: "Combine listening data with structured competitor intelligence.",
        href: "/services/strategy-consulting/competitive-analysis",
      },
    ],
    cta: {
      primary: { label: "Start Social Listening", href: "/start#book-strategy-call" },
      secondary: { label: "See a Sample Intelligence Report", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "community-management",
    parentTitle: "Social Media & Community Management",
    slug: "crisis",
    title: "Crisis Handling",
    tagline: "A Crisis Handled in the First Hour Costs 10% of a Crisis Handled in the First Day.",
    intro:
      "ARQQA's Crisis Handling service provides rapid-response communications management for social media and digital reputation crises. Pre-built playbooks. Trained response teams. Senior communications oversight. We've operated in markets that have experienced revolutions, pandemics, and economic shocks. We understand how to hold a brand steady under pressure.",
    cep: "When a single post is threatening to become a brand crisis.",
    accent: "blue",
    image: "/services/community-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Brand crises are a predictable risk, not a rare event.",
      body: "The difference between a crisis that resolves in 24 hours and one that generates three months of negative press is almost always the speed and quality of the first response. ARQQA prepares brands for crises before they happen and manages them when they do.",
    },
    approach: {
      heading: "From playbook to narrative rebuilding.",
      steps: [
        {
          title: "Pre-Crisis — Playbook Development",
          body: "We work with your team to map crisis scenarios, define severity levels, assign ownership, and write approved response templates. When a crisis occurs, the playbook is already signed off. No 3am approval chains.",
        },
        {
          title: "Detection — Real-Time Monitoring",
          body: "Integrated with our social listening infrastructure, ARQQA monitors for crisis signals — sentiment spikes, volume anomalies, influencer mentions, media pickup — and alerts the crisis team before the situation escalates.",
        },
        {
          title: "Response — Rapid, Coordinated Action",
          body: "Crisis lead takes ownership within 30 minutes of tier-1 alert. Statement drafted, stakeholders briefed, response across all channels coordinated. Every action is logged in real time.",
        },
        {
          title: "Recovery — Narrative Rebuilding",
          body: "Post-crisis: sentiment monitoring, community re-engagement, earned media analysis, and a crisis debrief report with lessons and playbook updates.",
        },
      ],
    },
    included: {
      items: [
        "Crisis scenario mapping and severity classification",
        "Pre-approved response playbook (5–10 scenarios)",
        "Real-time monitoring with crisis threshold alerts",
        "30-minute crisis lead response SLA (tier-1 events)",
        "Full crisis management (statement drafting, stakeholder comms, channel coordination)",
        "Post-crisis sentiment monitoring (30 days)",
        "Crisis debrief report",
      ],
      note: "Availability: 24/7 on-call for active retainer clients. Playbook development available as standalone engagement.",
      image: "/services/community-approach-included.webp",
    },
    related: [
      {
        label: "Social Listening",
        description: "Early warning infrastructure.",
        href: "/services/community-management/listening",
      },
      {
        label: "Community Moderation",
        description: "First line of defense before escalation.",
        href: "/services/community-management/moderation",
      },
    ],
    cta: {
      primary: { label: "Build Your Crisis Playbook", href: "/start#book-strategy-call" },
      secondary: { label: "Talk to the Crisis Team", href: "/start#book-strategy-call" },
    },
  },
  {
    parentSlug: "community-management",
    parentTitle: "Social Media & Community Management",
    slug: "cx-automation",
    title: "Social CX Automation",
    tagline: "The Best Community Manager Is One That Works at 3am.",
    intro:
      "Social CX Automation uses intelligent workflows and chatbot technology to handle high-volume, repeatable customer interactions across your social channels — instantly, accurately, and at scale. ARQQA designs, builds, and maintains automation systems that handle the routine so your human team can focus on the complex.",
    cep: "When your inbox volume has outgrown your team's capacity.",
    accent: "orange",
    image: "/services/community-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Growing inbox volume without automation breaks response quality.",
      body: "FAQ responses. Order status queries. Complaint acknowledgements. Appointment requests. When these are handled manually, response times suffer, team burnout increases, and customer satisfaction falls. Automation brings consistency and speed without sacrificing brand voice.",
    },
    approach: {
      heading: "From interaction mapping to continuous optimization.",
      steps: [
        {
          title: "Interaction Mapping",
          body: "We audit your current social inbox to identify the top 20 interaction types by volume. These become the automation candidates — high-volume, rule-based interactions where automation adds speed without reducing quality.",
        },
        {
          title: "Flow Design & Copywriting",
          body: "Every automation flow is written in your brand voice, tested for edge cases, and designed to escalate to a human agent at the right moment. We never build automation that traps users in a loop.",
        },
        {
          title: "Platform Integration & Launch",
          body: "Integration with Meta (WhatsApp Business API, Messenger, Instagram DM), TikTok comments, and web chat. Full testing cycle before deployment.",
        },
        {
          title: "Monitoring & Optimization",
          body: "Monthly performance review: automation resolution rate, escalation rate, CSAT score for automated interactions. Continuous improvement cycles.",
        },
      ],
    },
    included: {
      items: [
        "Interaction audit and automation candidate mapping",
        "Chatbot flow design (up to 20 interaction scenarios)",
        "Brand voice copywriting for all automated responses",
        "Integration: WhatsApp Business API, Messenger, Instagram DM",
        "Human escalation logic and handoff protocols",
        "Testing and QA cycle",
        "Monthly performance reporting and flow optimization",
      ],
      note: "Tooling: ManyChat, Respond.io, WhatsApp Business API, Meta Business Suite.",
      image: "/services/community-approach-included.webp",
    },
    related: [
      {
        label: "Community Moderation",
        description: "Human coverage for escalated and complex interactions.",
        href: "/services/community-management/moderation",
      },
      {
        label: "CRM Integration & Automation",
        description: "Connect automation to your CRM for lead capture.",
        href: "/services/technology/crm",
      },
      {
        label: "Social Listening",
        description: "Monitor what the automation misses.",
        href: "/services/community-management/listening",
      },
    ],
    cta: {
      primary: { label: "Automate Your Social CX", href: "/start#book-strategy-call" },
      secondary: { label: "See a Sample Automation Flow", href: "/start#growth-audit" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "reels",
    title: "Reels & Short-Form Content",
    tagline: "You Have Three Seconds. Make Them Count.",
    intro:
      "ARQQA produces Reels and short-form video content for Instagram, TikTok, YouTube Shorts, and Snapchat Spotlight. Strategically briefed. Platform-native. Shot and edited at the pace the algorithm rewards. Built for watch-through, not just impressions.",
    cep: "When you're posting Reels but your watch-through rate is under 20%.",
    accent: "orange",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "The average Reel loses 60% of its audience in the first three seconds.",
      body: "Short-form video has the highest organic reach of any content format in 2026. It also has the highest abandonment rate. ARQQA produces short-form content with a hooks-first production philosophy — the first frame earns the second, the second earns the third. Nothing decorative. Nothing slow.",
    },
    approach: {
      heading: "From written brief to paid amplification.",
      steps: [
        {
          title: "Concept & Scripting",
          body: "Every Reel begins with a written brief: hook, message, CTA, platform, target audience, and objective. The script is approved before production begins. We don't shoot and then decide what the video is about.",
        },
        {
          title: "Production",
          body: "Shot vertical-first. Natural lighting preferred. Authentic environments over studio sets for organic content. Brand-consistent without being stiff. Pacing designed for the platform's algorithm behavior — fast cuts for TikTok, slightly longer for Instagram.",
        },
        {
          title: "Post-Production",
          body: "Editing, captions (Arabic and English), sound design, color grading, platform-optimized export. Motion graphics integration where required. Delivered in all required aspect ratios.",
        },
        {
          title: "Performance Integration",
          body: "High-performing organic Reels are flagged to the performance marketing team for paid amplification. The content that earns organic reach earns media budget.",
        },
      ],
    },
    included: {
      items: [
        "Content strategy brief per video",
        "Hook and script development",
        "Shoot day (location or studio)",
        "Full post-production: edit, color, sound, captions",
        "Platform-optimized export (Reels, TikTok, Shorts, Spotlight)",
        "Arabic and English caption versions",
        "Performance reporting at 30 days",
      ],
      note: "Packages: Monthly retainer (8, 16, or 24 videos/month) or per-project basis.",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Social Media & Community Management",
        description: "Integrate Reels into the full content calendar.",
        href: "/services/community-management",
      },
      {
        label: "The Catalyst System™",
        description: "Amplify top-performing organic content.",
        href: "/services/catalyst-system",
      },
      {
        label: "Content Creator Direction & Scripting",
        description: "For creator-led content strategy.",
        href: "/services/video-production/scripting",
      },
    ],
    cta: {
      primary: { label: "Start a Reels Package", href: "/start#book-strategy-call" },
      secondary: { label: "See Sample Reels Work", href: "/work" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "brand-films",
    title: "Brand Films & Commercials",
    tagline: "The Brands People Remember Have Told a Story Worth Remembering.",
    intro:
      "ARQQA produces brand films and commercial content for digital distribution — long-form narratives that build emotional equity and brand memory. From 60-second brand manifestos to 3-minute documentary-style films, every production is rooted in strategic narrative design and executed at commercial standard.",
    cep: "When your brand needs to communicate something that can't fit in a Reel.",
    accent: "blue",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Brand films are the most frequently misexecuted format.",
      body: "The failure mode is always the same: beautiful production in service of a script that doesn't communicate anything meaningful. ARQQA's brand film process is narrative-first. The script is the product. The shoot is execution.",
    },
    approach: {
      heading: "From strategic objective to a finished cut-down suite.",
      steps: [
        {
          title: "Narrative Strategy",
          body: "Before any brief is written, we define the strategic objective: what should audiences feel, believe, or do differently after watching this film? We work backwards from that outcome to the story.",
        },
        {
          title: "Script & Storyboard",
          body: "Full script development through multiple drafts with client collaboration. Storyboard or animatic for visual alignment before the shoot. No surprises on production day.",
        },
        {
          title: "Production",
          body: "Full production crew: director, DOP, sound, lighting, styling. Location scouting and management. Talent casting and direction. Multi-camera setup for complex productions.",
        },
        {
          title: "Post-Production",
          body: "Edit, color grade, sound design and music (licensed or original composition), motion graphics, VFX where required. Multiple cut-downs for digital distribution: 15s, 30s, 60s, full-length.",
        },
      ],
    },
    included: {
      items: [
        "Narrative strategy document",
        "Full script development (up to 3 revision rounds)",
        "Storyboard or animatic",
        "Location scouting and management",
        "Full production crew and equipment",
        "Talent casting and direction",
        "Post-production: edit, color, sound design, music, motion graphics",
        "Multiple cut-downs: 15s, 30s, 60s, full-length",
        "Digital distribution optimization (aspect ratios, formats)",
      ],
      note: "Timeline: 4–8 weeks from brief to delivery, depending on scope.",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Motion Graphics & Animation",
        description: "Integrated into brand films for added production value.",
        href: "/services/video-production/motion-graphics",
      },
      {
        label: "The Catalyst System™",
        description: "Deploy the film as paid media.",
        href: "/services/catalyst-system",
      },
      {
        label: "Brand Identity & Design",
        description: "Ensure the film is consistent with brand architecture.",
        href: "/services/asset-building/branding",
      },
    ],
    cta: {
      primary: { label: "Start a Brand Film", href: "/start#book-strategy-call" },
      secondary: { label: "See Our Commercial Showreel", href: "/work" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "product-videos",
    title: "Product & Service Videos",
    tagline: "Show. Don't Tell. Convert Faster.",
    intro:
      "Product and service videos reduce purchase hesitation and increase conversion rates by showing exactly what the customer gets before they commit. ARQQA produces product demo videos, explainer videos, and service walkthrough content that speaks directly to the buyer's decision-making moment.",
    cep: "When customers need to understand your product before they'll consider buying it.",
    accent: "orange",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Consumers who watch a product video are 80% more likely to purchase.",
      body: "Yet most product videos are either too long, too technical, too sales-forward, or all three. ARQQA produces product videos structured around the buyer's question — not the brand's feature list.",
    },
    approach: {
      heading: "From objection to conversion, by design.",
      steps: [
        {
          title: "Objection Mapping",
          body: "We start by mapping the top five purchase objections for your product or service. The video script is structured to address each one — transparently, not defensively.",
        },
        {
          title: "Format Selection",
          body: "Live-action product demo. Talking-head explanation. Screen-capture walkthrough for software. Lifestyle context video. Animation for complex or abstract services. Format selected based on what best closes the objection, not what's cheapest to produce.",
        },
        {
          title: "Conversion Architecture",
          body: "Every product video is produced with a conversion objective: what should the viewer do immediately after watching? CTA is built into the video structure, not added as an afterthought.",
        },
      ],
    },
    included: {
      items: [
        "Objection mapping and script brief",
        "Script development and approval",
        "Storyboard (for animation or complex live-action)",
        "Production (live-action or animation)",
        "Post-production: edit, captions, music, graphics",
        "Platform-optimized export (website, social, paid media)",
        "Arabic and English versions",
      ],
      note: "Formats: Demo video (60–180s), explainer animation (60–120s), service walkthrough (2–4 min).",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Motion Graphics & Animation",
        description: "For SaaS, fintech, or complex service explanations.",
        href: "/services/video-production/motion-graphics",
      },
      {
        label: "The Catalyst System™",
        description: "Run the product video as a conversion campaign.",
        href: "/services/catalyst-system",
      },
      {
        label: "E-commerce",
        description: "Embed in product pages for direct conversion impact.",
        href: "/services/technology/ecommerce",
      },
    ],
    cta: {
      primary: { label: "Commission a Product Video", href: "/start#book-strategy-call" },
      secondary: { label: "See Product Video Examples", href: "/work" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "testimonials",
    title: "Testimonial & Case Study Videos",
    tagline: "The Most Persuasive Voice Is Never the Brand's.",
    intro:
      "ARQQA produces testimonial and case study videos that let your best clients do your selling. Structured narrative. Professional production. Real outcomes, on camera. The most credible proof point any B2B or B2C brand can publish.",
    cep: "When prospects trust your clients' words more than your own — and you don't have them on camera yet.",
    accent: "blue",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Written testimonials are skeptically received. Video testimonials are believed.",
      body: "A client who speaks directly to camera — with specific outcomes, specific timelines, and genuine conviction — closes deals that no campaign copy can. Most brands know this and still don't have a single video testimonial. We make the process easy enough that there's no longer a reason not to.",
    },
    approach: {
      heading: "From conversation guide to story-led edit.",
      steps: [
        {
          title: "Pre-Interview Preparation",
          body: "We brief the client thoroughly before the shoot. Not a script — a conversation guide. The questions that surface the most compelling proof points. We coach on delivery without creating artificiality.",
        },
        {
          title: "Interview & B-Roll Production",
          body: "On-location shoot at the client's offices or an agreed environment. Primary interview setup plus b-roll capture: the client's team, workspace, or product in use. Context that makes the testimonial tangible.",
        },
        {
          title: "Story-Led Edit",
          body: "Edited to a story arc: the challenge before ARQQA, the turning point, the outcomes achieved. Hard metrics are displayed as motion graphics. The emotional arc and the empirical proof together.",
        },
      ],
    },
    included: {
      items: [
        "Pre-interview preparation and question development",
        "Location coordination and shoot logistics",
        "Interview production (2-camera setup)",
        "B-roll and context footage",
        "Story-led edit with motion graphic metrics",
        "Multiple formats: long (2–3 min), short (30–60s), social cut (15–30s)",
        "Captions (Arabic and English)",
      ],
      note: "Timeline: 2–3 weeks from shoot date to delivery.",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Brand Films & Commercials",
        description: "More produced narrative alongside authentic testimonials.",
        href: "/services/video-production/brand-films",
      },
      {
        label: "Portfolio",
        description: "Embed directly in case study pages.",
        href: "/work",
      },
      {
        label: "The Catalyst System™",
        description: "Deploy as social proof in bottom-funnel campaigns.",
        href: "/services/catalyst-system",
      },
    ],
    cta: {
      primary: { label: "Commission a Testimonial Video", href: "/start#book-strategy-call" },
      secondary: { label: "See Testimonial Examples", href: "/work" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "motion-graphics",
    title: "Motion Graphics & Animation",
    tagline: "Some Ideas Can Only Be Understood in Motion.",
    intro:
      "ARQQA's Motion Graphics & Animation practice produces animated content for brands that need to communicate complex ideas, abstract services, or data-driven stories in a format audiences can absorb in under two minutes. From logo animations and infographic videos to full explainer productions — motion that earns attention and drives understanding.",
    cep: "When the product is too complex to show and too important to explain badly.",
    accent: "orange",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Some value propositions are real but invisible.",
      body: "Fintech products. SaaS platforms. Insurance. Healthcare. B2B services. You can't photograph it or film it in a way that makes sense. Animation makes the invisible tangible. It makes the complex simple. It makes the abstract concrete.",
    },
    approach: {
      heading: "From visual script to a fully scored production.",
      steps: [
        {
          title: "Concept & Script",
          body: "Every motion project begins with a visual script: what happens in each scene, what the voiceover or on-screen text says, and what the viewer should understand at each point. No production begins without a signed-off script.",
        },
        {
          title: "Style Development",
          body: "Motion style aligned to brand identity: color palette, typography in motion, illustration style, transition language. A 3-second style test is produced and approved before full production.",
        },
        {
          title: "Production & Sound",
          body: "Frame-by-frame production in After Effects or similar. Professional voiceover in Arabic and/or English. Sound design and licensed music. Export in all required formats.",
        },
      ],
    },
    included: {
      items: [
        "Visual script development",
        "Style frames (3 for client approval)",
        "Full animation production",
        "Professional voiceover (Arabic and/or English)",
        "Sound design and licensed music",
        "Multiple format exports (vertical, horizontal, square)",
        "Subtitle files (.SRT) for platform upload",
      ],
      note: "Formats: Explainer (60–120s), infographic video (30–60s), logo animation (5–10s), social motion (15–30s).",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Brand Films & Commercials",
        description: "Combine animation with live-action production.",
        href: "/services/video-production/brand-films",
      },
      {
        label: "Product & Service Videos",
        description: "Animated explainer as product demo.",
        href: "/services/video-production/product-videos",
      },
      {
        label: "Reels & Short-Form Content",
        description: "Animated content for organic social.",
        href: "/services/video-production/reels",
      },
    ],
    cta: {
      primary: { label: "Start a Motion Project", href: "/start#book-strategy-call" },
      secondary: { label: "See Our Animation Showreel", href: "/work" },
    },
  },
  {
    parentSlug: "video-production",
    parentTitle: "Social Media Video Production",
    slug: "scripting",
    title: "Content Creator Direction & Scripting",
    tagline: "Creators Have the Audience. We Give Them the Strategy.",
    intro:
      "ARQQA's Content Creator Direction & Scripting service bridges the gap between brand objectives and creator authenticity. We brief, script, and direct content creator collaborations so that the creator's audience gets content they love — and the brand gets outcomes it can measure.",
    cep: "When your influencer campaigns produce content, not results.",
    accent: "blue",
    image: "/services/video-approach-hero.webp",
    ctaImage: "/services/go-to-market-cta.webp",
    problem: {
      heading: "Creators and brands don't naturally speak the same language.",
      body: "Creator partnerships consistently underperform when the brand briefs the creator with a feature list and expects them to turn it into content. ARQQA is the translation layer: we extract the brand strategy, reframe it as a creator-native brief, and ensure production delivers on both the brand's and the creator's standards.",
    },
    approach: {
      heading: "From creator strategy to a published, compliant deliverable.",
      steps: [
        {
          title: "Creator Strategy",
          body: "We define the creator tier, category, audience profile, and content style that matches the campaign objective — before any creator is approached. Creator selection is a strategic decision, not a follower-count decision.",
        },
        {
          title: "Brief Development",
          body: "A creator brief that gives the creator what they need: the brand context, the one thing the audience must take away, the one thing that cannot be said or shown, the deliverable format, and complete creative freedom within those parameters.",
        },
        {
          title: "Script & Storyboard",
          body: "For creators who prefer a scripted format — product demos, tutorials, reviews — we write the script in the creator's voice. Every word approved by both brand and creator before shoot.",
        },
        {
          title: "Direction & Review",
          body: "ARQQA provides remote or on-set direction. Creative review of content before publication — ensuring brand compliance without stripping creator authenticity.",
        },
      ],
    },
    included: {
      items: [
        "Creator strategy document (tier, category, audience profile)",
        "Creator brief (per campaign or per creator)",
        "Script and storyboard (for scripted formats)",
        "Talking points and messaging hierarchy (for unscripted/authentic formats)",
        "Remote or on-set creative direction",
        "Pre-publication review and feedback",
        "Post-campaign performance report",
      ],
      note: "Also available: Creator identification and outreach management (as an add-on service).",
      image: "/services/video-approach-included.webp",
    },
    related: [
      {
        label: "Reels & Short-Form Content",
        description: "ARQQA-produced content alongside creator content.",
        href: "/services/video-production/reels",
      },
      {
        label: "The Catalyst System™",
        description: "Amplify creator content with paid media.",
        href: "/services/catalyst-system",
      },
      {
        label: "Social Media & Community Management",
        description: "Integrate creator content into the content calendar.",
        href: "/services/community-management",
      },
    ],
    cta: {
      primary: { label: "Build a Creator Strategy", href: "/start#book-strategy-call" },
      secondary: { label: "Download the Creator Brief Template", href: "/start#growth-audit" },
    },
  },
];

export function getApproachPage(parentSlug: string, slug: string) {
  return APPROACH_PAGES.find((p) => p.parentSlug === parentSlug && p.slug === slug);
}

export function getApproachPagesFor(parentSlug: string) {
  return APPROACH_PAGES.filter((p) => p.parentSlug === parentSlug);
}

/**
 * Single source of truth for every service page.
 *
 * The hub (`/services`) and all five inner pages read from this file, so the
 * structure is defined once and each service only supplies its own copy.
 * Replacing the dummy content later means editing this file only — no layout
 * or routing changes required.
 */

export type ServiceDetail = {
  /** URL slug — the page lives at /services/<slug> */
  slug: string;
  num: string;
  title: string;
  /** Short label used in the hub's orbit wheel */
  short: string;
  /** One-line positioning statement under the hero title */
  positioning: string;
  /** Category Entry Point — the trigger moment a client feels */
  cep: string;
  /** Thumbnail used on the services hub card */
  image: string;
  /** Full-width hero banner on the service's own page */
  banner: string;
  accent: "blue" | "orange";
  /** Card copy on the services hub */
  summary: string;

  problem: {
    heading: string;
    body: string;
    /** Empirical data points that frame the pain */
    stats: { value: string; label: string }[];
  };

  approach: {
    heading: string;
    body: string;
    /** 3–4 steps rendered as the visual process diagram */
    steps: {
      num: string;
      title: string;
      body: string;
      /** If present, the step card links out to its own dedicated sub-page */
      href?: string;
    }[];
    /** Optional CTA pair rendered under the process diagram */
    cta?: {
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
    };
  };

  included: {
    /** Detailed scope, grouped */
    groups: { title: string; items: string[] }[];
    timeline: string;
    tooling: string[];
  };

  proof: {
    client: string;
    market: string;
    metric: string;
    metricLabel: string;
    body: string;
    /** Supporting metrics shown beside the headline number */
    secondary: { value: string; label: string }[];
  };

  /** Slugs of 2–3 connected services */
  related: string[];

  /** Nurture CTA label — “Download the [Service] Playbook” */
  playbook: string;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "strategy-consulting",
    num: "01",
    title: "Strategy & Consulting",
    short: "Strategy",
    positioning:
      "Before a single pixel moves, the blueprint exists — a rigorous, paid discovery process that aligns objectives and eliminates assumptions.",
    cep: "When you've stopped growing and don't know why.",
    image: "/services/strategy.webp",
    banner: "/services/strategy-banner.webp",
    accent: "blue",
    summary:
      "Go-to-market strategy. Growth audits. Competitive analysis. Paid discovery workshops. The foundation every engagement is built on — before execution, not instead of it.",
    problem: {
      heading: "Most growth plateaus are diagnosis failures, not effort failures.",
      body: "Brands that struggle with inconsistent performance almost always trace the root cause to one place: strategy was skipped, rushed, or outsourced to whoever was cheapest. The result is execution without direction, creative without context, spend without a map. We fix the map first.",
      stats: [
        { value: "67%", label: "of stalled brands never audited positioning" },
        { value: "9 mo", label: "average time lost to an untested strategy" },
        { value: "3.4x", label: "return gap vs. strategy-led competitors" },
      ],
    },
    approach: {
      heading: "Four services. One growth blueprint.",
      body: "Strategy is the intake layer of the Catalyst System™. Everything downstream — creative, media, technology — inherits the clarity produced here, which is why we refuse to activate a channel before the blueprint is signed off.",
      steps: [
        {
          num: "01",
          title: "Paid Discovery Workshop",
          body: "A structured half- or full-day session with our senior strategists — pre-briefed, rigorously facilitated, and documented in real time. Your team leaves with one agreed growth direction, not a deck that gets argued over for six weeks.",
          href: "/services/strategy-consulting/discovery-workshops",
        },
        {
          num: "02",
          title: "Growth Audit",
          body: "A seven-dimension diagnostic — strategy clarity, creative integration, media efficiency, technology stack, data maturity, team structure, and reporting quality — scored and benchmarked against category norms.",
          href: "/services/strategy-consulting/growth-audit",
        },
        {
          num: "03",
          title: "Competitive Analysis",
          body: "Messaging deconstruction, media spend estimation, and positioning-gap identification across up to eight competitors. An intelligence operation, not a slide of logos.",
          href: "/services/strategy-consulting/competitive-analysis",
        },
        {
          num: "04",
          title: "Go-to-Market Strategy",
          body: "Market mapping, audience architecture, and channel selection, translated into a phased 30/90/180-day roadmap with clear KPIs at every gate.",
          href: "/services/strategy-consulting/go-to-market",
        },
      ],
      cta: {
        primary: { label: "Book a Strategy Session", href: "/start#book-strategy-call" },
        secondary: { label: "Download the Growth Audit Framework", href: "/start#growth-audit" },
      },
    },
    included: {
      groups: [
        {
          title: "Research & Diagnosis",
          items: [
            "Category and competitive landscape audit (up to 8 competitors)",
            "7-dimension Growth Audit scorecard with category benchmarks",
            "Messaging and positioning analysis per competitor",
            "Media spend and channel allocation estimates",
          ],
        },
        {
          title: "Deliverables",
          items: [
            "Go-to-market roadmap (30/90/180-day phased plan)",
            "Audience segmentation and channel-mix framework",
            "KPI dashboard and budget allocation model",
            "Stakeholder alignment presentation (board-ready)",
          ],
        },
      ],
      timeline: "4–6 weeks from discovery workshop to signed blueprint",
      tooling: ["SEMrush", "SimilarWeb", "Meta Ad Library", "ClickUp", "HubSpot"],
    },
    proof: {
      client: "Nile Air",
      market: "KSA — Airlines",
      metric: "237x",
      metricLabel: "Return on ad spend",
      body: "A channel efficiency audit identified a 67% budget concentration in low-intent placements. Reallocating to route-level intent targeting contributed directly to a 237x ROAS outcome — unlocking 83M SAR in digital revenue on just 350K SAR of spend.",
      secondary: [
        { value: "83M", label: "SAR digital revenue" },
        { value: "350K", label: "SAR total spend" },
      ],
    },
    related: ["catalyst-system", "asset-building", "technology"],
    playbook: "Growth Audit",
  },
  {
    slug: "asset-building",
    num: "02",
    title: "Asset Building",
    short: "Assets",
    positioning:
      "How you look is how you're remembered — the permanent visual and verbal infrastructure of your brand, built to compound in value the longer it's used.",
    cep: "When nobody remembers your brand — or for the wrong reasons.",
    image: "/services/assets.webp",
    banner: "/services/assets-banner.webp",
    accent: "orange",
    summary:
      "Brand identity & design. Company profiles & collateral. Visual identity rollout kits. Every asset a company needs to launch, reposition, or scale — built as a system, not decoration.",
    problem: {
      heading: "Forgettable brands pay a permanent tax on every campaign.",
      body: "Most brands underinvest in foundational assets and overspend on campaigns built on top of a weak identity — a logo that doesn't scale, guidelines nobody follows, copy that describes rather than persuades. When identity is inconsistent, each impression starts from zero.",
      stats: [
        { value: "77%", label: "of B2B buyers can't distinguish category brands" },
        { value: "2.6x", label: "cost per acquisition without distinctive assets" },
        { value: "43%", label: "of assets go unused for lack of a system" },
      ],
    },
    approach: {
      heading: "Identity as infrastructure, not decoration.",
      body: "We build asset systems the whole organisation can operate — with rules, templates, and governance — so consistency survives staff turnover and campaign pressure.",
      steps: [
        {
          num: "01",
          title: "Brand Identity & Design",
          body: "Logo architecture, colour systems, typography, tone of voice, and usage guidelines — documented in a master brand book built to be used, not filed.",
          href: "/services/asset-building/branding",
        },
        {
          num: "02",
          title: "Company Profiles & Collateral",
          body: "Corporate profiles, pitch decks, capability statements, and credential documents — designed for impact, written for decision-makers.",
          href: "/services/asset-building/company-profiles",
        },
        {
          num: "03",
          title: "Visual Identity Rollout Kits",
          body: "Every template your team actually needs — social, advertising, email, presentation, and document formats — pre-built and production-ready from day one.",
          href: "/services/asset-building/visual-identity",
        },
      ],
      cta: {
        primary: { label: "Start a Brand Project", href: "/start#book-strategy-call" },
        secondary: { label: "See Our Brand Identity Work", href: "/work/kenzup" },
      },
    },
    included: {
      groups: [
        {
          title: "Brand & Identity",
          items: [
            "Logo system (primary, secondary, icon, monochrome variants)",
            "Colour palette and typography system (digital and print)",
            "Brand voice and tone-of-voice manual",
            "Master brand guidelines document (30–50 pages)",
          ],
        },
        {
          title: "Production & Rollout",
          items: [
            "Corporate profile, pitch deck, and capability statement",
            "Social, advertising, email, and presentation template suite",
            "Signage and out-of-home templates (on request)",
            "Brand activation guide (non-designer edition)",
          ],
        },
      ],
      timeline: "6–12 weeks from brief sign-off to full rollout kit",
      tooling: ["Figma", "Adobe Creative Suite", "Canva Brand Kit", "Adobe InDesign"],
    },
    proof: {
      client: "Kenz'Up",
      market: "Morocco — App Growth",
      metric: "25%",
      metricLabel: "Registration conversion",
      body: "A full identity and onboarding-asset rebuild lifted registration conversion from 7% to 25% — without changing a line of acquisition spend.",
      secondary: [
        { value: "5M+", label: "app installs" },
        { value: "3.5x", label: "conversion lift" },
      ],
    },
    related: ["technology", "community-management", "video-production"],
    playbook: "Brand Asset",
  },
  {
    slug: "catalyst-system",
    num: "03",
    title: "The Catalyst System™",
    short: "Catalyst",
    positioning:
      "The integrated engine where creative and media stop working in separate rooms.",
    cep: "When your teams don't talk to each other.",
    image: "/services/catalyst.webp",
    banner: "/services/catalyst-banner.webp",
    accent: "blue",
    summary:
      "The integrated engine: social media management + performance marketing + content creation. Google, Meta, TikTok, Snapchat. Platform-native content. Guaranteed synergy between creative and media.",
    problem: {
      heading: "Creative and media briefed separately will always underperform.",
      body: "The agency model splits the two into different teams with different incentives — so media optimises for cost while creative optimises for craft, and neither owns the outcome. Campaigns then fail for reasons no single team can see, let alone fix.",
      stats: [
        { value: "56%", label: "of paid performance is driven by creative" },
        { value: "4 wks", label: "typical lag between insight and new creative" },
        { value: "31%", label: "budget lost to creative-media misalignment" },
      ],
    },
    approach: {
      heading: "One system, one accountable team.",
      body: "The Catalyst System™ collapses strategy, content, production, and media buying into a single operating loop with joint sign-off — so the people spending the budget and the people making the work answer to the same number.",
      steps: [
        {
          num: "01",
          title: "Strategic Input",
          body: "Objectives, audiences, and channel roles defined before any asset is scoped.",
        },
        {
          num: "02",
          title: "Content Factory",
          body: "Platform-native content produced at cadence — every asset mapped to a strategic objective.",
        },
        {
          num: "03",
          title: "Integrated Activation",
          body: "Google, Meta, TikTok, and Snapchat activated together with unified measurement.",
        },
        {
          num: "04",
          title: "Optimisation Loop",
          body: "Weekly creative-media reviews where performance data rewrites the next production sprint.",
        },
      ],
    },
    included: {
      groups: [
        {
          title: "Content & Creative",
          items: [
            "Platform-native content calendar",
            "Copywriting, storyboarding, and scripting",
            "Motion graphics and Reels production",
            "Joint creative-media sign-off protocol",
          ],
        },
        {
          title: "Performance Media",
          items: [
            "Google, Meta, TikTok, and Snapchat management",
            "Audience architecture and testing roadmap",
            "Budget pacing and bid strategy",
            "Weekly optimisation and creative refresh cycles",
          ],
        },
      ],
      timeline: "Ongoing retainer — first full cycle live within 3 weeks",
      tooling: ["Google Ads", "Meta Business Suite", "TikTok Ads", "ClickUp", "Looker Studio"],
    },
    proof: {
      client: "Fawry",
      market: "Egypt — Fintech",
      metric: "6M",
      metricLabel: "App installs",
      body: "Running creative and media as one unit took Fawry to 6M installs and 1M active users — including 100K organic installs driven purely by content resonance.",
      secondary: [
        { value: "1M", label: "active users" },
        { value: "100K", label: "organic installs" },
      ],
    },
    related: ["strategy-consulting", "community-management", "asset-building"],
    playbook: "Catalyst System",
  },
  {
    slug: "technology",
    num: "04",
    title: "Technology",
    short: "Tech",
    positioning:
      "If the technology doesn't convert, the marketing doesn't matter — the infrastructure your marketing runs on, integrated by design.",
    cep: "When your product doesn't convert and your stack doesn't talk.",
    image: "/services/technology.webp",
    banner: "/services/technology-banner.webp",
    accent: "orange",
    summary:
      "Website design & development. Mobile app design & development. UI/UX design. CRM integration & automation. E-commerce (HubSpot / Shopify / Salla). Built for speed, conversion, and scale.",
    problem: {
      heading: "Traffic is not the bottleneck. The destination is.",
      body: "Marketing investment rarely fails because of poor creative or weak media. It fails because the landing page doesn't load in two seconds, the app onboarding has seven steps, the CRM isn't capturing leads, and nobody knows what happens after the click. We fix the infrastructure before scaling the investment.",
      stats: [
        { value: "53%", label: "abandon a site that takes over 3s to load" },
        { value: "68%", label: "of funnels lose data between form and CRM" },
        { value: "2.1x", label: "revenue lift from conversion-first builds" },
      ],
    },
    approach: {
      heading: "Engineer the destination, then send the traffic.",
      body: "Technology closes the Catalyst loop: the same measurement frame set in strategy is wired directly into the product, so acquisition, conversion, and retention finally report into one system.",
      steps: [
        {
          num: "01",
          title: "Website Design & Development",
          body: "Conversion-first information architecture, mobile-first UX, and performance-engineered development — every project built to clear a Lighthouse score above 90 and load in under 2.5 seconds.",
          href: "/services/technology/website",
        },
        {
          num: "02",
          title: "Mobile App Design & Development",
          body: "Research-driven UX, platform-native design systems, and staged releases — built to fix the 77% first-three-day drop-off most apps never diagnose.",
          href: "/services/technology/mobile-apps",
        },
        {
          num: "03",
          title: "UI/UX Design",
          body: "Evidence-based design, independent of development — user research, usability testing, and a full component library handed off with developer annotation.",
          href: "/services/technology/ux-design",
        },
        {
          num: "04",
          title: "CRM Integration & Automation",
          body: "HubSpot, Salesforce, or Zoho wired to every touchpoint — lead scoring, nurture sequences, and WhatsApp Business API, so no lead sits unfollowed for four hours.",
          href: "/services/technology/crm",
        },
        {
          num: "05",
          title: "E-commerce",
          body: "Shopify and Salla store builds engineered for conversion, not just launch — product pages, checkout flow, and post-launch CRO built to move MENA stores from a 1–2% baseline toward 4–6%.",
          href: "/services/technology/ecommerce",
        },
      ],
      cta: {
        primary: { label: "Start a Website Project", href: "/start#book-strategy-call" },
        secondary: { label: "See Our Website Portfolio", href: "/work/nile-air" },
      },
    },
    included: {
      groups: [
        {
          title: "Design & Build",
          items: [
            "Website and mobile app design and development",
            "UI/UX research, prototyping, and usability testing",
            "E-commerce builds (Shopify, Salla, WooCommerce, custom)",
            "Performance optimisation (Core Web Vitals, Lighthouse 90+)",
          ],
        },
        {
          title: "Systems & Automation",
          items: [
            "CRM implementation (HubSpot certified, Salesforce, Zoho)",
            "Lead scoring, pipeline configuration, and automation workflows",
            "Payment gateway and logistics integration",
            "Analytics, event tracking, and QA handover documentation",
          ],
        },
      ],
      timeline: "8–16 weeks depending on platform and scope",
      tooling: ["HubSpot", "Shopify", "Salla", "Next.js", "Figma", "GA4"],
    },
    proof: {
      client: "Nile Air",
      market: "KSA — Airlines",
      metric: "83M",
      metricLabel: "SAR digital revenue",
      body: "Amadeus platform integration plus a conversion-first booking rebuild turned a leaking funnel into the airline's highest-performing revenue channel.",
      secondary: [
        { value: "237x", label: "ROAS achieved" },
        { value: "<2s", label: "median load time" },
      ],
    },
    related: ["strategy-consulting", "asset-building", "community-management"],
    playbook: "Conversion Engineering",
  },
  {
    slug: "community-management",
    num: "05",
    title: "Social Media & Community Management",
    short: "Community",
    positioning:
      "Your brand is what people say when you're not in the room — we own that conversation, 24 hours a day.",
    cep: "When your community is growing but nobody is managing it.",
    image: "/services/community.webp",
    banner: "/services/community-banner.webp",
    accent: "blue",
    summary:
      "Community moderation. Social listening. Crisis handling. Social CX automation. Owning the conversation instead of reacting to it — in Arabic and English, across every platform.",
    problem: {
      heading: "An unmanaged community is a brand liability compounding in public.",
      body: "Unanswered questions signal neglect. Unresolved complaints escalate. Missed brand mentions become missed opportunities. Community management done correctly is one of the highest-ROI activities in digital marketing — it costs less than acquisition and retains more than any campaign can replace.",
      stats: [
        { value: "42%", label: "expect a reply within 60 minutes" },
        { value: "5.4x", label: "reach of an unanswered complaint" },
        { value: "88%", label: "less likely to buy after ignored contact" },
      ],
    },
    approach: {
      heading: "Community as a customer-experience channel.",
      body: "We run community as operations, not as posting — with response SLAs, escalation paths, and listening that feeds insight straight back into the Catalyst content cycle.",
      steps: [
        {
          num: "01",
          title: "Community Moderation",
          body: "Brand-trained moderation across Instagram, Facebook, LinkedIn, TikTok, X, Snapchat, and YouTube — Arabic and English, 7 days a week, with a 2-hour response SLA.",
          href: "/services/community-management/moderation",
        },
        {
          num: "02",
          title: "Social Listening",
          body: "Brand, competitor, and category monitoring across the entire digital landscape — not just owned channels — converted into weekly sentiment reports and monthly strategic briefings.",
          href: "/services/community-management/listening",
        },
        {
          num: "03",
          title: "Crisis Handling",
          body: "Pre-built playbooks, real-time monitoring, and a 30-minute crisis-lead response SLA. A crisis handled in the first hour costs a fraction of one handled in the first day.",
          href: "/services/community-management/crisis",
        },
        {
          num: "04",
          title: "Social CX Automation",
          body: "Intelligent workflows and chatbot technology across WhatsApp Business, Messenger, and Instagram DM — handling the routine so the human team can focus on the complex.",
          href: "/services/community-management/cx-automation",
        },
      ],
      cta: {
        primary: { label: "Activate Community Moderation", href: "/start#book-strategy-call" },
        secondary: { label: "See Our Community Management SLA", href: "/start#growth-audit" },
      },
    },
    included: {
      groups: [
        {
          title: "Daily Management",
          items: [
            "Comment and DM moderation across all channels (Arabic + English)",
            "7-day coverage with 2-hour response SLA (business hours)",
            "Social CX automation and chatbot flow design",
            "Weekly moderation and community health reporting",
          ],
        },
        {
          title: "Intelligence & Protection",
          items: [
            "Social listening across platforms, news, and forums",
            "Competitor monitoring (up to 5 competitors) and share-of-voice tracking",
            "Crisis playbook development and 24/7 on-call response",
            "Monthly strategic intelligence briefing",
          ],
        },
      ],
      timeline: "Ongoing retainer — full coverage live within 2 weeks",
      tooling: ["Sprout Social", "Meta Business Suite", "WhatsApp Business API", "Brandwatch", "ClickUp"],
    },
    proof: {
      client: "Africa Music Initiative",
      market: "UAE / Africa",
      metric: "52",
      metricLabel: "Countries engaged",
      body: "Managing a pan-continental community across 52 countries produced 50,000 artist submissions and 120,000 visits without a single unresolved escalation.",
      secondary: [
        { value: "50K", label: "artist submissions" },
        { value: "120K", label: "campaign visits" },
      ],
    },
    related: ["catalyst-system", "strategy-consulting", "technology"],
    playbook: "Community Operations",
  },
  {
    slug: "video-production",
    num: "06",
    title: "Social Media Video Production",
    short: "Video",
    positioning:
      "The feed belongs to video. Your brand belongs in it — content built for performance, not broadcast.",
    cep: "When your brand is invisible on the feed.",
    image: "/services/video.webp",
    banner: "/services/video-banner.webp",
    accent: "orange",
    summary:
      "Reels & short-form content. Brand films & commercials. Product & service videos. Testimonial & case study videos. Motion graphics & animation. Content creator direction & scripting.",
    problem: {
      heading: "Beautiful content nobody watches past three seconds is not content — it's cost.",
      body: "Most brands treat video as a production problem: hire a videographer, shoot the product, post it. We treat it as a communications strategy problem — what needs to be communicated, to whom, on which platform, in what format, and how long before you lose them? Production follows strategy. Always.",
      stats: [
        { value: "60%", label: "of Reel viewers lost in the first three seconds" },
        { value: "80%", label: "higher purchase intent after watching a product video" },
        { value: "3s", label: "the window every hook has to earn the next frame" },
      ],
    },
    approach: {
      heading: "Production follows strategy. Always.",
      body: "Every format is briefed before it's shot — hook, message, CTA, platform, and objective signed off first. Nothing decorative. Nothing slow.",
      steps: [
        {
          num: "01",
          title: "Reels & Short-Form Content",
          body: "Hooks-first production for Instagram, TikTok, YouTube Shorts, and Snapchat Spotlight — shot vertical-first, edited at the pace the algorithm rewards, with high-performing organic cuts flagged straight to paid media.",
          href: "/services/video-production/reels",
        },
        {
          num: "02",
          title: "Brand Films & Commercials",
          body: "Narrative-first long-form production — from 60-second brand manifestos to documentary-style films — built on a signed-off script before a single frame is shot.",
          href: "/services/video-production/brand-films",
        },
        {
          num: "03",
          title: "Product & Service Videos",
          body: "Objection-mapped product demos, explainers, and service walkthroughs that let outcomes, not adjectives, do the selling — structured around the buyer's decision moment.",
          href: "/services/video-production/product-videos",
        },
        {
          num: "04",
          title: "Testimonial & Case Study Videos",
          body: "Structured client interviews and story-led edits that let your best clients do the selling — real outcomes, on camera, the most credible proof point a brand can publish.",
          href: "/services/video-production/testimonials",
        },
        {
          num: "05",
          title: "Motion Graphics & Animation",
          body: "Animation for the ideas too complex to film — explainers, infographics, and logo motion that make the invisible tangible and the abstract concrete.",
          href: "/services/video-production/motion-graphics",
        },
        {
          num: "06",
          title: "Content Creator Direction & Scripting",
          body: "Creator briefs that translate brand strategy into a creator-native voice — without stripping the authenticity that earned the audience.",
          href: "/services/video-production/scripting",
        },
      ],
      cta: {
        primary: { label: "Start a Reels Package", href: "/start#book-strategy-call" },
        secondary: { label: "See Sample Reels Work", href: "/work" },
      },
    },
    included: {
      groups: [
        {
          title: "Production",
          items: [
            "Reels and short-form content (monthly retainer or per-project)",
            "Brand films and commercials, 15s to full-length cut-downs",
            "Product, service, and explainer videos",
            "Testimonial and case study videos (2-camera interview setup)",
          ],
        },
        {
          title: "Post & Direction",
          items: [
            "Motion graphics and animation (explainer, infographic, logo)",
            "Content creator briefing, scripting, and on-set direction",
            "Arabic and English captions and voiceover on every deliverable",
            "Performance reporting at 30 days, flagged for paid amplification",
          ],
        },
      ],
      timeline: "2–8 weeks per production, depending on format and scope",
      tooling: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
    },
    proof: {
      client: "Fawry",
      market: "Egypt — Fintech",
      metric: "100K",
      metricLabel: "Organic installs via content",
      body: "Platform-native vertical testimonials — shot in Egyptian Arabic and rebriefed every two-week sprint against install-quality data — became the organic engine behind Fawry's app growth, contributing directly to 100K installs with zero paid spend behind them.",
      secondary: [
        { value: "2 wks", label: "creative refresh cycle" },
        { value: "6M+", label: "total app installs" },
      ],
    },
    related: ["catalyst-system", "asset-building", "community-management"],
    playbook: "Video Production",
  },
  {
    slug: "performance-marketing",
    num: "07",
    title: "Performance Marketing",
    short: "Performance",
    positioning:
      "Media is not a budget line. It is the fastest instrument you own for turning demand into revenue — when someone is actually accountable for the number.",
    cep: "When you are spending more every month and learning less.",
    image: "/services/performance.webp",
    banner: "/services/performance.webp",
    accent: "blue",
    summary:
      "Paid search, paid social, and programmatic. Full-funnel campaign architecture. Conversion tracking and attribution. Creative testing at volume. Budget pacing and bid strategy. Revenue reporting that ties spend to outcome.",
    problem: {
      heading: "Most brands do not have a media problem. They have an attribution problem.",
      body: "Spend goes up, the dashboard fills with impressions, and nobody can say which riyal produced which sale. Campaigns get judged on platform-reported conversions that double-count each other, creative gets refreshed on instinct rather than data, and the budget quietly drifts toward whichever channel reports the friendliest number. We rebuild the measurement layer first — then scale what is genuinely working.",
      stats: [
        { value: "60%", label: "of ad spend typically attributed to the wrong touchpoint" },
        { value: "3x", label: "performance gap between tested and untested creative" },
        { value: "0", label: "campaigns launched here without conversion tracking verified" },
      ],
    },
    approach: {
      heading: "Measurement first. Then scale.",
      body: "No budget moves until tracking is verified end to end. From there it is a disciplined loop — structured tests, honest reads, and reallocation toward what compounds.",
      steps: [
        {
          num: "01",
          title: "Tracking & Attribution Setup",
          body: "Server-side tracking, conversion API integration, and a single source of truth for what counts as a conversion — deduplicated across platforms before a campaign goes live.",
        },
        {
          num: "02",
          title: "Full-Funnel Campaign Architecture",
          body: "Prospecting, consideration, and retention built as one structure rather than competing campaigns bidding against each other for the same audience.",
        },
        {
          num: "03",
          title: "Creative Testing at Volume",
          body: "Hooks, formats, and offers tested against a live control — with winners fed back into the content pipeline and losers cut on evidence, not opinion.",
        },
        {
          num: "04",
          title: "Pacing, Bidding & Reallocation",
          body: "Weekly budget pacing against blended targets, with spend moved toward the channel and creative producing incremental revenue — not the one reporting the softest CPA.",
        },
      ],
      cta: {
        primary: { label: "Book a Media Audit", href: "/start#book-strategy-call" },
        secondary: { label: "See Performance Work", href: "/work" },
      },
    },
    included: {
      groups: [
        {
          title: "Media",
          items: [
            "Paid search (Google, Microsoft) and shopping campaigns",
            "Paid social across Meta, TikTok, Snapchat, and LinkedIn",
            "Programmatic display, video, and retargeting",
            "App install and app-engagement campaigns",
          ],
        },
        {
          title: "Measurement",
          items: [
            "Server-side tracking and conversion API implementation",
            "Cross-channel attribution modelling and deduplication",
            "Structured creative testing with documented read-outs",
            "Live revenue dashboard — blended CAC, ROAS, and contribution",
          ],
        },
      ],
      timeline: "2–3 weeks to launch, with reallocation reviewed weekly thereafter",
      tooling: ["Google Ads", "Meta Ads Manager", "GA4", "Looker Studio"],
    },
    proof: {
      client: "Nile Air",
      market: "KSA — Airlines",
      metric: "237x",
      metricLabel: "Return on ad spend",
      body: "Rebuilding the tracking layer exposed that a third of reported conversions were being double-counted across platforms. With a clean measurement baseline and budget reallocated toward the routes and creative actually producing bookings, return on ad spend reached 237x.",
      secondary: [
        { value: "-38%", label: "cost per booking" },
        { value: "4 wks", label: "to a verified measurement baseline" },
      ],
    },
    related: ["catalyst-system", "strategy-consulting", "community-management"],
    playbook: "Performance Marketing",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelated(slugs: string[]) {
  return slugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceDetail => Boolean(s));
}

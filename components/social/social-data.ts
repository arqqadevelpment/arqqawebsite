/**
 * Social Media Production projects — one page each at /social/<slug>.
 *
 * Reuses the ShowcaseProject shape and ShowcaseTemplate from
 * components/showcase (same story-block model: text, figure, pair, with
 * image/video media), since a content-production project reads the same
 * way a website project does — copy alternating with the actual deliverable.
 * Kept in a separate array/route rather than folded into SHOWCASE_PROJECTS
 * so the /work hub's "Web Design" and "Social Media Production" filters stay
 * two distinct buckets even though they share a template.
 *
 * Content and imagery migrated from arqqa.net's old portfolio pages for
 * Pizza Hut, Kenz'up, Coffee Fellows, Aman, and Alex Bank.
 */

import type { ShowcaseProject } from "@/components/showcase/showcase-data";

export const SOCIAL_PROJECTS: ShowcaseProject[] = [
  {
    slug: "coffee-fellows",
    client: "Coffee Fellows",
    title: "Coffee Fellows",
    category: "Social Media Production",
    intro:
      "Photography, reels, and day-to-day social management built to launch a German coffee-shop brand into the Egyptian market.",
    heroImage: "/work/coffee-fellows/hero.webp",
    logo: "/logos/clients/coffee-fellows.webp",
    facts: [
      { label: "Client", value: "Coffee Fellows" },
      { label: "Industry", value: "Food & Beverage" },
      { label: "Scope", value: "Photography, Reels, Social Media Management" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "text",
        body: "Coffee Fellows is a German coffee-shop brand entering Egypt for the first time, a launch with no local audience or brand memory to draw on. The mandate was to build both from nothing: introduce the menu, establish a visual identity on social, and turn a new storefront into a place people already wanted to visit before it opened.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/coffee-fellows/shot-01.webp",
            alt: "Coffee Fellows branded drink and dessert shot with the tagline Make Today Extraordinary",
            caption: "Launch content, product photography built around the brand's own voice",
          },
          {
            src: "/work/coffee-fellows/shot-07.webp",
            alt: "Coffee Fellows dessert and latte with the line The Sweetest Escape",
            caption: "In-store lifestyle content, post-launch",
          },
        ],
      },
      {
        type: "text",
        body: "Every post was shot and produced in-house: professional food and drink photography, seasonal product features, and short-form reels, run on a consistent posting schedule with active community management from day one.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/coffee-fellows/video-01.mp4",
            type: "video",
            alt: "Coffee Fellows social media reel",
            caption: "One of the launch-phase reels",
          },
          {
            src: "/work/coffee-fellows/video-02.mp4",
            type: "video",
            alt: "Coffee Fellows social media reel",
            caption: "A second reel from the ongoing content calendar",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/coffee-fellows/shot-03.webp",
            alt: "Coffee Fellows fresh juice lineup, Sunny Medium, Berry Mix Smoothie, Granny Medium",
            caption: "Menu features, shot to match the brand's flat lay style",
          },
          {
            src: "/work/coffee-fellows/shot-04.webp",
            alt: "Coffee Fellows Nougatino drink with the line A Delightful Hug in a Cup",
            caption: "Seasonal product drops",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/coffee-fellows/shot-05.webp",
            alt: "Coffee Fellows milk chocolate cookie, split in half",
            caption: "Bakery-case features shot in the brand's signature light",
          },
          {
            src: "/work/coffee-fellows/shot-06.webp",
            alt: "Coffee Fellows Latte Macchiato with the line Savor the Taste of Winter",
            caption: "Winter menu content",
          },
        ],
      },
      {
        type: "text",
        body: "We created a buzz and generated excitement among the target audience. This resulted in a successful opening, strong brand recognition, and a growing customer base.",
      },
    ],
    card: {
      tier: "Social Media",
      market: "Egypt",
      summary:
        "Photography, reels, and social management that turned a first-time market entry into a buzzed-about launch.",
      image: "/services/work-coffee-fellows.webp",
      accent: "orange",
    },
    next: "pizza-hut",
  },
  {
    slug: "pizza-hut",
    client: "Pizza Hut KSA",
    title: "Pizza Hut KSA",
    category: "Social Media Production",
    intro:
      "Campaign-led social content for one of Saudi Arabia's biggest pizza chains, built to keep an already-known brand feeling worth talking about.",
    heroImage: "/work/pizza-hut-social/hero.webp",
    logo: "/logos/clients/pizza-hut.webp",
    facts: [
      { label: "Client", value: "Pizza Hut KSA" },
      { label: "Industry", value: "Food & Beverage" },
      { label: "Scope", value: "Content Marketing, Social Media Production" },
      { label: "Market", value: "Saudi Arabia" },
    ],
    story: [
      {
        type: "text",
        body: "Pizza Hut KSA already had the market presence, the challenge was keeping a household name feeling current on social, where attention resets every scroll. That meant a steady output of product-led content and campaign concepts strong enough to earn engagement on their own, not just brand-awareness filler.",
      },
      {
        type: "figure",
        media: {
          src: "/work/pizza-hut-social/shot-01.webp",
          alt: "Pizza Hut KSA meter-long pizza campaign with three dipping sauces",
          caption: "Meter Pizza, a size-led campaign built to be shared",
        },
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/pizza-hut-social/video-01.mp4",
            type: "video",
            alt: "Pizza Hut KSA social media video",
            caption: "Campaign video content",
          },
          {
            src: "/work/pizza-hut-social/video-02.mp4",
            type: "video",
            alt: "Pizza Hut KSA delivery video",
            caption: "Delivery-moment content",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: "/work/pizza-hut-social/shot-02.webp",
          alt: "Pizza Hut KSA Thin & Crispy versus Pan crust comparison post",
          caption: "A crust-preference post built for comments, not just likes",
        },
      },
      {
        type: "text",
        body: "Consistent posting, active follower engagement, and targeted paid support behind the strongest content pushed the numbers that matter for a QSR brand: increased brand awareness, higher customer interaction, and a measurable lift in online sales.",
      },
    ],
    card: {
      tier: "Social Media",
      market: "Saudi Arabia",
      summary:
        "Campaign-led product content and video built to keep a household QSR name feeling worth talking about.",
      image: "/services/work-pizza-hut.webp",
      accent: "orange",
    },
    next: "bespin-global",
  },
  {
    slug: "bespin-global",
    client: "Bespin Global",
    title: "Bespin Global",
    category: "Social Media Production",
    intro:
      "Always-on social content for a cloud and managed-services provider, carrying event presence and product thought leadership in one visual system.",
    heroImage: "/work/bespin-global-social/hero.webp",
    logo: "/logos/clients/bespin.webp",
    facts: [
      { label: "Client", value: "Bespin Global" },
      { label: "Industry", value: "Cloud & Managed Services" },
      { label: "Scope", value: "Content Marketing, Social Media Production" },
      { label: "Market", value: "Saudi Arabia" },
    ],
    story: [
      {
        type: "text",
        body: "Bespin Global already had the technical credibility, the challenge was translating it into a social presence that read as thought leadership rather than a features list. That meant a steady output of content spanning solutions, events, campaigns, and culture, consistent enough to build recognition and sharp enough to hold attention in a technical, low-emotion category.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/video-01.mp4",
            type: "video",
            alt: "Bespin Global social media video",
            caption: "Video content from the always-on production",
          },
          {
            src: "/work/bespin-global-social/shot-03.webp",
            alt: "Bespin Global, Google Cloud's regional launch, a milestone in cloud evolution",
            caption: "The launch moment itself, positioned as a milestone",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/shot-05.webp",
            alt: "Bespin Global, cloud governance, accelerate insights to optimize efficiencies and costs",
            caption: "Cloud governance, framed around efficiency and cost",
          },
          {
            src: "/work/bespin-global-social/shot-06.webp",
            alt: "Bespin Global, managed FinOps, smart and seamless cloud financial management powered by OpsNow",
            caption: "Managed FinOps, a named solution with its own identity",
          },
          {
            src: "/work/bespin-global-social/shot-07.webp",
            alt: "Bespin Global, complete your data protection with Bespin Global's Microsoft 365 solution",
            caption: "Data protection, positioned as the completing piece",
          },
        ],
      },
      {
        type: "text",
        body: "Security-led content carried its own visual language across formats, from a single dominant headline to a fully realized, symbol-heavy scene, so the same M365 message never felt like a repeat.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/shot-04.webp",
            alt: "Bespin Global, secure your M365 data with a comprehensive Microsoft 365 solution",
            caption: "Secure your M365 data, the direct version",
          },
          {
            src: "/work/bespin-global-social/shot-08.webp",
            alt: "Bespin Global, secure your M365 data with Bespin Global's tailored Microsoft 365 solution",
            caption: "The same offer, rebuilt around a tailored-solution angle",
          },
        ],
      },
      {
        type: "text",
        body: "Event presence did the heaviest lifting for credibility, three flagship moments carried through one consistent visual system so the brand read as established rather than opportunistic.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/shot-01.webp",
            alt: "Bespin Global at GITEX Global 2023, tackling the year's toughest tech challenges",
            caption: "GITEX Global 2023",
          },
          {
            src: "/work/bespin-global-social/shot-09.webp",
            alt: "Bespin Global, Expand North Star 2023, venue H2-F40, Hall 2",
            caption: "Expand North Star 2023",
          },
          {
            src: "/work/bespin-global-social/shot-10.webp",
            alt: "Bespin Global at the IDC Government Congress 2023, leading Saudi Arabia's tech revolution",
            caption: "IDC Government Congress 2023",
          },
        ],
      },
      {
        type: "text",
        body: "The Google Cloud regional launch was built as a countdown, tension building across two teaser posts before the launch moment itself landed.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/shot-02.webp",
            alt: "Bespin Global, countdown begins now for Google Cloud's regional launch",
            caption: "Countdown begins now",
          },
          {
            src: "/work/bespin-global-social/shot-11.webp",
            alt: "Bespin Global, final countdown, Google Cloud's launch tomorrow",
            caption: "Final countdown, one day out",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bespin-global-social/shot-12.webp",
            alt: "Bespin Global, explore your career opportunities at Bespin Global",
            caption: "Culture and career content, alongside the product push",
          },
          {
            src: "/work/bespin-global-social/shot-13.webp",
            alt: "Bespin Global, we are powering your success in the cloud universe",
            caption: "A brand-level statement, closing the always-on mix",
          },
        ],
      },
      {
        type: "text",
        body: "Compelling content creation, consistent posting, and active community management positioned Bespin Global as a trusted authority in the IT industry. The increased engagement, positive follower feedback, and enhanced brand visibility broadened the client base and reinforced customer trust in the category.",
      },
    ],
    card: {
      tier: "Social Media",
      market: "Saudi Arabia",
      summary:
        "Event coverage, product content, and thought leadership that positioned a cloud provider as a trusted technical authority.",
      image: "/services/work-bespin-global-social.webp",
      accent: "blue",
    },
    next: "kenzup",
  },
  {
    slug: "kenzup",
    client: "Kenz'up",
    title: "Kenz'up",
    category: "Social Media Production",
    intro: "5M+ Installs. 3.5x Registration Conversion. New Market Entry.",
    heroImage: "/work/kenzup-social/hero.webp",
    logo: "/logos/clients/kenzup.webp",
    facts: [
      { label: "Client", value: "Kenz'up" },
      { label: "Industry", value: "App / E-commerce" },
      { label: "Services", value: "ASO, Performance Marketing" },
      { label: "Market", value: "Morocco" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "What was broken.",
        body: "Kenz'Up was launching into Morocco, a market with different digital behaviors, language considerations, and competitive dynamics. The app needed mass installs that actually converted to registered users, not just downloads.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/kenzup-social/shot-01.webp",
            alt: "Kenz'up referral campaign, invite friends with your code and earn 25 points each",
            caption: "Referral mechanics, made simple enough to act on immediately",
          },
          {
            src: "/work/kenzup-social/video-01.mp4",
            type: "video",
            alt: "Kenz'up app social media video",
            caption: "App-feature video content",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/kenzup-social/shot-02.webp",
            alt: "Kenz'up points and coupons animated illustration",
            caption: "Points and redemption, illustrated for quick comprehension",
          },
          {
            src: "/work/kenzup-social/shot-03.webp",
            alt: "Kenz'up app feature post, what makes Kenz'up your app",
            caption: "Feature spotlights run alongside the campaign content",
          },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Approach",
        heading: "What we did about it.",
        body: "ASO was the foundation: localized metadata, A/B tested screenshots, review velocity management. Performance marketing was layered on top with geo-targeted campaigns optimized for post-install events. The funnel was re-engineered to reduce registration friction from 7 steps to 3.",
      },
      {
        type: "stats",
        items: [
          { value: "5M+", label: "App installs" },
          { value: "7% → 25%", label: "Registration conversion rate improvement" },
          { value: "3.5x", label: "Conversion rate increase" },
        ],
      },
      {
        type: "text",
        body: "The strategy paired targeted online advertising with partner-business promotions and always-on feature content. It grew active users on the platform, strengthened partner relationships, boosted customer loyalty, and lifted engagement with the app's core features.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/kenzup-social/shot-04.webp",
            alt: "Kenz'up 3rd anniversary event announcement, Tuesday 17 October, noon to 3pm",
            caption: "Anniversary event announcement",
          },
          {
            src: "/work/kenzup-social/shot-05.webp",
            alt: "Kenz'up 3 years, 3 hours, triple cashback campaign",
            caption: "Triple cashback campaign",
          },
          {
            src: "/work/kenzup-social/shot-06.webp",
            alt: "Kenz'up deals x3 cashback across all brands, shown on the app",
            caption: "In-app deals feature",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/kenzup-social/shot-07.webp",
            alt: "Kenz'up Black Friday giveaway winners announcement, 1500 points each",
            caption: "Giveaway winners announcement",
          },
          {
            src: "/work/kenzup-social/shot-08.webp",
            alt: "Kenz'up Black Friday giveaway, 3 winners, 1500 points",
            caption: "Black Friday giveaway",
          },
          {
            src: "/work/kenzup-social/shot-09.webp",
            alt: "Kenz'up Black Friday giveaway entry steps, install the app, mention two friends, follow on Instagram",
            caption: "Giveaway entry mechanics",
          },
        ],
      },
    ],
    card: {
      tier: "Performance",
      market: "Morocco",
      summary:
        "Referral and feature content that turned a loyalty app's downloads into an active, referring user base.",
      image: "/services/work-kenzup-social.webp",
      accent: "blue",
    },
    next: "nile-air",
  },
  {
    slug: "nile-air",
    client: "Nile Air",
    title: "Nile Air",
    category: "Social Media Production",
    intro: "83M SAR Revenue. 350K SAR Spend. Amadeus Integration.",
    heroImage: "/work/nile-air-social/hero.webp",
    logo: "/logos/clients/nile-air.webp",
    facts: [
      { label: "Client", value: "Nile Air" },
      { label: "Industry", value: "Airlines" },
      { label: "Services", value: "Performance Marketing, Technology Integration" },
      { label: "Market", value: "Saudi Arabia" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "What was broken.",
        body: "Nile Air needed to build a direct digital booking channel in Saudi Arabia, a market dominated by OTAs and traditional travel agents. The technical barrier: integrating advertising platforms with the Amadeus reservation system for real-time attribution.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/nile-air-social/shot-02.webp",
            alt: "Nile Air pet-friendly flights, Pets Welcome on Board",
            caption: "Pet-friendly travel, made visible as a real feature",
          },
          {
            src: "/work/nile-air-social/shot-03.webp",
            alt: "Nile Air pregnancy travel safety guidelines, Travel Safely With Care",
            caption: "Safety guidance framed around the traveler, not the policy",
          },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Approach",
        heading: "What we did about it.",
        body: "We engineered a performance-first approach with a technical backbone. Amadeus was integrated directly with advertising platforms for end-to-end attribution, from ad click to boarding pass. Campaigns were structured around route-level profitability, not just CPA. Budget allocation shifted dynamically based on seat availability and pricing.",
      },
      {
        type: "stats",
        items: [
          { value: "83M SAR", label: "Digital revenue generated" },
          { value: "350K SAR", label: "Total ad spend" },
          { value: "237x", label: "Return on ad spend" },
          { value: "First", label: "Amadeus-advertising platform integration in the region" },
        ],
      },
      {
        type: "text",
        body: "Destination campaigns did the heaviest lifting, one visual system carrying Cairo, Luxor, and Aswan as a single Eid travel push, each city given its own frame while staying instantly recognizable as one Nile Air campaign.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/nile-air-social/shot-05.webp",
            alt: "Nile Air Cairo destination post for the Eid campaign",
            caption: "Cairo",
          },
          {
            src: "/work/nile-air-social/shot-06.webp",
            alt: "Nile Air Luxor destination post with hot air balloons over the Nile",
            caption: "Luxor",
          },
          {
            src: "/work/nile-air-social/shot-07.webp",
            alt: "Nile Air Aswan destination post with Nubian architecture",
            caption: "Aswan",
          },
        ],
      },
      {
        type: "text",
        body: "National holidays and short-haul video carried the same calendar, greeting content timed to the day, and a summer campaign built to move beyond the still frame.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/nile-air-social/video-01.mp4",
            type: "video",
            alt: "Nile Air Sinai Liberation Day video",
            caption: "Sinai Liberation Day",
          },
          {
            src: "/work/nile-air-social/video-02.mp4",
            type: "video",
            alt: "Nile Air Eid al-Fitr greeting video",
            caption: "Eid al-Fitr greeting",
          },
        ],
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/nile-air-social/video-03.mp4",
            type: "video",
            alt: "Nile Air summer vacation campaign video",
            caption: "Summer campaign, ancient wonders and sun-soaked beaches",
          },
          {
            src: "/work/nile-air-social/video-04.mp4",
            type: "video",
            alt: "Nile Air Dreaming of Italy, UAE, or Turkey campaign video",
            caption: "Dreaming of Italy, UAE, or Turkey, stylish cities, stunning views",
          },
        ],
      },
      {
        type: "text",
        body: "Offer content closed the loop, time-boxed promotions styled to stop the scroll on their own, driving bookings directly off the calendar's highest-attention days.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/nile-air-social/shot-08.webp",
            alt: "Nile Air Golden Friday Offer, 25% off",
            caption: "Golden Friday Offer",
          },
          {
            src: "/work/nile-air-social/shot-09.webp",
            alt: "Nile Air Special Eid Offers collage of destinations",
            caption: "Special Eid Offers",
          },
        ],
      },
    ],
    card: {
      tier: "Performance",
      market: "Egypt",
      summary:
        "Destination campaigns, service features, and always-on content that kept a national carrier's feed worth following.",
      image: "/services/work-nile-air-social.webp",
      accent: "orange",
    },
    next: "aman",
  },
  {
    slug: "aman",
    client: "Aman",
    title: "Aman",
    category: "Social Media Production",
    intro: "2M Downloads. 232K Registrations. 800K Transactions.",
    heroImage: "/work/aman-social/hero.webp",
    logo: "/logos/clients/aman.webp",
    facts: [
      { label: "Client", value: "Aman" },
      { label: "Industry", value: "Fintech Super App" },
      { label: "Services", value: "Performance Marketing, Social Media, Content Production" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "What was broken.",
        body: "Aman launched as a super app into one of the region's most saturated fintech markets, where a wide service catalogue is only a real advantage once volume actually moves through it. Downloads alone don't validate a super app — the test is whether users complete registration and keep transacting across the platform's full range of services, not just install it once.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/aman-social/shot-01.webp",
            alt: "Aman app, pay university and institute tuition directly from the services menu",
            caption: "University tuition, added as a searchable bill-payment service",
          },
          {
            src: "/work/aman-social/shot-07.webp",
            alt: "Aman app, pay a beIN Sports subscription from the entertainment category",
            caption: "Entertainment subscriptions, paid the same way as a utility bill",
          },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Approach",
        heading: "What we did about it.",
        body: "A multi-year program combining growth-focused paid acquisition, an always-on social presence for brand trust, and high-conversion creative built specifically for Google Ads and network placements, run as an embedded extension of Aman's own growth team rather than a detached retainer. The goal was a funnel that held together end to end: awareness into installs, installs into registrations, registrations into repeat transactions.",
      },
      {
        type: "stats",
        items: [
          { value: "2M", label: "App downloads" },
          { value: "232K", label: "Completed app registrations" },
          { value: "800K", label: "Successful transactions" },
          { value: "3.5x", label: "Transactions relative to registered users" },
        ],
      },
      {
        type: "text",
        body: "Installment shopping and the Aman Card gave registered users a reason to keep the app open beyond a single bill payment, financing everyday purchases and formalizing credit access in three steps inside the same flow.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/aman-social/shot-04.webp",
            alt: "Aman app, browse and finance electronics, mobiles, and vehicles in installments",
            caption: "Installment shopping across electronics, mobiles, and vehicles",
          },
          {
            src: "/work/aman-social/shot-06.webp",
            alt: "Aman Card application, a three-step form for ID upload, verification, and documents",
            caption: "Aman Card, applied for in three steps inside the app",
          },
        ],
      },
      {
        type: "text",
        body: "Always-on offer content kept the app relevant between transactions, mobile-carrier bills paid in the same flow as everyday spend, and a zero-fee month run as a retention push for users who had already registered.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/aman-social/shot-05.webp",
            alt: "Aman app, pay an Orange mobile bill with a confirmation screen",
            caption: "Mobile carrier bills, paid and confirmed in the same flow",
          },
          {
            src: "/work/aman-social/shot-02.webp",
            alt: "Aman campaign creative, no service fees for the month of August",
            caption: "A zero-fee month, run as a retention push for existing users",
          },
        ],
      },
    ],
    card: {
      tier: "Performance",
      market: "Egypt",
      summary:
        "A multi-year growth program that took a fintech super app from launch to 2M downloads and 800K real transactions.",
      image: "/services/work-aman-social.webp",
      accent: "blue",
    },
    next: "alex-bank",
  },
  {
    slug: "alex-bank",
    client: "Alex Bank",
    title: "Alex Bank",
    category: "Social Media Production",
    intro: "Winning Back Dormant Users, Not Just Acquiring New Ones.",
    heroImage: "/work/alex-bank-social/hero.webp",
    logo: "/logos/clients/Alex_Bank_Logo.png",
    facts: [
      { label: "Client", value: "Alex Bank Egypt" },
      { label: "Industry", value: "Banking & Financial Services" },
      { label: "Services", value: "Performance Marketing, App Reactivation & Retention" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "The user who downloaded, then disappeared.",
        body: "Every digital bank accumulates a pool of users who installed the app, went through registration, and then simply stopped opening it. These aren't lost causes, they already cleared the hardest part of the funnel (identity verification, account linking, initial trust) and then drifted away, usually because the app never gave them a reason to come back. A dormant, previously registered user can't be won with a generic acquisition message; they need a reason specific to why they stopped engaging in the first place, and that meant repositioning Alex Bank's digital offering around real utility: payments, offers, and financial management tools worth reopening the app for.",
      },
      {
        type: "figure",
        media: {
          src: "/work/alex-bank-social/hero.webp",
          alt: "Alex Bank seasonal campaign creative promoting in-app offers, dining, and grocery payments",
          caption: "Seasonal campaign creative, built to give a dormant user a concrete reason to reopen the app",
        },
      },
      {
        type: "sectionIntro",
        eyebrow: "The Strategy",
        heading: "A program built for reactivation, not just acquisition.",
        body: "Arqqa Digital ran a performance marketing program specifically targeted at Alex Bank's dormant user pool, built around getting a previously registered user to take three connected actions: reopen the app, complete re-registration or reactivate their profile, and actually use the digital services on offer. The approach leaned on cutting-edge targeting and messaging tactics aimed at the exact segment of users most likely to respond, rather than a single broad campaign that treats new and dormant users the same way.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/alex-bank-social/shot-03.webp",
            alt: "Alex Bank campaign, personal financing secured against certificates, up to 90% of certificate value",
            caption: "Personal financing secured by certificates, up to 90% of their value",
          },
          {
            src: "/work/alex-bank-social/shot-04.webp",
            alt: "Alex Bank campaign, 15% cashback on Mastercard credit card online purchases in Egypt",
            caption: "15% cashback on Mastercard online purchases",
          },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Program",
        heading: "What the program included.",
        body: "Targeted reactivation campaigns aimed specifically at the registered-but-inactive pool. Digital banking solution promotion, giving lapsed users a concrete, specific reason to reopen the app rather than a generic reminder. Streamlined payment system messaging, addressing the friction that may have contributed to disengagement in the first place. And personalized financial management tools, positioned as an active reason to return and stay engaged, not just a reactivation nudge.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/alex-bank-social/shot-01.webp",
            alt: "Alex Bank campaign, 50% off administrative fees on personal financing for up to 12 years",
            caption: "Personal financing, administrative fees cut in half",
          },
          {
            src: "/work/alex-bank-social/shot-02.webp",
            alt: "Alex Bank campaign, 50% off administrative fees on personal financing for a car purchase",
            caption: "The same offer, reframed for a car-purchase audience",
          },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Outcome",
        heading: "A dormant user pool, successfully brought back.",
        body: "The result: a successfully retained and reactivated pool of users, increased customer acquisition efficiency, improved overall marketing performance, and a strengthened position for Alex Bank as a frontrunner in Egypt's digital banking landscape.",
      },
    ],
    card: {
      tier: "Performance",
      market: "Egypt",
      summary:
        "A reactivation program built to win back dormant digital-banking users, not just acquire new ones.",
      image: "/services/work-alex-bank-social.webp",
      accent: "orange",
    },
    next: "masheed-gate",
  },
  {
    slug: "masheed-gate",
    client: "Masheed Gate",
    title: "Masheed Gate",
    category: "Social Media Production",
    intro: "40K to 300K SAR Monthly Sales. 276% Organic Traffic Growth.",
    heroImage: "/work/masheed-social/hero.webp",
    logo: "/logos/clients/Masheed+Gate-Logo-PNG02.webp",
    facts: [
      { label: "Client", value: "Masheed Gate" },
      { label: "Industry", value: "E-Commerce, Building Materials" },
      { label: "Services", value: "Performance Marketing, SEO Marketing" },
      { label: "Market", value: "Saudi Arabia" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "Jan 2022. One city, fifty products, no framework.",
        body: "MasheedGate.com launched as an online marketplace for building materials averaging just 40,000 SAR in monthly sales, with weak brand positioning and real doubts about scaling on either the on-ground or online side. Operations were exclusive to Dammam, only 50 products were listed, and there was no structured tracking framework or campaign architecture to build on.",
      },
      {
        type: "figure",
        media: {
          src: "/work/masheed-social/hero.webp",
          alt: "MasheedGate.com marketplace interface alongside organic traffic growth figures",
          caption: "The marketplace, alongside the organic growth the program drove",
        },
      },
      {
        type: "sectionIntro",
        eyebrow: "The Strategy",
        heading: "A tracking framework first, then the winning mix.",
        body: "Our belief in data-driven marketing meant hammering on gathering previous data and structuring it toward identifying key challenges before tackling them. Applying a proper tracking and conversion setup across platforms let us identify the winning channel mix, then pilot different campaign structures to reach the configuration that impacted direct conversions by 600x, alongside different creatives piloted across channels and media types.",
      },
      {
        type: "stats",
        items: [
          { value: "276%", label: "Increase in organic traffic year-over-year" },
          { value: "600x", label: "Impact on direct conversions from the piloted campaign structure" },
          { value: "3150", label: "Increase in keywords ranking on Google's first page and driving traffic" },
          { value: "325", label: "Keywords ranking on Google's first page" },
          { value: "24.2%", label: "Increase in referring domains" },
          { value: "75.5%", label: "Organic clicks landing on non-branded keywords" },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Outcome",
        heading: "Jan 2023. Six more cities, 3,000+ products.",
        body: "Average monthly sales scaled to 300,000 SAR alongside high brand positioning, operations expanded from Dammam alone to six additional cities, and the catalogue grew from 50 to more than 3,000 products. The structured tracking framework now standing behind the account enabled better strategic decisions, including exactly where to expand geographically and by category next.",
      },
    ],
    card: {
      tier: "Performance",
      market: "Saudi Arabia",
      summary:
        "A tracking-framework rebuild that took a building-materials marketplace from one city to seven and 6x'd its monthly sales.",
      image: "/services/work-masheed-social.webp",
      accent: "blue",
    },
    next: "dream-2000",
  },
  {
    slug: "dream-2000",
    client: "Dream 2000",
    title: "Dream 2000",
    category: "SEO Marketing",
    intro: "25% More Organic Traffic. 5,055 Page-One Keywords.",
    heroImage: "/work/dream-2000-social/hero.webp",
    logo: "/logos/clients/Dream-2000.png",
    facts: [
      { label: "Client", value: "Dream 2000" },
      { label: "Industry", value: "Electronics Retail" },
      { label: "Services", value: "Technical SEO Audit, On-Page SEO, Content" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "Strong offline. Underweight online.",
        body: "Dream 2000 had the fundamentals a retailer wants: physical scale, category breadth, and brand awareness built over years in-market. What it didn't have was a search presence that matched that reputation. Branded searches performed reasonably, but non-branded searches, the much larger volume of shoppers searching by product, category, or model, were underperforming, and underlying technical and integration issues were limiting how much of the site Google could properly crawl, index, and rank in the first place.",
      },
      {
        type: "figure",
        media: {
          src: "/work/dream-2000-social/hero.webp",
          alt: "Dream 2000 website alongside organic traffic and keyword-ranking growth figures",
          caption: "The storefront, alongside the organic growth the program drove",
        },
      },
      {
        type: "sectionIntro",
        eyebrow: "The Strategy",
        heading: "Fix the foundation, then build for non-branded demand.",
        body: "A deliberate two-phase sequence: audit and repair the technical foundation first, then layer a comprehensive SEO campaign on top of it, rather than optimizing content on top of a site Google couldn't fully crawl or index. Phase one resolved the integration issues and structural blockers limiting how effectively Google could crawl, index, and rank Dream 2000's pages. Phase two targeted relevant keywords across the full breadth of the catalogue through meta tag optimization, on-site structure improvements, and quality content built around real search demand, not just brand terms.",
      },
      {
        type: "stats",
        items: [
          { value: "+25%", label: "Increase in organic traffic" },
          { value: "+52%", label: "Increase in organic clicks on non-branded keywords" },
          { value: "+54%", label: "Increase in first-page keyword rankings" },
          { value: "5,055", label: "Keywords ranking on page 1 of Google" },
        ],
      },
      {
        type: "text",
        body: "Non-branded clicks and first-page rankings both grew faster than overall organic traffic, meaning the campaign's gains were concentrated exactly where the original challenge was: category and product-level search, not the branded search Dream 2000 already owned. That's the signature of a strategy working as designed, not a broad, undifferentiated traffic lift.",
        align: "center",
      },
      {
        type: "sectionIntro",
        eyebrow: "The Outcome",
        heading: "From reputation gap to search-first retailer.",
        body: "The technical foundation that was limiting Google's ability to crawl and index the site was resolved, the prerequisite that made every later optimization effective. First-page keyword coverage expanded to 5,055 ranking keywords, giving Dream 2000 organic visibility across a breadth of its product catalogue that reflects its real scale as a major electronics retailer, and the campaign translated directly into a measurable boost in online sales and brand recognition.",
      },
    ],
    card: {
      tier: "SEO",
      market: "Egypt",
      summary:
        "A technical-audit-first SEO program that closed the gap between an electronics retailer's offline reputation and its online search presence.",
      image: "/services/work-dream-2000-social.webp",
      accent: "orange",
    },
    next: "fawry-seo",
  },
  {
    slug: "fawry-seo",
    client: "Fawry",
    title: "Fawry — SEO",
    category: "SEO Marketing",
    intro: "+1,200% Organic Traffic. 903 Page-One Keywords.",
    heroImage: "/work/fawry-seo-social/hero.webp",
    logo: "/logos/clients/fawry.webp",
    facts: [
      { label: "Client", value: "Fawry" },
      { label: "Industry", value: "Fintech & Payment Aggregation" },
      { label: "Services", value: "Technical SEO, Service-Level Landing Pages" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "sectionIntro",
        eyebrow: "The Challenge",
        heading: "One brand. Hundreds of services. One search box.",
        body: "Fawry is an aggregator offering dozens of distinct, unrelated payment services under one umbrella, electricity card recharge, bill payments, traffic fine settlement, meter top-ups, telecom bills, and government fees among them. Each service has its own search behavior and its own competing pages, often government portals, banks, or other aggregators optimized for that exact query. A single homepage or generic services page cannot rank competitively for all of them at once, Google rewards pages built specifically around a single intent, not broad pages that mention many, so Fawry was ceding page-one visibility on its own core use cases to competitors and even to third-party content.",
      },
      {
        type: "figure",
        media: {
          src: "/work/fawry-seo-social/hero.webp",
          alt: "Fawry app and website alongside organic traffic and keyword-ranking growth figures",
          caption: "The platform, alongside the organic growth the program drove",
        },
      },
      {
        type: "sectionIntro",
        eyebrow: "The Strategy",
        heading: "A dedicated landing page for every service Fawry offers.",
        body: "Instead of treating SEO as a single site-wide exercise, the organic strategy was restructured around service-level ownership: every individual payment service got its own purpose-built landing page, engineered around the specific keyword cluster real users were searching for that service. A user searching \"شحن كرت الكهرباء\" (recharge electricity card) lands on a page built entirely around that task, not a general Fawry services page that mentions it in passing, while each page is optimized for its own cluster of related terms: the core query, \"how to\" variations, \"online\" modifiers, and long-tail phrasing, instead of one page competing for everything at once. The goal shifted from \"rank for Fawry\" to \"rank for every task Fawry solves\", and as more service pages ranked and earned organic clicks, they reinforced the domain's overall topical authority in the payments space, lifting the ranking potential of every other page on the site.",
      },
      {
        type: "stats",
        items: [
          { value: "+1,200%", label: "YoY organic traffic growth (multi-year program)" },
          { value: "903", label: "Keywords ranked on page 1 of Google" },
          { value: "72", label: "Keywords ranked #1" },
          { value: "211", label: "Keywords ranked in the top 3" },
          { value: "620", label: "Keywords ranked in positions 4–10" },
          { value: "4+ yrs", label: "Of continuous, always-on SEO delivery" },
        ],
      },
      {
        type: "sectionIntro",
        eyebrow: "The Business Impact",
        heading: "Scene dominance, not just brand visibility.",
        body: "The service-page strategy did more than grow traffic, it changed how Fawry is discovered. Customers searching for a specific task, not the Fawry brand, now consistently land on a Fawry-owned page first, making Fawry the practical default for that service. This service-by-service visibility compounded into category-wide dominance: Fawry didn't just rank well, it became the presumed answer across the majority of the payment-service search landscape in Egypt, reinforcing its market status as the country's leading payment aggregator through consistent, first-position presence at every individual point of customer intent, not through advertising alone.",
      },
      {
        type: "stats",
        heading: "Mid-Program Snapshot — Organic Channel Performance",
        items: [
          { value: "47%", label: "Of all site traffic from organic search, the #1 channel" },
          { value: "+12%", label: "Month-over-month growth in organic users" },
          { value: "130+", label: "Keywords already in position #1 at this stage" },
        ],
      },
      {
        type: "text",
        body: "Organic search led every other acquisition channel that month, outperforming direct (36%), referral (9.9%), social, and paid search combined, evidence the service-page strategy was driving durable, compounding organic demand rather than one-off spikes. The top-ranking keywords span real, high-frequency customer tasks, not vanity brand terms: the single highest-ranked keyword, an electricity-card-recharge query, alone carries roughly 5,400 average monthly searches, with dozens more service-specific terms ranking in the 200–1,600 monthly-search range, electricity card recharge and its \"how to\" variants as the highest-volume, highest-ranking cluster, bill payment queries for internet, electricity meter, and telecom each with their own ranking landing page, and traffic fine payment and government service queries converting directly on-page.",
        align: "center",
      },
      {
        type: "sectionIntro",
        eyebrow: "The Outcome",
        heading: "From one search bar to category ownership.",
        body: "A single, undifferentiated brand presence became a structured architecture of service-specific landing pages, each competing, and winning, for its own search intent. Organic search grew into Fawry's leading acquisition channel, sustained across a 4+ year always-on program rather than a short-term spike, 903 keywords on page one and 72 in position #1 standing as direct evidence that the service-page strategy out-competed government portals, banks, and rival aggregators on Fawry's own core use cases. The strategy's business impact extended beyond traffic: consistent first-position presence across individual services reinforced Fawry's brand as the default, category-leading payment aggregator in the Egyptian market, and a repeatable, scalable model, every new payment service Fawry launches can follow the same dedicated-landing-page playbook to capture its own search demand from day one.",
      },
    ],
    card: {
      tier: "SEO",
      market: "Egypt",
      summary:
        "A service-level SEO architecture that made Fawry the default answer across hundreds of individual payment searches.",
      image: "/services/work-fawry-seo-social.webp",
      accent: "blue",
    },
    next: "bic",
  },
  {
    slug: "bic",
    client: "BIC",
    title: "BIC, Art Master Africa",
    category: "Social Media Production",
    intro:
      "A pan-African art talent competition, carried through OOH, street, and social, one visual system built to feel bigger than a single ad.",
    heroImage: "/work/bic-social/hero.webp",
    logo: "/logos/clients/bic.webp",
    facts: [
      { label: "Client", value: "BIC" },
      { label: "Industry", value: "Consumer Goods, Stationery" },
      { label: "Scope", value: "Campaign Creative, OOH, Social Media Production" },
      { label: "Market", value: "Africa" },
    ],
    story: [
      {
        type: "text",
        body: "Art Master Africa is BIC's pan-continental search for the region's biggest undiscovered art talent, one identity built to work at billboard scale and on a single Instagram square alike.",
      },
      {
        type: "text",
        body: "The creative anchor was a single illustration, an ink portrait built entirely from African cultural icons, drawn as if it flowed straight out of a BIC pen. That one piece of art became the system's spine, reappearing across every format at every scale.",
      },
      {
        type: "figure",
        media: {
          src: "/work/bic-social/shot-03.webp",
          alt: "BIC United Africa poster with an ink illustration of a woman built from African cultural icons, flowing from a BIC pen",
          caption: "The campaign's anchor illustration, cultural icons drawn as if inked live from the pen",
        },
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/bic-social/shot-04.webp",
            alt: "BIC United Africa poster placed outdoors among cactus plants",
            caption: "Street placement, the art holding up outside the frame",
          },
          {
            src: "/work/bic-social/shot-05.webp",
            alt: "BIC Art Master Africa 2024 Stay Tuned poster on a graffiti wall",
            caption: "Teaser phase, building anticipation ahead of launch",
          },
        ],
      },
      {
        type: "text",
        body: "At full scale, the same artwork carried a billboard on its own, no crop, no simplification, just the pen and the illustration doing the entire job of stopping a commute.",
      },
      {
        type: "figure",
        media: {
          src: "/work/bic-social/shot-02.webp",
          alt: "BIC United Africa billboard campaign in an urban setting",
          caption: "Out-of-home, the identical artwork scaled to billboard size",
        },
      },
      {
        type: "text",
        body: "On social, the same system broke into a full content calendar: competition mechanics, submitted artwork, judge spotlights, and engagement games, all carrying the campaign's ink-and-icon visual language so the feed read as one continuous story rather than a string of separate posts.",
      },
      {
        type: "figure",
        media: {
          src: "/work/bic-social/shot-01.webp",
          alt: "Grid of BIC Art Master Africa social media posts, competition mechanics, judge spotlights, participant artwork, and engagement games",
          caption: "The social calendar, one visual language across every post type",
        },
      },
      {
        type: "text",
        body: "The result: a single piece of art doing the work of an entire campaign, recognizable whether it was scrolled past in a feed or driven past on a highway.",
      },
    ],
    card: {
      tier: "Social Media",
      market: "Africa",
      summary:
        "One illustration carried across OOH, street, and social for BIC's pan-African art talent competition.",
      image: "/services/work-bic-social.webp",
      accent: "blue",
    },
    next: "coffee-fellows",
  },
];

export function getSocialProject(slug: string) {
  return SOCIAL_PROJECTS.find((p) => p.slug === slug);
}

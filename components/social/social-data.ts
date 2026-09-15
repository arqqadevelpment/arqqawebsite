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
 * Pizza Hut, Kenz'up, and Coffee Fellows.
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

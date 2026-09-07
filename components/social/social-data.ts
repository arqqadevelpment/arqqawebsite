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
        body: "Coffee Fellows is a German coffee-shop brand entering Egypt for the first time — a launch with no local audience or brand memory to draw on. The mandate was to build both from nothing: introduce the menu, establish a visual identity on social, and turn a new storefront into a place people already wanted to visit before it opened.",
      },
      {
        type: "figure",
        media: {
          src: "/work/coffee-fellows/shot-01.webp",
          alt: "Coffee Fellows branded drink and dessert shot with the tagline Make Today Extraordinary",
          caption: "Launch content — product photography built around the brand's own voice",
        },
      },
      {
        type: "text",
        body: "Every post was shot and produced in-house: professional food and drink photography, seasonal product features, and short-form reels, run on a consistent posting schedule with active community management from day one.",
      },
      {
        type: "figure",
        media: {
          src: "/work/coffee-fellows/video-01.mp4",
          type: "video",
          alt: "Coffee Fellows social media reel",
          caption: "One of the launch-phase reels",
        },
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/coffee-fellows/shot-03.webp",
            alt: "Coffee Fellows fresh juice lineup — Sunny Medium, Berry Mix Smoothie, Granny Medium",
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
        type: "figure",
        media: {
          src: "/work/coffee-fellows/video-02.mp4",
          type: "video",
          alt: "Coffee Fellows social media reel",
          caption: "A second reel from the ongoing content calendar",
        },
      },
      {
        type: "pair",
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
      {
        type: "figure",
        media: {
          src: "/work/coffee-fellows/shot-07.webp",
          alt: "Coffee Fellows dessert and latte with the line The Sweetest Escape",
          caption: "In-store lifestyle content, post-launch",
        },
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
      "Campaign-led social content for one of Saudi Arabia's biggest pizza chains — built to keep an already-known brand feeling worth talking about.",
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
        body: "Pizza Hut KSA already had the market presence — the challenge was keeping a household name feeling current on social, where attention resets every scroll. That meant a steady output of product-led content and campaign concepts strong enough to earn engagement on their own, not just brand-awareness filler.",
      },
      {
        type: "figure",
        media: {
          src: "/work/pizza-hut-social/shot-01.webp",
          alt: "Pizza Hut KSA meter-long pizza campaign with three dipping sauces",
          caption: "Meter Pizza — a size-led campaign built to be shared",
        },
      },
      {
        type: "figure",
        media: {
          src: "/work/pizza-hut-social/video-01.mp4",
          type: "video",
          alt: "Pizza Hut KSA social media video",
          caption: "Campaign video content",
        },
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/pizza-hut-social/shot-02.webp",
            alt: "Pizza Hut KSA Thin & Crispy versus Pan crust comparison post",
            caption: "A crust-preference post built for comments, not just likes",
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
    intro:
      "Content and creative for a loyalty-rewards app in Morocco, built to turn app-store downloads into an active, referring user base.",
    heroImage: "/work/kenzup-social/hero.webp",
    logo: "/logos/clients/kenzup.webp",
    facts: [
      { label: "Client", value: "Kenz'up" },
      { label: "Industry", value: "Loyalty & Rewards" },
      { label: "Scope", value: "Social Media Production, Content Marketing" },
      { label: "Market", value: "Morocco" },
    ],
    story: [
      {
        type: "text",
        body: "Kenz'up is a loyalty app in Morocco, giving users exclusive discounts, rewards, and personalized offers from partner businesses. An app like this lives or dies on activation and referral — a download that never gets opened again is worth nothing — so the content had to explain the reward mechanics clearly enough to actually get used.",
      },
      {
        type: "figure",
        media: {
          src: "/work/kenzup-social/shot-01.webp",
          alt: "Kenz'up referral campaign — invite friends with your code and earn 25 points each",
          caption: "Referral mechanics, made simple enough to act on immediately",
        },
      },
      {
        type: "figure",
        media: {
          src: "/work/kenzup-social/video-01.mp4",
          type: "video",
          alt: "Kenz'up app social media video",
          caption: "App-feature video content",
        },
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/kenzup-social/shot-02.webp",
            alt: "Kenz'up points and coupons animated illustration",
            caption: "Points and redemption, illustrated for quick comprehension",
          },
          {
            src: "/work/kenzup-social/shot-03.webp",
            alt: "Kenz'up app feature post — what makes Kenz'up your app",
            caption: "Feature spotlights run alongside the campaign content",
          },
        ],
      },
      {
        type: "text",
        body: "The strategy paired targeted online advertising with partner-business promotions and always-on feature content. It grew active users on the platform, strengthened partner relationships, boosted customer loyalty, and lifted engagement with the app's core features.",
      },
    ],
    card: {
      tier: "Social Media",
      market: "Morocco",
      summary:
        "Referral and feature content that turned a loyalty app's downloads into an active, referring user base.",
      image: "/services/work-kenzup-social.webp",
      accent: "blue",
    },
    next: "coffee-fellows",
  },
];

export function getSocialProject(slug: string) {
  return SOCIAL_PROJECTS.find((p) => p.slug === slug);
}

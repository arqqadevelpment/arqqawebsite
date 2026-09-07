/**
 * Branding projects — one page each at /branding/<slug>.
 *
 * Reuses the ShowcaseProject shape and ShowcaseTemplate from
 * components/showcase, same as the Social Media Production projects: a
 * brand identity project reads the same way — copy alternating with the
 * actual deliverable (logo system, collateral, mockups). Kept in its own
 * array/route so the /work hub's filter tabs stay distinct buckets even
 * though they share a template.
 *
 * Content and imagery migrated from arqqa.net's old portfolio pages for
 * Klivvr and FXD.
 */

import type { ShowcaseProject } from "@/components/showcase/showcase-data";

export const BRANDING_PROJECTS: ShowcaseProject[] = [
  {
    slug: "klivvr",
    client: "Klivvr",
    title: "Klivvr",
    category: "Branding",
    intro:
      "A full brand identity for an online bank, built to read as innovative and trustworthy to a generation that banks from its phone.",
    heroImage: "/work/klivvr/hero.webp",
    facts: [
      { label: "Client", value: "Klivvr, by Orascom Financial Holding" },
      { label: "Industry", value: "Digital Banking" },
      { label: "Scope", value: "Brand Identity, Collateral, Art Direction" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "text",
        body: "Klivvr, an online bank based in Egypt, approached ARQQA to help establish a brand identity that would resonate with its target audience: young professionals aged 18 to 40 looking for banking that felt innovative, elegant, and trustworthy — not the legacy identity of a traditional bank.",
      },
      {
        type: "figure",
        media: {
          src: "/work/klivvr/shot-01.webp",
          alt: "Klivvr prepaid, debit, and credit card designs stacked",
          caption: "A card system that reads as one family across every product tier",
        },
      },
      {
        type: "text",
        body: "The identity was built around a blue-to-purple gradient system and a stylised 'K' mark, chosen to convey innovation and modernity without losing the credibility a bank still has to earn. Clean, youthful typography carried that same balance through every touchpoint.",
      },
      {
        type: "figure",
        media: {
          src: "/work/klivvr/shot-08.webp",
          alt: "Hand holding a white Klivvr credit card with an embossed gradient K mark",
          caption: "The card, as the identity's most-touched object",
        },
      },
      {
        type: "figure",
        media: {
          src: "/work/klivvr/shot-02.webp",
          alt: "Klivvr wordmark construction and grid study",
          caption: "Typography and mark construction",
        },
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/klivvr/shot-09.webp",
            alt: "Woman using a VR headset, representing Klivvr's innovation-led brand values",
            caption: "Innovation as a brand value, not just a tagline",
          },
          {
            src: "/work/klivvr/shot-10.webp",
            alt: "Man smiling while using his phone, representing Klivvr's everyday banking experience",
            caption: "The everyday customer the identity was built for",
          },
        ],
      },
      {
        type: "text",
        body: "Elevation, innovation, integrity, customer-centricity, and dynamism were the five values the system had to carry — so the identity was built to extend cleanly off the card and onto everything else the brand touches, from merchandise to marketing collateral.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/klivvr/shot-04.webp",
            alt: "Klivvr branded mug with gradient logo",
            caption: "Merchandise",
          },
          {
            src: "/work/klivvr/shot-05.webp",
            alt: "Klivvr branded water bottle with gradient logo",
            caption: "Merchandise",
          },
          {
            src: "/work/klivvr/shot-06.webp",
            alt: "Klivvr branded notebook with the line Modern, simple & fast",
            caption: "Collateral",
          },
        ],
      },
      {
        type: "text",
        body: "The new identity had an immediate impact on Klivvr's business, helping it stand out in a crowded online-banking category and giving the brand a consistent face across its website, social channels, and promotional materials.",
      },
    ],
    card: {
      tier: "Branding",
      market: "Egypt",
      summary:
        "A full identity system for a digital bank, built to read as innovative and trustworthy at once.",
      image: "/services/work-klivvr.webp",
      accent: "blue",
    },
    next: "fxd",
  },
  {
    slug: "fxd",
    client: "FXD Technologies",
    title: "FXD Technologies",
    category: "Branding",
    intro:
      "A rebrand for a forward-thinking tech company, built to carry the phrase it lives by: the future shapers.",
    heroImage: "/work/fxd/hero.webp",
    facts: [
      { label: "Client", value: "FXD Technologies" },
      { label: "Industry", value: "Technology" },
      { label: "Scope", value: "Brand Identity, Collateral, Social Templates" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "text",
        body: "FXD Technologies is a forward-thinking tech company offering innovative solutions to enterprise clients — but its identity wasn't positioning it as the industry leader its work already made it. The rebrief was to build a system that reflected the company's technical expertise and forward-thinking methodology, and made that case to new clients on sight.",
      },
      {
        type: "figure",
        media: {
          src: "/work/fxd/shot-01.webp",
          alt: "FXD Technologies stationery flatlay — letterhead, envelope, business cards, pins, USB drives, pencils",
          caption: "One system, carried consistently across every piece of collateral",
        },
      },
      {
        type: "text",
        body: "The mark itself does double duty: an X built from two crossing forms reads as the crossroads of technology and possibility, resolved into a full wordmark — FXD Technologies, The Future Shapers — that carries the company's positioning in its own logotype.",
      },
      {
        type: "figure",
        media: {
          src: "/work/fxd/shot-02.webp",
          alt: "FXD logo construction and grid study",
          caption: "Mark construction — proportion and grid",
        },
      },
      {
        type: "text",
        body: "A blue-to-green gradient carried the brand's tech-forward energy into social content and client-facing materials, applied consistently whether the piece was a paid post, a client case study, or an internal quiz card.",
      },
      {
        type: "grid",
        media: [
          {
            src: "/work/fxd/shot-03.webp",
            alt: "FXD Technologies social post — Prepare your institution for whatever comes its way",
            caption: "Social template — client-facing messaging",
          },
          {
            src: "/work/fxd/shot-04.webp",
            alt: "FXD Technologies Instagram post mockup on a phone",
            caption: "Applied to Instagram",
          },
          {
            src: "/work/fxd/shot-05.webp",
            alt: "FXD Clients showcase featuring Vodafone",
            caption: "Client showcase template",
          },
        ],
      },
      {
        type: "text",
        body: "In-depth market research and consistent messaging behind the identity let FXD attract new clients, strengthen trust with existing ones, and position itself as the go-to company for cutting-edge technology solutions.",
      },
      {
        type: "figure",
        media: {
          src: "/work/fxd/shot-06.webp",
          alt: "FXD Technologies quiz-style social post — Do you know when FXD Technologies was founded",
          caption: "Engagement content, built on the same system",
        },
      },
    ],
    card: {
      tier: "Branding",
      market: "Egypt",
      summary:
        "A full rebrand — mark, collateral, and social system — built to position FXD as the future shapers.",
      image: "/services/work-fxd.webp",
      accent: "orange",
    },
    next: "klivvr",
  },
];

export function getBrandingProject(slug: string) {
  return BRANDING_PROJECTS.find((p) => p.slug === slug);
}

/**
 * Single source of truth for the OUR WORK project pages (/our-work/<slug>).
 *
 * These are project showcases, not the metrics-led case studies in
 * portfolio-data.ts.
 *
 * The body of each page is an authored sequence of blocks rather than a text
 * block followed by an image dump, so reading and looking alternate down the
 * page. Three block types cover the rhythm: a paragraph, a single figure, and
 * a side-by-side pair. Order the array and the layout follows.
 */

export type ShowcaseMedia = {
  src: string;
  alt: string;
  /** Defaults to "image". Videos autoplay muted and loop. */
  type?: "image" | "video";
  /** Optional line printed under the frame */
  caption?: string;
};

export type ShowcaseBlock =
  /** One short paragraph, held to a comfortable reading measure */
  | { type: "text"; body: string }
  /** One figure at full container width */
  | { type: "figure"; media: ShowcaseMedia }
  /** Two figures side by side, stacking on mobile */
  | { type: "pair"; media: [ShowcaseMedia, ShowcaseMedia] };

export type ShowcaseProject = {
  /** URL slug — the page lives at /our-work/<slug> */
  slug: string;
  client: string;
  /** Page title — usually the client name */
  title: string;
  /** Small label above the title, e.g. "Web Design & Development" */
  category: string;
  /** One-line lead under the title */
  intro: string;
  /** Full-bleed header banner */
  heroImage?: string;
  /** Client mark, shown beside the body when present */
  logo?: string;
  /** Meta strip under the header */
  facts: { label: string; value: string }[];
  /** The page body — paragraphs and visuals interleaved, in order */
  story: ShowcaseBlock[];
  /** Live site, if it is public */
  liveUrl?: string;
  /** How this project shows up as a card on the /work hub. */
  card: {
    /** Build tier, used as the card's category label */
    tier: "Corporate" | "E-Commerce" | "Shopify" | "Interactive";
    market: string;
    summary: string;
    image: string;
    accent: "blue" | "orange";
  };
  /** Slug of the project offered at the foot of the page */
  next: string;
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    slug: "sbs",
    client: "SBS",
    title: "Superior Business Solutions",
    category: "Web Design & Development",
    intro:
      "A corporate platform for an enterprise and healthcare technology provider — built to make a broad, technical offering legible to the people who buy it.",
    heroImage: "/work/sbs/hero.webp",
    logo: "/logos/clients/sbs.webp",
    facts: [
      { label: "Client", value: "Superior Business Solutions" },
      { label: "Industry", value: "Enterprise & Healthcare Technology" },
      { label: "Scope", value: "Strategy, UX/UI, Web Development" },
      { label: "Year", value: "2026" },
    ],
    story: [
      {
        type: "text",
        body: "SBS is a specialised provider of enterprise software solutions, healthcare technologies, and digital transformation services. Its work spans ERP implementation, system integration, and process automation, with a deep healthcare practice covering HIS, EMR, PACS, and RCM systems, delivered on platforms including Odoo and Microsoft Dynamics 365.",
      },
      {
        type: "figure",
        media: {
          src: "/work/sbs/showreel.mp4",
          type: "video",
          alt: "SBS website walkthrough",
          caption: "Full platform walkthrough",
        },
      },
      {
        type: "text",
        body: "That breadth was the design problem. A company selling to hospital executives and to enterprise operations leaders at the same time cannot lead with one generic promise — and a flat services list would have buried the healthcare specialisation that sets SBS apart. The site had to hold two distinct audiences without splitting into two websites.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/sbs/shot-01.webp",
            alt: "SBS homepage hero — Transforming Complexity Into Digital Clarity",
            caption: "Homepage — the one promise both audiences share",
          },
          {
            src: "/work/sbs/shot-06.webp",
            alt: "SBS process section — How We Transform Your Business",
            caption: "Our Process — the offering as a sequence, not a list",
          },
        ],
      },
      {
        type: "text",
        body: "We built the platform around a clear top-level split — HealthCare and ERP & Business — so each audience finds its own path from the first click, while the brand narrative stays one story: turning fragmented processes into connected, intelligent ecosystems.",
      },
      {
        type: "figure",
        media: {
          src: "/work/sbs/shot-03.webp",
          alt: "SBS problem section — A Disconnected Hospital Is a Dangerous Hospital",
          caption: "The Problem — risk made concrete before the solution is named",
        },
      },
      {
        type: "text",
        body: "Product depth is carried by scroll-driven sections rather than dense copy. The result reads as an enterprise technology partner rather than a software vendor — dark, precise, and built so that every service page ends somewhere a qualified lead can act.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/sbs/shot-04.webp",
            alt: "SBS results section — Impact you can measure",
            caption: "By The Numbers — outcomes stated as figures",
          },
          {
            src: "/work/sbs/shot-05.webp",
            alt: "SBS dental practice landing page",
            caption: "Vertical landing pages — one per specialisation",
          },
        ],
      },
    ],
    liveUrl: "https://sbs-me.com",
    card: {
      tier: "Corporate",
      market: "Egypt",
      summary:
        "An enterprise and healthcare technology platform, built to make a broad technical offering legible to two very different buyers.",
      image: "/services/work-sbs.webp",
      accent: "blue",
    },
    next: "act",
  },

  {
    slug: "act",
    client: "ACT",
    title: "ACT",
    category: "Web Design & Development",
    intro:
      "A regional ICT leader with thirty-five years of history and four markets to speak to — given a site that carries the weight of the track record without hiding behind it.",
    heroImage: "/work/act/hero.webp",
    logo: "/logos/clients/act.webp",
    facts: [
      { label: "Client", value: "Advanced Computer Technology" },
      { label: "Industry", value: "Enterprise IT & System Integration" },
      { label: "Scope", value: "Strategy, UX/UI, Web Development" },
      { label: "Markets", value: "Egypt, UAE, KSA, Germany" },
    ],
    story: [
      {
        type: "text",
        body: "ACT has been building Egypt's technology backbone since 1988, when it started out as the sole agent for Compaq in the country. Three and a half decades on it is a regional ICT leader — over 3,000 customers, more than 500 experts, and offices across Egypt, the UAE, KSA and Germany — delivering system integration, managed IT services, enterprise networking, cybersecurity and large-scale digital transformation.",
      },
      {
        type: "figure",
        media: {
          src: "/work/act/video-01.mp4",
          type: "video",
          alt: "ACT website walkthrough",
          caption: "Platform walkthrough",
        },
      },
      {
        type: "text",
        body: "A thirty-five-year history is an asset that is easy to waste. Told badly it reads as a company describing its own past; told well it is the reason a CIO trusts you with a data centre migration. The site had to make the track record do work — and do it while speaking to four markets and a service range running from Open RAN to hospitality systems.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/act/shot-05.webp",
            alt: "ACT about page hero — Empowering Egypt's Digital Future Since 1988",
            caption: "About — the date leads, because the date is the credential",
          },
          {
            src: "/work/act/shot-06.webp",
            alt: "ACT story section — Three Decades of Innovation, with presence and customer statistics",
            caption: "Our Story — history and proof points in one view",
          },
        ],
      },
      {
        type: "text",
        body: "We anchored the brand in a warm orange against near-black, so a technically dense site still reads as confident rather than cold, and split the navigation by intent — Who We Are, What We Do, Industries — so a hospitality buyer and a telecom operator never have to wade through each other's content.",
      },
      {
        type: "figure",
        media: {
          src: "/work/act/shot-03.webp",
          alt: "ACT services hero — Building Smarter, Safer, and Scalable IT with ACT",
          caption: "Services — the range stated plainly, before the detail",
        },
      },
      {
        type: "text",
        body: "Below that, the offering is broken into scannable territories rather than a single list. Solution areas carry their own imagery so the eye can find the right one at a glance, and the telecom practice gets its own set of strategic pillars for readers who need the engineering specifics.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/act/shot-01.webp",
            alt: "ACT technology solutions carousel — Hybrid IT, Networking Solutions, Cybersecurity Solutions",
            caption: "Solution areas — a carousel, not a wall of text",
          },
          {
            src: "/work/act/shot-04.webp",
            alt: "ACT strategic pillars section for telecom",
            caption: "Strategic Pillars — depth for the specialist reader",
          },
        ],
      },
      {
        type: "text",
        body: "The argument closes with evidence. Named clients, named projects, and a route into each one — the difference between claiming three decades of delivery and showing it.",
      },
      {
        type: "figure",
        media: {
          src: "/work/act/shot-02.webp",
          alt: "ACT success stories section with named client case studies",
          caption: "Success Stories — real projects, named clients",
        },
      },
    ],
    liveUrl: "https://advancedcomputertechnology.com",
    card: {
      tier: "Interactive",
      market: "Egypt · UAE · KSA",
      summary:
        "Thirty-five years of ICT delivery, restructured so the track record does work rather than simply being stated.",
      image: "/services/work-act.webp",
      accent: "orange",
    },
    next: "merova",
  },
  {
    slug: "merova",
    client: "Merova",
    title: "Merova",
    category: "Web Design & Development",
    intro:
      "A Shopify storefront for a Turkish fashion house selling two very different catalogues — apparel and beauty — without making customers choose between them.",
    heroImage: "/work/merova/hero.webp",
    logo: "/logos/clients/merova.webp",
    facts: [
      { label: "Client", value: "Merova — House of Turkish Fashion" },
      { label: "Industry", value: "Fashion & Beauty E-commerce" },
      { label: "Platform", value: "Shopify" },
      { label: "Scope", value: "Strategy, UX/UI, Store Build" },
    ],
    story: [
      {
        type: "text",
        body: "Merova brings Turkish fashion to the Egyptian market — womenswear across pyjamas, lingerie, maternity and shapewear, alongside the full Pierre Cardin makeup range. Two catalogues, two shopping mindsets, one store.",
      },
      {
        type: "figure",
        media: {
          src: "/work/merova/shot-01.webp",
          alt: "Merova storefront homepage with seasonal makeup promotion",
          caption: "Storefront — the season's offer leads",
        },
      },
      {
        type: "text",
        body: "Fashion and beauty do not shop the same way. Apparel needs size, fit and fabric before anyone adds to cart; cosmetics are shade-led and largely repeat purchases. A single generic product template would have served neither, and burying one category under the other would have cost the store half its range.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/merova/shot-04.webp",
            alt: "Merova homepage promotional banner — Buy 1 get the second 50% off",
            caption: "Promotions built into the homepage rhythm",
          },
          {
            src: "/work/merova/shot-03.webp",
            alt: "Merova featured products grid with colour swatches and sale pricing",
            caption: "Featured products — swatches and pricing at grid level",
          },
        ],
      },
      {
        type: "text",
        body: "We gave each catalogue its own merchandising logic. Apparel browses by season and garment type with stock and price filters doing the narrowing; beauty browses by what you are actually shopping for — eyes, lips, face — through a visual mega menu that skips the category ladder entirely.",
      },
      {
        type: "figure",
        media: {
          src: "/work/merova/shot-05.webp",
          alt: "Merova Winter category page with sidebar filters, availability and price",
          caption: "Category browse — filters that match how apparel is shopped",
        },
      },
      {
        type: "text",
        body: "Product pages carry the detail a considered purchase needs — gallery, size selection, vendor and SKU, live stock state — and stay honest when something is gone, offering a notify-me rather than a dead end. Search surfaces trending queries and popular products before a single character is typed.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/merova/shot-06.webp",
            alt: "Merova product detail page with gallery, size selection and stock state",
            caption: "Product page — sold-out handled as a capture, not a dead end",
          },
          {
            src: "/work/merova/shot-07.webp",
            alt: "Merova makeup mega menu organised by eyes, lips and face",
            caption: "Beauty mega menu — shopped by intent, not by hierarchy",
          },
        ],
      },
      {
        type: "text",
        body: "The result is one storefront that behaves like two specialist shops, on a platform the client's own team can merchandise without a developer in the loop.",
      },
      {
        type: "figure",
        media: {
          src: "/work/merova/shot-08.webp",
          alt: "Merova search overlay showing trending searches and popular products",
          caption: "Search — populated before the first keystroke",
        },
      },
    ],
    liveUrl: "https://merovastore.com",
    card: {
      tier: "Shopify",
      market: "Egypt",
      summary:
        "One Shopify storefront carrying two catalogues — Turkish fashion and Pierre Cardin beauty — without making customers choose.",
      image: "/services/work-merova.webp",
      accent: "orange",
    },
    next: "ebc",
  },
  {
    slug: "ebc",
    client: "EBC",
    title: "Egyptian Banks Company",
    category: "Web Design & Development",
    intro:
      "The public face of Egypt's national payments infrastructure — built to explain systems most people use every day without ever knowing their name.",
    heroImage: "/work/ebc/hero.webp",
    logo: "/logos/clients/ebc.webp",
    facts: [
      { label: "Client", value: "Egyptian Banks Co. for Technological Advancements" },
      { label: "Industry", value: "Payments Infrastructure" },
      { label: "Scope", value: "Strategy, UX/UI, Web Development" },
      { label: "Market", value: "Egypt" },
    ],
    story: [
      {
        type: "text",
        body: "EBC is the developer and operator of the payments infrastructure that connects Egypt's e-payments ecosystem — the technological arm of the Central Bank of Egypt, governed with the CBE at the head of its shareholders. Its systems sit behind the 123 Shared Cash Network, EG-ACH, the Meeza card scheme, Meeza digital wallets and the Instant Payment Network.",
      },
      {
        type: "figure",
        media: {
          src: "/work/ebc/video-01.mp4",
          type: "video",
          alt: "EBC website walkthrough",
          caption: "Platform walkthrough",
        },
      },
      {
        type: "text",
        body: "National infrastructure is a hard thing to put on a website. The audience runs from a cardholder who just wants to know what Meeza is, to a bank evaluating scheme participation, to a government body planning a disbursement programme — and the products themselves are clearing houses and switching networks, not things you can photograph.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/ebc/shot-03.webp",
            alt: "EBC homepage hero — We Enable Seamless Fund Transfers, 123 Shared Cash Network",
            caption: "Homepage — the outcome first, the infrastructure second",
          },
          {
            src: "/work/ebc/shot-01.webp",
            alt: "EBC EG-ACH page — the multi-currency automated clearing house",
            caption: "EG-ACH — one scheme, one page, one clear explanation",
          },
        ],
      },
      {
        type: "text",
        body: "So we led with what each system lets people do, and gave every scheme its own space rather than compressing them into a services list. Each one opens on the human outcome — transfers that clear, a card that works at any ATM — and only then explains the mechanism underneath.",
      },
      {
        type: "figure",
        media: {
          src: "/work/ebc/shot-04.webp",
          alt: "EBC Meeza card scheme section explaining Egypt's domestic card payment scheme",
          caption: "Meeza — a national card scheme explained as a consumer product",
        },
      },
      {
        type: "text",
        body: "For the institutional reader, credibility is carried by scale and by capability, stated plainly: how many issuer and acquirer banks are connected, how many cards are in circulation, what uptime the network holds.",
      },
      {
        type: "pair",
        media: [
          {
            src: "/work/ebc/shot-05.webp",
            alt: "EBC statistics — issuer banks, cards, transactions, availability and value",
            caption: "Scale stated as figures — 47.2M cards, 99.9% availability",
          },
          {
            src: "/work/ebc/shot-06.webp",
            alt: "EBC instant payment infrastructure capability list",
            caption: "Capability, itemised for the institutional reader",
          },
        ],
      },
      {
        type: "text",
        body: "The result is a site that serves a cardholder and a central-bank stakeholder from the same pages — and makes a case for financial inclusion that reads as national policy rather than marketing.",
      },
      {
        type: "figure",
        media: {
          src: "/work/ebc/shot-02.webp",
          alt: "EBC Meeza Digital wallet page showing QR code payment",
          caption: "Meeza Digital — wallets and QR acceptance",
        },
      },
    ],
    liveUrl: "https://www.egyptianbanks.com",
    card: {
      tier: "Corporate",
      market: "Egypt",
      summary:
        "The public face of Egypt's national payments infrastructure — explaining systems millions use without knowing their name.",
      image: "/services/work-ebc.webp",
      accent: "blue",
    },
    next: "sbs",
  },
];

export function getShowcaseProject(slug: string) {
  return SHOWCASE_PROJECTS.find((p) => p.slug === slug);
}

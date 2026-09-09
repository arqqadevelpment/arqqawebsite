/**
 * Video & Animation projects — one page each at /videos/<slug>, hosted on
 * Vimeo and embedded via the player iframe (id + privacy hash from the
 * share URL: player.vimeo.com/video/<id>?h=<hash>).
 *
 * Two clients in this batch (Bespin Global, Gulf Cryo) have no logo file in
 * public/logos/clients — `logo` is left unset for them rather than guessing
 * a mark, and the page/card simply omit it, same as any other project
 * without a logo file.
 */

export type VideoProject = {
  /** URL slug — the page lives at /videos/<slug> */
  slug: string;
  client: string;
  /** Page title */
  title: string;
  /** One-line subtitle under the title */
  subtitle: string;
  /** Short supporting paragraph */
  description: string;
  /** Client mark, shown on the page and the hub card when present */
  logo?: string;
  vimeoId: string;
  vimeoHash: string;
  /** Production stills / behind-the-scenes frames shown below the video, as
      an authored sequence of rows, each row's own image count sets that
      row's column count (1, 2, or 3). Optional: most video projects rely on
      the embed alone. */
  gallery?: { src: string; alt: string; caption?: string }[][];
  /** How this project shows up as a card on the /work hub. */
  card: {
    market: string;
    summary: string;
    /** Video thumbnail, used as the card's background artwork */
    image: string;
    accent: "blue" | "orange";
  };
};

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    slug: "zenith-arabia-digital-replica",
    client: "Zenith Arabia - Virtual Replica",
    title: "Zenith Arabia, Digital Replica",
    subtitle: "A cinematic virtual replica built to demo AI-driven solutions.",
    description:
      "Zenith Arabia combines advanced technology and AI to create smart, future-ready solutions for ambitious businesses. This piece renders that offer as a virtual product replica, translating a technical platform into a visual story a buying committee can follow at a glance.",
    logo: "/logos/clients/Zenith-Arabia-AI.webp",
    vimeoId: "1178816458",
    vimeoHash: "985e08d5f9",
    card: {
      market: "Saudi Arabia",
      summary: "A virtual product replica translating Zenith Arabia's AI platform into visual storytelling.",
      image: "/work/video/zenith-arabia-digital-replica.webp",
      accent: "blue",
    },
  },
  {
    slug: "zenith-arabia-ai-banking",
    client: "Zenith Arabia - AI Banking",
    title: "Zenith Arabia, AI Banking",
    subtitle: "A corporate explainer for AI-powered banking solutions.",
    description:
      "A corporate explainer video for Zenith Arabia, showcasing innovative IT solutions that streamline banking operations and support digital transformation, produced to translate complex systems into clear, engaging visual storytelling for KSA's financial sector.",
    logo: "/logos/clients/Zenith-Arabia-AI.webp",
    vimeoId: "1178836554",
    vimeoHash: "3a30d08476",
    card: {
      market: "Saudi Arabia",
      summary: "A corporate explainer translating AI banking infrastructure into clear visual storytelling.",
      image: "/work/video/zenith-arabia-ai-banking.webp",
      accent: "orange",
    },
  },
  {
    slug: "bespin-global-relaunch",
    client: "Bespin Global",
    title: "Bespin Global, Relaunch Campaign",
    subtitle: "A brand positioning film for a cloud and IT solutions leader.",
    description:
      "Bespin delivers refined IT solutions that simplify complexity and drive business growth. This relaunch campaign film positions that offer for a new phase of the brand, built to carry Bespin's identity across every market it operates in.",
    logo: "/logos/clients/bespin.webp",
    vimeoId: "1178809370",
    vimeoHash: "fdf6199a18",
    card: {
      market: "MENA",
      summary: "A brand positioning film for Bespin Global's relaunch, built around IT solutions that simplify complexity.",
      image: "/work/video/bespin-global-relaunch.webp",
      accent: "blue",
    },
  },
  {
    slug: "gulf-cryo",
    client: "Gulf Cryo",
    title: "Gulf Cryo",
    subtitle: "An industrial brand film on food-safe gas technology.",
    description:
      "A brand film for Gulf Cryo, one of the region's leading industrial gas providers, framing its technology around the outcomes it protects, reducing waste and ensuring food safety across the supply chain.",
    logo: "/logos/clients/gulf-cryo.webp",
    vimeoId: "1178900937",
    vimeoHash: "bd6d03b32a",
    card: {
      market: "Saudi Arabia",
      summary: "An industrial brand film framing Gulf Cryo's gas technology around waste reduction and food safety.",
      image: "/work/video/gulf-cryo.webp",
      accent: "orange",
    },
  },
  {
    slug: "gts-brand-relaunch",
    client: "GTS Holding",
    title: "GTS, Brand Relaunch",
    subtitle: "A brand-relaunch film for an enterprise IT and cybersecurity leader.",
    description:
      "A brand relaunch film for GTS Holding, introducing a refreshed identity for the enterprise IT and cybersecurity partner to the CIOs and CISOs who make up its regional buying audience.",
    logo: "/logos/clients/gts.webp",
    vimeoId: "1178892924",
    vimeoHash: "8d5a53eec0",
    card: {
      market: "Egypt · Saudi Arabia · UAE",
      summary: "A brand relaunch film introducing GTS Holding's refreshed identity to its enterprise buying audience.",
      image: "/work/video/gts-brand-relaunch.webp",
      accent: "blue",
    },
  },
  {
    slug: "fawry-pay",
    client: "Fawry Pay",
    title: "Fawry Pay, Campaign Film",
    subtitle: "A campaign film for Egypt's leading digital payment brand.",
    description:
      "A comedic, retro-styled campaign film for Fawry Pay, following a group of women mid-appointment at a vintage salon, under dryers, in curlers, mid-facial, as one leaves ready to shop, bags in hand, without ever queuing to pay. ARQQA led the project end to end: concept, direction, and production, from storyboard through the final cut, promoting #Fawry_Pay as the easiest way to shop online.",
    logo: "/logos/clients/fawry-pay.webp",
    vimeoId: "295768203",
    vimeoHash: "204d183f97",
    gallery: [
      [
        {
          src: "/work/video/fawry-pay-gallery/shot-06.webp",
          alt: "Storyboard sketch of a woman walking out with shopping bags",
          caption: "Storyboard to final frame",
        },
        {
          src: "/work/video/fawry-pay-gallery/shot-08.webp",
          alt: "Final frame of a woman walking out of the salon with shopping bags, smiling",
          caption: "Storyboard to final frame",
        },
      ],
      [
        {
          src: "/work/video/fawry-pay-gallery/shot-01.webp",
          alt: "Woman celebrating with shopping bags raised, the full salon cast behind her",
          caption: "The final beat, out the door before the appointment's even over",
        },
      ],
      [
        {
          src: "/work/video/fawry-pay-gallery/shot-03.webp",
          alt: "Woman with a face mask and cucumber slices giving a thumbs up",
          caption: "Character work, every extra given a real beat",
        },
        {
          src: "/work/video/fawry-pay-gallery/shot-04.webp",
          alt: "Woman in a red shirt with retro sunglasses and cat-eye glasses",
          caption: "Character work, every extra given a real beat",
        },
        {
          src: "/work/video/fawry-pay-gallery/shot-05.webp",
          alt: "Woman under a vintage salon hair dryer wearing a hairnet with curlers",
          caption: "Production design, the salon set, dressed for period",
        },
      ],
    ],
    card: {
      market: "Egypt",
      summary: "A full-production campaign film promoting Fawry Pay as the easiest way to shop online.",
      image: "/work/video/fawry-pay.webp",
      accent: "orange",
    },
  },
  {
    slug: "fawry-plus",
    client: "FawryPlus",
    title: "FawryPlus",
    subtitle: "A brand film for Fawry's retail and services network.",
    description:
      "A brand film for FawryPlus, Fawry's retail and services network, produced to introduce its expanded offering to a wide consumer audience across Egypt.",
    logo: "/logos/clients/fawry-plus.webp",
    vimeoId: "339728841",
    vimeoHash: "e72f3ed4d5",
    card: {
      market: "Egypt",
      summary: "A brand film introducing FawryPlus's retail and services network to a wide consumer audience.",
      image: "/work/video/fawry-plus.webp",
      accent: "blue",
    },
  },
  {
    slug: "dawi-family",
    client: "Dawi Clinics",
    title: "Dawi Clinics, Family Doctor",
    subtitle: "A brand film for Dawi's family doctor healthcare service.",
    description:
      "A brand film for Dawi Clinics introducing its Family Doctor service, built to make accessible, ongoing healthcare feel personal and trustworthy for the families who rely on it.",
    logo: "/logos/clients/dawi.webp",
    vimeoId: "339755983",
    vimeoHash: "a60524dccd",
    card: {
      market: "Egypt",
      summary: "A brand film introducing Dawi Clinics' Family Doctor service to the families who rely on it.",
      image: "/work/video/dawi-family.webp",
      accent: "orange",
    },
  },
];

export function getVideoProject(slug: string) {
  return VIDEO_PROJECTS.find((v) => v.slug === slug);
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ApproachPage } from "./approach-pages-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ══════════════════════════════════════════════════════════════════════
   Shared primitives
   ══════════════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  accentTail,
  body,
}: {
  eyebrow: string;
  title: string;
  accentTail?: string;
  body?: string;
}) {
  return (
    <Reveal className="text-center mx-auto max-w-3xl mb-14">
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <h2
        className="font-bold"
        style={{
          fontSize: "clamp(1.625rem, 3.3vw, 2.5rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        {title}{" "}
        {accentTail && (
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
            }}
          >
            {accentTail}
          </span>
        )}
      </h2>
      {body && (
        <p
          className="font-light mt-5"
          style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

/* ── Masked line-by-line reveal ──────────────────────────────────────────
   Each line sits in its own overflow-hidden band and slides up into view,
   so the type is wiped in from behind the mask rather than typed out. Lines
   are staggered; reduced-motion users get them in place immediately.
   ---------------------------------------------------------------------- */
function MaskedHeading({ lines }: { lines: string[] }) {
  // Both flags land in one deferred update, so nothing is set synchronously
  // inside the effect.
  const [state, setState] = useState({ shown: false, reduced: false });
  const { shown, reduced } = state;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Next frame, so the transition runs from the hidden starting state.
    const id = requestAnimationFrame(() =>
      setState({ shown: true, reduced: prefersReduced })
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1
      className="font-bold mt-6"
      style={{
        fontSize: "clamp(2.25rem, 5vw, 4rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: "#ffffff",
        textShadow: "0 2px 40px rgba(0,0,0,0.7)",
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            // A little room so descenders are not clipped by the mask.
            paddingBottom: "0.08em",
            marginBottom: "-0.08em",
          }}
        >
          <span
            style={{
              display: "block",
              transform: shown || reduced ? "translateY(0)" : "translateY(110%)",
              opacity: shown || reduced ? 1 : 0,
              transition: reduced
                ? "none"
                : `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, opacity 0.7s ease ${i * 0.12}s`,
              willChange: "transform",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* Primary gradient-rimmed pill CTA — the site's standard */
function PrimaryCTA({ href, label, small }: { href: string; label: string; small?: boolean }) {
  return (
    <Link
      href={href}
      className="relative inline-flex rounded-2xl"
      style={{
        padding: "1px",
        background:
          "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
        boxShadow: "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
      }}
    >
      <span
        className="relative inline-flex items-center justify-center rounded-2xl font-medium"
        style={{
          padding: small ? "0.75rem 1.5rem" : "0.9375rem 2.25rem",
          background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
          color: "#ffffff",
          fontSize: small ? "0.8125rem" : "0.9375rem",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </Link>
  );
}

function SecondaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl font-medium"
      style={{
        padding: "1rem 2.25rem",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.22)",
        color: "#ffffff",
        fontSize: "0.9375rem",
      }}
    >
      {label} →
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Content data — extracted from the client-supplied landing page spec
   ══════════════════════════════════════════════════════════════════════ */

type Fact =
  | { kind: "number"; value: number; suffix?: string; label: string }
  | { kind: "logo"; image: string; alt: string; label: string };

const FACT_CARDS: Fact[] = [
  { kind: "number", value: 13, label: "Years in Operation" },
  { kind: "number", value: 50, suffix: "+", label: "Specialists" },
  { kind: "number", value: 4, label: "MENA Markets" },
];

const PAIN_POINTS = [
  {
    pain: "“My website looks outdated and doesn’t reflect my brand.”",
    solution: "We build brand-first websites that position you as the market leader you are.",
  },
  {
    pain: "“I’m losing leads because my site doesn’t convert.”",
    solution: "Every page we design is built for conversion — from the first headline to the final CTA.",
  },
  {
    pain: "“I’ve been burned by agencies that over-promise and under-deliver.”",
    solution: "13 years in operation. Automated onboarding. Transparent timelines. We show our process before you sign.",
  },
];

type Tier = {
  key: string;
  num: string;
  name: string;
  forWhom: string;
  body: string;
  items: string[];
  extra?: string;
  bestFor: string;
  cta: string;
  /** Optional platform mark shown under the tier copy. */
  logo?: { src: string; alt: string; height: string };
  /** Full-width showcase beneath the copy. */
  media: { src: string; type: "image" | "video" };
};

const TIERS: Tier[] = [
  {
    key: "corporate",
    media: { src: "/services/tier-corporate.webp", type: "image" as const },
    num: "01",
    name: "Corporate Website",
    forWhom: "Established businesses, enterprises, and professional service firms.",
    body: "A premium corporate presence built for trust, authority, and lead generation. Clean architecture. Fast load times. SEO-ready from day one. Designed for businesses that need their website to work as hard as their sales team.",
    items: [
      "Custom UI/UX design (Figma → development)",
      "Responsive design — mobile, tablet, desktop",
      "Up to 15 pages (Home, About, Services, Contact, etc.)",
      "CMS integration (WordPress or headless)",
      "On-page SEO setup (meta tags, schema, sitemap)",
      "Contact form with CRM integration",
      "Speed optimization (Core Web Vitals compliant)",
      "SSL, security hardening, analytics setup",
      "30-day post-launch support",
    ],
    bestFor: "Companies in Egypt, KSA, and UAE looking for a professional online presence that builds trust and generates qualified leads.",
    cta: "Get a Corporate Website Quote",
  },
  {
    key: "ecommerce",
    media: { src: "/services/tier-ecommerce.webp", type: "image" as const },
    num: "02",
    name: "E-Commerce Website",
    forWhom: "Retailers, D2C brands, and online stores scaling across MENA.",
    body: "A conversion-engineered e-commerce platform built to sell. Product catalog architecture, payment gateway integration, and checkout optimization designed for the MENA buyer journey.",
    items: [
      "Custom e-commerce UI/UX design",
      "Product catalog architecture (categories, filters, search)",
      "Payment gateway integration (Fawry, STC Pay, Tamara, Tabby, Stripe)",
      "Shipping and logistics integration",
      "Multi-currency and multi-language (AR/EN)",
      "Checkout funnel optimization",
      "Inventory management system",
      "Email automation for abandoned carts",
      "Analytics and conversion tracking",
      "60-day post-launch support",
    ],
    bestFor: "Retail and D2C brands in MENA ready to sell online with a platform built for high AOV and repeat purchase.",
    cta: "Get an E-Commerce Website Quote",
  },
  {
    key: "shopify",
    media: { src: "/services/tier-shopify.webp", type: "image" as const },
    num: "03",
    name: "Shopify Website",
    logo: { src: "/shopify.webp", alt: "Shopify", height: "1.75rem" },
    forWhom: "SMEs, startups, and fast-launch brands that need speed-to-market.",
    body: "A swift-launch Shopify store designed, configured, and optimized in weeks, not months. Perfect for businesses that need to start selling immediately with a scalable, low-maintenance platform.",
    items: [
      "Shopify store setup and configuration",
      "Premium theme customization or custom theme development",
      "Product upload and catalog setup (up to 100 SKUs)",
      "Payment gateway configuration (Shopify Payments, regional gateways)",
      "Shipping zones and rate configuration (MENA-specific)",
      "App integrations (reviews, upsells, analytics)",
      "Mobile-optimized storefront",
      "Basic SEO setup",
      "Training session for your team",
      "30-day post-launch support",
    ],
    extra: "Also available: Salla store setup for Saudi-market-first brands. Same quality. Same speed. Platform-native.",
    bestFor: "Startups and SMEs in KSA, Egypt, and UAE who want a beautiful, functional store live in 2–4 weeks.",
    cta: "Get a Shopify Store Quote",
  },
  {
    key: "interactive",
    media: { src: "/services/tier-interactive.mp4", type: "video" as const },
    num: "04",
    name: "Advanced Interactive / Animation Website",
    forWhom: "Brands, agencies, and innovators who want an Awwwards-level digital experience.",
    body: "This is not a website. It's a digital experience. Custom WebGL, GSAP, Three.js, Lottie, and scroll-driven storytelling. For brands that want their website to be a competitive weapon — the kind that makes your industry stop and take notice.",
    items: [
      "Bespoke creative direction and art direction",
      "Custom interaction design and motion choreography",
      "Advanced animation (GSAP, Three.js, WebGL, Lottie)",
      "Scroll-driven narrative experiences",
      "Custom cursor, transitions, and micro-interactions",
      "Headless CMS architecture (for performance + flexibility)",
      "Performance-optimized: 60fps target on mobile",
      "Accessibility compliance (WCAG 2.1 AA)",
      "Multi-language support (AR/EN with RTL)",
      "Awwwards / FWA submission-ready",
      "90-day post-launch support + iteration sprints",
    ],
    bestFor: "Brands and leaders who understand that their website is their most visible asset — and want it to be unforgettable.",
    cta: "Get an Interactive Website Quote",
  },
];

type StepIcon = "compass" | "blueprint" | "palette" | "code" | "check" | "growth";

const PROCESS_STEPS: { icon: StepIcon; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "Discovery & Strategy",
    body: "We start with a 30-minute consultation to understand your business, audience, goals, and competitive landscape. No templates. No assumptions. A custom strategy brief before a single pixel moves.",
  },
  {
    icon: "blueprint",
    title: "Information Architecture & Wireframes",
    body: "Sitemap, user flows, and wireframes designed for conversion. Every page has a purpose. Every section has a job. You approve the structure before design begins.",
  },
  {
    icon: "palette",
    title: "UI/UX Design",
    body: "High-fidelity Figma designs. Desktop, tablet, and mobile. You see every screen, every interaction, every hover state before development starts. Two revision rounds included.",
  },
  {
    icon: "code",
    title: "Development & Integration",
    body: "Clean, semantic code. CMS integration. Payment gateways. CRM connections. Speed optimization. Security hardening. Built to perform, not just to look good.",
  },
  {
    icon: "check",
    title: "QA, Testing & Launch",
    body: "Cross-browser testing. Mobile QA. Speed audit. Accessibility check. Content review. Analytics setup. We don't launch until everything passes.",
  },
  {
    icon: "growth",
    title: "Post-Launch Support & Growth",
    body: "Your website doesn't end at launch. Ongoing support, performance monitoring, and conversion optimization to make sure it keeps working.",
  },
];

/* Website projects shown in OUR WORK. `image` and `href` are optional — cards
   render with a branded gradient placeholder until real screenshots land, and
   stay non-clickable until a project page exists to point at. Each `href`
   below targets a /our-work/<slug> showcase page. */
type WebsiteProject = {
  key: string;
  client: string;
  tier: "Corporate" | "E-Commerce" | "Shopify" | "Interactive";
  image?: string;
  href?: string;
};

const WEBSITE_PROJECTS: WebsiteProject[] = [
  { key: "sbs", client: "SBS", tier: "Corporate", image: "/services/work-sbs.webp", href: "/our-work/sbs" },
  { key: "ebc", client: "EBC", tier: "Corporate", image: "/services/work-ebc.webp", href: "/our-work/ebc" },
  { key: "merova", client: "Merova", tier: "Shopify", image: "/services/work-merova.webp", href: "/our-work/merova" },
  { key: "act", client: "ACT", tier: "Interactive", image: "/services/work-act.webp", href: "/our-work/act" },
];

type WhyIcon = "shield" | "target" | "globe" | "team" | "clarity";

const WHY_ARQQA: { icon: WhyIcon; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "13 Years. Not 13 Months.",
    body: "We've survived revolutions, pandemics, and market crashes. We're not going anywhere. Your website partner should outlast your website.",
  },
  {
    icon: "target",
    title: "Conversion-First Design",
    body: "Every website we build is designed to convert visitors into leads, customers, or subscribers. Beautiful is the baseline. Performance is the goal.",
  },
  {
    icon: "globe",
    title: "Regional Expertise",
    body: "We understand the MENA buyer. RTL Arabic support. Regional payment gateways. Local hosting considerations. Cultural design sensitivity.",
  },
  {
    icon: "team",
    title: "One Team. No Outsourcing.",
    body: "50+ in-house specialists. Your project is never outsourced to freelancers. The team that designs it builds it.",
  },
  {
    icon: "clarity",
    title: "Transparent Process",
    body: "ClickUp project management. You see every task, every deadline, every status. No surprises. No hidden costs.",
  },
];

/* `scale` nudges an individual mark when its artwork carries more padding
   than the rest, so every logo reads at a similar optical size. */
const TRUSTED_BY: { name: string; logo?: string; scale?: number }[] = [
  { name: "ACT", logo: "/logos/clients/act.webp" },
  { name: "EBC", logo: "/logos/clients/ebc.webp" },
  { name: "GTS", logo: "/logos/clients/gts.webp", scale: 1.3 },
  { name: "Merova", logo: "/logos/clients/merova.webp" },
  { name: "MomentumX", logo: "/logos/clients/momentumx.webp", scale: 1.25 },
  { name: "SBS", logo: "/logos/clients/sbs.webp" },
  { name: "Arma", logo: "/logos/clients/arma.webp", scale: 1.25 },
];

const TESTIMONIALS = [
  {
    quote: "ARQQA didn't just redesign our site — they rebuilt how prospects experience our brand from the first click.",
    role: "Corporate website client, Egypt",
  },
  {
    quote: "Checkout friction was killing our conversion rate. The rebuild fixed that, and the results showed up within weeks.",
    role: "E-commerce client, Saudi Arabia",
  },
  {
    quote: "This is the first time a website made our competitors ask who built it.",
    role: "Interactive website client, UAE",
  },
];

const REGIONS: {
  market: string;
  body: string;
  offices: { label?: string; lines: string[] }[];
}[] = [
  {
    market: "Egypt — Cairo HQ",
    body: "Our home base. 13 years of building websites for Egyptian businesses — from startups to enterprises. Local payment integrations (Fawry, Paymob, ValU).",
    offices: [
      { lines: ["12 Amin Anis, Ard El Golf", "Heliopolis, Cairo, Egypt"] },
    ],
  },
  {
    market: "Saudi Arabia — Riyadh",
    body: "Vision 2030-aligned digital presence. Arabic-first design. Salla and Shopify expertise. STC Pay, Tamara, Tabby integrations.",
    offices: [
      { lines: ["AL FARAZDAQ, Golden Offices Building", "AL Malaz — Riyadh 12627"] },
    ],
  },
  {
    market: "UAE — Abu Dhabi / Dubai",
    body: "Premium corporate and interactive websites for GCC enterprises. Multi-language (AR/EN). Regional hosting for speed.",
    offices: [
      { label: "Abu Dhabi", lines: ["3 Al Razqi Street — AlDannah", "Floor 8 — Office 801"] },
      { label: "Dubai", lines: ["West Burry Tower 1, Business Bay", "Floor 21st — Office 2106"] },
    ],
  },
];

const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "It depends on the tier: Corporate websites take 6–8 weeks, E-commerce 8–12 weeks, Shopify 2–4 weeks, and Interactive experiences 10–16 weeks. We'll confirm the exact timeline during your free consultation.",
  },
  {
    q: "Do you design for mobile?",
    a: "Every website we build is mobile-first. 70%+ of MENA web traffic is mobile — we design and test for mobile before desktop.",
  },
  {
    q: "Can you build an Arabic (RTL) website?",
    a: "Yes. Full RTL Arabic support is included in every tier. We handle the design mirroring, font selection, and cultural adaptation.",
  },
  {
    q: "Do you offer payment gateway integration?",
    a: "Yes. We integrate regional gateways including Fawry, STC Pay, Tamara, Tabby, Paymob, Stripe, and Shopify Payments depending on your market.",
  },
  {
    q: "What happens after launch?",
    a: "Every tier includes post-launch support (30–90 days depending on tier). We also offer ongoing retainer plans for continuous optimization and growth.",
  },
  {
    q: "Can you help with SEO after the website is built?",
    a: "Yes. Our SEO team can provide ongoing optimization as part of the Catalyst System™ or as a standalone engagement.",
  },
  {
    q: "What CMS do you use?",
    a: "WordPress, headless CMS (Contentful, Sanity), Shopify, and Salla depending on your needs. We'll recommend the best fit during discovery.",
  },
  {
    q: "How much does a website cost?",
    a: "Pricing depends on the tier and scope. Book a free consultation and we'll provide a detailed quote within 48 hours.",
  },
];

const RELATED_INSIGHTS = [
  {
    title: "AI Programming Solutions for Companies",
    slug: "arqqa-ai-programming-solutions-for-companies",
    image: "/insights/arqqa-ai-programming-solutions-for-companies.webp",
  },
  {
    title: "How AI Is Transforming Digital Marketing",
    slug: "how-ai-is-transforming-digital-marketing",
    image: "/insights/how-ai-is-transforming-digital-marketing.webp",
  },
  {
    title: "What Is llms.txt? The New Standard for AI-Friendly Websites",
    slug: "what-is-llms-txt-the-new-standard-for-ai-friendly-websites",
    image: "/insights/what-is-llms-txt-the-new-standard-for-ai-friendly-websites.webp",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════════════════════════════════ */

/* Rim-lit glass glyph — same treatment as the homepage stat icons */
function WhyGlyph({ icon, gradientId }: { icon: WhyIcon; gradientId: string }) {
  const stroke = `url(#${gradientId})`;
  const inner = "rgba(210,232,255,0.85)";

  return (
    <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#5aa2ff" />
          <stop offset="45%" stopColor="#9fc8ff" />
          <stop offset="65%" stopColor="#ffb27a" />
          <stop offset="100%" stopColor="#ff7a3d" />
        </linearGradient>
      </defs>

      {icon === "shield" && (
        <>
          <path d="M17 4.5 L28 9v8.5c0 6.4-4.6 10.6-11 12-6.4-1.4-11-5.6-11-12V9z" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M12.4 17.2l3.2 3.2 6-6.4" stroke={inner} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {icon === "target" && (
        <>
          <circle cx="17" cy="17" r="12" stroke={stroke} strokeWidth="2.2" />
          <circle cx="17" cy="17" r="6.5" stroke={stroke} strokeWidth="1.8" />
          <circle cx="17" cy="17" r="1.9" fill={inner} />
        </>
      )}

      {icon === "globe" && (
        <>
          <circle cx="17" cy="17" r="12" stroke={stroke} strokeWidth="2.2" />
          <path d="M5 17h24" stroke={stroke} strokeWidth="1.7" />
          <path d="M17 5c3.4 3.6 5.1 7.6 5.1 12s-1.7 8.4-5.1 12c-3.4-3.6-5.1-7.6-5.1-12S13.6 8.6 17 5z" stroke={inner} strokeWidth="1.6" />
        </>
      )}

      {icon === "team" && (
        <>
          <circle cx="12.4" cy="12.6" r="4.4" stroke={stroke} strokeWidth="2.1" />
          <circle cx="23" cy="14.4" r="3.4" stroke={inner} strokeWidth="1.7" />
          <path d="M4.6 27c.7-4.6 3.9-7.2 7.8-7.2s7.1 2.6 7.8 7.2" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M22.4 20.4c3.1.3 5.5 2.6 6.1 6.6" stroke={inner} strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}

      {icon === "clarity" && (
        <>
          <rect x="5" y="5.5" width="24" height="23" rx="5" stroke={stroke} strokeWidth="2.2" />
          <path d="M10.6 13.2h12.8M10.6 18h9.2M10.6 22.8h6.4" stroke={inner} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/* Why-ARQQA card — lifts, warms its border and brightens the glyph on hover */
function WhyCard({
  item,
  accentGlow,
}: {
  item: (typeof WHY_ARQQA)[number];
  accentGlow: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-full rounded-3xl p-7"
      style={{
        ...glass,
        border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <span
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: "3rem",
          height: "3rem",
          background: hovered
            ? "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: hovered ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.14)",
          boxShadow: `0 0 ${hovered ? "34px" : "24px"} ${accentGlow}${hovered ? "0.4" : "0.22"})`,
          transform: hovered ? "translateY(-2px) scale(1.06)" : "translateY(0) scale(1)",
          filter: "drop-shadow(-2px 0 6px rgba(90,162,255,0.35)) drop-shadow(2px 0 6px rgba(255,122,61,0.3))",
          transition:
            "transform 0.5s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <WhyGlyph icon={item.icon} gradientId={`whyGlyph-${item.icon}`} />
      </span>
      <h3 className="font-bold mt-5" style={{ fontSize: "1.0625rem", color: "#ffffff" }}>
        {item.title}
      </h3>
      <p
        className="font-light mt-3"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: hovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.55)",
          transition: "color 0.4s ease",
        }}
      >
        {item.body}
      </p>
    </div>
  );
}

/* Fact — counts up once it scrolls into view (same easing as the homepage stats) */
function FactItem({ fact, index }: { fact: Fact; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reduced motion skips the count-up entirely; the final value is rendered
    // straight from `fact.value` below rather than pushed through state.
    if (!visible || fact.kind !== "number" || reduced) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * (fact as { value: number }).value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, fact, reduced]);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${index * 0.09}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.09}s`,
      }}
    >
      {fact.kind === "number" ? (
        <p
          className="font-bold"
          style={{
            fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textShadow: "0 0 34px rgba(90,162,255,0.32)",
          }}
        >
          {reduced ? fact.value : count}
          {fact.suffix ?? ""}
        </p>
      ) : (
        <span className="flex items-center justify-center" style={{ height: "clamp(2.5rem, 4.5vw, 3.5rem)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fact.image}
            alt={fact.alt}
            style={{ height: "100%", width: "auto", objectFit: "contain" }}
            loading="lazy"
          />
        </span>
      )}
      <p className="font-light mt-3" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}>
        {fact.label}
      </p>
    </div>
  );
}

function PainCard({ item, index }: { item: (typeof PAIN_POINTS)[number]; index: number }) {
  // `open` is hover on pointer devices and tap on touch, where hover does not exist.
  const [open, setOpen] = useState(false);

  const ease = "cubic-bezier(0.22,1,0.36,1)";

  return (
    <Reveal delay={Math.min(index * 0.1, 0.3)} className="h-full">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer flex flex-col"
        style={{
          minHeight: "15rem",
          ...glass,
          borderColor: open ? "rgba(255,138,90,0.45)" : "rgba(255,255,255,0.11)",
          transition: `border-color 0.5s ease, transform 0.6s ${ease}`,
          transform: open ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Artwork — hidden until hover, then it becomes the card's ground */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/services/card-gradient-001.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: open ? 1 : 0,
            transform: open ? "scale(1)" : "scale(1.06)",
            transition: `opacity 0.6s ease, transform 0.9s ${ease}`,
          }}
        />
        {/* Scrim, so the copy holds up over the artwork */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(3,3,5,0.86) 0%, rgba(3,3,5,0.5) 45%, rgba(3,3,5,0.3) 100%)",
            opacity: open ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Copy sits at the top at rest and settles to the bottom on hover */}
        <div
          className="relative flex-1 flex p-7"
          style={{
            alignItems: open ? "flex-end" : "flex-start",
            transition: `align-items 0.6s ${ease}`,
          }}
        >
          {/* The pain, shown at rest */}
          <p
            className="font-medium italic"
            style={{
              position: open ? "absolute" : "relative",
              top: open ? "1.75rem" : undefined,
              left: open ? "1.75rem" : undefined,
              right: open ? "1.75rem" : undefined,
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              opacity: open ? 0 : 1,
              transform: open ? "translateY(-8px)" : "translateY(0)",
              transition: `opacity 0.35s ease, transform 0.5s ${ease}`,
            }}
          >
            {item.pain}
          </p>

          {/* The answer, revealed at the bottom */}
          <p
            className="font-medium"
            style={{
              position: open ? "relative" : "absolute",
              bottom: open ? undefined : "1.75rem",
              left: open ? undefined : "1.75rem",
              right: open ? undefined : "1.75rem",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "#ffffff",
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.45s ease 0.1s, transform 0.6s ${ease} 0.1s`,
            }}
          >
            {item.solution}
          </p>
        </div>

        {/* Affordance — tells the visitor the card has a second state */}
        <span
          className="relative font-semibold px-7 pb-6 inline-flex items-center gap-2"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            opacity: open ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          Hover for the solution
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Reveal>
  );
}

function TierPanel({ tier, accentGlow }: { tier: Tier; accentGlow: string }) {
  // Collapsed by default so the tier copy leads; the arrow opens the detail.
  const [openList, setOpenList] = useState(false);

  return (
    <div
      key={tier.key}
      className="relative website-dev-included-card"
      style={{ minHeight: "clamp(32rem, 44vw, 42rem)" }}
    >
      <style>{`
        @keyframes websiteDevCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .website-dev-included-card {
          animation: websiteDevCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        /* Media and scrim span the viewport rather than the content column,
           so the artwork reads as the page's own background. The vertical
           mask dissolves it into the sections above and below. */
        .website-dev-tier-bleed {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 100vw;
          transform: translateX(-50%);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 86%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 86%, transparent 100%);
        }

        /* Readability scrim: heavy under the copy, clearing before the
           artwork's focal side so the showcase is never washed out. */
        .website-dev-tier-scrim {
          background: linear-gradient(
            180deg,
            rgba(3,3,8,0.9) 0%,
            rgba(3,3,8,0.82) 55%,
            rgba(3,3,8,0.92) 100%
          );
        }
        @media (min-width: 1024px) {
          .website-dev-tier-scrim {
            background: linear-gradient(
              90deg,
              rgba(3,3,8,0.95) 0%,
              rgba(3,3,8,0.9) 32%,
              rgba(3,3,8,0.62) 46%,
              rgba(3,3,8,0.2) 60%,
              rgba(3,3,8,0) 74%
            );
          }
        }
        /* What's Included tab. Hover is CSS rather than React state so the
           whole card responds without a re-render; the open state rides on
           data-open so both can style the same properties without an inline
           style overriding the rule. --inc-glow carries the tier accent. */
        .website-dev-inc {
          background: linear-gradient(170deg, rgba(14,16,26,0.72) 0%, rgba(6,8,14,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.12);
          transition: background 0.35s ease, border-color 0.35s ease,
                      transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .website-dev-inc:hover {
          background: linear-gradient(170deg, rgba(22,26,42,0.85) 0%, rgba(10,13,22,0.88) 100%);
          border-color: rgba(255,255,255,0.28);
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -22px rgba(0,0,0,0.9),
                      0 0 26px -12px var(--inc-glow, rgba(90,162,255,0.45));
        }
        .website-dev-inc-cta {
          color: rgba(255,255,255,0.65);
          transition: color 0.3s ease;
        }
        .website-dev-inc:hover .website-dev-inc-cta,
        .website-dev-inc[data-open="true"] .website-dev-inc-cta { color: #ffffff; }

        .website-dev-inc-arrow {
          display: inline-block;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .website-dev-inc:hover .website-dev-inc-arrow { transform: translateY(2px); }
        .website-dev-inc[data-open="true"] .website-dev-inc-arrow { transform: rotate(180deg); }

        @media (prefers-reduced-motion: reduce) {
          .website-dev-included-card { animation: none; }
          .website-dev-inc,
          .website-dev-inc-arrow { transition: none; }
          .website-dev-inc:hover { transform: none; }
        }
      `}</style>

      {/* ── Background: the tier's showcase, filling the panel ── */}
      {tier.media.type === "video" ? (
        <div aria-hidden="true" className="website-dev-tier-bleed">
          <video
            key={tier.media.src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          >
            <source src={tier.media.src} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div aria-hidden="true" className="website-dev-tier-bleed">
          <Image
            src={tier.media.src}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      )}
      <div aria-hidden="true" className="website-dev-tier-bleed website-dev-tier-scrim" />

      {/* ── Copy, overlaid on the left ── */}
      <div className="relative h-full flex items-center py-10 lg:py-14">
        <div className="w-full lg:max-w-[30rem]">
          <span
            className="relative inline-flex items-center justify-center rounded-full font-bold"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "0.8125rem",
              background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
              boxShadow: `0 0 24px ${accentGlow}0.32)`,
            }}
          >
            {tier.num}
          </span>
          <h3
            className="font-bold mt-5"
            style={{
              fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)",
              lineHeight: 1.2,
              color: "#ffffff",
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
            }}
          >
            {tier.name}
          </h3>
          <p className="font-light mt-2" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
            {tier.forWhom}
          </p>
          <p
            className="font-light mt-4"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.68)" }}
          >
            {tier.body}
          </p>
          <p
            className="font-light italic mt-4"
            style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}
          >
            Best for: {tier.bestFor}
          </p>

          {/* Platform mark — height drives the size so the source keeps its
              own proportions whatever its aspect ratio. */}
          {tier.logo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={tier.logo.src}
              alt={tier.logo.alt}
              className="mt-5 block"
              style={{
                height: tier.logo.height,
                width: "auto",
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.55))",
              }}
            />
          )}

          {/* ── What's Included ──
              The whole tab is the control: the trigger is a full-bleed button
              carrying the box's own padding, so every pixel of the collapsed
              card is a hit target rather than just the label line. The list
              sits outside the button — a <ul> inside one is invalid markup. */}
          <div
            className="website-dev-inc mt-6 rounded-2xl max-w-[22rem] overflow-hidden"
            data-open={openList ? "true" : "false"}
            style={
              {
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                "--inc-glow": `${accentGlow}0.45)`,
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              onClick={() => setOpenList((v) => !v)}
              aria-expanded={openList}
              className="w-full text-left p-5 block"
              style={{ cursor: "pointer", background: "transparent", border: "none" }}
            >
              <span
                className="font-light block"
                style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}
              >
                What&apos;s Included
              </span>
              <span
                className="website-dev-inc-cta inline-flex items-center gap-2 font-semibold mt-2"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {openList ? "Hide the detail" : `See all ${tier.items.length} inclusions`}
                <span
                  aria-hidden="true"
                  className="website-dev-inc-arrow"
                  style={{ fontSize: "0.6875rem" }}
                >
                  &darr;
                </span>
              </span>
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateRows: openList ? "1fr" : "0fr",
                transition: "grid-template-rows 0.55s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <ul className="flex flex-col gap-2.5 px-5 pb-5">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="shrink-0"
                        style={{
                          marginTop: "0.45rem",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#5aa2ff",
                          boxShadow: `0 0 8px ${accentGlow}0.7)`,
                        }}
                      />
                      <span className="font-light" style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {tier.extra && (
                  <p
                    className="font-light italic px-5 pb-5"
                    style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}
                  >
                    {tier.extra}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PrimaryCTA href="/start#book-strategy-call" label={tier.cta} small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Per-tier placeholder wash, used until a real screenshot is supplied */
const TIER_WASH: Record<WebsiteProject["tier"], string> = {
  Corporate: "linear-gradient(150deg, #101a33 0%, #0a0f1e 55%, #06080f 100%)",
  "E-Commerce": "linear-gradient(150deg, #1a1430 0%, #100a1e 55%, #06080f 100%)",
  Shopify: "linear-gradient(150deg, #10261f 0%, #0a1613 55%, #06080f 100%)",
  Interactive: "linear-gradient(150deg, #2a1520 0%, #1a0c14 55%, #06080f 100%)",
};

function PortfolioCard({ project, index }: { project: WebsiteProject; index: number }) {
  const [hovered, setHovered] = useState(false);
  const clickable = Boolean(project.href);

  /* Shared chrome for both variants. A linked card renders as a real <Link>
     so the whole card is one hit target and navigation stays client-side;
     an unlinked one stays an inert <div>. The two are written out rather
     than built from a polymorphic tag so each keeps its own element typing. */
  const shellProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className:
      "relative flex flex-col justify-between h-full rounded-3xl overflow-hidden",
    style: {
      minHeight: "24rem",
      border: hovered
        ? "1px solid rgba(255,138,90,0.45)"
        : "1px solid rgba(255,255,255,0.12)",
      transform: hovered ? "translateY(-6px)" : "translateY(0)",
      transition:
        "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
      cursor: clickable ? "pointer" : "default",
    } as React.CSSProperties,
  };

  const content = (
    <>
      <div
        aria-hidden="true"
          className="absolute inset-0"
          style={{
            ...(project.image
              ? {
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: TIER_WASH[project.tier] }),
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,30,0.55) 0%, rgba(10,14,30,0.15) 35%, rgba(4,6,14,0.35) 65%, rgba(3,3,5,0.92) 100%)",
          }}
        />
        <p
          className="relative font-bold px-6 pt-6"
          style={{ fontSize: "1.25rem", color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
        >
          {project.client}
        </p>
        <div className="relative px-6 pb-6">
          <span
            className="inline-flex items-center rounded-full font-medium"
            style={{
              padding: "0.3125rem 0.75rem",
              fontSize: "0.625rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {project.tier}
          </span>
          {clickable && (
            <span
              className="flex items-center gap-2 font-medium mt-4"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: hovered ? "#ffffff" : "rgba(255,255,255,0.65)",
                transition: "color 0.35s ease",
              }}
            >
              Click to explore
              <span
                aria-hidden="true"
                style={{ color: "#ff9a5a", transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
              >
                →
              </span>
            </span>
          )}
        </div>
    </>
  );

  return (
    <Reveal delay={Math.min(index * 0.08, 0.32)} className="h-full">
      {clickable ? (
        <Link href={project.href as string} {...shellProps}>
          {content}
        </Link>
      ) : (
        <div {...shellProps}>{content}</div>
      )}
    </Reveal>
  );
}

/* Step glyph — one per process stage, same rim-lit line style as the rest */
function StepGlyph({ icon, active }: { icon: StepIcon; active: boolean }) {
  // Always orange — brighter and warmer when the step is the active one
  const stroke = active ? "#ff8a4c" : "rgba(255,122,61,0.65)";
  const accent = active ? "#ffb894" : "rgba(255,154,90,0.6)";

  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icon === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.7" />
          <path d="M15.6 8.4l-2.2 5.2-5.2 2.2 2.2-5.2z" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}
      {icon === "blueprint" && (
        <>
          <rect x="3.2" y="4.2" width="17.6" height="15.6" rx="2.4" stroke={stroke} strokeWidth="1.7" />
          <path d="M3.2 9.2h17.6M9.4 9.2v10.6" stroke={accent} strokeWidth="1.5" />
        </>
      )}
      {icon === "palette" && (
        <>
          <path
            d="M12 3.2c-4.9 0-8.8 3.7-8.8 8.4 0 4.6 3.5 7.6 7.4 7.6 1.5 0 2.3-.9 2.3-1.9 0-1.4-1.2-1.7-1.2-2.8 0-.8.7-1.4 1.7-1.4h1.8c3 0 5.6-1.9 5.6-5 0-2.9-3.6-4.9-8.8-4.9z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="8.2" cy="10.4" r="1.15" fill={accent} />
          <circle cx="12.4" cy="7.8" r="1.15" fill={accent} />
        </>
      )}
      {icon === "code" && (
        <>
          <path d="M8.4 8.2L4 12l4.4 3.8M15.6 8.2L20 12l-4.4 3.8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.4 5.4l-2.8 13.2" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {icon === "check" && (
        <>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.7" />
          <path d="M7.8 12.2l2.9 2.9 5.5-6" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {icon === "growth" && (
        <>
          <path d="M3.6 17.4l5-5.2 3.4 3.2 6.2-7" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.6 8.4h4.6V13" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/* Timeline step — number pinned to the centre rail, text alternating sides.
   Goes "active" (orange fill) once it scrolls into the middle of the viewport. */
function ProcessStep({ step, index }: { step: (typeof PROCESS_STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const rightSide = index % 2 === 0; // 01 right, 02 left, 03 right …

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Narrow band through the middle of the screen = "current" step
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = (
    <div className={rightSide ? "lg:pl-14" : "lg:pr-14 lg:text-right"}>
      {/* Bare orange glyph, stacked above the title — no container box */}
      <span
        className={`block mb-4 ${rightSide ? "" : "lg:flex lg:justify-end"}`}
        style={{
          filter: active ? "drop-shadow(0 0 14px rgba(255,122,61,0.55))" : "drop-shadow(0 0 8px rgba(255,122,61,0.2))",
          opacity: active ? 1 : 0.55,
          transform: active ? "translateY(0) scale(1.04)" : "translateY(0) scale(1)",
          transition: "opacity 0.45s ease, filter 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <StepGlyph icon={step.icon} active={active} />
      </span>
      <h3
        className="font-bold website-dev-step-text"
        style={{
          fontSize: "1.125rem",
          color: "#ffffff",
          animationDelay: "0.05s",
        }}
      >
        {step.title}
      </h3>
      <p
        className="font-light mt-3 website-dev-step-text"
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.6)",
          animationDelay: "0.16s",
        }}
      >
        {step.body}
      </p>
    </div>
  );

  const marker = (
    <span
      className="relative flex items-center justify-center rounded-full font-bold shrink-0"
      style={{
        width: "3.25rem",
        height: "3.25rem",
        fontSize: "0.9375rem",
        background: active
          ? "linear-gradient(160deg, #ff8a4c 0%, #ff5a2b 100%)"
          : "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: active ? "1px solid rgba(255,170,120,0.7)" : "1px solid rgba(255,255,255,0.18)",
        color: active ? "#ffffff" : "rgba(255,255,255,0.5)",
        boxShadow: active
          ? "0 0 34px rgba(255,122,61,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
          : "0 0 18px rgba(0,0,0,0.5)",
        transform: active ? "scale(1.06)" : "scale(1)",
        transition:
          "background 0.45s ease, border-color 0.45s ease, color 0.45s ease, box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );

  return (
    <div ref={ref} className="relative">
      {/* Desktop: 3-column grid with the marker locked to the centre rail.
          Mobile: marker left, text right (the rail sits left there too). */}
      <div className="hidden lg:grid items-center" style={{ gridTemplateColumns: "1fr auto 1fr", columnGap: "0" }}>
        <Reveal delay={Math.min(index * 0.05, 0.25)}>{rightSide ? <span /> : text}</Reveal>
        <div className="flex justify-center">{marker}</div>
        <Reveal delay={Math.min(index * 0.05, 0.25)}>{rightSide ? text : <span />}</Reveal>
      </div>

      <div className="lg:hidden flex gap-5">
        <div className="shrink-0">{marker}</div>
        <Reveal delay={Math.min(index * 0.05, 0.25)} className="flex-1">
          <div>
            <span
              className="block mb-3"
              style={{
                filter: active ? "drop-shadow(0 0 14px rgba(255,122,61,0.55))" : "drop-shadow(0 0 8px rgba(255,122,61,0.2))",
                opacity: active ? 1 : 0.55,
                transition: "opacity 0.45s ease, filter 0.45s ease",
              }}
            >
              <StepGlyph icon={step.icon} active={active} />
            </span>
            <h3 className="font-bold website-dev-step-text" style={{ fontSize: "1.0625rem", color: "#ffffff", animationDelay: "0.05s" }}>
              {step.title}
            </h3>
            <p
              className="font-light mt-3 website-dev-step-text"
              style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", animationDelay: "0.16s" }}
            >
              {step.body}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }: { item: (typeof FAQS)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={glass}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left"
        style={{ padding: "1.25rem 1.5rem" }}
      >
        <span className="font-medium" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
          {item.q}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0"
          style={{
            color: "#ff9a5a",
            fontSize: "1.1rem",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? "16rem" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p
          className="font-light"
          style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", padding: "0 1.5rem 1.25rem" }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8125rem 1rem",
  borderRadius: "0.75rem",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#ffffff",
  fontSize: "0.875rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  letterSpacing: "0.04em",
  color: "rgba(255,255,255,0.55)",
};

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: no backend is wired up yet — this is a UI-only confirmation.
    // Real submissions need HubSpot form/API wiring with the account's own credentials.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl p-10 text-center" style={glass}>
        <p className="font-bold" style={{ fontSize: "1.25rem", color: "#ffffff" }}>
          Thanks — we&apos;ve got it.
        </p>
        <p className="font-light mt-3" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
          A senior strategist will reach out within 24 hours with a tailored recommendation and timeline.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-8" style={glass}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input required type="text" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Company Name *</label>
          <input required type="text" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input required type="email" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input required type="tel" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Country *</label>
          <select required style={inputStyle} defaultValue="">
            <option value="" disabled>
              Select a country
            </option>
            <option>Egypt</option>
            <option>Saudi Arabia</option>
            <option>UAE</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>What type of website do you need? *</label>
          <select required style={inputStyle} defaultValue="">
            <option value="" disabled>
              Select a type
            </option>
            <option>Corporate</option>
            <option>E-Commerce</option>
            <option>Shopify</option>
            <option>Interactive</option>
            <option>Not Sure</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Estimated Budget Range</label>
          <select style={inputStyle} defaultValue="">
            <option value="">Select a range</option>
            <option>Under $5K</option>
            <option>$5K–$15K</option>
            <option>$15K–$50K</option>
            <option>$50K+</option>
            <option>Not Sure</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label style={labelStyle}>Tell us about your project</label>
          <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      </div>
      <div className="mt-7 flex justify-center">
        <button type="submit" className="relative inline-flex rounded-2xl" style={{ padding: "1px", background: "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)", boxShadow: "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)" }}>
          <span
            className="relative inline-flex items-center justify-center rounded-2xl font-medium"
            style={{ padding: "0.9375rem 2.25rem", background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)", color: "#ffffff", fontSize: "0.9375rem" }}
          >
            Get My Free Consultation
          </span>
        </button>
      </div>
      <p className="font-light mt-6 text-center" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        ✔ Response within 24 hours &nbsp;•&nbsp; ✔ No commitment &nbsp;•&nbsp; ✔ Free strategy call included
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════════════════════ */

export function WebsiteDevPageContent({ page }: { page: ApproachPage }) {
  const accentGlow = "rgba(60,125,255,";
  const [activeTier, setActiveTier] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ══ 1 · Hero ══ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
          <source src="/services/website-dev-hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.4) 32%, rgba(3,3,5,0.6) 62%, rgba(3,3,5,0.9) 84%, #030305 100%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.5) 45%, rgba(3,3,5,0.15) 75%, transparent 100%)" }}
        />

        <div
          className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
          style={{ minHeight: "100vh", padding: "11rem 1.5rem 6rem" }}
        >
          <Reveal>
            <Link
              href={`/services/${page.parentSlug}`}
              className="inline-flex items-center gap-2 font-light"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
            >
              <span aria-hidden="true">←</span> {page.parentTitle}
            </Link>
          </Reveal>

          <MaskedHeading lines={["Websites That Convert.", "Not Just Impress."]} />

          <Reveal delay={1.4} className="flex flex-col items-center">
            <p className="font-light mt-6 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}>
              ARQQA designs and builds high-performance websites for businesses across Egypt, Saudi Arabia, and the UAE. From corporate platforms to advanced interactive experiences — engineered for speed, conversion, and scale.
            </p>

            <div className="mt-8">
              <PrimaryCTA href="/start#book-strategy-call" label="🚀 Get Your Free Website Consultation" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Facts — bare stats, no cards; blends up into the hero ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem 5rem", marginTop: "-1px" }}>
        {/* Softens the seam where the hero's black ends — the section fades up
            into it instead of meeting it on a hard horizontal line. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "16rem",
            background: "linear-gradient(180deg, #030305 0%, rgba(3,3,5,0.6) 45%, transparent 100%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 text-center">
          {FACT_CARDS.map((fact, i) => (
            <FactItem key={fact.label} fact={fact} index={i} />
          ))}
        </div>
      </section>

      {/* ══ 2 · The Problem ══ */}
      <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="THE PROBLEM"
            title="Your Website Is Costing You Customers."
            accentTail="Every Single Day."
            body="You already know something is wrong. Visitors land and leave. Your site looks outdated. It doesn't work on mobile. Your competitors are outranking you. You've hired freelancers or cheap agencies before — the result was always the same: delays, excuses, and a website you're embarrassed to share."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item, i) => (
              <PainCard key={item.pain} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3 · Service Tiers ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "7rem 1.5rem" }}>
        {/* Legibility scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.6) 22%, rgba(3,3,5,0.62) 78%, transparent 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="WHAT WE BUILD" title="Choose the Website That Fits" accentTail="Your Business Stage." />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {TIERS.map((tier, i) => (
              <button
                key={tier.key}
                type="button"
                onClick={() => setActiveTier(i)}
                className="rounded-full font-medium"
                style={{
                  padding: "0.625rem 1.25rem",
                  fontSize: "0.8125rem",
                  color: activeTier === i ? "#ffffff" : "rgba(255,255,255,0.55)",
                  background: activeTier === i ? "linear-gradient(120deg, rgba(255,122,61,0.3) 0%, rgba(47,107,255,0.3) 100%)" : "rgba(255,255,255,0.03)",
                  border: activeTier === i ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.3s ease",
                }}
              >
                {tier.name}
              </button>
            ))}
          </div>

          <Reveal key={activeTier}>
            <TierPanel tier={TIERS[activeTier]} accentGlow={accentGlow} />
          </Reveal>
        </div>
      </section>

      {/* ══ 4 · Portfolio ══ */}
      <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="OUR WORK" title="Don't Take Our Word For It." accentTail="See What We've Built." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WEBSITE_PROJECTS.map((project, i) => (
              <PortfolioCard key={project.key} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5 · Process ══ */}
      <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <style>{`
            @keyframes websiteDevStepTextIn {
              from { opacity: 0; transform: translateY(14px); filter: blur(3px); }
              to   { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            .website-dev-step-text {
              animation: websiteDevStepTextIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
            }
            @media (prefers-reduced-motion: reduce) {
              .website-dev-step-text { animation: none; }
            }
          `}</style>
          <SectionHead eyebrow="HOW WE BUILD" title="From Briefing to Launch." accentTail="Every Step Visible." />

          <div className="relative">
            {/* Vertical rail — centred on desktop, left-aligned behind the
                markers on mobile. Fades out at both ends. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 hidden lg:block"
              style={{
                left: "50%",
                width: "1px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 8%, rgba(255,255,255,0.18) 92%, transparent 100%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 lg:hidden"
              style={{
                left: "1.625rem",
                width: "1px",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 8%, rgba(255,255,255,0.18) 92%, transparent 100%)",
              }}
            />

            <div className="relative flex flex-col gap-12 lg:gap-14">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6 · Why ARQQA ══ */}
      <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="WHY ARQQA" title="Why 100+ Businesses Across MENA" accentTail="Chose ARQQA." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_ARQQA.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.08, 0.3)}>
                <WhyCard item={item} accentGlow={accentGlow} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7 · Trusted By — horizontal auto-scrolling logo marquee ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "4rem 0" }}>
        <style>{`
          @keyframes websiteDevTrustedByMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .website-dev-trusted-marquee { animation: websiteDevTrustedByMarquee 26s linear infinite; }
          .website-dev-trusted-marquee:hover { animation-play-state: paused; }
          .website-dev-trusted-logo {
            opacity: 0.45;
            filter: grayscale(1);
            transition: opacity 0.35s ease, filter 0.35s ease;
          }
          .website-dev-trusted-logo:hover {
            opacity: 1;
            filter: grayscale(0) drop-shadow(0 0 18px rgba(90,162,255,0.5));
          }
          @media (prefers-reduced-motion: reduce) {
            .website-dev-trusted-marquee { animation: none; }
          }
        `}</style>

        <div className="relative max-w-5xl mx-auto text-center mb-10 px-6">
          <Eyebrow>TRUSTED BY</Eyebrow>
          <p className="font-light mt-3" style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)" }}>
            ACT, EBC, GTS, Merova, SBS, and 100+ businesses across MENA.
          </p>
        </div>

        <div className="relative" aria-label="Client logos">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #030305 0%, transparent 100%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, #030305 0%, transparent 100%)" }}
          />
          <div className="website-dev-trusted-marquee flex w-max items-center">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((client, i) => (
              <span key={i} className="shrink-0 flex items-center justify-center" style={{ padding: "0.5rem 3.25rem" }}>
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="website-dev-trusted-logo block"
                    style={{ height: `${5 * (client.scale ?? 1)}rem`, width: "auto" }}
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="website-dev-trusted-logo font-bold"
                    style={{ fontSize: "1.25rem", color: "#ffffff" }}
                  >
                    {client.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8 · Testimonials ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="WHAT CLIENTS SAY" title="Real Feedback." accentTail="Real Outcomes." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.role} delay={Math.min(i * 0.1, 0.3)}>
                <div className="h-full rounded-3xl p-7" style={glass}>
                  <span
                    aria-hidden="true"
                    className="block font-bold"
                    style={{
                      fontSize: "2rem",
                      lineHeight: 0.6,
                      backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    &ldquo;
                  </span>
                  <p className="font-medium mt-4" style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
                    {t.quote}
                  </p>
                  {/* Avatar — placeholder glyph until real client photos/logos are supplied */}
                  <div className="flex items-center gap-3 mt-6">
                    <span
                      aria-hidden="true"
                      className="relative flex items-center justify-center rounded-full shrink-0 overflow-hidden"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        background: "linear-gradient(150deg, rgba(90,162,255,0.28) 0%, rgba(255,122,61,0.24) 100%)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8.4" r="3.9" stroke="rgba(255,255,255,0.75)" strokeWidth="1.7" />
                        <path
                          d="M4.6 20.2c.9-4 3.9-6.2 7.4-6.2s6.5 2.2 7.4 6.2"
                          stroke="rgba(255,255,255,0.75)"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <p className="font-light" style={{ fontSize: "0.8125rem", lineHeight: 1.4, color: "rgba(255,255,255,0.45)" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9 · Regional Presence ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="WE BUILD ACROSS MENA" title="Local Teams." accentTail="Regional Reach." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {REGIONS.map((r, i) => (
              <Reveal key={r.market} delay={Math.min(i * 0.1, 0.3)}>
                <div className="h-full rounded-3xl p-7" style={glass}>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="relative flex items-center justify-center rounded-xl shrink-0"
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        boxShadow: "0 0 22px rgba(60,125,255,0.22)",
                        filter: "drop-shadow(-1px 0 5px rgba(90,162,255,0.35)) drop-shadow(1px 0 5px rgba(255,122,61,0.28))",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <defs>
                          <linearGradient id={`pinGrad-${i}`} x1="0%" y1="15%" x2="100%" y2="85%">
                            <stop offset="0%" stopColor="#5aa2ff" />
                            <stop offset="55%" stopColor="#9fc8ff" />
                            <stop offset="100%" stopColor="#ff7a3d" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 22s7.2-6.1 7.2-12A7.2 7.2 0 0 0 4.8 10c0 5.9 7.2 12 7.2 12z"
                          stroke={`url(#pinGrad-${i})`}
                          strokeWidth="1.9"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="9.8" r="2.6" stroke="rgba(210,232,255,0.85)" strokeWidth="1.6" />
                      </svg>
                    </span>
                    <h3 className="font-bold" style={{ fontSize: "1.0625rem", color: "#ffffff" }}>
                      {r.market}
                    </h3>
                  </div>
                  <p className="font-light mt-4" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                    {r.body}
                  </p>

                  <div
                    className="mt-5 pt-5 flex flex-col gap-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {r.offices.map((office) => (
                      <div key={office.lines[0]}>
                        {office.label && (
                          <p
                            className="font-semibold"
                            style={{
                              fontSize: "0.625rem",
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.42)",
                            }}
                          >
                            {office.label}
                          </p>
                        )}
                        <p
                          className={office.label ? "font-light mt-1" : "font-light"}
                          style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}
                        >
                          {office.lines.map((line, j) => (
                            <span key={line}>
                              {line}
                              {j < office.lines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10 · Lead Form ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <Reveal className="text-center">
            <h2 className="font-bold" style={{ fontSize: "clamp(1.625rem, 3.3vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#ffffff" }}>
              Tell Us About Your Project.{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                We&apos;ll Tell You Exactly What It Takes.
              </span>
            </h2>
            <p
              className="font-light mt-5 mx-auto"
              style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", maxWidth: "38rem" }}
            >
              Fill out the form and a senior strategist will contact you within 24 hours with a tailored recommendation and timeline.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <LeadForm />
          </Reveal>
        </div>
      </section>

      {/* ══ 11 · FAQ ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <SectionHead eyebrow="FAQ" title="Questions, Answered." />
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12 · Related Insights ══ */}
      <section className="relative w-full" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="font-bold text-left" style={{ fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)", lineHeight: 1.18, letterSpacing: "-0.02em", color: "#ffffff" }}>
              Related Insights
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {RELATED_INSIGHTS.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 0.08, 0.24)}>
                <Link href={`/insights/${a.slug}`} className="relative flex flex-col h-full rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.11)" }}>
                  <div
                    aria-hidden="true"
                    style={{ aspectRatio: "16 / 9", backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                  <div className="p-5">
                    <p className="font-medium" style={{ fontSize: "0.9375rem", lineHeight: 1.4, color: "#ffffff" }}>
                      {a.title}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13 · Closing CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "1rem 1.5rem 9rem" }}>
        {/* Horizon light-streak backdrop, masked so it dissolves at both edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/services/website-dev-cta-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // Long fade in from black at the top so the artwork never starts on a
            // visible edge under the Related Insights cards
            maskImage:
              "linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.55) 46%, black 62%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.55) 46%, black 62%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 24%, rgba(3,3,5,0.4) 74%, transparent 100%)",
          }}
        />
        <div
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.25rem, 4.5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)",
            background: "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2 className="font-bold" style={{ fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Ready to put your{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                website
              </span>{" "}
              to work?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-9">
              <PrimaryCTA href="/start#book-strategy-call" label="Get Your Free Website Consultation" />
              <SecondaryLink href="/work" label="See Our Website Portfolio" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

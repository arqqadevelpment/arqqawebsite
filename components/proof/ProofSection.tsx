"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

type CaseStudy = {
  key: string;
  client: string;
  logo: string;
  market: string;
  metric: string;
  metricLabel: string;
  story: string;
  glow: string;
};

const CASES: CaseStudy[] = [
  {
    key: "fawry",
    client: "Fawry",
    logo: "/logos/clients/fawry.webp",
    market: "Egypt — Fintech",
    metric: "6M",
    metricLabel: "App Installs",
    story:
      "1M active users. First fintech app in MENA. 100K organic installs.",
    glow: "#5aa2ff",
  },
  {
    key: "nileair",
    client: "Nile Air",
    logo: "/logos/clients/nile-air.webp",
    market: "KSA — Airlines",
    metric: "237x",
    metricLabel: "ROAS",
    story:
      "83M SAR digital revenue on 350K SAR spend. Amadeus platform integration.",
    glow: "#ff7a3d",
  },
  {
    key: "kenzup",
    client: "Kenz'Up",
    logo: "/logos/clients/kenzup.webp",
    market: "Morocco — App Growth",
    metric: "5M+",
    metricLabel: "App Installs",
    story:
      "Registration conversion lifted from 7% to 25%. ASO + performance launch.",
    glow: "#5aa2ff",
  },
  {
    key: "ami",
    client: "BIC Art Master Competition",
    logo: "/logos/clients/bic.webp",
    market: "UAE / Africa",
    metric: "52",
    metricLabel: "Countries",
    story:
      "50,000 artist submissions. 120,000 visits. Pan-continental digital campaign.",
    glow: "#ff7a3d",
  },
];

const LOGOS = [
  { src: "/logos/001.webp", alt: "Client logo" },
  { src: "/logos/002.webp", alt: "Client logo" },
  { src: "/logos/003.webp", alt: "Client logo" },
  { src: "/logos/004.webp", alt: "Client logo" },
  { src: "/logos/005.webp", alt: "Client logo" },
  { src: "/logos/006.webp", alt: "Client logo" },
];

/** CTA label that slides up on hover (duplicate text glides in from below) */
function SlideLabel({ text }: { text: string }) {
  return (
    <span
      className="relative block overflow-hidden"
      style={{ height: "1.5em", lineHeight: "1.5em" }}
    >
      <span
        className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
    </span>
  );
}

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((h) => !h)}
      className="relative shrink-0 snap-center cursor-pointer rounded-3xl overflow-hidden"
      style={{
        width: "min(80vw, 21rem)",
        height: "24rem",
        // No backdrop-filter here: the card is always in motion, so a live
        // backdrop blur is imperceptible but forces a re-sample every frame
        // (a major contributor to the horizontal jitter). The fill is nudged
        // slightly more opaque to keep the same visual density.
        background:
          "linear-gradient(170deg, rgba(14,16,26,0.74) 0%, rgba(6,8,14,0.82) 100%)",
        border: hovered
          ? "1px solid rgba(255,138,90,0.55)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.35), 0 24px 50px -22px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.25)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(24px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease`,
      }}
    >
      {/* Ambient glow behind the metric */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: "120%",
          height: "60%",
          left: "-10%",
          top: "12%",
          background: `radial-gradient(50% 60% at 50% 50%, ${cs.glow}2e 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Header — logo + client + market */}
      <div className="relative px-7 pt-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cs.logo}
          alt={`${cs.client} logo`}
          className="block"
          style={{ height: "2.75rem", width: "auto", maxWidth: "55%", objectFit: "contain", marginBottom: "1rem" }}
          loading="lazy"
        />
        <p
          className="font-medium"
          style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.92)" }}
        >
          {cs.client}
        </p>
        <p
          className="font-light mt-1"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          {cs.market}
        </p>
      </div>

      {/* Glowing metric — the hero of the card */}
      <div
        className="relative px-7"
        style={{
          marginTop: "3.25rem",
          transform: hovered ? "translateY(-14px) scale(0.92)" : "none",
          transformOrigin: "left center",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="font-bold"
          style={{
            fontSize: "4rem",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            textShadow: `0 0 44px ${cs.glow}90, 0 0 90px ${cs.glow}40`,
          }}
        >
          {cs.metric}
        </div>
        <p
          className="font-light mt-2"
          style={{
            fontSize: "0.8125rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {cs.metricLabel}
        </p>
      </div>

      {/* Story — revealed on hover */}
      <div
        className="absolute inset-x-0 bottom-0 px-7 pb-7"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 0.45s ease 0.05s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s",
        }}
      >
        <span
          aria-hidden="true"
          className="block mb-4"
          style={{
            width: "2.25rem",
            height: "2px",
            background: `linear-gradient(90deg, ${cs.glow} 0%, transparent 100%)`,
            borderRadius: "1px",
          }}
        />
        <p
          className="font-light"
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {cs.story}
        </p>
      </div>

      {/* Idle hint */}
      <div
        className="absolute inset-x-0 bottom-0 px-7 pb-7"
        style={{
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          className="font-light"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Hover for the story →
        </span>
      </div>
    </div>
  );
}

export function ProofSection() {
  return (
    <section className="relative w-full" style={{ padding: "7rem 0 6rem" }}>
      {/* Background — liquid wave artwork, faded at the edges into the page flow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/proof-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 16%, black 38%, black 62%, rgba(0,0,0,0.4) 84%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 16%, black 38%, black 62%, rgba(0,0,0,0.4) 84%, transparent 100%)",
        }}
      />
      {/* Legibility scrim over the artwork — transparent at the section edges
          so there is no luminance step against the neighboring sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.35) 28%, rgba(3,3,5,0.35) 68%, transparent 100%)",
        }}
      />

      <style>{`
        /* translate3d keeps the animation on the GPU — a plain translateX on a
           ~2800px-wide track repaints every scroll frame and visibly jitters */
        @keyframes proofMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .proof-marquee, .proof-cards-track {
          /* Promote to their own compositor layer so scrolling doesn't
             re-rasterize the track (root cause of the left/right shake) */
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .proof-marquee { animation: proofMarquee 40s linear infinite; }
        .proof-marquee:hover { animation-play-state: paused; }
        /* The card track keeps moving on hover — only the hovered card itself
           reacts, revealing its story. */
        .proof-cards-track { animation: proofMarquee 45s linear infinite; }
        .proof-logo {
          opacity: 0.4;
          filter: grayscale(1);
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .proof-logo:hover {
          opacity: 1;
          filter: grayscale(0) drop-shadow(0 0 18px rgba(90,162,255,0.5));
        }
        .proof-scroll { scrollbar-width: none; }
        .proof-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .proof-marquee, .proof-cards-track { animation: none; }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Eyebrow className="mb-5">NUMBERS THAT SPEAK</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            We Don&apos;t Show Awards.
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                whiteSpace: "nowrap",
              }}
            >
              We Show Outcomes.
            </span>
          </h2>
        </div>
      </div>

      {/* Case cards — infinite auto-scrolling marquee that never pauses.
          The list is rendered twice so the loop point is seamless; the
          trailing gap on each set keeps spacing even across the seam. */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(3,3,5,0.9) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, rgba(3,3,5,0.9) 0%, transparent 100%)",
          }}
        />
        <div className="proof-cards-track flex w-max pb-4">
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-5 pr-5" aria-hidden={set === 1}>
              {CASES.map((cs, i) => (
                <CaseCard key={`${cs.key}-${set}`} cs={cs} index={i} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Client logo marquee — auto-scrolls, pauses on hover */}
      <div className="relative mt-20 overflow-hidden" aria-label="Client logos">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #030305 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, #030305 0%, transparent 100%)",
          }}
        />
        <div className="proof-marquee flex w-max items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span
              key={i}
              className="shrink-0 flex items-center justify-center"
              style={{ padding: "0.5rem 2.75rem" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="proof-logo block"
                style={{ height: "7rem", width: "auto" }}
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-5 mt-16 px-6">
        {/* Secondary — quiet glass pill */}
        <Link
          href="/work"
          className="group inline-flex items-center justify-center rounded-2xl font-medium"
          style={{
            padding: "0.9375rem 2rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "#ffffff",
            fontSize: "0.9375rem",
            letterSpacing: "0.01em",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        >
          <SlideLabel text="View portfolio →" />
        </Link>
      </div>
    </section>
  );
}

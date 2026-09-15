"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import Link from "next/link";
import { OfficesSection } from "@/components/contact/OfficesSection";

/* ── Content — sourced from the Catalyst System page spec ── */

/* `image` is optional per phase. When set, the card switches to a split
   layout: copy stays in the left column, artwork shows at full strength on
   the right instead of sitting under the usual dark veil. `mobileImage` is
   a portrait crop purpose-built for the pinned mobile slider — same idea as
   the Core Value pillars above. */
const PHASES: {
  num: string;
  title: string;
  body: string;
  deliverables: string;
  image?: string;
  mobileImage?: string;
}[] = [
  {
    num: "01",
    title: "Strategic Input",
    image: "/catalyst-phase-01.webp",
    mobileImage: "/catalyst-phase-01-mobile.png",
    body: "Everything begins with strategy. Market analysis, competitive audit, audience mapping, KPI alignment, channel selection. No creative is produced, no media is bought, until the blueprint is complete. This is your growth architecture.",
    deliverables:
      "Strategy brief, competitive landscape report, KPI dashboard setup, channel plan, content calendar framework.",
  },
  {
    num: "02",
    title: "The Content Factory",
    image: "/catalyst-phase-02.webp",
    mobileImage: "/catalyst-phase-02-mobile.png",
    body: "Strategy feeds directly into content production. Platform-native copy. Storyboarding. Scripting. Every piece of content is mapped to a strategic objective and tagged to a performance metric.",
    deliverables:
      "Monthly content calendar, platform-native copy decks, script treatments, hashtag/trend analysis.",
  },
  {
    num: "03",
    title: "Visual Production",
    image: "/catalyst-phase-03.webp",
    mobileImage: "/catalyst-phase-03-mobile.png",
    body: "Content meets craft. Creative design, motion graphics, Reels production, photography direction. The joint sign-off protocol ensures creative and media teams approve every asset together, with zero internal friction.",
    deliverables:
      "Creative assets (static, motion, video), brand-consistent visual guidelines, production schedule.",
  },
  {
    num: "04",
    title: "Handoff & Launch",
    image: "/catalyst-phase-04.webp",
    mobileImage: "/catalyst-phase-04-mobile.png",
    body: "Automated onboarding via proprietary ClickUp templates. Day 1 transparency: every client sees every task, every deadline, every status. Campaign activation across all selected channels simultaneously.",
    deliverables:
      "ClickUp project workspace, campaign launch checklist, automated handoff documentation, real-time tracking.",
  },
  {
    num: "05",
    title: "Intelligence & Reporting",
    image: "/catalyst-phase-05.webp",
    mobileImage: "/catalyst-phase-05-mobile.png",
    body: "Performance isn't a monthly PDF. It's a live system. Unified dashboards, shared KPIs, monthly retention surveys, strategic advisory sessions. You're not left guessing: you're steering.",
    deliverables:
      "Live performance dashboard, monthly strategic review, client satisfaction survey, optimization recommendations.",
  },
];

const WHAT_YOU_GET = [
  {
    title: "Seamless Onboarding",
    image: "/what-seamless-onboarding.webp",
    body: "Clear, step-by-step integration. Aligned objectives, budgets, platforms, and expectations from day one.",
    icon: (
      <>
        <path
          d="M4.5 7.5h9M4.5 12h9M4.5 16.5h5.5"
          stroke="url(#whatYouGetStroke)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M16 15.2l2.1 2.1 4.1-4.4"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Radical Transparency",
    image: "/what-radical-transparency.webp",
    body: "Full clarity across operations and performance. Unified dashboards, aligned reporting, shared KPIs, real accountability.",
    icon: (
      <>
        <path
          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
          stroke="url(#whatYouGetStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.04)"
        />
        <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" />
      </>
    ),
  },
  {
    title: "Monthly Retention Insights",
    image: "/what-monthly-retention-insights.webp",
    body: "Client-experience surveys keep your voice at the center. We adjust, improve, and evolve based on real feedback.",
    icon: (
      <>
        <path
          d="M4.5 18.5v-5.2M9.5 18.5V8.3M14.5 18.5v-8.6M19.5 18.5V5.5"
          stroke="url(#whatYouGetStroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Dedicated Customer Success",
    image: "/what-dedicated-customer-success.webp",
    body: "Proactive client health management. Strategic advisory that secures long-term value, not just delivery.",
    icon: (
      <>
        <path
          d="M12 21s-7-4.35-9-8.3C1.4 9.4 3 6 6.4 6c1.9 0 3.3 1 4.6 2.5C12.3 7 13.7 6 15.6 6 19 6 20.6 9.4 21 12.7 19 16.65 12 21 12 21z"
          stroke="url(#whatYouGetStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.04)"
        />
      </>
    ),
  },
];

/* ── Section 3 · The Value Shift — four pillars ──
   `mobileImage` is a portrait (880×1106) composite purpose-built for the
   mobile slider: the same artwork as `media`, but pre-laid-out with a solid
   dark band across the top where the slide's copy sits. No mobile crop
   exists for the fourth pillar, so that slide falls back to its `media`
   video as the background instead. */
const VALUE_SHIFT = [
  {
    title: "Guaranteed Operational Alignment",
    media: { src: "/value-alignment.webp", type: "image" as const },
    mobileImage: "/value-alignment.png",
    icon: (
      <>
        <path
          d="M12 2.8l7.5 3v6.1c0 4.3-3 8.2-7.5 9.3-4.5-1.1-7.5-5-7.5-9.3V5.8l7.5-3z"
          stroke="url(#valueShiftStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M8.8 12.2l2.2 2.2 4.2-4.6"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    body: "Every creative asset is pre-validated by performance media standards through a joint sign-off protocol, eliminating wasted production budgets on non-converting content.",
  },
  {
    title: "True Velocity via Automated Workflows",
    media: { src: "/value-velocity-desk-top.png", type: "image" as const },
    mobileImage: "/value-velocity.png",
    icon: (
      <>
        <path
          d="M13.2 2.5L5 13.4h5.2l-1.4 8.1L17 10.6h-5.2l1.4-8.1z"
          stroke="url(#valueShiftStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M19 5.5h3M19.5 9h2.5"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
    body: "Powered by proprietary management system architecture, onboarding and project execution start on Day 1 with zero setup friction or lag.",
  },
  {
    title: "Data-Attributed Creative (The Content Factory)",
    media: { src: "/value-content-factory.webp", type: "image" as const },
    mobileImage: "/value-content-factory.png",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" stroke="url(#valueShiftStroke)" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4.4" stroke="url(#valueShiftStroke)" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.9)" />
        <path
          d="M17.4 6.6l3.4-3.4M18.6 3.2h2.2v2.2"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    body: "We don\u2019t publish for \u201Cbrand awareness\u201D alone. Every script, visual, and copy angle is tagged directly to performance KPIs and campaign objectives.",
  },
  {
    title: "Radical Governance & Real-Time Intelligence",
    media: { src: "/value-intelligence.mp4", type: "video" as const },
    icon: (
      <>
        <rect
          x="2.8"
          y="4"
          width="18.4"
          height="14"
          rx="2.2"
          stroke="url(#valueShiftStroke)"
          strokeWidth="1.4"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M6.8 14.2l3.2-3.6 2.6 2.4 4.6-5"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 21h5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    body: "No waiting for end-of-month PDFs. Clients gain immediate visibility into task status, campaign pacing, and unified revenue metrics via live dashboards.",
  },
];

/* ── Section 4 · Enterprise social proof — logos render monochrome.
   Entries without a `logo` fall back to a wordmark; drop a file into
   /public/logos/clients and add the path to swap it for real artwork. ── */
const ENTERPRISE_LOGOS: { name: string; logo?: string }[] = [
  { name: "Nile Air", logo: "/logos/clients/nile-air.webp" },
  { name: "Air Cairo", logo: "/logos/clients/Air-aciro.webp" },
  { name: "QNB Life", logo: "/logos/clients/QNB.webp" },
  { name: "e&", logo: "/logos/clients/etisalat-e-and.webp" },
  { name: "ADNOC", logo: "/logos/clients/Adnoc.webp" },
  { name: "Fawry", logo: "/logos/clients/fawry.webp" },
  { name: "Kenz\u2019Up", logo: "/logos/clients/kenzup.webp" },
  { name: "BIC", logo: "/logos/clients/bic.webp" },
];

/* ── Scroll-reveal wrapper ── */
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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Dot palette + sizes for the hero ring. Picked deterministically from the
   dot's index (never Math.random) so the server and client markup match. */
const DOT_PALETTE = [
  { color: "#9fc8ff", glow: "rgba(90,162,255,0.9)" },
  { color: "#5aa2ff", glow: "rgba(47,107,255,0.85)" },
  { color: "#8f7dff", glow: "rgba(111,91,224,0.85)" },
  { color: "#c9a2ff", glow: "rgba(160,110,255,0.8)" },
  { color: "#ff9a5a", glow: "rgba(255,122,61,0.85)" },
  { color: "#ff6f45", glow: "rgba(255,90,43,0.8)" },
  { color: "rgba(255,255,255,0.8)", glow: "rgba(255,255,255,0.55)" },
  { color: "rgba(255,255,255,0.4)", glow: "" },
];

const DOT_SIZES = [1.5, 2, 3, 4, 5, 6.5, 8];

/* Two different strides keep size and color out of phase, so the ring never
   repeats a visible pattern. `offset` shifts the inner ring off the outer. */
function dotLook(i: number, offset: number) {
  const p = DOT_PALETTE[(i * 3 + offset) % DOT_PALETTE.length];
  const size = DOT_SIZES[(i * 5 + offset) % DOT_SIZES.length];
  return {
    width: `${size}px`,
    height: `${size}px`,
    background: p.color,
    boxShadow: p.glow ? `0 0 ${Math.round(size * 2.6)}px ${p.glow}` : "none",
  };
}

/* ── Hero particle ring — pure CSS, distinct from the homepage's video loop ── */
function ParticleRing() {
  const outerDots = Array.from({ length: 28 }, (_, i) => i);
  const innerDots = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(46rem, 90vw)",
        height: "min(46rem, 90vw)",
      }}
    >
      {/* Soft core glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(52,68,224,0.22) 0%, rgba(111,91,224,0.1) 35%, transparent 68%)",
          filter: "blur(10px)",
        }}
      />

      {/* Outer rotating ring of particles */}
      <div
        className="absolute inset-0"
        style={{ animation: "catalystRingSpin 90s linear infinite" }}
      >
        {outerDots.map((i) => {
          const angle = (360 / outerDots.length) * i;
          return (
            <span
              key={`o-${i}`}
              className="absolute rounded-full"
              style={{
                ...dotLook(i, 0),
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateX(min(23rem, 45vw)) rotate(-${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Inner counter-rotating ring */}
      <div
        className="absolute inset-0"
        style={{ animation: "catalystRingSpinReverse 60s linear infinite" }}
      >
        {innerDots.map((i) => {
          const angle = (360 / innerDots.length) * i;
          return (
            <span
              key={`i-${i}`}
              className="absolute rounded-full"
              style={{
                ...dotLook(i, 5),
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateX(min(15rem, 30vw)) rotate(-${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Thin ring outlines */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "8%",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: "27%",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

/* ── Value Shift — full-screen scroll sequence ──────────────────────────────
   Each pillar owns one viewport-height slide. A tall wrapper drives the
   scroll while an inner sticky stage holds every slide stacked; the handler
   below converts scroll position into a per-slide offset `t` (0 = centred,
   ±1 = one screen away) and moves the copy and the visual at different rates.
   That rate difference is the parallax — the visual travels roughly twice as
   far as the text, so the two planes separate as a slide enters and leaves.
   ------------------------------------------------------------------------ */

function SlideMedia({ item }: { item: (typeof VALUE_SHIFT)[0] }) {
  const { media } = item;

  if (media.type === "video") {
    return (
      <video autoPlay muted loop playsInline aria-hidden="true" className="catalyst-vs-asset">
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt="" aria-hidden="true" className="catalyst-vs-asset" />;
}

function ValueShiftStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Pinned and scroll-driven at every width — see the CSS comment on
    // .catalyst-vs-wrap for why this section doesn't get the lg-only
    // treatment the 5 Phases slider below it uses.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    function update() {
      ticking = false;
      const rect = wrap!.getBoundingClientRect();
      const vh = window.innerHeight;
      // Distance scrolled into the wrapper, in viewport heights.
      const scrolled = -rect.top;

      VALUE_SHIFT.forEach((_, i) => {
        const slide = slideRefs.current[i];
        const text = textRefs.current[i];
        const visual = visualRefs.current[i];
        const dot = dotRefs.current[i];
        if (!slide) return;

        // 0 when this slide is centred, negative before, positive after.
        const t = scrolled / vh - i;
        const dist = Math.min(Math.abs(t), 1.4);

        // Hold at full strength through the middle, then clear quickly. The
        // fade has to finish before the neighbouring slide starts arriving —
        // otherwise two headlines sit legibly on top of each other. Holding
        // to 0.32 and reaching zero by 0.5 means a slide is fully gone by
        // the time its neighbour reaches the same point.
        const raw = dist <= 0.32 ? 1 : Math.max(0, 1 - (dist - 0.32) / 0.18);
        // Smoothstep, so the fade eases rather than ramping linearly.
        const opacity = raw * raw * (3 - 2 * raw);

        slide.style.opacity = String(opacity.toFixed(3));
        slide.style.zIndex = String(100 - Math.round(dist * 100));
        slide.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
        // Defocus whatever is leaving, so any brief overlap reads as depth
        // rather than as two competing blocks of text.
        slide.style.filter =
          dist <= 0.32
            ? "none"
            : `blur(${(Math.min((dist - 0.32) / 0.18, 1) * 8).toFixed(1)}px)`;

        if (!reduceMotion) {
          // Two planes, two rates — the copy drifts, the visual travels.
          if (text) {
            text.style.transform = `translate3d(0, ${(-t * 130).toFixed(1)}px, 0)`;
          }
          if (visual) {
            visual.style.transform = `translate3d(0, ${(-t * 42).toFixed(1)}px, 0) scale(${(1 + Math.min(dist, 1) * 0.05).toFixed(4)})`;
          }
        }

        if (dot) {
          dot.style.background =
            dist < 0.5
              ? "linear-gradient(120deg, #5aa2ff 0%, #ff9a5a 100%)"
              : "rgba(255,255,255,0.2)";
          dot.style.transform = dist < 0.5 ? "scaleX(1)" : "scaleX(0.55)";
        }
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative catalyst-vs-wrap"
      style={{ "--slides": VALUE_SHIFT.length } as React.CSSProperties}
    >
      <div ref={stageRef} className="catalyst-vs-stage">
        {VALUE_SHIFT.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="catalyst-vs-slide"
            style={{ willChange: "opacity" }}
          >
            {/* Artwork — full-bleed behind the copy at every width. Below lg
                this renders the portrait crop (pre-composed with a dark band
                up top for the copy); from lg, the original landscape asset. */}
            <div
              ref={(el) => {
                visualRefs.current[i] = el;
              }}
              className="overflow-hidden catalyst-vs-media"
              // Grow from the right edge, so the parallax scale never pushes
              // the artwork past it mid-transition.
              style={{ willChange: "transform", transformOrigin: "right center" }}
              aria-hidden="true"
            >
              <div className="catalyst-vs-media-mobile">
                {item.mobileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.mobileImage}
                    alt=""
                    aria-hidden="true"
                    loading={i === 0 ? "eager" : "lazy"}
                    className="catalyst-vs-asset"
                  />
                ) : (
                  <video autoPlay muted loop playsInline aria-hidden="true" className="catalyst-vs-asset">
                    <source src={item.media.src} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="catalyst-vs-media-desktop">
                <SlideMedia item={item} />
              </div>
            </div>
            {/* Legibility scrim — left-weighted from lg (clearing before the
                artwork's focal side), top-weighted below it (clearing before
                the artwork's own reserved copy band). */}
            <div
              aria-hidden="true"
              className="absolute inset-0 catalyst-vs-scrim pointer-events-none"
            />

            <div className="relative w-full max-w-6xl mx-auto catalyst-vs-copy">
              {/* Copy — left from lg; full width, top-anchored below it. */}
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="lg:max-w-[38%]"
                style={{ willChange: "transform" }}
              >
                <Eyebrow className="mb-4 lg:mb-6">{`0${i + 1} · Core value`}</Eyebrow>
                <h3
                  className="font-bold catalyst-vs-title"
                  style={{ letterSpacing: "-0.02em", color: "#ffffff" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-light mt-3 lg:mt-6 catalyst-vs-body"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.body}
                </p>
              </div>

            </div>
          </div>
        ))}

        {/* Progress rail — only meaningful while the slides share one frame */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 catalyst-vs-rail"
          style={{ bottom: "2.5rem", zIndex: 200 }}
          aria-hidden="true"
        >
          {VALUE_SHIFT.map((item, i) => (
            <span
              key={item.title}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              style={{
                display: "block",
                width: "2.25rem",
                height: "2px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.2)",
                transition: "background 0.45s ease, transform 0.45s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* "What You Get" card — lifts and picks up a warm rim-light on hover,
   matching the hover treatment used across the site (e.g. the About
   page's belief cards). */
function WhatYouGetCard({ item }: { item: (typeof WHAT_YOU_GET)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl h-full overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        border: hovered
          ? "1px solid rgba(255,138,90,0.5)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: hovered
          ? "0 -12px 32px -16px rgba(255,122,61,0.35), 0 20px 40px -20px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Image band across the top of the card */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src={item.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Fade into the card body so the image has no hard bottom edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(9,10,18,0.65) 55%, rgba(9,10,18,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative p-6 sm:p-7">
        <h3
          className="font-bold"
          style={{ fontSize: "1.0625rem", letterSpacing: "-0.01em", color: "#ffffff" }}
        >
          {item.title}
        </h3>
        <p
          className="font-light mt-3"
          style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}
        >
          {item.body}
        </p>
      </div>
    </div>
  );
}

/* ── The 5 Phases — horizontal scroll rail ─────────────────────────────────
   A tall wrapper supplies the scroll distance while an inner sticky stage
   holds a track of full-viewport panels laid out side by side. Vertical
   scroll is converted into horizontal travel on the track; each panel's
   artwork drifts at a slower rate than its copy, which is what gives the
   sideways motion depth. The timeline sits pinned along the bottom.
   ------------------------------------------------------------------------ */
/* Short labels for the timeline — the full titles are too long to sit on one
   rail without crowding. */
const PHASE_LABELS = [
  "Strategy",
  "Content",
  "Visuals",
  "Launch",
  "Reporting",
];

function phaseClamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/* ── The 5 Phases — scroll-driven full-screen slides ───────────────────────
   A wrapper N screens tall supplies the scroll distance; an inner sticky
   stage holds every phase stacked. Scroll position converts to a per-slide
   offset `t` (0 = centred, ±1 = one screen away), which drives the crossfade,
   the parallax between background and copy, and the timeline indicator.
   The fade clears by ±0.5 so two phases are never legible at once.
   ------------------------------------------------------------------------ */
function PhasesRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const introBgRef2 = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const artRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Pinned and scroll-driven at every width now — same reasoning as the
    // Core Value slider above (see its CSS comment): one native page scroll
    // throughout, never a nested "stacked below lg" fallback.
    {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const last = PHASES.length - 1;
      let ticking = false;

      function update() {
        ticking = false;
        const rect = wrap!.getBoundingClientRect();
        const vh = window.innerHeight;
        const screens = -rect.top / vh;

        // ── Intro beat ──────────────────────────────────────────────────
        // The title owns the first screen, then travels up and fades out.
        const introT = phaseClamp(screens / 0.85, 0, 1);
        const introEase = introT * introT * (3 - 2 * introT);
        const introFade = String((1 - introEase).toFixed(3));
        if (introBgRef.current) introBgRef.current.style.opacity = introFade;
        if (introBgRef2.current) introBgRef2.current.style.opacity = introFade;
        if (introRef.current) {
          introRef.current.style.opacity = String((1 - introEase).toFixed(3));
          introRef.current.style.transform = `translate3d(0, ${(-introEase * 170).toFixed(1)}px, 0)`;
        }

        // ── Phases ────────────────────────────────────────────────────────
        // They only begin once the intro has cleared, so the two never share
        // the frame and the section never feels cramped.
        const exact = phaseClamp(screens - 1, 0, last);
        const revealT = phaseClamp((screens - 0.7) / 0.3, 0, 1);
        const reveal = revealT * revealT * (3 - 2 * revealT);

        if (timelineRef.current) {
          timelineRef.current.style.opacity = String(reveal.toFixed(3));
        }
        if (fillRef.current) {
          fillRef.current.style.width = `${((exact / last) * 100).toFixed(2)}%`;
        }

        PHASES.forEach((_, i) => {
          const slide = slideRefs.current[i];
          if (!slide) return;
          // Clamped progress: before the section pins, phase 01 stays fully
          // visible, and phase 05 holds after it ends — otherwise the stage
          // reads blank while the section scrolls in or out.
          const t = exact - i;
          const dist = Math.min(Math.abs(t), 1.4);

          // Hold through the middle, gone by half a screen — no two phases
          // legible at the same time.
          const raw = dist <= 0.32 ? 1 : Math.max(0, 1 - (dist - 0.32) / 0.18);
          const opacity = raw * raw * (3 - 2 * raw);

          slide.style.opacity = (opacity * reveal).toFixed(3);
          slide.style.zIndex = String(100 - Math.round(dist * 100));
          slide.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
          slide.style.filter =
            dist <= 0.32
              ? "none"
              : `blur(${(Math.min((dist - 0.32) / 0.18, 1) * 8).toFixed(1)}px)`;

          if (!reduceMotion) {
            // Background is the far plane, so it travels least.
            const art = artRefs.current[i];
            const copy = copyRefs.current[i];
            if (art) {
              art.style.transform = `translate3d(0, ${(-t * 40).toFixed(1)}px, 0) scale(${(1 + Math.min(dist, 1) * 0.05).toFixed(4)})`;
            }
            if (copy) {
              copy.style.transform = `translate3d(0, ${(-t * 120).toFixed(1)}px, 0)`;
            }
          }

          // Indicator follows scroll — nearest slide wins.
          const node = nodeRefs.current[i];
          if (node) {
            const on = dist < 0.5;
            node.style.color = on ? "#ffffff" : "rgba(255,255,255,0.4)";
            const dot = node.firstElementChild as HTMLElement | null;
            if (dot) {
              dot.style.background = on
                ? "linear-gradient(120deg, #5aa2ff 0%, #ff9a5a 100%)"
                : "rgba(255,255,255,0.25)";
              dot.style.transform = on ? "scale(1.5)" : "scale(1)";
              dot.style.boxShadow = on ? "0 0 14px rgba(90,162,255,0.8)" : "none";
            }
          }
        });
      }

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      }

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      document.addEventListener("visibilitychange", update);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        document.removeEventListener("visibilitychange", update);
      };
    }
  }, []);

  return (
    <section id="the-system" style={{ scrollMarginTop: "7rem" }}>
      <div
        ref={wrapRef}
        className="relative catalyst-ph-wrap"
        style={{ "--slides": PHASES.length + 1 } as React.CSSProperties}
      >
        <div className="w-full catalyst-ph-stage">
          {/* Ambient field behind the intro — brand glows over the flat black,
              fading out with the title so the phases start clean. */}
          <div
            ref={introBgRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none catalyst-ph-ambient"
            style={{
              zIndex: 190,
              background: `
                radial-gradient(58% 44% at 50% 40%, rgba(60,125,255,0.22) 0%, rgba(25,60,180,0.08) 45%, transparent 72%),
                radial-gradient(42% 34% at 20% 64%, rgba(255,122,61,0.16) 0%, rgba(224,60,40,0.05) 48%, transparent 74%),
                radial-gradient(38% 30% at 82% 28%, rgba(111,91,224,0.18) 0%, transparent 70%)
              `,
            }}
          />
          {/* A brighter core right behind the headline */}
          <div
            ref={introBgRef2}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 pointer-events-none catalyst-ph-ambient"
            style={{
              zIndex: 190,
              width: "min(46rem, 88vw)",
              height: "min(28rem, 52vh)",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at 50% 50%, rgba(90,162,255,0.16) 0%, rgba(255,154,90,0.07) 42%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* Intro beat — owns the first screen on its own, then travels up
              and clears out before the phases arrive. */}
          <div
            ref={introRef}
            className="flex flex-col items-center justify-center px-6 text-center pointer-events-none catalyst-ph-intro"
            style={{ zIndex: 200, willChange: "transform, opacity" }}
          >
            <Eyebrow>The 5 Phases · Deep Dive</Eyebrow>
            <h2
              className="font-bold mt-6"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                maxWidth: "20ch",
              }}
            >
              One system, five phases,{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                zero gaps.
              </span>
            </h2>
          </div>

          {PHASES.map((phase, i) => (
            <div
              key={phase.num}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="catalyst-ph-slide"
              style={{ willChange: "opacity" }}
            >
              {/* Artwork — full bleed behind the copy at every width. Below
                  lg this is the portrait crop (pre-composed with a dark band
                  up top for the copy); from lg, the original landscape one. */}
              {phase.image && (
                <div
                  ref={(el) => {
                    artRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="overflow-hidden catalyst-ph-media"
                  style={{ willChange: "transform", transformOrigin: "right center" }}
                >
                  {/* Plain img rather than next/image: under next/image these
                      five rendered blank once the phases stopped sharing one
                      pinned screen. The core-value artwork alongside uses the
                      same element and renders. */}
                  {phase.mobileImage ? (
                    <div className="catalyst-ph-media-mobile">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={phase.mobileImage} alt="" aria-hidden="true" className="catalyst-ph-img" />
                    </div>
                  ) : null}
                  <div className="catalyst-ph-media-desktop">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={phase.image} alt="" aria-hidden="true" className="catalyst-ph-img" />
                  </div>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none catalyst-ph-scrim"
              />

              {/* Copy */}
              <div
                ref={(el) => {
                  copyRefs.current[i] = el;
                }}
                className="relative w-full max-w-6xl mx-auto catalyst-ph-copy"
                style={{ willChange: "transform" }}
              >
                <div className="lg:max-w-[42%]">
                  {/* Below lg the timeline bar (which normally carries this
                      numbering) is hidden, so each slide gets its own tag
                      instead — same pattern as the Core Value pillars. */}
                  <Eyebrow className="mb-4 lg:hidden">{`${phase.num} · ${PHASE_LABELS[i]}`}</Eyebrow>
                  <h3 className="font-bold catalyst-ph-title" style={{ letterSpacing: "-0.02em", color: "#ffffff" }}>
                    {phase.title}
                  </h3>
                  <p
                    className="font-light mt-3 lg:mt-5 catalyst-ph-body"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {phase.body}
                  </p>
                  <div
                    className="mt-4 pt-4 lg:mt-6 lg:pt-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      Deliverables
                    </p>
                    <p
                      className="font-light mt-2 catalyst-ph-deliverables"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {phase.deliverables}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── Timeline — tracks scroll, no clicking required ── */}
          {/* Timeline stays above every slide — slides take a computed
              z-index of up to 100, which was covering this bar. */}
          <div
            ref={timelineRef}
            className="absolute inset-x-0 bottom-0 px-6 pb-10 pointer-events-none catalyst-ph-timeline"
            style={{ zIndex: 200, opacity: 0 }}
          >
            <div className="relative max-w-5xl mx-auto">
              <div
                aria-hidden="true"
                className="absolute inset-x-0"
                style={{ top: "0.3rem", height: "1px", background: "rgba(255,255,255,0.14)" }}
              />
              <div
                ref={fillRef}
                aria-hidden="true"
                className="absolute left-0"
                style={{
                  top: "0.3rem",
                  height: "1px",
                  width: "0%",
                  background: "linear-gradient(90deg, #5aa2ff 0%, #ff7a3d 100%)",
                }}
              />
              <div className="relative flex justify-between">
                {PHASES.map((phase, i) => (
                  <div
                    key={phase.num}
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className="flex flex-col items-center gap-3"
                    style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.4s ease" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: "block",
                        width: "7px",
                        height: "7px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.25)",
                        transition: "background 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease",
                      }}
                    />
                    <span
                      className="hidden sm:block font-semibold"
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {phase.num} · {PHASE_LABELS[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CatalystSystemPageContent() {

  return (
    <>
      <style>{`
        @keyframes catalystRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes catalystRingSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes catalystHeroReveal {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Spring scale on each pillar number as it enters the viewport */
        @keyframes catalystNumberPop {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.05); }
          72%  { transform: scale(0.995); }
          100% { transform: scale(1); }
        }
        .catalyst-pillar-icon {
          transform-origin: center center;
          transition: border-color 0.4s ease;
        }
        .catalyst-pillar-icon.is-in {
          animation: catalystNumberPop 0.75s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        /* Phase card artwork. From lg the card takes the source's own 16:9
           ratio, so the image fills it exactly — no crop, no scaling, no
           distortion, and no scrim: the copy sits over the artwork's solid
           black left band. Below lg the artwork stacks under the copy. */
        .catalyst-phase-art { display: none; }
        @media (min-width: 1024px) {
          .catalyst-phase-card { aspect-ratio: 16 / 9; }
          .catalyst-phase-art {
            display: block;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        /* ── 5 Phases slider ──────────────────────────────────────────────
           Pinned and paged by real page scroll at every width now, same
           mechanism (and same reasoning) as the Core Value slider below.
           Only the presentation — copy position, artwork crop, scrim
           direction, whether the timeline bar shows — changes below lg. */
        .catalyst-ph-wrap { height: calc(var(--slides) * 100vh); }
        .catalyst-ph-stage {
          position: sticky;
          top: 0;
          height: 100dvh;
          overflow: hidden;
        }
        .catalyst-ph-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          opacity: 0;
          /* Bottom padding keeps the copy clear of the timeline bar. */
          padding-top: 6rem;
          padding-bottom: 8rem;
        }
        .catalyst-ph-copy,
        .catalyst-ph-media { order: 0; }
        /* Artwork spans the full frame so it renders as large as possible;
           object-fit contain keeps it uncropped, anchored right so the
           subject sits opposite the copy column. */
        .catalyst-ph-media {
          position: absolute;
          inset: 0;
          width: auto;
        }
        .catalyst-ph-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: right center;
          transform-origin: right center;
        }
        /* Two crops per slide, toggled by width — same technique as the
           Core Value artwork above. */
        .catalyst-ph-media-mobile { display: none; }
        .catalyst-ph-media-desktop { display: block; }
        .catalyst-ph-intro {
          position: absolute;
          inset: 0;
          padding-bottom: 0;
        }
        .catalyst-ph-timeline,
        .catalyst-ph-ambient { display: block; }
        /* Left-weighted so the artwork's focal side stays clear. */
        .catalyst-ph-scrim {
          display: block;
          background: linear-gradient(
            90deg,
            rgba(3,3,8,0.94) 0%,
            rgba(3,3,8,0.88) 34%,
            rgba(3,3,8,0.6) 50%,
            rgba(3,3,8,0.18) 64%,
            rgba(3,3,8,0) 76%
          );
        }

        /* Sized for a phone by default; the min-width override below
           restores the original desktop scale. */
        .catalyst-ph-title { font-size: clamp(1.5rem, 6vw, 1.875rem); line-height: 1.16; }
        .catalyst-ph-body { font-size: 0.875rem; line-height: 1.6; }
        .catalyst-ph-deliverables { font-size: 0.8125rem; line-height: 1.55; }

        @media (max-width: 1023.98px) {
          .catalyst-ph-slide {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 6.5rem 1.5rem 2.5rem;
          }
          .catalyst-ph-img {
            object-fit: cover;
            object-position: center top;
            transform-origin: center top;
          }
          .catalyst-ph-media-mobile { display: block; }
          .catalyst-ph-media-desktop { display: none; }

          /* Top-weighted, since copy sits above the artwork here. */
          .catalyst-ph-scrim {
            background: linear-gradient(
              180deg,
              rgba(3,3,8,0.82) 0%,
              rgba(3,3,8,0.55) 34%,
              rgba(3,3,8,0.05) 55%,
              transparent 68%
            );
          }

          /* The rail and ambient glows are sized for the desktop split
             layout; below lg the artwork itself carries the scene. */
          .catalyst-ph-timeline,
          .catalyst-ph-ambient { display: none; }
        }

        @media (min-width: 1024px) {
          .catalyst-ph-title { font-size: clamp(1.625rem, 3.2vw, 2.5rem); line-height: 1.14; }
          .catalyst-ph-body { font-size: clamp(0.9375rem, 1.3vw, 1.0625rem); line-height: 1.8; }
          .catalyst-ph-deliverables { font-size: 0.875rem; line-height: 1.7; }
        }

        /* ── Core Value slider ──────────────────────────────────────────
           Unlike the 5 Phases slider above, this one is pinned and paged by
           real page scroll at every width, not just from lg — the mechanism
           (tall wrapper + sticky stage + JS reading scroll position to
           crossfade slides) is exactly what the desktop version has always
           used, so there is one native page scrollbar throughout and never
           a nested scrollable box. Only the *presentation* — where the copy
           sits, which crop of the artwork shows, which direction the scrim
           reads — changes below lg. */
        .catalyst-vs-wrap { height: calc(var(--slides) * 100vh); }
        .catalyst-vs-stage {
          position: sticky;
          top: 0;
          height: 100dvh;
          overflow: hidden;
        }
        .catalyst-vs-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 6.5rem 1.5rem 2.5rem;
          opacity: 0;
        }
        .catalyst-vs-copy { order: 0; }
        .catalyst-vs-media {
          order: 0;
          position: absolute;
          inset: 0;
          width: auto;
        }
        .catalyst-vs-asset {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
        /* Two crops per slide, toggled by width rather than by JS — the
           portrait crop is purpose-built for a phone screen (a dark band
           reserved up top for copy) and would mis-crop badly if stretched
           across a desktop viewport, and vice versa. */
        .catalyst-vs-media-mobile { display: block; }
        .catalyst-vs-media-desktop { display: none; }

        /* Top-weighted scrim, since copy sits above the artwork here. The
           mobile crops already reserve a dark band for it, but the fourth
           pillar falls back to its (non pre-composed) video, so every slide
           gets this as a safety net rather than relying on the artwork
           alone. */
        .catalyst-vs-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(3,3,8,0.82) 0%,
            rgba(3,3,8,0.55) 34%,
            rgba(3,3,8,0.05) 55%,
            transparent 68%
          );
        }

        .catalyst-vs-rail { display: none; }

        /* Sized for a phone by default; the lg override below restores the
           original desktop scale (that one still leans on vw so it keeps
           scaling smoothly across very wide viewports). */
        .catalyst-vs-title { font-size: clamp(1.5rem, 6vw, 1.875rem); line-height: 1.16; }
        .catalyst-vs-body { font-size: 0.875rem; line-height: 1.6; max-width: none; }

        @media (min-width: 1024px) {
          .catalyst-vs-slide {
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding: 0;
          }
          .catalyst-vs-media { width: auto; }
          .catalyst-vs-asset {
            object-fit: contain;
            object-position: right center;
            transform-origin: right center;
          }
          .catalyst-vs-media-mobile { display: none; }
          .catalyst-vs-media-desktop { display: block; }

          /* Left-weighted so the artwork's focal side stays clear. */
          .catalyst-vs-scrim {
            background: linear-gradient(
              90deg,
              rgba(3,3,8,0.94) 0%,
              rgba(3,3,8,0.88) 34%,
              rgba(3,3,8,0.6) 50%,
              rgba(3,3,8,0.18) 64%,
              rgba(3,3,8,0) 76%
            );
          }

          .catalyst-vs-rail { display: flex; }

          .catalyst-vs-title { font-size: clamp(1.875rem, 3.8vw, 3rem); line-height: 1.12; }
          .catalyst-vs-body { font-size: clamp(1rem, 1.5vw, 1.125rem); line-height: 1.8; max-width: 34rem; }
        }

        /* Enterprise logo ticker */
        @keyframes catalystLogoMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .catalyst-logo-marquee { animation: catalystLogoMarquee 34s linear infinite; }
        .catalyst-logo-marquee:hover { animation-play-state: paused; }
        .catalyst-logo {
          opacity: 0.5;
          filter: grayscale(1);
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .catalyst-logo:hover {
          opacity: 1;
          filter: grayscale(0) drop-shadow(0 0 18px rgba(255,255,255,0.25));
        }
        @media (prefers-reduced-motion: reduce) {
          .catalyst-hero-anim { animation: none !important; }
          .catalyst-pillar-icon.is-in { animation: none !important; }
          .catalyst-logo-marquee { animation: none !important; }
        }
      `}</style>

      {/* ══════════════ HERO — particle ring assembly ══════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6" style={{ paddingTop: "6rem" }}>
          <ParticleRing />
          <div className="relative text-center max-w-3xl mx-auto catalyst-hero-anim" style={{ animation: "catalystHeroReveal 1s cubic-bezier(0.22,1,0.36,1) both" }}>
            <p
              className="font-light italic mb-5"
              style={{ fontSize: "0.9375rem", color: "rgba(111,145,255,0.85)" }}
            >
              ARQQA introduces
            </p>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              The Catalyst System
              <sup style={{ fontSize: "0.32em", top: "-2em" }}>™</sup>
            </h1>
            <p
              className="font-medium mt-7"
              style={{
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              One partner. One strategy. Infinite growth.
            </p>
            <p
              className="font-light mt-6 mx-auto"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "38rem",
              }}
            >
              This isn&apos;t another marketing service. It&apos;s the new
              architecture of digital growth. A complete engine designed to
              deliver guaranteed synergy between your social media,
              performance campaigns, and digital operations.
            </p>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            aria-hidden="true"
          >
            <span
              style={{
                fontSize: "0.5625rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "2.25rem",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              }}
            />
          </div>
        </section>

        {/* ══════════════ THE PROBLEM WE REPLACE ══════════════ */}
        <section
          className="relative px-6 overflow-hidden"
          style={{ padding: "clamp(3.25rem, 9vw, 8rem) 1.5rem" }}
        >
          {/* Black field — faded at top/bottom so it dissolves into the
              surrounding page gradient instead of cutting off with a hard edge */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "#000000",
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <Reveal>
              <Eyebrow>The Problem We Replace</Eyebrow>
              <h2
                className="font-bold mt-6"
                style={{
                  fontSize: "clamp(2.125rem, 3.9vw, 3.375rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Stop Buying Posts. Start Building a{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                  }}
                >
                  Growth Architecture
                </span>
                .
              </h2>
              <p
                className="font-light mt-7 max-w-xl"
                style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}
              >
                Traditional social media packages are built for activity, not
                accountability. The Catalyst System&trade; replaces fragmented
                agencies and static content plans with a unified, end-to-end
                growth engine designed to scale modern brands.
              </p>

              {/* Dual CTA — primary uses the same gradient-rim treatment as the
                  closing "Activate" button; secondary is a quiet outline. */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/start#book-strategy-call"
                  className="group relative inline-flex rounded-2xl"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                    boxShadow:
                      "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
                  }}
                >
                  <span
                    className="relative inline-flex items-center justify-center rounded-2xl font-medium"
                    style={{
                      padding: "0.9rem 1.9rem",
                      background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                      color: "#ffffff",
                      fontSize: "0.9375rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Book a Strategy Session
                  </span>
                </Link>

                <a
                  href="#the-system"
                  className="group inline-flex items-center gap-2 rounded-2xl font-medium transition-colors duration-300"
                  style={{
                    padding: "0.9rem 1.9rem",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.9375rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  Explore the System
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </Reveal>

            {/* Uploaded particle-cloud video — screen-blended onto the black
                background so only the glowing particles read, no video
                rectangle or frame. Sits in its own column, close to the text. */}
            <Reveal delay={0.15} className="flex justify-center lg:justify-start">
              <div
                className="relative"
                style={{ width: "min(40rem, 104%)", aspectRatio: "1 / 1" }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block w-full h-full object-contain"
                  style={{
                    mixBlendMode: "screen",
                    maskImage:
                      "radial-gradient(circle at 50% 50%, black 58%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 50%, black 58%, transparent 80%)",
                  }}
                >
                  <source src="/catalyst-problem.mp4" type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════ THE VALUE SHIFT — 4 PILLARS ══════════════ */}
        <section className="relative px-6 py-14 sm:py-24">
          <div className="relative max-w-6xl mx-auto">
            {/* Shared gradient for the four pillar icons */}
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
              <defs>
                <linearGradient id="valueShiftStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5aa2ff" />
                  <stop offset="50%" stopColor="#9fc8ff" />
                  <stop offset="100%" stopColor="#ff7a3d" />
                </linearGradient>
              </defs>
            </svg>

            <Reveal className="max-w-3xl mx-auto text-center">
              <Eyebrow>Core Value Proposition</Eyebrow>
              <h2
                className="font-bold mt-6"
                style={{
                  fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                The Value Shift: From Package Vendor to{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                  }}
                >
                  Growth Partner
                </span>
              </h2>
            </Reveal>

          </div>
        </section>

        {/* Four full-screen slides, one per pillar — pinned and scroll-driven
            at every width. */}
        <ValueShiftStory />

        {/* ══════════════ ENTERPRISE SOCIAL PROOF — LOGO TICKER ══════════════ */}
        <section className="relative overflow-hidden" style={{ padding: "clamp(2.75rem, 8vw, 5rem) 0" }}>
          <div className="relative max-w-4xl mx-auto text-center px-6 mb-14">
            <Reveal>
              <Eyebrow>Enterprise Client Social Proof</Eyebrow>
              <h2
                className="font-bold mt-6"
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                This Isn&rsquo;t Positioning. It&rsquo;s a{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                  }}
                >
                  Track Record
                </span>
                .
              </h2>
            </Reveal>
          </div>

          {/* Monochrome ticker — edges fade into the page field so the loop
              has no visible seam. Duplicated once for a seamless -50% loop. */}
          <div className="relative" aria-label="Enterprise client logos">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #030305 0%, transparent 100%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(270deg, #030305 0%, transparent 100%)" }}
            />
            <div className="catalyst-logo-marquee flex w-max items-center">
              {[...ENTERPRISE_LOGOS, ...ENTERPRISE_LOGOS].map((client, i) => (
                <span
                  key={i}
                  className="shrink-0 flex items-center justify-center"
                  style={{ padding: "0.5rem 2.75rem" }}
                >
                  {client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="catalyst-logo block"
                      style={{ height: "3rem", width: "auto" }}
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="catalyst-logo font-bold"
                      style={{
                        fontSize: "1.375rem",
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {client.name}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ THE 5 PHASES — DEEP DIVE ══════════════ */}
        <PhasesRail />

        {/* ══════════════ WHAT YOU GET ══════════════ */}
        <section className="relative px-6 py-14 sm:py-28 lg:py-36">
          {/* Shared gradient for the four card icons */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <defs>
              <linearGradient id="whatYouGetStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5aa2ff" />
                <stop offset="50%" stopColor="#9fc8ff" />
                <stop offset="100%" stopColor="#ff7a3d" />
              </linearGradient>
            </defs>
          </svg>

          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <Eyebrow>What You Get</Eyebrow>
              <h2
                className="font-bold mt-5"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Built for accountability, not activity.
              </h2>
            </Reveal>

            {/* Two per row at every size above mobile — 2x2 for four cards. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {WHAT_YOU_GET.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <WhatYouGetCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Offices — contact details, directly above the closing CTA ══ */}
        <OfficesSection />

        {/* ══════════════ CTA ══════════════ */}
        <section className="relative px-6 py-14 sm:py-24 lg:py-32 overflow-hidden">
          {/* Uploaded wave-mesh artwork — full-bleed section background, not
              clipped to the card, so it shows behind and around it */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url(/catalyst-cta-bg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 65%",
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          />

          <Reveal className="relative max-w-3xl mx-auto text-center">
            {/* Glass card — translucent, blurred, background image visible through/around it */}
            <div
              className="relative rounded-[2rem] px-8 py-16 sm:py-20 overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(14,16,26,0.45) 0%, rgba(6,8,14,0.55) 100%)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -30px rgba(0,0,0,0.7)",
              }}
            >
              <h2
                className="relative font-bold"
                style={{
                  fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Activate the Catalyst System
              </h2>
              <div className="relative mt-9">
                <Link
                  href="/start#book-strategy-call"
                  className="group relative inline-flex rounded-2xl"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                    boxShadow:
                      "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
                  }}
                >
                  <span
                    className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
                    style={{
                      padding: "1rem 2.25rem",
                      background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                      color: "#ffffff",
                      fontSize: "0.9375rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Book your strategy session
                    <span
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
    </>
  );
}

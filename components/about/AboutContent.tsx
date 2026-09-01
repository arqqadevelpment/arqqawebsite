"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

/* ── Content ── */

const MILESTONES = [
  { year: "2013", text: "Founded in Cairo. First client engagement." },
  { year: "2015", text: "Expanded service portfolio: performance + creative integration." },
  { year: "2017", text: "UAE market entry. First blue-chip client in Abu Dhabi." },
  { year: "2019", text: "Google Premier Partner certification achieved." },
  { year: "2020", text: "Pandemic-proof: zero client churn. Automated onboarding launched." },
  { year: "2022", text: "Saudi Arabia market entry. Nile Air → 83M SAR digital revenue." },
  { year: "2024", text: "Catalyst System™ formalized. CRM automation deployed across all engagements." },
  { year: "2026", text: "50+ team. 4 markets. Rebranded from agency to MarTech Growth System." },
];

const BELIEFS = [
  {
    title: "Trust is Built Through Systems",
    body: "Not promises. Not decks. Process, transparency, and performance — repeated.",
    accent: "blue" as const,
    /* Shield + check — trust */
    icon: (
      <>
        <path
          d="M12 2.8l7 2.6v5.4c0 4.6-3 8.4-7 10.4-4-2-7-5.8-7-10.4V5.4l7-2.6z"
          stroke="url(#beliefStroke)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M8.8 12l2.2 2.2 4.2-4.4"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Stability is the Ultimate Competitive Advantage",
    body: "In an industry defined by churn, longevity is power. 13 years across revolutions, pandemics, and volatility.",
    accent: "orange" as const,
    /* Pillar / anchor base — stability */
    icon: (
      <>
        <path
          d="M4.5 20.5h15M7.5 20.5V8.5M16.5 20.5V8.5"
          stroke="url(#beliefStroke)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M3.6 8.5L12 3.4l8.4 5.1"
          stroke="url(#beliefStroke)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.05)"
        />
        <path d="M12 8.8v8" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Marketing Must Become Operational",
    body: "Traditional agencies deliver tasks. We deliver systems. Automated workflows, unified teams, predictable performance cycles.",
    accent: "orange" as const,
    /* Gear / cycle — operations */
    icon: (
      <>
        <circle
          cx="12"
          cy="12"
          r="3.4"
          stroke="url(#beliefStroke)"
          strokeWidth="1.4"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M12 3.2v2.6M12 18.2v2.6M20.8 12h-2.6M5.8 12H3.2M18.2 5.8l-1.9 1.9M7.7 16.3l-1.9 1.9M18.2 18.2l-1.9-1.9M7.7 7.7L5.8 5.8"
          stroke="url(#beliefStroke)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Integration Drives Growth",
    body: "Creative, media, technology, automation, and CX must function as one engine. That's what transforms campaigns into business outcomes.",
    accent: "blue" as const,
    /* Linked nodes — integration */
    icon: (
      <>
        <circle cx="6" cy="7" r="2.6" stroke="url(#beliefStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.05)" />
        <circle cx="18" cy="7" r="2.6" stroke="url(#beliefStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.05)" />
        <circle cx="12" cy="17.5" r="2.6" stroke="url(#beliefStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.05)" />
        <path
          d="M8.4 8.4l2.2 6.8M15.6 8.4l-2.2 6.8M8.6 7h6.8"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

const STRUCTURE = [
  {
    title: "Growth Drivers",
    body: "Performance Marketing, Web & Mobile App Dev, BD & Sales, SEO.",
  },
  {
    title: "Operational Excellence",
    body: "Unified Creative Unit (Content, Motion, Creative). Joint sign-off and quality control.",
  },
  {
    title: "Client Success & Stability",
    body: "Separated Account Management from Customer Success for proactive strategic advisory.",
  },
  {
    title: "Governance",
    body: "HR and Finance maintain disciplined cost control and specialized talent acquisition.",
  },
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/* ── Shared reveal-on-scroll wrapper ── */
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

/* Core-belief card — glassy body, same family as the case-study cards */
function BeliefCard({ belief }: { belief: (typeof BELIEFS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = belief.accent === "orange";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full rounded-3xl overflow-hidden p-7"
      style={{
        background:
          "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: hovered
          ? "1px solid rgba(255,138,90,0.55)"
          : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.35), 0 24px 50px -22px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.25)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Ambient corner wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOrange
            ? "radial-gradient(55% 55% at 100% 0%, rgba(255,110,50,0.13) 0%, transparent 62%)"
            : "radial-gradient(55% 55% at 0% 0%, rgba(60,125,255,0.14) 0%, transparent 62%)",
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Icon — bare glyph, rim-lit blue → orange */}
      <div
        className="relative"
        style={{
          filter: "drop-shadow(0 0 8px rgba(90,162,255,0.45)) drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
          transform: hovered ? "translateY(-2px) scale(1.06)" : "none",
          transformOrigin: "left center",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          {belief.icon}
        </svg>
      </div>

      <h3
        className="relative font-bold mt-6"
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "#ffffff",
        }}
      >
        {belief.title}
      </h3>
      <p
        className="relative font-light mt-3"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.58)",
        }}
      >
        {belief.body}
      </p>
    </div>
  );
}

/* ══ Flowing wave timeline — scroll-driven line reveal ══ */

/* One continuous S-wave through the lower half of the stage
   (viewBox space: 1000 × 600 — the top band is reserved for the title).
   Built with a mirrored control point (S command) so the tangents stay
   continuous — one fluid arc, no tight hooks anywhere. */
const WAVE_PATH =
  "M -10 310 C 170 228, 340 236, 500 330 S 770 510, 1010 415";

/* Where each milestone sits along the path (fraction of total length) */
const FRACTIONS = MILESTONES.map((_, i) => 0.06 + i * (0.88 / (MILESTONES.length - 1)));

/* Which side of the line each label sits on */
const SIDES = [-1, 1, -1, 1, -1, 1, -1, 1];

function WaveTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [geom, setGeom] = useState<{
    total: number;
    points: { x: number; y: number }[];
  } | null>(null);

  /* Measure the path once — viewBox units are resolution-independent */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const points = FRACTIONS.map((f) => {
      const p = path.getPointAtLength(f * total);
      return { x: p.x, y: p.y };
    });
    setGeom({ total, points });
  }, []);

  /* Scroll → progress through the pinned stage */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let pending = false;

    function update() {
      pending = false;
      const rect = wrapper!.getBoundingClientRect();
      const scrollable = wrapper!.offsetHeight - window.innerHeight;
      setProgress(clamp01(-rect.top / scrollable));
    }
    function onScroll() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = geom?.total ?? 1;
  const head = progress * total;
  /* Latest milestone the head has reached = the "current" one */
  let current = -1;
  FRACTIONS.forEach((f, i) => {
    if (progress >= f - 0.015) current = i;
  });

  return (
    <div ref={wrapperRef} style={{ height: "380vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section title — clear, roomy band at the top of the stage */}
        <div
          className="absolute inset-x-0 text-center pointer-events-none px-6"
          style={{ top: "9%" }}
        >
          <Eyebrow>TIMELINE MILESTONES</Eyebrow>
          <h2
            className="font-bold mt-5"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Thirteen Years.{" "}
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
              One&nbsp;Journey.
            </span>
          </h2>
        </div>

        {/* The flowing line */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7a3d" />
              <stop offset="42%" stopColor="#ffd9c0" />
              <stop offset="65%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#5aa2ff" />
            </linearGradient>
            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* Ghost of the full journey — barely visible */}
          <path
            d={WAVE_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* Glow layer — revealed with scroll */}
          <path
            ref={pathRef}
            d={WAVE_PATH}
            fill="none"
            stroke="url(#waveStroke)"
            strokeWidth="6"
            filter="url(#waveGlow)"
            opacity="0.55"
            style={{
              strokeDasharray: `${head} ${total + 10}`,
            }}
          />
          {/* Crisp core line — revealed with scroll */}
          <path
            d={WAVE_PATH}
            fill="none"
            stroke="url(#waveStroke)"
            strokeWidth="2.25"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: `${head} ${total + 10}`,
            }}
          />

          {/* Milestone markers on the line */}
          {geom &&
            geom.points.map((p, i) => {
              const reached = i <= current;
              const isCurrent = i === current;
              return (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={isCurrent ? 7 : 4.5}
                  fill={
                    reached
                      ? isCurrent
                        ? "#ff7a3d"
                        : "#ffffff"
                      : "rgba(255,255,255,0.2)"
                  }
                  style={{
                    opacity: reached ? 1 : 0.35,
                    filter: isCurrent
                      ? "drop-shadow(0 0 10px rgba(255,122,61,0.9))"
                      : reached
                        ? "drop-shadow(0 0 5px rgba(255,255,255,0.5))"
                        : "none",
                    transition: "opacity 0.4s ease, r 0.3s ease",
                  }}
                />
              );
            })}
        </svg>

        {/* Milestone labels — attached to the line, fade in as reached */}
        {geom &&
          geom.points.map((p, i) => {
            const reached = i <= current;
            const isCurrent = i === current;
            /* -1 = above the line, 1 = below. Points on the low stretch of
               the wave always label upward so nothing crops at the bottom. */
            const side = p.y > 400 ? -1 : SIDES[i];
            const m = MILESTONES[i];
            const xPct = (p.x / 1000) * 100;
            /* Anchor the label to its own dot instead of clamping it sideways:
               near the edges it grows inward from the connector, in the middle
               it stays centered on it. The text always touches its own line. */
            const anchor: "left" | "center" | "right" =
              xPct > 66 ? "right" : xPct < 34 ? "left" : "center";
            /* Fade back neighbors that sit too close to the active milestone,
               so the current story always reads clean */
            const cur = current >= 0 ? geom.points[current] : null;
            const nearActive =
              !isCurrent &&
              cur !== null &&
              Math.hypot(p.x - cur.x, p.y - cur.y) < 200;
            return (
              <div
                key={m.year}
                className="absolute pointer-events-none"
                style={{
                  left: `${(p.x / 1000) * 100}%`,
                  top: `${(p.y / 600) * 100}%`,
                  zIndex: isCurrent ? 2 : 1,
                  opacity: reached ? (isCurrent ? 1 : nearActive ? 0.1 : 0.72) : 0,
                  transition: "opacity 0.6s ease",
                }}
              >
                {/* Hairline connector */}
                <span
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: "0",
                    width: "1px",
                    height: "2.5rem",
                    background:
                      side < 0
                        ? "linear-gradient(0deg, rgba(255,255,255,0.5), transparent)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)",
                    [side < 0 ? "bottom" : "top"]: "0.625rem",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    /* Grow from the connector: inward at the edges, centered
                       mid-curve — so the block always reads as attached */
                    ...(anchor === "right"
                      ? { right: "0.75rem" }
                      : anchor === "left"
                        ? { left: "0.75rem" }
                        : { left: "0", transform: "translateX(-50%)" }),
                    [side < 0 ? "bottom" : "top"]: "3.4rem",
                    width: "max-content",
                    maxWidth: "min(52vw, 16rem)",
                    textAlign: anchor,
                  }}
                >
                  <p
                    className="font-bold"
                    style={{
                      fontSize: "0.9375rem",
                      letterSpacing: "0.24em",
                      color: isCurrent ? "#ff9a5a" : "rgba(255,255,255,0.9)",
                      textShadow: isCurrent
                        ? "0 0 18px rgba(255,122,61,0.6), 0 1px 12px rgba(0,0,0,0.8)"
                        : "0 1px 12px rgba(0,0,0,0.8)",
                      transition: "color 0.4s ease, text-shadow 0.4s ease",
                    }}
                  >
                    {m.year}
                  </p>
                  {/* Description — only the active milestone tells its story,
                      so labels never pile up on top of each other */}
                  <p
                    className="font-light mt-2"
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.55,
                      color: "rgba(255,255,255,0.95)",
                      textShadow: "0 1px 10px rgba(0,0,0,0.8)",
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? "translateY(0)" : "translateY(6px)",
                      transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {m.text}
                  </p>
                </div>
              </div>
            );
          })}

        {/* Scroll hint — fades once the journey starts */}
        <div
          className="absolute bottom-7 inset-x-0 text-center pointer-events-none"
          style={{ opacity: 1 - clamp01(progress * 6) }}
          aria-hidden="true"
        >
          <span
            className="font-light"
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll to travel the journey
          </span>
        </div>
      </div>
    </div>
  );
}

export function AboutContent() {
  return (
    <>
      {/* ══ Section 1 — Origin Story ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "11rem 1.5rem 7rem" }}
      >
        {/* Background — light-burst artwork, rays on the right, faded edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/about-hero.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            maskImage:
              "linear-gradient(180deg, black 0%, black 52%, rgba(0,0,0,0.5) 74%, rgba(0,0,0,0.15) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 52%, rgba(0,0,0,0.5) 74%, rgba(0,0,0,0.15) 90%, transparent 100%)",
          }}
        />
        {/* Legibility scrim — heavier on the left where the text sits,
            fully transparent at the section edges so nothing reads as a seam */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,5,0.66) 0%, rgba(3,3,5,0.4) 40%, transparent 68%), linear-gradient(180deg, rgba(3,3,5,0.35) 0%, transparent 25%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Text — left aligned, wide measure */}
          <Reveal className="max-w-4xl">
            <Eyebrow className="mb-5">ORIGIN STORY</Eyebrow>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              }}
            >
              We Started in a Revolution.{" "}
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
                That Taught Us Everything About Resilience.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15} className="max-w-3xl mt-8">
            <p
              className="font-light"
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Founded in Cairo during one of the most volatile periods in the
              region&apos;s history, ARQQA didn&apos;t have the luxury of
              stability. We had to build it. Every framework, every process,
              every system we use today was forged under pressure — not in a
              boardroom, but in a market that punishes inconsistency.
            </p>
            <p
              className="font-medium mt-5"
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              We don&apos;t sell creativity alone. We sell the infrastructure
              that makes creativity reliable.
            </p>
            {/* Accent underline */}
            <span
              aria-hidden="true"
              className="block mt-8"
              style={{
                width: "3.5rem",
                height: "2px",
                borderRadius: "1px",
                background: "linear-gradient(90deg, #5aa2ff 0%, #ff7a3d 100%)",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ══ Flowing wave timeline — the journey, drawn by scroll ══ */}
      <WaveTimeline />

      {/* ══ Section 2 — Philosophy ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "7rem 1.5rem" }}
      >
        {/* Background — glass ring artwork, edges faded so sections stay continuous */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/philosophy-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 16%, black 38%, black 62%, rgba(0,0,0,0.45) 84%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 16%, black 38%, black 62%, rgba(0,0,0,0.45) 84%, transparent 100%)",
          }}
        />
        {/* Legibility scrim — transparent at the edges, never a hard line */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.42) 28%, rgba(3,3,5,0.42) 70%, transparent 100%)",
          }}
        />

        {/* Shared gradient for all belief icons */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="beliefStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5aa2ff" />
              <stop offset="50%" stopColor="#9fc8ff" />
              <stop offset="100%" stopColor="#ff7a3d" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 max-w-3xl mx-auto">
            <Eyebrow className="mb-5">PHILOSOPHY</Eyebrow>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Core{" "}
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
                Beliefs
              </span>
            </h2>
            <p
              className="font-light mt-5 mx-auto max-w-2xl"
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Four convictions shape every engagement we take on. They are not
              taglines — they are the operating rules that decide how we build,
              staff, and measure the work.
            </p>
          </Reveal>

          {/* Four glass cards, one row on desktop — no scrolling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.title} delay={Math.min(i * 0.1, 0.3)}>
                <BeliefCard belief={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Section 3 — The Team ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "7rem 1.5rem 8rem" }}
      >
        {/* Background — flowing light form anchored right, edges faded */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/team-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 14%, black 34%, black 66%, rgba(0,0,0,0.45) 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 14%, black 34%, black 66%, rgba(0,0,0,0.45) 86%, transparent 100%)",
          }}
        />
        {/* Legibility scrim — carries across the full width so copy stays
            readable over the bright light form, still edge-transparent */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.72) 45%, rgba(3,3,5,0.55) 75%, rgba(3,3,5,0.4) 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Top block — headline left, supporting copy + CTA right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal>
              <Eyebrow className="mb-5">THE TEAM</Eyebrow>
              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  textShadow: "0 2px 40px rgba(0,0,0,0.6)",
                }}
              >
                50 Specialists.{" "}
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
                  One Integrated Engine.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14} className="lg:pt-14">
              <p
                className="font-light"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.62)",
                }}
              >
                Our structure is our advantage. Separated Account Management
                from Customer Success. Unified Creative Unit with joint
                sign-off. Growth Drivers and Operational Excellence working in
                parallel. Every role exists for one reason: to make the system
                perform.
              </p>
              {/* CTA — quiet glass pill, like the reference */}
              <Link
                href="/start#book-strategy-call"
                className="inline-flex items-center gap-3 rounded-xl font-medium mt-8"
                style={{
                  padding: "0.8125rem 1.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  transition: "background 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,122,61,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,138,90,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                }}
              >
                Work with us
                <span aria-hidden="true" style={{ color: "#ff9a5a" }}>
                  ↗
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Structure row — four columns split by hairlines, reference style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20">
            {STRUCTURE.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.1, 0.3)}>
                <div
                  className="h-full"
                  style={{
                    padding: "0 1.75rem",
                    borderLeft:
                      i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <p
                    className="font-bold"
                    style={{
                      fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      textShadow: "0 1px 20px rgba(0,0,0,0.7)",
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="font-light mt-3"
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══ Section 4 — Culture ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "8rem 1.5rem 9rem" }}
      >
        {/* Background — glass ring artwork, edges faded */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/culture-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 16%, black 38%, black 64%, rgba(0,0,0,0.45) 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 16%, black 38%, black 64%, rgba(0,0,0,0.45) 86%, transparent 100%)",
          }}
        />
        {/* Legibility scrim — edge-transparent so sections stay continuous */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 26%, rgba(3,3,5,0.4) 72%, transparent 100%)",
          }}
        />

        {/* Glass container — same treatment as the case-study cards */}
        <div
          className="relative max-w-4xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)",
            background:
              "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          {/* Ambient corner washes inside the glass */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 0% 0%, rgba(60,125,255,0.12) 0%, transparent 62%), radial-gradient(50% 60% at 100% 100%, rgba(255,110,50,0.1) 0%, transparent 62%)",
            }}
          />
          <Reveal>
            <Eyebrow>CULTURE</Eyebrow>
            <p
              className="font-bold mt-6"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.65)",
              }}
            >
              We don&apos;t hire for roles.{" "}
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
                We hire for systems-thinking.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="font-light mt-7 mx-auto max-w-2xl"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Specialists who see the whole machine, not just their station. If
              you want to build systems that outlast campaigns — and work
              alongside people who measure themselves on outcomes — there&apos;s
              a seat here.
            </p>
          </Reveal>

          {/* CTA — gradient-rimmed pill with warm halo */}
          <Reveal delay={0.26}>
            <a
              href="mailto:hello@arqqa.net"
              className="group relative inline-flex rounded-2xl mt-10"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                boxShadow:
                  "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  width: "70%",
                  height: "1.5rem",
                  left: "15%",
                  top: "-1rem",
                  background:
                    "radial-gradient(50% 100% at 50% 100%, rgba(255,140,70,0.5) 0%, transparent 100%)",
                  filter: "blur(6px)",
                }}
              />
              <span
                className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
                style={{
                  padding: "0.9375rem 2.25rem",
                  background:
                    "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  letterSpacing: "0.01em",
                }}
              >
                Join the team
                <span aria-hidden="true" style={{ color: "#ff9a5a" }}>
                  ↗
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

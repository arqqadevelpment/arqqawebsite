"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "./portfolio-data";
import { getRelatedCaseStudies } from "./portfolio-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import Link from "next/link";

/* ── Shared reveal-on-scroll wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
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
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Reveal variant used for the Approach cards — settles in with a soft
   scale, on top of the usual fade + rise, for a slightly more premium entrance */
function RevealScale({
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
        height: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(22px) scale(0.94)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Reveal variant that slides in from the side — used for the Challenge
   section's supporting image */
function RevealSlide({
  children,
  delay = 0,
  className = "",
  from = "right",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "left" | "right";
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

  const offset = from === "right" ? "56px" : "-56px";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${offset})`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Results stat — counts up from 0 once scrolled into view. Falls back to a
   static value for formats with no leading number (e.g. "#1"). */
function CountStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);

  const match = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!match) return; // no leading number (e.g. "#1") — keep static
    const el = ref.current;
    if (!el) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          setDisplay(`${current.toFixed(decimals)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-bold block"
      style={{
        fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
        letterSpacing: "-0.02em",
        color: "#ffffff",
      }}
    >
      {match ? display : value}
    </span>
  );
}

/* Execution card — icon badge, hover lift + rim-light, staggered entrance */
function ExecutionCard({
  label,
  body,
  icon,
  delay,
}: {
  label: string;
  body: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealScale delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-full rounded-3xl p-7"
        style={{
          ...glass,
          border: hovered ? "1px solid rgba(255,138,90,0.5)" : glass.border,
          boxShadow: hovered
            ? "0 -12px 32px -16px rgba(255,122,61,0.35), 0 20px 40px -20px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.2)"
            : glass.boxShadow,
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-2xl"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            border: hovered ? "1px solid rgba(255,175,130,0.4)" : "1px solid rgba(255,255,255,0.14)",
            transition: "border-color 0.4s ease",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.4rem", height: "1.4rem" }}>
            {icon}
          </svg>
        </div>
        <p
          className="font-bold mt-5"
          style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </p>
        <p className="font-light mt-3" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
          {body}
        </p>
      </div>
    </RevealScale>
  );
}

/* Approach move card — lifts and picks up a warm rim-light on hover,
   matching the hover treatment used across the rest of the site */
function ApproachMoveCard({
  num,
  move,
  accentGlow,
}: {
  num: number;
  move: string;
  accentGlow: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full rounded-3xl p-7"
      style={{
        ...glass,
        border: hovered ? "1px solid rgba(255,138,90,0.5)" : glass.border,
        boxShadow: hovered
          ? "0 -12px 32px -16px rgba(255,122,61,0.35), 0 20px 40px -20px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.2)"
          : glass.boxShadow,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <span
        className="relative flex items-center justify-center rounded-full font-bold"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "0.8125rem",
          background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "#ffffff",
          boxShadow: `0 0 22px ${accentGlow}${hovered ? "0.55)" : "0.3)"}`,
          transition: "box-shadow 0.4s ease",
        }}
      >
        {String(num).padStart(2, "0")}
      </span>
      <p
        className="font-light mt-5"
        style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}
      >
        {move}
      </p>
    </div>
  );
}

/* Section eyebrow + headline, used by every block for a consistent rhythm.
   Centered, with the tail of the title picked out in the site's signature
   blue → orange gradient — same treatment used across the rest of the site. */
function SectionHead({
  eyebrow,
  title,
  accentTail,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accentTail?: string;
  body?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl mb-14 ${centered ? "mx-auto text-center" : ""}`}>
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <h2
        className="font-bold"
        style={{
          fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        {title}
        {accentTail && (
          <>
            {" "}
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
          </>
        )}
      </h2>
      {body && (
        <p
          className={`font-light mt-5 ${centered ? "mx-auto" : ""}`}
          style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* Glass surface shared by every card in the template */
const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  const related = getRelatedCaseStudies(caseStudy.related);
  const isOrange = caseStudy.accent === "orange";
  const accentGlow = isOrange ? "rgba(255,110,50," : "rgba(60,125,255,";

  return (
    <>
      <style>{`
        @keyframes challengeImageFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.015); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="challengeImageFloat"] { animation: none !important; }
        }
      `}</style>

      {/* ══ 1 · Hero Banner — full viewport height ══ */}
      <section
        className="relative w-full overflow-hidden flex items-center"
        style={{ minHeight: "100vh", padding: "9rem 1.5rem 5rem" }}
      >
        {/* Full-bleed background — the case study's own image when available,
            otherwise the accent wash used across every other case study */}
        {caseStudy.heroImage ? (
          <>
            {/* Shown as close to "as-is" as a full-bleed crop allows: cover,
                centered, no extra zoom — position nudges the framing instead */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${caseStudy.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "60% 35%",
                maskImage:
                  "linear-gradient(180deg, black 0%, black 55%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.2) 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 55%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.2) 94%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(3,3,5,0.88) 0%, rgba(3,3,5,0.68) 35%, rgba(3,3,5,0.3) 60%, rgba(3,3,5,0.05) 82%, transparent 100%)",
                maskImage: "linear-gradient(180deg, black 0%, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 65%, transparent 100%)",
              }}
            />
            {/* Flattens the last stretch of the hero to the page's own base
                color — guarantees a seamless blend into the next section
                regardless of how bright/dark the photo is at that edge */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 62%, #030305 96%, #030305 100%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isOrange
                ? "radial-gradient(65% 55% at 85% 0%, rgba(255,110,50,0.28) 0%, rgba(224,60,40,0.1) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(255,90,43,0.16) 0%, transparent 70%)"
                : "radial-gradient(65% 55% at 85% 0%, rgba(60,125,255,0.3) 0%, rgba(20,50,160,0.12) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(90,162,255,0.16) 0%, transparent 70%)",
            }}
          />
        )}
        {/* No section-local grid overlay here — the page-level wrapper
            already draws one continuous grid across the whole page, so a
            second, differently-sized grid scoped to just the Hero would
            create a density mismatch right at this section's edge. */}

        <div className="relative max-w-6xl mx-auto" style={{ marginLeft: "auto", marginRight: "auto", transform: "translateX(clamp(-2.5rem, -3vw, -1rem))" }}>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span aria-hidden="true">←</span> All Work
            </Link>

            <p
              className="font-bold mt-8"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                backgroundImage:
                  "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {caseStudy.industry} · {caseStudy.market}
            </p>

            <h1
              className="font-bold mt-4 max-w-4xl"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              }}
            >
              {caseStudy.heroLine}
            </h1>

            <p
              className="font-light mt-6 max-w-2xl"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.1875rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.68)" }}
            >
              {caseStudy.summary}
            </p>

            {/* Meta row — client / services */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-9">
              <div>
                <p
                  className="font-light"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
                >
                  Client
                </p>
                <p className="font-medium mt-1" style={{ fontSize: "1rem", color: "#ffffff" }}>
                  {caseStudy.client}
                </p>
              </div>
              <div>
                <p
                  className="font-light"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
                >
                  Services
                </p>
                <p className="font-medium mt-1" style={{ fontSize: "1rem", color: "#ffffff" }}>
                  {caseStudy.services.join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2 · The Challenge ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem 2rem" }}>
        <div className="relative max-w-6xl mx-auto">
          {caseStudy.challengeImage ? (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
              <Reveal>
                <Eyebrow className="mb-5">THE CHALLENGE</Eyebrow>
                <h2
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  What was{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                    }}
                  >
                    broken.
                  </span>
                </h2>
                <p
                  className="font-light mt-4"
                  style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)", maxWidth: "34rem" }}
                >
                  {caseStudy.challenge}
                </p>
              </Reveal>
              <RevealSlide delay={0.15} from="right" className="flex justify-center lg:justify-end">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    width: "min(34rem, 100%)",
                    aspectRatio: "4 / 3",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 24px 60px -24px rgba(20,60,200,0.45)",
                    animation: "challengeImageFloat 6s ease-in-out 1.1s infinite",
                  }}
                >
                  <Image
                    src={caseStudy.challengeImage}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 34rem"
                    className="object-cover"
                  />
                </div>
              </RevealSlide>
            </div>
          ) : (
            <Reveal className="max-w-3xl mx-auto text-center">
              <p
                className="font-light"
                style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
              >
                {caseStudy.challenge}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ 3 · The Approach ══ */}
      <section className="relative w-full" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="THE APPROACH" title="How Catalyst" accentTail="activated." body={caseStudy.approach.body} />

          <div className="relative">
            {/* Connector rail — fades in with the row once scrolled into view */}
            <Reveal
              className="hidden lg:block absolute pointer-events-none"
              style={{ top: "3.25rem", left: "8%", right: "8%" }}
            >
              <div
                aria-hidden="true"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 12%, rgba(255,255,255,0.18) 88%, transparent 100%)",
                }}
              />
            </Reveal>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {caseStudy.approach.moves.map((move, i) => (
                <RevealScale key={move} delay={Math.min(i * 0.12, 0.36)}>
                  <ApproachMoveCard num={i + 1} move={move} accentGlow={accentGlow} />
                </RevealScale>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4 · The Execution ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 6rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="THE EXECUTION" title="Channels, craft," accentTail="and timeline." />

          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <defs>
              <linearGradient id="execIconStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5aa2ff" />
                <stop offset="50%" stopColor="#9fc8ff" />
                <stop offset="100%" stopColor="#ff7a3d" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ExecutionCard
              delay={0}
              label="Channels"
              body={caseStudy.execution.channels.join(" · ")}
              icon={
                <path
                  d="M3 11l16-6-4 16-4-6-6-2 -2-2z M9 15l4-4"
                  stroke="url(#execIconStroke)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="rgba(255,255,255,0.04)"
                />
              }
            />
            <ExecutionCard
              delay={0.08}
              label="Creative"
              body={caseStudy.execution.creative}
              icon={
                <>
                  <path
                    d="M4 20l1-4.2L15.8 5 19 8.2 8.2 19 4 20z"
                    stroke="url(#execIconStroke)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.04)"
                  />
                  <path d="M13.2 6.6l4.2 4.2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
                </>
              }
            />
            <ExecutionCard
              delay={0.16}
              label="Technology"
              body={caseStudy.execution.technology}
              icon={
                <>
                  <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" stroke="url(#execIconStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.04)" />
                  <path
                    d="M12 3.6v2.4M12 18v2.4M20.4 12H18M6 12H3.6M17 7l-1.6 1.6M8.6 15.4L7 17M17 17l-1.6-1.6M8.6 8.6L7 7"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </>
              }
            />
            <ExecutionCard
              delay={0.24}
              label="Timeline & Team"
              body={`${caseStudy.execution.timeline} ${caseStudy.execution.team}`}
              icon={
                <>
                  <circle cx="9" cy="8.5" r="2.6" stroke="url(#execIconStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.04)" />
                  <path
                    d="M4 19c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6"
                    stroke="url(#execIconStroke)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="8" r="2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" fill="none" />
                  <path
                    d="M14.5 14.6c2.4.3 4 1.9 4 4.4"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ══ 5 · The Results ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "6rem 1.5rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(55% 55% at 100% 0%, rgba(255,110,50,0.1) 0%, transparent 62%)"
              : "radial-gradient(55% 55% at 0% 0%, rgba(60,125,255,0.11) 0%, transparent 62%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="THE RESULTS" title="Hard numbers," accentTail="not adjectives." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.results.map((stat, i) => (
              <Reveal key={stat.label} delay={Math.min(i * 0.08, 0.3)}>
                <div>
                  <CountStat value={stat.value} />
                  <p
                    className="font-light mt-2"
                    style={{ fontSize: "0.875rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · Client Voice ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "2rem 1.5rem 7rem" }}>
        {/* Custom abstract gradient — blue + orange brand glow, no stock photo.
            Faded top/bottom so it dissolves into the sections above/below
            instead of ending as a hard-edged rectangle. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(46% 60% at 12% 20%, rgba(60,125,255,0.22) 0%, rgba(20,50,160,0.08) 45%, transparent 75%), radial-gradient(50% 65% at 90% 85%, rgba(255,122,61,0.2) 0%, rgba(224,60,40,0.07) 45%, transparent 75%), radial-gradient(70% 50% at 50% 50%, rgba(111,91,224,0.1) 0%, transparent 70%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(3,3,6,0.3) 100%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />

        <Reveal className="relative max-w-3xl mx-auto text-center rounded-[2rem] overflow-hidden">
          <div
            className="relative"
            style={{
              padding: "clamp(2.75rem, 5vw, 3.75rem) clamp(1.75rem, 4vw, 3.25rem)",
              background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.04) 100%)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 40px rgba(255,255,255,0.02), 0 -14px 50px -24px rgba(90,162,255,0.3), 0 24px 60px -24px rgba(255,122,61,0.22)",
            }}
          >
            {/* Subtle top sheen — reinforces the glass read */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: "40%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
              }}
            />
            <span
              aria-hidden="true"
              className="relative"
              style={{
                fontSize: "3rem",
                lineHeight: 1,
                color: "rgba(255,255,255,0.2)",
                fontFamily: "Georgia, serif",
              }}
            >
              &ldquo;
            </span>
            <p
              className="relative font-light -mt-4"
              style={{ fontSize: "1.1875rem", lineHeight: 1.65, color: "#ffffff" }}
            >
              {caseStudy.testimonial.quote}
            </p>
            <p
              className="relative font-medium mt-6"
              style={{ fontSize: "0.8125rem", letterSpacing: "0.05em", color: "rgba(255,255,255,0.55)" }}
            >
              {caseStudy.testimonial.role}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══ 7 · Related Work ══ */}
      {related.length > 0 && (
        <section className="relative w-full" style={{ padding: "2rem 1.5rem 7rem" }}>
          <div className="relative max-w-6xl mx-auto">
            <SectionHead eyebrow="RELATED WORK" title="More proof," accentTail="same system." />
            <div
              className={
                related.length >= 3
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
              }
            >
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={Math.min(i * 0.1, 0.3)}>
                  <RelatedCard caseStudy={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 8 · CTA — dual harvest + nurture ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "2rem 1.5rem 9rem" }}>
        {caseStudy.ctaImage ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${caseStudy.ctaImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(60,125,255,0.12) 0%, transparent 62%)",
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          />
        )}
        <div
          className="relative max-w-4xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)",
            background: "linear-gradient(170deg, rgba(20,22,34,0.38) 0%, rgba(8,10,18,0.46) 100%)",
            backdropFilter: "blur(28px) saturate(140%)",
            WebkitBackdropFilter: "blur(28px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)", lineHeight: 1.18, letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Ready to write{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                your own results
              </span>{" "}
              chapter?
            </h2>
            <p className="font-light mt-6 mx-auto max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
              Start with a discovery call, or take the {caseStudy.industry.toLowerCase()} playbook and pressure-test the thinking on your own terms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
              <Link
                href="/start#book-strategy-call"
                className="group relative inline-flex rounded-2xl"
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
                    padding: "1rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  Start Your Growth Story
                </span>
              </Link>

              <Link
                href="/start#growth-audit"
                className="inline-flex items-center justify-center rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                Download the {caseStudy.industry} Playbook
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Related-case-study card — links across to a sibling case study */
function RelatedCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = caseStudy.accent === "orange";

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-3xl overflow-hidden"
      style={{
        ...glass,
        minHeight: "13rem",
        border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOrange
            ? "radial-gradient(55% 55% at 100% 0%, rgba(255,110,50,0.12) 0%, transparent 62%)"
            : "radial-gradient(55% 55% at 0% 0%, rgba(60,125,255,0.13) 0%, transparent 62%)",
        }}
      />
      <div className="relative p-7 flex flex-col h-full">
        <span
          className="font-bold"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {caseStudy.industry}
        </span>
        <h3 className="font-bold mt-3" style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}>
          {caseStudy.client}
        </h3>
        <p className="font-light mt-3" style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
          {caseStudy.heroLine}
        </p>
        <span
          className="inline-flex items-center gap-2 font-medium mt-auto pt-6"
          style={{ fontSize: "0.8125rem", color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)" }}
        >
          Read the case study
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300"
            style={{ transform: hovered ? "translateX(3px)" : "none" }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

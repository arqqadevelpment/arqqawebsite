"use client";

import { useEffect, useRef, useState } from "react";
import type { Industry } from "./industries-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

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

/* Section eyebrow + centered headline, tail picked out in the site's
   signature blue → orange gradient */
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
    <Reveal className="max-w-3xl mx-auto text-center mb-14">
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
          className="font-light mt-5 mx-auto"
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

/* Hover-lift card used for both Approach moves and Services deployed */
function HoverCard({
  children,
  accentGlow,
}: {
  children: React.ReactNode;
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
          ? `0 -12px 32px -16px ${accentGlow}0.4), 0 20px 40px -20px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.2)`
          : glass.boxShadow,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const isOrange = industry.accent === "orange";
  const accentGlow = isOrange ? "rgba(255,110,50," : "rgba(60,125,255,";

  return (
    <>
      {/* ══ 1 · Hero — headline + credibility stat ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 6rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(65% 55% at 85% 0%, rgba(255,110,50,0.28) 0%, rgba(224,60,40,0.1) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(255,90,43,0.16) 0%, transparent 70%)"
              : "radial-gradient(65% 55% at 85% 0%, rgba(60,125,255,0.3) 0%, rgba(20,50,160,0.12) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(90,162,255,0.16) 0%, transparent 70%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span aria-hidden="true">←</span> All Industries
            </Link>

            <p
              className="font-bold mt-8"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {industry.name}
            </p>

            <h1
              className="font-bold mt-4 mx-auto"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                maxWidth: "44rem",
              }}
            >
              {industry.heroHeadline}
            </h1>

            <div className="inline-flex items-baseline gap-3 mt-9">
              <span
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.02em",
                  backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {industry.credibilityStat.value}
              </span>
              <span
                className="font-light text-left"
                style={{ fontSize: "0.9375rem", lineHeight: 1.5, color: "rgba(255,255,255,0.6)", maxWidth: "18rem" }}
              >
                {industry.credibilityStat.label}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2 · The Problem in This Sector ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem 2rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="THE PROBLEM IN THIS SECTOR"
            title={industry.problem.heading.slice(0, industry.problem.heading.lastIndexOf(" "))}
            accentTail={industry.problem.heading.slice(industry.problem.heading.lastIndexOf(" ") + 1)}
            body={industry.problem.body}
          />
        </div>
      </section>

      {/* ══ 3 · Our Approach ══ */}
      <section className="relative w-full" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="OUR APPROACH" title="How we" accentTail="deploy it." body={industry.approach.body} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.approach.moves.map((move, i) => (
              <Reveal key={move} delay={Math.min(i * 0.1, 0.32)}>
                <HoverCard accentGlow={accentGlow}>
                  <span
                    className="relative flex items-center justify-center rounded-full font-bold"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      fontSize: "0.8125rem",
                      background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: "#ffffff",
                      boxShadow: `0 0 22px ${accentGlow}0.3)`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-light mt-5"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}
                  >
                    {move}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4 · Featured Case Study ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "2rem 1.5rem 6rem" }}>
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
          <SectionHead eyebrow="FEATURED CASE STUDY" title="Proof," accentTail="not theory." />

          <Reveal>
            <div className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row" style={glass}>
              <div className="relative flex-1 p-10 lg:p-12 flex flex-col justify-center">
                <p
                  className="font-light"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}
                >
                  {industry.featuredCaseStudy.market}
                </p>
                <h3 className="font-bold mt-4" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
                  {industry.featuredCaseStudy.client}
                </h3>
                <p
                  className="font-light mt-4"
                  style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}
                >
                  {industry.featuredCaseStudy.body}
                </p>
                {industry.featuredCaseStudy.workSlug && (
                  <Link
                    href={`/work/${industry.featuredCaseStudy.workSlug}`}
                    className="inline-flex items-center gap-2 font-medium mt-8 self-start"
                    style={{
                      fontSize: "0.875rem",
                      color: "#ffffff",
                      borderBottom: "1px solid rgba(255,138,90,0.6)",
                      paddingBottom: "3px",
                    }}
                  >
                    Read the full case study
                    <span aria-hidden="true" style={{ color: "#ff9a5a" }}>
                      →
                    </span>
                  </Link>
                )}
              </div>
              <div
                className="relative flex-[0.9] p-10 lg:p-12 flex items-center justify-center"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p
                  className="font-bold text-center"
                  style={{
                    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                    backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {industry.featuredCaseStudy.result}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 5 · Services We Deploy ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 6rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="SERVICES WE DEPLOY" title="Built for" accentTail="this sector." />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.services.map((service, i) => (
              <Reveal key={service} delay={Math.min(i * 0.08, 0.3)}>
                <HoverCard accentGlow={accentGlow}>
                  <p className="font-medium" style={{ fontSize: "0.9375rem", lineHeight: 1.5, color: "#ffffff" }}>
                    {service}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · CTA — dual harvest + nurture ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "2rem 1.5rem 9rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(50% 60% at 50% 0%, rgba(60,125,255,0.12) 0%, transparent 62%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
        <div
          className="relative max-w-4xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)",
            background: "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)", lineHeight: 1.18, letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Ready to build inside{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                {industry.name}
              </span>
              ?
            </h2>
            <p className="font-light mt-6 mx-auto max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
              Start with a discovery call, or take the playbook and pressure-test the thinking on your own terms.
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
                  Book a Strategy Call
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
                Download: {industry.playbook}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

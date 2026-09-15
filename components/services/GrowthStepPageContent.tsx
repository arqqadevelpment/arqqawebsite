"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { GrowthStep, SubService } from "./growth-steps-data";
import { GROWTH_STEPS } from "./growth-steps-data";

/* ── Shared reveal-on-scroll wrapper — same timing as ApproachPageTemplate ── */
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
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

/* Hero jump-nav pill — brightens and lifts slightly on hover/focus so the
   row reads as interactive, matching the hover treatment used on cards
   elsewhere on the site. */
function JumpChip({
  href,
  label,
  isOrange,
}: {
  href: string;
  label: string;
  isOrange: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="rounded-full font-medium"
      style={{
        padding: "0.5rem 1rem",
        fontSize: "0.8125rem",
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.72)",
        background: hovered ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
        border: hovered
          ? `1px solid ${isOrange ? "rgba(255,138,90,0.55)" : "rgba(120,170,255,0.55)"}`
          : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hovered
          ? `0 4px 16px -4px ${isOrange ? "rgba(255,122,61,0.35)" : "rgba(47,107,255,0.35)"}`
          : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
      }}
    >
      {label}
    </a>
  );
}

const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

/* Mobile hero headlines vary from ~48 to ~62 characters — a single fixed
   min font size either wastes space on short headlines or overflows to a
   3rd line on long ones, so the floor of the clamp scales down with length. */
function heroHeadlineMinRem(headline: string) {
  const px = Math.max(15, Math.min(28, 46 - 0.43 * headline.length));
  return px / 16;
}

/* Card surface shared by every sub-service section: the uploaded
   Sections-bg.png sits behind a dark tint (kept legible), with a hover
   lift + accent glow matching the Growth Ecosystem cards on /services. */
function cardSurface(hovered: boolean, isOrange: boolean): React.CSSProperties {
  return {
    background:
      "linear-gradient(170deg, rgba(10,11,18,0.86) 0%, rgba(5,6,11,0.92) 100%), url(/Sections-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: hovered
      ? `1px solid ${isOrange ? "rgba(255,138,90,0.5)" : "rgba(120,170,255,0.5)"}`
      : "1px solid rgba(255,255,255,0.11)",
    boxShadow: hovered
      ? "0 -14px 40px -18px rgba(255,122,61,0.25), 0 24px 50px -22px rgba(47,107,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"
      : "inset 0 1px 0 rgba(255,255,255,0.05)",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    transition:
      "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
  };
}

/* One sub-service, each its own hover-animated card on a shared background
   image. Cross-link stubs (no body/bullets, just a pointer to the real
   section on another Step's page) render as a compact "Also See" card
   instead. */
function SubServiceSection({
  sub,
  accent,
}: {
  sub: SubService;
  accent: "blue" | "orange";
}) {
  const isOrange = accent === "orange";
  const [hovered, setHovered] = useState(false);

  if (sub.crossLinkHref) {
    return (
      <section
        id={sub.slug}
        className="relative w-full"
        style={{ padding: "1.25rem 1.5rem", scrollMarginTop: "6rem" }}
      >
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative overflow-hidden rounded-3xl px-8 py-6 text-center"
              style={cardSurface(hovered, isOrange)}
            >
              <p
                className="font-semibold"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Also See: {sub.title}
              </p>
              <p
                className="font-light mt-4"
                style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}
              >
                {sub.body}
              </p>
              <Link
                href={sub.crossLinkHref}
                className="inline-flex items-center gap-2 font-medium mt-6"
                style={{ fontSize: "0.9375rem", color: isOrange ? "#ffb894" : "#9fc8ff" }}
              >
                See the full section
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id={sub.slug}
      className="relative w-full"
      style={{ padding: "1.25rem 1.5rem", scrollMarginTop: "6rem" }}
    >
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden rounded-3xl"
            style={{ ...cardSurface(hovered, isOrange), padding: "2.25rem 2.75rem" }}
          >
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.125rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              {sub.title}
            </h2>

            <div
              className="mt-4 pl-4"
              style={{ borderLeft: `2px solid ${isOrange ? "rgba(255,122,61,0.75)" : "rgba(90,162,255,0.75)"}` }}
            >
              <p
                className="font-light"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Category Entry Point
              </p>
              <p
                className="font-medium mt-1 italic"
                style={{ fontSize: "1rem", color: isOrange ? "#ffb894" : "#9fc8ff" }}
              >
                &ldquo;{sub.cep}&rdquo;
              </p>
            </div>

            <p
              className="font-light mt-5"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}
            >
              {sub.body}
            </p>

            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
              {sub.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="shrink-0"
                    style={{
                      marginTop: "0.55rem",
                      width: "5px",
                      height: "5px",
                      borderRadius: "999px",
                      background: isOrange ? "#ff9a5a" : "#5aa2ff",
                    }}
                  />
                  <span className="font-light" style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.68)" }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {sub.proof && (
              <p
                className="font-light mt-5"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  paddingTop: "1.125rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Proof:{" "}
                </span>
                {sub.proof}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function GrowthStepPageContent({ step }: { step: GrowthStep }) {
  const isOrange = step.accent === "orange";
  const stepIndex = GROWTH_STEPS.findIndex((s) => s.slug === step.slug);
  const stepNumber = stepIndex + 1;

  return (
    <>
      {/* Shared gradient for every icon on the page */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="growthEcosystemStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5aa2ff" />
            <stop offset="50%" stopColor="#9fc8ff" />
            <stop offset="100%" stopColor="#ff7a3d" />
          </linearGradient>
        </defs>
      </svg>

      {/* ══ Hero ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 5rem" }}>
        {/* Every atmospheric layer (image, accent glow, dimming) shares this
           same fade mask so they all dissolve together into the page
           background — no single layer stops short and leaves a hard edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${step.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(180deg, transparent 0%, black 24%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 24%, black 55%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(65% 55% at 85% 0%, rgba(255,110,50,0.16) 0%, transparent 65%)"
              : "radial-gradient(65% 55% at 85% 0%, rgba(60,125,255,0.18) 0%, transparent 65%)",
            maskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          }}
        />
        {/* Even dimming across the image, fading out with it */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(3,3,5,0.45)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 24%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 24%, black 55%, transparent 100%)",
          }}
        />
        {/* Legibility scrim behind the copy column only */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "70%",
            background: "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.3) 60%, transparent 100%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span aria-hidden="true">&larr;</span> All Services
            </Link>

            <div className="mt-6">
              <Eyebrow>{`Step ${stepNumber} of 4 · ${step.title}`}</Eyebrow>
            </div>

            <h1
              className="font-bold mt-6 mx-auto"
              style={{
                fontSize: `clamp(${heroHeadlineMinRem(step.heroHeadline).toFixed(3)}rem, 5.4vw, 3.25rem)`,
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                maxWidth: "46rem",
                textWrap: "balance",
              }}
            >
              {step.heroHeadline}
            </h1>

            <p
              className="font-light mt-6 mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "38rem" }}
            >
              {step.heroSub}
            </p>
          </Reveal>

          {/* What's covered — jump links straight to each section */}
          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {step.subServices.map((sub) => (
              <JumpChip key={sub.slug} href={`#${sub.slug}`} label={sub.title} isOrange={isOrange} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ Every sub-service, its own titled card ══ */}
      {step.subServices.map((sub) => (
        <SubServiceSection key={sub.slug} sub={sub} accent={step.accent} />
      ))}

      {/* ══ Closing CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "7rem 1.5rem 8rem" }}>
        {/* Faded top and bottom so the section blends into the page like
            the hero does, instead of showing a hard photo-edge seam. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/CTA-Section.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(3,3,5,0.35)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="rounded-3xl" style={{ ...glass, padding: "3rem 2rem" }}>
              <h2
                className="font-bold"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#ffffff" }}
              >
                Ready to start with {step.title}?
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                {/* Gradient-border pill — same construction as the primary
                    CTA used across the site's other service pages. */}
                <Link
                  href="/start#book-strategy-call"
                  className="relative inline-flex rounded-2xl"
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
                    className="relative inline-flex items-center justify-center rounded-2xl font-medium"
                    style={{
                      padding: "0.9375rem 2.25rem",
                      background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                      color: "#ffffff",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {step.ctaPrimaryLabel}
                  </span>
                </Link>

                {step.ctaSecondaryLabel && (
                  <Link
                    href="/start"
                    className="inline-flex items-center gap-2 font-medium"
                    style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)" }}
                  >
                    {step.ctaSecondaryLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES, INDUSTRY_FILTERS } from "./portfolio-data";
import type { CaseStudy } from "./portfolio-data";
import { SHOWCASE_PROJECTS } from "@/components/showcase/showcase-data";
import type { ShowcaseProject } from "@/components/showcase/showcase-data";
import { PERFORMANCE_CASE_STUDIES } from "@/components/case-studies/case-study-data";
import type { PerformanceCaseStudy } from "@/components/case-studies/case-study-data";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ── Client mark, shown at the top of every hub card ──────────────────────
   Draws from /logos/clients/trimmed, where each mark has had its transparent
   margin cropped. The source files carry wildly different amounts of internal
   whitespace — from 28% of the canvas filled to 91% — so rendering those
   directly makes some marks look half the size of others on an identical
   frame. Trimming first means one box sizes them all, with no per-logo fudge
   factors to keep in sync.

   The box caps height AND width so the two shapes in the set balance: wide
   wordmarks run out of width first, square emblems run out of height first.
   Capping only height would render a 6:1 wordmark six times the width of a
   square mark. Cards whose client has no logo file render nothing and keep
   their existing layout. */

/* Marks close to square are height-limited, so they cover far less area than a
   wide wordmark on the same frame and read as smaller. These get a larger cap
   to even that out optically. The wrapper is tall enough for the biggest of
   them, so every card keeps identical spacing regardless. */
const LOGO_BUMPED = ["ebc", "allure", "nile-air"];

function CardLogo({
  src,
  client,
  hovered,
}: {
  src?: string;
  client: string;
  hovered: boolean;
}) {
  if (!src) return null;
  const file = src.split("/").pop()?.replace(".webp", "") ?? "";
  const bumped = LOGO_BUMPED.includes(file);

  return (
    <span
      className="flex items-center justify-end shrink-0"
      style={{ height: "2.25rem" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src.replace("/logos/clients/", "/logos/clients/trimmed/")}
        alt={`${client} logo`}
        style={{
          maxHeight: bumped ? "2.25rem" : "1.75rem",
          maxWidth: bumped ? "9rem" : "7.5rem",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.35s ease",
        }}
      />
    </span>
  );
}

/* ── Card header — category line and client mark on one row ───────────────
   Top-aligned so the copy starts on the logo's top edge rather than below it,
   which is what keeps the left column reading as one continuous block. */
function CardHeader({
  eyebrow,
  logo,
  client,
  hovered,
}: {
  eyebrow: React.ReactNode;
  logo?: string;
  client: string;
  hovered: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
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
        {eyebrow}
      </span>
      <CardLogo src={logo} client={client} hovered={hovered} />
    </div>
  );
}

/* Light wash laid over the revealed image on hover — enough to carry white
   text and the CTA, well short of the old treatment that dropped the image to
   42% opacity under a near-opaque scrim. */
const HOVER_DIM = "rgba(4,5,10,0.38)";

/* ── Hover state — client name and the call to action, centred ────────────
   On hover the card's detail fades out and this takes its place over the
   image, which is revealed at full opacity under HOVER_DIM. A text shadow and
   a pill behind the CTA do the rest of the legibility work.

   Purely a restatement of copy the card already renders underneath, so it is
   hidden from assistive tech to avoid announcing the client name twice. */
function CardHoverPanel({
  title,
  cta,
  hovered,
}: {
  title: string;
  cta: string;
  hovered: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center pointer-events-none"
      style={{
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <h3
        className="font-bold"
        style={{
          fontSize: "1.5rem",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#ffffff",
          /* Layered tight-to-wide so the name holds up over a busy photo
             without a scrim over the image. */
          textShadow:
            "0 1px 2px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 0 22px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.7)",
        }}
      >
        {title}
      </h3>
      {/* No backdrop-filter here on purpose. The card already carries
          blur(20px), and Chrome clips a nested backdrop-filter to the square
          border-box rather than the rounded one — which showed up as squared
          corners and a visible seam around this pill. A flat translucent fill
          gets the same separation with nothing to glitch. */}
      <span
        className="inline-flex items-center gap-2 rounded-full font-medium"
        style={{
          padding: "0.6rem 1.3rem",
          fontSize: "0.8125rem",
          color: "#ffffff",
          background: "rgba(8,10,18,0.72)",
          border: "1px solid rgba(255,255,255,0.55)",
        }}
      >
        {cta}
        <span aria-hidden="true">→</span>
      </span>
    </div>
  );
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
      { threshold: 0.15 }
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
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Portfolio card — hovering smoothly reveals the client's image behind the copy */
function CaseStudyCard({ caseStudy, delay }: { caseStudy: CaseStudy; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = caseStudy.accent === "orange";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/work/${caseStudy.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "20rem",
          background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Client image — hidden by default, revealed at full opacity on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${caseStudy.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(1.08)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Accent wash — clears on hover so nothing tints the image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(60% 60% at 100% 0%, rgba(255,110,50,0.14) 0%, transparent 65%)"
              : "radial-gradient(60% 60% at 0% 0%, rgba(60,125,255,0.15) 0%, transparent 65%)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Light wash so the name and CTA carry over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: HOVER_DIM,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <CardHoverPanel title={caseStudy.client} cta="Read the case study" hovered={hovered} />

        <div
          className="relative p-8 flex flex-col h-full"
          style={{
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <CardHeader
            eyebrow={`${caseStudy.industry} · ${caseStudy.market}`}
            logo={caseStudy.logo}
            client={caseStudy.client}
            hovered={hovered}
          />

          <h3
            className="font-bold"
            style={{ fontSize: "1.375rem", lineHeight: 1.25, letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            {caseStudy.client}
          </h3>

          <p
            className="font-light mt-3"
            style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {caseStudy.summary}
          </p>

          <div className="mt-auto pt-6 flex items-end justify-between gap-4">
            <div>
              <span
                className="font-bold block"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {caseStudy.metric}
              </span>
              <p
                className="font-light"
                style={{ fontSize: "0.75rem", letterSpacing: "0.02em", color: "rgba(255,255,255,0.5)" }}
              >
                {caseStudy.metricLabel}
              </p>
            </div>
            <span
              className="inline-flex items-center gap-2 font-medium shrink-0"
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
        </div>
      </Link>
    </Reveal>
  );
}

/* Website project card — same chrome as a case study, but these are project
   showcases, so the footer carries the build tier instead of a metric and the
   link points at /our-work rather than /work. */
function ShowcaseCard({ project, delay }: { project: ShowcaseProject; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const { card } = project;
  const isOrange = card.accent === "orange";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/our-work/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "20rem",
          background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(1.08)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(60% 60% at 100% 0%, rgba(255,110,50,0.14) 0%, transparent 65%)"
              : "radial-gradient(60% 60% at 0% 0%, rgba(60,125,255,0.15) 0%, transparent 65%)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Light wash so the name and CTA carry over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: HOVER_DIM,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <CardHoverPanel title={project.client} cta="Explore the project" hovered={hovered} />

        <div
          className="relative p-8 flex flex-col h-full"
          style={{
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <CardHeader
            eyebrow={`Web Design · ${card.market}`}
            logo={project.logo}
            client={project.client}
            hovered={hovered}
          />

          <h3
            className="font-bold"
            style={{ fontSize: "1.375rem", lineHeight: 1.25, letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            {project.client}
          </h3>

          <p
            className="font-light mt-3"
            style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {card.summary}
          </p>

          <div className="mt-auto pt-6 flex items-end justify-between gap-4">
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
              }}
            >
              {card.tier}
            </span>
            <span
              className="inline-flex items-center gap-2 font-medium shrink-0"
              style={{ fontSize: "0.8125rem", color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)" }}
            >
              Explore the project
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300"
                style={{ transform: hovered ? "translateX(3px)" : "none" }}
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* Performance case study card — same chrome as the others, but the client's
   logo carries the identity instead of a screenshot, since these engagements
   are media programs rather than things you can photograph. */
function PerformanceCard({
  study,
  delay,
}: {
  study: PerformanceCaseStudy;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/case-studies/${study.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "20rem",
          background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            /* The client photo where there is one, otherwise the shared
               texture these cards used before any had artwork. */
            backgroundImage: `url(${study.card.image ?? "/services/metric-card-bg.webp"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 1 : 0.14,
            transform: hovered ? "scale(1)" : "scale(1.08)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Scrim holds the resting state's copy legible over the texture, and
            clears on hover so the artwork comes through undimmed. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,5,10,0.6) 0%, rgba(4,5,10,0.74) 55%, rgba(4,5,10,0.9) 100%)",
            opacity: hovered ? 0.5 : 1,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <CardHoverPanel title={study.client} cta="Read the case study" hovered={hovered} />

        <div
          className="relative p-8 flex flex-col h-full"
          style={{
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <CardHeader
            eyebrow={`Performance · ${study.market}`}
            logo={study.logo}
            client={study.client}
            hovered={hovered}
          />

          <h3
            className="font-bold"
            style={{ fontSize: "1.375rem", lineHeight: 1.25, letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            {study.client}
          </h3>

          <p
            className="font-light mt-3"
            style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {study.card.summary}
          </p>

          <div className="mt-auto pt-6 flex items-end justify-between gap-4">
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
              }}
            >
              {study.card.sector}
            </span>
            <span
              className="inline-flex items-center gap-2 font-medium shrink-0"
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
        </div>
      </Link>
    </Reveal>
  );
}

export function PortfolioPageContent() {
  const [filter, setFilter] = useState<(typeof INDUSTRY_FILTERS)[number]>("All");

  /* Three sources feed one grid. "Web Design" selects the website showcases,
     "Performance" selects the media case studies, every other tab selects the
     legacy CASE_STUDIES by industry, and "All" shows everything. */
  const isAll = filter === "All";
  const showcases = isAll || filter === "Web Design" ? SHOWCASE_PROJECTS : [];
  const performance = isAll || filter === "Performance" ? PERFORMANCE_CASE_STUDIES : [];
  const allCaseStudies =
    isAll || filter === "Web Design" || filter === "Performance"
      ? isAll
        ? CASE_STUDIES
        : []
      : CASE_STUDIES.filter((c) => c.industry === filter);
  const total = allCaseStudies.length + showcases.length + performance.length;

  return (
    <>
      {/* ══ Hero + filters ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "10rem 1.5rem 6rem", minHeight: "50rem" }}
      >
        {/* Uploaded eclipse-glow artwork — full-bleed, arc rising behind the
            headline, faded top/bottom so it blends into the page gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/portfolio-hero-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 10%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 10%, black 88%, transparent 100%)",
          }}
        />

        {/* Text block — pushed down so it sits centered under the arch,
            not crowding its glowing peak */}
        <div className="relative max-w-6xl mx-auto text-center" style={{ marginTop: "10rem" }}>
          <Reveal>
            <Eyebrow className="mb-5">THE WORK</Eyebrow>
            <h1
              className="font-bold mx-auto"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Outcomes.
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                Not portfolios.
              </span>
            </h1>
            <p
              className="font-light mt-7 mx-auto max-w-xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
            >
              Every project tells a story measured in business impact, not
              creative awards. Filter by industry to find the closest proof
              point to your own.
            </p>
          </Reveal>

          {/* Filter tabs */}
          <Reveal delay={0.15} className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {INDUSTRY_FILTERS.map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className="rounded-full font-medium"
                  style={{
                    padding: "0.5625rem 1.25rem",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.01em",
                    color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                    background: active
                      ? "linear-gradient(120deg, rgba(90,162,255,0.25) 0%, rgba(255,154,90,0.2) 100%)"
                      : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(255,175,130,0.45)" : "1px solid rgba(255,255,255,0.12)",
                    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ══ Grid ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 9rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {showcases.map((project, i) => (
              <ShowcaseCard key={project.slug} project={project} delay={Math.min(i * 0.08, 0.32)} />
            ))}
            {performance.map((study, i) => (
              <PerformanceCard
                key={`perf-${study.slug}`}
                study={study}
                delay={Math.min((showcases.length + i) * 0.08, 0.32)}
              />
            ))}
            {allCaseStudies.map((caseStudy, i) => (
              <CaseStudyCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                delay={Math.min((showcases.length + performance.length + i) * 0.08, 0.32)}
              />
            ))}
          </div>
          {total === 0 && (
            <p className="text-center font-light mt-16" style={{ color: "rgba(255,255,255,0.45)" }}>
              No case studies in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

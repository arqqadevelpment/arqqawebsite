"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CASE_STUDY_WASH, getRelated } from "./case-study-data";
import type { PerformanceCaseStudy } from "./case-study-data";

/* ── Reveal-on-scroll ──
   threshold 0 with a bottom rootMargin: some blocks are taller than the
   viewport, and a ratio threshold can never be satisfied by an element that
   cannot fit on screen. */
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
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-10 ${center ? "text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="font-bold mt-5"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        {title}
      </h2>
    </Reveal>
  );
}

export function CaseStudyPageContent({ study }: { study: PerformanceCaseStudy }) {
  const related = getRelated(study.related);

  return (
    <div className="relative">
      {/* ══ Hero ══ */}
      <header className="relative w-full overflow-hidden">
        {/* Glowing-grid artwork, shared by every case study. The per-study
            accent wash sits over it at low opacity so each page still carries
            its own colour without losing the artwork underneath. */}
        {/* Every hero layer fades to TRANSPARENT at the foot rather than to a
            colour. Fading to opaque black left a visible line where it met the
            page's gradient backdrop; dissolving instead lets that backdrop
            carry straight through with no seam. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 cs-hero-fade"
          style={{
            backgroundImage: "url(/services/case-study-hero-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 cs-hero-fade"
          style={{
            background: CASE_STUDY_WASH[study.accent],
            opacity: 0.42,
            mixBlendMode: "multiply",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,8,0.72) 0%, rgba(3,3,8,0.42) 40%, rgba(3,3,8,0.5) 78%, transparent 100%)",
          }}
        />

        <div
          className="relative mx-auto w-full max-w-5xl px-6"
          style={{ paddingTop: "clamp(8.5rem, 14vw, 12rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}
        >
          <Reveal>
            <Link
              href="/services/performance-marketing"
              className="cs-back inline-flex items-center gap-2 mb-8"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              <span aria-hidden="true" className="cs-back-arrow">
                ←
              </span>{" "}
              Performance Marketing
            </Link>
          </Reveal>

          {study.logo ? (
            <Reveal delay={0.04}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.logo}
                alt={`${study.client} logo`}
                className="mb-7 block"
                /* Scaling by transform rather than height keeps the frame — and
                   the spacing below it — identical across every case study. */
                style={{
                  height: "3.5rem",
                  width: "auto",
                  maxWidth: "16rem",
                  objectFit: "contain",
                  transform: study.logoScale ? `scale(${study.logoScale})` : undefined,
                  transformOrigin: "left center",
                }}
              />
            </Reveal>
          ) : null}

          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <Eyebrow>{study.category}</Eyebrow>
              <span
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{
                  padding: "0.3rem 0.7rem",
                  fontSize: "0.6875rem",
                  color: "rgba(255,255,255,0.72)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <span aria-hidden="true" style={{ fontSize: "0.875rem", lineHeight: 1 }}>
                  {study.flag}
                </span>
                {study.market}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              {study.heroHeadline}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="font-light mt-6"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.68)",
                maxWidth: "44rem",
              }}
            >
              {study.heroSub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p
              className="font-light mt-8"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {study.service}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══ The Challenge ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <SectionHead eyebrow="The Challenge" title="What was broken." center />
          <Reveal delay={0.06} className="text-center">
            <p
              className="font-light mx-auto"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.68)",
                maxWidth: "46rem",
              }}
            >
              {study.challenge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ The Approach ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="The Approach" title="What we did about it." center />
          {study.approach.intro ? (
            <Reveal delay={0.05} className="mb-10 text-center">
              <p
                className="font-light mx-auto"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.62)",
                  maxWidth: "44rem",
                }}
              >
                {study.approach.intro}
              </p>
            </Reveal>
          ) : null}

          {/* Cards sit in one row where they fit and wrap on narrower
              viewports — auto-fit rather than a fixed column count, because
              the number of moves varies from three to seven by case study.
              A hairline connector runs from each badge to the next. */}
          <div className={`cs-moves ${study.approach.oneRow ? "cs-moves-row" : "cs-moves-grid"}`}>
            {study.approach.moves.map((move, i) => (
              <Reveal key={move.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="cs-move relative rounded-2xl p-6 flex flex-col">
                  <span className="cs-move-num relative inline-flex items-center justify-center rounded-full font-bold">
                    {move.num ?? String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-bold mt-6"
                    style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}
                  >
                    {move.title}
                  </h3>
                  <p
                    className="font-light mt-4"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.62)",
                    }}
                  >
                    {move.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ The Results ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <SectionHead
            eyebrow="The Results"
            title={study.results.projected ? "Projected performance." : "What it produced."}
            center
          />

          {study.results.projected ? (
            <Reveal delay={0.04} className="mb-8">
              {/* The source deck for this engagement contains forecasts, not
                  delivered results. Labelling it is a factual-accuracy
                  requirement, not a stylistic choice. */}
              <p
                className="cs-projection-note rounded-2xl p-5 font-light mx-auto text-center"
                style={{ fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "40rem" }}
              >
                These figures are campaign projections from the planning stage, not
                completed performance results.
              </p>
            </Reveal>
          ) : null}

          {study.results.intro ? (
            <Reveal delay={0.05} className="mb-8 text-center">
              <p
                className="font-light mx-auto"
                style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.62)", maxWidth: "44rem" }}
              >
                {study.results.intro}
              </p>
            </Reveal>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {study.results.metrics.map((m, i) => (
              <Reveal key={m.label} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <div className="cs-metric h-full rounded-2xl p-6 text-center">
                  <div
                    className="font-bold"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      backgroundImage:
                        "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {m.value}
                  </div>
                  <p
                    className="font-light mt-3 mx-auto"
                    style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.58)" }}
                  >
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {study.results.note ? (
            <Reveal delay={0.1} className="mt-8 text-center">
              <p
                className="font-light mx-auto"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "46rem",
                }}
              >
                {study.results.note}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ══ The Outcome / Takeaway ══ */}
      {study.outcome ? (
        <section className="relative w-full overflow-hidden" style={{ padding: "5rem 1.5rem 7rem" }}>
          {/* Particle-vortex artwork, masked at both ends so it dissolves into
              the sections above and below. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url(/services/case-study-outcome-bg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 16%, black 40%, black 76%, rgba(0,0,0,0.35) 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 16%, black 40%, black 76%, rgba(0,0,0,0.35) 92%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.5) 20%, rgba(3,3,5,0.5) 78%, transparent 100%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto">
            <SectionHead eyebrow={study.outcome.title} title="What it leaves behind." />
            <div className="flex flex-col gap-3.5">
              {study.outcome.points.map((point, i) => (
                <Reveal key={point} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="shrink-0"
                      style={{
                        marginTop: "0.55rem",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#5aa2ff",
                        boxShadow: "0 0 10px rgba(90,162,255,0.7)",
                      }}
                    />
                    <p
                      className="font-light"
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.65)",
                        maxWidth: "46rem",
                      }}
                    >
                      {point}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ══ What's Next ══ */}
      {study.whatsNext ? (
        <section className="relative w-full" style={{ padding: "0 1.5rem 5rem" }}>
          <div className="relative max-w-5xl mx-auto">
            <Reveal>
              <div className="cs-next rounded-3xl p-7 sm:p-8">
                <p
                  className="font-bold"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  What&apos;s Next
                </p>
                <p
                  className="font-light mt-3"
                  style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}
                >
                  {study.whatsNext}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ══ Related Work ══ */}
      {related.length > 0 ? (
        <section className="relative w-full" style={{ padding: "0 1.5rem 5rem" }}>
          <div className="relative max-w-5xl mx-auto">
            <SectionHead eyebrow="Related Work" title="More of the same discipline." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={Math.min(i * 0.07, 0.2)} className="h-full">
                  <Link href={`/case-studies/${r.slug}`} className="cs-related block h-full rounded-2xl p-6">
                    <span
                      className="font-bold"
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        backgroundImage:
                          "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {r.category}
                    </span>
                    <h3
                      className="font-bold mt-3"
                      style={{ fontSize: "1.25rem", lineHeight: 1.25, color: "#ffffff" }}
                    >
                      {r.client}
                    </h3>
                    <p
                      className="font-light mt-2"
                      style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)" }}
                    >
                      {r.heroHeadline}
                    </p>
                    <span
                      className="cs-related-cta inline-flex items-center gap-2 font-medium mt-4"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Read the case study
                      <span aria-hidden="true" className="cs-related-arrow">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ══ CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "3rem 1.5rem 7rem" }}>
        {/* Supplied artwork, masked at both ends so it dissolves into the
            sections above and below rather than meeting them on an edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/services/case-study-cta-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 18%, black 42%, black 78%, rgba(0,0,0,0.35) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 18%, black 42%, black 78%, rgba(0,0,0,0.35) 92%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.45) 22%, rgba(3,3,5,0.45) 76%, transparent 100%)",
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
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Start Your{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                Growth Story
              </span>
            </h2>
            <div className="mt-8 inline-flex">
              <Link
                href="/services/performance-marketing#audit-form"
                className="cs-cta relative inline-flex rounded-2xl"
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
                    padding: "0.9375rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  Book a Strategy Call
                  <span aria-hidden="true" className="cs-cta-arrow">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        /* Dissolves the hero artwork into the page backdrop instead of
           cutting it off on a hard edge. */
        .cs-hero-fade {
          -webkit-mask-image: linear-gradient(180deg, black 0%, black 62%, rgba(0,0,0,0.45) 84%, transparent 100%);
          mask-image: linear-gradient(180deg, black 0%, black 62%, rgba(0,0,0,0.45) 84%, transparent 100%);
        }

        .cs-back { color: rgba(255,255,255,0.45); transition: color 0.25s ease; }
        .cs-back:hover { color: #ffffff; }
        .cs-back-arrow { display: inline-block; transition: transform 0.25s cubic-bezier(0.22,1,0.36,1); }
        .cs-back:hover .cs-back-arrow { transform: translateX(-4px); }

        /* Approach cards. auto-fit lets a short sequence sit in one row and a
           long one wrap, without hard-coding a column count per case study. */
        /* Equal-height cards in both layouts.

           The reveal wrapper sits between the container and the card, and it
           previously carried h-full. A percentage height on a flex/grid item
           resolves against a container whose own height is content-based, so
           it collapsed to auto and the cards ended up ragged. Making the
           wrapper a flex column and letting the card flex:1 fills the track
           height the container already stretches it to. */
        .cs-moves > * { display: flex; flex-direction: column; }
        .cs-moves > * > .cs-move { flex: 1; }

        /* Default: cards wrap into as many columns as fit. */
        .cs-moves-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }

        /* Opt-in single row — cards share the width evenly down to a 13rem
           floor, past which the row scrolls rather than wrapping. */
        .cs-moves-row {
          display: flex;
          align-items: stretch;
          gap: 1.25rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.18) transparent;
        }
        .cs-moves-row > * { flex: 1 0 0; min-width: 13rem; }
        .cs-moves-row::-webkit-scrollbar { height: 6px; }
        .cs-moves-row::-webkit-scrollbar-track { background: transparent; }
        .cs-moves-row::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.18);
          border-radius: 3px;
        }

        .cs-move {
          background: linear-gradient(170deg, rgba(14,16,26,0.55) 0%, rgba(6,8,14,0.7) 100%);
          border: 1px solid rgba(255,255,255,0.09);
          transition: border-color 0.4s ease, background 0.4s ease,
                      transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .cs-move:hover {
          transform: translateY(-4px);
          border-color: rgba(255,138,90,0.35);
          background: linear-gradient(170deg, rgba(22,26,42,0.7) 0%, rgba(10,13,22,0.8) 100%);
        }
        /* Hairline connector running from each badge toward the next card.
           Scoped to the single-row variant only: in the wrapping grid there
           is no CSS way to know which card ends a row, so the last card of
           each row would draw a stray line past the grid's right edge. */
        .cs-moves-row .cs-move::before {
          content: "";
          position: absolute;
          top: 2.75rem;
          left: 100%;
          width: 1.25rem;
          height: 1px;
          background: rgba(255,255,255,0.12);
          pointer-events: none;
        }
        .cs-moves-row > *:last-child .cs-move::before { display: none; }

        .cs-move-num {
          width: 3rem;
          height: 3rem;
          font-size: 0.875rem;
          background: linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.18);
          color: #ffffff;
          box-shadow: 0 0 22px -6px rgba(255,122,61,0.45);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .cs-move:hover .cs-move-num {
          border-color: rgba(255,170,120,0.55);
          box-shadow: 0 0 30px -6px rgba(255,122,61,0.7);
        }

        .cs-metric {
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .cs-metric:hover { border-color: rgba(255,138,90,0.4); transform: translateY(-4px); }

        .cs-projection-note {
          background: linear-gradient(150deg, rgba(255,180,60,0.14) 0%, rgba(255,122,61,0.08) 100%);
          border: 1px solid rgba(255,180,60,0.35);
          color: rgba(255,225,180,0.92);
        }

        .cs-next {
          background: linear-gradient(150deg, rgba(52,68,224,0.14) 0%, rgba(255,90,43,0.08) 100%);
          border: 1px solid rgba(255,255,255,0.14);
        }

        .cs-related {
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .cs-related:hover {
          transform: translateY(-5px);
          border-color: rgba(255,138,90,0.45);
          box-shadow: 0 -12px 32px -16px rgba(255,122,61,0.3), 0 20px 40px -20px rgba(47,107,255,0.28);
        }
        .cs-related-cta { color: rgba(255,255,255,0.55); transition: color 0.3s ease; }
        .cs-related:hover .cs-related-cta { color: #ffffff; }
        .cs-related-arrow { display: inline-block; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
        .cs-related:hover .cs-related-arrow { transform: translateX(4px); }

        .cs-cta, .cs-cta-arrow {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .cs-cta:hover { transform: translateY(-2px); }
        .cs-cta:hover .cs-cta-arrow { transform: translateX(4px); }

        @media (prefers-reduced-motion: reduce) {
          .cs-back-arrow, .cs-related-arrow, .cs-cta, .cs-cta-arrow,
          .cs-move, .cs-metric, .cs-related { transition: none; }
          .cs-metric:hover, .cs-related:hover, .cs-cta:hover { transform: none; }
          .cs-move:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceDetail } from "./service-data";
import { SERVICES, getRelated } from "./service-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

/* Maps each proof-point client to its full case study on /work */
const PROOF_CLIENT_SLUG: Record<string, string> = {
  Fawry: "fawry",
  "Nile Air": "nile-air",
  "Kenz'Up": "kenzup",
  "Africa Music Initiative": "africa-music-initiative",
};

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

/* Section eyebrow + headline, used by every block for a consistent rhythm */
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
    <Reveal
      className={`${centered ? "text-center mx-auto" : ""} max-w-3xl mb-14`}
    >
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
                backgroundImage:
                  "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
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
          className="font-light mt-5"
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.58)",
          }}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* Glass surface shared by every card in the template */
const glass: React.CSSProperties = {
  background:
    "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function ServicePageTemplate({ service }: { service: ServiceDetail }) {
  const related = getRelated(service.related);
  const isOrange = service.accent === "orange";
  const accentGlow = isOrange ? "rgba(255,110,50," : "rgba(60,125,255,";

  return (
    <>
      {/* ══ 1 · Hero ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "11rem 1.5rem 6rem" }}
      >
        {/* Background visual — unique per service */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${service.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            /* Long, multi-stop ramp — no perceptible edge where it ends */
            maskImage:
              "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.34) 78%, rgba(0,0,0,0.1) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.34) 78%, rgba(0,0,0,0.1) 90%, transparent 100%)",
          }}
        />
        {/* Base darkening + a heavier pool on the left so the copy always
            wins against whichever artwork the service uses. Both layers fade
            out vertically so the hero dissolves into the next section with no
            visible dividing line. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(3,3,5,0.45)",
            maskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.82) 38%, rgba(3,3,5,0.5) 62%, rgba(3,3,5,0.15) 85%, transparent 100%)",
            maskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            {/* Breadcrumb — keeps the back path obvious */}
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
              <span aria-hidden="true">←</span> All Services
            </Link>

            <p
              className="font-bold mt-8"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.24em",
                backgroundImage:
                  "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {service.num} / {String(SERVICES.length).padStart(2, "0")}
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
              {service.title}
            </h1>

            <p
              className="font-light mt-6 max-w-2xl"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.1875rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.68)",
              }}
            >
              {service.positioning}
            </p>

            {/* Category Entry Point trigger */}
            <div
              className="mt-9 pl-4 max-w-xl"
              style={{
                borderLeft: `2px solid ${isOrange ? "rgba(255,122,61,0.75)" : "rgba(90,162,255,0.75)"}`,
              }}
            >
              <p
                className="font-light"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Category Entry Point
              </p>
              <p
                className="font-medium mt-1 italic"
                style={{
                  fontSize: "1rem",
                  color: isOrange ? "#ffb894" : "#9fc8ff",
                }}
              >
                &ldquo;{service.cep}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2 · The Problem We Solve ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — label, title, and body together */}
            <Reveal>
              <Eyebrow className="mb-5">THE PROBLEM WE SOLVE</Eyebrow>
              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                {service.problem.heading}
              </h2>
              <p
                className="font-light mt-6"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {service.problem.body}
              </p>
            </Reveal>

            {/* Right column — empirical framing */}
            <Reveal delay={0.14}>
              <div className="flex flex-col gap-4">
                {service.problem.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline gap-5 rounded-2xl px-6 py-5"
                    style={glass}
                  >
                    <span
                      className="font-bold shrink-0"
                      style={{
                        fontSize: "1.75rem",
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                        textShadow: `0 0 30px ${accentGlow}0.35)`,
                        minWidth: "4.5rem",
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="font-light"
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 3 · Our Approach ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="OUR APPROACH"
            title={service.approach.heading}
            body={service.approach.body}
          />

          {/* Process diagram — numbered steps joined by a running line.
              Column count matches the step count so a shorter list (e.g. 3
              steps) centers as its own row instead of hugging the left edge
              of a 4-column track with an empty slot — and dangling rail — on
              the right. */}
          <div
            className={`relative grid grid-cols-1 sm:grid-cols-2 gap-5 ${
              service.approach.steps.length === 3
                ? "lg:grid-cols-3"
                : service.approach.steps.length === 5
                ? "lg:grid-cols-5"
                : service.approach.steps.length === 6
                ? "lg:grid-cols-3"
                : "lg:grid-cols-4"
            }`}
          >
            {/* Connector rail behind the cards (desktop only) — only makes
                sense for a single-row layout, so skip it once steps wrap
                onto a second row (6 steps → 3-col, 2-row grid). */}
            {service.approach.steps.length !== 6 && (
              <div
                aria-hidden="true"
                className="hidden lg:block absolute pointer-events-none"
                style={{
                  top: "3.25rem",
                  left: "8%",
                  right: "8%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 12%, rgba(255,255,255,0.18) 88%, transparent 100%)",
                }}
              />
            )}
            {service.approach.steps.map((step, i) => (
              <Reveal key={step.num} delay={Math.min(i * 0.1, 0.32)}>
                <ApproachStepCard step={step} accentGlow={accentGlow} />
              </Reveal>
            ))}
          </div>

          {/* Optional CTA pair — e.g. "Book a Strategy Session" / "Download the Framework" */}
          {service.approach.cta && (
            <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
              <Link
                href={service.approach.cta.primary.href}
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
                  className="relative inline-flex items-center justify-center rounded-2xl font-medium"
                  style={{
                    padding: "0.9375rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  {service.approach.cta.primary.label}
                </span>
              </Link>
              <Link
                href={service.approach.cta.secondary.href}
                className="inline-flex items-center justify-center rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                {service.approach.cta.secondary.label} →
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ 4 · What's Included ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="WHAT'S INCLUDED"
            title="Scope,"
            accentTail="in full."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Scope groups */}
            {service.included.groups.map((group, i) => (
              <Reveal key={group.title} delay={Math.min(i * 0.1, 0.2)}>
                <div className="h-full rounded-3xl p-8" style={glass}>
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.3,
                      color: "#ffffff",
                    }}
                  >
                    {group.title}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="shrink-0"
                          style={{
                            marginTop: "0.5rem",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: isOrange ? "#ff9a5a" : "#5aa2ff",
                            boxShadow: `0 0 8px ${accentGlow}0.7)`,
                          }}
                        />
                        <span
                          className="font-light"
                          style={{
                            fontSize: "0.875rem",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            {/* Timeline + tooling */}
            <Reveal delay={0.3}>
              <div className="h-full rounded-3xl p-8" style={glass}>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.3,
                    color: "#ffffff",
                  }}
                >
                  Timeline
                </h3>
                <p
                  className="font-light mt-4"
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {service.included.timeline}
                </p>

                <h3
                  className="font-bold mt-8"
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.3,
                    color: "#ffffff",
                  }}
                >
                  Tooling
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.included.tooling.map((tool) => (
                    <span
                      key={tool}
                      className="font-light rounded-full"
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.375rem 0.875rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 5 · Proof Point ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="PROOF POINT" title="The" accentTail="receipts." />

          <Reveal>
            <div
              className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row"
              style={glass}
            >
              {/* Metric side */}
              <div className="relative flex-[1] p-10 lg:p-12 flex flex-col justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(60% 60% at 30% 40%, ${accentGlow}0.16) 0%, transparent 70%)`,
                  }}
                />
                <p
                  className="relative font-medium"
                  style={{
                    fontSize: "1.0625rem",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {service.proof.client}
                </p>
                <p
                  className="relative font-light mt-1"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {service.proof.market}
                </p>
                <div
                  className="relative font-bold mt-8"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 4.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    textShadow: `0 0 44px ${accentGlow}0.55)`,
                  }}
                >
                  {service.proof.metric}
                </div>
                <p
                  className="relative font-light mt-3"
                  style={{
                    fontSize: "0.8125rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {service.proof.metricLabel}
                </p>
              </div>

              {/* Story side */}
              <div
                className="relative flex-[1.3] p-10 lg:p-12 flex flex-col justify-center"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p
                  className="font-light"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {service.proof.body}
                </p>

                <div className="flex flex-wrap gap-10 mt-9">
                  {service.proof.secondary.map((s) => (
                    <div key={s.label}>
                      <p
                        className="font-bold"
                        style={{
                          fontSize: "1.5rem",
                          letterSpacing: "-0.02em",
                          color: "#ffffff",
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        className="font-light mt-1"
                        style={{
                          fontSize: "0.75rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/work/${PROOF_CLIENT_SLUG[service.proof.client] ?? ""}`}
                  className="inline-flex items-center gap-2 font-medium mt-10 self-start"
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 6 · Related Services ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="RELATED SERVICES"
            title="Nothing works"
            accentTail="alone."
            body="These verticals compound with this one. Running them together is what turns a campaign into a system."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={Math.min(i * 0.1, 0.24)}>
                <RelatedCard service={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7 · CTA ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "7rem 1.5rem 9rem" }}
      >
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
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 26%, rgba(3,3,5,0.4) 72%, transparent 100%)",
          }}
        />

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
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 0% 0%, rgba(60,125,255,0.12) 0%, transparent 62%), radial-gradient(50% 60% at 100% 100%, rgba(255,110,50,0.1) 0%, transparent 62%)",
            }}
          />
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Ready to put{" "}
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
                {service.title}
              </span>{" "}
              to work?
            </h2>
            <p
              className="font-light mt-6 mx-auto max-w-2xl"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Start with a discovery call, or take the playbook and pressure-test
              the thinking on your own terms.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
              {/* Harvest */}
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
                    background:
                      "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  Book a Discovery Call
                </span>
              </Link>

              {/* Nurture */}
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
                Download the {service.playbook} Playbook
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Approach step card — becomes a link to its dedicated sub-page when `href` is set */
function ApproachStepCard({
  step,
  accentGlow,
}: {
  step: { num: string; title: string; body: string; href?: string };
  accentGlow: string;
}) {
  const [hovered, setHovered] = useState(false);
  const clickable = Boolean(step.href);
  const Tag = clickable ? "a" : "div";

  return (
    <Tag
      {...(clickable ? { href: step.href, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } : {})}
      className="relative flex flex-col h-full rounded-3xl p-7"
      style={{
        ...glass,
        cursor: clickable ? "pointer" : undefined,
        border: hovered
          ? "1px solid rgba(255,138,90,0.5)"
          : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Node marker */}
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
        {step.num}
      </span>
      <h3
        className="font-bold mt-5"
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.3,
          color: "#ffffff",
        }}
      >
        {step.title}
      </h3>
      <p
        className="font-light mt-3"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {step.body}
      </p>
      {clickable && (
        <span
          className="inline-flex items-center gap-2 font-medium mt-auto pt-5"
          style={{
            fontSize: "0.8125rem",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.5)",
            transition: "color 0.35s ease",
          }}
        >
          Learn more
          <span
            aria-hidden="true"
            style={{
              color: "#ff9a5a",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            →
          </span>
        </span>
      )}
    </Tag>
  );
}

/* Related-service card — links across to a sibling page */
function RelatedCard({ service }: { service: ServiceDetail }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = service.accent === "orange";

  return (
    <Link
      href={`/services/${service.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-3xl overflow-hidden"
      style={{
        ...glass,
        minHeight: "15rem",
        border: hovered
          ? "1px solid rgba(255,138,90,0.5)"
          : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
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
            backgroundImage:
              "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {service.num}
        </span>
        <h3
          className="font-bold mt-3"
          style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}
        >
          {service.title}
        </h3>
        <p
          className="font-light mt-3"
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {service.positioning}
        </p>
        <span
          className="inline-flex items-center gap-2 font-medium mt-auto pt-6"
          style={{
            fontSize: "0.8125rem",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)",
            transition: "color 0.35s ease",
          }}
        >
          Explore
          <span
            aria-hidden="true"
            style={{
              color: "#ff9a5a",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

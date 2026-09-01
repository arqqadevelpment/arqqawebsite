"use client";

import { useEffect, useRef, useState } from "react";
import type { ApproachPage } from "./approach-pages-data";
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

/* Section eyebrow + headline, used by every block for a consistent rhythm */
function SectionHead({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "text-center mx-auto" : ""} max-w-3xl mb-14`}>
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
      </h2>
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

export function ApproachPageTemplate({ page }: { page: ApproachPage }) {
  const isOrange = page.accent === "orange";
  const accentGlow = isOrange ? "rgba(255,110,50," : "rgba(60,125,255,";

  return (
    <>
      {/* ══ 1 · Hero ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 6rem" }}>
        {page.image ? (
          <>
            {/* Full-bleed hero image — same treatment as the parent vertical page */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${page.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                maskImage:
                  "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.34) 78%, rgba(0,0,0,0.1) 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.34) 78%, rgba(0,0,0,0.1) 90%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "rgba(3,3,5,0.45)",
                maskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.82) 38%, rgba(3,3,5,0.5) 62%, rgba(3,3,5,0.15) 85%, transparent 100%)",
                maskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
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
              maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />
        )}

        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <Link
              href={`/services/${page.parentSlug}`}
              className="inline-flex items-center gap-2 font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span aria-hidden="true">←</span> {page.parentTitle}
            </Link>

            <h1
              className="font-bold mt-6 max-w-3xl"
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: page.image ? "0 2px 40px rgba(0,0,0,0.6)" : undefined,
              }}
            >
              {page.tagline}
            </h1>

            <p
              className="font-light mt-6 max-w-2xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
            >
              {page.intro}
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
                style={{ fontSize: "1rem", color: isOrange ? "#ffb894" : "#9fc8ff" }}
              >
                &ldquo;{page.cep}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2 · The Problem We Solve ══ */}
      <section className="relative w-full" style={{ padding: "3rem 1.5rem" }}>
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-5">THE PROBLEM WE SOLVE</Eyebrow>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                color: "#ffffff",
              }}
            >
              {page.problem.heading}
            </h2>
            <p
              className="font-light mt-5"
              style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(255,255,255,0.6)" }}
            >
              {page.problem.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 3 · Our Approach ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead eyebrow="OUR APPROACH" title={page.approach.heading} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.approach.steps.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i * 0.08, 0.32)}>
                <div className="relative h-full rounded-3xl p-7" style={glass}>
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
                  <h3
                    className="font-bold mt-5"
                    style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-light mt-3"
                    style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
                  >
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4 · What's Included ══ */}
      <section className="relative w-full" style={{ padding: "3rem 1.5rem" }}>
        {page.included.image && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "#000005",
              maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          />
        )}
        <div className={`relative mx-auto ${page.included.image ? "max-w-6xl" : "max-w-3xl"}`}>
          <div
            className={
              page.included.image
                ? "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start overflow-visible"
                : ""
            }
          >
            <Reveal className={page.included.image ? "" : ""}>
              <h2
                className="font-bold text-left"
                style={{
                  fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                What&apos;s Included
              </h2>
              <ul className="flex flex-col gap-3.5 mt-8 text-left">
                {page.included.items.map((item) => (
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
                      style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              {page.included.note && (
                <p
                  className="font-light italic mt-6 text-left"
                  style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}
                >
                  {page.included.note}
                </p>
              )}
            </Reveal>

            {page.included.image && (
              <Reveal delay={0.15} className="relative">
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: "1 / 1",
                    backgroundImage: `url(${page.included.image})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Reveal>
            )}
          </div>

          {page.proof && (
            <Reveal delay={0.1} className="mt-12">
              <Eyebrow className="mb-4">PROOF POINT</Eyebrow>
              <blockquote
                className="rounded-3xl p-8"
                style={{
                  ...glass,
                  borderLeft: `2px solid ${isOrange ? "rgba(255,138,90,0.6)" : "rgba(90,162,255,0.6)"}`,
                }}
              >
                <p
                  className="font-light"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}
                >
                  {page.proof.body}
                </p>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ 5 · Related Services ══ */}
      <section className="relative w-full" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2
              className="font-bold text-left"
              style={{
                fontSize: "clamp(1.625rem, 3.1vw, 2.4rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Related Services
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.related.map((r, i) => (
              <Reveal key={r.label} delay={Math.min(i * 0.08, 0.24)}>
                <RelatedMiniCard item={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "1rem 1.5rem 9rem" }}>
        {page.ctaImage ? (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${page.ctaImage})`,
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
                background: "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 26%, rgba(3,3,5,0.4) 72%, transparent 100%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(50% 60% at 50% 0%, rgba(60,125,255,0.12) 0%, transparent 62%)",
              maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          />
        )}
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
              style={{ fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)", letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Ready to put{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                {page.title}
              </span>{" "}
              to work?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-9">
              <Link
                href={page.cta.primary.href}
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
                    padding: "0.9375rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  {page.cta.primary.label}
                </span>
              </Link>
              <Link
                href={page.cta.secondary.href}
                className="inline-flex items-center justify-center rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                {page.cta.secondary.label} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Related-service card — vertical card, 3-up on the related-services grid */
function RelatedMiniCard({
  item,
}: {
  item: { label: string; description: string; href: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-3xl p-7"
      style={{
        ...glass,
        border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <p className="font-bold" style={{ fontSize: "1rem", color: "#ffffff" }}>
        {item.label}
      </p>
      <p
        className="font-light mt-3"
        style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)" }}
      >
        {item.description}
      </p>
      <span
        className="inline-flex items-center gap-2 font-medium mt-auto pt-6"
        style={{
          fontSize: "0.8125rem",
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.5)",
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
    </Link>
  );
}

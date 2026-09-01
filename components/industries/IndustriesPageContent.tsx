"use client";

import { useEffect, useRef, useState } from "react";
import { INDUSTRIES } from "./industries-data";
import type { Industry } from "./industries-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

/* One glyph per industry — gradient stroke, matching the icon treatment
   used elsewhere on the site (e.g. the About page's belief cards) */
const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  fintech: (
    <>
      <rect x="3.5" y="9.5" width="17" height="10" rx="1.5" stroke="url(#industryStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.04)" />
      <path d="M3.5 12.5h17" stroke="url(#industryStroke)" strokeWidth="1.4" />
      <path d="M7 16h3" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 4.5l7.5 3.2H4.5L12 4.5z" stroke="url(#industryStroke)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(255,255,255,0.04)" />
    </>
  ),
  airlines: (
    <path
      d="M12.5 3.8c.5 0 .9.4.9.9v5.1l6.4 3.9v1.7l-6.4-2.1v4.2l1.9 1.4v1.4l-2.8-.9-2.8.9v-1.4l1.9-1.4v-4.2l-6.4 2.1v-1.7l6.4-3.9V4.7c0-.5.4-.9.9-.9z"
      stroke="url(#industryStroke)"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="rgba(255,255,255,0.05)"
    />
  ),
  technology: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="url(#industryStroke)" strokeWidth="1.4" fill="rgba(255,255,255,0.04)" />
      <rect x="10" y="10" width="4" height="4" rx="0.8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
      <path
        d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4"
        stroke="url(#industryStroke)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </>
  ),
  retail: (
    <>
      <path
        d="M6 8.5h12l-1 11a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 19.5L6 8.5z"
        stroke="url(#industryStroke)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.04)"
      />
      <path d="M9 8.5V6.8a3 3 0 0 1 6 0V8.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  telco: (
    <>
      <path d="M12 21v-7" stroke="url(#industryStroke)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 14l6.5-8.5H5.5L12 14z" stroke="url(#industryStroke)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(255,255,255,0.04)" />
      <path d="M8.5 17.5a5 5 0 0 1 7 0" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
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

function IndustryCard({ industry, delay }: { industry: Industry; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = industry.accent === "orange";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/industries/${industry.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "18rem",
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
            background: isOrange
              ? "radial-gradient(60% 60% at 100% 0%, rgba(255,110,50,0.14) 0%, transparent 65%)"
              : "radial-gradient(60% 60% at 0% 0%, rgba(60,125,255,0.15) 0%, transparent 65%)",
          }}
        />

        <div className="relative p-8 flex flex-col h-full">
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
              {INDUSTRY_ICONS[industry.slug]}
            </svg>
          </div>
          <h3
            className="font-bold mt-5"
            style={{ fontSize: "1.375rem", lineHeight: 1.25, letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            {industry.name}
          </h3>

          <p
            className="font-light mt-3"
            style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {industry.summary}
          </p>

          <p
            className="font-light mt-5"
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}
          >
            LEAD MAGNET
          </p>
          <p
            className="font-medium mt-1"
            style={{ fontSize: "0.8125rem", lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}
          >
            &ldquo;{industry.playbook}&rdquo;
          </p>

          <span
            className="inline-flex items-center gap-2 font-medium mt-auto pt-6"
            style={{ fontSize: "0.8125rem", color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)" }}
          >
            Explore {industry.name.split(" ")[0]}
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
    </Reveal>
  );
}

export function IndustriesPageContent() {
  return (
    <>
      {/* Shared gradient for every industry-card icon */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="industryStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5aa2ff" />
            <stop offset="50%" stopColor="#9fc8ff" />
            <stop offset="100%" stopColor="#ff7a3d" />
          </linearGradient>
        </defs>
      </svg>

      {/* ══ Hero ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 6rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 45% at 85% 0%, rgba(60,125,255,0.2) 0%, rgba(20,50,160,0.08) 45%, transparent 75%), radial-gradient(50% 40% at 10% 100%, rgba(255,110,50,0.14) 0%, transparent 72%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-5">INDUSTRIES</Eyebrow>
            <h1
              className="font-bold mx-auto"
              style={{
                fontSize: "clamp(2rem, 4.8vw, 3.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              We Don&apos;t Guess Your Industry.{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                We&apos;ve Built Systems Inside It.
              </span>
            </h1>
            <p
              className="font-light mt-6 mx-auto max-w-2xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
            >
              Proven operational models across five high-growth sectors in the
              MENA region. Each with dedicated case studies, specialized
              teams, and sector-specific frameworks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Grid ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 9rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} delay={Math.min(i * 0.08, 0.32)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

type Shape = "sphere" | "triangle" | "squircle" | "ring";

type Fact = {
  key: string;
  value: number;
  suffix: string;
  label: string;
  glow: string;
  soft: string;
  shape: Shape;
};

const FACTS: Fact[] = [
  {
    key: "years",
    value: 13,
    suffix: "",
    label: "Years Operating",
    glow: "#4b3ff2",
    soft: "#a9b8ff",
    shape: "sphere",
  },
  {
    key: "specialists",
    value: 50,
    suffix: "+",
    label: "Specialists",
    glow: "#2dd4bf",
    soft: "#a6ecdf",
    shape: "triangle",
  },
  {
    key: "markets",
    value: 4,
    suffix: "",
    label: "MENA Markets",
    glow: "#d6336c",
    soft: "#f0a8bf",
    shape: "squircle",
  },
  {
    key: "roas",
    value: 237,
    suffix: "x",
    label: "Highest ROAS",
    glow: "#ec4438",
    soft: "#f5b39f",
    shape: "ring",
  },
];

/**
 * Neon glass glyph — dual rim-light (cool blue left, warm orange right),
 * dark glass fill, crisp thick outline. Matches the 3D icon reference.
 */
function GlassShape({ shape, gradientId }: { shape: Shape; gradientId: string }) {
  const stroke = `url(#${gradientId})`;
  const fill = "none";

  switch (shape) {
    case "sphere":
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="12" fill={fill} stroke={stroke} strokeWidth="2.4" />
          <path d="M9.4 12.6c1.4-2.3 3.6-3.6 6-3.4" stroke="rgba(210,232,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "triangle":
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path d="M17 5 L30 27.8 L4 27.8 Z" fill={fill} stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M13.2 12.4 L9 19.8" stroke="rgba(210,232,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "squircle":
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect x="4.5" y="4.5" width="25" height="25" rx="8.5" fill={fill} stroke={stroke} strokeWidth="2.4" />
          <path d="M9.5 11c0-1.1.9-2 2-2h5" stroke="rgba(210,232,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "ring":
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="11" fill={fill} stroke={stroke} strokeWidth="3.4" />
          <path d="M9.4 12.4a10 10 0 0 1 5.6-3.6" stroke="rgba(210,232,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function StatCard({ fact, index }: { fact: Fact; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  const gradientId = `factGlass-${fact.key}`;

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
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reduced motion skips the count-up entirely; the final value is rendered
    // straight from `fact.value` below rather than pushed through state.
    if (!visible || reduced) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * fact.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, fact.value]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={{
        // Glassy body — same family as the case-study cards
        background:
          "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: hovered
          ? "1px solid rgba(255,138,90,0.55)"
          : "1px solid rgba(255,255,255,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-5px)"
            : "translateY(0)"
          : "translateY(24px)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.35), 0 24px 50px -22px rgba(47,107,255,0.3), inset 0 1px 0 rgba(255,175,130,0.25)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.5s ease, box-shadow 0.5s ease`,
      }}
    >

      {/* Content */}
      <div className="relative px-7 pt-8 pb-7">
        {/* Neon glass icon — bare glyph, rim-lit blue → orange */}
        <div
          className="relative flex items-center justify-start"
          style={{
            marginBottom: "1.5rem",
            transform: hovered ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)",
            transformOrigin: "left center",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#5aa2ff" />
                <stop offset="45%" stopColor="#9fc8ff" />
                <stop offset="65%" stopColor="#ffb27a" />
                <stop offset="100%" stopColor="#ff7a3d" />
              </linearGradient>
            </defs>
          </svg>
          <span
            className="relative flex"
            style={{
              filter:
                "drop-shadow(-2px 0 6px rgba(90,162,255,0.55)) drop-shadow(2px 0 6px rgba(255,122,61,0.5))",
            }}
          >
            <GlassShape shape={fact.shape} gradientId={gradientId} />
          </span>
        </div>

        {/* Number — bold, prominent */}
        <div
          className="font-bold"
          style={{
            fontSize: "clamp(2.75rem, 4.2vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            textShadow: `0 0 30px ${fact.glow}30`,
          }}
        >
          {reduced ? fact.value : count}
          <span style={{ color: "#ffffff" }}>{fact.suffix}</span>
        </div>

        {/* Label */}
        <p
          className="font-light mt-3"
          style={{
            fontSize: "0.9375rem",
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {fact.label}
        </p>
      </div>
    </div>
  );
}

export function FactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Subtle background parallax as the section scrolls through view — drifts
     a little slower than the page so it separates gently from the Hero's
     own parallax, keeping the hand-off cinematic rather than a hard cut. */
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ticking = false;
    function update() {
      ticking = false;
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (section below viewport) → 0 (centered) → 1 (section above viewport)
      const center = rect.top + rect.height / 2;
      const progress = clamp((vh - center) / (vh + rect.height), -0.5, 1.5);
      const ty = (progress - 0.5) * 40; // small, controlled range
      bg!.style.transform = `translateY(${ty}px) scale(1.08)`;

      // Entrance parallax — the content rises from below and settles as the
      // section comes into view, while the Hero above recedes upward faster.
      // Two layers, two rates: that is what makes the hand-off read as depth
      // rather than a cut.
      const content = contentRef.current;
      if (content && !reduceMotion) {
        // 0 while the section is still a viewport away → 1 once its top has
        // travelled 55% of the viewport height.
        const enter = clamp((vh - rect.top) / (vh * 0.55), 0, 1);
        const e = 1 - Math.pow(1 - enter, 3); // ease-out
        content.style.transform = `translate3d(0, ${((1 - e) * 90).toFixed(2)}px, 0)`;
        content.style.opacity = String((0.15 + e * 0.85).toFixed(3));
      } else if (content) {
        content.style.transform = "";
        content.style.opacity = "";
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="facts-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      // Content sits high in the frame: most of the top padding is moved to
      // the bottom so the section's own height is unchanged, and a negative
      // top margin pulls the whole block up into the Hero's dark tail —
      // closing the black gap without touching the Hero or its parallax.
      style={{
        marginTop: "-5rem",
        padding: "2rem 1.5rem 12rem",
        willChange: "opacity, transform",
      }}
    >
      {/* Background — horizon artwork, faded at the edges so sections stay continuous.
          Positioned low (85% Y) so the bright horizon glow sits well below the
          heading, clear of the text block. The top fade is extended so the
          section gradually overlaps the Hero's own fade-out instead of
          cutting in abruptly. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/facts-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 320%",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 26%, black 48%, black 62%, rgba(0,0,0,0.5) 84%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 26%, black 48%, black 62%, rgba(0,0,0,0.5) 84%, transparent 100%)",
          willChange: "transform",
        }}
      />
      {/* Legibility scrim — transparent at edges, never a hard line */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 28%, rgba(3,3,5,0.4) 68%, transparent 100%)",
        }}
      />
      {/* Extra darkening focused behind the heading block, so the copy always
          reads clearly regardless of what's happening in the artwork below it */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "44%",
          background:
            "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.4) 55%, transparent 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative max-w-6xl mx-auto"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Eyebrow className="mb-5">BY THE NUMBERS</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            The Numbers Behind{" "}
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
              the&nbsp;Certainty
            </span>
          </h2>
          <p
            className="font-light mt-5"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
              textShadow: "0 1px 16px rgba(0,0,0,0.5)",
            }}
          >
            Over a decade of executional discipline, measured in market reach,
            specialist depth, and outcomes agencies can&apos;t replicate.
          </p>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACTS.map((fact, i) => (
            <StatCard key={fact.key} fact={fact} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

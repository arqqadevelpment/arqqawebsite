"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Phase = {
  num: string;
  title: string;
  body: string;
};

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Strategic Input",
    body: "Market analysis, competitive audit, KPI alignment, channel mapping. Your growth blueprint before a single pixel moves.",
  },
  {
    num: "02",
    title: "The Content Factory",
    body: "Platform-native content creation: copy, storyboarding, scripting. Every asset mapped to a strategic objective.",
  },
  {
    num: "03",
    title: "Visual Production",
    body: "Creative design, motion graphics, Reels production. Joint sign-off protocol eliminates creative/media friction.",
  },
  {
    num: "04",
    title: "Handoff & Launch",
    body: "Automated onboarding via ClickUp templates. Day 1 transparency. Zero scope creep. Campaign activation across all channels.",
  },
  {
    num: "05",
    title: "Intelligence & Reporting",
    body: "Performance dashboards, monthly retention surveys, strategic advisory. Data-driven optimization cycles, not guesswork.",
  },
];

/* ── Shared reveal-on-scroll wrapper (fade-in on mount, matches the rest of the site) ── */
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/** CTA label that slides up on hover (duplicate text glides in from below) */
function SlideLabel({ text }: { text: string }) {
  return (
    <span
      className="relative block overflow-hidden"
      style={{ height: "1.5em", lineHeight: "1.5em" }}
    >
      <span
        className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
    </span>
  );
}

/* ── Numbered point — sits on the circle, becomes the active anchor on hover ── */
function NumberedPoint({
  phase,
  active,
  onEnter,
  onLeave,
}: {
  phase: Phase;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={`${phase.num} — ${phase.title}`}
      className="relative flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: active ? "3.25rem" : "2.75rem",
        height: active ? "3.25rem" : "2.75rem",
        background: active
          ? "linear-gradient(160deg, rgba(255,138,90,0.22) 0%, rgba(90,162,255,0.16) 100%)"
          : "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        border: active
          ? "1px solid rgba(255,175,130,0.75)"
          : "1px solid rgba(255,255,255,0.22)",
        boxShadow: active
          ? "0 0 26px rgba(255,90,43,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.12)",
        transition:
          "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <span
        className="font-bold"
        style={{
          fontSize: "0.9375rem",
          color: active ? "#ffffff" : "rgba(255,255,255,0.85)",
          textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          transition: "color 0.35s ease",
        }}
      >
        {phase.num}
      </span>
    </button>
  );
}

/* Popover card — anchored in the empty negative space beside/above its point,
   never over the central visual. Placement is explicit per point (see PLACEMENT below). */
function PhaseCard({
  phase,
  placement,
  visible,
}: {
  phase: Phase;
  placement: "left" | "right" | "top";
  visible: boolean;
}) {
  const hiddenOffset =
    placement === "right" ? "translateX(-8px)" : placement === "left" ? "translateX(8px)" : "translateY(8px)";

  const positionStyle: React.CSSProperties =
    placement === "right"
      ? { left: "calc(100% + 1.1rem)", top: "50%" }
      : placement === "left"
        ? { right: "calc(100% + 1.1rem)", top: "50%" }
        : { bottom: "calc(100% + 1.1rem)", left: "50%" };

  const baseTransform =
    placement === "top" ? "translateX(-50%)" : "translateY(-50%)";

  return (
    <div
      className="absolute"
      style={{
        ...positionStyle,
        transform: visible ? baseTransform : `${baseTransform} ${hiddenOffset}`,
        width: "17rem",
        maxWidth: "70vw",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        zIndex: 10,
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden p-5"
        style={{
          background:
            "linear-gradient(160deg, rgba(14,16,26,0.9) 0%, rgba(6,8,14,0.94) 100%)",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 50px -20px rgba(20,60,200,0.5)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 70% at 0% 0%, rgba(60,125,255,0.16) 0%, transparent 65%)",
          }}
        />
        <span
          className="relative font-bold"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {phase.num} / 05
        </span>
        <h3
          className="relative font-bold mt-2"
          style={{ fontSize: "1.0625rem", letterSpacing: "-0.01em", color: "#ffffff" }}
        >
          {phase.title}
        </h3>
        <p
          className="relative font-light mt-2"
          style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}
        >
          {phase.body}
        </p>
      </div>
    </div>
  );
}

/* Points sit exactly on the dashed guide ring — both derive from this one radius */
const RING_INSET_PCT = 12; // dashed ring: inset 12% on every side
const RING_RADIUS_PCT = 50 - RING_INSET_PCT; // = 38, distance from centre to the ring line

export function CatalystSection() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter(i: number) {
    setActive(i);
  }
  function handleLeave() {
    setActive(null);
  }

  // Lazy-load + lazy-play: this video is far below the fold, so don't let it
  // compete with hero/critical assets for bandwidth on first load.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    let loaded = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            loaded = true;
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ padding: "7rem 1.5rem" }}>

      {/* Headline — the system name leads, with its promise as a single
          gradient line beneath it. */}
      <Reveal className="text-center max-w-4xl mx-auto mb-16">
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          THE CATALYST SYSTEM&trade;
        </h2>
        {/* Sized off the viewport so it always holds on one line, down to
            the narrowest phone. */}
        <p
          className="font-bold mt-4"
          style={{
            fontSize: "clamp(0.75rem, 4vw, 1.5rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            backgroundImage:
              "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
          }}
        >
          One Partner. One Strategy. Infinite Growth.
        </p>
        <p
          className="font-light mt-5 max-w-2xl mx-auto"
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          The Catalyst System™ is ARQQA&apos;s proprietary end-to-end
          operating model. It replaces fragmented workflows with a single
          accountable system that owns results, not excuses.
        </p>
      </Reveal>

      {/* ── Diagram — centred focal circle, full ring of numbered points ── */}
      <Reveal delay={0.1} className="flex flex-col items-center">
        {/* Circle stage */}
        <div
          className="relative mx-auto"
          style={{ width: "min(34rem, 88vw)", aspectRatio: "1 / 1" }}
        >
          {/* Guide ring — points are placed exactly on this line */}
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              inset: `${RING_INSET_PCT}%`,
              border: "1px dashed rgba(255,255,255,0.14)",
            }}
          />
          {/* Soft core glow behind the video */}
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              inset: "22%",
              background:
                "radial-gradient(circle, rgba(52,68,224,0.2) 0%, rgba(111,91,224,0.09) 45%, transparent 72%)",
              filter: "blur(6px)",
            }}
          />

          {/* Central visual — the system core, screen-blended, the main focal point */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "58%",
              height: "58%",
            }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="block w-full h-full object-contain"
              style={{
                mixBlendMode: "screen",
                maskImage:
                  "radial-gradient(circle at 50% 50%, black 52%, transparent 74%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, black 52%, transparent 74%)",
              }}
            >
              <source src="/catalyst-loop.mp4" type="video/mp4" />
              <source src="/hero-scrub-540.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Numbered points — centred exactly on the guide ring, each with its own popover card.
              Placement is explicit so the card always lands in empty space, never over the
              central visual: 01 → above, 02/03 → right, 04/05 → left. */}
          {PHASES.map((phase, i) => {
            const angle = (-90 + i * (360 / PHASES.length)) * (Math.PI / 180);
            const x = 50 + RING_RADIUS_PCT * Math.cos(angle);
            const y = 50 + RING_RADIUS_PCT * Math.sin(angle);
            const placement: "left" | "right" | "top" =
              i === 0 ? "top" : i === 1 || i === 2 ? "right" : "left";
            return (
              <div
                key={phase.num}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NumberedPoint
                  phase={phase}
                  active={active === i}
                  onEnter={() => handleEnter(i)}
                  onLeave={handleLeave}
                />
                <PhaseCard phase={phase} placement={placement} visible={active === i} />
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ── CTA row ── */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-5 mt-16">
        {/* Primary — gradient-rimmed dark pill with warm top glow */}
        <Link
          href="/catalyst-system"
          className="group relative inline-flex rounded-2xl"
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
              padding: "0.875rem 2rem",
              background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
              color: "#ffffff",
              fontSize: "0.9375rem",
              letterSpacing: "0.01em",
            }}
          >
            <SlideLabel text="See the Full Catalyst System" />
          </span>
        </Link>

      </div>
    </section>
  );
}

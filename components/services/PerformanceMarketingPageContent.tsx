"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  BIG_NUMBERS,
  BREAKDOWN,
  CAPABILITY_GLOW,
  CAPABILITY_WASH,
  TRANSPARENCY_WASH,
  CLIENTS,
  CLOSING,
  FAQS,
  HERO,
  HIGHLIGHTS,
  INDUSTRIES,
  LEAD_FORM,
  PROBLEM,
  PROCESS,
  TRANSPARENCY,
  WHAT_WE_DO,
  WHY,
} from "./performance-marketing-data";
import type {
  Capability,
  Highlight,
  IndustryIcon,
  MetricIcon,
  TransparencySlide,
  StepIcon,
  WhyIcon,
} from "./performance-marketing-data";
import Image from "next/image";
import { OfficesSection } from "@/components/contact/OfficesSection";

/* ══════════════════════════════════════════════════════════════════════
   Shared primitives
   ══════════════════════════════════════════════════════════════════════ */

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
  const centred = align === "center";
  return (
    <Reveal className={`${centred ? "text-center" : ""} mb-12`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="font-bold mt-5"
        style={{
          fontSize: "clamp(1.625rem, 3.3vw, 2.5rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        {title}{" "}
        {accentTail ? (
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
        ) : null}
      </h2>
      {body ? (
        <p
          className={`font-light mt-5 ${centred ? "mx-auto" : ""}`}
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "42rem",
          }}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/* Single CTA used throughout — this page deliberately offers one path.
   Styled as the site's standard gradient-rimmed pill: a 1px gradient-filled
   outer layer with an opaque inner layer on top. CSS border-image cannot
   follow a border-radius, so a real gradient outline has to be built this
   way — the same technique Eyebrow and every other CTA on the site uses. */
function PrimaryCTA({
  label,
  note,
  href = "#audit-form",
  small = false,
}: {
  label: string;
  note?: string;
  href?: string;
  small?: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center gap-3">
      <Link
        href={href}
        className="perf-cta relative inline-flex rounded-2xl"
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
            padding: small ? "0.75rem 1.5rem" : "0.9375rem 2.25rem",
            background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
            color: "#ffffff",
            fontSize: small ? "0.8125rem" : "0.9375rem",
            whiteSpace: "nowrap",
          }}
        >
          {label}
          <span aria-hidden="true" className="perf-cta-arrow">
            →
          </span>
        </span>
      </Link>
      {note ? (
        <span
          className="font-light"
          style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}
        >
          {note}
        </span>
      ) : null}
    </div>
  );
}

/* ── Count-up number ──
   Counts once, when the element first scrolls into view. Honours
   prefers-reduced-motion by jumping straight to the final value. */
function CountUp({
  value,
  display,
  duration = 1500,
  delay = 0,
}: {
  value: number;
  display: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* The finished string is the source of truth for formatting; the counter
       only scales the numeric part, so suffixes like "M+" survive intact. */
    const match = display.match(/^([\d.,]+)(.*)$/);
    const suffix = match ? match[2] : "";
    const decimals = String(value).includes(".") ? 1 : 0;
    const grouped = display.includes(",");

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withGroups = grouped
        ? Number(fixed).toLocaleString("en-US")
        : fixed;
      return withGroups + suffix;
    };

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setText(display);
        return;
      }

      const start = performance.now() + delay;
      const tick = (now: number) => {
        if (now < start) {
          requestAnimationFrame(tick);
          return;
        }
        const p = Math.min((now - start) / duration, 1);
        /* ease-out cubic — fast first, settling at the end */
        const eased = 1 - Math.pow(1 - p, 3);
        setText(format(value * eased));
        if (p < 1) requestAnimationFrame(tick);
        else setText(display);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, display, duration, delay]);

  return <span ref={ref}>{text}</span>;
}

/* ── Pain card — hover (or tap) converts the problem into our answer ── */
function PainCard({
  card,
  index,
}: {
  card: { pain: string; solution: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={Math.min(index * 0.1, 0.3)} className="h-full">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden p-8"
        style={{
          minHeight: "17rem",
          cursor: "pointer",
          background: "linear-gradient(170deg, rgba(14,16,26,0.7) 0%, rgba(6,8,14,0.8) 100%)",
          border: open
            ? "1px solid rgba(255,138,90,0.45)"
            : "1px solid rgba(255,255,255,0.11)",
          transform: open ? "translateY(-4px)" : "translateY(0)",
          transition:
            "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/services/card-gradient-001.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: open ? 0.5 : 0,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <p
          className="relative font-light"
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.9)",
            opacity: open ? 0 : 1,
            transform: open ? "translateY(-8px)" : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          &ldquo;{card.pain}&rdquo;
        </p>

        <p
          className="relative font-light mt-auto"
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "#ffffff",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.45s ease 0.1s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}
        >
          {card.solution}
        </p>

        <span
          className="relative font-medium mt-4"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            opacity: open ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          Hover for the answer →
        </span>
      </div>
    </Reveal>
  );
}

/* ── Icons ── */

function MetricGlyph({ name }: { name: MetricIcon }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "eye":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="3.1" />
        </svg>
      );
    case "magnet":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 4v8a7 7 0 0 0 14 0V4" />
          <path d="M5 9h4M15 9h4" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9.2" cy="8.6" r="3.2" />
          <path d="M3.4 19c0-3.1 2.6-5.2 5.8-5.2s5.8 2.1 5.8 5.2" />
          <path d="M16.4 6.6a3.2 3.2 0 0 1 0 6M17.9 19c0-2.2-.8-3.9-2-5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
          <path d="M18.5 16.5l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3.4" y="3.4" width="7" height="7" rx="1.8" />
          <rect x="13.6" y="3.4" width="7" height="7" rx="1.8" />
          <rect x="3.4" y="13.6" width="7" height="7" rx="1.8" />
          <rect x="13.6" y="13.6" width="7" height="7" rx="1.8" />
        </svg>
      );
  }
}

/* ── Why-ARQQA glyph ──
   The stroke is painted with a blue-to-orange gradient rather than a flat
   colour, so the mark carries the brand ramp the way the reference does.
   Each instance needs its own gradient id — SVG paint servers are global,
   so a shared id would make every icon reference whichever one rendered
   last. Keying it off the icon name keeps it stable across renders. */
function WhyIconMark({ name }: { name: WhyIcon }) {
  const gid = `why-grad-${name}`;
  const stroke = `url(#${gid})`;
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 10px rgba(90,162,255,0.35))" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5aa2ff" />
          <stop offset="45%" stopColor="#9fc8ff" />
          <stop offset="100%" stopColor="#ff7a3d" />
        </linearGradient>
      </defs>

      {name === "shield" && (
        <>
          <path
            d="M12 2.8l7.2 3.1v6.2c0 4.5-3.1 7.9-7.2 9.2-4.1-1.3-7.2-4.7-7.2-9.2V5.9L12 2.8z"
            {...common}
          />
          <path d="M8.9 12.1l2.2 2.2 4.1-4.5" {...common} strokeWidth={1.9} />
        </>
      )}

      {name === "badge" && (
        <>
          <circle cx="12" cy="8.9" r="5.6" {...common} />
          <path d="M8.4 13.6L6.9 21.2 12 18.6l5.1 2.6-1.5-7.6" {...common} />
        </>
      )}

      {name === "team" && (
        <>
          <circle cx="9.1" cy="8.8" r="3.3" {...common} />
          <path d="M3.3 19.2c0-3.1 2.6-5.3 5.8-5.3s5.8 2.2 5.8 5.3" {...common} />
          <path d="M16.2 6.9a3.3 3.3 0 0 1 0 6.2M17.8 19.2c0-2.2-.8-4-2.1-5.2" {...common} />
        </>
      )}

      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9.1" {...common} />
          <path d="M2.9 12h18.2" {...common} />
          <path d="M12 2.9c2.6 2.8 2.6 15.4 0 18.2M12 2.9c-2.6 2.8-2.6 15.4 0 18.2" {...common} />
        </>
      )}
    </svg>
  );
}

/* ── One proof metric ──
   The figure counts up when the card first scrolls into view. The gradient
   artwork sits behind the content, brightening and drifting in on hover. */
function MetricCard({
  metric,
  index,
}: {
  metric: (typeof BREAKDOWN.metrics)[number];
  index: number;
}) {
  /* Derived from the rendered string so the counter can never drift from the
     figure that is actually displayed. */
  const target = Number(metric.figure.replace(/[^0-9]/g, ""));

  return (
    <Reveal delay={Math.min(index * 0.07, 0.28)} className="h-full">
      {/* Hover lives in CSS rather than React state: the whole card responds
          without a re-render, and the rules stay inspectable. */}
      <div className="perf-metric relative h-full rounded-3xl overflow-hidden flex flex-col">
        <div aria-hidden="true" className="perf-metric-art absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="perf-metric-scrim absolute inset-0 pointer-events-none" />

        <div className="relative p-7 flex flex-col h-full">
          <span className="perf-metric-icon inline-flex items-center justify-center rounded-2xl">
            <MetricGlyph name={metric.icon} />
          </span>

          <div
            className="font-bold mt-5"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              backgroundImage:
                "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            <CountUp value={target} display={metric.figure} duration={1800} delay={index * 120} />
          </div>
          <p
            className="font-light mt-2"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {metric.label}
          </p>
          <p
            className="font-light mt-4"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}
          >
            {metric.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── One proof-in-practice card ──
   Vertical format for the auto-scrolling rail: logo, client, flagged market,
   then the result. Falls back to a monogram until a logo is supplied. */
function HighlightCard({ item }: { item: Highlight }) {
  const monogram = item.client
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="perf-hl relative rounded-3xl overflow-hidden flex flex-col"
    >
      <div aria-hidden="true" className="perf-hl-art absolute inset-0 pointer-events-none" />
      <div aria-hidden="true" className="perf-hl-scrim absolute inset-0 pointer-events-none" />

      <div className="relative p-6 flex flex-col h-full">
        {/* Logo — bare mark, left aligned, no container */}
        <div className="perf-hl-logo flex items-center justify-start">
          {item.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.logo}
              alt={`${item.client} logo`}
              /* Scaling with a transform rather than a larger height keeps the
                 slot — and therefore every card's title baseline — fixed. */
              style={{
                maxHeight: "3.25rem",
                maxWidth: "70%",
                width: "auto",
                objectFit: "contain",
                transform: item.logoScale ? `scale(${item.logoScale})` : undefined,
                transformOrigin: "left center",
              }}
            />
          ) : (
            <span
              className="font-bold"
              style={{ fontSize: "1.75rem", letterSpacing: "0.04em", color: "rgba(255,255,255,0.85)" }}
            >
              {monogram}
            </span>
          )}
        </div>

        <h3
          className="font-bold mt-5"
          style={{ fontSize: "1.25rem", lineHeight: 1.25, color: "#ffffff" }}
        >
          {item.client}
        </h3>

        {/* Sector + flagged market */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className="font-bold"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {item.sector}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full"
            style={{
              padding: "0.2rem 0.55rem",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.72)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "0.875rem", lineHeight: 1 }}>
              {item.flag}
            </span>
            {item.market}
          </span>
        </div>

        <p
          className="font-light mt-4"
          style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}
        >
          {item.body}
        </p>

        <span
          className="perf-hl-cta inline-flex items-center gap-2 font-medium mt-auto pt-4"
          style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Read the case study
          <span aria-hidden="true" className="perf-hl-arrow">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ── One capability, shown as a full-bleed showcase panel ──
   Mirrors the Website Design page's build-tier panels: artwork spans the
   viewport behind the copy and a scrim keeps the left column readable.
   Until `media` is supplied the artwork slot renders a branded wash. */
function CapabilityPanel({ cap }: { cap: Capability }) {
  const glow = CAPABILITY_GLOW[cap.accent];

  return (
    <div
      className="relative perf-cap-card"
      style={{ minHeight: "clamp(30rem, 40vw, 38rem)" }}
    >
      {/* ── Backdrop: artwork when it exists, branded wash until then ── */}
      {cap.media ? (
        cap.media.type === "video" ? (
          <div aria-hidden="true" className="perf-cap-bleed">
            <video
              key={cap.media.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover", objectPosition: "right center" }}
            >
              <source src={cap.media.src} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div aria-hidden="true" className="perf-cap-bleed">
            {/* Eager, not lazy: only the selected capability's artwork is
                mounted, and it is the focal content of a panel the visitor
                has just clicked. Lazy loading left the panel blank on switch
                because the newly mounted image did not always trigger a
                fetch before it was needed. */}
            <Image
              key={cap.media.src}
              src={cap.media.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "right center" }}
            />
          </div>
        )
      ) : (
        <div
          aria-hidden="true"
          className="perf-cap-bleed"
          style={{ background: CAPABILITY_WASH[cap.accent] }}
        />
      )}
      <div aria-hidden="true" className="perf-cap-bleed perf-cap-scrim" />

      {/* ── Copy, overlaid on the left ── */}
      {/* The panel sets a min-height rather than a height, so h-full here
          resolves to auto and this wrapper is content-sized — items-center
          has nothing to centre within, and padding-top positions the copy
          directly. Raising it from 3.5rem to 5.5rem nudges the block down
          without disturbing anything else. */}
      <div
        className="relative h-full flex items-center"
        style={{
          paddingTop: "clamp(3.5rem, 7vw, 5.5rem)",
          paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)",
        }}
      >
        <div className="w-full lg:max-w-[30rem]">
          <span
            className="relative inline-flex items-center justify-center rounded-full font-bold"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "0.8125rem",
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
              boxShadow: `0 0 24px ${glow}0.32)`,
            }}
          >
            {cap.num}
          </span>

          <h3
            className="font-bold mt-5"
            style={{
              fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)",
              lineHeight: 1.2,
              color: "#ffffff",
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
            }}
          >
            {cap.title}
          </h3>

          <p
            className="font-light mt-2"
            style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}
          >
            {cap.forWhom}
          </p>

          <p
            className="font-light mt-4"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.68)" }}
          >
            {cap.body}
          </p>

          <div className="mt-6">
            <PrimaryCTA label={cap.cta} small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Process step glyph ──
   Always orange, brighter when the step is the one currently in the middle
   of the viewport. Matches the treatment on the Website Design page. */
function StepGlyph({ icon, active }: { icon: StepIcon; active: boolean }) {
  const stroke = active ? "#ff8a4c" : "rgba(255,122,61,0.65)";
  const accent = active ? "#ffb894" : "rgba(255,154,90,0.6)";

  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icon === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.7" />
          <path d="M15.6 8.4l-2.2 5.2-5.2 2.2 2.2-5.2z" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}
      {icon === "blueprint" && (
        <>
          <rect x="3.2" y="4.2" width="17.6" height="15.6" rx="2.4" stroke={stroke} strokeWidth="1.7" />
          <path d="M3.2 9.2h17.6M9.4 9.2v10.6" stroke={accent} strokeWidth="1.5" />
        </>
      )}
      {icon === "flask" && (
        <>
          <path
            d="M9.4 3.2h5.2M10.2 3.2v6L5.4 18.4a1.9 1.9 0 0 0 1.7 2.4h9.8a1.9 1.9 0 0 0 1.7-2.4L13.8 9.2v-6"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 14.6h8" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {icon === "growth" && (
        <>
          <path d="M3.6 17.4l5-5.2 3.4 3.2 6.2-7" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.6 8.4h4.6V13" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {icon === "gauge" && (
        <>
          <path d="M3.6 17.2a8.8 8.8 0 1 1 16.8 0" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M12 17.2l4.2-5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="17.2" r="1.5" fill={accent} />
        </>
      )}
    </svg>
  );
}

/* ── One step on the timeline ──
   Alternates side by side of a centre rail on desktop; stacks with the rail
   on the left below lg. The step nearest the middle of the viewport lights
   up, so the rail reads as a progress indicator while you scroll. */
function ProcessStep({
  step,
  index,
}: {
  step: (typeof PROCESS.steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const rightSide = index % 2 === 0; // 01 right, 02 left, 03 right …

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      /* Narrow band through the middle of the screen = the "current" step */
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const glyph = (alignRight: boolean) => (
    <span
      className={`block mb-4 ${alignRight ? "lg:flex lg:justify-end" : ""}`}
      style={{
        filter: active
          ? "drop-shadow(0 0 14px rgba(255,122,61,0.55))"
          : "drop-shadow(0 0 8px rgba(255,122,61,0.2))",
        opacity: active ? 1 : 0.55,
        transform: active ? "scale(1.04)" : "scale(1)",
        transition:
          "opacity 0.45s ease, filter 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <StepGlyph icon={step.icon} active={active} />
    </span>
  );

  const text = (
    <div className={rightSide ? "lg:pl-14" : "lg:pr-14 lg:text-right"}>
      {glyph(!rightSide)}
      <h3
        className="font-bold perf-step-text"
        style={{ fontSize: "1.125rem", color: "#ffffff", animationDelay: "0.05s" }}
      >
        {step.title}
      </h3>
      <p
        className="font-light mt-3 perf-step-text"
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.6)",
          animationDelay: "0.16s",
        }}
      >
        {step.body}
      </p>
    </div>
  );

  const marker = (
    <span
      className="relative flex items-center justify-center rounded-full font-bold shrink-0"
      style={{
        width: "3.25rem",
        height: "3.25rem",
        fontSize: "0.9375rem",
        background: active
          ? "linear-gradient(160deg, #ff8a4c 0%, #ff5a2b 100%)"
          : "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: active ? "1px solid rgba(255,170,120,0.7)" : "1px solid rgba(255,255,255,0.18)",
        color: active ? "#ffffff" : "rgba(255,255,255,0.5)",
        boxShadow: active
          ? "0 0 34px rgba(255,122,61,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
          : "0 0 18px rgba(0,0,0,0.5)",
        transform: active ? "scale(1.06)" : "scale(1)",
        transition:
          "background 0.45s ease, border-color 0.45s ease, color 0.45s ease, box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {step.num}
    </span>
  );

  return (
    <div ref={ref} className="relative">
      <div
        className="hidden lg:grid items-center"
        style={{ gridTemplateColumns: "1fr auto 1fr", columnGap: "0" }}
      >
        <Reveal delay={Math.min(index * 0.05, 0.25)}>{rightSide ? <span /> : text}</Reveal>
        <div className="flex justify-center">{marker}</div>
        <Reveal delay={Math.min(index * 0.05, 0.25)}>{rightSide ? text : <span />}</Reveal>
      </div>

      <div className="lg:hidden flex gap-5">
        <div className="shrink-0">{marker}</div>
        <Reveal delay={Math.min(index * 0.05, 0.25)} className="flex-1">
          <div>
            {glyph(false)}
            <h3
              className="font-bold perf-step-text"
              style={{ fontSize: "1.0625rem", color: "#ffffff", animationDelay: "0.05s" }}
            >
              {step.title}
            </h3>
            <p
              className="font-light mt-3 perf-step-text"
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                animationDelay: "0.16s",
              }}
            >
              {step.body}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ── Industry glyph ──
   Same gradient-stroke treatment as the Why-ARQQA marks, so the two icon
   sets read as one family. Gradient ids are keyed off the icon name because
   SVG paint servers resolve globally. */
function IndustryGlyph({ name }: { name: IndustryIcon }) {
  const gid = `ind-grad-${name}`;
  const common = {
    fill: "none",
    stroke: `url(#${gid})`,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5aa2ff" />
          <stop offset="45%" stopColor="#9fc8ff" />
          <stop offset="100%" stopColor="#ff7a3d" />
        </linearGradient>
      </defs>

      {name === "sparkle" && (
        <>
          <path d="M12 3.2l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1L5 10.2l5.1-1.9L12 3.2z" {...common} />
          <path d="M18.4 16.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" {...common} />
        </>
      )}
      {name === "hanger" && (
        <>
          <path d="M12 7.4a2.1 2.1 0 1 1 2.1-2.1" {...common} />
          <path d="M12 7.4v2.1L3.8 15a1.6 1.6 0 0 0 .9 3h14.6a1.6 1.6 0 0 0 .9-3L12 9.5" {...common} />
        </>
      )}
      {name === "pulse" && (
        <>
          <path d="M3 12.4h3.6l2-4.6 3 9.4 2.3-6 1.6 3.2H21" {...common} />
        </>
      )}
      {name === "landmark" && (
        <>
          <path d="M3.4 9.6L12 4.4l8.6 5.2" {...common} />
          <path d="M5.6 10.6v7.6M10 10.6v7.6M14 10.6v7.6M18.4 10.6v7.6" {...common} />
          <path d="M3.2 19.8h17.6" {...common} />
        </>
      )}
      {name === "lock" && (
        <>
          <rect x="4.2" y="10.2" width="15.6" height="10" rx="2.4" {...common} />
          <path d="M8 10.2V7.8a4 4 0 0 1 8 0v2.4" {...common} />
          <circle cx="12" cy="15.2" r="1.5" {...common} />
        </>
      )}
      {name === "coins" && (
        <>
          <ellipse cx="12" cy="6.6" rx="7" ry="2.9" {...common} />
          <path d="M5 6.6v4.9c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9V6.6" {...common} />
          <path d="M5 11.5v4.9c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-4.9" {...common} />
        </>
      )}
    </svg>
  );
}

/* ── One industry, sized for the auto-scrolling rail ── */
function IndustryCard({ item }: { item: (typeof INDUSTRIES.items)[number] }) {
  return (
    <div className="perf-ind relative rounded-2xl shrink-0 flex items-center gap-4">
      <span className="perf-ind-tile inline-flex items-center justify-center shrink-0">
        <IndustryGlyph name={item.icon} />
      </span>
      <div className="min-w-0">
        <h3 className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
          {item.name}
        </h3>
        <p
          className="font-light mt-1"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {item.detail}
        </p>
      </div>
    </div>
  );
}

/* ── Radical Transparency — full-screen scroll sequence ──────────────────
   One capability per viewport-height slide, following the Core Value
   Proposition section on the Catalyst System page. A tall wrapper drives the
   scroll while an inner sticky stage holds every slide stacked; the handler
   converts scroll position into a per-slide offset `t` (0 = centred, ±1 =
   one screen away) and moves copy and visual at different rates, so the two
   planes separate as a slide enters and leaves.
   ---------------------------------------------------------------------- */
function TransparencySlideMedia({ slide }: { slide: TransparencySlide }) {
  const common: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "right center",
    transformOrigin: "right center",
  };

  if (!slide.media) {
    /* Branded wash until artwork is supplied. */
    return (
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, background: TRANSPARENCY_WASH[slide.accent] }}
      />
    );
  }
  if (slide.media.type === "video") {
    return (
      <video autoPlay muted loop playsInline aria-hidden="true" style={common}>
        <source src={slide.media.src} type="video/mp4" />
      </video>
    );
  }
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={slide.media.src} alt="" aria-hidden="true" style={common} />;
}

function TransparencyStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    function update() {
      ticking = false;
      const rect = wrap!.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;

      TRANSPARENCY.slides.forEach((_, i) => {
        const slide = slideRefs.current[i];
        const text = textRefs.current[i];
        const visual = visualRefs.current[i];
        const dot = dotRefs.current[i];
        if (!slide) return;

        /* 0 when this slide is centred, negative before, positive after. */
        const t = scrolled / vh - i;
        const dist = Math.min(Math.abs(t), 1.4);

        /* Hold at full strength through the middle, then clear quickly — the
           fade must finish before the neighbouring slide arrives, or two
           headlines sit legibly on top of each other. */
        const raw = dist <= 0.32 ? 1 : Math.max(0, 1 - (dist - 0.32) / 0.18);
        const opacity = raw * raw * (3 - 2 * raw);

        slide.style.opacity = opacity.toFixed(3);
        slide.style.zIndex = String(100 - Math.round(dist * 100));
        slide.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
        slide.style.filter =
          dist <= 0.32
            ? "none"
            : `blur(${(Math.min((dist - 0.32) / 0.18, 1) * 8).toFixed(1)}px)`;

        if (!reduceMotion) {
          if (text) text.style.transform = `translate3d(0, ${(-t * 130).toFixed(1)}px, 0)`;
          if (visual)
            visual.style.transform = `translate3d(0, ${(-t * 42).toFixed(1)}px, 0) scale(${(
              1 + Math.min(dist, 1) * 0.05
            ).toFixed(4)})`;
        }

        if (dot) {
          dot.style.background =
            dist < 0.5
              ? "linear-gradient(120deg, #5aa2ff 0%, #ff9a5a 100%)"
              : "rgba(255,255,255,0.2)";
          dot.style.transform = dist < 0.5 ? "scaleX(1)" : "scaleX(0.55)";
        }
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: `${TRANSPARENCY.slides.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {TRANSPARENCY.slides.map((slide, i) => (
          <div
            key={slide.title}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center px-6"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            {/* Background plane — the slide's own artwork, full bleed. */}
            <div
              ref={(el) => {
                visualRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden"
              style={{ willChange: "transform", transformOrigin: "right center" }}
              aria-hidden="true"
            >
              <TransparencySlideMedia slide={slide} />
            </div>
            {/* Legibility scrim — weighted left, clearing before the right so
                the artwork keeps its focal area. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 perf-tp-scrim pointer-events-none"
            />

            <div className="relative w-full max-w-6xl mx-auto">
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="lg:max-w-[38%]"
                style={{ willChange: "transform" }}
              >
                <Eyebrow className="mb-6">{`0${i + 1} — In real time`}</Eyebrow>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.875rem, 3.8vw, 3rem)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  {slide.title}
                </h3>
                <p
                  className="font-light mt-6"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "34rem",
                  }}
                >
                  {slide.body}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Progress rail */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
          style={{ bottom: "2.5rem", zIndex: 200 }}
          aria-hidden="true"
        >
          {TRANSPARENCY.slides.map((slide, i) => (
            <span
              key={slide.title}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              style={{
                display: "block",
                width: "2.25rem",
                height: "2px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.2)",
                transition: "background 0.45s ease, transform 0.45s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FAQ row ── */
function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.7) 100%)",
        border: isOpen ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.1)",
        transition: "border-color 0.3s ease",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left flex items-start justify-between gap-6 p-6"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span
          className="font-medium"
          style={{ fontSize: "1rem", lineHeight: 1.5, color: "#ffffff" }}
        >
          {item.q}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0"
          style={{
            color: "rgba(255,255,255,0.6)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            fontSize: "1.25rem",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            className="font-light px-6 pb-6"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Lead form ──
   No backend is wired here, so the form validates and confirms locally.
   Hidden UTM fields are populated from the query string for attribution. */
function AuditForm() {
  const [sent, setSent] = useState(false);
  const [utm, setUtm] = useState({ campaign: "", keyword: "", adgroup: "" });

  /* Deferred to the next frame: reading the query string is synchronous, but
     setting state directly in an effect body triggers a cascading render. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      setUtm({
        campaign: p.get("utm_campaign") ?? "",
        keyword: p.get("utm_term") ?? "",
        adgroup: p.get("utm_content") ?? "",
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const field: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#ffffff",
    fontSize: "0.9375rem",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "0.5rem",
    display: "block",
  };

  if (sent) {
    return (
      <div
        className="rounded-3xl p-10 text-center"
        style={{
          background: "linear-gradient(170deg, rgba(14,16,26,0.7) 0%, rgba(6,8,14,0.8) 100%)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <p className="font-bold" style={{ fontSize: "1.25rem", color: "#ffffff" }}>
          Thank you — your audit request is in.
        </p>
        <p
          className="font-light mt-3 mx-auto"
          style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "26rem" }}
        >
          A senior strategist will review your setup and come back within 24 hours with
          specific findings.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl p-8 sm:p-10"
      style={{
        background: "linear-gradient(170deg, rgba(14,16,26,0.7) 0%, rgba(6,8,14,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <input type="hidden" name="utm_campaign" value={utm.campaign} readOnly />
      <input type="hidden" name="utm_term" value={utm.keyword} readOnly />
      <input type="hidden" name="utm_content" value={utm.adgroup} readOnly />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle} htmlFor="pm-name">Full Name *</label>
          <input id="pm-name" name="name" required style={field} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="pm-company">Company Name *</label>
          <input id="pm-company" name="company" required style={field} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="pm-email">Email Address *</label>
          <input id="pm-email" name="email" type="email" required style={field} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="pm-phone">Phone Number *</label>
          <input id="pm-phone" name="phone" type="tel" required style={field} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="pm-industry">Industry *</label>
          <select id="pm-industry" name="industry" required defaultValue="" style={field}>
            <option value="" disabled>Select an industry</option>
            {LEAD_FORM.industryOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="pm-spend">Current Monthly Ad Spend</label>
          <select id="pm-spend" name="spend" defaultValue="" style={field}>
            <option value="" disabled>Select a range</option>
            {LEAD_FORM.spendOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label style={labelStyle} htmlFor="pm-challenge">Biggest Challenge Right Now</label>
          <textarea id="pm-challenge" name="challenge" rows={4} style={{ ...field, resize: "vertical" }} />
        </div>
      </div>

      <button
        type="submit"
        className="perf-submit block w-full mt-7 rounded-2xl"
        style={{
          padding: "1px",
          border: "none",
          cursor: "pointer",
          background:
            "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
          boxShadow:
            "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
        }}
      >
        <span
          className="flex items-center justify-center rounded-2xl font-medium"
          style={{
            padding: "0.9375rem 2.25rem",
            background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
            color: "#ffffff",
            fontSize: "0.9375rem",
          }}
        >
          {LEAD_FORM.submitLabel}
        </span>
      </button>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
        {LEAD_FORM.trustSignals.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 font-light"
            style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}
          >
            <span aria-hidden="true" style={{ color: "#5aa2ff" }}>✔</span>
            {t}
          </span>
        ))}
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════════════════════ */

export function PerformanceMarketingPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCap, setActiveCap] = useState(0);

  return (
    <div className="relative">
      {/* ══ 1 · Hero — full-bleed video, matching the Website Design page ══ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/charts.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.4) 32%, rgba(3,3,5,0.6) 62%, rgba(3,3,5,0.9) 84%, #030305 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.5) 45%, rgba(3,3,5,0.15) 75%, transparent 100%)",
          }}
        />

        <div
          className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
          style={{ minHeight: "100vh", padding: "11rem 1.5rem 6rem" }}
        >
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
              <span aria-hidden="true">←</span> Services
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              className="font-bold mt-6"
              style={{
                fontSize: "clamp(2.1rem, 5.4vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              {HERO.headline}
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 34px rgba(52,68,224,0.4))",
                }}
              >
                {HERO.headlineAccent}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.14} className="flex flex-col items-center">
            <p
              className="font-light mt-6 max-w-2xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}
            >
              {HERO.sub}
            </p>

            <div className="mt-8">
              <PrimaryCTA label={HERO.ctaLabel} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Big numbers — bare stats, no cards; blends up into the hero ══ */}
      <section
        className="relative w-full"
        style={{ padding: "6rem 1.5rem 5rem", marginTop: "-1px" }}
      >
        {/* Softens the seam where the hero's black ends — the section fades up
            into it instead of meeting it on a hard horizontal line. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "16rem",
            background:
              "linear-gradient(180deg, #030305 0%, rgba(3,3,5,0.6) 45%, transparent 100%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center">
          {BIG_NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={Math.min(i * 0.12, 0.4)}>
              <div
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  backgroundImage:
                    "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <CountUp value={n.value} display={n.display} delay={i * 150} />
              </div>
              <p
                className="font-light mt-3"
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {n.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 2 · The problem ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="The Problem"
            title={PROBLEM.heading}
            accentTail={PROBLEM.headingAccent}
            body={PROBLEM.body}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEM.cards.map((card, i) => (
              <PainCard key={card.pain} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3 · What we do — pill-selected showcase panels ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="What We Do"
            title={WHAT_WE_DO.heading}
            accentTail={WHAT_WE_DO.headingAccent}
            body={WHAT_WE_DO.body}
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {WHAT_WE_DO.capabilities.map((cap, i) => {
              const active = activeCap === i;
              return (
                <button
                  key={cap.key}
                  type="button"
                  onClick={() => setActiveCap(i)}
                  className="rounded-full font-medium"
                  style={{
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.8125rem",
                    color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                    background: active
                      ? "linear-gradient(120deg, rgba(255,122,61,0.3) 0%, rgba(47,107,255,0.3) 100%)"
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? "1px solid rgba(255,255,255,0.35)"
                      : "1px solid rgba(255,255,255,0.12)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {cap.title}
                </button>
              );
            })}
          </div>

          <Reveal key={activeCap}>
            <CapabilityPanel cap={WHAT_WE_DO.capabilities[activeCap]} />
          </Reveal>
        </div>
      </section>

      {/* ══ 4 · The numbers, broken down ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="The Proof"
            title={BREAKDOWN.heading}
            accentTail={BREAKDOWN.headingAccent}
            body={BREAKDOWN.body}
          />
          {/* Vertical cards, three to a row: icon, counted figure, label, copy. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BREAKDOWN.metrics.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} />
            ))}
          </div>

          <Reveal delay={0.14} className="text-center mt-10">
            <PrimaryCTA label={BREAKDOWN.cta.label} href={BREAKDOWN.cta.href} small />
          </Reveal>
        </div>
      </section>

      {/* ══ 5 · Proof in practice — static grid ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Proof in Practice"
            title={HIGHLIGHTS.heading}
            accentTail={HIGHLIGHTS.headingAccent}
          />

          <div className="perf-hl-grid">
            {HIGHLIGHTS.cards.map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 0.06, 0.3)}>
                <HighlightCard item={c} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="text-center mt-12">
            <PrimaryCTA label={HIGHLIGHTS.cta.label} href={HIGHLIGHTS.cta.href} small />
          </Reveal>
        </div>
      </section>

      {/* ══ 6 · Clients ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "6rem 0" }}>
        <div className="relative max-w-6xl mx-auto px-6">
          <SectionHead
            eyebrow="Clients"
            title={CLIENTS.heading}
            accentTail={CLIENTS.headingAccent}
            body={CLIENTS.body}
          />
        </div>

        <div className="perf-marquee relative w-full">
          <div className="perf-marquee-track">
            {[...CLIENTS.logos, ...CLIENTS.logos].map((c, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${c.name}-${i}`}
                src={c.logo}
                alt={c.name}
                className="perf-marquee-item"
                style={{ height: `${4 * (c.scale ?? 1)}rem`, width: "auto" }}
              />
            ))}
          </div>
        </div>

      </section>

      {/* ══ 7 · How we work — scroll-lit timeline ══ */}
      <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <SectionHead
            eyebrow="How We Work"
            title={PROCESS.heading}
            accentTail={PROCESS.headingAccent}
          />

          <div className="relative">
            {/* Vertical rail — centred on desktop, behind the markers on
                mobile. Fades out at both ends. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 hidden lg:block"
              style={{
                left: "50%",
                width: "1px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 8%, rgba(255,255,255,0.18) 92%, transparent 100%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 lg:hidden"
              style={{
                left: "1.625rem",
                width: "1px",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 8%, rgba(255,255,255,0.18) 92%, transparent 100%)",
              }}
            />

            <div className="relative flex flex-col gap-12 lg:gap-14">
              {PROCESS.steps.map((step, i) => (
                <ProcessStep key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8 · Radical transparency — full-screen scroll sequence ══
          Framed exactly like the Catalyst System page's Core Value
          Proposition: a plain centred heading block on the page backdrop,
          then the sticky story. It previously carried a radial glow on an
          overflow-hidden section, which clipped on the section's bottom edge
          and drew a hard line where the story began. */}
      <section className="relative px-6 py-24">
        {/* The story's first slide paints its scrim from its very top edge,
            while the backdrop above still carries the gradient field's glow —
            so the two met on a hard line. This band carries the same scrim,
            faded in vertically, so the boundary matches at every horizontal
            position rather than only in the middle. */}
        <div
          aria-hidden="true"
          className="perf-tp-scrim perf-tp-ramp absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: "10rem" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <SectionHead
            eyebrow="Radical Transparency"
            title={TRANSPARENCY.heading}
            accentTail={TRANSPARENCY.headingAccent}
            body={TRANSPARENCY.body}
          />
        </div>
      </section>

      <TransparencyStory />

      {/* ══ 9 · Why ARQQA ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Why ARQQA"
            title={WHY.heading}
            accentTail={WHY.headingAccent}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.items.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.08, 0.32)} className="h-full">
                <div className="perf-why-card h-full rounded-3xl p-7">
                  <span className="perf-why-tile inline-flex items-center justify-center">
                    <WhyIconMark name={item.icon} />
                  </span>
                  <h3
                    className="font-bold mt-5"
                    style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-light mt-3"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10 · Industries — auto-scrolling rail ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "6rem 0" }}>
        <div className="relative max-w-5xl mx-auto px-6">
          <SectionHead
            eyebrow="Industries"
            title={INDUSTRIES.heading}
            accentTail={INDUSTRIES.headingAccent}
          />
        </div>

        {/* Two copies of the set so translating by -50% loops seamlessly;
            spacing is a right margin rather than flex gap so every item
            occupies exactly the same stride. */}
        <div className="perf-ind-rail relative w-full">
          <div className="perf-ind-track">
            {INDUSTRIES.items.map((it) => (
              <IndustryCard key={it.name} item={it} />
            ))}
            {INDUSTRIES.items.map((it) => (
              <div key={`dup-${it.name}`} aria-hidden="true" className="contents">
                <IndustryCard item={it} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11 · Lead form ══ */}
      <section id="audit-form" className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <SectionHead
            eyebrow="Free Audit"
            title={LEAD_FORM.heading}
            accentTail={LEAD_FORM.headingAccent}
            body={LEAD_FORM.body}
          />
          <Reveal delay={0.1}>
            <AuditForm />
          </Reveal>
        </div>
      </section>

      {/* ══ 12 · FAQ ══ */}
      <section className="relative w-full" style={{ padding: "5rem 1.5rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <SectionHead eyebrow="FAQ" title="Questions," accentTail="Answered." />
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Offices — contact details, directly above the closing CTA ══ */}
      <OfficesSection />

      {/* ══ 13 · Closing CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "1rem 1.5rem 9rem" }}>
        {/* Horizon light-streak backdrop, masked so it dissolves at both edges.
            The long fade in from black at the top keeps the artwork from
            starting on a visible edge under the section above. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/services/website-dev-cta-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.55) 46%, black 62%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.55) 46%, black 62%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 24%, rgba(3,3,5,0.4) 74%, transparent 100%)",
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
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <p
              className="font-bold"
              style={{
                fontSize: "clamp(1.05rem, 2.1vw, 1.5rem)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                backgroundImage:
                  "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {CLOSING.line}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="font-light mt-5 mx-auto"
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "34rem",
              }}
            >
              {CLOSING.body}
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-9">
            <PrimaryCTA label={CLOSING.ctaLabel} />
          </Reveal>
        </div>
      </section>

      <style>{`
        /* Radical Transparency slide scrim — heavy under the copy on the
           left, clearing before the right so the artwork keeps its focal
           area. Vertical on mobile where the copy sits over the whole frame. */
        .perf-tp-scrim {
          background: linear-gradient(
            180deg,
            rgba(3,3,8,0.86) 0%,
            rgba(3,3,8,0.78) 55%,
            rgba(3,3,8,0.9) 100%
          );
        }
        /* Ramp into the story. It reuses .perf-tp-scrim so it carries the
           identical horizontal profile — heavy left, clearing right — and
           adds a vertical fade. A flat dark ramp could not work: the scrim
           is nearly transparent on the right, so a uniform band would have
           matched on the left and formed a fresh edge on the right. */
        .perf-tp-ramp {
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 100%);
        }
        @media (min-width: 1024px) {
          .perf-tp-scrim {
            background: linear-gradient(
              90deg,
              rgba(3,3,8,0.94) 0%,
              rgba(3,3,8,0.88) 34%,
              rgba(3,3,8,0.6) 50%,
              rgba(3,3,8,0.18) 64%,
              rgba(3,3,8,0) 76%
            );
          }
        }

        /* Why-ARQQA card. Hover drives both the card and its icon tile from
           one rule, so the tile responds to the whole card rather than only
           to the cursor being over the icon itself. */
        .perf-why-card {
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
        }
        .perf-why-card:hover {
          transform: translateY(-6px);
          background: linear-gradient(170deg, rgba(22,26,42,0.78) 0%, rgba(10,13,22,0.84) 100%);
          border-color: rgba(255,138,90,0.45);
          box-shadow: 0 -14px 40px -18px rgba(255,122,61,0.3),
                      0 24px 50px -22px rgba(47,107,255,0.28);
        }

        /* Industries rail — one row, scrolling continuously. */
        .perf-ind-rail {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        .perf-ind-track {
          display: flex;
          align-items: stretch;
          width: max-content;
          padding: 0.75rem 0;
          animation: perfIndScroll 34s linear infinite;
        }
        @keyframes perfIndScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .perf-ind {
          width: 20rem;
          margin-right: 1.25rem;
          padding: 1.15rem 1.35rem;
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .perf-ind:hover {
          transform: translateY(-3px);
          border-color: rgba(255,138,90,0.4);
          background: linear-gradient(170deg, rgba(22,26,42,0.78) 0%, rgba(10,13,22,0.84) 100%);
        }
        .perf-ind-tile {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 0.9rem;
          background: linear-gradient(160deg, #15171f 0%, #0b0c12 55%, #08090d 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* Why-ARQQA icon tile — dark, softly rounded, thin rim, with a faint
           inner highlight along the top edge so it reads as a raised chip
           rather than a flat swatch. */
        .perf-why-tile {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1.15rem;
          background: linear-gradient(160deg, #15171f 0%, #0b0c12 55%, #08090d 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07),
                      0 10px 24px -14px rgba(0,0,0,0.9);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .perf-why-card:hover .perf-why-tile {
          border-color: rgba(255,255,255,0.2);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1),
                      0 12px 28px -14px rgba(0,0,0,0.9),
                      0 0 26px -10px rgba(90,162,255,0.4);
        }

        /* Proof-in-practice grid. The reveal wrapper sits between the grid
           and the card, so it is made a flex column with the card flexing to
           fill — a percentage height there would resolve against a
           content-sized track and collapse, leaving the cards ragged. */
        .perf-hl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
          gap: 1.5rem;
          align-items: stretch;
        }
        .perf-hl-grid > * { display: flex; flex-direction: column; }
        .perf-hl-grid > * > .perf-hl { flex: 1; }

        .perf-hl {
          min-height: 22rem;
          cursor: pointer;
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .perf-hl:hover {
          transform: translateY(-6px);
          border-color: rgba(255,138,90,0.45);
          box-shadow: 0 -14px 40px -18px rgba(255,122,61,0.3),
                      0 24px 50px -22px rgba(47,107,255,0.28);
        }
        .perf-hl-art {
          background-image: url(/services/metric-card-bg.webp);
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          transform: scale(1);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .perf-hl:hover .perf-hl-art { opacity: 0.5; transform: scale(1.08); }
        .perf-hl-scrim {
          background: linear-gradient(180deg, rgba(4,5,10,0.62) 0%, rgba(4,5,10,0.76) 45%, rgba(4,5,10,0.9) 100%);
          opacity: 0.9;
          transition: opacity 0.6s ease;
        }
        .perf-hl:hover .perf-hl-scrim { opacity: 0.82; }

        .perf-hl-logo {
          width: 100%;
          height: 3.5rem;
          opacity: 0.92;
          transition: opacity 0.4s ease;
        }
        .perf-hl:hover .perf-hl-logo { opacity: 1; }
        .perf-hl-cta { color: rgba(255,255,255,0.5); transition: color 0.3s ease; }
        .perf-hl:hover .perf-hl-cta { color: #ffffff; }
        .perf-hl-arrow { display: inline-block; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
        .perf-hl:hover .perf-hl-arrow { transform: translateX(4px); }

        /* Proof metric card — gradient artwork behind the content, lifting
           and brightening on hover. */
        .perf-metric {
          min-height: 26rem;
          background: linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.72) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .perf-metric:hover {
          transform: translateY(-6px);
          border-color: rgba(255,138,90,0.45);
          box-shadow: 0 -14px 40px -18px rgba(255,122,61,0.3),
                      0 24px 50px -22px rgba(47,107,255,0.28);
        }

        .perf-metric-art {
          background-image: url(/services/metric-card-bg.webp);
          background-size: cover;
          background-position: center;
          opacity: 0.34;
          transform: scale(1);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .perf-metric:hover .perf-metric-art {
          opacity: 0.62;
          transform: scale(1.08);
        }

        .perf-metric-scrim {
          background: linear-gradient(180deg, rgba(4,5,10,0.6) 0%, rgba(4,5,10,0.72) 45%, rgba(4,5,10,0.88) 100%);
          opacity: 0.86;
          transition: opacity 0.6s ease;
        }
        .perf-metric:hover .perf-metric-scrim { opacity: 0.78; }

        .perf-metric-icon {
          width: 2.75rem;
          height: 2.75rem;
          background: linear-gradient(150deg, rgba(90,162,255,0.22) 0%, rgba(255,154,90,0.16) 100%);
          border: 1px solid rgba(255,255,255,0.16);
          color: #9fc8ff;
          transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
        }
        .perf-metric:hover .perf-metric-icon {
          background: linear-gradient(150deg, rgba(90,162,255,0.34) 0%, rgba(255,154,90,0.28) 100%);
          border-color: rgba(255,255,255,0.3);
          color: #ffffff;
        }

        @keyframes perfCapCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .perf-cap-card {
          animation: perfCapCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Artwork and scrim span the viewport rather than the content column,
           so the panel reads as the page's own background. The vertical mask
           dissolves it into the sections above and below. */
        .perf-cap-bleed {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 100vw;
          transform: translateX(-50%);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 86%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 86%, transparent 100%);
        }

        /* Readability scrim: heavy under the copy, clearing before the
           artwork's focal side so the showcase is never washed out. */
        .perf-cap-scrim {
          background: linear-gradient(
            180deg,
            rgba(3,3,8,0.9) 0%,
            rgba(3,3,8,0.82) 55%,
            rgba(3,3,8,0.92) 100%
          );
        }
        @media (min-width: 1024px) {
          .perf-cap-scrim {
            background: linear-gradient(
              90deg,
              rgba(3,3,8,0.95) 0%,
              rgba(3,3,8,0.9) 32%,
              rgba(3,3,8,0.62) 46%,
              rgba(3,3,8,0.2) 60%,
              rgba(3,3,8,0) 74%
            );
          }
        }

        /* Inclusions tab — hover in CSS so the whole card responds without a
           re-render; open state rides on data-open. */
        .perf-inc {
          background: linear-gradient(170deg, rgba(14,16,26,0.72) 0%, rgba(6,8,14,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.12);
          transition: background 0.35s ease, border-color 0.35s ease,
                      transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .perf-inc:hover {
          background: linear-gradient(170deg, rgba(22,26,42,0.85) 0%, rgba(10,13,22,0.88) 100%);
          border-color: rgba(255,255,255,0.28);
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -22px rgba(0,0,0,0.9),
                      0 0 26px -12px var(--inc-glow, rgba(90,162,255,0.45));
        }
        .perf-inc-cta {
          color: rgba(255,255,255,0.65);
          transition: color 0.3s ease;
        }
        .perf-inc:hover .perf-inc-cta,
        .perf-inc[data-open="true"] .perf-inc-cta { color: #ffffff; }
        .perf-inc-arrow {
          display: inline-block;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .perf-inc:hover .perf-inc-arrow { transform: translateY(2px); }
        .perf-inc[data-open="true"] .perf-inc-arrow { transform: rotate(180deg); }

        @keyframes perfStepTextIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .perf-step-text {
          animation: perfStepTextIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        .perf-cta-arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .perf-cta:hover .perf-cta-arrow { transform: translateX(4px); }
        .perf-cta, .perf-submit {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .perf-cta:hover, .perf-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 -14px 38px -6px rgba(255,122,61,0.5),
                      0 14px 38px -10px rgba(47,107,255,0.45);
        }

        /* Client marquee — the track holds two copies of the roster, so
           translating it by exactly half its width loops seamlessly. */
        .perf-marquee {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .perf-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: perfMarquee 38s linear infinite;
        }
        .perf-marquee:hover .perf-marquee-track { animation-play-state: paused; }
        .perf-marquee-item {
          padding: 0.5rem 3rem;
          filter: grayscale(1) brightness(1.6);
          opacity: 0.65;
          transition: filter 0.4s ease, opacity 0.4s ease;
        }
        .perf-marquee-item:hover {
          filter: grayscale(0) brightness(1);
          opacity: 1;
        }
        @keyframes perfMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .perf-marquee-track { animation: none; }
          .perf-step-text { animation: none; }
          .perf-cap-card { animation: none; }
          .perf-metric, .perf-metric-art, .perf-metric-scrim { transition: none; }
          .perf-metric:hover { transform: none; }
          .perf-metric:hover .perf-metric-art { transform: none; }
          .perf-hl, .perf-hl-art, .perf-hl-scrim { transition: none; }
          .perf-hl:hover { transform: none; }
          .perf-hl:hover .perf-hl-art { transform: none; }
          .perf-ind-track { animation: none; }
          .perf-why-card, .perf-ind { transition: none; }
          .perf-why-card:hover, .perf-ind:hover { transform: none; }
          .perf-inc, .perf-inc-arrow { transition: none; }
          .perf-inc:hover { transform: none; }
          .perf-cta-arrow, .perf-cta, .perf-submit { transition: none; }
          .perf-cta:hover, .perf-submit:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}

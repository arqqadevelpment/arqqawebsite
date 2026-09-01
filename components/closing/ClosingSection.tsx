"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

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

/* Deterministic particle field — no Math.random so SSR and client agree */
const PARTICLES = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 37.7) % 100,
  top: (i * 53.3 + 11) % 100,
  size: 1 + ((i * 7) % 3),
  delay: (i * 0.9) % 7,
  duration: 6 + ((i * 3) % 6),
  warm: i % 3 === 0,
}));

export function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ padding: "9rem 1.5rem 10rem" }}
    >
      <style>{`
        @keyframes closingDrift {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(-46px); opacity: 0; }
        }
        @keyframes closingPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .closing-particle, .closing-halo { animation: none !important; }
        }
      `}</style>

      {/* Particle field */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="closing-particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.warm
                ? "rgba(255,150,90,0.8)"
                : "rgba(120,165,255,0.8)",
              boxShadow: p.warm
                ? "0 0 6px rgba(255,150,90,0.6)"
                : "0 0 6px rgba(120,165,255,0.6)",
              animation: `closingDrift ${p.duration}s linear ${p.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Deep center glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: "60rem",
          height: "34rem",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(47,107,255,0.13) 0%, rgba(255,110,50,0.05) 55%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <Eyebrow className="mb-5">THE FORK</Eyebrow>
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(1.875rem, 3.6vw, 2.9rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            ...reveal(0.18),
          }}
        >
          You Can Hire Another Agency.
          <br />
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
            Or You Can Activate a&nbsp;System.
          </span>
        </h2>
        <p
          className="font-light mt-6 max-w-2xl mx-auto"
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)",
            ...reveal(0.32),
          }}
        >
          The Catalyst System™ is engineered for performance, precision, and
          accountability. Every step is built to eliminate friction and
          multiply your ROI.
        </p>

        {/* ── Dual CTA — the fork ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14"
          style={reveal(0.46)}
        >
          {/* Harvest CTA — books a strategy call */}
          <Link
              href="/start#book-strategy-call"
              className="group relative inline-flex rounded-2xl"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                boxShadow:
                  "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
              }}
            >
              {/* Pulsing halo */}
              <span
                aria-hidden="true"
                className="closing-halo absolute pointer-events-none"
                style={{
                  width: "80%",
                  height: "1.75rem",
                  left: "10%",
                  top: "-1.125rem",
                  background:
                    "radial-gradient(50% 100% at 50% 100%, rgba(255,140,70,0.55) 0%, transparent 100%)",
                  filter: "blur(7px)",
                  animation: "closingPulse 2.6s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background:
                    "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  letterSpacing: "0.01em",
                }}
              >
                <span aria-hidden="true">⚡</span>
                <SlideLabel text="Start a Strategy Call" />
              </span>
            </Link>

          {/* Nurture CTA — gated growth audit */}
          <Link
              href="/start#growth-audit"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
              style={{
                padding: "1.0625rem 2.25rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "#ffffff",
                fontSize: "1rem",
                letterSpacing: "0.01em",
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
            >
              <span aria-hidden="true">📋</span>
              <SlideLabel text="Download the Growth Audit" />
            </Link>
        </div>
      </div>
    </section>
  );
}

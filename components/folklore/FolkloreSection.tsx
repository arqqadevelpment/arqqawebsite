"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Myth = {
  key: string;
  folklore: string;
  fact: string;
};

const MYTHS: Myth[] = [
  {
    key: "content",
    folklore: "“More content = more growth.”",
    fact: "65% of sales are driven by brand activity, not volume. Integration beats output.",
  },
  {
    key: "team",
    folklore: "“You need a bigger team.”",
    fact: "You need one system with accountability. 50 specialists, fully integrated.",
  },
  {
    key: "digital",
    folklore: "“Digital agencies understand digital.”",
    fact: "73% of agency relationships end due to poor communication, not poor work.",
  },
  {
    key: "performance",
    folklore: "“Performance marketing is the priority.”",
    fact: "The 60/40 Rule — 60% brand-building, 40% activation. Short-termism kills long-term growth.",
  },
];

function FlipCard({ myth, index }: { myth: Myth; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      className="relative shrink-0 snap-center cursor-pointer w-[min(78vw,19rem)] lg:w-auto"
      style={{
        height: "17rem",
        perspective: "1400px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
    >
      {/* Inner flipper */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
        }}
      >
        {/* ── FRONT: Folklore ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-3xl overflow-hidden p-7"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Faint red wash for the myth side */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 85% 0%, rgba(236,68,56,0.14) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <span
              className="inline-flex items-center gap-2 font-medium"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#ff8a75",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="#ff8a75" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Myth
            </span>
            <p
              className="font-bold mt-5"
              style={{
                fontSize: "1.375rem",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {myth.folklore}
            </p>
          </div>
          <span
            className="relative font-light"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Hover for the fact →
          </span>
        </div>

        {/* ── BACK: Fact ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-3xl overflow-hidden p-7"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundImage: "url(/card-gradient.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 44px -18px rgba(20,60,200,0.45)",
          }}
        >
          <div className="relative">
            <span
              className="inline-flex items-center gap-2 font-medium"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#9fd8ff",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6.5l2.6 2.6L10 3.5" stroke="#9fd8ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Fact
            </span>
            <p
              className="font-medium mt-5"
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.5,
                color: "#ffffff",
                textShadow: "0 1px 12px rgba(0,0,0,0.4)",
              }}
            >
              {myth.fact}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="relative block"
            style={{
              width: "2.5rem",
              height: "2px",
              background:
                "linear-gradient(90deg, #ff5a2b 0%, #6fa8ff 100%)",
              borderRadius: "1px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function FolkloreSection() {
  return (
    <section
      className="relative w-full"
      style={{ padding: "7rem 0" }}
    >
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Eyebrow className="mb-5">MYTH VS. FACT</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            <span className="block lg:whitespace-nowrap">
              The Industry Has a{" "}
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
                Structural&nbsp;Problem.
              </span>
            </span>
            Not a Creative One.
          </h2>
          <p
            className="font-light mt-5"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            You&apos;ve hired agencies before. The pattern is always the same:
            impressive pitch, inconsistent delivery, silent churn. The problem
            isn&apos;t talent. It&apos;s architecture.
          </p>
        </div>
      </div>

      {/* Cards — grid on desktop, snap horizontal scroll on mobile */}
      <div className="relative">
        <div
          className="flex lg:grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto px-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {MYTHS.map((myth, i) => (
            <FlipCard key={myth.key} myth={myth} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

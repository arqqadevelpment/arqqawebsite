"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

/* Placeholder content — swap for real, attributed client quotes before launch. */
const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  market: string;
}[] = [
  {
    quote:
      "ARQQA didn't just run our campaigns. They rebuilt how we think about growth — the strategy came first, and the media followed it.",
    name: "Client Name",
    role: "Chief Marketing Officer",
    market: "Egypt — Fintech",
  },
  {
    quote:
      "One system, one team, zero excuses. The reporting alone changed how our board meetings run.",
    name: "Client Name",
    role: "Managing Director",
    market: "KSA — Retail",
  },
  {
    quote:
      "We had four agencies before this. Now we have one partner who owns the number, and it shows in the results.",
    name: "Client Name",
    role: "Head of Digital",
    market: "UAE — Airlines",
  },
  {
    quote:
      "The creative finally matches the media strategy. That sounds obvious until you've spent years watching them work in isolation.",
    name: "Client Name",
    role: "Brand Director",
    market: "Egypt — FMCG",
  },
  {
    quote:
      "They told us what wasn't working before we asked. That's the difference between a vendor and a partner.",
    name: "Client Name",
    role: "Founder & CEO",
    market: "Morocco — App Growth",
  },
  {
    quote:
      "Onboarding took days, not months. Day one we had dashboards, owners, and a plan we could actually hold them to.",
    name: "Client Name",
    role: "VP Growth",
    market: "KSA — E-commerce",
  },
];

const STATS = [
  { value: "13", label: "Years operating" },
  { value: "4", label: "MENA markets" },
  { value: "50+", label: "Specialists" },
  { value: "100+", label: "Brands served" },
];

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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Threshold 0 — a ratio never resolves for blocks taller than the viewport.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
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

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={Math.min(index * 0.08, 0.32)} className="h-full">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-3xl p-7 h-full flex flex-col"
        style={{
          background:
            "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(255,138,90,0.5)"
            : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition:
            "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <span
          aria-hidden="true"
          className="block font-bold"
          style={{
            fontSize: "2rem",
            lineHeight: 0.6,
            backgroundImage:
              "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          &ldquo;
        </span>

        <p
          className="font-medium mt-5"
          style={{ fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.85)" }}
        >
          {item.quote}
        </p>

        <div
          className="mt-auto pt-6 flex items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span
            aria-hidden="true"
            className="shrink-0 flex items-center justify-center rounded-full font-bold"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "0.8125rem",
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
            }}
          >
            {item.name.charAt(0)}
          </span>
          <div>
            <p className="font-bold" style={{ fontSize: "0.875rem", color: "#ffffff" }}>
              {item.name}
            </p>
            <p
              className="font-light"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
            >
              {item.role} · {item.market}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function TestimonialsPageContent() {
  return (
    <>
      {/* ══ Hero ══ */}
      <section
        className="relative w-full"
        style={{ padding: "11rem 1.5rem 4rem" }}
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-6">Testimonials</Eyebrow>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Don&apos;t Take Our Word{" "}
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
                For It.
              </span>
            </h1>
            <p
              className="font-light mt-6 mx-auto"
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "36rem",
              }}
            >
              Thirteen years, four markets, and a long list of brands who stayed.
              Here is what working inside one accountable system actually
              changes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Stat strip ══ */}
      <section className="relative w-full" style={{ padding: "1rem 1.5rem 3rem" }}>
        <Reveal className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.02em",
                    backgroundImage:
                      "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="font-light mt-2"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ Quote grid ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, i) => (
              <TestimonialCard key={item.quote} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 7rem" }}>
        <Reveal className="relative max-w-3xl mx-auto text-center">
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Ready to add your own?
          </h2>
          <div className="mt-9 flex justify-center">
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
              <span
                className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  letterSpacing: "0.01em",
                }}
              >
                Book a strategy session
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    title: "Google Premier Partner",
    body: "Elite certification. Top-tier platform access and support.",
    image: "/trust/google-premier-partner.webp",
  },
  {
    title: "13 Years Continuous Operation",
    body: "Survived revolutions, pandemics, and economic volatility across MENA.",
    image: "/trust/continuous-operation.webp",
  },
  {
    title: "4 Markets Active",
    body: "Egypt, UAE, Saudi Arabia, Morocco. Proven cross-border delivery.",
    image: "/trust/markets-active.webp",
  },
  {
    title: "50+ Specialists",
    body: "Dedicated teams, not freelancers. Structured for retention and scale.",
    image: "/trust/specialists.webp",
  },
];

/*
 * Placeholder testimonials — swap in real client quotes (and the 30–60s
 * subtitled videos per the UX note) when collected.
 */
/* `avatar` takes a headshot or a client logo — drop the file in and set the
   path; cards fall back to a neutral glyph while real assets are pending. */
const TESTIMONIALS: { quote: string; name: string; role: string; avatar?: string }[] = [
  {
    quote:
      "ARQQA didn't just run our campaigns. They rebuilt how we think about growth.",
    name: "Client Name",
    role: "Title, Company",
  },
  {
    quote:
      "One system, one team, zero excuses. The reporting alone changed our board meetings.",
    name: "Client Name",
    role: "Title, Company",
  },
  {
    quote:
      "They operate like an internal growth department — not a vendor waiting for briefs.",
    name: "Client Name",
    role: "Title, Company",
  },
];

const SLIDE_MS = 2000;

/* One testimonial — static glass card with a "Read more" CTA */
function TestimonialCard({
  item,
  index,
}: {
  item: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden p-8"
        style={{
          background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          border: hovered
            ? "1px solid rgba(255,138,90,0.5)"
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.06)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Quote mark */}
        <span
          aria-hidden="true"
          className="block font-bold"
          style={{
            fontSize: "2.5rem",
            lineHeight: 0.6,
            backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          &ldquo;
        </span>

        <p
          className="font-medium mt-5"
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {item.quote}
        </p>

        <div className="flex items-center gap-3 mt-auto pt-6">
          <span
            className="shrink-0 flex items-center justify-center rounded-full overflow-hidden"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {item.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.avatar}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="6" r="3.1" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
                <path
                  d="M3.4 15.2c0-2.9 2.5-4.6 5.6-4.6s5.6 1.7 5.6 4.6"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          <p
            className="font-light"
            style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.02em",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              {item.name}
            </span>
            <br />
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TrustSection() {
  const [slide, setSlide] = useState(0);

  /* Auto-advance slides — runs continuously, never pauses on hover */
  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[slide];

  return (
    <section className="relative w-full">
      <style>{`
        @keyframes trustTextIn {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes trustKenBurns {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        @keyframes trustProgressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .trust-progress-fill {
          animation-name: trustProgressFill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .trust-progress-fill { animation: none; width: 100%; }
        }
      `}</style>

      {/* ── Full-screen storytelling slider — keeps rotating regardless of hover ── */}
      <div className="relative h-screen overflow-hidden">
        {/* Backgrounds — stacked, crossfading; active gets a slow settle */}
        {SLIDES.map((sl, i) => (
          <div
            key={sl.title}
            aria-hidden={i !== slide}
            className="absolute inset-0"
            style={{
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1.1s ease",
            }}
          >
            <Image
              src={sl.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                animation:
                  i === slide
                    ? `trustKenBurns ${SLIDE_MS + 1200}ms ease-out both`
                    : "none",
              }}
            />
          </div>
        ))}

        {/* Legibility overlay — stronger on the text side, soft at edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,5,0.78) 0%, rgba(3,3,5,0.45) 42%, rgba(3,3,5,0.05) 70%), linear-gradient(180deg, rgba(3,3,5,0.5) 0%, transparent 22%, transparent 78%, rgba(3,3,5,0.55) 100%)",
          }}
        />

        {/* Text content — keyed to slide so it re-animates each change */}
        <div className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex items-center">
          <div key={slide} className="max-w-xl">
            <p
              className="trust-anim font-light"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                animation: "trustTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
              }}
            >
              TRUST SIGNALS · 0{slide + 1} / 0{SLIDES.length}
            </p>
            <h2
              className="trust-anim font-bold mt-5"
              style={{
                fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.6)",
                animation: "trustTextIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.22s both",
              }}
            >
              {s.title}
            </h2>
            <p
              className="trust-anim font-light mt-6"
              style={{
                fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                animation: "trustTextIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.36s both",
              }}
            >
              {s.body}
            </p>
            {/* Accent underline */}
            <span
              aria-hidden="true"
              className="trust-anim block mt-8"
              style={{
                width: "3.5rem",
                height: "2px",
                borderRadius: "1px",
                background: "linear-gradient(90deg, #5aa2ff 0%, #ff7a3d 100%)",
                animation: "trustTextIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.48s both",
              }}
            />

            {/* Controls — dots + arrows, anchored under the text */}
            <div className="flex items-center gap-5 mt-10">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setSlide((slide + SLIDES.length - 1) % SLIDES.length)}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.8)",
              transition: "background 0.3s ease",
            }}
          >
            ←
          </button>
          {/* Progress indicator — the active bar fills over the slide duration,
              so it's obvious the banner auto-advances and more are queued */}
          <div className="flex items-center gap-2.5" role="group" aria-label={`Slide ${slide + 1} of ${SLIDES.length}`}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
                className="relative rounded-full cursor-pointer overflow-hidden"
                style={{
                  width: i === slide ? "3rem" : "0.5rem",
                  height: "0.5rem",
                  border: "none",
                  padding: 0,
                  background: "rgba(255,255,255,0.25)",
                  transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {i === slide && (
                  <span
                    key={slide}
                    aria-hidden="true"
                    className="trust-progress-fill absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: "#ff5a2b",
                      boxShadow: "0 0 12px rgba(255,90,43,0.7)",
                      animationDuration: `${SLIDE_MS}ms`,
                    }}
                  />
                )}
              </button>
            ))}
            <span
              className="font-light ml-1.5 tabular-nums"
              style={{ fontSize: "0.625rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)" }}
            >
              {String(slide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setSlide((slide + 1) % SLIDES.length)}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.8)",
              transition: "background 0.3s ease",
            }}
          >
            →
          </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonial carousel — auto-rotates, parallax backdrop ── */}
      <div className="relative px-6" style={{ padding: "6rem 1.5rem 7rem" }}>
        {/* Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Eyebrow className="mb-5">TESTIMONIALS</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            What Our{" "}
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
              Partners&nbsp;Say.
            </span>
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, i) => (
              <TestimonialCard key={item.name + i} item={item} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            {/* Gradient-rimmed dark pill with warm top glow — matches the site's primary CTA */}
            <Link
              href="/testimonials"
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
                  padding: "0.875rem 2.25rem",
                  background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  letterSpacing: "0.01em",
                }}
              >
                Read more
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

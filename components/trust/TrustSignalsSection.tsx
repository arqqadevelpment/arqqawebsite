"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

const SLIDE_MS = 2000;


export function TrustSignalsSection() {
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

    </section>
  );
}

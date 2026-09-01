"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceDetail } from "./service-data";
import { SERVICES } from "./service-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import Link from "next/link";

/* All copy lives in service-data.ts — the hub and every inner page share it */
type Service = ServiceDetail;

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

/* ══ Service wheel — click a node to jump to its card ══ */
function OrbitDiagram({ onSelect }: { onSelect: (i: number) => void }) {
  return (
    <div
      className="svc-stage relative shrink-0 mx-auto"
      style={{ width: "min(56vw, 24rem)", height: "min(56vw, 24rem)" }}
    >
      {/* Guide ring the nodes sit on */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{ inset: "13%", border: "1px dashed rgba(255,255,255,0.14)" }}
      />
      {/* Soft inner glow behind the emblem */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          inset: "32%",
          border: "1px solid rgba(255,255,255,0.06)",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(47,107,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Center emblem */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "6.25rem",
          height: "6.25rem",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 0 44px rgba(47,107,255,0.3), 0 0 90px rgba(255,110,50,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arqqa-emblem.webp"
          alt="ARQQA"
          width={1000}
          height={1000}
          style={{
            width: "3.125rem",
            height: "3.125rem",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(120,165,255,0.45))",
          }}
        />
      </div>

      {/* Service nodes — evenly spaced around the ring */}
      {/* Rotating ring — carries the nodes around the emblem */}
      <div className="svc-wheel absolute inset-0" style={{ willChange: "transform" }}>
        {SERVICES.map((s, i) => {
          const angle = (-90 + i * (360 / SERVICES.length)) * (Math.PI / 180);
          const x = 50 + 37 * Math.cos(angle);
          const y = 50 + 37 * Math.sin(angle);
          return (
            <div
              key={s.num}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`${s.title} — jump to details`}
                className="svc-node svc-upright flex flex-col items-center justify-center rounded-full cursor-pointer"
                style={{
                  width: "clamp(3.75rem, 9vw, 4.75rem)",
                  height: "clamp(3.75rem, 9vw, 4.75rem)",
                  /* Same white glass as the centre emblem — translucent, so
                     the artwork reads through instead of a dark disc */
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 24px rgba(0,0,0,0.3)",
                  willChange: "transform",
                }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#ffffff",
                    textShadow: "0 1px 10px rgba(0,0,0,0.55)",
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="font-light mt-0.5"
                  style={{
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  {s.short}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ServicesPageContent() {
  const [highlighted, setHighlighted] = useState<number | null>(null);

  /* Clicking a wheel node smooth-scrolls to its card in the index below.
     Uses an explicit offset (rather than scrollIntoView) so the card lands
     centred regardless of the sticky navbar. */
  function jumpToService(i: number) {
    const el = document.getElementById(`service-${SERVICES[i].num}`);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      Math.max(96, (window.innerHeight - el.offsetHeight) / 2);
    /* `html { scroll-behavior: smooth }` in globals.css animates this */
    window.scrollTo(0, top);
    /* Flash the target so it's obvious which card you landed on */
    setHighlighted(i);
    window.setTimeout(() => setHighlighted(null), 2000);
  }

  return (
    <>
      <style>{`
        @keyframes svcWheelSpin    { from { transform: rotate(0deg); }  to { transform: rotate(360deg); } }
        @keyframes svcWheelCounter { from { transform: rotate(0deg); }  to { transform: rotate(-360deg); } }
        /* The ring carries the nodes around; each node counter-rotates so its
           number and label stay upright. Hovering the wheel pauses both. */
        .svc-wheel   { animation: svcWheelSpin 90s linear infinite; }
        .svc-upright { animation: svcWheelCounter 90s linear infinite; }
        .svc-stage:hover .svc-wheel,
        .svc-stage:hover .svc-upright { animation-play-state: paused; }
        .svc-node {
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .svc-node:focus-visible {
          outline: none;
          border-color: rgba(255,138,90,0.75);
          box-shadow: 0 0 26px rgba(255,90,43,0.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-wheel, .svc-upright { animation: none; }
        }
      `}</style>

      {/* ══ Hero — headline + interactive orbit ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "6.5rem 1.5rem 2rem" }}
      >
        {/* Background — the supplied artwork, used as-is (cover, centred).
            Only the bottom edge fades so the next section joins seamlessly. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/services-img.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(180deg, black 0%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 82%, transparent 100%)",
          }}
        />
        {/* Light scrim behind the headline only — keeps the artwork's own
            colour and lighting intact across the rest of the section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "40%",
            background:
              "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.25) 55%, transparent 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center max-w-4xl mx-auto">
            <Eyebrow className="mb-3">SERVICES</Eyebrow>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(1.625rem, 3.2vw, 2.6rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              }}
            >
              Everything Connects.{" "}
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
                Nothing Operates in Isolation.
              </span>
            </h1>
            <p
              className="font-light mt-3 mx-auto max-w-2xl"
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Six integrated verticals. One unified system. Every service is
              engineered to compound the impact of every other.
            </p>
          </Reveal>

          {/* Service wheel — centred; click a node to jump to its card */}
          <Reveal delay={0.15} className="mt-6 flex justify-center">
            <OrbitDiagram onSelect={jumpToService} />
          </Reveal>

          <Reveal delay={0.25} className="mt-4 text-center">
            <p
              className="font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Select a vertical to see the detail ↓
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Service index — the full list ══ */}
      <section className="relative w-full" style={{ padding: "6rem 1.5rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 max-w-3xl mx-auto">
            <Eyebrow className="mb-5">SERVICE INDEX</Eyebrow>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Six Verticals.{" "}
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
                One&nbsp;System.
              </span>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={Math.min(i * 0.08, 0.32)}>
                <ServiceRow service={s} flash={highlighted === i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "7rem 1.5rem 9rem" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/culture-bg.webp)",
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
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.4) 26%, rgba(3,3,5,0.4) 72%, transparent 100%)",
          }}
        />

        <div
          className="relative max-w-4xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)",
            background:
              "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 0% 0%, rgba(60,125,255,0.12) 0%, transparent 62%), radial-gradient(50% 60% at 100% 100%, rgba(255,110,50,0.1) 0%, transparent 62%)",
            }}
          />
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Not sure which vertical you need?{" "}
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
                Start with the diagnosis.
              </span>
            </h2>
            <p
              className="font-light mt-6 mx-auto max-w-2xl"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              A discovery call maps your growth gaps to the exact services that
              close them — no bundled retainers, no guesswork.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
              {/* Harvest CTA */}
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
                    padding: "0.9375rem 2.25rem",
                    background:
                      "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  Book a Discovery Call
                </span>
              </Link>

              {/* Nurture CTA */}
              <Link
                href="/start#growth-audit"
                className="inline-flex items-center justify-center rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                Download the Playbook
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Service index row — image right, copy left, hover lift */
function ServiceRow({ service, flash }: { service: Service; flash?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = service.accent === "orange";
  /* `flash` fires when you arrive here from an orbit node */
  const lit = hovered || flash;

  return (
    <Link
      id={`service-${service.num}`}
      href={`/services/${service.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col sm:flex-row rounded-3xl overflow-hidden"
      style={{
        minHeight: "18rem",
        scrollMarginTop: "6rem",
        background:
          "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: lit
          ? "1px solid rgba(255,138,90,0.5)"
          : "1px solid rgba(255,255,255,0.11)",
        boxShadow: lit
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: lit ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Copy — left two thirds */}
      <div className="relative flex-[2] flex flex-col justify-center p-8 sm:p-10">
        <div className="flex items-baseline gap-4">
          <span
            className="font-bold shrink-0"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              backgroundImage: isOrange
                ? "linear-gradient(120deg, #ff9a5a 0%, #ffc29a 60%, #9fc8ff 100%)"
                : "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {service.num}
          </span>
          <h3
            className="font-bold"
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            {service.title}
          </h3>
        </div>
        <p
          className="font-light mt-4 max-w-xl"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {service.summary}
        </p>
        <span
          className="inline-flex items-center gap-2 font-medium mt-6"
          style={{
            fontSize: "0.8125rem",
            color: lit ? "#ffffff" : "rgba(255,255,255,0.55)",
            transition: "color 0.35s ease",
          }}
        >
          Explore {service.short}
          <span
            aria-hidden="true"
            style={{
              color: "#ff9a5a",
              transform: lit ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            →
          </span>
        </span>
      </div>

      {/* Image — right third, bleeding into the card */}
      <div className="relative flex-[1] min-h-40 sm:min-h-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,12,20,1) 0%, rgba(10,12,20,0.4) 24%, transparent 58%), linear-gradient(180deg, rgba(10,12,20,0.3) 0%, transparent 30%, transparent 72%, rgba(10,12,20,0.4) 100%)",
          }}
        />
      </div>
    </Link>
  );
}

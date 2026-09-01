"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const ROWS = [
  {
    legacy: "Task-based delivery",
    arqqa: "Outcome-driven partnerships",
  },
  {
    legacy: "Manual onboarding & reporting",
    arqqa: "Automated onboarding + real-time data",
  },
  {
    legacy: "AMs as project coordinators",
    arqqa: "Split: Client Services + Success Managers",
  },
  {
    legacy: "Creative & media in isolation",
    arqqa: "Integrated campaign logic + production",
  },
  {
    legacy: "Organic sales",
    arqqa: "Scalable CRM-driven BD engine",
  },
  {
    legacy: "High staff turnover",
    arqqa: "13 years continuous operation",
  },
];

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path
        d="M2.5 2.5l9 9M11.5 2.5l-9 9"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path
        d="M2.5 7.3l3 3 6-6.6"
        stroke="#ffffff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* One row box — "bad" is a dim, white-stroked outline; "good" is filled with the
   site's signature blue-to-orange brand gradient */
function CompareRow({ text, side }: { text: string; side: "bad" | "good" }) {
  const isGood = side === "good";
  return (
    <div
      className="relative flex flex-row items-center justify-center gap-2.5 text-center shrink-0"
      style={{
        height: "4.75rem",
        padding: "0 1.25rem",
        borderRadius: "1rem",
        background: isGood
          ? "linear-gradient(90deg, #003599 0%, #eb5600 100%)"
          : "rgba(255,255,255,0.02)",
        border: isGood ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.22)",
        boxShadow: isGood
          ? "0 -10px 28px -16px rgba(111,91,224,0.5), 0 14px 30px -18px rgba(255,90,43,0.4), inset 0 1px 0 rgba(255,255,255,0.18)"
          : "none",
      }}
    >
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: "1.375rem",
          height: "1.375rem",
          background: isGood ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
          border: isGood ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.25)",
        }}
      >
        {isGood ? <CheckIcon /> : <XIcon />}
      </span>
      <span
        className="font-medium"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.3,
          color: "#ffffff",
          opacity: isGood ? 1 : 0.75,
          textShadow: isGood ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export function ShiftSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [pos, setPos] = useState(50); // percent, 0 = fully "good" hidden, 100 = fully revealed
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lazy-load + lazy-play the background video — this section is far below
  // the fold, so it shouldn't compete with hero/critical assets on first load.
  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
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
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    }
    function onUp() {
      draggingRef.current = false;
      setDragging(false);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  function startDrag(e: React.PointerEvent) {
    e.preventDefault();
    draggingRef.current = true;
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ padding: "7rem 1.5rem" }}
    >
      {/* Background video — faded at the edges so sections stay continuous */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 18%, black 40%, black 60%, rgba(0,0,0,0.5) 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 18%, black 40%, black 60%, rgba(0,0,0,0.5) 82%, transparent 100%)",
        }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/shift-bg.mp4" type="video/mp4" />
        </video>
        {/* Legibility scrim — transparent at edges, never a hard line */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.45) 30%, rgba(3,3,5,0.45) 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Eyebrow className="mb-5">FROM AGENCY TO SYSTEM</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            You Don&apos;t Need Another Agency.
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
              You Need an Operating&nbsp;System.
            </span>
          </h2>
          <p
            className="font-light mt-5"
            style={{
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Drag the divider to compare the legacy agency model with the ARQQA system.
          </p>
        </div>

        {/* ── Drag-to-compare slider ── */}
        <div
          className="relative mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Side labels */}
          <div className="flex items-center justify-between mb-5 px-1">
            <span
              className="font-bold"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Legacy Agency
            </span>
            <span
              className="font-bold"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#ff9a5a",
                textShadow: "0 0 18px rgba(255,122,61,0.5)",
              }}
            >
              ARQQA System
            </span>
          </div>

          <div
            ref={containerRef}
            className="relative select-none"
            style={{
              cursor: dragging ? "grabbing" : "default",
              touchAction: "none",
            }}
          >
            {/* Base layer — legacy / bad, always fully rendered */}
            <div className="relative flex flex-col gap-3 px-2 py-1">
              {ROWS.map((row) => (
                <CompareRow key={row.legacy} text={row.legacy} side="bad" />
              ))}
            </div>

            {/* Overlay layer — ARQQA / good, clipped to reveal only right of the divider */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col gap-3 px-2 py-1 pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              {ROWS.map((row) => (
                <CompareRow key={row.arqqa} text={row.arqqa} side="good" />
              ))}
            </div>

            {/* Divider + drag handle */}
            <div
              className="absolute inset-y-0 pointer-events-none"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1/2"
                style={{
                  width: "2px",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 12%, rgba(255,255,255,0.7) 88%, transparent 100%)",
                  boxShadow: "0 0 16px rgba(255,255,255,0.4)",
                }}
              />
              <button
                type="button"
                aria-label="Drag to compare"
                onPointerDown={startDrag}
                className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full pointer-events-auto"
                style={{
                  width: "3rem",
                  height: "3rem",
                  transform: "translate(-50%, -50%)",
                  cursor: dragging ? "grabbing" : "grab",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: dragging
                    ? "0 0 0 8px rgba(255,255,255,0.08), 0 0 30px rgba(255,138,90,0.5)"
                    : "0 0 24px rgba(255,255,255,0.25), 0 8px 20px rgba(0,0,0,0.4)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M6 4L2 9l4 5M12 4l4 5-4 5"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

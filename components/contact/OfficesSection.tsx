"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Office contact block — the four regional offices with dialable numbers.
 *
 * Shared by the Catalyst System, Performance Marketing and Website Design &
 * Development pages, where it sits directly above the closing CTA: the reader
 * has just been asked to get in touch, so the ways to do it belong next to the
 * ask rather than only in the footer.
 *
 * Kept as one component rather than copied per page so a moved office or a
 * changed number is a single edit. The addresses match the ones on /start; the
 * phone numbers are only here and in the footer.
 */

type Office = {
  label: string;
  lines: string[];
  /** What the reader sees. */
  phone: string;
  /** E.164 for the tel: link, so it dials from any country. */
  tel: string;
};

const OFFICES: Office[] = [
  {
    label: "Abu Dhabi Office",
    lines: ["3 Al Razqi Street — AlDannah", "Floor 8 — Office 801"],
    phone: "+971 50 726 6877",
    tel: "+971507266877",
  },
  {
    label: "Dubai Office",
    lines: ["West Burry Tower 1, Business Bay", "Floor 21st — Office 2106"],
    phone: "+971 50 726 6877",
    tel: "+971507266877",
  },
  {
    label: "Riyadh Office",
    lines: ["AL FARAZDAQ, Golden Offices Building", "AL Malaz — Riyadh 12627"],
    phone: "+966 54 110 2224",
    tel: "+966541102224",
  },
  {
    label: "Cairo Office",
    lines: ["12 Amin Anis, Ard El Golf", "Heliopolis, Cairo, Egypt"],
    phone: "011 1011 5557",
    tel: "+201110115557",
  },
];

const glass: React.CSSProperties = {
  background:
    "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

/* Local copy of the page-level reveal so the section can drop into any of the
   three pages without depending on that file's own primitives. */
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

function PinIcon({ id }: { id: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex items-center justify-center rounded-xl shrink-0"
      style={{
        width: "2.25rem",
        height: "2.25rem",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 0 22px rgba(60,125,255,0.22)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id={id} x1="0%" y1="15%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#5aa2ff" />
            <stop offset="55%" stopColor="#9fc8ff" />
            <stop offset="100%" stopColor="#ff7a3d" />
          </linearGradient>
        </defs>
        <path
          d="M12 22s7.2-6.1 7.2-12A7.2 7.2 0 0 0 4.8 10c0 5.9 7.2 12 7.2 12z"
          stroke={`url(#${id})`}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="9.8"
          r="2.6"
          stroke="rgba(210,232,255,0.85)"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  );
}

export function OfficesSection() {
  return (
    <section className="relative w-full" style={{ padding: "5rem 1.5rem 2rem" }}>
      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <Eyebrow className="mb-5">Global Contact</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            Four offices.{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              One team.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICES.map((office, i) => (
            <Reveal key={office.label} delay={Math.min(i * 0.08, 0.3)}>
              <div className="h-full rounded-3xl p-6" style={glass}>
                <PinIcon id={`officePin-${i}`} />

                <p
                  className="font-semibold mt-4"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {office.label}
                </p>

                <p
                  className="font-light mt-3"
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {office.lines.map((line, j) => (
                    <span key={line}>
                      {line}
                      {j < office.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <a
                  href={`tel:${office.tel}`}
                  className="inline-flex items-center gap-2 mt-4 font-medium"
                  style={{
                    fontSize: "0.875rem",
                    color: "#9fc8ff",
                    textDecoration: "none",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.6 3.5h3l1.5 3.7-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 3.7 1.5v3a1.6 1.6 0 0 1-1.7 1.6A16.6 16.6 0 0 1 5 5.2 1.6 1.6 0 0 1 6.6 3.5z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {office.phone}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

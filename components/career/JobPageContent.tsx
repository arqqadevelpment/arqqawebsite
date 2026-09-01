"use client";

import { useEffect, useRef, useState } from "react";
import { JOBS, type Job } from "./career-data";
import Link from "next/link";

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
      { threshold: 0.15 }
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
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-medium"
      style={{
        padding: "0.4375rem 0.875rem",
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.72)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      {children}
    </span>
  );
}

/* Small card linking to another open role */
function RelatedJob({ job }: { job: Job }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/career/${job.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col h-full rounded-2xl p-6"
      style={{
        ...glass,
        border: hovered
          ? "1px solid rgba(255,138,90,0.5)"
          : "1px solid rgba(255,255,255,0.11)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
      }}
    >
      <p className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
        {job.title}
      </p>
      <p
        className="font-light mt-2"
        style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
      >
        {job.category} · {job.location}
      </p>
      <span
        className="inline-flex items-center gap-2 font-medium mt-auto pt-5"
        style={{
          fontSize: "0.75rem",
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.5)",
          transition: "color 0.35s ease",
        }}
      >
        View role
        <span
          aria-hidden="true"
          style={{
            color: "#ff9a5a",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          →
        </span>
      </span>
    </Link>
  );
}

export function JobPageContent({ job }: { job: Job }) {
  const related = JOBS.filter(
    (j) => j.slug !== job.slug && j.category === job.category
  ).slice(0, 3);

  const applyHref = `mailto:info@arqqa.net?subject=${encodeURIComponent(
    `Application — ${job.title}`
  )}`;

  return (
    <>
      {/* ══ Hero ══ */}
      <section className="relative w-full" style={{ padding: "11rem 1.5rem 3rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <Link
              href="/career"
              className="inline-flex items-center gap-2 font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span aria-hidden="true">←</span> All roles
            </Link>

            <h1
              className="font-bold mt-6"
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-2.5 mt-6">
              <MetaPill>{job.category}</MetaPill>
              <MetaPill>{job.type}</MetaPill>
              <MetaPill>{job.location}</MetaPill>
              {job.duration && <MetaPill>{job.duration}</MetaPill>}
            </div>

            <p
              className="font-light mt-8"
              style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "rgba(255,255,255,0.62)" }}
            >
              {job.intro}
            </p>

            <div className="mt-9">
              <a
                href={applyHref}
                className="relative inline-flex rounded-2xl"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                  boxShadow:
                    "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
                }}
              >
                <span
                  className="relative inline-flex items-center justify-center rounded-2xl font-medium"
                  style={{
                    padding: "0.9375rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  Apply for this role
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Body ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 4rem" }}>
        <div className="relative max-w-3xl mx-auto flex flex-col gap-5">
          {job.sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i * 0.06, 0.24)}>
              <div className="rounded-2xl p-8" style={glass}>
                <h2
                  className="font-bold"
                  style={{ fontSize: "1.125rem", lineHeight: 1.3, color: "#ffffff" }}
                >
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-3.5 mt-6">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="shrink-0"
                        style={{
                          marginTop: "0.5rem",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#5aa2ff",
                          boxShadow: "0 0 8px rgba(60,125,255,0.7)",
                        }}
                      />
                      <span
                        className="font-light"
                        style={{
                          fontSize: "0.9375rem",
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.62)",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {job.note && (
            <Reveal>
              <p
                className="font-light italic"
                style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.42)" }}
              >
                {job.note}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ Apply ══ */}
      <section className="relative w-full" style={{ padding: "1rem 1.5rem 4rem" }}>
        <div
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.25rem, 4.5vw, 3.25rem) clamp(1.5rem, 4vw, 3rem)",
            background:
              "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.25rem, 2.6vw, 1.75rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Think this is you?
            </h2>
            <p
              className="font-light mt-4"
              style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}
            >
              Send us your CV and portfolio. We read everything that comes in.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href={applyHref}
                className="relative inline-flex rounded-2xl"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                  boxShadow:
                    "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
                }}
              >
                <span
                  className="relative inline-flex items-center justify-center rounded-2xl font-medium"
                  style={{
                    padding: "0.9375rem 2.25rem",
                    background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                    color: "#ffffff",
                    fontSize: "0.9375rem",
                  }}
                >
                  Apply by Email
                </span>
              </a>
              <a
                href={job.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl font-medium"
                style={{
                  padding: "1rem 2.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                Apply via Form →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Related roles ══ */}
      {related.length > 0 && (
        <section className="relative w-full" style={{ padding: "2rem 1.5rem 9rem" }}>
          <div className="relative max-w-3xl mx-auto">
            <Reveal className="mb-8">
              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Other {job.category} roles
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={Math.min(i * 0.08, 0.24)}>
                  <RelatedJob job={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

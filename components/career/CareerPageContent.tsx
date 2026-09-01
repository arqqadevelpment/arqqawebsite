"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  JOBS,
  JOB_CATEGORIES,
  JOB_LOCATIONS,
  JOB_TYPES,
  type Job,
} from "./career-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

const ALL = "All";

/* Filter dropdown — native <select> so it stays keyboard- and mobile-friendly */
function FilterSelect({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  const on = active !== ALL;
  return (
    <label className="flex flex-col gap-2 w-full sm:w-auto">
      <span
        className="font-light"
        style={{
          fontSize: "0.625rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        {label}
      </span>
      <div className="relative">
        <select
          value={active}
          onChange={(e) => onChange(e.target.value)}
          className="w-full sm:w-auto rounded-xl font-medium cursor-pointer appearance-none"
          style={{
            padding: "0.6875rem 2.5rem 0.6875rem 1rem",
            minWidth: "12rem",
            fontSize: "0.875rem",
            color: "#ffffff",
            background: on
              ? "linear-gradient(120deg, rgba(255,122,61,0.24) 0%, rgba(47,107,255,0.24) 100%)"
              : "rgba(255,255,255,0.03)",
            border: on
              ? "1px solid rgba(255,255,255,0.3)"
              : "1px solid rgba(255,255,255,0.14)",
            outline: "none",
            transition: "all 0.3s ease",
          }}
        >
          {[ALL, ...options].map((opt) => (
            <option key={opt} value={opt} style={{ background: "#0b0c12", color: "#ffffff" }}>
              {opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
          }}
        >
          ▼
        </span>
      </div>
    </label>
  );
}

/* One vacancy row — links out to the live posting */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)}>
      <Link
        href={`/career/${job.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl p-6"
        style={{
          ...glass,
          border: hovered
            ? "1px solid rgba(255,138,90,0.5)"
            : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition:
            "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold"
            style={{ fontSize: "1.0625rem", lineHeight: 1.3, color: "#ffffff" }}
          >
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
            {[job.category, job.type, job.location].map((meta) => (
              <span
                key={meta}
                className="inline-flex items-center gap-1.5 font-light"
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#5aa2ff",
                    boxShadow: "0 0 8px rgba(60,125,255,0.7)",
                  }}
                />
                {meta}
              </span>
            ))}
          </div>
        </div>

        <span
          className="inline-flex items-center gap-2 font-medium shrink-0"
          style={{
            fontSize: "0.8125rem",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)",
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
    </Reveal>
  );
}

export function CareerPageContent() {
  const [category, setCategory] = useState<string>(ALL);
  const [type, setType] = useState<string>(ALL);
  const [location, setLocation] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      JOBS.filter(
        (j) =>
          (category === ALL || j.category === category) &&
          (type === ALL || j.type === type) &&
          (location === ALL || j.location === location)
      ),
    [category, type, location]
  );

  const anyFilterActive = category !== ALL || type !== ALL || location !== ALL;

  return (
    <>
      {/* ══ Hero ══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ padding: "11rem 1.5rem 4rem" }}
      >
        {/* Background — ripple artwork, dimmed and faded at the edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/career-hero-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.5,
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 14%, black 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 14%, black 45%, transparent 100%)",
          }}
        />
        {/* Legibility scrim so the centered headline stays readable — fades
            fully to transparent at the bottom so there's no seam against the
            section below */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 28%, rgba(3,3,5,0.55) 0%, transparent 70%), linear-gradient(180deg, rgba(3,3,5,0.35) 0%, rgba(3,3,5,0.1) 30%, transparent 60%, transparent 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-5">CAREERS</Eyebrow>
            <h1
              className="font-bold max-w-3xl mx-auto"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Build the systems. Not just the campaigns.
            </h1>
            <p
              className="font-light mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}
            >
              50+ specialists. 13 years in operation. One in-house team that designs,
              builds, and runs the work — no outsourcing. If that&apos;s how you want to
              work, we&apos;d like to meet you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Filters + listings ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 6rem" }}>
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end justify-center gap-5 mb-10">
            <FilterSelect
              label="Category"
              options={JOB_CATEGORIES}
              active={category}
              onChange={setCategory}
            />
            <FilterSelect label="Type" options={JOB_TYPES} active={type} onChange={setType} />
            <FilterSelect
              label="Location"
              options={JOB_LOCATIONS}
              active={location}
              onChange={setLocation}
            />
          </Reveal>

          <Reveal className="mb-6">
            <div className="flex items-center justify-between gap-4">
              <p
                className="font-light"
                style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}
              >
                {filtered.length} open {filtered.length === 1 ? "role" : "roles"}
              </p>
              {anyFilterActive && (
                <button
                  type="button"
                  onClick={() => {
                    setCategory(ALL);
                    setType(ALL);
                    setLocation(ALL);
                  }}
                  className="font-medium cursor-pointer"
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <JobCard key={job.slug} job={job} index={i} />
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="font-medium" style={{ fontSize: "1rem", color: "#ffffff" }}>
                  No roles match those filters.
                </p>
                <p
                  className="font-light mt-2"
                  style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)" }}
                >
                  Try clearing a filter — or send us your portfolio anyway.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ Open application CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "1rem 1.5rem 9rem" }}>
        {/* Uploaded wave artwork — full-bleed section background, not clipped
            to the card, so it shows behind and around it */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/CAreer-CTA.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 55%",
            opacity: 0.6,
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <div
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.25rem, 4.5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)",
            background:
              "linear-gradient(170deg, rgba(14,16,26,0.45) 0%, rgba(6,8,14,0.55) 100%)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Don&apos;t see your role?
            </h2>
            <p
              className="font-light mt-4"
              style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}
            >
              We keep good people on file. Send us your CV and portfolio and tell us what
              you&apos;d want to own.
            </p>
            <div className="flex justify-center mt-9">
              <a
                href="mailto:info@arqqa.net?subject=Open%20Application"
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
                  Send an Open Application
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

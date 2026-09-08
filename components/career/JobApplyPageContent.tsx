"use client";

/**
 * The application form for a single role, at /career/<slug>/apply.
 *
 * Replaces the old flow of sending applicants out to arqqa.net's WordPress
 * form (job.sourceHref) — the fields here (name, email, phone, cover letter,
 * CV upload) mirror what that form asked for, just hosted on this site.
 *
 * No backend: like every other form on this site, submitting just swaps the
 * form for a confirmation message client-side.
 */

import { useState } from "react";
import Link from "next/link";
import type { Job } from "./career-data";

const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "0.75rem",
  color: "#ffffff",
  fontSize: "0.9375rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: "0.5rem",
  display: "block",
};

function Field({
  label,
  required = true,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "#ff9a5a" }}>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint ? (
        <p className="font-light mt-1.5" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* Confirmation shown in place of the form once submitted. */
function SuccessNote({ jobTitle }: { jobTitle: string }) {
  return (
    <div className="text-center py-10">
      <div
        className="mx-auto flex items-center justify-center rounded-full"
        style={{
          width: "3.25rem",
          height: "3.25rem",
          background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.22)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.5rem", height: "1.5rem" }}>
          <path d="M5 12.5l4.5 4.5L19 7" stroke="#9fc8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="font-bold mt-5" style={{ fontSize: "1.375rem", color: "#ffffff" }}>
        Application received.
      </h2>
      <p
        className="font-light mt-2 mx-auto"
        style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "26rem" }}
      >
        Thanks for applying for {jobTitle}. We read every application — if
        it&apos;s a fit, we&apos;ll be in touch.
      </p>
    </div>
  );
}

export function JobApplyPageContent({ job }: { job: Job }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <style>{`
        .arqqa-field:focus {
          border-color: rgba(159, 200, 255, 0.6) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        .arqqa-field::placeholder {
          color: rgba(255,255,255,0.28);
        }
        .arqqa-file::file-selector-button {
          margin-right: 0.875rem;
          padding: 0.5rem 1rem;
          border-radius: 0.6rem;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.05);
          color: #ffffff;
          font-size: 0.8125rem;
          cursor: pointer;
        }
      `}</style>

      <section className="relative w-full" style={{ padding: "11rem 1.5rem 6rem" }}>
        <div className="relative max-w-2xl mx-auto">
          <Link
            href={`/career/${job.slug}`}
            className="inline-flex items-center gap-2 font-light"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <span aria-hidden="true">←</span> Back to role
          </Link>

          <h1
            className="font-bold mt-6"
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Apply for this position
          </h1>
          <p
            className="font-light mt-3"
            style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)" }}
          >
            {job.title} · {job.category} · {job.location}
          </p>

          <div className="rounded-3xl p-8 sm:p-10 mt-8" style={glass}>
            {submitted ? (
              <SuccessNote jobTitle={job.title} />
            ) : (
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field label="Full Name">
                  <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Your full name" />
                </Field>
                <Field label="Email">
                  <input required type="email" className="arqqa-field" style={fieldStyle} placeholder="you@example.com" />
                </Field>
                <Field label="Phone">
                  <input required type="tel" className="arqqa-field" style={fieldStyle} placeholder="+20 1XX XXX XXXX" />
                </Field>
                <Field label="Cover Letter">
                  <textarea
                    required
                    rows={5}
                    className="arqqa-field"
                    style={{ ...fieldStyle, resize: "vertical" }}
                    placeholder="Tell us why you're a fit for this role."
                  />
                </Field>
                <Field label="Upload CV/Resume" hint="Allowed type(s): pdf, doc, docx">
                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="arqqa-field arqqa-file"
                    style={{ ...fieldStyle, padding: "0.5rem 0.5rem" }}
                  />
                </Field>

                <button
                  type="submit"
                  className="relative inline-flex rounded-2xl mt-2 self-start"
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
                    Submit Application
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

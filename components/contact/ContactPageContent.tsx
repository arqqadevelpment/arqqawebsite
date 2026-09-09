"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { submitForm } from "@/lib/forms/submitForm";

/* ── Shared reveal-on-scroll wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
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
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/* Confirmation state shown in place of the form once submitted — no backend,
   this is a static site, so we simulate the acknowledgement client-side */
function SuccessNote({ title, body }: { title: string; body: string }) {
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
      <h4 className="font-bold mt-5" style={{ fontSize: "1.125rem", color: "#ffffff" }}>
        {title}
      </h4>
      <p className="font-light mt-2 mx-auto" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", maxWidth: "24rem" }}>
        {body}
      </p>
    </div>
  );
}

export function ContactPageContent() {
  const [callSubmitted, setCallSubmitted] = useState(false);

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
        select.arqqa-field option {
          background: #0b0c12;
          color: #ffffff;
        }
        @keyframes arqqaFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="arqqaFadeIn"] { animation: none !important; }
        }
      `}</style>

      {/* ══ Hero ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 5rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 40% at 15% 0%, rgba(255,110,50,0.18) 0%, rgba(224,60,40,0.06) 45%, transparent 75%), radial-gradient(50% 40% at 85% 100%, rgba(60,125,255,0.2) 0%, rgba(20,50,160,0.07) 45%, transparent 75%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-5">START</Eyebrow>
            <h1
              className="font-bold mx-auto"
              style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.75rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#ffffff" }}
            >
              Let&apos;s{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                Talk Growth.
              </span>
            </h1>
            <p
              className="font-light mt-6 mx-auto max-w-xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
            >
              A 30-minute call with a senior strategist, no sales pitch,
              just a clear next step.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ The Fork — dual path, tab-selected ══ */}
      <section className="relative w-full" style={{ padding: "1rem 1.5rem 7rem" }}>
        <div className="relative max-w-3xl mx-auto">
          {/* Invisible anchor — keeps existing #book-strategy-call links working
              now that this is the only path on the page. */}
          <span id="book-strategy-call" className="block scroll-mt-28" aria-hidden="true" />

          <div className="relative mt-6">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ animation: "arqqaFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
            >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(90% 70% at 0% 0%, rgba(255,122,61,0.16) 0%, transparent 65%)",
                  }}
                />
                <div
                  className="relative h-full p-8 sm:p-10 rounded-3xl"
                  style={{
                    background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,138,90,0.28)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <p
                    className="font-light"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
                  >
                    A 30-minute conversation with a senior strategist. No
                    sales pitch. We&apos;ll audit your current setup,
                    identify the 3 biggest growth levers, and map a 90-day
                    action plan. If we&apos;re a fit, you&apos;ll know. If
                    not, you&apos;ll still leave with clarity.
                  </p>

                  {callSubmitted ? (
                    <SuccessNote
                      title="You're booked in."
                      body="Check your inbox for a confirmation and a short pre-call questionnaire. It takes two minutes and helps us make the 30 count."
                    />
                  ) : (
                    <form
                      className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const data = Object.fromEntries(new FormData(form).entries());
                        setCallSubmitted(true);
                        try {
                          await submitForm("contact", data);
                        } catch {
                          // The confirmation already shows — a failed background
                          // submit just means this lead won't appear in the dashboard.
                        }
                      }}
                    >
                      <Field label="Name">
                        <input required name="name" type="text" className="arqqa-field" style={fieldStyle} placeholder="Your full name" />
                      </Field>
                      <Field label="Company">
                        <input required name="company" type="text" className="arqqa-field" style={fieldStyle} placeholder="Company name" />
                      </Field>
                      <Field label="Role">
                        <input required name="role" type="text" className="arqqa-field" style={fieldStyle} placeholder="Your role" />
                      </Field>
                      <Field label="Industry">
                        <input required name="industry" type="text" className="arqqa-field" style={fieldStyle} placeholder="e.g. Fintech" />
                      </Field>
                      <Field label="Budget Range">
                        <select required name="budget" className="arqqa-field" style={fieldStyle} defaultValue="">
                          <option value="" disabled>
                            Select a range
                          </option>
                          <option>Under $10K / month</option>
                          <option>$10K – $25K / month</option>
                          <option>$25K – $50K / month</option>
                          <option>$50K+ / month</option>
                        </select>
                      </Field>
                      <Field label="Preferred Time">
                        <input required name="preferredTime" type="text" className="arqqa-field" style={fieldStyle} placeholder="e.g. Weekday mornings" />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Biggest Growth Challenge">
                          <textarea
                            required
                            name="challenge"
                            rows={3}
                            className="arqqa-field"
                            style={{ ...fieldStyle, resize: "vertical" }}
                            placeholder="What's the growth problem you're trying to solve?"
                          />
                        </Field>
                      </div>
                      <div className="sm:col-span-2 mt-2">
                        {/* Same two-layer gradient-border treatment as the
                            site's PrimaryCTA — a 1px gradient ring around a
                            solid dark fill — rather than the flat orange fill
                            this button used on its own. */}
                        <div
                          className="rounded-2xl"
                          style={{
                            padding: "1px",
                            background:
                              "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
                            boxShadow:
                              "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
                          }}
                        >
                          <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
                            style={{
                              padding: "0.9375rem 2rem",
                              background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                              color: "#ffffff",
                              fontSize: "0.9375rem",
                            }}
                          >
                            Book My Strategy Call
                            <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Global Contact Info ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 8rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <Eyebrow className="mb-4">GLOBAL CONTACT</Eyebrow>
            <h2 className="font-bold" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Where to find us.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                label: "Egypt HQ",
                value: "Cairo",
                lines: ["12 Amin Anis, Ard El Golf", "Heliopolis, Cairo, Egypt"] as string[],
                phone: "+2 011 1011 5557",
                tel: "+201110115557",
              },
              {
                label: "Abu Dhabi Office",
                value: "Abu Dhabi",
                lines: ["3 Al Razqi Street, AlDannah", "Floor 8, Office 801"],
                phone: "+971 50 726 6877",
                tel: "+971507266877",
              },
              {
                label: "Dubai Office",
                value: "Dubai",
                lines: ["West Burry Tower 1, Business Bay", "Floor 21st, Office 2106"],
                phone: "+971 50 726 6877",
                tel: "+971507266877",
              },
              {
                label: "Riyadh Office",
                value: "Riyadh",
                lines: ["AL FARAZDAQ, Golden Offices Building", "AL Malaz, Riyadh 12627"],
                phone: "+966 54 110 2224",
                tel: "+966541102224",
              },
            ].map((loc, i) => (
              <Reveal key={loc.label} delay={Math.min(i * 0.08, 0.3)}>
                <div
                  className="relative h-full rounded-3xl p-6"
                  style={{
                    background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.11)",
                  }}
                >
                  <p
                    className="font-light"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
                  >
                    {loc.label}
                  </p>
                  <p className="font-bold mt-2" style={{ fontSize: "1.0625rem", color: "#ffffff" }}>
                    {loc.value}
                  </p>
                  {loc.lines.length > 0 && (
                    <p
                      className="font-light mt-3"
                      style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
                    >
                      {loc.lines.map((line, j) => (
                        <span key={line}>
                          {line}
                          {j < loc.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                  {/* Opens the number in WhatsApp rather than dialing —
                      tel: on iOS Safari can surface a FaceTime prompt instead
                      of the phone app, which WhatsApp sidesteps entirely. */}
                  <a
                    href={`https://wa.me/${loc.tel.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 font-medium"
                    style={{ fontSize: "0.875rem", color: "#9fc8ff", textDecoration: "none" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M6.6 3.5h3l1.5 3.7-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 3.7 1.5v3a1.6 1.6 0 0 1-1.7 1.6A16.6 16.6 0 0 1 5 5.2 1.6 1.6 0 0 1 6.6 3.5z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {loc.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

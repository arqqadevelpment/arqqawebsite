"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
  const [activeTab, setActiveTab] = useState<"call" | "audit">("call");
  const [callSubmitted, setCallSubmitted] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  // Land on the right tab when arriving via #book-strategy-call / #growth-audit.
  // The hash is only readable on the client, so this has to run after mount —
  // deriving it during render would not match the server-rendered HTML.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value, see above
    if (window.location.hash === "#growth-audit") setActiveTab("audit");
  }, []);

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
              Two Ways{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                to Start.
              </span>
            </h1>
            <p
              className="font-light mt-6 mx-auto max-w-xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
            >
              Whether you&apos;re ready to move or still exploring, there&apos;s
              a next step designed for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ The Fork — dual path, tab-selected ══ */}
      <section className="relative w-full" style={{ padding: "1rem 1.5rem 7rem" }}>
        <div className="relative max-w-3xl mx-auto">
          {/* Invisible anchors — keep #book-strategy-call / #growth-audit links
              working; the effect above reads the hash to pick the right tab */}
          <span id="book-strategy-call" className="block scroll-mt-28" aria-hidden="true" />
          <span id="growth-audit" className="block scroll-mt-28" aria-hidden="true" />

          {/* Tab selector */}
          <Reveal className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("call")}
              className="relative rounded-2xl text-left"
              style={{
                padding: "1.25rem 1.5rem",
                background:
                  activeTab === "call"
                    ? "linear-gradient(170deg, rgba(255,122,61,0.14) 0%, rgba(14,16,26,0.6) 100%)"
                    : "linear-gradient(170deg, rgba(14,16,26,0.45) 0%, rgba(6,8,14,0.5) 100%)",
                border: activeTab === "call" ? "1px solid rgba(255,138,90,0.55)" : "1px solid rgba(255,255,255,0.11)",
                boxShadow: activeTab === "call" ? "0 -10px 30px -18px rgba(255,122,61,0.4)" : "none",
                transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              <p
                className="font-bold"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: activeTab === "call" ? "#ff9a5a" : "rgba(255,255,255,0.4)",
                  transition: "color 0.35s ease",
                }}
              >
                THE 5% · READY TO MOVE
              </p>
              <p
                className="font-bold mt-2"
                style={{ fontSize: "1.0625rem", color: activeTab === "call" ? "#ffffff" : "rgba(255,255,255,0.65)", transition: "color 0.35s ease" }}
              >
                Book a Strategy Call
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className="relative rounded-2xl text-left"
              style={{
                padding: "1.25rem 1.5rem",
                background:
                  activeTab === "audit"
                    ? "linear-gradient(170deg, rgba(60,125,255,0.14) 0%, rgba(14,16,26,0.6) 100%)"
                    : "linear-gradient(170deg, rgba(14,16,26,0.45) 0%, rgba(6,8,14,0.5) 100%)",
                border: activeTab === "audit" ? "1px solid rgba(90,162,255,0.5)" : "1px solid rgba(255,255,255,0.11)",
                boxShadow: activeTab === "audit" ? "0 -10px 30px -18px rgba(60,125,255,0.4)" : "none",
                transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              <p
                className="font-bold"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: activeTab === "audit" ? "#9fc8ff" : "rgba(255,255,255,0.4)",
                  transition: "color 0.35s ease",
                }}
              >
                THE 95% · STILL EXPLORING
              </p>
              <p
                className="font-bold mt-2"
                style={{ fontSize: "1.0625rem", color: activeTab === "audit" ? "#ffffff" : "rgba(255,255,255,0.65)", transition: "color 0.35s ease" }}
              >
                Download the Growth Audit
              </p>
            </button>
          </Reveal>

          {/* Content panel — swaps with the active tab */}
          <div className="relative mt-6">
            {activeTab === "call" ? (
              <div
                key="call"
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
                      body="Check your inbox for a confirmation and a short pre-call questionnaire — it takes two minutes and helps us make the 30 count."
                    />
                  ) : (
                    <form
                      className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCallSubmitted(true);
                      }}
                    >
                      <Field label="Name">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Your full name" />
                      </Field>
                      <Field label="Company">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Company name" />
                      </Field>
                      <Field label="Role">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Your role" />
                      </Field>
                      <Field label="Industry">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="e.g. Fintech" />
                      </Field>
                      <Field label="Budget Range">
                        <select required className="arqqa-field" style={fieldStyle} defaultValue="">
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
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="e.g. Weekday mornings" />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Biggest Growth Challenge">
                          <textarea
                            required
                            rows={3}
                            className="arqqa-field"
                            style={{ ...fieldStyle, resize: "vertical" }}
                            placeholder="What's the growth problem you're trying to solve?"
                          />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center rounded-2xl font-medium mt-2"
                          style={{
                            padding: "0.9375rem 2rem",
                            background: "linear-gradient(120deg, #ff7a3d 0%, #b6541f 60%, #8a3a18 100%)",
                            color: "#ffffff",
                            fontSize: "0.9375rem",
                            boxShadow: "0 10px 32px -10px rgba(255,122,61,0.45)",
                          }}
                        >
                          Book My Strategy Call
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div
                key="audit"
                className="relative rounded-3xl overflow-hidden"
                style={{ animation: "arqqaFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(90% 70% at 100% 0%, rgba(60,125,255,0.16) 0%, transparent 65%)",
                  }}
                />
                {/* Subtle particle dots — nurture path */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(159,200,255,0.35) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                    opacity: 0.4,
                    maskImage: "radial-gradient(80% 80% at 70% 20%, black 0%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(80% 80% at 70% 20%, black 0%, transparent 75%)",
                  }}
                />
                <div
                  className="relative h-full p-8 sm:p-10 rounded-3xl"
                  style={{
                    background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(90,162,255,0.25)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <p
                    className="font-light"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
                  >
                    A self-assessment framework that scores your current
                    marketing infrastructure across 7 dimensions: strategy
                    clarity, creative integration, media efficiency,
                    technology stack, data maturity, team structure, and
                    reporting quality. 15 minutes. Unlimited insight.
                  </p>

                  {auditSubmitted ? (
                    <SuccessNote
                      title="On its way."
                      body="The audit is headed to your inbox now. Over the next two weeks you'll also get a related case study and the playbook for your industry."
                    />
                  ) : (
                    <form
                      className="mt-8 grid grid-cols-1 gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setAuditSubmitted(true);
                      }}
                    >
                      <Field label="Name">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Your full name" />
                      </Field>
                      <Field label="Email">
                        <input required type="email" className="arqqa-field" style={fieldStyle} placeholder="you@company.com" />
                      </Field>
                      <Field label="Company">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="Company name" />
                      </Field>
                      <Field label="Industry">
                        <input required type="text" className="arqqa-field" style={fieldStyle} placeholder="e.g. Retail & E-commerce" />
                      </Field>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center rounded-2xl font-medium mt-2"
                        style={{
                          padding: "0.9375rem 2rem",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(159,200,255,0.4)",
                          color: "#ffffff",
                          fontSize: "0.9375rem",
                        }}
                      >
                        Send Me the Audit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
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
              },
              {
                label: "Abu Dhabi Office",
                value: "Abu Dhabi",
                lines: ["3 Al Razqi Street — AlDannah", "Floor 8 — Office 801"],
              },
              {
                label: "Dubai Office",
                value: "Dubai",
                lines: ["West Burry Tower 1, Business Bay", "Floor 21st — Office 2106"],
              },
              {
                label: "Riyadh Office",
                value: "Riyadh",
                lines: ["AL FARAZDAQ, Golden Offices Building", "AL Malaz — Riyadh 12627"],
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
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

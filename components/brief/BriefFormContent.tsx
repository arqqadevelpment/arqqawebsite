"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  BUDGET_RANGES,
  CONTACT_METHODS,
  DIAL_CODES,
  INDUSTRIES,
  OBJECTIVES,
  STEPS,
  TEAM_SIZES,
  TIMELINES,
} from "./brief-data";
import Link from "next/link";

const STORAGE_KEY = "arqqa-brief-draft";

type Brief = {
  name: string;
  email: string;
  dial: string;
  phone: string;
  hasWebsite: "yes" | "no" | "";
  website: string;
  industry: string;
  teamSize: string;
  objectives: string[];
  problem: string;
  budget: string;
  timeline: string;
  contactMethod: string;
};

const EMPTY: Brief = {
  name: "", email: "", dial: "+20", phone: "", hasWebsite: "", website: "",
  industry: "", teamSize: "", objectives: [], problem: "",
  budget: "", timeline: "", contactMethod: "",
};

/* ── Shared field chrome ── */
const fieldLabel: React.CSSProperties = {
  fontSize: "0.6875rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: "0.75rem",
  background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
  color: "#ffffff",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

function borderFor(invalid: boolean, focused: boolean) {
  if (invalid) return "1px solid rgba(255,110,80,0.65)";
  if (focused) return "1px solid rgba(90,162,255,0.65)";
  return "1px solid rgba(255,255,255,0.14)";
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className="font-semibold" style={fieldLabel}>{label}</p>
      <div className="mt-3">{children}</div>
      {error && (
        <p className="font-light mt-2" style={{ fontSize: "0.8125rem", color: "#ff8a75" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="font-light mt-2" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

/* Selectable pill — used for single- and multi-select answers */
function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={selected}
      className="font-medium"
      style={{
        padding: "0.7rem 1.1rem",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        textAlign: "left",
        color: selected ? "#ffffff" : "rgba(255,255,255,0.7)",
        background: selected
          ? "linear-gradient(180deg, rgba(90,162,255,0.16) 0%, rgba(255,122,61,0.1) 100%)"
          : hovered
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.025)",
        border: selected
          ? "1px solid rgba(255,175,130,0.55)"
          : "1px solid rgba(255,255,255,0.14)",
        transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
      }}
    >
      {label}
    </button>
  );
}

/* Primary CTA — the site's gradient-rimmed pill */
function PrimaryButton({
  label,
  onClick,
  type = "button",
}: {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
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
        className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium"
        style={{
          padding: "0.95rem 2.1rem",
          background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
          color: "#ffffff",
          fontSize: "0.9375rem",
          letterSpacing: "0.01em",
        }}
      >
        {label}
        <span
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </span>
    </button>
  );
}

function GhostButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-2xl font-medium"
      style={{
        padding: "0.95rem 2rem",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.22)",
        color: "#ffffff",
        fontSize: "0.9375rem",
      }}
    >
      {label}
    </button>
  );
}

export function BriefFormContent() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Brief>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState(false);
  const [focus, setFocus] = useState("");
  const [done, setDone] = useState(false);

  /* Restore any draft, so a refresh doesn't lose the answers. localStorage is
     client-only, so this has to run after mount — seeding it during render
     would not match the server-rendered HTML. */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value, see above
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore unreadable drafts */
    }
  }, []);

  useEffect(() => {
    if (data === EMPTY) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- flips the "draft saved" note once the write actually succeeds
      setSaved(true);
    } catch {
      /* storage unavailable — the form still works, it just won't persist */
    }
  }, [data]);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleObjective = (o: string) =>
    setData((d) => ({
      ...d,
      objectives: d.objectives.includes(o)
        ? d.objectives.filter((x) => x !== o)
        : [...d.objectives, o],
    }));

  /* ── Validation, per the messages in the design ── */
  const nameError = touched && data.name.trim().length < 2 ? "Please give us your full name" : "";
  const emailError =
    touched && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) ? "That email doesn't look right" : "";
  const phoneError = touched && data.phone.replace(/\D/g, "").length < 7 ? "We need a number we can call." : "";
  const websiteError =
    touched && data.hasWebsite === "yes" && !/^[\w-]+(\.[\w-]+)+/.test(data.website.trim())
      ? "Enter a real domain, like company.com"
      : "";

  const stepOneValid = !nameError && !emailError && !phoneError && !websiteError &&
    data.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) &&
    data.phone.replace(/\D/g, "").length >= 7 &&
    (data.hasWebsite !== "yes" || /^[\w-]+(\.[\w-]+)+/.test(data.website.trim()));

  function next() {
    if (step === 0) {
      setTouched(true);
      if (!stepOneValid) return;
    }
    setTouched(false);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setTouched(false);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    // No backend wired yet — the brief is held in localStorage only.
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const current = STEPS[step];

  if (done) {
    return (
      <section className="relative w-full" style={{ padding: "11rem 1.5rem 8rem" }}>
        <div className="relative max-w-2xl mx-auto text-center">
          <Eyebrow className="mb-6">Got it — you&apos;re in</Eyebrow>
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Your brief is with us.
          </h1>
          <p
            className="font-light mt-6 mx-auto"
            style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: "32rem" }}
          >
            A person here reads it — not a queue. Expect a reply within one
            working day, and we&apos;ll have looked at your site before we send it.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/" className="inline-flex">
              <GhostButton label="Back to home" onClick={() => {}} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full" style={{ padding: "9rem 1.5rem 6rem" }}>
      <div className="relative max-w-2xl mx-auto">
        {/* ── Progress ── */}
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="font-bold"
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  color: i === step ? "#ffffff" : "rgba(255,255,255,0.3)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
          <span
            className="font-light"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: saved ? "rgba(159,200,255,0.75)" : "rgba(255,255,255,0.25)",
              transition: "color 0.4s ease",
            }}
          >
            {saved ? "Saved" : ""}
          </span>
        </div>

        <p
          className="font-light mt-2"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Step {step + 1} of {STEPS.length}
        </p>

        {/* Progress rail */}
        <div className="mt-5" style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}>
          <div
            style={{
              height: "1px",
              width: `${((step + 1) / STEPS.length) * 100}%`,
              background: "linear-gradient(90deg, #5aa2ff 0%, #ff7a3d 100%)",
              transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>

        {/* ── Step head ── */}
        <div className="mt-12">
          <Eyebrow className="mb-5">{current.eyebrow}</Eyebrow>
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {current.title}
          </h1>
          <p
            className="font-light mt-4"
            style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {current.sub}
          </p>
        </div>

        {/* ══ Step 1 — who you are ══ */}
        {step === 0 && (
          <div>
            <Field label="Your full name" error={nameError}>
              <input
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                onFocus={() => setFocus("name")}
                onBlur={() => setFocus("")}
                placeholder="Ahmed Hamdy"
                style={{ ...inputBase, border: borderFor(!!nameError, focus === "name") }}
              />
            </Field>

            <Field label="Work email" error={emailError}>
              <input
                type="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus("")}
                placeholder="you@company.com"
                style={{ ...inputBase, border: borderFor(!!emailError, focus === "email") }}
              />
            </Field>

            <Field label="Phone" error={phoneError}>
              <div className="flex gap-3">
                <select
                  value={data.dial}
                  onChange={(e) => set("dial", e.target.value)}
                  style={{
                    ...inputBase,
                    width: "auto",
                    minWidth: "7rem",
                    border: borderFor(!!phoneError, focus === "dial"),
                  }}
                >
                  {DIAL_CODES.map((d) => (
                    <option key={d.code} value={d.code} style={{ background: "#0b0c12" }}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <input
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onFocus={() => setFocus("phone")}
                  onBlur={() => setFocus("")}
                  placeholder="100 123 4567"
                  style={{ ...inputBase, border: borderFor(!!phoneError, focus === "phone") }}
                />
              </div>
            </Field>

            <Field label="Do you have a website?">
              <div className="grid grid-cols-2 gap-3">
                <Chip label="Yes" selected={data.hasWebsite === "yes"} onClick={() => set("hasWebsite", "yes")} />
                <Chip label="Not yet" selected={data.hasWebsite === "no"} onClick={() => set("hasWebsite", "no")} />
              </div>
            </Field>

            {data.hasWebsite === "yes" && (
              <Field
                label="Company website"
                error={websiteError}
                hint="We read your site before we reply, so this one matters."
              >
                <input
                  value={data.website}
                  onChange={(e) => set("website", e.target.value)}
                  onFocus={() => setFocus("website")}
                  onBlur={() => setFocus("")}
                  placeholder="company.com"
                  style={{ ...inputBase, border: borderFor(!!websiteError, focus === "website") }}
                />
              </Field>
            )}
          </div>
        )}

        {/* ══ Step 2 — the business ══ */}
        {step === 1 && (
          <div>
            <Field label="Industry">
              <select
                value={data.industry}
                onChange={(e) => set("industry", e.target.value)}
                style={{ ...inputBase, border: borderFor(false, focus === "industry") }}
                onFocus={() => setFocus("industry")}
                onBlur={() => setFocus("")}
              >
                <option value="" style={{ background: "#0b0c12" }}>Choose one</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i} style={{ background: "#0b0c12" }}>{i}</option>
                ))}
              </select>
            </Field>

            <Field label="Team size">
              <select
                value={data.teamSize}
                onChange={(e) => set("teamSize", e.target.value)}
                style={{ ...inputBase, border: borderFor(false, focus === "team") }}
                onFocus={() => setFocus("team")}
                onBlur={() => setFocus("")}
              >
                <option value="" style={{ background: "#0b0c12" }}>Choose a range</option>
                {TEAM_SIZES.map((t) => (
                  <option key={t} value={t} style={{ background: "#0b0c12" }}>{t}</option>
                ))}
              </select>
            </Field>

            <Field label="What are you trying to move?" hint="Pick as many as apply.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((o) => (
                  <Chip
                    key={o}
                    label={o}
                    selected={data.objectives.includes(o)}
                    onClick={() => toggleObjective(o)}
                  />
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* ══ Step 3 — the problem ══ */}
        {step === 2 && (
          <div>
            <Field
              label="In your own words"
              hint="You can skip this — but it's the part we actually read first."
            >
              <textarea
                value={data.problem}
                onChange={(e) => set("problem", e.target.value)}
                onFocus={() => setFocus("problem")}
                onBlur={() => setFocus("")}
                rows={6}
                placeholder="e.g. We're spending on Meta every month but installs went flat in March and nobody can tell us why."
                style={{
                  ...inputBase,
                  border: borderFor(false, focus === "problem"),
                  resize: "vertical",
                  lineHeight: 1.7,
                }}
              />
              <p
                className="font-light mt-2"
                style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}
              >
                {data.problem.length} characters
              </p>
            </Field>
          </div>
        )}

        {/* ══ Step 4 — how we reach you ══ */}
        {step === 3 && (
          <div>
            <Field
              label="Monthly budget range"
              hint="This shapes what we propose, not whether we reply."
            >
              <select
                value={data.budget}
                onChange={(e) => set("budget", e.target.value)}
                style={{ ...inputBase, border: borderFor(false, focus === "budget") }}
                onFocus={() => setFocus("budget")}
                onBlur={() => setFocus("")}
              >
                <option value="" style={{ background: "#0b0c12" }}>Choose a range</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b} style={{ background: "#0b0c12" }}>{b}</option>
                ))}
              </select>
            </Field>

            <Field label="When do you want to start?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIMELINES.map((t) => (
                  <Chip key={t} label={t} selected={data.timeline === t} onClick={() => set("timeline", t)} />
                ))}
              </div>
            </Field>

            <Field label="Best way to reach you">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CONTACT_METHODS.map((m) => (
                  <Chip
                    key={m}
                    label={m}
                    selected={data.contactMethod === m}
                    onClick={() => set("contactMethod", m)}
                  />
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center gap-4 mt-12">
          {step === STEPS.length - 1 ? (
            <PrimaryButton label="Send my brief" onClick={submit} />
          ) : (
            <PrimaryButton label="Continue" onClick={next} />
          )}
          {step > 0 && <GhostButton label="Back" onClick={back} />}
        </div>

        {/* ── Footer rail ── */}
        <div
          className="flex items-center justify-between mt-16 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-light"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            ARQQA · Lead Engine &nbsp;|&nbsp; Your brief
          </p>
          <p
            className="font-light"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {String(step + 1).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

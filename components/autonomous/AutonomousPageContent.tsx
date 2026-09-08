"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Content and structure sourced from autonomous.arqqa.net (a 14-slide
 * scrollytelling deck) and rebuilt as a normal long-scroll page in ARQQA's
 * own design system — dark glass cards, the site's blue/violet/orange
 * gradient, and the same Reveal-on-scroll rhythm used across every other
 * service page. No slide-lock scrolling, no borrowed CSS: every visual
 * (charts, chat mock, pricing cards, the engine diagram) is rebuilt from
 * scratch in this component tree. The source deck's logo strip on the Proof
 * slide is skipped — it named unspecified client logos with no available
 * assets to carry over honestly.
 */

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
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

/* ── Section header: Eyebrow + two-line headline with a gradient tail + body ── */
function SectionHead({
  eyebrow,
  title,
  accentTail,
  body,
  center = false,
  titleSize,
}: {
  eyebrow: string;
  title: string;
  accentTail?: string;
  body?: string;
  center?: boolean;
  titleSize?: string;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <h2
        className="font-bold"
        style={{
          fontSize: titleSize ?? "clamp(1.75rem, 3.6vw, 2.75rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#ffffff",
          maxWidth: center ? "44rem" : "36rem",
          marginLeft: center ? "auto" : undefined,
          marginRight: center ? "auto" : undefined,
        }}
      >
        {title}
        {accentTail ? (
          <>
            {" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {accentTail}
            </span>
          </>
        ) : null}
      </h2>
      {body ? (
        <p
          className="font-light mt-5"
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)",
            maxWidth: center ? "42rem" : "34rem",
            marginLeft: center ? "auto" : undefined,
            marginRight: center ? "auto" : undefined,
          }}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

function GradientNumber({
  value,
  style,
  animate = false,
}: {
  value: string;
  style?: React.CSSProperties;
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(() => {
    if (!animate) return value;
    const m = value.match(/^([0-9]*\.?[0-9]+)(.*)$/);
    return m ? "0" + m[2] : value;
  });

  useEffect(() => {
    if (!animate) return;
    const match = value.match(/^([0-9]*\.?[0-9]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const duration = 1400;
          function tick(now: number) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay((target * eased).toFixed(decimals) + suffix);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(match![1] + suffix);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, animate]);

  return (
    <div
      ref={ref}
      className="font-bold"
      style={{
        fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {display}
    </div>
  );
}

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div
      className="grid gap-x-6 gap-y-6 mt-8"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(4rem, 1fr))` }}
    >
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={Math.min(i * 0.08, 0.3)}>
          <GradientNumber value={s.value} animate />
          <p
            className="font-light mt-2"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {s.label}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function PrimaryCTA({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex rounded-2xl"
      style={{
        padding: "1px",
        background:
          "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
        boxShadow: "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
      }}
    >
      <span
        className="relative inline-flex items-center gap-2 rounded-2xl font-medium"
        style={{
          padding: "0.9375rem 2.25rem",
          background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
          color: "#ffffff",
          fontSize: "0.9375rem",
        }}
      >
        {label}
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/* ── 24-hour bar chart — inbound distribution, off-hours highlighted ──
   Bars grow up from the baseline, staggered, the same way the source
   deck's chart animates in (scaleY 0 → 1, ~26ms stagger per bar). */
function HourlyChart({ note, compact = false }: { note: string; compact?: boolean }) {
  // Roughly matches the source deck's shape: a daytime hump, a bigger
  // evening/overnight surge. Bars from 20:00–08:00 read as after-hours.
  const bars = [
    18, 12, 9, 7, 6, 8, 14, 26, 38, 46, 52, 58, 61, 57, 50, 44, 48, 62, 78, 92, 88, 70, 46, 28,
  ];
  const max = Math.max(...bars);
  const chartRef = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal>
      <div className={compact ? "rounded-3xl p-5" : "rounded-3xl p-6 sm:p-7"} style={glass}>
        <div
          ref={chartRef}
          className="flex items-end gap-1 sm:gap-1.5"
          style={{ height: compact ? "5.5rem" : "9rem" }}
        >
          {bars.map((v, i) => {
            const offHours = i >= 20 || i < 8;
            return (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${(v / max) * 100}%`,
                  transformOrigin: "center bottom",
                  transform: grown ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 26}ms`,
                  background: offHours
                    ? "linear-gradient(180deg, #ff7a3d 0%, #b6541f 100%)"
                    : "linear-gradient(180deg, #5aa2ff 0%, #2f6bff 100%)",
                  opacity: offHours ? 0.9 : 0.55,
                }}
              />
            );
          })}
        </div>
        <div
          className="flex justify-between mt-2.5 font-light"
          style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.35)" }}
        >
          <span>00:00</span>
          <span>08:00</span>
          <span>16:00</span>
          <span>24:00</span>
        </div>
        <p
          className={compact ? "font-light mt-3" : "font-light mt-5"}
          style={{ fontSize: compact ? "0.75rem" : "0.8125rem", lineHeight: 1.55, color: "rgba(255,255,255,0.55)" }}
        >
          {note}
        </p>
      </div>
    </Reveal>
  );
}

function PainCard({ stat, body, index }: { stat: string; body: string; index: number }) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.3)}>
      <div className="rounded-3xl p-6 h-full" style={glass}>
        <GradientNumber value={stat} style={{ fontSize: "1.875rem" }} />
        <p
          className="font-light mt-3"
          style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ── Timestamped timeline — each step its own boxed card, the hospital
   booking-flow example — one card gets an accent border to mark the
   moment that matters most (e.g. the deposit landing). ── */
function Timeline({
  steps,
}: {
  steps: { time: string; title: string; body: string; highlight?: boolean }[];
}) {
  return (
    <div className="flex flex-col" style={{ gap: "0.625rem" }}>
      {steps.map((s, i) => (
        <Reveal key={s.time + s.title} delay={Math.min(i * 0.08, 0.3)}>
          <div
            className="rounded-2xl p-4 flex gap-3.5"
            style={{
              ...glass,
              border: s.highlight ? "1px solid rgba(255,138,90,0.5)" : glass.border,
            }}
          >
            <span
              className="shrink-0 font-bold"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
                color: "#ff9a5a",
                whiteSpace: "nowrap",
              }}
            >
              {s.time}
            </span>
            <div>
              <p className="font-bold" style={{ fontSize: "0.875rem", color: "#ffffff" }}>
                {s.title}
              </p>
              <p
                className="font-light mt-1"
                style={{ fontSize: "0.75rem", lineHeight: 1.55, color: "rgba(255,255,255,0.55)" }}
              >
                {s.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Phone-style chat mock — the hospital booking flow playing out in a
   WhatsApp-shaped thread, restyled in ARQQA's own dark-glass palette
   rather than borrowed WhatsApp green. ── */
type ChatBubble = { from: "them" | "me"; time: string; content: React.ReactNode };

const HOSPITAL_THREAD: ChatBubble[] = [
  { from: "them", time: "23:41", content: "My back has been hurting for three days" },
  {
    from: "me",
    time: "23:41",
    content:
      "I can’t advise on symptoms — that’s the doctor’s call. But I can get you to the right one tonight. Is it from an injury, or did it start on its own?",
  },
  { from: "them", time: "23:42", content: "On its own" },
  {
    from: "me",
    time: "23:42",
    content: (
      <>
        Orthopaedics, then. Nearest opening at the Maadi branch:
        <div
          className="rounded-xl mt-2 p-3"
          style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="font-bold" style={{ fontSize: "0.8125rem", color: "#ffffff" }}>
            Dr. Hany Sabry
          </p>
          <p className="font-light" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>
            Orthopaedics · Maadi · EGP 650 · 18 yrs
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["Tonight 20:30", "Tomorrow 09:15", "Tomorrow 18:00"].map((slot) => (
            <span
              key={slot}
              className="rounded-full"
              style={{
                padding: "0.25rem 0.625rem",
                fontSize: "0.6875rem",
                border: "1px solid rgba(255,255,255,0.24)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {slot}
            </span>
          ))}
        </div>
      </>
    ),
  },
  { from: "them", time: "23:43", content: "Tomorrow 09:15" },
  {
    from: "me",
    time: "23:43",
    content: (
      <>
        Held for ten minutes — EGP 200 deposit now, EGP 450 at the clinic.
        <div
          className="rounded-full text-center mt-2 font-bold"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            background: "linear-gradient(120deg, #ff7a3d 0%, #2f6bff 100%)",
            color: "#ffffff",
          }}
        >
          Pay the deposit securely
        </div>
      </>
    ),
  },
  { from: "them", time: "23:44", content: "Paid" },
  { from: "me", time: "23:44", content: "Booked. Bring any previous X-rays — Maadi branch, third floor." },
];

/* ── Auto-replaying chat mock — plays the hospital thread one bubble at a
   time with a typing beat before each reply, then loops, the way the
   reference deck's chat animates in on repeat. ── */
/* ── Plays a chat thread's bubbles in on a loop: one at a time with a
   typing beat before each reply, then a pause and restart. Shared by
   every animated chat mock on the page. ── */
function useAutoplayThread(total: number) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(id);
    };

    function playFrom(i: number) {
      if (i >= total) {
        schedule(() => {
          setCount(0);
          setTyping(false);
          playFrom(0);
        }, 3400);
        return;
      }
      setTyping(true);
      schedule(() => {
        setTyping(false);
        setCount(i + 1);
        schedule(() => playFrom(i + 1), 750);
      }, i === 0 ? 500 : 800);
    }

    playFrom(0);
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [total]);

  return { count, typing };
}

function AnimatedChatCard({
  avatarLetter,
  name,
  statusLine,
  inlineStatus = false,
  channelLabel,
  thread,
  height = "19rem",
  preface,
}: {
  avatarLetter: string;
  name: string;
  statusLine: string;
  inlineStatus?: boolean;
  channelLabel?: string;
  thread: ChatBubble[];
  height?: string;
  preface?: React.ReactNode;
}) {
  const total = thread.length;
  const { count, typing } = useAutoplayThread(total);

  const bubbleBase: React.CSSProperties = {
    borderRadius: "1rem",
    padding: "0.625rem 0.875rem",
    fontSize: "0.8125rem",
    lineHeight: 1.55,
    maxWidth: "86%",
  };
  const them: React.CSSProperties = {
    ...bubbleBase,
    borderBottomLeftRadius: "0.25rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.8)",
    alignSelf: "flex-start",
  };
  const me: React.CSSProperties = {
    ...bubbleBase,
    borderBottomRightRadius: "0.25rem",
    background: "linear-gradient(155deg, rgba(52,68,224,0.35) 0%, rgba(111,91,224,0.28) 100%)",
    border: "1px solid rgba(111,91,224,0.4)",
    color: "rgba(255,255,255,0.92)",
    alignSelf: "flex-end",
  };
  const stamp: React.CSSProperties = {
    display: "block",
    marginTop: "0.375rem",
    fontSize: "0.625rem",
    color: "rgba(255,255,255,0.35)",
    textAlign: "right",
  };

  const nextFrom = count < total ? thread[count].from : "me";

  return (
    <Reveal delay={0.15}>
      <div className="rounded-3xl overflow-hidden" style={glass}>
        {channelLabel ? (
          <div
            className="px-6 font-light"
            style={{
              padding: "1.125rem 1.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {channelLabel}
          </div>
        ) : null}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full font-bold shrink-0"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              background: "linear-gradient(160deg, #3444e0 0%, #6f5be0 100%)",
              fontSize: "0.875rem",
              color: "#ffffff",
            }}
          >
            {avatarLetter}
          </span>
          {inlineStatus ? (
            <p style={{ fontSize: "0.9375rem" }}>
              <span className="font-bold" style={{ color: "#ffffff" }}>
                {name}
              </span>{" "}
              <span className="font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
                · {statusLine}
              </span>
            </p>
          ) : (
            <div className="flex-1">
              <p className="font-medium" style={{ fontSize: "0.875rem", color: "#ffffff" }}>
                {name}
              </p>
              <p className="font-light" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.4)" }}>
                {statusLine}
              </p>
            </div>
          )}
        </div>

        {preface ? <div className="px-5 pt-4">{preface}</div> : null}

        <div
          className="flex flex-col p-5"
          style={{ gap: "0.625rem", height, overflow: "hidden", justifyContent: "flex-end" }}
        >
          {thread.slice(0, count).map((b, i) => (
            <div key={i} style={b.from === "them" ? them : me}>
              {b.content}
              <span style={stamp}>{b.time}</span>
            </div>
          ))}
          {typing ? (
            <div
              className="flex items-center gap-1"
              style={{
                alignSelf: nextFrom === "them" ? "flex-start" : "flex-end",
                padding: "0.5rem 0.75rem",
                borderRadius: "1rem",
                background: nextFrom === "them" ? "rgba(255,255,255,0.06)" : "rgba(111,91,224,0.28)",
                border: nextFrom === "them" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(111,91,224,0.4)",
              }}
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: "0.375rem",
                    height: "0.375rem",
                    background: "rgba(255,255,255,0.5)",
                    animation: `arqqaTypingDot 1.2s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <style>{`
        @keyframes arqqaTypingDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </Reveal>
  );
}

function HospitalChatMock() {
  return (
    <AnimatedChatCard avatarLetter="H" name="The hospital" statusLine="online" thread={HOSPITAL_THREAD} />
  );
}

const BANK_THREAD: ChatBubble[] = [
  { from: "them", time: "03:12", content: "I’ve lost my credit card abroad" },
  {
    from: "me",
    time: "03:12",
    content:
      "I can lock it right now. Confirming it’s you first — I’ve sent a 6-digit code to the number on the account.",
  },
  { from: "them", time: "03:13", content: "482917" },
  {
    from: "me",
    time: "03:13",
    content: (
      <>
        Verified. Card ending 4417 is now locked. No transaction can be authorised on it.
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["Order a replacement", "Review recent charges"].map((label) => (
            <span
              key={label}
              className="rounded-full"
              style={{
                padding: "0.25rem 0.625rem",
                fontSize: "0.6875rem",
                border: "1px solid rgba(255,255,255,0.24)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </>
    ),
  },
  { from: "them", time: "03:14", content: "There’s a charge I don’t recognise" },
  {
    from: "me",
    time: "03:14",
    content:
      "That is a formal dispute, so I am passing you to a compliance officer rather than handling it myself. Reference DSP-88214 — they will call within the hour.",
  },
];

function BankChatMock() {
  return (
    <AnimatedChatCard
      avatarLetter="T"
      name="The Bank"
      statusLine="Typically replies instantly"
      inlineStatus
      channelLabel="Messenger · Service Agent"
      thread={BANK_THREAD}
    />
  );
}

const AIRLINE_THREAD: ChatBubble[] = [
  { from: "them", time: "02:47", content: "Can I add 15kg baggage to my flight?" },
  {
    from: "me",
    time: "02:47",
    content: (
      <>
        Yes — MS777, Cairo → Dubai, 14 Aug. Pre-purchase is cheaper than at the airport.
        <div
          className="rounded-xl mt-2 p-3"
          style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
            EGP 1,240
          </p>
          <p className="font-light" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>
            15kg extra · vs EGP 2,100 at the desk
          </p>
        </div>
      </>
    ),
  },
  { from: "them", time: "02:48", content: "Go ahead" },
  {
    from: "me",
    time: "02:48",
    content: (
      <div
        className="rounded-full text-center font-bold"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          background: "linear-gradient(120deg, #ff7a3d 0%, #2f6bff 100%)",
          color: "#ffffff",
        }}
      >
        Pay EGP 1,240 securely
      </div>
    ),
  },
  { from: "them", time: "02:49", content: "Paid" },
  {
    from: "me",
    time: "02:49",
    content:
      "Added. Your allowance is now 38kg and the updated boarding pass is in this thread. Want me to check seat upgrades too?",
  },
];

function AirlineChatMock() {
  return (
    <AnimatedChatCard
      avatarLetter="T"
      name="The Airline"
      statusLine="Typically replies instantly"
      inlineStatus
      channelLabel="Messenger · Sales Agent"
      thread={AIRLINE_THREAD}
    />
  );
}

/* ── The public comment recap sits above the DM — static context, not
   part of the animated thread, showing the exchange that opened it. ── */
function EcommerceCommentPreface() {
  const row: React.CSSProperties = { fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(255,255,255,0.75)" };
  const label: React.CSSProperties = {
    fontSize: "0.6875rem",
    color: "rgba(255,255,255,0.4)",
    marginTop: "0.5rem",
  };
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p style={label}>Comment on your Reel · 41,200 views</p>
      <p style={{ ...row, marginTop: "0.375rem" }}>
        <span className="font-bold" style={{ color: "#ffffff" }}>
          nour.h
        </span>{" "}
        Price?? ♡ 3
      </p>
      <p style={label}>Replied publicly · 11 seconds later</p>
      <p style={{ ...row, marginTop: "0.375rem" }}>
        <span className="font-bold" style={{ color: "#ffffff" }}>
          thebrand
        </span>{" "}
        EGP 1,450 — in stock in three sizes 💛 sending the link in DM
      </p>
      <p style={{ ...label, fontStyle: "italic" }}>nour.h opened the DM</p>
    </div>
  );
}

const ECOMMERCE_THREAD: ChatBubble[] = [
  {
    from: "me",
    time: "01:59",
    content: (
      <>
        The tan one you commented on — EGP 1,450, free delivery over EGP 1,000.
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["S", "M", "L"].map((size) => (
            <span
              key={size}
              className="rounded-full"
              style={{
                padding: "0.25rem 0.625rem",
                fontSize: "0.6875rem",
                border: "1px solid rgba(255,255,255,0.24)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {size}
            </span>
          ))}
        </div>
      </>
    ),
  },
  { from: "them", time: "02:00", content: "M please" },
  {
    from: "me",
    time: "02:00",
    content: (
      <>
        Reserved for 30 minutes.
        <div
          className="rounded-full text-center mt-2 font-bold"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            background: "linear-gradient(120deg, #ff7a3d 0%, #2f6bff 100%)",
            color: "#ffffff",
          }}
        >
          Complete checkout
        </div>
      </>
    ),
  },
  { from: "them", time: "02:02", content: "Ordered" },
  {
    from: "me",
    time: "02:02",
    content:
      "Order #48812 confirmed — delivery Thursday. The public comment stays answered so the next person sees the price too.",
  },
];

function EcommerceChatMock() {
  return (
    <AnimatedChatCard
      avatarLetter="T"
      name="The Brand"
      statusLine="Typically replies instantly"
      inlineStatus
      channelLabel="Instagram · Social Moderation Agent"
      thread={ECOMMERCE_THREAD}
      height="13rem"
      preface={<EcommerceCommentPreface />}
    />
  );
}

function FeatureCard({
  glyph,
  title,
  body,
  index,
}: {
  glyph: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <div className="rounded-3xl p-6 h-full" style={glass}>
        <span
          className="inline-flex items-center justify-center rounded-2xl"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.16)",
            fontSize: "1.125rem",
            color: "#9fc8ff",
          }}
          aria-hidden="true"
        >
          {glyph}
        </span>
        <p className="font-bold mt-4" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
          {title}
        </p>
        <p
          className="font-light mt-2"
          style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)" }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ── One mocked chat exchange — a single reply bubble in a labelled thread ── */
function ChatSample({
  channel,
  agent,
  name,
  line,
}: {
  channel: string;
  agent: string;
  name: string;
  line: string;
}) {
  return (
    <Reveal delay={0.15}>
      <div className="rounded-3xl overflow-hidden" style={glass}>
        <div
          className="px-6 font-light"
          style={{
            padding: "1.125rem 1.5rem",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {channel} · {agent}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center justify-center rounded-full font-bold shrink-0"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                background: "linear-gradient(160deg, #3444e0 0%, #6f5be0 100%)",
                fontSize: "1rem",
                color: "#ffffff",
              }}
            >
              {name.charAt(0)}
            </span>
            <p style={{ fontSize: "1rem" }}>
              <span className="font-bold" style={{ color: "#ffffff" }}>
                {name}
              </span>{" "}
              <span className="font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
                · Typically replies instantly
              </span>
            </p>
          </div>
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.1)",
              maxWidth: "92%",
            }}
          >
            <p className="font-light" style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.82)" }}>
              {line}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Channel glyphs — simple currentColor line icons, matching the
   site's minimal glyph language rather than borrowed brand marks. ── */
const CHANNELS: { label: string; icon: React.ReactNode }[] = [
  {
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <path d="M20 12a8 8 0 1 1-3.8-6.8" strokeLinecap="round" />
        <path d="M20 4l-4.2 8.4L12 11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 10.5c.5 2 2 3.5 4 4l1-1.3c.9.3 1.8.5 2.7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Messenger",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <path d="M3 12c0-4.7 3.8-8.5 9-8.5s9 3.8 9 8.5-3.8 8.5-9 8.5c-1.1 0-2.2-.2-3.1-.6L4.5 21l1-4.3C4 15.3 3 13.8 3 12Z" strokeLinejoin="round" />
        <path d="M7 13l3.3-3.3L12.7 12l3.3-3.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <path d="M14 4v10.5a3 3 0 1 1-2.5-2.96" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4c.5 2.3 2 3.8 4.3 4.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
        <path d="M4.5 7l7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Web Chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "100%", height: "100%" }}>
        <path d="M4 5.5h16v10H9.5L6 19v-3.5H4Z" strokeLinejoin="round" />
        <path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const INDUSTRIES: {
  key: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  features: { glyph: string; title: string; body: string }[];
  chat: { channel: string; agent: string; name: string; line: string };
}[] = [
  {
    key: "banking",
    eyebrow: "Banking & Financial Services",
    title: "Compliant automation.",
    accent: "Escalation built in.",
    body: "The agent handles what is routine and provably safe, and hands over the moment a conversation turns legal, fraudulent or high-value. The boundary is configured by you, not inferred by the model.",
    features: [
      {
        glyph: "◷",
        title: "24/7 service automation",
        body: "Account queries, branch locators and card blocks handled through OTP verification — without a call-centre queue at any hour.",
      },
      {
        glyph: "✓",
        title: "Lead pre-qualification",
        body: "Pre-qualifies card and loan applicants in Messenger, estimates the monthly instalment, and books the advisor call.",
      },
      {
        glyph: "◈",
        title: "Feed protection & privacy",
        body: "Hides comments where customers post phone numbers or account details under your ads, and moves real prospects into DMs.",
      },
      {
        glyph: "⚑",
        title: "Risk escalation",
        body: "Detects legal language, formal fraud claims and high-value client issues, and routes them straight to a human compliance manager.",
      },
    ],
    chat: {
      channel: "Messenger",
      agent: "Service Agent",
      name: "The Bank",
      line: "Your Visa ending 4471 has been temporarily blocked for your protection. Reply with the OTP we just sent to confirm it's you and we'll lift it immediately.",
    },
  },
  {
    key: "airlines",
    eyebrow: "Airlines & Travel",
    title: "Instant rebooking.",
    accent: "Ancillary revenue at 2 AM.",
    body: "Passengers ask about baggage, seats and delays at exactly the hours your contact centre is thinnest. The agent prices it against live fare rules and takes the payment before the intent cools.",
    features: [
      {
        glyph: "$",
        title: "Ancillary revenue sales",
        body: "Seat upgrades, extra baggage and lounge access sold inside the chat, with checkout completed in the same thread.",
      },
      {
        glyph: "◎",
        title: "Flight status & rebooking",
        body: "Answers “is MS777 on time?” and handles rebooking or gate changes in local dialect — inside Messenger, no app download.",
      },
      {
        glyph: "◇",
        title: "Campaign moderation",
        body: "Answers promotional fare questions under social campaigns and converts the interest into a direct booking link.",
      },
      {
        glyph: "⚑",
        title: "Disruption intelligence",
        body: "Spots delay spikes and recurring complaints in comment feeds and alerts ground operations before the issue compounds.",
      },
    ],
    chat: {
      channel: "Messenger",
      agent: "Sales Agent",
      name: "The Airline",
      line: "MS777 is on time, boarding at 21:40. Want a window seat and 10kg extra baggage for the trip? That's 640 EGP total — I can add it to your booking now.",
    },
  },
  {
    key: "ecommerce",
    eyebrow: "E-Commerce, Retail & Social",
    title: "A comment is a customer.",
    accent: "Answer it in seconds.",
    body: "On Instagram and Facebook the buying signal is public and it decays in minutes. The agent replies under the post in your brand voice, then opens the DM and closes it there.",
    features: [
      {
        glyph: "◉",
        title: "Comment-to-DM pipeline",
        body: "Answers “Price?” and sizing questions on Instagram and Facebook posts within seconds, then opens a direct DM to close the sale.",
      },
      {
        glyph: "◆",
        title: "Personal digital shopper",
        body: "Checks live stock across branches, recommends from that customer's own history, and returns a one-click checkout link.",
      },
      {
        glyph: "◷",
        title: "Order tracking, unattended",
        body: "Connects to fulfilment APIs for delivery status, address changes and returns — answered at 2 AM without a support ticket.",
      },
      {
        glyph: "▦",
        title: "Demand intelligence",
        body: "Surfaces out-of-stock queries, logistics bottlenecks and which creative actually converts, in the daily report.",
      },
    ],
    chat: {
      channel: "Instagram",
      agent: "Social Moderation Agent",
      name: "The Brand",
      line: "It's true leather, available in M and L right now — I've sent you a link to check out in one tap. 10% off if you order in the next hour ✨",
    },
  },
];

/* ── The Need → The Agent Acts → What It Changes — one 3-step flow per
   sector, switched by tab. ── */
type FlowStep = {
  num: string;
  label: string;
  text: string;
  chips?: string[];
  cta?: string;
};

const AUTOMATION_FLOWS: { key: string; label: string; steps: FlowStep[] }[] = [
  {
    key: "banking",
    label: "Banking",
    steps: [
      {
        num: "01",
        label: "The Need",
        text: "“My credit card is lost and I’m travelling abroad.”",
        chips: ["03:12", "WhatsApp"],
      },
      {
        num: "02",
        label: "The Agent Acts",
        text: "Verifies identity with a secure OTP and locks the card on the spot — in the same thread, no call-centre queue.",
        chips: ["Service Agent"],
      },
      {
        num: "03",
        label: "What It Changes",
        text: "Closes the fraud window in seconds, and stops the cost of nightly card fraud.",
        cta: "Confirms instantly on any official fraud report",
      },
    ],
  },
  {
    key: "airlines",
    label: "Airlines",
    steps: [
      {
        num: "01",
        label: "The Need",
        text: "“Can I add 15kg of baggage to my flight?”",
        chips: ["02:47", "WhatsApp"],
      },
      {
        num: "02",
        label: "The Agent Acts",
        text: "Prices it against live fare rules and takes payment in chat — no app, no airport desk.",
        chips: ["Sales Agent"],
      },
      {
        num: "03",
        label: "What It Changes",
        text: "Captures the revenue at the moment of intent — nothing left for the morning queue.",
        cta: "Payment and confirmation in the same thread",
      },
    ],
  },
  {
    key: "ecommerce",
    label: "E-Commerce",
    steps: [
      {
        num: "01",
        label: "The Need",
        text: "“How much?” — a comment under an Instagram Reel.",
        chips: ["01:58", "Instagram · Facebook"],
      },
      {
        num: "02",
        label: "The Agent Acts",
        text: "Replies publicly in brand voice within seconds, then opens a DM with size, stock and a direct buy link.",
        chips: ["Social Moderation Agent"],
      },
      {
        num: "03",
        label: "What It Changes",
        text: "A public comment turns into a sale instead of going unanswered.",
        cta: "A public comment turns into a private message",
      },
    ],
  },
];

function AutomationFlowTabs() {
  const [active, setActive] = useState(0);
  const flow = AUTOMATION_FLOWS[active];

  return (
    <div className="mt-10">
      <Reveal className="flex flex-wrap justify-center gap-3">
        {AUTOMATION_FLOWS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(i)}
            className="cursor-pointer rounded-xl font-medium"
            style={{
              padding: "0.75rem 1.75rem",
              fontSize: "0.8125rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: i === active ? "#ff9a5a" : "rgba(255,255,255,0.55)",
              background: i === active ? "rgba(255,122,61,0.08)" : "rgba(255,255,255,0.03)",
              border: i === active ? "1px solid rgba(255,122,61,0.5)" : "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.25s ease",
            }}
          >
            {f.label}
          </button>
        ))}
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 mt-8 items-stretch">
        {flow.steps.map((s, i) => (
          <div key={flow.key + s.num} className="flex items-stretch flex-1">
            <Reveal delay={Math.min(i * 0.08, 0.2)} className="flex-1">
              <div className="rounded-2xl p-6 h-full flex flex-col" style={glass}>
                <p
                  className="font-bold"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#ff9a5a" }}
                >
                  {s.num}{" "}
                  <span style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}>{s.label.toUpperCase()}</span>
                </p>
                <p
                  className="font-bold mt-4"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.4, color: "#ffffff" }}
                >
                  {s.text}
                </p>
                <div className="flex-1" style={{ minHeight: "1rem" }} />
                {s.chips || s.cta ? (
                  <div className="pt-4 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {s.cta ? (
                      <span
                        className="inline-flex items-center rounded-full font-medium"
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.75rem",
                          color: "#ff9a5a",
                          border: "1px solid rgba(255,122,61,0.45)",
                        }}
                      >
                        {s.cta}
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {s.chips!.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center rounded-full font-light"
                            style={{
                              padding: "0.375rem 0.875rem",
                              fontSize: "0.75rem",
                              color: "rgba(255,255,255,0.6)",
                              border: "1px solid rgba(255,255,255,0.16)",
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </Reveal>
            {i < flow.steps.length - 1 ? (
              <div className="hidden lg:flex items-center justify-center px-3" aria-hidden="true">
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "1.25rem" }}>→</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Compact feature card — icon beside the title rather than above it,
   and a shorter card overall, used in the industry blocks where the
   title column already carries the headline. ── */
function CompactFeatureCard({
  glyph,
  title,
  body,
  index,
}: {
  glyph: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <div className="rounded-2xl p-4 h-full" style={glass}>
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center justify-center rounded-xl shrink-0"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: "1rem",
              color: "#9fc8ff",
            }}
            aria-hidden="true"
          >
            {glyph}
          </span>
          <p className="font-bold" style={{ fontSize: "0.8125rem", lineHeight: 1.3, color: "#ffffff" }}>
            {title}
          </p>
        </div>
        <p
          className="font-light mt-2.5"
          style={{ fontSize: "0.75rem", lineHeight: 1.55, color: "rgba(255,255,255,0.55)" }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

function IndustryBlock({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  return (
    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
      <div>
        <SectionHead
          eyebrow={industry.eyebrow}
          title={industry.title}
          accentTail={industry.accent}
          titleSize="clamp(1.5rem, 2.8vw, 2.125rem)"
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {industry.features.map((f, i) => (
            <CompactFeatureCard key={f.title} glyph={f.glyph} title={f.title} body={f.body} index={i} />
          ))}
        </div>
      </div>
      <div>
        <Reveal>
          <p
            className="font-light"
            style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "34rem" }}
          >
            {industry.body}
          </p>
        </Reveal>
        <div className="mt-6">
          {industry.key === "banking" ? (
            <BankChatMock />
          ) : industry.key === "airlines" ? (
            <AirlineChatMock />
          ) : industry.key === "ecommerce" ? (
            <EcommerceChatMock />
          ) : (
            <ChatSample {...industry.chat} />
          )}
        </div>
      </div>
    </div>
  );
}

const PRICING_TIERS = [
  {
    tier: "Starter",
    price: "14,900",
    note: "One brand, one channel. For testing before committing.",
    items: ["One agent", "WhatsApp or Instagram", "Up to 3,000 conversations"],
    featured: false,
  },
  {
    tier: "Growth",
    badge: "Most chosen",
    price: "39,900",
    note: "All four agents across your main channels, in your customers' language.",
    items: ["Sales · Service · Moderation · Ops", "Up to three channels", "Up to 15,000 conversations"],
    featured: true,
  },
  {
    tier: "Business",
    price: "99,900",
    note: "Multi-branch and multi-channel, with a named account manager and an SLA.",
    items: ["Every channel, every branch", "Up to 60,000 conversations", "Dedicated manager · monthly review"],
    featured: false,
  },
  {
    tier: "Enterprise",
    price: "From 250,000",
    note: "Bespoke agents across departments, for regulated and compliance-heavy sectors.",
    items: ["Sovereign & single-tenant deployment", "Custom compliance boundaries", "Volume priced per conversation"],
    featured: false,
  },
];

const DEPLOYMENT_STEPS = [
  { when: "Day 0 · 30 min", title: "We read your inbox", body: "What customers actually ask, what was missed, and what that silence cost you last year." },
  { when: "Day 1 · Morning", title: "We set it up", body: "Your prices, calendar, branches and brand voice — and, just as important, what it must never say." },
  { when: "Day 1 · Afternoon", title: "You approve it", body: "You watch it handle real conversations and sign off before a single customer sees it." },
  { when: "Every morning", title: "The 09:00 report", body: "What came in, what closed, what needs a human — in your inbox before your first meeting." },
];

const SLIDE_COUNT = 15;

/* ── Vertical slide-progress rail — up/down chevrons + dot nav, like the source deck ── */
function SlideRail({
  active,
  onJump,
}: {
  active: number;
  onJump: (i: number) => void;
}) {
  return (
    <div
      className="hidden md:flex fixed z-40 flex-col items-center"
      style={{
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "0.875rem 0.5rem",
        borderRadius: "999px",
        background: "rgba(6,8,14,0.55)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => onJump(Math.max(0, active - 1))}
        className="flex items-center justify-center rounded-full cursor-pointer"
        style={{ width: "1.75rem", height: "1.75rem", color: "rgba(255,255,255,0.55)", background: "none", border: "none" }}
      >
        ︿
      </button>
      <div className="flex flex-col items-center gap-2.5" style={{ margin: "0.5rem 0" }}>
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onJump(i)}
            className="cursor-pointer rounded-full"
            style={{
              width: i === active ? "0.625rem" : "0.375rem",
              height: i === active ? "0.625rem" : "0.375rem",
              background: i === active ? "#ff5a3d" : "rgba(255,255,255,0.32)",
              boxShadow: i === active ? "0 0 10px rgba(255,90,61,0.65)" : "none",
              border: "none",
              transition: "all 0.25s ease",
            }}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => onJump(Math.min(SLIDE_COUNT - 1, active + 1))}
        className="flex items-center justify-center rounded-full cursor-pointer"
        style={{ width: "1.75rem", height: "1.75rem", color: "rgba(255,255,255,0.55)", background: "none", border: "none" }}
      >
        ﹀
      </button>
    </div>
  );
}

export function AutonomousPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root, threshold: 0.5 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function jumpTo(i: number) {
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const slideClass =
    "relative w-full flex flex-col justify-center overflow-y-auto";
  const slideStyle: React.CSSProperties = {
    height: "100vh",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  };

  return (
    <div
      ref={containerRef}
      style={{ height: "100vh", overflowY: "auto", scrollSnapType: "y mandatory" }}
    >
      <SlideRail active={active} onJump={jumpTo} />
      {/* ══ 1 · Hero ══ */}
      <section
        ref={(el) => { slideRefs.current[0] = el; }}
        className={`${slideClass} overflow-hidden`}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 3rem" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 55% at 20% 0%, rgba(52,68,224,0.16) 0%, transparent 60%), radial-gradient(55% 50% at 100% 20%, rgba(255,90,43,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-6">Enterprise Offering · 2026</Eyebrow>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              A team that sells, serves and moderates at 3 AM —{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                and shows you the whole business at 9.
              </span>
            </h1>
            <p
              className="font-light mt-7 mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "40rem" }}
            >
              Four AI agents inside every inbox and comment section your customers already use. WhatsApp,
              Instagram, Messenger, TikTok, email, web chat — one thread, whatever they arrive on. Live in a day.
            </p>
          </Reveal>
          <StatRow
            stats={[
              { value: "240K+", label: "Interactions Handled" },
              { value: "89%", label: "Closed Without a Human" },
              { value: "13s", label: "Median Reply Time" },
              { value: "24/7", label: "Always Active" },
            ]}
          />
        </div>
      </section>

      {/* ══ 2 · The problem ══ */}
      <section
        ref={(el) => { slideRefs.current[1] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <SectionHead
            eyebrow="The Problem"
            title="Your customers are awake."
            accentTail="Your business isn't."
            body="Each bar is one hour of inbound. The orange hours are conversations that arrived when nobody was at the desk — every one of them a customer who asked, waited, and went somewhere else."
          />
          <HourlyChart note="53% of inbound arrives while the office is shut." />
        </div>
        <div className="relative max-w-6xl mx-auto grid sm:grid-cols-3 gap-5 mt-10">
          <PainCard index={0} stat="60×" body="Less likely to qualify a lead after a single day of silence." />
          <PainCard index={1} stat="2×" body="You pay to acquire the same customer twice when the first reply is too slow." />
          <PainCard index={2} stat="0" body="Value created by a canned auto-reply. Customers read them as a closed door." />
        </div>
      </section>

      {/* ══ 3 · See it work ══ */}
      <section
        ref={(el) => { slideRefs.current[2] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6rem 1.5rem 1.5rem" }}
      >
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
          <div>
            <SectionHead
              eyebrow="See It Work"
              title="23:41 on a Tuesday."
              accentTail="Booked and paid by 23:44."
              titleSize="clamp(1.375rem, 2.4vw, 1.875rem)"
            />
            <div className="mt-6">
              <HospitalChatMock />
            </div>
          </div>
          <div>
            <Reveal>
              <p
                className="font-light"
                style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "34rem" }}
              >
                A hospital with nine branches. No one on shift. The agent triages, finds a real consultant with a
                real opening, holds the slot and takes the deposit — in the patient&apos;s own dialect.
              </p>
            </Reveal>
            <div className="mt-6">
              <Timeline
                steps={[
                  {
                    time: "23:42",
                    title: "Triaged, never diagnosed",
                    body: "Medical judgement stays with your doctors — enforced in the system, not left to the model's discretion.",
                  },
                  {
                    time: "23:42",
                    title: "A real consultant, a real opening",
                    body: "Specialty, branch, price and slots that actually exist in your calendar — read live, never invented.",
                  },
                  {
                    time: "23:44",
                    title: "Slot held, deposit taken",
                    body: "Payment collected at midnight. No call back, no morning queue, no admissions desk involved.",
                    highlight: true,
                  },
                  {
                    time: "09:00",
                    title: "And it follows up",
                    body: "The reminder the next morning, the post-visit check three days later, the patient who never rebooked.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4 · What you get ══ */}
      <section
        ref={(el) => { slideRefs.current[3] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="What You Get"
            title="Not a chatbot."
            accentTail="Four hires."
            body="Four specialised agents working as one operational team — reporting to each other, escalating to your people, and answering to you every morning at nine."
            center
          />

          <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {CHANNELS.map((ch) => (
              <span
                key={ch.label}
                className="inline-flex items-center gap-2 rounded-full font-medium"
                style={{
                  padding: "0.5rem 1.125rem",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                <span aria-hidden="true" style={{ display: "inline-flex", width: "1rem", height: "1rem" }}>
                  {ch.icon}
                </span>
                {ch.label}
              </span>
            ))}
          </Reveal>
          <p
            className="text-center font-light mt-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.04em", color: "rgba(255,255,255,0.4)" }}
          >
            One thread, whatever channel they arrive on.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            <FeatureCard
              index={0}
              glyph="◆"
              title="Operations Manager"
              body="Routes the complex ones, escalates the sensitive ones, and reports to you at nine."
            />
            <FeatureCard
              index={1}
              glyph="▲"
              title="Sales Agent"
              body="Closes the deal. Quotes pricing, verifies live inventory and calendars, books the appointment and collects payment inside the chat."
            />
            <FeatureCard
              index={2}
              glyph="●"
              title="Service Agent"
              body="Holds the customer. Order tracking, modifications, complaints — resolved at 2 AM, in local dialect, without a ticket queue."
            />
            <FeatureCard
              index={3}
              glyph="■"
              title="Social Moderation Agent"
              body="Protects the feed. Answers every comment in brand voice, hides spam and scams, and turns a public 'Price?' into a private sales lead."
            />
          </div>
          <p
            className="text-center font-light mt-8"
            style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}
          >
            Reading from your catalogue · calendar · payments · CRM
          </p>
        </div>
      </section>

      {/* ══ 5 · Industry intro ══ */}
      <section
        ref={(el) => { slideRefs.current[4] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6rem 1.5rem 1.5rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="High-Impact Automation"
            title="The same question at 3 AM."
            accentTail="Three different businesses."
            body="Every sector has a moment where a customer needs an answer and nobody is there to give it. Pick a sector — the flow is the same, only the rulebook changes."
            center
          />
          <AutomationFlowTabs />
        </div>
      </section>

      {/* ══ 6–8 · Industry blocks ══ */}
      {INDUSTRIES.map((industry, i) => (
        <section
          key={industry.key}
          ref={(el) => { slideRefs.current[5 + i] = el; }}
          className={slideClass}
          style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
        >
          <div className="relative max-w-6xl mx-auto w-full">
            <IndustryBlock industry={industry} />
          </div>
        </section>
      ))}

      {/* ══ 9 · Governance ══ */}
      <section
        ref={(el) => { slideRefs.current[8] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6rem 1.5rem 1.5rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
            <SectionHead
              eyebrow="Governance"
              title="Action when it's clear."
              accentTail="Escalation when it's sensitive."
              titleSize="clamp(1.375rem, 2.4vw, 1.875rem)"
            />
            <Reveal>
              <p
                className="font-light"
                style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", maxWidth: "34rem" }}
              >
                The value is not that the agent answers everything. It is that it knows precisely where its
                authority ends — and that boundary is written into the system, reviewed by you, and auditable
                after the fact.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-6">
            <Reveal>
              <div className="rounded-3xl p-5 h-full" style={glass}>
                <p
                  className="font-bold"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5aa2ff" }}
                >
                  Where It Acts — Booking Flow
                </p>
                <div className="mt-4">
                  <Timeline
                    steps={[
                      { time: "23:41", title: "Patient describes pain", body: "The agent does not interpret the symptom — it establishes which specialty and which branch." },
                      { time: "23:42", title: "Presents real availability", body: "The branch and the consultation price, read live from your calendar." },
                      { time: "23:44", title: "Deposit collected", body: "Slot held, confirmation sent. No human touched the conversation." },
                    ]}
                  />
                </div>
                <div
                  className="rounded-2xl p-3.5 mt-4"
                  style={{ background: "rgba(90,162,255,0.08)", border: "1px solid rgba(90,162,255,0.22)" }}
                >
                  <p className="font-light" style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>
                    <span className="font-bold text-white">The rule — </span>
                    Medical diagnosis remains strictly with your doctors. The agent manages triage and calendar
                    booking, nothing beyond it.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-3">
              <p
                className="font-bold"
                style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff9a5a" }}
              >
                Where It Holds Back — The Feed
              </p>
              {[
                { q: "“Is this authentic leather?”", a: "Answered publicly with the material specification within 90 seconds. Factual, verifiable, safe to automate." },
                { q: "“Price?”", a: "Answered publicly, then routed into a DM to complete checkout — the public thread stays clean." },
                { q: "“Scam page”", a: "Hidden pending human review and flagged to the Operations Manager. Never auto-argued — an accusation is escalated, not debated." },
              ].map((row, i) => (
                <Reveal key={row.q} delay={Math.min(i * 0.08, 0.24)}>
                  <div className="rounded-2xl p-4" style={glass}>
                    <p className="font-bold" style={{ fontSize: "0.875rem", color: "#ffffff" }}>
                      {row.q}
                    </p>
                    <p className="font-light mt-1" style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>
                      {row.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10 · The 09:00 report ══ */}
      <section
        ref={(el) => { slideRefs.current[9] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6rem 1.5rem 1.5rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
            <SectionHead
              eyebrow="The 09:00 Report"
              title="You stop guessing"
              accentTail="about your own business."
              titleSize="clamp(1.375rem, 2.4vw, 1.875rem)"
            />
            <Reveal>
              <p
                className="font-light"
                style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", maxWidth: "34rem" }}
              >
                Every question your customers asked overnight becomes one picture: what they want, what they
                misunderstand, when they actually show up, and which posts create customers rather than applause.
              </p>
            </Reveal>
          </div>

          <StatRow
            stats={[
              { value: "482", label: "Conversations" },
              { value: "96", label: "Orders & Bookings" },
              { value: "89%", label: "Closed Without a Human" },
              { value: "11%", label: "Needed a Human" },
              { value: "13s", label: "Median Reply" },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <Reveal>
              <div className="rounded-2xl p-4 h-full" style={glass}>
                <p className="font-bold" style={{ fontSize: "0.8125rem", color: "#ffffff" }}>
                  What They Actually Asked
                </p>
                <p className="font-light mt-0.5" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.4)" }}>
                  In their own words · this month
                </p>
                <div className="flex flex-col gap-2 mt-3">
                  {[
                    ["Price, and the bundle price", 214],
                    ["Sizing and fit", 156],
                    ["Delivery time to Alexandria", 88],
                    ["Returns and exchanges", 62],
                    ["“Is it the original?”", 61],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex items-center gap-2">
                      <div className="flex-1" style={{ height: "0.375rem", background: "rgba(255,255,255,0.06)", borderRadius: "999px" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${((val as number) / 214) * 100}%`,
                            background: "linear-gradient(90deg, #5aa2ff 0%, #9fc8ff 100%)",
                            borderRadius: "999px",
                          }}
                        />
                      </div>
                      <span className="font-light shrink-0" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.7)", width: "9.5rem" }}>
                        {label}
                      </span>
                      <span className="font-bold shrink-0" style={{ fontSize: "0.6875rem", color: "#ffffff" }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl p-4 h-full" style={glass}>
                <p className="font-bold" style={{ fontSize: "0.8125rem", color: "#ffffff" }}>
                  Customers, Not Applause
                </p>
                <p className="font-light mt-0.5" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.4)" }}>
                  Same spend · two creatives
                </p>
                <div className="flex flex-col gap-2.5 mt-3">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>
                        Reel A — brand film
                      </span>
                      <span className="font-bold" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                        1 sale
                      </span>
                    </div>
                    <div className="mt-1.5" style={{ height: "0.375rem", background: "rgba(255,255,255,0.06)", borderRadius: "999px" }}>
                      <div style={{ height: "100%", width: "3%", background: "rgba(255,255,255,0.3)", borderRadius: "999px" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)" }}>
                        Reel B — how it fits
                      </span>
                      <span className="font-bold" style={{ fontSize: "0.75rem", color: "#ff9a5a" }}>
                        31 sales
                      </span>
                    </div>
                    <div className="mt-1.5" style={{ height: "0.375rem", background: "rgba(255,255,255,0.06)", borderRadius: "999px" }}>
                      <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg, #ff7a3d 0%, #ff9a5a 100%)", borderRadius: "999px" }} />
                    </div>
                  </div>
                </div>
                <p className="font-light mt-3" style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}>
                  A sixth of the reach. Thirty-one times the sales. The agency reported Reel A.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 11 · Who it's for — the engine ══ */}
      <section
        ref={(el) => { slideRefs.current[10] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-5xl mx-auto">
          <SectionHead
            eyebrow="Who It's For"
            title="One engine."
            accentTail="Rules already written for yours."
            body="The same core reasoning layer sits behind every deployment. What changes per sector is the rulebook — the compliance boundaries, the vocabulary, the systems it reads from. No market-specific rebuild."
            center
          />

          <Reveal delay={0.15} className="mt-14 flex justify-center">
            <div className="relative" style={{ width: "min(90vw, 30rem)", aspectRatio: "1 / 1" }}>
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ inset: "16%", border: "1px dashed rgba(255,255,255,0.14)" }}
              />
              {/* Centre — the engine */}
              <div
                className="absolute rounded-3xl flex flex-col items-center justify-center text-center p-4"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "40%",
                  height: "40%",
                  ...glass,
                  boxShadow: "0 0 60px rgba(52,68,224,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <p className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
                  The ARQQA Engine
                </p>
                <p className="font-light mt-1" style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>
                  Reasoning · Memory · Guardrails
                </p>
              </div>
              {/* Three surrounding agent nodes */}
              {["Sales Agent", "Service Agent", "Moderation Agent"].map((label, i) => {
                const angle = (-90 + i * (360 / 3)) * (Math.PI / 180);
                const x = 50 + 42 * Math.cos(angle);
                const y = 50 + 42 * Math.sin(angle);
                return (
                  <div
                    key={label}
                    className="absolute flex items-center justify-center rounded-full font-medium text-center px-3"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      width: "7.5rem",
                      height: "7.5rem",
                      fontSize: "0.75rem",
                      color: "#ffffff",
                      background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </Reveal>
          <p
            className="text-center font-light mt-8"
            style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}
          >
            Reading from your catalogue · calendar · payments · CRM
          </p>
          <p
            className="text-center font-light mt-2"
            style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}
          >
            Industry rules pre-built — no market-specific rebuild.
          </p>
        </div>
      </section>

      {/* ══ 12 · Proof ══ */}
      <section
        ref={(el) => { slideRefs.current[11] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-5xl mx-auto">
          <SectionHead
            eyebrow="Proof"
            title="Same inbox."
            accentTail="Different business."
            body="The single number that changes everything downstream is how long a customer waits for a real reply. Everything else — conversion, repeat rate, cost per acquisition — moves behind it."
            center
          />

          <Reveal delay={0.1} className="mt-12">
            <div className="rounded-3xl p-7" style={glass}>
              <p
                className="font-light text-center"
                style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}
              >
                Median wait for a real reply · one measured account
              </p>
              <div className="mt-8 flex flex-col gap-6 max-w-xl mx-auto">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-medium" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
                      Before
                    </span>
                    <span className="font-bold" style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.7)" }}>
                      1h 36m
                    </span>
                  </div>
                  <div style={{ height: "0.75rem", background: "rgba(255,255,255,0.08)", borderRadius: "999px" }}>
                    <div style={{ height: "100%", width: "100%", background: "rgba(255,255,255,0.25)", borderRadius: "999px" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-medium" style={{ fontSize: "0.875rem", color: "#ffffff" }}>
                      With ARQQA
                    </span>
                    <span className="font-bold" style={{ fontSize: "1.125rem", color: "#ff9a5a" }}>
                      13s
                    </span>
                  </div>
                  <div style={{ height: "0.75rem", background: "rgba(255,255,255,0.08)", borderRadius: "999px" }}>
                    <div
                      style={{
                        height: "100%",
                        width: "0.6%",
                        minWidth: "0.75rem",
                        background: "linear-gradient(90deg, #ff7a3d 0%, #ff9a5a 100%)",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p
                className="text-center font-light mt-5"
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}
              >
                — drawn to scale —
              </p>
            </div>
          </Reveal>

          <StatRow
            stats={[
              { value: "240K+", label: "Interactions Handled" },
              { value: "89%", label: "Closed With No Human" },
              { value: "13s", label: "Median Reply Time" },
              { value: "24/7", label: "Across 3 Markets" },
            ]}
          />
        </div>
      </section>

      {/* ══ 13 · Deployment & governance ══ */}
      <section
        ref={(el) => { slideRefs.current[12] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Deployment & Governance"
            title="Four steps."
            accentTail="No IT project."
            body="No integration sprint, no vendor onboarding cycle, no six-week discovery. We read your inbox on day zero and you are approving live conversations by the afternoon of day one."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {DEPLOYMENT_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i * 0.08, 0.3)}>
                <div className="rounded-3xl p-6 h-full" style={glass}>
                  <p
                    className="font-bold"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5aa2ff" }}
                  >
                    {step.when}
                  </p>
                  <p className="font-bold mt-3" style={{ fontSize: "1rem", color: "#ffffff" }}>
                    {step.title}
                  </p>
                  <p className="font-light mt-2" style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { label: "We Need", body: "Your existing number, your price list, and one person for an hour." },
              { label: "You Keep", body: "Your number, your tone, and the right to take over any conversation." },
              { label: "Your Data", body: "Never pooled, never sold. GDPR, EU AI Act and Meta Verified compliant." },
            ].map((row, i) => (
              <Reveal key={row.label} delay={Math.min(i * 0.08, 0.3)}>
                <div className="rounded-3xl p-6 h-full" style={glass}>
                  <p
                    className="font-bold"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
                  >
                    {row.label}
                  </p>
                  <p className="font-light mt-2" style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.7)" }}>
                    {row.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 14 · Pricing ══ */}
      <section
        ref={(el) => { slideRefs.current[13] = el; }}
        className={slideClass}
        style={{ ...slideStyle, padding: "6.5rem 1.5rem 2rem" }}
      >
        <div className="relative max-w-6xl mx-auto">
          <SectionHead
            eyebrow="What It Costs"
            title="Less than one junior hire."
            accentTail="Four of them, always on."
            body="A receptionist covers one shift, one channel and one language. This covers all of them — priced by conversations, not headcount."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-stretch">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.tier} delay={Math.min(i * 0.08, 0.3)} className="h-full">
                <div
                  className="relative rounded-3xl p-6 h-full flex flex-col"
                  style={{
                    ...glass,
                    border: tier.featured ? "1px solid rgba(255,138,90,0.5)" : glass.border,
                    boxShadow: tier.featured
                      ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28)"
                      : glass.boxShadow,
                  }}
                >
                  {tier.badge ? (
                    <span
                      className="absolute inline-flex items-center rounded-full font-bold"
                      style={{
                        top: "-0.75rem",
                        left: "1.5rem",
                        padding: "0.3rem 0.75rem",
                        fontSize: "0.625rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        background: "linear-gradient(120deg, #ff7a3d 0%, #2f6bff 100%)",
                      }}
                    >
                      {tier.badge}
                    </span>
                  ) : null}
                  <p className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
                    {tier.tier}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-bold" style={{ fontSize: "1.5rem", color: "#ffffff", letterSpacing: "-0.02em" }}>
                      {tier.price}
                    </span>
                    <span className="font-light" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                      EGP / mo
                    </span>
                  </div>
                  <p className="font-light mt-3" style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                    {tier.note}
                  </p>
                  <div className="flex flex-col gap-2.5 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {tier.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" style={{ color: "#5aa2ff", fontSize: "0.75rem", marginTop: "0.2rem" }}>
                          ✓
                        </span>
                        <span className="font-light" style={{ fontSize: "0.8125rem", lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="max-w-2xl mx-auto text-center mt-8">
            <p className="font-light" style={{ fontSize: "0.75rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>
              Service fee only. Platform costs — WhatsApp Business API, model usage, automation — are passed
              through at cost, itemised monthly. No markup. No set-up fee. Cancel monthly. Annual commitment
              carries a 15% discount. Prices in EGP, reviewed quarterly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section
        ref={(el) => { slideRefs.current[14] = el; }}
        className={`${slideClass} overflow-hidden`}
        style={{ ...slideStyle, padding: "2rem 1.5rem" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 100%, rgba(52,68,224,0.16) 0%, transparent 65%)",
          }}
        />
        <Reveal className="relative max-w-3xl mx-auto text-center">
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.625rem, 3.2vw, 2.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Let us read your inbox before you decide anything.
          </h2>
          <p
            className="font-light mt-5"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
          >
            Send your last few thousand conversations and within a week you get what your customers ask, how
            many went unanswered, and what that costs a year. Free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <PrimaryCTA label="Start the Free Audit" href="/start#book-strategy-call" />
            <a
              href="mailto:info@arqqa.net"
              className="font-medium"
              style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)" }}
            >
              info@arqqa.net
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

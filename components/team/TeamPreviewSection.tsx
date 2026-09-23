"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ── Reveal-on-scroll wrapper — same pattern used across the site ── */
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

/* A short lineup, not the full roster on /about#team — same five people
   the "View More" button leads straight to at the top of that section. */
const TEAM_PREVIEW = [
  { name: "Wael Saad", title: "CEO & Founder", image: "/team/wael-03.webp" },
  { name: "Ahmed Saad", title: "Co-Founder & Commercial Director", image: "/team/ahmed-01.webp" },
  { name: "Abdel Rhman Sharaf", title: "Head Of Performance", image: "/team/abd-el-rahman-01.webp" },
  { name: "Menna Yousry", title: "Head Of Communication", image: "/team/menna-01.webp" },
  { name: "Samar Mohamed", title: "Head Of Creative", image: "/team/samar01.webp" },
];

/* Same card treatment as the About page's Leadership grid: the photo
   fills the frame, name and title sit on a soft gradient fade at the
   foot of it, always visible. */
function TeamCard({ member }: { member: (typeof TEAM_PREVIEW)[0] }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: "3 / 4",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.96)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "78%",
          background: "linear-gradient(180deg, transparent 0%, rgba(4,5,10,0.32) 38%, rgba(4,5,10,0.9) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 text-center" style={{ padding: "0.75rem 0.6rem 1.25rem" }}>
        <h3
          className="font-bold"
          style={{
            fontSize: "clamp(0.75rem, 1.6vw, 1rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}
        >
          {member.name}
        </h3>
        <p
          className="font-light mt-1"
          style={{
            fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
            lineHeight: 1.3,
            letterSpacing: "0.01em",
            color: "#9fc8ff",
            textShadow: "0 1px 10px rgba(0,0,0,0.6)",
          }}
        >
          {member.title}
        </p>
      </div>
    </div>
  );
}

export function TeamPreviewSection() {
  return (
    <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <Eyebrow className="mb-5">OUR TEAM</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            The People Behind the System.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {TEAM_PREVIEW.map((member, i) => (
            <Reveal key={member.name} delay={Math.min(i * 0.08, 0.32)}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="flex justify-center mt-12">
          <Link
            href="/about#team"
            className="relative inline-flex rounded-2xl"
            style={{
              padding: "1px",
              background:
                "linear-gradient(120deg, #ff7a3d 0%, #b6541f 22%, rgba(255,255,255,0.14) 50%, #2f6bff 82%, #5aa2ff 100%)",
              boxShadow: "0 -10px 32px -6px rgba(255,122,61,0.35), 0 10px 32px -10px rgba(47,107,255,0.3)",
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
              View More
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "next/image";
import Link from "next/link";

type Service = {
  num: string;
  slug: string;
  title: string;
  body: string;
  cep: string;
  accent: "blue" | "orange";
  image: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    slug: "strategy-consulting",
    title: "Strategy & Consulting",
    body: "Paid discovery workshops. Go-to-market roadmaps. Growth audits. Competitive analysis. The strategic foundation where every engagement begins.",
    cep: "When your growth has stagnated.",
    accent: "blue",
    image: "/services/strategy.webp",
  },
  {
    num: "02",
    slug: "asset-building",
    title: "Asset Building",
    body: "Branding and identity systems. Website design and development. Company profiles. Visual identity rollout kits. Every asset a company needs to launch, reposition, or scale.",
    cep: "When nobody remembers your brand.",
    accent: "orange",
    image: "/services/assets.webp",
  },
  {
    num: "03",
    slug: "catalyst-system",
    title: "The Catalyst System™",
    body: "The integrated engine: social media management + performance marketing + content creation. Google, Meta, TikTok, Snapchat. Platform-native content. Guaranteed synergy between creative and media.",
    cep: "When your teams don't talk to each other.",
    accent: "blue",
    image: "/services/catalyst.webp",
  },
  {
    num: "04",
    slug: "technology",
    title: "Technology",
    body: "Website design & development. Mobile app design & development. UI/UX. CRM integration & automation. HubSpot, Shopify, Salla. Built for speed, conversion, and scale.",
    cep: "When your product doesn't convert.",
    accent: "orange",
    image: "/services/technology.webp",
  },
  {
    num: "05",
    slug: "community-management",
    title: "Social Media & Community Management",
    body: "Moderation. Autonomous community management. Social listening. Crisis handling. Social CX automation. Protecting and growing your brand presence 24/7.",
    cep: "When your community is unmanaged.",
    accent: "blue",
    image: "/services/community.webp",
  },
  {
    num: "06",
    slug: "video-production",
    title: "Social Media Video Production",
    body: "Reels & short-form content. Brand films & commercials. Product & testimonial videos. Motion graphics & animation. Content creator direction. The feed belongs to video — your brand belongs in it.",
    cep: "When your brand is invisible on the feed.",
    accent: "orange",
    image: "/services/video.webp",
  },
  {
    num: "07",
    slug: "performance-marketing",
    title: "Performance Marketing",
    body: "Paid search, paid social, and programmatic. Full-funnel campaign architecture. Conversion tracking and attribution. Creative testing at volume. Spend tied to revenue, not impressions.",
    cep: "When you're spending more every month and learning less.",
    accent: "blue",
    image: "/services/performance.webp",
  },
];

/** CTA label that slides up on hover (duplicate text glides in from below) */
function SlideLabel({ text }: { text: string }) {
  return (
    <span
      className="relative block overflow-hidden"
      style={{ height: "1.5em", lineHeight: "1.5em" }}
    >
      <span
        className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        style={{ height: "1.5em" }}
      >
        {text}
      </span>
    </span>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOrange = service.accent === "orange";
  const glow = isOrange ? "rgba(255,110,50," : "rgba(60,125,255,";

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
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${(index % 2) * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${(index % 2) * 0.1}s`,
      }}
    >
      <Link
        href={`/services/${service.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "26rem",
          background:
            "linear-gradient(165deg, rgba(22,26,40,0.97) 0%, rgba(8,10,18,0.98) 100%)",
          border: hovered
            ? "1px solid rgba(255,138,90,0.5)"
            : "1px solid rgba(255,255,255,0.13)",
          boxShadow: hovered
            ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 -18px 50px -20px ${glow}0.4), 0 24px 60px -20px rgba(0,0,0,0.85)`
            : `inset 0 1px 0 rgba(255,255,255,0.08), 0 -18px 50px -20px ${glow}0.25), 0 24px 60px -20px rgba(0,0,0,0.8)`,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Accent washes */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: isOrange
              ? "radial-gradient(45% 65% at 85% 0%, rgba(255,110,50,0.13) 0%, transparent 62%), radial-gradient(45% 55% at 0% 100%, rgba(60,125,255,0.08) 0%, transparent 60%)"
              : "radial-gradient(45% 65% at 0% 0%, rgba(60,125,255,0.14) 0%, transparent 62%), radial-gradient(45% 55% at 85% 100%, rgba(255,110,50,0.07) 0%, transparent 60%)",
          }}
        />

        {/* Image — top band */}
        <div className="relative shrink-0" style={{ height: "12rem" }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Blend the image into the card body — no hard inner edge */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,15,26,0.1) 0%, transparent 45%, rgba(9,10,18,0.65) 85%, rgba(8,10,18,0.98) 100%)",
            }}
          />
        </div>

        {/* Text */}
        <div className="relative flex flex-col flex-1 p-7 sm:p-8">
          <span
            className="relative font-bold"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              backgroundImage: isOrange
                ? "linear-gradient(120deg, #ff9a5a 0%, #ffc29a 60%, #9fc8ff 100%)"
                : "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {service.num} / {String(SERVICES.length).padStart(2, "0")}
          </span>
          <h3
            className="relative font-bold mt-4"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            {service.title}
          </h3>
          <p
            className="relative font-light mt-4"
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {service.body}
          </p>
          {/* CEP — category entry point */}
          <div
            className="relative mt-auto pt-7 pl-4"
            style={{
              borderLeft: `2px solid ${isOrange ? "rgba(255,122,61,0.75)" : "rgba(90,162,255,0.75)"}`,
            }}
          >
            <p
              className="font-light"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              CEP
            </p>
            <p
              className="font-medium mt-1 italic"
              style={{
                fontSize: "0.9375rem",
                color: isOrange ? "#ffb894" : "#9fc8ff",
              }}
            >
              &ldquo;{service.cep}&rdquo;
            </p>
          </div>

          {/* CTA */}
          <span
            className="relative inline-flex items-center gap-2 font-medium mt-6"
            style={{
              fontSize: "0.8125rem",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)",
              transition: "color 0.35s ease",
            }}
          >
            Explore this service
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
        </div>
      </Link>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="relative w-full" style={{ padding: "7rem 1.5rem" }}>
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Eyebrow className="mb-5">SERVICE ECOSYSTEM</Eyebrow>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.3vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Not a Menu.{" "}
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
              A&nbsp;Growth&nbsp;Engine.
            </span>
          </h2>
          <p
            className="font-light mt-5"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Every service connects. Every team collaborates. Every output is
            measured. This is not a list of offerings. It&apos;s an integrated
            system designed for compounding returns.
          </p>
        </div>

        {/* ── Service grid — static, 2 columns, even spacing ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>

        {/* ── CTA row ── */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-5 mt-24">
          {/* Primary — gradient-rimmed dark pill with warm top glow */}
          <Link
            href="/services"
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
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                width: "70%",
                height: "1.5rem",
                left: "15%",
                top: "-1rem",
                background:
                  "radial-gradient(50% 100% at 50% 100%, rgba(255,140,70,0.5) 0%, transparent 100%)",
                filter: "blur(6px)",
              }}
            />
            <span
              className="relative inline-flex items-center justify-center rounded-2xl font-medium"
              style={{
                padding: "0.875rem 2rem",
                background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                color: "#ffffff",
                fontSize: "0.9375rem",
                letterSpacing: "0.01em",
              }}
            >
              <SlideLabel text="Explore Services" />
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}

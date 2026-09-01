"use client";

import { useState } from "react";
import Link from "next/link";

const TOP_SERVICES = [
  { label: "The Catalyst System™", href: "/catalyst-system" },
  { label: "Web Design & Development", href: "/services/technology/website" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
];

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/work" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/start" },
];

/* Dial link uses the international form so it works from any country. */
const PHONE = { display: "011 1011 5557", href: "tel:+201110115557" };

/* Footer carries the HQ only — the full office list lives on /start. */
const OFFICES = [
  {
    label: "Cairo",
    lines: ["12 Amin Anis, Ard El Golf", "Heliopolis, Cairo, Egypt"],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/arqqa",
    icon: (
      <path d="M13.5 8.5h2V5.8h-2.4c-1.9 0-3.1 1.3-3.1 3.2v1.7H8v2.6h2v6.9h2.8v-6.9h2.3l.4-2.6h-2.7V9.3c0-.5.3-.8.7-.8z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/arqqa",
    icon: (
      <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6zM16.9 8.2a.85.85 0 1 1-1.7 0 .85.85 0 0 1 1.7 0zM12 5.4c-1.8 0-2 0-2.7.04-.7.03-1.2.15-1.6.31a3.2 3.2 0 0 0-1.9 1.9c-.16.4-.28.9-.31 1.6C5.4 10 5.4 10.2 5.4 12s0 2 .04 2.7c.03.7.15 1.2.31 1.6a3.2 3.2 0 0 0 1.9 1.9c.4.16.9.28 1.6.31.7.04.9.04 2.7.04s2 0 2.7-.04c.7-.03 1.2-.15 1.6-.31a3.2 3.2 0 0 0 1.9-1.9c.16-.4.28-.9.31-1.6.04-.7.04-.9.04-2.7s0-2-.04-2.7c-.03-.7-.15-1.2-.31-1.6a3.2 3.2 0 0 0-1.9-1.9c-.4-.16-.9-.28-1.6-.31C14 5.4 13.8 5.4 12 5.4zm0 1.2c1.8 0 2 0 2.7.04.6.03 1 .13 1.2.22.3.12.5.26.75.5.24.24.38.44.5.75.09.23.19.6.22 1.2.04.7.04.9.04 2.7s0 2-.04 2.7c-.03.6-.13 1-.22 1.2a2 2 0 0 1-.5.75c-.24.24-.44.38-.75.5-.23.09-.6.19-1.2.22-.7.04-.9.04-2.7.04s-2 0-2.7-.04c-.6-.03-1-.13-1.2-.22a2 2 0 0 1-.75-.5 2 2 0 0 1-.5-.75c-.09-.23-.19-.6-.22-1.2-.04-.7-.04-.9-.04-2.7s0-2 .04-2.7c.03-.6.13-1 .22-1.2.12-.3.26-.5.5-.75.24-.24.44-.38.75-.5.23-.09.6-.19 1.2-.22.7-.04.9-.04 2.7-.04z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com/arqqa",
    icon: (
      <path d="M15.9 6h2.2l-4.8 5.5L19 19h-4.4l-3.5-4.5L7.2 19H5l5.1-5.9L4.7 6h4.5l3.1 4.1L15.9 6zm-.8 11.7h1.2L8.6 7.2H7.3l7.8 10.5z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/arqqa",
    icon: (
      <path d="M8.3 9.7H5.7V18h2.6V9.7zM7 8.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.3 13.4c0-2.5-1.3-3.9-3.2-3.9-1.5 0-2.1.8-2.5 1.4V9.7h-2.6V18h2.6v-4.5c0-1.2.5-1.9 1.5-1.9s1.5.7 1.5 1.9V18h2.7v-4.6z" />
    ),
  },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-semibold"
      style={{
        fontSize: "0.6875rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        backgroundImage: "linear-gradient(90deg, #5aa2ff 0%, #ff9a5a 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </p>
  );
}

function ColumnLink({ link }: { link: { label: string; href: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block font-light"
      style={{
        fontSize: "0.9375rem",
        lineHeight: 2.1,
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        transition:
          "color 0.3s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {link.label}
    </Link>
  );
}

export function Footer() {
  const [mailHover, setMailHover] = useState(false);

  return (
    <footer className="relative w-full" style={{ padding: "7rem 1.5rem 0" }}>
      <div className="relative max-w-6xl mx-auto">
        {/* ── Top row — logo left, giant email right ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Logo — top left */}
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arqqa-logo.webp"
              alt="ARQQA"
              style={{ height: "3rem", width: "auto" }}
            />
          </div>

          <div className="md:text-right">
            <p
              className="font-light"
              style={{
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Uncover the potency
              <br />
              of <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>ARQQA</span> at
            </p>
            <a
              href="mailto:info@arqqa.net"
              onMouseEnter={() => setMailHover(true)}
              onMouseLeave={() => setMailHover(false)}
              className="block font-bold mt-4"
              style={{
                fontSize: "clamp(2rem, 5.4vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: mailHover
                  ? "0 0 44px rgba(90,162,255,0.4)"
                  : "none",
                transition: "text-shadow 0.4s ease",
              }}
            >
              Info@arqqa.net
            </a>
            <div
              className="mt-5 md:ml-auto"
              style={{
                height: "1px",
                width: "100%",
                maxWidth: "34rem",
                background: mailHover
                  ? "linear-gradient(90deg, #5aa2ff 0%, #ff7a3d 100%)"
                  : "rgba(255,255,255,0.18)",
                transition: "background 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* ── Four-column information grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.85fr_1.05fr] gap-y-12 gap-x-10 lg:gap-x-16 mt-20">
          {/* 1 — Who we are */}
          <div>
            <ColumnHeading>ARQQA</ColumnHeading>
            <p
              className="font-light mt-5"
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              A MarTech growth system, not an agency. One accountable engine
              for strategy, creative, media, and technology across four MENA
              markets.
            </p>
          </div>

          {/* 2 — Top services */}
          <div>
            <ColumnHeading>Top Services</ColumnHeading>
            <nav className="mt-4">
              {TOP_SERVICES.map((link) => (
                <ColumnLink key={link.label} link={link} />
              ))}
            </nav>
          </div>

          {/* 3 — Quick links */}
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <nav className="mt-4">
              {QUICK_LINKS.map((link) => (
                <ColumnLink key={link.label} link={link} />
              ))}
            </nav>
          </div>

          {/* 4 — How to reach us */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>

            <div className="mt-5 flex flex-col gap-1">
              <a
                href="mailto:info@arqqa.net"
                className="font-light"
                style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)" }}
              >
                info@arqqa.net
              </a>
              <a
                href={PHONE.href}
                className="font-light"
                style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)" }}
              >
                {PHONE.display}
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {OFFICES.map((office) => (
                <div key={office.label}>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.42)",
                    }}
                  >
                    {office.label}
                  </p>
                  <p
                    className="font-light mt-1"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {office.lines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < office.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar — socials + copyright ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-20 py-7"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-light"
            style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}
          >
            © 2026 ARQQA Digital. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.55)",
                  transition:
                    "color 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,122,61,0.6)";
                  e.currentTarget.style.background = "rgba(255,122,61,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

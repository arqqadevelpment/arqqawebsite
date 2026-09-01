"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "The Catalyst System™", href: "/catalyst-system" },
  { label: "Portfolio", href: "/work" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/start" },
];

function NavLink({
  link,
  onClick,
}: {
  link: (typeof LINKS)[0];
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={link.href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-light whitespace-nowrap"
      style={{
        fontSize: "0.875rem",
        letterSpacing: "0.01em",
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
        transition: "color 0.3s ease",
      }}
    >
      {link.label}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ padding: "1rem 1.25rem" }}
    >
      <div
        className="relative max-w-6xl mx-auto flex items-center justify-between gap-6 rounded-2xl px-5 sm:px-6"
        style={{
          height: "3.75rem",
          background: scrolled || open
            ? "rgba(6,8,14,0.72)"
            : "rgba(6,8,14,0.35)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 34px -16px rgba(0,0,0,0.7)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arqqa-logo.webp"
            alt="ARQQA"
            style={{ height: "1.5rem", width: "auto" }}
          />
        </Link>

        {/* Links — desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
        </nav>

        {/* Get Started — gradient-rimmed pill, warm halo */}
        <Link
          href="/get-started"
          className="relative hidden sm:inline-flex rounded-xl shrink-0"
          style={{
            padding: "1px",
            background:
              "linear-gradient(120deg, #ff7a3d 0%, #b6541f 25%, rgba(255,255,255,0.12) 55%, #2f6bff 85%, #5aa2ff 100%)",
            boxShadow:
              "0 -8px 24px -6px rgba(255,122,61,0.35), 0 8px 24px -10px rgba(47,107,255,0.3)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: "70%",
              height: "1rem",
              left: "15%",
              top: "-0.625rem",
              background:
                "radial-gradient(50% 100% at 50% 100%, rgba(255,140,70,0.5) 0%, transparent 100%)",
              filter: "blur(5px)",
            }}
          />
          <span
            className="relative inline-flex items-center justify-center rounded-xl font-medium"
            style={{
              padding: "0.5625rem 1.375rem",
              background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
              color: "#ffffff",
              fontSize: "0.875rem",
              letterSpacing: "0.01em",
            }}
          >
            Get Started
          </span>
        </Link>

        {/* Hamburger — mobile */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            background: "none",
            border: "none",
          }}
        >
          <span
            className="block rounded-full"
            style={{
              width: "1.25rem",
              height: "1.5px",
              background: "#ffffff",
              transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
          <span
            className="block rounded-full"
            style={{
              width: "1.25rem",
              height: "1.5px",
              background: "#ffffff",
              transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        </button>

        {/* Mobile dropdown */}
        <div
          className="lg:hidden absolute inset-x-0 top-full mt-2 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(6,8,14,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 50px -20px rgba(0,0,0,0.8)",
            maxHeight: open ? "30rem" : "0",
            opacity: open ? 1 : 0,
            visibility: open ? "visible" : "hidden",
            transition:
              "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, visibility 0.35s",
          }}
        >
          <nav className="flex flex-col px-6 py-5 gap-4">
            {LINKS.map((link) => (
              <NavLink key={link.label} link={link} onClick={() => setOpen(false)} />
            ))}
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl font-medium mt-2"
              style={{
                padding: "0.625rem 1.375rem",
                background: "linear-gradient(180deg, #0b0c12 0%, #05060a 100%)",
                border: "1px solid rgba(255,138,90,0.5)",
                color: "#ffffff",
                fontSize: "0.875rem",
              }}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

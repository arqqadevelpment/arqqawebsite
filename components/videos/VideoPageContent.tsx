"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { VideoProject } from "./video-data";

/* ── Reveal-on-scroll wrapper — matches the showcase template's version. ── */
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
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

export function VideoPageContent({ project }: { project: VideoProject }) {
  return (
    <div className="relative">
      <header className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55) saturate(0.9)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,8,0.9) 0%, rgba(3,3,8,0.68) 45%, rgba(3,3,8,0.9) 82%, rgba(3,3,8,1) 100%)",
          }}
        />

        <div
          className="relative mx-auto w-full max-w-5xl px-6 text-center flex flex-col items-center"
          style={{
            paddingTop: "clamp(9rem, 15vw, 12.5rem)",
            paddingBottom: "clamp(3.5rem, 6vw, 5rem)",
          }}
        >
          <Reveal>
            <Link
              href="/work"
              className="showcase-back inline-flex items-center gap-2 mb-8"
              style={{ fontSize: "0.8125rem", letterSpacing: "0.06em" }}
            >
              <span aria-hidden="true" className="showcase-back-arrow">
                ←
              </span>{" "}
              Back to Our Work
            </Link>
          </Reveal>

          {project.logo ? (
            <Reveal delay={0.04} className="mb-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt={`${project.client} logo`}
                style={{
                  height: "clamp(6rem, 11vw, 8.5rem)",
                  width: "auto",
                  maxWidth: "min(100%, 20rem)",
                  objectFit: "contain",
                }}
              />
            </Reveal>
          ) : (
            <Reveal delay={0.04} className="mb-5">
              <Eyebrow>Video &amp; Animation</Eyebrow>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <h1
              className="font-bold text-white"
              style={{
                fontSize: "clamp(2.2rem, 5.4vw, 3.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-5 mx-auto"
              style={{
                maxWidth: "38rem",
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                lineHeight: 1.6,
              }}
            >
              {project.subtitle}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Video ── */}
      <section className="relative mx-auto w-full max-w-5xl px-6" style={{ marginTop: "-2rem" }}>
        <Reveal delay={0.05}>
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "16 / 9",
              borderRadius: "1.25rem",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#050509",
              boxShadow: "0 40px 90px -35px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.02) inset",
            }}
          >
            <iframe
              title={project.title}
              src={`https://player.vimeo.com/video/${project.vimeoId}?h=${project.vimeoHash}`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      {/* ── Description ── */}
      <section
        className="relative mx-auto w-full max-w-3xl px-6 text-center"
        style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)", paddingBottom: project.gallery ? "0" : "clamp(5rem, 9vw, 7rem)" }}
      >
        <Reveal>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(1rem, 1.3vw, 1.0625rem)",
              lineHeight: 1.8,
            }}
          >
            {project.description}
          </p>
        </Reveal>
      </section>

      {/* ── Gallery — production stills, laid out as authored rows ── */}
      {project.gallery ? (
        <section
          className="relative mx-auto w-full max-w-6xl px-6"
          style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)", paddingBottom: "clamp(5rem, 9vw, 7rem)" }}
        >
          <div className="flex flex-col" style={{ gap: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            {project.gallery.map((row, rowIndex) => (
              <div
                key={row.map((m) => m.src).join("|")}
                className={`grid grid-cols-1 ${
                  row.length === 3 ? "sm:grid-cols-3" : row.length === 2 ? "sm:grid-cols-2" : ""
                }`}
                style={{ gap: "clamp(1.25rem, 2.5vw, 2rem)" }}
              >
                {row.map((media, i) => (
                  <Reveal key={media.src} delay={Math.min((rowIndex * row.length + i) * 0.05, 0.3)}>
                    <figure className="m-0">
                      <div
                        className="relative w-full overflow-hidden"
                        style={{
                          borderRadius: "1.25rem",
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "linear-gradient(180deg, #08080e 0%, #050509 100%)",
                          boxShadow: "0 30px 80px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.02) inset",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.src}
                          alt={media.alt}
                          loading="lazy"
                          className="block w-full h-auto"
                        />
                      </div>
                      {media.caption ? (
                        <figcaption
                          className="mt-4"
                          style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.8125rem", letterSpacing: "0.04em" }}
                        >
                          {media.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="relative mx-auto w-full max-w-3xl px-6 text-center"
        style={{ paddingBottom: "clamp(5rem, 9vw, 7rem)" }}
      >
        <Reveal delay={0.06}>
          <div style={{ paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/work" className="showcase-back inline-flex items-center gap-2">
              <span aria-hidden="true" className="showcase-back-arrow">
                ←
              </span>{" "}
              Back to Our Work
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

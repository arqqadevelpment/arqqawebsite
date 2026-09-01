"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ShowcaseMedia, ShowcaseProject } from "./showcase-data";
import { getShowcaseProject } from "./showcase-data";

/* ── Reveal-on-scroll wrapper ──
   threshold is 0 with a bottom rootMargin rather than a ratio: figures are
   routinely taller than the viewport, and a ratio threshold can never be
   satisfied by an element that cannot fit on screen. */
function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
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
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── One figure ──
   `eager` is reserved for the first visual on the page; everything below the
   fold loads lazily. */
function Figure({
  media,
  eager = false,
}: {
  media: ShowcaseMedia;
  eager?: boolean;
}) {
  const isVideo = media.type === "video";

  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "1.25rem",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(180deg, #08080e 0%, #050509 100%)",
          boxShadow:
            "0 30px 80px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.02) inset",
        }}
      >
        {isVideo ? (
          <video
            src={media.src}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-label={media.alt}
            className="block w-full h-auto"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={media.src}
            alt={media.alt}
            loading={eager ? "eager" : "lazy"}
            className="block w-full h-auto"
          />
        )}
      </div>
      {media.caption ? (
        <figcaption
          className="mt-4"
          style={{
            color: "rgba(255,255,255,0.42)",
            fontSize: "0.8125rem",
            letterSpacing: "0.04em",
          }}
        >
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ShowcaseTemplate({ project }: { project: ShowcaseProject }) {
  const next = getShowcaseProject(project.next);

  /* The first visual on the page loads eagerly; the rest wait for scroll. */
  const firstVisualIndex = project.story.findIndex((b) => b.type !== "text");

  return (
    <div className="relative">
      {/* ── Header ── */}
      <header className="relative w-full overflow-hidden">
        {project.heroImage ? (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${project.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.85) saturate(0.95)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(3,3,8,0.88) 0%, rgba(3,3,8,0.55) 40%, rgba(3,3,8,0.82) 78%, rgba(3,3,8,1) 100%)",
              }}
            />
          </>
        ) : null}

        <div
          className="relative mx-auto w-full max-w-6xl px-6"
          style={{
            paddingTop: project.heroImage
              ? "clamp(9rem, 16vw, 14rem)"
              : "clamp(8rem, 13vw, 11rem)",
            paddingBottom: project.heroImage
              ? "clamp(6rem, 11vw, 9rem)"
              : "clamp(3rem, 6vw, 5rem)",
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

          <Reveal delay={0.05}>
            <Eyebrow>{project.category}</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-6 font-bold text-white"
              style={{
                fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-6"
              style={{
                maxWidth: "44rem",
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                lineHeight: 1.6,
              }}
            >
              {project.intro}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Facts strip ── */}
      {project.facts.length > 0 ? (
        <section className="relative mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                padding: "2.25rem 0",
              }}
            >
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {fact.label}
                  </div>
                  <div
                    className="mt-2 text-white"
                    style={{ fontSize: "1rem", lineHeight: 1.45 }}
                  >
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ── Body: paragraphs and visuals alternating ── */}
      <section
        className="relative mx-auto w-full max-w-6xl px-6"
        style={{
          paddingTop: "clamp(3.5rem, 7vw, 5.5rem)",
          paddingBottom: "clamp(3.5rem, 7vw, 5.5rem)",
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
        >
          {project.story.map((block, i) => {
            if (block.type === "text") {
              return (
                <Reveal key={`t-${i}`}>
                  <p
                    style={{
                      maxWidth: "42rem",
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "clamp(1.05rem, 1.35vw, 1.18rem)",
                      lineHeight: 1.75,
                    }}
                  >
                    {block.body}
                  </p>
                </Reveal>
              );
            }

            if (block.type === "figure") {
              return (
                <Reveal key={block.media.src} delay={0.05}>
                  <Figure media={block.media} eager={i === firstVisualIndex} />
                </Reveal>
              );
            }

            /* pair — an authored grouping, but rendered stacked: each image
               gets the full content width so it can be read on its own
               rather than shrunk to half. The gap matches the surrounding
               block rhythm so a pair does not read as a tighter cluster. */
            return (
              <div
                key={`${block.media[0].src}-${block.media[1].src}`}
                className="flex flex-col"
                style={{ gap: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
              >
                {block.media.map((media, j) => (
                  <Reveal key={media.src} delay={0.05}>
                    <Figure
                      media={media}
                      eager={i === firstVisualIndex && j === 0}
                    />
                  </Reveal>
                ))}
              </div>
            );
          })}
        </div>

        {/* Client mark + live site */}
        {project.logo || project.liveUrl ? (
          <Reveal>
            <div
              className="flex flex-col items-center text-center gap-8"
              style={{
                marginTop: "clamp(3.5rem, 7vw, 5.5rem)",
                paddingTop: "clamp(2.5rem, 5vw, 3.5rem)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {project.logo ? (
                /* Height drives the size and width stays auto, so every
                   client mark keeps its own proportions regardless of how
                   wide or square the source file is. */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.logo}
                  alt={`${project.client} logo`}
                  style={{
                    height: "clamp(3.5rem, 6vw, 5rem)",
                    width: "auto",
                    maxWidth: "min(100%, 22rem)",
                    objectFit: "contain",
                    opacity: 0.9,
                  }}
                />
              ) : null}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white"
                  style={{
                    padding: "0.8rem 1.5rem",
                    borderRadius: "999px",
                    fontSize: "0.9rem",
                    background:
                      "linear-gradient(120deg, #ff7a3d 0%, #e03c28 30%, #2f6bff 85%)",
                    boxShadow: "0 14px 34px -16px rgba(47,107,255,0.6)",
                  }}
                >
                  Visit the live site
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </Reveal>
        ) : null}
      </section>

      {/* ── Foot: back to the hub, and the next project ── */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        <Reveal>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2.5rem" }}>
            <Link href="/work" className="showcase-back inline-flex items-center gap-2">
              <span aria-hidden="true" className="showcase-back-arrow">
                ←
              </span>{" "}
              All projects
            </Link>

            {next ? (
              <Link href={`/our-work/${next.slug}`} className="showcase-next group block mt-8">
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Next project
                </div>
                <div className="mt-3 flex items-baseline gap-4">
                  <span
                    className="font-bold text-white"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {next.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="showcase-next-arrow"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
        </Reveal>
      </section>

      <style>{`
        .showcase-back {
          color: rgba(255,255,255,0.5);
          transition: color 0.25s ease;
        }
        .showcase-back:hover { color: #ffffff; }
        .showcase-back-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .showcase-back:hover .showcase-back-arrow { transform: translateX(-4px); }

        .showcase-next-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .showcase-next:hover .showcase-next-arrow { transform: translateX(6px); }

        @media (prefers-reduced-motion: reduce) {
          .showcase-back-arrow,
          .showcase-next-arrow { transition: none; }
        }
      `}</style>
    </div>
  );
}

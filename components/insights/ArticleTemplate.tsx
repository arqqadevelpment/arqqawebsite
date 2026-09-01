"use client";

import { useEffect, useRef, useState } from "react";
import type { Article } from "./insights-data";
import { getRelatedArticles } from "./insights-data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

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
      // A ratio threshold never fires for elements taller than the viewport —
      // the article body is one such block. Trigger on any intersection
      // instead, pulled in slightly so it still reads as a reveal.
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

/* Glass surface shared by every card in the template */
const glass: React.CSSProperties = {
  background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function ArticleTemplate({ article }: { article: Article }) {
  const isOrange = article.accent === "orange";
  const related = getRelatedArticles(article.related);

  return (
    <>
      {/* ══ Hero — gradient banner + title + reading time + category ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 5rem" }}>
        {article.image ? (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${article.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // Pull the artwork back so the headline reads cleanly on top
                // of it, including high-contrast, high-saturation images.
                filter: "brightness(0.62) saturate(0.85)",
                maskImage:
                  "linear-gradient(180deg, transparent 0%, black 10%, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, black 10%, black 55%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(3,3,5,0.55) 0%, rgba(3,3,5,0.82) 60%, #030305 100%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isOrange
                ? "radial-gradient(65% 55% at 85% 0%, rgba(255,110,50,0.28) 0%, rgba(224,60,40,0.1) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(255,90,43,0.16) 0%, transparent 70%)"
                : "radial-gradient(65% 55% at 85% 0%, rgba(60,125,255,0.3) 0%, rgba(20,50,160,0.12) 45%, transparent 75%), radial-gradient(55% 45% at 10% 100%, rgba(90,162,255,0.16) 0%, transparent 70%)",
              maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />
        )}

        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-light"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
            >
              <span aria-hidden="true">←</span> All Insights
            </Link>

            <div className="flex items-center gap-3 mt-8">
              <span
                className="font-bold"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  backgroundImage: "linear-gradient(120deg, #5aa2ff 0%, #9fc8ff 45%, #ff9a5a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {article.category}
              </span>
              <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
                ·
              </span>
              <span className="font-light" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
                {article.date}
              </span>
              <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
                ·
              </span>
              <span className="font-light" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
                {article.readingTime}
              </span>
            </div>

            <h1
              className="font-bold mt-5"
              style={{ fontSize: "clamp(1.875rem, 4.2vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              {article.title}
            </h1>

            <p
              className="font-light mt-6"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
            >
              {article.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ Article body ══ */}
      <section className="relative w-full" style={{ padding: "1rem 1.5rem 5rem" }}>
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            {article.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="font-bold mt-10 mb-4"
                    style={{ fontSize: "1.375rem", letterSpacing: "-0.01em", color: "#ffffff" }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="my-8"
                    style={{
                      borderLeft: "2px solid rgba(255,138,90,0.6)",
                      paddingLeft: "1.5rem",
                      fontSize: "1.1875rem",
                      lineHeight: 1.6,
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                  >
                    {block.text}
                  </blockquote>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="my-6 flex flex-col gap-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="shrink-0 rounded-full"
                          style={{
                            width: "5px",
                            height: "5px",
                            marginTop: "0.72rem",
                            background: "linear-gradient(120deg, #5aa2ff 0%, #ff9a5a 100%)",
                          }}
                        />
                        <span
                          className="font-light"
                          style={{ fontSize: "1.0625rem", lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "link") {
                return (
                  <Link
                    key={i}
                    href={block.href}
                    className="inline-flex items-center gap-2 font-medium my-6"
                    style={{
                      fontSize: "0.9375rem",
                      color: "#ffffff",
                      borderBottom: "1px solid rgba(255,138,90,0.6)",
                      paddingBottom: "3px",
                    }}
                  >
                    {block.text}
                    <span aria-hidden="true" style={{ color: "#ff9a5a" }}>
                      →
                    </span>
                  </Link>
                );
              }
              return (
                <p
                  key={i}
                  className="font-light mt-5"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.85, color: "rgba(255,255,255,0.68)" }}
                >
                  {block.text}
                </p>
              );
            })}
          </Reveal>

          {/* Author bio card */}
          <Reveal delay={0.1} className="mt-14">
            <div className="relative rounded-3xl p-7 flex items-center gap-5" style={glass}>
              <div
                className="shrink-0 flex items-center justify-center rounded-full font-bold"
                style={{
                  width: "3.25rem",
                  height: "3.25rem",
                  fontSize: "1rem",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                }}
              >
                {article.author ? article.author.name.charAt(0) : "A"}
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: "0.9375rem", color: "#ffffff" }}>
                  {article.author ? (
                    article.author.href ? (
                      <a
                        href={article.author.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ffffff", borderBottom: "1px solid rgba(255,138,90,0.6)", paddingBottom: "2px" }}
                      >
                        {article.author.name}
                      </a>
                    ) : (
                      article.author.name
                    )
                  ) : (
                    "The ARQQA Editorial Team"
                  )}
                  {article.author && (
                    <span className="font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {" — "}
                      {article.author.role}
                    </span>
                  )}
                </p>
                <p className="font-light mt-1" style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                  {article.author?.bio ??
                    "Frameworks and field notes from 13 years of building growth systems across MENA — written by the strategists who run the engagements."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Related articles ══ */}
      {related.length > 0 && (
        <section className="relative w-full" style={{ padding: "1rem 1.5rem 6rem" }}>
          <div className="relative max-w-5xl mx-auto">
            <Reveal className="max-w-3xl mb-10">
              <Eyebrow className="mb-4">KEEP READING</Eyebrow>
              <h2 className="font-bold" style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
                More from the Journal.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={Math.min(i * 0.1, 0.3)}>
                  <RelatedArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Newsletter CTA ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "1rem 1.5rem 9rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(50% 60% at 50% 0%, rgba(60,125,255,0.12) 0%, transparent 62%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
        <div
          className="relative max-w-3xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{
            padding: "clamp(2.25rem, 4.5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)",
            background: "linear-gradient(170deg, rgba(14,16,26,0.62) 0%, rgba(6,8,14,0.7) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -30px rgba(0,0,0,0.8)",
          }}
        >
          <Reveal>
            <h2 className="font-bold" style={{ fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Join{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                2,000+ growth leaders.
              </span>
            </h2>
            <p className="font-light mt-4 mx-auto max-w-md" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
              Weekly frameworks, no fluff.
            </p>
            <form
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full sm:flex-1"
                style={{
                  padding: "0.8125rem 1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: "0.875rem",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl font-medium shrink-0"
                style={{
                  padding: "0.8125rem 1.75rem",
                  background: "linear-gradient(120deg, #ff7a3d 0%, #b6541f 60%, #8a3a18 100%)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                }}
              >
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Related-article card — links across to a sibling article */
function RelatedArticleCard({ article }: { article: Article }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = article.accent === "orange";

  return (
    <Link
      href={`/insights/${article.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-3xl overflow-hidden"
      style={{
        ...glass,
        minHeight: "12rem",
        border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
        boxShadow: hovered
          ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOrange
            ? "radial-gradient(55% 55% at 100% 0%, rgba(255,110,50,0.12) 0%, transparent 62%)"
            : "radial-gradient(55% 55% at 0% 0%, rgba(60,125,255,0.13) 0%, transparent 62%)",
        }}
      />
      <div className="relative p-6 flex flex-col h-full">
        <span
          className="font-bold"
          style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
        >
          {article.category}
        </span>
        <h3 className="font-bold mt-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "#ffffff" }}>
          {article.title}
        </h3>
        <span
          className="inline-flex items-center gap-2 font-medium mt-auto pt-5"
          style={{ fontSize: "0.75rem", color: hovered ? "#ffffff" : "rgba(255,255,255,0.5)" }}
        >
          {article.readingTime}
        </span>
      </div>
    </Link>
  );
}

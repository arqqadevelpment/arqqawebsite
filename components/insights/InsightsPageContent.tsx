"use client";

import { useEffect, useRef, useState } from "react";
import { ARTICLES, CATEGORIES } from "./insights-data";
import type { Article, Category } from "./insights-data";
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
      { threshold: 0.15 }
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
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ArticleCard({ article, delay }: { article: Article; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = article.accent === "orange";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/insights/${article.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col h-full rounded-3xl overflow-hidden"
        style={{
          minHeight: "16rem",
          background: "linear-gradient(170deg, rgba(14,16,26,0.6) 0%, rgba(6,8,14,0.68) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered ? "1px solid rgba(255,138,90,0.5)" : "1px solid rgba(255,255,255,0.11)",
          boxShadow: hovered
            ? "0 -14px 40px -18px rgba(255,122,61,0.3), 0 24px 50px -22px rgba(47,107,255,0.28), inset 0 1px 0 rgba(255,175,130,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isOrange
              ? "radial-gradient(60% 60% at 100% 0%, rgba(255,110,50,0.14) 0%, transparent 65%)"
              : "radial-gradient(60% 60% at 0% 0%, rgba(60,125,255,0.15) 0%, transparent 65%)",
          }}
        />

        <div className="relative p-7 flex flex-col h-full">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
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
            <span className="font-light" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
              {article.readingTime}
            </span>
          </div>

          <h3
            className="font-bold mt-4"
            style={{ fontSize: "1.1875rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            {article.title}
          </h3>

          <p
            className="font-light mt-3"
            style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
          >
            {article.excerpt}
          </p>

          <span
            className="inline-flex items-center gap-2 font-medium mt-auto pt-6"
            style={{ fontSize: "0.8125rem", color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)" }}
          >
            Read the article
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300"
              style={{ transform: hovered ? "translateX(3px)" : "none" }}
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

const PAGE_SIZE = Math.ceil(ARTICLES.length / 5); // 66 articles → 5 pages

export function InsightsPageContent() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [page, setPage] = useState(1);

  const filtered = filter === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function selectFilter(tab: Category | "All") {
    setFilter(tab);
    setPage(1);
  }

  return (
    <>
      {/* ══ Hero + category filters ══ */}
      <section className="relative w-full overflow-hidden" style={{ padding: "11rem 1.5rem 4rem" }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 45% at 85% 0%, rgba(60,125,255,0.2) 0%, rgba(20,50,160,0.08) 45%, transparent 75%), radial-gradient(50% 40% at 10% 100%, rgba(255,110,50,0.14) 0%, transparent 72%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-5">THE JOURNAL</Eyebrow>
            <h1
              className="font-bold mx-auto"
              style={{ fontSize: "clamp(2rem, 4.8vw, 3.5rem)", lineHeight: 1.12, letterSpacing: "-0.03em", color: "#ffffff" }}
            >
              Sharp Thinking.{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3444e0 0%, #6f5be0 45%, #ff5a2b 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(52,68,224,0.35))",
                }}
              >
                For the Growth-Obsessed.
              </span>
            </h1>
            <p
              className="font-light mt-6 mx-auto max-w-xl"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.58)" }}
            >
              Frameworks, case breakdowns, and contrarian insights from 13
              years of building growth systems across MENA.
            </p>
          </Reveal>

          {/* Category filter tabs */}
          <Reveal delay={0.15} className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {(["All", ...CATEGORIES.map((c) => c.name)] as (Category | "All")[]).map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectFilter(tab)}
                  className="rounded-full font-medium"
                  style={{
                    padding: "0.5625rem 1.25rem",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.01em",
                    color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                    background: active
                      ? "linear-gradient(120deg, rgba(90,162,255,0.25) 0%, rgba(255,154,90,0.2) 100%)"
                      : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(255,175,130,0.45)" : "1px solid rgba(255,255,255,0.12)",
                    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ══ Grid ══ */}
      <section className="relative w-full" style={{ padding: "2rem 1.5rem 9rem" }}>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article, i) => (
              <ArticleCard key={article.slug} article={article} delay={Math.min(i * 0.06, 0.3)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center font-light mt-16" style={{ color: "rgba(255,255,255,0.45)" }}>
              No articles in this category yet — check back soon.
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="inline-flex items-center justify-center rounded-full font-medium"
                style={{
                  width: "2.375rem",
                  height: "2.375rem",
                  fontSize: "0.875rem",
                  color: currentPage === 1 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: currentPage === 1 ? "default" : "pointer",
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const active = n === currentPage;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    className="inline-flex items-center justify-center rounded-full font-medium"
                    style={{
                      width: "2.375rem",
                      height: "2.375rem",
                      fontSize: "0.875rem",
                      color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                      background: active
                        ? "linear-gradient(120deg, rgba(90,162,255,0.28) 0%, rgba(255,154,90,0.22) 100%)"
                        : "rgba(255,255,255,0.03)",
                      border: active ? "1px solid rgba(255,175,130,0.45)" : "1px solid rgba(255,255,255,0.12)",
                      transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="inline-flex items-center justify-center rounded-full font-medium"
                style={{
                  width: "2.375rem",
                  height: "2.375rem",
                  fontSize: "0.875rem",
                  color: currentPage === totalPages ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: currentPage === totalPages ? "default" : "pointer",
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

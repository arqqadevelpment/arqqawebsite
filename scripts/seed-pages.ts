// One-off / re-runnable script: reads every content data file and upserts one
// row per real page into the Supabase `pages` table, so the dashboard's Pages
// tree always mirrors what's actually live on the site.
//
//   node --experimental-strip-types --env-file=.env.local scripts/seed-pages.ts
//
// Safe to re-run: upserts on `path`, so it stays in sync as content is added.
// Uses the service_role key (server-side only).

import { createClient } from "@supabase/supabase-js";

import { ARTICLES } from "../components/insights/insights-data.ts";
import { JOBS } from "../components/career/career-data.ts";
import { SERVICES } from "../components/services/service-data.ts";
import { APPROACH_PAGES } from "../components/services/approach-pages-data.ts";
import { PERFORMANCE_CASE_STUDIES } from "../components/case-studies/case-study-data.ts";
import { INDUSTRIES } from "../components/industries/industries-data.ts";
import { BRANDING_PROJECTS } from "../components/branding/branding-data.ts";
import { SOCIAL_PROJECTS } from "../components/social/social-data.ts";
import { VIDEO_PROJECTS } from "../components/videos/video-data.ts";
import { CASE_STUDIES as PORTFOLIO_CASE_STUDIES } from "../components/portfolio/portfolio-data.ts";
import { SHOWCASE_PROJECTS } from "../components/showcase/showcase-data.ts";

type PageRow = {
  path: string;
  parent_path: string | null;
  title: string;
  page_type: string;
};

const STATIC_PAGES: PageRow[] = [
  { path: "/", parent_path: null, title: "Home", page_type: "static" },
  { path: "/about", parent_path: null, title: "About", page_type: "static" },
  { path: "/autonomous", parent_path: null, title: "Autonomous", page_type: "static" },
  { path: "/catalyst-system", parent_path: null, title: "The Catalyst System", page_type: "static" },
  { path: "/get-started", parent_path: null, title: "Get Started", page_type: "static" },
  { path: "/start", parent_path: null, title: "Start / Contact", page_type: "static" },
  { path: "/testimonials", parent_path: null, title: "Testimonials", page_type: "static" },
  { path: "/work", parent_path: null, title: "Work", page_type: "static" },
  { path: "/career", parent_path: null, title: "Career", page_type: "static" },
  { path: "/industries", parent_path: null, title: "Industries", page_type: "static" },
  { path: "/insights", parent_path: null, title: "Insights", page_type: "static" },
  { path: "/services", parent_path: null, title: "Services", page_type: "static" },
  { path: "/services/performance-marketing", parent_path: "/services", title: "Performance Marketing", page_type: "static" },
];

const rows: PageRow[] = [
  ...STATIC_PAGES,

  ...ARTICLES.map((a) => ({
    path: `/insights/${a.slug}`,
    parent_path: "/insights",
    title: a.title,
    page_type: "article",
  })),

  ...JOBS.map((j) => ({
    path: `/career/${j.slug}`,
    parent_path: "/career",
    title: j.title,
    page_type: "job",
  })),

  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    parent_path: "/services",
    title: s.title,
    page_type: "service",
  })),

  ...APPROACH_PAGES.map((p) => ({
    path: `/services/${p.parentSlug}/${p.slug}`,
    parent_path: `/services/${p.parentSlug}`,
    title: p.title,
    page_type: "service-approach",
  })),

  ...PERFORMANCE_CASE_STUDIES.map((c) => ({
    path: `/case-studies/${c.slug}`,
    parent_path: "/case-studies",
    title: c.client,
    page_type: "case-study",
  })),

  ...INDUSTRIES.map((i) => ({
    path: `/industries/${i.slug}`,
    parent_path: "/industries",
    title: i.name,
    page_type: "industry",
  })),

  ...BRANDING_PROJECTS.map((b) => ({
    path: `/branding/${b.slug}`,
    parent_path: "/branding",
    title: b.title,
    page_type: "branding",
  })),

  ...SOCIAL_PROJECTS.map((s) => ({
    path: `/social/${s.slug}`,
    parent_path: "/social",
    title: s.title,
    page_type: "social",
  })),

  ...VIDEO_PROJECTS.map((v) => ({
    path: `/videos/${v.slug}`,
    parent_path: "/videos",
    title: v.title,
    page_type: "video",
  })),

  ...PORTFOLIO_CASE_STUDIES.map((c) => ({
    path: `/work/${c.slug}`,
    parent_path: "/work",
    title: c.client,
    page_type: "case-study",
  })),

  ...SHOWCASE_PROJECTS.map((p) => ({
    path: `/our-work/${p.slug}`,
    parent_path: "/our-work",
    title: p.title,
    page_type: "case-study",
  })),
];

const seen = new Set<string>();
const deduped = rows.filter((r) => {
  if (seen.has(r.path)) {
    console.warn(`Skipping duplicate path: ${r.path}`);
    return false;
  }
  seen.add(r.path);
  return true;
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const BATCH_SIZE = 200;
let inserted = 0;

for (let i = 0; i < deduped.length; i += BATCH_SIZE) {
  const batch = deduped.slice(i, i + BATCH_SIZE);
  const { error } = await supabase.from("pages").upsert(batch, { onConflict: "path" });

  if (error) {
    console.error("Upsert failed:", error.message);
    process.exit(1);
  }

  inserted += batch.length;
}

console.log(`Seeded ${inserted} pages (${deduped.length} unique paths, ${rows.length - deduped.length} duplicates skipped).`);

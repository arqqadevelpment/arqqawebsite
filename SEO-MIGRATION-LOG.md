# SEO Migration Log — arqqa.net → New Site

hi

A running record of everything done to migrate SEO signals from the old WordPress
site (`arqqa.net`) to the new Next.js site, from the start of this effort. Kept as
a reference so decisions and their reasoning aren't lost between sessions.

---

## 0. Blog / Insights Migration (2026-09-09)

The client's report explicitly excluded article URLs from its migration
review ("Article URLs are excluded from the page-level migration metadata
review"), so this was done separately. Crawled all 12 pages of the old
`arqqa.net/blogs/` listing (67 posts, scattered across inconsistent old
category prefixes — `/social-media-management/`, `/blogs/ai/`, `/blogs/seo/`,
`/uncategorized/`, `/programming/`, etc.) and compared each post's slug
against the 67 articles under the new site's `/insights/`.

**Result: 100% match.** Every single old post's slug matches a new `/insights/`
article's slug exactly — only the category prefix differs. Added 68 redirects
(all 67 posts + `/blogs/` itself → `/insights`) to the `redirects` table,
verified live on `arqqa-dash.vercel.app`. No article was left unmapped.

### 0.1 Added category to the new-site article URL (2026-09-09)

Client asked for `/insights/<slug>` to become `/insights/<category>/<slug>`
— and specifically chose the real route-restructure over a `custom_path`
alias per article, since every *new* article added later needs the right
URL automatically, without a manual per-article step. See Section 6 for the
implementation.

---

## 1. URL Migration (Old Site → New Site)

### 1.1 Redirects (via the `redirects` table / Redirects dashboard tab)

22 old URLs were mapped to their closest new-site equivalent as 301 redirects,
enforced in `middleware.ts`:

| Old URL | New URL |
|---|---|
| `/who-we-are/` | `/about` |
| `/what-we-do/` | `/services` |
| `/what-we-do/website-development/` | `/services/technology/website` |
| `/career/` | `/career` |
| `/branding/` | `/services/asset-building` |
| `/consultancy/` | `/services/strategy-consulting` |
| `/digital-strategy/` | `/services/strategy-consulting` |
| `/content-main-page/` | `/services/community-management` |
| `/social-media-managment/` | `/services/community-management` |
| `/creative-concept-development/` | `/services/asset-building/branding` |
| `/growth-marketing/` | `/services/performance-marketing` |
| `/performance-main-page/` | `/services/performance-marketing` |
| `/performance-marketing/` | `/services/performance-marketing` |
| `/mobile-app-ui-ux/` | `/services/technology/mobile-apps` |
| `/mobile-development/` | `/services/technology/mobile-apps` |
| `/motion-graphics/` | `/services/video-production/motion-graphics` |
| `/video-production/` | `/services/video-production` |
| `/website-ui-ux/` | `/services/technology/ux-design` |
| `/technology-main-page/` | `/services/technology` |
| `/start-a-project/` | `/get-started` |
| `/works/` | `/works` |
| `/contact/` | `/contact` |

### 1.2 Direct URL renames (via the dashboard's URL editor / `custom_path`)

Two pages got their **new-site URL changed directly** (no redirect hop — the new
URL renders immediately via a middleware `rewrite()`, and the old URL still 301s
via an auto-inserted `redirects` row):

- `/work` → `/works`
- `/start` → `/contact`

### 1.3 Deferred — left untouched, no redirect or page yet

Per explicit instruction, these 9 old URLs are **not** mapped yet — pending a
decision on where (or whether) they should point:

```
/consultancy-main-page/
/content-marketing/
/what-we-do/search-engine-optimization/
/content-strategy/
/aman/
/website-offer/
/website-offer-sa/
/performance-offer/
/performance-offer-sa/
```

### 1.4 Bug found & fixed (2026-09-09)

Verifying the 22 redirects live on Vercel revealed they weren't firing at all:

- **Root cause:** Next.js strips a trailing slash from the incoming pathname
  before `middleware.ts` ever sees it, but the `redirects.source_path` values
  (and `pages.custom_path` values) were stored *with* a trailing slash, so the
  lookup map never matched.
- **Second bug surfaced by the fix:** normalizing both sides turned 3 rows
  (`/career/`→`/career`, `/contact/`→`/contact`, `/works/`→`/works`) into
  self-redirects — infinite redirect loops (`ERR_TOO_MANY_REDIRECTS`).
- **Fix:** `middleware.ts` now normalizes trailing slashes on both the incoming
  pathname and the DB values before matching, and skips any redirect whose
  normalized destination equals the normalized source.
- Also fixed: `/start`'s fallback SEO title still said "Start | ARQQA" even
  though its public URL is now `/contact` — updated to "Contact | ARQQA".
- Verified all 22 redirects + both URL renames live on `arqqa-dash.vercel.app`
  after deploy — all resolve correctly.

---

## 2. Structured Data / Schema

- `Organization` + `WebSite` JSON-LD injected site-wide in `app/layout.tsx`.
- Per-page `BreadcrumbList` (auto-built from `pages.parent_path`) and a
  type-specific schema (`Article`, `JobPosting`, `Service`, `CreativeWork`)
  rendered by `components/seo/PageSchema.tsx`, based on each page's `page_type`.
- Dashboard lets an admin add extra custom schema blocks per page
  (`page_schemas` table + Schema manager on the page detail view).
- **Google Rich Results fix:** Article/Organization/CreativeWork `image`/`logo`
  fields were relative paths — Google flagged them as warnings. Added a
  `toAbsoluteUrl()` helper and a fallback image chain
  (`og_image → default_share_image → org_logo_url`), and added a top-level
  `url` field to the Article schema.

---

## 3. SEO Metadata — Title & Description Plan

Based on `ARQQA_Final_SEO_Migration_Report_EN_v3.html` (client-supplied SEO
migration report), Section 2.5 ("Current SEO Metadata Baseline") classifies
every old non-article URL as one of:

- **Keep** — old title/description were already good, reuse as-is.
- **Improve** — old title/description were weak/auto-generated/truncated,
  needs a rewrite.
- **Fix before launch** — H1/canonical were missing entirely.

### 3.1 "Keep" pages (9)

`/`, `/contact/`, `/who-we-are/`, `/what-we-do/`, `/what-we-do/website-development/`,
`/what-we-do/search-engine-optimization/` *(still deferred — no live page yet)*,
`/career/`, `/branding/`, `/works/`

The client asked for the exact old title (and a completed version of the old
description, where the report's own preview text was truncated with "...") to
be applied to the new live pages too — not just left alone. Applied via
`seo_meta`, keyed by the page's real underlying `path` (not its public
`custom_path` alias — `seo_meta.page_path` has an FK to `pages.path`):

| Old URL | Real `pages.path` | Public URL | SEO Title applied |
|---|---|---|---|
| `/contact/` | `/start` | `/contact` | Contact Us \| ARQQA Digital |
| `/who-we-are/` | `/about` | `/about` | About ARQQA – Digital Marketing |
| `/what-we-do/` | `/services` | `/services` | What We Do \| ARQQA Digital |
| `/career/` | `/career` | `/career` | Careers \| ARQQA Digital |
| `/works/` | `/work` | `/works` | Our Work \| ARQQA Digital |

**Left as the Section 2.2-optimized version, not the raw old one** — these 3
pages appear in *both* the "Keep" list and the report's own on-page keyword
recommendations (2.2), and the 2.2 version is the report's more polished take
on the same page:

- `/` (Homepage)
- `/what-we-do/website-development/` → `/services/technology/website`
- `/branding/` → `/services/asset-building`

`/what-we-do/search-engine-optimization/` skipped — still deferred, no live
page yet.

---

## 4. Full SEO Audit (2026-09-09)

Cross-checked every page in `pages` against the report and the Section 1
technical checklist:

- **Title/description:** all 18 pages set so far match the report/plan above.
  Every other page (career listings, case studies, videos, social, industries,
  67 insights articles) has no `seo_meta` override — checked each dynamic
  route's own `generateMetadata()` and confirmed they build a real title from
  the item's own data, not a placeholder. No action needed there.
- **Canonical tags, robots.txt, sitemap, Organization/Breadcrumb/Article
  schema, Open Graph/Twitter Cards, 301 redirects:** all already implemented
  and verified working.
- **Homepage single H1:** verified — exactly one `<h1>` across every homepage
  section component. The report's flagged issue doesn't exist in this build.
- **Security headers:** were missing entirely — added `Referrer-Policy`,
  `X-Frame-Options`, `X-Content-Type-Options` in `next.config.ts`. No CSP
  added: the Marketing tab lets an admin paste arbitrary `<script>` snippets
  straight into `<head>`/`<body>` by design, so a CSP strict enough to matter
  would break that same feature.
- **Still open:** HTTPS/preferred-host enforcement (Vercel domain-level,
  can't verify until `arqqa.net`'s DNS points at Vercel) and an image
  alt-text/dimensions audit (not started).

---

## 5. Seeding `seo_meta` for Finite Static Pages (2026-09-09)

Every page without a `seo_meta` row was already rendering a real, hand-written
title/description from its own route code — never blank. Client asked to also
copy those into `seo_meta` so they become dashboard-editable, **but only for
pages whose count doesn't grow** (skipped all content-driven pages — jobs,
case studies, videos, social, industries, articles, branding portfolio —
since their titles come from the item's own data and a new item added later
would need a matching `seo_meta` row created manually, breaking that
self-maintaining behavior for no benefit).

Seeded 23 rows with the exact text already live in code, verbatim — no
wording changed, just made editable going forward:

`/catalyst-system`, `/autonomous`, `/testimonials`, `/insights`,
`/services/autonomous`, `/services/catalyst-system`, and 17 service
sub-pages under `strategy-consulting`, `asset-building`, `technology`,
`community-management`, `video-production` (excluding `.../branding` and
`.../motion-graphics`, which already had a `seo_meta` row from Section 3).

### 3.2 "Improve" pages — new title/description to be written

**From the report's own Section 2.2 keyword targeting (7 pages, using its exact
recommended title/description):**

| Page (new path) | SEO Title |
|---|---|
| `/` | Digital Marketing Agency in Egypt \| ARQQA |
| `/services/technology/website` | Web Development Agency in Egypt \| ARQQA |
| `/services/asset-building` | Branding Agency in Egypt \| ARQQA |
| `/services/community-management` | Social Media Agency in Egypt \| ARQQA |
| `/services/technology/mobile-apps` | Mobile App Development Company in Egypt \| ARQQA |
| `/services/performance-marketing` | Performance Marketing Agency in Egypt \| ARQQA |
| `/services/video-production` | Video Production Company in Egypt \| ARQQA |

**Additional pages the report didn't give an explicit keyword target for, but
that are live and need a real (non-placeholder) title/description (6 pages):**

| Page (new path) | Draft SEO Title |
|---|---|
| `/services/technology/ux-design` | UI/UX Design Agency in Egypt \| ARQQA |
| `/get-started` | Start a Project \| ARQQA |
| `/services/technology` | Web & App Development Technology Partner \| ARQQA |
| `/services/asset-building/branding` | Brand Identity & Creative Concept Development \| ARQQA |
| `/services/video-production/motion-graphics` | Motion Graphics & Animation Services \| ARQQA |
| `/services/strategy-consulting` | Marketing Strategy & Digital Consulting \| ARQQA |

**Status: applied to `seo_meta` on 2026-09-09 (all 13 rows).**

### 3.3 Open decision — Content Marketing

The report treats `/content-marketing/` as its own page to improve, but the new
site's IA merged that content into `/services/community-management` — the same
page targeted by "Social Media" (much stronger keyword numbers: Volume 400 /
Traffic Potential 800 vs. 80 / 60). Two options, still undecided:

- **(a)** Build a standalone Content Marketing service page, or
- **(b)** Confirm the merge — `/services/community-management` keeps the
  Social Media title/description as primary, with content-marketing terms
  woven into body copy only.

---

## 4. Report Reference

Source: `ARQQA_Final_SEO_Migration_Report_EN_v3.html` (client-supplied).
Covers: technical SEO checklist, schema requirements, keyword research/content
plan, current metadata baseline for non-article pages, and a pre-launch
checklist. Article-page URLs were explicitly excluded from that report's
page-level metadata review.

---

## 6. Insights Article URL Restructure (2026-09-09)

Changed every article's public URL from `/insights/<slug>` to
`/insights/<category>/<slug>` — a real route change, not an alias, so any
article added in the future automatically gets the right URL with zero
manual step (every article already carries a `category` field).

**Code changes:**
- `app/insights/[slug]/page.tsx` → `app/insights/[category]/[slug]/page.tsx`,
  with a guard that 404s if the category segment doesn't match the article's
  real category (prevents the same article being reachable at two valid URLs)
- `categorySlug()` / `getArticleUrl()` helpers added to `insights-data.ts`,
  used by every internal link builder: the `/insights` listing cards
  (`InsightsPageContent.tsx`), the related-articles widget
  (`ArticleTemplate.tsx`), and the insights callout on the Website
  Development service page (`WebsiteDevPageContent.tsx`)
- `scripts/seed-pages.ts` updated so re-seeding keeps producing the new
  path shape for any new article

**Data changes:**
- `pages.path` and the one existing `seo_meta.page_path` override updated
  for all 67 existing articles to the new category-prefixed path
- The 67 old-blog → `/insights/<slug>` redirect rows (Section 0) updated to
  point straight at `/insights/<category>/<slug>` — avoids a double hop
- Added 67 safety redirects from the brief flat `/insights/<slug>` URL,
  in case it was hit during the short window it was live before this change

Verified locally: new URLs render directly, the old flat URL 301s to the
new one, a mismatched category 404s, and `sitemap.xml` reflects the new
paths.

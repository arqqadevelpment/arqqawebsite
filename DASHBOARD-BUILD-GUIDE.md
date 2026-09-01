# Building a Dashboard/CMS System — Next.js Version

Adapted from the original "SBS project" guide (Vite + React Router + Supabase) to match
**this project's actual stack: Next.js 16 (App Router) + TypeScript + Supabase**.

Same 7 phases, same order, same philosophy — one phase at a time, test before moving on,
build/type-check after each phase. The prompts below are rewritten for Next.js conventions
(`app/` routing, Server Components, Server Actions, `middleware.ts`, `NEXT_PUBLIC_*` env vars)
instead of the original's Vite/React Router assumptions.

Phases 1, 2, 5, 6 and 7 follow the original closely. **Phases 3 and 4 are rebuilt around this
site's actual content shape** rather than the original's generic page-builder model — the table
below says why in one line, and Phase 3 explains it properly.

**Do the phases in order.** Each depends on the previous.

## What's different from the original guide (and why)

| Original (Vite/React Router) | This version (Next.js) | Why |
|---|---|---|
| `VITE_SUPABASE_URL` in `.env` | `NEXT_PUBLIC_SUPABASE_URL` in `.env.local` | Next.js's env var convention |
| `src/integrations/supabase/client.ts` | `lib/supabase/client.ts` + `lib/supabase/server.ts` | Next.js needs a browser client *and* a server client (cookies-based) — `@supabase/ssr` |
| Client-side redirect if no session | `middleware.ts` redirect | Runs on the server before the page even renders — faster, no flash of protected content |
| React Router routes | `app/dashboard/...` folder routes | Next.js App Router convention |
| Custom `scripts/generate-sitemap.ts` + prebuild hook | `app/sitemap.ts` + `app/robots.ts` | Next.js has this built in natively — no build script needed |
| Manual `<meta>` tag injection | `generateMetadata()` per page | Next.js's native Metadata API |
| Phase 7: static Apache/cPanel export | Phase 7: Vercel deploy checklist | You're already deployed on Vercel — no static export needed, and static export would break Server Actions/middleware used in Phases 1, 2, 4 |
| Phases 3–4: generic `pages` + `page_sections` blob model, starting with `FactsSection` | Phases 3–4: one typed table per content type, starting with **articles** | This site has 8 distinct content types with real fields (category, date, location, result figures), not interchangeable blocks. Flattening them into `jsonb` throws away every filter and sort as a SQL query. And the 67 articles — not the homepage stat strip — are the content that actually needs editing. See Phase 3 for the full reasoning. |

---

## Before You Start

- This project already has Next.js 16 + TypeScript + Tailwind set up — nothing to scaffold.
- A free Supabase account/project at supabase.com (backend: database, auth, file storage — no server to manage).
- Your Supabase Project URL and anon/publishable key: Supabase dashboard → Settings → API.
  These are safe to expose in frontend code once prefixed `NEXT_PUBLIC_`.

---

## Phase 1 — Authentication, Roles & Row Level Security

The foundation everything else sits on: who can log in, and what they're allowed to see or change.

```
Set up Supabase authentication in this Next.js (App Router) project. Do the following:

1. Install @supabase/supabase-js and @supabase/ssr.
2. Create lib/supabase/client.ts exporting a createClient() that returns a
   browser Supabase client (createBrowserClient from @supabase/ssr), for use
   in Client Components.
3. Create lib/supabase/server.ts exporting an async createClient() that
   returns a server Supabase client (createServerClient from @supabase/ssr,
   wired to the Next.js `cookies()` API from next/headers), for use in
   Server Components, Route Handlers, and Server Actions.
4. Create a .env.local file with placeholders for NEXT_PUBLIC_SUPABASE_URL
   and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, and tell me exactly where to
   find both values in my Supabase dashboard.
5. Create a SQL migration that adds a user_roles table with columns
   (user_id uuid references auth.users, role text), with a unique
   constraint on (user_id, role).
6. Enable Row Level Security on user_roles. Add a policy so a user can
   read their own role row, and only existing admins can insert, update,
   or delete role rows (use a SECURITY DEFINER function to check for the
   admin role, to avoid infinite recursion in the policy).
7. Create middleware.ts at the project root that checks for an active
   Supabase session on any request to /dashboard/*, and redirects to
   /dashboard/login if there isn't one. Use the @supabase/ssr middleware
   helper pattern so the session cookie refreshes correctly.
8. Create a React hook hooks/useUserRole.ts (Client Component hook) that
   fetches the current logged-in user's role from user_roles using the
   browser client.
9. Create app/dashboard/login/page.tsx — a simple Client Component login
   form using supabase.auth.signInWithPassword, and a signOut() helper.

Show me the final file list, and list any manual steps I need to do in
the Supabase dashboard (like enabling email/password sign-in).
```

## Phase 2 — Dashboard Shell & Role Gating

The private area of the app: layout, protected routes, and a reusable way to hide admin-only
sections from lower-privilege users.

```
Build a protected dashboard shell for this Next.js app:

1. Create app/dashboard/layout.tsx as a Server Component that renders a
   DashboardLayout: a sidebar (Home, Articles, Media, Settings, Users) built
   with next/link, and a top bar. Fetch the logged-in user's email
   server-side (using lib/supabase/server.ts) and pass it down, plus a
   sign-out button (a small Client Component that calls supabase.auth.signOut()
   and router.push('/dashboard/login') from next/navigation).
2. Build components/dashboard/RoleGate.tsx — a Client Component that takes
   a list of allowed roles as a prop, and either renders its children or
   an "Access restricted" message, based on the useUserRole() hook from
   Phase 1.
3. Create app/dashboard/settings/page.tsx and app/dashboard/users/page.tsx,
   each wrapped in RoleGate so only the 'admin' role can access them.
4. Confirm middleware.ts from Phase 1 already covers all of /dashboard/*,
   including these new routes, without needing route-by-route changes.

Keep the UI plain and unstyled for now — I only want the logic and
routing structure working correctly before we style anything.
```

## Phase 3 — The Article Model (start with the content that actually changes)

### Why this phase looks different from the original guide

The original version of this phase built a **generic page builder**: two tables, `pages` and
`page_sections`, where every editable section on the site is a `jsonb` blob keyed by section name.
That model suits a site whose pages are assembled from interchangeable blocks. **This site isn't
that.**

This site has **8 distinct content types**, each with its own real shape:

| Content type | Route | Count | Current data file |
|---|---|---|---|
| **Articles** | `/insights/[slug]` | **67** | `components/insights/insights-data.ts` (2,565 lines) |
| Service approach pages | `/services/[slug]/[subslug]` | 22 | `components/services/approach-pages-data.ts` |
| Jobs | `/career/[slug]` | 10 | `components/career/career-data.ts` |
| Services | `/services/[slug]` | 7 | `components/services/service-data.ts` |
| Performance case studies | `/case-studies/[slug]` | 7 | `components/case-studies/case-study-data.ts` |
| Industries | `/industries/[slug]` | 5 | `components/industries/industries-data.ts` |
| Portfolio | `/work/[slug]` | 4 | `components/portfolio/portfolio-data.ts` |
| Showcase | `/our-work/[slug]` | 4 | `components/showcase/showcase-data.ts` |

An article has a category, a date, a reading time. A job has a location and an employment type.
A case study has result figures. Flattening all of that into `page_sections.data` throws away
every one of those fields as a queryable column — you could no longer ask the database for
"published Brand Development articles, newest first" without pulling every row and filtering in
JavaScript. With 67 articles that is merely wasteful; it gets worse as the blog grows.

So: **real columns for the fields you filter, sort, or search by. `jsonb` only for the genuinely
nested parts** (an article's body blocks, an author byline). That is the best of both — SQL where
SQL helps, JSON where the shape is irregular.

### Why articles first

The original guide started with `FactsSection` (the homepage stat strip) because it is the
simplest thing to wire up. It is — but it is also content that changes roughly once a year.
The **67 articles** are the reason to build a dashboard at all: they are the thing someone needs
to add to weekly, and they currently live in a 2,565-line TypeScript file that only a developer
can edit.

Build the type that hurts. Once articles work end to end, the same pattern copies to the other
seven in an afternoon each.

```
I want to move this site's articles out of code and into Supabase, as a
properly typed table — not a generic page-builder blob. Please:

1. Read components/insights/insights-data.ts first and match the existing
   `Article` and `ArticleBlock` types exactly. Do not invent fields.

2. Create a SQL migration with an `articles` table. Real columns for
   everything the site filters, sorts, or displays in a list; jsonb only
   for the nested parts:
   - id           uuid primary key default gen_random_uuid()
   - slug         text unique not null
   - title        text not null
   - category     text not null      -- matches the Category union
   - accent       text not null default 'blue'   -- 'blue' | 'orange'
   - published_at timestamptz        -- replaces the current `date` string
   - reading_time text               -- e.g. "8 min read"
   - excerpt      text not null
   - image        text               -- path under /public/insights, nullable
   - body         jsonb not null default '[]'    -- ArticleBlock[]
   - author       jsonb              -- { name, role, href?, bio? }, nullable
   - related      text[] default '{}' -- slugs of related articles
   - status       text not null default 'draft'  -- 'draft' | 'published'
   - created_at   timestamptz default now()
   - updated_at   timestamptz default now()

   Add indexes on (status, published_at desc) and on (category), because
   the /insights hub lists by recency and filters by category.

   Add a CHECK constraint on status, and a trigger that keeps updated_at
   current on UPDATE.

3. Add RLS on `articles`:
   - anonymous + authenticated can SELECT only where status = 'published'
   - only users whose role is 'admin' or 'editor' (via the SECURITY
     DEFINER role-check function from Phase 1) can INSERT, UPDATE, DELETE
   Confirm explicitly that an anonymous visitor cannot read a draft.

4. Write a one-off migration script that reads the ARTICLES array from
   components/insights/insights-data.ts and inserts all 67 rows into the
   table, converting the `date` string (e.g. "August 19, 2026") into a
   real timestamptz, and setting status = 'published' for all of them.
   Make the script idempotent — safe to re-run without duplicating rows
   (upsert on slug). Tell me exactly how to run it.

5. Create lib/content/articles.ts with server-side query functions for
   use in Server Components (using lib/supabase/server.ts):
   - getPublishedArticles({ category?, limit?, offset? })
   - getArticleBySlug(slug)
   - getAllArticleSlugs()   -- for generateStaticParams()
   Each returns data already shaped like the existing `Article` type, so
   the components consuming it do not need to change.

6. Do NOT rewire the pages yet. Phase 3 ends when the table exists, the
   67 rows are in it, RLS is proven, and the query functions return the
   right data. I want to verify that before any page depends on it.

When you're done, show me: the migration SQL, the RLS policies, and the
output of getPublishedArticles({ category: 'Brand Development' }) so I
can see real rows coming back.
```

> **A note on `generateStaticParams` and rebuilds.** Today all 67 article pages are prerendered
> at build time. Once articles come from Supabase you have a choice to make, and it is worth
> making deliberately: keep `generateStaticParams()` (fastest pages, but publishing an article
> requires a redeploy), or add `export const revalidate = 60` for ISR (pages refresh themselves
> within a minute of publishing, no redeploy). **ISR is almost certainly what you want for a
> blog** — it is the difference between a dashboard that publishes and a dashboard that only
> queues work for a developer. Ask for it explicitly in Phase 4.

### After articles work

Repeat the same shape for the other seven types, in this order — heaviest and most-edited first:

1. `service-data.ts` + `approach-pages-data.ts` (29 pages, one `services` table with a nullable
   `parent_slug` handles both levels)
2. `career-data.ts` (10 jobs — changes often, and non-developers want to post these)
3. `case-study-data.ts`, `portfolio-data.ts`, `showcase-data.ts` (15 pages — **see the note below
   before building three tables**)
4. `industries-data.ts` (5 pages — rarely changes, do it last)

> **Decide this before you write the SQL:** `/work`, `/our-work`, and `/case-studies` are three
> separate routes with three separate data files and three separate templates, but all three
> present client work. They may genuinely be three things — or one thing that got built three
> times. Open the three data files side by side and decide. If they merge, that is two fewer
> tables, two fewer dashboard screens, and one fewer place to forget to update.

The homepage sections (`FactsSection`, `TrustSection`, and friends) are the *last* thing to move,
not the first — and honestly, some of them should stay in code. `HeroSection.tsx`,
`CatalystSection.tsx`, and `ShiftSection.tsx` in particular are animation-driven and have no
business being database-backed; leave them alone.

## Phase 4 — The Article Editor: Draft/Publish, Revisions, Live Pages

The actual dashboard screens an editor will use day to day, plus safety nets (draft state,
revision history) so mistakes are recoverable — and the step that finally puts the database
in front of real visitors.

```
Build the article editor on top of the `articles` table from Phase 3:

1. app/dashboard/articles/page.tsx — a Server Component list view of all
   articles (drafts included) showing title, category, status, and
   published_at, with Edit/Delete actions and a "New Article" button.
   Add a category filter and a title search — both as SQL queries against
   the real columns, not client-side filtering of everything.

2. app/dashboard/articles/[id]/page.tsx — Server Component for the initial
   fetch, Client Component for the interactive editor. Typed fields for
   the real columns (title, slug, category as a <select> of the Category
   union, excerpt, reading_time, published_at, image, accent), plus:

3. A block editor for the `body` jsonb — an ordered list of ArticleBlock
   entries where I can add, delete, and reorder blocks, with the right
   input per block type:
     - p / h2 / quote  -> textarea
     - list            -> repeatable text inputs
     - link            -> text + href inputs
   Auto-generate a slug from the title on create, but let me override it,
   and warn me before changing the slug of an already-published article
   (it breaks the live URL and any inbound links).

4. For the `image` field and any media field, render a preview next to the
   URL input. IMPORTANT: detect video vs. image using a regex that allows
   a trailing query string after the file extension, e.g.
   /\.(mp4|webm|mov)(\?|$)/i — not a plain end-of-string match, because
   real signed storage URLs end in "?token=..." after the extension and a
   naive regex will silently treat every video as a broken image.

5. Implement Save Draft and Publish as Next.js Server Actions
   (app/dashboard/articles/actions.ts, "use server"). Save Draft writes
   the row with status='draft'; Publish sets status='published' and
   stamps published_at if it is empty. RLS already hides drafts from
   anonymous visitors — confirm that, don't just assume it.

6. Add a `revisions` table (id, entity_type, entity_id, snapshot jsonb,
   created_at) that stores a full row snapshot every time Publish is
   clicked, and a RevisionsPanel listing the last 10 with a "Restore"
   Server Action.

7. NOW rewire the public pages to read from Supabase, using the query
   functions from Phase 3:
   - app/insights/page.tsx          -> getPublishedArticles()
   - app/insights/[slug]/page.tsx   -> getArticleBySlug() +
                                       getAllArticleSlugs() in
                                       generateStaticParams()
   Add `export const revalidate = 60` to both so publishing an article
   goes live within a minute WITHOUT a redeploy. Explain the tradeoff you
   are making versus fully static rendering.
   Keep components/insights/insights-data.ts on disk for now as a
   reference and rollback path — delete it only once the live pages have
   been serving from the database for a while.

8. Verify end to end before telling me it's done: create a draft, confirm
   it is NOT visible at its public URL while logged out, publish it,
   confirm it appears on /insights within the revalidate window, then
   restore a revision and confirm the change lands.
```

> Once this works for articles, each remaining content type is a copy of the same three pieces:
> a table + RLS, a list screen, an editor screen. Resist the urge to build a clever abstraction
> over them until you have done it two or three times and can see what actually repeats.

## Phase 5 — Media Library

A place to upload and reuse images/videos across every editor, instead of pasting raw URLs.

```
Add a Media Library to the dashboard:

1. Create a Supabase Storage bucket called "media" (public read access).
2. Create a `media` table (id, file_name, file_url, file_type, file_size,
   folder text default 'root', uploaded_by, created_at).
3. Build app/dashboard/media/page.tsx: a folder list on the left
   (root + any custom folders), a grid of uploaded files on the right
   using next/image for real image thumbnails and a labeled placeholder
   tile for videos, a search box, a type filter (All / Images / Videos),
   and an upload button that uploads to Supabase Storage and inserts a
   row into `media`.
4. Add my Supabase project's storage domain to next.config.ts under
   images.remotePatterns so next/image can optimize these thumbnails.
5. Build components/dashboard/MediaPickerDialog.tsx — reusable inside any
   editor field to browse, select, or upload media and get back a public
   URL. Wire it into the "Choose" button next to any image/video field in
   the PageEditor from Phase 4.
```

## Phase 6 — SEO Layer

Search-engine basics, done the Next.js-native way.

```
Add SEO infrastructure using Next.js's built-in conventions:

1. A `site_settings` table (a single row) with site_url, default_title,
   default_description.
2. A `seo_meta` table keyed by (entity_type, entity_id) storing a
   title/description/canonical override per page or post.
3. Create app/sitemap.ts using Next.js's native MetadataRoute.Sitemap
   export — query published articles (and any other content tables
   that exist by then) server-side and return
   correct ABSOLUTE URLs built from site_settings.site_url. This replaces
   any need for a manual build script; Next.js serves it at /sitemap.xml
   automatically.
4. Create app/robots.ts using Next.js's native MetadataRoute.Robots
   export — disallow /dashboard, and point to the sitemap using the site's
   real absolute URL from site_settings.
5. For each public page that should support per-page SEO overrides, use
   Next.js's generateMetadata() function to read from seo_meta (falling
   back to site_settings defaults) instead of hand-writing <meta> tags.
6. A SeoEditor dashboard component so an admin can override any page's
   title/description without touching code.

Explain what I need to do after I change the domain in site_settings —
confirm app/sitemap.ts and app/robots.ts pick it up automatically on the
next request/build, with no separate script to re-run.
```

## Phase 7 — Deploy (Vercel)

This project is already running on Vercel — no static export needed, and static export would
break the middleware (Phase 1) and Server Actions (Phase 4) this dashboard depends on.

```
Prepare this dashboard for production on Vercel:

1. Confirm NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   are documented as required Vercel Project → Settings → Environment
   Variables (not committed to git — confirm .env.local is in .gitignore).
2. Run `npm run build` locally and confirm it completes with zero errors,
   including the new /dashboard routes and middleware.
3. Write a short DEPLOYMENT.md covering: required env vars, the Supabase
   dashboard steps needed before first login (enabling email/password
   auth, creating the first admin user_roles row manually via SQL editor
   since no signup UI exists yet), and a post-deploy checklist —
   homepage loads, /dashboard/login works, an unauthenticated visit to
   /dashboard redirects correctly, a real admin can log in and reach
   /dashboard/articles, sitemap.xml and robots.txt are live and correct.

Run the build yourself and confirm zero errors before telling me it's
done. If it fails, fix the root cause, don't just tell me to install
something extra.
```

---

## Tips (same as the original guide — still true here)

- One phase per message to your AI assistant. Wait, test, verify before the next.
- Ask it to run `npm run build` (not just dev mode) after each phase — Next.js's production
  build catches things dev mode silently allows.
- Before going live: ask specifically **"audit this for security issues before I go live"** —
  Row Level Security mistakes are the most common and most costly to catch late.
- Keep a disposable/test admin account for testing dashboard features.
- If something looks like it didn't save, check the Supabase table directly (Table Editor) —
  many "it's not showing" bugs are stale client-side cache, not failed writes.

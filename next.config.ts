import type { NextConfig } from "next";

/**
 * Configured for a STATIC EXPORT, so the site can be served by Apache on
 * cPanel — which has no Node runtime.
 *
 * `npm run build` writes a self-contained `out/` folder of plain HTML, CSS,
 * JS and assets. Upload the CONTENTS of `out/` into `public_html`.
 *
 * What this mode costs, and what to change if you later move to a Node host
 * (Vercel, or a VPS running `next start`):
 *
 *   - `images.unoptimized` is forced on. The on-demand optimiser needs a
 *     server, so images ship at their source size. They are already WebP and
 *     were compressed hard (172MB -> 17MB), so this is far less costly here
 *     than it would normally be — but it does drop the automatic AVIF
 *     conversion and per-breakpoint resizing.
 *   - Server Actions, middleware.ts, route handlers and ISR/`revalidate` do
 *     not run at all. The Supabase dashboard planned in
 *     DASHBOARD-BUILD-GUIDE.md needs all four, so that work cannot ship on
 *     cPanel — it needs a Node host.
 *
 * To go back to a Node host: delete `output`, `trailingSlash` and
 * `images.unoptimized`, and restore the `formats` / `minimumCacheTTL` lines
 * kept below.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Emits `about/index.html` rather than `about.html`, which Apache serves at
  // /about/ with no rewrite rules. Without this, cPanel returns 404 for every
  // route except the homepage unless MultiViews is enabled.
  trailingSlash: true,

  images: {
    // Required by `output: "export"` — there is no server to optimise on.
    unoptimized: true,

    // Kept for the Node-host path; ignored while exporting statically.
    // formats: ["image/avif", "image/webp"],
    // minimumCacheTTL: 31536000,
  },
};

export default nextConfig;

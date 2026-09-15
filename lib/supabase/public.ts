import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * A plain Supabase client for public, unauthenticated reads (site_settings,
 * pages, seo_meta, page_schemas) — the same data every visitor sees.
 *
 * Unlike `lib/supabase/server.ts`, this never touches `cookies()`. Calling
 * `cookies()` anywhere in a route's render path forces Next.js to opt that
 * whole route out of static rendering, even when the query itself has
 * nothing to do with the visitor's session. Since `app/layout.tsx` and every
 * route's `generateMetadata()`/`<PageSchema>` used to go through the
 * cookie-bound client purely to read public settings, every single page —
 * including ~150 pages whose content is otherwise fully static — was forced
 * dynamic (server-rendered fresh on every request, a live DB round-trip
 * each time, no CDN caching). This client fixes that: use it for any read
 * that doesn't depend on who's asking.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

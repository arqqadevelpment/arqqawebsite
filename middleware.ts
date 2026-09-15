import { createServerClient } from "@supabase/ssr";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

// Next.js strips a trailing slash from the incoming pathname before
// middleware ever sees it (default `trailingSlash: false`), but rows saved
// via the dashboard (or migrated from the old WordPress-style site) often
// still carry one — normalize both sides so "/foo/" and "/foo" are the same
// lookup key. "/" itself is left alone.
function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

type CachedRedirect = { destination_path: string; status_code: number };

let redirectCache: Map<string, CachedRedirect> | null = null;
let redirectCacheAt = 0;
const REDIRECT_CACHE_MS = 60_000;

async function getRedirects(): Promise<Map<string, CachedRedirect>> {
  const now = Date.now();
  if (redirectCache && now - redirectCacheAt < REDIRECT_CACHE_MS) {
    return redirectCache;
  }

  // Anon key is enough — "anyone can read active redirects" RLS policy allows it.
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data } = await supabase
    .from("redirects")
    .select("source_path, destination_path, status_code")
    .eq("is_active", true);

  const map = new Map<string, CachedRedirect>();
  for (const row of data ?? []) {
    map.set(normalizePath(row.source_path), { destination_path: row.destination_path, status_code: row.status_code });
  }

  redirectCache = map;
  redirectCacheAt = now;
  return map;
}

// Pages with a dashboard-set custom_path: the custom_path is the page's new
// public URL, aliased via rewrite() to the real underlying route — the old
// path itself is handled by a normal row in the `redirects` table (inserted
// when the custom_path is saved), not here.
let aliasCache: Map<string, string> | null = null;
let aliasCacheAt = 0;
const ALIAS_CACHE_MS = 60_000;

async function getPageAliases(): Promise<Map<string, string>> {
  const now = Date.now();
  if (aliasCache && now - aliasCacheAt < ALIAS_CACHE_MS) {
    return aliasCache;
  }

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data } = await supabase.from("pages").select("path, custom_path").not("custom_path", "is", null);

  const map = new Map<string, string>();
  for (const row of data ?? []) {
    if (row.custom_path) map.set(normalizePath(row.custom_path), row.path);
  }

  aliasCache = map;
  aliasCacheAt = now;
  return map;
}

// Hides /login and /dashboard from anyone who hasn't first hit this secret
// path — bots/scanners probing for a WordPress-style /login never see it
// exists, they just get the normal 404. Visiting it once sets a long-lived
// cookie that unlocks the real login flow below.
//
// The cookie's VALUE is the actual secret here, not just its presence — it's
// compared against DASH_UNLOCK_SECRET (a long random string, set in
// .env.local / the host's env vars, never committed). A fixed value like the
// literal "1" this used to be would let anyone set it themselves from
// devtools and skip needing to know UNLOCK_PATH at all. If the env var is
// missing, unlocking is disabled entirely (fail closed) rather than falling
// back to a guessable default.
const UNLOCK_PATH = "/magic-dash";
const UNLOCK_COOKIE = "dash_unlock";
const UNLOCK_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const UNLOCK_SECRET = process.env.DASH_UNLOCK_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === UNLOCK_PATH && UNLOCK_SECRET) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set(UNLOCK_COOKIE, UNLOCK_SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: UNLOCK_COOKIE_MAX_AGE,
      path: "/",
    });
    return response;
  }

  const isDashboardOrLogin = pathname === "/login" || pathname.startsWith("/dashboard");

  if (isDashboardOrLogin && (!UNLOCK_SECRET || request.cookies.get(UNLOCK_COOKIE)?.value !== UNLOCK_SECRET)) {
    return NextResponse.rewrite(new URL("/__not_found__", request.url));
  }

  if (!isDashboardOrLogin) {
    const normalizedPathname = normalizePath(pathname);

    const aliases = await getPageAliases();
    const realPath = aliases.get(normalizedPathname);
    if (realPath) {
      return NextResponse.rewrite(new URL(realPath, request.url));
    }

    const redirects = await getRedirects();
    const match = redirects.get(normalizedPathname);
    // A row whose destination is just the source's own slash variant (e.g.
    // "/career/" -> "/career") is a no-op now that both sides are normalized
    // the same way — following it would redirect a path to itself forever.
    if (match && normalizePath(match.destination_path) !== normalizedPathname) {
      const url = new URL(match.destination_path, request.url);
      return NextResponse.redirect(url, match.status_code as 301 | 302);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = pathname === "/login";

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|woff2?)$).*)"],
};

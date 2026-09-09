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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboardOrLogin = pathname === "/login" || pathname.startsWith("/dashboard");

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

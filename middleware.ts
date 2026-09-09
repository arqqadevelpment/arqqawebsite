import { createServerClient } from "@supabase/ssr";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

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
    map.set(row.source_path, { destination_path: row.destination_path, status_code: row.status_code });
  }

  redirectCache = map;
  redirectCacheAt = now;
  return map;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboardOrLogin = pathname === "/login" || pathname.startsWith("/dashboard");

  if (!isDashboardOrLogin) {
    const redirects = await getRedirects();
    const match = redirects.get(pathname);
    if (match) {
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

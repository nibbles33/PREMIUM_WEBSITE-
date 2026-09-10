import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LEGACY_GONE_PATHS,
  LEGACY_PERMANENT_REDIRECTS,
  normalizeLegacyPath,
} from "@/data/legacy-wordpress-cutover";

/**
 * Batch 4B — single runtime mechanism for legacy cutover + trailing-slash enforce.
 *
 * next.config sets trailingSlash:true for URL generation and
 * skipTrailingSlashRedirect:true so this middleware can:
 * 1) one-hop approved legacy permanent redirects (308)
 * 2) emit HTTP 410 for confirmed junk
 * 3) otherwise enforce trailing-slash canonicalization
 *
 * IMPORTANT: use `new URL(path, origin)` rather than mutating `NextURL.pathname`.
 * NextURL strips trailing slashes and can create redirect loops when
 * skipTrailingSlashRedirect is enabled.
 *
 * Existing /talk-to-a-broker/ page redirect is unchanged and not listed here.
 */
function redirectToPath(request: NextRequest, pathname: string) {
  // Preserve query string from the original request.
  const target = new URL(pathname, request.url);
  target.search = request.nextUrl.search;
  return NextResponse.redirect(target, 308);
}

export function middleware(request: NextRequest) {
  const rawPath = request.nextUrl.pathname;
  const path = normalizeLegacyPath(rawPath);

  const destination = LEGACY_PERMANENT_REDIRECTS[path];
  if (destination) {
    return redirectToPath(request, destination);
  }

  if (LEGACY_GONE_PATHS.has(path)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Preserve prior trailing-slash behavior for all other HTML routes.
  if (rawPath !== "/" && !rawPath.endsWith("/")) {
    return redirectToPath(request, `${rawPath}/`);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static asset file requests (keeps PDF + images working).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};

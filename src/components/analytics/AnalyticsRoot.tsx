"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { isAnalyticsConsentGranted } from "@/lib/analytics/track";

function classifyPage(pathname: string): {
  page_type: string;
  page_slug: string;
  line?: string;
} {
  const slug = pathname.replace(/\/+$/, "") || "/";
  if (slug === "/") return { page_type: "home", page_slug: "home" };
  if (slug === "/personal") {
    return { page_type: "hub", page_slug: "personal", line: "personal" };
  }
  if (slug === "/commercial-insurance" || slug === "/commercial") {
    return {
      page_type: "hub",
      page_slug: "commercial-insurance",
      line: "commercial",
    };
  }
  if (slug === "/get-a-quote") {
    return { page_type: "quote", page_slug: "get-a-quote" };
  }
  if (slug === "/contact" || slug.startsWith("/contact")) {
    return { page_type: "contact", page_slug: "contact" };
  }
  if (slug.startsWith("/careers")) {
    return { page_type: "careers", page_slug: slug.slice(1) || "careers" };
  }
  if (slug.endsWith("-insurance") || slug.includes("-insurance")) {
    const line = slug.includes("commercial") ||
      [
        "contractors",
        "restaurant",
        "trucking",
        "farm",
        "bonding",
        "manufacturing",
      ].some((k) => slug.includes(k))
      ? "commercial"
      : "personal";
    return {
      page_type: "product",
      page_slug: slug.replace(/^\//, ""),
      line,
    };
  }
  return { page_type: "content", page_slug: slug.replace(/^\//, "") || "home" };
}

function destinationIdFromHref(href: string): string {
  try {
    if (href.startsWith("tel:")) return "phone";
    if (href.startsWith("mailto:")) return "email";
    const url = new URL(href, window.location.origin);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (path === "/get-a-quote") return "get_a_quote";
    if (path.startsWith("/contact")) return "contact";
    if (href.includes("share.google") || href.includes("google.com/maps")) {
      return "google_business";
    }
    if (href.includes("facebook.com")) return "facebook";
    if (href.includes("instagram.com")) return "instagram";
    return path.replace(/^\//, "").replace(/\//g, "_") || "home";
  } catch {
    return "unknown";
  }
}

/**
 * SPA page_view + delegated click instrumentation.
 * Only emits when Analytics consent is granted (via track()).
 */
export default function AnalyticsRoot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string>("");

  // Page views — one coherent model: app emits page_view to dataLayer.
  // GTM should trigger GA4 page_view from this custom event (not All Pages).
  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (lastPathRef.current === key) return;
    lastPathRef.current = key;
    if (!isAnalyticsConsentGranted()) return;

    const info = classifyPage(pathname || "/");
    track("page_view", {
      page_type: info.page_type,
      page_slug: info.page_slug,
      ...(info.line ? { line: info.line } : {}),
    });

    if (info.page_type === "product" && info.page_slug) {
      track("product_view", {
        product_slug: info.page_slug,
        line: info.line || "personal",
      });
    }
  }, [pathname, searchParams]);

  // Re-emit page_view when consent flips to granted on the same route.
  useEffect(() => {
    const onStorage = () => {
      if (!isAnalyticsConsentGranted()) return;
      const info = classifyPage(pathname || "/");
      track("page_view", {
        page_type: info.page_type,
        page_slug: info.page_slug,
        ...(info.line ? { line: info.line } : {}),
      });
    };
    window.addEventListener("pib:analytics-consent-granted", onStorage);
    return () =>
      window.removeEventListener("pib:analytics-consent-granted", onStorage);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const trackEl = target.closest<HTMLElement>("[data-track]");
      if (trackEl) {
        const eventName = trackEl.getAttribute("data-track");
        if (eventName) {
          const payload: Record<string, string> = {};
          for (const attr of trackEl.attributes) {
            if (!attr.name.startsWith("data-track-")) continue;
            const key = attr.name.replace("data-track-", "").replace(/-/g, "_");
            payload[key] = attr.value;
          }
          track(eventName, payload);
        }
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const location =
        anchor.getAttribute("data-track-location") ||
        (anchor.closest("footer")
          ? "footer"
          : anchor.closest("header")
            ? "header"
            : "content");

      if (href.startsWith("tel:")) {
        track("phone_click", { location });
        return;
      }
      if (href.startsWith("mailto:")) {
        track("email_click", { location });
        return;
      }

      if (
        href.includes("share.google") ||
        href.includes("facebook.com") ||
        href.includes("instagram.com")
      ) {
        const destination = href.includes("facebook.com")
          ? "facebook"
          : href.includes("instagram.com")
            ? "instagram"
            : "google_business";
        track("external_profile_click", { destination });
      }

      if (
        href.includes("/get-a-quote") ||
        /get a quote/i.test(anchor.textContent || "")
      ) {
        track("get_quote_click", {
          location,
          destination_id: destinationIdFromHref(href),
        });
      }

      if (
        href.includes("/contact") ||
        /talk to a broker|contact/i.test(anchor.textContent || "")
      ) {
        const intent = href.includes("intent=broker") ? "broker" : "general";
        track("contact_click", { location, intent });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

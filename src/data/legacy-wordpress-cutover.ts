/**
 * Batch 4B — approved legacy WordPress cutover rules.
 * Single source of truth for permanent redirects + confirmed Gone (410) paths.
 * Paths use trailing-slash canonical form (matches Batch 3 policy).
 */

/** old trailing-slash path → new trailing-slash path (one hop). */
export const LEGACY_PERMANENT_REDIRECTS: Readonly<Record<string, string>> = {
  // 9 HIGH-confidence owner-approved renames (Batch 4 CSV)
  "/about-us/": "/about/",
  "/contact-02/": "/contact/",
  "/contractor-construction-insurance/": "/contractors-insurance/",
  "/landscaping-insurance/": "/landscaping-snow-removal-insurance/",
  "/manufacturer-insurance/": "/manufacturing-insurance/",
  "/rented-dwelling-insurance/": "/landlord-insurance/",
  "/request-quote/": "/get-a-quote/",
  "/snow-removal-insurance/": "/landscaping-snow-removal-insurance/",
  "/watercraft-insurance/": "/boat-insurance/",
  // Conditional /insurance/ approval — broad brokerage directory hub (Batch 4B evidence)
  "/insurance/": "/",
};

/** Confirmed theme/demo/junk/empty URLs — HTTP 410 Gone (no homepage redirects). */
export const LEGACY_GONE_PATHS: ReadonlySet<string> = new Set([
  // Empty blog archive (0 posts; "Nothing Found")
  "/blog/",

  // Batch 4C — owner-approved removals
  "/pool-and-spa/", // title Pool & Spa; body is mismatched auto content
  "/faqs/", // generic theme insurance-101 FAQ filler (not Premium-specific)

  // Theme layout / demo pages
  "/2-columns/",
  "/3-columns/",
  "/blog-grid/",
  "/book-a-appointment/",
  "/portfolio/wellness-program/",
  "/project-single/",
  "/services-01/",
  "/services-02/",
  "/single-left-sidebar/",
  "/single-right-sidebar/",
  "/team-single/",
  "/testimonials/",

  // Noxiy theme builder fragments
  "/noxiy_builder/footer-01/",
  "/noxiy_builder/footer-02/",
  "/noxiy_builder/footer-03/",
  "/noxiy_builder/footer-04/",
  "/noxiy_builder/header-01-dark/",
  "/noxiy_builder/header-01/",
  "/noxiy_builder/header-02/",
  "/noxiy_builder/header-03-dark/",
  "/noxiy_builder/header-03/",
  "/noxiy_builder/header-04-dark/",
  "/noxiy_builder/header-04/",
  "/noxiy_builder/header-2-dark/",
  "/noxiy_builder/offcanvas-sidebar-home-02/",
  "/noxiy_builder/offcanvas-sidebar-home-03/",
  "/noxiy_builder/offcanvas-sidebar/",
  "/noxiy_builder/price-table-year/",
  "/noxiy_builder/price-table/",

  // Theme /service/* CPT templates — identical mismatched placeholder copy
  "/service/car-insurance/",
  "/service/cyber-insurance/",
  "/service/dental-insurance/",
  "/service/disability-insurance/",
  "/service/farm-insurance/",
  "/service/final-expense/",
  "/service/fire-insurance/",
  "/service/health-insurance/",
  "/service/home-insurance/",
  "/service/liability-insurance/",
  "/service/life-insurance/",
  "/service/marine-insurance/",
  "/service/medical-insurance/",
  "/service/term-life/",
  "/service/travels-insurance/",
  "/service/universal-life/",
  "/service/whole-life/",
]);

/** Intentionally open items (non-URL-removal). Batch 4C closed pool/faqs removals. */
export const LEGACY_PENDING_OWNER_REVIEW_PATHS: readonly string[] = [];

export function normalizeLegacyPath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withLeading = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

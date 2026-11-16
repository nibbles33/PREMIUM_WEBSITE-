import QuoteTrustRail from "@/components/quote/QuoteTrustRail";

const FALLBACK_LINES = [
  { label: "Auto", hint: "Car, SUV, pickup, van, motorcycle, or boat" },
  { label: "Home", hint: "House, condo, tenant, or landlord" },
  { label: "Commercial", hint: "Business, commercial vehicles, or farm" },
];

/**
 * Suspense fallback for /get-a-quote/.
 * Mirrors the desk (chooser + trust rail) so hydration does not jump the footer.
 * The page H1 lives in QuoteDeskHero, outside this fallback.
 */
export default function QuoteCategoryPickerFallback() {
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-8">
      <div
        className="order-1 min-w-0 rounded-[18px] border border-border bg-white p-4 sm:p-5 lg:order-2"
        aria-busy="true"
        aria-live="polite"
      >
        <h2 className="text-[1.15rem] font-medium tracking-[-0.02em] text-charcoal sm:text-[1.3rem]">
          Choose a line
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3" aria-hidden>
          {FALLBACK_LINES.map((line) => (
            <li key={line.label}>
              <div className="flex min-h-[108px] flex-col justify-end rounded-2xl border border-border bg-white px-4 py-3.5">
                <span className="text-[16px] font-medium text-charcoal/50">
                  {line.label}
                </span>
                <span className="mt-1 text-[12px] leading-snug text-secondary/70 sm:text-[13px]">
                  {line.hint}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="sr-only">Loading quote options…</p>
      </div>
      <div className="order-2 lg:order-1">
        <QuoteTrustRail />
      </div>
    </div>
  );
}

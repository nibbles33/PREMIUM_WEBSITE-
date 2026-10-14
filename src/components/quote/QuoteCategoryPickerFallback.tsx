import QuoteCategoryIntro from "@/components/quote/QuoteCategoryIntro";
import { CATEGORY_LABELS, type QuoteCategory } from "@/lib/quote/types";

/** Category order matches QuoteCategoryPicker — keeps fallback height aligned. */
const FALLBACK_OPTIONS: QuoteCategory[] = [
  "auto",
  "home",
  "business",
  "commercialAuto",
  "farm",
];

/**
 * Server-rendered Suspense fallback for /get-a-quote/.
 * Mirrors the category-picker card (H1 + five option rows) so hydration does
 * not expand main and push the footer (CLS).
 */
export default function QuoteCategoryPickerFallback() {
  return (
    <div
      className="rounded-[18px] border border-border bg-white/95 p-5 shadow-[0_12px_40px_rgba(32,39,40,0.08)] sm:p-8"
      aria-busy="true"
      aria-live="polite"
    >
      <QuoteCategoryIntro />
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FALLBACK_OPTIONS.map((id) => (
          <li key={id}>
            <div
              className="flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5"
              aria-hidden
            >
              <span className="inline-flex h-11 w-11 shrink-0 rounded-full bg-offwhite" />
              <span className="text-[15px] font-medium text-charcoal/50 sm:text-base">
                {CATEGORY_LABELS[id]}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="sr-only">Loading quote options…</p>
    </div>
  );
}

/** Shared quote landing intro — single H1 source for SSR fallback + client picker. */
export default function QuoteCategoryIntro() {
  return (
    <>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
        Get a quote
      </p>
      <h1 className="mt-3 text-[1.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-charcoal sm:text-3xl">
        What are you looking to insure?
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-secondary">
        Pick a category to start — it only takes a minute.
      </p>
    </>
  );
}

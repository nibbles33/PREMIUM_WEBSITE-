/**
 * Short branded band for /get-a-quote/. Holds the page's only H1.
 */
export default function QuoteDeskHero() {
  return (
    <section className="border-b border-white/10 bg-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8 lg:py-6 xl:max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
            Get a quote
          </p>
          <h1 className="mt-2 text-[1.85rem] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.35rem]">
            What are you looking to insure?
          </h1>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
            Pick a line to start. A licensed Windsor-Essex broker follows up
            with options.
          </p>
        </div>
        <a
          href="tel:+12267826000"
          className="btn-primary btn-primary-gradient inline-flex h-12 shrink-0 items-center justify-center rounded-md px-5 text-[15px] font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Call 226-782-6000
        </a>
      </div>
    </section>
  );
}

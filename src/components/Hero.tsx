import Link from "next/link";
import HeroCoverageCards from "@/components/HeroCoverageCards";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

export default function Hero() {
  return (
    <section
      id="hero"
      className="overflow-x-clip bg-offwhite"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-6 sm:gap-10 sm:px-6 sm:pb-12 sm:pt-8 md:pb-14 md:pt-10 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-8 lg:px-8 lg:pb-16 lg:pt-14 xl:max-w-7xl xl:gap-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs sm:tracking-[0.14em]">
            Windsor-Essex Insurance Brokers
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-[2.125rem] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:mt-3.5 sm:text-5xl sm:leading-[1.08] lg:text-[3.75rem] xl:text-[4rem]"
          >
            Insurance
            <br className="sm:hidden" /> made simple.
          </h1>
          <p className="mt-3 text-base font-medium tracking-tight text-charcoal sm:mt-3.5 sm:text-lg lg:text-xl">
            Personal advice. More choice. Better coverage.
          </p>
          <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-secondary sm:text-base">
            Compare insurance options with help from a real broker — not a call
            centre.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark sm:w-auto"
            >
              Get a Quote
              <span
                aria-hidden
                className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
            <Link
              href={BROKER_HREF}
              className="inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/80 bg-transparent px-6 text-sm font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark sm:w-auto"
            >
              Talk to a Broker
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 lg:justify-self-stretch">
          <HeroCoverageCards />
          <p className="sr-only">
            Coverage categories illustrated: Auto Protection, Home Protection,
            Business Protection, and Commercial Insurance.
          </p>
        </div>
      </div>
    </section>
  );
}

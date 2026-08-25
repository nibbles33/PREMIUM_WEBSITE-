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
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-12 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-[7.5rem] xl:max-w-7xl">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs sm:tracking-[0.14em]">
            Windsor-Essex Insurance Brokers
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-[2.125rem] font-medium leading-[1.12] tracking-[-0.02em] text-charcoal sm:mt-4 sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem]"
          >
            Insurance
            <br className="sm:hidden" /> made simple.
          </h1>
          <p className="mt-3 text-base font-medium tracking-tight text-charcoal sm:mt-4 sm:text-lg lg:text-xl">
            Personal advice. More choice. Better coverage.
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary sm:text-base">
            Compare insurance options with help from a real local broker — not a
            call centre.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={QUOTE_HREF}
              className="inline-flex h-12 w-full min-w-[44px] items-center justify-center bg-gold px-6 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark sm:w-auto"
            >
              Get a Quote
            </Link>
            <Link
              href={BROKER_HREF}
              className="inline-flex h-12 w-full min-w-[44px] items-center justify-center border border-charcoal bg-transparent px-6 text-sm font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark sm:w-auto"
            >
              Talk to a Broker
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 lg:justify-self-end">
          <HeroCoverageCards />
          <p className="sr-only">
            Coverage categories illustrated: Auto, Home, Business, and
            Commercial.
          </p>
        </div>
      </div>
    </section>
  );
}

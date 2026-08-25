import Link from "next/link";
import HeroCoverageCards from "@/components/HeroCoverageCards";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-offwhite"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-[7.5rem]">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-gold-dark">
            Windsor-Essex Insurance Brokers
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-5xl lg:text-[3.25rem]"
          >
            Insurance made simple.
          </h1>
          <p className="mt-4 text-lg font-medium tracking-tight text-charcoal sm:text-xl">
            Personal advice. More choice. Better coverage.
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-secondary">
            Compare insurance options with help from a real local broker — not a
            call centre.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={QUOTE_HREF}
              className="inline-flex h-12 min-w-[44px] items-center justify-center bg-gold px-6 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark"
            >
              Get a Quote
            </Link>
            <Link
              href={BROKER_HREF}
              className="inline-flex h-12 min-w-[44px] items-center justify-center border border-charcoal bg-transparent px-6 text-sm font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark"
            >
              Talk to a Broker
            </Link>
          </div>
        </div>

        <div className="w-full lg:justify-self-end">
          <HeroCoverageCards />
          <p className="sr-only">
            Coverage categories: Auto, Home, Business, and Commercial.
          </p>
        </div>
      </div>
    </section>
  );
}

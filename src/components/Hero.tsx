import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import HeroCoverageCard from "@/components/HeroCoverageCard";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

function hasHeroBackgroundImage(): boolean {
  // Optional: add hero-background.jpg to public/images/ — a licensed (e.g. Unsplash)
  // photo of a modern home, vehicle, or business exterior, Windsor-Essex relevant if
  // possible. Faded/subtle treatment only — the glow fallback above is a complete
  // design on its own.
  try {
    return existsSync(
      join(process.cwd(), "public", "images", "hero-background.jpg"),
    );
  } catch {
    return false;
  }
}

export default function Hero() {
  const showBackgroundImage = hasHeroBackgroundImage();

  return (
    <section
      id="hero"
      className="overflow-x-clip bg-offwhite"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:gap-12 sm:px-6 sm:pb-14 sm:pt-10 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-16 xl:max-w-7xl">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs sm:tracking-[0.14em]">
            Real Brokers · Real Advice
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:mt-4 sm:text-5xl sm:leading-[1.06] lg:text-[3.75rem] xl:text-[4rem]"
          >
            Insurance
            <br className="sm:hidden" /> made simple.
          </h1>
          <p className="mt-3 text-base font-medium tracking-tight text-charcoal sm:mt-4 sm:text-lg lg:text-xl">
            Personal advice. More choice. Better coverage.
          </p>
          <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-secondary sm:text-base">
            Compare insurance options with help from a real broker — not a call
            centre.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md bg-gold px-8 text-[15px] font-medium text-charcoal transition-colors hover:bg-gold-dark sm:w-auto sm:px-9"
            >
              Get a Quote
              <span
                aria-hidden
                className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
            <Link
              href={BROKER_HREF}
              className="inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark sm:w-auto"
            >
              Talk to a Broker
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 py-2 lg:justify-self-end lg:py-0">
          <HeroCoverageCard showBackgroundImage={showBackgroundImage} />
        </div>
      </div>
    </section>
  );
}

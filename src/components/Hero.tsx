"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeroCoverageCard, {
  heroCoverageOptions,
  type HeroCategoryId,
} from "@/components/HeroCoverageCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BROKER_HREF = "/talk-to-a-broker/";

export default function Hero() {
  const [activeId, setActiveId] = useState<HeroCategoryId>("auto");
  const [ctaVisible, setCtaVisible] = useState(true);
  const reduceMotion = usePrefersReducedMotion();

  const active =
    heroCoverageOptions.find((o) => o.id === activeId) ??
    heroCoverageOptions[0];

  const handleSelect = (id: HeroCategoryId) => {
    if (id === activeId) return;
    if (reduceMotion) {
      setActiveId(id);
      setCtaVisible(true);
      return;
    }
    setCtaVisible(false);
    window.setTimeout(() => {
      setActiveId(id);
      setCtaVisible(true);
    }, 80);
  };

  return (
    <section
      id="hero"
      className="relative overflow-x-clip bg-offwhite"
      aria-labelledby="hero-heading"
    >
      {/* Ambient background photo — texture only, not a focal image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/team-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.14]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,250,248,0.97) 0%, rgba(250,250,248,0.88) 38%, rgba(250,250,248,0.55) 68%, rgba(250,250,248,0.28) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:gap-12 sm:px-6 sm:pb-14 sm:pt-10 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-16 xl:max-w-7xl">
        <RevealOnScroll>
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
                href={active.quoteHref}
                className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[220px] sm:px-9"
                aria-live="polite"
              >
                <span
                  className={`inline-flex items-center transition-opacity duration-150 ease-out ${
                    ctaVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDuration: reduceMotion ? "0ms" : "150ms",
                  }}
                >
                  {active.quoteLabel}
                  <span
                    aria-hidden
                    className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </span>
              </Link>
              <Link
                href={BROKER_HREF}
                className="btn-secondary inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:w-auto"
              >
                Talk to a Broker
              </Link>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="w-full min-w-0 py-2 lg:justify-self-end lg:py-0">
          <HeroCoverageCard activeId={activeId} onSelect={handleSelect} />
        </RevealOnScroll>
      </div>
    </section>
  );
}

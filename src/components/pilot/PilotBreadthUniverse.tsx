"use client";

import Link from "next/link";
import MiniatureObject from "@/components/pilot/MiniatureObject";
import RevealOnScroll from "@/components/RevealOnScroll";
import { breadthItems, breadthMobileItems } from "@/data/pilot-home";

export default function PilotBreadthUniverse() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-offwhite py-16 sm:py-20 lg:py-24"
      aria-labelledby="pilot-yep-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 30% 40%, #d0ad26 0%, transparent 50%), radial-gradient(circle at 70% 60%, #202728 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-yep-heading"
              className="text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-charcoal sm:text-4xl lg:text-5xl"
            >
              Yep.
              <br />
              We insure that too.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
              A lot to protect? Good thing we have options — from everyday
              personal coverage to operations you didn&apos;t expect a broker to
              handle.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 hidden md:block">
          <div
            className="relative mx-auto aspect-[2/1] max-w-4xl"
            role="list"
            aria-label="Insurance categories we cover"
          >
            {breadthItems.map((item) => (
              <div
                key={item.label}
                role="listitem"
                className="absolute"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: item.layer,
                }}
              >
                <MiniatureObject
                  slot={item.slot}
                  label={item.label}
                  href={item.href}
                  width={item.width}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 md:hidden">
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 snap-x snap-mandatory scrollbar-none"
            role="list"
            aria-label="Insurance categories we cover"
          >
            {breadthMobileItems.map((item) => (
              <div
                key={item.label}
                role="listitem"
                className="w-[42vw] shrink-0 snap-center"
              >
                <MiniatureObject
                  slot={item.slot}
                  label={item.label}
                  href={item.href}
                  width={120}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 text-center">
          <Link
            href="/get-a-quote/"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-gold-dark underline-offset-4 hover:text-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Not sure where to start? Get a quote
            <span aria-hidden>→</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

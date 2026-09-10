"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import { AUTO_BROKER_HREF, AUTO_QUOTE_HREF } from "@/data/pilot-auto";

export default function AutoFinalCta() {
  return (
    <section
      className="relative overflow-hidden bg-charcoal py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-auto-final-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(208,173,38,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <RevealOnScroll>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold/80">
            Ready when you are
          </p>
          <h2
            id="pilot-auto-final-heading"
            className="mt-3 text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl"
          >
            Your car.
            <br />
            Your coverage.
            <br />
            Let&apos;s make it easy.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
            Tell us about your vehicle — we&apos;ll compare options and explain
            what actually fits.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PremiumGoldCTA href={AUTO_QUOTE_HREF}>
              Get an Auto Quote
            </PremiumGoldCTA>
            <PremiumPilotButton
              href={AUTO_BROKER_HREF}
              variant="secondary"
              showArrow={false}
              className="pilot-charcoal-secondary-btn"
            >
              Talk to a Broker
            </PremiumPilotButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

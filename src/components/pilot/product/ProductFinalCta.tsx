"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";

type ProductFinalCtaProps = {
  slug: string;
  eyebrow: string;
  heading: string;
  subhead: string;
  quoteHref: string;
  quoteLabel: string;
  brokerHref: string;
  secondaryCta?: { label: string; href: string };
};

export default function ProductFinalCta({
  slug,
  eyebrow,
  heading,
  subhead,
  quoteHref,
  quoteLabel,
  brokerHref,
  secondaryCta,
}: ProductFinalCtaProps) {
  return (
    <section
      className="relative overflow-hidden bg-charcoal py-12 sm:py-14 lg:py-[4.25rem]"
      aria-labelledby={`pilot-product-final-${slug}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(208,173,38,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-4xl">
        <RevealOnScroll>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold/80">
            {eyebrow}
          </p>
          <h2
            id={`pilot-product-final-${slug}`}
            className="mt-3 text-[1.85rem] font-medium leading-[1.08] tracking-[-0.025em] text-white sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
            {subhead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PremiumGoldCTA href={quoteHref}>{quoteLabel}</PremiumGoldCTA>
            <PremiumPilotButton
              href={secondaryCta?.href ?? brokerHref}
              variant="secondary"
              showArrow={false}
              className="pilot-charcoal-secondary-btn"
            >
              {secondaryCta?.label ?? "Talk to a Broker"}
            </PremiumPilotButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

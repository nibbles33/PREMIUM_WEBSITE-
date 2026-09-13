import RevealOnScroll from "@/components/RevealOnScroll";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";

export default function PilotFinalCta() {
  return (
    <section
      className="border-t border-border bg-charcoal py-16 sm:py-20"
      aria-labelledby="pilot-final-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
            Next step
          </p>
          <h2
            id="pilot-final-cta-heading"
            className="mt-4 text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[3rem]"
          >
            Insurance should feel simpler from here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-lg">
            Talk to a licensed broker who can compare options, explain the
            differences and help you choose coverage with confidence.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PremiumPilotButton href="/get-a-quote/">
              Get a Quote
            </PremiumPilotButton>
            <PremiumPilotButton
              href="/contact/?intent=broker"
              variant="secondary"
              showArrow={false}
              className="pilot-charcoal-secondary-btn"
            >
              Talk to a Broker
            </PremiumPilotButton>
          </div>
          <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
            Home · Auto · Business · Specialty
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import RevealOnScroll from "@/components/RevealOnScroll";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";

export default function PilotFinalCta() {
  return (
    <section
      className="border-t border-border bg-charcoal py-10 sm:py-12"
      aria-labelledby="pilot-final-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <h2
            id="pilot-final-cta-heading"
            className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl"
          >
            Ready when you are.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base">
            Compare options with a real Windsor-Essex broker — online, by phone,
            or in person.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PremiumPilotButton href="/get-a-quote/">
              Get a Quote
            </PremiumPilotButton>
            <PremiumPilotButton
              href="/talk-to-a-broker/"
              variant="secondary"
              showArrow={false}
              className="border-white/40 text-white hover:border-gold hover:text-gold"
            >
              Talk to a Broker
            </PremiumPilotButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

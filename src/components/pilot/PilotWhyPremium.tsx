import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { WHY_PREMIUM_POINTS } from "@/data/homepage-authority";

/**
 * Concept F Revision 2 — Why Premium as an architectural editorial block.
 * Photography + lined proof. No icon grids / SaaS cards.
 */
export default function PilotWhyPremium() {
  return (
    <section
      className="border-t border-border bg-[#FBF7EF] py-16 sm:py-20 lg:py-24"
      aria-labelledby="pilot-why-premium-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <RevealOnScroll>
            <div className="relative min-h-[320px] overflow-hidden rounded-[20px] bg-charcoal sm:min-h-[420px] lg:min-h-full lg:min-h-[520px]">
              <Image
                src="/images/office-1.jpg"
                alt="Premium Insurance Brokers office in Windsor-Essex"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(32,39,40,0.12) 0%, rgba(32,39,40,0.62) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                  Independent brokerage
                </p>
                <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-white/92 sm:text-[17px]">
                  Advice first. Markets second. Coverage that fits how you live
                  and work.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col justify-center lg:py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                Why Premium
              </p>
              <h2
                id="pilot-why-premium-heading"
                className="mt-3 text-[2rem] font-medium tracking-[-0.03em] text-charcoal sm:text-[2.4rem] lg:text-[2.7rem]"
              >
                A brokerage built around better advice.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:text-base">
                Technology can make insurance easier — but coverage decisions
                still deserve a licensed broker who will explain the differences.
              </p>

              <ul className="mt-10 divide-y divide-border/80 border-y border-border/80">
                {WHY_PREMIUM_POINTS.map((point) => (
                  <li key={point.title} className="py-6 sm:py-7">
                    <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                      {point.title}
                    </p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-charcoal/90 sm:text-[16px]">
                      {point.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

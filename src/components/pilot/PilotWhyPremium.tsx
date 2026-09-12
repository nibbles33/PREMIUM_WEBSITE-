import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { WHY_PREMIUM_POINTS } from "@/data/homepage-authority";

/**
 * Editorial "Why Premium" — 45/55 split with lined proof statements.
 * Not a generic six-icon card grid.
 */
export default function PilotWhyPremium() {
  return (
    <section
      className="border-t border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-why-premium-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <RevealOnScroll>
            <div className="relative min-h-[280px] overflow-hidden rounded-[18px] bg-charcoal sm:min-h-[360px] lg:min-h-full lg:min-h-[420px]">
              <Image
                src="/images/office-1.jpg"
                alt="Premium Insurance Brokers office in Windsor-Essex"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(32,39,40,0.15) 0%, rgba(32,39,40,0.55) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  Independent brokerage
                </p>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/90">
                  Advice first. Markets second. Coverage that fits how you live
                  and work.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div>
              <h2
                id="pilot-why-premium-heading"
                className="text-[1.75rem] font-medium tracking-[-0.02em] text-charcoal sm:text-3xl lg:text-[2.15rem]"
              >
                A brokerage built around better advice.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-secondary sm:text-base">
                Technology can make insurance easier — but coverage decisions
                still deserve a licensed broker who will explain the differences.
              </p>

              <ul className="mt-8 divide-y divide-border border-y border-border">
                {WHY_PREMIUM_POINTS.map((point) => (
                  <li key={point.title} className="py-5 sm:py-6">
                    <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold-dark">
                      {point.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-charcoal/90 sm:text-[15.5px]">
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

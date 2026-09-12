import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

/**
 * Windsor-Essex local presence + Oracle RMS institutional relationship.
 */
export default function PilotWindsorOracle() {
  return (
    <section
      className="border-t border-border bg-charcoal py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-windsor-oracle-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <RevealOnScroll>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                Windsor-Essex ·{" "}
                {HOMEPAGE_AUTHORITY.oracle.eyebrow}{" "}
                {HOMEPAGE_AUTHORITY.oracle.name}
              </p>
              <h2
                id="pilot-windsor-oracle-heading"
                className="mt-3 text-[1.75rem] font-medium tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.15rem]"
              >
                Built here. Connected beyond here.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
                Premium combines Windsor-Essex relationships with the broader
                capabilities of Oracle RMS and access to leading Canadian
                insurance markets.
              </p>
              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                    Local relationships
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-white/75">
                    A brokerage clients can call and visit — rooted in
                    Windsor-Essex.
                  </dd>
                </div>
                <div className="rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                    Larger network capability
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-white/75">
                    A Division of Oracle RMS — with access to major Canadian
                    markets.
                  </dd>
                </div>
              </dl>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="relative min-h-[260px] overflow-hidden rounded-[18px] sm:min-h-[340px]">
              <Image
                src="/images/office-2.jpg"
                alt="Premium Insurance Brokers office serving Windsor-Essex"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(32,39,40,0.25) 0%, rgba(32,39,40,0.05) 55%, rgba(32,39,40,0.45) 100%)",
                }}
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

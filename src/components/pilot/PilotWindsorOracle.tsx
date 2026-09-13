import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

/**
 * Concept F Revision 2 — Windsor-Essex roots + Oracle RMS network capability.
 * Carries Oracle credibility in place of the oversized authority-strip cell.
 */
export default function PilotWindsorOracle() {
  return (
    <section
      className="border-t border-border bg-charcoal py-16 sm:py-20 lg:py-24"
      aria-labelledby="pilot-windsor-oracle-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                Windsor-Essex · {HOMEPAGE_AUTHORITY.oracle.eyebrow}{" "}
                {HOMEPAGE_AUTHORITY.oracle.name}
              </p>
              <h2
                id="pilot-windsor-oracle-heading"
                className="mt-4 text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Built here. Connected beyond here.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
                Premium combines Windsor-Essex relationships with the broader
                capabilities of Oracle RMS and access to leading Canadian
                insurance markets.
              </p>
              <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                    Local roots
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-white/75">
                    A Windsor-Essex brokerage clients can call and visit.
                  </dd>
                </div>
                <div className="rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                    Oracle RMS network
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-white/75">
                    A Division of Oracle RMS — broader institutional capability.
                  </dd>
                </div>
                <div className="rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                    Market access
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-white/75">
                    Access to leading Canadian insurers across personal and
                    commercial lines.
                  </dd>
                </div>
              </dl>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="relative min-h-[300px] overflow-hidden rounded-[20px] sm:min-h-[420px]">
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
                    "linear-gradient(135deg, rgba(32,39,40,0.28) 0%, rgba(32,39,40,0.05) 55%, rgba(32,39,40,0.5) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  A Division of Oracle RMS
                </p>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/88">
                  Local accountability with the reach of a larger brokerage
                  network.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

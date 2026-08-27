import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import PartnerLogoCard from "@/components/PartnerLogoCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getPartnerGroups } from "@/data/partners";

export const metadata: Metadata = {
  title: "Our Partners | PremiumIB",
  description:
    "Premium Insurance Brokers works with major personal and commercial insurers, specialty underwriters, and program partners across Ontario.",
};

export default function PartnersPage() {
  const groups = getPartnerGroups();

  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite py-10 sm:py-12 lg:py-14"
          aria-labelledby="partners-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs">
                  Market access
                </p>
                <h1
                  id="partners-heading"
                  className="mt-3 text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl"
                >
                  Our Partners
                </h1>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
                  One independent broker with access to a broad network of
                  insurers and specialty partners — so we can shop the market
                  and find coverage that actually fits.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14 lg:space-y-16">
              {groups.map((group) => (
                <RevealOnScroll key={group.id}>
                  <div>
                    <div className="mx-auto max-w-3xl text-center sm:text-left">
                      <h2 className="text-xl font-medium tracking-[-0.02em] text-charcoal sm:text-2xl">
                        {group.title}
                      </h2>
                      {group.description ? (
                        <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                          {group.description}
                        </p>
                      ) : null}
                    </div>
                    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:gap-5">
                      {group.partners.map((partner) => (
                        <li key={partner.name}>
                          <PartnerLogoCard
                            partner={partner}
                            size="directory"
                            className="h-full w-full min-w-0"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll className="mt-12 sm:mt-14">
              <div className="rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-[0_8px_28px_rgba(32,39,40,0.06)] sm:px-10 sm:py-10">
                <h2 className="text-xl font-medium tracking-[-0.02em] text-charcoal sm:text-2xl">
                  Need coverage from one of these markets?
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-secondary">
                  A licensed broker will review your situation and match you
                  with options from the carriers and programs that fit.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href="/get-a-quote/"
                    className="btn-primary btn-primary-gradient group inline-flex h-12 min-w-[200px] items-center justify-center rounded-md px-6 text-sm font-medium text-charcoal"
                  >
                    Get a Quote
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href="/talk-to-a-broker/"
                    className="btn-secondary inline-flex h-12 min-w-[200px] items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-gold-dark hover:border-gold-dark"
                  >
                    Talk to a Broker
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

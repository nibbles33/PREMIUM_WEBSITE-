import type { Metadata } from "next";
import Header from "@/components/Header";
import PersonalInsurance from "@/components/PersonalInsurance";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBar from "@/components/TrustBar";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PILOT_BROKER_HREF } from "@/data/pilot-product-shared";

export const metadata: Metadata = buildPageMetadata({
  title: "Personal Insurance | Premium Insurance Brokers",
  description:
    "Explore personal insurance options in Windsor-Essex — auto, home, condo, tenant, specialty, and more through an independent local broker.",
  path: "/personal/",
});

export default function PersonalHubPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="personal-hub-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-dark">
                  Personal insurance
                </p>
                <h1
                  id="personal-hub-hero-heading"
                  className="mt-3 text-3xl font-medium tracking-[-0.03em] text-charcoal sm:text-4xl lg:text-[2.75rem]"
                >
                  Coverage for what you drive, own, and protect
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Browse every personal line we help with in Windsor-Essex —
                  then talk with a licensed broker about the fit for your
                  situation.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/get-a-quote/"
                    className="btn-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-medium"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href={PILOT_BROKER_HREF}
                    className="btn-secondary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-medium"
                  >
                    Talk to a Broker
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <PersonalInsurance />
        <TrustBar />
      </main>
    </>
  );
}

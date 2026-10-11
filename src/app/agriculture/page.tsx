import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBar from "@/components/TrustBar";
import HeroPhoneLink from "@/components/pilot/HeroPhoneLink";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import JsonLd from "@/components/seo/JsonLd";
import {
  AGRICULTURE_ACCENT,
  agricultureHubCategories,
} from "@/data/agriculture";
import { getPageHeroPhotography, PILOT_AUTO_HERO_IMAGE } from "@/data/photography";
import { PILOT_BROKER_HREF } from "@/data/pilot-product-shared";
import { buildPageMetadata } from "@/lib/seo";
import { webPageStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Agriculture Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Agriculture insurance for Windsor-Essex and Essex County — farm packages, crop program referrals to Agricorp, livestock, greenhouse and nursery, and farm equipment through an independent broker.",
  path: "/agriculture/",
});

const agricultureHubJsonLd = webPageStructuredData({
  name: "Agriculture Insurance | Premium Insurance Brokers",
  description:
    "Agriculture insurance for Windsor-Essex and Essex County — farm packages, crop program referrals to Agricorp, livestock, greenhouse and nursery, and farm equipment through an independent broker.",
  path: "/agriculture/",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Agriculture", path: "/agriculture/" },
  ],
});

export default function AgricultureHubPage() {
  const heroPhoto = getPageHeroPhotography("agriculture");

  return (
    <>
      <JsonLd data={agricultureHubJsonLd} />
      <Header />
      <main>
        <section
          className="pilot-product-hero relative overflow-hidden border-b border-border bg-[#F5F1E8]"
          aria-labelledby="agriculture-hub-hero-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            aria-hidden
            style={{
              background: `radial-gradient(circle at 78% 32%, ${AGRICULTURE_ACCENT}, transparent 58%)`,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 xl:max-w-7xl">
            <div
              className={
                heroPhoto
                  ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12"
                  : "grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10"
              }
            >
              <RevealOnScroll>
                <div className="max-w-xl lg:max-w-[34rem]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                    Agriculture insurance · Windsor-Essex
                  </p>
                  <h1
                    id="agriculture-hub-hero-heading"
                    className="mt-3 text-[2.25rem] font-medium leading-[1.05] tracking-[-0.032em] text-charcoal sm:text-[2.75rem] lg:text-[3.15rem]"
                  >
                    Coverage paths for Essex County farms and agribusiness
                  </h1>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <PremiumGoldCTA href="/get-a-quote?type=farm">
                      Get a Farm Quote
                    </PremiumGoldCTA>
                    <PremiumPilotButton
                      href={PILOT_BROKER_HREF}
                      variant="secondary"
                      showArrow={false}
                    >
                      Talk to a Broker
                    </PremiumPilotButton>
                  </div>
                  <div className="mt-3">
                    <HeroPhoneLink tone="light" />
                  </div>
                  <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base lg:text-[1.0625rem] lg:leading-[1.65]">
                    Explore private farm packages, livestock and equipment
                    scheduling, greenhouse and nursery operations, and clear
                    guidance on Ontario crop Production Insurance — administered
                    by Agricorp. Premium helps with the private farm coverages
                    we can place.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className="relative">
                {heroPhoto ? (
                  <div className="pilot-product-hero-visual relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[5/4]">
                      <Image
                        src={heroPhoto.src}
                        alt={heroPhoto.alt}
                        fill
                        priority
                        sizes={PILOT_AUTO_HERO_IMAGE.sizes}
                        quality={PILOT_AUTO_HERO_IMAGE.quality}
                        className={
                          heroPhoto.objectPosition
                            ? "object-cover"
                            : "object-cover object-center"
                        }
                        style={
                          heroPhoto.objectPosition
                            ? { objectPosition: heroPhoto.objectPosition }
                            : undefined
                        }
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 55%, rgba(32,39,40,0.18) 100%)",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border/70 px-6 py-6 sm:aspect-[16/11] sm:px-7 sm:py-7 lg:aspect-[5/4]"
                    style={{
                      background: `linear-gradient(155deg, #E7EBD8 0%, #F5F1E8 42%, color-mix(in srgb, ${AGRICULTURE_ACCENT} 28%, #F5F1E8) 100%)`,
                    }}
                    aria-hidden
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full opacity-40 blur-2xl"
                      style={{ background: AGRICULTURE_ACCENT }}
                    />
                    <div
                      className="pointer-events-none absolute bottom-8 right-8 h-28 w-28 rounded-full opacity-25 blur-xl"
                      style={{ background: "#D0AD26" }}
                    />
                    <p className="relative text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                      Essex County
                    </p>
                    <p className="relative mt-2 max-w-[16rem] text-xl font-medium leading-snug tracking-[-0.02em] text-charcoal sm:text-2xl">
                      Farm, crop guidance, livestock, greenhouse &amp; equipment
                    </p>
                    <p className="relative mt-3 max-w-[18rem] text-[13px] leading-relaxed text-secondary">
                      Five clear Agriculture routes — start with the path that
                      matches how you operate.
                    </p>
                  </div>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-10 sm:py-12 lg:py-14"
          aria-labelledby="agriculture-categories-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <h2
                  id="agriculture-categories-heading"
                  className="text-[1.55rem] font-medium tracking-[-0.025em] text-charcoal sm:text-[1.75rem]"
                >
                  Agriculture coverage categories
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                  Start with the route that matches your operation. Crop
                  Production Insurance links to Agricorp; the other pages cover
                  private insurance conversations Premium can help quote.
                </p>
              </div>
            </RevealOnScroll>

            <ul className="mt-8 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {agricultureHubCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <li key={category.href}>
                    <RevealOnScroll className="h-full">
                      <Link
                        href={category.href}
                        className="group flex h-full flex-col border border-border bg-white px-4 py-4 transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_28px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-5 sm:py-5"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,#7A8B5C_14%,#FAFAF8)]">
                          <Icon
                            className="h-5 w-5 text-[#7A8B5C]"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </span>
                        <span className="mt-3 block text-[15px] font-medium text-charcoal">
                          {category.label}
                        </span>
                        <span className="mt-2 block flex-1 text-[13px] leading-relaxed text-secondary">
                          {category.description}
                        </span>
                        <span className="mt-3 block text-[12px] font-medium text-gold-dark transition-transform duration-200 group-hover:translate-x-0.5">
                          Learn more →
                        </span>
                      </Link>
                    </RevealOnScroll>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="border-b border-border bg-white py-8 sm:py-9">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <p className="text-[14px] leading-relaxed text-secondary sm:text-[15px]">
                For Ontario Production Insurance and related government crop
                programs, we refer you to Agricorp. For private farm, livestock,
                greenhouse, nursery, and equipment coverages we can place, talk
                with a licensed local broker.
              </p>
              <div className="mt-5">
                <Link
                  href="/crop-insurance/"
                  className="text-[13px] font-medium text-gold-dark transition-colors hover:text-charcoal"
                >
                  Read about crop insurance &amp; Agricorp →
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <TrustBar />
      </main>
    </>
  );
}

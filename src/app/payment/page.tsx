import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import { paymentCarriers } from "@/data/payment-carriers";

export const metadata: Metadata = {
  title: "Make a Payment | Premium Insurance Brokers",
  description:
    "Pay your premium directly through your insurance carrier using the secure payment portals listed below.",
};

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

export default function PaymentPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="payment-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="payment-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl sm:leading-[1.06]"
                >
                  Make a Payment
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base">
                  Pay your premium directly through your insurance carrier using
                  the links below.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-label="Carrier payment portals"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {paymentCarriers.map((carrier) => (
                <li key={carrier.name}>
                  <RevealOnScroll>
                    <a
                      href={carrier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-[14px] border border-border bg-offwhite/70 p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_10px_24px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-6"
                    >
                      <span className="flex h-14 items-center justify-center">
                        <Image
                          src={carrier.logo}
                          alt={carrier.logoAlt}
                          width={160}
                          height={56}
                          className="max-h-12 w-auto max-w-[140px] object-contain opacity-85 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      </span>
                      <span className="mt-4 block text-center text-[15px] font-medium text-charcoal">
                        {carrier.name}
                      </span>
                      <span className="mt-3 inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-gold-dark">
                        Make Payment
                        <span aria-hidden>→</span>
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-secondary sm:text-[14px]">
              Payment portals are operated by each carrier. If you&apos;re unsure
              which insurer holds your policy,{" "}
              <Link
                href="/contact/"
                className="font-medium text-gold-dark underline-offset-4 hover:underline"
              >
                contact us
              </Link>{" "}
              and we&apos;ll point you to the right link.
            </p>
          </div>
        </section>

        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="payment-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="payment-cta-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  Need help with a payment?
                </h2>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  <Link
                    href={BROKER_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[200px]"
                  >
                    Talk to a Broker
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={QUOTE_HREF}
                    className="inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md border border-white/25 bg-transparent px-6 text-[15px] font-medium text-white transition-colors hover:border-gold hover:text-gold sm:w-auto sm:min-w-[200px]"
                  >
                    Get a Quote
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

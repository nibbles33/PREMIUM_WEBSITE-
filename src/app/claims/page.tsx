import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import CarrierClaimsDirectory from "@/components/claims/CarrierClaimsDirectory";
import ClaimsScenarioCards from "@/components/claims/ClaimsScenarioCards";
import FaqAccordion from "@/components/FaqAccordion";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  BROKER_CLAIMS_PHONE,
  BROKER_CLAIMS_PHONE_HREF,
} from "@/data/carrierClaims";
import {
  claimsFaqs,
  claimsPreparednessItems,
} from "@/data/claimsContent";

export const metadata: Metadata = {
  title: "Claims Guidance | Premium Insurance Brokers",
  description:
    "Need to report a claim? Premium Insurance Brokers helps Windsor-Essex clients understand first steps, connect with carrier claims contacts, and navigate the process.",
};

export default function ClaimsPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="claims-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs">
                  Claims support
                </p>
                <h1
                  id="claims-hero-heading"
                  className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl"
                >
                  We&apos;re here when you need to report a claim
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Premium Insurance Brokers helps you understand what to do
                  first, connect with your insurer&apos;s claims team, and
                  navigate the process with a licensed broker at your side.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={BROKER_CLAIMS_PHONE_HREF}
                    className="btn-primary inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal"
                  >
                    Call {BROKER_CLAIMS_PHONE}
                  </a>
                  <a
                    href="#carrier-directory"
                    className="btn-secondary inline-flex h-12 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-gold-dark"
                  >
                    Find your insurance company
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-12 sm:py-14"
          aria-labelledby="emergency-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="rounded-xl border-2 border-gold/40 bg-gold/10 p-6 sm:p-8">
                <h2
                  id="emergency-heading"
                  className="text-xl font-medium text-charcoal sm:text-2xl"
                >
                  Safety first
                </h2>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-charcoal">
                  <li>• If anyone is injured or the scene is unsafe, call 911.</li>
                  <li>• Document damage with photos only when it is safe to do so.</li>
                  <li>
                    • Follow your insurer&apos;s and adjuster&apos;s instructions —
                    this page provides general guidance only.
                  </li>
                  <li>
                    • Report the loss to your insurer as soon as reasonably
                    possible.
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16"
          aria-labelledby="scenario-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="scenario-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                What happened?
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">
                Select a situation for concise first-step guidance. Your insurer
                may have specific reporting requirements.
              </p>
              <div className="mt-8">
                <ClaimsScenarioCards />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          id="carrier-directory"
          className="scroll-mt-24 border-b border-border bg-white py-14 sm:py-16"
          aria-labelledby="carrier-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="carrier-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Find your insurance company
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">
                Direct claims contacts are shown only when verified in our
                records. For all other carriers, contact Premium and we&apos;ll
                help connect you.
              </p>
              <div className="mt-8">
                <CarrierClaimsDirectory />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16"
          aria-labelledby="prepared-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="prepared-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                What to have ready
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {claimsPreparednessItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16"
          aria-labelledby="roles-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="roles-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Broker vs. insurer — who does what?
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-secondary">
                <p>
                  <strong className="font-medium text-charcoal">
                    Your insurance company
                  </strong>{" "}
                  underwrites the policy, assigns adjusters, and settles covered
                  claims according to policy terms.
                </p>
                <p>
                  <strong className="font-medium text-charcoal">
                    Premium Insurance Brokers
                  </strong>{" "}
                  helps you report the loss, understand your coverage, gather
                  documentation, and advocate for you throughout the process. We
                  do not adjust or pay claims — that is the insurer&apos;s role.
                </p>
                <p>
                  If you are unsure which company to call or what your policy
                  covers, reach out to us before making major repair decisions.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16"
          aria-labelledby="claims-faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="claims-faq-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Claims FAQ
              </h2>
              <div className="mt-8">
                <FaqAccordion items={claimsFaqs} />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="bg-charcoal py-12 text-center text-white sm:py-14">
          <div className="mx-auto max-w-xl px-4">
            <p className="text-lg font-medium">Need help right now?</p>
            <p className="mt-2 text-sm text-white/70">
              Our licensed brokers can help you find the right claims contact.
            </p>
            <a
              href={BROKER_CLAIMS_PHONE_HREF}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal"
            >
              Call {BROKER_CLAIMS_PHONE}
            </a>
            <p className="mt-4">
              <Link href="/contact/" className="text-sm text-gold hover:underline">
                Contact our office →
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

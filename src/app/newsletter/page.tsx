import type { Metadata } from "next";
import Header from "@/components/Header";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Newsletter | Premium Insurance Brokers",
  description:
    "Subscribe to insurance updates from Premium Insurance Brokers — Ontario coverage changes, client education, and practical risk-management information.",
};

const topics = [
  "Ontario insurance regulatory and market updates",
  "Coverage changes that may affect personal and commercial clients",
  "Brokerage and client education on common insurance questions",
  "Commercial insurance and risk-management considerations",
  "Practical tips for Windsor-Essex homeowners, drivers, and business owners",
];

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="newsletter-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="newsletter-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl"
                >
                  Insurance updates &amp; education
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Practical information from Premium Insurance Brokers — not
                  sales spam. We share what Ontario clients and business owners
                  should know about coverage, risk, and market changes.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-b border-border bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2 className="text-xl font-medium text-charcoal">
                What subscribers receive
              </h2>
              <ul className="mt-4 space-y-3">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex gap-2 text-[15px] leading-relaxed text-secondary"
                  >
                    <span className="text-gold-dark" aria-hidden>
                      •
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-secondary">
                We do not publish subscriber counts or guarantee a fixed sending
                schedule. Frequency depends on meaningful updates worth sharing.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <NewsletterSignup />
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

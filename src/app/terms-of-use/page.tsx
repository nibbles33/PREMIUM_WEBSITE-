// Pending professional legal review. This page is the Google Maps notice, not a complete insurance agreement.

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use | Premium Insurance Brokers",
  description:
    "Terms of Use for Premium Insurance Brokers, including the Google Maps features and content shown on this website.",
  path: "/terms-of-use/",
});

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="terms-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <h1
                  id="terms-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl sm:leading-[1.06]"
                >
                  Terms of Use
                </h1>
                <p className="mt-4 text-[15px] text-secondary sm:text-base">
                  Last updated: November 15, 2026
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-b border-border bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="space-y-6 text-[15px] leading-relaxed text-secondary sm:text-base">
                <p>
                  This page is pending professional legal review. It states how
                  Google Maps features and content are used on this website. It
                  is not a complete agreement for insurance products.
                </p>
                <p>
                  This website is operated by Premium Insurance Brokers, a
                  division of Oracle RMS, 3063 Dougall Ave., Windsor, Ontario
                  N9E 1S3.
                </p>
                <p>
                  This website includes Google Maps features and content,
                  including the rating and reviews shown for our business.
                </p>
                <p>
                  Use of Google Maps features and content is subject to the
                  then-current versions of the{" "}
                  <a
                    href="https://maps.google.com/help/terms_maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                  >
                    Google Maps End User Additional Terms of Service
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                  >
                    Google Privacy Policy
                  </a>
                  .
                </p>
                <p>
                  If you misuse Google Maps features or content on this
                  website, we may suspend or end your access to those features.
                </p>
                <p>
                  How we handle personal information is described in our{" "}
                  <Link
                    href="/privacy-policy/"
                    className="text-charcoal underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

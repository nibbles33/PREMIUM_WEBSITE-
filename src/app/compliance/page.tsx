import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  brokerCompensationParagraphs,
  commissionRows,
  complianceLinks,
} from "@/data/compliance";

export const metadata: Metadata = {
  title: "Compliance | Premium Insurance Brokers",
  description:
    "Broker compensation disclosure for Premium Insurance Brokers — commission schedule by insurer and product class, plus RIBO and industry conduct links.",
};

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="compliance-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <h1
                  id="compliance-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl sm:leading-[1.06]"
                >
                  Compliance
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base">
                  How we&apos;re compensated — and the disclosures that keep our
                  advice transparent.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-labelledby="broker-compensation-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="max-w-3xl">
                <h2
                  id="broker-compensation-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  Broker Compensation
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-secondary sm:mt-6 sm:text-base">
                  {brokerCompensationParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="mt-10 sm:mt-12">
              <div className="overflow-x-auto rounded-[14px] border border-border bg-offwhite/50 shadow-[0_8px_22px_rgba(32,39,40,0.05)]">
                <table className="min-w-[640px] w-full border-collapse text-left text-[13px] sm:text-[14px]">
                  <caption className="sr-only">
                    Commission schedule by insurer and product class
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-charcoal text-white">
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold sm:px-5"
                      >
                        Companies
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold sm:px-5"
                      >
                        Property
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold sm:px-5"
                      >
                        Automobile
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold sm:px-5"
                      >
                        Commercial
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionRows.map((row, index) => (
                      <tr
                        key={row.company}
                        className={`border-b border-border/80 last:border-b-0 ${
                          index % 2 === 0 ? "bg-white" : "bg-offwhite/80"
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-charcoal sm:px-5"
                        >
                          {row.company}
                        </th>
                        <td className="px-4 py-3 text-secondary sm:px-5">
                          {row.property}
                        </td>
                        <td className="px-4 py-3 text-secondary sm:px-5">
                          {row.automobile}
                        </td>
                        <td className="px-4 py-3 text-secondary sm:px-5">
                          {row.commercial}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="compliance-links-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="compliance-links-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Links
              </h2>
              <ul className="mt-6 max-w-2xl space-y-3">
                {complianceLinks.map((link) => (
                  <li key={link.href}>
                    {"internal" in link && link.internal ? (
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-[15px] font-medium text-charcoal transition-colors hover:text-gold-dark"
                      >
                        {link.label}
                        <span aria-hidden className="text-gold-dark">
                          →
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[15px] font-medium text-charcoal transition-colors hover:text-gold-dark"
                      >
                        {link.label}
                        <ExternalLink
                          className="h-3.5 w-3.5 text-gold-dark"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

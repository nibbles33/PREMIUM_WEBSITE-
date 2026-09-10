import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Scale,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Resources | Premium Insurance Brokers",
  description:
    "Insurance resources for Premium Insurance Brokers clients — claims guidance, payments, compliance, privacy, newsletter, and broker contact.",
};

const resourceCards = [
  {
    title: "Claims",
    description: "Report a loss, find your carrier's claims contact, and understand first steps.",
    href: "/claims/",
    icon: Shield,
  },
  {
    title: "Make a Payment",
    description: "Pay your premium through your insurance carrier's secure portal.",
    href: "/payment/",
    icon: CreditCard,
  },
  {
    title: "Compliance",
    description: "Commission disclosure and regulatory information for Ontario clients.",
    href: "/compliance/",
    icon: Scale,
  },
  {
    title: "Privacy Policy",
    description: "How Premium Insurance Brokers collects, uses, and protects your information.",
    href: "/privacy-policy/",
    icon: FileText,
  },
  {
    title: "Newsletter",
    description: "Ontario insurance updates, coverage changes, and practical risk-management tips.",
    href: "/newsletter/",
    icon: Mail,
  },
  {
    title: "Talk to a Broker",
    description: "Speak with a licensed broker about coverage, renewals, or policy questions.",
    href: "/talk-to-a-broker/",
    icon: Phone,
  },
  {
    title: "Contact Us",
    description: "Office hours, location, and direct contact for Premium Insurance Brokers.",
    href: "/contact/",
    icon: Phone,
  },
  {
    title: "Insurance Articles",
    description: "Practical guides and educational content — more articles coming soon.",
    href: "/resources/#articles",
    icon: BookOpen,
  },
] as const;

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="resources-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="resources-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl"
                >
                  Resources
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Client tools, regulatory information, and insurance education
                  from Premium Insurance Brokers.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16"
          aria-label="Resource links"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resourceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <li key={card.href + card.title}>
                    <RevealOnScroll>
                      <Link
                        href={card.href}
                        className="group flex h-full flex-col rounded-xl border border-border bg-offwhite/60 p-6 transition-colors hover:border-gold/50 hover:bg-offwhite"
                      >
                        <Icon
                          className="h-6 w-6 text-gold-dark"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <h2 className="mt-4 text-lg font-medium text-charcoal group-hover:text-gold-dark">
                          {card.title}
                        </h2>
                        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">
                          {card.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark">
                          Learn more
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </RevealOnScroll>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          id="articles"
          className="border-b border-border bg-offwhite py-14 sm:py-16"
          aria-labelledby="articles-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <RevealOnScroll>
              <h2
                id="articles-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal"
              >
                Insurance articles
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                Educational articles and Ontario insurance guides will appear
                here as they are published. Subscribe to our{" "}
                <Link href="/newsletter/" className="font-medium text-gold-dark hover:underline">
                  newsletter
                </Link>{" "}
                for updates, or{" "}
                <Link href="/contact/" className="font-medium text-gold-dark hover:underline">
                  contact a broker
                </Link>{" "}
                with specific questions.
              </p>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

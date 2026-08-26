import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Meet the Team | Premium Insurance Brokers",
  description:
    "Meet the licensed brokers and staff behind Premium Insurance Brokers in Windsor-Essex.",
};

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";
const TEAM_EMAIL = "mailto:info@premiumib.com";
const TEAM_PHONE = "tel:+12267826000";

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="team-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="team-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl sm:leading-[1.06]"
                >
                  Meet the Team
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base">
                  The licensed brokers and staff behind Premium Insurance
                  Brokers.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-label="Team members"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  <RevealOnScroll>
                    <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-offwhite/60 shadow-[0_8px_22px_rgba(32,39,40,0.05)]">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#eceae4]">
                        <Image
                          src={member.photo}
                          alt={member.photoAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-dark">
                          {member.title}
                        </p>
                        <h2 className="mt-1.5 text-lg font-medium tracking-tight text-charcoal">
                          {member.name}
                        </h2>
                        <div className="mt-4 flex gap-2">
                          <a
                            href={TEAM_EMAIL}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-secondary transition-colors hover:border-gold hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                            aria-label={`Email ${member.name} via info@premiumib.com`}
                          >
                            <Mail className="h-4 w-4" strokeWidth={1.5} />
                          </a>
                          <a
                            href={TEAM_PHONE}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-secondary transition-colors hover:border-gold hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                            aria-label={`Call main line for ${member.name}`}
                          >
                            <Phone className="h-4 w-4" strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    </article>
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="team-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="team-cta-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  Ready to work with a real broker?
                </h2>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  <Link
                    href={QUOTE_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[200px]"
                  >
                    Get a Quote
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={BROKER_HREF}
                    className="inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md border border-white/25 bg-transparent px-6 text-[15px] font-medium text-white transition-colors hover:border-gold hover:text-gold sm:w-auto sm:min-w-[200px]"
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

import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import PageHeroPhoto from "@/components/PageHeroPhoto";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getPageHeroPhotography } from "@/data/photography";

export const metadata: Metadata = {
  title: "Contact Us | Premium Insurance Brokers",
  description:
    "Contact Premium Insurance Brokers at 3063 Dougall Ave, Windsor — call 226-782-6000 or email info@premiumib.com.",
};

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

export default function ContactPage() {
  const heroPhoto = getPageHeroPhotography("contact");

  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="contact-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div
                className={
                  heroPhoto
                    ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12"
                    : undefined
                }
              >
                <div className="max-w-2xl">
                  <h1
                    id="contact-hero-heading"
                    className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl sm:leading-[1.06]"
                  >
                    Contact Us
                  </h1>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base">
                    Reach a real broker in Windsor-Essex — by phone, email, or the
                    form below.
                  </p>
                </div>
                {heroPhoto ? <PageHeroPhoto placement={heroPhoto} priority /> : null}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-b border-border bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div>
                <h2 className="text-xl font-medium tracking-tight text-charcoal sm:text-2xl">
                  Our office
                </h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-secondary">
                        Address
                      </p>
                      <p className="mt-1 text-[15px] leading-relaxed text-charcoal">
                        3063 Dougall Ave
                        <br />
                        Windsor, ON N9E 1S7
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-secondary">
                        Phone
                      </p>
                      <a
                        href="tel:+12267826000"
                        className="mt-1 inline-block text-[15px] font-medium text-charcoal transition-colors hover:text-gold-dark"
                      >
                        226-782-6000
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-secondary">
                        Email
                      </p>
                      <a
                        href="mailto:info@premiumib.com"
                        className="mt-1 inline-block text-[15px] font-medium text-charcoal transition-colors hover:text-gold-dark"
                      >
                        info@premiumib.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div>
                <h2 className="mb-5 text-xl font-medium tracking-tight text-charcoal sm:text-2xl">
                  Send a message
                </h2>
                <ContactForm />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="contact-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="contact-cta-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  Prefer to talk it through?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65 sm:text-base">
                  Get a quote online or speak with a broker who knows
                  Windsor-Essex.
                </p>
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

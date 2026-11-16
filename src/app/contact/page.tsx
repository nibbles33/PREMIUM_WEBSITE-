import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import OfficeMap from "@/components/contact/OfficeMap";
import Header from "@/components/Header";
import JsonLd from "@/components/seo/JsonLd";
import {
  normalizeContactInquiry,
  type ContactInquiry,
} from "@/lib/contact/validate";
import { contactPageStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Premium Insurance Brokers",
  description:
    "Contact Premium Insurance Brokers at 3063 Dougall Ave, Windsor — call 226-782-6000 or email info@premiumib.com.",
  path: "/contact/",
});

const QUOTE_HREF = "/get-a-quote/";
/** Outbound Google Maps link. Not a billed Maps API request. */
const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=3063+Dougall+Ave,+Windsor,+ON+N9E+1S3";

type ContactPageProps = {
  searchParams: Promise<{ intent?: string; inquiry?: string }>;
};

function resolveContactHero(intent?: string, inquiry: ContactInquiry = "general") {
  if (inquiry === "life") {
    return {
      title: "Start a Life Inquiry",
      lead:
        "Tell us a bit about what you are exploring — Premium will coordinate your connection with a licensed life-insurance professional through Oracle/head office.",
      formHeading: "Life insurance inquiry",
      hideQuoteCta: true,
    };
  }
  if (inquiry === "group") {
    return {
      title: "Start a Group Inquiry",
      lead:
        "Tell us whether you represent an employer, association, or member — Premium will coordinate specialist access through Oracle/head office.",
      formHeading: "Group home & auto inquiry",
      hideQuoteCta: true,
    };
  }
  if (intent === "broker") {
    return {
      title: "Talk to a Broker",
      lead:
        "Reach a licensed broker in Windsor-Essex — by phone, email, or the form.",
      formHeading: "Send a message to our team",
      hideQuoteCta: false,
    };
  }
  return {
    title: "Contact Us",
    lead:
      "Reach a real broker in Windsor-Essex — by phone, email, or the form.",
    formHeading: "Send a message",
    hideQuoteCta: false,
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { intent, inquiry: rawInquiry } = await searchParams;
  const inquiry = normalizeContactInquiry(rawInquiry);
  const hero = resolveContactHero(intent, inquiry);

  return (
    <>
      <JsonLd data={contactPageStructuredData()} />
      <Header />
      <main>
        <section
          className="border-b border-border bg-[#E7E0D2]"
          aria-labelledby="contact-hero-heading"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-5 lg:px-8 lg:py-6 xl:max-w-7xl">
              <article className="order-1">
                <div className="rounded-[18px] border border-border bg-white px-5 py-5 shadow-[0_16px_40px_rgba(32,39,40,0.14)] sm:px-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                    Windsor-Essex office
                  </p>
                  <h1
                    id="contact-hero-heading"
                    className="mt-2 text-[1.85rem] font-medium leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-[2.15rem]"
                  >
                    {hero.title}
                  </h1>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-secondary sm:text-[15px]">
                    {hero.lead}
                  </p>

                  <ul className="mt-3 space-y-2 border-t border-border/80 pt-3">
                    <li className="flex gap-3">
                      <MapPin
                        className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-secondary">
                          Address
                        </p>
                        <p className="mt-0.5 text-[15px] leading-snug text-charcoal">
                          3063 Dougall Ave
                          <br />
                          Windsor, ON N9E 1S3
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
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-secondary">
                          Phone
                        </p>
                        <a
                          href="tel:+12267826000"
                          className="mt-0.5 inline-flex min-h-11 items-center text-[15px] font-medium text-charcoal hover:text-gold-dark"
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
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-secondary">
                          Email
                        </p>
                        <a
                          href="mailto:info@premiumib.com"
                          className="mt-0.5 inline-flex min-h-11 items-center text-[15px] font-medium text-charcoal hover:text-gold-dark"
                        >
                          info@premiumib.com
                        </a>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a
                      href={DIRECTIONS_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track-location="contact"
                      className="btn-primary btn-primary-gradient inline-flex h-12 min-h-11 scroll-mb-72 items-center justify-center rounded-md px-5 text-[15px] font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal lg:scroll-mb-32"
                    >
                      Get directions to 3063 Dougall Ave
                      <span aria-hidden className="ml-2">
                        →
                      </span>
                    </a>
                    {hero.hideQuoteCta ? null : (
                      <Link
                        href={QUOTE_HREF}
                        className="inline-flex h-12 min-h-11 items-center justify-center rounded-md border border-border px-5 text-[15px] font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        Get a quote
                      </Link>
                    )}
                  </div>
                </div>
              </article>

            <OfficeMap />

            <div className="order-2 lg:order-3 lg:col-span-2">
              <h2 className="mb-3 text-xl font-medium tracking-tight text-charcoal sm:text-[1.35rem]">
                {hero.formHeading}
              </h2>
              <ContactForm inquiry={inquiry} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

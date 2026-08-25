import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import { allPartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Our Partners | PremiumIB",
  description:
    "We work with Canada's leading insurers and specialty underwriters to find you the right coverage.",
};

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="partners-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="partners-heading"
                  className="text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl"
                >
                  Our Partners
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  We work with Canada&apos;s leading insurers and specialty
                  underwriters to find you the right coverage — not just the
                  first quote.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="mt-12 sm:mt-14">
              <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
                {allPartners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-16 items-center justify-center rounded-md bg-white px-3 py-2 sm:h-20 sm:px-4"
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={180}
                      height={72}
                      className="max-h-11 w-auto max-w-full object-contain opacity-85 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:max-h-14"
                    />
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

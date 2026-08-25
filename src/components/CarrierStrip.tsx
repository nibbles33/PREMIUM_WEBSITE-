import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { homepageCarriers } from "@/data/partners";

export default function CarrierStrip() {
  return (
    <section
      className="border-t border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="carriers-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="carriers-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Backed by Canada&apos;s leading insurers
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              Access multiple markets through one independent broker.{" "}
              <Link
                href="/partners/"
                className="font-medium text-gold-dark underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                See all partners
              </Link>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 md:grid-cols-5 lg:gap-x-10">
            {homepageCarriers.map((carrier) => (
              <li
                key={carrier.name}
                className="flex h-14 items-center justify-center sm:h-16"
              >
                <Image
                  src={carrier.src}
                  alt={carrier.alt}
                  width={180}
                  height={64}
                  className="max-h-10 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:max-h-12 sm:max-w-[160px]"
                />
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}

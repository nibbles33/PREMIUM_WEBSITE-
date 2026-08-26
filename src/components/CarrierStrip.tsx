import Image from "next/image";
import Link from "next/link";
import { homepageCarriers } from "@/data/partners";

function CarrierLogo({
  name,
  src,
  alt,
  focusable = true,
}: {
  name: string;
  src: string;
  alt: string;
  focusable?: boolean;
}) {
  return (
    <li className="flex h-14 shrink-0 items-center justify-center px-6 sm:h-16 sm:px-8 lg:px-10">
      <Link
        href="/partners/"
        tabIndex={focusable ? 0 : -1}
        className="inline-flex items-center justify-center rounded-sm outline-offset-4 transition-[filter,opacity] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        aria-label={`${name} — see all partners`}
      >
        <Image
          src={src}
          alt={alt}
          width={180}
          height={64}
          className="max-h-10 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:max-h-12 sm:max-w-[160px]"
        />
      </Link>
    </li>
  );
}

function CarrierLogoRow({
  focusable,
  ariaHidden,
}: {
  focusable: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="carrier-marquee-segment flex shrink-0 list-none items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {homepageCarriers.map((carrier) => (
        <CarrierLogo
          key={`${ariaHidden ? "dup" : "a"}-${carrier.name}`}
          name={carrier.name}
          src={carrier.src}
          alt={carrier.alt}
          focusable={focusable}
        />
      ))}
    </ul>
  );
}

export default function CarrierStrip() {
  return (
    <section
      className="border-t border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="carriers-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="carriers-heading"
            className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
          >
            One broker. Multiple markets.
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
      </div>

      {/* Continuous marquee — hidden under prefers-reduced-motion */}
      <div
        className="carrier-marquee mt-10 sm:mt-12"
        aria-label="Insurance carrier partners"
      >
        <div className="carrier-marquee-track">
          <CarrierLogoRow focusable />
          <CarrierLogoRow focusable={false} ariaHidden />
        </div>
      </div>

      {/* Static grid — shown only under prefers-reduced-motion */}
      <ul className="carrier-static-grid mx-auto mt-10 grid max-w-6xl list-none grid-cols-2 gap-x-6 gap-y-8 px-4 sm:mt-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 sm:px-6 md:grid-cols-5 lg:gap-x-10 lg:px-8 xl:max-w-7xl">
        {homepageCarriers.map((carrier) => (
          <li
            key={`static-${carrier.name}`}
            className="flex h-14 items-center justify-center sm:h-16"
          >
            <Link
              href="/partners/"
              className="inline-flex items-center justify-center rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label={`${carrier.name} — see all partners`}
            >
              <Image
                src={carrier.src}
                alt={carrier.alt}
                width={180}
                height={64}
                className="max-h-10 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:max-h-12 sm:max-w-[160px]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

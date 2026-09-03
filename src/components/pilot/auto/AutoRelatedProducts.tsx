"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { autoRelatedProducts } from "@/data/pilot-auto";
import {
  getPageHeroPhotography,
  PILOT_AUTO_RELATED_IMAGE,
} from "@/data/photography";

export default function AutoRelatedProducts() {
  return (
    <section
      className="border-b border-border bg-[#FBF5E5] py-10 sm:py-12 lg:py-14"
      aria-labelledby="pilot-auto-related-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="max-w-xl">
            <h2
              id="pilot-auto-related-heading"
              className="text-xl font-medium tracking-[-0.02em] text-charcoal sm:text-2xl"
            >
              A lot to protect? Good thing we have options.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
              Auto is just one piece. Explore other personal coverage from
              Premium.
            </p>
          </div>
        </RevealOnScroll>

        <div className="pilot-auto-related-rail mt-6">
          <ul className="pilot-auto-related-track pilot-scroll-hide">
            {autoRelatedProducts.map((item) => {
              const photo = getPageHeroPhotography(item.photoSlug);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className="pilot-auto-related-card group block w-[140px] overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_8px_22px_rgba(32,39,40,0.07)] transition-[border-color,box-shadow,transform] duration-200 hover:border-gold/45 hover:shadow-[0_12px_28px_rgba(208,173,38,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-[168px]"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes={PILOT_AUTO_RELATED_IMAGE.sizes}
                          quality={PILOT_AUTO_RELATED_IMAGE.quality}
                          loading="lazy"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    </div>
                    <p className="px-3 py-2.5 text-[13px] font-medium text-charcoal group-hover:text-gold-dark sm:text-[14px]">
                      {item.label}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

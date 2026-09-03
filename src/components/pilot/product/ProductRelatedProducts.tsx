"use client";

import Image from "next/image";
import Link from "next/link";
import RelatedProductsScrollRail from "@/components/pilot/RelatedProductsScrollRail";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getPageHeroPhotography,
  PILOT_AUTO_RELATED_IMAGE,
} from "@/data/photography";
import type { ProductRelatedItem } from "@/types/pilot-product";

type ProductRelatedProductsProps = {
  heading: string;
  intro: string;
  products: ProductRelatedItem[];
};

export default function ProductRelatedProducts({
  heading,
  intro,
  products,
}: ProductRelatedProductsProps) {
  return (
    <section
      className="border-b border-border bg-[#FBF5E5] py-12 sm:py-14 lg:py-16"
      aria-labelledby="pilot-product-related-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="max-w-xl lg:max-w-2xl">
            <h2
              id="pilot-product-related-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-[1.65rem] lg:text-3xl"
            >
              {heading}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px] lg:text-base">
              {intro}
            </p>
          </div>
        </RevealOnScroll>

        <RelatedProductsScrollRail variant="product" className="mt-8 sm:mt-10 lg:mt-12">
            {products.map((item) => {
              const photo = getPageHeroPhotography(item.photoSlug);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className="pilot-product-related-card group block w-[220px] overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_10px_28px_rgba(32,39,40,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-gold/45 hover:shadow-[0_16px_36px_rgba(208,173,38,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-[260px] lg:w-[340px]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes={PILOT_AUTO_RELATED_IMAGE.sizes}
                          quality={PILOT_AUTO_RELATED_IMAGE.quality}
                          loading="lazy"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] to-[#E5E3DC]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                      <p className="absolute bottom-3 left-3.5 text-lg font-medium tracking-tight text-white sm:text-xl">
                        {item.label}
                      </p>
                    </div>
                    <p className="flex items-center justify-between px-4 py-3.5 text-[13px] font-medium text-gold-dark sm:text-[14px]">
                      <span>Explore coverage</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
        </RelatedProductsScrollRail>
      </div>
    </section>
  );
}

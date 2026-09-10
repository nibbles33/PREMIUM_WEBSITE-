"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import type { ConsiderationItem } from "@/components/LineInsurancePage";

type ProductConsiderationsProps = {
  items: ConsiderationItem[];
};

export default function ProductConsiderations({ items }: ProductConsiderationsProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-product-considerations-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-product-considerations-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Practical considerations
            </h2>
          </div>
        </RevealOnScroll>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {items.map((item) => (
            <li key={item.title}>
              <RevealOnScroll className="h-full">
                <div className="h-full rounded-xl border border-border bg-offwhite p-6 sm:p-7">
                  <h3 className="text-lg font-medium text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

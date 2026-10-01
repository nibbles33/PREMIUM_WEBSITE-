"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import ProductConsiderationsExpandable from "@/components/pilot/product/ProductConsiderationsExpandable";
import type { ConsiderationItem } from "@/components/LineInsurancePage";

type ProductConsiderationsProps = {
  items: ConsiderationItem[];
  /** @default "grid" — static card grid. Use "expandable" for accordion cards. */
  variant?: "grid" | "expandable";
};

export default function ProductConsiderations({
  items,
  variant = "grid",
}: ProductConsiderationsProps) {
  if (items.length === 0) return null;

  if (variant === "expandable") {
    return <ProductConsiderationsExpandable items={items} />;
  }

  return (
    <section
      className="border-b border-border bg-white py-12 sm:py-14 lg:py-[4.25rem]"
      aria-labelledby="pilot-product-considerations-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="pilot-product-considerations-heading"
              className="text-[1.65rem] font-medium tracking-[-0.025em] text-charcoal sm:text-[1.9rem] lg:text-[2.15rem]"
            >
              Practical considerations
            </h2>
          </div>
        </RevealOnScroll>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          {items.map((item) => (
            <li key={item.title}>
              <RevealOnScroll className="h-full">
                <div className="h-full rounded-xl border border-border bg-offwhite p-5 sm:p-6 lg:p-7">
                  <h3 className="text-[1.0625rem] font-medium text-charcoal sm:text-lg">
                    {item.title}
                  </h3>
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

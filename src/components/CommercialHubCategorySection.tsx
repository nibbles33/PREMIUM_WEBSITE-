import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { ProductCoverageItem } from "@/types/pilot-product";

type CommercialHubCategorySectionProps = {
  heading?: string;
  intro: string;
  categories: ProductCoverageItem[];
};

export default function CommercialHubCategorySection({
  heading = "Core commercial coverage categories",
  intro,
  categories,
}: CommercialHubCategorySectionProps) {
  return (
    <section
      className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="commercial-hub-categories-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="commercial-hub-categories-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              {heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              {intro}
            </p>
          </div>
        </RevealOnScroll>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const href = category.href ?? "#";
            return (
              <li key={category.id}>
                <RevealOnScroll className="h-full">
                  <Link
                    href={href}
                    className="group flex h-full flex-col border border-border bg-white px-4 py-4 transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:border-gold hover:shadow-[0_10px_28px_rgba(32,39,40,0.08)] sm:px-5 sm:py-5"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,#5A8A73_14%,#FAFAF8)]">
                      <Icon
                        className="h-5 w-5 text-[#5A8A73]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="mt-3 block text-[15px] font-medium text-charcoal">
                      {category.title}
                    </span>
                    <span className="mt-2 block flex-1 text-[13px] leading-relaxed text-secondary">
                      {category.description}
                    </span>
                    <span className="mt-3 block text-[12px] font-medium text-gold-dark">
                      Learn more →
                    </span>
                  </Link>
                </RevealOnScroll>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

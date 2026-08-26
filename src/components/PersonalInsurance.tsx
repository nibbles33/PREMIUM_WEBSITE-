"use client";

import Link from "next/link";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  DEFAULT_PERSONAL_CATEGORY,
  getPersonalCategory,
  personalCategories,
  type PersonalCategoryId,
} from "@/data/personal-categories";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PANEL_MS = 280;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function PersonalInsurance() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeId, setActiveId] = useState<PersonalCategoryId>(
    DEFAULT_PERSONAL_CATEGORY,
  );
  const [panelVisible, setPanelVisible] = useState(true);

  const activeCategory = getPersonalCategory(activeId);
  const productCount = activeCategory.products.length;

  const selectCategory = useCallback(
    (id: PersonalCategoryId) => {
      if (id === activeId) return;

      if (reduceMotion) {
        setActiveId(id);
        setPanelVisible(true);
        return;
      }

      setPanelVisible(false);
      window.setTimeout(() => {
        setActiveId(id);
        setPanelVisible(true);
      }, PANEL_MS * 0.45);
    },
    [activeId, reduceMotion],
  );

  const onCategoryKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % personalCategories.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next =
        (index - 1 + personalCategories.length) % personalCategories.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = personalCategories.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCategory(personalCategories[index].id);
      return;
    } else {
      return;
    }
    categoryRefs.current[next]?.focus();
  };

  const panelTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${PANEL_MS}ms ease-out, transform ${PANEL_MS}ms ${EASE}`,
      };

  return (
    <section
      className="border-t border-border py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#FBF5E5" }}
      aria-labelledby="personal-insurance-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="personal-insurance-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              What do you want to protect?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              From your daily driver to your weekend toys — tell us what
              matters, and we&apos;ll point you to the right coverage.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12">
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            role="tablist"
            aria-label="Personal insurance categories"
          >
            {personalCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = category.id === activeId;

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-cat-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectCategory(category.id)}
                  onKeyDown={(event) => onCategoryKeyDown(event, index)}
                  className="personal-cat-btn group flex min-h-[88px] flex-col items-center justify-center gap-2.5 rounded-[14px] border px-3 py-4 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:min-h-[100px] sm:px-4 sm:py-5"
                  style={
                    {
                      "--cat-accent": category.accent,
                      borderColor: isActive
                        ? `color-mix(in srgb, ${category.accent} 55%, #202728)`
                        : "var(--brand-border, #E5E2DA)",
                      backgroundColor: isActive
                        ? `color-mix(in srgb, ${category.accent} 18%, #FAFAF8)`
                        : "#FAFAF8",
                      boxShadow: isActive
                        ? `0 10px 24px color-mix(in srgb, ${category.accent} 18%, transparent)`
                        : "none",
                      transition: reduceMotion
                        ? "none"
                        : "background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out",
                    } as CSSProperties
                  }
                >
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md sm:h-11 sm:w-11"
                    style={{
                      backgroundColor: isActive
                        ? category.badgeBg
                        : "color-mix(in srgb, #202728 4%, #FAFAF8)",
                      border: isActive
                        ? `1px solid color-mix(in srgb, ${category.accent} 28%, transparent)`
                        : "1px solid transparent",
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: isActive ? category.accent : "#6B7280",
                      }}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <span
                    className={`block text-[13px] font-medium leading-tight sm:text-sm ${
                      isActive ? "text-charcoal" : "text-secondary"
                    }`}
                  >
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-4 sm:mt-5">
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-cat-${activeId}`}
            aria-live="polite"
            className="overflow-hidden rounded-[18px] border border-border bg-white/90 p-4 shadow-[0_12px_28px_rgba(32,39,40,0.06)] sm:p-5 lg:p-6"
            style={{
              backgroundColor: activeCategory.panelWash,
              borderColor: `color-mix(in srgb, ${activeCategory.accent} 22%, #E5E2DA)`,
            }}
          >
            <div
              className={
                panelVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }
              style={panelTransition}
            >
              <p className="sr-only">
                {activeCategory.label}: {productCount}{" "}
                {productCount === 1 ? "option" : "options"}
              </p>

              <ul
                className={`grid grid-cols-1 gap-3 sm:gap-4 ${
                  productCount === 1
                    ? "sm:max-w-md"
                    : productCount === 2
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-3"
                }`}
              >
                {activeCategory.products.map((product) => {
                  const ProductIcon = product.icon;
                  return (
                    <li key={`${activeId}-${product.label}`}>
                      <Link
                        href={product.href}
                        className="personal-product-card group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--product-accent)_42%,#E5E2DA)] hover:shadow-[0_10px_24px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-5"
                        style={
                          {
                            ["--product-accent" as string]:
                              activeCategory.accent,
                          } as CSSProperties
                        }
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                            style={{
                              backgroundColor: activeCategory.badgeBg,
                            }}
                          >
                            <ProductIcon
                              className="h-5 w-5"
                              style={{ color: activeCategory.accent }}
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[15px] font-medium text-charcoal sm:text-base">
                              {product.label}
                            </span>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary sm:text-[14px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                        <span
                          className="mt-4 inline-flex items-center text-[13px] font-medium transition-colors"
                          style={{ color: activeCategory.accent }}
                        >
                          {product.cta}
                          <span
                            aria-hidden
                            className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

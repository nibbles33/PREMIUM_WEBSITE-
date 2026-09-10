"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import type { ProductBrokerStep } from "@/types/pilot-product";

type ProductBrokerStoryProps = {
  steps: ProductBrokerStep[];
};

export default function ProductBrokerStory({ steps }: ProductBrokerStoryProps) {
  return (
    <section
      className="pilot-product-broker-section border-b border-border bg-[#F3EBD4] py-16 sm:py-20 lg:py-24"
      aria-labelledby="pilot-product-broker-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center lg:max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold-dark">
              The Premium difference
            </p>
            <h2
              id="pilot-product-broker-heading"
              className="mt-3 text-[1.75rem] font-medium leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl lg:text-[2.75rem]"
            >
              Why a broker?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base lg:text-lg">
              One relationship. Multiple markets. Coverage explained in plain language.
            </p>
          </div>
        </RevealOnScroll>

        <div className="pilot-product-broker-flow mt-12 lg:mt-14">
          <svg
            className="pilot-product-broker-path"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="productBrokerPathGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b8940f" stopOpacity="0.15" />
                <stop offset="20%" stopColor="#d0ad26" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#e4c558" stopOpacity="1" />
                <stop offset="80%" stopColor="#d0ad26" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#b8940f" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M 20 12 H 980"
              stroke="url(#productBrokerPathGold)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="pilot-product-broker-steps">
            {steps.map((step, index) => (
              <RevealOnScroll key={step.id}>
                <li className="pilot-product-broker-step">
                  <span className="pilot-product-broker-node">{index + 1}</span>
                  <h3 className="pilot-product-broker-step-title">{step.label}</h3>
                  <p className="pilot-product-broker-step-detail">{step.detail}</p>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import { autoBrokerSteps } from "@/data/pilot-auto";

export default function AutoBrokerStory() {
  return (
    <section
      className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-auto-broker-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-auto-broker-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Why a broker?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              One relationship. Multiple markets. Coverage explained in plain
              language.
            </p>
          </div>
        </RevealOnScroll>

        <ol className="pilot-auto-broker-flow mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {autoBrokerSteps.map((step, index) => (
            <RevealOnScroll key={step.id}>
              <li className="pilot-auto-broker-step relative flex h-full flex-col">
                {index < autoBrokerSteps.length - 1 ? (
                  <span className="pilot-auto-broker-connector" aria-hidden />
                ) : null}
                <span className="pilot-auto-broker-node">{index + 1}</span>
                <h3 className="mt-4 text-[15px] font-medium text-charcoal sm:text-base">
                  {step.label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary sm:text-[14px]">
                  {step.detail}
                </p>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}

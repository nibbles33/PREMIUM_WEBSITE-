const steps = [
  {
    number: 1,
    title: "Tell us what you need",
    description: "A short, guided form. No paperwork, no jargon.",
  },
  {
    number: 2,
    title: "We compare your options",
    description:
      "Your broker checks rates and coverage across our carrier partners.",
  },
  {
    number: 3,
    title: "You choose, we handle the rest",
    description: "Real advice, then we bind your policy and you're covered.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      className="border-t border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <h2
          id="how-it-works-heading"
          className="text-center text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
        >
          How it works
        </h2>

        <div className="relative mt-10 lg:mt-12">
          {/* Desktop connecting rule between step badges */}
          <div
            className="pointer-events-none absolute left-[calc(16.666%+1.25rem)] right-[calc(16.666%+1.25rem)] top-5 hidden h-px bg-border lg:block"
            aria-hidden
          />

          <ol className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            {steps.map((step, index) => (
              <li
                key={step.number}
                className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {index < steps.length - 1 ? (
                  <div
                    className="absolute left-5 top-10 bottom-[-2rem] w-px -translate-x-1/2 bg-border lg:hidden"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-offwhite text-sm font-medium text-charcoal lg:mx-auto">
                  {step.number}
                </div>
                <div className="min-w-0 pt-1 lg:mt-5 lg:pt-0">
                  <h3 className="text-base font-medium text-charcoal sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary sm:mt-2 sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

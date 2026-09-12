import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

/**
 * Editorial authority band under the hero.
 * Continuous proof strip — not SaaS metric cards.
 */
export default function PilotAuthorityStrip() {
  const { clients, combinedExperience, awards, oracle } = HOMEPAGE_AUTHORITY;

  const items = [
    {
      key: "clients",
      primary: clients.value,
      secondary: clients.label,
    },
    {
      key: "experience",
      primary: combinedExperience.value,
      secondary: "Years combined experience",
    },
    {
      key: "awards",
      primary: awards.value,
      secondary: awards.label,
    },
    {
      key: "oracle",
      primary: oracle.eyebrow,
      secondary: oracle.name,
      institutional: true,
    },
  ] as const;

  return (
    <section
      className="pilot-authority-strip border-b border-border bg-[#F7F1E4]"
      aria-label="Premium Insurance Brokers at a glance"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={`flex min-h-[110px] flex-col justify-center px-3 py-5 sm:min-h-[128px] sm:px-5 sm:py-6 lg:min-h-[140px] lg:px-6 ${
                index % 2 === 1 ? "border-l border-border/70" : ""
              } ${
                index >= 2 ? "border-t border-border/70 lg:border-t-0" : ""
              } ${index === 2 || index === 3 ? "lg:border-l lg:border-border/70" : ""}`}
            >
              {"institutional" in item && item.institutional ? (
                <>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-dark sm:text-[12px]">
                    {item.primary}
                  </p>
                  <p className="mt-1.5 text-[1.35rem] font-medium tracking-[-0.02em] text-charcoal sm:text-[1.55rem]">
                    {item.secondary}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[1.85rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.15rem] lg:text-[2.35rem]">
                    {item.primary}
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-secondary sm:text-[13px]">
                    {item.secondary}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

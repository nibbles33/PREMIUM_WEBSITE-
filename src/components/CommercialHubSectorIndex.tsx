import Link from "next/link";
import {
  Briefcase,
  Building2,
  Hammer,
  Hotel,
  Stethoscope,
  Store,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import {
  resolveCommercialHubSectors,
  type CommercialHubSectorId,
} from "@/data/commercial-hub-sectors";

const SECTOR_ICONS: Record<CommercialHubSectorId, LucideIcon> = {
  "construction-contractors": Hammer,
  manufacturing: Warehouse,
  "hospitality-restaurants": Hotel,
  "retail-grocery": Store,
  "transportation-trucking": Truck,
  "professional-services": Briefcase,
  "real-estate": Building2,
  "healthcare-wellness": Stethoscope,
  "specialty-community": Users,
};

const SECTOR_ACCENTS: Record<
  CommercialHubSectorId,
  { bar: string; chip: string; icon: string }
> = {
  "construction-contractors": {
    bar: "border-l-[#5A8A73]",
    chip: "bg-[color-mix(in_srgb,#5A8A73_16%,white)]",
    icon: "text-[#3E6B56]",
  },
  manufacturing: {
    bar: "border-l-gold",
    chip: "bg-[color-mix(in_srgb,#D0AD26_18%,white)]",
    icon: "text-gold-dark",
  },
  "hospitality-restaurants": {
    bar: "border-l-charcoal",
    chip: "bg-[color-mix(in_srgb,#202728_8%,white)]",
    icon: "text-charcoal",
  },
  "retail-grocery": {
    bar: "border-l-[#5A8A73]",
    chip: "bg-[color-mix(in_srgb,#5A8A73_16%,white)]",
    icon: "text-[#3E6B56]",
  },
  "transportation-trucking": {
    bar: "border-l-gold",
    chip: "bg-[color-mix(in_srgb,#D0AD26_18%,white)]",
    icon: "text-gold-dark",
  },
  "professional-services": {
    bar: "border-l-charcoal",
    chip: "bg-[color-mix(in_srgb,#202728_8%,white)]",
    icon: "text-charcoal",
  },
  "real-estate": {
    bar: "border-l-[#5A8A73]",
    chip: "bg-[color-mix(in_srgb,#5A8A73_16%,white)]",
    icon: "text-[#3E6B56]",
  },
  "healthcare-wellness": {
    bar: "border-l-gold",
    chip: "bg-[color-mix(in_srgb,#D0AD26_18%,white)]",
    icon: "text-gold-dark",
  },
  "specialty-community": {
    bar: "border-l-charcoal",
    chip: "bg-[color-mix(in_srgb,#202728_8%,white)]",
    icon: "text-charcoal",
  },
};

export default function CommercialHubSectorIndex() {
  const sectors = resolveCommercialHubSectors();
  if (sectors.length === 0) return null;

  return (
    <section
      className="border-b border-border bg-[color-mix(in_srgb,#5A8A73_7%,#FAFAF8)] py-8 sm:py-10"
      aria-labelledby="commercial-hub-sector-index-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <h2
          id="commercial-hub-sector-index-heading"
          className="text-xl font-medium tracking-[-0.02em] text-charcoal sm:text-2xl"
        >
          All commercial insurance
        </h2>
        <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-secondary sm:text-[15px]">
          Every commercial product page, grouped by industry. Open a page
          directly, or use the explorer above to browse by operation.
        </p>

        <ul className="mt-4 rounded-xl border border-border bg-white">
          {sectors.map((sector) => {
            const Icon = SECTOR_ICONS[sector.id];
            const accent = SECTOR_ACCENTS[sector.id];
            return (
              <li
                key={sector.id}
                className={`border-l-4 border-b border-border last:border-b-0 ${accent.bar} px-3 py-2.5 sm:px-4`}
              >
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[13.5rem_minmax(0,1fr)] sm:items-start sm:gap-4 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-center">
                  <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em] text-charcoal">
                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${accent.chip}`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${accent.icon}`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    {sector.title}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {sector.links.map((link) => (
                      <li key={link.href} className="max-w-full">
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 max-w-full items-center rounded-full border border-border bg-offwhite px-3 py-1.5 text-left text-[13px] font-medium leading-snug text-charcoal underline decoration-gold/40 underline-offset-2 transition-colors hover:border-gold hover:bg-white hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[14px]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import {
  Briefcase,
  Building2,
  Container,
  Factory,
  Hammer,
  HardHat,
  Route,
  Store,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CoverageCard } from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";

export const QUOTE_BUSINESS = "/get-a-quote?type=business";
export const QUOTE_COMMERCIAL_VEHICLES = "/get-a-quote?type=commercial-vehicles";
export const COMMERCIAL_ACCENT = "#5A8A73";

export type CommercialIndustryTile = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Dedicated page exists — show Learn more. Otherwise quote-flow affordance. */
  hasPage: boolean;
};

export const commercialIndustryTiles: CommercialIndustryTile[] = [
  {
    label: "Commercial Auto & Fleets",
    href: "/commercial-auto-insurance/",
    icon: Truck,
    hasPage: true,
  },
  {
    label: "Trucking",
    href: "/trucking-insurance/",
    icon: Route,
    hasPage: true,
  },
  {
    label: "Contractors",
    href: "/contractors-insurance/",
    icon: Hammer,
    hasPage: true,
  },
  {
    label: "Manufacturing",
    href: "/manufacturing-insurance/",
    icon: Factory,
    hasPage: true,
  },
  {
    label: "Commercial Property",
    href: "/commercial-property-insurance/",
    icon: Building2,
    hasPage: true,
  },
  {
    label: "Restaurants",
    href: "/restaurant-insurance/",
    icon: UtensilsCrossed,
    hasPage: true,
  },
  {
    label: "Professional Offices",
    href: QUOTE_BUSINESS,
    icon: Briefcase,
    hasPage: false,
  },
  {
    label: "Real Estate",
    href: QUOTE_BUSINESS,
    icon: Building2,
    hasPage: false,
  },
  {
    label: "Builders & Developers",
    href: QUOTE_BUSINESS,
    icon: HardHat,
    hasPage: false,
  },
  {
    label: "Retail",
    href: QUOTE_BUSINESS,
    icon: Store,
    hasPage: false,
  },
  {
    label: "Food Trucks & Trailers",
    href: QUOTE_BUSINESS,
    icon: UtensilsCrossed,
    hasPage: false,
  },
  {
    label: "Dump Trucks",
    href: QUOTE_BUSINESS,
    icon: Container,
    hasPage: false,
  },
];

export const commercialHubFaqs: FaqItem[] = [
  {
    question: "What's the difference between commercial and personal insurance?",
    answer:
      "Personal policies cover you, your home, and your personal vehicles. Commercial insurance is designed for business risks — liability tied to your operations, commercial vehicles, business property, employees, and income interruption. Mixing the two can leave gaps when a claim involves work activity.",
  },
  {
    question: "What is general liability insurance?",
    answer:
      "General liability helps protect your business if a third party claims bodily injury, property damage, or certain advertising injuries arising from your operations. It doesn't typically cover your own property, employee injuries, or professional advice — those usually need other policies.",
  },
  {
    question: "Do I need business interruption coverage?",
    answer:
      "Business interruption can help replace lost income and cover ongoing expenses if a covered property loss forces you to pause or slow operations. Whether you need it depends on how long you could absorb a shutdown. A broker can walk through realistic downtime scenarios for your industry.",
  },
  {
    question: "How is commercial insurance priced?",
    answer:
      "Carriers look at your industry, revenue or payroll, location, claims history, coverage limits, deductibles, and specific exposures (vehicles, property values, products, and contracts). Two similar businesses can still price differently based on those details.",
  },
  {
    question: "What information do I need for a commercial quote?",
    answer:
      "Expect questions about your business activities, years in operation, revenue or payroll, locations, vehicles or equipment, current coverage, and any recent claims. Contract requirements (certificates, additional insureds, or limit minimums) also help your broker match the right markets.",
  },
];

export const commercialBrokerCopy =
  "Independent advice across multiple commercial carriers — not one company's product shelf. Coverage explained in plain language, and real support if a claim happens.";

export type IndustryPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  quoteHref: string;
  quoteLabel: string;
  coverageIntro: string;
  coverageTypes: CoverageCard[];
  faqTitle: string;
  faqItems: FaqItem[];
  ctaHeading: string;
  ctaSubhead: string;
  serviceName: string;
};

export const industryPages: IndustryPageContent[] = [
  {
    slug: "commercial-auto-insurance",
    metaTitle:
      "Commercial Auto & Fleet Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial auto and fleet insurance through an independent Windsor-Essex broker — liability, physical damage, hired & non-owned auto, and multi-vehicle coverage.",
    headline: "Commercial Auto & Fleet Insurance",
    subhead:
      "Coverage for the vehicles that keep your business moving — from a single work truck to a full fleet.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Fleet Quote",
    coverageIntro:
      "Core coverages that protect business vehicles and the liability that comes with putting them on the road.",
    coverageTypes: [
      {
        title: "Liability Coverage",
        description:
          "Helps protect your business if a company vehicle causes injury or damage to others.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage Coverage",
        description:
          "Helps repair or replace your business vehicles after collision or comprehensive losses.",
        icon: Truck,
      },
      {
        title: "Hired & Non-Owned Auto",
        description:
          "Can cover liability when employees drive rented, borrowed, or personal vehicles for work.",
        icon: Route,
      },
      {
        title: "Fleet Discounts & Multi-Vehicle Management",
        description:
          "Structured coverage for multiple vehicles, with options that can simplify renewals and certificates.",
        icon: Container,
      },
    ],
    faqTitle: "Commercial auto FAQ",
    faqItems: [
      {
        question: "How is commercial auto different from personal auto?",
        answer:
          "Personal auto is for private use. Commercial auto is rated and worded for business use — work trucks, deliveries, client visits, and fleet exposures that personal policies often exclude or limit.",
      },
      {
        question: "Do I need coverage for vehicles I don't own?",
        answer:
          "Often yes. Hired and non-owned auto can address liability when staff drive rentals, borrowed units, or personal vehicles on company business. Exact needs depend on how your team uses vehicles.",
      },
      {
        question: "Can I insure a mixed fleet?",
        answer:
          "Yes. Many businesses insure a mix of light trucks, vans, and heavier units under one commercial auto structure. Your broker will match vehicles, drivers, and use to the right market.",
      },
      {
        question: "What information do I need for a fleet quote?",
        answer:
          "Vehicle lists (year, make, model, VIN), driver details, how each unit is used, radius of operation, and current coverage or claims history. That helps carriers price accurately.",
      },
    ],
    ctaHeading: "Ready to cover your fleet?",
    ctaSubhead:
      "Tell us about your vehicles and drivers — we'll compare options and explain what fits.",
    serviceName: "Commercial Auto & Fleet Insurance",
  },
  {
    slug: "trucking-insurance",
    metaTitle: "Trucking Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Trucking insurance for Windsor-Essex operators — cargo, liability, physical damage, and cross-border coverage through an independent broker.",
    headline: "Trucking Insurance",
    subhead:
      "Coverage built for Windsor-Essex's place on the busiest trucking corridor in Canada — cargo, liability, and cross-border protection.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Trucking Quote",
    coverageIntro:
      "Coverages commonly needed for for-hire and private trucking operations.",
    coverageTypes: [
      {
        title: "Cargo Insurance",
        description:
          "Helps protect freight you're responsible for while it's in transit under your care.",
        icon: Container,
      },
      {
        title: "Liability Coverage",
        description:
          "Addresses liability for injury or damage arising from your trucking operations.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage",
        description:
          "Helps repair or replace power units and trailers after covered collision or comprehensive losses.",
        icon: Truck,
      },
      {
        title: "Cross-Border Coverage",
        description:
          "Options that support operations moving between Canada and the U.S., subject to filings and carrier requirements.",
        icon: Route,
      },
    ],
    faqTitle: "Trucking insurance FAQ",
    faqItems: [
      {
        question: "Do I need cargo insurance separately from liability?",
        answer:
          "Usually yes. Liability covers injury and damage to others; cargo is about the freight itself. Shippers and brokers often require specific cargo limits in contracts.",
      },
      {
        question: "Does my policy cover cross-border US trips?",
        answer:
          "Only if it's arranged that way. Cross-border work can require specific filings, limits, and endorsements. Tell your broker your lanes and destinations so coverage matches how you haul.",
      },
      {
        question: "Owner-operator vs. fleet trucking insurance?",
        answer:
          "Owner-operators are typically rated on a single unit and their contracts. Fleets need broader structures for multiple units, drivers, and terminals. Both still need liability, physical damage, and often cargo.",
      },
      {
        question: "What information do I need for a trucking quote?",
        answer:
          "Equipment list, driver abstracts, radius and commodities hauled, years experience, current coverage, and any claims. Contract insurance requirements help too.",
      },
    ],
    ctaHeading: "Ready to cover your trucking operation?",
    ctaSubhead:
      "Tell us about your equipment, lanes, and cargo — we'll compare options that fit.",
    serviceName: "Trucking Insurance",
  },
  {
    slug: "contractors-insurance",
    metaTitle:
      "Contractors Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Contractors insurance through an independent Windsor-Essex broker — general liability, tools & equipment, builder's risk, and wrap-up liability.",
    headline: "Contractors Insurance",
    subhead:
      "Liability, tools, and project coverage for contractors and tradespeople.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Contractors Quote",
    coverageIntro:
      "Coverages that address job-site liability, equipment, and project risk.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against third-party injury or property damage claims tied to your contracting work.",
        icon: Briefcase,
      },
      {
        title: "Tools & Equipment Coverage",
        description:
          "Can cover owned tools and mobile equipment against theft or damage, subject to policy terms.",
        icon: Hammer,
      },
      {
        title: "Builder's Risk",
        description:
          "Protects a project under construction — materials and work in progress — against covered losses.",
        icon: HardHat,
      },
      {
        title: "Wrap-Up Liability",
        description:
          "Project-specific liability structures for larger builds where one policy covers multiple parties.",
        icon: Building2,
      },
    ],
    faqTitle: "Contractors insurance FAQ",
    faqItems: [
      {
        question: "Do subcontractors need their own liability insurance?",
        answer:
          "Usually yes. General contractors typically require subs to carry their own liability and provide certificates. Your broker can help set requirements that protect the job without creating gaps.",
      },
      {
        question: "Are my tools covered if stolen from a job site?",
        answer:
          "Only if you have tools or inland marine coverage that includes that location and scenario. Standard liability policies don't replace stolen tools. Limits, deductibles, and overnight storage rules matter.",
      },
      {
        question: "What is builder's risk insurance?",
        answer:
          "Builder's risk covers the structure and materials during construction or renovation for covered perils like fire or vandalism. It's usually arranged per project and is separate from your ongoing liability policy.",
      },
      {
        question: "Do I need proof of insurance for every job?",
        answer:
          "Many owners, GCs, and municipalities require certificates before you start. Your broker can issue certificates and add additional insured wording when contracts require it.",
      },
    ],
    ctaHeading: "Ready to cover your contracting work?",
    ctaSubhead:
      "Tell us about your trade, projects, and equipment — we'll compare options that fit.",
    serviceName: "Contractors Insurance",
  },
  {
    slug: "manufacturing-insurance",
    metaTitle:
      "Manufacturing Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Manufacturing insurance for Windsor-Essex — product liability, commercial property, business interruption, and equipment breakdown through an independent broker.",
    headline: "Manufacturing Insurance",
    subhead:
      "Property, product liability, and business interruption coverage for Windsor-Essex manufacturers.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Manufacturing Quote",
    coverageIntro:
      "Coverages that address products, facilities, equipment, and income after a covered loss.",
    coverageTypes: [
      {
        title: "Product Liability",
        description:
          "Helps protect against claims that a product you make or sell caused injury or damage.",
        icon: Briefcase,
      },
      {
        title: "Commercial Property",
        description:
          "Covers buildings, machinery, and stock against covered property losses.",
        icon: Factory,
      },
      {
        title: "Business Interruption",
        description:
          "Can help replace lost income and pay ongoing expenses if a covered property loss stops production.",
        icon: Building2,
      },
      {
        title: "Equipment Breakdown",
        description:
          "Addresses sudden mechanical or electrical breakdown of critical production equipment.",
        icon: Hammer,
      },
    ],
    faqTitle: "Manufacturing insurance FAQ",
    faqItems: [
      {
        question: "What is product liability insurance?",
        answer:
          "It helps if a third party claims your product caused bodily injury or property damage. It's especially important when you manufacture, assemble, or distribute goods under your brand.",
      },
      {
        question: "Does my policy cover equipment breakdown?",
        answer:
          "Not always. Standard property policies may exclude mechanical or electrical breakdown. Equipment breakdown coverage is often added specifically for boilers, compressors, CNC equipment, and similar assets.",
      },
      {
        question: "What happens if production stops due to a covered loss?",
        answer:
          "Business interruption coverage can help with lost profits and continuing expenses during a shutdown caused by a covered property peril. Waiting periods and indemnity periods apply — your broker can explain the details.",
      },
      {
        question: "Do I need separate coverage for inventory?",
        answer:
          "Inventory is often included under commercial property, but limits, valuation (cost vs. selling price), and locations matter. Seasonal stock spikes should be flagged so limits keep up.",
      },
    ],
    ctaHeading: "Ready to cover your manufacturing operation?",
    ctaSubhead:
      "Tell us about your facility, products, and equipment — we'll compare options that fit.",
    serviceName: "Manufacturing Insurance",
  },
  {
    slug: "commercial-property-insurance",
    metaTitle:
      "Commercial Property Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial property insurance through an independent Windsor-Essex broker — building, contents, business interruption, and additional operating expenses.",
    headline: "Commercial Property Insurance",
    subhead:
      "Protection for the building, contents, and income your business depends on.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Property Quote",
    coverageIntro:
      "Building blocks for protecting commercial premises and the income they generate.",
    coverageTypes: [
      {
        title: "Building Coverage",
        description:
          "Helps repair or rebuild the structure after covered damage such as fire or wind.",
        icon: Building2,
      },
      {
        title: "Contents & Equipment",
        description:
          "Protects furniture, stock, and business equipment against covered theft or damage.",
        icon: Store,
      },
      {
        title: "Business Interruption",
        description:
          "Can help replace lost income if a covered property loss forces a temporary closure.",
        icon: Briefcase,
      },
      {
        title: "Additional Operating Expenses",
        description:
          "Helps cover extra costs to keep operating — temporary space or equipment — after a covered loss.",
        icon: HardHat,
      },
    ],
    faqTitle: "Commercial property FAQ",
    faqItems: [
      {
        question: "What's the difference between building and contents coverage?",
        answer:
          "Building coverage is for the structure and permanently attached improvements. Contents covers movable business property — furniture, equipment, and stock. Tenants often need contents even when the landlord insures the building.",
      },
      {
        question: "Does commercial property cover business interruption?",
        answer:
          "Only if that coverage is included or added. Property coverage repairs physical damage; business interruption addresses income loss during the rebuild. Many businesses need both.",
      },
      {
        question: "Am I covered if I rent my space?",
        answer:
          "You typically need tenants' improvements and contents coverage, plus liability. The landlord's building policy usually doesn't cover your equipment, stock, or leasehold improvements.",
      },
      {
        question: "What information do I need for a property quote?",
        answer:
          "Address, construction details, year built, square footage, occupancy, values for building and contents, alarm/sprinkler info, and current coverage. Photos or a statement of values help on larger risks.",
      },
    ],
    ctaHeading: "Ready to protect your commercial property?",
    ctaSubhead:
      "Tell us about your building and contents — we'll compare options that fit.",
    serviceName: "Commercial Property Insurance",
  },
  {
    slug: "restaurant-insurance",
    metaTitle:
      "Restaurant Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Restaurant insurance through an independent Windsor-Essex broker — general liability, property, liquor liability, and equipment breakdown & spoilage.",
    headline: "Restaurant Insurance",
    subhead:
      "Coverage built around the realities of running a restaurant — from the kitchen to the dining room.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Restaurant Quote",
    coverageIntro:
      "Coverages that address guest liability, kitchen equipment, alcohol service, and spoilage risk.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against guest injury or property damage claims on your premises.",
        icon: Briefcase,
      },
      {
        title: "Property Coverage",
        description:
          "Covers your building improvements, furniture, and kitchen equipment against covered losses.",
        icon: Store,
      },
      {
        title: "Liquor Liability",
        description:
          "Addresses liability arising from serving alcohol — often required if you have a liquor license.",
        icon: UtensilsCrossed,
      },
      {
        title: "Equipment Breakdown & Spoilage",
        description:
          "Can cover sudden equipment failure and resulting food spoilage, subject to policy terms.",
        icon: Factory,
      },
    ],
    faqTitle: "Restaurant insurance FAQ",
    faqItems: [
      {
        question: "Do I need liquor liability if I serve alcohol?",
        answer:
          "Usually yes. General liability often excludes or limits liquor-related claims. Liquor liability is designed for establishments that sell or serve alcohol and is commonly required by landlords and licensing bodies.",
      },
      {
        question: "Is food spoilage from a power outage covered?",
        answer:
          "Sometimes — often through spoilage or equipment breakdown endorsements, not the base property form alone. Coverage depends on the cause of the outage and your policy wording.",
      },
      {
        question: "Do I need coverage for delivery drivers?",
        answer:
          "If staff deliver in personal or company vehicles, auto liability and non-owned auto exposures matter. Delivery platforms and employee-owned cars create different gaps — flag your delivery model to a broker.",
      },
      {
        question: "What information do I need for a restaurant quote?",
        answer:
          "Cuisine type, seating capacity, liquor sales percentage, hours, cooking methods (deep fryers, open flame), location details, and current coverage. That helps carriers understand kitchen and occupancy risk.",
      },
    ],
    ctaHeading: "Ready to cover your restaurant?",
    ctaSubhead:
      "Tell us about your kitchen, seating, and liquor service — we'll compare options that fit.",
    serviceName: "Restaurant Insurance",
  },
];

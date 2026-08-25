import {
  Briefcase,
  Building2,
  Container,
  Factory,
  Hammer,
  HardHat,
  KeyRound,
  Laptop,
  Package,
  Route,
  Shield,
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
};

/** First six tiles appear on the homepage Commercial Spotlight. */
export const commercialIndustryTiles: CommercialIndustryTile[] = [
  {
    label: "Commercial Auto & Fleets",
    href: "/commercial-auto-insurance/",
    icon: Truck,
  },
  {
    label: "Trucking",
    href: "/trucking-insurance/",
    icon: Route,
  },
  {
    label: "Contractors",
    href: "/contractors-insurance/",
    icon: Hammer,
  },
  {
    label: "Manufacturing",
    href: "/manufacturing-insurance/",
    icon: Factory,
  },
  {
    label: "Commercial Property",
    href: "/commercial-property-insurance/",
    icon: Building2,
  },
  {
    label: "Restaurants",
    href: "/restaurant-insurance/",
    icon: UtensilsCrossed,
  },
  {
    label: "Professional Offices",
    href: "/professional-offices-insurance/",
    icon: Briefcase,
  },
  {
    label: "Real Estate",
    href: "/real-estate-insurance/",
    icon: KeyRound,
  },
  {
    label: "Builders & Developers",
    href: "/builders-developers-insurance/",
    icon: HardHat,
  },
  {
    label: "Retail",
    href: "/retail-insurance/",
    icon: Store,
  },
  {
    label: "Food Trucks & Trailers",
    href: "/food-truck-insurance/",
    icon: UtensilsCrossed,
  },
  {
    label: "Dump Trucks",
    href: "/dump-truck-insurance/",
    icon: Container,
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
  {
    slug: "professional-offices-insurance",
    metaTitle:
      "Professional Offices Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Professional offices insurance through an independent Windsor-Essex broker — general liability, errors & omissions, commercial property, and cyber liability.",
    headline: "Professional Offices Insurance",
    subhead:
      "Coverage for professional service businesses — from liability to the equipment that keeps your office running.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Professional Offices Quote",
    coverageIntro:
      "Coverages that address client-facing liability, advice risk, office property, and digital exposures.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against third-party injury or property damage claims at your office or in the course of business.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability (Errors & Omissions)",
        description:
          "Addresses claims that a client suffered a financial loss because of your professional advice or services.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        description:
          "Covers office contents, equipment, and improvements against covered theft, fire, or other insured losses.",
        icon: Building2,
      },
      {
        title: "Cyber Liability",
        description:
          "Can help with costs tied to data breaches, ransomware, and certain network security incidents.",
        icon: Laptop,
      },
    ],
    faqTitle: "Professional offices FAQ",
    faqItems: [
      {
        question:
          "What's the difference between general liability and professional liability?",
        answer:
          "General liability typically covers bodily injury and property damage to others. Professional liability (E&O) responds when a client claims your advice, design, or service caused a financial loss. Many offices need both.",
      },
      {
        question: "Do I need cyber liability coverage?",
        answer:
          "If you store client data, process payments online, or rely on cloud systems, cyber coverage is worth a serious look. Standard liability policies often exclude or limit cyber events.",
      },
      {
        question: "Does my policy cover client data breaches?",
        answer:
          "Only if cyber or privacy coverage is included. A general liability or E&O policy alone may not cover notification costs, forensic investigation, or regulatory expenses after a breach.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Your profession, services offered, revenue, number of staff, whether you hold client funds or sensitive data, current coverage, and any claims history. Contract insurance requirements help too.",
      },
    ],
    ctaHeading: "Ready to cover your professional practice?",
    ctaSubhead:
      "Tell us about your services and exposures — we'll compare options that fit.",
    serviceName: "Professional Offices Insurance",
  },
  {
    slug: "real-estate-insurance",
    metaTitle: "Real Estate Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Real estate insurance through an independent Windsor-Essex broker — errors & omissions, commercial property, general liability, and landlord coverage.",
    headline: "Real Estate Insurance",
    subhead:
      "Coverage for real estate professionals and property portfolios — from brokerages to rental properties.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Real Estate Quote",
    coverageIntro:
      "Coverages for brokerage liability, owned property, and landlord exposures.",
    coverageTypes: [
      {
        title: "Errors & Omissions (E&O)",
        description:
          "Helps protect agents and brokerages against claims arising from professional real estate services.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        description:
          "Covers office premises, contents, and improvements for brokerages and property businesses.",
        icon: Building2,
      },
      {
        title: "General Liability",
        description:
          "Addresses third-party injury or property damage claims tied to your premises or operations.",
        icon: Briefcase,
      },
      {
        title: "Landlord Coverage",
        description:
          "Protects rental property owners for building damage, liability to tenants or guests, and related risks.",
        icon: KeyRound,
      },
    ],
    faqTitle: "Real estate insurance FAQ",
    faqItems: [
      {
        question: "Do real estate agents need E&O insurance?",
        answer:
          "Yes in practice — and many brokerages and boards require it. E&O responds when a client claims a professional error in a transaction caused them a financial loss.",
      },
      {
        question: "What's covered under landlord insurance?",
        answer:
          "Landlord policies typically cover the rental building, landlord liability, and sometimes loss of rental income after a covered property loss. Tenant belongings are usually the tenant's responsibility.",
      },
      {
        question: "Do I need separate coverage for vacant properties?",
        answer:
          "Often yes. Vacancy can restrict or void standard coverage after a set period. Tell your broker about vacant or under-renovation units so the policy wording matches the risk.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Whether you're an agent, brokerage, or landlord; property addresses and values; occupancy; claims history; and any association or lender insurance requirements.",
      },
    ],
    ctaHeading: "Ready to cover your real estate work?",
    ctaSubhead:
      "Tell us about your brokerage or portfolio — we'll compare options that fit.",
    serviceName: "Real Estate Insurance",
  },
  {
    slug: "builders-developers-insurance",
    metaTitle:
      "Builders & Developers Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Builders and developers insurance through an independent Windsor-Essex broker — builder's risk, general liability, wrap-up liability, and completed operations.",
    headline: "Builders & Developers Insurance",
    subhead:
      "Project-based coverage for builders and developers — from groundbreaking to handover.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Builders Quote",
    coverageIntro:
      "Coverages that follow a project from construction through completed work.",
    coverageTypes: [
      {
        title: "Builder's Risk",
        description:
          "Protects the project under construction — materials and work in progress — against covered property losses.",
        icon: HardHat,
      },
      {
        title: "General Liability",
        description:
          "Helps protect against third-party injury or property damage claims arising from construction operations.",
        icon: Briefcase,
      },
      {
        title: "Wrap-Up Liability",
        description:
          "A project-specific liability structure that can cover the owner, GC, and subcontractors under one program.",
        icon: Building2,
      },
      {
        title: "Completed Operations",
        description:
          "Addresses liability claims that arise after the work is finished and the project has been handed over.",
        icon: Shield,
      },
    ],
    faqTitle: "Builders & developers FAQ",
    faqItems: [
      {
        question: "What is builder's risk insurance and when do I need it?",
        answer:
          "Builder's risk covers the structure and materials during construction or major renovation for covered perils. It's typically required from groundbreaking until the project is substantially complete or occupied.",
      },
      {
        question: "What is wrap-up liability?",
        answer:
          "A wrap-up consolidates liability for multiple parties on a large project into one controlled program. It can reduce certificate chasing and coverage gaps between trades — usually for bigger builds.",
      },
      {
        question: "Am I covered after a project is completed?",
        answer:
          "Completed operations coverage addresses claims that surface after handover — for example, alleged defective work that later causes injury or damage. Limits, terms, and how long coverage applies should be reviewed with your broker.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Project type and value, construction methods, locations, subcontracting approach, contract insurance requirements, and claims history. For wrap-ups, the full project schedule and party list matter.",
      },
    ],
    ctaHeading: "Ready to cover your next project?",
    ctaSubhead:
      "Tell us about your build — we'll compare project and liability options that fit.",
    serviceName: "Builders & Developers Insurance",
  },
  {
    slug: "retail-insurance",
    metaTitle: "Retail Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Retail insurance through an independent Windsor-Essex broker — general liability, property & inventory, business interruption, and product liability.",
    headline: "Retail Insurance",
    subhead:
      "Coverage for retail businesses — from the storefront to the stockroom.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Retail Quote",
    coverageIntro:
      "Coverages that protect your premises, stock, income, and product-related liability.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against customer injury or property damage claims in your store.",
        icon: Briefcase,
      },
      {
        title: "Property & Inventory Coverage",
        description:
          "Covers fixtures, equipment, and stock against covered theft, fire, or other insured losses.",
        icon: Package,
      },
      {
        title: "Business Interruption",
        description:
          "Can help replace lost income if a covered property loss forces a temporary closure.",
        icon: Store,
      },
      {
        title: "Product Liability",
        description:
          "Addresses claims that a product you sell caused injury or damage, including distributed brands in many cases.",
        icon: Shield,
      },
    ],
    faqTitle: "Retail insurance FAQ",
    faqItems: [
      {
        question: "Is my inventory covered against theft?",
        answer:
          "Often yes under commercial property, subject to limits, deductibles, and security requirements. High-theft merchandise may need higher limits or specific endorsements — tell your broker what you stock.",
      },
      {
        question: "Do I need product liability if I sell other brands' products?",
        answer:
          "Usually yes. Selling or distributing products can still create liability exposure even if you didn't manufacture them. Contracts and brand warranties don't always replace your own coverage.",
      },
      {
        question: "Does my policy cover business interruption?",
        answer:
          "Only if that coverage is included or added. Property coverage repairs physical damage; business interruption addresses income loss while you rebuild or relocate after a covered loss.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Store location, square footage, inventory values, product types, sales volume, security features, and current coverage. Seasonal inventory peaks should be noted so limits keep up.",
      },
    ],
    ctaHeading: "Ready to cover your retail business?",
    ctaSubhead:
      "Tell us about your storefront and stock — we'll compare options that fit.",
    serviceName: "Retail Insurance",
  },
  {
    slug: "food-truck-insurance",
    metaTitle:
      "Food Truck & Trailer Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Food truck and trailer insurance through an independent Windsor-Essex broker — general liability, commercial auto, equipment coverage, and product liability.",
    headline: "Food Truck & Trailer Insurance",
    subhead:
      "Mobile coverage for food trucks and trailers — on the road and at the event.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Food Truck Quote",
    coverageIntro:
      "Coverages that address both the vehicle and the food business operating from it.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against customer injury or property damage claims at events, parks, and service locations.",
        icon: Briefcase,
      },
      {
        title: "Commercial Auto",
        description:
          "Covers the truck or trailer as a commercial vehicle — liability and physical damage while on the road.",
        icon: Truck,
      },
      {
        title: "Equipment Coverage",
        description:
          "Can protect cooking equipment, generators, and fitted interiors against covered damage or theft.",
        icon: Package,
      },
      {
        title: "Product Liability",
        description:
          "Addresses claims that food you prepared or sold caused illness or injury.",
        icon: UtensilsCrossed,
      },
    ],
    faqTitle: "Food truck & trailer FAQ",
    faqItems: [
      {
        question: "Is my truck covered as a vehicle and a business?",
        answer:
          "You typically need both commercial auto (for the vehicle on the road) and business liability/property coverages (for food service operations). One without the other leaves gaps.",
      },
      {
        question: "Do I need separate coverage for events and fairs?",
        answer:
          "Sometimes. Event organizers often require certificates with specific limits or additional insured wording. Your broker can issue certificates and confirm your liability extends to those locations.",
      },
      {
        question: "What if my equipment breaks down?",
        answer:
          "Equipment breakdown or inland marine coverage may respond to sudden mechanical or electrical failure, subject to policy terms. Standard auto physical damage doesn't always cover fitted cooking equipment the same way.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Vehicle details, cooking equipment list, where you operate (routes, events, commissary), food type, and current coverage. Health permits and event insurance requirements help too.",
      },
    ],
    ctaHeading: "Ready to cover your food truck?",
    ctaSubhead:
      "Tell us about your truck, equipment, and events — we'll compare options that fit.",
    serviceName: "Food Truck & Trailer Insurance",
  },
  {
    slug: "dump-truck-insurance",
    metaTitle: "Dump Truck Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Dump truck insurance through an independent Windsor-Essex broker — commercial auto liability, physical damage, cargo & debris coverage, and non-trucking liability.",
    headline: "Dump Truck Insurance",
    subhead:
      "Commercial auto and liability coverage built for dump truck operators and small fleets.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Dump Truck Quote",
    coverageIntro:
      "Coverages commonly needed for dump truck hauling — liability, the unit itself, and loads.",
    coverageTypes: [
      {
        title: "Commercial Auto Liability",
        description:
          "Helps protect against injury or property damage claims arising from your dump truck operations.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage",
        description:
          "Helps repair or replace your dump truck after covered collision or comprehensive losses.",
        icon: Truck,
      },
      {
        title: "Cargo & Debris Coverage",
        description:
          "Can address loads you haul — aggregate, soil, or debris — while in transit under your care.",
        icon: Container,
      },
      {
        title: "Non-Trucking Liability",
        description:
          "May apply when a leased or contracted unit is used for personal purposes outside dispatch — subject to lease terms.",
        icon: Route,
      },
    ],
    faqTitle: "Dump truck insurance FAQ",
    faqItems: [
      {
        question: "Do I need cargo coverage for hauling debris or aggregate?",
        answer:
          "Often yes if you're responsible for the load. Liability covers damage to others; cargo addresses the material you're hauling. Contracts and job sites may specify minimum cargo limits.",
      },
      {
        question: "What is non-trucking liability?",
        answer:
          "Non-trucking (or bobtail) liability can cover liability when a leased truck is operated for personal use and not under dispatch. Whether you need it depends on your lease and how the unit is used.",
      },
      {
        question: "Can I insure a single truck, or do I need a fleet policy?",
        answer:
          "You can insure a single dump truck. Fleet structures become useful as you add units and drivers. Your broker will match the setup to how many trucks you run.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Truck details (year, make, GVW), driver abstracts, radius and commodities hauled, owner-operator vs. fleet status, and current coverage or claims history.",
      },
    ],
    ctaHeading: "Ready to cover your dump truck?",
    ctaSubhead:
      "Tell us about your truck and hauling work — we'll compare options that fit.",
    serviceName: "Dump Truck Insurance",
  },
];

import {
  Briefcase,
  Building2,
  Car,
  Container,
  Factory,
  Hammer,
  HardHat,
  KeyRound,
  Package,
  Route,
  Shield,
  Store,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react";
import {
  QUOTE_BUSINESS,
  QUOTE_COMMERCIAL_VEHICLES,
} from "@/data/commercial-industries";
import type { ProductPageContent } from "@/data/product-pages/types";

export const commercialProductIndustryPages: ProductPageContent[] = [
  {
    slug: "cargo-freight-insurance",
    category: "commercial",
    metaTitle:
      "Cargo & Freight Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cargo and freight insurance for Windsor-Essex carriers — protection for goods in transit, liability, and contract requirements through an independent broker.",
    headline: "Cargo & Freight Insurance",
    subhead:
      "Coverage for the freight you haul — protecting goods in transit and meeting shipper and broker contract requirements.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Cargo Quote",
    coverageIntro:
      "Cargo insurance addresses the goods themselves; liability covers damage to others. Shippers often require both with specific limits.",
    coverageTypes: [
      {
        title: "Motor Truck Cargo",
        description:
          "Covers loss or damage to freight you carry for hire, subject to exclusions for certain commodities and packaging.",
        icon: Package,
      },
      {
        title: "Carrier Liability",
        description:
          "Addresses your legal liability to shippers when cargo is lost, damaged, or delayed under your care.",
        icon: Briefcase,
      },
      {
        title: "Refrigerated Cargo",
        description:
          "Specialized coverage for temperature-sensitive freight with breakdown and spoilage considerations.",
        icon: Container,
      },
      {
        title: "Contingent Cargo",
        description:
          "For freight brokers — covers gaps when a carrier's insurance fails to respond on a load you arranged.",
        icon: Route,
      },
    ],
    whoItIsFor:
      "Cargo and freight insurance is for Windsor-Essex truck operators, owner-operators, fleet carriers, and freight brokers moving general freight, specialized goods, or cross-border loads.",
    relatedLinks: [
      { label: "Trucking Insurance", href: "/trucking-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
    ],
    faqTitle: "Cargo & freight FAQ",
    faqItems: [
      {
        question: "Is cargo included in my trucking liability policy?",
        answer:
          "No. Liability covers injury and damage to others; cargo is a separate coverage for the freight itself.",
      },
      {
        question: "What commodities affect cargo pricing?",
        answer:
          "Electronics, alcohol, pharmaceuticals, and high-theft goods often need higher limits or specific endorsements.",
      },
      {
        question: "Do I need cargo for cross-border loads?",
        answer:
          "U.S. shippers frequently require specific cargo limits and insurer ratings. Disclose your lanes when quoting.",
      },
      {
        question: "What is a contingent cargo policy?",
        answer:
          "Freight brokers use contingent cargo when a carrier's policy fails — it is a secondary layer, not a replacement for proper carrier coverage.",
      },
    ],
    ctaHeading: "Haul freight for hire?",
    ctaSubhead:
      "Share your commodities, lanes, and contract requirements — we will align cargo limits with what shippers expect.",
    serviceName: "Cargo & Freight Insurance",
  },
  {
    slug: "garage-dealership-insurance",
    category: "commercial",
    metaTitle:
      "Garage & Dealership Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Garage and auto dealership insurance — garagekeepers liability, lot coverage, test drives, and repair operations for Windsor-Essex dealers and shops.",
    headline: "Garage & Dealership Insurance",
    subhead:
      "Coverage for dealers, repair shops, and service garages — from customer vehicles on your lot to test drives and completed repairs.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Garage Quote",
    coverageIntro:
      "Garage policies combine property, liability, and garagekeepers coverage for vehicles you do not own but have in your care.",
    coverageTypes: [
      {
        title: "Garagekeepers Liability",
        description:
          "Covers customer vehicles in your care for storage, service, or parking against covered damage or theft.",
        icon: Car,
      },
      {
        title: "Dealer Open Lot",
        description:
          "Protects inventory vehicles on your lot against covered perils such as hail, fire, or vandalism.",
        icon: Store,
      },
      {
        title: "Garage Liability",
        description:
          "Addresses operations liability — faulty repairs, test drive accidents, and premises injuries.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage on Inventory",
        description:
          "Comprehensive and collision coverage for owned and consigned units held for sale.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Garage and dealership insurance is for Windsor-Essex new and used auto dealers, repair garages, body shops, detailers, and tire centres that hold customer vehicles.",
    relatedLinks: [
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
    ],
    faqTitle: "Garage & dealership FAQ",
    faqItems: [
      {
        question: "What is garagekeepers coverage?",
        answer:
          "It covers damage to customer vehicles in your custody — during repairs, storage, or valet — when you may be held responsible.",
      },
      {
        question: "Are test drives covered?",
        answer:
          "Dealer policies typically include provisions for test drives, but limits and driver requirements vary. Disclose your sales process.",
      },
      {
        question: "Do I need separate coverage for a body shop?",
        answer:
          "Body shops need garage liability and garagekeepers at minimum, plus property for equipment and spray booth exposures.",
      },
      {
        question: "How is lot inventory valued?",
        answer:
          "Open lot coverage uses stated values or reporting methods. Keep inventory records current as units move in and out.",
      },
    ],
    ctaHeading: "Run a garage or dealership?",
    ctaSubhead:
      "Tell us about your lot size, services, and inventory values — we will compare garage programs that fit.",
    serviceName: "Garage & Dealership Insurance",
  },
  {
    slug: "builders-risk-insurance",
    category: "commercial",
    metaTitle:
      "Builder's Risk Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Builder's risk insurance for Windsor-Essex construction projects — materials, work in progress, and project property coverage during the build.",
    headline: "Builder's Risk Insurance",
    subhead:
      "Project-specific property coverage while construction or major renovation is underway — protecting materials and work in progress.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Builder's Risk Quote",
    coverageIntro:
      "Builder's risk covers the project itself during construction — separate from the contractor's ongoing liability policy.",
    coverageTypes: [
      {
        title: "Work in Progress",
        description:
          "Covers the structure and installed materials during construction against covered perils like fire, theft, and wind.",
        icon: HardHat,
      },
      {
        title: "Materials On Site & In Transit",
        description:
          "May extend to building materials stored on site or in transit to the project, subject to limits.",
        icon: Package,
      },
      {
        title: "Soft Costs",
        description:
          "Can cover additional interest, taxes, and architect fees when a covered delay extends the project timeline.",
        icon: Building2,
      },
      {
        title: "Existing Structure",
        description:
          "Renovation projects may need coverage for the existing building while work is performed on it.",
        icon: Hammer,
      },
    ],
    whoItIsFor:
      "Builder's risk is for Windsor-Essex general contractors, developers, and property owners funding new construction or major renovations — usually required from groundbreaking until substantial completion.",
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
    ],
    faqTitle: "Builder's risk FAQ",
    faqItems: [
      {
        question: "Who should buy builder's risk — owner or contractor?",
        answer:
          "Contract documents usually specify who must place coverage. Often the owner or developer buys it, but GC-led wrap-ups may differ.",
      },
      {
        question: "When does builder's risk end?",
        answer:
          "Typically at substantial completion, occupancy, or policy expiration — whichever comes first. Extensions may be available for delayed projects.",
      },
      {
        question: "Is theft of materials covered?",
        answer:
          "Often yes, subject to security requirements and deductibles. High-theft sites may need enhanced limits.",
      },
      {
        question: "Does builder's risk cover faulty workmanship?",
        answer:
          "No. It covers sudden insured perils, not defective work. Liability policies address workmanship claims separately.",
      },
    ],
    ctaHeading: "Starting a construction project?",
    ctaSubhead:
      "Share project value, timeline, and contract requirements — we will arrange builder's risk aligned with your build.",
    serviceName: "Builder's Risk Insurance",
  },
  {
    slug: "warehousing-insurance",
    category: "commercial",
    metaTitle:
      "Warehousing & Logistics Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Warehousing and logistics insurance — property, liability, bailee coverage, and inventory protection for Windsor-Essex warehouse operators.",
    headline: "Warehousing & Logistics Insurance",
    subhead:
      "Coverage for warehouse operators — protecting the building, stored goods, equipment, and liability to customers whose inventory you hold.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Warehouse Quote",
    coverageIntro:
      "Warehousing combines property, liability, and care-custody-control exposures for goods belonging to others.",
    coverageTypes: [
      {
        title: "Commercial Property",
        description:
          "Covers the warehouse structure, racking, forklifts, and handling equipment against covered losses.",
        icon: Warehouse,
      },
      {
        title: "Warehouse Legal Liability",
        description:
          "Addresses your liability for loss or damage to customer goods stored in your facility.",
        icon: Briefcase,
      },
      {
        title: "General Liability",
        description:
          "Covers third-party injury on premises — loading dock incidents, visitor injuries, and property damage.",
        icon: Shield,
      },
      {
        title: "Business Interruption",
        description:
          "Can help replace income if a covered property loss shuts down warehouse operations.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "Warehousing insurance is for Windsor-Essex third-party logistics providers, cold storage operators, distribution centres, and businesses storing goods for clients.",
    relatedLinks: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
    ],
    faqTitle: "Warehousing FAQ",
    faqItems: [
      {
        question: "Who covers my customer's inventory?",
        answer:
          "Warehouse legal liability covers goods you store for others when you are legally responsible. Customer contracts often specify required limits.",
      },
      {
        question: "Are forklifts and racking covered?",
        answer:
          "Equipment and building improvements are typically under commercial property, subject to scheduled values and maintenance requirements.",
      },
      {
        question: "Does warehousing need pollution coverage?",
        answer:
          "Facilities storing chemicals, refrigerants, or fuel may need pollution liability. Disclose stored commodities accurately.",
      },
      {
        question: "What limits do 3PL contracts require?",
        answer:
          "Contracts often specify per-occurrence and aggregate limits for warehouse legal liability. Review agreements before binding coverage.",
      },
    ],
    ctaHeading: "Operate a warehouse or 3PL?",
    ctaSubhead:
      "Share storage types, values, and contract requirements — we will align property and bailee coverage.",
    serviceName: "Warehousing Insurance",
  },
  {
    slug: "property-management-insurance",
    category: "commercial",
    metaTitle:
      "Property Management Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Property management insurance — E&O, general liability, and hired/non-owned auto for Windsor-Essex residential and commercial managers.",
    headline: "Property Management Insurance",
    subhead:
      "Coverage for property managers — liability for managed premises, professional errors, and the operations that keep portfolios running.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Property Management Quote",
    coverageIntro:
      "Property managers face both operational liability and professional E&O exposures across multiple buildings and owners.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Covers injury and property damage claims arising from managed properties and management office operations.",
        icon: Briefcase,
      },
      {
        title: "Property Management E&O",
        description:
          "Addresses claims alleging negligent management — failure to maintain, improper tenant screening, or lease administration errors.",
        icon: KeyRound,
      },
      {
        title: "Commercial Property",
        description:
          "Covers office contents and equipment used in management operations.",
        icon: Building2,
      },
      {
        title: "Hired & Non-Owned Auto",
        description:
          "Covers managers and staff driving for property visits in personal or rented vehicles.",
        icon: Car,
      },
    ],
    whoItIsFor:
      "Property management insurance is for Windsor-Essex firms managing residential rentals, condominium corporations on behalf of boards, and commercial property portfolios.",
    relatedLinks: [
      { label: "Real Estate Insurance", href: "/real-estate-insurance/" },
      { label: "Condominium Corporation", href: "/condominium-corporation-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
    ],
    faqTitle: "Property management FAQ",
    faqItems: [
      {
        question: "Does the owner's policy cover the manager?",
        answer:
          "Owner policies protect the owner's interest, not the manager's professional liability. Management firms need their own E&O and GL.",
      },
      {
        question: "Are tenant disputes covered?",
        answer:
          "E&O may respond to claims alleging negligent management practices. Intentional discrimination or criminal acts are excluded.",
      },
      {
        question: "Do I need coverage for each building?",
        answer:
          "Management E&O typically covers your firm across the portfolio. Individual buildings may still need owner-controlled property policies.",
      },
      {
        question: "What do management contracts require?",
        answer:
          "Owner agreements often specify minimum GL and E&O limits and additional insured status. Review before signing new mandates.",
      },
    ],
    ctaHeading: "Manage properties for others?",
    ctaSubhead:
      "Tell us your portfolio size and services — we will compare GL and E&O options for property managers.",
    serviceName: "Property Management Insurance",
  },
  {
    slug: "condominium-corporation-insurance",
    category: "commercial",
    metaTitle:
      "Condominium Corporation Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Condominium corporation insurance — master policy, liability, equipment, and directors coverage for Windsor-Essex condo boards and managers.",
    headline: "Condominium Corporation Insurance",
    subhead:
      "Master policy and liability coverage for condominium corporations — protecting common elements, shared systems, and the board's exposures.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Condo Corporation Quote",
    coverageIntro:
      "Condominium corporations need property coverage for shared building elements and liability for common areas and governance.",
    coverageTypes: [
      {
        title: "Master Property Policy",
        description:
          "Covers common elements, building structure, and shared systems — hallways, roof, elevators, and recreational facilities.",
        icon: Building2,
      },
      {
        title: "General Liability",
        description:
          "Addresses injury claims in common areas — lobbies, parking garages, pools, and walkways.",
        icon: Briefcase,
      },
      {
        title: "Equipment Breakdown",
        description:
          "Covers sudden failure of boilers, elevators, and HVAC serving the corporation.",
        icon: Wrench,
      },
      {
        title: "Directors & Officers",
        description:
          "Protects board members against claims alleging wrongful governance or failure to maintain the corporation.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Condominium corporation insurance is for Windsor-Essex condo boards, property managers arranging master policies, and corporations governing residential and mixed-use buildings.",
    relatedLinks: [
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Condo Insurance (Unit Owners)", href: "/condo-insurance/" },
    ],
    faqTitle: "Condominium corporation FAQ",
    faqItems: [
      {
        question: "What does the master policy cover vs. unit owner policies?",
        answer:
          "The master policy covers common elements and the building structure. Unit owners need personal condo policies for contents, improvements, and liability inside their units.",
      },
      {
        question: "Are special assessments covered?",
        answer:
          "When a covered loss exceeds master policy limits, owners may face assessments. Unit owner loss assessment coverage helps individuals; the corporation needs adequate master limits.",
      },
      {
        question: "Does the corporation need D&O?",
        answer:
          "Board members face personal liability for governance decisions. D&O helps protect directors when claims allege mismanagement.",
      },
      {
        question: "How often should values be updated?",
        answer:
          "Building valuations should reflect current replacement costs. Underinsurance can lead to co-insurance penalties after a major loss.",
      },
    ],
    ctaHeading: "Insuring a condominium corporation?",
    ctaSubhead:
      "Share building type, amenities, and current master policy details — we will review corporation coverage needs.",
    serviceName: "Condominium Corporation Insurance",
  },
  {
    slug: "pollution-liability-insurance",
    category: "commercial",
    metaTitle:
      "Pollution Liability Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Pollution liability insurance for Windsor-Essex — gradual and sudden environmental releases for contractors, manufacturers, and property owners.",
    headline: "Pollution Liability Insurance",
    subhead:
      "Coverage for environmental releases — sudden spills and gradual pollution conditions that standard liability policies often exclude.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Pollution Quote",
    coverageIntro:
      "Pollution liability addresses cleanup costs and third-party claims from environmental contamination tied to your operations.",
    coverageTypes: [
      {
        title: "Contractors Pollution Liability",
        description:
          "Covers pollution conditions caused during construction — fuel spills, asbestos disturbance, and soil contamination.",
        icon: HardHat,
      },
      {
        title: "Site Pollution",
        description:
          "Addresses gradual leaks from storage tanks, pipelines, and waste handling at owned or operated sites.",
        icon: Factory,
      },
      {
        title: "Transportation Pollution",
        description:
          "Covers releases during transit of hazardous materials or waste.",
        icon: Truck,
      },
      {
        title: "Cleanup & Defence Costs",
        description:
          "Can help with regulatory-mandated remediation and legal defence for covered pollution claims.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Pollution liability is for Windsor-Essex contractors doing environmental work, manufacturers handling chemicals, gas stations, warehouses with refrigerants, and property owners with underground storage tanks.",
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
      { label: "Convenience Store Insurance", href: "/convenience-store-insurance/" },
    ],
    faqTitle: "Pollution liability FAQ",
    faqItems: [
      {
        question: "Does general liability cover pollution?",
        answer:
          "Standard GL policies typically exclude pollution unless sudden and accidental within a short time window. Dedicated pollution coverage fills that gap.",
      },
      {
        question: "Do contractors need pollution coverage?",
        answer:
          "Excavation, remediation, and utility contractors often face contract requirements for contractors pollution liability.",
      },
      {
        question: "What is gradual vs. sudden pollution?",
        answer:
          "Sudden spills may have limited GL coverage. Gradual leaks over time usually require a pollution policy.",
      },
      {
        question: "Are historical site conditions covered?",
        answer:
          "Known contamination discovered before policy inception is typically excluded. Disclose site history during application.",
      },
    ],
    ctaHeading: "Face environmental exposure?",
    ctaSubhead:
      "Describe your operations, materials handled, and site history — we will compare pollution markets.",
    serviceName: "Pollution Liability Insurance",
  },
  {
    slug: "product-recall-insurance",
    category: "commercial",
    metaTitle:
      "Product Recall Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Product recall insurance for Windsor-Essex manufacturers and distributors — recall costs, brand protection, and customer notification expenses.",
    headline: "Product Recall Insurance",
    subhead:
      "Coverage for the cost of pulling products from the market — notification, transport, storage, and disposal when a recall is necessary.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Recall Quote",
    coverageIntro:
      "Product recall helps with expenses to withdraw contaminated or defective products — separate from liability for injury claims.",
    coverageTypes: [
      {
        title: "Recall Expenses",
        description:
          "Covers costs to notify customers, retrieve products, and dispose of or destroy affected inventory.",
        icon: Package,
      },
      {
        title: "Replacement Costs",
        description:
          "May cover expenses to replace recalled products with safe alternatives.",
        icon: Factory,
      },
      {
        title: "Consultant & Lab Fees",
        description:
          "Addresses testing and expert costs to identify contamination sources and scope.",
        icon: Briefcase,
      },
      {
        title: "Brand Rehabilitation",
        description:
          "Some policies include limited crisis communication and brand restoration expenses.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Product recall insurance is for Windsor-Essex food manufacturers, consumer goods producers, and distributors whose products could trigger a voluntary or regulatory recall.",
    relatedLinks: [
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
      { label: "Product Liability (Retail)", href: "/retail-insurance/" },
      { label: "Grocery & Specialty Food", href: "/grocery-specialty-food-insurance/" },
    ],
    faqTitle: "Product recall FAQ",
    faqItems: [
      {
        question: "Is recall the same as product liability?",
        answer:
          "No. Product liability covers injury or damage claims from defective products. Recall covers the cost of withdrawing products from the market.",
      },
      {
        question: "Who triggers a recall?",
        answer:
          "Recalls may be voluntary or mandated by regulators like the CFIA for food products. Policies define what triggers coverage.",
      },
      {
        question: "Does recall cover lost profits?",
        answer:
          "Some policies include business interruption components. Review indemnity periods and triggers with your broker.",
      },
      {
        question: "Do distributors need recall coverage?",
        answer:
          "Distributors may face recall obligations in supply contracts even when they did not manufacture the product.",
      },
    ],
    ctaHeading: "Manufacture or distribute consumer products?",
    ctaSubhead:
      "Share your product types and supply chain — we will discuss recall coverage alongside product liability.",
    serviceName: "Product Recall Insurance",
  },
];

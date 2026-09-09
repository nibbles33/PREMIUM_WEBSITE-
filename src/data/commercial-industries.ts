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
import type {
  ConsiderationItem,
  CoverageCard,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";

export const QUOTE_BUSINESS = "/get-a-quote?type=business";
export const QUOTE_COMMERCIAL_VEHICLES = "/get-a-quote?type=commercial-vehicles";
export const COMMERCIAL_ACCENT = "#5A8A73";

export type CommercialIndustryTile = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** All 12 commercial industry tiles (hub grid + cluster spotlight). */
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
  considerations?: ConsiderationItem[];
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
      "Trucking insurance through an independent Windsor-Essex broker — commercial automobile liability, physical damage, motor truck cargo, and U.S. territory coordination for fleets and owner-operators.",
    headline: "Trucking Insurance",
    subhead:
      "Motor carriers and for-hire trucking operations face a layered insurance picture — Ontario-regulated commercial automobile liability and physical damage for tractors and trailers on the highway, separate motor truck cargo coverage for freight you haul for others, and additional underwriting when your lanes cross into the United States. That is different from a single light commercial auto policy or from cargo-only coverage for goods in transit. Ontario operators of qualifying commercial motor vehicles must also hold a valid Commercial Vehicle Operator's Registration (CVOR) certificate from the Ministry of Transportation — a regulatory safety-registration program separate from purchasing insurance. Premium Insurance Brokers can help align automobile, cargo, and contract requirements to how your fleet actually runs.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Trucking Quote",
    coverageIntro:
      "Trucking insurance usually separates regulated automobile coverage for your power units and trailers from cargo coverage for customers' freight — depending on fleet size, radius, commodities, owner-operator contracts, and whether you haul into the U.S.",
    coverageTypes: [
      {
        title: "Cargo Insurance",
        shortLabel: "Cargo",
        description:
          "May help address certain loss or damage to freight you carry for hire while in your care, custody, or control during transit — where purchased and subject to policy terms, commodity exclusions, limits, and valuation.",
        detailTitle: "Shippers' freight is a separate exposure from your tractor on the highway",
        detailDescription:
          "When you haul another party's goods, motor truck cargo coverage — where purchased — may respond to certain physical loss or damage to that freight subject to causes of loss, exclusions, and limits in the policy. Ontario automobile liability does not replace cargo coverage for customers' goods. Shippers, brokers, and 3PL contracts often specify minimum cargo limits, deductibles, or insurer requirements — those are contractual obligations separate from what any base automobile policy includes. Commodity type, packaging, maximum load value, and security practices affect underwriting.",
        icon: Container,
      },
      {
        title: "Liability Coverage",
        shortLabel: "Auto Liability",
        description:
          "Ontario commercial automobile third-party liability — regulated under FSRA — may help respond to certain bodily injury or property-damage claims arising from the use of insured trucks and trailers on public roads, subject to policy terms, limits, and exclusions.",
        detailTitle: "Highway liability is regulated automobile coverage — not cargo or CGL",
        detailDescription:
          "Third-party automobile liability for commercial trucks is part of Ontario's regulated commercial automobile insurance framework — distinct from motor truck cargo, commercial general liability, or warehouse legal liability. Minimum statutory liability limits apply to Ontario automobile policies; higher limits are commonly purchased and often required contractually by shippers or terminals. Driver abstracts, fleet safety programs, and an operator's CVOR safety rating may influence underwriting, but maintaining CVOR registration does not substitute for automobile insurance and does not guarantee coverage.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage",
        shortLabel: "Phys. Damage",
        description:
          "Collision and comprehensive coverage for tractors and trailers, where purchased, may help repair or replace insured units after covered losses — subject to deductibles, stated values, and policy wording.",
        detailTitle: "Tractors and trailers are scheduled values — trailers are not automatic",
        detailDescription:
          "Physical damage coverage applies to insured power units and listed trailers subject to how each unit is scheduled and the deductibles you choose. A trailer you pull under contract may need to be listed or covered under a separate agreement. Equipment such as tarps, chains, or onboard technology may be treated differently from the truck itself depending on policy structure. Accurate vehicle values, lienholder interests, and lease terms should be disclosed during quoting.",
        icon: Truck,
      },
      {
        title: "Cross-Border Coverage",
        shortLabel: "U.S. Territory",
        description:
          "Operating in the United States may require specific policy territory extensions, higher liability limits, and endorsements where applicable — subject to underwriting and policy wording — beyond a Canada-only commercial automobile policy.",
        detailTitle: "U.S. lanes change territory, limits, and underwriting requirements — not a generic add-on label",
        detailDescription:
          "Cross-border hauling is not a single universal product name — it reflects how your Ontario commercial automobile program extends territory, limits, and insurer requirements for U.S. operations. Shippers and brokers may require proof of U.S.-adequate limits or specific insurer ratings contractually. Cargo policies may also contain territorial limits. Disclose every state or region you enter, how often, and whether loads originate or terminate in the U.S. so your broker can coordinate automobile and cargo wording — do not assume a Canada-only policy automatically follows the truck south of the border.",
        icon: Route,
      },
    ],
    considerations: [
      {
        title: "CVOR is MTO registration — not insurance",
        description:
          "Ontario requires operators of qualifying commercial motor vehicles — such as buses, trucks, and tow trucks — to hold a valid Commercial Vehicle Operator's Registration (CVOR) certificate from the Ministry of Transportation before operating. CVOR is a carrier safety-registration and monitoring program; it is not an insurance policy and does not pay claims. Insurers may review CVOR safety ratings, collisions, and convictions during underwriting, but regulatory compliance and insurance are separate matters — confirm whether each vehicle in your fleet requires CVOR on the MTO website before operating.",
      },
      {
        title: "Automobile liability, cargo, and CGL are different products",
        description:
          "Commercial automobile liability addresses third-party injury or property damage from the use of insured vehicles on roads. Motor truck cargo addresses customers' freight in transit. Commercial general liability may address certain premises or operations exposures at terminals or offices — but does not replace automobile or cargo coverage for highway operations. Each responds under its own policy wording; none automatically includes the others.",
      },
      {
        title: "Fleet, owner-operator, and lease structures",
        description:
          "Owner-operators leased to a motor carrier may rely on the carrier's automobile program for dispatched loads while needing separate coverage for bobtail, deadhead, or non-dispatched use — depending on lease terms. Fleets must schedule multiple units, drivers, and often trailers. Who owns the tractor, who holds the CVOR certificate, and who contracts with the shipper all affect how policies should be structured.",
      },
      {
        title: "Radius, commodities, and contract requirements",
        description:
          "Local pickup-and-delivery, regional, and long-haul operations present different loss patterns. Commodities such as electronics, alcohol, pharmaceuticals, or high-theft goods may need specific endorsements or sublimits. Shipper and broker contracts frequently specify minimum automobile and cargo limits — contractual requirements you must match to certificates your policies can actually issue.",
      },
      {
        title: "Drivers, abstracts, and loss history",
        description:
          "Insurers typically review driver experience, licence class, abstracts, and fleet loss runs. CVOR-related convictions or poor safety ratings may affect availability and pricing — as underwriting factors, not as automatic coverage guarantees. Disclose all regular drivers and any subcontracted operators used in your operation.",
      },
      {
        title: "Trailers, terminals, and equipment breakdown",
        description:
          "Trailers may need separate scheduling or interchanged-trailer agreements. Terminal yard operations can create premises liability distinct from over-the-road automobile exposure. Business interruption or downtime coverage, where available for trucking operations, depends on policy triggers and is not automatic with physical damage — confirm scope with your broker.",
      },
      {
        title: "Cross-border disclosure",
        description:
          "If any portion of your operation enters the United States, disclose lanes, frequency, and whether loads are domestic, cross-border, or U.S.-domestic. Automobile territory extensions, cargo territorial limits, and contractual shipper requirements must be reviewed together — partial disclosure can leave gaps between what you haul and what your policies cover.",
      },
    ],
    faqTitle: "Trucking insurance FAQ",
    faqItems: [
      {
        question: "Does trucking insurance include cargo for customers' freight?",
        answer:
          "Generally not automatically. Ontario commercial automobile liability and physical damage address the insured vehicle and third-party claims arising from its use on roads — not loss of customers' freight. Motor truck cargo coverage, where purchased, may address certain physical loss or damage to freight you carry for hire subject to policy terms, exclusions, limits, and valuation. Shippers and brokers often require specific cargo limits contractually — confirm how your program structures automobile and cargo coverage with your broker.",
      },
      {
        question: "How does CVOR relate to trucking insurance?",
        answer:
          "CVOR — Commercial Vehicle Operator's Registration — is an Ontario Ministry of Transportation program that registers and monitors commercial motor vehicle operators. It is regulatory registration, not insurance. You must hold a valid CVOR certificate where required before operating qualifying vehicles, but CVOR does not pay claims and does not replace commercial automobile insurance. Insurers may consider CVOR safety ratings and violation history during underwriting.",
      },
      {
        question: "Does operating in the U.S. change my insurance?",
        answer:
          "It can. U.S. operations may require territory extensions, higher automobile liability limits, and specific policy endorsements — depending on your carrier, policy wording, and shipper or broker contracts. Cargo policies may also limit or exclude certain territories. Tell your broker which states you enter, how often, and what shippers require before assuming a Canada-only policy covers southbound loads.",
      },
      {
        question: "Are trailers automatically covered with the tractor?",
        answer:
          "Not necessarily. Trailers you own, lease, or pull under interchange agreements may need to be listed or covered under specific policy provisions. Physical damage and liability for trailers depend on how units are scheduled, who owns them, and the lease or interchange terms. Provide a full equipment list — tractors, trailers, and specialty units — when quoting.",
      },
      {
        question: "What information affects a trucking insurance quote?",
        answer:
          "Expect questions about fleet and trailer lists, stated values, driver rosters and abstracts, radius and territories hauled, commodities, annual distance, CVOR certificate holder, loss history, owner-operator versus employee drivers, and contract insurance requirements from shippers or brokers. Insurers do not all use identical forms — accurate disclosure helps match markets to your operation.",
      },
    ],
    ctaHeading: "Ready to cover your trucking operation?",
    ctaSubhead:
      "Share your fleet list, lanes, commodities, and contract requirements — we will compare trucking automobile and cargo options.",
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
      {
        question: "What is OCIP and when does it apply to contractors?",
        answer:
          "On large projects with an Owner Controlled Insurance Program, enrolled trades may rely on the project wrap-up for onsite liability instead of their own GL for that job. Subcontractors should confirm enrollment requirements, exclusions, and what off-site work still needs their own policy.",
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
      "Manufacturing insurance for Windsor-Essex — product liability, commercial property, business interruption, equipment breakdown, and machine shop coverage through an independent broker.",
    headline: "Manufacturing Insurance",
    subhead:
      "Property, product liability, and business interruption coverage for Windsor-Essex manufacturers — including machine shops and tool and die operations.",
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
          "Addresses sudden mechanical or electrical breakdown of critical production equipment — CNC machines, presses, and compressors.",
        icon: Hammer,
      },
      {
        title: "Machine Shop & Tool & Die",
        description:
          "Tailored considerations for precision machining, custom tooling, and job-shop operations where work-in-progress and specialized equipment drive exposure.",
        icon: Factory,
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
      {
        question: "Is machine shop and tool and die work insured differently?",
        answer:
          "Job shops and tool and die operations often carry higher equipment values, custom work-in-progress, and product liability tied to precision parts. Disclose your processes, materials, and whether you work to customer specifications so limits reflect the exposure.",
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
        title: "Equipment Breakdown",
        description:
          "Covers sudden mechanical or electrical failure of boilers, HVAC, and production equipment not addressed by standard property forms.",
        icon: Hammer,
      },
      {
        title: "Commercial Landlord / Property Owner",
        description:
          "Protects rental property owners for building damage, landlord liability, and loss of rental income after a covered property loss.",
        icon: KeyRound,
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
      {
        question: "Does commercial property cover equipment breakdown?",
        answer:
          "Standard property forms often exclude mechanical and electrical breakdown. Equipment breakdown coverage is typically added for HVAC, boilers, and production machinery.",
      },
      {
        question: "What is commercial landlord coverage?",
        answer:
          "Landlord policies protect property owners who rent out commercial or residential units — covering the building, landlord liability, and sometimes rental income loss after a covered property claim.",
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
      "Restaurants in Windsor–Essex combine busy dining rooms, commercial kitchens, and — for many operators — AGCO-licensed alcohol service. Insurance needs to reflect those overlapping exposures: guest injury on your premises, property loss affecting kitchen equipment and inventory, food-related illness claims, and (where you serve alcohol) liability that standard general liability often excludes or limits. Ontario food service premises must also meet public health rules under O. Reg. 493/17, including having a certified food handler on site during operating hours — a regulatory requirement separate from what your insurance policy covers. A broker can help align property, liability, and optional endorsements to how your restaurant actually operates.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Restaurant Quote",
    coverageIntro:
      "Coverage options commonly reviewed for restaurants — from premises liability and property to liquor liability and spoilage — depend on your licence status, kitchen equipment, delivery model, and lease requirements.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against certain third-party bodily injury and property-damage claims arising from restaurant operations and your premises — such as slip-and-fall incidents in the dining room or parking area — subject to policy terms, exclusions, and limits.",
        detailTitle: "When a busy dining room becomes a liability claim",
        detailDescription:
          "Restaurants concentrate people in high-traffic areas — dining rooms, patios, washrooms, and parking lots — where spills, crowded aisles, and seasonal ice create slip-and-fall exposure. General liability may respond to certain third-party injury or property-damage claims arising from these premises and from day-to-day operations, but scope depends on how your policy defines your premises, operations, and any off-premises catering or delivery activities.",
        icon: Briefcase,
      },
      {
        title: "Property Coverage",
        description:
          "May help cover your building (if owned or required under lease), tenant improvements, furniture, fixtures, and kitchen equipment against covered causes of loss, depending on how the policy is structured and which perils or endorsements apply.",
        detailTitle: "Why kitchen equipment drives property values",
        detailDescription:
          "A restaurant's property exposure is weighted toward the kitchen — commercial ovens, fryers, walk-in coolers, hood systems, and built-in fixtures often represent a large share of insurable value alongside dining-room furniture and tenant improvements. Fire, water damage from suppression systems, and theft of equipment or alcohol stock are common loss scenarios carriers evaluate when structuring property coverage and deductibles.",
        icon: Store,
      },
      {
        title: "Liquor Liability",
        description:
          "Where you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability may address certain claims tied to alcohol service — a distinct coverage from general liability, which often excludes or limits liquor-related claims. Holding a licence authorizes legal sale and service; it does not include insurance, and the Liquor Licence and Control Act itself does not mandate liquor liability insurance as a statutory condition.",
        detailTitle: "Civil liability under the Act versus the coverage on your policy",
        detailDescription:
          "Serving alcohol under an AGCO Liquor Sales Licence creates regulatory obligations and civil liability exposure if a patron is overserved or alcohol contributes to injury or property damage after they leave. AGCO's licensing guide addresses that civil exposure directly — it is not the same as carrying liquor liability insurance, and the Act does not prescribe a named insurance product as a licence condition. Liquor liability coverage, where included in your program, is meant to address many alcohol-related claims that standard general liability excludes or limits; landlords and other counterparties may still require proof of coverage contractually.",
        icon: UtensilsCrossed,
      },
      {
        title: "Equipment Breakdown & Spoilage",
        description:
          "Equipment breakdown coverage may address sudden mechanical or electrical failure of covered kitchen or refrigeration equipment; spoilage endorsements may address inventory lost due to temperature change from specified causes — neither is automatic in a base property policy.",
        detailTitle: "When the walk-in fails on a Friday night",
        detailDescription:
          "Refrigeration and cooking equipment are operationally critical — a sudden compressor failure or electrical breakdown can destroy thousands of dollars in perishable inventory and force you to stop service. Base property policies often handle fire or theft differently from mechanical breakdown or temperature-change spoilage. Equipment breakdown and spoilage endorsements exist precisely because restaurants depend on continuous cold chain and functioning kitchen lines; triggers and sublimits vary, especially for off-premises power failures versus on-site equipment failure.",
        icon: Factory,
      },
    ],
    considerations: [
      {
        title: "Disclosures your broker typically needs",
        description:
          "Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery or catering model, and whether you hold an AGCO Liquor Sales Licence.",
      },
      {
        title: "Food safety is regulatory — not an insurance substitute",
        description:
          "O. Reg. 493/17 requires at least one certified food handler on site during all operating hours at food service premises. Compliance reduces illness risk but does not replace liability coverage.",
      },
      {
        title: "Product Liability / Food Illness",
        description:
          "May respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations coverage within a CGL policy or by endorsement — scope and exclusions vary by carrier and wording. Foodborne illness allegations, undeclared allergen incidents, and contamination events can generate third-party claims distinct from a slip-and-fall or other premises injury. Product liability / products-completed operations is a separate coverage topic from general liability — which addresses certain premises and operations claims in the Explorer above — and should be confirmed with your broker, not assumed from a standard CGL label alone. Food handler compliance under O. Reg. 493/17 is a public health obligation, not a substitute for this coverage.",
      },
      {
        title: "Liquor licensing, civil liability, and insurance are three different things",
        description:
          "AGCO issues Liquor Sales Licences for eligible premises. Under the Liquor Licence and Control Act, licensees can face civil liability for harm tied to alcohol service — AGCO's own licensing guidance states there is more to lose than your licence and recommends consulting an insurance professional. That civil exposure exists independently of whether you carry insurance. The Act itself does not mandate liquor liability insurance as a statutory condition of licensing. Separately, a landlord, lender, franchise, or other counterparty may require proof of liquor liability insurance under a lease or other contract — that is a contractual documentation requirement, not the same thing as a provincial insurance mandate. Liquor liability insurance, where purchased, is a commercial product that may help respond to certain alcohol-related claims standard general liability excludes or limits — confirm inclusion with your broker.",
      },
      {
        title: "Delivery and app-based orders",
        description:
          "In-house or third-party delivery can create commercial auto or hired and non-owned auto exposures when staff use personal vehicles. Disclose your delivery model — platform vendor agreements may impose their own certificate requirements.",
      },
      {
        title: "Kitchen fire and suppression maintenance",
        description:
          "Hood and duct cleaning, fire suppression inspection, and fryer protocols affect both fire code compliance and property underwriting.",
      },
      {
        title: "Patio and seasonal operations",
        description:
          "Outdoor seating may require municipal encroachment agreements and AGCO licensing of outdoor areas. Seasonality affects business income projections.",
      },
      {
        title: "Business Interruption",
        description:
          "May help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service, subject to waiting periods, limits, and policy terms — particularly relevant where payroll and rent continue during repairs. After a covered fire, major water loss, or extended equipment failure, repairs can take weeks while fixed costs continue — lease payments, core staff, loan obligations, and supplier commitments do not pause automatically. Business interruption is a distinct coverage from commercial property insurance for physical damage to the building or contents; it addresses income and continuing expense loss during a covered suspension. For seasonal or patio-driven revenue in Windsor–Essex, accurate peak-period projections matter when underwriting this coverage — separate from the property values discussed in the Explorer above.",
      },
      {
        title: "Lease and franchisor requirements",
        description:
          "Leases often specify minimum liability limits, additional insured status, and evidence of property coverage. Franchise manuals may add requirements — including liquor liability certificates where alcohol is served.",
      },
      {
        title: "WSIB and kitchen employee injuries",
        description:
          "Most Ontario employers must carry WSIB coverage for workers. WSIB is a statutory workplace insurance system, separate from commercial general liability.",
      },
      {
        title: "Did you know?",
        description:
          "Municipal business licences, fire inspections, and public health inspections are operational and regulatory requirements — not insurance coverages. They are listed here to explain why restaurant risk profiles differ from generic retail.",
      },
    ],
    faqTitle: "Restaurant insurance FAQ",
    faqItems: [
      {
        question: "Do I need liquor liability if I serve alcohol?",
        answer:
          "If you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability is commonly purchased because general liability often excludes or limits liquor-related claims. That is an insurance gap question — not the same as a provincial licensing rule. The Liquor Licence and Control Act does not mandate liquor liability insurance as a statutory condition of holding a licence. AGCO's licensing guidance confirms licensees may face civil liability for harm caused by someone served liquor at the business — separate from administrative penalties such as suspension or revocation — and recommends consulting an insurance professional. Separately, a landlord, lender, franchise, or other counterparty may require proof under a lease, franchise, or lender agreement — those are contractual documentation requirements; they do not change the fact that the Act itself does not prescribe a named insurance product. If you also cater off-site events with alcohol under a Caterer's Endorsement or Special Occasion Permit, the same insurance-versus-regulation distinction applies: LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance, though a venue may require it — confirm what each contract actually asks for.",
      },
      {
        question: "Is food spoilage from a power outage covered?",
        answer:
          "Sometimes — often through spoilage or equipment breakdown endorsements, not the base property form alone. Coverage depends on the cause of the outage (on-premises equipment failure versus widespread grid failure) and your policy wording.",
      },
      {
        question: "Do I need coverage for delivery drivers?",
        answer:
          "If staff deliver in company or personal vehicles, commercial auto and/or hired and non-owned auto exposures should be reviewed. Third-party delivery platforms may impose their own insurance requirements in vendor agreements.",
      },
      {
        question: "What food safety rules apply in Ontario?",
        answer:
          "Food service premises must comply with O. Reg. 493/17, including food handler certification on site during operating hours. Public health units inspect and enforce these rules — separate from your insurance policy.",
      },
      {
        question: "What information do I need for a restaurant quote?",
        answer:
          "Cuisine type, seating capacity, liquor sales percentage (if licensed), hours, cooking methods, location and construction details, equipment and inventory values, delivery model, prior claims, and any lease, franchisor, or lender insurance requirements.",
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
        question: "What is OCIP and how does it relate to wrap-up coverage?",
        answer:
          "An Owner Controlled Insurance Program (OCIP) is a type of wrap-up where the project owner sponsors a single liability program for the job site — often covering the owner, general contractor, and enrolled subcontractors. A Contractor Controlled Insurance Program (CCIP) is the GC-led equivalent. Your broker can explain which structure fits a project and what enrollment means for subs.",
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
      "Food trucks and mobile food trailers combine two different risk profiles: a vehicle on Ontario roads and a kitchen that serves the public at events, commissaries, and temporary locations. Depending on how you operate, that can mean commercial automobile insurance for the truck or tow vehicle, general liability and product liability for customer and food-related claims, and separate coverage for cooking equipment, refrigeration, and inventory — subject to the policies you purchase. Premium Insurance Brokers can help you map those pieces to your actual setup, whether you run a self-propelled truck, a towable trailer, or both.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Food Truck Quote",
    coverageIntro:
      "Mobile food insurance usually involves more than one policy component — from automobile coverage for the unit on the road to business liability and equipment coverage for the kitchen you operate at events and service locations. What you need depends on whether you use a self-propelled truck, a towable trailer, attached cooking equipment, and where you prep and serve food.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from your food-service operations at events, parking areas, commissaries, and other service locations, subject to policy terms, exclusions, and limits.",
        detailTitle: "When a line at your service window becomes a liability claim",
        detailDescription:
          "A customer slip, scalding incident, or property damage at a festival, private event, or curbside service location can generate a third-party claim tied to your operations — not your vehicle's road use. General liability may address certain premises and operations claims, but whether a temporary location, off-site event, or commissary is covered depends on policy wording. Event organizers and municipalities often require certificates of insurance with specific limits or additional-insured status — those are contractual requirements separate from what any single policy automatically includes.",
        icon: Briefcase,
      },
      {
        title: "Commercial Auto",
        shortLabel: "Auto",
        description:
          "May help with automobile liability and, where purchased, physical damage for a self-propelled food truck or other commercial vehicle used in the business, subject to FSRA-regulated policy terms — separate from general liability for food-service claims. How a towable trailer is insured depends on the automobile policy and how the unit is scheduled.",
        detailTitle: "On the road is a different policy question than at the service window",
        detailDescription:
          "Ontario automobile insurance for business use is regulated separately from commercial general liability. A self-propelled food truck or vehicle used to tow a food trailer for business needs appropriate automobile coverage for that use. How the trailer itself is insured—including physical damage—depends on the automobile policy and how the unit is scheduled. Physical damage coverage for the vehicle unit may not treat permanently installed kitchen equipment, stock, or business personal property the same way as dedicated property or equipment coverage. If you use a personally insured vehicle to tow a food trailer for business, disclose that use to your insurer or broker. Do not assume the existing personal automobile policy is appropriate for the commercial exposure.",
        icon: Truck,
      },
      {
        title: "Equipment Coverage",
        shortLabel: "Equipment",
        description:
          "May help cover certain cooking equipment, refrigeration, generators, POS systems, and other business property — attached or portable — subject to how the policy schedules equipment and what causes of loss apply.",
        detailTitle: "The kitchen inside the truck is not always insured like the truck itself",
        detailDescription:
          "Fryers, flat tops, refrigeration, generators, and fitted interiors can represent a large share of your insurable value — but commercial auto physical damage may not fully cover permanently installed kitchen equipment or inventory. Depending on the policy, equipment may be insured under commercial property or equipment coverage, depending on how the equipment is installed, stored and used — an equipment floater may apply for certain portable or scheduled gear. Equipment breakdown and spoilage endorsements, where available, address different causes of loss than standard fire or theft — confirm triggers and sublimits with your broker rather than assuming refrigeration failure or spoiled stock is automatically covered.",
        icon: Package,
      },
      {
        title: "Product Liability",
        shortLabel: "Food Claims",
        description:
          "May help respond to certain claims alleging illness, allergic reaction, or injury from food you prepared, handled, or sold, often as products-completed operations coverage within a general liability policy or by endorsement — subject to policy terms.",
        detailTitle: "Foodborne illness claims are a distinct exposure from a slip-and-fall",
        detailDescription:
          "Allegations that your food caused illness, allergic reaction, or contamination can generate product liability or products-completed operations claims — separate from a simple premises injury at your service window. Ontario's Food Premises regulation contains requirements for mobile food premises; food-handler certification requirements depend on the type of food operation. Public health compliance supports safe operations but does not replace this coverage. What triggers a product claim, how completed operations are defined, and whether off-site events are included depend on policy wording — confirm scope with your broker.",
        icon: UtensilsCrossed,
      },
    ],
    considerations: [
      {
        title: "Self-propelled truck, towable trailer, or tow vehicle",
        description:
          "A self-propelled food truck or vehicle used to tow a food trailer for business needs appropriate automobile coverage for that use. How the trailer itself is insured—including physical damage—depends on the automobile policy and how the unit is scheduled. Business liability and equipment coverage address the food operation and kitchen — the two are related but not interchangeable. If you use a personally insured vehicle to tow a food trailer for business, disclose that use to your insurer or broker. Do not assume the existing personal automobile policy is appropriate for the commercial exposure.",
      },
      {
        title: "Commercial auto does not replace business liability or kitchen property coverage",
        description:
          "Ontario automobile insurance regulated by FSRA covers automobile exposures. Customer injury at your service window, foodborne illness allegations, and damage to fitted cooking equipment may fall under general liability, product liability, or property/equipment forms — depending on the policy. One policy type does not automatically cover every mobile food exposure.",
      },
      {
        title: "Attached, portable, and off-premises equipment",
        description:
          "Equipment permanently installed in a truck or trailer may be underwritten differently from portable generators, POS terminals, or gear stored at a commissary. Insurers often ask for equipment schedules and values. Confirm whether gear removed from the vehicle at events is covered under commercial property or equipment coverage, depending on how the equipment is installed, stored and used.",
      },
      {
        title: "Propane, cooking equipment, and fire safety",
        description:
          "Deep fryers, grills, propane systems, and generators create fire and safety exposure that insurers evaluate during underwriting. In Windsor, municipal licensing rules include fire-extinguisher requirements and requirements relating to propane equipment used on licensed mobile food vehicles. Insurers may also ask about cooking methods, propane, generators, extinguishing equipment and maintenance during underwriting. Compliance with municipal rules and safety maintenance are separate from insurance coverage.",
      },
      {
        title: "Mobile food premises and food-handler requirements",
        description:
          "Ontario's Food Premises regulation contains requirements for mobile food premises, while food-handler certification requirements depend on the type of food operation. Windsor mobile-vendor licensing also includes WECHU clearance and food-handler requirements for applicable licence classes. Public health compliance reduces risk but is separate from liability insurance.",
      },
      {
        title: "Commissary prep, storage, and where food is made",
        description:
          "Some operators prep primarily on the truck; others use a commissary, rented kitchen, or central prep facility. Where food is prepared affects public health inspection scope and may affect how insurers evaluate your premises, off-premises operations, and property coverage. Municipal licensing rules may also restrict where certain foods may be prepared — Windsor's Schedule M2 includes restrictions on preparing or wrapping food in/at the vehicle for some licence classes. Disclose all prep and storage locations to your broker.",
      },
      {
        title: "Festivals, events, and certificate requirements",
        description:
          "Farmers markets, festivals, corporate events, and private venues often require proof of insurance — sometimes with specific limits, additional-insured wording, or waiver of subrogation. Those are contractual requirements from the event organizer or property owner, not provincial statutes. Bring event contracts to your broker so certificates match what you actually agreed to.",
      },
      {
        title: "Refrigeration, spoilage, and income after a covered loss",
        description:
          "Perishable inventory and onboard refrigeration make spoilage and equipment failure high-impact exposures for mobile food operators. Spoilage and equipment breakdown coverage, where purchased, may respond to certain inventory or equipment losses — subject to causes of loss, sublimits, and endorsements. Business interruption may help with lost income after a covered property loss, but a licence suspension, weather cancellation, or breakdown excluded by policy wording may not trigger the same coverage. Confirm what must happen before income coverage applies.",
      },
    ],
    faqTitle: "Food truck & trailer FAQ",
    faqItems: [
      {
        question: "Is a towable food trailer insured differently from a self-propelled food truck?",
        answer:
          "Often yes — or at minimum, the policy structure differs. A self-propelled food truck is typically insured as a commercial vehicle with both road-use and kitchen exposures to disclose. A towable trailer may need coverage for the trailer unit, the towing vehicle, and the business operation separately — especially if a personal vehicle tows the trailer for business. A self-propelled food truck or vehicle used to tow a food trailer for business needs appropriate automobile coverage for that use; how the trailer itself is insured—including physical damage—depends on the automobile policy and how the unit is scheduled. General liability, product liability, and equipment coverage address the food-service and kitchen exposures. If you use a personally insured vehicle to tow a food trailer for business, disclose that use to your insurer or broker. Do not assume the existing personal automobile policy is appropriate for the commercial exposure.",
      },
      {
        question: "Does my commercial auto policy cover the kitchen equipment inside my truck?",
        answer:
          "Not necessarily — or not for every cause of loss. Commercial auto physical damage may cover the vehicle unit itself, but permanently installed cooking equipment, refrigeration, inventory, and portable gear may need commercial property or equipment coverage, depending on how the equipment is installed, stored and used. Equipment breakdown and spoilage are separate endorsements with their own triggers. Review what is attached to the vehicle, what is removable, and what is stored off-premises so your broker can match coverage to how the kitchen is actually insured.",
      },
      {
        question: "Do I need insurance to vend at festivals, farmers markets, or private events?",
        answer:
          "Provincial food-premises rules do not prescribe a named festival insurance product, but event organizers, municipalities, and venue owners frequently require proof of general liability insurance — often with minimum limits or additional-insured wording in the event contract. That is a contractual requirement from the organizer or property owner, not the same thing as a provincial licensing insurance mandate. Your existing business policies may respond to certain claims at temporary locations depending on policy wording, but the certificate requirements in your contract must be reviewed against what your policies can actually provide.",
      },
      {
        question: "Is food spoilage automatically covered if my refrigerator or generator fails?",
        answer:
          "No—not automatically. Whether spoiled food is insured depends on the property/equipment coverage and endorsements you purchased, the cause of the temperature change or equipment failure, and applicable limits. Spoilage and equipment breakdown coverage, where available, depends on the cause of loss, equipment type, sublimits, and policy terms. A generator failure, compressor breakdown, or power interruption may be treated differently depending on the wording purchased. Confirm with your broker rather than assuming onboard refrigeration is fully covered.",
      },
      {
        question: "Can a food truck serve alcohol in Ontario?",
        answer:
          "Not under a standalone mobile bar or food-truck liquor licence — Ontario does not issue that type of authorization. Alcohol service in connection with mobile or catered food operations typically involves an AGCO framework such as a Caterer's Endorsement on an existing Liquor Sales Licence at a sponsored event, or a Special Occasion Permit at the event location — each with different rules and responsibilities. If alcohol service applies to your business model, disclose it to your broker so liquor liability and event coverage can be reviewed separately from standard food-truck insurance.",
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
      "Dump truck insurance through an independent Windsor-Essex broker — commercial auto liability, physical damage, load and debris exposure, and non-trucking liability for construction and aggregate hauling.",
    headline: "Dump Truck Insurance",
    subhead:
      "Dump truck operations combine heavy commercial automobile exposure on public roads with construction-site and material-handling risks that ordinary fleet policies do not fully describe — tipping, loading, aggregate or excavation work, and jobsite access differ from long-haul freight hauling. Depending on your operation, that can mean Ontario-regulated commercial automobile liability and physical damage for the unit, separate coverage for certain load or debris exposures where purchased, and non-trucking liability when a leased unit operates outside dispatch — each subject to policy terms. Whether you haul your own material, haul for hire, or operate as a contractor's dedicated truck changes underwriting and contract requirements. Premium Insurance Brokers can align coverage to how your dump trucks actually work.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Dump Truck Quote",
    coverageIntro:
      "Dump truck insurance usually separates regulated automobile coverage for the heavy unit on the road from optional load, debris, or non-dispatched liability exposures — depending on whether you haul for hire or your own material, jobsite work, commodities, and lease structure.",
    coverageTypes: [
      {
        title: "Commercial Auto Liability",
        shortLabel: "Auto Liability",
        description:
          "Ontario commercial automobile third-party liability may help respond to certain bodily injury or property-damage claims arising from the use of your dump truck on public roads — subject to FSRA-regulated policy terms, limits, and exclusions.",
        detailTitle: "On the highway is automobile liability — jobsites may be different",
        detailDescription:
          "Collisions, property damage, and injury claims arising while your dump truck travels on public roads are typically evaluated under commercial automobile liability — regulated separately from commercial general liability. Loading zones, active construction sites, tipping operations, or debris spills may involve different policy triggers depending on whether the loss arises from automobile use, CGL or operations liability, or pollution exclusions — where applicable under policy wording. Do not assume automobile liability automatically covers every incident that happens while dumping or entering a jobsite — confirm how your policies define covered automobile use and operations.",
        icon: Briefcase,
      },
      {
        title: "Physical Damage",
        shortLabel: "Phys. Damage",
        description:
          "Collision and comprehensive coverage for your dump truck, where purchased, may help repair or replace the unit after covered losses — subject to stated values, deductibles, and policy wording.",
        detailTitle: "Heavy units, bodies, and hydraulics drive values and deductibles",
        detailDescription:
          "Dump bodies, hydraulics, tailgates, and reinforcement add to insurable value beyond a standard straight truck. Rollover, overturn, and contact with overhead structures on jobsites are loss scenarios insurers evaluate. Physical damage responds only to covered causes of loss under the automobile policy — mechanical breakdown of hydraulics or wear items may be excluded unless specific endorsements apply. Accurate GVW, body type, and equipment values support proper limits.",
        icon: Truck,
      },
      {
        id: "cargo-debris-coverage",
        title: "Load & Debris Exposure",
        shortLabel: "Load / Debris",
        description:
          "May help address certain loss to aggregate, soil, asphalt, or other material you haul — or debris falling from the vehicle — where purchased and subject to policy terms, commodities, and whether you haul for others or your own material.",
        detailTitle: "Own material hauling is not the same as for-hire freight",
        detailDescription:
          "Many dump operators haul their own excavation, aggregate, or demolition material rather than customers' freight — underwriting and available coverage differ from motor-carrier cargo policies. When you do haul for others, contracts may specify load limits. Spills, unsecured loads, and debris striking other vehicles create distinct exposure that may be addressed under automobile liability, load coverage endorsements, or pollution-related forms depending on cause and policy wording — not automatically under one label. Disclose whether hauling is for-hire, contract-based, or solely for your own jobs.",
        icon: Container,
      },
      {
        title: "Non-Trucking Liability",
        shortLabel: "Non-Trucking",
        description:
          "May provide certain automobile liability coverage when a leased or contracted unit is used outside motor-carrier dispatch — where purchased and subject to lease terms and policy definitions.",
        detailTitle: "Bobtail and non-dispatched use need explicit lease review",
        detailDescription:
          "Operators leased to a motor carrier or running under another party's dispatch may need non-trucking liability — sometimes called bobtail coverage — for trips without a load or outside dispatch, depending on lease language. This is not a substitute for commercial automobile liability while operating under dispatch, and it does not cover cargo or physical damage to the unit unless separately arranged. Lease agreements often specify minimum insurance — contractual requirements separate from Ontario statutory automobile rules.",
        icon: Route,
      },
    ],
    considerations: [
      {
        title: "For-hire hauling vs. own-material or contractor use",
        description:
          "A dump truck hauling aggregate for customers under contract faces motor-carrier-style cargo and automobile requirements different from a contractor moving soil between its own excavation sites. Insurers ask who owns the material, who holds the contract, and whether loads are billed to third parties. Mischaracterizing the operation can leave cargo or liability gaps.",
      },
      {
        title: "Road exposure vs. jobsite and dumping operations",
        description:
          "Public-road collisions are automobile exposures. Tipping on uneven ground, contact with utilities, or property damage while maneuvering on a construction site may implicate different policy sections or exclusions — including CGL or operations liability where applicable under policy wording. Loading and unloading at quarries, asphalt plants, and demolition sites each carry distinct third-party property and injury exposure.",
      },
      {
        title: "Material type and seasonal operations",
        description:
          "Aggregate, soil, asphalt, demolition debris, and snow removal each present different spill, weight, and environmental concerns. Seasonal operators should disclose peak months and stored equipment. High-value or hazardous material may need specific endorsements or may be excluded — confirm commodities with your broker.",
      },
      {
        title: "Pollution and environmental exposure — conditional",
        description:
          "Soil contamination, fuel spills, or asbestos-laden demolition debris can create pollution liability exposure that standard automobile liability may exclude. Pollution coverage is not universally required for every dump operator — availability depends on material hauled, contracts, and site requirements. Regulatory remediation obligations are separate from insurance.",
      },
      {
        title: "Hydraulics, bodies, and equipment values",
        description:
          "Dump bodies, tailgates, and hydraulic systems represent significant repair costs. Physical damage coverage schedules the unit as a whole — confirm whether aftermarket bodies and equipment are included in stated values. Equipment breakdown of non-auto systems may fall outside automobile physical damage.",
      },
      {
        title: "CVOR and heavy commercial vehicle rules",
        description:
          "Qualifying dump trucks may require a valid Ontario CVOR certificate from the Ministry of Transportation — regulatory registration separate from insurance. CVOR monitors carrier safety performance; insurers may review related history during underwriting. Confirm on the MTO website whether each unit requires CVOR before operating.",
      },
    ],
    faqTitle: "Dump truck insurance FAQ",
    faqItems: [
      {
        question: "Is a dump truck insured differently from a regular commercial truck?",
        answer:
          "Often yes in underwriting, even when policy forms overlap. Dump operations involve heavy GVW, tipping, construction-site access, and material types that differ from van or long-haul freight. Automobile liability and physical damage still form the core, but load/debris exposure, jobsite incidents, and whether you haul for hire or your own material change how coverage should be structured — disclose your actual use to your broker.",
      },
      {
        question: "What about damage while dumping or unloading?",
        answer:
          "Whether damage during tipping, unloading, or jobsite maneuvering is insured depends on the cause of loss and which policy applies — commercial automobile liability, load endorsements, or commercial general liability may each address different scenarios subject to exclusions. Overturn, contact with overhead lines, or spill onto third-party property are not automatically covered without reviewing policy triggers.",
      },
      {
        question: "Does my policy cover the material I haul?",
        answer:
          "Not automatically. Operators hauling their own material may have different coverage options than for-hire carriers moving customers' freight. Load or cargo-related endorsements, where available, depend on commodities, valuation, and policy wording. Contractual requirements from general contractors or quarry owners may specify limits separately from your automobile policy.",
      },
      {
        question: "What if I work mainly on construction sites?",
        answer:
          "Construction-site access, tight maneuvering, and interaction with other trades create automobile and operations exposure beyond highway travel. Disclose typical jobsite types, whether you enter active excavations, and if you sub-contract to general contractors — certificates and additional-insured requirements are often contractual.",
      },
      {
        question: "Does hauling soil or demolition material change underwriting?",
        answer:
          "It can. Material type affects spill exposure, weight limits, routing, and whether pollution or debris endorsements are needed. Demolition debris, asphalt, and contaminated soil may face stricter exclusions or higher deductibles. Provide accurate commodity descriptions and any contract requirements when quoting.",
      },
    ],
    ctaHeading: "Ready to cover your dump truck?",
    ctaSubhead:
      "Share your unit details, material hauled, jobsite work, and lease structure — we will compare dump truck coverage options.",
    serviceName: "Dump Truck Insurance",
  },
];

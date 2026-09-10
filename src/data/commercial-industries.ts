import {
  Briefcase,
  Building2,
  Container,
  Factory,
  Gavel,
  Hammer,
  HardHat,
  KeyRound,
  Laptop,
  Wrench,
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
import { cannabisIndustryPages } from "@/data/cannabis-industries";

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
    label: "Commercial Auto / Fleet",
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
    label: "Food Truck / Trailer",
    href: "/food-truck-insurance/",
    icon: UtensilsCrossed,
  },
  {
    label: "Dump Truck",
    href: "/dump-truck-insurance/",
    icon: Container,
  },
];

export type CommercialHubCategory = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

/** Orientation-level coverage categories for the commercial insurance hub — links only, not Explorer states. */
export const commercialHubCategories: CommercialHubCategory[] = [
  {
    label: "Commercial Property",
    href: "/commercial-property-insurance/",
    description:
      "Orientation for buildings, contents, equipment, and inventory your business owns or must insure — details live on the property page.",
    icon: Building2,
  },
  {
    label: "Small Business",
    href: "/small-business-insurance/",
    description:
      "A starting point for assembling everyday commercial coverage — including liability, property, and other lines that fit how the business actually operates.",
    icon: Briefcase,
  },
  {
    label: "Commercial Auto & Fleet",
    href: "/commercial-auto-insurance/",
    description:
      "For company vehicles used in deliveries, service calls, or sales work — reviewed separately from premises liability.",
    icon: Truck,
  },
  {
    label: "Business Interruption",
    href: "/business-interruption-insurance/",
    description:
      "Where purchased with property, may help replace income after a covered physical loss stops operations.",
    icon: Factory,
  },
  {
    label: "Professional Liability / E&O",
    href: "/professional-liability-insurance/",
    description:
      "For claims alleging mistakes in professional advice, design, or services — distinct from general liability.",
    icon: Laptop,
  },
  {
    label: "Cyber Insurance",
    href: "/cyber-insurance/",
    description:
      "For certain privacy, ransomware, and system-interruption events that ordinary property forms often restrict.",
    icon: Shield,
  },
  {
    label: "Crime & Fidelity",
    href: "/crime-fidelity-insurance/",
    description:
      "For specified employee theft, forgery, and related fraud — usually separate from ordinary property coverage.",
    icon: KeyRound,
  },
  {
    label: "Pollution Liability",
    href: "/pollution-liability-insurance/",
    description:
      "For environmental contamination exposures that general liability may restrict — when your operations warrant review.",
    icon: HardHat,
  },
  {
    label: "Equipment on Commercial Property",
    href: "/commercial-property-insurance/",
    description:
      "Equipment breakdown is reviewed on the Commercial Property page — there is no separate equipment-breakdown product route.",
    icon: Wrench,
  },
  {
    label: "Directors & Officers",
    href: "/directors-officers-insurance/",
    description:
      "For certain management and governance claims against directors and officers — distinct from premises liability.",
    icon: Gavel,
  },
];

export const commercialHubFaqs: FaqItem[] = [
  {
    question: "What's the difference between commercial and personal insurance?",
    answer:
      "Personal policies cover you, your home, and personal vehicles. Commercial insurance addresses business liability, property, fleets, employees, and income interruption after certain covered losses. Using personal coverage for work activity can leave gaps — a broker can help keep the two separate.",
  },
  {
    question: "Do I need every type of commercial coverage?",
    answer:
      "No. Most Windsor–Essex businesses assemble liability, property, and auto only where needed, then add specialty lines such as cyber or pollution when exposures warrant them. Nothing here is an automatic bundle.",
  },
  {
    question: "How is this page different from small business insurance?",
    answer:
      "This hub helps you find industry and coverage routes across the commercial site. Small business insurance explains how to assemble a program for owner-operators in more detail. Start here for navigation; follow the links that match your operations.",
  },
  {
    question: "How is commercial insurance priced?",
    answer:
      "Carriers look at industry, revenue or payroll, locations, property and fleet values, products, claims history, limits, and contract requirements. Similar businesses can still price differently.",
  },
  {
    question: "What information helps start a commercial quote?",
    answer:
      "Share what you do, revenue or payroll, locations, vehicles and equipment, inventory values, current coverage, claims history, and any certificate requirements. Accurate details help a broker compare markets — availability still depends on underwriting.",
  },
];

export const commercialBrokerCopy =
  "Independent advice across multiple commercial carriers — not one company's product shelf. Plain-language guidance, and real support if a claim happens.";

export type IndustryPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  /** Optional trust-band copy — when set, used instead of subhead for the trust statement. */
  whoItIsFor?: string;
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
      "Commercial auto insurance through an independent Windsor-Essex broker — Ontario third-party liability, accident benefits, uninsured automobile, DCPD, optional physical damage, and hired & non-owned auto for business fleets and company vehicles.",
    headline: "Commercial Auto & Fleet Insurance",
    subhead:
      "Commercial auto insurance addresses Ontario-regulated automobile coverage for vehicles your business owns, leases, or puts on the road for work — service vans, contractor pickups, delivery units, sales fleets, and other ordinary commercial automobile risks. That is different from for-hire motor carrier programs on our trucking page or cargo-only coverage for freight in transit. Ontario automobile policies must include third-party liability of at least $200,000 per accident, uninsured automobile coverage, and — unless the named insured opts out using OPCF 49 — Direct Compensation Property Damage (DCPD). As of July 1, 2026, standard medical, rehabilitation, and attendant care accident benefits remain mandatory; other statutory accident benefits may be optional where your policy form allows. Collision, comprehensive, and hired/non-owned auto are not automatic on every commercial policy — each must be confirmed with your broker. Premium Insurance Brokers can help Windsor–Essex businesses compare automobile programs for how your team actually uses vehicles.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Fleet Quote",
    coverageIntro:
      "Ontario business automobile coverage is organized here by regulated liability and accident benefits, optional physical damage, hired and non-owned exposure, and multi-vehicle fleet structure — because mandatory coverages, endorsements, and underwriting differ from personal auto and from for-hire trucking programs.",
    coverageTypes: [
      {
        id: "liability-coverage",
        title: "Third-Party Auto Liability",
        shortLabel: "Auto Liability",
        description:
          "Ontario commercial automobile third-party liability — regulated under FSRA — may help respond to certain bodily injury or property-damage claims arising from the use of insured business vehicles on public roads, subject to policy terms, limits, and exclusions.",
        detailTitle: "Statutory minimums exist — adequate limits are a business decision",
        detailDescription:
          "Every Ontario motor vehicle liability policy must insure at least $200,000 per accident for third-party bodily injury and property damage — but serious highway claims can exceed that quickly. Many Windsor–Essex businesses purchase $1 million or $2 million limits, and contracts with landlords, municipalities, or general contractors may require higher certificates. As of July 1, 2026, optional accident benefits apply only to named insureds, spouses, dependants, and listed drivers — pedestrians, cyclists, and some passengers may rely more on third-party liability when optional benefits do not apply to them. Review limits at renewal, especially after the 2026 accident-benefit changes.",
        icon: Briefcase,
      },
      {
        id: "physical-damage-coverage",
        title: "Collision & Comprehensive (Optional)",
        shortLabel: "Phys. Damage",
        description:
          "Optional collision, comprehensive, and specified perils coverage — where purchased — may help repair or replace owned or leased business vehicles after covered losses, subject to deductibles, stated values, and policy wording.",
        detailTitle: "Physical damage is optional — lenders and lessors may require it",
        detailDescription:
          "Ontario does not require collision or comprehensive coverage by law. Many businesses still purchase physical damage to protect company trucks and vans against collision, theft, vandalism, and other insured perils — but triggers, deductibles, and valuation methods vary. DCPD covers not-at-fault damage to your vehicle through your insurer when you retain DCPD; collision covers at-fault or unidentified losses where purchased. Signing OPCF 49 to opt out of DCPD also affects how not-at-fault damage can be recovered — an uncommon choice for most business fleets. Accurate vehicle values support proper limits at renewal.",
        icon: Truck,
      },
      {
        id: "hired-non-owned-auto",
        title: "Hired & Non-Owned Auto",
        shortLabel: "HNOA",
        description:
          "Hired and non-owned automobile coverage — where purchased by endorsement such as OPCF 27 or through a commercial general liability extension — may address certain liability when employees or representatives drive rented, borrowed, or personal vehicles for business, subject to policy terms.",
        detailTitle: "Employee errands create liability your base auto policy may not cover",
        detailDescription:
          "When staff pick up parts, visit clients, or run errands in personal vehicles or rentals, your company's owned-vehicle automobile policy may not respond to third-party claims from that trip. Hired and non-owned auto — where added — is designed for that gap in business liability, not for physical damage to the employee's car. Personal auto policies often exclude or restrict business use; relying on an employee's personal coverage without review creates exposure. Disclose every regular non-owned vehicle use pattern when quoting.",
        icon: Route,
      },
      {
        id: "fleet-discounts-multi-vehicle-management",
        title: "Fleet & Multi-Vehicle Programs",
        shortLabel: "Fleet",
        description:
          "Multiple company vehicles may be scheduled on one commercial automobile program — with certificates, driver eligibility rules, and experience-rated pricing on some fleet arrangements — subject to insurer underwriting and policy structure.",
        detailTitle: "More vehicles means more data — and more certificate requests",
        detailDescription:
          "Whether you operate three service vans or thirty mixed units, insurers review vehicle lists, driver abstracts, radius, use class, and loss history together. Some markets experience-rate larger fleets; others rate each unit individually. Fleet reporting endorsements such as OPCF 21A may apply where purchased. This is broad commercial auto for business-owned fleets — not the same as for-hire trucking insurance, which adds motor truck cargo, CVOR context, and shipper contract requirements on a separate route.",
        icon: Container,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex service businesses, contractors, trades, local delivery operations, and companies with vans, pickups, or business-owned passenger vehicles — reviewed through an independent broker who can coordinate Ontario automobile coverage, optional physical damage, and hired/non-owned auto without treating every risk like a for-hire motor carrier.",
    considerations: [
      {
        title: "Vehicle type, weight, and business use class",
        description:
          "Insurers classify vehicles by use — service, delivery, sales, or contractor pickup — and by weight and registration. A half-ton pickup used to haul tools between job sites is rated differently from a for-hire freight tractor. Accurate use descriptions support proper eligibility; misclassification can affect claims. Heavy for-hire hauling belongs on trucking or dump-truck routes — not here.",
      },
      {
        title: "Drivers, abstracts, and licence class",
        description:
          "Commercial automobile underwriting typically reviews every regular driver: licence class, experience, convictions, and at-fault history. Young or occasional drivers may need to be listed. Driver eligibility conditions in the policy can affect coverage if an unlisted driver operates a company vehicle.",
      },
      {
        title: "Radius and territory of operation",
        description:
          "Local Windsor–Essex service routes present different exposure from regular interprovincial trips or U.S. crossings. Territory extensions, filings, and higher limits may be required for out-of-province or U.S. operation — confirm with your broker before lanes expand. Insurer programs vary; residual-market manuals may apply surcharges in specific markets that do not represent universal insurer practice.",
      },
      {
        title: "U.S. and out-of-province exposure",
        description:
          "Operating in Michigan or other U.S. states may require policy territory extensions, proof-of-insurance filings, and limits beyond a Canada-only program. Disclose every state entered and how often. Cross-border for-hire freight has additional contract and cargo considerations on our trucking and cargo pages.",
      },
      {
        title: "Fleet size and experience rating",
        description:
          "Some insurers treat ten or more power units as fleet business with experience-rated premiums and consolidated reporting — thresholds and formulas vary by market and are not universal rules. Smaller businesses may still schedule multiple vans on one policy with individual unit rating. Either way, current vehicle and driver lists support renewals.",
      },
      {
        title: "Vehicle values and physical damage choices",
        description:
          "Optional collision and comprehensive coverage depends on accurate stated values or actual cash value methods, chosen deductibles, and whether leased units require lender-compliant physical damage. OPCF 49 DCPD opt-out is optional and uncommon for business fleets — understand the trade-off before signing.",
      },
      {
        title: "Hired and non-owned auto exposure",
        description:
          "Employees using personal vehicles for deliveries, client visits, or errands may create liability gaps. Hired/non-owned coverage is not automatic — confirm whether OPCF 27 or a CGL auto extension is included. Personal auto business-use exclusions can leave the company exposed without it.",
      },
      {
        title: "Cargo and equipment — not the automobile policy",
        description:
          "Tools in a service van, stock for delivery, or freight hauled for others may need inland marine, cargo, or separate property coverage — Ontario automobile liability does not replace motor truck cargo for customers' goods. See our cargo and freight page when you haul property belonging to others for hire.",
      },
    ],
    faqTitle: "Commercial auto FAQ",
    faqItems: [
      {
        question: "What makes a vehicle commercial for insurance purposes?",
        answer:
          "Insurers look at how the vehicle is registered and used — business deliveries, client visits, carrying tools or stock, fleet scheduling, and commercial plates or weight class all point toward commercial automobile rating. A personally owned truck used only for commuting is usually personal auto; the same truck used daily between job sites for your company is typically commercial. If your operation involves for-hire freight, heavy motor-carrier units, or CVOR-regulated hauling, our trucking or dump-truck pages may be the better starting point.",
      },
      {
        question: "What automobile coverage is mandatory in Ontario?",
        answer:
          "Ontario requires third-party liability of at least $200,000 per accident, uninsured automobile coverage, and Direct Compensation Property Damage (DCPD) unless the named insured opts out using OPCF 49. As of July 1, 2026, standard medical, rehabilitation, and attendant care accident benefits remain mandatory on Ontario automobile policies; other statutory accident benefits may be optional where your policy form allows. Collision and comprehensive physical damage are not compulsory by law — though lenders may require them contractually.",
      },
      {
        question: "Are collision and comprehensive mandatory?",
        answer:
          "No. Collision, comprehensive, and specified perils are optional coverages in Ontario — purchased where you choose to insure physical damage to your vehicles. Many businesses add them to protect company trucks and vans, but the law does not require them. Finance and lease agreements often require physical damage coverage as a contract condition separate from statutory minimums.",
      },
      {
        question: "What about employees using personal vehicles for work?",
        answer:
          "Company-owned vehicle policies cover scheduled business autos — not every trip an employee takes in their personal car. Hired and non-owned automobile coverage, where purchased by endorsement such as OPCF 27, may address certain business liability from those trips. Personal auto policies frequently exclude or restrict business use, so assuming an employee's personal coverage protects the company creates gap risk. Tell your broker how often staff drive personal or rented vehicles for work.",
      },
      {
        question: "What information do I need for a commercial auto quote?",
        answer:
          "Expect to provide vehicle details (year, make, model, VIN), ownership or lease status, how each unit is used, annual distance or radius, driver information with licence class and abstracts, desired liability limits, and current policy or claims history. If any vehicles cross into the U.S. or operate outside Ontario regularly, disclose that territory up front so filings and extensions can be quoted accurately.",
      },
    ],
    ctaHeading: "Ready to cover your fleet?",
    ctaSubhead:
      "Tell us about your vehicles, drivers, and territory — we'll compare Ontario commercial automobile options and explain what fits your operation.",
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
      "Contractors insurance through an independent Windsor-Essex broker — commercial general liability, tools and equipment, project participation, and wrap-up enrollment for trades.",
    headline: "Contractors Insurance",
    subhead:
      "Contractors insurance is about the operating contracting business — the trade or general contractor that bids work, manages crews and subcontractors, and moves between job sites. Commercial general liability addresses certain third-party injury and property-damage claims arising from your operations. Tools and contractors equipment coverage, where purchased, addresses owned tools and mobile equipment. Project property (builder's risk) and wrap-up or OCIP programs are usually project-specific overlays — not substitutes for ongoing business coverage. Needs differ across general contractors, electricians, plumbers and HVAC, roofers, excavation and concrete trades, renovators, and landscapers. Premium Insurance Brokers can help Windsor-Essex contractors align certificates, additional-insured requests, and trade exposures with how you actually work.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Contractors Quote",
    coverageIntro:
      "Core coverages for the operating contractor — liability and tools for ongoing work, plus project property and wrap-up participation when a specific job requires them.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "GL",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from your contracting operations — subject to policy terms, exclusions, and limits.",
        detailTitle: "Job-site injury claims follow your operations — not the owner's property policy",
        detailDescription:
          "CGL addresses third-party claims from your work — slips, property damage, and certain completed-operations allegations depending on wording. It does not insure your tools, your vehicles, or the building under construction. Contractual additional-insured and waiver requests must match actual policy capabilities.",
        icon: Briefcase,
      },
      {
        title: "Tools & Equipment Coverage",
        shortLabel: "Tools",
        description:
          "May help cover owned tools and mobile equipment against covered theft or damage — where purchased and subject to scheduling, locations, and deductibles.",
        detailTitle: "Stolen tools are rarely covered by liability alone",
        detailDescription:
          "Tool and equipment policies or inland marine floaters schedule items, job-site limits, and overnight storage rules. A theft from a trailer may be excluded without proper coverage and security compliance.",
        icon: Hammer,
      },
      {
        title: "Builder's Risk",
        shortLabel: "Project Property",
        description:
          "Project property coverage for work in progress — usually arranged per project when your contract requires it; separate from ongoing commercial general liability.",
        detailTitle: "When the contract names you to insure the build",
        detailDescription:
          "Contractors may be required to place or be named on a builder's risk policy for specific projects. That coverage insures the project structure and materials — not your commercial liability for injury claims. Confirm per contract; do not assume your GL replaces builder's risk.",
        icon: HardHat,
      },
      {
        title: "Wrap-Up Liability",
        shortLabel: "Wrap-Up",
        description:
          "A wrap-up or OCIP may provide certain project-site liability coverage for enrolled trades — subject to program wording, enrollment, exclusions, and limits.",
        detailTitle: "OCIP changes whose policy responds on site",
        detailDescription:
          "Large projects may use an owner- or contractor-controlled wrap-up. A wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Their own insurance program may still be needed for exposures outside the wrap — including off-site operations, auto, tools, and non-enrolled work.",
        icon: Building2,
      },
    ],
    considerations: [
      {
        title: "Certificates, additional insured, and waiver wording",
        description:
          "Owners and GCs often require certificates before mobilization, plus additional-insured status, waivers of subrogation, and primary/non-contributory wording. Those are contractual asks — your broker must confirm the policy can actually support them. A certificate alone does not expand coverage beyond the policy.",
      },
      {
        title: "Subcontractor insurance requirements and COI review",
        description:
          "General contractors commonly require subs to carry their own liability (and often WSIB clearance in Ontario), with minimum limits and certificate deadlines. Reviewing sub COIs reduces gaps when a claim involves lower-tier trades — but each party still needs coverage appropriate to its work.",
      },
      {
        title: "OCIP / wrap enrollment vs your own GL",
        description:
          "On Owner Controlled or Contractor Controlled Insurance Programs, a wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Off-site operations, commercial auto, tools, and non-enrolled work usually still need your own policies. Enrollment is not a full replacement for an operating contractor program.",
      },
      {
        title: "Tools and equipment — job-site theft and scheduling",
        description:
          "Tool schedules, job-site limits, overnight storage, and locked-vehicle conditions affect whether a theft claim may respond. High-value specialty tools may need itemization. Liability policies do not replace stolen tools.",
      },
      {
        title: "When builder's risk applies to your contract role",
        description:
          "Some contracts require the contractor to place or be named on builder's risk for that project. Others assign placement to the owner. Confirm who buys project property coverage before you assume your GL addresses the structure under construction.",
      },
      {
        title: "Trade-specific exposures differ",
        description:
          "Roofing, excavation, electrical, plumbing/HVAC, concrete, renovation, and landscaping present different height, underground, water, fire, and completed-operations patterns. Design-build or drafting responsibility may introduce professional liability questions. Pollution exposures can arise for excavation, fuel, or abatement work. Do not assume identical coverage across trades.",
      },
      {
        title: "Commercial auto vs CGL — travelling between sites",
        description:
          "Driving between job sites in a company vehicle is generally a commercial automobile exposure — regulated separately from CGL. Hired and non-owned auto may matter when staff use rentals or personal vehicles for work. CGL does not replace automobile coverage for highway use.",
      },
      {
        title: "Completed operations after you leave the site",
        description:
          "Claims alleging injury or damage from your completed work can surface after demobilization. Products-completed operations coverage under a CGL may respond subject to policy wording, exclusions, and limits — it is not open-ended. Defective work itself is often treated differently from resulting damage.",
      },
    ],
    faqTitle: "Contractors insurance FAQ",
    faqItems: [
      {
        question: "Does commercial general liability cover my tools or vehicles?",
        answer:
          "Generally no. CGL addresses certain third-party bodily injury and property-damage claims arising from your operations — subject to policy terms. Stolen or damaged tools need tools/equipment or inland marine coverage where purchased. Company vehicles need commercial automobile coverage. Do not rely on CGL alone for tools or highway auto exposures.",
      },
      {
        question: "Do subcontractors need their own insurance?",
        answer:
          "Many contracts require subcontractors to carry their own liability insurance and provide evidence of coverage before starting work. Your own policy and a project wrap-up (where enrolled) do not automatically replace each subcontractor's contractual insurance obligations — confirm contract requirements for each tier.",
      },
      {
        question: "What about completed work after I leave the job?",
        answer:
          "Completed-operations claims can arise after handover. Coverage depends on your CGL products-completed operations wording, exclusions, and limits — and on whether a project wrap-up or other program applies for that job. Defective work and resulting damage are often treated differently under policy forms.",
      },
      {
        question: "Do I need my own GL if the project has a wrap-up or OCIP?",
        answer:
          "A wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Your own insurance program may still be needed for exposures outside the wrap — including off-site work, non-enrolled projects, commercial auto, tools, and periods before or after enrollment. Read enrollment documents carefully.",
      },
      {
        question: "What information is needed to quote contractors insurance?",
        answer:
          "Expect questions about your trade and operations, revenue and payroll, subcontracting percentage, tools and equipment values, vehicles, typical jobsite types (new build, renovation, occupied premises), contract insurance requirements, claims history, and whether you participate in wrap-up or OCIP projects. Trade-specific details matter — roofing is not underwritten like landscaping.",
      },
    ],
    ctaHeading: "Ready to cover your contracting business?",
    ctaSubhead:
      "Share your trade, revenue, equipment, and contract requirements — we will compare liability, tools, and project participation options.",
    serviceName: "Contractors Insurance",
  },
  {
    slug: "manufacturing-insurance",
    metaTitle:
      "Manufacturing Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Manufacturing insurance for Windsor-Essex — commercial property, product liability, business interruption, equipment breakdown, and job-shop coverage through an independent broker.",
    headline: "Manufacturing Insurance",
    subhead:
      "Ordinary manufacturing and light industrial operations in Windsor–Essex — fabrication, machining, metalworking, plastics, assembly, and job-shop production — combine property values, production equipment, products liability, and income interruption risks that differ from retail, contracting, or warehouse-only businesses. Depending on your plant, that can mean commercial property for buildings, machinery, raw materials, work-in-progress, and finished goods; commercial general liability for certain third-party injury and property-damage claims tied to products you make; optional business interruption after a covered direct physical loss; and equipment breakdown coverage where purchased for internal mechanical or electrical failures not handled like fire or theft on a standard property form. Pollution, product recall expense, crime, and cyber may need separate review when exposures are material — not every manufacturer needs every specialty line on day one. Premium Insurance Brokers can help align limits to how you actually produce, stock, and ship.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Manufacturing Quote",
    coverageIntro:
      "Manufacturing insurance is organized here around five exposures most Windsor–Essex plants and job shops review first — product liability, property and stock, income after a covered physical loss, equipment breakdown where purchased, and job-shop-specific values — because each insuring agreement has different triggers, limits, and endorsements.",
    coverageTypes: [
      {
        id: "product-liability",
        title: "Product Liability",
        shortLabel: "Products",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims alleging a product you manufacture, assemble, or distribute caused harm — subject to products-completed operations wording, exclusions, limits, and policy terms.",
        detailTitle: "A defective part can follow your product long after it leaves the dock",
        detailDescription:
          "Manufacturers and assemblers face products-completed operations exposure when a customer or downstream user alleges injury or damage from a part, component, or finished good you produced — including precision work to customer specifications on many programs. Commercial general liability may address certain covered claims subject to policy wording, but it does not automatically pay product recall or withdrawal expenses, warranty rework, or every contractual quality dispute. Product recall insurance is a separate first-party discussion on our product recall page.",
        icon: Briefcase,
      },
      {
        id: "commercial-property",
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help address direct physical loss or damage to buildings, production machinery, tools, raw materials, work-in-progress, and finished goods you own or are required to insure — subject to causes of loss, valuation basis, limits, deductibles, and policy terms.",
        detailTitle: "Your landlord's policy doesn't cover your CNC line",
        detailDescription:
          "When you lease industrial space, the landlord typically insures the building while you may need contents, inventory, leasehold improvements, and scheduled machinery values. Raw materials, packaging, WIP, and finished stock may be valued on different bases — cost, replacement cost, or selling price depending on form and endorsements — and peak production seasons may need higher reported values. Coinsurance on many commercial property programs can reduce recovery if values are understated. Internal mechanical breakdown of production equipment is often treated differently from fire or theft — see equipment breakdown below.",
        icon: Factory,
      },
      {
        id: "business-interruption",
        title: "Business Interruption",
        shortLabel: "BI",
        description:
          "Where purchased with commercial property, may help replace certain lost income and pay qualifying continuing expenses when a covered direct physical loss to insured property forces a necessary production suspension — subject to waiting periods, indemnity or restoration periods, and policy terms.",
        detailTitle: "Rent and payroll don't pause when the line stops",
        detailDescription:
          "A covered fire, major water loss, or other insured property damage can idle presses, CNC cells, or assembly lines while fixed costs continue. Business interruption coverage, where included, addresses that income gap — not market slowdowns, utility outages without physical damage, or supplier delays unless a specific contingent business interruption endorsement applies to a named dependent property that suffers covered damage. Waiting periods and restoration limits vary — coordinate BI values with realistic rebuild and ramp-up timelines on our business interruption page.",
        icon: Building2,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased as an endorsement or separate coverage — not automatic on standard property forms — may help address certain sudden and accidental internal mechanical, electrical, or pressure-system failures of production equipment, subject to policy terms and exclusions.",
        detailTitle: "Fire insurance and breakdown insurance respond to different failures",
        detailDescription:
          "Commercial property may respond when a fire or external insured peril damages machinery, but many standard property forms exclude or restrict loss from internal mechanical breakdown, electrical arcing, motor burnout, or pressure-system failure. Equipment breakdown coverage, where added, is designed for that gap — it is not automatic on every property policy. Wear and tear, lack of maintenance, and every resulting business income loss may still be excluded unless your form specifically includes EB-linked business interruption or spoilage extensions. Confirm what your property program includes before assuming breakdown is already insured.",
        icon: Hammer,
      },
      {
        id: "machine-shop-tool-die",
        title: "Job Shop & Tool & Die",
        shortLabel: "Job Shop",
        description:
          "Precision machining, custom tooling, and job-shop operations often carry higher equipment values, customer-owned materials, and work-in-progress that should be disclosed separately from commodity finished-goods manufacturing.",
        detailTitle: "Custom work-in-progress is hard to replace overnight",
        detailDescription:
          "Job shops and tool-and-die operations frequently work to customer drawings, hold specialized dies and fixtures, and carry WIP with values that spike mid-job. Product liability for precision components, property limits for specialized equipment, and accurate WIP reporting all affect underwriting. This is an exposure segment to disclose clearly — not a separate policy name on every program — so limits reflect materials, processes, and whether you rework customer-supplied parts.",
        icon: Factory,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex fabrication shops, machining and metalworking plants, plastics and assembly operations, and job-shop or tool-and-die producers — reviewed through an independent broker who can coordinate property, products liability, business interruption, equipment breakdown, and specialty coverages for how you actually manufacture.",
    considerations: [
      {
        title: "Building, machinery, and property values",
        description:
          "Production equipment, building improvements, and contents often represent the largest insurable values on a manufacturing balance sheet. Replacement cost versus actual cash value, coinsurance, and agreed-value options affect how claims settle — underreported values can reduce payments after a partial loss. Update schedules when you add CNC capacity, expand lines, or renovate leased space.",
      },
      {
        title: "Raw materials, WIP, and finished goods valuation",
        description:
          "Raw stock, packaging, work-in-progress, and finished inventory may not share one valuation method on your policy. Job-shop WIP tied to open customer orders differs from commodity finished goods held for shipment. Peak seasons and large single orders may need higher limits or reporting endorsements — disclose how inventory is counted and where it is stored.",
      },
      {
        title: "Equipment breakdown vs commercial property",
        description:
          "Fire, wind, and theft are typically property-peril conversations; motor seizure, electrical arcing, and compressor failure are often equipment breakdown endorsements. Do not assume one policy part covers both without reading causes of loss and exclusions. Maintenance-related deterioration and gradual wear are commonly excluded from breakdown coverage.",
      },
      {
        title: "Production interruption and business income",
        description:
          "Business interruption commonly requires a covered direct physical loss to insured property — not every supply shortage, labour dispute, or pandemic closure. Waiting periods, indemnity limits, and how payroll is treated during a shutdown vary by form. If a few weeks without production would strain cash flow, BI limits and periods deserve a dedicated review with our business interruption page.",
      },
      {
        title: "Product liability and precision components",
        description:
          "Claims alleging injury or damage from a manufactured product may fall under products-completed operations coverage on a CGL program subject to limits, exclusions, and separate aggregate structures — not every quality dispute or contractual penalty. Component parts sold into automotive, medical, or safety-critical supply chains may face tighter underwriting questions than general fabrication.",
      },
      {
        title: "Product recall vs product liability",
        description:
          "Third-party injury or property-damage lawsuits and first-party recall or withdrawal expenses are different insuring problems. General liability does not automatically pay notification, retrieval, disposal, or consultant costs after a recall decision — product recall insurance may be reviewed separately on our product recall page when traceability and brand exposure warrant it.",
      },
      {
        title: "Key suppliers, customers, and contingent BI",
        description:
          "Single-source materials, outsourced coating or heat-treat, and just-in-time components create operational bottlenecks. Contingent business interruption, where purchased, may respond when a named supplier or customer location suffers covered direct physical loss that disrupts your production — not when a vendor simply runs late or fails financially without insured damage.",
      },
      {
        title: "Pollution, chemicals, waste, cyber, and crime",
        description:
          "Solvents, paints, refrigerants, waste handling, and storage tanks may create environmental exposures that CGL pollution exclusions restrict — pollution liability may be reviewed when material. Employee theft of inventory, payroll fraud, and ransomware affecting production or accounting systems may need crime or cyber coverage rather than standard property forms alone — disclose controls and system dependencies to your broker.",
      },
    ],
    faqTitle: "Manufacturing insurance FAQ",
    faqItems: [
      {
        question: "What insurance does a manufacturer typically need?",
        answer:
          "Most Windsor–Essex manufacturers start with commercial general liability — including products-completed operations — and commercial property for buildings, machinery, and stock. Business interruption, equipment breakdown, commercial auto, pollution, product recall, crime, and cyber are added when operations, contracts, or exposures warrant them — each subject to separate policy terms. There is no single universal manufacturing policy that automatically bundles every coverage type.",
      },
      {
        question: "Does property insurance cover machinery breakdown?",
        answer:
          "Not always. Commercial property may address fire, theft, wind, and other insured perils that damage equipment, but many forms exclude or restrict internal mechanical or electrical breakdown. Equipment breakdown coverage — where purchased — may address certain sudden and accidental failures of boilers, compressors, CNC equipment, and similar assets subject to maintenance exclusions and policy limits. Confirm how your program separates property perils from breakdown coverage.",
      },
      {
        question: "What happens if production stops due to a covered loss?",
        answer:
          "Business interruption coverage, where purchased with property, may help with lost income and certain continuing expenses during a suspension caused by covered direct physical loss to insured property — not after every supplier delay or market downturn. Waiting periods, indemnity or restoration periods, and extra-expense provisions apply and vary by insurer. See our business interruption page for trigger and timing detail.",
      },
      {
        question: "Does product liability pay for a product recall?",
        answer:
          "Generally no. Product liability under commercial general liability may address certain third-party bodily injury or property-damage claims arising from products subject to policy wording. Product recall or withdrawal expense — notification, retrieval, storage, disposal, and related costs — is typically a separate coverage with its own trigger on our product recall page. A recall decision, including regulator involvement, does not by itself mean insurance will respond.",
      },
      {
        question: "What should a manufacturer disclose when requesting a quote?",
        answer:
          "Expect questions about your processes and products, revenue, building and occupancy, machinery and equipment values, raw materials and WIP, finished-goods inventory, shipping and supply-chain dependencies, prior claims, and any customer contract insurance requirements. Job shops should disclose customer-spec work, tooling values, and materials handled. Accurate values support proper property limits and help avoid coinsurance penalties on many forms.",
      },
    ],
    ctaHeading: "Ready to review your manufacturing program?",
    ctaSubhead:
      "Share your facility, products, equipment values, and production flow — we will compare commercial markets and explain what fits.",
    serviceName: "Manufacturing Insurance",
  },
  {
    slug: "commercial-property-insurance",
    metaTitle:
      "Commercial Property Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial property insurance through an independent Windsor-Essex broker — building, contents, tenant improvements, and optional endorsements coordinated with business interruption where needed.",
    headline: "Commercial Property Insurance",
    subhead:
      "Commercial property insurance addresses direct physical loss or damage to the building, contents, stock, and equipment your business owns or is required to insure — subject to the causes of loss, limits, deductibles, and endorsements on your policy. Whether you own the premises, lease space, or rent out a commercial building, the insurable interests differ: landlords typically insure the shell; tenants often insure contents, inventory, and leasehold improvements; owner-occupiers may need both. Valuation basis (replacement cost versus actual cash value), coinsurance, vacancy conditions, and optional extensions for water damage, sewer backup, earthquake, or overland flood are policy-dependent — not automatic in every form. Business interruption is a separate coverage that may coordinate with property after a covered loss. Premium Insurance Brokers can help Windsor–Essex businesses compare property programs for how you actually occupy and use your premises.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Property Quote",
    coverageIntro:
      "Commercial property coverage is organized here by what you may need to insure — building, contents, optional equipment breakdown, and owner/lessor interests — because owned, leased, and rental-property exposures are structured differently on most policies.",
    coverageTypes: [
      {
        id: "building-coverage",
        title: "Building Coverage",
        shortLabel: "Building",
        description:
          "May help repair or rebuild the insured building structure and permanently attached improvements after covered direct physical loss — subject to causes of loss, valuation basis, limits, deductibles, and policy terms.",
        detailTitle: "A fire doesn't pause your mortgage",
        detailDescription:
          "When you own the building or are contractually required to insure it under a lease or mortgage, the structure and attached improvements often represent your largest fixed asset. A covered fire, windstorm, or other insured peril can damage walls, roof, and built-in systems long before operations resume. Building limits should reflect current replacement or repair values — and coinsurance or agreed-value provisions on many forms can reduce recovery if values are understated. Vacancy or unoccupancy conditions may also restrict coverage if the premises sit empty beyond policy thresholds.",
        icon: Building2,
      },
      {
        id: "contents-equipment",
        title: "Contents & Business Property",
        shortLabel: "Contents",
        description:
          "May help cover furniture, fixtures, equipment, inventory, and stock against covered direct physical loss — subject to schedules, sublimits, causes of loss, and whether property is at the premises or temporarily away, as defined in the policy.",
        detailTitle: "Your landlord's policy doesn't cover your desks",
        detailDescription:
          "Tenants and owner-operators both have insurable interest in movable business property — computers, production equipment, retail inventory, and stock — that a landlord's building policy typically does not cover. Leasehold improvements and betterments you paid to install may need separate scheduling or a tenant-improvements limit. Accurate contents and inventory values support proper limits; underinsurance can trigger coinsurance penalties on many commercial property forms after a partial loss.",
        icon: Store,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased as an endorsement or separate coverage, may address certain sudden mechanical or electrical failure of boilers, HVAC, compressors, and production equipment — losses many base property forms treat differently from fire or theft.",
        detailTitle: "A failed compressor can stop production without fire",
        detailDescription:
          "Mechanical and electrical breakdown — a seized boiler, failed chiller, or burned-out motor — can halt operations without a traditional fire or theft claim. Base commercial property policies often exclude or limit these failure modes. Equipment breakdown coverage, where added, is designed for that gap — but triggers, sublimits, and waiting periods vary by insurer and form. Do not assume breakdown is included in a standard property quote; confirm whether your program needs a separate endorsement.",
        icon: Hammer,
      },
      {
        id: "commercial-landlord-property-owner",
        title: "Commercial Property Owner / Lessor",
        shortLabel: "Owner/Lessor",
        description:
          "May help address building, certain landlord-property, and loss-of-rental-income exposures for owners who lease commercial premises to tenants — where purchased and subject to policy terms, distinct from a tenant's contents and improvements coverage.",
        detailTitle: "Rent cheques stop when the building is shut down",
        detailDescription:
          "If you own a commercial building and lease space to tenants, your insurable interests include the structure, common areas you retain, and — where endorsed — rental income lost after a covered property loss forces tenants out or delays re-leasing. This is commercial property owner exposure, not the same product as a residential landlord policy on a separate route. Tenant contents, leasehold improvements, and tenant liability remain the tenant's insurance conversation — coordinate certificates and lease insurance clauses with your broker rather than assuming one policy covers every party.",
        icon: KeyRound,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex businesses and commercial property owners insuring buildings, contents, inventory, and leasehold interests — reviewed through an independent broker who can coordinate property limits, optional endorsements, and business interruption where a covered loss would interrupt operations.",
    considerations: [
      {
        title: "Owned versus leased premises",
        description:
          "If you lease, the landlord typically insures the building shell while you may need contents, inventory, and tenant improvements coverage — plus liability separate from property. Leases often specify who insures what and may require you to name the landlord as an additional insured on liability, not property. Review your lease before binding limits.",
      },
      {
        title: "Valuation basis — replacement cost versus actual cash value",
        description:
          "Policies may pay on a replacement-cost or actual-cash-value basis depending on form, property type, and endorsements purchased. Replacement cost generally aims to restore property without deducting depreciation; ACV reduces payment for age and wear. Neither is automatic in every policy — confirm how your building and contents are valued and whether replacement-cost coverage requires full repair or replacement.",
      },
      {
        title: "Coinsurance and agreed value",
        description:
          "Many commercial property forms include a coinsurance clause requiring you to insure to a stated percentage of value — often 80% or 90% on many forms, though percentages vary. If limits at the time of loss fall short, a partial loss payment may be reduced even when total limits appear adequate on paper. Agreed-value or value-reporting options may be available on some programs — disclose accurate values at application and renewal.",
      },
      {
        title: "Tenant improvements and betterments",
        description:
          "Build-outs, racking, and leasehold improvements you fund as a tenant may not be covered under the landlord's building policy. Schedule improvement values separately or confirm they sit within your contents limit. On sale or lease termination, who owns those improvements is also a contract question — insurance should align with insurable interest.",
      },
      {
        title: "Stock, inventory, and equipment values",
        description:
          "Seasonal inventory swings, new production lines, and purchased equipment change insurable values throughout the year. Peak stock periods and high-value machinery may need scheduling or reporting. Business personal property limits that made sense at policy inception may be inadequate after growth — review values when operations change materially.",
      },
      {
        title: "Water damage, sewer backup, and catastrophe extensions",
        description:
          "Base property forms vary in how they treat water escape, sewer backup, overland flood, and earthquake. These perils are often excluded or sub-limited unless endorsed — do not assume flood or sewer backup is included because fire and wind are covered. Windsor–Essex proximity to waterways and seasonal storms makes disclosure and optional extensions worth reviewing with your broker.",
      },
      {
        title: "Vacancy and unoccupancy",
        description:
          "Many policies restrict or reduce coverage when premises are vacant or unoccupied beyond a stated number of consecutive days — common during renovations, seasonal shutdowns, or between tenants for commercial owners. Notify your broker when occupancy status changes; vacancy endorsements or different programs may be required.",
      },
      {
        title: "Business interruption coordination",
        description:
          "Commercial property covers physical damage to insured property; business interruption — where purchased — addresses income and certain continuing expenses after a covered loss forces a temporary shutdown. BI is typically not automatic in every property quote and uses its own waiting periods, limits, and indemnity periods. Coordinate both coverages when a fire or major water loss would interrupt revenue while repairs continue.",
      },
    ],
    faqTitle: "Commercial property FAQ",
    faqItems: [
      {
        question: "What does commercial property insurance cover?",
        answer:
          "Commercial property insurance may help respond to direct physical loss or damage to insured buildings, contents, equipment, and stock from covered perils — subject to causes of loss, limits, deductibles, and endorsements on your policy. It does not automatically cover every cause of loss, every piece of equipment, or income lost during repairs. Optional extensions for sewer backup, overland flood, earthquake, and equipment breakdown must be confirmed with your broker rather than assumed from a standard quote.",
      },
      {
        question: "Does it cover inventory and equipment?",
        answer:
          "Business personal property — furniture, machinery, inventory, and stock — may be covered for covered direct physical loss when scheduled or included within contents limits, subject to policy terms. High-value items, property away from premises, and mechanical breakdown often need separate scheduling or endorsements. Tenants insure their own contents even when a landlord insures the building shell.",
      },
      {
        question: "What if I lease the premises?",
        answer:
          "Leased premises usually mean you insure contents, inventory, and tenant improvements while the landlord insures the building — but read your lease: some agreements shift more insurance responsibility to the tenant. You still need commercial general liability for operations on the premises. Bring your lease to your broker so property and liability limits match contractual requirements.",
      },
      {
        question: "Is equipment breakdown included?",
        answer:
          "Not automatically on most base property forms. Equipment breakdown coverage — where purchased — may address certain sudden mechanical or electrical failure of boilers, HVAC, and production equipment that standard property perils do not cover the same way. Confirm whether your quote includes an endorsement or a separate equipment breakdown policy.",
      },
      {
        question: "How are property limits determined?",
        answer:
          "Carriers use building construction details, occupancy, square footage, and reported values for building, contents, and business personal property. Replacement-cost building valuations, inventory reports, and equipment schedules support accurate limits. Coinsurance on many forms means underreported values can reduce a claim payment — disclose values honestly and update them when you add equipment or expand inventory.",
      },
    ],
    ctaHeading: "Ready to protect your commercial property?",
    ctaSubhead:
      "Share how you occupy the premises, what you own or lease, and current values — we will compare property options and optional endorsements that fit.",
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
      "Professional offices insurance through an independent Windsor-Essex broker — general liability, commercial property, professional liability where applicable, and cyber/privacy for client-facing offices.",
    headline: "Professional Offices Insurance",
    subhead:
      "Professional offices combine premises where clients visit, equipment and records that keep the practice running, and — for many firms — advice or design services that create a separate professional liability exposure. Depending on your operation, that can mean commercial general liability for visitor injury, commercial property for contents and leasehold improvements, professional liability or E&O where you deliver professional services to clients, and cyber or privacy coverage where you store sensitive data — each subject to the policies you purchase. This page focuses on coordinating the office's commercial program; deep E&O mechanics for standalone professional liability are covered on our Professional Liability page.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Professional Offices Quote",
    coverageIntro:
      "Office insurance usually separates physical premises and property exposure from professional advice risk and digital records — not every professional office needs every coverage line, but most need clarity on how these pieces fit together.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "GL",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from your office premises or business operations — such as a client injury in reception or a property-damage allegation tied to your operations — subject to policy terms, exclusions, and limits.",
        detailTitle: "A client visit creates premises exposure separate from your advice",
        detailDescription:
          "Waiting areas, conference rooms, washrooms, and parking access generate slip-and-fall and property-damage exposure when clients, couriers, or vendors come to you. General liability may address certain operational and premises claims, but allegations that your professional advice caused a financial loss are typically evaluated under professional liability — not ordinary CGL. Disclose whether staff also work at client sites or host off-site meetings.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability (Errors & Omissions)",
        shortLabel: "E&O",
        description:
          "May help respond to certain claims alleging a client suffered financial loss because of your professional advice, design, analysis, or services — where purchased and subject to policy terms, limits, and whether coverage is claims-made or occurrence-based.",
        detailTitle: "Bad advice is not a slip-and-fall claim",
        detailDescription:
          "If your office bills for consulting, design, accounting, engineering, financial, or technical advice, clients may allege errors caused tax penalties, project delays, or lost revenue. That is professional liability exposure — separate from premises injury covered by general liability. Some offices purchase E&O as part of a package; others carry a standalone professional liability policy with its own retroactive date and limits. See our Professional Liability page for claims-made, contract, and profession-specific depth.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover office contents, computers, furniture, and tenant improvements against covered causes of loss such as fire, theft, or water damage — subject to policy terms, reported values, and limits.",
        detailTitle: "Your landlord's policy does not automatically cover your contents",
        detailDescription:
          "Leased professional suites typically leave the building shell to the landlord while you insure contents, computers, phones, and leasehold improvements you paid for. Owned offices may need building coverage on the structure plus contents inside. Accurate values matter — underinsuring equipment or buildout creates co-insurance penalties on some policies. Business interruption, where purchased, responds only after a covered direct physical loss to insured property and subject to waiting periods.",
        icon: Building2,
      },
      {
        title: "Cyber Liability",
        shortLabel: "Cyber",
        description:
          "May help address certain costs arising from data breaches, ransomware, or network security incidents affecting client records, billing systems, or cloud platforms — where purchased and subject to policy terms — distinct from ordinary general liability.",
        detailTitle: "Client files on your server create exposure GL may exclude",
        detailDescription:
          "Professional offices store contracts, financial records, personnel files, and client credentials — making them targets for phishing, ransomware, and unauthorized access. Standard general liability and many E&O policies exclude or limit cyber events. Cyber or privacy coverage, where available, may help with certain forensic, notification, and business-interruption costs depending on wording, but it does not replace sound access controls, backups, or vendor management.",
        icon: Laptop,
      },
    ],
    considerations: [
      {
        title: "Leased premises, tenant improvements, and landlord requirements",
        description:
          "Commercial leases often require the tenant to insure contents, glass, tenant improvements, and legal liability — and to name the landlord as additional insured on general liability. Confirm who insures the building, what improvements you funded, and whether your lease imposes minimum limits or certificate deadlines before move-in.",
      },
      {
        title: "Client visits, open meetings, and off-site work",
        description:
          "Premises exposure concentrates where clients enter your space — reception, boardrooms, and shared building corridors. If staff attend client locations or host seminars off-site, disclose those activities during underwriting. General liability may respond to certain premises and operations claims, but scope depends on policy definitions and disclosed operations.",
      },
      {
        title: "When the office still needs professional liability",
        description:
          "Administrative or back-office functions with no client-facing professional services may not need E&O. Any office that designs, advises, certifies, or analyzes for a fee typically does — whether packaged with property and GL or written as a standalone policy. Do not assume a generic office package automatically includes professional liability without reviewing declarations and exclusions.",
      },
      {
        title: "Computers, mobile equipment, and records",
        description:
          "Laptops, monitors, servers, and phone systems represent concentrated value vulnerable to theft and power events. Property schedules should reflect replacement cost for equipment you own or are responsible for under lease. Off-premises equipment may need specific coverage or sublimits depending on policy wording.",
      },
      {
        title: "Cyber and privacy for client data",
        description:
          "Cloud CRM, accounting platforms, and email archiving store client information outside filing cabinets. Cyber coverage, where purchased, may address certain incident response costs — but exclusions, sublimits, and social-engineering fraud treatment vary widely. Multi-factor authentication, backups, and vendor contracts support underwriting but do not replace coverage review.",
      },
      {
        title: "Business interruption after a covered property loss",
        description:
          "If fire, water, or theft shuts your office, business interruption coverage — where purchased — may help with certain continuing expenses and lost income after a covered direct physical loss, subject to waiting periods and policy wording. A licence suspension, cyber event, or non-covered equipment failure may not trigger the same coverage.",
      },
      {
        title: "Crime, client funds, and payment fraud",
        description:
          "Offices that hold client retainers, trust balances, or process wire transfers face theft and fraud exposure that standard property forms may not fully address. Crime or fidelity endorsements, where available, may respond to certain employee dishonesty or social-engineering losses subject to limits and security conditions — disclose whether client funds flow through your accounts.",
      },
      {
        title: "Contractual insurance certificates and MSAs",
        description:
          "Clients, landlords, and lenders often require certificates showing general liability, professional liability, and sometimes cyber limits before engagement. Gather contract insurance schedules early — increasing limits or adding additional insureds after a loss is reported is generally not possible retroactively.",
      },
    ],
    faqTitle: "Professional offices FAQ",
    faqItems: [
      {
        question: "What does professional office insurance include?",
        answer:
          "There is no single standard package — most programs combine commercial general liability and commercial property for the premises and contents, then add professional liability and cyber coverage where the firm's services and data exposures warrant them. A purely administrative office with no professional services to clients may need GL and property only; a consulting or design office typically needs E&O as well. Your broker structures coverage to your lease, services, and contract requirements rather than selling every line to every office.",
      },
      {
        question: "Do I still need separate E&O if I have office insurance?",
        answer:
          "If your office provides professional advice, design, analysis, or regulated services to clients, you generally need professional liability coverage — either included in your office program or written as a standalone policy with its own limits and retroactive date. Office general liability does not replace E&O for financial-loss allegations tied to your work product. If you only perform internal administration with no client-facing professional services, E&O may not apply — confirm with your broker based on what you actually do for clients.",
      },
      {
        question: "What about leased equipment and premises?",
        answer:
          "Leases typically require tenants to carry general liability and to insure contents, improvements, and sometimes plate glass or HVAC equipment you are responsible for maintaining. Equipment leased from a vendor may need to be scheduled or covered under a property endorsement depending on who bears loss risk under the lease. Provide your lease insurance clause to your broker before binding coverage.",
      },
      {
        question: "Do professional offices need cyber insurance?",
        answer:
          "Offices that store client financial records, personnel files, credentials, or payment data on networked systems face cyber and privacy exposure that standard GL often excludes. Cyber coverage is worth reviewing when you rely on cloud platforms, email, or remote access — especially if clients or contracts require it. It is not a universal mandate for every office, but the exposure is common for professional service firms.",
      },
      {
        question: "What information is needed for a quote?",
        answer:
          "Profession and services offered, revenue and staff count, whether you own or lease the premises, values for contents and tenant improvements, whether you hold client funds, data and cloud systems used, current policies and retroactive dates for any E&O, prior claims, and any lease or client contract insurance requirements. Photos or a statement of values help for larger offices.",
      },
    ],
    ctaHeading: "Ready to cover your professional practice?",
    ctaSubhead:
      "Tell us about your office, services, lease, and contract requirements — we'll compare options that fit how your practice actually operates.",
    serviceName: "Professional Offices Insurance",
  },
  {
    slug: "real-estate-insurance",
    metaTitle: "Real Estate Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Real estate brokerage insurance through an independent Windsor-Essex broker — RECO registrant program coordination, office general liability, commercial property, and cyber/privacy for brokerage operations.",
    headline: "Real Estate Insurance",
    subhead:
      "Ontario real estate brokerages and office operations face a layered insurance picture: registrants must participate in RECO's mandatory professional liability insurance program under the Trust in Real Estate Services Act, 2002, which includes errors and omissions, commission protection, and consumer deposit coverage on defined terms — separate from the brokerage's own commercial general liability, office property, and cyber exposures. Premium Insurance Brokers helps Windsor–Essex brokerages coordinate commercial lines for the office entity — premises liability, contents, and data — without replacing or administering RECO's registrant program. If you own rental properties or manage portfolios for others, those are different insurance conversations — see our Landlord Insurance and Property Management pages.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Real Estate Quote",
    coverageIntro:
      "Coverage for a real estate brokerage office is organized around registrant professional protection through RECO's program, then the commercial policies that protect the office itself — premises, property, and client data.",
    coverageTypes: [
      {
        id: "errors-omissions-e-o",
        title: "Registrant E&O (RECO Program)",
        shortLabel: "E&O",
        description:
          "Ontario registrants must participate in RECO's mandatory professional liability insurance program, which includes errors and omissions coverage for certain professional real estate services allegations — subject to the program's terms, limits, and deductibles. Premium Insurance Brokers does not replace or sell this program.",
        detailTitle: "Transaction errors and deposit disputes follow RECO's program rules",
        detailDescription:
          "RECO's program includes errors and omissions coverage with a $2,000,000 limit per claim and $4,000,000 annual aggregate for the E&O component, plus separate commission protection and consumer deposit coverage on defined terms for the 2026–2027 policy period — each subject to program wording. Allegations such as missed APS clauses, form errors, or commission disputes are evaluated under that program, not a generic commercial E&O policy placed for the brokerage office. Registrants renew through RECO's process; commercial brokers help with the brokerage entity's separate GL, property, and cyber needs.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover brokerage office contents, furniture, IT equipment, and tenant improvements against covered causes of loss such as fire, theft, or water damage — subject to policy terms, reported values, and limits.",
        detailTitle: "Boardroom equipment and MLS workstations are your contents exposure",
        detailDescription:
          "Whether the brokerage leases or owns its office, the landlord's building policy typically does not cover your desks, servers, signage, or leasehold improvements. Property values should reflect computers, printers, furniture, and any buildout you funded. If the brokerage owns the building, building coverage on the structure is separate from contents — disclose ownership, square footage, and alarm or sprinkler details during underwriting.",
        icon: Building2,
      },
      {
        title: "General Liability",
        shortLabel: "GL",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from brokerage premises or operations — such as open-house visitors, office walk-ins, or parking-lot incidents — subject to policy terms, exclusions, and limits.",
        detailTitle: "An open-house visitor injury is a premises claim — not a transaction E&O claim",
        detailDescription:
          "Brokerages host clients, other agents, and the public at the office and at showings. Slip-and-fall, trip hazards, and property-damage allegations tied to premises control may fall under general liability — distinct from professional errors covered through RECO's registrant program. Disclose how often you host open houses, whether agents use personal vehicles for showings, and any property-management or rental activities performed outside core brokerage operations.",
        icon: Briefcase,
      },
      {
        id: "landlord-coverage",
        title: "Cyber & Privacy",
        shortLabel: "Cyber",
        description:
          "May help address certain costs arising from privacy breaches, ransomware, or unauthorized access affecting client contact information, transaction files, or brokerage email and payment systems — where purchased and subject to policy terms.",
        detailTitle: "Client contact lists and deal files are brokerage cyber exposure",
        detailDescription:
          "Brokerages store offers, identification copies, financial pre-qualification data, and correspondence — making phishing, wire-fraud schemes, and ransomware relevant operational risks. Standard general liability often excludes cyber events. Cyber or privacy coverage, where available, may help with certain forensic, notification, and business-interruption costs depending on policy wording, but it does not replace secure email, verification procedures for wire instructions, or staff training on social-engineering fraud.",
        icon: Laptop,
      },
    ],
    considerations: [
      {
        title: "RECO's mandatory program vs the brokerage's commercial insurance",
        description:
          "Every Ontario registrant must participate in RECO's professional liability insurance program as a condition of registration under TRESA. That program covers defined registrant professional exposures — not the brokerage's office furniture, landlord slip-and-fall claims, or cyber incidents on office systems. Premium Insurance Brokers coordinates commercial GL, property, and cyber for the office entity; registrants renew RECO program coverage through RECO's own process.",
      },
      {
        title: "Office premises, showings, and client visits",
        description:
          "Premises exposure arises at the brokerage office, open houses, and showings. General liability may respond to certain third-party injury claims subject to policy wording. Automobile exposure when agents drive to showings involves Ontario auto coverage separately from office GL — disclose whether agents use personal vehicles and how often.",
      },
      {
        title: "Brokerage contents, IT, and tenant improvements",
        description:
          "Accurate property schedules for computers, signage, furniture, and leasehold improvements support proper claims payment. Backup systems and off-site data storage may affect cyber underwriting but do not replace property coverage for physical equipment.",
      },
      {
        title: "Wire fraud, email compromise, and transaction data",
        description:
          "Real estate transactions are frequent targets for fraudulent wire instructions and impersonation emails. Cyber coverage, where purchased, may address certain incident costs subject to exclusions and sublimits — but verification protocols for deposit transfers are operational controls, not insurance substitutes. Train staff on RECO and brokerage procedures for handling trust funds.",
      },
      {
        title: "Property-management or rental activities",
        description:
          "If the brokerage or its principals also manage rental properties or own investment real estate, those activities create exposures outside core registrant E&O — property management E&O, landlord property, and lessor's liability are separate products. See our Property Management Insurance page for management firms and Landlord Insurance for owned rental properties.",
      },
      {
        title: "Owned rental real estate is a different page",
        description:
          "Insurance for buildings you rent out to tenants — landlord property, rental income, and lessor liability — is not the focus of this brokerage page. Owned investment properties should be reviewed under a landlord or commercial property program with accurate occupancy and vacancy disclosures.",
      },
      {
        title: "Certificates, franchise, and board requirements",
        description:
          "Franchise networks, commercial landlords, and lender clients may require certificates for general liability, property, and cyber limits on the brokerage entity. Gather schedule requirements before lease signing or franchise onboarding — RECO program certificates are separate from commercial policy certificates.",
      },
      {
        title: "Personal real estate corporations (PRECs) and entity structure",
        description:
          "How the brokerage, PREC, and individual registrants are structured affects who needs commercial coverage versus registrant program participation. Disclose entity names, ownership, and which operations each entity performs so policies and certificates match the named insured on contracts.",
      },
    ],
    faqTitle: "Real estate insurance FAQ",
    faqItems: [
      {
        question: "Is real estate brokerage insurance the same as landlord insurance?",
        answer:
          "No. Real estate brokerage insurance for office operations addresses the brokerage entity's commercial general liability, office property, and cyber exposures — while Ontario registrants must separately participate in RECO's mandatory professional liability insurance program for defined transaction-related professional exposures. Landlord insurance protects owners of rental property — buildings, landlord liability, and sometimes rental income — and is a different customer need. If you own rental units, see our Landlord Insurance page; this page focuses on brokerage and office operations.",
      },
      {
        question: "What insurance does a real estate brokerage need beyond RECO's program?",
        answer:
          "RECO's program satisfies registrants' mandatory professional liability insurance requirement under TRESA — it is not a substitute for insuring the brokerage office itself. Most brokerages still review commercial general liability for premises and operations, commercial property for contents and improvements, and cyber or privacy coverage where client data and transaction systems create exposure. The exact package depends on whether you lease or own the office, staff count, and contract requirements from landlords or franchise systems.",
      },
      {
        question: "What if the brokerage owns its office building?",
        answer:
          "You may need building property coverage on the structure plus contents coverage for furniture and equipment inside, alongside general liability for premises exposure. RECO's registrant program does not insure the building. Vacancy, maintenance, and tenant-occupied portions of a mixed-use building should be disclosed separately. Your broker can help coordinate building and contents values with lease and mortgage requirements.",
      },
      {
        question: "What about property management services?",
        answer:
          "Managing properties for owners — coordinating maintenance, tenant relations, and leases — creates management E&O and operational liability distinct from selling real estate as a registrant. If your firm performs property management, review our Property Management Insurance page. RECO registrant coverage and property-management coverage serve different roles and should not be assumed interchangeable.",
      },
      {
        question: "What information is needed for a quote?",
        answer:
          "Brokerage legal name and entity structure, office address and whether leased or owned, staff and registrant count, property values for contents and improvements, description of any property-management or rental activities, current commercial policies, prior claims, and any franchise or landlord certificate requirements. RECO program participation is confirmed through RECO directly — we coordinate the brokerage's commercial lines.",
      },
    ],
    ctaHeading: "Ready to cover your real estate work?",
    ctaSubhead:
      "Tell us about your brokerage office, operations, and commercial certificate needs — we'll compare options that fit alongside RECO's registrant program.",
    serviceName: "Real Estate Insurance",
  },
  {
    slug: "builders-developers-insurance",
    metaTitle:
      "Builders & Developers Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Builders and developers insurance through an independent Windsor-Essex broker — project builder's risk, development liability, wrap-up programs, and completed operations coordination.",
    headline: "Builders & Developers Insurance",
    subhead:
      "Builders and developers insurance focuses on the ownership or development entity that acquires sites, finances projects, and coordinates multiple trades across one project or a pipeline. It is not a second copy of a single builder's risk page and not the same as an operating trade contractor's tools-and-GL program. Developers typically coordinate project-specific course-of-construction (builder's risk) policies, entity-level commercial general liability, and — on larger jobs — wrap-up or OCIP liability programs, then transition to permanent property or inventory coverage at occupancy. Lenders, joint-venture partners, and construction contracts drive named-insured, loss-payee, and certificate requirements. Premium Insurance Brokers can help Windsor-Essex developers structure coverage across projects without treating every optional product as mandatory.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Builders Quote",
    coverageIntro:
      "Coverage for the development entity and its projects — project property during construction, operations liability, coordinated wrap-ups where used, and post-handover completed-operations exposure.",
    coverageTypes: [
      {
        title: "Builder's Risk",
        shortLabel: "BR",
        description:
          "May help address certain physical loss or damage to each project during construction — where a course-of-construction policy is purchased for that project.",
        detailTitle: "Each project needs its own property schedule",
        detailDescription:
          "Developers typically arrange builder's risk per project (or via a master program) covering hard costs and endorsed extensions. Construction financing agreements may require evidence of builder's risk and other specified insurance before advances are released — including lender interests where the documents require them. Soft costs, transit, and existing structures remain endorsement-dependent.",
        icon: HardHat,
      },
      {
        title: "General Liability",
        shortLabel: "GL",
        description:
          "May help respond to certain third-party injury or property-damage claims arising from development operations — subject to policy terms.",
        detailTitle: "Sales centres and site supervision create liability",
        detailDescription:
          "Development entities face premises and operations exposure at sales offices, model homes, and active sites. Project-specific wrap-up programs may alter how onsite claims are handled — entity GL still matters for non-enrolled activities.",
        icon: Briefcase,
      },
      {
        title: "Wrap-Up Liability",
        shortLabel: "Wrap-Up",
        description:
          "May consolidate liability for enrolled parties on a project under an owner- or sponsor-controlled program — where purchased and subject to enrollment terms.",
        detailTitle: "OCIP reduces gaps between trades — at a cost",
        detailDescription:
          "Wrap-ups can centralize certain project liability coverage for enrolled parties, subject to program wording, enrollment, exclusions, and limits. Administration and certificates can be discussed separately. They do not automatically replace every contractor's own CGL for off-site work, auto, or tools. Developers sponsoring OCIPs should coordinate insurance with counsel and any surety requirements separately.",
        icon: Building2,
      },
      {
        title: "Completed Operations",
        shortLabel: "Completed Ops",
        description:
          "May address certain liability claims alleging injury or damage after handover — where products-completed operations coverage applies under policy wording.",
        detailTitle: "Defect claims can surface after occupancy",
        detailDescription:
          "Latent defect and completed-operations claims may arise months or years after sale or lease-up. Policy limits, exclusions, and how long completed-operations coverage applies should be reviewed with your broker — coverage is not open-ended.",
        icon: Shield,
      },
    ],
    considerations: [
      {
        title: "Per-project builder's risk vs master programs",
        description:
          "Most developments place course-of-construction coverage per project for completed value and duration. Some developers use master or reporting programs across a pipeline. Either way, limits, start dates, and occupancy triggers must match each site — do not assume one BR policy covers every project automatically.",
      },
      {
        title: "Lender requirements and draw conditions",
        description:
          "Construction financing agreements may require evidence of builder's risk and other specified insurance before advances are released. Required limits, lender interests, certificates, and project-specific liability requirements should be taken from the financing documents — not assumed as a universal package.",
      },
      {
        title: "OCIP / CCIP sponsorship decisions",
        description:
          "Owner- or contractor-controlled wrap-ups can simplify onsite liability for enrolled parties on large projects, but they need administration, enrollment discipline, and clarity on what remains outside the wrap. Sponsorship is a project strategy — not required for every development.",
      },
      {
        title: "Completed operations and post-handover exposure",
        description:
          "After units or buildings are sold or leased, claims can still allege injury or damage from construction work. How completed-operations coverage responds depends on policy wording, program structure (entity GL vs wrap), and timing. Review transitions with your broker before handover.",
      },
      {
        title: "Unsold inventory and spec buildings after builder's risk ends",
        description:
          "When course-of-construction coverage ends, unsold completed buildings or speculative inventory typically need permanent property or inventory arrangements. Leaving a finished building on an expired BR policy creates a gap.",
      },
      {
        title: "Vacant land and pre-construction liability",
        description:
          "Owned vacant parcels and sites awaiting permits can create premises liability even before construction starts. Entity GL and site controls matter during the land-hold period — separate from the eventual builder's risk policy.",
      },
      {
        title: "Joint ventures — who places what coverage",
        description:
          "JV and co-development agreements should allocate who places builder's risk, who sponsors wrap-up liability, named-insured status, and how certificates flow to lenders. Ambiguity between partners is a common source of coverage gaps.",
      },
      {
        title: "Transition from construction to permanent property",
        description:
          "Completion, occupancy, ready-for-takeover, policy expiry, or other events may affect when builder's risk ends depending on the policy wording. Permanent property, inventory, habitational, or condominium coverage should be coordinated as applicable before the construction coverage ends. Partial occupancy requires careful timing so neither policy leaves the asset uninsured.",
      },
    ],
    faqTitle: "Builders & developers FAQ",
    faqItems: [
      {
        question: "Is builder's risk enough for a development company?",
        answer:
          "Usually no. Builder's risk addresses project property during construction for a specific site. Development entities also need liability for premises and operations, may sponsor or participate in wrap-ups on larger jobs, and must plan for completed-operations exposure and permanent property after handover. Tools coverage for trade contractors belongs on the contractors page — not as a substitute for developer enterprise coordination.",
      },
      {
        question: "What is a wrap-up or OCIP, and when do developers use one?",
        answer:
          "A wrap-up consolidates liability for enrolled parties on a project under one controlled program. An Owner Controlled Insurance Program (OCIP) is owner-sponsored; a Contractor Controlled Insurance Program (CCIP) is GC-led. Developers often consider wrap-ups on larger multi-trade projects to reduce certificate gaps — they do not automatically replace every contractor's own CGL for off-site work, auto, or tools.",
      },
      {
        question: "How are multiple projects handled?",
        answer:
          "Each project typically needs its own builder's risk schedule (or clear reporting under a master program), while entity liability may sit at the corporate or development-company level. Pipeline size, JV structures, and lender conditions affect how programs are organized. Tell your broker about active and upcoming sites — not only the job starting next month.",
      },
      {
        question: "What happens to coverage after project completion or occupancy?",
        answer:
          "Completion, occupancy, ready-for-takeover, policy expiry, or other events may affect when builder's risk ends depending on the policy wording. Permanent property or inventory coverage should be coordinated as applicable before construction coverage ends. Liability for alleged post-handover injury or damage depends on completed-operations wording under the applicable GL or wrap program — review timing before units are sold or leased.",
      },
      {
        question: "What information is needed to structure a developers insurance program?",
        answer:
          "Expect questions about ownership entities, project pipeline and values, construction types, contract structures, lender insurance schedules, wrap-up strategy, subcontracting approach, joint ventures, claims history, and how projects transition to occupancy. Professional or environmental exposures are reviewed where operations create them — not every developer needs every specialty line.",
      },
    ],
    ctaHeading: "Structuring coverage across your developments?",
    ctaSubhead:
      "Share your pipeline, ownership entities, and lender or contract requirements — we will help coordinate project and entity coverage.",
    serviceName: "Builders & Developers Insurance",
  },
  {
    slug: "retail-insurance",
    metaTitle: "Retail Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Retail insurance through an independent Windsor-Essex broker — general liability, property and inventory, business interruption, product liability, and optional crime or cyber coverage for Windsor-Essex storefront retailers.",
    headline: "Retail Insurance",
    subhead:
      "Ordinary storefront retail — clothing boutiques, gift shops, electronics stores, furniture and home-goods shops, and specialty retailers — combines premises liability, stock and fixture values, and product-related claims in a package that differs from food retail, pharmacy, convenience, or fuel operations. Depending on your store, that can mean commercial general liability for customer incidents on the sales floor, commercial property for fixtures, equipment, and inventory, optional business interruption after a covered physical loss, and products liability for goods you sell or distribute — each subject to the policies you purchase. Not every shop sells online, carries high-theft inventory, or needs the same crime or cyber endorsements. Premium Insurance Brokers can help Windsor–Essex retailers align coverage to your actual merchandise, lease, and sales channels.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Retail Quote",
    coverageIntro:
      "Retail insurance is usually organized around four exposures most storefront operators share — customer liability, property and stock, income after a covered loss, and products you sell — with optional crime, cyber, and delivery coverage reviewed separately where your operation needs them.",
    coverageTypes: [
      {
        id: "general-liability",
        title: "Premises & Customer Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from customer incidents on your premises — slips at entrances, aisle hazards, or display-related injuries — subject to policy terms, exclusions, and limits.",
        detailTitle: "A wet entrance isn't just housekeeping",
        detailDescription:
          "Retail premises exposure concentrates at entrances, fitting rooms, stockrooms open to staff traffic, and parking areas — especially in winter when tracked-in moisture and salt create slip hazards. Tenant legal liability for damage to leased premises may be available where endorsed. Product-related injury claims from something you sold are typically addressed under products liability rather than premises coverage — the policy part depends on how the claim is framed and what was disclosed during underwriting.",
        icon: Briefcase,
      },
      {
        id: "property-inventory-coverage",
        title: "Property, Stock & Fixtures",
        shortLabel: "Property",
        description:
          "May help cover fixtures, equipment, and stock against covered direct physical loss such as fire, theft, or water damage — subject to policy causes of loss, limits, deductibles, valuation basis, and security conditions.",
        detailTitle: "Seasonal inventory can outgrow your limit",
        detailDescription:
          "Retail value sits in seasonal merchandise, display fixtures, POS equipment, and back-room stock — not just the building shell your landlord may insure separately. Inventory valuation basis varies by form: unsold stock may be valued on actual cash value or replacement cost depending on endorsements, and sold-but-undelivered stock may use selling price only where that valuation condition applies. Peak seasons such as holidays may need higher reported values or peak-season endorsements. External theft of stock differs from employee dishonesty, which typically requires a crime or fidelity endorsement rather than standard property coverage alone.",
        icon: Package,
      },
      {
        id: "business-interruption",
        title: "Business Income (Optional)",
        shortLabel: "BI",
        description:
          "Where purchased, may help address certain lost income and continuing expenses after a covered direct physical loss forces a temporary closure — subject to waiting periods, indemnity limits, and policy terms.",
        detailTitle: "A fire doesn't pause your lease",
        detailDescription:
          "When a covered fire, major water loss, or other insured property damage closes your store, rent, payroll, and supplier obligations may continue while revenue stops. Business interruption coverage, where added, is designed for that income gap — but it requires a covered physical property loss trigger on the policy, not every shutdown or supply-chain delay. Waiting periods, indemnity periods, and extra-expense provisions vary by insurer and form — confirm what your lease and lender expect if you carry financing.",
        icon: Store,
      },
      {
        id: "product-liability",
        title: "Products You Sell",
        shortLabel: "Products",
        description:
          "May help address certain claims alleging bodily injury or property damage arising from products you sell or distribute — including other manufacturers' brands in many cases — subject to products-completed operations wording, exclusions, and limits.",
        detailTitle: "A defective product claim can name the seller",
        detailDescription:
          "Retailers who sell or distribute goods — even when they did not manufacture them — can be drawn into product liability claims when a customer alleges injury or damage from a product purchased at the store. Vendor indemnity agreements and manufacturer warranties do not always replace your own coverage. Product recall or withdrawal expense is a separate first-party exposure addressed on our product recall page — general liability does not automatically pay recall costs.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex clothing stores, gift shops, electronics retailers, furniture and home-goods shops, and other ordinary storefront retailers — reviewed through an independent broker who can coordinate liability, property, inventory, and optional crime or cyber coverage for how you actually sell.",
    considerations: [
      {
        title: "Inventory values and seasonal peaks",
        description:
          "Holiday, back-to-school, and promotional seasons can push stock values well above average. Many commercial property programs use reported inventory values or blanket limits that may need adjustment when peaks are predictable. Underinsurance can trigger coinsurance penalties on some forms after a partial loss — disclose peak stock to your broker before renewal.",
      },
      {
        title: "Valuation basis — replacement cost, ACV, and sold stock",
        description:
          "How your policy values unsold inventory and sold-but-undelivered goods depends on form and endorsements — not every program automatically insures stock at retail selling price. Replacement cost and actual cash value treat depreciation differently. Confirm valuation conditions for your merchandise mix rather than assuming one method applies to all stock.",
      },
      {
        title: "Tenant improvements and leased premises",
        description:
          "If you lease your storefront, the landlord typically insures the building while you may need contents, inventory, and leasehold improvements coverage. Build-outs, custom shelving, and tenant-paid improvements are often your insurable interest — separate from the landlord's building policy and from general liability for customer injury.",
      },
      {
        title: "Theft, security, and crime vs property",
        description:
          "External theft of stock may be a covered cause of loss under commercial property subject to limits and security conditions such as alarms and after-hours protocols. Employee dishonesty and certain robbery scenarios typically require crime or fidelity coverage — not automatic in standard property forms. Cross-link our crime and fidelity page if cash handling or high-shrink merchandise is material.",
      },
      {
        title: "Products sold vs manufactured",
        description:
          "Selling other brands' products still creates products liability exposure when a customer alleges injury or damage from a product purchased at your store. If you import, repackage, or white-label goods, underwriting and coverage needs may differ from a pure reseller — disclose your supply chain and any product-alteration activities.",
      },
      {
        title: "E-commerce, POS systems, and cyber",
        description:
          "Online sales, customer databases, and point-of-sale systems create privacy and payment-card exposure that base retail property and liability policies may not fully address. Cyber or privacy coverage, where purchased, is a separate commercial product — PCI compliance is an industry standard for card handling, not a named insurance mandate. Disclose your online sales share and how customer data is stored.",
      },
      {
        title: "Business interruption trigger",
        description:
          "Business interruption responds after a covered direct physical loss to insured property — not after every supply delay, pandemic closure, or utility outage unless specific endorsements apply. Coordinate BI limits with your lease, payroll, and fixed costs so waiting periods and indemnity periods match how long recovery would realistically take.",
      },
      {
        title: "Delivery and hired/non-owned auto",
        description:
          "Local delivery using company vehicles, employee personal cars, or contracted couriers creates automobile liability exposure separate from store property and general liability. Commercial auto or hired and non-owned auto coverage may be needed where you deliver goods — do not assume premises liability covers vehicle use on public roads.",
      },
    ],
    faqTitle: "Retail insurance FAQ",
    faqItems: [
      {
        question: "What does retail insurance typically combine?",
        answer:
          "Most Windsor–Essex storefront retailers start with commercial general liability and commercial property for premises and stock — then add business interruption, crime, cyber, or product-specific endorsements depending on inventory values, online sales, and contract requirements. Each component is subject to the policies you purchase; a quote description is not a guarantee every coverage type is included until confirmed on your binder.",
      },
      {
        question: "How should inventory values be insured?",
        answer:
          "Report average and peak stock values, including seasonal merchandise and back-room inventory. Valuation basis — replacement cost, actual cash value, or selling price for certain sold stock — depends on your policy form and endorsements. Higher-theft categories such as electronics or designer goods may need scheduling or sublimits — review limits when your product mix changes.",
      },
      {
        question: "Is employee theft covered by property insurance?",
        answer:
          "External theft of stock may fall under commercial property subject to causes of loss and security conditions. Employee dishonesty, embezzlement, and certain internal theft scenarios typically require crime or fidelity coverage — not automatic in standard property forms. If shrinkage from staff is a concern, review crime coverage separately rather than assuming property limits address it.",
      },
      {
        question: "What if I also sell online?",
        answer:
          "E-commerce adds cyber, privacy, and payment-processing exposure beyond the physical storefront. Online order fulfillment, customer data storage, and PCI-related card handling should be disclosed during underwriting. Cyber coverage, where purchased, is reviewed separately from general liability for slip-and-fall claims — confirm how your program addresses data incidents and online sales volume.",
      },
      {
        question: "What information is needed to quote?",
        answer:
          "Store location, square footage, lease or ownership status, inventory and fixture values, product types, security features, online vs in-store sales split, delivery practices, and any landlord or franchise certificate requirements. Seasonal peaks and recent build-outs should be noted so property limits and endorsements match how you actually operate.",
      },
    ],
    ctaHeading: "Ready to cover your retail business?",
    ctaSubhead:
      "Tell us about your storefront, stock, and sales channels — we will compare retail programs that fit.",
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
  ...cannabisIndustryPages,
];

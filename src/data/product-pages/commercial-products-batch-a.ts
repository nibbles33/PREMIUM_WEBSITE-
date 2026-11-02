import {
  AlertTriangle,
  Building2,
  Briefcase,
  Flame,
  Hammer,
  HardHat,
  KeyRound,
  Layers,
  Shield,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import {
  QUOTE_BUSINESS,
  QUOTE_COMMERCIAL_VEHICLES,
} from "@/data/commercial-industries";
import type { ProductPageContent } from "@/data/product-pages/types";

const QUOTE_CONTRACTOR = `${QUOTE_BUSINESS}&businessType=contractor`;

/**
 * Batch A — ten owner-approved commercial landing pages.
 * Trade children sit under Contractors hub; real-estate trio is distinct from
 * personal /landlord-insurance/; tow uses commercial-vehicles quote; umbrella
 * and equipment breakdown are specialty/core product lines.
 */
export const commercialProductBatchAPages: ProductPageContent[] = [
  // ─── Construction trades (Contractors hub children) ─────────────────────
  {
    slug: "roofing-contractors-insurance",
    category: "commercial",
    metaTitle:
      "Roofing Contractors Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Roofing contractors insurance for Windsor-Essex and Ontario trades — height, hot-work, and completed-operations exposures reviewed through an independent broker. Coverage is not guaranteed.",
    headline: "Roofing Contractors Insurance in Windsor-Essex",
    subhead:
      "Roofing contractors insurance is for the operating roofing trade — tear-offs, re-roofs, flat and steep work, and commercial or residential contracts across Windsor-Essex and Ontario — not a substitute for the Contractors hub overview or for project builder's risk. Height, hot work, falling materials, and completed-operations allegations after membrane or shingle work are among the exposures underwriters and contract certificates commonly review. Needs and available terms vary by operation, safety controls, and insurer appetite; nothing here guarantees coverage or placement with every market.",
    quoteHref: QUOTE_CONTRACTOR,
    quoteLabel: "Get a Roofing Contractors Quote",
    photographySlug: "roofing-contractors-insurance",
    coverageIntro:
      "Trade-focused coverages commonly reviewed for roofing operations — distinct from the Contractors hub overview of CGL and tools in general. Availability and wording depend on the insurer and how you actually work.",
    coverageTypes: [
      {
        id: "roofing-operations-liability",
        title: "Operations & Completed Ops Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims arising from roofing operations and completed work — subject to policy terms, exclusions, and limits.",
        detailTitle: "Falling materials and post-job water claims are trade-specific, not generic CGL talk",
        detailDescription:
          "Roofing operations can generate claims from debris, ladder or scaffold incidents affecting third parties, and alleged water intrusion after a re-roof. Completed-operations wording, hot-work conditions, and height-related underwriting questions often matter more than a generic contractor summary. Review certificate additional-insured and primary/non-contributory requests against what your policy can actually support.",
        icon: Briefcase,
      },
      {
        id: "hot-work-height-controls",
        title: "Hot Work & Height Controls",
        shortLabel: "Hot Work",
        description:
          "Underwriters often ask about torch-down or welding practices, fire watches, and fall-protection programs — controls that can affect terms when available.",
        detailTitle: "Torch work and open roofs change how markets look at the risk",
        detailDescription:
          "Modified-bitumen and other hot processes introduce fire exposures that cold-application shops may not share. Documented hot-work permits, extinguishers, and fire-watch procedures can matter during placement. Fall protection, training, and jobsite housekeeping are risk-management practices that affect insurability — they are not a promise of coverage.",
        icon: Flame,
      },
      {
        id: "tools-staging-equipment",
        title: "Tools, Staging & Equipment",
        shortLabel: "Tools",
        description:
          "Where purchased, tools and contractors equipment coverage may address owned tools, hoists, and staging subject to scheduling, limits, and theft conditions.",
        detailTitle: "Job-site and vehicle theft of roofing gear is a frequent claim pattern",
        detailDescription:
          "Roofing crews move tear-off tools, nailers, and staging between sites. Inland marine or tools forms, where purchased, typically require scheduling or blanket limits and may impose unattended-vehicle conditions. This is not a replacement for commercial auto on the truck itself.",
        icon: Wrench,
      },
      {
        id: "certificates-contract-compliance",
        title: "Certificates & Contract Compliance",
        shortLabel: "COIs",
        description:
          "GCs and owners often require certificates, additional insured status, and waiver wording before mobilization — those asks must match policy capabilities.",
        detailTitle: "Certificate wording is contractual — not automatic coverage expansion",
        detailDescription:
          "Additional-insured endorsements, primary wording, and waiver of subrogation are endorsement-driven when available. A certificate alone does not create coverage that the policy does not grant. Align bid requirements with what your program can support before you mobilize.",
        icon: HardHat,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario roofing contractors — residential and commercial re-roof and new-construction roofing trades — reviewed through an independent broker. This page is trade-specific; the Contractors hub covers the broader contracting program. It is not personal home insurance and not builder's risk for the structure under construction.",
    considerations: [
      {
        title: "Height and fall exposures",
        description:
          "Steep-slope and multi-storey commercial work raise underwriting questions about training, harness use, and scaffolding. Documented safety programs can affect market appetite; they do not guarantee acceptance.",
      },
      {
        title: "Hot work vs cold application",
        description:
          "Disclose torch, welding, or open-flame processes accurately. Misclassification can create claim disputes later.",
      },
      {
        title: "Subcontracted labour",
        description:
          "If you hire tear-off or membrane subs, certificate collection and contractual insurance requirements should match how the job is staffed.",
      },
      {
        title: "Not a substitute for builder's risk",
        description:
          "Project property for the building under construction is usually a separate builder's risk or wrap-up discussion — see Builder's Risk and the Contractors hub.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
    faqTitle: "Roofing contractors insurance FAQ",
    faqItems: [
      {
        question: "How is this different from the Contractors insurance page?",
        answer:
          "The Contractors page is the hub for general contracting programs — liability, tools, certificates, and project participation in overview. This page focuses on roofing-specific exposures such as height, hot work, and post-installation water claims. Start at the hub if you are unsure which trade page fits.",
      },
      {
        question: "Does general liability cover a leak after we finish a roof?",
        answer:
          "Completed-operations coverage may respond to certain third-party property-damage allegations after work is done, subject to wording, exclusions, and facts. Not every leak claim is covered. Review your form and contract obligations with a broker.",
      },
      {
        question: "Do I need pollution coverage for roofing tear-offs?",
        answer:
          "Some tear-off and coating operations raise limited pollution or debris questions. Whether a separate pollution product applies depends on materials, disposal practices, and insurer appetite — see Pollution Liability when relevant. Nothing is automatic.",
      },
      {
        question: "Can you place every roofing contractor?",
        answer:
          "No. Markets vary by trade mix, claims history, safety controls, and roofing methods. We shop suitable markets when available; coverage is never guaranteed.",
      },
      {
        question: "Is builder's risk included?",
        answer:
          "Usually not inside an operating trade CGL. Builder's risk is project property coverage — often arranged by the owner or GC. Link through Builder's Risk when a job requires it.",
      },
    ],
    ctaHeading: "Run a roofing trade in Windsor-Essex or across Ontario?",
    ctaSubhead:
      "Share how you roof, your hot-work practices, and certificate demands — we will review options through markets that may fit. Placement is not guaranteed.",
    serviceName: "Roofing Contractors Insurance",
  },
  {
    slug: "electrical-contractors-insurance",
    category: "commercial",
    metaTitle:
      "Electrical Contractors Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Electrical contractors insurance for Windsor-Essex and Ontario trades — live work, completed operations, tools, and COIs through an independent broker. Coverage is not guaranteed.",
    headline: "Electrical Contractors Insurance in Windsor-Essex",
    subhead:
      "Electrical contractors insurance is for the operating electrical trade — service, renovation, and new-construction wiring across Windsor-Essex and Ontario — not a duplicate of the Contractors hub and not professional design liability unless that exposure is separately arranged. Live work, arc-flash and shock exposures, temporary power, and completed-operations allegations after energization are among the items underwriters and GCs commonly review. Terms depend on operations and insurer appetite; coverage is not promised from every market.",
    quoteHref: QUOTE_CONTRACTOR,
    quoteLabel: "Get an Electrical Contractors Quote",
    photographySlug: "electrical-contractors-insurance",
    coverageIntro:
      "Coverages commonly reviewed for electrical contracting operations — focused on trade exposures rather than restating the hub's general CGL and tools overview.",
    coverageTypes: [
      {
        id: "electrical-operations-liability",
        title: "Operations & Completed Ops Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims from electrical contracting work and completed installations — subject to policy terms.",
        detailTitle: "Energized work and post-install failures drive many electrical claim patterns",
        detailDescription:
          "Shock, arc-flash affecting third parties, and alleged improper installation after energization are frequent themes. Lockout/tagout practices, permit processes, and supervision affect underwriting discussions. Completed-operations and products-completed wording should be reviewed against the types of systems you install.",
        icon: Zap,
      },
      {
        id: "tools-test-equipment",
        title: "Tools & Test Equipment",
        shortLabel: "Tools",
        description:
          "Where purchased, may address meters, benders, threaders, and specialty tools subject to limits, scheduling, and theft conditions.",
        detailTitle: "High-value test gear needs intentional scheduling — not an assumption",
        detailDescription:
          "Meggers, thermal cameras, and specialty benders can exceed blanket tool limits. Schedule high-value items when required and confirm unattended-vehicle conditions. Tools coverage does not replace auto coverage on service vans.",
        icon: Wrench,
      },
      {
        id: "design-assist-eo",
        title: "Design-Assist & E&O Questions",
        shortLabel: "E&O",
        description:
          "If you stamp drawings or provide design-assist beyond installation labour, professional liability may need a separate review — not assumed inside CGL.",
        detailTitle: "Installation CGL is not automatic design liability",
        detailDescription:
          "Pure installation work and design responsibility are underwritten differently. If contracts require professional liability or you employ licensed design professionals for sealed drawings, ask about a separate E&O discussion rather than assuming CGL responds.",
        icon: Briefcase,
      },
      {
        id: "certificates-additional-insured",
        title: "Certificates & Additional Insured",
        shortLabel: "COIs",
        description:
          "Project owners and GCs often require specific limits and additional-insured wording before electrical mobilization.",
        detailTitle: "Match bid insurance exhibits to endorsements you can actually obtain",
        detailDescription:
          "Primary/non-contributory and waiver requests are endorsement-dependent when available. Confirm capability before accepting onerous insurance exhibits.",
        icon: HardHat,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario electrical contractors — service, renovation, and project electrical trades — reviewed through an independent broker. Use the Contractors hub for the broader program overview. Not personal insurance; not a substitute for builder's risk on the project property.",
    considerations: [
      {
        title: "Live work and arc-flash controls",
        description:
          "Carriers may ask about energized-work policies, PPE, and training. Strong controls can support placement discussions; they do not guarantee terms.",
      },
      {
        title: "Residential vs industrial mix",
        description:
          "Service vans doing residential service calls underwrite differently from industrial shutdown work. Disclose revenue mix accurately.",
      },
      {
        title: "Subcontracted specialty trades",
        description:
          "If you subcontract low-voltage, fire-alarm, or high-voltage specialties, certificate practices should match how jobs are staffed.",
      },
      {
        title: "Bonding for public and large private bids",
        description:
          "Bid and performance bonds are surety products — see Surety Bonds when tenders require them.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
    ],
    faqTitle: "Electrical contractors insurance FAQ",
    faqItems: [
      {
        question: "Is this the same as the Contractors hub?",
        answer:
          "No. The hub covers contracting programs in overview. This page focuses on electrical trade exposures such as live work, completed installations, and design-assist questions.",
      },
      {
        question: "Does CGL cover design errors?",
        answer:
          "Commercial general liability typically addresses bodily injury and property damage from operations, not professional design mistakes. Design or sealed-drawing exposures may need professional liability where available.",
      },
      {
        question: "Are my meters and benders covered automatically?",
        answer:
          "Only with appropriate tools or inland marine coverage and limits. Liability policies do not replace stolen tools.",
      },
      {
        question: "Do industrial shutdowns need different coverage?",
        answer:
          "They can. Higher hazard work, plant access rules, and wrap-up participation may change how a program is structured. Disclose the work mix so markets can be approached accurately.",
      },
      {
        question: "Can every electrical contractor be placed?",
        answer:
          "No. Appetite varies by claims history, safety, and work type. We review suitable markets when available without guaranteeing placement.",
      },
    ],
    ctaHeading: "Operating an electrical contracting trade?",
    ctaSubhead:
      "Tell us your service vs project mix, live-work practices, and certificate requirements — we will review options that may fit. Coverage is not guaranteed.",
    serviceName: "Electrical Contractors Insurance",
  },
  {
    slug: "plumbing-hvac-insurance",
    category: "commercial",
    metaTitle:
      "Plumbing & HVAC Contractors Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Plumbing and HVAC contractors insurance for Windsor-Essex and Ontario — water damage, refrigerant, and completed-ops exposures through an independent broker. Not guaranteed.",
    headline: "Plumbing & HVAC Contractors Insurance",
    subhead:
      "Plumbing and HVAC contractors insurance is for operating mechanical trades — plumbing, heating, cooling, and related service and installation across Windsor-Essex and Ontario — as a child of the Contractors hub, not a rewrite of it. Water-damage completed operations, refrigerant handling, temporary heat, and gas-fitting exposures are among the items underwriters and contract insurance exhibits often review. Available coverage depends on operations and markets; nothing here guarantees placement.",
    quoteHref: QUOTE_CONTRACTOR,
    quoteLabel: "Get a Plumbing & HVAC Quote",
    photographySlug: "plumbing-hvac-insurance",
    coverageIntro:
      "Coverages commonly reviewed for plumbing and HVAC contracting — emphasizing water, mechanical, and refrigerant exposures rather than repeating hub-level CGL/tools copy.",
    coverageTypes: [
      {
        id: "plumbing-hvac-liability",
        title: "Operations & Completed Ops Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims from plumbing and HVAC work — including some post-install water or heating allegations subject to wording.",
        detailTitle: "Water escape after installation is a defining mechanical-trade exposure",
        detailDescription:
          "Failed fittings, frozen lines after temporary heat removal, and condensate issues can generate large property-damage claims. Completed-operations terms, workmanship exclusions, and contractual risk transfer all matter. Describe service vs new-install revenue clearly during underwriting.",
        icon: Briefcase,
      },
      {
        id: "refrigerant-fuel-gas",
        title: "Refrigerant, Fuel & Gas Work",
        shortLabel: "Refrigerant",
        description:
          "HVAC refrigerant handling and gas-fitting introduce specialized underwriting questions; limited pollution or environmental discussions may arise depending on operations.",
        detailTitle: "Refrigerant and fuel work are not always treated like ordinary plumbing",
        detailDescription:
          "Recovery practices, cylinder storage, and gas-fitting licences can affect how markets view the risk. Where pollution-type exposures appear, a separate pollution product may be discussed — see Pollution Liability. Do not assume every escape of refrigerant or fuel is covered under CGL alone.",
        icon: AlertTriangle,
      },
      {
        id: "tools-machines-stock",
        title: "Tools, Machines & Parts Stock",
        shortLabel: "Tools",
        description:
          "Where purchased, may address threaders, recovery machines, brazing gear, and parts stock subject to limits and conditions.",
        detailTitle: "Recovery machines and specialty tools often need intentional limits",
        detailDescription:
          "Confirm blanket versus scheduled tools coverage and any stock of condensers or fixtures carried on vehicles. Auto physical damage on the van is separate from tools inland marine.",
        icon: Wrench,
      },
      {
        id: "certificates-wrap-participation",
        title: "Certificates & Project Participation",
        shortLabel: "COIs",
        description:
          "Mechanical trades on larger projects often face additional-insured, waiver, and sometimes wrap-up or OCIP participation requirements.",
        detailTitle: "Wrap-up enrolment does not replace an operating trade program",
        detailDescription:
          "When a project uses a wrap-up, your operating CGL still matters for off-wrap work and ongoing service. Coordinate certificate demands with how each job is insured.",
        icon: HardHat,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario plumbing and HVAC contractors — service companies and project mechanical trades — reviewed through an independent broker. Child page of Contractors; not personal dwelling coverage; not builder's risk for the building under construction.",
    considerations: [
      {
        title: "Water-damage claim history",
        description:
          "Prior water-damage losses heavily influence mechanical-trade underwriting. Accurate loss runs and corrective practices help markets evaluate the risk.",
      },
      {
        title: "Temporary heat responsibilities",
        description:
          "Contracts that assign temporary heat can create freeze-up exposures. Clarify contractual scope and monitoring practices.",
      },
      {
        title: "Refrigerant and waste handling",
        description:
          "Document recovery and disposal practices. Environmental questions may point to a pollution discussion rather than assuming CGL responds.",
      },
      {
        title: "New construction vs service mix",
        description:
          "Pure service shops and large project mechanical installs underwrite differently. Disclose the mix.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
    faqTitle: "Plumbing & HVAC contractors insurance FAQ",
    faqItems: [
      {
        question: "How does this relate to the Contractors page?",
        answer:
          "Contractors is the hub. This page covers plumbing and HVAC-specific exposures such as water-damage completed operations and refrigerant handling without restating the hub's general CGL and tools overview.",
      },
      {
        question: "Will liability cover a flood from our work?",
        answer:
          "Some third-party water-damage claims may fall under CGL completed operations subject to exclusions and facts. Workmanship, faulty-work, and pollution-related exclusions can apply. Review the form with a broker.",
      },
      {
        question: "Do I need pollution coverage for refrigerant?",
        answer:
          "Sometimes a limited pollution or specialty discussion is appropriate depending on handling and storage. It is not automatic — see Pollution Liability when relevant.",
      },
      {
        question: "Are boilers we install covered under our trade policy?",
        answer:
          "Your liability may address certain third-party claims from installation. The customer's equipment breakdown or property policy is usually a separate question for the building owner.",
      },
      {
        question: "Is coverage guaranteed for every plumbing or HVAC firm?",
        answer:
          "No. Markets evaluate claims, controls, and operations individually. We approach suitable insurers when available.",
      },
    ],
    ctaHeading: "Plumbing or HVAC contractor seeking a commercial review?",
    ctaSubhead:
      "Share your service vs install mix, water-damage history, and refrigerant practices — we will explore markets that may fit. Placement is not guaranteed.",
    serviceName: "Plumbing & HVAC Contractors Insurance",
  },
  {
    slug: "excavation-contractors-insurance",
    category: "commercial",
    metaTitle:
      "Excavation & Concrete Contractors Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Excavation, concrete, and sewer/watermain contractors insurance for Windsor-Essex and Ontario — underground utility, cave-in, and heavy-equipment exposures. Not guaranteed.",
    headline: "Excavation, Concrete & Sewer/Watermain Insurance",
    subhead:
      "Excavation, concrete, and sewer/watermain contractors insurance is for earthwork and underground trades operating in Windsor-Essex and across Ontario — a Contractors hub child page, not a copy of the hub. Cave-ins, underground utility strikes, vibration damage, ready-mix and forming exposures, and heavy equipment on and off road are among the items underwriters commonly review. Dump-truck hauling may need a coordinated commercial auto discussion. Coverage depends on operations and insurer appetite; it is never guaranteed from every market.",
    quoteHref: QUOTE_CONTRACTOR,
    quoteLabel: "Get an Excavation Contractors Quote",
    photographySlug: "excavation-contractors-insurance",
    coverageIntro:
      "Coverages commonly reviewed for excavation, concrete, and underground utility contracting — focused on earthwork and heavy-equipment exposures rather than repeating hub CGL/tools copy.",
    coverageTypes: [
      {
        id: "excavation-operations-liability",
        title: "Operations & Completed Ops Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims from excavation, concrete, or underground utility work — subject to policy terms and exclusions.",
        detailTitle: "Utility strikes and adjacent-property vibration are signature earthwork claims",
        detailDescription:
          "Locate procedures, shoring, and vibration monitoring practices often appear in underwriting and claim files. Completed operations may involve settlement or drainage allegations after backfill. Disclose trench depth, urban vs rural mix, and municipal contract requirements accurately.",
        icon: Hammer,
      },
      {
        id: "underground-utility-controls",
        title: "Underground Utility & Shoring Controls",
        shortLabel: "Utilities",
        description:
          "Underwriters frequently ask about locate protocols, hydrovac use, and trench protection — risk-management practices that can affect insurability discussions.",
        detailTitle: "Ontario locate and shoring discipline is part of how markets view the risk",
        detailDescription:
          "Documented locate tickets, hydrovac for soft digs near live utilities, and engineered shoring where required are risk-management recommendations — not coverage promises. Some high-hazard underground work faces limited market appetite.",
        icon: AlertTriangle,
      },
      {
        id: "heavy-equipment-inland-marine",
        title: "Heavy Equipment & Inland Marine",
        shortLabel: "Equipment",
        description:
          "Where purchased, may address excavators, loaders, and other scheduled equipment subject to valuation, theft conditions, and operating radius.",
        detailTitle: "Equipment floats are separate from dump-truck highway liability",
        detailDescription:
          "Contractors equipment coverage addresses the machine; Ontario automobile coverage addresses licensed dump trucks on the road — see Dump Truck Insurance when hauling is material. Confirm whether equipment is owned, rented, or both.",
        icon: Wrench,
      },
      {
        id: "certificates-municipal-bonds",
        title: "Certificates, Municipal & Bonds",
        shortLabel: "COIs",
        description:
          "Municipal and GC contracts often demand specific limits, additional insured status, and sometimes surety bonds for underground work.",
        detailTitle: "Tender insurance exhibits and bonding should be reviewed before bid day",
        detailDescription:
          "Align certificate wording and bond capacity with Surety Bonds and your operating liability program. Do not assume every municipal exhibit is automatically supportable.",
        icon: HardHat,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario excavation, concrete, and sewer/watermain contractors — including operators who also run dump trucks — reviewed through an independent broker. Child of the Contractors hub; coordinate Dump Truck and Pollution pages when those exposures apply.",
    considerations: [
      {
        title: "Utility locate discipline",
        description:
          "Strike history and locate practices heavily influence underwriting. Keep records current.",
      },
      {
        title: "Depth, shoring, and urban work",
        description:
          "Deep trenches in dense urban corridors underwrite differently from rural grading. Disclose typical scopes.",
      },
      {
        title: "Hauling vs digging",
        description:
          "If dump trucks are core to the operation, review Dump Truck / commercial auto alongside the trade CGL — they are not the same product.",
      },
      {
        title: "Spoil, dewatering, and pollution questions",
        description:
          "Contaminated soil, dewatering discharge, or fuel storage on site may raise pollution discussions — see Pollution Liability when relevant.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Dump Truck Insurance", href: "/dump-truck-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
    faqTitle: "Excavation & concrete contractors insurance FAQ",
    faqItems: [
      {
        question: "Is this the same as Dump Truck insurance?",
        answer:
          "No. This page focuses on excavation, concrete, and underground contracting liability and equipment. Licensed dump trucks on public roads need a commercial automobile discussion — see Dump Truck Insurance.",
      },
      {
        question: "Does liability cover hitting a gas line?",
        answer:
          "Some third-party property-damage claims may be considered under CGL subject to exclusions, locate compliance, and facts. Utility strikes are heavily scrutinized; coverage is never automatic.",
      },
      {
        question: "Do I need pollution coverage for excavation?",
        answer:
          "Possibly when handling contaminated soils, fuels, or certain discharges. Discuss Pollution Liability when those exposures exist rather than assuming CGL alone responds.",
      },
      {
        question: "How does this relate to Builders & Developers?",
        answer:
          "Builders & Developers addresses developer/GC program structures. This page is for operating earthwork and concrete trades. Builder's Risk remains project property coverage when required.",
      },
      {
        question: "Can every excavation contractor be insured?",
        answer:
          "No. Hazard profile, claims, and controls drive appetite. We review suitable markets when available without guaranteeing placement.",
      },
    ],
    ctaHeading: "Excavation, concrete, or underground utility contractor?",
    ctaSubhead:
      "Share typical depths, locate practices, equipment, and whether dump trucks are part of the operation — we will review options that may fit. Coverage is not guaranteed.",
    serviceName: "Excavation, Concrete & Sewer/Watermain Insurance",
  },

  // ─── Real estate trio (distinct from personal landlord) ────────────────
  {
    slug: "commercial-landlord-insurance",
    category: "commercial",
    metaTitle:
      "Commercial Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial landlord insurance for Windsor-Essex and Ontario building owners leasing to businesses — commercial property and liability programs, not personal rented dwellings.",
    headline: "Commercial Landlord Insurance",
    subhead:
      "Commercial landlord insurance is for owners of buildings leased to business tenants — retail bays, offices, industrial units, and similar commercial rental properties in Windsor-Essex and across Ontario. It is a commercial property and liability discussion, not personal landlord insurance for rented houses, duplexes, or condo units used as dwellings. For residential rental dwellings, see Residential Landlord. Needs vary by construction, occupancy, and lease structure; coverage is not guaranteed from every insurer.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Landlord Quote",
    photographySlug: "commercial-landlord-insurance",
    coverageIntro:
      "Coverages commonly reviewed for commercial building owners who lease space to businesses — distinct from personal residential landlord programs.",
    coverageTypes: [
      {
        id: "building-coverage",
        title: "Building & Landlord Improvements",
        shortLabel: "Building",
        description:
          "May help address certain covered physical loss to the commercial building and landlord improvements — subject to causes of loss, limits, and deductibles.",
        detailTitle: "Insure the commercial building you own — not the tenant's business contents",
        detailDescription:
          "Landlord building coverage typically focuses on the structure and landlord-owned improvements. Tenant furniture, stock, and equipment usually sit on the tenant's own commercial property policy. Lease clauses should clarify who insures what.",
        icon: Building2,
      },
      {
        id: "general-liability",
        title: "Premises Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims arising from ownership of the commercial premises — subject to policy terms.",
        detailTitle: "Common-area and landlord maintenance exposures differ from tenant operations",
        detailDescription:
          "Slip-and-fall in parking lots or lobbies under landlord control is a classic premises claim pattern. Tenant operations inside leased units may require the tenant's own CGL with landlord additional-insured status per lease.",
        icon: Briefcase,
      },
      {
        id: "loss-of-rents",
        title: "Loss of Rents / Rental Income",
        shortLabel: "Rents",
        description:
          "Where purchased, may help replace certain rental income after a covered property loss makes units untenantable — subject to wording and indemnity periods.",
        detailTitle: "Rental income coverage follows a covered property trigger",
        detailDescription:
          "Loss-of-rents forms typically require a covered cause of loss to the building. Ordinary vacancy, tenant default, or non-covered perils are different problems. Review indemnity period against realistic rebuild timelines.",
        icon: KeyRound,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown (Building Systems)",
        shortLabel: "Breakdown",
        description:
          "Where purchased or endorsed, may address certain mechanical or electrical breakdown of building systems that named-peril property forms may not treat the same way — see Equipment Breakdown.",
        detailTitle: "Boilers, HVAC plants, and electrical apparatus are not the same as fire insurance",
        detailDescription:
          "Equipment breakdown is often a distinct agreement or endorsement. For a dedicated explanation, see Equipment Breakdown Insurance. Do not assume every mechanical failure is covered under building property alone.",
        icon: Wrench,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario owners of commercial buildings leased to business tenants — not for personal rented dwellings (houses, duplexes, residential condo units). Personal residential landlords should use Residential Landlord insurance. Multi-unit residential buildings operated as commercial property programs may fit Apartment Building Insurance instead.",
    considerations: [
      {
        title: "Commercial vs personal landlord — different buyers",
        description:
          "This page is commercial building ownership. Personal landlord insurance covers residential rental dwellings. Choosing the wrong path creates coverage and underwriting mismatches.",
      },
      {
        title: "Lease insurance clauses",
        description:
          "Leases should state who insures building, improvements, contents, and liability, and what additional-insured or waiver wording tenants must provide.",
      },
      {
        title: "Occupancy and tenant mix",
        description:
          "Restaurants, auto uses, and industrial tenants change property and liability underwriting versus office or dry retail.",
      },
      {
        title: "Vacancy conditions",
        description:
          "Extended vacancy can trigger policy conditions or restrictions. Disclose vacant square footage accurately.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Apartment Building Insurance", href: "/apartment-building-insurance/" },
      { label: "Mixed-Use Property", href: "/mixed-use-property-insurance/" },
      { label: "Real Estate", href: "/real-estate-insurance/" },
      { label: "Residential Landlord", href: "/landlord-insurance/" },
      { label: "Equipment Breakdown", href: "/equipment-breakdown-insurance/" },
    ],
    faqTitle: "Commercial landlord insurance FAQ",
    faqItems: [
      {
        question: "Is this the same as Landlord Insurance on the Personal menu?",
        answer:
          "No. Personal Landlord Insurance is for residential rental dwellings. Commercial Landlord Insurance is for commercial buildings leased to businesses. Use Residential Landlord for houses, duplexes, and similar personal rentals.",
      },
      {
        question: "Does the landlord policy cover the tenant's inventory?",
        answer:
          "Usually not. Tenant contents and stock typically belong on the tenant's commercial property policy. Confirm lease responsibilities.",
      },
      {
        question: "What if I own an apartment building?",
        answer:
          "Multi-unit residential buildings run as commercial property programs are often a better fit for Apartment Building Insurance than this commercial-tenant landlord page — though related. Ask a broker which framing fits your ownership and leases.",
      },
      {
        question: "Is loss of rents automatic?",
        answer:
          "No. Rental income coverage is usually purchased or endorsed with limits and indemnity periods that must be set intentionally.",
      },
      {
        question: "Can every commercial landlord be placed?",
        answer:
          "No. Construction, protection, occupancy, and claims history drive appetite. Placement is never guaranteed.",
      },
    ],
    ctaHeading: "Own a commercial building leased to business tenants?",
    ctaSubhead:
      "Share construction, occupancy, and lease insurance clauses — we will review commercial landlord options that may fit. Not for personal rented dwellings; coverage is not guaranteed.",
    serviceName: "Commercial Landlord Insurance",
  },
  {
    slug: "apartment-building-insurance",
    category: "commercial",
    metaTitle:
      "Apartment Building Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Apartment building insurance for Windsor-Essex and Ontario multi-unit residential properties as commercial programs — not personal single-dwelling landlord insurance.",
    headline: "Apartment Building Insurance",
    subhead:
      "Apartment building insurance is for multi-unit residential buildings insured as commercial property programs — walk-ups, mid-rises, and similar rental apartments in Windsor-Essex and across Ontario. It covers commercial building ownership and multi-unit residential operations, not personal landlord insurance for a single rented house or duplex. Habitational underwriting, life-safety systems, and rental-income exposures differ from office or retail landlord risks. Terms vary by construction and claims history; coverage is not guaranteed.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get an Apartment Building Quote",
    photographySlug: "apartment-building-insurance",
    coverageIntro:
      "Coverages commonly reviewed for multi-unit residential buildings placed as commercial habitational property programs — distinct from personal residential landlord policies.",
    coverageTypes: [
      {
        id: "building-coverage",
        title: "Building & Common Property",
        shortLabel: "Building",
        description:
          "May help address certain covered physical loss to the apartment building and common-area property — subject to form, limits, and deductibles.",
        detailTitle: "Habitational construction and protection classes drive property underwriting",
        detailDescription:
          "Wood-frame walk-ups, sprinklered mid-rises, and older converted buildings underwrite differently. Unit interior responsibilities vs landlord common property should match leases and bylaws where applicable.",
        icon: Building2,
      },
      {
        id: "general-liability",
        title: "Premises Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party injury claims arising from building ownership and common areas — subject to policy terms.",
        detailTitle: "Stairs, parking, and winter maintenance are frequent habitational claim themes",
        detailDescription:
          "Documented snow removal, lighting, and security practices are risk-management recommendations that can affect insurability discussions — not guarantees of coverage.",
        icon: Briefcase,
      },
      {
        id: "loss-of-rents",
        title: "Rental Income",
        shortLabel: "Rents",
        description:
          "Where purchased, may help replace certain rental income after a covered loss — subject to indemnity period and wording.",
        detailTitle: "Set indemnity periods against realistic multi-unit rebuild timelines",
        detailDescription:
          "Apartment rebuilds can extend beyond short indemnity periods. Review limits against gross rents and ordinance-or-law exposures where applicable.",
        icon: KeyRound,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased, may address certain breakdown of boilers, elevators, and building mechanical/electrical systems — see Equipment Breakdown for a dedicated page.",
        detailTitle: "Elevators and central plants are critical habitational systems",
        detailDescription:
          "Breakdown coverage is often separate from named-peril building insurance. Coordinate with Equipment Breakdown Insurance when mechanical systems are material to operations.",
        icon: Wrench,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario owners of multi-unit apartment buildings insured on commercial habitational programs — not personal landlords of single rented dwellings. For houses and duplexes, use Residential Landlord. For commercial tenants only, see Commercial Landlord. Condo corporations have a separate page.",
    considerations: [
      {
        title: "Not personal landlord insurance",
        description:
          "A single rented house or duplex belongs on personal landlord / residential rental programs. Apartment buildings are commercial multi-unit placements.",
      },
      {
        title: "Life-safety and maintenance records",
        description:
          "Fire systems, elevator certificates, and maintenance logs often appear in underwriting questionnaires.",
      },
      {
        title: "Student and short-term occupancy",
        description:
          "Student-heavy or short-term rental mixes can change appetite. Disclose occupancy accurately.",
      },
      {
        title: "Ordinance or law and older buildings",
        description:
          "Older stock may need intentional ordinance-or-law limits if bylaws require upgrades after a loss.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Landlord", href: "/commercial-landlord-insurance/" },
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Condo Corporation", href: "/condominium-corporation-insurance/" },
      { label: "Mixed-Use Property", href: "/mixed-use-property-insurance/" },
      { label: "Residential Landlord", href: "/landlord-insurance/" },
      { label: "Equipment Breakdown", href: "/equipment-breakdown-insurance/" },
    ],
    faqTitle: "Apartment building insurance FAQ",
    faqItems: [
      {
        question: "I rent out my house — is this the right page?",
        answer:
          "Usually no. Personal rented dwellings belong on Residential Landlord insurance. This page is for multi-unit apartment buildings as commercial programs.",
      },
      {
        question: "How is this different from Commercial Landlord?",
        answer:
          "Commercial Landlord focuses on buildings leased to business tenants. Apartment Building focuses on multi-unit residential habitational programs. Mixed-use buildings may need Mixed-Use Property Insurance.",
      },
      {
        question: "Does this replace a condo corporation policy?",
        answer:
          "No. Condominium corporations have distinct master-policy structures — see Condo Corporation Insurance.",
      },
      {
        question: "Are tenants' belongings covered?",
        answer:
          "Typically tenants need their own contents insurance. Landlord building programs focus on the building and landlord property.",
      },
      {
        question: "Is placement guaranteed?",
        answer:
          "No. Habitational markets evaluate construction, protection, location, and claims individually.",
      },
    ],
    ctaHeading: "Own a multi-unit apartment building?",
    ctaSubhead:
      "Share unit count, construction, and life-safety systems — we will review commercial habitational options that may fit. Not for personal single-dwelling rentals; coverage is not guaranteed.",
    serviceName: "Apartment Building Insurance",
  },
  {
    slug: "mixed-use-property-insurance",
    category: "commercial",
    metaTitle:
      "Mixed-Use Property Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Mixed-use property insurance for Windsor-Essex and Ontario buildings combining retail, office, and residential occupancies — commercial programs, not personal landlord policies.",
    headline: "Mixed-Use Property Insurance",
    subhead:
      "Mixed-use property insurance is for buildings that combine commercial and residential occupancies — street-level retail or office with apartments above, and similar stacks in Windsor-Essex and across Ontario. It is a commercial multi-occupancy property discussion, not personal landlord insurance for a rented dwelling. Occupancy disclosure, cooking exposures, and shared systems drive underwriting. Available terms vary; coverage is not guaranteed from every insurer.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Mixed-Use Property Quote",
    photographySlug: "mixed-use-property-insurance",
    coverageIntro:
      "Coverages commonly reviewed when one commercial property program must contemplate multiple occupancy types in the same building.",
    coverageTypes: [
      {
        id: "building-coverage",
        title: "Building — Multi-Occupancy",
        shortLabel: "Building",
        description:
          "May help address certain covered physical loss to the mixed-use building — subject to occupancy schedules, forms, and limits.",
        detailTitle: "Occupancy schedules must match how the building actually operates",
        detailDescription:
          "Retail cooking, cannabis retail, offices, and residential units change rate and eligibility. Undisclosed restaurant or hazardous tenants create claim and underwriting problems. Keep schedules current.",
        icon: Layers,
      },
      {
        id: "general-liability",
        title: "Premises Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party claims from common areas and landlord-controlled portions of a mixed-use property — subject to wording.",
        detailTitle: "Shared entrances and parking serve both commercial and residential users",
        detailDescription:
          "Maintenance and security practices should reflect the combined foot traffic. Tenant CGL requirements still matter for commercial bays.",
        icon: Briefcase,
      },
      {
        id: "loss-of-rents",
        title: "Rental Income — Commercial & Residential",
        shortLabel: "Rents",
        description:
          "Where purchased, may help with certain rental income for both commercial and residential units after a covered loss — subject to limits and wording.",
        detailTitle: "Model both rent rolls when setting rental-income limits",
        detailDescription:
          "Commercial and residential rents may recover on different timelines after a loss. Set limits and indemnity periods intentionally.",
        icon: KeyRound,
      },
      {
        id: "equipment-breakdown",
        title: "Shared Systems Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased, may address certain breakdown of shared boilers, electrical gear, and HVAC serving multiple occupancies — see Equipment Breakdown.",
        detailTitle: "One mechanical plant often serves the whole mixed-use stack",
        detailDescription:
          "A boiler or electrical failure can interrupt both storefronts and residences. Coordinate breakdown discussions with Equipment Breakdown Insurance.",
        icon: Wrench,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario owners of mixed-use buildings (commercial + residential in one structure) seeking a commercial property program — not personal rented-dwelling landlords. Pure commercial-tenant buildings may fit Commercial Landlord; pure multi-residential may fit Apartment Building.",
    considerations: [
      {
        title: "Full occupancy disclosure",
        description:
          "List every occupancy type, cooking exposures, and hazardous tenants. Mixed-use underwriting fails when schedules are incomplete.",
      },
      {
        title: "Not personal landlord insurance",
        description:
          "Personal landlord pages address residential dwellings. Mixed-use commercial programs are a different product path.",
      },
      {
        title: "Separation and life safety",
        description:
          "Fire separation, egress, and alarm systems between commercial and residential floors often appear in underwriting and municipal requirements.",
      },
      {
        title: "Tenant insurance requirements",
        description:
          "Commercial bay leases should still require tenant CGL and property where appropriate; residential tenants need contents coverage.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Landlord", href: "/commercial-landlord-insurance/" },
      { label: "Apartment Building Insurance", href: "/apartment-building-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Residential Landlord", href: "/landlord-insurance/" },
    ],
    faqTitle: "Mixed-use property insurance FAQ",
    faqItems: [
      {
        question: "What counts as mixed-use?",
        answer:
          "Typically a single building with both commercial (retail/office/etc.) and residential occupancies. Exact underwriting definitions vary by insurer — describe your stack accurately.",
      },
      {
        question: "Is this personal landlord insurance?",
        answer:
          "No. It is a commercial multi-occupancy property program. Personal rented dwellings use Residential Landlord insurance.",
      },
      {
        question: "My ground floor is a restaurant — does that matter?",
        answer:
          "Yes. Cooking occupancies materially affect property underwriting and may require specific protections. Disclose them.",
      },
      {
        question: "Should I use Commercial Landlord instead?",
        answer:
          "If the building is solely leased to businesses with no residential units, Commercial Landlord or Commercial Property may fit better. Ask a broker when the mix is unclear.",
      },
      {
        question: "Is coverage guaranteed?",
        answer:
          "No. Mixed-use risks are occupancy-sensitive and market appetite varies.",
      },
    ],
    ctaHeading: "Own a mixed-use building in Windsor-Essex or Ontario?",
    ctaSubhead:
      "Share your occupancy schedule, cooking exposures, and rent rolls — we will review commercial mixed-use options that may fit. Not personal dwelling landlord coverage; placement is not guaranteed.",
    serviceName: "Mixed-Use Property Insurance",
  },

  // ─── Tow truck ──────────────────────────────────────────────────────────
  {
    slug: "tow-truck-insurance",
    category: "commercial",
    metaTitle:
      "Tow Truck Operators Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Tow truck operators insurance for Windsor-Essex and Ontario — on-hook, storage-lot, and roadside liability exposures reviewed through an independent broker. Not guaranteed.",
    headline: "Tow Truck Operators Insurance",
    subhead:
      "Tow truck operators insurance is for towing and recovery businesses in Windsor-Essex and across Ontario — light-duty, heavy-duty, and roadside assistance fleets. On-hook liability for customer vehicles in tow, storage-lot bailee exposures, and roadside operations differ from ordinary commercial auto or garage programs. Terms depend on equipment, radius, and insurer appetite; coverage is not guaranteed.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Tow Truck Quote",
    photographySlug: "tow-truck-insurance",
    coverageIntro:
      "Coverages commonly reviewed for towing operators — on-hook exposure for customer vehicles, commercial auto liability, physical damage on tow units, and storage-lot or roadside liability.",
    coverageTypes: [
      {
        id: "liability-coverage",
        title: "Commercial Auto Liability",
        shortLabel: "Auto Liability",
        description:
          "May help respond to certain third-party injury or property-damage claims arising from use of licensed tow vehicles on public roads — subject to Ontario automobile wording and limits.",
        detailTitle: "Highway liability for the wrecker is not the same as on-hook coverage for the customer's car",
        detailDescription:
          "Ontario commercial automobile liability addresses certain claims from the operation of your tow unit. Damage to a customer's vehicle while hooked or in your care typically needs on-hook or garagekeepers-type discussion — not ordinary third-party auto liability alone.",
        icon: Truck,
      },
      {
        id: "physical-damage-coverage",
        title: "Physical Damage — Tow Units",
        shortLabel: "Physical Damage",
        description:
          "Where purchased, may address certain collision or comprehensive loss to owned tow trucks and recovery equipment subject to deductibles and valuation.",
        detailTitle: "Schedule wreckers, dollies, and specialized recovery gear intentionally",
        detailDescription:
          "Heavy rotators and specialized recovery equipment can require stated values and underwriting detail. Confirm whether detachable gear is included.",
        icon: Wrench,
      },
      {
        id: "on-hook-bailee",
        title: "On-Hook & Customer Vehicle Care",
        shortLabel: "On-Hook",
        description:
          "Where available, on-hook or bailee-type coverages may address certain loss to customer vehicles while being towed or in your care — subject to separate wording, limits, and exclusions.",
        detailTitle: "Customer vehicles in tow need a dedicated care, custody, or control discussion",
        detailDescription:
          "Standard auto liability does not automatically insure the customer's car on your hook. On-hook limits, excluded causes, and storage-lot transitions should be reviewed explicitly. Availability varies by market.",
        icon: Shield,
      },
      {
        id: "storage-lot-roadside",
        title: "Storage Lots & Roadside Operations",
        shortLabel: "Storage / Roadside",
        description:
          "Impound and storage yards, after-hours release, and roadside recovery introduce premises and bailee exposures that differ from pure highway auto.",
        detailTitle: "Yard security and roadside scenes are operational risk drivers",
        detailDescription:
          "Fencing, lighting, camera systems, and key control on storage lots are risk-management practices underwriters may ask about. Roadside work near live traffic raises safety and liability questions beyond a standard fleet profile. Garage or dealership pages may apply if you also repair customer vehicles — tow-only operators should not assume garage forms.",
        icon: AlertTriangle,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario tow truck and recovery operators — including light- and heavy-duty towing and roadside assistance — reviewed through an independent broker. Related to Commercial Auto, Garage, and Dump Truck pages but focused on towing and storage-lot exposures.",
    considerations: [
      {
        title: "On-hook is not automatic",
        description:
          "Ask specifically whether customer vehicles in tow or in storage are addressed and at what limits. Do not assume highway liability covers the customer's car.",
      },
      {
        title: "Radius and heavy recovery",
        description:
          "Long-haul recovery and heavy rotators underwrite differently from local light-duty towing. Disclose equipment and territory.",
      },
      {
        title: "Police and motor-club contracts",
        description:
          "Contractual insurance requirements from municipalities, police boards, or motor clubs must match what your program can support.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Garage / Dealership", href: "/garage-dealership-insurance/" },
      { label: "Dump Truck", href: "/dump-truck-insurance/" },
      { label: "Trucking", href: "/trucking-insurance/" },
    ],
    faqTitle: "Tow truck operators insurance FAQ",
    faqItems: [
      {
        question: "Does commercial auto cover the car I am towing?",
        answer:
          "Not automatically. Highway liability for your wrecker is separate from on-hook or bailee coverage for the customer's vehicle. Ask for on-hook terms explicitly.",
      },
      {
        question: "Is this the same as Garage insurance?",
        answer:
          "Not necessarily. Garage and dealership programs focus on repair and dealer inventory exposures. Pure towing and storage operations need a towing-focused review; some operators need both discussions.",
      },
      {
        question: "Are storage-lot thefts covered?",
        answer:
          "Only where bailee or storage-lot wording and limits apply, subject to security conditions and exclusions. Confirm separately from auto liability.",
      },
      {
        question: "Do roadside and heavy-recovery jobs need special disclosure?",
        answer:
          "Yes. Long-haul recovery, heavy rotators, and work near live traffic can change underwriting. Disclose equipment types, radius, and contract work so markets can be approached accurately.",
      },
      {
        question: "Can every tow operator be placed?",
        answer:
          "No. Equipment, claims, radius, and storage practices affect appetite. Placement is not guaranteed.",
      },
    ],
    ctaHeading: "Operate tow trucks or a recovery yard?",
    ctaSubhead:
      "Share unit types, on-hook needs, storage-lot practices, and contract requirements — we will review commercial auto and related options that may fit. Coverage is not guaranteed.",
    serviceName: "Tow Truck Operators Insurance",
  },

  // ─── Specialty: commercial umbrella ─────────────────────────────────────
  {
    slug: "commercial-umbrella-insurance",
    category: "commercial",
    metaTitle:
      "Commercial Umbrella & Excess Liability in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial umbrella and excess liability for Windsor-Essex and Ontario businesses — additional limits over CGL and auto, distinct from personal umbrella. Not guaranteed.",
    headline: "Commercial Umbrella & Excess Liability Insurance",
    subhead:
      "Commercial umbrella and excess liability insurance can provide additional liability limits above scheduled underlying commercial policies — such as commercial general liability and commercial automobile — for Windsor-Essex and Ontario businesses. It is not Personal Umbrella Insurance, which sits over personal home and auto. Umbrella and excess forms differ; underlying limits, exclusions, and follow-form behaviour vary by insurer. Additional limits are not guaranteed and are not available from every market for every risk.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Umbrella Quote",
    photographySlug: "commercial-umbrella-insurance",
    coverageIntro:
      "How commercial umbrella and excess liability typically relate to underlying commercial policies — without implying every business qualifies or every insurer offers the same form.",
    coverageTypes: [
      {
        id: "excess-over-cgl",
        title: "Excess over Commercial General Liability",
        shortLabel: "Over CGL",
        description:
          "Where placed, may provide additional limits above a scheduled CGL for certain covered liability claims — subject to umbrella/excess wording and underlying requirements.",
        detailTitle: "Umbrella limits sit above — they do not fix an inadequate primary program",
        detailDescription:
          "Insurers usually require minimum underlying CGL limits before an umbrella will attach. Exclusions in the primary or the umbrella can still apply. Drop-down behaviour for exhausted primaries depends on form.",
        icon: Shield,
      },
      {
        id: "excess-over-auto",
        title: "Excess over Commercial Automobile",
        shortLabel: "Over Auto",
        description:
          "Where scheduled, may provide additional limits above Ontario commercial automobile liability subject to umbrella terms and underlying limits.",
        detailTitle: "Fleet and high-limit auto exposures often drive umbrella purchases",
        detailDescription:
          "Contractors, distributors, and fleets with contractual high-limit demands frequently schedule auto underneath a commercial umbrella. Personal auto does not belong on a commercial umbrella schedule.",
        icon: Truck,
      },
      {
        id: "follow-form-vs-broader",
        title: "Follow-Form vs Broader Umbrella",
        shortLabel: "Form Type",
        description:
          "Some excess forms largely follow the underlying policies; some umbrellas may be broader or narrower in defined ways — always read the actual form.",
        detailTitle: "Do not assume “umbrella” means broader coverage than the primary",
        detailDescription:
          "Marketing language varies. The issued wording controls. Self-insured retentions, covered territories, and excluded exposures (for example certain professional or cyber claims) differ by product.",
        icon: Layers,
      },
      {
        id: "contractual-limit-demands",
        title: "Contractual High-Limit Demands",
        shortLabel: "Contracts",
        description:
          "Landlord, GC, and vendor contracts often require combined limits that only an umbrella or excess layer can practically meet.",
        detailTitle: "Match certificate limits to layers you can actually bind",
        detailDescription:
          "Bidding with umbrella limits you cannot obtain creates contract risk. Confirm underlying and umbrella capacity before committing to insurance exhibits.",
        icon: Briefcase,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario businesses that need higher commercial liability limits over CGL, commercial auto, or other scheduled underlying policies — not individuals seeking Personal Umbrella Insurance over home and personal auto.",
    considerations: [
      {
        title: "Distinct from personal umbrella",
        description:
          "Personal Umbrella Insurance is a personal lines product. Commercial umbrella/excess is a commercial lines product with different underlying schedules and underwriting.",
      },
      {
        title: "Underlying requirements",
        description:
          "Umbrella carriers typically mandate minimum primary limits and acceptable underlying insurers. Gaps or non-approved primaries can block placement.",
      },
      {
        title: "Not a substitute for missing specialty lines",
        description:
          "Umbrellas usually will not replace professional liability, pollution, or cyber when those are excluded or never written underlying.",
      },
      {
        title: "Static coverage section",
        description:
          "This page uses a structured coverage section without an interactive diorama — umbrella products are limit-layer concepts that do not map cleanly to a building or fleet scene.",
      },
    ],
    relatedLinks: [
      { label: "Small Business", href: "/small-business-insurance/" },
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Personal Umbrella", href: "/personal-umbrella-insurance/" },
    ],
    faqTitle: "Commercial umbrella & excess liability FAQ",
    faqItems: [
      {
        question: "Is this the same as Personal Umbrella Insurance?",
        answer:
          "No. Personal umbrella sits over personal home and auto. Commercial umbrella/excess sits over commercial underlying policies. Titles and buyers are intentionally distinct.",
      },
      {
        question: "What is the difference between umbrella and excess?",
        answer:
          "In practice, forms differ — some follow the underlying closely (excess), while some umbrellas may include broader drop-down or coverage features. The issued policy wording controls; labels alone are not enough.",
      },
      {
        question: "Will an umbrella cover professional errors?",
        answer:
          "Often not, unless professional liability is properly underlying and the umbrella follows or schedules it — many commercial umbrellas exclude professional services. Ask explicitly.",
      },
      {
        question: "Do contracts that ask for $5 million require an umbrella?",
        answer:
          "Often primary limits plus an umbrella or excess layer are how businesses meet higher contractual limits. Structure depends on available markets.",
      },
      {
        question: "Is additional limit capacity guaranteed?",
        answer:
          "No. Umbrella appetite depends on the risk, underlying program, and market conditions.",
      },
    ],
    ctaHeading: "Need higher commercial liability limits?",
    ctaSubhead:
      "Share your underlying CGL and auto limits and any contractual requirements — we will review commercial umbrella or excess options that may fit. Distinct from personal umbrella; placement is not guaranteed.",
    serviceName: "Commercial Umbrella & Excess Liability Insurance",
  },

  // ─── Equipment breakdown ────────────────────────────────────────────────
  {
    slug: "equipment-breakdown-insurance",
    category: "commercial",
    metaTitle:
      "Equipment Breakdown Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Equipment breakdown insurance for Windsor-Essex and Ontario businesses — mechanical and electrical breakdown of equipment distinct from named-peril commercial property. Not guaranteed.",
    headline: "Equipment Breakdown Insurance",
    subhead:
      "Equipment breakdown insurance (often called boiler and machinery coverage) can help address certain sudden and accidental mechanical or electrical breakdown of covered equipment — from boilers and pressure vessels to production machinery and building systems — for Windsor-Essex and Ontario operations. It is not the same as commercial property insurance for fire, wind, or theft, though the two are often coordinated. In-page Coverage Explorer facets named equipment-breakdown on other product pages remain orientation tools on those pages; this route is the dedicated product explanation. Availability and wording vary; coverage is not guaranteed.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get an Equipment Breakdown Quote",
    photographySlug: "equipment-breakdown-insurance",
    coverageIntro:
      "How equipment breakdown typically complements commercial property — focused on mechanical/electrical breakdown rather than restating a full property program.",
    coverageTypes: [
      {
        id: "equipment-breakdown",
        title: "Mechanical & Electrical Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased, may help address certain sudden and accidental breakdown of covered equipment — subject to definitions, exclusions, and limits.",
        detailTitle: "Breakdown is a different trigger than fire or windstorm on a property form",
        detailDescription:
          "A motor burnout, electrical arcing, or boiler explosion (as defined) may be treated under equipment breakdown wording rather than a basic named-perils property form. Exact definitions and exclusions control. Not every equipment failure is a covered breakdown.",
        icon: Wrench,
      },
      {
        id: "spoilage-and-interruption",
        title: "Spoilage & Interruption (When Arranged)",
        shortLabel: "Spoilage / BI",
        description:
          "Where endorsed, certain spoilage of stock or business interruption from a covered breakdown may be available — subject to separate limits and conditions.",
        detailTitle: "Refrigeration and production-line downtime need intentional extensions",
        detailDescription:
          "Restaurants, food processors, and manufacturers often care about spoilage and downtime after equipment failure. Those outcomes are not automatic inside every breakdown form — review extensions explicitly and coordinate with Business Interruption discussions.",
        icon: AlertTriangle,
      },
      {
        id: "building-systems",
        title: "Building Systems",
        shortLabel: "Building Systems",
        description:
          "HVAC plants, elevators, electrical distribution, and boilers serving commercial buildings are frequent breakdown subjects for landlords and owner-occupants.",
        detailTitle: "Coordinate with commercial property and landlord programs",
        detailDescription:
          "Many commercial property placements discuss equipment breakdown as an endorsement or companion coverage. This dedicated page explains the breakdown concept; Commercial Property remains the broader building/contents conversation.",
        icon: Building2,
      },
      {
        id: "production-equipment",
        title: "Production & Process Equipment",
        shortLabel: "Production",
        description:
          "Manufacturers and processors may schedule production equipment for breakdown review alongside property and business interruption.",
        detailTitle: "Older or specialized machinery can face limited appetite",
        detailDescription:
          "Age, maintenance records, and replacement-cost versus ACV valuation affect underwriting. See Manufacturing Insurance for the broader plant program.",
        icon: Hammer,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario businesses and commercial property owners who need a clear review of equipment breakdown / boiler-machinery coverage — distinct from, but often paired with, Commercial Property. Not a substitute for a full property program.",
    considerations: [
      {
        title: "Not a duplicate of Commercial Property",
        description:
          "Property insurance addresses many physical perils to buildings and contents. Equipment breakdown focuses on certain mechanical/electrical breakdown triggers. Most accounts need both conversations coordinated.",
      },
      {
        title: "Maintenance and inspection",
        description:
          "Jurisdictional boiler inspections and maintenance logs often matter. Risk-management practices support insurability discussions; they do not guarantee coverage.",
      },
      {
        title: "Explorer facets on other pages",
        description:
          "Coverage Explorer tabs labeled equipment-breakdown on property, manufacturing, restaurant, and similar pages remain valid in-page facets. This route is the dedicated landing page for the product explanation.",
      },
      {
        title: "Valuation and replacement lead times",
        description:
          "Long lead-time equipment may need intentional limits and interruption planning beyond a basic breakdown limit.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Business Interruption", href: "/business-interruption-insurance/" },
      { label: "Manufacturing", href: "/manufacturing-insurance/" },
      { label: "Commercial Landlord", href: "/commercial-landlord-insurance/" },
    ],
    faqTitle: "Equipment breakdown insurance FAQ",
    faqItems: [
      {
        question: "Is equipment breakdown included in commercial property automatically?",
        answer:
          "Often it is a separate endorsement or companion coverage, not an automatic part of every property form. Confirm whether breakdown is included on your specific policy.",
      },
      {
        question: "Does breakdown cover wear and tear?",
        answer:
          "Typically no. Forms usually target sudden and accidental breakdown as defined, not gradual deterioration or ordinary maintenance.",
      },
      {
        question: "Why did the Commercial Hub used to send me to Commercial Property?",
        answer:
          "Before this dedicated page existed, equipment breakdown was introduced on the Commercial Property page. The hub now points here for the product explanation while property programs still coordinate breakdown placements.",
      },
      {
        question: "Do restaurants need this?",
        answer:
          "Many food operations care about refrigeration breakdown and spoilage. Whether a breakdown form or endorsement fits depends on equipment and stock — discuss specifically.",
      },
      {
        question: "Is coverage guaranteed?",
        answer:
          "No. Equipment age, type, and maintenance affect market appetite and terms.",
      },
    ],
    ctaHeading: "Need a dedicated equipment breakdown review?",
    ctaSubhead:
      "Share your critical equipment, maintenance practices, and whether spoilage or downtime matters — we will coordinate breakdown options with your property program when available. Coverage is not guaranteed.",
    serviceName: "Equipment Breakdown Insurance",
  },
];

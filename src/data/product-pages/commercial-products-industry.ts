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
      "Cargo and freight insurance through an independent Windsor-Essex broker — motor truck cargo, carrier legal liability, refrigerated freight, and contingent cargo for carriers and brokers.",
    headline: "Cargo & Freight Insurance",
    subhead:
      "Cargo and freight insurance is about goods in transit — the customer's freight, not the truck itself. When you carry property belonging to others, loss or damage can generate claims evaluated under motor truck cargo forms, carrier legal liability wording, or contractual bailment terms — depending on policy structure, cause of loss, and who bears legal responsibility. That is separate from Ontario commercial automobile liability for the vehicle on the road and separate from warehouse legal liability for stored goods. Coverage depends on commodities hauled, valuation methods, limits, exclusions, and territorial scope — not every lost or damaged shipment is insured automatically. Premium Insurance Brokers can help align cargo limits with shipper contracts and how your operation actually moves freight.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Cargo Quote",
    coverageIntro:
      "Cargo insurance addresses freight in transit — motor truck cargo for physical loss or damage, carrier legal liability where policy wording applies, and specialized forms for refrigerated or brokered loads depending on commodities, contracts, and territory.",
    coverageTypes: [
      {
        title: "Motor Truck Cargo",
        shortLabel: "MTC",
        description:
          "May help address certain physical loss or damage to freight you carry for hire while in your care, custody, or control during transit — where purchased and subject to causes of loss, exclusions, commodity restrictions, limits, and valuation.",
        detailTitle: "Customers' goods in the trailer — not the tractor's highway liability",
        detailDescription:
          "Motor truck cargo coverage, where purchased, insures the shipper's freight against covered physical loss or damage during transit subject to policy triggers — fire, collision, theft, and other named perils depending on wording. It does not replace commercial automobile liability for third-party injury or damage caused by the truck on the road. High-value, restricted, or temperature-sensitive commodities may need endorsements or may be excluded. Maximum value per load, average load values, and packaging standards affect underwriting and claims.",
        icon: Package,
      },
      {
        title: "Carrier Liability",
        shortLabel: "Legal Liability",
        description:
          "May help respond to certain claims alleging the carrier failed in its legal duty to deliver freight safely — where policy wording provides carrier legal liability coverage and subject to limits, exclusions, and contractual terms.",
        detailTitle: "Legal responsibility to the shipper is not the same as insuring the goods directly",
        detailDescription:
          "Carrier legal liability coverage addresses the motor carrier's legal liability to the cargo owner for loss or damage while the freight is in the carrier's care — a different insuring agreement from direct motor truck cargo coverage on some policy forms. Which arrangement applies depends on policy edition, endorsements, and contracts of carriage. A bill of lading or shipper contract may limit or define liability separately from insurance — contractual terms and policy wording must be reviewed together.",
        icon: Briefcase,
      },
      {
        title: "Refrigerated Cargo",
        shortLabel: "Reefer",
        description:
          "May address certain loss to temperature-controlled freight from covered causes — including refrigeration breakdown or temperature excursion where endorsements apply — subject to policy triggers, maintenance requirements, and sublimits.",
        detailTitle: "Reefer freight needs cause-of-loss precision — not automatic spoilage coverage",
        detailDescription:
          "Produce, pharmaceuticals, and other refrigerated loads can spoil from equipment failure, driver error, or delay. Standard motor truck cargo may treat temperature loss differently from collision damage — reefer breakdown endorsements, where available, depend on causes of loss, alarm systems, and maintenance records disclosed during underwriting. Do not assume every temperature excursion is covered without reviewing triggers and exclusions.",
        icon: Container,
      },
      {
        title: "Contingent Cargo",
        shortLabel: "Contingent",
        description:
          "For freight brokers and intermediaries — may provide certain coverage when a contracted carrier's cargo policy fails to respond on a load you arranged, subject to policy terms and secondary-position wording.",
        detailTitle: "Brokers need a backup layer — not a substitute for carrier coverage",
        detailDescription:
          "Freight brokers who arrange transportation but do not physically haul goods may purchase contingent cargo to address gaps when a motor carrier's insurance does not respond on a brokered load — subject to policy conditions and limits. This is secondary coverage, not a replacement for proper carrier cargo insurance or broker contractual liability programs. Broker operations should verify carrier certificates and limits before dispatch.",
        icon: Route,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex motor carriers, owner-operators, and freight brokers who move general freight, specialized commodities, or temperature-controlled loads — reviewed through an independent broker who can align cargo limits, valuation, and territorial scope with shipper and broker contracts.",
    considerations: [
      {
        title: "Cargo in transit vs. warehousing — different products",
        description:
          "Cargo insurance addresses goods while being transported. Warehouse legal liability — as on a warehousing policy — addresses customers' goods while stored under a warehouse contract. Brief loading, staging, or cross-dock activity may create overlap questions depending on contracts and policy wording, but the two coverages are not interchangeable. Do not assume cargo coverage handles goods sitting in your terminal beyond transit definitions in the policy.",
      },
      {
        title: "Automobile liability does not insure the freight",
        description:
          "Ontario commercial automobile third-party liability may respond to certain injury or property-damage claims caused by the truck on the road. It does not replace motor truck cargo for loss of the shipper's goods. Each coverage serves a different purpose under separate policy forms.",
      },
      {
        title: "Commodity, valuation, and limits",
        description:
          "Insurers evaluate commodities — such as general freight, electronics, alcohol, pharmaceuticals, and metals — using different underwriting rules, rates, restrictions, sublimits, and exclusions. Valuation provisions, per-load limits, sublimits, and aggregates — where applicable in your policy — depend on policy wording and form. Confirm that your stated limits align with your largest contracts — underinsuring high-value lanes can create balance-bill exposure.",
      },
      {
        title: "Theft, security, and unattended vehicles",
        description:
          "Theft and pilferage may be covered causes of loss subject to security conditions — locked units, approved parking, GPS, or team-driver requirements in policy conditions. Unattended loaded trailers in unsecured locations are common exclusion triggers. Disclose typical parking and security practices during underwriting.",
      },
      {
        title: "Loading, unloading, and temporary storage",
        description:
          "Loss during load, unload, or brief staging at terminals may fall within transit definitions — or may be excluded — depending on policy wording and who performs the handling. Forklift damage at a dock and shift during transit are evaluated under different triggers. Contract terms allocating loading responsibility matter.",
      },
      {
        title: "Territorial limits and cross-border freight",
        description:
          "Cargo policies contain territorial limits. Loads originating, passing through, or terminating in the United States may need specific extensions or separate wording. Shipper contracts often specify U.S.-adequate limits and insurer rating requirements — contractual obligations separate from a Canada-only cargo policy.",
      },
      {
        title: "Contracts, bills of lading, and certificates",
        description:
          "Shippers and brokers frequently require certificates with minimum cargo limits before tendering freight. Your bill of lading or contract of carriage may cap legal liability differently from your insurance limits — legal, contractual, and insurance layers should be reviewed together with your broker.",
      },
    ],
    relatedLinks: [
      { label: "Trucking Insurance", href: "/trucking-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Warehousing Insurance", href: "/warehousing-insurance/" },
    ],
    faqTitle: "Cargo & freight FAQ",
    faqItems: [
      {
        question: "Who insures customers' goods while I transport them?",
        answer:
          "Typically the motor carrier arranges motor truck cargo or carrier legal liability coverage — where purchased — for freight in the carrier's care during transit. The shipper may also carry their own cargo interest policy depending on the contract. Coverage depends on policy wording, cause of loss, limits, and exclusions — not every shipment is automatically insured to full invoice value.",
      },
      {
        question: "Does cargo insurance cover theft of a loaded trailer?",
        answer:
          "Theft may be a covered cause of loss under motor truck cargo subject to policy conditions — security requirements, unattended vehicle exclusions, and reported commodities. High-theft goods may need specific endorsements or higher deductibles. Prompt police reporting and load documentation affect claims handling.",
      },
      {
        question: "How are high-value loads handled?",
        answer:
          "Insurers ask for maximum value per load, typical averages, and commodity type. Loads exceeding policy limits may need scheduled shipments or excess cargo coverage. Shippers often require proof that your limits meet or exceed tendered load values — a contractual requirement your broker should verify against your policy.",
      },
      {
        question: "What about refrigerated or temperature-sensitive freight?",
        answer:
          "Temperature-controlled freight may need reefer breakdown or spoilage endorsements where available — subject to causes of loss, maintenance records, and alarm requirements. A refrigeration unit failure does not automatically trigger coverage without reviewing policy triggers and exclusions.",
      },
      {
        question: "Is cargo insurance the same as warehouse legal liability?",
        answer:
          "No. Cargo insurance addresses goods in transit under a carrier's care. Warehouse legal liability addresses customers' goods stored under a warehouse contract — the product remediated on the warehousing page. Cross-dock or brief staging may raise overlap questions, but the coverages serve different operations and policy forms.",
      },
    ],
    ctaHeading: "Haul freight for hire?",
    ctaSubhead:
      "Share commodities, maximum load values, lanes, and shipper contract requirements — we will compare cargo coverage options.",
    serviceName: "Cargo & Freight Insurance",
  },
  {
    slug: "garage-dealership-insurance",
    category: "commercial",
    metaTitle:
      "Garage & Dealership Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Garage and dealership insurance through an independent Windsor-Essex broker — Ontario OAP 4 garage automobile, customer-vehicle legal liability, dealer inventory, operations liability, and property for repair shops and dealers.",
    headline: "Garage & Dealership Insurance",
    subhead:
      "Garage and dealership insurance in Ontario usually layers the regulated Ontario Garage Automobile Policy (OAP 4) with commercial property and commercial general liability — because repair garages and vehicle dealers face different automobile, inventory, and premises exposures. OAP 4 addresses third-party automobile liability, statutory accident benefits, uninsured automobile, DCPD, optional physical damage on owned units, and legal liability for customer vehicles in your care, custody, or control — subject to sections purchased and policy wording. That is not interchangeable with a standard CGL policy alone or with ordinary commercial auto for a contractor's pickup. Dealers add open-lot inventory values, test drives, and floorplan interests; repair shops emphasize hoists, customer vehicles during service, and completed-operations liability. Licensed garage operations in Ontario typically must evidence a standard garage automobile policy as part of MTO licensing — separate from OMVIC's broader expectation that dealers maintain appropriate insurance without prescribing a specific limit in every case. Premium Insurance Brokers can help Windsor–Essex shops and dealers align OAP 4, property, and liability for how you actually operate.",
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Garage Quote",
    coverageIntro:
      "Coverage for Ontario garage and dealership operations is organized here by garage automobile (OAP 4), customer-vehicle legal liability, dealer inventory and open lot, and operations liability — because dealers and repair shops share OAP 4 concepts but differ on inventory, test drives, and property exposures.",
    coverageTypes: [
      {
        id: "garagekeepers-liability",
        title: "Customer Vehicles (Legal Liability)",
        shortLabel: "Customer Autos",
        description:
          "Legal liability coverage under the applicable Ontario garage automobile form (OAP 4 Section 6) may respond to certain insured damage involving customer vehicles in the business's care, custody, or control during service, storage, or parking — subject to limits, deductibles, and policy wording.",
        detailTitle: "Customer cars are insured elsewhere first — your legal liability still matters",
        detailDescription:
          "When a customer's vehicle is damaged in your bay, their own automobile insurer may pay first; your garage policy responds to your legal liability for the loss when the policy trigger and facts support it — not as a blanket guarantee on every scratch or lot incident. Legal-liability and direct-primary forms treat fault and payment order differently; confirm which structure your program uses. Limits, per-vehicle deductibles, and maximum values per occurrence are scheduled — inadequate limits leave the shop exposed after a total loss or multi-vehicle event.",
        icon: Car,
      },
      {
        id: "dealer-open-lot",
        title: "Dealer Inventory & Open Lot",
        shortLabel: "Open Lot",
        description:
          "Physical damage coverage on dealer-owned inventory — including units on open lot, show floor, or in transit between locations where the policy extends — may respond to covered perils such as hail, fire, theft, or vandalism, subject to causes of loss, stated values, and reporting methods.",
        detailTitle: "Inventory values move daily — static limits go stale",
        detailDescription:
          "New and used dealers carry high aggregate values across rows of units exposed to weather, theft, and vandalism. Open-lot coverage depends on accurate stated amounts or reporting procedures — not every service-only garage needs this section, but dealers cannot rely on a customer's-auto legal-liability limit to protect owned inventory. Floorplan lenders may require specific loss-payee and physical-damage provisions. Seasonal swings and auction purchases should trigger limit reviews.",
        icon: Store,
      },
      {
        id: "garage-liability",
        title: "Garage Operations Liability",
        shortLabel: "Operations",
        description:
          "Commercial general liability or garage liability package coverage may address certain premises injuries, property damage from shop operations, and completed-operations claims such as alleged faulty repairs — distinct from OAP 4 automobile sections and subject to automotive operations exclusions on standard CGL forms.",
        detailTitle: "CGL does not replace OAP 4 — each policy has a different job",
        detailDescription:
          "Slip-and-fall claims in the customer lounge, damage from a hoist failure, or allegations that a completed repair caused a downstream accident may fall under general liability or garage liability programs — not under the automobile policy's third-party liability section for scheduled vehicles. Standard CGL forms often exclude or restrict automotive garage operations; that is why Ontario shops carry OAP 4 alongside liability and property. Test-drive bodily injury may involve OAP 4 automobile liability; botched workmanship may implicate completed operations — your broker maps exposures to the correct form.",
        icon: Briefcase,
      },
      {
        id: "physical-damage-on-inventory",
        title: "Owned-Unit Physical Damage",
        shortLabel: "Inventory PD",
        description:
          "Optional collision, comprehensive, or specified perils on OAP 4 Section 5 — where purchased — may address physical damage to owned dealer vehicles, shop trucks, and tow/service units used in garage operations, subject to deductibles and scheduled values.",
        detailTitle: "Your tow truck and lot shuttle are owned autos — not customer cars",
        detailDescription:
          "Dealer plate programs, service loaners, tow trucks, and parts runners are owned automobiles on the garage policy — separate from customer-vehicle legal-liability coverage. Physical damage is optional under Ontario law but often purchased to protect high-value units and lender interests. Consigned inventory may require confirmation of who holds insurable interest. Accurate VIN schedules and values support renewals after acquisitions or disposals.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex repair garages, mechanics, body shops, tire and quick-lube centres, detailers, and new or used auto dealers that hold customer vehicles or inventory — reviewed through an independent broker who can distinguish OAP 4 garage automobile, property for tools and buildings, and operations liability for each operation type.",
    considerations: [
      {
        title: "Customer vehicles in care, custody, and control",
        description:
          "Every vehicle left for service, storage, valet, or parking creates a legal-liability exposure under OAP 4 Section 6 when that section is purchased. Limits, deductibles, and maximum per-vehicle values must match the types of units you service — exotics, heavy trucks, and fleet accounts may need higher caps than a general repair bay assumes.",
      },
      {
        title: "Dealer inventory and open-lot values",
        description:
          "Dealers carrying owned inventory on open lots need physical damage coverage aligned with rolling stock values and lender requirements. Repair-only shops without owned inventory for sale may not need open-lot limits — do not over-insure or under-insure relative to actual stock levels and reporting methods.",
      },
      {
        title: "Test drives and dealer plates",
        description:
          "Sales test drives and dealer-plate use involve OAP 4 automobile liability and driver eligibility rules — disclose sales processes, who drives, and minimum licence requirements. Incidents during test drives are not generic CGL premises claims alone; automobile sections and limits must respond.",
      },
      {
        title: "Employee drivers and shop vehicles",
        description:
          "Staff moving customer cars on the lot, road-testing repairs, or driving owned service units must be reflected in driver schedules and eligibility conditions. Unlisted drivers or undisclosed convictions can affect coverage on automobile sections.",
      },
      {
        title: "Tools, hoists, and diagnostic equipment",
        description:
          "Building, tools, and equipment belong on commercial property coverage — not on OAP 4. Hoists, scan tools, and spray-booth equipment represent significant values; business interruption may be worth reviewing if a fire or equipment breakdown would halt revenue.",
      },
      {
        title: "Parts inventory and stock",
        description:
          "Tire, parts, and accessory stock stored on premises may need property limits separate from vehicle inventory. Theft, fire, and water damage to parts bins are property claims — coordinate contents limits with peak stocking periods.",
      },
      {
        title: "Environmental and spray-booth exposure",
        description:
          "Paint shops, fluid storage, and waste-oil handling create pollution exposures that OAP 4 and CGL may restrict. See our pollution liability page when solvents, underground storage, or waste handling raise environmental questions beyond base garage forms.",
      },
      {
        title: "Business interruption and equipment breakdown",
        description:
          "Extended shop closure after fire, major water loss, or critical equipment failure can interrupt revenue. Business interruption and equipment breakdown are optional endorsements on property programs — not automatic inclusions on garage automobile policies.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
    faqTitle: "Garage & dealership FAQ",
    faqItems: [
      {
        question: "What insurance does a repair garage need in Ontario?",
        answer:
          "Most repair and service garages need the Ontario Garage Automobile Policy (OAP 4) for automobile liability, statutory benefits, and — where purchased — legal liability for customer vehicles in care, custody, or control. Commercial property for the building, tools, and equipment, plus commercial general liability or a garage liability package for premises and completed-operations exposures, typically sit alongside OAP 4 — one policy does not replace the others. MTO garage licensing expects evidence of a standard garage automobile policy.",
      },
      {
        question: "How are customer vehicles insured while in the shop?",
        answer:
          "OAP 4 Section 6 — often described in broker language as garagekeepers legal liability — may respond to your legal liability for damage to customer vehicles in your care during repairs or storage, subject to limits, deductibles, and policy wording. The customer's own automobile insurer may pay first on some losses; your policy addresses your responsibility when covered. Confirm whether your program uses legal-liability or direct-primary form wording with your broker.",
      },
      {
        question: "How is dealership inventory insured?",
        answer:
          "Dealer-owned units held for sale — on the lot, in showrooms, or in transit where the policy extends — are typically insured under OAP 4 physical damage sections with stated values or reporting methods for open-lot exposure. Values should track inventory levels as units are bought and sold. Floorplan lenders may require specific loss-payee and coverage provisions.",
      },
      {
        question: "Is commercial general liability enough on its own for a garage or dealership?",
        answer:
          "Generally not. Commercial general liability may address certain premises and operations claims, but standard CGL forms often exclude or restrict automotive garage operations and do not provide Ontario-regulated automobile third-party liability, accident benefits, or customer-vehicle legal-liability sections that OAP 4 is designed to cover. Dealers and garages usually need OAP 4 plus property and liability programs working together.",
      },
      {
        question: "What information is needed for a garage or dealership quote?",
        answer:
          "Expect questions about operation type (dealer, repair, body, tire, detail), annual customer-vehicle counts, inventory values, open-lot size, services performed, test-drive practices, owned shop vehicles, building and equipment values, current OAP 4 limits and deductibles, and loss history. Licensing status and lender requirements help your broker structure certificates correctly.",
      },
    ],
    ctaHeading: "Run a garage or dealership?",
    ctaSubhead:
      "Tell us whether you repair, sell, or both — we will compare OAP 4, property, and liability programs for your operation.",
    serviceName: "Garage & Dealership Insurance",
  },
  {
    slug: "builders-risk-insurance",
    category: "commercial",
    metaTitle:
      "Builder's Risk Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Builder's risk and course-of-construction insurance for Windsor-Essex projects — work in progress, materials, renovations, and project property during the build.",
    headline: "Builder's Risk Insurance",
    subhead:
      "Builder's risk — also called course-of-construction insurance — addresses physical loss or damage to a project while it is being built or renovated. It is project-specific property coverage for the structure and work in progress, not the contractor's everyday commercial general liability policy, not a surety bond, and not a developer's full enterprise insurance program. Policies are typically arranged for a defined construction period and completed value. What responds after fire, theft, vandalism, wind, water damage, or collapse depends on the policy form, causes of loss, deductibles, exclusions, and any endorsements purchased. Soft costs, delay-in-completion, flood, earthquake, materials in transit, off-site storage, and existing structures are not automatic — each must be reviewed against wording and underwriting. Premium Insurance Brokers can help align project value, timeline, and contract or lender requirements for Windsor-Essex builds.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Builder's Risk Quote",
    coverageIntro:
      "Builder's risk is project property insurance during construction or renovation — separate from contractor CGL, surety bonds, and permanent property insurance after handover.",
    coverageTypes: [
      {
        title: "Work in Progress",
        shortLabel: "WIP",
        description:
          "May help address certain physical loss or damage to the structure and installed work during construction — where purchased and subject to policy causes of loss, exclusions, and limits.",
        detailTitle: "Hard costs stop when fire or wind hits mid-build",
        detailDescription:
          "Builder's risk insures the project itself — not your contractor's everyday liability policy. Covered causes of loss, deductibles, and whether temporary works are included depend on form and endorsements. Accurate completed value and construction timeline support proper limits.",
        icon: HardHat,
      },
      {
        title: "Materials On Site & In Transit",
        shortLabel: "Materials",
        description:
          "May address building materials awaiting installation on site — and, where policy wording or endorsements apply, materials in transit or at temporary storage — subject to limits, territory, and conditions.",
        detailTitle: "Materials off-site are not automatic",
        detailDescription:
          "Lumber, fixtures, and equipment awaiting installation can represent a large share of project value. Transit and off-site storage are common endorsement items — confirm distance limits, security conditions, and who owns materials (owner vs sub). Do not assume a base course-of-construction form automatically follows materials away from the job site.",
        icon: Package,
      },
      {
        title: "Soft Costs",
        shortLabel: "Soft Costs",
        description:
          "May address certain delay-related expenses after a covered loss — where delay-in-completion or soft-cost endorsements are purchased and subject to policy wording.",
        detailTitle: "Delay expenses need their own line item",
        detailDescription:
          "Interest, taxes, professional fees, and extended site overhead may require specific soft-cost coverage, limits, or endorsements depending on the policy form. Document and value soft costs explicitly — formula-only limits can understate exposure when a covered peril extends the construction period.",
        icon: Building2,
      },
      {
        title: "Existing Structure",
        shortLabel: "Existing",
        description:
          "Renovation projects may need scheduled coverage for the existing building while work proceeds — subject to underwriting and policy wording.",
        detailTitle: "Occupied renovations change the property picture",
        detailDescription:
          "Standard homeowner or commercial property policies may not respond once renovation scale or vacancy triggers exclusions. Existing structure values, demolition scope, occupancy during work, and who retains property insurance should be resolved before demolition starts.",
        icon: Hammer,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex owners, developers, and contractors named in the contract to insure project property — reviewed through an independent broker who can align completed value, timeline, renovations, and lender or contract requirements.",
    considerations: [
      {
        title: "Who should purchase the policy — owner, GC, or developer?",
        description:
          "Construction contracts (including CCDC and custom forms) usually allocate who must place builder's risk and who is named insured. Lenders often require loss-payee status and evidence of coverage before draws. Confirm allocation before groundbreaking — do not assume the contractor's CGL replaces project property insurance.",
      },
      {
        title: "New construction vs renovation of occupied buildings",
        description:
          "New builds and renovations present different property questions. Renovations may need the existing structure scheduled on the builder's risk policy, coordination with any remaining permanent property insurance, and clarity on occupancy while work proceeds. Vacancy or partial occupancy can change how both policies respond.",
      },
      {
        title: "Completed value, construction period, and extensions",
        description:
          "Limits are commonly based on completed project value for the construction period defined by the policy. Completion, occupancy, policy expiry, or other conditions in the wording may affect when coverage ends. Delayed projects may require extensions before expiry, subject to insurer approval and policy terms.",
      },
      {
        title: "Hard costs vs soft costs and delay endorsements",
        description:
          "Basic builder's risk typically focuses on hard costs — structure and installed work. Soft costs and delay-in-completion expenses after a covered loss are usually endorsement-dependent and should be itemized. Do not treat soft costs as automatic inclusions.",
      },
      {
        title: "Materials, transit, and off-site storage",
        description:
          "Materials stored on site, in a yard, or moving to the project may need specific limits, territorial wording, or endorsements. Security conditions, distance from site, and ownership (owner-supplied vs subcontractor materials) affect underwriting and claims. Transit and off-site property are not universally included.",
      },
      {
        title: "Lender and loss-payee requirements",
        description:
          "Construction financing agreements may require builder's risk with mortgage or loss-payee wording, minimum limits, and proof before advances — where the loan documents specify those terms. Share loan and contract insurance schedules with your broker early so certificates match what the financing actually requires.",
      },
      {
        title: "Review workmanship, water, flood & earthquake wording",
        description:
          "Faulty workmanship and defective materials are typically excluded from property recovery for the defective work itself — liability policies address certain claim types separately. Water damage, sewer backup, flood, and earthquake treatment vary by form and optional buy-backs. Do not assume catastrophic perils are included without reviewing wording.",
      },
      {
        title: "Handover to permanent property insurance",
        description:
          "When the project reaches substantial completion, occupancy, or ready-for-takeover, builder's risk usually ends and permanent property (or habitational) insurance must be in force. Partial occupancy can create timing gaps if both sides are not coordinated.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
    ],
    faqTitle: "Builder's risk FAQ",
    faqItems: [
      {
        question: "Is builder's risk legally required for every Ontario construction project?",
        answer:
          "No universal Ontario statute requires builder's risk on every private build. Placement is typically driven by construction contracts, lender conditions, and prudent risk management. Public or institutional owners may impose their own insurance schedules — review the contract rather than assuming a statutory mandate.",
      },
      {
        question: "Who should buy builder's risk — owner or contractor?",
        answer:
          "Contract documents usually specify who must place coverage and who is named insured. Often the owner or developer purchases the policy; some GC-led or wrap-up structures differ. Lenders may dictate evidence and loss-payee wording. Confirm allocation before work starts.",
      },
      {
        question: "Does builder's risk include liability, soft costs, or materials away from the site?",
        answer:
          "Builder's risk is project property coverage — it does not replace commercial general liability or surety bonds. Soft costs, delay-in-completion, transit, and off-site storage may be available only where endorsed or expressly included. Flood, earthquake, equipment breakdown, and contractor tools are likewise not automatic. Review causes of loss and endorsements with your broker.",
      },
      {
        question: "When does builder's risk start and end?",
        answer:
          "Builder's risk applies for the construction period defined by the policy. Completion, occupancy, policy expiry, or other conditions in the wording may affect when coverage ends. Delayed projects may require extensions before expiry, subject to insurer approval and policy terms. Occupancy during construction can also change how the policy responds.",
      },
      {
        question: "What project information is needed for a quote?",
        answer:
          "Expect questions about project address and type, new build versus renovation, completed value, construction period, construction methods, occupancy during work, existing structure values if renovating, security and water exposures, neighbouring properties, contractor experience, loss history, and contract or lender insurance requirements.",
      },
    ],
    ctaHeading: "Starting a construction project?",
    ctaSubhead:
      "Share project value, timeline, renovation scope, and contract or lender requirements — we will compare builder's risk options for your build.",
    serviceName: "Builder's Risk Insurance",
  },
  {
    slug: "warehousing-insurance",
    category: "commercial",
    metaTitle:
      "Warehousing & Logistics Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Warehousing and logistics insurance through an independent Windsor-Essex broker — commercial property, warehouse legal liability, general liability, and business interruption.",
    headline: "Warehousing & Logistics Insurance",
    subhead:
      "Warehouse and storage operations combine three exposures that standard business insurance often treats separately: your building and handling equipment, third-party injury on your premises, and — when you store goods for others — your legal responsibility for customers' property. Commercial property may cover the structure, racking, and forklifts you own; warehouse legal liability may address certain loss or damage to customers' goods when you are legally responsible under your storage contract — subject to policy terms and limits. Not every warehouse stores the same commodities, accepts hazardous materials, or operates cold storage. Premium Insurance Brokers can help map property, bailee, and liability coverage to your contracts, sprinkler protection, and commodity mix.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Warehouse Quote",
    coverageIntro:
      "Warehousing insurance usually separates coverage for your building and equipment from liability for customers' goods stored under your care — plus general liability for premises injury and business interruption when a covered loss interrupts operations.",
    coverageTypes: [
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover the warehouse structure, racking, forklifts, material-handling equipment, and other owned business property against covered causes of loss — subject to policy terms, causes of loss, and limits.",
        detailTitle: "Your building and forklifts are not the same as customers' inventory",
        detailDescription:
          "Commercial property coverage addresses the warehouse you own or are required to insure under lease — structure, improvements, racking, dock equipment, and forklifts — subject to scheduled values and causes of loss. Customers' goods stored for others are a separate exposure typically addressed through warehouse legal liability or bailee coverage, not automatically included as part of your building limit. Confirm what your property policy schedules versus what your storage contracts make you responsible for.",
        icon: Warehouse,
      },
      {
        title: "Warehouse Legal Liability",
        shortLabel: "Customers' Goods",
        description:
          "May help address certain liability for loss or damage to customers' goods in your care, custody, or control — where purchased and subject to policy terms, contractual limits, and exclusions.",
        detailTitle: "Storage contracts define what you owe when customers' goods are damaged",
        detailDescription:
          "When you store goods belonging to others, your storage agreement and applicable law define the standard of care you owe — and warehouse legal liability coverage, where available, may respond to certain claims for loss or damage to those goods. Coverage limits, per-item caps, and excluded commodities vary by policy and contract. Ordinary commercial property does not automatically insure the full value of customers' inventory — review 3PL and bailment agreements alongside your broker before binding coverage.",
        icon: Briefcase,
      },
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from warehouse operations — such as loading-dock incidents or visitor injuries — subject to policy terms, exclusions, and limits.",
        detailTitle: "A loading-dock injury is premises liability, not a bailee claim",
        detailDescription:
          "Third-party injury on your premises — visitors, drivers, or contractors at the loading dock — generates general liability exposure distinct from damage to stored goods. Forklift operations, dock levellers, and truck traffic create injury and property-damage scenarios insurers evaluate during underwriting. Whether a specific operation or contractor activity is covered depends on policy wording and disclosure.",
        icon: Shield,
      },
      {
        title: "Business Interruption",
        shortLabel: "Income",
        description:
          "May help replace lost business income and certain continuing expenses when a covered direct physical loss to insured property interrupts warehouse operations — subject to waiting periods, policy terms, and how income is measured.",
        detailTitle: "A fire that closes the dock interrupts revenue and customer obligations",
        detailDescription:
          "A covered property loss that shuts down receiving, storage, or shipping can interrupt revenue while fixed costs continue — and may affect your ability to meet storage contract obligations. Business interruption coverage, where purchased, responds only after a covered direct physical loss to insured property and subject to waiting periods and policy wording. Customer contract penalties or lost storage fees may be treated differently depending on policy structure — confirm triggers with your broker.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex warehouse operators, third-party logistics providers, and distribution centres — reviewed through an independent broker who can coordinate property, warehouse legal liability, and premises coverage for how you actually store and handle goods.",
    considerations: [
      {
        title: "Your building and equipment vs. customers' goods",
        description:
          "Commercial property may cover the warehouse structure and equipment you own or insure under lease. Customers' goods stored for others require warehouse legal liability or bailee coverage reviewed separately — ordinary property limits do not automatically insure the full value of third-party inventory. Storage contracts define the standard of care you owe.",
      },
      {
        title: "Warehouse legal liability and storage contracts",
        description:
          "3PL, bailment, and warehousing agreements often specify liability limits, excluded commodities, and notification requirements when goods are damaged. Those contractual terms must be matched to warehouse legal liability limits and policy wording — a certificate alone does not expand coverage beyond what the policy provides.",
      },
      {
        title: "Commodity types, hazardous materials, and cold storage",
        description:
          "Not every warehouse accepts the same goods. Hazardous materials, chemicals, refrigerated products, and high-value inventory create different underwriting profiles and may be excluded or sub-limited unless disclosed. Insurers ask about commodity mix, stacking heights, and temperature-controlled areas during underwriting.",
      },
      {
        title: "Forklifts, racking, and loading dock exposure",
        description:
          "Material-handling equipment, rack collapse, and dock incidents create both property and injury exposure. Maintenance records, operator training, and rack load ratings matter to underwriting. Forklift damage to customers' goods may implicate warehouse legal liability rather than general liability — depending on the circumstances and contract.",
      },
      {
        title: "Fire protection and sprinkler systems",
        description:
          "Construction type, sprinkler coverage, alarm systems, and separation between storage areas affect property rating and availability. Fire and water damage from suppression systems are common warehouse loss scenarios — accurate building and improvement values support proper property limits.",
      },
      {
        title: "Business interruption and contract obligations",
        description:
          "A covered property loss that halts operations may trigger business interruption coverage, where purchased — subject to waiting periods and policy terms. Contractual penalties, customer storage fees, and contingent business income may be treated differently depending on wording. A slowdown from supply chain issues alone may not trigger the same coverage.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
    ],
    faqTitle: "Warehousing FAQ",
    faqItems: [
      {
        question: "Who covers my customer's inventory if it is damaged in my warehouse?",
        answer:
          "Warehouse legal liability coverage, where purchased, may address certain loss or damage to customers' goods in your care, custody, or control — subject to policy terms, contractual limits, and exclusions. Your storage agreement defines the standard of care you owe. Commercial property for your building does not automatically replace bailee or warehouse legal liability for third-party goods.",
      },
      {
        question: "Does commercial property cover goods belonging to others?",
        answer:
          "Generally no — or not for the full value customers expect. Commercial property typically covers the warehouse structure, racking, and equipment you own or insure under lease. Customers' goods require warehouse legal liability or bailee coverage reviewed against your storage contracts — confirm limits and excluded commodities with your broker.",
      },
      {
        question: "Are forklifts and racking covered?",
        answer:
          "Owned forklifts, racking, and handling equipment may be scheduled under commercial property coverage depending on how the policy is structured — subject to values, causes of loss, and maintenance requirements. Damage to customers' goods caused by equipment operations may fall under warehouse legal liability rather than property — depending on the claim and contract.",
      },
      {
        question: "Do 3PL contracts require specific liability limits?",
        answer:
          "Storage and logistics contracts often specify per-occurrence and aggregate limits for warehouse legal liability, notification requirements, and excluded commodities. Those are contractual requirements reviewed against what your policy can actually provide — not universal statutory mandates. Bring contracts to your broker before binding coverage.",
      },
      {
        question: "Does cold storage or hazardous goods change my coverage needs?",
        answer:
          "Refrigerated, frozen, chemical, and hazardous commodities create different underwriting profiles and may be excluded or sub-limited unless disclosed. Insurers ask about temperature-controlled areas, commodity types, and fire protection during underwriting. Do not assume a standard warehouse policy automatically accepts every storage class.",
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
      "Property management insurance through an independent Windsor-Essex broker — general liability, property management E&O, office property, and hired/non-owned auto.",
    headline: "Property Management Insurance",
    subhead:
      "Property management firms face liability and professional exposure for the services they perform — coordinating maintenance, handling tenant relations, and managing portfolios on behalf of owners — not insurance on the buildings themselves. A property manager's general liability may address certain premises and operations claims; property management errors and omissions may address certain claims alleging negligent management decisions — each subject to policy terms. The landlord's property policy, a condominium corporation's master policy, or a commercial owner's building insurance protects the property owner's interest in the structure — separate from the management company's own coverage. Premium Insurance Brokers can help align GL, E&O, and operational coverage to your portfolio, contract requirements, and whether you manage residential rentals, commercial properties, or condominium corporations.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Property Management Quote",
    coverageIntro:
      "Property management insurance addresses the management company's liability and professional exposure — distinct from building insurance carried by property owners or condominium corporations for the structures you manage.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from your management operations — such as incidents at a managed property or in your office — subject to policy terms, exclusions, and limits.",
        detailTitle: "A visitor injury at a managed building can implicate the manager",
        detailDescription:
          "Property managers coordinate access, maintenance, and site activity across buildings they do not necessarily own — creating premises and operations exposure distinct from the owner's property policy. Whether a specific incident at a managed location falls within the manager's general liability depends on policy wording, the management agreement, and who controlled the area where the injury occurred. General liability for the management firm is separate from the landlord's or corporation's own liability program.",
        icon: Briefcase,
      },
      {
        title: "Property Management E&O",
        shortLabel: "E&O",
        description:
          "May help respond to certain claims alleging negligent management acts, errors, or omissions — such as failure to arrange repairs, improper tenant screening, or lease administration mistakes — subject to policy terms, exclusions, and limits.",
        detailTitle: "A tenant dispute about maintenance can become a professional claim",
        detailDescription:
          "Allegations that a property manager failed to address repairs, mishandled tenant screening, or made errors in lease administration generate professional liability exposure — separate from a simple slip-and-fall. E&O coverage, where purchased, addresses management-decision claims that general liability may not. Contractual duties in management agreements should be reviewed against policy wording — performing management services does not automatically make every dispute a covered E&O claim.",
        icon: KeyRound,
      },
      {
        title: "Commercial Property",
        shortLabel: "Office",
        description:
          "May help cover your management office contents, computers, records, and equipment against covered causes of loss — subject to policy terms and limits — distinct from insurance on buildings you manage for others.",
        detailTitle: "Your office equipment is not the same as the buildings you manage",
        detailDescription:
          "Property management insurance for the firm typically covers the management company's own office contents and equipment — not the building structures owned by landlords or condominium corporations. Tenant improvements in a leased management office may need scheduling under your property policy. Do not confuse the manager's office property coverage with the owner's building insurance on managed portfolios.",
        icon: Building2,
      },
      {
        title: "Hired & Non-Owned Auto",
        shortLabel: "Auto",
        description:
          "May help address certain automobile liability when managers or staff use personal or rented vehicles for property visits, showings, or site inspections — where purchased and subject to policy terms.",
        detailTitle: "Driving to a managed property in a personal vehicle is a business exposure",
        detailDescription:
          "Property managers and site staff frequently use personal vehicles for inspections, showings, and maintenance coordination — creating hired and non-owned auto exposure that a personal auto policy may not fully address for business use. Disclose how often staff drive for work and whether company vehicles are used. Ontario automobile coverage for business use is regulated separately from general liability for managed-premises incidents.",
        icon: Car,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex property management firms managing residential rentals, commercial portfolios, and condominium corporations on behalf of owners — reviewed through an independent broker who can coordinate GL, E&O, and operational coverage for how you actually manage properties.",
    considerations: [
      {
        title: "Manager coverage vs. landlord or owner building insurance",
        description:
          "Property management insurance protects the management company's liability and professional exposure — not the building structure owned by the landlord or condominium corporation. The owner's commercial property or condominium master policy insures the building; the manager's policy insures the management firm's operations. Certificates and contracts should reflect which party carries which coverage.",
      },
      {
        title: "Professional E&O for management decisions",
        description:
          "Maintenance coordination, tenant relations, lease administration, and vendor selection create professional exposure distinct from premises injury. E&O coverage, where purchased, may address certain management-negligence claims — subject to policy wording and exclusions for intentional acts or criminal conduct. Review management agreement duties against policy scope.",
      },
      {
        title: "Condominium management and CMRAO licensing",
        description:
          "Condominium management in Ontario is regulated under the Condominium Management Services Act, administered by the Condominium Management Regulatory Authority of Ontario (CMRAO). Persons and providers that perform regulated condominium management services must hold the applicable licence under the Act and its regulations — but managing residential rentals or commercial property portfolios is a different regulatory context from licensed condominium management. Licensed condominium management providers must maintain errors and omissions insurance covering every condominium manager they employ, and fidelity insurance against client losses from dishonesty by managers, employees, directors, or officers — statutory requirements under O. Reg. 4/18 that apply to licensed providers, not to every general property management firm.",
      },
      {
        title: "Contractor selection and maintenance coordination",
        description:
          "Arranging repairs, hiring contractors, and coordinating capital projects create exposure when work is delayed, defective, or improperly scoped. Whether a claim against the manager falls within E&O or general liability depends on the allegation and policy wording. Indemnity and hold-harmless clauses in management agreements should be reviewed with your broker.",
      },
      {
        title: "Tenant data, rent handling, and cyber exposure",
        description:
          "Managing tenant applications, leases, and rent payments involves records that may create privacy and crime exposure. Cyber and crime coverage, where relevant, is separate from general liability for physical injury. Disclose how tenant data is stored and who handles trust funds or rent collection.",
      },
      {
        title: "Certificate requirements in management agreements",
        description:
          "Property owners and condominium boards often require proof of general liability and E&O insurance with specific limits and additional-insured wording in management contracts. Those are contractual requirements reviewed against what your policies can provide — not universal provincial insurance mandates for all managers.",
      },
    ],
    relatedLinks: [
      { label: "Real Estate Insurance", href: "/real-estate-insurance/" },
      { label: "Condominium Corporation", href: "/condominium-corporation-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
    ],
    faqTitle: "Property management FAQ",
    faqItems: [
      {
        question: "Does the building owner's insurance cover the property manager?",
        answer:
          "The owner's property and liability policies typically protect the owner's interests in the building — not the management company's professional liability for management decisions. Property managers need their own general liability and E&O coverage for the firm's operations. Which policy responds to a specific incident depends on the allegation, the management agreement, and policy wording.",
      },
      {
        question: "What is the difference between GL and property management E&O?",
        answer:
          "General liability may address certain third-party bodily injury or property-damage claims arising from operations. Property management E&O may address certain claims alleging negligent management acts, errors, or omissions — such as failure to arrange repairs or lease administration mistakes. They address different types of allegations and should be reviewed together rather than treated as interchangeable.",
      },
      {
        question: "Do I need separate coverage for each building in my portfolio?",
        answer:
          "Management E&O and general liability for the firm are typically written to cover the management company across its portfolio — subject to policy terms and disclosed properties. Each building owner or condominium corporation still carries its own property insurance on the structure. Confirm how your policy schedules managed locations and contract limits.",
      },
      {
        question: "Does property management insurance cover the buildings I manage?",
        answer:
          "No — property management insurance addresses the management company's liability and professional exposure, not the building structure owned by the landlord or condominium corporation. The owner's commercial property policy or the corporation's master policy insures the building. The manager's office contents may be covered under the firm's own commercial property coverage — a separate component.",
      },
      {
        question: "What do management contracts typically require?",
        answer:
          "Management agreements often specify minimum general liability and E&O limits, additional-insured status for the owner or corporation, and certificate deadlines — contractual requirements reviewed against what your policies can provide. Licensed condominium management providers also face statutory errors and omissions and fidelity insurance requirements under Ontario regulation — separate from what every residential or commercial portfolio manager must carry. Bring agreements to your broker before signing new mandates.",
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
      "Condominium corporation insurance for Ontario boards — master property under the Condominium Act, common-element liability, optional equipment breakdown, and directors and officers insurance if reasonably available.",
    headline: "Condominium Corporation Insurance",
    subhead:
      "This page is for Ontario condominium corporations — the corporation's master insurance program — not for individual unit owners (see Condo Insurance for unit-owner coverage). Under the Condominium Act, 1998, corporations must obtain and maintain property insurance for damage to units and common elements caused by major perils and other perils specified in the declaration or by-laws, to replacement cost subject to a reasonable deductible — excluding improvements to units above the standard unit definition. Corporations must also maintain liability insurance for common-element occupier exposure and certain machinery and motor vehicle liabilities under s.102, and must purchase and maintain directors' and officers' insurance for board members if reasonably available under s.39. Master policy deductibles are treated as common expenses, and chargeback rules may apply to owners under s.105 — subject to corporation by-laws. Equipment breakdown is not statutory; it may be added where appropriate. Premium Insurance Brokers can help Windsor–Essex boards and property managers review corporation programs alongside unit-owner coordination.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Condo Corporation Quote",
    coverageIntro:
      "Condominium corporation insurance is organized here by the four program pillars boards most often review — master property, common-element liability, optional equipment breakdown, and directors and officers insurance — because corporation and unit-owner responsibilities are legally distinct under Ontario's Condominium Act.",
    coverageTypes: [
      {
        id: "master-property-policy",
        title: "Master Property Policy",
        shortLabel: "Master",
        description:
          "The corporation must obtain and maintain insurance for damage to units and common elements caused by major perils — including fire, lightning, smoke, windstorm, hail, explosion, water escape, and other perils listed in the Act — plus additional perils specified in the declaration or by-laws, to replacement cost subject to a reasonable deductible, excluding improvements to units above the standard unit.",
        detailTitle: "A pipe burst can reach units and corridors at once",
        detailDescription:
          "The master policy insures units to the standard unit definition and common elements against major perils under s.99 of the Condominium Act — not overland flood, which is not listed as a major peril in the Act and is typically a separate commercial property endorsement where available. Owner-installed improvements and betterments above the standard unit are excluded from the corporation's property insurance obligation under s.99(4). What counts as a standard unit is set by a corporation by-law under s.56(1)(h) or the declarant's schedule under s.43(5)(h) if no by-law exists — review your corporation's documents rather than assuming a universal definition.",
        icon: Building2,
      },
      {
        id: "general-liability",
        title: "Common Element Liability",
        shortLabel: "GL",
        description:
          "The corporation must maintain insurance against liability incurred by the corporation as occupier of common elements and for certain liabilities arising from boilers, machinery, pressure vessels, and motor vehicles as required under s.102 — subject to policy terms and limits.",
        detailTitle: "A slip-and-fall in the parking garage is a corporation exposure",
        detailDescription:
          "Under the Condominium Act, the corporation — not individual unit owners — is generally the occupier of common elements for liability purposes. Injury claims in lobbies, parking garages, pools, walkways, and recreational facilities may implicate the corporation's general liability program. Unit owners carry personal liability for activities within their units. Corporation liability insurance under s.102 is separate from a unit owner's personal condo policy.",
        icon: Briefcase,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased as an endorsement or separate coverage, may help address sudden failure of boilers, HVAC, elevators, pumps, and electrical or mechanical systems serving the corporation — not required by the Condominium Act; availability depends on insurer and master policy form.",
        detailTitle: "An elevator outage affects every floor",
        detailDescription:
          "Shared mechanical systems — boilers, chillers, elevators, and pressure equipment — are operationally critical for a condominium corporation. Equipment breakdown coverage, where added, may address certain sudden mechanical or electrical failure losses that base property forms treat differently from fire or water escape. This is optional, policy-dependent coverage — not a statutory requirement under s.99. Confirm with your broker whether your master program includes breakdown protection or needs a separate endorsement.",
        icon: Wrench,
      },
      {
        id: "directors-officers",
        title: "Directors & Officers",
        shortLabel: "D&O",
        description:
          "The corporation must purchase and maintain insurance for the benefit of directors and officers if reasonably available under s.39 — covering certain governance-related liabilities except losses from breach of the duty to act honestly and in good faith, subject to policy terms.",
        detailTitle: "A board decision can still draw a personal claim",
        detailDescription:
          "Condominium board members make decisions about budgets, repairs, rules enforcement, and contractor selection — any of which can generate allegations of mismanagement or wrongful acts. Section 39 of the Condominium Act requires corporations to maintain directors' and officers' insurance if reasonably available. This is condominium s.39 insurance — not identical to generic corporate D&O programs on other routes. Indemnification by-laws under s.38 may also apply, but insurance and indemnification are separate mechanisms with different exclusions.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Ontario condominium corporations, boards, and property managers arranging master policies in Windsor–Essex — reviewed through an independent broker who can coordinate statutory property and liability requirements, optional equipment breakdown, and s.39 directors and officers insurance alongside unit-owner policy coordination.",
    considerations: [
      {
        title: "Standard unit definition",
        description:
          "The master policy insures units to the standard unit — not owner-installed improvements or betterments above that standard under s.99(4). Boards may pass a standard-unit by-law under s.56(1)(h), or the declarant's schedule under s.43(5)(h) applies if no by-law exists. Unit owners typically insure improvements, betterments, and personal property through their own policies — coordination prevents gaps after a loss.",
      },
      {
        title: "Replacement cost and property values",
        description:
          "Statutory property insurance must cover replacement cost of damaged property subject to a reasonable deductible under s.99(7). Accurate building and common-element valuations support adequate master policy limits — underinsurance can leave the corporation and owners exposed to assessments beyond policy proceeds. The Act does not prescribe a fixed appraisal interval; review values when construction costs shift materially or after major capital projects.",
      },
      {
        title: "Major perils, water escape, and overland flood",
        description:
          "Major perils under s.99(2) include water escape — not the same as overland flood, which is not listed as a major peril in the Act and may require a separate endorsement on the master property policy where available. Do not treat statutory water-escape coverage and optional flood extensions as interchangeable concepts.",
      },
      {
        title: "Master policy deductible and common expenses",
        description:
          "The portion of a loss excluded by the master policy deductible is treated as a common expense under s.105(1) — funded by owners through the corporation's budget. Deductible amounts are not fixed in the Act; they must be reasonable. Boards should understand how the chosen deductible affects annual budgeting and potential owner chargebacks.",
      },
      {
        title: "Deductible chargebacks to unit owners",
        description:
          "Under s.105(2), an owner may be charged back up to the lesser of repair cost or the deductible when damage to their unit arises from an act or omission of the owner, lessee, or occupant with permission or knowledge. Corporations may extend chargeback circumstances by by-law under s.105(3). Amounts charged back may be insurable under a unit owner's policy — confirm limits with owners' brokers. Outcomes depend on corporation by-laws and the facts of each loss.",
      },
      {
        title: "Unit-owner policy coordination",
        description:
          "Unit owners insure personal property, personal liability, improvements above the standard unit, and — where purchased — loss assessment and deductible assessment coverage. The Act coordinates master and unit policies under s.101 so they are not treated as duplicate coverage for the same interest. Direct unit owners to the unit-owner condo route for personal coverage — this page addresses the corporation's program only.",
      },
      {
        title: "Directors and officers — s.39 requirement",
        description:
          "Corporations must purchase and maintain insurance for directors and officers if reasonably available under s.39, excluding coverage for losses from breach of the duty to act honestly and in good faith. This is a statutory insurance obligation — distinct from prudent practice alone. Policy wording, limits, and exclusions still vary by insurer; review certificates and compare markets at renewal.",
      },
      {
        title: "Contractors, renovations, and common-element projects",
        description:
          "Capital repairs, envelope projects, and unit-owner renovations affecting common elements create insurance and by-law questions — who insures work in progress, how deductibles apply, and whether contractors carry adequate liability and property coverage. Board approval processes and insurance certificates for major projects reduce dispute risk after a loss.",
      },
    ],
    relatedLinks: [
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Condo Insurance (Unit Owners)", href: "/condo-insurance/" },
    ],
    faqTitle: "Condominium corporation FAQ",
    faqItems: [
      {
        question: "What does the corporation's master policy insure?",
        answer:
          "Under s.99 of the Condominium Act, 1998, the corporation must obtain and maintain property insurance for damage to units and common elements caused by major perils — fire, lightning, smoke, windstorm, hail, explosion, water escape, and other perils listed in the Act — plus additional perils specified in the declaration or by-laws, to replacement cost subject to a reasonable deductible. The corporation's obligation does not include insurance for improvements to units above the standard unit definition under s.99(4). Overland flood is not a listed major peril in the Act.",
      },
      {
        question: "What does the unit owner insure separately?",
        answer:
          "Unit owners typically purchase personal condo insurance for contents, personal liability, improvements and betterments above the standard unit, and — where available on the unit-owner policy — loss assessment and deductible assessment coverage. The corporation's master policy and a unit owner's policy coordinate under the Act — they address different interests. Declarations, standard-unit by-laws, and policy wording can affect how a specific loss is allocated.",
      },
      {
        question: "What is a standard unit?",
        answer:
          "The standard unit defines which components of a unit the corporation's master property policy insures versus what the unit owner must insure — such as owner-installed flooring, cabinetry, or fixtures above that baseline. Under the Condominium Act, the standard unit is established by a corporation by-law under s.56(1)(h) or by the declarant's schedule under s.43(5)(h) if no by-law exists. There is no single province-wide standard-unit dollar schedule — review your corporation's by-law or declarant schedule.",
      },
      {
        question: "How do deductibles affect unit owners?",
        answer:
          "The master policy deductible is treated as a common expense under s.105(1). Under s.105(2), an owner may be charged back up to the lesser of repair cost or the deductible when damage to their unit results from an act or omission of the owner, lessee, or occupant with permission or knowledge. Corporations may pass an insurance deductible by-law under s.105(3) extending chargeback rules. Deductible amounts are not fixed in the Act. Unit owners may insure chargeback amounts under their own policies — confirm limits with their broker.",
      },
      {
        question: "Does a condo corporation need D&O insurance?",
        answer:
          "Under s.39 of the Condominium Act, a corporation must purchase and maintain insurance for the benefit of directors and officers if reasonably available — excluding losses from breach of the duty to act honestly and in good faith. This is a statutory requirement when insurance is reasonably available, not merely optional best practice. Policy limits, exclusions, and defence-cost treatment still vary — boards should review coverage at renewal and after governance changes.",
      },
    ],
    ctaHeading: "Insuring a condominium corporation?",
    ctaSubhead:
      "Share building type, amenities, standard-unit by-law status, and current master policy details — we will review corporation coverage against Condominium Act requirements.",
    serviceName: "Condominium Corporation Insurance",
  },
  {
    slug: "pollution-liability-insurance",
    category: "commercial",
    metaTitle:
      "Pollution Liability Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Pollution liability insurance through an independent Windsor-Essex broker — contractors pollution, site and premises environmental impairment, transportation releases, and cleanup/defence costs subject to policy triggers and wording.",
    headline: "Pollution Liability Insurance",
    subhead:
      "Pollution liability insurance addresses environmental contamination exposures that commercial general liability and property policies may exclude or restrict — sudden spills, gradual leaks, cleanup costs, third-party injury or property damage, and defence expenses — where purchased and subject to claims-made or occurrence triggers, retroactive dates, known-condition exclusions, and policy limits. Contractors pollution liability (CPL), site or premises environmental impairment, transportation pollution extensions, and emergency response coverage are separate insuring agreements on many programs — not one universal pollution product. Ontario law can require spill reporting, mitigation, and remediation regardless of insurance; regulatory fines and penalties are generally not insurable. Premium Insurance Brokers can help Windsor–Essex contractors, manufacturers, property owners, fuel and storage operations, waste handlers, and other businesses compare pollution forms against site history and operations.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Pollution Quote",
    coverageIntro:
      "Pollution coverage is organized here by contracting operations, owned or operated sites, transportation-related releases, and cleanup/defence cost insuring agreements — because triggers, retroactive dates, and exclusions differ between CPL, site environmental impairment, and transportation extensions on each policy.",
    coverageTypes: [
      {
        id: "contractors-pollution-liability",
        title: "Contractors Pollution Liability",
        shortLabel: "CPL",
        description:
          "Contractors pollution liability — typically on a claims-made basis — may address certain pollution conditions arising from contracting operations such as excavation, utility work, remediation, or disturbance of contaminated materials, subject to policy definitions, exclusions, retroactive dates, and limits.",
        detailTitle: "Bid specs often require CPL — even when CGL is already in place",
        detailDescription:
          "General contractors, excavators, pipeline installers, and remediation subcontractors increasingly face contract requirements for contractors pollution liability separate from commercial general liability. CPL may respond to third-party cleanup costs, bodily injury, and property damage from pollution conditions caused by your work — but asbestos, mould, silica, and known subsurface conditions may be excluded or sublimited. Claims-made triggers mean the claim must be made during the policy period; retroactive dates limit how far back coverage reaches. Match CPL to project types and owner specifications.",
        icon: HardHat,
      },
      {
        id: "site-pollution",
        title: "Site / Premises Pollution",
        shortLabel: "Site Pollution",
        description:
          "Site or premises environmental impairment coverage — where purchased — may address gradual or sudden pollution conditions at owned or operated locations, including storage tanks, waste handling areas, and industrial processes, subject to known-condition exclusions, discovery reporting requirements, and policy limits.",
        detailTitle: "Underground tanks and slow leaks outlive standard GL policy periods",
        detailDescription:
          "Gas stations, warehouses with bulk storage, manufacturing plants, and commercial property owners can face gradual soil or groundwater contamination that standard CGL absolute pollution exclusions restrict. Site pollution or environmental impairment forms — often claims-made — may fund investigation and remediation and third-party claims when triggers and retroactive dates align. Pre-existing contamination discovered before inception is typically excluded; Phase I/II history affects underwriting. Ownership changes and legacy operations require disclosure — insurance cannot retroactively erase known conditions.",
        icon: Factory,
      },
      {
        id: "transportation-pollution",
        title: "Transportation Pollution (Where Included)",
        shortLabel: "Trans. Pollution",
        description:
          "Transportation pollution coverage — where included on a pollution program — may address certain releases during transit of waste, fuel, chemicals, or other pollutants in owned or non-owned vehicles, subject to vehicle schedules, territorial limits, and policy wording distinct from commercial automobile liability.",
        detailTitle: "A highway spill is not automatically covered by auto liability alone",
        detailDescription:
          "Commercial automobile policies address third-party injury and property damage from automobile accidents — not necessarily cleanup of pollutants released from cargo or tanks in transit. Transportation pollution extensions, where purchased, may respond to certain environmental cleanup and third-party claims from covered releases during hauling. Waste haulers, fuel delivery, and chemical transporters should confirm whether pollution transit coverage sits on a pollution policy, an automobile endorsement, or a motor carrier package — forms differ and territorial limits apply.",
        icon: Truck,
      },
      {
        id: "cleanup-defence-costs",
        title: "Cleanup & Defence Costs",
        shortLabel: "Cleanup",
        description:
          "Pollution policies may allocate limits to emergency response, investigation, remediation, and legal defence for covered pollution claims — subject to insuring agreements, sublimits, deductibles, and exclusions for fines, penalties, and known conditions.",
        detailTitle: "Cleanup costs erode limits — defence may be inside the same bucket",
        detailDescription:
          "When a covered pollution event occurs, costs can include emergency response, environmental consultants, soil and groundwater remediation, and third-party bodily injury or property-damage claims. Defence costs often reduce the same policy limit rather than sitting outside it. Ontario's Environmental Protection Act imposes duties to report spills and mitigate harm — those statutory obligations apply whether or not insurance responds. Regulatory fines and penalties are generally excluded or uninsurable; do not assume a cleanup order automatically creates insured coverage without reading the trigger and exclusions.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex contractors, manufacturers, commercial property owners, fuel and storage operations, automotive and waste businesses, transporters, developers, and environmental consultants with meaningful contamination exposure — reviewed through an independent broker who can compare pollution triggers against CGL exclusions and site history.",
    considerations: [
      {
        title: "Site history and environmental assessments",
        description:
          "Known or suspected contamination from prior owners, underground tanks, or industrial use affects eligibility and pricing. Phase I and Phase II environmental site assessments support underwriting; undisclosed history can void coverage or trigger rescission. New purchasers should review historical use before assuming a pollution policy will respond to legacy conditions.",
      },
      {
        title: "Operations and materials handled",
        description:
          "Chemicals, solvents, refrigerants, fuels, paints, and process waste each carry different exclusion and sublimit patterns. Manufacturing, printing, metal finishing, and food processing may need pollution review even when day-to-day operations seem routine — CGL pollution exclusions still apply.",
      },
      {
        title: "Storage tanks — UST and AST",
        description:
          "Underground and above-ground storage tanks require registration, maintenance, and often specific tank schedules on pollution or property programs. Tank age, lining, and leak-detection history drive underwriting. Tank-only policies differ from full site environmental impairment forms.",
      },
      {
        title: "Contractual requirements for contractors",
        description:
          "Project owners, municipalities, and prime contractors may mandate contractors pollution liability with minimum limits and additional-insured status. Match certificates to actual policy triggers — a CGL certificate does not substitute for CPL when the contract specifies pollution.",
      },
      {
        title: "Transportation and waste disposal paths",
        description:
          "Hauling waste, recyclables, or chemicals off-site may need transportation pollution coverage or non-owned disposal site extensions where available. Confirm territorial limits for cross-border hauls and whether automobile liability alone addresses environmental cleanup from cargo release.",
      },
      {
        title: "Known pollution conditions and disclosure",
        description:
          "Pollution discovered before policy inception — or known to the insured and not disclosed — is typically excluded. Insurance is not a mechanism to transfer already-identified remediation obligations after the fact. Retroactive dates on claims-made policies define how far back coverage reaches for unknown pre-policy events.",
      },
      {
        title: "Claims-made triggers and retroactive dates",
        description:
          "Many pollution policies are claims-made: the claim must be reported during the policy period (or extended reporting period if purchased). Occurrence-based pollution forms exist but are less common in some markets. Lapses in continuity can eliminate coverage for past work — maintain uninterrupted terms or buy tail coverage when retiring or selling.",
      },
      {
        title: "Regulatory cleanup vs insurable remediation",
        description:
          "Ontario law may require spill reporting, mitigation, and remediation under the Environmental Protection Act — independent of insurance. Policies may fund certain insured remediation and third-party claims subject to wording; regulatory fines and penalties are generally not covered. Coordinate legal counsel, environmental consultants, and your broker after an incident.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
    ],
    faqTitle: "Pollution liability FAQ",
    faqItems: [
      {
        question: "Doesn't commercial general liability already cover pollution?",
        answer:
          "Commercial general liability may address certain third-party injury or property-damage claims, but most CGL forms contain pollution exclusions — from legacy sudden-and-accidental wording to modern absolute or total pollution exclusions that restrict gradual contamination and many cleanup costs. Whether a specific loss falls inside or outside CGL depends on policy wording and how the claim is framed — not on a simple rule that GL never covers pollution or always covers sudden spills. Pollution liability or environmental impairment coverage may be arranged where operations and exclusions create a gap.",
      },
      {
        question: "Can pollution insurance address gradual contamination?",
        answer:
          "Site pollution and environmental impairment forms — where purchased on a claims-made or occurrence basis depending on market — are designed for gradual leaks and long-term contamination that CGL exclusions often restrict. Triggers, retroactive dates, and known-condition exclusions still apply; gradual does not mean automatic or unlimited. Contractors pollution liability may address pollution conditions caused during your operations, subject to the same policy constraints.",
      },
      {
        question: "What cleanup costs may be covered?",
        answer:
          "Insured cleanup and remediation costs — investigation, emergency response, soil and groundwater remediation, and related third-party claims — may be covered when the pollution policy trigger is satisfied and exclusions do not apply, subject to limits and deductibles. Defence costs often share the same limit. Statutory duties under Ontario environmental law continue regardless of insurance; fines and penalties are generally not insurable.",
      },
      {
        question: "Can existing contamination be insured after it is discovered?",
        answer:
          "Known pollution conditions identified before policy inception are typically excluded — insurers do not accept transfer of existing remediation obligations through a new policy after discovery. Undisclosed pre-existing conditions can jeopardize coverage. Some programs may offer limited coverage for unknown historical conditions with appropriate retroactive dates and environmental assessments, but already-identified contamination requires remediation planning outside standard new-policy placement.",
      },
      {
        question: "Who should consider pollution liability insurance?",
        answer:
          "Businesses with meaningful environmental exposure — contractors doing excavation or remediation, manufacturers using chemicals, property owners with storage tanks, fuel operations, waste handlers, transporters of pollutants, and developers on former industrial sites — may need pollution coverage when contracts or CGL exclusions create gap risk. Not every business requires a pollution policy; a broker review of operations, site history, and existing liability wording clarifies whether specialized coverage is warranted.",
      },
    ],
    ctaHeading: "Face environmental exposure?",
    ctaSubhead:
      "Share operations, materials, site history, and contract requirements — we will compare pollution programs against your CGL and property policies.",
    serviceName: "Pollution Liability Insurance",
  },
  {
    slug: "product-recall-insurance",
    category: "commercial",
    metaTitle:
      "Product Recall Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Product recall insurance for Windsor-Essex manufacturers and distributors — recall and withdrawal expense coverage distinct from product liability, subject to policy triggers.",
    headline: "Product Recall Insurance",
    subhead:
      "Product recall insurance addresses specified first-party recall or withdrawal costs — and other scheduled expenses — only where the policy trigger and selected coverage apply. It is not the same product as product liability insurance. Product liability generally addresses certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Product recall insurance may address specified withdrawal or recall expenses when the policy’s covered trigger and selected coverage apply — such as notification, transportation, storage, disposal, and — only where included — replacement, consultant or lab fees, crisis management, brand rehabilitation, or limited business interruption. Whether a voluntary or government-directed recall is insured depends on the policy’s covered trigger, definitions, exclusions, and selected coverage — a voluntary withdrawal, regulator-involved recall, or customer demand does not automatically trigger coverage. In Canada, most food recalls are company-led actions with Canadian Food Inspection Agency oversight, and the Minister of Health may order a mandatory food recall in defined circumstances; consumer products may involve Health Canada authorities under the Canada Consumer Product Safety Act — regulatory involvement alone does not mean the insurance will respond. Premium Insurance Brokers can help Windsor–Essex manufacturers, importers, and distributors compare recall expense forms against product type, traceability, and supply-chain role.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Recall Quote",
    coverageIntro:
      "Product recall programs schedule first-party expense categories after a covered recall or withdrawal event. Product liability for injury or damage claims remains a separate discussion. Replacement, consultants, brand rehabilitation, and lost profits are not automatic inclusions on every form.",
    coverageTypes: [
      {
        title: "Recall Expenses",
        shortLabel: "Recall Expense",
        description:
          "May help with certain first-party expenses to notify, retrieve, store, and dispose of affected products after a covered recall or withdrawal event — subject to the policy trigger and exclusions.",
        detailTitle: "Pulling product is an operations problem before it is a liability lawsuit",
        detailDescription:
          "Product liability generally addresses certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Product recall insurance may address specified withdrawal or recall expenses when the policy’s covered trigger and selected coverage apply — whether a voluntary or government-directed recall is insured depends on the policy’s covered trigger, definitions, exclusions, and selected coverage. Confirm how the form defines the insured event, contaminated product, or malicious act.",
        icon: Package,
      },
      {
        title: "Replacement Costs",
        shortLabel: "Replacement",
        description:
          "May help with certain costs to replace recalled product with conforming product — only where the form or endorsement includes replacement expense.",
        detailTitle: "Replacement is a separate expense category — not automatic",
        detailDescription:
          "Many programs schedule or sublimit replacement separately from basic recall expense. Confirm whether customer refunds, rework, or new production are included. Do not assume replacement follows every covered recall automatically.",
        icon: Factory,
      },
      {
        title: "Consultant & Lab Fees",
        shortLabel: "Consultants",
        description:
          "May help with certain consultant, crisis-management, or laboratory testing costs tied to a covered recall event — where included.",
        detailTitle: "Finding the source and scope drives both cost and credibility",
        detailDescription:
          "Lab work and recall consultants can be required quickly for allergen, pathogen, or foreign-material events. These fees are not universally built into every recall form. Ask which professional fees are scheduled and whether pre-approved panel consultants are required.",
        icon: Briefcase,
      },
      {
        title: "Brand Rehabilitation",
        shortLabel: "Brand Rehab",
        description:
          "May help with limited crisis-communication or brand-restoration expenses after a covered event — only where purchased and subject to sublimits.",
        detailTitle: "Reputation spend is optional coverage, not a free add-on",
        detailDescription:
          "Brand rehabilitation is frequently limited or endorsed. Lost profits or business interruption, if available, usually need separate triggers and are not assumed to follow recall expense automatically. Confirm sublimits before treating PR spend as insured.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex food manufacturers, consumer-goods producers, importers, and distributors whose products could face a voluntary or regulator-involved recall — reviewed through an independent broker who can separate recall expense coverage from product liability and map scheduled expense categories to your supply chain.",
    considerations: [
      {
        title: "Product type and regulatory regime",
        description:
          "Food products, consumer goods, and other categories sit under different Canadian regimes. CFIA oversees many food-recall processes; Health Canada and the Canada Consumer Product Safety Act address many non-food consumer products, with category exclusions. Match underwriting disclosure to the products you actually make or distribute.",
      },
      {
        title: "Traceability, lot coding, and batch records",
        description:
          "Lot codes, batch records, and customer shipment data determine how wide a recall must run and how quickly you can isolate affected product. Weak traceability increases operational cost and complicates claims. Carriers often ask how you track ingredients, finished goods, and distribution.",
      },
      {
        title: "Written recall plan and roles",
        description:
          "A documented recall plan — who decides, who notifies customers and regulators, who handles logistics — supports both regulatory readiness and underwriting. Insurance does not replace an operational plan.",
      },
      {
        title: "Manufacturer, importer, or distributor duties",
        description:
          "Supply contracts may impose recall cost-sharing, notification, or indemnification duties even when you did not manufacture the product. Your contractual role affects which expense categories and third-party recall expense options matter.",
      },
      {
        title: "Insured event and trigger definitions",
        description:
          "Coverage turns on how the policy defines accidental contamination, malicious tampering, government action, or other insured events. A voluntary withdrawal for quality reasons may not meet the trigger even if it is commercially necessary. Read the event definitions before assuming a recall is insured.",
      },
      {
        title: "Which expense categories are actually scheduled",
        description:
          "Basic recall expense, replacement, consultant and lab fees, crisis management, brand rehabilitation, and business interruption or lost profit are often separate lines or endorsements with their own sublimits and retentions. Confirm what is included versus optional.",
      },
      {
        title: "Supply-chain cascading recalls",
        description:
          "A component or ingredient recall can force downstream finished-goods withdrawals. Disclose your role as component supplier or finished-goods assembler so limits and third-party expense wording can be reviewed against cascading exposure.",
      },
      {
        title: "Coordination with product liability limits",
        description:
          "Recall expense coverage does not replace product liability for certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Keep both conversations open when you manufacture or distribute consumer goods — and do not assume one policy pays the other’s loss categories.",
      },
    ],
    relatedLinks: [
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Grocery & Specialty Food", href: "/grocery-specialty-food-insurance/" },
    ],
    faqTitle: "Product recall FAQ",
    faqItems: [
      {
        question: "Is product recall insurance the same as product liability?",
        answer:
          "No. Product liability generally addresses certain third-party bodily injury or property-damage claims arising from products, subject to policy wording. Product recall insurance addresses specified first-party recall or withdrawal expenses — and other scheduled costs — only where the policy trigger and selected coverage apply. One does not automatically pay the other’s loss categories.",
      },
      {
        question: "Does every recall or withdrawal trigger insurance?",
        answer:
          "No. Coverage depends on whether the facts meet the policy’s insured-event or trigger definitions, exclusions, retentions, and sublimits. A commercially necessary withdrawal, a customer demand, or a regulator inquiry does not automatically create an insured recall event.",
      },
      {
        question: "Are voluntary recalls treated the same as mandatory recalls for coverage?",
        answer:
          "Insurance response follows the policy trigger, not the public label alone. In Canada, most food recalls are company-led actions with CFIA oversight, and ordered food-recall authority exists in defined circumstances; consumer-product recalls may involve Health Canada authorities. Whether voluntary or ordered, coverage still requires the insured event and scheduled expense categories to apply.",
      },
      {
        question: "Can replacement, testing, brand, or lost-profit costs be included?",
        answer:
          "Sometimes — where the form or endorsements specifically include those expense categories. Replacement, consultant and lab fees, brand rehabilitation, and business interruption or lost profits are frequently optional, sublimited, or subject to separate triggers. Do not treat them as universal benefits of every recall policy.",
      },
      {
        question: "What information is needed to quote recall coverage?",
        answer:
          "Expect questions about product types and markets, manufacturing versus importing versus distributing role, annual sales, distribution footprint, traceability and lot-coding practices, written recall plans, prior incidents, supply-contract recall duties, and which expense categories (replacement, consultants, brand, business interruption) you want reviewed.",
      },
    ],
    ctaHeading: "Manufacture or distribute products that could be recalled?",
    ctaSubhead:
      "Share your product types, supply-chain role, and traceability practices — we will discuss recall expense coverage alongside product liability.",
    serviceName: "Product Recall Insurance",
  },
];

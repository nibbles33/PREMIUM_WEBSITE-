import {
  AlertTriangle,
  Baby,
  Briefcase,
  Building2,
  Calendar,
  Church,
  Dumbbell,
  HeartPulse,
  Pill,
  Scale,
  Scissors,
  Shield,
  Store,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { QUOTE_BUSINESS } from "@/data/commercial-industries";
import type { ProductPageContent } from "@/data/product-pages/types";

export const commercialProductHospitalityPages: ProductPageContent[] = [
  {
    slug: "hotel-motel-insurance",
    category: "commercial",
    metaTitle:
      "Hotel & Motel Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Hotel and motel insurance through an independent Windsor-Essex broker — commercial property, general liability, business interruption, and licensed alcohol coverage where applicable.",
    headline: "Hotel & Motel Insurance",
    subhead:
      "Hotels and motels combine guest rooms, common areas, and amenities into overlapping property, liability, and income exposures. Depending on your operation, that can mean commercial property for the building and furnishings, general liability for guest injuries in lobbies, pools, or parking areas, business interruption when a covered loss closes rooms, and — where you operate a licensed bar or restaurant — liquor liability separate from standard commercial general liability. Ontario's Innkeepers Act can limit an innkeeper's statutory liability for guest goods in specified circumstances — separate from what your commercial property policy covers for your own assets. Premium Insurance Brokers can help align coverage to your room count, amenities, and seasonality.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=restaurant`,
    quoteLabel: "Get a Hospitality Quote",
    coverageIntro:
      "Hotel and motel insurance usually combines property protection for the building and furnishings, liability for guest and visitor incidents, and income coverage when a covered loss interrupts operations — with additional review where pools, licensed restaurants or bars, or event spaces are part of the property.",
    coverageTypes: [
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover the building, furnishings, linens, kitchen equipment, and other business property against covered causes of loss such as fire, water damage, or theft — subject to policy terms, causes of loss, and limits.",
        detailTitle: "Guest rooms and back-of-house equipment drive property values",
        detailDescription:
          "Hotels concentrate insurable value in guest rooms, lobbies, commercial laundry, HVAC, kitchen equipment, and furnishings — often across multiple floors and outbuildings. Fire, water escape from suppression systems, theft of linens or equipment, and seasonal occupancy swings affect how carriers structure property limits and deductibles. Guest personal belongings are typically excluded from the operator's property policy; under the Innkeepers Act, statutory liability for guest goods may be limited in specified circumstances, with exceptions for loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping — separate from insuring your own property.",
        icon: Building2,
      },
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from guest and visitor incidents on your premises — such as slip-and-fall in lobbies, parking areas, pools, or fitness facilities — subject to policy terms, exclusions, and limits.",
        detailTitle: "When a guest injury in your lobby becomes a liability claim",
        detailDescription:
          "Hotels concentrate people in high-traffic common areas — lobbies, elevators, parking lots, pools, spas, and fitness rooms — where wet floors, icy walkways, and amenity use create premises liability exposure. Whether pool or spa areas, conference facilities, or valet operations are covered depends on policy wording and how activities are disclosed during underwriting. Corporate clients or event organizers renting meeting space may require certificates with specific limits or additional-insured status — those are contractual requirements separate from what any single policy automatically includes.",
        icon: Briefcase,
      },
      {
        title: "Business Interruption",
        shortLabel: "Income",
        description:
          "May help replace lost business income and certain continuing expenses when a covered direct physical loss to insured property interrupts room sales or on-site operations — subject to waiting periods, policy terms, and how income is measured.",
        detailTitle: "Room revenue does not pause automatically when repairs begin",
        detailDescription:
          "A fire, major water loss, or equipment failure that closes guest rooms or a licensed restaurant can interrupt daily revenue while fixed costs continue — mortgage, payroll, utilities, and marketing. Business interruption coverage, where purchased, responds only after a covered direct physical loss to insured property and subject to waiting periods and policy wording. Seasonal tourism patterns in Windsor–Essex affect how income should be projected; a licence suspension, weather downturn, or other non-covered event may not trigger the same coverage — confirm triggers with your broker.",
        icon: Store,
      },
      {
        title: "Liquor Liability",
        shortLabel: "Liquor",
        description:
          "Where you sell or serve alcohol under an AGCO Liquor Sales Licence at an on-site bar, restaurant, or event space, liquor liability may address certain claims tied to alcohol service — distinct from general liability, which often excludes or limits liquor-related claims — subject to policy terms.",
        detailTitle: "A hotel bar is not the same coverage question as guest-room liability",
        detailDescription:
          "Properties with licensed on-site alcohol service can face civil liability if alcohol contributes to patron injury or property damage — separately from AGCO administrative penalties such as suspension or revocation. Holding a Liquor Sales Licence authorizes legal sale and service; it does not include insurance, and the Liquor Licence and Control Act does not mandate liquor liability insurance as a statutory condition of holding a licence. Liquor liability coverage, where purchased, may help respond to certain alcohol-related claims standard general liability excludes or limits. Hotels without licensed alcohol service do not need this coverage component — disclose your actual service model to your broker.",
        icon: Wine,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex independent hotels, motels, inns, and extended-stay operators — reviewed through an independent broker who can coordinate property, liability, business interruption, and licensed alcohol coverage for how you actually operate.",
    considerations: [
      {
        title: "Guest belongings vs. your property",
        description:
          "Guest personal property is typically excluded from the hotel operator's property policy — guests generally rely on their own travel or homeowners insurance for belongings. Under Ontario's Innkeepers Act, an innkeeper's liability for guest goods may be limited in specified circumstances, but statutory exceptions apply — including loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping. Conspicuous posting of section 4 in the office, public rooms, and guest bedrooms is relevant to obtaining the Act's benefit. That legal liability framework is separate from purchasing coverage for your building, furnishings, and business equipment.",
      },
      {
        title: "Pool, spa, and amenity safety",
        description:
          "Pools, hot tubs, fitness facilities, and saunas create premises liability exposure that insurers evaluate during underwriting — fencing, supervision, signage, and maintenance matter. Compliance with applicable safety rules supports safe operations but does not replace liability coverage. Disclose all amenities to your broker so policy wording matches what guests can access.",
      },
      {
        title: "Licensed on-site restaurant or bar",
        description:
          "Hotels with AGCO-licensed alcohol service face a distinct liability profile from lodging-only properties. Liquor liability may address certain alcohol-related claims standard general liability excludes or limits — but holding a Liquor Sales Licence does not include insurance, and AGCO does not mandate liquor liability insurance as a licence condition. Landlords, lenders, and franchise agreements may still require proof contractually.",
      },
      {
        title: "Occupancy, seasonality, and business income values",
        description:
          "Room count, average daily rate, and seasonal tourism patterns drive property values and business interruption projections. Extended-stay or long-term guest arrangements may affect how occupancy is underwritten. Share historical occupancy data and peak-season revenue so income coverage reflects how your property actually earns.",
      },
      {
        title: "Parking lots, valet, and guest vehicle exposure",
        description:
          "Parking lots, garages, and valet operations create slip-and-fall and vehicle-damage exposure distinct from in-room incidents. Operator liability for guest vehicle damage or theft is typically limited and policy-dependent — not the same as insuring guest belongings. Disclose valet, shuttle, and parking arrangements to your broker.",
      },
      {
        title: "Conference rooms and event rental space",
        description:
          "Renting meeting rooms, banquet halls, or wedding venues to third parties can extend liability and certificate requirements beyond standard guest-room operations. Event contracts may require specific limits, additional-insured wording, or liquor liability when alcohol is served — review contracts against what your policies can provide before booking.",
      },
    ],
    relatedLinks: [
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Business Interruption", href: "/business-interruption-insurance/" },
    ],
    faqTitle: "Hotel & motel FAQ",
    faqItems: [
      {
        question: "Are guest belongings covered under my hotel policy?",
        answer:
          "Guest personal property is typically excluded from the operator's property policy. Guests generally rely on their own travel or homeowners insurance for belongings. Under Ontario's Innkeepers Act, an innkeeper's liability for guest goods may be limited in specified circumstances, with exceptions for loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping. Conspicuous posting of section 4 is relevant to obtaining the Act's benefit — a legal liability framework separate from insuring your own building, furnishings, and equipment.",
      },
      {
        question: "Do I need liquor liability if my hotel has a bar or restaurant?",
        answer:
          "If you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability is commonly reviewed because general liability often excludes or limits liquor-related claims. AGCO does not mandate liquor liability insurance as a condition of holding a licence, but landlords, lenders, and event contracts may require proof. Hotels without licensed alcohol service do not need this coverage component.",
      },
      {
        question: "How does occupancy and seasonality affect my coverage?",
        answer:
          "Room count, average daily rate, and seasonal patterns affect property values and business interruption projections. Share historical occupancy and peak-season revenue so income coverage reflects how your property actually earns. A downturn from weather, licence issues, or other non-covered events may not trigger business interruption — confirm policy triggers with your broker.",
      },
      {
        question: "Are pool and spa areas covered under general liability?",
        answer:
          "Pool, spa, and fitness amenities create premises liability exposure that insurers evaluate during underwriting — fencing, supervision, maintenance, and signage matter to availability and terms. Whether a specific incident at an amenity is covered depends on policy wording and what was disclosed. Compliance with safety requirements supports operations but does not replace liability coverage.",
      },
      {
        question: "What happens to room revenue after a covered property loss?",
        answer:
          "Business interruption coverage, where purchased, may help replace lost income and certain continuing expenses after a covered direct physical loss to insured property — subject to waiting periods, policy terms, and how income is measured. It does not automatically cover revenue lost because of low occupancy, licence suspension, or events excluded by policy wording. Confirm what must happen before income coverage applies.",
      },
    ],
    ctaHeading: "Operate a hotel or motel?",
    ctaSubhead:
      "Share room count, amenities, and food service — we will compare hospitality programs.",
    serviceName: "Hotel & Motel Insurance",
  },
  {
    slug: "convenience-store-insurance",
    category: "commercial",
    metaTitle:
      "Convenience Store & Gas Station Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Convenience store and gas station insurance through an independent Windsor-Essex broker — commercial property, general liability, pollution, and crime coverage for retail fuel operators.",
    headline: "Convenience Store & Gas Station Insurance",
    subhead:
      "Convenience stores and gas bars combine high-traffic retail, cash handling, and — at many locations — fuel dispensing, refrigerated inventory, and optional product lines such as lottery, tobacco, prepared food, or AGCO-authorized retail alcohol. Insurance needs reflect that mix: commercial property for the building and stock, general liability for customer incidents, pollution coverage where underground storage tanks create environmental exposure, and crime coverage where robbery and theft are material risks — each subject to the policies you purchase. Not every c-store sells alcohol, operates fuel pumps, or carries the same inventory profile. Premium Insurance Brokers can help map coverage to your hours, security practices, and actual product mix.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a C-Store Quote",
    coverageIntro:
      "Convenience and gas-bar insurance usually combines property protection for the building and inventory, liability for customer incidents on the sales floor and pump island, and — where relevant — pollution coverage for fuel tanks and crime coverage for cash and theft exposure.",
    coverageTypes: [
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover the building, coolers, shelving, inventory, and point-of-sale equipment against covered causes of loss such as fire, theft, or equipment breakdown — subject to policy terms, theft-security conditions, and limits.",
        detailTitle: "Coolers, inventory, and late-night theft drive property values",
        detailDescription:
          "C-stores concentrate value in refrigerated and frozen inventory, general merchandise, and store fixtures — with higher theft exposure during extended or 24-hour hours. Inventory coverage depends on reported values, security requirements in the policy, and scheduled causes of loss. Stores that sell lottery products, tobacco, prepared food, or AGCO-authorized retail alcohol create additional underwriting questions separate from a generic retail property form — disclose your actual product mix to your broker.",
        icon: Store,
      },
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from customer incidents on your premises — slips at entrances, pump islands, or parking areas — subject to policy terms, exclusions, and limits.",
        detailTitle: "A slip at the pump island is a premises liability claim",
        detailDescription:
          "Convenience and gas-bar operations combine indoor retail traffic with outdoor pump islands, propane exchange, and parking-lot exposure — especially in winter conditions. Product liability for prepared food or retail goods may arise separately from a simple premises injury depending on what you sell and how the policy is structured. Franchise, landlord, or fuel-supplier agreements may require specific limits or additional-insured certificates — contractual requirements reviewed against your policy.",
        icon: Briefcase,
      },
      {
        title: "Pollution Liability",
        shortLabel: "Pollution",
        description:
          "May help address certain pollution liability claims arising from underground storage tanks, fuel dispensing equipment, or gradual contamination — where purchased and subject to policy terms — distinct from standard commercial property forms.",
        detailTitle: "Fuel tanks create environmental exposure property policies may not fully address",
        detailDescription:
          "Stores with gasoline or diesel dispensing and underground storage tanks face environmental contamination exposure regulated under technical standards for fuel equipment. Standard property policies may not fully address gradual pollution or third-party cleanup costs — pollution liability coverage, where available, is typically reviewed separately from building and inventory limits. Retail-only c-stores without fuel operations may not need this component — disclose whether you own, lease, or operate tanks to your broker.",
        icon: AlertTriangle,
      },
      {
        title: "Crime & Hold-Up",
        shortLabel: "Crime",
        description:
          "May help address certain losses from robbery, theft, burglary, or employee dishonesty — where purchased — subject to policy limits, deductibles, and security conditions such as alarms, cameras, and safe practices.",
        detailTitle: "Cash-heavy operations face crime exposure standard property may not cover",
        detailDescription:
          "Late-night convenience and gas-bar operations face robbery, burglary, and internal theft exposure that standard property forms treat differently from liability claims. Crime endorsements, where available, may address money and securities loss, safe burglary, and employee dishonesty — subject to underwriting review of drop schedules, camera coverage, panic alarms, and prior loss history. Insurers often tie crime terms to documented security practices rather than assuming every theft scenario is covered.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex independent convenience stores, gas bars, and combination fuel-and-retail operators — reviewed through an independent broker who can coordinate property, liability, pollution, and crime coverage for how you actually operate.",
    considerations: [
      {
        title: "Fuel tanks vs. retail-only operations",
        description:
          "Stores with gasoline or diesel dispensing and underground storage tanks face pollution exposure that retail-only locations do not. Pollution liability coverage, where purchased, is reviewed separately from building and inventory limits. If you do not operate fuel pumps, disclose that clearly so your program is not structured around tank exposure you do not have.",
      },
      {
        title: "Tobacco and vape retail compliance",
        description:
          "Tobacco and vapour-product retail is governed by provincial rules on licensing, display, and age verification — regulatory obligations separate from insurance coverage. Insurers may ask about compliance and security during underwriting, but purchasing property or liability insurance does not substitute for retail licensing requirements.",
      },
      {
        title: "OLG lottery retailer requirements",
        description:
          "Selling lottery products in Ontario requires an OLG Retailer Agreement and AGCO Seller registration — regulatory steps separate from property insurance. Lottery terminal inventory may be insurable under property coverage subject to limits and theft-security conditions, but the OLG and AGCO registration process is not an insurance product.",
      },
      {
        title: "Retail alcohol where AGCO Convenience Store Licence applies",
        description:
          "Eligible convenience stores may hold an AGCO Convenience Store Licence for retail sale of beer, wine, and ready-to-drink beverages — a distinct regulatory framework from on-premises liquor service at bars or restaurants. Retail alcohol creates underwriting questions that differ from restaurant liquor liability; disclose whether you hold this authorization and how alcohol is stored and sold.",
      },
      {
        title: "Security, cameras, and crime underwriting",
        description:
          "Crime and hold-up coverage, where purchased, is often tied to documented security practices — alarms, cameras, safe drop schedules, and staffing protocols. Insurers review prior loss history and hours of operation. Security compliance supports safer operations but does not replace crime coverage where it is needed.",
      },
      {
        title: "Prepared food and food-premises context",
        description:
          "Stores that prepare or sell hot food, sandwiches, or other ready-to-eat items may fall under Ontario food-premises requirements depending on the operation. Food safety compliance is regulatory — separate from general liability or product liability coverage for certain food-related claims. Disclose prepared-food operations to your broker.",
      },
      {
        title: "Franchise and landlord certificate requirements",
        description:
          "Franchisors, landlords, and fuel suppliers often specify minimum limits, additional-insured status, or pollution coverage in lease and supply agreements. Those are contractual requirements reviewed against what your policies can actually provide — not provincial statutory insurance mandates for all c-stores.",
      },
    ],
    relatedLinks: [
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
      { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
    ],
    faqTitle: "Convenience store FAQ",
    faqItems: [
      {
        question: "Are gas pumps and canopies covered under commercial property?",
        answer:
          "Pump equipment, canopies, and related fixtures may be scheduled under commercial property coverage depending on how the policy is structured — subject to causes of loss, limits, and deductibles. Underground storage tanks and environmental contamination are typically addressed separately through pollution liability coverage, where purchased. Disclose whether you own, lease, or operate fuel equipment to your broker.",
      },
      {
        question: "Is lottery or tobacco inventory covered if there is a theft?",
        answer:
          "Inventory may be covered under commercial property limits subject to reported values, causes of loss, and theft-security conditions in the policy. Selling lottery products requires an OLG Retailer Agreement and AGCO Seller registration — regulatory steps separate from insuring inventory. Confirm security requirements and sublimits with your broker rather than assuming all stock is fully covered.",
      },
      {
        question: "Do I need hold-up or crime coverage for a 24-hour store?",
        answer:
          "Crime and hold-up coverage, where purchased, may address certain robbery, burglary, and employee-dishonesty losses — subject to policy terms, limits, and security conditions. Extended hours increase exposure, but crime coverage is an optional commercial product, not an automatic part of every c-store policy. Insurers often review cameras, alarms, drop schedules, and prior loss history during underwriting.",
      },
      {
        question: "Does my store need liquor liability if we sell beer or wine under an AGCO licence?",
        answer:
          "Retail alcohol under an AGCO Convenience Store Licence is a different regulatory and liability profile from on-premises service at a bar or restaurant. Whether a specific liquor-liability or retail-alcohol endorsement applies depends on your authorization and policy wording — review with your broker rather than assuming standard general liability fully addresses retail alcohol exposure.",
      },
      {
        question: "What information should I share when requesting a quote?",
        answer:
          "Square footage, hours of operation, fuel-tank ownership, inventory values, security features, prepared-food operations, and whether you sell lottery, tobacco, or AGCO-authorized retail alcohol. Franchise or landlord certificate requirements should also be shared so limits and endorsements match your contracts.",
      },
    ],
    ctaHeading: "Run a c-store or gas bar?",
    ctaSubhead:
      "Tell us about fuel operations, inventory, and hours — we will compare retail and pollution coverage.",
    serviceName: "Convenience Store & Gas Station Insurance",
  },
  {
    slug: "grocery-specialty-food-insurance",
    category: "commercial",
    metaTitle:
      "Grocery, Specialty Food & Bakery Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Grocery, specialty food, and bakery insurance — spoilage, product liability, equipment breakdown, and retail property for Windsor-Essex food sellers.",
    headline: "Grocery, Specialty Food & Bakery Insurance",
    subhead:
      "Coverage for food retailers and artisan producers — spoilage, refrigeration breakdown, product liability, and customer-facing premises risk.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Food Retail Quote",
    coverageIntro:
      "Food retail combines inventory spoilage, product liability, and equipment failure exposures unique to perishable goods.",
    coverageTypes: [
      {
        title: "Commercial Property & Inventory",
        description:
          "Covers stock, fixtures, and refrigeration equipment against covered theft, fire, and equipment failure.",
        icon: Store,
      },
      {
        title: "Spoilage & Refrigeration Breakdown",
        description:
          "Can cover inventory lost when coolers fail or power is interrupted, subject to policy terms.",
        icon: UtensilsCrossed,
      },
      {
        title: "Product Liability",
        description:
          "Addresses illness or injury claims from food products you sell or produce.",
        icon: Briefcase,
      },
      {
        title: "General Liability",
        description:
          "Covers customer injury on premises — spills, display cases, and parking areas.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Grocery and specialty food insurance is for Windsor-Essex grocers, butcher shops, bakeries, specialty food stores, and delis selling perishable products.",
    relatedLinks: [
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Product Recall", href: "/product-recall-insurance/" },
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
    ],
    faqTitle: "Grocery & specialty food FAQ",
    faqItems: [
      {
        question: "Is power outage spoilage covered?",
        answer:
          "Spoilage endorsements may cover inventory lost during extended outages, subject to waiting periods and cause-of-loss definitions.",
      },
      {
        question: "Do bakeries need product liability?",
        answer:
          "Yes — allergen claims and foodborne illness allegations are product liability exposures for any food seller.",
      },
      {
        question: "Are delivery operations covered?",
        answer:
          "In-store delivery using company or employee vehicles may need commercial auto or non-owned auto coverage.",
      },
      {
        question: "How are seasonal inventory peaks handled?",
        answer:
          "Holiday and harvest peaks may need higher seasonal limits. Report peak inventory values to your broker.",
      },
    ],
    ctaHeading: "Sell food at retail?",
    ctaSubhead:
      "Share your product mix, refrigeration setup, and sales volume — we will compare food retail programs.",
    serviceName: "Grocery, Specialty Food & Bakery Insurance",
  },
  {
    slug: "medical-dental-insurance",
    category: "commercial",
    metaTitle:
      "Medical & Dental Office Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Medical and dental office insurance — malpractice coordination, commercial property, cyber, and clinic liability for Windsor-Essex healthcare practices.",
    headline: "Medical & Dental Office Insurance",
    subhead:
      "Commercial coverage for clinics and practices — premises liability, property, cyber, and coordination with professional malpractice requirements.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get a Clinic Quote",
    coverageIntro:
      "Medical and dental offices need commercial property and liability alongside profession-specific malpractice coverage.",
    coverageTypes: [
      {
        title: "Commercial General Liability",
        description:
          "Covers patient slip-and-fall and premises-related injury claims in waiting and treatment areas.",
        icon: Briefcase,
      },
      {
        title: "Commercial Property",
        description:
          "Protects medical equipment, furniture, and leasehold improvements against covered losses.",
        icon: Building2,
      },
      {
        title: "Cyber & Privacy",
        description:
          "Addresses patient data breaches and privacy notification costs under PHIPA and related obligations.",
        icon: HeartPulse,
      },
      {
        title: "Malpractice Coordination",
        description:
          "Premium coordinates commercial lines; professional malpractice is placed through appropriate professional markets.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Medical and dental office insurance is for Windsor-Essex physicians, dentists, specialists, walk-in clinics, and allied health practices operating from commercial premises.",
    relatedLinks: [
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Pharmacy Insurance", href: "/pharmacy-insurance/" },
    ],
    faqTitle: "Medical & dental office FAQ",
    faqItems: [
      {
        question: "Is malpractice included in a commercial package?",
        answer:
          "Malpractice is a separate professional coverage. Commercial policies address premises, property, and cyber — not treatment errors.",
      },
      {
        question: "Do I need cyber for a small clinic?",
        answer:
          "Patient records make clinics attractive targets. Cyber coverage helps with breach response and notification obligations.",
      },
      {
        question: "Are employees covered for workplace injury?",
        answer:
          "WSIB covers workplace injuries in Ontario. Commercial GL does not replace WSIB.",
      },
      {
        question: "What about locum and associate practitioners?",
        answer:
          "Disclose all practitioners and their credentialing status. Malpractice and clinic policies must reflect who provides care.",
      },
    ],
    ctaHeading: "Run a medical or dental practice?",
    ctaSubhead:
      "Tell us about your clinic, equipment values, and record-keeping — we will coordinate commercial and professional coverage.",
    serviceName: "Medical & Dental Office Insurance",
  },
  {
    slug: "pharmacy-insurance",
    category: "commercial",
    metaTitle:
      "Pharmacy Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Pharmacy insurance through an independent Windsor-Essex broker — commercial property, general liability, professional dispensing coverage, and cyber/privacy for retail and compounding pharmacies.",
    headline: "Pharmacy Insurance",
    subhead:
      "Pharmacies combine professional dispensing exposure, high-value prescription inventory, refrigerated stock, and sensitive patient health information — a different risk profile from ordinary retail. Depending on your operation, that can mean commercial property for fixtures, equipment, and stock; general liability for customer incidents on your premises; professional liability or errors and omissions for certain dispensing and counselling-related claims at the business level; and cyber or privacy coverage where purchased for data-breach response — each subject to the policies you purchase. Ontario pharmacists must maintain personal professional liability insurance under OCP requirements separately from the pharmacy's business insurance program. Premium Insurance Brokers can help align coverage to your dispensing model, cold-chain setup, services, and security practices.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Pharmacy Quote",
    coverageIntro:
      "Pharmacy insurance usually separates premises and property exposure from professional dispensing liability and patient-data risks — depending on your prescription volume, clinical services, refrigeration, delivery model, and how your business policy coordinates with registrants' OCP personal professional liability insurance.",
    coverageTypes: [
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover the building or tenant improvements, fixtures, dispensing equipment, and prescription inventory against covered causes of loss such as fire, theft, or water damage — subject to policy terms, reported values, and limits.",
        detailTitle: "Prescription inventory and cold-chain equipment drive property values",
        detailDescription:
          "Pharmacy property exposure concentrates in dispensary fixtures, automation, compounding equipment, and prescription stock — including high-value and refrigerated medications. Base commercial property may address certain physical damage or theft subject to policy wording, but temperature-related stock loss from equipment failure, power interruption, or utility outage is often treated differently from fire or burglary — equipment breakdown, spoilage, or deterioration endorsements may be needed depending on cause of loss and policy structure. Do not assume refrigerated inventory is fully covered without reviewing triggers, sublimits, and backup-power disclosures with your broker.",
        icon: Pill,
      },
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from premises incidents — such as slip-and-fall in aisles or the dispensary waiting area — subject to policy terms, exclusions, and limits.",
        detailTitle: "A slip at the pickup counter is not a dispensing-error claim",
        detailDescription:
          "Customer injury in retail aisles, entrances, consultation areas, or parking lots generates premises liability exposure distinct from allegations that the wrong drug, strength, or directions were dispensed or counselled. General liability may address certain non-professional operational claims, but dispensing errors, prescription processing mistakes, and medication-related professional services allegations are typically evaluated under professional liability or errors and omissions coverage — not ordinary CGL. Scope depends on policy wording and disclosed services.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability",
        shortLabel: "Professional",
        description:
          "May help respond to certain claims alleging dispensing errors, wrong drug or strength, incorrect directions, or other professional services errors at the pharmacy business level — subject to policy terms, limits, and whether coverage is occurrence- or claims-made.",
        detailTitle: "A dispensing error is a professional claim — and OCP PPLI is separate",
        detailDescription:
          "Claims alleging the wrong medication, strength, interaction, or counselling were provided are professional exposure — separate from a simple premises injury. Pharmacy business professional liability or E&O, where purchased, may address certain entity-level allegations subject to policy wording; it does not replace each registrant's OCP personal professional liability insurance (PPLI), which must be maintained in the individual pharmacist's or pharmacy technician's name under College By-Law requirements. OCP states corporate employer policies do not meet those personal registration requirements. Whether a given allegation falls within business E&O, a registrant's PPLI, or both depends on the claim and policy structure — confirm with your broker rather than assuming one policy label covers every professional scenario.",
        icon: Shield,
      },
      {
        title: "Cyber & Privacy",
        shortLabel: "Cyber",
        description:
          "May help address certain costs arising from privacy breaches, ransomware, or system disruptions affecting prescription records and payment systems — where purchased and subject to policy terms — distinct from PHIPA compliance obligations.",
        detailTitle: "Patient records create cyber exposure PHIPA does not insure away",
        detailDescription:
          "Pharmacies are health information custodians under Ontario's Personal Health Information Protection Act (PHIPA) and must protect personal health information through reasonable safeguards — a regulatory obligation separate from purchasing insurance. Cyber or privacy coverage, where available, may help with certain breach-response, notification, or business-interruption costs tied to cyber events depending on policy wording, but it does not satisfy PHIPA compliance and does not mean every privacy incident is covered. Insurers may ask about dispensing software, backups, access controls, and vendor arrangements during underwriting.",
        icon: HeartPulse,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex independent pharmacies, compounding pharmacies, and retail drug stores — reviewed through an independent broker who can coordinate property, premises liability, professional dispensing coverage, and cyber/privacy protection for how you actually dispense, store, and protect patient information.",
    considerations: [
      {
        title: "OCP personal professional liability vs. pharmacy business insurance",
        description:
          "Part A pharmacists, pharmacy technicians, interns, and related registrants must maintain personal professional liability insurance (PPLI) in their own name under OCP By-Law requirements — currently a minimum of $2,000,000 per claim and $4,000,000 annual aggregate covering regulated professional services, with full prior-acts protection. OCP states corporate employer policies do not meet those registration requirements. Pharmacy business insurance — property, general liability, cyber, and entity-level professional or E&O where purchased — protects the operation separately from each registrant's personal OCP coverage. Do not conflate the two when reviewing quotes or certificates.",
      },
      {
        title: "Dispensing errors, counselling, and clinical services",
        description:
          "Wrong drug, wrong strength, wrong patient, interaction, or counselling allegations generate professional liability exposure evaluated separately from premises injury. If your pharmacy provides injections, medication reviews, point-of-care testing, or other expanded services, disclose the full service menu during underwriting — standard retail pharmacy wording may not address every clinical activity. Claims-made versus occurrence structure matters for professional policies; confirm retroactive dates and extended reporting with your broker.",
      },
      {
        title: "Refrigerated, high-value, and temperature-sensitive inventory",
        description:
          "Vaccines, biologics, and other cold-chain products can represent concentrated stock value vulnerable to refrigeration failure, compressor breakdown, or power interruption. Ordinary commercial property may not treat temperature excursion or spoilage the same way as fire or theft — equipment breakdown, spoilage, or utility-interruption endorsements may be needed depending on policy structure and disclosed causes of loss. Backup power, alarm monitoring, and maintenance records may affect underwriting but do not replace coverage review.",
      },
      {
        title: "PHIPA, privacy, and cyber exposure",
        description:
          "As health information custodians under PHIPA, pharmacies must implement reasonable safeguards for personal health information — including electronic dispensing records, patient profiles, and payment data. That regulatory framework is separate from cyber or privacy insurance. Cyber coverage, where purchased, may address certain breach-response or system-disruption costs subject to policy terms, but it does not substitute for PHIPA compliance programs, privacy policies, or IPC oversight obligations.",
      },
      {
        title: "Theft, robbery, and controlled substances",
        description:
          "Prescription inventory, cash, and narcotics or monitored drugs create theft and robbery exposure that standard property forms may treat differently from liability claims. Crime, hold-up, or employee-dishonesty endorsements, where purchased, may address certain losses subject to limits, deductibles, and security conditions such as alarms, cameras, safes, and narcotics storage protocols. Regulatory storage and security requirements support safe operations but are not insurance coverage — disclose security practices and prior loss history during underwriting.",
      },
      {
        title: "Business interruption and cold-chain dependency",
        description:
          "A fire, major water loss, or extended equipment failure that closes dispensing or destroys refrigerated stock can interrupt prescription revenue while fixed costs continue. Business interruption coverage, where purchased, responds only after a covered direct physical loss to insured property and subject to waiting periods and policy wording — a licence suspension, supply disruption, or non-covered breakdown may not trigger the same coverage. Accurate inventory values and peak-period prescription volume support proper property and income limits.",
      },
      {
        title: "Prescription delivery and off-premises exposure",
        description:
          "Pharmacies that deliver prescriptions using staff vehicles, company cars, or courier arrangements create automobile and professional exposure beyond the fixed storefront. Ontario automobile coverage for business delivery is regulated separately from general liability, and off-premises dispensing may need specific disclosure. If delivery is part of your model, describe who drives, how often, and whether couriers are contracted — do not assume standard premises coverage automatically extends to every delivery scenario.",
      },
    ],
    relatedLinks: [
      { label: "Medical / Dental", href: "/medical-dental-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
    ],
    faqTitle: "Pharmacy insurance FAQ",
    faqItems: [
      {
        question: "Does general liability cover dispensing errors?",
        answer:
          "Generally no — or not as a standard premises claim. Allegations involving the wrong drug, strength, patient, directions, or counselling are typically evaluated as professional liability or errors and omissions exposure, separate from slip-and-fall or other third-party injury claims general liability may address. Pharmacy business professional coverage and each registrant's OCP personal professional liability insurance serve different roles — confirm how your program structures professional allegations with your broker.",
      },
      {
        question: "Is pharmacist professional liability the same as pharmacy business insurance?",
        answer:
          "No. OCP requires Part A pharmacists, pharmacy technicians, interns, and related registrants to maintain personal professional liability insurance (PPLI) in their own name under College By-Law requirements — OCP states corporate employer policies do not meet those registration requirements. Pharmacy business insurance addresses the operation's property, premises liability, cyber, and entity-level professional or E&O coverage where purchased. The two programs are related but not interchangeable — business certificates do not substitute for a registrant's personal OCP declaration.",
      },
      {
        question: "What happens if refrigerated medication is spoiled after equipment or power failure?",
        answer:
          "Whether spoiled prescription stock is insured depends on the property coverage and endorsements you purchased, the cause of the temperature change or equipment failure, and applicable limits. Base commercial property may handle fire or theft differently from refrigeration breakdown or utility interruption. Equipment breakdown, spoilage, or deterioration endorsements, where available, depend on policy triggers and sublimits — confirm with your broker rather than assuming cold-chain inventory is automatically fully covered.",
      },
      {
        question: "Does pharmacy insurance cover theft of prescription inventory?",
        answer:
          "Commercial property may address certain theft or burglary losses to stock and fixtures subject to reported values, causes of loss, and policy terms. High-value prescription inventory, narcotics, and cash may need specific scheduling or crime endorsements depending on limits and security conditions. Robbery, employee dishonesty, and after-hours break-ins are often underwritten separately from simple premises liability — disclose security systems, safe practices, and prior loss history to your broker.",
      },
      {
        question: "Does cyber insurance replace PHIPA compliance?",
        answer:
          "No. Pharmacies are health information custodians under Ontario's Personal Health Information Protection Act and must protect personal health information through reasonable administrative, technical, and physical safeguards — regulatory obligations separate from purchasing insurance. Cyber or privacy coverage, where purchased, may help with certain breach-response or system-disruption costs subject to policy terms, but it does not satisfy PHIPA requirements and does not mean every privacy incident or regulatory proceeding is covered.",
      },
    ],
    ctaHeading: "Own or operate a pharmacy?",
    ctaSubhead:
      "Share prescription volume, services, refrigeration setup, and security practices — we will compare pharmacy coverage options.",
    serviceName: "Pharmacy Insurance",
  },
  {
    slug: "fitness-gym-insurance",
    category: "commercial",
    metaTitle:
      "Fitness & Gym Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Fitness and gym insurance — general liability, professional liability for trainers, property, and participant injury for Windsor-Essex fitness businesses.",
    headline: "Fitness & Gym Insurance",
    subhead:
      "Coverage for gyms, studios, and fitness operators — participant injury, equipment, trainer liability, and premises risk.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Fitness Quote",
    coverageIntro:
      "Fitness businesses face participant injury claims, equipment liability, and professional exposure from trainers and instructors.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Covers member slip-and-fall, equipment-related injury, and premises claims in workout areas.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability",
        description:
          "Addresses claims alleging negligent instruction, programming, or personal training advice.",
        icon: Dumbbell,
      },
      {
        title: "Commercial Property",
        description:
          "Covers cardio machines, weights, flooring, and leasehold improvements.",
        icon: Building2,
      },
      {
        title: "Sexual Abuse & Misconduct",
        description:
          "Some markets offer coverage for claims alleging abuse by staff — important for youth and vulnerable populations.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Fitness and gym insurance is for Windsor-Essex gyms, CrossFit boxes, yoga studios, martial arts schools, and personal training businesses.",
    relatedLinks: [
      { label: "Salon / Barber", href: "/salon-barber-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
    ],
    faqTitle: "Fitness & gym FAQ",
    faqItems: [
      {
        question: "Are member injuries covered?",
        answer:
          "GL may respond to premises liability claims. Assumption-of-risk waivers do not replace insurance — carriers still evaluate supervision and equipment maintenance.",
      },
      {
        question: "Do independent trainers need their own coverage?",
        answer:
          "Contract trainers may need their own professional liability. Your policy should reflect who employs or contracts instructors.",
      },
      {
        question: "Is child fitness different to insure?",
        answer:
          "Youth programs may need enhanced abuse and molestation coverage and stricter screening protocols.",
      },
      {
        question: "Are special events and boot camps covered?",
        answer:
          "Off-site events may need event liability or activity-specific endorsements. Disclose all programming locations.",
      },
    ],
    ctaHeading: "Operate a gym or fitness studio?",
    ctaSubhead:
      "Tell us about your membership, trainers, and activities — we will compare fitness liability programs.",
    serviceName: "Fitness & Gym Insurance",
  },
  {
    slug: "salon-barber-insurance",
    category: "commercial",
    metaTitle:
      "Salon & Barber Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Salon and barber shop insurance through an independent Windsor-Essex broker — general liability, professional treatment liability, property, and product exposure.",
    headline: "Salon & Barber Insurance",
    subhead:
      "Hair salons and barbershops combine two different exposure types: premises liability for customers in your reception and service areas, and professional treatment liability for cuts, colour, chemical services, and other hands-on work. Depending on what you offer, that can mean general liability for slip-and-fall incidents, treatment or professional liability for service-related injury or reaction claims, property coverage for stations and equipment, and product liability where you retail hair or skin products — each subject to the policies you purchase. Not every salon provides nails, waxing, laser, medical aesthetics, or mobile services, and higher-risk treatments must be disclosed rather than assumed to be included. Premium Insurance Brokers can help align coverage to your actual service menu and staffing model.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Salon Quote",
    coverageIntro:
      "Salon and barber insurance usually combines premises liability with professional treatment exposure for the services you perform — plus property and product coverage where relevant — depending on your menu, retail sales, and whether stylists are employees or independent renters.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from premises incidents in reception, waiting, and service areas — such as slip-and-fall — subject to policy terms, exclusions, and limits.",
        detailTitle: "When a wet floor in reception becomes a premises claim",
        detailDescription:
          "Salons and barbershops concentrate clients in reception areas, walkways, and wash stations where wet floors, cords, and product spills create slip-and-fall exposure distinct from a treatment-gone-wrong claim. General liability may address certain premises and operations claims, but scope depends on policy wording and how your location, chair-rental model, and any mobile services are disclosed during underwriting.",
        icon: Briefcase,
      },
      {
        title: "Professional / Treatment Liability",
        shortLabel: "Treatment",
        description:
          "May help respond to certain claims alleging injury, burns, scarring, or allergic reaction from professional services you perform — such as cuts, colour, chemical treatments, or waxing — subject to policy terms and how services are scheduled.",
        detailTitle: "A colour reaction is a professional claim, not a slip-and-fall",
        detailDescription:
          "Claims alleging a cut, chemical burn, scalp reaction, or injury from a treatment you performed are typically evaluated as professional or treatment liability — separate from a simple premises injury. Insurers often ask for your full service menu; waxing, advanced esthetics, laser, injections, or medical-aesthetic procedures may need specific disclosure and may not be included under standard salon wording. Do not assume every treatment type is automatically covered without review.",
        icon: Scissors,
      },
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover styling stations, dryers, chairs, product inventory, leasehold improvements, and other business property against covered causes of loss — subject to policy terms, causes of loss, and limits.",
        detailTitle: "Stations, tools, and retail inventory add up quickly",
        detailDescription:
          "Salon property value sits in styling stations, equipment, back-bar inventory, and tenant improvements — with theft and water damage among common loss scenarios. Tools used off-premises or by mobile stylists may be underwritten differently from fixed shop equipment. Confirm what is owned by the salon versus booth renters, and whether gear removed from the premises needs separate scheduling.",
        icon: Store,
      },
      {
        title: "Product Liability",
        shortLabel: "Products",
        description:
          "May help respond to certain claims alleging illness, allergic reaction, or injury from retail products you sell or recommend — often as products liability within a general liability policy or by endorsement — subject to policy terms.",
        detailTitle: "Retail product claims are separate from a bad haircut",
        detailDescription:
          "Selling shampoo, colour care, or skin products in-salon can generate product liability allegations distinct from a professional treatment claim. What triggers coverage, how completed products are defined, and whether professional-use-only products sold to clients are included depend on policy wording — confirm scope with your broker rather than assuming retail shelves are automatically fully covered.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex hair salons, barbershops, and personal-care operators — reviewed through an independent broker who can coordinate premises, treatment, property, and product coverage for the services you actually provide.",
    considerations: [
      {
        title: "Hair and barber services vs. advanced esthetics",
        description:
          "A traditional hair salon or barbershop creates a different underwriting profile from operations that add nails, laser, injections, or medical-aesthetic services. Higher-risk treatments must be disclosed — standard salon insurance does not automatically include every personal-service modality. Your broker needs your complete service menu, not just your business name.",
      },
      {
        title: "Chemical treatments, colour, and allergic reactions",
        description:
          "Colour, bleach, relaxers, and other chemical services create burn, reaction, and scarring exposure that insurers evaluate during underwriting. Patch-test protocols and client consultation records support safe operations but do not replace treatment liability coverage. What triggers a professional claim depends on policy wording and disclosed services.",
      },
      {
        title: "Booth renters and independent contractors",
        description:
          "Chair or booth renters are often treated as independent businesses requiring their own liability coverage — not automatically covered under the salon owner's policy. Lease agreements and renter insurance requirements should be reviewed before onboarding stylists. Disclose your staffing model to your broker.",
      },
      {
        title: "Products sold vs. professional services performed",
        description:
          "Retail product sales can generate product liability allegations separate from professional treatment claims. Product liability, treatment liability, and premises liability address different exposures — confirm how your policy structures each rather than assuming one coverage label covers every client complaint.",
      },
      {
        title: "Tools, equipment, and mobile or off-premises work",
        description:
          "Stylists who perform services off-site or at client locations may create coverage questions for tools, equipment, and liability away from the fixed premises. Mobile or home-based personal services may also trigger public health requirements depending on the operation — regulatory compliance is separate from insurance coverage.",
      },
      {
        title: "Public health and personal service settings",
        description:
          "Ontario personal service settings may be subject to public health requirements depending on the services offered and how the operation is set up. Compliance supports safe operations but does not replace liability or treatment coverage. Insurers may ask about sanitation and service types during underwriting — that is an evaluation factor, not a coverage product.",
      },
    ],
    relatedLinks: [
      { label: "Fitness / Gym", href: "/fitness-gym-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
    ],
    faqTitle: "Salon & barber FAQ",
    faqItems: [
      {
        question: "Are chemical burns and allergic reactions covered?",
        answer:
          "Treatment or professional liability may help respond to certain claims alleging injury, burns, or allergic reaction from services you performed — subject to policy terms, disclosed services, and exclusions. A premises slip-and-fall is a different claim type from a colour reaction. Confirm which coverage applies and whether your service menu is fully disclosed to your broker.",
      },
      {
        question: "Do booth renters need their own insurance?",
        answer:
          "Often yes — booth or chair renters are frequently treated as independent operators requiring their own liability coverage rather than automatic coverage under the salon owner's policy. Salon owners should verify renter insurance requirements in lease agreements and disclose the staffing model to their broker.",
      },
      {
        question: "Do I need different coverage for waxing, nails, or laser services?",
        answer:
          "Advanced esthetics, laser, injections, and other higher-risk services may need specific disclosure and may not be included under standard salon wording. Do not assume a hair-focused policy automatically covers every personal-service modality — review your full menu with your broker before adding new treatments.",
      },
      {
        question: "Are tools covered if I work mobile or off-premises?",
        answer:
          "Equipment at a fixed shop location may be insured differently from tools used off-premises or by mobile stylists. Property coverage for portable gear and liability for services performed away from the salon depend on policy wording — disclose mobile or home-based work to your broker rather than assuming standard shop coverage extends automatically.",
      },
      {
        question: "What should I disclose when requesting a quote?",
        answer:
          "Service menu, number of stations, employee vs. booth-renter model, retail product sales, chemical services offered, mobile or off-premises work, prior claims, and any plans to add nails, waxing, laser, or other advanced treatments. Incomplete disclosure can affect whether a future claim falls within policy terms.",
      },
    ],
    ctaHeading: "Run a salon or barber shop?",
    ctaSubhead:
      "Share your services, staff structure, and product sales — we will compare personal care coverage.",
    serviceName: "Salon & Barber Insurance",
  },
];

export const commercialProductSpecialtyPages: ProductPageContent[] = [
  {
    slug: "non-profit-insurance",
    category: "commercial",
    metaTitle:
      "Non-Profit Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Non-profit and charity insurance through an independent Windsor-Essex broker — general liability, D&O, property, and volunteer coverage for community organizations.",
    headline: "Non-Profit Insurance",
    subhead:
      "Charities and non-profits combine program delivery, volunteer involvement, and board governance into exposures that differ from a typical small business — even when the day-to-day work looks similar. Depending on your organization, that can mean general liability for events and program locations, directors and officers coverage for governance claims, property coverage for office contents and donated goods, volunteer accident coverage where purchased, and — for programs serving children or vulnerable persons — abuse or misconduct coverage reviewed separately. Not every non-profit needs the same coverage stack; a community sports league, a social service agency, and a grant-making foundation face different profiles. Premium Insurance Brokers can help align insurance to your programs, funding requirements, and governance structure.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Non-Profit Quote",
    coverageIntro:
      "Non-profit insurance usually addresses premises and program liability, board governance exposure, property supporting your mission, and — where relevant — volunteer injury and abuse or misconduct coverage — depending on your programs, lease arrangements, and funder requirements.",
    coverageTypes: [
      {
        title: "General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from your operations, events, offices, and program locations — subject to policy terms, exclusions, and limits.",
        detailTitle: "When a program participant injury becomes an organization claim",
        detailDescription:
          "Community programs, fundraising events, food drives, and leased facility operations can generate third-party injury or property-damage claims against the organization — distinct from a board governance dispute or an employee injury covered elsewhere. Whether a specific event, off-site program, or volunteer activity is covered depends on policy wording and what was disclosed during underwriting. Funder and venue certificate requirements are contractual — separate from what any single policy automatically includes.",
        icon: Briefcase,
      },
      {
        title: "Directors & Officers",
        shortLabel: "D&O",
        description:
          "May help respond to certain claims alleging wrongful acts in governance or management decisions by directors, officers, and the organization — subject to policy terms, exclusions, and limits.",
        detailTitle: "Board decisions can generate claims separate from program injury",
        detailDescription:
          "Directors and officers of Ontario non-profits have governance duties under applicable corporate law, including the Ontario Not-for-Profit Corporations Act where it applies — but D&O insurance does not eliminate those statutory duties. It may help respond to certain claims alleging mismanagement, financial oversight failures, or employment-related governance disputes, depending on policy wording. D&O addresses a different exposure from general liability for premises or program injury.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover office contents, equipment, donated goods inventory, and other business personal property against covered causes of loss — subject to policy terms, valuation, and limits.",
        detailTitle: "Donated goods and program equipment still have insurable value",
        detailDescription:
          "Non-profits often operate from leased space with contents, computers, program supplies, and donated inventory that represent real property exposure — even when the organization does not own the building. Donated goods may need scheduled values and specific causes of loss. Property coverage for leased premises is separate from the landlord's building insurance — confirm what you are responsible for insuring under your lease.",
        icon: Building2,
      },
      {
        title: "Volunteer Accident",
        shortLabel: "Volunteers",
        description:
          "May provide limited medical or accident benefits for volunteers injured while serving the organization — where purchased and subject to policy terms, limits, and exclusions.",
        detailTitle: "Volunteer injury is not always the same as employee WSIB coverage",
        detailDescription:
          "Community and charitable volunteers who serve without pay are generally not covered under WSIB the way paid workers are — WSIB treats most unpaid volunteer service separately from mandatory employer coverage. Paid employees and certain special statutory categories — such as municipal volunteer fire or ambulance brigades — may fall under different WSIB rules. Optional volunteer accident insurance, where purchased, may address limited medical expenses for volunteers injured during approved activities — subject to policy terms. It does not replace WSIB where that coverage applies to paid workers, and it does not replace general liability for third-party claims or abuse coverage where programs serve vulnerable persons.",
        icon: Users,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex charities, foundations, community organizations, and social-service agencies — reviewed through an independent broker who can coordinate liability, governance, property, and program-specific coverage for how you actually operate.",
    considerations: [
      {
        title: "Board governance and D&O coverage",
        description:
          "Directors and officers of Ontario non-profits have governance responsibilities under applicable corporate law. D&O insurance may help respond to certain claims alleging wrongful governance or management acts — but it does not eliminate statutory director duties and is separate from general liability for program injury. Board-governed organizations should review D&O alongside general liability rather than treating one policy as comprehensive protection.",
      },
      {
        title: "Volunteers vs. employees",
        description:
          "Paid employees, part-time staff, and unpaid volunteers create different injury and liability profiles. Most community volunteers are not automatically WSIB-covered; paid workers may require WSIB registration depending on your organization's industry and activities. Certain special statutory volunteer forces — such as municipal fire or ambulance brigades — follow different rules. Optional volunteer accident insurance, where purchased, is limited and separate from WSIB — disclose how your organization uses volunteers and paid staff during underwriting.",
      },
      {
        title: "Abuse and misconduct coverage — conditional on your programs",
        description:
          "Organizations serving children, youth, or vulnerable persons may need abuse or misconduct liability reviewed as a distinct coverage — not assumed to be included in general liability. Insurers offering this coverage often review screening, supervision, and safety practices during underwriting. A food bank or arts council without vulnerable-person programming may not need the same structure as a youth mentorship agency.",
      },
      {
        title: "Fundraising events and temporary locations",
        description:
          "Galas, fun runs, festivals, and pop-up program locations can extend liability beyond your primary address. Large or high-risk events may need separate event liability review depending on size, activities, and venue contract requirements. Bring event contracts to your broker so certificates match what you agreed to.",
      },
      {
        title: "Donated property, contents, and leased facilities",
        description:
          "Donated inventory, thrift goods, and program supplies may need scheduled values under property coverage. Leased offices and program space require clarity on what the organization insures versus what the landlord covers — property for tenant contents is separate from the building owner's policy.",
      },
      {
        title: "Funder and partner certificate requirements",
        description:
          "Grants, municipal partnerships, and facility-use agreements often specify minimum general liability or D&O limits — contractual requirements from the funder or partner, not universal provincial insurance mandates for all non-profits. Maintain copies of what each relationship actually requires.",
      },
    ],
    relatedLinks: [
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Religious Organizations", href: "/religious-organizations-insurance/" },
    ],
    faqTitle: "Non-profit FAQ",
    faqItems: [
      {
        question: "Does our board need D&O insurance?",
        answer:
          "Board-governed non-profits can face claims alleging governance or management failures — separately from general liability for program injury. D&O coverage, where purchased, may help respond to certain claims against directors and officers subject to policy terms. It does not eliminate statutory director duties under applicable corporate law. Many organizations carry D&O to support board recruitment, but the appropriate structure depends on your governance model.",
      },
      {
        question: "Are volunteers covered if injured while serving?",
        answer:
          "Volunteer accident coverage, where purchased, may provide limited medical benefits for volunteers injured during approved activities — subject to policy terms. Community and charitable volunteers who serve without pay are generally not covered under WSIB the way paid workers are. Paid employees may require WSIB registration depending on your organization's industry and activities. General liability may address certain third-party claims, but volunteer medical expenses are a separate coverage question — review with your broker.",
      },
      {
        question: "Do we need abuse coverage for our programs?",
        answer:
          "Organizations serving children, youth, or vulnerable persons should review abuse or misconduct liability as a distinct coverage — not assumed to be included in general liability. Insurers offering it often review screening and supervision practices during underwriting. Organizations without vulnerable-person programming may not need the same structure — disclose your actual programs to your broker.",
      },
      {
        question: "Are fundraising events covered under our general liability?",
        answer:
          "Certain program and event activities may fall within a general liability policy depending on wording, but large fundraisers, amusement activities, or events with alcohol may need separate review or event liability coverage. Venue and municipal contracts often require specific limits or additional-insured certificates — contractual requirements reviewed against your policy.",
      },
      {
        question: "Do funders or municipalities require insurance certificates?",
        answer:
          "Grants, facility-use agreements, and municipal partnerships often specify minimum general liability or D&O limits — requirements from the funder or partner, not a single provincial mandate for all non-profits. Certificate wording must match what each agreement actually requires rather than assuming one standard certificate satisfies every relationship.",
      },
    ],
    ctaHeading: "Lead a non-profit organization?",
    ctaSubhead:
      "Tell us about your programs, volunteers, and board — we will compare nonprofit coverage options.",
    serviceName: "Non-Profit Insurance",
  },
  {
    slug: "religious-organizations-insurance",
    category: "commercial",
    metaTitle:
      "Religious Organization Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Church and religious organization insurance — property, liability, abuse coverage, and event exposure for Windsor-Essex faith communities.",
    headline: "Religious Organization Insurance",
    subhead:
      "Coverage for churches, temples, and faith communities — worship premises, events, pastoral counselling liability, and property.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Church Quote",
    coverageIntro:
      "Religious organizations combine property, congregation liability, and sensitive counselling and youth program exposures.",
    coverageTypes: [
      {
        title: "Commercial Property",
        description:
          "Covers sanctuaries, halls, offices, and contents including audio-visual equipment.",
        icon: Church,
      },
      {
        title: "General Liability",
        description:
          "Addresses injury claims on premises, parking lots, and during congregational activities.",
        icon: Briefcase,
      },
      {
        title: "Pastoral Counselling Liability",
        description:
          "May address professional counselling claims, subject to policy definitions and qualifications.",
        icon: Shield,
      },
      {
        title: "Abuse & Molestation",
        description:
          "Critical coverage for organizations with youth and vulnerable population programs.",
        icon: Users,
      },
    ],
    whoItIsFor:
      "Religious organization insurance is for Windsor-Essex churches, mosques, synagogues, temples, and faith-based community centres.",
    relatedLinks: [
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Daycare / Private School", href: "/daycare-private-school-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
    ],
    faqTitle: "Religious organization FAQ",
    faqItems: [
      {
        question: "Is the pastor covered for counselling?",
        answer:
          "Pastoral professional liability may apply depending on credentials and policy wording. Disclose all counselling services.",
      },
      {
        question: "Are rental hall users covered?",
        answer:
          "Third-party renters may need their own event liability. Your policy may require additional insured certificates from renters.",
      },
      {
        question: "Do youth programs need special coverage?",
        answer:
          "Youth ministries typically require abuse and molestation coverage and background check protocols.",
      },
      {
        question: "Is heritage building construction a factor?",
        answer:
          "Older sanctuaries may have unique valuation and restoration requirements. Accurate building values matter.",
      },
    ],
    ctaHeading: "Insure a faith community?",
    ctaSubhead:
      "Share your facilities, programs, and congregation activities — we will compare religious organization programs.",
    serviceName: "Religious Organization Insurance",
  },
  {
    slug: "daycare-private-school-insurance",
    category: "commercial",
    metaTitle:
      "Daycare & Private School Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Daycare and private school insurance — liability, abuse coverage, property, and student injury for Windsor-Essex childcare and education providers.",
    headline: "Daycare & Private School Insurance",
    subhead:
      "Licensed child-care operations in Ontario have specific insurance obligations. Ontario Regulation 137/15, s. 71 requires licensees to maintain insurance that includes comprehensive general liability and personal injury coverage and, where the licensee owns vehicles, motor vehicle coverage for those vehicles. Ontario's licensing guidance also tells operators to make their broker aware of activities such as transportation, field trips, volunteers, contractual liability and board/officer exposures. Private schools and other education operations have different insurance considerations, which should be reviewed based on how they operate.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a School Quote",
    coverageIntro:
      "Childcare and private education combine premises liability, professional supervision duties, and sensitive abuse exposures.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect the operation against certain third-party bodily injury, personal injury, and property-damage claims arising from the premises or operations, subject to policy terms, exclusions, and limits.",
        detailTitle: "When everyday accidents become liability claims",
        detailDescription:
          "Slips on wet floors, playground incidents, and damage to a visitor's property can lead to third-party claims. For daycares and schools, these exposures often involve children, parents, and volunteers on your premises — coverage and limits depend on how your operation is structured and what your policy includes.",
        icon: Briefcase,
      },
      {
        title: "Property",
        description:
          "May help cover your building (if owned), contents, and outdoor or playground property, depending on the causes of loss and endorsements included in your policy.",
        detailTitle: "Protecting the spaces children learn and play in",
        detailDescription:
          "Depending on policy structure, property coverage may address classroom contents, furniture, learning materials, office equipment, and outdoor or playground property. If you own the building, that structure may also be insurable — what is covered and how claims are paid depends on causes of loss, endorsements, and policy terms.",
        icon: Building2,
      },
      {
        title: "Abuse & Molestation Liability",
        description:
          "A distinct coverage addressing allegations of abuse, harassment, or misconduct involving staff, volunteers, or others connected with your operation — insurers offering this coverage frequently require documented safety and screening practices as part of underwriting it.",
        detailTitle: "A coverage that needs to be addressed specifically",
        detailDescription:
          "This is separately underwritten from general liability and should not be assumed to be included. Insurers that offer it often review screening, supervision, and safety practices as part of underwriting. For childcare and education operations, discussing this coverage directly with your broker is an important part of the insurance review.",
        icon: Shield,
      },
      {
        title: "Professional Liability",
        description:
          "May respond to certain claims alleging errors, omissions, or breaches of professional duty in providing educational or care-related services. The scope varies by operation and policy wording.",
        detailTitle: "Protection for professional and care-related decisions",
        detailDescription:
          "Educational and care-related services can involve allegations about instruction, supervision, or professional judgment. Whether a given claim falls within professional liability depends on the allegation and policy wording — it should be reviewed alongside general liability rather than treated as interchangeable coverage.",
        icon: Baby,
      },
      {
        title: "Directors & Officers",
        description:
          "For operations governed by a board, D&O insurance may help protect directors, officers, and the organization against certain claims alleging wrongful acts in governance or management decisions, subject to the policy.",
        detailTitle: "Protection for the people making governance decisions",
        detailDescription:
          "Board-governed schools and larger childcare organizations can face claims tied to governance, financial oversight, or management decisions. D&O coverage addresses a different set of exposures than employment practices liability — whether it is appropriate depends on your organization's structure and should be reviewed with your broker.",
        icon: Users,
      },
      {
        title: "Business Interruption",
        description:
          "May help with lost business income and certain continuing expenses when operations are interrupted by a covered loss, subject to the policy's waiting periods, limits, and terms.",
        detailTitle: "When a covered loss forces operations to stop",
        detailDescription:
          "If a covered property loss closes classrooms or disrupts enrollment, business interruption coverage may respond to lost income and certain continuing expenses — subject to waiting periods, limits, and policy terms. For operations that rely on steady enrollment and licensed capacity, understanding these conditions is part of planning for continuity.",
        icon: Store,
      },
    ],
    whoItIsFor:
      "Daycare and private school insurance is for Windsor-Essex licensed daycares, Montessori schools, private academies, and before-and-after school programs.",
    considerations: [
      {
        title: "Broker disclosures Ontario licensing guidance expects",
        description:
          "Ontario's own child-care licensing guidance specifically directs operators to make sure their broker is aware of:",
      },
      {
        title: "Transportation of children",
        description:
          "Vans, buses, or any vehicle used for the operation",
      },
      {
        title: "Field trips",
        description:
          "Activities that move outside the regular premises",
      },
      {
        title: "Volunteers",
        description:
          "How volunteers are covered relative to employees",
      },
      {
        title: "Contractual liability",
        description:
          "Obligations taken on through agreements with landlords, service system managers, or other parties",
      },
      {
        title: "Liability of board members/officers",
        description:
          "Relevant for board-governed schools and larger childcare organizations",
      },
      {
        title: "Licensing status affects your insurance obligations directly",
        description:
          "Ontario Regulation 137/15 s. 71 applies specifically to licensed operators; unlicensed arrangements are structured differently under provincial rules, which affects what coverage applies and what's expected.",
      },
      {
        title: "Abuse liability coverage typically comes with real conditions",
        description:
          "Documented screening and supervision practices are commonly part of what insurers require to offer this coverage, not just a premium.",
      },
      {
        title: "Did you know?",
        description:
          "Ontario's regulation also addresses incident records, anaphylaxis policies, and first-aid/CPR certification requirements. These are operational/regulatory requirements, not insurance coverage Premium's policies address directly — they're mentioned here only to illustrate why a childcare operation's risk profile is genuinely different from an ordinary commercial occupancy.",
      },
    ],
    relatedLinks: [
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Employment Practices Liability", href: "/employment-practices-liability-insurance/" },
    ],
    faqTitle: "Daycare & private school FAQ",
    faqItems: [
      {
        question: "Does insurance cover allegations of abuse at a daycare or school?",
        answer:
          "Abuse and molestation liability is typically its own distinct coverage, separate from general liability — it shouldn't be assumed to be automatically included. Insurers offering this coverage often require documented safety and screening practices as part of underwriting it. This is worth discussing directly and specifically.",
      },
      {
        question: "What's the difference between general liability and abuse liability coverage?",
        answer:
          "General liability typically addresses bodily injury or property damage claims broadly. Abuse liability is a separate, specifically-underwritten coverage addressing allegations of misconduct — these are genuinely distinct products, not variations of the same coverage.",
      },
      {
        question: "Do private schools need directors and officers insurance?",
        answer:
          "If your school or centre is governed by a board, D&O insurance should be considered as part of the insurance review because directors and officers can face exposures arising from governance and management decisions. The need and appropriate coverage depend on the organization's structure and policy terms.",
      },
      {
        question: "What if we transport children in a van or bus?",
        answer:
          "If your operation transports children, tell your broker exactly how transportation is provided, who owns the vehicle and how it's used. Ontario's child-care licensing guidance specifically identifies transportation as something licensees should disclose to their insurance broker, and s. 71 requires motor vehicle coverage for vehicles owned by the licensee.",
      },
      {
        question: "Do I need special insurance if I provide child care from my home?",
        answer:
          "Don't assume your personal home insurance policy automatically covers a home-based child-care operation. Coverage for business activities varies by insurer and policy, and Ontario's licensing and insurance requirements also differ depending on how the operation is structured — whether it's licensed, agency-affiliated, how many children are cared for, and whether there are employees. Tell your broker these specifics so the right coverage can actually be reviewed.",
      },
    ],
    ctaHeading: "Operate a daycare or private school?",
    ctaSubhead:
      "Tell us about enrollment, facilities, and programs — we will compare education and childcare coverage.",
    serviceName: "Daycare & Private School Insurance",
  },
  {
    slug: "event-liability-insurance",
    category: "commercial",
    metaTitle:
      "Event Liability Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Event liability insurance through an independent Windsor-Essex broker — short-term third-party liability for festivals, weddings, fundraisers, and vendor markets.",
    headline: "Event Liability Insurance",
    subhead:
      "Event liability insurance addresses third-party injury and property-damage claims arising from a specific event you host — weddings, festivals, fundraisers, corporate functions, or vendor markets — on defined dates and at stated locations. It is not a substitute for a venue owner's policy, your own property coverage for equipment, or cancellation insurance for weather or low attendance. Venues, municipalities, and rental contracts often require proof of liability insurance with minimum limits or additional-insured wording — those are contractual requirements, not a single provincial event-insurance mandate. Where alcohol is served under a Special Occasion Permit or host-liquor arrangement, liquor-related liability may need separate review. Premium Insurance Brokers can help structure coverage to match your event type, attendance, activities, and certificate requirements.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get an Event Quote",
    coverageIntro:
      "Event liability focuses on third-party bodily injury and property-damage claims tied to a defined event — separate from ongoing business insurance, venue policies that protect the property owner, and optional products such as cancellation or own-equipment coverage.",
    coverageTypes: [
      {
        title: "Third-Party Bodily Injury",
        shortLabel: "Injury Claims",
        description:
          "May help respond to certain claims alleging attendee or guest bodily injury during your event — trips, falls, crowd incidents, or setup-related injuries — subject to policy terms, exclusions, and limits.",
        detailTitle: "A wedding reception trip-and-fall is an event-host exposure",
        detailDescription:
          "Temporary events concentrate people in unfamiliar layouts — tents, dance floors, vendor aisles, staging, and parking areas — where trips, falls, and crowd incidents can generate third-party injury claims against the event host. Event liability policies are written for defined dates, locations, and attendance; whether a specific activity, amusement device, or sporting element is covered depends on policy wording and what you disclosed during underwriting. This coverage addresses host liability — not the venue owner's own policy, which protects the venue's interests.",
        icon: Briefcase,
      },
      {
        title: "Property Damage",
        shortLabel: "Property Damage",
        description:
          "May help respond to certain claims for damage to rented venues, neighbouring property, or third-party equipment caused during your event setup, operation, or teardown — subject to policy terms and limits.",
        detailTitle: "Damage to a rented hall is a different claim than an injury",
        detailDescription:
          "Event setup and teardown can damage rented floors, walls, landscaping, or neighbouring property — claims distinct from bodily injury. Coverage for damage to premises you rent or borrow depends on policy wording, deductibles, and whether the rental contract assigns repair responsibility. Your broker should review lease or venue agreements alongside the policy to confirm what must be insured and what certificates the venue requires.",
        icon: Building2,
      },
      {
        title: "Liquor Liability (Events)",
        shortLabel: "Host Liquor",
        description:
          "May address certain alcohol-related liability when you serve or permit alcohol at your event under a Special Occasion Permit, host-liquor arrangement, or licensed venue service — distinct from ongoing premises liquor liability, subject to policy terms.",
        detailTitle: "Serving alcohol at a one-night event is not the same as running a bar",
        detailDescription:
          "Weddings, fundraisers, and corporate functions often involve alcohol service under a Special Occasion Permit, bring-your-own arrangements, or service at a licensed venue — each with different AGCO rules and responsibilities. LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance — but venues, municipalities, and rental contracts frequently do. Host liquor or event liquor coverage, where available, is underwritten separately from premises liquor liability; service model, permit type, attendance, and whether you control service must be disclosed to your broker. A Special Occasion Permit authorizes legal alcohol service; it is not insurance.",
        icon: Wine,
      },
      {
        title: "Vendor & Exhibitor Coverage",
        shortLabel: "Vendors",
        description:
          "May extend certain liability coverage to participating vendors or exhibitors under one event policy where purchased — subject to how the policy schedules vendors, limits, and additional-insured requirements.",
        detailTitle: "Market organizers may need to address vendor exposure",
        detailDescription:
          "Farmers' markets, trade shows, and festival organizers sometimes need coverage structures that address participating vendors — whether through a master event policy with vendor extensions or by requiring each vendor to carry their own certificate. Contractual additional-insured and waiver-of-subrogation wording from venues or municipalities must be matched to what your policy can actually provide. Confirm vendor limits, setup/teardown periods, and whether amusement operators need separate coverage before the event date.",
        icon: Calendar,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex event organizers, wedding hosts, festival committees, farmers' market operators, and vendors when venues or permits require certificates — reviewed through an independent broker who can align short-term liability coverage to your event dates, activities, and contractual requirements.",
    considerations: [
      {
        title: "Venue certificate requirements",
        description:
          "Venues, banquet halls, and private property owners often require proof of liability insurance with minimum limits, additional-insured status, or waiver-of-subrogation wording in the event contract. Those are contractual requirements from the property owner — not the same thing as a provincial insurance mandate. Bring event contracts to your broker so certificates match what you actually agreed to.",
      },
      {
        title: "Municipal permit insurance specifications",
        description:
          "Municipal event or special-occasion permits may specify insurance limits or certificate wording as part of the permit process. Requirements vary by municipality and event type — do not generalize one city's permit conditions across Windsor-Essex or Ontario. Confirm what your specific permit application or by-law actually requires.",
      },
      {
        title: "Special Occasion Permit vs. venue Liquor Sales Licence",
        description:
          "A Special Occasion Permit authorizes temporary alcohol service at defined events outside licensed establishments. A venue's standing Liquor Sales Licence covers service at that licensed premises — different regulatory instruments with different responsibilities. LCBO's SOP FAQ confirms provincial regulations do not require permit holders to carry party liability insurance, though venues may require it contractually. Disclose which authorization applies to your event.",
      },
      {
        title: "Amusements, inflatables, and high-risk activities",
        description:
          "Inflatables, rides, fireworks, sporting events, and other high-risk activities may need specific endorsements or separate coverage from the amusement operator — not automatic inclusion in a base event liability policy. Disclose all activities, contractors, and equipment to your broker before the event date.",
      },
      {
        title: "Event dates, attendance, and underwriting disclosures",
        description:
          "Event policies are typically written for specific dates, locations, setup/teardown periods, and expected attendance. Changes to venue, capacity, or activities after binding may affect coverage. Provide accurate attendance estimates, activity descriptions, and any prior claims history during underwriting.",
      },
      {
        title: "What event liability does not cover",
        description:
          "Event liability generally addresses third-party injury and property-damage claims — not cancellation due to weather or low attendance, damage to your own equipment, employee injuries covered by WSIB, or regulatory fines. Cancellation insurance, property coverage for owned gear, and liquor liability may each require separate review depending on your event.",
      },
    ],
    relatedLinks: [
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
    ],
    faqTitle: "Event liability FAQ",
    faqItems: [
      {
        question: "Can I buy coverage for a single day or weekend event?",
        answer:
          "Event policies are often written for specific dates, locations, setup and teardown periods, and defined attendance — subject to underwriting review. Short-term event liability is distinct from an ongoing commercial general liability policy for a permanent business. Confirm effective dates and any activity restrictions with your broker before the event.",
      },
      {
        question: "Does the venue's insurance cover my event as the host?",
        answer:
          "A venue owner's policy typically protects the venue's interests — not necessarily your organization as the event host or organizer. Venues often require you to carry your own liability insurance and name them as additional insured on your certificate. Review your rental or venue agreement against what your policy can provide.",
      },
      {
        question: "What do municipalities or venues typically require in event contracts?",
        answer:
          "Permit applications and venue contracts often specify minimum liability limits, additional-insured wording, waiver of subrogation, or certificate deadlines — requirements from the municipality or property owner, not a universal provincial insurance mandate. Requirements vary by municipality, venue, and event type. Bring your contract to your broker so certificates match what you agreed to.",
      },
      {
        question: "Is alcohol-related liability included if we serve wine at our reception?",
        answer:
          "Alcohol service at events may involve a Special Occasion Permit, host-liquor arrangement, or service at a licensed venue — each with different AGCO rules. Host liquor or event liquor coverage, where available, is often underwritten separately from standard event liability. A permit authorizes legal service; it is not insurance. Disclose alcohol plans to your broker before the event date.",
      },
      {
        question: "Are inflatables or amusement rides covered under event liability?",
        answer:
          "Amusement devices, inflatables, and rides may require specific endorsements or separate coverage from the ride operator — not automatic inclusion in every event liability policy. Disclose all activities and contractor arrangements during underwriting so coverage matches what you are actually hosting.",
      },
    ],
    ctaHeading: "Planning an event?",
    ctaSubhead:
      "Share event date, location, attendance, and activities — we will help structure liability coverage around your event and venue certificate requirements.",
    serviceName: "Event Liability Insurance",
  },
  {
    slug: "liquor-liability-insurance",
    category: "commercial",
    metaTitle:
      "Liquor Liability Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Liquor liability insurance for Windsor-Essex — bars, restaurants, event hosts, and AGCO-licensed establishments serving alcohol.",
    headline: "Liquor Liability Insurance",
    subhead:
      "Liquor liability insurance helps protect bars, restaurants, caterers, event hosts, and other businesses that sell or serve alcohol against certain alcohol-related liability claims. If alcohol service contributes to an injury or property damage, the resulting claim may fall outside standard commercial general liability coverage or be limited by policy wording. Premium Insurance Brokers can help you understand how liquor liability fits with your existing business insurance, your AGCO authorization, and the way you actually serve alcohol.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=restaurant`,
    quoteLabel: "Get a Liquor Liability Quote",
    coverageIntro:
      "Liquor liability may help respond to certain claims tied to alcohol service or permitted events — coverage that, depending on the policy, may be excluded, restricted, sub-limited, or require separate liquor liability coverage alongside standard commercial general liability.",
    coverageTypes: [
      {
        title: "Patron Injury & Property Damage",
        shortLabel: "Patron Claims",
        description:
          "May help respond to certain claims alleging that a patron served alcohol at your licensed premises or permitted event caused bodily injury or property damage to a third party, subject to policy terms, exclusions, and limits.",
        detailTitle: "When service at the bar becomes a third-party claim",
        detailDescription:
          "Claims that a patron was overserved, or that alcohol contributed to a crash, assault, or other harm after leaving, are a core civil exposure AGCO's licensing guides describe separately from administrative licence penalties. Depending on the policy, alcohol-related third-party injury and property-damage claims may be excluded, sub-limited, or addressed through liquor liability coverage purchased alongside general liability. What triggers coverage, who qualifies as an insured, and whether the claim arose from on-premises service versus a permitted off-site event depend on policy wording — confirm scope with your broker.",
        icon: Wine,
      },
      {
        title: "Assault & Battery",
        shortLabel: "Altercations",
        description:
          'May address certain altercation or security-incident claims linked to alcohol service at your premises or event, where included in the policy. Insurance policies commonly refer to this exposure as "assault and battery" — confirm whether it is covered, capped, or excluded in your wording.',
        detailTitle: "When an altercation leads to a liability claim",
        detailDescription:
          "Late-night service, crowded patios, and special events can generate altercation or security-response allegations tied to intoxicated patrons — losses carriers often treat differently from a simple slip-and-fall. Depending on the policy, assault-and-battery coverage may be included, sub-limited, or excluded, particularly where security or crowd-control exposures are involved. Your broker should review whether your expected crowd-control and service hours are reflected in the coverage you are purchasing.",
        icon: Briefcase,
      },
      {
        title: "Legal Defence",
        shortLabel: "Defence Costs",
        description:
          "May help with legal defence costs for covered liquor liability claims, subject to policy terms, deductibles or retentions, and whether the underlying allegation falls within the insuring agreement.",
        detailTitle: "Defence costs can accrue before fault is determined",
        detailDescription:
          "Civil claims alleging overservice or alcohol-related harm can require immediate legal response — even when you believe service was responsible. Where defence coverage applies, how legal costs are handled depends on the policy wording, including applicable deductibles, retentions, limits and exclusions. Treatment of punitive damages, regulatory fines, and administrative proceedings also depends on policy wording — do not assume they are covered or excluded without review. AGCO licence suspension or revocation is a regulatory enforcement action, separate from a third-party civil lawsuit.",
        icon: Shield,
      },
      {
        title: "Event Host Liquor",
        shortLabel: "Host / Event",
        description:
          "May address certain alcohol-related liability for temporary events, bring-your-own functions, or service under a Special Occasion Permit or caterer's authorization — distinct from ongoing premises liquor liability under a Liquor Sales Licence, subject to policy terms.",
        detailTitle: "A one-night event is not the same risk profile as a licensed bar",
        detailDescription:
          "Weddings, fundraisers, corporate functions, and catered off-site service often rely on Special Occasion Permits, Caterer's Endorsements, or host-liquor arrangements rather than a standing Liquor Sales Licence at a fixed address. LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance — but venues, municipalities, and rental contracts frequently do. Host liquor or event liquor coverage, where available, is often underwritten separately from premises liquor liability; service model, permit type, attendance, and whether you control service must be disclosed to your broker.",
        icon: Calendar,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex bars, restaurants, breweries, caterers with alcohol service, event hosts under Special Occasion Permits, and other AGCO-authorized sellers — reviewed through an independent broker who can confirm how liquor liability fits alongside your existing business coverage.",
    considerations: [
      {
        title: "Licence type determines your regulatory framework",
        description:
          "AGCO authorizes alcohol through different instruments — Liquor Sales Licence (ongoing on-premises service), Special Occasion Permit (temporary events), Caterer's Endorsement (off-site service tied to an existing licence), and retail licences for convenience or grocery stores. Each has different obligations and service models. Your broker needs to know which authorization applies because insurance structure follows how and where alcohol is legally sold or served — not every licence type maps to the same liquor liability wording.",
      },
      {
        title: "Civil liability is not the same as carrying insurance",
        description:
          "Businesses that sell or serve alcohol can face civil liability when alcohol service contributes to harm — separately from AGCO licensing or enforcement consequences. AGCO's Section 1 Liquor Sales Licence guide states that, beyond administrative sanctions, you may be held civilly liable for harm caused by someone who was served liquor in your business, and recommends consulting a legal advisor and insurance professional. That civil exposure exists independently of whether you purchase coverage. The Liquor Licence and Control Act authorizes licensing and sets regulatory standards; it does not, by itself, mandate liquor liability insurance as a statutory condition of holding a licence.",
      },
      {
        title: "Contractual proof of insurance is different from a provincial insurance mandate",
        description:
          "A landlord, venue, municipality, franchise, or lender may separately require proof of liquor liability insurance under a lease, event contract, or other agreement. Those contractual requirements are separate from provincial licensing requirements. Maintain copies of what each counterparty actually requires rather than assuming one certificate satisfies every relationship.",
      },
      {
        title: "Responsible-service training depends on your authorization — and is not insurance",
        description:
          "Training requirements differ by licence or authorization type. Liquor Sales Licence and related endorsements (including Caterer's Endorsement): Registrar Standard 4.1 requires persons involved in the sale, service, sampling, or delivery of liquor — and security staff employed by the licensee — to hold valid certification from an AGCO Board-approved training program (commonly Smart Serve for on-premises service). Special Occasion Permit: LCBO's SOP FAQ states Smart Serve is not a requirement for permit holders, though training is recommended. Standard 4.1's mandatory training list does not include Special Occasion Permit among its applicable authorization types. Convenience or grocery retail: separate AGCO Board-approved liquor retail training programs apply to retail store employees under the Registrar's Standards for Grocery and Convenience Stores. Training supports regulatory compliance and responsible service but does not replace liquor liability coverage. Insurers may ask about training during underwriting — that is an evaluation factor, not a coverage product.",
      },
      {
        title: "Special Occasion Permits versus a Liquor Sales Licence",
        description:
          "A Liquor Sales Licence authorizes ongoing alcohol service at licensed premises. A Special Occasion Permit authorizes temporary sale or service at defined events — private, public/charity, bring-your-own, and other categories with different rules. LCBO's Special Occasion Permit FAQ confirms provincial regulations do not require permit holders to carry party liability insurance, though venues may require it contractually. If your operation spans both models, disclose each scenario to your broker rather than relying on a single premises policy.",
      },
      {
        title: "Caterers, mobile bars, and off-site service",
        description:
          "Ontario does not issue a standalone mobile bar licence to food trucks or roaming operators. Off-site alcohol service typically requires a Caterer's Endorsement on an existing Liquor Sales Licence or an appropriate Special Occasion Permit at the event location. A caterer serving under a Caterer's Endorsement does not need a separate SOP for that catered event, but the licence holder remains responsible for compliance. Liquor liability for off-site service may need to be confirmed separately from premises coverage — especially when you serve at venues you do not control.",
      },
      {
        title: "How liquor liability relates to your underlying business policy",
        description:
          "Restaurants, bars, hotels, and event venues often carry a commercial package policy with general liability — but depending on the policy, alcohol-related liability may be excluded, restricted, sub-limited, or require separate liquor liability coverage. Liquor liability may be purchased as an endorsement, within a hospitality package, or as a standalone policy depending on carrier and operation. Confirm what your existing restaurant, bar, or event policy actually includes before assuming liquor liability is already in place.",
      },
      {
        title: "Sales mix, hours, and security affect underwriting",
        description:
          "Carriers evaluate alcohol as a percentage of revenue, latest service hours, patron capacity, entertainment, and whether you employ security or crowd-control staff. A wine-focused restaurant, a late-night nightclub, and a one-day charity beer garden present different liquor liability profiles even when all require AGCO authorization.",
      },
      {
        title: "Licence enforcement and civil claims are different",
        description:
          "AGCO administrative action — warnings, monetary penalties, suspension, or revocation of a licence or permit — is regulatory enforcement under the Liquor Licence and Control Act framework. A civil lawsuit from an injured third party is a separate legal track. Liquor liability insurance may help respond to certain covered civil claims and defence costs, subject to policy terms; it does not prevent licence sanctions or substitute for responsible service obligations. Whether regulatory fines, punitive damages, or costs of responding to AGCO proceedings are insured depends on the specific policy wording — confirm with your broker rather than assuming they are always excluded or always covered.",
      },
    ],
    relatedLinks: [
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Hotel / Motel", href: "/hotel-motel-insurance/" },
    ],
    faqTitle: "Liquor liability FAQ",
    faqItems: [
      {
        question: "Does AGCO require liquor liability insurance?",
        answer:
          "No — the Liquor Licence and Control Act does not mandate liquor liability insurance as a statutory condition of holding a Liquor Sales Licence or related AGCO authorization. AGCO's Section 1 Liquor Sales Licence guide states that, beyond administrative sanctions, you may be held civilly liable for harm caused by someone served liquor at your business, and recommends consulting an insurance professional — but that is guidance on civil exposure, not a named insurance requirement for licence issuance. Separately, a landlord, venue, municipality, franchise, or lender may require proof of coverage under a lease, event contract, or other agreement. Those are contractual documentation requirements; they do not change the fact that the Act itself does not prescribe a named insurance product. If you are evaluating whether to purchase coverage, the relevant question is usually whether your operations create civil exposure and whether your general liability policy excludes or limits alcohol-related claims — confirm with your broker.",
      },
      {
        question: "How is liquor liability different from general liability on my business policy?",
        answer:
          "Commercial general liability may help with certain third-party injury or property-damage claims arising from your premises and operations, but depending on the policy, claims tied to alcohol service — including overservice allegations and harm occurring after a patron leaves — may be excluded, sub-limited, or require separate liquor liability coverage. Liquor liability is a distinct coverage product or endorsement meant to address many alcohol-related liability scenarios that CGL may not fully cover. If you already have restaurant, bar, hotel, or event insurance, confirm with your broker whether liquor liability is included, endorsed, or needs to be added separately — do not assume from a policy label alone.",
      },
      {
        question: "What is the difference between a Liquor Sales Licence and a Special Occasion Permit?",
        answer:
          "A Liquor Sales Licence authorizes ongoing sale and service of alcohol at licensed premises such as a restaurant, bar, or hotel lounge. A Special Occasion Permit (SOP) authorizes temporary alcohol service at a defined event — such as a wedding, festival, or charity function — outside the normal standing-licence model. The regulatory rules, permit categories, and service responsibilities differ. LCBO's Special Occasion Permit FAQ states provincial regulations do not require SOP holders to carry party liability insurance, though a venue or municipality may require proof of coverage contractually. Insurance should be structured around how you actually serve alcohol — permanent premises, catered events, bring-your-own functions, or a mix — not assumed from one licence type alone.",
      },
      {
        question: "Do caterers and event hosts need different coverage than a bar or restaurant?",
        answer:
          "Coverage needs depend on your service model and policy wording — not every caterer or event host requires a categorically different product, but the exposures differ. A fixed bar operating under a Liquor Sales Licence has different risks from a caterer serving under a Caterer's Endorsement or a charity hosting a public event under a Special Occasion Permit. Host liquor or event liquor coverage may be relevant when you do not control service in the same way as a licensed establishment, or when alcohol service occurs off your primary premises. Bring-your-own events and temporary venues can also trigger certificate and additional-insured requirements from landlords and municipalities that a standard premises policy may not address. Disclose every service scenario to your broker so coverage can be matched to how you actually operate.",
      },
      {
        question: "What information do I need for a liquor liability quote?",
        answer:
          "Insurers and brokers commonly ask for: licence or permit type (Liquor Sales Licence, Special Occasion Permit, Caterer's Endorsement, or other AGCO authorization), business legal name, premises address(es) and event locations, annual revenue and estimated alcohol sales percentage, seating capacity or expected event attendance, hours of service, entertainment or security arrangements, prior liquor-related claims or incidents, and any landlord, venue, franchise, or municipal insurance requirements in your contracts. Training certification may also be requested during underwriting — for example, Smart Serve for Liquor Sales Licence staff subject to Standard 4.1, or liquor retail training for convenience/grocery staff. Training requirements are set by AGCO standards and differ by authorization type; what an insurer asks about during underwriting is separate from what the law requires for licensing. If you also carry a restaurant, bar, or event policy, bring your existing declarations page so your broker can identify gaps rather than duplicate coverage.",
      },
    ],
    ctaHeading: "Serve alcohol commercially?",
    ctaSubhead:
      "Tell us about your licence, seating, and service model — we will confirm liquor liability is properly in place.",
    serviceName: "Liquor Liability Insurance",
  },
  {
    slug: "crime-fidelity-insurance",
    category: "commercial",
    metaTitle:
      "Crime & Fidelity Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Crime and fidelity insurance for Windsor-Essex businesses — employee dishonesty, theft, forgery, and computer fraud through an independent broker.",
    headline: "Crime & Fidelity Insurance",
    subhead:
      "Protection against internal theft, fraud, and criminal acts that commercial property and liability policies typically exclude.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Crime Quote",
    coverageIntro:
      "Crime policies address losses from employee dishonesty, forgery, theft of money and securities, and computer fraud.",
    coverageTypes: [
      {
        title: "Employee Dishonesty",
        description:
          "Covers theft of money, securities, or property by employees acting fraudulently.",
        icon: Users,
      },
      {
        title: "Forgery & Alteration",
        description:
          "Addresses losses from forged cheques, contracts, or financial documents.",
        icon: Briefcase,
      },
      {
        title: "Theft of Money & Securities",
        description:
          "Covers robbery and theft of cash on premises or in transit to the bank.",
        icon: Shield,
      },
      {
        title: "Computer Fraud",
        description:
          "May cover losses from fraudulent electronic transfers and social engineering schemes.",
        icon: Scale,
      },
    ],
    whoItIsFor:
      "Crime and fidelity insurance is for Windsor-Essex businesses handling cash, payroll, client funds, retail inventory, or financial transactions — especially those with multiple employees and accounting functions.",
    relatedLinks: [
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
    ],
    faqTitle: "Crime & fidelity FAQ",
    faqItems: [
      {
        question: "Does commercial property cover employee theft?",
        answer:
          "Standard property policies exclude theft by employees. Crime coverage specifically addresses insider losses.",
      },
      {
        question: "What is the difference between crime and fidelity bonds?",
        answer:
          "Crime insurance is typically first-party coverage for the business's own losses. Fidelity bonds may also respond to client fund losses in certain professions.",
      },
      {
        question: "Does crime cover wire fraud?",
        answer:
          "Computer fraud and funds transfer fraud endorsements may cover social engineering losses — verify wording with your broker.",
      },
      {
        question: "What controls do carriers require?",
        answer:
          "Dual authorization on transfers, segregation of duties, and background checks are common requirements.",
      },
    ],
    ctaHeading: "Handle cash or client funds?",
    ctaSubhead:
      "Describe your financial controls and exposure — we will compare crime and fidelity options.",
    serviceName: "Crime & Fidelity Insurance",
  },
  {
    slug: "employment-practices-liability-insurance",
    category: "commercial",
    metaTitle:
      "Employment Practices Liability (EPL) in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Employment practices liability insurance for Windsor-Essex — wrongful termination, harassment, and discrimination claims against employers.",
    headline: "Employment Practices Liability (EPL)",
    subhead:
      "Coverage for claims from current, former, and prospective employees alleging wrongful workplace practices.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get an EPL Quote",
    coverageIntro:
      "EPL addresses employment-related claims that general liability and D&O may not fully cover.",
    coverageTypes: [
      {
        title: "Wrongful Termination",
        description:
          "Covers claims alleging improper dismissal or constructive dismissal.",
        icon: Briefcase,
      },
      {
        title: "Harassment & Discrimination",
        description:
          "Addresses claims of workplace harassment, discrimination, and hostile work environment.",
        icon: Scale,
      },
      {
        title: "Retaliation Claims",
        description:
          "Covers allegations that adverse action was taken against an employee who reported misconduct.",
        icon: Shield,
      },
      {
        title: "Defence Costs",
        description:
          "Pays legal defence for covered employment claims regardless of outcome, subject to policy limits.",
        icon: Users,
      },
    ],
    whoItIsFor:
      "EPL insurance is for Windsor-Essex employers with staff — from small teams to larger organizations facing increasing employment litigation exposure.",
    relatedLinks: [
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
    ],
    faqTitle: "Employment practices liability FAQ",
    faqItems: [
      {
        question: "Is EPL the same as WSIB?",
        answer:
          "No. WSIB covers workplace injuries. EPL covers employment litigation — termination, harassment, and discrimination claims.",
      },
      {
        question: "Do small businesses need EPL?",
        answer:
          "Employment claims affect businesses of all sizes. Small employers face the same human rights and employment standards exposure.",
      },
      {
        question: "Does D&O cover employment claims?",
        answer:
          "Some employment claims against directors may fall under D&O, but EPL provides broader workplace coverage for the organization.",
      },
      {
        question: "What HR practices affect underwriting?",
        answer:
          "Written policies, harassment training, and documented discipline procedures support insurability.",
      },
    ],
    ctaHeading: "Employ staff in Ontario?",
    ctaSubhead:
      "Share your team size and HR practices — we will compare EPL options alongside your management liability coverage.",
    serviceName: "Employment Practices Liability Insurance",
  },
];

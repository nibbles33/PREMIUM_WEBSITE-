"use client";

import {
  Anchor,
  Building2,
  CloudLightning,
  Compass,
  DollarSign,
  Droplets,
  Fence,
  Gem,
  HardHat,
  HeartPulse,
  Home,
  KeyRound,
  LifeBuoy,
  Luggage,
  Motorbike,
  Package,
  Phone,
  Plane,
  Scale,
  Shield,
  Sofa,
  Trees,
  Wrench,
} from "lucide-react";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import type { PilotProductPageConfig } from "@/types/pilot-product";

export const pilotPersonalInlineConfigs: Record<string, PilotProductPageConfig> = {
  "home-insurance": buildPilotProductConfig({
    slug: "home-insurance",
    metaTitle: "Home Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Home insurance through an independent Windsor-Essex broker — dwelling, contents, liability, and additional living expenses explained in plain language.",
    headline: "Home Insurance",
    heroLead:
      "Protection for your property, belongings, and liability — whether you own, rent, or somewhere in between.",
    photographySlug: "home-insurance",
    accentColor: "#B37A5A",
    quoteHref: "/get-a-quote?type=home",
    quoteLabel: "Get a Home Quote",
    trustStatement:
      "Home insurance is for Windsor-Essex homeowners, including those with custom or high-value properties where standard dwelling and contents defaults may not reflect true replacement costs for finishes, collections, or outbuildings.",
    coverageIntro:
      "Home insurance building blocks explained in plain language — what each part is meant to protect, and why it matters. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "dwelling-coverage",
        title: "Dwelling",
        shortLabel: "Dwelling",
        description:
          "Helps repair or rebuild the physical structure of your home after a covered loss.",
        detail:
          "Dwelling coverage is intended to respond to damage to the house itself — walls, roof, and permanently attached components such as built-in cabinetry — subject to insured perils, deductibles, limits, and policy terms. Replacement cost vs. actual cash value, reconstruction costs in your area, and outbuildings may all affect how dwelling limits should be set.",
        icon: Home,
      },
      {
        id: "contents-coverage",
        title: "Contents / Personal Property",
        shortLabel: "Contents",
        description:
          "Helps protect belongings inside the home — furniture, electronics, clothing, and everyday items.",
        detail:
          "Contents coverage is intended to respond when personal belongings are stolen or damaged by a covered peril. Many policies apply special sub-limits to jewellery, bikes, cash, and collectibles. A room-by-room inventory helps your broker compare realistic contents limits rather than guessing.",
        icon: Sofa,
      },
      {
        id: "liability-protection",
        title: "Personal Liability",
        shortLabel: "Liability",
        description:
          "May help if a visitor is injured or you are legally responsible for damage to someone else's property.",
        detail:
          "Personal liability coverage is intended to respond to certain claims alleging bodily injury or property damage for which you are legally liable — for example, a guest injured on your premises — subject to policy definitions, limits, and exclusions. Higher limits or an umbrella may be worth discussing for pools, trampolines, or frequent entertaining.",
        icon: Shield,
      },
      {
        id: "additional-living-expenses",
        title: "Additional Living Expenses",
        shortLabel: "ALE",
        description:
          "May help with temporary lodging and related costs if a covered loss makes your home unlivable.",
        detail:
          "When a covered loss forces you out of your home, additional living expenses coverage is intended to help with reasonable extra costs of temporary accommodation and related living arrangements while repairs are underway — within policy limits and conditions. It does not automatically pay every expense you incur.",
        icon: Package,
      },
      {
        id: "high-value-home-considerations",
        title: "High-Value / Special Property",
        shortLabel: "Special Property",
        description:
          "Jewellery, fine art, collectibles, and custom finishes may need scheduled limits beyond standard defaults.",
        detail:
          "Items such as jewellery, fine art, wine collections, and high-end electronics often carry special sub-limits under a standard home policy. Scheduling valuables separately — and confirming dwelling limits for custom construction or premium finishes — can help align coverage with what would actually be costly to replace, subject to insurer availability and policy terms.",
        icon: Gem,
      },
    ],
    considerations: [
      {
        title: "High-value and custom homes",
        description:
          "Unique architecture, imported materials, and specialty rooms (wine cellars, home theatres) may need itemized schedules and higher limits. Document upgrades so dwelling and contents values stay current.",
      },
      {
        title: "Scheduled valuables",
        description:
          "Jewellery, art, and collectibles often carry sub-limits under standard policies. Scheduling high-value items separately can provide clearer protection.",
      },
      {
        title: "Liability limits",
        description:
          "Properties with pools, trampolines, or frequent entertaining may warrant higher personal liability limits or an umbrella policy.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Condo Insurance", href: "/condo-insurance/" },
      { label: "Personal Umbrella", href: "/personal-umbrella-insurance/" },
      { label: "Cottage Insurance", href: "/cottage-insurance/" },
    ]),
    faqTitle: "Home insurance FAQ",
    faqIntro: "Straight answers to common home insurance questions.",
    faqItems: [
      {
        question: "Do I need home insurance if I own my home outright?",
        answer:
          "It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended. If you have a mortgage, your lender typically requires home insurance until the loan is paid off.",
      },
      {
        question: "Does home insurance cover flooding?",
        answer:
          "Standard home policies often exclude overland flooding (water that enters from outside, such as heavy rain or overflow). Optional flood coverage may be available depending on your property and carrier — worth discussing with a broker so you know what's included and what isn't.",
      },
      {
        question:
          "What's the difference between actual cash value and replacement cost coverage?",
        answer:
          "Actual cash value pays what your damaged property was worth at the time of the loss, after depreciation. Replacement cost aims to cover repairing or replacing with new items of similar kind and quality, without subtracting for age or wear — usually within policy limits and conditions.",
      },
      {
        question: "Do I need separate coverage for a home business?",
        answer:
          "Many home policies limit or exclude claims tied to business activity run from the home. If you work from home, keep inventory, or see clients there, flag it to a broker so they can check your limits or suggest a business endorsement or separate policy.",
      },
      {
        question: "What information do I need for a quote?",
        answer:
          "Have your property details ready (address, year built, approximate square footage, and construction basics), plus information about any current coverage. That helps your broker compare options accurately.",
      },
      {
        question: "Do high-value homes need different coverage?",
        answer:
          "Homes with custom construction, high-end finishes, art, jewellery, or wine collections often exceed standard contents and dwelling defaults. A broker can discuss agreed-value scheduling, replacement cost approaches, and liability limits that reflect the full property — without assuming a single carrier threshold applies to every home.",
      },
    ],
    ctaHeading: "Ready to protect your home?",
    ctaSubhead:
      "Tell us about your property — we'll compare options and explain what actually fits.",
    serviceName: "Home Insurance",
  schemaKind: "personal",
  }),

  "condo-insurance": buildPilotProductConfig({
    slug: "condo-insurance",
    metaTitle: "Condo Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Condo insurance for Windsor-Essex unit owners — contents, improvements, liability, and loss assessment coverage explained by an independent broker.",
    headline: "Condo Insurance",
    heroLead:
      "Coverage for what your corporation's master policy does not — your unit, your belongings, and your liability as an owner.",
    photographySlug: "condo",
    accentColor: "#6B7A8A",
    quoteHref: "/get-a-quote?type=home&homeType=condo",
    quoteLabel: "Get a Condo Quote",
    trustStatement:
      "Condo insurance is for unit owners in Windsor-Essex — whether you live in the unit full time, use it as a secondary residence, or own it as an investment. It is designed around the split between the corporation's master policy and your personal interest in the unit.",
    coverageIntro:
      "Condo unit-owner insurance fills gaps the corporation's master policy does not — your belongings, unit improvements, liability, and certain assessment exposures. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "contents-personal-property",
        title: "Contents / Personal Property",
        shortLabel: "Contents",
        description:
          "Helps protect furniture, electronics, clothing, and other belongings inside your unit.",
        detail:
          "The condominium corporation's insurance typically protects the building and common elements — not your personal belongings. Contents coverage on a condo unit-owner policy is intended to respond when your belongings are stolen or damaged by a covered peril, subject to limits, deductibles, and exclusions.",
        icon: Sofa,
      },
      {
        id: "unit-improvements-betterments",
        title: "Unit Improvements & Betterments",
        shortLabel: "Improvements",
        description:
          "Helps protect renovations and upgrades you paid for beyond the corporation's standard unit definition.",
        detail:
          "Kitchen renovations, upgraded flooring, custom built-ins, and other betterments may exceed what the master policy treats as a standard unit. Unit improvements coverage is intended to help protect your investment in those finishes — subject to policy definitions and limits. Documenting upgrades helps your broker set realistic values.",
        icon: Home,
      },
      {
        id: "personal-liability",
        title: "Personal Liability",
        shortLabel: "Liability",
        description:
          "May help if someone is injured in your unit or you are responsible for damage to another unit or common areas.",
        detail:
          "Personal liability coverage is intended to respond to certain claims alleging bodily injury or property damage for which you are legally liable as a unit owner — including some incidents involving guests or damage affecting neighbouring units — subject to policy terms. The corporation's liability coverage does not replace your own.",
        icon: Shield,
      },
      {
        id: "loss-assessment-coverage",
        title: "Loss Assessment",
        shortLabel: "Assessment",
        description:
          "May help with your share of a special assessment after a covered building loss exceeds the master policy.",
        detail:
          "If a major insured loss hits the building and the corporation's master policy limits are exceeded, owners may be assessed for the shortfall. Loss assessment coverage on a unit-owner policy may help with your portion, subject to limits and conditions. It does not guarantee payment of every assessment a corporation may levy.",
        icon: Scale,
      },
      {
        id: "additional-living-expenses",
        title: "Additional Living Expenses",
        shortLabel: "ALE",
        description:
          "May help with temporary housing if a covered loss makes your unit uninhabitable during repairs.",
        detail:
          "When a covered loss forces you out of your unit, additional living expenses coverage is intended to help with reasonable extra costs of temporary accommodation while repairs proceed — within policy limits. Availability and wording vary by insurer.",
        icon: KeyRound,
      },
      {
        id: "condo-corporation-deductible",
        title: "Condo Corporation Deductible Exposure",
        shortLabel: "Deductible",
        description:
          "Some policies may respond if the corporation assesses owners for the master-policy deductible after a claim.",
        detail:
          "After certain claims, a condominium corporation may assess unit owners for the master policy deductible. Optional deductible assessment coverage — where available — may help with that exposure, subject to limits and eligibility. Not every condo policy includes this feature, and amounts can vary widely by corporation.",
        icon: Building2,
      },
    ],
    considerations: [
      {
        title: "Master policy vs. unit policy",
        description:
          "Review what your corporation insures — common elements, standard unit finishes, and liability for the corporation — so your personal policy complements rather than duplicates coverage.",
      },
      {
        title: "Upgrades and betterments",
        description:
          "Kitchen renovations, upgraded flooring, and custom built-ins may exceed standard unit definitions. Document improvements so contents and betterments limits reflect what you have invested.",
      },
      {
        title: "Deductible assessments",
        description:
          "Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim. Limits and eligibility vary by carrier.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Tenant Insurance", href: "/tenant-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
      { label: "Cottage Insurance", href: "/cottage-insurance/" },
    ]),
    faqTitle: "Condo insurance FAQ",
    faqIntro: "Common questions about condo coverage in Ontario.",
    faqItems: [
      {
        question: "Doesn't my condo corporation already have insurance?",
        answer:
          "Yes — the corporation carries a master policy for the building and common elements. Your unit policy fills gaps: your contents, improvements inside the unit, personal liability, and often loss assessment coverage. What the master policy covers varies by corporation, so it is worth reviewing your status certificate and policy with a broker.",
      },
      {
        question: "What is loss assessment coverage?",
        answer:
          "If a major insured loss hits the building and the corporation's master policy limits are not enough, owners may be assessed for the shortfall. Loss assessment coverage on your condo policy can help with your portion, subject to policy limits and conditions.",
      },
      {
        question: "Do I need condo insurance if I rent out my unit?",
        answer:
          "If you lease your unit, you still need appropriate coverage for your interests as an owner — and landlord-related risks may require different limits or endorsements. Tell your broker how the unit is used so the policy reflects that.",
      },
      {
        question: "How much contents coverage do I need?",
        answer:
          "That depends on what you own — furniture, electronics, clothing, and any upgrades you have paid for inside the unit. A room-by-room inventory helps avoid underinsuring. Your broker can help you think through realistic limits.",
      },
    ],
    ctaHeading: "Ready to protect your condo?",
    ctaSubhead:
      "Tell us about your unit — we will compare options and explain how your policy fits with the corporation's master coverage.",
    serviceName: "Condo Insurance",
  schemaKind: "personal",
  }),

  "tenant-insurance": buildPilotProductConfig({
    slug: "tenant-insurance",
    metaTitle: "Tenant Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Tenant insurance for Windsor-Essex renters — contents, personal liability, and additional living expenses explained by an independent broker.",
    headline: "Tenant Insurance",
    heroLead:
      "Protection for renters — your belongings, your liability, and help with living expenses if a covered loss displaces you.",
    photographySlug: "tenant",
    accentColor: "#7A6B5A",
    quoteHref: "/get-a-quote?type=home&homeType=tenant",
    quoteLabel: "Get a Tenant Quote",
    trustStatement:
      "Tenant insurance is for anyone renting an apartment, house, condo unit, or basement suite in Windsor-Essex. Whether you are a student, a young professional, or a long-term renter, a tenant policy protects your personal property and liability exposure.",
    coverageIntro:
      "Tenant insurance focuses on what you own and your personal liability — the landlord's building policy generally does not replace either. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "contents-coverage",
        title: "Contents / Personal Property",
        shortLabel: "Contents",
        description:
          "Helps protect furniture, electronics, clothing, and other belongings in your rental.",
        detail:
          "Your landlord's insurance typically protects the building — not your belongings. Contents coverage on a tenant policy is intended to respond when personal property is stolen or damaged by a covered peril such as fire, certain water damage, or theft, subject to limits, deductibles, and exclusions.",
        icon: Sofa,
      },
      {
        id: "personal-liability",
        title: "Personal Liability",
        shortLabel: "Liability",
        description:
          "May help if you accidentally injure someone or cause damage to the rental or another unit.",
        detail:
          "Personal liability coverage is intended to respond to certain claims alleging bodily injury or property damage for which you are legally liable — including some incidents inside your rental unit — subject to policy terms. Many leases require minimum liability limits and proof of insurance.",
        icon: Shield,
      },
      {
        id: "additional-living-expenses",
        title: "Additional Living Expenses",
        shortLabel: "ALE",
        description:
          "May help with temporary housing if a covered loss forces you out while the unit is repaired.",
        detail:
          "If a covered loss makes your rental unlivable, additional living expenses coverage is intended to help with reasonable extra costs of temporary accommodation and related living arrangements during repairs — within policy limits and conditions.",
        icon: Package,
      },
      {
        id: "tenant-improvements",
        title: "Tenant Improvements",
        shortLabel: "Improvements",
        description:
          "May help protect renovations or upgrades you paid for in a rental, where the policy allows.",
        detail:
          "Paint, fixtures, or other improvements you installed with the landlord's permission are not always covered the same way as ordinary contents. Where available, tenant improvements coverage is intended to help with those upgrades after a covered loss — subject to policy wording. Confirm what you have invested before assuming it is included.",
        icon: KeyRound,
      },
    ],
    considerations: [
      {
        title: "Landlord requirements",
        description:
          "Many leases require minimum liability limits and proof of insurance. Keep your policy active for the full lease term and provide certificates when your landlord asks.",
      },
      {
        title: "Valuable items",
        description:
          "Jewellery, bikes, collectibles, and high-end electronics may need scheduled items or higher sub-limits. Tell your broker about anything that would be costly to replace.",
      },
      {
        title: "Home-based work",
        description:
          "If you run a business from your rental, standard tenant policies may limit business-related claims. Flag home office or client visit activity to your broker.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Condo Insurance", href: "/condo-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
    ]),
    faqTitle: "Tenant insurance FAQ",
    faqIntro: "Straight answers for Ontario renters.",
    faqItems: [
      {
        question: "Is tenant insurance required in Ontario?",
        answer:
          "It is not mandated by provincial law, but many landlords require proof of tenant insurance in the lease. Even without a requirement, it protects your belongings and liability — the landlord's policy does not cover your stuff.",
      },
      {
        question: "Does tenant insurance cover my roommate's belongings?",
        answer:
          "Generally, a tenant policy covers the named insured and their household as defined in the policy. Roommates often need separate policies or need to be listed properly. Ask your broker how your household should be set up.",
      },
      {
        question: "Will tenant insurance cover water damage from another unit?",
        answer:
          "If water from a neighbouring unit damages your belongings, your contents coverage may respond depending on the cause and policy wording. Liability coverage may also apply if you cause damage to another unit. Specifics depend on the loss and policy — a broker can explain typical scenarios.",
      },
      {
        question: "How is tenant insurance different from condo insurance?",
        answer:
          "Tenants insure contents and liability only — they do not own the unit. Condo owners need coverage for their unit interests, improvements, and often loss assessment. The right product depends on whether you rent or own.",
      },
    ],
    ctaHeading: "Ready to protect your rental?",
    ctaSubhead:
      "Tell us about your rental — we will compare tenant options and explain what is covered.",
    serviceName: "Tenant Insurance",
  schemaKind: "personal",
  }),

  "landlord-insurance": buildPilotProductConfig({
    slug: "landlord-insurance",
    metaTitle: "Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Landlord insurance for Windsor-Essex rental owners — dwelling, liability, loss of rents, and tenant-related exposures through a broker.",
    headline: "Landlord Insurance",
    heroLead:
      "Coverage built for rental property owners — protect the dwelling, manage liability, and plan for income interruption after a covered loss.",
    photographySlug: "landlord",
    accentColor: "#8A7A6A",
    quoteHref: "/get-a-quote?type=home&homeType=landlord",
    quoteLabel: "Get a Landlord Quote",
    trustStatement:
      "Landlord insurance is for Windsor-Essex property owners who rent out houses, duplexes, condo units, or other residential dwellings. Whether you have one rental or several, the right policy reflects how each property is occupied and maintained.",
    coverageIntro:
      "Landlord policies address risks that come with owning property someone else lives in — different from an owner-occupied home policy. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "rental-dwelling-coverage",
        title: "Rental Dwelling / Building",
        shortLabel: "Dwelling",
        description:
          "Helps protect the rental building structure and attached fixtures you own as the landlord.",
        detail:
          "Rental dwelling coverage is intended to respond to covered damage to the building you lease to others — structure and permanently attached landlord-owned fixtures — subject to insured perils, deductibles, and policy terms. A standard owner-occupied home form is not designed for this occupancy risk.",
        icon: Building2,
      },
      {
        id: "landlord-owned-contents",
        title: "Landlord-Owned Contents",
        shortLabel: "Contents",
        description:
          "May help protect appliances, furniture, and other items you supply for tenants.",
        detail:
          "Landlord-owned contents coverage is intended to respond to covered loss or damage to furniture, appliances, and other personal property you provide in the rental — not the tenant's belongings. Tenants generally need their own contents and liability coverage.",
        icon: Sofa,
      },
      {
        id: "loss-of-rental-income",
        title: "Rental Income / Fair Rental Value",
        shortLabel: "Rental Income",
        description:
          "May help replace lost rent if a covered loss makes the unit uninhabitable during repairs.",
        detail:
          "Where included, fair rental value or loss-of-rents coverage is intended to help replace rental income you lose while a covered loss makes the unit unlivable — within waiting periods, limits, and conditions. It is not rent-default insurance and does not respond simply because a tenant stops paying.",
        icon: DollarSign,
      },
      {
        id: "landlord-liability",
        title: "Premises Liability",
        shortLabel: "Liability",
        description:
          "May help with injury or property-damage claims tied to your role as a rental property owner.",
        detail:
          "Premises liability coverage is intended to respond to certain claims alleging bodily injury or property damage arising from your ownership or maintenance of the rental premises — subject to policy definitions, limits, and exclusions. Maintenance expectations and occupancy details matter to how carriers view the risk.",
        icon: Shield,
      },
      {
        id: "water-additional-endorsements",
        title: "Optional Water & Endorsements",
        shortLabel: "Endorsements",
        description:
          "Optional water, sewer backup, and other endorsements may be available depending on the property and insurer.",
        detail:
          "Water damage, sewer backup, overland flooding, and similar exposures are often limited or optional on rental policies. Endorsements — where available — may broaden protection for specific risks, but tenant-caused damage is not universally covered and wording varies widely. Disclose how the property is occupied and maintained so your broker can review suitable options.",
        icon: Droplets,
      },
    ],
    considerations: [
      {
        title: "Vacancy and seasonal gaps",
        description:
          "Extended vacancies can affect coverage or require notification to your insurer. Tell your broker if a unit will be empty between tenants.",
      },
      {
        title: "Maintenance and inspections",
        description:
          "Insurers expect reasonable upkeep — working smoke detectors, safe stairs and railings, and timely repairs. Good maintenance supports both tenant safety and insurability.",
      },
      {
        title: "Short-term rentals",
        description:
          "Platforms like Airbnb change occupancy and liability exposure. Standard landlord policies may exclude or limit short-term rental activity — disclose how the property is marketed.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Condo Insurance", href: "/condo-insurance/" },
      { label: "Tenant Insurance", href: "/tenant-insurance/" },
      { label: "Cottage Insurance", href: "/cottage-insurance/" },
    ]),
    faqTitle: "Landlord insurance FAQ",
    faqIntro: "Questions rental property owners ask most often.",
    faqItems: [
      {
        question: "Is landlord insurance the same as home insurance?",
        answer:
          "No. A standard home policy assumes you live in the property. Rental properties face different occupancy, liability, and maintenance risks. Landlord or rental-dwelling policies are designed for properties you lease to others.",
      },
      {
        question: "Should my tenant have their own insurance?",
        answer:
          "Yes — tenant insurance protects the renter's belongings and liability. It does not replace landlord coverage for the building. Requiring tenant insurance in your lease is a common and sensible practice.",
      },
      {
        question: "Does landlord insurance cover tenant default on rent?",
        answer:
          "Standard property policies focus on physical damage and liability, not rent default. Loss of rental income coverage applies when a covered peril makes the unit uninhabitable — not when a tenant stops paying. Eviction and rent guarantee products are separate considerations.",
      },
      {
        question: "What if I rent out a basement suite in my home?",
        answer:
          "Partial rentals and secondary suites change your risk profile. Your existing home policy may not cover rental activity. Tell your broker exactly how the property is occupied so the right product or endorsement is in place.",
      },
    ],
    ctaHeading: "Ready to protect your rental property?",
    ctaSubhead:
      "Tell us about your rental units — we will compare landlord options and explain the coverage gaps to watch for.",
    serviceName: "Landlord Insurance",
  schemaKind: "personal",
  }),

  "motorcycle-insurance": buildPilotProductConfig({
    slug: "motorcycle-insurance",
    metaTitle: "Motorcycle Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Motorcycle insurance for Windsor-Essex riders — liability, physical damage, seasonal use, and gear considerations explained by an independent broker.",
    headline: "Motorcycle Insurance",
    heroLead:
      "Coverage built for how you ride — on-road liability, physical damage for your bike, and options that reflect Ontario's riding season.",
    photographySlug: "motorcycle",
    accentColor: "#5B7A99",
    quoteHref: "/get-a-quote?type=vehicle&vehicleType=motorcycle",
    quoteLabel: "Get a Motorcycle Quote",
    trustStatement:
      "Motorcycle insurance is for Windsor-Essex riders with street bikes, cruisers, touring motorcycles, and other on-road machines — whether you commute occasionally or ride primarily on weekends during the season.",
    coverageIntro:
      "Motorcycle coverage is built around how you ride — on-road liability, accident benefits, physical damage for the bike, and gear — not a car policy with the word motorcycle swapped in. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "third-party-liability",
        title: "Third-Party Liability",
        shortLabel: "Liability",
        description:
          "Required for public-road riding in Ontario — responds when you are legally liable for injury or damage to others.",
        detail:
          "Third-party liability is required when riding on public roads in Ontario (not for private-property-only use). FSRA specifies minimum third-party liability of at least $200,000. This coverage is intended to respond when you are legally liable for injury or property damage to others — subject to your policy limits, exclusions, and terms. Many riders choose higher limits.",
        icon: Shield,
      },
      {
        id: "accident-benefits",
        title: "Accident Benefits",
        shortLabel: "Accident Benefits",
        description:
          "Ontario accident benefits apply to motorcycle policies — medical and related support after an injury.",
        detail:
          "Accident benefits on an Ontario motorcycle policy are intended to help with medical, rehabilitation, and related support after an injury arising from the use or operation of the motorcycle — within the statutory framework and your policy terms. What is mandatory vs. optional can change by policy effective date; ask your broker what applies to your situation.",
        icon: HardHat,
      },
      {
        id: "collision-upset",
        title: "Collision / Upset",
        shortLabel: "Collision",
        description:
          "Optional coverage that may help repair or replace your motorcycle after a crash or tip-over.",
        detail:
          "When purchased, collision or upset coverage is intended to respond to damage to your own motorcycle from a crash with another vehicle or object, or from tipping over — subject to deductibles, limits, and policy terms. It is separate from liability coverage for other people's injuries or property.",
        icon: Motorbike,
      },
      {
        id: "comprehensive",
        title: "Comprehensive",
        shortLabel: "Comprehensive",
        description:
          "Optional coverage intended for theft, vandalism, weather, and other non-collision motorcycle losses.",
        detail:
          "When purchased, comprehensive coverage is intended to address non-collision events such as theft, vandalism, hail, fire, or animal strikes affecting your motorcycle — subject to deductibles, limits, exclusions, and policy terms. Storage and security details can matter to how insurers view the risk.",
        icon: CloudLightning,
      },
      {
        id: "accessories-gear",
        title: "Equipment & Accessories",
        shortLabel: "Accessories",
        description:
          "Aftermarket parts, luggage systems, and riding gear may need scheduled limits beyond policy defaults.",
        detail:
          "Standard motorcycle policies often cap accessory and gear values. Aftermarket exhausts, luggage systems, custom parts, and high-value riding gear may need scheduled coverage or higher limits where available — so replacement values reflect what you actually ride with, subject to insurer options.",
        icon: Wrench,
      },
    ],
    considerations: [
      {
        title: "Seasonal riding",
        description:
          "Many riders store their motorcycle over winter. Discuss lay-up options, minimum liability during storage, and when to restore full coverage before the first spring ride.",
      },
      {
        title: "Storage and security",
        description:
          "Garaged storage, disc locks, and tracking devices can matter to insurers. Tell your broker where and how the bike is stored in the off-season.",
      },
      {
        title: "Riding gear and accessories",
        description:
          "Helmets, jackets, and aftermarket parts may exceed default accessory limits. Itemize valuable additions so limits reflect replacement cost.",
      },
      {
        title: "Licensing and training",
        description:
          "M1/M2 graduated licensing and rider training courses can affect eligibility and pricing with some carriers. Share your licence class and any training completed.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Boat Insurance", href: "/boat-insurance/" },
    ]),
    faqTitle: "Motorcycle insurance FAQ",
    faqIntro: "Straight answers for Ontario riders.",
    faqItems: [
      {
        question: "Is motorcycle insurance mandatory in Ontario?",
        answer:
          "Yes. You need at least third-party liability and accident benefits to ride on public roads. Physical damage coverage for your bike is optional but recommended if replacing it would be a financial hardship.",
      },
      {
        question: "Can I reduce coverage in the off-season?",
        answer:
          "Some carriers offer seasonal lay-up or reduced-use options when the motorcycle is stored. You typically must maintain minimum liability if the bike is registered, even when garaged. Ask your broker what is available without leaving gaps.",
      },
      {
        question: "Does my auto policy cover my motorcycle?",
        answer:
          "No — motorcycles require a separate policy. Auto and motorcycle risks, licensing, and rating are treated differently by insurers.",
      },
      {
        question: "Are passengers covered?",
        answer:
          "Passenger liability and accident benefits depend on your policy and endorsements. If you regularly carry a passenger, confirm how they are protected before you ride.",
      },
    ],
    ctaHeading: "Ready to ride with confidence?",
    ctaSubhead:
      "Tell us about your motorcycle — we will compare options and explain seasonal coverage choices.",
    serviceName: "Motorcycle Insurance",
  schemaKind: "personal",
  }),

  "boat-insurance": buildPilotProductConfig({
    slug: "boat-insurance",
    metaTitle: "Boat Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Boat and watercraft insurance for Windsor-Essex — hull coverage, liability, equipment, and navigation territory explained by an independent broker.",
    headline: "Boat Insurance",
    heroLead:
      "Protection on and off the water — hull coverage, liability, and equipment built around how you use your boat in Ontario.",
    photographySlug: "boat",
    accentColor: "#4A8A8A",
    quoteHref: "/get-a-quote?type=vehicle&vehicleType=boat",
    quoteLabel: "Get a Boat Quote",
    trustStatement:
      "Boat insurance is for Windsor-Essex owners of powerboats, fishing boats, pontoons, and other pleasure craft on inland lakes, the Detroit River, and Lake St. Clair — whether you trailer to launches or keep a slip at a marina.",
    coverageIntro:
      "Boat policies reflect hull value, liability on the water, equipment you carry aboard, and optional assistance — not every feature is automatic. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "hull-machinery",
        title: "Physical Damage to the Watercraft",
        shortLabel: "Hull",
        description:
          "Helps repair or replace the boat, motor, and permanently attached equipment after a covered loss.",
        detail:
          "Physical damage coverage for the watercraft is intended to respond to covered damage to the hull, motor, and permanently attached equipment — often on an agreed-value or actual cash value basis depending on the policy. Age, upgrades, and how you would replace the boat all matter when setting values.",
        icon: Anchor,
      },
      {
        id: "liability-coverage",
        title: "Marine / Watercraft Liability",
        shortLabel: "Liability",
        description:
          "May help if your watercraft causes injury or property damage to others on or near the water.",
        detail:
          "Watercraft liability coverage is intended to respond when you are legally liable for injury or property damage arising from the ownership or use of the boat — including some collisions with other vessels, docks, or swimmers — subject to policy limits, definitions, and exclusions. It does not replace every other liability policy you may need ashore.",
        icon: Shield,
      },
      {
        id: "equipment-trailers",
        title: "Equipment & Accessories",
        shortLabel: "Equipment",
        description:
          "Trolling motors, electronics, safety gear, and trailers may need explicit limits beyond the hull amount.",
        detail:
          "Fish finders, trolling motors, life jackets, and trailers are not always fully included in the base hull amount. Equipment and accessory coverage — where scheduled or included — is intended to help protect those items within stated limits. List valuable additions so nothing important is left underinsured.",
        icon: Wrench,
      },
      {
        id: "personal-effects",
        title: "Personal Effects",
        shortLabel: "Effects",
        description:
          "May help with certain personal items carried aboard, where the policy includes this coverage.",
        detail:
          "Some boat policies offer limited personal effects coverage for clothing and personal items brought aboard. Limits are often modest and exclusions apply. High-value items may need separate scheduling or may belong on a home or specialty policy instead.",
        icon: Package,
      },
      {
        id: "emergency-assistance",
        title: "Emergency Assistance / Towing",
        shortLabel: "Assistance",
        description:
          "Optional on-water breakdown and towing assistance may be available depending on the insurer.",
        detail:
          "Emergency towing and assistance benefits — where purchased or included — are intended to help with on-water breakdown response within stated limits. Not every boat policy automatically includes towing. If you operate far from launch ramps, ask what assistance options are available for your waters.",
        icon: LifeBuoy,
      },
    ],
    considerations: [
      {
        title: "Hull value basis",
        description:
          "Document your boat's make, model, year, motor size, and upgrades. Agreed-value policies suit newer or customized boats; older craft may be rated on actual cash value.",
      },
      {
        title: "Navigation territory",
        description:
          "Tell your broker where you operate — local lakes only, Great Lakes cruising, or cross-border waters. Territory limits affect both eligibility and premium.",
      },
      {
        title: "Seasonality and lay-up",
        description:
          "Winter storage still carries theft and fire risk. Confirm how your policy treats boats on trailers, in marinas, or at cottage properties during the off-season.",
      },
      {
        title: "Towing and emergency assistance",
        description:
          "On-water breakdown and towing may be optional add-ons. If you boat far from launch ramps, ask about emergency towing limits.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Motorcycle Insurance", href: "/motorcycle-insurance/" },
      { label: "Cottage Insurance", href: "/cottage-insurance/" },
    ]),
    faqTitle: "Boat insurance FAQ",
    faqIntro: "Common questions about insuring watercraft in Ontario.",
    faqItems: [
      {
        question: "Is boat insurance required in Ontario?",
        answer:
          "Unlike auto insurance, boat insurance is not legally mandated for private pleasure craft in Ontario. However, marinas, lenders, and provincial registration requirements may still expect proof of coverage. Liability-only policies are common for smaller boats.",
      },
      {
        question: "Does my home insurance cover my boat?",
        answer:
          "Home policies sometimes include very limited coverage for small boats or motors, often with low limits and strict size restrictions. Most powerboats and larger watercraft need a dedicated boat policy.",
      },
      {
        question: "What is agreed value vs. actual cash value?",
        answer:
          "Agreed value pays a set amount for a total loss based on a value you and the insurer establish at purchase. Actual cash value deducts depreciation. The right basis depends on your boat's age, condition, and how you would replace it.",
      },
      {
        question: "Am I covered when the boat is in storage?",
        answer:
          "Policies typically cover stored boats over winter, but conditions apply — drainage, shrink-wrapping, and theft prevention may matter. Confirm lay-up periods and whether liability extends when the boat is on a trailer at home.",
      },
    ],
    ctaHeading: "Ready to protect your boat?",
    ctaSubhead:
      "Tell us about your watercraft — we will compare hull and liability options for how you actually boat.",
    serviceName: "Boat Insurance",
  schemaKind: "personal",
  }),

  "cottage-insurance": buildPilotProductConfig({
    slug: "cottage-insurance",
    metaTitle: "Cottage Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cottage and seasonal property insurance for Windsor-Essex — secondary homes, vacancy, water proximity, and winterization through a broker.",
    headline: "Cottage Insurance",
    heroLead:
      "Coverage for seasonal and secondary properties — built around part-year occupancy, waterfront risks, and the realities of closing up for winter.",
    photographySlug: "cottage",
    accentColor: "#4A7A6A",
    quoteHref: "/get-a-quote?type=home&homeType=home",
    quoteLabel: "Get a Cottage Quote",
    trustStatement:
      "Cottage insurance is for Windsor-Essex owners of seasonal homes, lake properties, and secondary residences used part of the year — whether you visit on weekends, for the summer season, or eventually plan to retire there.",
    coverageIntro:
      "Cottage policies account for seasonal use, secondary occupancy, and properties that sit unattended — they do not always work like a primary-home policy. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "seasonal-dwelling-coverage",
        title: "Seasonal / Secondary Dwelling",
        shortLabel: "Dwelling",
        description:
          "Helps protect the cottage structure against covered perils when the property is used part of the year.",
        detail:
          "Seasonal dwelling coverage is intended to respond to covered damage to the cottage or secondary home structure and permanently attached components — subject to insured perils, deductibles, and occupancy conditions. Part-year use, vacancy periods, and winterization requirements often differ from a primary residence policy.",
        icon: Home,
      },
      {
        id: "detached-structures",
        title: "Detached Structures",
        shortLabel: "Structures",
        description:
          "May help protect sheds, bunkies, garages, and other outbuildings when included or scheduled.",
        detail:
          "Cottages often include bunkies, sheds, docks, or detached garages that need to be listed or scheduled. Detached structures coverage — where available — is intended to help with those buildings within policy limits. Values and construction details should be disclosed so limits reflect what is actually on the property.",
        icon: Fence,
      },
      {
        id: "contents-personal-property",
        title: "Contents",
        shortLabel: "Contents",
        description:
          "Helps protect furniture, appliances, and recreational equipment kept at the cottage.",
        detail:
          "Contents coverage is intended to respond when belongings kept at the cottage are stolen or damaged by a covered peril — furniture, appliances, and recreational gear within policy limits. Watercraft and motors usually need separate watercraft coverage rather than relying on cottage contents alone.",
        icon: Package,
      },
      {
        id: "liability-protection",
        title: "Personal Liability",
        shortLabel: "Liability",
        description:
          "May help with certain injury or property-damage claims arising from ownership or use of the cottage.",
        detail:
          "Personal liability coverage is intended to respond to certain claims alleging bodily injury or property damage arising from your ownership or use of the cottage property — including some guest and recreational exposures — subject to policy limits, definitions, and exclusions.",
        icon: Shield,
      },
      {
        id: "seasonal-occupancy",
        title: "Occupancy / Seasonal Use",
        shortLabel: "Occupancy",
        description:
          "How often the cottage is occupied — and how it is secured when empty — can affect eligibility and conditions.",
        detail:
          "Seasonal and secondary properties are underwritten differently from primary homes. Occupancy months, caretaker checks, heat and plumbing shut-downs, and road access can all affect eligibility and policy conditions. Tell your broker how the property is actually used so wording matches reality — cottage policies do not always mirror primary-home forms.",
        icon: Trees,
      },
    ],
    considerations: [
      {
        title: "Seasonal occupancy",
        description:
          "Tell your broker how many months the cottage is occupied and who checks on it when you are away. Extended vacancy periods may require specific policy conditions.",
      },
      {
        title: "Water proximity",
        description:
          "Properties on lakes or rivers may face different wind, ice, and flood exposure. Sewer backup and overland water options should be discussed based on location.",
      },
      {
        title: "Winterization",
        description:
          "If you close the cottage for winter, follow your policy's requirements for heat, plumbing, and property checks. Document what you do each fall.",
      },
      {
        title: "Road access and emergency response",
        description:
          "Remote or island properties may have longer emergency response times. Fire department distance and water supply can affect how carriers view the risk.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Condo Insurance", href: "/condo-insurance/" },
      { label: "Boat Insurance", href: "/boat-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
    ]),
    faqTitle: "Cottage insurance FAQ",
    faqIntro: "Common questions about insuring seasonal Ontario properties.",
    faqItems: [
      {
        question: "Is cottage insurance different from home insurance?",
        answer:
          "Often yes. Seasonal and secondary properties have different occupancy patterns, maintenance expectations, and distance from emergency services. Carriers may use specific cottage or seasonal-dwelling forms with distinct conditions around vacancy, heating, and water proximity.",
      },
      {
        question: "Do I need to winterize my cottage for coverage?",
        answer:
          "Many policies require specific winterization steps if the cottage is closed for the season — draining plumbing, maintaining heat, or having someone check the property. Failure to follow policy conditions can affect a claim. Your broker can outline what your carrier expects.",
      },
      {
        question: "Does cottage insurance cover my boat at the dock?",
        answer:
          "Boats and motors are usually insured separately under a watercraft policy or endorsement. Tell your broker what you keep at the cottage so nothing important is left uninsured.",
      },
      {
        question: "What if I rent my cottage occasionally?",
        answer:
          "Short-term or seasonal rentals change liability and property exposure. Standard cottage policies may restrict or exclude rental use. Disclose any rental activity so your broker can check eligibility and endorsements.",
      },
    ],
    ctaHeading: "Ready to protect your cottage?",
    ctaSubhead:
      "Tell us about your seasonal property — we will compare options and explain occupancy and winterization requirements.",
    serviceName: "Cottage Insurance",
  schemaKind: "personal",
  }),

  "travel-insurance": buildPilotProductConfig({
    slug: "travel-insurance",
    metaTitle: "Travel Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Travel insurance guidance for Windsor-Essex travellers — emergency medical, trip cancellation, and travel-related risks explained by an independent broker.",
    headline: "Travel Insurance",
    heroLead:
      "Medical emergency and trip protection for travellers — explained clearly so you know what is covered before you leave Windsor-Essex.",
    photographySlug: "travel-insurance",
    accentColor: "#6A7A8A",
    quoteHref: "/contact/?intent=broker",
    quoteLabel: "Talk to a Broker About Travel Coverage",
    secondaryCta: { label: "Contact Us", href: "/contact/" },
    trustStatement:
      "Travel insurance is for Windsor-Essex residents heading out of province or abroad — family vacations, snowbird stays, business travel, and students studying away from home. The right plan depends on your destination, health history, and trip cost.",
    coverageIntro:
      "Travel plans vary widely by destination, trip cost, and provider — not every plan includes every benefit below. Coverage, limits, and eligibility vary by insurer and policy.",
    coverageItems: [
      {
        id: "emergency-medical",
        title: "Emergency Medical",
        shortLabel: "Medical",
        description:
          "May help with unexpected medical treatment while travelling outside your home province.",
        detail:
          "Emergency medical coverage is intended to help with unexpected hospital, physician, and emergency treatment costs while you are away from your home province — subject to policy limits, stability requirements, and exclusions. Pre-existing conditions and destination medical costs (especially in the U.S.) should be reviewed carefully before you rely on a plan.",
        icon: HeartPulse,
      },
      {
        id: "trip-cancellation",
        title: "Trip Cancellation",
        shortLabel: "Cancellation",
        description:
          "May reimburse prepaid, non-refundable trip costs if you must cancel for a covered reason before departure.",
        detail:
          "Trip cancellation coverage — where purchased — is intended to help recover prepaid, non-refundable deposits and trip costs when you cancel for a reason defined in the policy before you leave. Covered reasons, documentation requirements, and purchase timing windows vary significantly by provider.",
        icon: Plane,
      },
      {
        id: "trip-interruption",
        title: "Trip Interruption",
        shortLabel: "Interruption",
        description:
          "May help if a covered reason forces you to cut a trip short after it has already begun.",
        detail:
          "Trip interruption coverage — where included — is intended to help with unused prepaid arrangements and certain extra costs when a covered reason forces you to return early or change plans mid-trip. It is not the same as cancellation before departure, and not every travel product packages both benefits.",
        icon: Compass,
      },
      {
        id: "baggage-personal-effects",
        title: "Baggage / Personal Effects",
        shortLabel: "Baggage",
        description:
          "May help toward loss, theft, or damage to luggage and personal belongings during travel.",
        detail:
          "Baggage and personal effects coverage — where included — is intended to help toward loss, theft, or damage to luggage and belongings during the trip, within stated limits, deductibles, and exclusions. High-value electronics and jewellery often have sub-limits.",
        icon: Luggage,
      },
      {
        id: "travel-assistance",
        title: "Travel Assistance / Emergency Assistance",
        shortLabel: "Assistance",
        description:
          "Many plans offer 24-hour assistance for medical coordination, travel disruption, and emergency logistics.",
        detail:
          "Travel assistance services — where included — can help coordinate emergency medical referrals, communication, and certain travel logistics when something goes wrong abroad. Assistance is a service benefit, not a guarantee of payment for every expense; what is covered still depends on the underlying plan wording.",
        icon: Phone,
      },
    ],
    considerations: [
      {
        title: "Destination matters",
        description:
          "Coverage limits and eligibility differ for travel within Canada, to the United States, and overseas. Higher medical costs in the U.S. often require higher emergency medical limits.",
      },
      {
        title: "Trip cost and deposits",
        description:
          "If you have significant prepaid flights, tours, or accommodations, trip cancellation/interruption may be worth discussing. Know what reasons are covered and what documentation is required.",
      },
      {
        title: "Existing health coverage",
        description:
          "Workplace benefits or credit card coverage may overlap with a travel policy. A broker can help you avoid paying for duplicate protection — or identify gaps.",
      },
      {
        title: "Adventure and specialty activities",
        description:
          "Scuba diving, skiing, and organized sports may be excluded or require add-ons. Disclose planned activities before you purchase.",
      },
    ],
    relatedProducts: relatedLinksToProducts([
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Contact Us", href: "/contact/" },
    ]),
    faqTitle: "Travel insurance FAQ",
    faqIntro: "Questions travellers ask before they depart.",
    faqItems: [
      {
        question: "Do I need travel insurance within Canada?",
        answer:
          "Provincial health plans cover only limited services outside your home province. An ambulance ride, hospital admission, or specialist visit in another province can leave you with out-of-pocket costs. Travel medical coverage fills those gaps for domestic trips.",
      },
      {
        question: "Does my credit card include travel insurance?",
        answer:
          "Some credit cards include travel medical or trip cancellation if you charge the trip to the card. Coverage varies widely — age limits, trip length caps, and exclusions are common. Review the certificate with a broker before relying on it as your only protection.",
      },
      {
        question: "Are pre-existing medical conditions covered?",
        answer:
          "Stability periods and medical questionnaires apply to most travel medical policies. Conditions must typically be stable for a defined period before departure. Disclose your health history accurately — incomplete disclosure can affect claims.",
      },
      {
        question: "When should I buy trip cancellation coverage?",
        answer:
          "Cancellation coverage is usually most effective when purchased soon after you make your first trip deposit, before any foreseeable reason to cancel arises. Waiting until illness or weather concerns appear can limit what is covered.",
      },
    ],
    ctaHeading: "Planning a trip?",
    ctaSubhead:
      "Speak with a broker about medical limits, pre-existing conditions, and trip cancellation options for your specific travel plans.",
    ctaQuoteLabel: "Talk to a Broker",
    serviceName: "Travel Insurance",
  schemaKind: "personal",
  }),
};

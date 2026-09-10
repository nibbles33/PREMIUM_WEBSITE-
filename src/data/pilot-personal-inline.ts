"use client";

import {
  Anchor,
  Building2,
  Compass,
  DollarSign,
  Droplets,
  Gem,
  Hammer,
  HardHat,
  HeartPulse,
  Home,
  KeyRound,
  Luggage,
  Motorbike,
  Package,
  Plane,
  Scale,
  Shield,
  Snowflake,
  Sofa,
  Sun,
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
      "Standard home insurance building blocks, explained without the jargon.",
    coverageItems: [
      {
        title: "Dwelling Coverage",
        description:
          "Repairs or rebuilds your home's structure after covered damage.",
        icon: Home,
      },
      {
        title: "Contents Coverage",
        description:
          "Protects your belongings — furniture, electronics, valuables — against theft or damage.",
        icon: Sofa,
      },
      {
        title: "Liability Protection",
        description:
          "Covers you if someone is injured on your property or you're responsible for damage to others.",
        icon: Shield,
      },
      {
        title: "Additional Living Expenses",
        description:
          "Covers temporary housing and costs if your home becomes uninhabitable after a covered loss.",
        icon: Package,
      },
      {
        title: "High-Value Home Considerations",
        description:
          "Custom builds, high-end finishes, and specialty assets may need agreed-value scheduling and higher contents limits beyond standard policy defaults.",
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
      "Condo policies focus on the gaps between your corporation's coverage and what you actually own inside the unit.",
    coverageItems: [
      {
        title: "Unit Contents & Improvements",
        description:
          "Covers your belongings and upgrades you have made inside the unit — finishes, fixtures, and betterments beyond what the corporation's policy includes.",
        icon: Sofa,
      },
      {
        title: "Personal Liability",
        description:
          "Protects you if someone is injured in your unit or you are responsible for damage to another unit or common areas.",
        icon: Shield,
      },
      {
        title: "Loss Assessment Coverage",
        description:
          "Can help with your share of a special assessment if the condominium corporation's master policy limits are exceeded by a covered loss.",
        icon: Scale,
      },
      {
        title: "Additional Living Expenses",
        description:
          "May cover temporary housing and related costs if a covered loss makes your unit uninhabitable while repairs are underway.",
        icon: KeyRound,
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
      "Tenant insurance focuses on what you own and your personal liability — not the building itself.",
    coverageItems: [
      {
        title: "Contents Coverage",
        description:
          "Protects your belongings — furniture, electronics, clothing, and personal items — against theft, fire, water damage, and other covered perils.",
        icon: Sofa,
      },
      {
        title: "Personal Liability",
        description:
          "Covers you if you accidentally cause injury or property damage to others — including incidents inside your rental unit.",
        icon: Shield,
      },
      {
        title: "Additional Living Expenses",
        description:
          "Helps with temporary housing and essential costs if a covered loss forces you out of your rental while repairs are made.",
        icon: Package,
      },
      {
        title: "No Building Coverage",
        description:
          "Tenant policies do not insure the building structure — that is the landlord's responsibility. Your policy focuses on what you own and your liability.",
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
  }),

  "landlord-insurance": buildPilotProductConfig({
    slug: "landlord-insurance",
    metaTitle: "Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Landlord insurance for Windsor-Essex rental property owners — dwelling, liability, loss of rental income, and tenant-related risks explained by an independent broker.",
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
      "Landlord policies address the risks that come with owning property someone else lives in.",
    coverageItems: [
      {
        title: "Rental Dwelling Coverage",
        description:
          "Protects the building you rent out — structure, attached fixtures, and landlord-owned items on the premises — against covered perils.",
        icon: Building2,
      },
      {
        title: "Landlord Liability",
        description:
          "Covers injury or property damage claims tied to your role as a rental property owner, subject to policy terms.",
        icon: Shield,
      },
      {
        title: "Loss of Rental Income",
        description:
          "May replace lost rent if a covered loss makes the unit uninhabitable during repairs, within policy limits and waiting periods.",
        icon: DollarSign,
      },
      {
        title: "Tenant-Caused Damage",
        description:
          "Optional coverage may respond when a tenant causes intentional or accidental damage beyond normal wear and tear — wording and limits vary.",
        icon: Hammer,
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
      "Motorcycle policies address riding-specific liability, physical damage, and seasonal use patterns.",
    coverageItems: [
      {
        title: "Third-Party Liability",
        description:
          "Mandatory in Ontario — covers injury or damage you cause to others while operating your motorcycle on public roads.",
        icon: Shield,
      },
      {
        title: "Collision & Comprehensive",
        description:
          "Optional physical damage coverage for your motorcycle — collision for crashes and comprehensive for theft, vandalism, and non-collision events.",
        icon: Motorbike,
      },
      {
        title: "Accident Benefits",
        description:
          "Ontario accident benefits apply to motorcycle policies — medical, rehabilitation, and income support after an accident, within policy terms.",
        icon: HardHat,
      },
      {
        title: "Accessories & Gear",
        description:
          "Aftermarket parts, saddlebags, and riding gear may need scheduled coverage or higher limits — standard policies often cap accessory values.",
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
      "Boat policies reflect hull value, where you navigate, and what you carry on board.",
    coverageItems: [
      {
        title: "Hull & Machinery",
        description:
          "Covers physical damage to your boat, motor, and permanently attached equipment — often on an agreed value or actual cash value basis depending on the policy.",
        icon: Anchor,
      },
      {
        title: "Liability Coverage",
        description:
          "Protects you if your watercraft causes injury or property damage to others — including collisions with other vessels, docks, or swimmers.",
        icon: Shield,
      },
      {
        title: "Equipment & Trailers",
        description:
          "Trolling motors, fish finders, life jackets, and boat trailers may need explicit coverage or scheduled limits beyond the base hull amount.",
        icon: Wrench,
      },
      {
        title: "Navigation & Use Territory",
        description:
          "Policies define where you may operate — inland lakes, Great Lakes, coastal waters — and may restrict racing or commercial use.",
        icon: Compass,
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
  }),

  "cottage-insurance": buildPilotProductConfig({
    slug: "cottage-insurance",
    metaTitle: "Cottage Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cottage and seasonal property insurance for Windsor-Essex — secondary homes, vacancy, water proximity, and winterization considerations explained by an independent broker.",
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
      "Cottage policies account for how seasonal properties are used, maintained, and left unattended.",
    coverageItems: [
      {
        title: "Seasonal Dwelling Coverage",
        description:
          "Protects your cottage or seasonal home's structure and landlord-owned fixtures against covered perils while the property is used part of the year.",
        icon: Home,
      },
      {
        title: "Contents & Personal Property",
        description:
          "Covers belongings kept at the cottage — furniture, appliances, watercraft stored on site, and recreational equipment — within policy limits.",
        icon: Sun,
      },
      {
        title: "Liability Protection",
        description:
          "Covers injury or property damage claims arising from your ownership or use of the cottage property, including guest and recreational activity exposure.",
        icon: Droplets,
      },
      {
        title: "Additional Living Expenses",
        description:
          "May help with temporary accommodation if a covered loss makes the cottage uninhabitable during the season you planned to use it.",
        icon: Snowflake,
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
    quoteHref: "/talk-to-a-broker/",
    quoteLabel: "Talk to a Broker About Travel Coverage",
    secondaryCta: { label: "Contact Us", href: "/contact/" },
    trustStatement:
      "Travel insurance is for Windsor-Essex residents heading out of province or abroad — family vacations, snowbird stays, business travel, and students studying away from home. The right plan depends on your destination, health history, and trip cost.",
    coverageIntro:
      "Travel policies address medical emergencies away from home and financial protection when plans change unexpectedly.",
    coverageItems: [
      {
        title: "Emergency Medical",
        description:
          "Covers unexpected medical treatment while travelling outside your home province — hospital visits, physician fees, and emergency services subject to policy limits and exclusions.",
        icon: HeartPulse,
      },
      {
        title: "Trip Cancellation & Interruption",
        description:
          "May reimburse prepaid, non-refundable trip costs if you must cancel or cut a trip short for covered reasons defined in the policy.",
        icon: Plane,
      },
      {
        title: "Baggage & Personal Effects",
        description:
          "Covers loss, theft, or damage to luggage and personal belongings during your trip, within stated limits and deductibles.",
        icon: Luggage,
      },
      {
        title: "Travel Liability",
        description:
          "Protects you if you accidentally cause injury or property damage to others while travelling abroad or within Canada.",
        icon: Shield,
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
  }),
};

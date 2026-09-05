import {
  Building2,
  Car,
  Heart,
  Home,
  Shield,
  Umbrella,
  Users,
} from "lucide-react";
import type { ProductPageContent } from "@/data/product-pages/types";

const CONTACT = "/contact/";

export const personalSpecialtyPages: ProductPageContent[] = [
  {
    slug: "mobile-home-insurance",
    category: "personal",
    metaTitle:
      "Mobile & Manufactured Home Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Mobile and manufactured home insurance for Windsor-Essex — dwelling, contents, liability, and tie-down considerations explained by an independent broker.",
    headline: "Mobile & Manufactured Home Insurance",
    subhead:
      "Coverage tailored to manufactured and mobile homes — from the structure and skirting to liability and personal belongings.",
    quoteHref: "/get-a-quote?type=home",
    quoteLabel: "Get a Home Quote",
    coverageIntro:
      "Mobile and manufactured home policies address risks that differ from site-built houses — anchoring, age, location, and how the unit is used.",
    coverageTypes: [
      {
        title: "Dwelling Coverage",
        description:
          "Protects the manufactured home structure against covered perils such as fire, wind, and vandalism, subject to policy terms and the home's age and condition.",
        icon: Home,
      },
      {
        title: "Contents & Belongings",
        description:
          "Covers furniture, appliances, and personal property inside the unit against theft or covered damage.",
        icon: Building2,
      },
      {
        title: "Personal Liability",
        description:
          "Helps if someone is injured on your property or you are responsible for damage to others — including incidents on the lot or adjacent areas.",
        icon: Shield,
      },
      {
        title: "Additional Structures",
        description:
          "May extend to decks, sheds, carports, and skirting when scheduled or included, depending on carrier wording.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "Mobile home insurance is for Windsor-Essex owners of manufactured and mobile homes — whether the unit sits on owned land, a leased lot, or a park. Coverage needs differ from conventional home policies based on construction type, tie-downs, and how the home is titled.",
    considerations: [
      {
        title: "Age and condition",
        description:
          "Older units may have different insurability and valuation approaches. Document renovations, roof updates, and electrical upgrades when discussing options.",
      },
      {
        title: "Land owned vs. leased lot",
        description:
          "Whether you own the land or rent a pad in a mobile home park affects liability exposures and what structures need to be listed on the policy.",
      },
      {
        title: "Tie-downs and wind exposure",
        description:
          "Proper anchoring and skirting can matter for wind-related claims. Carriers may ask about installation standards and maintenance.",
      },
      {
        title: "Seasonal or full-time occupancy",
        description:
          "Vacancy periods, snowbird use, or renting the unit to others can change eligibility and required endorsements — disclose how the home is used.",
      },
    ],
    relatedLinks: [
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Tenant Insurance", href: "/tenant-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
    ],
    faqTitle: "Mobile home insurance FAQ",
    faqIntro: "Questions owners ask about manufactured home coverage.",
    faqItems: [
      {
        question: "Is mobile home insurance the same as regular home insurance?",
        answer:
          "Not exactly. Manufactured homes are built to different standards and often titled differently than site-built houses. Policies are designed around those construction and occupancy differences — a standard homeowner form may not apply.",
      },
      {
        question: "Do I need insurance if I own the land outright?",
        answer:
          "Ontario does not legally require home insurance if you own free and clear, but lenders and park operators often require it. Even without a mortgage, insuring the dwelling and liability is strongly recommended.",
      },
      {
        question: "Are detached structures like decks covered?",
        answer:
          "Sometimes, if included or scheduled on the policy. Decks, carports, and sheds should be listed with approximate values so limits reflect what you actually own.",
      },
      {
        question: "Can I insure a mobile home I rent out?",
        answer:
          "Rental use typically requires landlord-style coverage rather than an owner-occupied policy. Tell your broker if tenants occupy the unit so liability and property wording match the risk.",
      },
    ],
    ctaHeading: "Own a manufactured or mobile home?",
    ctaSubhead:
      "Share your unit details, lot arrangement, and occupancy — we will compare options that reflect how your home is actually used.",
    serviceName: "Mobile & Manufactured Home Insurance",
  },
  {
    slug: "personal-umbrella-insurance",
    category: "personal",
    metaTitle:
      "Personal Umbrella Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Personal umbrella liability insurance for Windsor-Essex — extra limits above your home and auto policies, explained by an independent broker.",
    headline: "Personal Umbrella Insurance",
    subhead:
      "An extra layer of liability protection above your home and auto policies — for when a serious claim exceeds your underlying limits.",
    quoteHref: "/talk-to-a-broker/",
    quoteLabel: "Talk to a Broker About Umbrella Coverage",
    coverageIntro:
      "Umbrella policies extend personal liability limits when a claim exceeds what your home or auto policy will pay.",
    coverageTypes: [
      {
        title: "Excess Liability Limits",
        description:
          "Provides additional liability coverage above the limits on your underlying home, auto, or other eligible personal policies.",
        icon: Umbrella,
      },
      {
        title: "Broad Personal Liability",
        description:
          "May respond to certain liability claims not fully covered by underlying policies, subject to policy definitions and exclusions.",
        icon: Shield,
      },
      {
        title: "Legal Defence Costs",
        description:
          "Can help with defence costs for covered liability claims, within policy terms and after underlying limits are involved.",
        icon: Shield,
      },
      {
        title: "Worldwide Coverage",
        description:
          "Many personal umbrella policies extend liability protection for incidents outside Canada, subject to exclusions.",
        icon: Umbrella,
      },
    ],
    whoItIsFor:
      "Personal umbrella insurance is for Windsor-Essex households with assets to protect — homeowners, landlords, drivers with higher liability exposure, and families with recreational properties or watercraft. It is usually purchased on top of existing home and auto policies that meet minimum underlying limits.",
    considerations: [
      {
        title: "Underlying policy requirements",
        description:
          "Umbrella carriers typically require minimum liability limits on your home and auto policies before the umbrella attaches. Your broker will confirm what qualifies.",
      },
      {
        title: "Rental properties and extra vehicles",
        description:
          "Landlord exposures, motorcycles, boats, and youthful drivers can affect eligibility and pricing. List all properties and vehicles when applying.",
      },
      {
        title: "Limit selection",
        description:
          "Higher limits are available, but the right amount depends on your assets, income, and risk profile — not a one-size-fits-all number.",
      },
      {
        title: "Exclusions still apply",
        description:
          "Umbrella policies do not eliminate all liability gaps. Business activities, intentional acts, and certain contractual liabilities may be excluded.",
      },
    ],
    relatedLinks: [
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
      { label: "Boat Insurance", href: "/boat-insurance/" },
    ],
    faqTitle: "Personal umbrella FAQ",
    faqIntro: "How excess liability coverage works with your existing policies.",
    faqItems: [
      {
        question: "Do I need umbrella insurance if I already have home and auto liability?",
        answer:
          "Standard home and auto policies have liability limits that can be exhausted in a serious claim — especially involving injuries, multiple parties, or long-term care costs. An umbrella adds limits above those policies.",
      },
      {
        question: "What underlying limits do I need?",
        answer:
          "Requirements vary by umbrella carrier, but you typically need minimum liability limits on eligible home and auto policies. Your broker will confirm what your chosen umbrella requires before it responds.",
      },
      {
        question: "Does umbrella cover my rental property?",
        answer:
          "Landlord exposures may need to be disclosed and covered under underlying policies before the umbrella applies. Tell your broker about every property you own or rent out.",
      },
      {
        question: "Is umbrella the same as increasing my auto liability limit?",
        answer:
          "Increasing auto liability helps, but umbrella coverage often extends across multiple policies — home, auto, and sometimes watercraft — in one coordinated excess layer.",
      },
    ],
    ctaHeading: "Want extra liability protection?",
    ctaSubhead:
      "Review your current home and auto limits with a broker to see whether an umbrella fits your household.",
    ctaButtonLabel: "Talk to a Broker",
    serviceName: "Personal Umbrella Insurance",
  },
  {
    slug: "home-sharing-insurance",
    category: "personal",
    metaTitle:
      "Home & Ride Sharing Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Home, car, and ride-sharing insurance guidance for Windsor-Essex — how personal policies interact with Airbnb, Turo, and platform use, explained by a broker.",
    headline: "Home & Ride Sharing Insurance",
    subhead:
      "Using your home or vehicle on a sharing platform creates coverage questions personal policies were not always designed to answer.",
    quoteHref: "/talk-to-a-broker/",
    quoteLabel: "Talk to a Broker About Sharing Coverage",
    secondaryCta: { label: "Contact Us", href: CONTACT },
    coverageIntro:
      "Sharing-economy use sits at the overlap of personal auto, home, and landlord coverage — and platform policies that may not replace your own.",
    coverageTypes: [
      {
        title: "Short-Term Rental (Home)",
        description:
          "Renting all or part of your home on platforms like Airbnb can trigger exclusions or limits on a standard homeowner policy. Landlord or short-term rental endorsements may be needed.",
        icon: Home,
      },
      {
        title: "Peer-to-Peer Vehicle Sharing",
        description:
          "Lending your personal vehicle through Turo or similar services is often treated as commercial use. Personal auto policies may not respond the same way during paid rentals.",
        icon: Car,
      },
      {
        title: "Ride-Share Driving",
        description:
          "Driving for Uber, Lyft, or delivery apps creates periods when personal auto, platform coverage, and commercial auto may each apply differently.",
        icon: Car,
      },
      {
        title: "Host & Guest Liability",
        description:
          "Injuries to guests, damage to neighbouring units, or theft during a rental can raise liability questions that span home, condo, and landlord policies.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "This guidance is for Windsor-Essex residents who host on Airbnb or similar platforms, rent out a room or cottage, share a vehicle on Turo, or drive for ride-share or delivery apps. The right approach depends on how often you share, what you share, and what your platform agreement actually covers.",
    considerations: [
      {
        title: "Platform coverage is not a full policy",
        description:
          "Sharing platforms may provide limited protection during active bookings or trips, but gaps often exist between bookings, during personal use, or for property damage to your own assets.",
      },
      {
        title: "Condo and landlord rules",
        description:
          "Corporation bylaws, lease terms, and municipal short-term rental rules may restrict or prohibit sharing. Insurance is only one part of the compliance picture.",
      },
      {
        title: "Frequency and income",
        description:
          "Occasional hosting differs from operating like a hotel or rental fleet. Carriers assess how regularly you share and whether income is material to the risk.",
      },
      {
        title: "No single quote category fits every scenario",
        description:
          "Some sharing arrangements do not map cleanly to a standard online quote flow. A broker conversation helps identify whether home, landlord, auto, or commercial options apply.",
      },
    ],
    relatedLinks: [
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Cottage Insurance", href: "/cottage-insurance/" },
    ],
    faqTitle: "Sharing economy insurance FAQ",
    faqIntro: "Common questions when personal property meets platform use.",
    faqItems: [
      {
        question: "Does my home insurance cover Airbnb guests?",
        answer:
          "Many personal home policies limit or exclude short-term rental activity. Hosting paying guests — even occasionally — should be disclosed. Your broker can check whether an endorsement, landlord policy, or specialty market is needed.",
      },
      {
        question: "Am I covered when my car is rented on Turo?",
        answer:
          "Personal auto policies often exclude or restrict vehicle rental to others for a fee. Platform-provided coverage may apply during certain periods, but gaps can exist. Review both your policy and the platform agreement with a broker.",
      },
      {
        question: "What about Uber or Lyft driving?",
        answer:
          "Ride-share drivers typically need coverage that addresses both personal use and app-on periods. Some insurers offer ride-share endorsements; others require a different structure. Tell your broker which platforms and hours apply.",
      },
      {
        question: "Can I get a quote online for sharing use?",
        answer:
          "Standard home and auto quote flows may not capture sharing-economy details accurately. For most platform use, starting with a broker conversation avoids choosing the wrong policy type.",
      },
    ],
    ctaHeading: "Sharing your home or vehicle?",
    ctaSubhead:
      "Describe how you use the platform — we will help clarify where personal, landlord, and auto coverage meet and where gaps may exist.",
    ctaButtonLabel: "Talk to a Broker",
    serviceName: "Home & Ride Sharing Insurance",
  },
  {
    slug: "life-insurance",
    category: "personal",
    metaTitle:
      "Life Insurance Guidance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Life insurance inquiry coordination for Windsor-Essex — Premium connects you with licensed life-insurance professionals through Oracle/head office.",
    eyebrow: "Life Insurance Inquiry",
    headline: "Life Insurance",
    subhead:
      "Premium coordinates your life-insurance inquiry and connects you with a licensed life-insurance professional through our Oracle/head office — separate from our property and casualty quote process.",
    quoteHref: `${CONTACT}?inquiry=life`,
    quoteLabel: "Start a Life Inquiry",
    secondaryCta: { label: "Talk to a Broker", href: "/talk-to-a-broker/" },
    coverageIntro:
      "Life insurance addresses income replacement, debt protection, and legacy planning — a different discipline from home and auto coverage under RIBO-licensed property and casualty advice.",
    coverageTypes: [
      {
        title: "Term Life",
        description:
          "Coverage for a defined period — often used to protect a mortgage, young family, or business loan while obligations are highest.",
        icon: Heart,
      },
      {
        title: "Permanent Life",
        description:
          "Long-term structures that may include a cash value component, depending on product design and your planning goals.",
        icon: Shield,
      },
      {
        title: "Mortgage & Debt Protection",
        description:
          "Life coverage aligned with outstanding loans so beneficiaries are not left carrying major debts after an unexpected loss.",
        icon: Home,
      },
      {
        title: "Business & Key Person",
        description:
          "Life structures that may support buy-sell agreements, key person continuity, or creditor requirements for business owners.",
        icon: Users,
      },
    ],
    whoItIsFor:
      "Life insurance inquiries are for Windsor-Essex individuals and families who want to discuss income protection, mortgage coverage, estate planning, or business continuity. Premium Insurance Brokers coordinates the relationship; licensed life-insurance advice is provided through Oracle/head office specialists — not through our online P&C quote funnel.",
    considerations: [
      {
        title: "Not part of the P&C quote flow",
        description:
          "Our online home and auto quote tools are for property and casualty products under RIBO. Life insurance requires a separate inquiry path with licensed life professionals.",
      },
      {
        title: "Health and lifestyle disclosure",
        description:
          "Life applications involve health history, medications, and lifestyle factors that differ from home or auto underwriting. Accurate disclosure supports appropriate recommendations.",
      },
      {
        title: "Existing workplace coverage",
        description:
          "Group life through an employer may not follow you if you change jobs. Personal coverage can complement — not automatically replace — workplace benefits.",
      },
      {
        title: "Coordination through Premium",
        description:
          "Premium helps initiate and coordinate your inquiry so you speak with the right licensed life specialist without navigating the process alone.",
      },
    ],
    relatedLinks: [
      { label: "Group Home & Auto Programs", href: "/group-home-auto-insurance/" },
      { label: "Contact Us", href: CONTACT },
      { label: "Home Insurance", href: "/home-insurance/" },
    ],
    brokerHeading: "How Premium helps with life insurance",
    brokerCopy:
      "Premium Insurance Brokers coordinates your inquiry and client relationship. Life-insurance advice and product recommendations come from licensed life-insurance professionals through our Oracle/head office — keeping life planning separate from our RIBO property and casualty services.",
    faqTitle: "Life insurance inquiry FAQ",
    faqIntro: "Understanding how life insurance fits with Premium's services.",
    faqItems: [
      {
        question: "Does Premium provide life-insurance advice under RIBO?",
        answer:
          "No. Our RIBO-licensed team focuses on property and casualty insurance — home, auto, and commercial lines. Life-insurance advice is provided by licensed life-insurance professionals through Oracle/head office, and Premium coordinates that connection for you.",
      },
      {
        question: "Why is life insurance separate from the online quote tool?",
        answer:
          "Life products involve different licensing, underwriting, and suitability requirements than P&C policies. A dedicated life inquiry ensures you work with the right specialist rather than a generic quote flow.",
      },
      {
        question: "What happens when I start a life inquiry?",
        answer:
          "Premium collects basic contact and planning context, then coordinates a follow-up with a licensed life professional who can discuss term, permanent, and other options appropriate to your situation.",
      },
      {
        question: "Can I discuss life and home insurance together?",
        answer:
          "Yes — Premium can coordinate both conversations. Just know that life recommendations will come from licensed life specialists, while home and auto advice stays with our P&C team.",
      },
    ],
    ctaHeading: "Ready to explore life insurance?",
    ctaSubhead:
      "Start a life inquiry — Premium will coordinate your connection with a licensed life-insurance professional through Oracle/head office.",
    ctaButtonLabel: "Start a Life Inquiry",
    serviceName: "Life Insurance Inquiry",
  },
  {
    slug: "group-home-auto-insurance",
    category: "personal",
    metaTitle:
      "Group Home & Auto Insurance Programs | Premium Insurance Brokers",
    metaDescription:
      "Group home and auto program inquiry coordination for Windsor-Essex — Premium connects employers and associations with specialist access through Oracle/head office.",
    eyebrow: "Group Programs",
    headline: "Group Home & Auto Insurance",
    subhead:
      "Premium coordinates group program inquiries and specialist access through Oracle/head office — for employers, associations, and member organizations exploring group home and auto options.",
    quoteHref: `${CONTACT}?inquiry=group`,
    quoteLabel: "Start a Group Inquiry",
    secondaryCta: { label: "Talk to a Broker", href: "/talk-to-a-broker/" },
    coverageIntro:
      "Group programs can offer members a coordinated way to access home and auto coverage — but structure, eligibility, and availability depend on the sponsoring organization and participating markets.",
    coverageTypes: [
      {
        title: "Employer-Sponsored Programs",
        description:
          "Workplace arrangements that give employees a dedicated path to discuss home and auto coverage through a group structure.",
        icon: Users,
      },
      {
        title: "Association & Membership Groups",
        description:
          "Professional associations, unions, and member organizations may sponsor group access for home and auto products.",
        icon: Users,
      },
      {
        title: "Home & Auto Coordination",
        description:
          "Group frameworks may bundle personal lines access so members can align home and auto policies under one program umbrella.",
        icon: Home,
      },
      {
        title: "Dedicated Service Path",
        description:
          "Members often receive a defined contact path for quotes, changes, and claims rather than navigating options alone.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Group home and auto inquiries are for Windsor-Essex employers, HR teams, association leaders, and members who want to explore whether a group program fits their organization. Premium coordinates the relationship and connects you with specialist resources through Oracle/head office.",
    considerations: [
      {
        title: "No guaranteed discounts",
        description:
          "Group programs may offer advantages, but pricing depends on the member's individual risk profile, location, and claims history — not every member qualifies for the same rate outcome.",
      },
      {
        title: "Eligibility varies",
        description:
          "Membership status, employment category, and program rules determine who can participate. Your broker will clarify requirements for your specific group.",
      },
      {
        title: "Employer vs. member inquiries",
        description:
          "Organizations exploring sponsorship follow a different path than individual members joining an existing program. Start a group inquiry with your role and organization name.",
      },
      {
        title: "Specialist access through Premium",
        description:
          "Premium coordinates the inquiry and ongoing relationship while specialist program details are handled through Oracle/head office resources.",
      },
    ],
    relatedLinks: [
      { label: "Life Insurance Inquiry", href: "/life-insurance/" },
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Contact Us", href: CONTACT },
    ],
    brokerHeading: "How Premium coordinates group programs",
    brokerCopy:
      "Premium Insurance Brokers manages the client relationship and inquiry coordination. Program structure, carrier participation, and member eligibility are reviewed with specialist resources through Oracle/head office — without promising specific discounts or guaranteed acceptance.",
    faqTitle: "Group home & auto FAQ",
    faqIntro: "What to expect when exploring a group program.",
    faqItems: [
      {
        question: "Are group rates always lower than individual policies?",
        answer:
          "Not necessarily. Group programs may offer convenience and dedicated service, but individual pricing still reflects each member's risk, location, and claims history. We do not promise guaranteed discounts.",
      },
      {
        question: "Who qualifies for a group program?",
        answer:
          "Eligibility depends on the sponsoring employer or association and the program's rules — active employment, membership status, or other criteria may apply. Start a group inquiry to confirm what fits your organization.",
      },
      {
        question: "Can my company set up a new group program?",
        answer:
          "Employers and associations can explore sponsorship through a group inquiry. Premium coordinates the conversation with Oracle/head office specialists who review feasibility and structure.",
      },
      {
        question: "Is this the same as the online home or auto quote?",
        answer:
          "Group programs use a separate inquiry path. The standard online quote tool is for individual P&C policies; group coordination requires understanding your organization's sponsorship or membership context.",
      },
    ],
    ctaHeading: "Exploring a group program?",
    ctaSubhead:
      "Start a group inquiry — tell us whether you represent an employer, association, or member looking to join an existing program.",
    ctaButtonLabel: "Start a Group Inquiry",
    serviceName: "Group Home & Auto Insurance",
  },
];

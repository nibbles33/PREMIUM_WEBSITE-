import {
  Building2,
  Car,
  Heart,
  Home,
  Package,
  Share2,
  Shield,
  Umbrella,
  Users,
} from "lucide-react";
import type { ProductPageContent } from "@/data/product-pages/types";

const CONTACT = "/contact/";
const COVERAGE_QUALIFIER =
  "Coverage, limits, and eligibility vary by insurer and policy. Your broker can help determine the options available for your situation.";

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
    photographySlug: "mobile-home-insurance",
    quoteHref: "/get-a-quote?type=home",
    quoteLabel: "Get a Manufactured Home Quote",
    coverageIntro:
      `Manufactured and mobile home policies address structure, belongings, outbuildings, and liability in ways that differ from ordinary site-built homeowners forms. ${COVERAGE_QUALIFIER}`,
    coverageTypes: [
      {
        id: "dwelling-coverage",
        title: "Manufactured / Mobile Dwelling",
        shortLabel: "Dwelling",
        description:
          "Helps protect the manufactured or mobile home structure against covered perils such as fire, wind, and vandalism.",
        detail:
          "Dwelling coverage for a manufactured or mobile home is intended to respond to covered damage to the unit itself — subject to the home's age, condition, installation, and policy terms. These homes are built and often titled differently from site-built houses, so a conventional homeowner form may not apply without qualification.",
        icon: Home,
      },
      {
        id: "contents-belongings",
        title: "Personal Property",
        shortLabel: "Contents",
        description:
          "Helps protect furniture, appliances, and personal belongings inside the unit.",
        detail:
          "Personal property coverage is intended to respond when belongings inside the manufactured home are stolen or damaged by a covered peril — subject to limits, deductibles, and exclusions. Special items may need scheduling beyond standard sub-limits.",
        icon: Package,
      },
      {
        id: "additional-structures",
        title: "Detached Structures",
        shortLabel: "Structures",
        description:
          "May extend to decks, sheds, carports, and skirting when scheduled or included.",
        detail:
          "Decks, sheds, carports, and skirting are common on manufactured-home properties and may need to be listed or scheduled. Detached structures coverage — where available — is intended to help protect those additions within policy limits.",
        icon: Building2,
      },
      {
        id: "personal-liability",
        title: "Personal Liability",
        shortLabel: "Liability",
        description:
          "May help if someone is injured on your property or you are responsible for damage to others.",
        detail:
          "Personal liability coverage is intended to respond to certain claims alleging bodily injury or property damage for which you are legally liable — including some incidents on the lot or adjacent areas — subject to policy terms. Owned land vs. a leased park pad can change how exposures are underwritten.",
        icon: Shield,
      },
      {
        id: "additional-living-expenses",
        title: "Additional Living Expenses",
        shortLabel: "ALE",
        description:
          "May help with temporary lodging if a covered loss makes the home unlivable during repairs.",
        detail:
          "When a covered loss forces you out of a manufactured or mobile home, additional living expenses coverage — where included — is intended to help with reasonable extra costs of temporary accommodation while repairs or replacement are arranged, within policy limits. Settlement approaches can differ from site-built homes based on age, condition, and insurer guidelines.",
        icon: Home,
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
    photographySlug: "personal-umbrella-insurance",
    quoteHref: "/contact/?intent=broker",
    quoteLabel: "Talk to a Broker About Umbrella Coverage",
    coverageIntro:
      `An umbrella sits above your underlying personal liability limits — it is excess protection, not a replacement for home or auto coverage, and it does not cover every type of loss. ${COVERAGE_QUALIFIER}`,
    coverageTypes: [
      {
        id: "excess-liability-limits",
        title: "Excess Personal Liability",
        shortLabel: "Excess Liability",
        description:
          "Adds liability limits above what your underlying home, auto, or other eligible personal policies provide.",
        detail:
          "Personal umbrella coverage is primarily excess liability protection. When a covered liability claim exceeds the limit on an underlying home, auto, or other eligible personal policy, the umbrella is intended to respond above that underlying limit — subject to umbrella terms, exclusions, and the requirement that underlying policies remain in force at required minimums.",
        icon: Umbrella,
      },
      {
        id: "broad-personal-liability",
        title: "Protection Above Underlying Limits",
        shortLabel: "Above Limits",
        description:
          "Helps explain how an umbrella relates to the liability limits already on your home and auto policies.",
        detail:
          "Think of the umbrella as an additional layer: your home and auto policies respond first up to their liability limits; the umbrella may then respond for covered amounts above those limits. Increasing an auto liability limit alone is not the same as coordinating excess protection across multiple underlying policies.",
        icon: Shield,
      },
      {
        id: "legal-defence-costs",
        title: "Underlying Policy Requirements",
        shortLabel: "Underlying",
        description:
          "Umbrella carriers typically require minimum liability limits on your home and auto before the umbrella attaches.",
        detail:
          "Most umbrella insurers require that eligible underlying home and auto policies carry minimum liability limits before the umbrella will attach. If an underlying policy lapses or drops below required limits, umbrella protection may not respond as expected. Your broker will confirm what a given umbrella market requires for your household.",
        icon: Home,
      },
      {
        id: "worldwide-coverage",
        title: "Broader Liability Protection",
        shortLabel: "Broader Liability",
        description:
          "May extend to certain liability situations beyond a single underlying policy — still subject to exclusions.",
        detail:
          "Some umbrella policies may respond to a broader set of personal liability exposures than a single underlying policy alone — and some extend personally while travelling — but umbrella insurance does not cover every type of loss. Business activities, intentional acts, professional liability, and many contractual obligations are commonly excluded. An umbrella is not a catch-all for every claim.",
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
    photographySlug: "home-sharing-insurance",
    quoteHref: "/contact/?intent=broker",
    quoteLabel: "Talk to a Broker About Sharing Coverage",
    secondaryCta: { label: "Contact Us", href: CONTACT },
    coverageIntro:
      `Sharing your home or vehicle creates exposures personal policies were not always designed for — and platform protection does not automatically replace your own insurance. ${COVERAGE_QUALIFIER}`,
    coverageTypes: [
      {
        id: "short-term-rental-home",
        title: "Personal Policy Limitations",
        shortLabel: "Limitations",
        description:
          "Standard home and auto policies often limit or exclude paid sharing activity during active use.",
        detail:
          "Many personal home and auto policies restrict or exclude activity that looks like a business — including paid short-term hosting and vehicle rentals. Relying on a personal policy alone during sharing activity can leave gaps. Disclose how you share so your broker can identify whether endorsements, landlord forms, or specialty markets are needed.",
        icon: Shield,
      },
      {
        id: "peer-to-peer-vehicle-sharing",
        title: "Home-Sharing Exposure",
        shortLabel: "Home Sharing",
        description:
          "Hosting guests through Airbnb or similar platforms can change property and liability exposure overnight.",
        detail:
          "Renting all or part of your home to paying guests can trigger exclusions or limits on a standard homeowner or condo policy. Platform host guarantees are not a full substitute for your own insurance. Landlord or short-term rental endorsements — where available — may be needed depending on frequency and how the property is used.",
        icon: Home,
      },
      {
        id: "ride-share-driving",
        title: "Ride-Sharing / Delivery Exposure",
        shortLabel: "Ride Sharing",
        description:
          "Driving for Uber, Lyft, or delivery apps creates periods when personal auto and platform coverage interact differently.",
        detail:
          "App-on periods, passenger trips, and delivery use are often treated differently from ordinary personal driving. Platform coverage may apply only in limited windows and may not replace physical damage or liability protection you expect from a personal auto policy. Some insurers offer ride-share endorsements; others require a different structure.",
        icon: Car,
      },
      {
        id: "host-guest-liability",
        title: "Liability & Property Gaps",
        shortLabel: "Gaps",
        description:
          "Guest injuries, neighbouring-unit damage, and vehicle damage during sharing can fall between personal and platform policies.",
        detail:
          "Injuries to guests, damage to neighbouring units, theft during a rental, or damage while a vehicle is rented out can raise liability and property questions that span home, condo, landlord, and auto policies. Platform protection does not automatically fill every gap — and not every insurer accepts every sharing activity.",
        icon: Share2,
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
    photographySlug: "life-insurance",
    quoteHref: `${CONTACT}?inquiry=life`,
    quoteLabel: "Start a Life Inquiry",
    secondaryCta: { label: "Talk to a Broker", href: "/contact/?intent=broker" },
    coverageIntro:
      "Life insurance is informational and inquiry-focused here — Premium coordinates your connection with licensed life professionals through Oracle/head office. This is not individualized financial advice, and Premium does not underwrite life coverage itself.",
    coverageTypes: [
      {
        id: "term-life",
        title: "Term Life",
        shortLabel: "Term",
        description:
          "Coverage for a defined period — often used while a mortgage, young family, or major obligation is highest.",
        detail:
          "Term life provides a death benefit for a set term if premiums are maintained and the policy remains in force. It is commonly discussed for income protection during working years or while a mortgage is outstanding. Product availability, amounts, and underwriting depend on the life specialist and insurer — not on Premium's P&C quote tools.",
        icon: Heart,
      },
      {
        id: "permanent-life",
        title: "Permanent Life",
        shortLabel: "Permanent",
        description:
          "Longer-term structures that may include cash-value features, depending on product design.",
        detail:
          "Permanent life products (where available) are designed for longer-term needs and may include a cash-value component depending on design. Suitability depends on goals, budget, and underwriting — recommendations come from licensed life professionals, not from a generic online quote.",
        icon: Shield,
      },
      {
        id: "family-income-protection",
        title: "Family / Income Protection",
        shortLabel: "Income",
        description:
          "Life coverage can help protect household income for dependents after an unexpected loss.",
        detail:
          "Many families explore life coverage so dependents have resources to maintain housing, childcare, and living costs if a primary earner dies. Needs vary widely; a licensed life professional can discuss concepts — this page does not provide personalized financial advice.",
        icon: Users,
      },
      {
        id: "mortgage-debt-protection",
        title: "Mortgage / Debt Considerations",
        shortLabel: "Debt",
        description:
          "Coverage aligned with outstanding loans so beneficiaries are not left carrying major debts alone.",
        detail:
          "Mortgage and debt-related life discussions often focus on whether survivors would want resources available to pay down loans. Business or estate considerations may also arise for some households. Premium coordinates the inquiry; licensed life specialists through Oracle/head office provide product guidance.",
        icon: Home,
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
    photographySlug: "group-home-auto-insurance",
    quoteHref: `${CONTACT}?inquiry=group`,
    quoteLabel: "Start a Group Inquiry",
    secondaryCta: { label: "Talk to a Broker", href: "/contact/?intent=broker" },
    coverageIntro:
      "Group home and auto programs are organizational arrangements — not a guarantee of savings, and not every employer or association qualifies. Premium coordinates inquiries and specialist access through Oracle/head office.",
    coverageTypes: [
      {
        id: "employer-sponsored-programs",
        title: "Employer & Association Arrangements",
        shortLabel: "Group Access",
        description:
          "Employers, associations, and member organizations may sponsor a path to discuss home and auto coverage.",
        detail:
          "Group programs typically start with a sponsoring employer, union, professional association, or membership organization. Sponsorship rules and carrier participation determine who can inquire — not every organization qualifies, and eligibility is confirmed through the program process rather than assumed.",
        icon: Users,
      },
      {
        id: "association-membership-groups",
        title: "Home & Auto Access",
        shortLabel: "Home & Auto",
        description:
          "Members may access personal home and auto insurance discussions through the group's program pathway.",
        detail:
          "Where a group program exists, members can often discuss home and auto coverage through a defined pathway rather than shopping entirely alone. Individual underwriting still applies — location, claims history, and risk profile continue to matter for each member.",
        icon: Home,
      },
      {
        id: "home-auto-coordination",
        title: "Potential Program Advantages",
        shortLabel: "Advantages",
        description:
          "Programs may offer convenience and coordinated service — pricing still depends on each member's risk.",
        detail:
          "Group arrangements may offer dedicated service paths or program features, but they do not guarantee lower premiums for every member. Advantages, if any, depend on the program, the participating markets, and the member's individual risk profile.",
        icon: Shield,
      },
      {
        id: "dedicated-service-path",
        title: "Broker Assistance & Inquiry Process",
        shortLabel: "Inquiry",
        description:
          "Premium helps coordinate the inquiry — whether you represent an organization or a member seeking to join.",
        detail:
          "Start a group inquiry with your role (employer, association leader, or member), organization name, and what you are exploring. Premium coordinates the relationship and connects you with specialist resources through Oracle/head office without promising discounts or guaranteed acceptance.",
        icon: Car,
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

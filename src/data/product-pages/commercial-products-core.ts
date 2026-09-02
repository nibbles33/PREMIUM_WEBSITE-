import {
  Briefcase,
  Building2,
  FileCheck,
  Gavel,
  HardHat,
  Laptop,
  Package,
  Route,
  Shield,
  Store,
  Truck,
  Wrench,
} from "lucide-react";
import { QUOTE_BUSINESS } from "@/data/commercial-industries";
import type { ProductPageContent } from "@/data/product-pages/types";

export const commercialProductPages: ProductPageContent[] = [
  {
    slug: "small-business-insurance",
    category: "commercial",
    metaTitle:
      "Small Business Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Small business insurance for Windsor-Essex — general liability, property, and commercial auto packaged for owner-operators and growing businesses.",
    headline: "Small Business Insurance",
    subhead:
      "Core commercial coverages for Windsor-Essex small businesses — liability, property, and the endorsements that match how you actually operate.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Business Quote",
    coverageIntro:
      "Most small businesses start with a foundation of liability and property protection, then add coverages as operations grow.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against third-party injury or property damage claims tied to your business operations, premises, or products.",
        icon: Briefcase,
      },
      {
        title: "Commercial Property",
        description:
          "Covers your equipment, inventory, and leasehold improvements against covered theft, fire, or other insured losses.",
        icon: Store,
      },
      {
        title: "Commercial Auto",
        description:
          "Addresses vehicles used for business — delivery vans, service trucks, and employee-driven company cars.",
        icon: Truck,
      },
      {
        title: "Business Interruption",
        description:
          "Can help replace lost income if a covered property loss forces a temporary shutdown.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "Small business insurance is for Windsor-Essex owner-operators, storefronts, home-based businesses, and growing teams that need liability and property protection without overbuying coverage they do not need.",
    considerations: [
      {
        title: "Home-based operations",
        description:
          "Running a business from home often requires endorsements or a separate policy — personal home insurance typically limits business activity.",
      },
      {
        title: "Contract requirements",
        description:
          "Clients and landlords may require specific liability limits, additional insured status, or certificates before you start work.",
      },
      {
        title: "Scaling with growth",
        description:
          "Adding employees, vehicles, or a second location changes your exposure. Review coverage when revenue, payroll, or operations shift materially.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
    ],
    faqTitle: "Small business insurance FAQ",
    faqItems: [
      {
        question: "What insurance does a new small business need first?",
        answer:
          "Most start with general liability and commercial property if they have equipment or inventory. Businesses with vehicles, employees, or professional advice need additional coverages from day one.",
      },
      {
        question: "Is my home business covered by my home policy?",
        answer:
          "Usually not fully. Home policies often limit or exclude business property and liability. Tell your broker about any business run from home.",
      },
      {
        question: "How is small business insurance priced?",
        answer:
          "Carriers look at industry, revenue or payroll, location, claims history, and specific exposures. Two similar businesses can price differently based on operations details.",
      },
      {
        question: "Can I bundle coverages?",
        answer:
          "Many small businesses package liability, property, and optional coverages into a business owners policy or commercial package when carriers allow it.",
      },
    ],
    ctaHeading: "Ready to protect your small business?",
    ctaSubhead:
      "Tell us what you do, where you operate, and what you own — we will compare options that fit your stage of growth.",
    serviceName: "Small Business Insurance",
  },
  {
    slug: "landscaping-snow-removal-insurance",
    category: "commercial",
    metaTitle:
      "Landscaping & Snow Removal Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Landscaping and snow removal insurance — general liability, equipment, commercial auto, and seasonal operations coverage for Windsor-Essex contractors.",
    headline: "Landscaping & Snow Removal Insurance",
    subhead:
      "Coverage for seasonal and year-round outdoor service businesses — from mowers and plows to slip-and-fall liability on client properties.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=contractor`,
    quoteLabel: "Get a Landscaping Quote",
    coverageIntro:
      "Landscaping and snow removal combine equipment, property damage, and slip-and-fall exposures across many job sites.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Helps protect against claims for property damage or injury caused while working on client properties — including slip-and-fall incidents after snow clearing.",
        icon: Briefcase,
      },
      {
        title: "Tools & Equipment",
        description:
          "Can cover mowers, blowers, plows, and trailers against theft or damage, subject to policy terms and scheduled limits.",
        icon: Wrench,
      },
      {
        title: "Commercial Auto",
        description:
          "Covers trucks, plow rigs, and trailers used to reach job sites and transport equipment.",
        icon: Truck,
      },
      {
        title: "Completed Operations",
        description:
          "Addresses liability claims that arise after your work is finished — such as alleged drainage issues from a landscaping project.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Landscaping and snow removal insurance is for Windsor-Essex lawn care companies, snow plow operators, property maintenance crews, and seasonal contractors serving residential and commercial clients.",
    considerations: [
      {
        title: "Seasonal revenue swings",
        description:
          "Snow and landscape seasons peak at different times. Revenue declarations and equipment in storage during off-seasons should be reflected accurately.",
      },
      {
        title: "Subcontractor use",
        description:
          "If you hire subs for plowing or hardscaping, certificate requirements and additional insured wording may apply on commercial contracts.",
      },
      {
        title: "Salt and sand spreading",
        description:
          "Slip-and-fall claims after clearing can involve long-tail liability. Contract scope — walkways vs. parking lots — matters for coverage discussions.",
      },
    ],
    relatedLinks: [
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
    ],
    faqTitle: "Landscaping & snow removal FAQ",
    faqItems: [
      {
        question: "Am I covered if someone slips after I plow a lot?",
        answer:
          "General liability may respond to third-party injury claims, subject to policy terms, maintenance standards, and what your contract required. Snow removal contracts often specify insurance minimums.",
      },
      {
        question: "Are my tools covered if stolen from a truck?",
        answer:
          "Only with appropriate tools or inland marine coverage. Standard liability policies do not replace stolen equipment.",
      },
      {
        question: "Do I need commercial auto for a pickup with a plow?",
        answer:
          "Vehicles used for business — including plow trucks — typically need commercial auto, not a personal policy.",
      },
      {
        question: "Can one policy cover both landscaping and snow removal?",
        answer:
          "Often yes, but both activities should be disclosed so revenue splits and seasonal operations are rated correctly.",
      },
    ],
    ctaHeading: "Run a landscaping or snow removal business?",
    ctaSubhead:
      "Share your equipment, contracts, and seasonal split — we will compare liability and auto options for your operation.",
    serviceName: "Landscaping & Snow Removal Insurance",
  },
  {
    slug: "cyber-insurance",
    category: "commercial",
    metaTitle:
      "Cyber Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cyber liability insurance for Windsor-Essex businesses — data breach response, ransomware, and network security incidents through an independent broker.",
    headline: "Cyber Insurance",
    subhead:
      "Coverage for digital incidents that standard liability policies often exclude — from ransomware to client data breaches.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get a Cyber Quote",
    photographySlug: "professional-offices-insurance",
    coverageIntro:
      "Cyber policies help with costs tied to security incidents, privacy events, and business disruption from attacks on your systems.",
    coverageTypes: [
      {
        title: "Data Breach Response",
        description:
          "Can help with notification costs, credit monitoring, and forensic investigation after unauthorized access to personal or client data.",
        icon: Laptop,
      },
      {
        title: "Ransomware & Extortion",
        description:
          "May address ransom payments and recovery costs when systems are encrypted or held hostage, subject to policy terms and prior security controls.",
        icon: Shield,
      },
      {
        title: "Business Interruption (Cyber)",
        description:
          "Can help replace income lost when a cyber event shuts down operations you depend on digitally.",
        icon: Building2,
      },
      {
        title: "Privacy Liability",
        description:
          "Addresses claims from third parties alleging your business failed to protect their data or violated privacy obligations.",
        icon: Briefcase,
      },
    ],
    whoItIsFor:
      "Cyber insurance is for Windsor-Essex businesses that store client data, process payments online, rely on cloud systems, or would struggle to operate without functioning networks — from professional offices to retailers and manufacturers.",
    considerations: [
      {
        title: "Security controls matter",
        description:
          "Carriers often ask about multi-factor authentication, backups, patching, and employee training. Weak controls can affect availability and terms.",
      },
      {
        title: "Not a substitute for IT hygiene",
        description:
          "Cyber insurance responds after an incident. Prevention — backups, access controls, and incident planning — remains essential.",
      },
      {
        title: "Regulatory notification",
        description:
          "Privacy laws may require breach notification on a timeline. Cyber policies can help with legal and notification costs when coverage applies.",
      },
    ],
    relatedLinks: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
      { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
    ],
    faqTitle: "Cyber insurance FAQ",
    faqItems: [
      {
        question: "Does general liability cover cyber attacks?",
        answer:
          "Usually not. Standard GL policies often exclude or severely limit cyber and privacy events. Dedicated cyber coverage addresses those gaps.",
      },
      {
        question: "Do small businesses need cyber insurance?",
        answer:
          "Small businesses are frequent targets because defenses are often lighter. If you hold client data or depend on systems to invoice and operate, cyber coverage is worth discussing.",
      },
      {
        question: "What information do carriers ask for?",
        answer:
          "Expect questions about data types stored, payment processing, backup practices, MFA use, prior incidents, and revenue. Honest answers help match the right market.",
      },
      {
        question: "Does cyber cover employee mistakes?",
        answer:
          "Many policies respond to incidents caused by employee error — such as misdirected emails with sensitive attachments — subject to policy wording.",
      },
    ],
    ctaHeading: "Concerned about cyber risk?",
    ctaSubhead:
      "Tell us how your business uses data and systems — we will compare cyber options alongside your existing liability coverage.",
    serviceName: "Cyber Insurance",
  },
  {
    slug: "directors-officers-insurance",
    category: "commercial",
    metaTitle:
      "Directors & Officers (D&O) Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Directors and officers liability insurance for Windsor-Essex — protection for board members and executives against management liability claims.",
    headline: "Directors & Officers (D&O) Insurance",
    subhead:
      "Coverage for directors, officers, and board members when management decisions face legal challenge from shareholders, regulators, or stakeholders.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get a D&O Quote",
    coverageIntro:
      "D&O policies address personal liability exposures leaders face when acting in their official capacity.",
    coverageTypes: [
      {
        title: "Side A — Individual Coverage",
        description:
          "Protects directors and officers personally when the organization cannot indemnify them.",
        icon: Shield,
      },
      {
        title: "Side B — Corporate Reimbursement",
        description:
          "Reimburses the organization when it indemnifies directors and officers for covered claims.",
        icon: Briefcase,
      },
      {
        title: "Side C — Entity Coverage",
        description:
          "May extend to the organization itself for securities or entity claims, depending on policy form.",
        icon: Building2,
      },
      {
        title: "Defence Costs",
        description:
          "Can cover legal defence for covered management liability claims, often irrespective of outcome.",
        icon: Gavel,
      },
    ],
    whoItIsFor:
      "D&O insurance is for Windsor-Essex corporations, nonprofits with boards, startups with investors, and private companies whose directors want protection when management decisions are challenged.",
    considerations: [
      {
        title: "Private vs. public company forms",
        description:
          "Public, private, and nonprofit D&O programs differ in structure and claims history expectations. Disclose your organization type accurately.",
      },
      {
        title: "Investor and lender requirements",
        description:
          "Venture investors and lenders may require D&O as a condition of funding. Limits and tail coverage should align with agreements.",
      },
      {
        title: "Employment practices overlap",
        description:
          "Wrongful termination and harassment claims may fall under EPL insurance rather than D&O. Both may be needed for leadership teams.",
      },
    ],
    relatedLinks: [
      { label: "Employment Practices Liability", href: "/employment-practices-liability-insurance/" },
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
    ],
    faqTitle: "D&O insurance FAQ",
    faqItems: [
      {
        question: "Who needs D&O insurance?",
        answer:
          "Any organization with a board or executive team facing management liability — including employment-related shareholder suits, regulatory investigations, and alleged mismanagement.",
      },
      {
        question: "Does general liability cover directors personally?",
        answer:
          "No. GL covers the organization's operational liability, not personal claims against directors for management decisions.",
      },
      {
        question: "Do nonprofits need D&O?",
        answer:
          "Nonprofit boards face similar personal liability exposures — especially around employment, governance, and regulatory compliance.",
      },
      {
        question: "What triggers a D&O claim?",
        answer:
          "Examples include shareholder lawsuits, regulatory actions, creditor claims alleging mismanagement, and certain employment-related claims against directors.",
      },
    ],
    ctaHeading: "Protect your leadership team?",
    ctaSubhead:
      "Share your organization type, board structure, and funding stage — we will compare D&O options that fit.",
    serviceName: "Directors & Officers Insurance",
  },
  {
    slug: "business-interruption-insurance",
    category: "commercial",
    metaTitle:
      "Business Interruption Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Business interruption insurance for Windsor-Essex — income replacement and ongoing expense coverage when a covered property loss stops operations.",
    headline: "Business Interruption Insurance",
    subhead:
      "Helps replace lost income and cover ongoing expenses when a covered property loss forces your business to slow down or shut temporarily.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Business Quote",
    photographySlug: "commercial-property-insurance",
    coverageIntro:
      "Business interruption sits alongside commercial property — it addresses the income impact, not the physical repair itself.",
    coverageTypes: [
      {
        title: "Lost Income",
        description:
          "Can replace net income you would have earned during a covered shutdown, subject to waiting periods and policy limits.",
        icon: Briefcase,
      },
      {
        title: "Continuing Expenses",
        description:
          "Helps pay rent, payroll, loan payments, and other obligations that continue while operations are disrupted.",
        icon: Building2,
      },
      {
        title: "Extra Expense",
        description:
          "Covers additional costs to resume operations faster — temporary location, rented equipment, or expedited repairs.",
        icon: Package,
      },
      {
        title: "Contingent Business Interruption",
        description:
          "May address income loss when a key supplier or customer suffers a covered loss that disrupts your supply chain.",
        icon: Route,
      },
    ],
    whoItIsFor:
      "Business interruption coverage is for Windsor-Essex businesses that would struggle to pay rent, payroll, and loans if a fire, flood, or other covered property loss closed their doors for weeks or months.",
    considerations: [
      {
        title: "Requires underlying property coverage",
        description:
          "Business interruption typically triggers only after a covered property loss on an insured peril. It is not standalone income protection for market downturns.",
      },
      {
        title: "Waiting periods",
        description:
          "Policies often include a waiting period before income replacement begins. Shorter waiting periods usually cost more.",
      },
      {
        title: "Indemnity period length",
        description:
          "Choose a restoration period long enough to rebuild and resume normal revenue — underestimating extends your uninsured gap.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
    ],
    faqTitle: "Business interruption FAQ",
    faqItems: [
      {
        question: "Does business interruption cover COVID or pandemic shutdowns?",
        answer:
          "Standard business interruption tied to property policies typically requires physical damage from a covered peril. Pandemic-related closures are generally excluded unless specifically added.",
      },
      {
        question: "How is the income loss calculated?",
        answer:
          "Carriers use financial records — profit and loss statements, tax returns — to project what you would have earned during the indemnity period, minus saved expenses.",
      },
      {
        question: "Can I buy business interruption without property insurance?",
        answer:
          "Usually no. BI is typically an endorsement or component of a commercial property program.",
      },
      {
        question: "What is extra expense coverage?",
        answer:
          "It pays additional costs to minimize the shutdown — like renting temporary space — even if those costs exceed the income loss alone.",
      },
    ],
    ctaHeading: "Could your business survive a long shutdown?",
    ctaSubhead:
      "Walk through realistic downtime scenarios with a broker and align indemnity periods with your recovery timeline.",
    serviceName: "Business Interruption Insurance",
  },
  {
    slug: "professional-liability-insurance",
    category: "commercial",
    metaTitle:
      "Professional Liability (E&O) Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Professional liability and E&O insurance for accountants, consultants, engineers, financial advisors, and IT professionals in Windsor-Essex.",
    headline: "Professional Liability (E&O) Insurance",
    subhead:
      "Errors and omissions coverage when clients claim your professional advice, design, or service caused them a financial loss.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get an E&O Quote",
    photographySlug: "professional-offices-insurance",
    coverageIntro:
      "Professional liability responds when clients allege negligent advice or services — distinct from slip-and-fall general liability.",
    coverageTypes: [
      {
        title: "Accountants & Bookkeepers",
        description:
          "Addresses claims alleging errors in tax preparation, audits, financial statements, or advisory work that caused client loss.",
        icon: FileCheck,
      },
      {
        title: "Consultants & Advisors",
        description:
          "Covers management, HR, marketing, and business consultants when clients claim recommendations led to financial harm.",
        icon: Briefcase,
      },
      {
        title: "Engineers & Architects",
        description:
          "Responds to design, specification, or inspection errors alleged to have caused property damage or project delays.",
        icon: HardHat,
      },
      {
        title: "Financial Advisors & IT Consultants",
        description:
          "Covers investment advice errors and technology implementation failures that clients claim caused measurable loss.",
        icon: Laptop,
      },
    ],
    whoItIsFor:
      "Professional liability insurance is for Windsor-Essex professionals who charge for advice, design, or specialized services — including accountants, consultants, engineers, architects, financial advisors, IT consultants, and other regulated or credentialed occupations.",
    considerations: [
      {
        title: "Claims-made vs. occurrence",
        description:
          "Most E&O policies are claims-made — coverage applies when the claim is reported during the policy period. Retroactive dates and tail coverage matter when changing carriers.",
      },
      {
        title: "Contractual liability",
        description:
          "Contracts may impose liability beyond standard negligence. Review indemnity clauses with your broker before signing.",
      },
      {
        title: "Regulatory and association requirements",
        description:
          "Professional bodies and provincial regulators may mandate minimum E&O limits. Confirm your coverage meets those standards.",
      },
    ],
    relatedLinks: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
    ],
    faqTitle: "Professional liability FAQ",
    faqItems: [
      {
        question: "What's the difference between GL and professional liability?",
        answer:
          "General liability covers bodily injury and property damage to others. E&O covers financial loss claims arising from your professional services or advice.",
      },
      {
        question: "Do IT consultants need E&O?",
        answer:
          "Yes — clients may claim your software implementation, security advice, or project management caused business interruption or data loss. Cyber and E&O often complement each other.",
      },
      {
        question: "Are prior acts covered when I switch insurers?",
        answer:
          "Claims-made policies use a retroactive date. Work done before that date may be excluded unless tail coverage is purchased from the prior insurer.",
      },
      {
        question: "What limits do clients typically require?",
        answer:
          "Contract requirements vary — $1M to $5M per occurrence is common for mid-size engagements. Your broker can issue certificates once limits are in place.",
      },
    ],
    ctaHeading: "Provide professional advice or design?",
    ctaSubhead:
      "Tell us your profession, services, and typical contract size — we will compare E&O markets that understand your work.",
    serviceName: "Professional Liability Insurance",
  },
];

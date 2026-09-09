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
          "Intended to insure your equipment, inventory, and leasehold improvements for theft, fire, and other insured perils — subject to causes of loss, limits, deductibles, and policy terms.",
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
      "Directors and officers liability insurance for Windsor-Essex — management liability for directors, officers, and boards subject to policy wording and Side A/B/C structure.",
    headline: "Directors & Officers (D&O) Insurance",
    subhead:
      "Directors and officers liability insurance may help respond to certain claims alleging wrongful acts by directors, officers, or other insured persons in their management or governance capacities — subject to policy definitions, exclusions, claims-made conditions, and reporting requirements. It is not a guarantee against every personal liability, not a replacement for professional liability when you render professional services, and not a substitute for employment practices liability when the dispute is primarily an employment claim. Typical programs use Side A (individual), Side B (corporate reimbursement), and — where included — Side C (entity) coverage, but not every form uses an identical ABC structure, and entity coverage varies materially by organization type. Defence costs are often a major part of the product and may erode available limits depending on the form. Premium Insurance Brokers can help Windsor–Essex corporations, nonprofits, and private companies compare D&O structure against board composition, funding stage, and related management-liability needs.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get a D&O Quote",
    coverageIntro:
      "D&O is management liability insurance for certain alleged wrongful acts in governance or executive roles. Side A, Side B, and Side C address different payees and claim paths — subject to the form — and defence costs often sit inside shared limits unless wording provides otherwise.",
    coverageTypes: [
      {
        title: "Side A — Individual Coverage",
        shortLabel: "Side A",
        description:
          "May help respond to certain covered loss that insured directors or officers must bear personally when the organization cannot or does not indemnify them — subject to policy terms.",
        detailTitle: "Personal assets are exposed when indemnification fails",
        detailDescription:
          "Side A matters most in insolvency or non-indemnifiable situations. It does not erase every personal exposure — conduct exclusions and final-adjudication language still apply. Confirm who qualifies as an insured person under the form.",
        icon: Shield,
      },
      {
        title: "Side B — Corporate Reimbursement",
        shortLabel: "Side B",
        description:
          "May reimburse the organization when it indemnifies directors or officers for covered claims — typically subject to a retention.",
        detailTitle: "The company’s indemnity promise needs balance-sheet backup",
        detailDescription:
          "Side B protects the entity’s cash after it advances defence or settlement for individuals under corporate law and by-laws. Deductibles or retentions usually attach here rather than on Side A. Indemnification capacity and insurance response remain separate questions.",
        icon: Briefcase,
      },
      {
        title: "Side C — Entity Coverage",
        shortLabel: "Side C",
        description:
          "May extend to certain claims against the organization itself — scope varies materially by form and whether the insured is public, private, or nonprofit.",
        detailTitle: "Entity coverage is not one-size-fits-all",
        detailDescription:
          "Public-company Side C is often limited to securities claims. Private and nonprofit forms may be broader or packaged differently. Do not assume Side C covers every lawsuit naming the company — many operational claims belong in general liability, professional liability, or EPL instead.",
        icon: Building2,
      },
      {
        title: "Defence Costs",
        shortLabel: "Defence",
        description:
          "May help with legal defence costs for covered claims — often on a claims-made basis. Defence costs frequently erode shared policy limits unless the form provides otherwise.",
        detailTitle: "Legal bills can consume the limit before settlement",
        detailDescription:
          "Management liability disputes are expensive. Confirm whether defence is inside or outside limits, how advancement works, and reporting deadlines after a claim or circumstance. Defence is not an automatic unlimited benefit irrespective of outcome or wording.",
        icon: Gavel,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex corporations, nonprofit boards, startups with investors, and private companies whose directors and officers need management liability reviewed through an independent broker — including Side structure, claims-made reporting, and coordination with EPL where employment exposure overlaps.",
    considerations: [
      {
        title: "Private, public, and nonprofit forms differ",
        description:
          "Organization type drives Side C scope, underwriting questions, and claims history expectations. Public, private, and nonprofit D&O programs are not interchangeable. Disclose structure, ownership, and board composition accurately.",
      },
      {
        title: "Side A / B / C structure and retentions",
        description:
          "Not every policy uses an identical ABC layout. Confirm who is an insured person, when Side A responds without indemnification, how Side B retentions apply, and whether entity coverage exists at all for your organization type.",
      },
      {
        title: "Claims-made reporting and prior/pending litigation",
        description:
          "D&O is typically claims-made. Continuity dates, prior-and-pending litigation exclusions, and notice of circumstances affect whether a matter is covered. Late reporting can jeopardize defence and indemnity.",
      },
      {
        title: "Defence costs inside vs outside limits",
        description:
          "Many management liability forms treat defence costs as eroding the shared limit. Some enhancements place defence outside limits — do not assume that treatment. Ask how advancement and allocation work when covered and uncovered allegations are mixed.",
      },
      {
        title: "Conduct, fraud, and insured-vs-insured exclusions",
        description:
          "Dishonesty and fraud exclusions with final-adjudication language are common. Insured-versus-insured provisions can restrict certain internal disputes. Read these carefully before assuming every stakeholder claim is covered.",
      },
      {
        title: "EPL and professional liability overlap",
        description:
          "Employment allegations against leadership may belong primarily in EPL. Errors in rendering professional services belong in professional liability. D&O focuses on management and governance wrongful acts — many organizations need more than one product.",
      },
      {
        title: "M&A, change in control, insolvency, and runoff",
        description:
          "Ownership changes, mergers, and insolvency can trigger change-in-control provisions, runoff or tail needs, and Side A importance when indemnification fails. Tell your broker about planned transactions before they close.",
      },
      {
        title: "Investor, lender, and contract insurance schedules",
        description:
          "Venture investors and lenders may require D&O evidence, minimum limits, or tail coverage as a condition of funding. Align policy structure with those schedules rather than assuming a certificate expands wording.",
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
        question: "Does D&O protect the company, the directors, or both?",
        answer:
          "It depends on the form. Side A may help with certain personal loss when insured individuals are not indemnified. Side B may reimburse the organization after it indemnifies them. Side C, where included, may address certain claims against the entity itself — with scope that varies by organization type. Many programs combine these concepts; none erase every personal or corporate exposure.",
      },
      {
        question: "What are Side A, Side B, and Side C?",
        answer:
          "Side A typically benefits individual directors and officers when the organization cannot or will not indemnify. Side B reimburses the organization for indemnification of insured persons. Side C may extend to the organization for certain entity claims — often narrower for public companies (for example, securities-focused) and different again for private or nonprofit forms. Confirm the actual schedule on your policy.",
      },
      {
        question: "Are defence costs covered — and do they reduce the limit?",
        answer:
          "Defence costs for covered claims may be available subject to policy wording, retentions, and reporting. On many forms, defence costs erode shared limits unless an enhancement places defence outside limits. Do not assume defence is unlimited or always outside the limit.",
      },
      {
        question: "Does commercial general liability cover management decisions?",
        answer:
          "Commercial general liability is primarily designed for certain bodily injury and property-damage exposures arising from operations — not for personal management-liability claims against directors and officers alleging wrongful acts in governance. D&O addresses a different class of allegation. Some employment matters may also belong in EPL rather than CGL or D&O alone.",
      },
      {
        question: "What happens to coverage after ownership or control changes?",
        answer:
          "Change-in-control, merger, or sale provisions can alter who is covered, freeze the policy into runoff, or require new coverage for the surviving entity. Tail or runoff options may be needed for prior acts. Notify your broker before ownership changes close so continuity and prior/pending issues can be reviewed.",
      },
    ],
    ctaHeading: "Protect your leadership team?",
    ctaSubhead:
      "Share your organization type, board structure, and funding stage — we will compare D&O options that fit alongside EPL where needed.",
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
      "Professional liability and E&O insurance for Windsor-Essex businesses and professionals — most commercial E&O is claims-made, so retroactive dates, reporting, and contract coordination matter.",
    headline: "Professional Liability (E&O) Insurance",
    subhead:
      "When a client alleges your professional advice, design, analysis, or service caused them a financial loss, professional liability — also called errors and omissions (E&O) — may help with defence costs and certain settlements or judgments, subject to the policy you purchase. That is a different risk from slip-and-fall general liability, office property, cyber breach response, or directors and officers coverage. Most commercial E&O forms are claims-made, meaning when and how a claim is reported, your retroactive date, and any extended reporting period matter as much as the limit on the declarations page. Premium Insurance Brokers can help Windsor–Essex professionals compare markets for how you actually practise — including contract requirements, subcontractor use, and any regulator or association standards that apply to your occupation.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=professional`,
    quoteLabel: "Get an E&O Quote",
    coverageIntro:
      "Professional liability is organized here by the type of work you perform — because the allegation, the contract, and any regulatory context differ by profession. Each coverage responds to financial-loss claims tied to professional services, not ordinary premises injury or property damage.",
    coverageTypes: [
      {
        title: "Accountants & Bookkeepers",
        shortLabel: "Accounting",
        description:
          "May help respond to certain claims alleging errors in tax preparation, audits, compilations, financial statements, or advisory work that caused a client financial loss — subject to policy terms, limits, and whether the services are within the policy's professional-services definition.",
        detailTitle: "A reporting mistake can become a client loss claim",
        detailDescription:
          "Clients may allege missed deadlines, calculation errors, or flawed advice caused tax penalties, audit costs, or lost financing. For CPA Ontario firms engaged in public accounting or providing accounting services to the public, Regulation 14-1 sets minimum professional liability limits by firm size — separate from what any single client contract requires. Bookkeepers and non-public accounting firms may still face contractual E&O requirements even when CPA firm rules do not apply. Confirm which services you perform are disclosed and covered under your policy wording.",
        icon: FileCheck,
      },
      {
        title: "Consultants & Advisors",
        shortLabel: "Consulting",
        description:
          "May help respond to certain claims alleging that management, HR, marketing, strategy, or business recommendations caused measurable client financial harm — subject to policy terms, exclusions, and limits.",
        detailTitle: "A strategy recommendation can outlive the engagement",
        detailDescription:
          "Consultants are often sued for lost profits, failed implementations, or advice a client says they relied on months after delivery. General liability may address premises injury at a client site, but financial-loss allegations from your recommendations typically fall under professional liability — not CGL. Claims-made reporting means a dispute that surfaces after a project ends may still need to be reported during an active policy period unless prior acts or tail coverage applies.",
        icon: Briefcase,
      },
      {
        title: "Engineers & Architects",
        shortLabel: "Design",
        description:
          "May help respond to certain claims alleging design, specification, inspection, or professional engineering errors — including some allegations tied to project delays or third-party property damage arising from professional services — subject to policy terms, exclusions, and limits.",
        detailTitle: "A specification error can ripple through an entire project",
        detailDescription:
          "Design professionals face allegations that drawings, calculations, or site observations were wrong — sometimes framed as economic loss, sometimes as property damage or delay. Holders of a PEO Certificate of Authorization offering engineering services to the public must meet Ontario's minimum professional liability requirements under Regulation 941, s. 74, unless a permitted exemption applies. OAA Certificate of Practice holders face separate mandatory professional liability rules through Pro-Demnity. Bodily injury or property damage from construction operations may implicate other policies — coordinate project contracts, CGL, and professional liability with your broker rather than assuming one label covers every allegation.",
        icon: HardHat,
      },
      {
        title: "Financial Advisors & IT Consultants",
        shortLabel: "Finance / IT",
        description:
          "May help respond to certain claims alleging investment or financial advice errors, software implementation failures, security advice, or technology project management caused client loss — subject to policy terms, exclusions, and limits.",
        detailTitle: "Implementation failure and advice errors are different from a data breach bill",
        detailDescription:
          "Licensed Ontario life insurance agents must maintain FSRA-approved errors and omissions coverage with at least $1 million per occurrence and extended coverage for fraudulent acts under O. Reg. 347/04 — a regulatory requirement specific to that licence class, not every financial advisor. IT consultants may face allegations that a failed migration, security recommendation, or project delay caused business interruption — professional liability may address certain advice and service errors, while ransomware response, notification, and forensic costs often require separate cyber coverage. Disclose whether you give regulated financial advice, write code, manage projects, or perform security assessments so underwriting matches your actual services.",
        icon: Laptop,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex professionals and firms that charge for advice, design, analysis, or specialized services — including accountants, consultants, engineers, architects, financial advisors, IT consultants, and other regulated or credentialed occupations — reviewed through an independent broker who can compare claims-made E&O markets, retroactive dates, and contract certificate requirements for how you actually work.",
    considerations: [
      {
        title: "Professional services definition and scope of practice",
        description:
          "Policies define which services qualify as covered professional services. Work outside that definition — investment advice from an IT firm, construction supervision from a designer, or services not disclosed at application — may fall outside coverage. Match your application, proposal, and contract descriptions to the policy wording rather than assuming every activity you perform is included.",
      },
      {
        title: "Claims-made reporting and the policy trigger",
        description:
          "Most commercial E&O policies respond when a claim is first made against you and reported during the policy period, subject to the retroactive date and policy conditions. Late reporting can prejudice coverage. Understand your insurer's notice requirements and who at the firm is responsible for forwarding demand letters, regulatory complaints, or client threats of suit.",
      },
      {
        title: "Retroactive date and prior acts",
        description:
          "The retroactive date is the earliest date from which covered professional services are eligible for coverage. Work performed before that date may be excluded unless prior acts coverage or a full retroactive date is purchased. When changing insurers, compare retro dates and consider an extended reporting period from the departing carrier for work already performed.",
      },
      {
        title: "Prior knowledge and circumstances",
        description:
          "Known circumstances, pending disputes, or facts that a reasonable person would expect to give rise to a claim before policy inception are often excluded. Do not assume a new policy erases an existing client complaint — disclose prior incidents and circumstances during underwriting and when renewing.",
      },
      {
        title: "Contracts, indemnities, and assumed liability",
        description:
          "Client contracts may require specific limits, additional insured status, or broad indemnities beyond what standard negligence would impose at law. Professional liability may not cover all contractual undertakings — especially promises of a specific result or indemnities broader than your legal liability. Review contract insurance clauses with your broker before signing and before issuing certificates.",
      },
      {
        title: "Subcontractors and delegated professional work",
        description:
          "If subcontractors, freelancers, or associate professionals perform part of the engagement, vicarious exposure may remain with your firm. Disclose subcontractor use during underwriting and confirm whether your policy covers work performed by others on your behalf, subject to wording and any sub-limits.",
      },
      {
        title: "Defence costs and limit erosion",
        description:
          "Defence costs may be payable inside the policy limit — reducing funds available for settlement or judgment — or outside the limit, depending on form and carrier. For professions with expensive litigation, defence-cost treatment can materially change effective capacity even when the stated limit appears adequate on paper.",
      },
      {
        title: "Cyber overlap and adjacent coverages",
        description:
          "Allegations that your security advice or system design failed may implicate professional liability, while breach response, notification, and regulatory investigation costs after a cyber event often require separate cyber or privacy coverage. Professional liability does not replace commercial general liability for premises injury, directors and officers coverage for governance claims, or office property insurance for equipment and contents — each addresses a different allegation.",
      },
    ],
    relatedLinks: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
    ],
    faqTitle: "Professional liability FAQ",
    faqIntro:
      "Straight answers on how E&O differs from other commercial coverages and what matters when contracts or regulators ask for proof.",
    faqItems: [
      {
        question: "What's the difference between general liability and professional liability?",
        answer:
          "Commercial general liability typically addresses certain third-party bodily injury and property-damage claims arising from your premises or operations. Professional liability or E&O may address certain claims alleging financial loss caused by your professional services, advice, design, or analysis — subject to policy terms and exclusions. A client slip-and-fall at your office is a different allegation from a client alleging your report caused them a tax penalty or project loss. Many professionals need both coverages when they operate from premises and deliver advice.",
      },
      {
        question: "Is professional liability insurance claims-made?",
        answer:
          "Most commercial professional liability and E&O policies in Canada are written on a claims-made basis — coverage depends on when the claim is made and reported, your retroactive date, and policy conditions. Occurrence-based professional forms exist in some contexts but are less common for the professions described on this page. Confirm whether your policy is claims-made or occurrence-based, what retroactive date applies, and what happens if you change carriers or retire.",
      },
      {
        question: "What is a retroactive date and why does it matter?",
        answer:
          "The retroactive date is the earliest date from which professional services are eligible for coverage under a claims-made policy. Services performed before that date may be excluded unless you purchase prior acts coverage or maintain continuous coverage with a full retroactive date. When switching insurers, compare retro dates carefully and ask about an extended reporting period — sometimes called tail coverage — from your prior insurer for work already completed.",
      },
      {
        question: "Does professional liability cover work performed by subcontractors?",
        answer:
          "Whether allegations tied to a subcontractor's work are covered depends on policy wording, how the subcontractor relationship is disclosed, and the facts alleged. Your firm may still face a claim even when a subcontractor performed part of the work. Disclose subcontractor and freelancer use during underwriting and review indemnity clauses in client and subcontracts with your broker — assumed liability beyond standard negligence may not be insured.",
      },
      {
        question: "How should I handle contract-required limits and certificates?",
        answer:
          "Contracts, RFPs, and client onboarding packets often specify minimum professional liability limits, additional insured requirements, or tail coverage on termination. Those requirements are contract-specific — compare each clause to your current declarations, retroactive date, and exclusions before signing. Your broker can help issue certificates once coverage is in place, but increasing limits or adding endorsements typically must be arranged before the contract effective date, not after a claim arises.",
      },
    ],
    ctaHeading: "Provide professional advice or design?",
    ctaSubhead:
      "Tell us your profession, services, revenue, contract requirements, retroactive date, and claims history — we will compare E&O markets that understand your work.",
    serviceName: "Professional Liability Insurance",
  },
];

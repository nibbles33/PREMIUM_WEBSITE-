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
      "Small business insurance for Windsor-Essex — how liability, property, commercial auto, and business interruption may be assembled through package policies, endorsements, or separate coverages.",
    headline: "Small Business Insurance",
    subhead:
      "There is no single universal small-business insurance policy. Windsor–Essex owner-operators, storefronts, home-based businesses, and growing teams typically assemble coverage through a business owners policy, commercial package policy, or separate policies and endorsements — depending on industry, revenue, premises, vehicles, and contract requirements. General liability may address certain third-party injury and property-damage claims; commercial property may cover contents, inventory, and tenant improvements; commercial auto applies when you own, lease, or regularly use vehicles for operations; business interruption — where purchased with property — may help with income after a covered physical loss. Cyber, crime, professional liability, and product liability are often added when operations warrant them — not every small business needs every coverage on day one. Premium Insurance Brokers can help map a practical program to how you actually operate rather than selling a one-size-fits-all bundle.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Business Quote",
    coverageIntro:
      "Small business insurance is organized here by four broad coverage categories most Windsor–Essex businesses review first — because liability, property, vehicles, and income interruption are common starting points before industry-specific endorsements are added.",
    coverageTypes: [
      {
        id: "general-liability",
        title: "General Liability",
        shortLabel: "GL",
        description:
          "May help respond to certain third-party bodily injury and property-damage claims arising from your operations, premises, or products — subject to policy terms, exclusions, and limits.",
        detailTitle: "A customer slip-and-fall is often a GL claim",
        detailDescription:
          "Retail shops, offices, and service businesses with public contact face premises and operations liability — a visitor injury, damage to a client's property on site, or certain product-related claims may fall under commercial general liability when covered by the form. GL does not replace professional liability for advice errors, cyber coverage for data breaches, or property insurance for your own equipment. Contractual certificate requirements from landlords and clients often start with GL limits and additional insured status.",
        icon: Briefcase,
      },
      {
        id: "commercial-property",
        title: "Commercial Property",
        shortLabel: "Property",
        description:
          "May help cover equipment, inventory, furniture, and leasehold improvements against covered direct physical loss — subject to causes of loss, limits, deductibles, and policy terms.",
        detailTitle: "Stolen laptops aren't a liability claim",
        detailDescription:
          "If you own equipment, carry inventory, or have invested in leasehold improvements, commercial property addresses physical loss to those assets — distinct from liability for injury to others. Home-based businesses often need a separate business property solution because personal home policies limit or exclude business contents. Valuation, coinsurance, and optional perils like sewer backup or equipment breakdown are policy-dependent — see the Commercial Property page for depth on building versus contents structuring.",
        icon: Store,
      },
      {
        id: "commercial-auto",
        title: "Commercial Auto",
        shortLabel: "Auto",
        description:
          "May help address owned or leased business vehicles and certain automobile liability arising when your business owns, leases, or regularly uses vehicles for deliveries, service calls, or client visits — subject to Ontario auto rules and policy terms.",
        detailTitle: "Delivery vans create a separate auto policy conversation",
        detailDescription:
          "Commercial auto is relevant when your business owns, leases, or regularly uses vehicles for operations — not every small business has that exposure. A consultant who occasionally drives to clients may need hired and non-owned auto coverage instead of or in addition to a fleet policy. Personal auto policies often restrict business use. Disclose how staff use vehicles, whether you deliver goods, and whether subcontractors drive on your behalf — Ontario automobile insurance is a regulated line separate from general liability.",
        icon: Truck,
      },
      {
        id: "business-interruption",
        title: "Business Interruption",
        shortLabel: "BI",
        description:
          "Where purchased with commercial property, may help replace lost business income and certain continuing expenses after covered direct physical loss to insured property forces a temporary shutdown — subject to waiting periods, limits, and policy terms.",
        detailTitle: "Could you pay rent if a fire closed you for three months?",
        detailDescription:
          "A covered fire or major water loss can close a storefront or office while lease payments, core payroll, and loan obligations continue. Business interruption — where included or endorsed on a property program — addresses that income gap, not the physical repair itself. It is not standalone protection against market slowdowns or pandemic closures, and it commonly requires a covered physical loss trigger. Coordinate BI limits and indemnity periods with your property values — see the Business Interruption page for trigger and timing detail.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex owner-operators, storefronts, home-based businesses, and growing teams assembling their first commercial program — reviewed through an independent broker who can compare package policies, endorsements, and separate coverages for how you actually operate.",
    considerations: [
      {
        title: "Operations and industry classification",
        description:
          "Insurers classify risk by what you do — retail, trades, professional services, food, and manufacturing each carry different liability and property profiles. Accurate operations descriptions affect both availability and pricing. Misclassification can create coverage gaps if a loss falls outside the class described on the application.",
      },
      {
        title: "Premises — owned, leased, or home-based",
        description:
          "Where you operate drives property and liability structure. Leased storefronts need contents and improvements coverage; home-based businesses may need business endorsements or separate policies because personal home insurance limits business activity. Landlords often require liability certificates before occupancy.",
      },
      {
        title: "Property and equipment values",
        description:
          "Inventory, tools, computers, and leasehold build-outs should be reflected in property limits. Underinsurance can trigger coinsurance penalties on many commercial property forms. Update values when you add equipment, expand stock, or open a second location.",
      },
      {
        title: "Products, completed operations, and professional services",
        description:
          "Businesses that manufacture, install, or advise may need product liability, completed-operations coverage, or professional liability beyond a basic general liability label. Selling goods online, performing contract work, or giving paid advice each creates distinct exposure — disclose them during quoting.",
      },
      {
        title: "Vehicles and driving exposure",
        description:
          "Owned delivery vans, service trucks, and regular client visits may require commercial auto or hired and non-owned auto coverage. Businesses with no vehicles skip this line — but staff using personal cars for deliveries still create exposure worth disclosing.",
      },
      {
        title: "Cyber, data, and payment-card exposure",
        description:
          "Customer records, e-commerce, and point-of-sale systems create cyber and privacy exposure that general liability may not address. Cyber coverage is commonly added by endorsement or separate policy when you store client data or accept online payments — not part of the four core Explorer categories above, but frequently reviewed for growing SMBs.",
      },
      {
        title: "Employees, payroll, and subcontractors",
        description:
          "Hiring staff may trigger WSIB registration and employment-practices considerations. Using subcontractors shifts liability depending on contracts and supervision. Carriers ask about employee count, payroll, and subcontractor use during underwriting — answers affect both GL and, where applicable, EPL or crime coverage.",
      },
      {
        title: "Contracts, U.S. exposure, and prior losses",
        description:
          "Client and landlord contracts may specify minimum liability limits, additional insured status, and waiver of subrogation. Cross-border sales or U.S. operations may need different policy territory. Prior claims and circumstances should be disclosed honestly — they affect availability, pricing, and whether a claims-made or occurrence form is offered.",
      },
    ],
    relatedLinks: [
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
    ],
    faqTitle: "Small business insurance FAQ",
    faqItems: [
      {
        question: "What insurance does a small business actually need?",
        answer:
          "Most Windsor–Essex small businesses start by reviewing general liability and commercial property if they have equipment, inventory, or public premises contact. Businesses that own or regularly use vehicles need commercial auto or hired/non-owned auto coverage. Business interruption may matter when a covered property loss would interrupt income. Professional advice, cyber exposure, crime, and product liability are added when operations warrant them — there is no single mandatory bundle for every business type.",
      },
      {
        question: "Is there one package that includes everything?",
        answer:
          "Some carriers offer business owners policies or commercial package policies combining liability and property — and sometimes other lines — for eligible small businesses. Not every industry qualifies, and not every exposure fits a package. Auto, cyber, professional liability, and directors and officers coverage are often separate policies or endorsements. A broker compares what can be packaged versus what should stay separate for your operations.",
      },
      {
        question: "When is commercial auto relevant?",
        answer:
          "Commercial auto applies when your business owns, leases, or regularly uses vehicles for deliveries, service calls, or transporting tools and goods. Occasional personal-car use for errands may instead require hired and non-owned auto coverage on a liability policy. Businesses with no driving exposure do not need a commercial auto policy — but disclose any business use of personal vehicles to your broker.",
      },
      {
        question: "What if I work from home?",
        answer:
          "Home-based businesses often need business property and liability coverage beyond a personal home policy, which typically limits or excludes business activity and business contents. Clients visiting your home office create premises liability. Zoning, municipal business licensing, and landlord rules may also apply — insurance does not replace those requirements.",
      },
      {
        question: "What information is needed to quote?",
        answer:
          "Carriers commonly ask about operations, annual revenue or sales, payroll, employee count, premises (owned, leased, or home-based), property and equipment values, vehicles, products or services sold, subcontractor use, prior losses, and any U.S. or cross-border exposure — though questions vary by insurer. Accurate answers support proper classification and limits; bring existing policies and contract requirements to your broker.",
      },
    ],
    ctaHeading: "Ready to protect your small business?",
    ctaSubhead:
      "Tell us what you do, where you operate, and what you own — we will compare package and separate-policy options that fit your stage of growth.",
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
      "Business interruption insurance for Windsor-Essex — income, continuing expenses, and extra expense coverage when covered physical loss or damage interrupts operations, subject to policy form.",
    headline: "Business Interruption Insurance",
    subhead:
      "Business interruption coverage — also called business income coverage on many forms — commonly responds when a covered cause of physical loss or damage affects insured property and results in a qualifying interruption, subject to the policy form. It may help replace lost net income or gross earnings, pay certain continuing expenses, and fund extra costs to resume operations faster — but it is not protection against every shutdown, market downturn, or supply-chain delay. Waiting periods, indemnity or restoration periods, limits, and how payroll and dependent properties are treated all vary by insurer and wording. Ontario courts have emphasized that standard property-linked business interruption typically requires direct physical loss or damage — not mere loss of use without damage. Premium Insurance Brokers can help Windsor–Essex businesses align BI limits, periods, and property values with realistic recovery timelines.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Business Quote",
    coverageIntro:
      "Business interruption is organized here by what a policy may pay during a covered suspension — lost income, continuing expenses, extra expense, and contingent dependent-property loss — because each component has different triggers, limits, and definitions on most forms.",
    coverageTypes: [
      {
        id: "lost-income",
        title: "Lost Business Income",
        shortLabel: "Income",
        description:
          "May help replace net income or gross earnings you would have earned during a necessary suspension after covered direct physical loss to insured property — subject to waiting periods, indemnity or restoration periods, limits, and how the form measures income.",
        detailTitle: "Revenue doesn't pause when the doors close",
        detailDescription:
          "When a covered fire, water loss, or other insured peril damages your premises and forces a temporary shutdown, revenue may stop while fixed obligations continue. Lost income coverage addresses that financial gap — not the cost to repair the building itself. Forms differ on whether they pay net profit, gross earnings, or actual loss sustained, and saved expenses may reduce the payment. Accurate financial records and realistic revenue projections support proper limits at application.",
        icon: Briefcase,
      },
      {
        id: "continuing-expenses",
        title: "Continuing Expenses",
        shortLabel: "Expenses",
        description:
          "May help pay certain fixed costs — such as rent, debt service, and some payroll categories — that continue during a covered interruption, subject to policy definitions of continuing versus non-continuing expenses and saved-expense offsets.",
        detailTitle: "Rent and loan payments don't wait for repairs",
        detailDescription:
          "Lease payments, loan covenants, property taxes, and core staff may continue while you cannot operate at full capacity. Policies define which expenses qualify as continuing and whether ordinary payroll for non-key employees is included, excluded, or optional. Not every expense continues at the same rate — utilities may drop, but rent typically does not. Review payroll treatment and expense classifications with your broker when underwriting BI.",
        icon: Building2,
      },
      {
        id: "extra-expense",
        title: "Extra Expense",
        shortLabel: "Extra Exp.",
        description:
          "May help pay additional costs incurred to reduce the business income loss or resume operations more quickly — such as temporary premises, expedited shipping, or rented equipment — subject to policy limits and whether extra expense applies with or without a concurrent income loss.",
        detailTitle: "A temporary location can cost more than staying shut",
        detailDescription:
          "Sometimes spending more now reduces total loss — renting temporary space, paying overtime for expedited repairs, or leasing replacement equipment can shorten the shutdown. Extra expense coverage, where included, may address those incremental costs even when they exceed the income loss alone, depending on form. It is distinct from continuing expenses, which pay obligations you already had — extra expense pays additional costs above normal operations to speed recovery.",
        icon: Package,
      },
      {
        id: "contingent-business-interruption",
        title: "Contingent Business Interruption",
        shortLabel: "Contingent",
        description:
          "Where purchased by endorsement, may address income loss when a policy-defined dependent property — such as a named key supplier, customer, or leader location — suffers covered direct physical loss that disrupts your operations, subject to named locations, covered causes of loss, and policy terms.",
        detailTitle: "Your key supplier's fire can idle your line",
        detailDescription:
          "Contingent business interruption is not general supply-chain disruption insurance. It typically requires a named dependent property, covered direct physical loss or damage at that property, and a resulting interruption to your business as defined in the endorsement. A supplier's financial failure, labour strike, or utility outage without physical damage at the dependent location may not trigger coverage. Disclose critical suppliers and customers during underwriting and confirm which locations are scheduled on the endorsement.",
        icon: Route,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex businesses that would struggle to pay rent, payroll, and debt service if a covered property loss closed operations for weeks or months — reviewed through an independent broker who can coordinate BI limits, waiting periods, and property values with your commercial property program.",
    considerations: [
      {
        title: "The trigger — covered physical loss or damage",
        description:
          "Business interruption coverage commonly responds when a covered cause of physical loss or damage affects insured property and results in a qualifying interruption, subject to the policy form. Government-ordered closures, pandemics, utility failures without physical damage, and market downturns are generally outside standard property-linked BI unless a specific extension applies. Confirm your form's trigger language with your broker.",
      },
      {
        title: "Waiting period (time deductible)",
        description:
          "Many policies include a waiting period — often 24 to 72 hours on many forms, though periods vary — before BI payments begin. Losses during that window are uninsured. Shorter waiting periods generally cost more. Align the waiting period with how quickly your business would feel cash-flow pressure after a covered loss.",
      },
      {
        title: "Indemnity or restoration period",
        description:
          "Policies limit how long BI payments continue — commonly 12, 18, or 24 months on many programs, though options vary. The period should cover realistic rebuild and ramp-up time for your operations. Underestimating extends the gap after coverage stops even if repairs are incomplete.",
      },
      {
        title: "Limits and coinsurance on business income values",
        description:
          "BI limits should reflect projected earnings and continuing expenses during the maximum foreseeable shutdown. Some forms include coinsurance on business income values — underreporting projected income can reduce recovery. Agreed-value or monthly reporting options may be available on certain programs.",
      },
      {
        title: "Continuing expenses and ordinary payroll",
        description:
          "Policies distinguish continuing fixed costs from expenses that stop when you close. Ordinary payroll for non-key employees may be included, excluded, or offered as an optional extension depending on form — do not assume all payroll continues automatically.",
      },
      {
        title: "Extra expense versus lost income",
        description:
          "Extra expense pays additional costs to minimize the BI loss or speed resumption; lost income pays the earnings gap. Some forms coordinate the two within a combined limit. Understand whether expediting repairs or renting temporary space is more valuable for your recovery model.",
      },
      {
        title: "Dependent properties and contingent BI",
        description:
          "When your business depends on a few key suppliers, customers, or a leader property, contingent business interruption — where purchased — may respond to their covered physical loss. Locations must typically be named, and the dependent property must suffer covered damage — not merely a slowdown or contract dispute.",
      },
      {
        title: "Accounting records and documentation",
        description:
          "Claims adjusters rely on profit-and-loss statements, tax returns, payroll records, and pre-loss revenue trends to calculate loss. Incomplete or inconsistent books delay settlement. Maintain financial records that support the income values declared at application.",
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
        question: "What triggers business interruption coverage?",
        answer:
          "Business interruption coverage commonly responds when a covered cause of physical loss or damage affects insured property and results in a qualifying interruption, subject to the policy form. Standard property-linked BI typically requires direct physical loss or damage — not merely lost revenue, a supplier delay, or a government closure without an insured peril affecting your property. Extensions for contingent properties, utilities, or civil authority may have different triggers — confirm each with your broker.",
      },
      {
        question: "Is business interruption automatically included with property insurance?",
        answer:
          "Not always. BI is often an endorsement or component of a commercial property program, but it must be explicitly included with chosen limits, waiting periods, and indemnity periods. Some bare property quotes omit BI or include minimal limits. Review declarations and endorsements rather than assuming income coverage is bundled.",
      },
      {
        question: "What is an indemnity or restoration period?",
        answer:
          "The indemnity period — sometimes called the period of restoration — is the maximum time BI payments continue after a covered loss, measured from the date of loss or from when the waiting period ends, depending on form. It should reflect how long rebuild, equipment replacement, and return to normal revenue would realistically take. Once the period expires, payments stop even if you have not fully recovered.",
      },
      {
        question: "What is contingent business interruption?",
        answer:
          "Contingent business interruption — where purchased — may address income loss when a named dependent property such as a key supplier or major customer suffers covered direct physical loss that disrupts your operations. It does not cover every supply-chain interruption: the dependent location must be scheduled, suffer covered physical damage, and the policy must define the resulting interruption. Financial failure, strikes, or utility outages without physical damage at the dependent property are typically excluded unless a separate extension applies.",
      },
      {
        question: "What information is needed to quote business interruption?",
        answer:
          "Carriers commonly review operations, property values, projected gross earnings or net income, continuing expense breakdowns, payroll, number of locations, critical suppliers or customers, prior losses, and desired waiting and indemnity periods — though questions vary by insurer. Financial statements and realistic downtime scenarios help align limits with exposure. BI is usually quoted alongside commercial property rather than standalone.",
      },
    ],
    ctaHeading: "Could your business survive a long shutdown?",
    ctaSubhead:
      "Walk through realistic downtime scenarios with a broker and align waiting periods, indemnity periods, and limits with your recovery timeline.",
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

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
      "Hotel and motel insurance — property, liability, business interruption, and guest-related exposures for Windsor-Essex hospitality operators.",
    headline: "Hotel & Motel Insurance",
    subhead:
      "Coverage for overnight hospitality — guest liability, property, business income, and the operational risks of running rooms and amenities.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=restaurant`,
    quoteLabel: "Get a Hospitality Quote",
    coverageIntro:
      "Hotels and motels combine property, liability, and income exposures across guest rooms, common areas, and food service.",
    coverageTypes: [
      {
        title: "Commercial Property",
        description:
          "Covers the building, furnishings, linens, and equipment against covered fire, water, and theft losses.",
        icon: Building2,
      },
      {
        title: "General Liability",
        description:
          "Addresses guest slip-and-fall, swimming pool incidents, and property damage claims on premises.",
        icon: Briefcase,
      },
      {
        title: "Business Interruption",
        description:
          "Can replace income when a covered loss closes rooms or the entire property for repairs.",
        icon: Store,
      },
      {
        title: "Liquor Liability",
        description:
          "If you operate a bar or restaurant on site, liquor liability addresses alcohol-related guest injury claims.",
        icon: Wine,
      },
    ],
    whoItIsFor:
      "Hotel and motel insurance is for Windsor-Essex independent hotels, motels, inns, and extended-stay operators with guest rooms and on-site amenities.",
    relatedLinks: [
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Business Interruption", href: "/business-interruption-insurance/" },
    ],
    faqTitle: "Hotel & motel FAQ",
    faqItems: [
      {
        question: "Are guest belongings covered?",
        answer:
          "Guest personal property is typically excluded. Guests should rely on their own travel or homeowners insurance for belongings.",
      },
      {
        question: "Do I need liquor liability for a hotel bar?",
        answer:
          "Yes — serving alcohol requires liquor liability separate from general liability.",
      },
      {
        question: "How is occupancy factored in?",
        answer:
          "Revenue and room count drive property and business interruption values. Seasonal tourism patterns should be reflected.",
      },
      {
        question: "Are pool and spa areas covered?",
        answer:
          "Liability for pools and spas is a key underwriting factor. Safety protocols and fencing affect availability.",
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
      "Convenience store and gas station insurance — property, liability, pollution, and crime coverage for Windsor-Essex retail fuel operators.",
    headline: "Convenience Store & Gas Station Insurance",
    subhead:
      "Coverage for c-stores and gas bars — high-traffic retail, fuel pumps, inventory theft, and environmental exposures.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a C-Store Quote",
    coverageIntro:
      "Convenience and gas operations combine retail theft, customer liability, and fuel-related environmental risk.",
    coverageTypes: [
      {
        title: "Commercial Property",
        description:
          "Covers building, coolers, shelving, and inventory including tobacco and lottery products.",
        icon: Store,
      },
      {
        title: "General Liability",
        description:
          "Addresses customer injury on premises — slips, pump islands, and parking lot incidents.",
        icon: Briefcase,
      },
      {
        title: "Pollution Liability",
        description:
          "Covers underground storage tank leaks and gradual fuel contamination.",
        icon: AlertTriangle,
      },
      {
        title: "Crime & Hold-Up",
        description:
          "Can cover theft, robbery, and employee dishonesty subject to policy limits.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Convenience store insurance is for Windsor-Essex independent c-stores, gas bars, and combination fuel-and-retail operators.",
    relatedLinks: [
      { label: "Retail Insurance", href: "/retail-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
      { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
    ],
    faqTitle: "Convenience store FAQ",
    faqItems: [
      {
        question: "Are gas pumps covered?",
        answer:
          "Pump equipment and canopies are typically scheduled under commercial property. Tank pollution needs separate pollution coverage.",
      },
      {
        question: "Is lottery and tobacco inventory covered?",
        answer:
          "Inventory is usually covered under property limits, subject to theft security requirements.",
      },
      {
        question: "Do I need hold-up coverage?",
        answer:
          "Crime endorsements can address robbery losses. Security cameras and safe practices affect terms.",
      },
      {
        question: "What about franchise requirements?",
        answer:
          "Franchisors often specify minimum limits and additional insured status. Share franchise agreements when quoting.",
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
      "Pharmacy insurance — commercial property, liability, cyber, and professional coverage coordination for Windsor-Essex pharmacies.",
    headline: "Pharmacy Insurance",
    subhead:
      "Coverage for retail pharmacies — inventory, professional liability coordination, premises liability, and patient data protection.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Pharmacy Quote",
    coverageIntro:
      "Pharmacies combine retail inventory, professional dispensing exposure, and sensitive patient data.",
    coverageTypes: [
      {
        title: "Commercial Property",
        description:
          "Covers inventory, fixtures, and dispensing equipment including narcotics storage security requirements.",
        icon: Pill,
      },
      {
        title: "General Liability",
        description:
          "Addresses customer injury on premises and non-professional operational claims.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability",
        description:
          "Addresses dispensing errors and professional advice claims through appropriate pharmacy professional markets.",
        icon: Shield,
      },
      {
        title: "Cyber & Privacy",
        description:
          "Covers patient data breaches and system disruptions affecting prescription records.",
        icon: HeartPulse,
      },
    ],
    whoItIsFor:
      "Pharmacy insurance is for Windsor-Essex independent pharmacies, compounding pharmacies, and retail drug stores.",
    relatedLinks: [
      { label: "Medical / Dental", href: "/medical-dental-insurance/" },
      { label: "Cyber Insurance", href: "/cyber-insurance/" },
      { label: "Retail Insurance", href: "/retail-insurance/" },
    ],
    faqTitle: "Pharmacy FAQ",
    faqItems: [
      {
        question: "Are narcotics and controlled substances covered?",
        answer:
          "Inventory coverage applies subject to security requirements. Robbery and employee dishonesty may need crime endorsements.",
      },
      {
        question: "Is dispensing error covered under GL?",
        answer:
          "Dispensing errors are professional liability claims, not general liability. Both are typically needed.",
      },
      {
        question: "Do mail-order prescriptions change coverage?",
        answer:
          "Shipping pharmaceuticals adds transit and professional exposure. Disclose all delivery models.",
      },
      {
        question: "What about pharmacy association requirements?",
        answer:
          "OCP and liability requirements vary. Confirm minimum professional limits with your broker.",
      },
    ],
    ctaHeading: "Own or operate a pharmacy?",
    ctaSubhead:
      "Share inventory values, services offered, and security setup — we will coordinate pharmacy coverage.",
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
      "Salon and barber shop insurance — general liability, professional treatment liability, property, and product exposure for Windsor-Essex personal care businesses.",
    headline: "Salon & Barber Insurance",
    subhead:
      "Coverage for hair salons, barbershops, and spas — treatment liability, chemical services, premises injury, and equipment.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Salon Quote",
    coverageIntro:
      "Salons combine premises liability with professional treatment exposures from chemical services and skin care.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Covers slip-and-fall and premises injury claims in reception and service areas.",
        icon: Briefcase,
      },
      {
        title: "Professional / Treatment Liability",
        description:
          "Addresses claims from hair treatments, colour services, waxing, and skin care causing injury or reaction.",
        icon: Scissors,
      },
      {
        title: "Commercial Property",
        description:
          "Covers styling stations, equipment, product inventory, and leasehold improvements.",
        icon: Store,
      },
      {
        title: "Product Liability",
        description:
          "Covers claims that retail products sold in-salon caused allergic reaction or injury.",
        icon: Shield,
      },
    ],
    whoItIsFor:
      "Salon and barber insurance is for Windsor-Essex hair salons, barbershops, nail studios, estheticians, and day spas.",
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
          "Treatment liability may respond to professional service claims, subject to policy terms and patch-test protocols.",
      },
      {
        question: "Do booth renters need separate coverage?",
        answer:
          "Booth renters are often independent contractors requiring their own liability. Salon owners should verify renter insurance requirements.",
      },
      {
        question: "Is esthetician work covered the same as hair?",
        answer:
          "Skin care, laser, and advanced treatments may need specific endorsements. Disclose all services offered.",
      },
      {
        question: "Are tools and equipment covered off-premises?",
        answer:
          "Mobile stylists may need inland marine or mobile business endorsements for equipment away from the shop.",
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
      "Non-profit and charity insurance — D&O, general liability, property, and volunteer coverage for Windsor-Essex organizations.",
    headline: "Non-Profit Insurance",
    subhead:
      "Coverage for charities and nonprofits — board liability, volunteer injury, events, and the property that supports your mission.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Non-Profit Quote",
    coverageIntro:
      "Nonprofits face governance, volunteer, and event exposures similar to businesses — often with tighter budgets and unique funding requirements.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Covers injury and property damage claims at events, offices, and program locations.",
        icon: Briefcase,
      },
      {
        title: "Directors & Officers",
        description:
          "Protects board members against claims alleging mismanagement or failure to fulfill fiduciary duties.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        description:
          "Covers office contents, donated goods inventory, and equipment used in programs.",
        icon: Building2,
      },
      {
        title: "Volunteer Accident",
        description:
          "May provide limited medical coverage for volunteers injured while serving, subject to policy terms.",
        icon: Users,
      },
    ],
    whoItIsFor:
      "Non-profit insurance is for Windsor-Essex charities, foundations, community organizations, and social service agencies with boards, staff, and volunteers.",
    relatedLinks: [
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Religious Organizations", href: "/religious-organizations-insurance/" },
    ],
    faqTitle: "Non-profit FAQ",
    faqItems: [
      {
        question: "Do volunteers need WSIB?",
        answer:
          "Volunteer coverage varies. Some organizations carry volunteer accident medical coverage. WSIB rules depend on whether volunteers are deemed workers.",
      },
      {
        question: "Does our board need D&O?",
        answer:
          "Directors can be personally named in governance lawsuits. D&O helps attract and retain board members.",
      },
      {
        question: "Are fundraising events covered?",
        answer:
          "One-off events may need event liability or be included in annual GL depending on size and activities.",
      },
      {
        question: "Do funders require insurance certificates?",
        answer:
          "Grants and municipal partnerships often specify minimum GL and D&O limits.",
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
      "Event liability insurance for Windsor-Essex — one-day and annual policies for festivals, weddings, fundraisers, and vendor markets.",
    headline: "Event Liability Insurance",
    subhead:
      "Short-term liability coverage for events — festivals, weddings, fundraisers, and vendor markets where venues require proof of insurance.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get an Event Quote",
    coverageIntro:
      "Event liability covers third-party injury and property damage claims arising from a specific event or season of events.",
    coverageTypes: [
      {
        title: "Third-Party Bodily Injury",
        description:
          "Covers claims when attendees are injured during the event — trips, falls, and crowd incidents.",
        icon: Briefcase,
      },
      {
        title: "Property Damage",
        description:
          "Addresses damage to rented venues, equipment, or neighbouring property caused during the event.",
        icon: Building2,
      },
      {
        title: "Liquor Liability (Events)",
        description:
          "When alcohol is served, liquor liability may be required separately or as an event endorsement.",
        icon: Wine,
      },
      {
        title: "Vendor & Exhibitor Coverage",
        description:
          "Market organizers may need coverage extending to participating vendors under one event policy.",
        icon: Calendar,
      },
    ],
    whoItIsFor:
      "Event liability is for Windsor-Essex event organizers, wedding planners, festival committees, farmers' market operators, and vendors when venues require certificates.",
    relatedLinks: [
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
    ],
    faqTitle: "Event liability FAQ",
    faqItems: [
      {
        question: "Can I buy coverage for a single day?",
        answer:
          "Yes — event policies are often written for specific dates and locations with defined attendance.",
      },
      {
        question: "Does the venue's insurance cover my event?",
        answer:
          "Venue policies protect the venue owner, not necessarily your organization as the event host. Venues often require your own certificate.",
      },
      {
        question: "Are inflatables and rides covered?",
        answer:
          "Amusement devices may need specific endorsements or separate coverage from the ride operator.",
      },
      {
        question: "What do municipalities require?",
        answer:
          "Permit applications often specify minimum liability limits and additional insured status for the municipality.",
      },
    ],
    ctaHeading: "Planning an event?",
    ctaSubhead:
      "Share event date, location, attendance, and activities — we will arrange liability coverage venues accept.",
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
      { label: "Bonding Insurance", href: "/bonding-insurance/" },
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

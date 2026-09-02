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
    photographySlug: "restaurant-insurance",
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
    photographySlug: "retail-insurance",
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
    photographySlug: "retail-insurance",
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
    photographySlug: "professional-offices-insurance",
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
    photographySlug: "professional-offices-insurance",
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
    photographySlug: "retail-insurance",
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
    photographySlug: "retail-insurance",
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
    photographySlug: "professional-offices-insurance",
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
    photographySlug: "professional-offices-insurance",
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
      "Coverage for childcare centres and private schools — student injury, abuse allegations, property, and regulatory compliance exposures.",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a School Quote",
    photographySlug: "professional-offices-insurance",
    coverageIntro:
      "Childcare and private education combine premises liability, professional supervision duties, and sensitive abuse exposures.",
    coverageTypes: [
      {
        title: "General Liability",
        description:
          "Covers student and visitor injury on premises — playgrounds, classrooms, and field trips.",
        icon: Briefcase,
      },
      {
        title: "Professional Liability",
        description:
          "Addresses claims alleging negligent supervision or educational malpractice.",
        icon: Baby,
      },
      {
        title: "Abuse & Molestation",
        description:
          "Critical coverage responding to allegations of abuse by staff or volunteers.",
        icon: Shield,
      },
      {
        title: "Commercial Property",
        description:
          "Covers building contents, playground equipment, and educational materials.",
        icon: Building2,
      },
    ],
    whoItIsFor:
      "Daycare and private school insurance is for Windsor-Essex licensed daycares, Montessori schools, private academies, and before-and-after school programs.",
    relatedLinks: [
      { label: "Non-Profit Insurance", href: "/non-profit-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Employment Practices Liability", href: "/employment-practices-liability-insurance/" },
    ],
    faqTitle: "Daycare & private school FAQ",
    faqItems: [
      {
        question: "Are field trips covered?",
        answer:
          "Off-premises activities may need specific endorsements. Disclose all regular and special outing locations.",
      },
      {
        question: "What ratio and licensing requirements apply?",
        answer:
          "Insurance does not replace licensing compliance. Carriers may ask about staff-to-child ratios and inspection history.",
      },
      {
        question: "Is abuse coverage mandatory?",
        answer:
          "Most carriers require abuse and molestation coverage for organizations serving minors, along with screening policies.",
      },
      {
        question: "Do busing and transport need separate auto?",
        answer:
          "School-owned buses and vans need commercial auto. Contracted transport should be disclosed.",
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
    photographySlug: "restaurant-insurance",
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
      "Coverage for alcohol-related liability — when an patron's intoxication leads to injury, property damage, or other harm after leaving your establishment.",
    quoteHref: `${QUOTE_BUSINESS}&businessType=restaurant`,
    quoteLabel: "Get a Liquor Liability Quote",
    photographySlug: "restaurant-insurance",
    coverageIntro:
      "Liquor liability addresses claims arising from serving alcohol — excluded or limited in most standard general liability policies.",
    coverageTypes: [
      {
        title: "Patron Injury & Property Damage",
        description:
          "Covers claims that an intoxicated patron injured someone or damaged property after being served at your establishment.",
        icon: Wine,
      },
      {
        title: "Assault & Battery",
        description:
          "May address altercations linked to alcohol service, subject to policy terms.",
        icon: Briefcase,
      },
      {
        title: "Legal Defence",
        description:
          "Covers defence costs for covered liquor liability claims.",
        icon: Shield,
      },
      {
        title: "Event Host Liquor",
        description:
          "Temporary coverage when hosting events where alcohol is served without a permanent liquor licence.",
        icon: Calendar,
      },
    ],
    whoItIsFor:
      "Liquor liability is for Windsor-Essex bars, restaurants, breweries, event venues, caterers with bar service, and AGCO-licensed establishments serving alcohol.",
    relatedLinks: [
      { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Hotel / Motel", href: "/hotel-motel-insurance/" },
    ],
    faqTitle: "Liquor liability FAQ",
    faqItems: [
      {
        question: "Is liquor liability included in restaurant insurance?",
        answer:
          "Often packaged together, but liquor liability is a distinct coverage responding to alcohol-specific claims. Confirm it is included, not assumed.",
      },
      {
        question: "Does AGCO require liquor liability?",
        answer:
          "Licensing bodies and landlords typically require proof of liquor liability as a condition of operating.",
      },
      {
        question: "Are BYOB events covered?",
        answer:
          "Host liquor liability may be needed when you allow alcohol without controlling service. Disclose all service models.",
      },
      {
        question: "Do training programs affect coverage?",
        answer:
          "Smart Serve and responsible service training may be underwriting requirements. Maintain documented staff training.",
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
    photographySlug: "professional-offices-insurance",
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
    photographySlug: "professional-offices-insurance",
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

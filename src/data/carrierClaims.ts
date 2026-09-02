import { allPartners } from "@/data/partners";

export type CarrierClaimGroup = "insurance-companies" | "specialty-mgas";

export type CarrierClaimPhone = {
  label?: string;
  number: string;
  telHref: string;
};

export type CarrierClaimEmail = {
  label?: string;
  email: string;
};

export type CarrierClaimEntry = {
  id: string;
  carrierName: string;
  /** Additional search terms (aliases) — do not create duplicate entries. */
  searchAliases?: string[];
  logoPath?: string;
  group: CarrierClaimGroup;
  verified: boolean;
  isDirectInsurer: boolean;
  claimsPhones?: CarrierClaimPhone[];
  claimsEmails?: CarrierClaimEmail[];
  claimsUrl?: string;
  availability?: string;
  notes?: string[];
  /** Visually prominent warning (e.g. Travelers). */
  prominentWarning?: string;
};

export const CARRIER_GROUP_LABELS: Record<CarrierClaimGroup, string> = {
  "insurance-companies": "Insurance Companies",
  "specialty-mgas": "Specialty Programs & MGAs",
};

export function phone(number: string, label?: string): CarrierClaimPhone {
  const digits = number.replace(/[^\d+]/g, "");
  const telHref =
    digits.length === 10
      ? `tel:+1${digits}`
      : digits.startsWith("1") && digits.length === 11
        ? `tel:+${digits}`
        : `tel:${digits}`;
  return { label, number, telHref };
}

export function email(email: string, label?: string): CarrierClaimEmail {
  return { label, email };
}

function partnerLogo(name: string): string | undefined {
  return allPartners.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  )?.src;
}

/** Verified direct insurers — claims contacts confirmed in specification. */
const verifiedInsuranceCompanies: CarrierClaimEntry[] = [
  {
    id: "intact",
    carrierName: "Intact",
    searchAliases: ["Intact Insurance"],
    logoPath: partnerLogo("Intact Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-866-464-2424", "Claims")],
    availability: "24/7",
  },
  {
    id: "aviva",
    carrierName: "Aviva",
    logoPath: partnerLogo("Aviva"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [
      phone("1-866-692-8482", "Claims"),
      phone("1-866-MYAVIVA", "Also"),
    ],
  },
  {
    id: "wawanesa",
    carrierName: "Wawanesa",
    searchAliases: ["Wawanesa Insurance"],
    logoPath: partnerLogo("Wawanesa Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-844-929-2637", "Claims")],
    availability: "24/7",
    notes: ["Covers home, auto, commercial and farm claims."],
  },
  {
    id: "caa-insurance",
    carrierName: "CAA Insurance",
    searchAliases: ["CAA"],
    logoPath: partnerLogo("CAA Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-877-222-1717", "Claims")],
    availability: "24/7",
  },
  {
    id: "gore",
    carrierName: "Gore",
    searchAliases: ["Gore Mutual", "Gore Mutual Insurance", "Gore Insurance Company"],
    logoPath: partnerLogo("Gore Mutual"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-844-974-4673", "Claims")],
    notes: [
      "Formerly Gore Mutual.",
      "Legal name as of Jan. 1, 2026 is Gore Insurance Company and it is transitioning to the Beneva brand.",
    ],
  },
  {
    id: "northbridge",
    carrierName: "Northbridge",
    searchAliases: ["Northbridge Insurance"],
    logoPath: partnerLogo("Northbridge Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-855-621-6262", "Claims")],
    notes: ["Northbridge recommends contacting your broker first before calling directly."],
  },
  {
    id: "sgi-canada",
    carrierName: "SGI Canada",
    searchAliases: ["SGI", "Coachman", "Coachman Insurance", "Coachman Insurance Company"],
    logoPath: partnerLogo("SGI Canada"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-877-844-8460", "Claims")],
    notes: [
      "Coachman Insurance is SGI CANADA's Ontario high-risk division and uses this same claims number.",
    ],
  },
  {
    id: "echelon",
    carrierName: "Echelon",
    searchAliases: ["Echelon Insurance"],
    logoPath: partnerLogo("Echelon Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("(800) 324-3566", "Claims")],
    notes: [
      "After-hours/emergency number could not be confirmed from official sources.",
    ],
  },
  {
    id: "pembridge",
    carrierName: "PemBridge",
    searchAliases: ["PemBridge Insurance Company"],
    logoPath: partnerLogo("PemBridge Insurance Company"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-877-736-2743", "Claims")],
    availability: "24-hour claims assistance",
  },
  {
    id: "chubb",
    carrierName: "Chubb",
    logoPath: partnerLogo("Chubb"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("800-532-4822", "Claims")],
  },
  {
    id: "travelers",
    carrierName: "Travelers",
    logoPath: partnerLogo("Travelers"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-800-661-5522", "Claims")],
    prominentWarning:
      "For existing Travelers policies only. Travelers no longer writes new personal or commercial business in Canada — policies transfer to Definity upon renewal.",
  },
  {
    id: "definity",
    carrierName: "Definity",
    searchAliases: ["Economical", "Economical Insurance"],
    logoPath: partnerLogo("Definity"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [
      phone("1-800-607-2424", "Claims"),
      phone("1-888-875-8088", "Quebec"),
    ],
    availability: "24 hours",
    notes: ["Formerly Economical."],
  },
  {
    id: "unica",
    carrierName: "Unica",
    searchAliases: ["Unica Insurance"],
    logoPath: partnerLogo("Unica Insurance"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-866-864-1113", "After-hours / emergency")],
    notes: ["During regular business hours, contact your broker first."],
  },
  {
    id: "pafco",
    carrierName: "PAFCO",
    logoPath: partnerLogo("PAFCO"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-800-387-0462", "Ontario Claims Promise Line")],
    availability: "24/7",
  },
  {
    id: "jevco",
    carrierName: "JEVCO",
    logoPath: partnerLogo("JEVCO"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-866-864-1112", "Claims")],
    availability: "24/7",
  },
  {
    id: "optimum",
    carrierName: "Optimum",
    logoPath: partnerLogo("Optimum"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [phone("1-877-806-8023", "Claims / Service")],
  },
  {
    id: "aig",
    carrierName: "AIG",
    logoPath: partnerLogo("AIG"),
    group: "insurance-companies",
    verified: true,
    isDirectInsurer: true,
    claimsPhones: [
      phone("1-800-387-4481", "Business-hours claims"),
      phone("1-800-235-8784", "After-hours claims (5pm–9am only)"),
    ],
    claimsEmails: [email("CanadaClaimsInquiry@aig.com")],
  },
];

/** Verified specialty programs & MGAs. */
const verifiedSpecialtyMgas: CarrierClaimEntry[] = [
  {
    id: "ches-special-risk",
    carrierName: "CHES Special Risk",
    searchAliases: ["CHES Special Risk Inc."],
    logoPath: partnerLogo("CHES Special Risk Inc."),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsEmails: [email("info@chesspecialrisk.ca", "Contact")],
    notes: [
      "No dedicated claims phone published — email is the primary contact method.",
    ],
  },
  {
    id: "totten-cansure",
    carrierName: "Totten Group / Cansure",
    searchAliases: ["Totten Group Insurance", "Totten Group", "Cansure"],
    logoPath: partnerLogo("Totten Group Insurance"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsPhones: [phone("1-888-868-8367", "General")],
    notes: [
      "Claims for Totten and Cansure are handled by Specialty Claims, a dedicated claims administrator.",
    ],
  },
  {
    id: "burns-wilcox",
    carrierName: "Burns & Wilcox",
    searchAliases: ["Burns & Wilcox Canada"],
    logoPath: partnerLogo("Burns & Wilcox Canada"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsPhones: [phone("416-774-2477", "General")],
    notes: [
      "Has a formal claims submission process on their official site; no separate claims-specific number is published beyond the general office line.",
    ],
  },
  {
    id: "trinity-underwriting",
    carrierName: "Trinity Underwriting",
    logoPath: partnerLogo("Trinity Underwriting"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    notes: [
      "Claims method: website claims form / email.",
      "No claims phone published — submit via their online claims form or email.",
    ],
  },
  {
    id: "srim",
    carrierName: "Special Risk Insurance Managers (SRIM)",
    searchAliases: ["Special Risk Insurance Managers"],
    logoPath: partnerLogo("Special Risk Insurance Managers"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsPhones: [phone("604-888-0050", "General")],
    notes: [
      "Claims are handled by Royal Claims Services Ltd. on SRIM's behalf; no separate direct number is published.",
    ],
  },
  {
    id: "beazley",
    carrierName: "Beazley",
    logoPath: partnerLogo("Beazley"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsPhones: [phone("416-601-2155", "Phone")],
    claimsEmails: [email("claims.canada@beazley.com", "Claims email")],
  },
  {
    id: "abex",
    carrierName: "ABEX",
    logoPath: partnerLogo("ABEX"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    claimsPhones: [phone("1-888-204-4726", "After-hours (IPG Claims)")],
    claimsEmails: [
      email("claims@abexinsurance.com", "Business-hours claims"),
      email("abexclaims@ipgclaims.com", "After-hours (IPG Claims)"),
    ],
    notes: ["After-hours claims are handled by IPG Claims."],
  },
  {
    id: "lions-gate",
    carrierName: "Lions Gate",
    searchAliases: ["Lions Gate Underwriting"],
    logoPath: partnerLogo("Lions Gate Underwriting"),
    group: "specialty-mgas",
    verified: true,
    isDirectInsurer: false,
    notes: [
      "No dedicated claims contact published — contact Premium and we'll help connect you with the right team.",
    ],
  },
];

/** Partner names excluded from the selector entirely. */
const EXCLUDED_PARTNER_NAMES = new Set(
  [
    "Facility Association",
    "Coachman Insurance Company",
    "Cansure",
    "Totten Group Insurance",
  ].map((n) => n.toLowerCase()),
);

/** Verified entry IDs and names — used to avoid duplicate unverified rows. */
const VERIFIED_NAMES = new Set(
  [...verifiedInsuranceCompanies, ...verifiedSpecialtyMgas].flatMap((entry) => [
    entry.carrierName.toLowerCase(),
    ...(entry.searchAliases?.map((a) => a.toLowerCase()) ?? []),
  ]),
);

function buildUnverifiedFromPartners(): CarrierClaimEntry[] {
  const entries: CarrierClaimEntry[] = [];
  const seen = new Set<string>();

  for (const partner of allPartners) {
    const key = partner.name.toLowerCase();
    if (EXCLUDED_PARTNER_NAMES.has(key)) continue;
    if (VERIFIED_NAMES.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);

    const slug = partner.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    entries.push({
      id: `unverified-${slug}`,
      carrierName: partner.name,
      logoPath: partner.src,
      group: "insurance-companies",
      verified: false,
      isDirectInsurer: true,
    });
  }

  return entries.sort((a, b) => a.carrierName.localeCompare(b.carrierName));
}

export const insuranceCompanyClaims: CarrierClaimEntry[] = [
  ...verifiedInsuranceCompanies,
  ...buildUnverifiedFromPartners(),
];

export const specialtyMgaClaims: CarrierClaimEntry[] = verifiedSpecialtyMgas;

export const carrierClaimsDirectory: CarrierClaimEntry[] = [
  ...insuranceCompanyClaims,
  ...specialtyMgaClaims,
];

export function getCarrierClaimById(id: string): CarrierClaimEntry | undefined {
  return carrierClaimsDirectory.find((entry) => entry.id === id);
}

export function carrierMatchesQuery(entry: CarrierClaimEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (entry.carrierName.toLowerCase().includes(q)) return true;
  return entry.searchAliases?.some((alias) => alias.toLowerCase().includes(q)) ?? false;
}

export const FALLBACK_CLAIMS_MESSAGE =
  "Contact Premium and we'll help connect you with the appropriate claims contact.";

export const BROKER_CLAIMS_PHONE = "226-782-6000";
export const BROKER_CLAIMS_PHONE_HREF = "tel:+12267826000";

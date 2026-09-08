/**
 * Canonical carrier / MGA inventory for Premium Insurance Brokers.
 * Source: owner-supplied personal + commercial broker contact spreadsheets (Sep 2026).
 * Privacy: no underwriter names, extensions, or internal broker codes.
 */

export type PartnerClassification =
  | "insurance-carrier"
  | "mga-wholesale"
  | "specialty-underwriting"
  | "other-partner";

export type MarketCategory = "personal" | "commercial" | "specialty";

export type CarrierRecord = {
  /** Stable slug — matches public/images/carriers/{slug}.{ext} when sourced */
  slug: string;
  /** Public-facing display name */
  name: string;
  alt: string;
  /** Logo path under /images/carriers/ — undefined when not sourced */
  logo?: string;
  classification: PartnerClassification;
  /** Which market segments this partner appears in on the Partners page */
  categories: MarketCategory[];
  /** Search / claims aliases */
  aliases?: string[];
  /** Reuse another slug's logo asset */
  sharedLogoSlug?: string;
  /** Owner-review notes (not rendered on site) */
  classificationNotes?: string;
};

function logo(slug: string, ext: string): string {
  return `/images/carriers/${slug}.${ext}`;
}

/** Resolve logo path, including shared-logo variants. */
export function resolveCarrierLogo(record: CarrierRecord): string | undefined {
  if (record.logo) return record.logo;
  if (record.sharedLogoSlug) {
    const shared = CARRIER_INVENTORY.find((c) => c.slug === record.sharedLogoSlug);
    return shared ? resolveCarrierLogo(shared) : undefined;
  }
  return undefined;
}

/**
 * Full verified public-facing inventory.
 * Duplicates across personal/commercial lists collapsed to one record each.
 */
export const CARRIER_INVENTORY: CarrierRecord[] = [
  // ── Personal lines carriers ─────────────────────────────────────────────
  {
    slug: "aviva",
    name: "Aviva",
    alt: "Aviva logo",
    logo: logo("aviva", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
  },
  {
    slug: "axa-xl",
    name: "AXA XL",
    alt: "AXA XL logo",
    logo: logo("axa-xl", "svg"),
    classification: "insurance-carrier",
    categories: ["personal"],
  },
  {
    slug: "caa",
    name: "CAA Insurance",
    alt: "CAA Insurance Company logo",
    logo: logo("caa", "png"),
    classification: "insurance-carrier",
    categories: ["personal"],
    aliases: ["CAA"],
  },
  {
    slug: "chieftain",
    name: "Chieftain Insurance",
    alt: "Chieftain Insurance logo",
    classification: "insurance-carrier",
    categories: ["personal"],
    classificationNotes: "Logo not sourced — minimal official asset found during task.",
  },
  {
    slug: "coachman",
    name: "Coachman Insurance",
    alt: "Coachman Insurance Company logo",
    logo: logo("coachman", "png"),
    classification: "insurance-carrier",
    categories: ["personal"],
    aliases: ["Coachman Insurance Company"],
    classificationNotes: "SGI CANADA Ontario high-risk division.",
  },
  {
    slug: "chubb",
    name: "Chubb",
    alt: "Chubb logo",
    logo: logo("chubb", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
  },
  {
    slug: "dufferin-mutual",
    name: "Dufferin Mutual Insurance",
    alt: "Dufferin Mutual Insurance logo",
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    classificationNotes: "Logo not sourced — official site asset unavailable during task.",
  },
  {
    slug: "echelon",
    name: "Echelon Insurance",
    alt: "Echelon Insurance logo",
    logo: logo("echelon", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
  },
  {
    slug: "definity",
    name: "Definity",
    alt: "Definity logo",
    logo: logo("definity", "png"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Economical", "Economical Insurance"],
    classificationNotes: "Formerly Economical Insurance.",
  },
  {
    slug: "gore",
    name: "Gore Mutual",
    alt: "Gore Mutual logo",
    logo: logo("gore", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Gore", "Gore Insurance Company"],
  },
  {
    slug: "hagerty",
    name: "Hagerty",
    alt: "Hagerty logo",
    logo: logo("hagerty", "svg"),
    classification: "insurance-carrier",
    categories: ["personal"],
  },
  {
    slug: "high-risk-mga",
    name: "High Risk MGA",
    alt: "High Risk MGA logo",
    classification: "mga-wholesale",
    categories: ["personal"],
    classificationNotes: "Logo not sourced — wholesale MGA; verify public-facing identity with owner.",
  },
  {
    slug: "intact",
    name: "Intact Insurance",
    alt: "Intact Insurance logo",
    logo: logo("intact", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Intact"],
  },
  {
    slug: "jevco",
    name: "JEVCO",
    alt: "JEVCO logo",
    logo: logo("jevco", "png"),
    classification: "insurance-carrier",
    categories: ["personal"],
  },
  {
    slug: "facility-association",
    name: "Facility Association",
    alt: "Facility Association logo",
    logo: logo("facility-association", "jpg"),
    classification: "specialty-underwriting",
    categories: ["personal"],
    aliases: ["Nordic", "Nordic Insurance"],
    classificationNotes: "Residual market / Facility Association (Nordic brand in some contexts).",
  },
  {
    slug: "northbridge",
    name: "Northbridge Insurance",
    alt: "Northbridge Insurance logo",
    logo: logo("northbridge", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Northbridge"],
  },
  {
    slug: "pafco",
    name: "PAFCO",
    alt: "PAFCO logo",
    logo: logo("pafco", "png"),
    classification: "insurance-carrier",
    categories: ["personal"],
    aliases: ["Pafco"],
  },
  {
    slug: "pembridge",
    name: "Pembridge Insurance",
    alt: "Pembridge Insurance Company logo",
    logo: logo("pembridge", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal"],
    aliases: ["PemBridge Insurance Company", "Pembridge"],
  },
  {
    slug: "optimum",
    name: "Optimum Insurance",
    alt: "Optimum logo",
    logo: logo("optimum", "png"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Optimum"],
  },
  {
    slug: "sgi",
    name: "SGI Canada",
    alt: "SGI Canada logo",
    logo: logo("sgi", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["SGI"],
  },
  {
    slug: "travelers",
    name: "Travelers",
    alt: "Travelers logo",
    logo: logo("travelers", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Travelers Canada"],
  },
  {
    slug: "unica",
    name: "Unica Insurance",
    alt: "Unica Insurance logo",
    logo: logo("unica", "png"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Unica"],
  },
  {
    slug: "wawanesa",
    name: "Wawanesa Insurance",
    alt: "Wawanesa Insurance logo",
    logo: logo("wawanesa", "jpg"),
    classification: "insurance-carrier",
    categories: ["personal", "commercial"],
    aliases: ["Wawanesa"],
  },

  // ── Commercial / specialty — carriers not already listed above ────────
  {
    slug: "zurich",
    name: "Zurich Insurance",
    alt: "Zurich Insurance logo",
    logo: logo("zurich", "svg"),
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Zurich", "Zurich Canada"],
  },
  {
    slug: "liberty-mutual",
    name: "Liberty Mutual",
    alt: "Liberty Mutual logo",
    logo: logo("liberty-mutual", "svg"),
    classification: "insurance-carrier",
    categories: ["commercial"],
  },
  {
    slug: "cna",
    name: "CNA",
    alt: "CNA logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Continental Casualty Company"],
    classificationNotes: "Logo not sourced — Wikimedia/official CDN blocked during task.",
  },
  {
    slug: "markel",
    name: "Markel",
    alt: "Markel logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Markel Canada"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "tokio-marine",
    name: "Tokio Marine",
    alt: "Tokio Marine logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Tokio Marine Canada"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "trisura",
    name: "Trisura",
    alt: "Trisura logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Trisura Guarantee"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "wynward",
    name: "Wynward Insurance",
    alt: "Wynward Insurance logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "berkley-canada",
    name: "Berkley Canada",
    alt: "Berkley Canada logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "berkshire-hathaway-specialty",
    name: "Berkshire Hathaway Specialty Insurance",
    alt: "Berkshire Hathaway Specialty Insurance logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["BHSI"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "intact-public-entities",
    name: "Intact Public Entities",
    alt: "Intact Public Entities logo",
    sharedLogoSlug: "intact",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["IPE"],
    classificationNotes: "Intact division — collapsed to parent Intact logo per entity-variant review.",
  },
  {
    slug: "intact-specialty-solutions",
    name: "Intact Specialty Solutions",
    alt: "Intact Specialty Solutions logo",
    sharedLogoSlug: "intact",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["ISS"],
    classificationNotes: "Intact division — collapsed to parent Intact logo per entity-variant review.",
  },
  {
    slug: "aig",
    name: "AIG",
    alt: "AIG logo",
    logo: logo("aig", "jpg"),
    classification: "insurance-carrier",
    categories: ["commercial"],
    classificationNotes: "Retained from prior verified claims research; not in new spreadsheet but verified claims contact exists.",
  },
  {
    slug: "sovereign",
    name: "Sovereign Insurance",
    alt: "Sovereign Insurance logo",
    logo: logo("sovereign", "png"),
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Sovereign"],
  },
  {
    slug: "ecclesiastical",
    name: "Ecclesiastical Insurance",
    alt: "Ecclesiastical Insurance logo",
    logo: logo("ecclesiastical", "png"),
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Ecclesiastical"],
  },
  {
    slug: "premier",
    name: "Premier Marine",
    alt: "Premier Marine logo",
    logo: logo("premier", "jpg"),
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["Premier"],
  },
  {
    slug: "niac",
    name: "Nuclear Insurance Association of Canada",
    alt: "Nuclear Insurance Association of Canada logo",
    classification: "other-partner",
    categories: ["commercial"],
    aliases: ["NIAC"],
    classificationNotes: "Logo not sourced — official site asset unavailable during task.",
  },

  // ── MGAs / wholesale / program markets ────────────────────────────────
  {
    slug: "abex",
    name: "ABEX",
    alt: "ABEX logo",
    logo: logo("abex", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Affiliated Brokers Exchange"],
  },
  {
    slug: "agile",
    name: "Agile Underwriting",
    alt: "Agile Underwriting logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "apollo",
    name: "Apollo Exchange",
    alt: "Apollo Exchange logo",
    logo: logo("apollo", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Apollo Insurance"],
  },
  {
    slug: "april",
    name: "April Canada",
    alt: "April Canada logo",
    logo: logo("april", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["April"],
  },
  {
    slug: "aurora",
    name: "Aurora Underwriting",
    alt: "Aurora Underwriting logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["Aurora"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "beazley",
    name: "Beazley Canada",
    alt: "Beazley logo",
    logo: logo("beazley", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Beazley"],
  },
  {
    slug: "boxx-insurance",
    name: "BOXX Insurance",
    alt: "BOXX Insurance logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "burns-wilcox",
    name: "Burns & Wilcox Canada",
    alt: "Burns & Wilcox Canada logo",
    logo: logo("burns-wilcox", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Burns & Wilcox"],
  },
  {
    slug: "canngenn",
    name: "CannGenn Insurance Canada",
    alt: "CannGenn Insurance Canada logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["CannGenn"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "cansure",
    name: "Cansure",
    alt: "Cansure logo",
    logo: logo("cansure", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["SPGC", "Cansure/SPGC"],
  },
  {
    slug: "cfc",
    name: "CFC Underwriting",
    alt: "CFC Underwriting logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["CFC"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "ches-special-risk",
    name: "CHES Special Risk",
    alt: "CHES Special Risk logo",
    logo: logo("ches-special-risk", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["CHES Special Risk Inc."],
  },
  {
    slug: "chutter",
    name: "Chutter Underwriting",
    alt: "Chutter Underwriting logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["Chutter"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "coast-underwriting",
    name: "Coast Underwriting",
    alt: "Coast Underwriting logo",
    logo: logo("coast-underwriting", "png"),
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["Coast Underwriters"],
  },
  {
    slug: "coalition",
    name: "Coalition",
    alt: "Coalition logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "eagle-underwriting",
    name: "Eagle Underwriting",
    alt: "Eagle Underwriting logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "forward",
    name: "Forward Insurance Managers",
    alt: "Forward Insurance Managers logo",
    logo: logo("forward", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Forward Insurance", "Jet"],
  },
  {
    slug: "gameday",
    name: "Gameday Insurance",
    alt: "Gameday Insurance logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced — downloaded asset was invalid HTML during task.",
  },
  {
    slug: "gass",
    name: "GASS",
    alt: "Global Alliance Specialty Solutions logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Global Alliance Specialty Solutions"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "group-one",
    name: "GroupOne Insurance",
    alt: "GroupOne Insurance logo",
    logo: logo("group-one", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Group One"],
  },
  {
    slug: "hsb",
    name: "HSB Canada",
    alt: "HSB Canada logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["HSB", "BI&I", "Hartford Steam Boiler"],
    classificationNotes: "Logo not sourced — official site asset unavailable during task.",
  },
  {
    slug: "hdi-global",
    name: "HDI Global",
    alt: "HDI Global logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "kk-insurance",
    name: "K&K Insurance Canada",
    alt: "K&K Insurance Canada logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["K&K"],
    classificationNotes: "Logo not sourced — official CDN returned invalid asset during task.",
  },
  {
    slug: "lions-gate",
    name: "Lions Gate Underwriting",
    alt: "Lions Gate Underwriting logo",
    logo: logo("lions-gate", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Lions Gate"],
  },
  {
    slug: "milnco",
    name: "Milnco Insurance",
    alt: "Milnco Insurance logo",
    logo: logo("milnco", "jpeg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Milnco"],
  },
  {
    slug: "novarisk",
    name: "NovaRisk",
    alt: "NovaRisk logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "odis",
    name: "ODIS Underwriting",
    alt: "ODIS Underwriting logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["ODIS"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "pal",
    name: "PAL Insurance",
    alt: "PAL Insurance logo",
    logo: logo("pal", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["PAL Insurance Brokers Canada Ltd."],
  },
  {
    slug: "raise-underwriting",
    name: "Raise Underwriting",
    alt: "Raise Underwriting logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "revau",
    name: "REVAU",
    alt: "REVAU logo",
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Groupassur"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "ridge-canada",
    name: "Ridge Canada Cyber Solutions",
    alt: "Ridge Canada Cyber Solutions logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    aliases: ["Ridge Canada"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "signature-risk",
    name: "Signature Risk",
    alt: "Signature Risk logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "swg",
    name: "South Western Insurance Group",
    alt: "South Western Insurance Group logo",
    logo: logo("swg", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: [
      "SWG",
      "SWG Specialty",
      "South Western General",
      "AM Fredericks",
    ],
    classificationNotes:
      "Collapsed SWG / South Western General / AM Fredericks to one canonical entity.",
  },
  {
    slug: "special-risk-srim",
    name: "Special Risk Insurance Managers",
    alt: "Special Risk Insurance Managers logo",
    logo: logo("special-risk-srim", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["SRIM", "Special Risk"],
  },
  {
    slug: "sport-fitness-insurance",
    name: "Sport and Fitness Insurance Canada",
    alt: "Sport and Fitness Insurance Canada logo",
    classification: "specialty-underwriting",
    categories: ["commercial"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "starr",
    name: "STARR Insurance",
    alt: "STARR Insurance logo",
    classification: "insurance-carrier",
    categories: ["commercial"],
    aliases: ["Starr", "STARR Companies"],
    classificationNotes: "Logo not sourced.",
  },
  {
    slug: "sum",
    name: "Strategic Underwriting Managers",
    alt: "Strategic Underwriting Managers logo",
    logo: logo("sum", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["SUM"],
  },
  {
    slug: "totten",
    name: "Totten Group",
    alt: "Totten Group logo",
    logo: logo("totten", "jpg"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Totten Group Insurance", "Totten Group / Cansure"],
    classificationNotes: "Claims handled with Cansure via Specialty Claims administrator.",
  },
  {
    slug: "trinity",
    name: "Trinity Underwriting",
    alt: "Trinity Underwriting logo",
    logo: logo("trinity", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    classificationNotes: "Retained from prior site; verified claims process (form/email).",
  },
  {
    slug: "unique-risk",
    name: "Unique Risk Management",
    alt: "Unique Risk Management logo",
    logo: logo("unique-risk", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Unique Risk"],
  },
  {
    slug: "victor",
    name: "Victor Insurance Canada",
    alt: "Victor Insurance Canada logo",
    logo: logo("victor", "png"),
    classification: "mga-wholesale",
    categories: ["commercial"],
    aliases: ["Victor", "Encon"],
  },
];

/** Slugs curated for homepage marquee — Option B (core + Definity). */
export const HOMEPAGE_MARQUEE_SLUGS: string[] = [
  "caa",
  "intact",
  "sgi",
  "wawanesa",
  "northbridge",
  "aviva",
  "travelers",
  "chubb",
  "gore",
  "echelon",
  "unica",
  "pembridge",
  "definity",
];

export const PARTNER_GROUP_META = {
  personal: {
    id: "personal-markets",
    title: "Personal Insurance Markets",
    description:
      "Auto, home, and specialty personal lines carriers and program markets we access for Ontario clients.",
  },
  commercial: {
    id: "commercial-markets",
    title: "Commercial Insurance Markets",
    description:
      "Commercial insurers and underwriting partners for business, fleet, property, and liability placements.",
  },
  specialty: {
    id: "specialty-mga-markets",
    title: "Specialty & MGA Markets",
    description:
      "Wholesale, MGA, and program markets for hard-to-place, niche, and specialty commercial risks.",
  },
} as const;

export function getCarriersByCategory(category: MarketCategory): CarrierRecord[] {
  return CARRIER_INVENTORY.filter((c) => c.categories.includes(category)).sort(
    (a, b) => a.name.localeCompare(b.name),
  );
}

export function getHomepageMarqueeCarriers(): CarrierRecord[] {
  return HOMEPAGE_MARQUEE_SLUGS.map(
    (slug) => CARRIER_INVENTORY.find((c) => c.slug === slug)!,
  ).filter(Boolean);
}

export function carrierRecordToPartnerLogo(record: CarrierRecord): {
  name: string;
  src: string;
  alt: string;
  slug: string;
  hasLogo: boolean;
} {
  const src = resolveCarrierLogo(record);
  return {
    name: record.name,
    src: src ?? "",
    alt: record.alt,
    slug: record.slug,
    hasLogo: Boolean(src),
  };
}

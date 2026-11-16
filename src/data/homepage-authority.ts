/**
 * Owner-approved homepage authority facts (Batch: Homepage Authority Concept F).
 * Do not invent additional statistics.
 */

export const HOMEPAGE_AUTHORITY = {
  clients: {
    value: "2,700+",
    label: "Clients",
  },
  homesCovered: {
    value: "2,400+",
    label: "Homes covered",
    annotation: "2,400+ homes covered through Premium",
  },
  combinedExperience: {
    value: "31+",
    label: "Years combined experience",
  },
  awards: {
    value: "9",
    label: "Awards & recognitions",
  },
  oracle: {
    eyebrow: "A Division of",
    name: "Oracle RMS",
  },
  google: {
    businessName:
      "Premium Insurance Brokers a division of ORACLE RMS",
    address: "3063 Dougall Ave, Windsor, ON N9E 1S3, Canada",
    /** Verified Google Business Profile. Reviews are read on Google, not embedded. */
    shareUrl: "https://share.google/TOTb2uanZ8DS8NMRQ",
  },
} as const;

export const WHY_PREMIUM_POINTS = [
  {
    title: "More choice",
    body: "Access to multiple insurance markets and coverage options — so recommendations can be compared, not just quoted.",
  },
  {
    title: "Commercial capability",
    body: "Personal, commercial, and specialty insurance expertise for households and businesses across Windsor-Essex.",
  },
  {
    title: "Real broker support",
    body: "Licensed brokers available to explain coverage and help clients navigate insurance decisions.",
  },
  {
    title: "Local accountability",
    body: "A Windsor-Essex brokerage with real people clients can call and visit.",
  },
] as const;

/** Featured faces for homepage team credibility (real photos from /team/). */
export const HOMEPAGE_TEAM_FEATURED = [
  "Nabil Ghamraoui",
  "Omar Chafchak",
  "Judy Gu",
  "Yousef Abouzeeni",
] as const;

/**
 * Broker compensation schedule transcribed exactly from premiumib.com/compliance/
 * Do not estimate, round, or omit rows.
 */
export type CommissionRow = {
  company: string;
  property: string;
  automobile: string;
  commercial: string;
};

export const commissionRows: CommissionRow[] = [
  {
    company: "Aviva*",
    property: "20%",
    automobile: "10% – 15%",
    commercial: "15%-20%",
  },
  {
    company: "CAA Insurance Company**",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Ecclesiastical",
    property: "N/A",
    automobile: "N/A",
    commercial: "15%-20%",
  },
  {
    company: "Dufferin Mutual",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Coachman",
    property: "N/A",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "Chubb",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Echelon*",
    property: "N/A",
    automobile: "12.5% – 15%",
    commercial: "15%-20%",
  },
  {
    company: "Economical Mutual*",
    property: "20%",
    automobile: "10% – 12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Nordic",
    property: "N/A",
    automobile: "6% – 11% Capped at $310",
    commercial: "5%-10%",
  },
  {
    company: "Gore*",
    property: "20%",
    automobile: "10% – 12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Intact Insurance*",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Jevco*",
    property: "N/A",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "Max Insurance",
    property: "20%",
    automobile: "N/A",
    commercial: "N/A",
  },
  {
    company: "Optimum",
    property: "N/A",
    automobile: "N/A",
    commercial: "15%-20%",
  },
  {
    company: "Northbridge",
    property: "20%",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "Pafco*",
    property: "20%",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "Pembridge*",
    property: "20%",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "SGI Canada",
    property: "20%",
    automobile: "12.5%",
    commercial: "N/A",
  },
  {
    company: "Sovereign General*",
    property: "20%",
    automobile: "10% – 12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Unica",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Travelers*",
    property: "20%",
    automobile: "12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Wawanesa Mutual*",
    property: "20%",
    automobile: "7.5% – 12.5%",
    commercial: "15%-20%",
  },
  {
    company: "Managing General Agents",
    property: "10% – 15%",
    automobile: "7.5% – 12.5%",
    commercial: "10%-20%",
  },
];

export const complianceLinks = [
  {
    label: "RIBO Fact Sheet",
    href: "https://www.ribo.com/wp-content/uploads/2022/04/RIBO_Conduct_Sheet_040622-fact_sheet.pdf",
  },
  {
    label: "Principles of Conduct for Insurance Intermediaries",
    href: "https://www.cisro-ocra.com/Documents/View/2471",
  },
  {
    label: "Disclosure Form",
    href: "https://premiumib.com/wp-content/uploads/2025/05/disclosure.pdf",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy/",
    internal: true,
  },
] as const;

/** Broker Compensation explanatory copy transcribed from premiumib.com/compliance/. */
export const brokerCompensationParagraphs = [
  "Premium Insurance Brokers a division of Oracle RMS is an independent broker working on your behalf to secure competitive insurance products with coverage and terms that best protect your property and cover for liabilities you may incur.",
  'The "independent" part of our role means we are not beholden to a single insurance company and your interests are always our priority. Our trained and licensed professionals: provide advice on markets offering the best price, coverage, and service; maintain your policies and manage mid-term changes; advocate for you in the case of policy issues and insurance claims.',
  'The "broker" part of our job means we represent multiple insurance companies and provide services at costs insurers writing business directly would otherwise bear. Examples of assumed services and costs include: prospecting, marketing and business production; administrative and processing services; and travel expenses.',
  "Additionally, Premium provides value in technical expertise, local knowledge, customer relationships, and professional advice for you.",
  "Compensation for our services and value-adds is paid in the form of a percentage of commission the insurer builds into your total premium.",
  "In the interest of transparency and full disclosure, we provide below a schedule of our commissions sorted by insurer and product class.",
] as const;

export type JobPosting = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  licensingRequirement: string;
  preferredExperience?: string;
  isOpen: boolean;
  datePosted: string;
};

export const jobs: JobPosting[] = [
  {
    slug: "licensed-customer-service-representative",
    title: "Licensed Customer Service Representative",
    department: "Client Services",
    location: "Windsor, Ontario",
    employmentType: "Full-time",
    summary:
      "Premium Insurance Brokers is seeking a licensed Customer Service Representative to support personal and commercial clients from our Windsor office. You will handle policy servicing, renewals, endorsements, and client inquiries with accuracy and professionalism.",
    responsibilities: [
      "Respond to client inquiries by phone, email, and in person regarding policies, billing, and coverage questions.",
      "Process policy changes, endorsements, renewals, and cancellations in broker management systems.",
      "Obtain and bind coverage with insurer partners according to brokerage procedures and underwriting guidelines.",
      "Prepare certificates of insurance and proof-of-insurance documents when requested.",
      "Maintain accurate client records and documentation in compliance with RIBO requirements.",
      "Follow up on outstanding documentation, payments, and renewal requirements.",
      "Collaborate with brokers and account managers on complex client needs and remarketing opportunities.",
      "Support claims intake by gathering initial information and directing clients to appropriate carrier contacts.",
    ],
    qualifications: [
      "Valid RIBO licence in good standing (or eligibility to obtain prior to start, subject to confirmation).",
      "Minimum one year of brokerage or insurer customer service experience preferred.",
      "Strong communication skills and professional phone manner.",
      "Comfort working in a fast-paced, client-facing office environment.",
      "Proficiency with broker management systems and Microsoft Office.",
      "Attention to detail and ability to manage multiple priorities accurately.",
    ],
    licensingRequirement:
      "A valid RIBO licence is required for this role. Candidates must maintain licensing in good standing throughout employment.",
    preferredExperience:
      "Experience with personal lines auto and home, and familiarity with commercial certificates, is an asset.",
    isOpen: true,
    datePosted: "2026-09-01",
  },
];

export function getOpenJobs(): JobPosting[] {
  return jobs.filter((job) => job.isOpen);
}

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function getJobsByDepartment(): Map<string, JobPosting[]> {
  const map = new Map<string, JobPosting[]>();
  for (const job of getOpenJobs()) {
    const list = map.get(job.department) ?? [];
    list.push(job);
    map.set(job.department, list);
  }
  return map;
}

export const ORGANIZATION_NAME = "Premium Insurance Brokers";
export const ORGANIZATION_URL = "https://premiumib.com";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getJobBySlug,
  getOpenJobs,
  ORGANIZATION_NAME,
  ORGANIZATION_URL,
  type JobPosting,
} from "@/data/jobs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getOpenJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job || !job.isOpen) {
    return { title: "Careers | Premium Insurance Brokers", robots: { index: false } };
  }
  return {
    title: `${job.title} | Careers | Premium Insurance Brokers`,
    description: job.summary,
  };
}

function jobPostingJsonLd(job: JobPosting) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, ...job.responsibilities, ...job.qualifications].join("\n"),
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      sameAs: ORGANIZATION_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Windsor",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job || !job.isOpen) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
      />
      <Header />
      <main>
        <section className="border-b border-border bg-offwhite py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                {job.department}
              </p>
              <h1 className="mt-2 text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl">
                {job.title}
              </h1>
              <p className="mt-3 text-[15px] text-secondary">
                {job.location} · {job.employmentType}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-secondary">
                {job.summary}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-b border-border bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2 className="text-xl font-medium text-charcoal">Responsibilities</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-secondary">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="mt-10 text-xl font-medium text-charcoal">Qualifications</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-secondary">
                {job.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="mt-10 text-xl font-medium text-charcoal">Licensing</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {job.licensingRequirement}
              </p>

              {job.preferredExperience ? (
                <>
                  <h2 className="mt-10 text-xl font-medium text-charcoal">
                    Preferred experience
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                    {job.preferredExperience}
                  </p>
                </>
              ) : null}
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="bg-offwhite py-14 sm:py-16"
          aria-labelledby="apply-heading"
        >
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2 id="apply-heading" className="text-2xl font-medium text-charcoal">
                Apply for this role
              </h2>
              <p className="mt-2 text-[15px] text-secondary">
                In-office role based in Windsor, Ontario.
              </p>
              <div className="mt-8">
                <JobApplicationForm position={job.slug} jobTitle={job.title} />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

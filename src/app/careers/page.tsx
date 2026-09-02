import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getJobsByDepartment, ORGANIZATION_NAME } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Careers | Premium Insurance Brokers",
  description:
    "Join Premium Insurance Brokers in Windsor, Ontario. View open positions and apply to grow your insurance career with a RIBO-licensed brokerage.",
};

export default function CareersPage() {
  const byDepartment = getJobsByDepartment();
  const departments = [...byDepartment.entries()];

  return (
    <>
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby="careers-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h1
                  id="careers-hero-heading"
                  className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl"
                >
                  Careers at {ORGANIZATION_NAME}
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Build your insurance career with a Windsor-Essex brokerage
                  focused on client service, integrity, and professional
                  growth.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16"
          aria-labelledby="open-positions-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="open-positions-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal"
              >
                Open positions
              </h2>
              {departments.length === 0 ? (
                <p className="mt-4 text-[15px] text-secondary">
                  There are no open positions at this time. Check back soon or
                  submit a general application below.
                </p>
              ) : (
                <div className="mt-8 space-y-10">
                  {departments.map(([department, postings]) => (
                    <div key={department}>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark">
                        {department}
                      </h3>
                      <ul className="mt-4 space-y-4">
                        {postings.map((job) => (
                          <li key={job.slug}>
                            <Link
                              href={`/careers/${job.slug}/`}
                              className="group block rounded-xl border border-border bg-offwhite/60 p-5 transition-colors hover:border-gold/50 hover:bg-offwhite"
                            >
                              <h4 className="text-lg font-medium text-charcoal group-hover:text-gold-dark">
                                {job.title}
                              </h4>
                              <p className="mt-1 text-sm text-secondary">
                                {job.location} · {job.employmentType}
                              </p>
                              <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                                {job.summary}
                              </p>
                              <span className="mt-4 inline-block text-sm font-medium text-gold-dark">
                                View role & apply →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="bg-charcoal py-12 text-center text-white sm:py-14"
          aria-labelledby="general-application-heading"
        >
          <div className="mx-auto max-w-xl px-4">
            <h2 id="general-application-heading" className="text-lg font-medium">
              Don&apos;t see the right role?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Submit a general application and tell us about your experience.
            </p>
            <Link
              href="/careers/general-application/"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal"
            >
              General application →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

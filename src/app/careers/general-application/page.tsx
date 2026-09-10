import type { Metadata } from "next";
import Header from "@/components/Header";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "General Application | Careers | Premium Insurance Brokers",
  description:
    "Submit a general career application to Premium Insurance Brokers in Windsor, Ontario.",
};

export default function GeneralApplicationPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border bg-offwhite py-14 sm:py-16">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl">
                General career application
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                Interested in joining Premium Insurance Brokers but don&apos;t
                see an open role that fits? Tell us about your background and
                we&apos;ll keep your application on file for future opportunities.
              </p>
              <div className="mt-8">
                <JobApplicationForm position="general" />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

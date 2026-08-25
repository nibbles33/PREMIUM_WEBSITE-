import Link from "next/link";
import Header from "@/components/Header";

type LinePlaceholderPageProps = {
  title: string;
  quoteHref: string;
};

export default function LinePlaceholderPage({
  title,
  quoteHref,
}: LinePlaceholderPageProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Full page coming soon — in the meantime, get a quote below.
          </p>
          <Link
            href={quoteHref}
            className="btn-primary group mt-8 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
          >
            Get a Quote
            <span
              aria-hidden
              className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}

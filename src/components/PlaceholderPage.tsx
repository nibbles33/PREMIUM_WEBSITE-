import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";

type PlaceholderPageProps = {
  title: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function PlaceholderPage({
  title,
  description = "Full page coming soon.",
  primaryCta = { label: "Get a Quote", href: "/get-a-quote/" },
  secondaryCta,
}: PlaceholderPageProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-3xl font-medium tracking-[-0.02em] text-charcoal sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink
              href={primaryCta.href}
              className="btn-primary group inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
            >
              {primaryCta.label}
              <span
                aria-hidden
                className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </CtaLink>
            {secondaryCta ? (
              <CtaLink
                href={secondaryCta.href}
                className="btn-secondary inline-flex h-12 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-gold-dark hover:border-gold-dark"
              >
                {secondaryCta.label}
              </CtaLink>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

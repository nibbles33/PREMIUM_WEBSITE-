import Image from "next/image";
import Link from "next/link";

const personalLinks = [
  { label: "Auto Insurance", href: "/auto-insurance/" },
  { label: "Home Insurance", href: "/home-insurance/" },
  { label: "Condo Insurance", href: "/get-a-quote?type=home&homeType=condo" },
  { label: "Tenant Insurance", href: "/get-a-quote?type=home&homeType=tenant" },
  { label: "Business Insurance", href: "/commercial-insurance/" },
] as const;

const businessLinks = [
  { label: "Commercial Insurance", href: "/commercial-insurance/" },
  { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
  { label: "Contractors", href: "/contractors-insurance/" },
  { label: "Farm Insurance", href: "/farm-insurance/" },
  { label: "Bonding", href: "/bonding-insurance/" },
] as const;

const resourceLinks = [
  { label: "Claims", href: "/claims/" },
  { label: "Make a Payment", href: "/payment/" },
  { label: "Resources", href: "/resources/" },
  { label: "Newsletter", href: "/newsletter/" },
  { label: "Compliance", href: "/compliance/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
] as const;

const companyLinks = [
  { label: "About Us", href: "/about/" },
  { label: "Careers", href: "/careers/" },
  { label: "Meet the Team", href: "/team/" },
  { label: "Partners", href: "/partners/" },
  { label: "Contact Us", href: "/contact/" },
] as const;

const riboLink = {
  label: "RIBO Fact Sheet",
  href: "https://www.ribo.com/wp-content/uploads/2022/04/RIBO_Conduct_Sheet_040622-fact_sheet.pdf",
} as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            {"external" in link && link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-white/65 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-charcoal text-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex shrink-0"
              aria-label="Premium Insurance Brokers — Home"
            >
              <Image
                src="/logo/logo-for-dark-bg.png"
                alt="Premium Insurance Brokers"
                width={198}
                height={52}
                className="h-[42px] w-auto sm:h-[47px]"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Founded in July 2019, Premium Insurance Brokers — a division of
              Oracle RMS — has served Windsor-Essex County ever since.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/premiumibwindsor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/5 hover:text-gold"
                aria-label="PremiumIB on Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/premiuminsurancebrokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/5 hover:text-gold"
                aria-label="PremiumIB on Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <FooterNavColumn title="Personal" links={personalLinks} />
          <FooterNavColumn title="Business" links={businessLinks} />
          <FooterNavColumn title="Resources" links={resourceLinks} />
          <FooterNavColumn
            title="Company"
            links={[...companyLinks, { ...riboLink, external: true }]}
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8 xl:max-w-7xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>3063 Dougall Ave, Windsor, ON N9E 1S7</span>
            <span className="hidden text-white/25 sm:inline" aria-hidden>
              |
            </span>
            <a
              href="tel:+12267826000"
              className="transition-colors hover:text-gold"
            >
              226-782-6000
            </a>
          </p>
          <p className="sm:text-right">
            © {year} Premium Insurance Brokers — A Division of Oracle RMS. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

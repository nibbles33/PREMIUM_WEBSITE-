import Image from "next/image";
import Link from "next/link";
import type { PartnerLogo } from "@/data/partners";

type PartnerLogoCardProps = {
  partner: PartnerLogo;
  /** Larger cards for homepage marquee / partners directory */
  size?: "marquee" | "directory";
  href?: string;
  tabIndex?: number;
  className?: string;
};

const sizeClasses = {
  marquee: {
    shell:
      "h-[72px] min-w-[148px] px-5 sm:h-[84px] sm:min-w-[172px] sm:px-6",
    img: "max-h-11 sm:max-h-[52px] max-w-[132px] sm:max-w-[152px]",
  },
  directory: {
    shell: "h-[88px] px-5 sm:h-[96px] sm:px-6",
    img: "max-h-12 sm:max-h-14 max-w-[160px] sm:max-w-[180px]",
  },
} as const;

export default function PartnerLogoCard({
  partner,
  size = "directory",
  href,
  tabIndex,
  className = "",
}: PartnerLogoCardProps) {
  const dims = sizeClasses[size];
  const inner = (
    <>
      <Image
        src={partner.src}
        alt={partner.alt}
        width={200}
        height={80}
        className={`w-auto object-contain ${dims.img}`}
      />
    </>
  );

  const shellClass = `partner-logo-card interactive-press flex shrink-0 items-center justify-center rounded-xl border border-border/80 bg-white shadow-[0_4px_16px_rgba(32,39,40,0.05)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-gold/35 hover:shadow-[0_8px_24px_rgba(32,39,40,0.09)] ${dims.shell} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        tabIndex={tabIndex}
        className={`${shellClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
        aria-label={`${partner.name} — see all partners`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={shellClass} title={partner.name}>
      {inner}
    </div>
  );
}

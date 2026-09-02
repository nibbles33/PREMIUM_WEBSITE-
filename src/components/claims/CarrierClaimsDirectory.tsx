import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Phone } from "lucide-react";
import {
  BROKER_CLAIMS_PHONE,
  BROKER_CLAIMS_PHONE_HREF,
  carrierClaimsDirectory,
  FALLBACK_CLAIMS_MESSAGE,
} from "@/data/carrierClaims";

export default function CarrierClaimsDirectory() {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {carrierClaimsDirectory.map((carrier) => (
          <li
            key={carrier.carrierName}
            className="flex h-full flex-col rounded-[14px] border border-border bg-white p-5"
          >
            <div className="flex h-14 items-center justify-center">
              <Image
                src={carrier.logoPath}
                alt={`${carrier.carrierName} logo`}
                width={160}
                height={56}
                className="max-h-12 w-auto max-w-[140px] object-contain"
              />
            </div>
            <h3 className="mt-4 text-center text-[15px] font-medium text-charcoal">
              {carrier.carrierName}
            </h3>
            {carrier.verified && (carrier.claimsPhone || carrier.claimsUrl) ? (
              <div className="mt-4 space-y-2 text-center text-sm">
                {carrier.claimsPhone ? (
                  <a
                    href={`tel:${carrier.claimsPhone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-1.5 font-medium text-gold-dark hover:underline"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {carrier.claimsPhone}
                  </a>
                ) : null}
                {carrier.claimsUrl ? (
                  <div>
                    <a
                      href={carrier.claimsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 text-gold-dark hover:underline"
                    >
                      Report a claim online
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                ) : null}
                {carrier.afterHoursInfo ? (
                  <p className="text-secondary">{carrier.afterHoursInfo}</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 flex-1 text-center text-[14px] leading-relaxed text-secondary">
                {FALLBACK_CLAIMS_MESSAGE}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-[14px] text-secondary">
        Not sure which company holds your policy?{" "}
        <a
          href={BROKER_CLAIMS_PHONE_HREF}
          className="font-medium text-gold-dark hover:underline"
        >
          Call Premium at {BROKER_CLAIMS_PHONE}
        </a>{" "}
        and we&apos;ll help you reach the right claims contact.
      </p>
      <p className="mt-3 text-center">
        <Link
          href="/contact/"
          className="text-[14px] font-medium text-gold-dark hover:underline"
        >
          Contact our office →
        </Link>
      </p>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  BROKER_CLAIMS_PHONE,
  BROKER_CLAIMS_PHONE_HREF,
  CARRIER_GROUP_LABELS,
  carrierMatchesQuery,
  FALLBACK_CLAIMS_MESSAGE,
  getCarrierClaimById,
  insuranceCompanyClaims,
  specialtyMgaClaims,
  type CarrierClaimEntry,
} from "@/data/carrierClaims";

function CarrierDetailPanel({ carrier }: { carrier: CarrierClaimEntry }) {
  const hasContacts =
    carrier.verified &&
    ((carrier.claimsPhones?.length ?? 0) > 0 ||
      (carrier.claimsEmails?.length ?? 0) > 0 ||
      carrier.claimsUrl);

  const showFallback =
    !carrier.verified ||
    (!hasContacts &&
      !(carrier.notes?.length ?? 0) &&
      !carrier.prominentWarning);

  return (
    <div className="mt-6 rounded-xl border border-border bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        {carrier.logoPath ? (
          <div className="flex h-14 shrink-0 items-center justify-center sm:w-36">
            <Image
              src={carrier.logoPath}
              alt=""
              width={160}
              height={56}
              className="max-h-12 w-auto max-w-[140px] object-contain"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-medium text-charcoal">{carrier.carrierName}</h3>

          {carrier.prominentWarning ? (
            <p
              className="mt-4 rounded-lg border-2 border-amber-400/80 bg-amber-50 px-4 py-3 text-[14px] font-medium leading-relaxed text-amber-950 sm:text-[15px]"
              role="note"
            >
              {carrier.prominentWarning}
            </p>
          ) : null}

          {carrier.availability ? (
            <p className="mt-4 text-[14px] text-secondary">
              <span className="font-medium text-charcoal">Availability:</span>{" "}
              {carrier.availability}
            </p>
          ) : null}

          {hasContacts ? (
            <div className="mt-4 space-y-3">
              {carrier.claimsPhones?.map((item) => (
                <div key={`${item.label}-${item.number}`} className="flex flex-wrap items-center gap-2">
                  {item.label ? (
                    <span className="text-[14px] font-medium text-charcoal">
                      {item.label}:
                    </span>
                  ) : null}
                  <a
                    href={item.telHref}
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden />
                    {item.number}
                  </a>
                </div>
              ))}

              {carrier.claimsEmails?.map((item) => (
                <div key={`${item.label}-${item.email}`} className="flex flex-wrap items-center gap-2">
                  {item.label ? (
                    <span className="text-[14px] font-medium text-charcoal">
                      {item.label}:
                    </span>
                  ) : null}
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex break-all items-center gap-1.5 text-[15px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />
                    {item.email}
                  </a>
                </div>
              ))}

              {carrier.claimsUrl ? (
                <a
                  href={carrier.claimsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gold-dark underline-offset-4 hover:underline"
                >
                  Report a claim online
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
            </div>
          ) : null}

          {carrier.notes?.map((note) => (
            <p
              key={note}
              className="mt-3 break-words text-[14px] leading-relaxed text-secondary sm:text-[15px]"
            >
              {note}
            </p>
          ))}

          {showFallback ? (
            <p className="mt-4 text-[15px] leading-relaxed text-secondary">
              {FALLBACK_CLAIMS_MESSAGE}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function CarrierClaimsDirectory() {
  const [selectedId, setSelectedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const labelId = useId();
  const searchId = useId();
  const selectId = useId();
  const detailId = useId();

  const filteredInsurance = useMemo(
    () => insuranceCompanyClaims.filter((entry) => carrierMatchesQuery(entry, searchQuery)),
    [searchQuery],
  );
  const filteredSpecialty = useMemo(
    () => specialtyMgaClaims.filter((entry) => carrierMatchesQuery(entry, searchQuery)),
    [searchQuery],
  );

  const selected = selectedId ? getCarrierClaimById(selectedId) : undefined;

  const hasFilteredResults =
    filteredInsurance.length > 0 || filteredSpecialty.length > 0;

  return (
    <div>
      <div className="space-y-3">
        <label id={labelId} htmlFor={selectId} className="block text-sm font-medium text-charcoal">
          Select your insurance company
        </label>

        <input
          id={searchId}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by company name (e.g. Coachman, Economical)…"
          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal placeholder:text-secondary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-describedby={`${searchId}-hint`}
        />
        <p id={`${searchId}-hint`} className="text-xs text-secondary">
          Search supports aliases such as Coachman (SGI Canada) and Economical (Definity).
        </p>

        <select
          id={selectId}
          name="carrier"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-labelledby={labelId}
          aria-describedby={selected ? detailId : undefined}
        >
          <option value="">Choose a company…</option>
          {filteredInsurance.length > 0 ? (
            <optgroup label={CARRIER_GROUP_LABELS["insurance-companies"]}>
              {filteredInsurance.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.carrierName}
                </option>
              ))}
            </optgroup>
          ) : null}
          {filteredSpecialty.length > 0 ? (
            <optgroup label={CARRIER_GROUP_LABELS["specialty-mgas"]}>
              {filteredSpecialty.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.carrierName}
                </option>
              ))}
            </optgroup>
          ) : null}
        </select>

        {!hasFilteredResults ? (
          <p className="text-sm text-secondary" role="status">
            No companies match your search. Try a different name or{" "}
            <a href={BROKER_CLAIMS_PHONE_HREF} className="font-medium text-gold-dark hover:underline">
              call Premium at {BROKER_CLAIMS_PHONE}
            </a>
            .
          </p>
        ) : null}
      </div>

      <div
        id={detailId}
        aria-live="polite"
        aria-atomic="true"
        className="min-w-0"
      >
        {selected ? <CarrierDetailPanel carrier={selected} /> : null}
      </div>

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

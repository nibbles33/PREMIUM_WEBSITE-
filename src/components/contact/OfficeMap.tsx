import { connection } from "next/server";
import { googleMapsEmbedSrc } from "@/lib/google/maps-embed";

const MAP_TITLE =
  "Google Map of Premium Insurance Brokers, 3063 Dougall Ave, Windsor, Ontario";

export default async function OfficeMap() {
  await connection();
  const src = googleMapsEmbedSrc(process.env.GOOGLE_MAPS_EMBED_API_KEY);

  return (
    <figure className="relative order-3 scroll-mb-72 lg:order-2 lg:h-full lg:min-h-[22rem] lg:scroll-mb-32">
      <div className="relative h-64 overflow-hidden rounded-md border border-charcoal/15 border-t-2 border-t-[#d0ad26] bg-white shadow-[0_12px_32px_rgba(32,39,40,0.08)] sm:h-72 lg:absolute lg:inset-0 lg:h-auto">
        {src ? (
          <iframe
            title={MAP_TITLE}
            src={src}
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div
            className="flex h-full flex-col justify-end bg-[#F6F1E6] px-5 py-5 sm:px-6"
            role="region"
            aria-label={MAP_TITLE}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
              Windsor office
            </p>
            <p className="mt-2 text-[1.35rem] font-medium tracking-[-0.02em] text-charcoal">
              3063 Dougall Ave
            </p>
            <p className="mt-1 text-[15px] text-secondary">Windsor, ON N9E 1S3</p>
          </div>
        )}
      </div>
    </figure>
  );
}

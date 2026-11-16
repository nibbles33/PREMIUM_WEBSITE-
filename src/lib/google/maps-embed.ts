/**
 * Maps Embed API URL for the contact page.
 * This is the iframe endpoint only. It is not the Maps JavaScript API or Places API.
 * The key must be GOOGLE_MAPS_EMBED_API_KEY, restricted to Maps Embed API.
 */
const EMBED_PLACE_ENDPOINT = "https://www.google.com/maps/embed/v1/place";

export const OFFICE_MAP_QUERY =
  "Premium Insurance Brokers, 3063 Dougall Ave, Windsor, ON N9E 1S3";

export function googleMapsEmbedSrc(apiKey: string | undefined | null): string | null {
  const key = apiKey?.trim();
  if (!key) return null;

  const params = new URLSearchParams({
    key,
    q: OFFICE_MAP_QUERY,
    zoom: "16",
    language: "en",
    region: "CA",
  });

  return `${EMBED_PLACE_ENDPOINT}?${params.toString()}`;
}

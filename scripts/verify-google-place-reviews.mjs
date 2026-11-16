import assert from "node:assert/strict";
import {
  isSameOriginPlaceRatingRequest,
  resetPlaceRatingSlots,
  takePlaceRatingSlot,
} from "../src/lib/google/place-rating-guard.ts";
import {
  httpsGoogleUrl,
  parseGooglePlaceDetails,
  shouldUsePlacesFallback,
} from "../src/lib/google/place-reviews.ts";

const original =
  "Omar is fantastic!\nHighly recommended. He went above and beyond.";

const payload = {
  rating: 4.7,
  userRatingCount: 82,
  reviews: [
    {
      rating: 5,
      text: { text: original },
      relativePublishTimeDescription: "a year ago",
      authorAttribution: {
        displayName: "Taha Aljanabi",
        uri: "https://www.google.com/maps/contrib/1/reviews",
        photoUri: "https://lh3.googleusercontent.com/a/example=s128",
      },
      googleMapsUri: "https://www.google.com/maps/reviews/data=!example",
      flagContentUri: "https://www.google.com/local/content/rap/report?postId=1",
    },
    {
      rating: 4,
      text: { text: "  Second review stays intact.  " },
      authorAttribution: {
        displayName: "Rami Jameel",
        uri: "javascript:alert(1)",
        photoUri: "http://lh3.googleusercontent.com/insecure",
      },
      googleMapsUri: "https://evil.example/review",
    },
    {
      rating: 5,
      text: { text: "Third review." },
      authorAttribution: { displayName: "bianca korva" },
    },
    {
      rating: 5,
      text: { text: "Fourth review is not shown." },
      authorAttribution: { displayName: "Extra Person" },
    },
    {
      rating: 0,
      text: { text: "Zero stars are skipped." },
    },
    {
      rating: 5,
      text: { text: "   " },
    },
  ],
};

const parsed = parseGooglePlaceDetails(payload);
assert.equal(parsed.status, "live");
if (parsed.status !== "live") throw new Error("expected live");
assert.equal(parsed.rating, 4.7);
assert.equal(parsed.reviewCount, 82);
assert.equal(parsed.reviews.length, 3);
assert.equal(parsed.reviews[0]?.text, original);
assert.equal(parsed.reviews[0]?.authorName, "Taha Aljanabi");
assert.equal(parsed.reviews[0]?.relativeTime, "a year ago");
assert.equal(
  parsed.reviews[0]?.authorUri,
  "https://www.google.com/maps/contrib/1/reviews",
);
assert.equal(
  parsed.reviews[0]?.authorPhotoUri,
  "https://lh3.googleusercontent.com/a/example=s128",
);
assert.equal(
  parsed.reviews[0]?.googleMapsUri,
  "https://www.google.com/maps/reviews/data=!example",
);
assert.match(
  parsed.reviews[0]?.flagContentUri ?? "",
  /^https:\/\/www\.google\.com\//,
);
assert.equal(parsed.reviews[1]?.text, "  Second review stays intact.  ");
assert.equal(parsed.reviews[1]?.authorUri, undefined);
assert.equal(parsed.reviews[1]?.authorPhotoUri, undefined);
assert.equal(parsed.reviews[1]?.googleMapsUri, undefined);
assert.equal(parsed.reviews[2]?.authorName, "bianca korva");
assert.equal(
  parsed.reviews.some((review) => review.authorName === "Extra Person"),
  false,
);

assert.equal(parseGooglePlaceDetails({ rating: 4.7 }).status, "unavailable");
assert.equal(
  parseGooglePlaceDetails({ rating: 0, userRatingCount: 82 }).status,
  "unavailable",
);
assert.equal(
  httpsGoogleUrl("https://maps.google.com/maps?cid=1")?.includes(
    "maps.google.com",
  ),
  true,
);
assert.equal(httpsGoogleUrl("https://user:pass@www.google.com/maps"), undefined);

assert.equal(shouldUsePlacesFallback(), true);

resetPlaceRatingSlots();
for (let i = 0; i < 12; i += 1) {
  assert.equal(takePlaceRatingSlot("203.0.113.10", 1_700_000_000_000), true);
}
assert.equal(takePlaceRatingSlot("203.0.113.10", 1_700_000_000_000), false);
assert.equal(takePlaceRatingSlot("203.0.113.11", 1_700_000_000_000), true);
assert.equal(
  isSameOriginPlaceRatingRequest(new Headers({ "sec-fetch-site": "same-origin" })),
  true,
);
assert.equal(
  isSameOriginPlaceRatingRequest(new Headers({ "sec-fetch-site": "cross-site" })),
  false,
);
assert.equal(isSameOriginPlaceRatingRequest(new Headers()), false);

console.log("google place review parser: ok");

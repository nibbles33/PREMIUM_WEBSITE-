import type { MetadataRoute } from "next";
import { getOpenJobs } from "@/data/jobs";

const BASE_URL = "https://premiumib.com";

const staticRoutes = [
  "/",
  "/about/",
  "/auto-insurance/",
  "/home-insurance/",
  "/condo-insurance/",
  "/tenant-insurance/",
  "/landlord-insurance/",
  "/cottage-insurance/",
  "/motorcycle-insurance/",
  "/boat-insurance/",
  "/travel-insurance/",
  "/farm-insurance/",
  "/bonding-insurance/",
  "/commercial-insurance/",
  "/commercial-auto-insurance/",
  "/trucking-insurance/",
  "/contractors-insurance/",
  "/manufacturing-insurance/",
  "/commercial-property-insurance/",
  "/restaurant-insurance/",
  "/professional-offices-insurance/",
  "/real-estate-insurance/",
  "/builders-developers-insurance/",
  "/retail-insurance/",
  "/food-truck-insurance/",
  "/dump-truck-insurance/",
  "/get-a-quote/",
  "/talk-to-a-broker/",
  "/contact/",
  "/team/",
  "/partners/",
  "/payment/",
  "/compliance/",
  "/privacy-policy/",
  "/claims/",
  "/careers/",
  "/careers/general-application/",
  "/resources/",
  "/newsletter/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  for (const job of getOpenJobs()) {
    entries.push({
      url: `${BASE_URL}/careers/${job.slug}/`,
      lastModified: new Date(job.datePosted),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}

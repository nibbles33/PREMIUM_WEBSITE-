import type { MetadataRoute } from "next";
import { getOpenJobs } from "@/data/jobs";
import { getAllProductPageSlugs } from "@/data/product-pages";

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
  "/mobile-home-insurance/",
  "/personal-umbrella-insurance/",
  "/home-sharing-insurance/",
  "/life-insurance/",
  "/group-home-auto-insurance/",
  "/farm-insurance/",
  "/greenhouse-agribusiness-insurance/",
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
  "/small-business-insurance/",
  "/landscaping-snow-removal-insurance/",
  "/cyber-insurance/",
  "/directors-officers-insurance/",
  "/business-interruption-insurance/",
  "/professional-liability-insurance/",
  "/cargo-freight-insurance/",
  "/garage-dealership-insurance/",
  "/builders-risk-insurance/",
  "/warehousing-insurance/",
  "/property-management-insurance/",
  "/condominium-corporation-insurance/",
  "/pollution-liability-insurance/",
  "/product-recall-insurance/",
  "/hotel-motel-insurance/",
  "/convenience-store-insurance/",
  "/grocery-specialty-food-insurance/",
  "/medical-dental-insurance/",
  "/pharmacy-insurance/",
  "/fitness-gym-insurance/",
  "/salon-barber-insurance/",
  "/non-profit-insurance/",
  "/religious-organizations-insurance/",
  "/daycare-private-school-insurance/",
  "/event-liability-insurance/",
  "/liquor-liability-insurance/",
  "/crime-fidelity-insurance/",
  "/employment-practices-liability-insurance/",
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
  const allRoutes = [
    ...new Set([
      ...staticRoutes,
      ...getAllProductPageSlugs().map((slug) => `/${slug}/`),
    ]),
  ];

  const entries: MetadataRoute.Sitemap = allRoutes.map((path) => ({
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

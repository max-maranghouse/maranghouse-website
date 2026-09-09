import type { MetadataRoute } from "next";
import { ORGANISATION, SITE_NAVIGATION } from "@/lib/site-data";

// Legal pages aren't part of primary navigation (SITE_NAVIGATION), so they're
// listed separately here, at a lower priority than the five core pages.
const LEGAL_ROUTES = ["/privacy-policy", "/terms-and-conditions", "/cookie-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = SITE_NAVIGATION.map((item) => (item.href === "/" ? "" : item.href));

  const core = coreRoutes.map((route) => ({
    url: `${ORGANISATION.websiteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const legal = LEGAL_ROUTES.map((route) => ({
    url: `${ORGANISATION.websiteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...core, ...legal];
}

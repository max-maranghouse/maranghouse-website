import type { MetadataRoute } from "next";
import { ORGANISATION, SITE_NAVIGATION } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = SITE_NAVIGATION.map((item) => (item.href === "/" ? "" : item.href));

  return routes.map((route) => ({
    url: `${ORGANISATION.websiteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

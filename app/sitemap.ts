import type { MetadataRoute } from "next";
import { SITE } from "@/lib/nav-items";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/lightkeepers", "/donate", "/press", "/contact"];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

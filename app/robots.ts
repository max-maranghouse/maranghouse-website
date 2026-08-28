import type { MetadataRoute } from "next";
import { ORGANISATION } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORGANISATION.websiteUrl}/sitemap.xml`,
  };
}

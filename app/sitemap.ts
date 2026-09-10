import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { ORGANISATION, SITE_NAVIGATION } from "@/lib/site-data";

// Legal pages aren't part of primary navigation (SITE_NAVIGATION), so they're
// listed separately here, at a lower priority than the five core pages.
const LEGAL_ROUTES = ["/privacy-policy", "/terms-and-conditions", "/cookie-policy"] as const;

// Each route's actual source file, so `lastModified` reflects when that
// route's content genuinely last changed (per Git history) instead of the
// build timestamp. A fresh timestamp on every build/request is untruthful —
// it tells crawlers every page changed today regardless of real edits.
const ROUTE_SOURCE_FILES: Record<string, string> = {
  "": "app/page.tsx",
  "/about": "app/about/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/donate": "app/donate/page.tsx",
  "/lightkeepers": "app/lightkeepers/page.tsx",
  "/privacy-policy": "app/privacy-policy/page.tsx",
  "/terms-and-conditions": "app/terms-and-conditions/page.tsx",
  "/cookie-policy": "app/cookie-policy/page.tsx",
};

/** Last commit date touching the route's page file, falling back to now only if Git history is unavailable (e.g. a shallow-cloned CI checkout). */
function lastModifiedFor(route: string): Date {
  const file = ROUTE_SOURCE_FILES[route];
  if (file) {
    try {
      const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
        encoding: "utf8",
      }).trim();
      if (iso) return new Date(iso);
    } catch {
      // Fall through to the "now" fallback below.
    }
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = SITE_NAVIGATION.map((item) => (item.href === "/" ? "" : item.href));

  const core = coreRoutes.map((route) => ({
    url: `${ORGANISATION.websiteUrl}${route}`,
    lastModified: lastModifiedFor(route),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const legal = LEGAL_ROUTES.map((route) => ({
    url: `${ORGANISATION.websiteUrl}${route}`,
    lastModified: lastModifiedFor(route),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...core, ...legal];
}

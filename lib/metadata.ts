import type { Metadata } from "next";
import { ORGANISATION } from "@/lib/site-data";

// Shared social-share image for routes that don't need a bespoke one — kept
// as a single constant so every page's Open Graph/Twitter card resolves to
// the same, already-verified Cloudinary asset instead of duplicating the URL.
const DEFAULT_SHARE_IMAGE =
  "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto:best/v1784193102/maranghouse/SmacPix_Marang2.jpg";

/**
 * Builds the per-route metadata every indexable page needs: a self-canonical
 * URL (so Google never treats `/page` and `/page/` — or a future query-string
 * variant — as duplicate content) plus route-specific Open Graph/Twitter tags
 * (so a share of `/donate` shows the Donate title/description, not the
 * homepage's). `path` is the route's pathname, e.g. `/about` or `/` for home.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? ORGANISATION.websiteUrl : `${ORGANISATION.websiteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: ORGANISATION.name,
      images: [image],
      locale: "en_ZA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

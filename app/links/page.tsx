import type { Metadata } from "next";
import LinksPage from "@/components/links/LinksPage";
import { LINKS_PAGE } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: LINKS_PAGE.title,
    description: LINKS_PAGE.tagline,
    path: "/links",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <LinksPage />;
}

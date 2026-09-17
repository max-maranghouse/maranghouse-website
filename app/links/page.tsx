import type { Metadata } from "next";
import LinksPage from "@/components/links/LinksPage";
import { LINKS_PAGE } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: LINKS_PAGE.title,
    description: "Ways to support Marang House: donate or follow us on social media.",
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

import type { Metadata } from "next";
import { fredoka, nunito, permanentMarker } from "@/lib/fonts";
import { SITE } from "@/lib/nav-items";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Marang House is a Johannesburg non-profit providing a safe, nurturing home for children living with chronic illnesses since 1998.",
  icons: {
    icon: "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/v1784193083/maranghouse/marang_house_logo_sm.png",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "A safe, nurturing home for children living with chronic illnesses. Johannesburg, South Africa, since 1998.",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/v1784193102/maranghouse/SmacPix_Marang2.jpg",
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "A safe, nurturing home for children living with chronic illnesses. Johannesburg, South Africa, since 1998.",
    images: [
      "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/v1784193102/maranghouse/SmacPix_Marang2.jpg",
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  description:
    "A Johannesburg non-profit providing a safe, nurturing home for children living with chronic illnesses since 1998.",
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 Milner Ave, Franklin Roosevelt Park",
    addressLocality: "Johannesburg",
    postalCode: "2195",
    addressCountry: "ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${permanentMarker.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { fredoka, nunito, permanentMarker } from "@/lib/fonts";
import { ORGANISATION } from "@/lib/site-data";
import SiteShell from "@/components/SiteShell";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(ORGANISATION.websiteUrl),
  title: {
    default: `${ORGANISATION.name}. ${ORGANISATION.tagline}`,
    template: `%s | ${ORGANISATION.name}`,
  },
  description:
    "Marang House is a Johannesburg non-profit providing a safe, nurturing home for children living with chronic illnesses since 1998.",
  icons: {
    icon: "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto:best/v1784193083/maranghouse/marang_house_logo_sm.png",
  },
  openGraph: {
    title: `${ORGANISATION.name}. ${ORGANISATION.tagline}`,
    description:
      "A safe, nurturing home for children living with chronic illnesses. Johannesburg, South Africa, since 1998.",
    url: ORGANISATION.websiteUrl,
    siteName: ORGANISATION.name,
    images: [
      "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto:best/v1784193102/maranghouse/SmacPix_Marang2.jpg",
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORGANISATION.name}. ${ORGANISATION.tagline}`,
    description:
      "A safe, nurturing home for children living with chronic illnesses. Johannesburg, South Africa, since 1998.",
    images: [
      "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto:best/v1784193102/maranghouse/SmacPix_Marang2.jpg",
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORGANISATION.name,
  description:
    "A Johannesburg non-profit providing a safe, nurturing home for children living with chronic illnesses since 1998.",
  url: ORGANISATION.websiteUrl,
  foundingDate: String(ORGANISATION.foundedYear),
  telephone: ORGANISATION.phone.international,
  email: ORGANISATION.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ORGANISATION.address.street}, ${ORGANISATION.address.suburb}`,
    addressLocality: ORGANISATION.address.city,
    postalCode: ORGANISATION.address.postalCode,
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
        <SiteShell>{children}</SiteShell>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        ) : null}
      </body>
    </html>
  );
}

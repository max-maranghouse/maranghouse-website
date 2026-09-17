export type SiteNavigationItem = {
  href: `/${string}` | "/";
  label: string;
};

export const SITE_NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/lightkeepers", label: "Lightkeepers" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly SiteNavigationItem[];

export const ORGANISATION = {
  name: "Marang House",
  tagline: "Fostering Health, Providing Hope.",
  foundedYear: 1998,
  agesServed: "7–14",
  phone: {
    display: "011 476 6698",
    international: "+27 11 476 6698",
    href: "tel:+27114766698",
  },
  email: "info@maranghouse.org",
  whatsappUrl: "https://wa.me/27114766698",
  websiteUrl: "https://www.maranghouse.org",
  previewUrl: "https://marang-house-website.vercel.app",
  address: {
    street: "22 Milner Ave",
    suburb: "Franklin Roosevelt Park",
    city: "Johannesburg",
    postalCode: "2195",
    country: "South Africa",
    formatted: "22 Milner Ave, Franklin Roosevelt Park, Johannesburg, 2195",
  },
  registrations: {
    npc: "1998/009809/08",
    npo: "006 182",
    pbo: "930 003 724",
  },
} as const;

export const DONATION = {
  primary: {
    label: "Become a Lightkeeper",
    provider: "BackaBuddy",
    url: "https://www.backabuddy.co.za/campaign/marang-circle-of-light",
    programmeName: "Lightkeepers",
  },
  eft: {
    bank: "Nedbank",
    branch: "Business Northrand",
    branchCode: "146-905",
    accountName: "Marang House",
    accountNumber: "1469095769",
    accountType: "Cheque",
    swiftCode: "NEDSZAJJ",
    referenceInstruction: "Use your name and surname as the payment reference.",
    proofOfPaymentEmail: ORGANISATION.email,
  },
} as const;

export type LinksPageItemId = "backabuddy" | "donate" | "instagram" | "facebook";

export type LinksPageItem = {
  id: LinksPageItemId;
  label: string;
  href: string;
  external: boolean;
};

// Dedicated content model for the QR-first `/links` landing page (MH-017).
// Kept separate from SITE_NAVIGATION/DONATION so this fundraiser-QR
// destination stays a one-place edit and never leaks into primary nav. `id`
// maps each item to its icon in components/links/icons.tsx.
export const LINKS_PAGE = {
  canonicalUrl: `${ORGANISATION.websiteUrl}/links`,
  title: `Support ${ORGANISATION.name}`,
  items: [
    {
      id: "backabuddy",
      label: "Donate via BackaBuddy",
      href: DONATION.primary.url,
      external: true,
    },
    {
      id: "donate",
      label: "More ways to donate",
      href: "/donate",
      external: false,
    },
    {
      id: "instagram",
      label: "Follow Marang House on Instagram",
      href: "https://www.instagram.com/marang_house/",
      external: true,
    },
    {
      id: "facebook",
      label: "Follow Marang House on Facebook",
      href: "https://www.facebook.com/maranghouse/",
      external: true,
    },
  ],
} as const satisfies { canonicalUrl: string; title: string; items: readonly LinksPageItem[] };

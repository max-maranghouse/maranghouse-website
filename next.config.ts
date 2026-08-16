import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static (non-nonce) CSP: this site is fully statically generated (no auth,
// no user data), and the ported design relies on inline `style="background-image:…"`
// throughout, which needs style-src 'unsafe-inline' regardless. A nonce-based
// CSP would force every page into dynamic rendering (killing static generation
// and CDN caching) for a brochure/donation site that doesn't need it — see
// https://nextjs.org/docs/app/guides/content-security-policy#without-nonces.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://res.cloudinary.com data:;
  font-src 'self';
  connect-src 'self' https://formspree.io;
  frame-src https://www.google.com https://maps.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/m4hqddxx/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

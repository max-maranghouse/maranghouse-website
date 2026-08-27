# Site Security Audit — Marang House Website

**Date:** 2026-08-28
**Scope:** Source and full Git history for `maranghouse-website` on `rebuild/marang-v3`; a local production build served from `http://127.0.0.1:3210`; and public response/header checks for `http://maranghouse.org`, `https://maranghouse.org`, and `https://www.maranghouse.org`. The public domain currently serves the separate `marang-house-landing` stopgap, not this candidate build.

## VERDICT: FAIL (1 blocker)

## Blockers

1. **No privacy notice or data-use acknowledgement accompanies the contact form.** The candidate asks for name, email, optional phone number, and a free-text message, then transmits those fields to Formspree, but the repo has no privacy/POPIA page and the form contains no link or acknowledgement explaining the processing, retention, recipient, or user rights (`components/ContactForm.tsx:60-98`). This is a launch blocker for a South African organisation collecting personal information through a third-party processor. Add an organisation-approved privacy notice, identify Formspree as a processor/service recipient as appropriate, state purpose/retention/contact-rights information, and link it adjacent to the submit control before launch. This is a privacy finding rather than a forced OWASP mapping.

## Major

1. **OWASP A03 Software Supply Chain Failures — three high-severity transitive dependency advisories are present.** `npm audit` reported:
   - `brace-expansion` denial-of-service advisories [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) and [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895), affecting copies under ESLint/TypeScript tooling;
   - `js-yaml` quadratic CPU-consumption advisory [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj), under ESLint tooling; and
   - `nanoid` infinite-loop advisory [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8), in the PostCSS/build chain.

   `npm audit` also reported two moderate items: `postcss` [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) and the resulting advisory against direct dependency Next.js 16.2.11. No Critical advisory was reported. These packages are primarily build/development dependencies and the deployed site is statically generated, which lowers direct public exploitability, but fixes are available. Update the lockfile/dependency tree and Next.js (the audit proposed 16.3.3), then rerun the build, tests, and `npm audit` before release.

## Minor

1. **OWASP A02 Security Misconfiguration — the candidate CSP permits inline scripts.** The delivered policy includes `script-src 'self' 'unsafe-inline'` (`next.config.ts:13`). The rest of the allowlist is narrow and no unsafe user-to-HTML flow was found, so this is not a current exploit by itself; however, `'unsafe-inline'` reduces how much the CSP contains a future HTML-injection defect. Keep this as a documented framework trade-off or evaluate a nonce/hash-compatible deployment strategy during a future hardening pass.

2. **The reports directory is not gitignored.** `.gitignore` contains no `reports/` rule, so audit artifacts will appear as untracked files and may be committed accidentally. This is operational hygiene rather than a website vulnerability; decide deliberately whether reports belong in version control.

## What passed

- **Credentials and history:** Pattern scans of the working tree and all reachable Git history found no GitHub PAT, OpenAI-style key, Google API key, AWS access key, or literal application secret. The Git remote is a credential-free HTTPS URL. Local `.env` contains Cloudinary configuration and credentials, is ignored by `.gitignore`, has never been committed, and its API key/secret values were not present in the production `.next` output. Only the public Cloudinary cloud name appeared in the bundle. No rotation is indicated by the evidence found.
- **Known public identifiers:** Formspree form ID `xjgnonlz`, the Cloudinary cloud name, and public delivery URLs were treated as public identifiers per project documentation, not secrets.
- **Transport and headers — current public landing:** HTTP redirects to HTTPS with 308. Apex and `www` return HTTPS 200. The live landing response supplies CSP, HSTS (`max-age=63072000; includeSubDomains; preload`), `nosniff`, strict referrer policy, clickjacking protection, and a restrictive Permissions Policy. `/.git/config` and `/.env` both return 404.
- **Transport and headers — candidate build:** A successful production build returned CSP, HSTS, `nosniff`, `DENY`/`frame-ancestors 'none'`, strict referrer policy, and Permissions Policy on both normal and 404 responses. Candidate `/.git/config` and `/.env` returned 404. Source asset URLs are HTTPS; no mixed-content URL was found in deployable source.
- **Third-party script supply chain:** No CDN script tag, `@latest` script, analytics pixel, tag manager, or embedded executable third-party script was found. Runtime third-party access is limited to Cloudinary images, the Google Maps frame, BackaBuddy/WhatsApp navigation, and Formspree form submission.
- **Consent and analytics:** The candidate installs no GA4, PostHog, tracking pixel, cookie, or local-storage analytics. Consequently there is no analytics request firing before consent and no false withdrawal-of-consent promise to contradict. Classic OWASP categories such as access control, injection, authentication, and deserialization were out of scope for this static site with no app server, database, or user accounts.
- **Form handling:** Required fields use native `required` semantics, a honeypot is present, Formspree is explicitly allowed by CSP, and no secret is needed client-side.

## Real submissions made during this audit

None. Source inspection established the Formspree target and submission path; a real enquiry was unnecessary for the security findings, and no analytics/conversion system exists to verify.

## Coverage gap

- The public domain is the separate emergency landing project, so its clean live headers do not prove how Vercel will serve this branch after the custom domain is moved. Candidate headers were verified against a local production server; repeat the header and sensitive-path checks against the exact Vercel branch preview and again after the domain cutover.
- No authenticated Formspree dashboard, Vercel project settings, Cloudinary console, GoDaddy DNS/account, or email configuration was inspected. The historical GoDaddy compromise, undecommissioned WordPress hosting, weak SPF (`?all`), and monitor-only DMARC (`p=none`) remain documented external-state risks in `MARANG-HOUSE-SITE-CONTEXT.md` §11, but could not be revalidated from this repo audit.
- No real form submission was made, so Formspree inbox retention, notification routing, processor settings, and abuse controls were not inspected.

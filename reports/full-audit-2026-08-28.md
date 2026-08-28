# Full Site Audit — Marang House Website

**Date:** 2026-08-28
**Reports:** `site-security-2026-08-28.md`, `site-health-2026-08-28.md`, `content-audit-2026-08-28.md`

## OVERALL VERDICT: FAIL (6 blockers across all three)

## All blockers, ranked

1. **Privacy — the contact form collects and sends personal information to Formspree without a privacy notice or adjacent data-use acknowledgement.** Add an organisation-approved POPIA/privacy notice covering purpose, processor/recipient, retention, rights, and contact details, then link it at the form before launch. Source: Security audit.

2. **Fundraising/legal copy — the Section 18A tax-deductibility statement is not backed by an approval letter/reference or documented compliant-receipt process in the repo.** A PBO number alone does not establish Section 18A approval. Confirm the organisation's current SARS approval and operating process; remove the claim until confirmed, then rewrite it precisely. This wording is also present on the separate public landing page, so the live stopgap needs the same decision. Source: Content audit.

3. **Donation-platform promise — the homepage offers a limited-edition keyring beside the BackaBuddy CTA without eligibility, inventory, fulfilment terms, or evidence that BackaBuddy permits the arrangement.** BackaBuddy's published terms prohibit rewards for donations. Remove the offer from this journey or obtain explicit platform/organisation approval and publish complete terms. Source: Content audit.

4. **Misleading product label — “SPONSOR A CHILD TODAY” leads only to the general Lightkeepers recurring-donation journey.** No child-sponsorship product, allocation model, safeguarding explanation, amount, or terms exist. Rename the CTA to “Become a Lightkeeper”/“Give Monthly” unless a real programme is approved and defined. Source: Content audit.

5. **Unverified impact/social-proof counts — “300+ Children,” “1000+ Volunteers,” “hundreds of children,” and “A Thousand Lightkeepers” are published without primary evidence.** The first two are explicitly unresolved in `AGENTS.md`; the Lightkeeper count is also unsupported and reads as current fact. Remove or label the claims as aspirations until Marang House supplies dated records. Source: Content audit.

6. **Unverified attributed speech — the new “In Her Own Words” biography and direct quotations attributed to Salome have no transcript or written approval in the project record.** Obtain and archive approval/source material, or replace the quotations with verified paraphrase. Source: Content audit.

## Summary by category

- **Security: FAIL (1 blocker).** No credential exposure or weak live transport/header posture was found, but privacy disclosure is missing; npm also reports three High and two Moderate dependency advisories.
- **Health: FAIL (0 blockers; major findings).** All routes and tested interactions work without uncaught errors, but mobile Lighthouse Performance is 41–89, canonical/Open Graph consistency is incomplete, and Contact/Donate miss the accessibility target.
- **Content: FAIL (5 blockers).** Core contact/bank/registration facts and brand foundations are consistent, but fundraising promises, unverified counts/quotes, and product wording are not ready to publish.

## Recommended fix order

1. **Remove or neutralise the risky public claims first:** Section 18A, keyring reward, sponsor-a-child CTA, unsupported counts, “A Thousand Lightkeepers,” and unapproved quotations. Make the equivalent Section 18A change on the current emergency landing page if approval cannot be produced immediately.
2. **Run one short organisational verification pass:** obtain the Section 18A letter/reference and receipt process; approved beneficiary/volunteer/Lightkeeper totals with as-of dates; Salome's transcript/sign-off; keyring/platform decision; and supporter-roster permission/current-status confirmation.
3. **Add the privacy layer:** publish the POPIA/privacy notice, identify Formspree appropriately, link it next to Submit, and document retention/deletion ownership.
4. **Clear dependency risk:** update the lockfile/dependency tree and Next.js to patched versions, then rerun `npm audit`, lint, and the production build.
5. **Fix the highest-cost health issues:** optimise the Contact hero and defer/replace the map, create smaller responsive/animated assets, correct image `sizes`, and reduce the font payload. Re-run mobile Lighthouse until every route reaches the agreed target or has an accepted exception.
6. **Finish SEO/accessibility:** add route-specific canonicals and Open Graph data; choose one primary domain and redirect the other during the Vercel cutover; label/remove the honeypot from the accessibility tree; repair Donate's heading order; and visually identify required fields.
7. **Repeat the release checks on the actual Vercel branch preview, then after domain migration:** headers, sensitive paths, sitemap, host redirect/canonical behavior, all routes, console, form error/success behavior, and PageSpeed/field monitoring. Do not treat a merge as the domain launch—the custom domain still belongs to `marang-house-landing` until moved manually.

## Real submissions made during this audit

None. The Formspree target, honeypot success path, and blocked-network error path were verified without sending user data. No analytics/conversion system is installed.

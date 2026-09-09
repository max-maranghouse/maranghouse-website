# MH-012: Legal pages, POPIA notice, and consent-gated analytics

Status: ready-for-check — analytics activation deferred by site owner
Base: `52348bb2a3808fac7ffeb0c253d5246d5e3f28ef` (`origin/main`)

## Outcome

Visitors can access on-brand, accessible Privacy & POPIA, Terms & Conditions,
and Cookie Notice pages from every page. A working cookie-preferences mechanism
blocks non-essential analytics until consent, lets a visitor revise that choice,
and accurately describes the site's data flows, including Brevo's EU processing
of newsletter interest. GA4 and PostHog activation is intentionally deferred
until the site owner supplies their public configuration values.

## Evidence and constraints

- Current public routes are Home, About, Lightkeepers, Donate, and Contact.
  `app/sitemap.ts` derives entries only from `SITE_NAVIGATION` in
  `lib/site-data.ts`; `components/SiteFooter.tsx` has no legal links.
- `app/layout.tsx` supplies the shared shell, global metadata, skip link, and
  main landmark. Legal routes must be static, have route metadata, and use that
  shell.
- The browser implementation of Contact and newsletter-interest forms posts to
  Formspree form `xjgnonlz`. The site owner confirms newsletter-interest data
  is also processed in Brevo, hosted in the EU; public policy must disclose the
  cross-border transfer. Confirm the processor chain with the account owner
  before release so Formspree's role is described correctly rather than omitted.
- Confirmed providers: Cloudinary (images), Formspree (forms), Brevo (email
  marketing/newsletter interest), Google Maps (Contact embed), BackaBuddy
  (external donation page), Google Search Console (indexing only, no visitor
  cookies), GA4 (analytics), and PostHog (analytics, session replay/heatmaps).
- GA4 and PostHog are approved future non-essential analytics. If/when enabled,
  neither may load scripts, initialise, or make network requests before
  Analytics consent. PostHog must be initialised with input masking enabled
  (`maskAllInputs: true` or its current equivalent) before any recording starts.
- The current application has no analytics code, no client storage/cookie use,
  no analytics identifiers, and a restrictive CSP in `next.config.ts` that
  permits only self scripts/formspree connections. The site owner will provide
  GA4/PostHog configuration later. Do not add placeholder IDs, tracker scripts,
  or analytics CSP hosts now; the later integration needs public GA4 measurement
  ID, PostHog project key plus regional API/UI hosts, and narrow CSP additions.
- `lib/site-data.ts` remains the canonical source for organisation facts. Use
  it for public contact details and do not add personal contact data.
- `app/globals.css` is the sole style system. Follow its Fredoka/Nunito,
  blue/yellow/orange/cream, responsive, skip-link, and focus-visible patterns.
  Contact/Donate reflect the finished visual language; do not revive unused
  legacy legal styles.
- The site stays fully static. No new runtime data fetching, dependencies,
  primary-navigation changes, domain/deployment action, commits, or pushes.

## Scope

### In

- Static `/privacy-policy`, `/terms-and-conditions`, and `/cookie-policy`
  routes with unique metadata and semantic, high-legibility, on-brand documents.
- Plain-language terms/privacy/cookie wording that only states confirmed facts:
  information categories and purposes; consent; Formspree and Brevo processing;
  GA4/PostHog analytics; Cloudinary; Google Maps; BackaBuddy; external links;
  security; rights/contact; notice updates; lawful basis; jurisdiction; and
  the effective date at publication.
- Privacy content that separately covers Contact, newsletter interest and
  consent-gated analytics; discloses Brevo's EU cross-border processing;
  directs requests to `info@maranghouse.org`; identifies Marang House NPC as
  responsible party; explains requests are sent there pending a PAIA manual;
  and links to the Information Regulator of South Africa as the POPIA
  escalation route.
- Terms covering permitted use, intellectual property, third-party services,
  BackaBuddy's independent terms/refund/receipt process, availability and
  disclaimer, South African law, Gauteng Division High Court venue, and the
  approved registered-office notice address.
- Cookie notice explaining Necessary and Analytics categories, GA4/PostHog
  consent gating, possible third-party storage by the Maps embed and external
  BackaBuddy link, and the distinction between Marang House's controls and
  each third party's own policy.
- A consent banner that defaults to Necessary only, offers Necessary (always
  on) and Analytics (GA4 + PostHog together) choices, persists a timestamped
  decision in localStorage, re-prompts after 12 months, and applies revised
  choice immediately without reload. Add a persistent footer “Cookie
  preferences” control that reopens it.
- A reusable consent-state interface that remains analytics-provider agnostic
  until public GA4/PostHog configuration is supplied. It may persist the
  visitor's Necessary/Analytics choice, but must not attempt to load trackers
  or widen CSP before that separate integration. The later analytics slice must
  use it to gate loading and initialise PostHog with form/input replay masking.
- Footer legal links, sitemap inclusion at lower priority than core pages, and
  only the shared CSS/component code needed to avoid repetition.

### Out

- Legal advice, compliance certification, PAIA manual or Information Officer
  registration, granular per-vendor categories, analytics/advertising providers
  beyond GA4/PostHog, retention system, downloads, translations, accounts, or
  changes to donation/form data collection.
- Broad CSP weakening or wildcards; unverified privacy claims; new dependencies;
  organisation-data changes; primary navigation changes; deployment, DNS,
  commits, pushes, or production infrastructure changes.

## Dependencies and ordered implementation

The lead owns all shared files (`app/layout.tsx`, `components/SiteFooter.tsx`,
`app/sitemap.ts`, `app/globals.css`, `next.config.ts`) and integration. This
must run sequentially because consent, the footer, and CSP are shared.

1. **Implement consent state without trackers.** Create a client component
   that is accessible by keyboard, supports accept/reject/save choices, stores
   a versioned timestamped decision, expires it at 12 months, and exposes an
   event/API so the footer preference control reopens it. Do not include GA4 or
   PostHog scripts/configuration yet. Done when choice persistence, expiry, and
   immediate revision work without an analytics request.
2. **Build the legal documents.** Add a small shared presentation component if
   it avoids material duplication plus the three static route pages. Use
   `article`, exactly one h1, sequential h2s, semantic lists/addresses, clear
   links, per-route metadata, and `ORGANISATION` facts. Use the confirmed
   content decisions below; do not invent a PAIA manual or named officer.
3. **Style pages and consent UI.** Add focused global CSS for a readable Marang
   legal-document intro, content surface, section cues, contact callout, and
   unobtrusive responsive banner. Use existing tokens and reduced-motion/focus
   baselines. Done when it feels native, does not cover the h1, and has no
   layout overflow from 320px to desktop.
4. **Add discoverability and verify.** Add labelled footer legal links plus a
   Cookie Preferences button, preserve primary navigation, and add exactly the
   three routes to sitemap. Run all checks and final manual review; record
   later analytics handoff requirements, test evidence, and approved copy in
   Handoff.

## Confirmed content decisions

- Privacy contact: `info@maranghouse.org`.
- Responsible party: Marang House NPC. No individual Information Officer is
  named until board appointment.
- Retention: enquiry/newsletter data is kept only as long as needed to respond
  and deleted on request; do not manufacture a fixed retention period.
- Lawful basis: consent for Contact, newsletter interest, and analytics.
- PAIA: no manual currently exists; access requests go to the privacy contact.
- POPIA escalation: Information Regulator of South Africa
  (`https://inforegulator.org.za`).
- Governing law: South Africa. Dispute venue: Gauteng Division of the High
  Court of South Africa.
- Registered-office notice address: 1 Ennis Road, Parkview, Johannesburg,
  Gauteng, 1684. NPO registration: 006-182.
- BackaBuddy runs its own refund/receipt process under its own terms.
- Google Search Console is not visitor-facing and is not part of consent.
- GA4/PostHog are Analytics; PostHog recording/heatmaps use masked inputs.
- Banner consent is valid for 12 months. Effective date is the actual publish
  date. Max approves copy pending board-level final review.

## Acceptance criteria

- All three routes are static/indexable and have unique metadata, one h1,
  sequential headings, and semantic article content.
- The privacy notice accurately covers Formspree, Brevo EU transfer, Cloudinary,
  Google Maps, GA4, PostHog, BackaBuddy, privacy rights/contact and the approved
  POPIA/PAIA path; it claims no unapproved compliance, retention, or processor
  detail.
- Terms accurately state BackaBuddy/external-service independence and approved
  jurisdiction/venue/notice details without an unapproved medical, legal, or
  funding promise. Cookie notice accurately distinguishes site control from
  third-party storage.
- No GA4 or PostHog script, initialisation, request, placeholder identifier, or
  analytics CSP host is present in this change. The consent-state interface is
  provider-agnostic and has a recorded later-integration requirement: gate both
  providers and initialise PostHog with input masking.
- Consent is keyboard accessible, focus-visible, not colour-only, does not
  obstruct primary content, persists across pages, expires/re-prompts after 12
  months, and can be revised from the footer without reload.
- Footer has labelled links to all three policies and Cookie Preferences;
  primary navigation is unchanged. Sitemap lists five core plus three legal
  URLs exactly once.
- At 320px, 390px, 768px and 1440px, all new pages/banner show no horizontal
  overflow, overlap, cut-off content, console errors, or failed first-party
  requests, and visually align with the existing site.
- `npm run lint`, `npm run build`, and `git diff --check` pass. No unscoped
  dependencies, form changes, broad CSP changes, deployment, or infrastructure
  changes are included.

## Verification

Run `npm run lint`, `npm run build`, and `git diff --check`. Start the
production build and use browser automation at 320×844, 390×844, 768×1024,
and 1440×900 across each legal page and an existing footer. Check heading
order, keyboard operation, focus, navigation, `scrollWidth === clientWidth`,
console/network errors, and all eight URLs in `/sitemap.xml`.

Use a clean browser profile and network evidence to prove no analytics request
exists in this deferred-integration release. Verify reject, accept, revision
without reload, persistence, and time-expiry handling. The later analytics
integration must additionally prove pre-consent blocking, post-consent loading,
and PostHog replay/input masking with form test values.

## Manual checkpoint

Final only: an authorised Marang House representative reviews the Brevo
cross-border disclosure, consent/retention and POPIA/PAIA wording,
terms/dispute language, effective date, category labels, and the final visual
treatment before publish.

## Handoff

Architected 2026-09-09 from base `52348bb2a3808fac7ffeb0c253d5246d5e3f28ef`.
Revised the same day using the supplied approved policy decisions and again
when the site owner elected to add GA4/PostHog values later. No application
code, configuration, dependencies, commits, or deployment state changed in
architect mode. This task now delivers legal pages plus provider-agnostic
consent UI without trackers. A later analytics integration must supply public
identifiers/hosts, make narrow CSP additions, gate both providers on this
consent state, and enforce PostHog input masking.

### Implementation handoff — 2026-09-09

**New files:** `lib/legal-data.ts` (registered-office address, effective
date, Information Regulator URL), `lib/consent.ts` (versioned,
provider-agnostic consent read/write, 12-month expiry, `useSyncExternalStore`-
friendly subscription helpers, `CONSENT_UPDATED_EVENT` /
`OPEN_CONSENT_PREFERENCES_EVENT`), `components/ConsentBanner.tsx` (client,
mounted once in `app/layout.tsx`), `components/CookiePreferencesButton.tsx`
(client, used by both the footer and the Cookie Notice page),
`components/legal/LegalPage.tsx` (shared h1/intro/effective-date/article
shell), `app/privacy-policy/page.tsx`, `app/terms-and-conditions/page.tsx`,
`app/cookie-policy/page.tsx`.

**Changed shared files:** `app/layout.tsx` (mounts `ConsentBanner`),
`components/SiteFooter.tsx` (adds a labelled legal-links row plus the Cookie
Preferences control; primary nav untouched), `app/sitemap.ts` (adds the three
legal routes at `priority: 0.3`, `changeFrequency: "yearly"`, after the five
core routes — 8 URLs total, each once), `app/globals.css` (footer legal-links
styles, `.legal-page`/`.legal-article` typography, `.consent-banner` styles).
`next.config.ts` was **not** touched — no CSP/host changes, per scope.

**Consent design note:** the initial mount read is derived via
`useSyncExternalStore` (server snapshot `true` → banner closed during SSR),
not via `setState` inside a bare `useEffect`, to satisfy this repo's
`react-hooks/set-state-in-effect` lint rule and to avoid a hydration
mismatch for returning visitors. Reopen (footer button) and focus
management still use plain effects, since those set state from inside
event-listener callbacks, not synchronously in the effect body.

**Checks run:** `npm run lint` — clean. `npm run build` — clean, all 8
routes (5 core + `/privacy-policy`, `/terms-and-conditions`,
`/cookie-policy`) static. `git diff --check` — clean. Production server
(`npm run start`) verified via Playwright:
- 320×844, 390×844, 768×1024, 1440×900 on all three new pages and the
  footer: `scrollWidth === clientWidth` (no overflow) at every size, no
  console errors, single h1 + sequential h2s confirmed via accessibility
  snapshot.
- Consent flow: Accept all / Reject non-essential / Save preferences all
  write `{necessary:true, analytics, timestamp, version}` to
  `localStorage["mh-cookie-consent"]` and close the banner immediately, no
  reload. A 400-day-old stored choice correctly re-prompts (12-month
  expiry). The footer "Cookie preferences" button reopens the banner,
  moves focus into it, restores the stored Analytics checkbox state, and
  returns focus to the trigger button on save/close — full flow driven
  with keyboard only (Tab/Space/Enter), no mouse.
- Network requests: captured the full request list on page load and after
  each consent action — only same-origin requests plus one Cloudinary
  image request; no `google-analytics`, `googletagmanager`, `posthog`, or
  `gtag` request at any point, confirming no analytics is wired in yet.
- `/sitemap.xml`: exactly 8 URLs, the 3 legal routes present once each at
  the intended lower priority.

**Deviation fixed during implementation (not a scope change):** an early
build of `app/terms-and-conditions/page.tsx` had one instance of
`{ORGANISATION.name}` immediately followed by plain text ("is not
responsible…") that intermittently compiled with the space between them
dropped (confirmed via the built HTML: `Marang House<!-- -->is not
responsible`, vs. the correct `Marang House<!-- --> or are` a few lines
above with identical source shape). Root-caused to a stale/incremental
Turbopack build artifact, not a persistent JSX-whitespace bug — a full
clean rebuild (`rm -rf .next`) reproduced it correctly-spaced once, but to
close the risk out regardless of cause the line was rewritten with an
explicit `{" "}` and reverified clean across a second clean rebuild. No
other occurrence of `{ORGANISATION.name}` adjacent to inline text showed
the same fault after the clean-rebuild scan of all three pages' built
HTML.

**Confirmed not done (by design, per scope):** no GA4/PostHog script,
config, identifier, or CSP host anywhere in this change (grepped the
built output and live network log — none found). Primary navigation,
`next.config.ts`, and all other pages are unchanged outside the footer/
layout/sitemap edits listed above.

**Outstanding for the user (per the task's manual checkpoint, not
blocking `ready-for-check`):** an authorised Marang House representative
still needs to review the Brevo cross-border disclosure, consent/retention
and POPIA/PAIA wording, terms/dispute language, the effective date
(currently 9 September 2026, today's actual date), category labels, and
final visual treatment before this goes live. No code change is needed to
proceed with that review — the pages are live-navigable now via
`npm run build && npm run start`.

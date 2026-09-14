# MH-014: Temporarily withhold supporter/newsletter content and validate launch candidate

Status: ready-for-check (blocked on external Vercel/Formspree step 6)

Base: `c47ac9a568e55da28732e072c65264fa7c5e403c` (`origin/main`)

## Goal

Prepare a leaner launch candidate that does not publish unconfirmed people or
partner material, and does not advertise or collect newsletter interest. Keep
those implemented sections intact for straightforward restoration later.
Polish the Salome story into coherent paragraphs; refine the specified
mobile-only hero, illustration, and spacing details; then verify the exact
preview candidate's form delivery and security posture before any domain
cutover.

## Current evidence

- Home imports and renders `NewsletterInterestForm` and `PartnersCarousel` in
  `app/page.tsx`; its second hero action is the only visible "Subscribe to
  newsletter" CTA and points to `#newsletter-interest`.
- The people gallery is `SupportersSection` (four named people and photos) and
  is rendered only by `app/lightkeepers/page.tsx`. `PartnersCarousel` contains
  seven partner logos and is rendered on both Home and Lightkeepers. Both
  implementations were deliberately separated in MH-012 and must remain
  available in their own component files.
- `components/NewsletterInterestForm.tsx` is a working client component and
  `.newsletter-interest*` styles are self-contained. Preserve both unchanged;
  leaving them unrendered is the reversible withdrawal mechanism.
- `components/ContactForm.tsx` posts with `@formspree/core` to Formspree form
  `xjgnonlz`. Recipient configuration is not present in source, so this repo
  cannot prove that it forwards to `info@maranghouse.org`.
- `app/privacy-policy/page.tsx` and `app/terms-and-conditions/page.tsx`
  describe a live newsletter-interest form/Brevo workflow. That statement
  becomes inaccurate once the form is withdrawn.
- `app/about/page.tsx` has Salome's title, verified portrait, quotation, and
  six body paragraphs. Three body paragraphs are lone short sentences, causing
  the fragmented reading rhythm the user identified.
- `next.config.ts` contains the existing static CSP and security headers;
  `MH-013` already recorded a clean production dependency audit at base, but a
  release check must be repeated on the final candidate rather than assumed.
- Home's `@media (max-width: 760px)` already centres `.hero-content` and makes
  `.hero-heading-row` a vertical flex stack, but the logo needs an explicit
  visual/bounds check and, if needed, a scoped centring rule rather than a
  desktop layout change. `VerticalCutReveal` wraps “Fostering Health,” in
  nested spans; the broad `.hero h1 span` selector therefore makes that whole
  line yellow. “Providing” is the only plain text node and remains white,
  while the explicit `Hope.` span is yellow. This is the inconsistent result
  shown in the supplied mobile screenshot.
- On About, `.about-children` uses `padding-top: 340px` at `max-width: 900px`
  to clear the flags/cloud rail. The user reports this creates excess space on
  mobile; transparent whitespace in the art means the visual artwork, not the
  image boxes alone, must guide a smaller mobile-only value.
- Lightkeepers already uses mobile overrides for its hero art: at
  `max-width: 860px`, the long/tall clouds are 190px/82px and the decorative
  `MH-lighthouse-pin.png` accent is `clamp(84px, 28vw, 170px)`. The requested
  reduction applies to those hero decorations, not the separate Home
  `.lk-card-pin` keychain.

## Scope and constraints

### In

- Temporarily remove every public rendering/CTA for the people gallery,
  partner-logo carousel, and newsletter-interest form.
- Retain the three reusable components, their assets/data, and newsletter CSS
  unchanged for future reactivation; do not delete or rename them.
- Make legal/privacy wording truthful for a site that currently has a Contact
  form but no newsletter form or Brevo newsletter activity.
- Consolidate Salome's body narrative into a few readable paragraphs without
  inventing facts, changing the attribution/quote, or disturbing her portrait
  composition.
- On mobile only, centre the Home-hero Marang House logo, reduce the excessive
  visible gap between About's Children We Serve heading and its flags/clouds,
  and reduce the Lightkeepers hero's pin and both clouds. Preserve the desktop
  artwork layout and all text/interactive tap targets.
- Run source, build, browser-preview, Formspree, and security release checks
  against the exact launch candidate and record evidence.

### Out

- Collecting newsletter data by another means, adding a replacement hero CTA,
  new supporter/partner facts, deleting assets, changing donation flows,
  redesigning the hero outside the named mobile adjustments, changing Formspree recipients/dashboard settings,
  production deployment/domain/DNS changes, or committing/pushing.

### Product decision recorded

Removing the newsletter CTA leaves one Home-hero action (the BackaBuddy
donation link), so there is no remaining pair of hero buttons whose sizes can
be matched. Preserve that action's current styling and do not invent a second
CTA. If a future replacement action is chosen, the two `.hero-btns .btn`
elements should be given the same explicit inline size in that follow-up.

### Unresolved visual decision

The requested Home heading-colour instruction is incomplete. The screenshot
confirms that only “Providing” is white while the rest is yellow, but it does
not specify the intended final colour for “Providing Hope.”. The exact mapping
must be confirmed before its CSS/JSX is changed; do not guess or recolour it
merely to create a diff.

## Ownership, dependencies, and implementation order

The implementation lead owns `app/page.tsx`, `app/lightkeepers/page.tsx`,
`app/about/page.tsx`, legal-page accuracy, final integration, and the release
ledger. Do not parallel-edit `app/globals.css` or shared components: they are
intentionally preserved and need no implementation changes for this task.

1. **Withdraw public supporter/partner renderings while preserving the source.**
   In `app/page.tsx`, remove only the `PartnersCarousel` import/render and its
   now-stale section comment. In `app/lightkeepers/page.tsx`, remove only the
   `SupportersSection` and `PartnersCarousel` imports/renders; retain the
   surrounding Lightkeepers content and donation CTA. Do not edit
   `components/SupportersSection.tsx`, `components/PartnersCarousel.tsx`,
   their image data, or their CSS. Done when neither component renders on any
   route and both files remain ready to import again.

2. **Withdraw newsletter collection and all newsletter calls to action.**
   In `app/page.tsx`, remove the `NewsletterInterestForm` import/render and
   remove the hero anchor to `#newsletter-interest`; leave the donation action
   as the sole hero button. Do not alter `NewsletterInterestForm.tsx` or its
   CSS. Search public routes/components for case-insensitive `newsletter` and
   `subscribe` references: remove user-facing CTAs and amend the legal pages
   so they describe only actually active Contact-form processing. Retain an
   explicit restoration note in this task (below), not hidden live copy. Done
   when the active site has no newsletter form, anchor, subscribe CTA, or
   claim that Brevo/newsletter data is currently collected.

3. **Recompose Salome's narrative.**
   In `app/about/page.tsx`, leave the eyebrow, heading, supplied portrait,
   quote, decorative art, and existing substantive wording intact. Merge the
   first short reassurance into the preceding arrival paragraph; merge the
   volunteer/donor/meal/hug examples, their conclusion, and the Circle of
   Light sentence into one coherent paragraph; retain the monthly-giving
   paragraph as the close. This gives three body paragraphs, no isolated
   one-sentence blocks, and no new claimed facts. Do not change the quoted
   speech without written confirmation from Salome/the organisation. Done when
   `/about` reads as a few balanced paragraphs at desktop and mobile and its
   existing visual structure remains intact.

4. **Make the narrow mobile-only visual adjustments.**
   In `app/globals.css`, within the existing mobile breakpoints, explicitly
   centre the Home hero's `.hero-doodle` relative to the viewport/content
   column (do not move it at tablet/desktop widths). Reduce only the mobile
   top padding of `.about-children` enough to close the visibly excessive
   space between the illustrated rail and its heading while retaining a clear
   no-overlap buffer at 390px and 320px. In the Lightkeepers hero's existing
   `max-width: 860px` overrides, reduce the decorative
   `.lk-hero-pin-accent`, `.lk-hero-cloud--long`, and
   `.lk-hero-cloud--tall` dimensions proportionally; preserve their layer
   order, text clearance, and the desktop values. Do not change the Home
   `.lk-card-pin` keychain. After the heading-colour decision is supplied,
   apply it with the smallest scoped title markup/CSS change that works for
   SSR, animated, and reduced-motion variants of `VerticalCutReveal`.
   Done when the named mobile details are visually balanced at 390px and 320px
   with no overlap/cut-off, desktop is unchanged, and both title rendering
   modes use the confirmed colours.

5. **Run candidate source/build/security checks.**
   On the integrated working tree, run the dependency audit and source review
   after the content changes. Reconfirm CSP/header configuration allows only
   the still-used third parties, no credentials are committed, the Formspree
   submit boundary remains allowed by `connect-src`/`form-action`, and Contact
   retains required labels, honeypot, validation, and the adjacent privacy
   notice. Record source-backed findings with severity and repair only
   launch-blocking issues within this scope. Done when there are no unresolved
   Critical/High findings, the production dependency audit has zero
   Critical/High advisories, and all build checks pass.

6. **Validate the exact Vercel preview and Formspree delivery before launch.**
   Once an authorised preview URL exists for this exact revision, run the
   browser check below on that URL (not the current `maranghouse.org` stopgap).
   In the Formspree dashboard, verify form `xjgnonlz` is active and its email
   notification recipient is exactly `info@maranghouse.org`. Submit one
   clearly-labelled non-sensitive launch test through the preview Contact form
   and have an inbox owner confirm receipt, sender/form metadata, and reply-to
   details. Record timestamp, preview URL, and evidence outcome in Handoff;
   do not expose recipient settings or message contents in git. If dashboard
   or inbox access is unavailable, stop this release criterion as blocked
   rather than claiming delivery has been confirmed. Do not change any
   external configuration without separate explicit authorisation.

### Restoration note

To restore the exact withheld features later: re-add the retained imports and
render sites in `app/page.tsx`/`app/lightkeepers/page.tsx`, restore the hero
newsletter anchor only if the form is intentionally reactivated, and restore
the corresponding privacy/terms wording after confirming the then-current
Formspree/Brevo processing setup. No component, asset list, or newsletter
style is removed by this task.

## Observable success criteria

- Home and Lightkeepers expose no supporter names/photos, partner logos, or
  partner-section headings; the retained component files are unchanged.
- No public route contains a newsletter-interest form, `#newsletter-interest`
  link, newsletter subscription wording/CTA, or active Brevo-newsletter claim.
- Home contains exactly its existing donation action in the hero; no
  unrequested replacement CTA is introduced.
- Salome's prose after the intro is three paragraphs with no lone-sentence
  paragraph, while her quote/portrait/title and all substantive claims remain.
- At mobile 390px and 320px only, the Home logo is centred, the visible
  About Children We Serve art-to-heading gap is materially reduced without
  collision, and the Lightkeepers hero pin/long-cloud/tall-cloud are smaller
  but remain clear of the title/subtext. Desktop retains its current layout.
- The Home heading has the owner-confirmed colours in both its animated and
  reduced-motion/SSR render paths; this criterion is blocked until the colour
  for “Providing Hope.” is supplied.
- `npm audit --omit=dev --audit-level=high --json`, `npm run lint`, `npm run
  build`, and `git diff --check` pass.
- On the exact Vercel preview at 1440px, 768px, and 390px: no horizontal
  overflow, console errors, failed first-party requests, stale section gap, or
  broken in-page anchor; Home, Lightkeepers, About, Contact, Privacy, and
  Terms visually and semantically reflect the changes.
- Preview headers retain CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, and Permissions-Policy. `/.env` and `/.git/config` return
  non-public responses.
- Formspree form `xjgnonlz` is confirmed in the dashboard to notify
  `info@maranghouse.org`, and one preview test is received there. This is a
  manual external-service acceptance criterion, not something source code can
  establish.

## Required verification

```sh
git diff --check
npm audit --omit=dev --audit-level=high --json
npm run lint
npm run build
grep -RInE 'newsletter|subscribe|Newsletter|Subscribe|newsletter-interest' app components --exclude-dir=node_modules
```

After the production build, use browser automation on localhost for the
changed-route regression check, then repeat it against the exact Vercel branch
preview. Inspect the six routes named above at 1440px, 768px, and 390px;
capture console/network failures, heading order, focus-visible keyboard flow,
horizontal overflow, header values, and 404 handling for `/.env` and
`/.git/config`. Exercise Contact validation and a controlled failure path
locally; reserve the one successful submission for the authorised preview test
in step 6. For the visual check, compare the specified mobile artwork at 320px
and 390px to the 768px/desktop layout so mobile-only CSS does not leak upward.

## One final manual checkpoint

Before domain cutover, an authorised organisation owner reviews the preview,
confirms the withheld people/partner/newsletter content is absent, confirms
the received Formspree launch test at `info@maranghouse.org`, and explicitly
authorises any separate Vercel/domain action. `maranghouse.org` must remain on
the stopgap project until that decision; merging code alone never changes it.

## Risks and blockers

- Formspree recipient/delivery is an external configuration and inbox fact;
  the repository exposes only form ID `xjgnonlz`. Dashboard and inbox access
  are required for a truthful completion claim.
- A Vercel preview must correspond to the final source revision. The known
  production domain currently serves another project and is invalid evidence
  for this Next.js candidate.
- Removing newsletter-related privacy/terms statements improves truthfulness
  for launch but they must be reinstated/reviewed with the form when the
  newsletter feature returns.
- Existing open content decisions in `AGENTS.md` remain out of scope; this
  task only removes the particular unconfirmed people/partner material.
- The heading-colour request lacks a colour for “Providing Hope.”; leave that
  sub-change pending rather than guessing a brand treatment.

## Handoff

Architected 2026-09-14 from `origin/main`
`c47ac9a568e55da28732e072c65264fa7c5e403c`. No application code, component,
asset, deployment, Formspree setting, domain/DNS setting, commit, or push was
changed in architect mode. The only change is this executable task contract.

At implementation start, mark this task `in-progress`. Record exact changed
files, command outputs, the preview URL/revision, source security findings and
their disposition, and the Formspree dashboard/inbox verification outcome.
Mark `ready-for-check` only after every source criterion passes and the final
manual checkpoint is either evidenced or explicitly reported as blocked.

### Implementation record (2026-09-14)

**Heading-colour decision** (previously unresolved): owner confirmed
"Providing Hope." should be all white (only "Fostering Health," stays
yellow). Implemented in step 4.

**Changed files:**
- `app/page.tsx` — removed `NewsletterInterestForm`/`PartnersCarousel`
  imports and render sites, the `#newsletter-interest` hero anchor/CTA
  (donation link is now the sole hero action), and the now-stale
  "OUR PARTNERS" section comment. Gave `VerticalCutReveal` a
  `hero-title-yellow` className and removed the separate `<span>` around
  "Hope.", per the heading-colour decision.
- `app/lightkeepers/page.tsx` — removed `SupportersSection`/
  `PartnersCarousel` imports and render sites (and their MH-011/MH-012
  section comment); donation CTA and surrounding content untouched.
- `app/about/page.tsx` — merged Salome's six body paragraphs into three
  (arrival+reassurance; volunteer/donor/meal/hug examples+conclusion+Circle
  of Light sentence; monthly-giving close). No wording invented, quote/
  portrait/title untouched.
- `app/privacy-policy/page.tsx` / `app/terms-and-conditions/page.tsx` —
  removed every newsletter-interest/Brevo claim so the copy only describes
  the live Contact-form/Formspree flow.
- `app/globals.css` — mobile-only (existing breakpoints, not new ones):
  `.hero-heading-row` gets explicit `align-items: center` at
  `max-width: 760px` (logo was left-aligned inside an already-centred row);
  `.about-children` mobile top padding reduced 340px → 240px at
  `max-width: 900px`; `.lk-hero-cloud--long`/`--tall` reduced 190px/82px →
  155px/65px at `max-width: 860px`; `.lk-hero-graphic .lk-hero-pin-accent`
  reduced `clamp(84px,28vw,170px)` → `clamp(68px,22vw,135px)` at
  `max-width: 760px` (its actual own breakpoint). Replaced the broad
  `.hero h1 span` yellow rule with a scoped `.hero h1 .hero-title-yellow`
  rule. No component/asset files touched; `NewsletterInterestForm.tsx`,
  `PartnersCarousel.tsx`, `SupportersSection.tsx`, and `.newsletter-interest*`
  CSS are all unchanged and still importable.

**Verification run (all passed):**
- `git diff --check` — clean.
- `npm audit --omit=dev --audit-level=high --json` — 0 critical/high/moderate,
  23 prod dependencies.
- `npm run lint` — clean.
- `npm run build` — compiled successfully, all 12 routes still static.
- `grep -RInE 'newsletter|subscribe|...' app components` — only the
  preserved `NewsletterInterestForm.tsx`/`.newsletter-interest*` CSS and
  unrelated `subscribe`-named plumbing in `ConsentBanner.tsx`/
  `useMounted.ts` remain; no route imports/renders the withdrawn components
  (confirmed separately: no `NewsletterInterestForm`/`PartnersCarousel`/
  `SupportersSection` references anywhere under `app/`).
- Source security pass: `next.config.ts` CSP/headers already only allow
  `res.cloudinary.com` and `formspree.io` — no Brevo entry existed to
  remove, so no header change was needed. `ContactForm.tsx` still has
  labels (via `sr-only`), the honeypot, native validation, and the
  adjacent Privacy & POPIA Notice link. No credentials in the diff
  (`git diff` scanned for key/secret/token/password patterns — none
  found). No Critical/High findings.
- Local production-build browser regression (`next start`, Playwright):
  Home/About/Lightkeepers checked at 1440px/390px/320px — no console
  errors, correct header set present (CSP, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy),
  `/.env` and `/.git/config` both 404. Home: logo centred and hero
  colour-split correct at mobile, unchanged at desktop, single donation
  CTA only. About: `.about-children` gap tightened with no overlap at
  390px or 320px. Lightkeepers: pin/long-cloud/tall-cloud visibly smaller
  with no overlap of title/subtext at 390px or 320px;
  `.lk-why` → `.lk-cta` confirmed adjacent in the DOM (no stale gap where
  Supporters/Partners used to render).

### Scope correction (2026-09-14, post-handoff)

Per explicit user direction, `PartnersCarousel` was restored (import +
render) on `app/page.tsx` and `app/lightkeepers/page.tsx` — the partner-logo
section is public again on both routes. `SupportersSection` (the people
gallery) remains withheld, unchanged from the original implementation:
still imported nowhere, still fully intact for future reactivation.
Newsletter withdrawal and all other scope from this task are untouched.
Re-ran `npm run lint` and `npm run build` — both clean; confirmed via
`curl` against a local production build that "Our Partners" now renders on
both routes and no "Supporters" markup renders on either.

**Step 6 — blocked, not evidenced:** No authorised Vercel preview URL for
this exact revision, and no Formspree dashboard/inbox access, were
available in this session. Per the task's own instruction ("If dashboard
or inbox access is unavailable, stop this release criterion as blocked
rather than claiming delivery has been confirmed"), this criterion is
reported **blocked**, not passed. Outstanding before launch:
1. Deploy this exact revision to an authorised Vercel preview.
2. Run the six-route/three-width browser check against that preview URL
   (not `maranghouse.org`, which still serves the unrelated stopgap
   project).
3. Confirm in the Formspree dashboard that form `xjgnonlz` notifies
   `info@maranghouse.org`, submit one labelled test through the preview
   Contact form, and have an inbox owner confirm receipt.
4. Only then can the final manual checkpoint (owner review + explicit
   domain-cutover authorisation) proceed — `maranghouse.org` must stay on
   the stopgap project until that separate authorisation is given.

**Status:** all source-backed criteria pass; task is `ready-for-check`
for everything except the external Vercel/Formspree acceptance criterion
in step 6, which remains blocked pending preview deployment and dashboard/
inbox access. No commit, push, or deployment/domain action was taken.

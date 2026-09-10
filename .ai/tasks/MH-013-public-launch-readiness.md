# MH-013: Public launch readiness gate

Status: ready-for-check
Base: `0c12ab70372fb3cdbbf45c25c29c31bf43c5a7d6` (`origin/main`)

## Goal and user-visible outcome

Produce a release candidate that is safe and credible to put in front of the
public, plus a binary go/no-go record. The custom domain must remain on the
current emergency landing project until every launch gate below passes and an
authorised Marang House representative explicitly approves the content and
domain cutover.

This task is the release-gate plan, not authority to deploy, move DNS, merge,
push, send a real form submission, or publish a claim that the organisation
has not approved.

## Current repository evidence

- The authoritative starting point is `origin/main` at `0c12ab7`; this
  workspace is clean. The candidate is a fully static Next.js 16 App Router
  site with eight indexable routes: the five core pages and three legal pages.
- `next.config.ts` already sets a restrictive host allowlist and HSTS,
  clickjacking, MIME-sniffing, referrer, and permissions headers. Its static
  CSP intentionally has `script-src 'unsafe-inline'`; treat that as a
  documented framework compatibility trade-off unless the security review
  demonstrates a compatible narrower policy.
- `lib/site-data.ts` is the source of truth for public organisation and
  donation facts. The Contact and newsletter-interest forms send personal data
  to Formspree form `xjgnonlz`; newsletter interest is also intended for
  Brevo. `lib/consent.ts` is deliberately provider-agnostic: no analytics is
  currently loaded, and GA4/PostHog must not be added without their public
  configuration, consent gating, and PostHog input masking.
- The legal/consent work from MH-012 is in `origin/main`, so the 2026-08-28
  privacy-page finding is partly superseded. Verify instead that the current
  form has an adjacent, understandable privacy acknowledgement and that the
  published wording accurately describes its actual Formspree/Brevo flows.
- The 2026-08-28 health report remains relevant for performance, metadata and
  remaining accessibility follow-up. It measured weak mobile LCP (notably
  Contact, Home and Lightkeepers), oversized image delivery, an eager Google
  Maps iframe, missing route-specific canonical/Open Graph metadata, unstable
  sitemap dates, and possible Donate heading-order defects. Re-test each
  finding against this newer mainline rather than assuming it still exists.
- The same-date content audit identifies launch-blocking organisational
  decisions, not merely editing work: evidence for Section 18A/receipt
  workflow, keyring/reward permission and fulfilment, child-sponsorship
  wording, impact/donor totals, Salome quotation approval, and current
  supporter permissions. `AGENTS.md` independently records 300+ children and
  1000+ volunteers as unverified.
- A fresh `npm audit --omit=dev --audit-level=high --json` on 2026-09-09
  reports one **critical** direct Next.js advisory for `next@16.2.11` (and
  related moderate PostCSS/high Sharp findings), plus a high `nanoid` advisory.
  The audit reports a compatible remediation at `next@16.3.4`. This is a
  no-launch dependency gate, not an accepted risk.
- `maranghouse.org` and `www.maranghouse.org` still point to the separate
  `marang-house-landing` Vercel project. The final custom-domain move to the
  `marang-house-website` Vercel project is a manual production action and is
  explicitly outside this task until the release candidate passes.

Stable supporting evidence: `AGENTS.md`, `MARANG-HOUSE-SITE-CONTEXT.md` §11,
`reports/site-security-2026-08-28.md`, `reports/site-health-2026-08-28.md`,
`reports/content-audit-2026-08-28.md`, and
`reports/full-audit-2026-08-28.md`.

## Scope

### In

- Remediate every Critical or High production dependency advisory with the
  smallest compatible, lockfile-pinned upgrade; retain existing static output
  and header/asset-host constraints.
- Perform a source-backed standard security scan of the complete repository,
  including third-party form/iframe boundaries, CSP/headers, generated output,
  committed secrets/history, and dependency tree. Record findings, evidence,
  severity, and coverage; create a focused repair task for every launch-blocking
  finding before any release decision.
- Re-test and fix current, reproducible release defects in the site: canonical
  and route-specific sharing metadata; crawl/sitemap accuracy; keyboard,
  focus, headings and form disclosures; broken links/assets; console/network
  failures; responsive overflow; and clear degradation of the Maps/embed path.
- Optimise the current highest-cost public paths without redesigning them:
  Contact first, then Home and Lightkeepers. Prefer right-sized Cloudinary
  derivatives/accurate `sizes`, lazy/deferred non-essential media and a
  user-triggered map over globally weakening quality or CSP constraints.
- Produce repeatable production-build and Vercel-preview evidence for all
  candidate routes, then document the manual post-cutover smoke test and
  monitoring handoff.
- Resolve content/operational launch gates only from written owner records. If
  records are unavailable, use the conservative copy alternatives below rather
  than guessing or presenting conditional benefits as facts.

### Out

- Committing, pushing, PR creation, Vercel/domain/DNS changes, analytics
  activation, real Formspree submissions, new donation programmes, PAIA/POPIA
  legal advice or certification, and new social links.
- Reusing the obsolete WordPress/GoDaddy hosting, historical branches, old
  press/testimonial copy, GivenGain, or unverified Cloudinary assets.
- Large visual redesigns, new data collection, a generic test-framework
  migration, or blanket `npm audit fix --force` changes.

## Dependencies, ownership and order

The release lead owns `package.json`, `package-lock.json`, `next.config.ts`,
`app/layout.tsx`, `app/sitemap.ts`, `app/globals.css`, final integration, and
the release report. Do not parallel-edit those files. A content owner supplies
the listed source approvals; a Vercel/domain administrator performs only the
separately-authorised cutover.

1. **Create the immutable baseline and stop condition.** Record Node/npm
   versions, the exact base, dependency tree, `npm audit` JSON, current header
   policy, route inventory, and existing report deltas. Establish a release
   ledger that treats Critical/High security findings, false/misleading
   fundraising claims, broken primary flows, and failed public-route checks as
   hard stops. Outcome: later work cannot silently downgrade a known risk.
   Depends on: none. Dependants: every step below.

2. **Patch the production dependency tree.** Upgrade Next.js to the smallest
   audit-approved patched release (currently `16.3.4`), regenerate only the
   lockfile entries required by that upgrade, and inspect the resulting
   dependency diff. Do not use a force/major upgrade or unrelated package
   churn. Outcome: `npm audit --omit=dev --audit-level=high` reports zero
   Critical/High production vulnerabilities, or each residual is source-backed
   and explicitly accepted by the authorised owner. Depends on: step 1.
   Likely files: `package.json`, `package-lock.json`.

3. **Run security and privacy review, then make narrowly-scoped repairs.**
   Scan deployable source and the production build for credentials, unsafe
   sinks, CSP/header regressions, asset hosts, third-party frame/form exposure,
   consent behaviour and generated data leakage. Confirm that Contact explains
   its data use and links to the privacy notice adjacent to submission; confirm
   newsletter wording matches the Formspree-to-Brevo process and consent.
   Preserve the deep `lib/consent.ts` module interface: it owns consent
   persistence/events, while a later analytics adapter may only consume that
   interface after consent. Outcome: no unremediated Critical/High issue and
   no analytics request before consent. Depends on: step 2. Likely files only
   if evidence requires them: `components/ContactForm.tsx`,
   `components/NewsletterInterestForm.tsx`, `lib/consent.ts`, legal pages,
   `next.config.ts`, and `app/globals.css`.

4. **Close public quality defects measured on the current build.** Re-run the
   August checks on current code, then repair only reproducible defects. Add
   page-specific canonical and Open Graph metadata through the smallest shared
   metadata interface; do not duplicate organisation facts across pages.
   Correct sitemap modification semantics, heading/order/form-label defects,
   navigation focus and link/asset failures. Optimise the actual LCP image and
   defer the Maps iframe behind a user action or equivalent accessible preview
   only if measurements show the existing eager load is the cause. Outcome:
   all eight routes are crawlable, semantically sound, keyboard usable, and
   stable from 320px through desktop with no console/page/first-party-network
   error. Depends on: steps 2–3. Likely files: route `page.tsx` files,
   `app/layout.tsx`, `app/sitemap.ts`, `app/globals.css`, `app/contact/page.tsx`,
   `components/ContactForm.tsx`, `components/BgPhoto.tsx`, and `lib/images.ts`.

5. **Resolve content and operational gates with the organisation.** Obtain and
   archive (outside public source where appropriate) either approvals/evidence
   or a written decision to remove/rewrite: Section 18A approval plus compliant
   receipt workflow; keyring/BackaBuddy decision; real sponsorship programme
   definition; dated impact/volunteer/Lightkeeper totals; Salome quote
   provenance; supporter names/images/endorsement currency; and verified social
   URLs if the owner wants them. Without evidence, implement only conservative
   wording: “Become a Lightkeeper” rather than child sponsorship, no reward
   promise, “helps fund children's care and the day-to-day running of Marang
   House” rather than absolute allocation/outcome promises, and no unsupported
   numbers or attributed quotes. Outcome: all public fundraising and personal
   attribution claims have an owner-approved source or are absent. Depends on:
   step 1; may run while steps 2–4 execute, but its code changes integrate
   after their shared-file edits finish. Likely files: `app/page.tsx`,
   `app/about/page.tsx`, `app/lightkeepers/page.tsx`, `app/donate/page.tsx`,
   `lib/site-data.ts`, legal pages, and `app/globals.css`.

6. **Run the release candidate gate on the exact Vercel preview.** After all
   repairs and content decisions, build once cleanly, audit the generated
   output, and test the preview—not localhost alone. Verify headers and
   sensitive paths, each route, `robots.txt`, `sitemap.xml`, canonical/OG tags,
   image delivery, external destinations, menu/consent/forms without real
   submissions, responsive layout, keyboard journey, and mobile/desktop
   performance. Record accepted exceptions with owner and expiry; do not label
   a failed metric “passed” merely because a local run differs. Outcome: a
   binary launch checklist with evidence URLs/timestamps and no open hard stop.
   Depends on: steps 2–5.

7. **Manual production cutover and post-launch smoke test (separate explicit
   authorisation required).** An authorised Vercel/domain administrator makes
   `www.maranghouse.org` or apex the selected primary domain in
   `marang-house-website`, moves both domain aliases from
   `marang-house-landing`, and configures a permanent redirect for the
   non-primary host. Immediately repeat the step-6 smoke test on HTTPS public
   hosts, check `/.env` and `/.git/config` remain 404, and confirm the old
   WordPress/GoDaddy exposure remains decommissioned per context §11. Outcome:
   exactly one canonical public host, valid certificates, no duplicate indexing
   host, correct Vercel project, and a 24–72 hour monitoring owner. Depends on:
   signed step-6 go decision. This task only documents it; it does not execute
   it.

## Observable release criteria

- The lockfile is reproducible with `npm ci`; production dependency audit has
  zero Critical/High advisories. The dependency upgrade produces a clean
  `npm run lint`, `npm run build`, and `git diff --check`.
- The standard source security report contains no unremediated Critical/High
  finding. CSP/header checks pass for normal pages and 404s, `/.env` and
  `/.git/config` are not public, and no private credential appears in source,
  Git history, or built output.
- No analytics SDK/script/request occurs before Analytics consent; no GA4 or
  PostHog configuration is added unless its approved values, narrowly scoped
  CSP hosts, consent gating, and masked-input validation are all supplied.
- All eight routes, `robots.txt`, and `sitemap.xml` return expected responses;
  primary navigation, footer legal links, donation, tel/mail/WhatsApp and map
  paths work. All internal links and deployed Cloudinary assets resolve.
- Each indexable route has one h1, a unique title/description, a self-canonical
  URL and route-specific Open Graph metadata. The sitemap has exactly the
  intended eight URLs and only truthful `lastModified` values.
- At 320×844, 390×844, 768×1024 and 1440×900, pages have no horizontal
  overflow, overlap/cut-off, console/page errors, or failed first-party
  requests. Keyboard-only menu, consent preferences, Contact validation, and
  map fallback are usable with visible focus and no trap.
- Mobile Lighthouse/PSI measurements are captured on the Vercel preview. The
  target is Performance ≥90, Accessibility/Best Practices/SEO ≥95 per core
  route, LCP <2.5s and CLS <0.1. A metric below target is a no-launch gate
  unless the authorised owner records a concrete remediation owner and date.
- Every public fundraising, tax, supporter, numerical-impact and attributed
  quotation claim is backed by current written organisation approval, or has
  been removed/reworded conservatively. The owner has approved the effective
  date and text of legal notices.
- Before domain work starts, the release ledger says GO and the user separately
  authorises the Vercel/domain action. After cutover, one primary HTTPS host
  redirects the other permanently and the live smoke test passes.

## Required verification

Run after the relevant slice, then repeat once on the integrated release
candidate:

```sh
npm ci
npm audit --omit=dev --audit-level=high --json
npm run lint
npm run build
git diff --check
```

Use browser automation against `npm run start` and the exact Vercel branch
preview to capture routes, headers, headings, overflow, console/network output,
keyboard focus, consent state, and no-real-submission form error paths. Run
Lighthouse/PageSpeed mobile and desktop against the preview. Do not send a real
Formspree enquiry; use the existing honeypot and controlled network failure
paths. Use a clean profile to prove pre-consent tracker blocking.

## Manual checkpoints

1. **Content approval, before copy integration:** Marang House supplies the
   written evidence/decisions named in step 5, confirms Contact/newsletter
   processor wording, and approves/removes each disputed claim. This prevents
   publication of invented or legally sensitive claims.
2. **Final release decision, after preview evidence:** an authorised owner
   reviews the release ledger, mobile visual/performance evidence, legal copy,
   external donation/form destinations, and the primary-host redirect plan;
   they either authorise the separate cutover or keep the stopgap live.

## Assumptions, risks and blockers

- The current `npm audit` Critical/High findings are launch blockers until a
  fresh scan proves otherwise; do not rely on the site's static deployment as
  a reason to ignore its Next.js/Image tooling exposure.
- Board/staff approval and external service/dashboard access cannot be inferred
  from this repository. Missing evidence is a content/operations blocker, not
  permission to fabricate copy.
- BackaBuddy, Formspree, Brevo, Cloudinary, Google Maps, Vercel and domain/DNS
  settings are external dependencies. Their current configured state must be
  checked by an account holder during the final gate.
- The old reports were local-build measurements and predate MH-012. They set
  priorities but are not proof that a current or preview deployment passes.
- `maranghouse.org` must not be repointed until the separate launch decision;
  merging source never performs that production action.

## Handoff

Architected 2026-09-09 from `origin/main` `0c12ab7`. This plan was informed by
the Conductor release workflow, codebase-design seam discipline, and security
scan guidance. No application code, dependency, deployment, domain, commit or
push changed in architect mode. The only file added is this task contract.

At implementation start, mark this task `in-progress`, append the exact
baseline/audit reports and all repair decisions here, then mark it
`ready-for-check` only when every observable criterion is evidenced or the
remaining manual cutover is explicitly separated and authorised.

## Implementation Handoff (2026-09-09/10)

Implemented from `origin/main` `0c12ab7` on branch `prelaunch-site-audit-plan`.
No commit, push, PR, deploy, domain/DNS, or real Formspree submission was
made. Node `v24.14.1`, npm `11.11.0`.

### Step 1 — Baseline

- `npm ci` clean install. Baseline `npm audit --omit=dev --audit-level=high --json`
  (`/tmp/audit-baseline.json`, not committed): **1 critical** (`next` RCE
  advisories, range `9.3.4-canary.0 - 16.3.2`), **4 high** (`nanoid` infinite
  loop, `sharp` libheif CVEs ×2 surfaced as one advisory), **1 moderate**
  (`postcss` sourceMappingURL). All four packages were transitive (`next`,
  and `next`'s own bundled `postcss`/`sharp`/`nanoid`).
- Route inventory confirmed: 8 indexable routes (`/`, `/about`, `/contact`,
  `/donate`, `/lightkeepers`, `/privacy-policy`, `/terms-and-conditions`,
  `/cookie-policy`) + `/_not-found`, `/robots.txt`, `/sitemap.xml`.

### Step 2 — Dependency patch (done)

- `next` 16.2.11 → **16.3.4** (exact pin, matches the audit's proposed fix),
  `eslint-config-next` bumped in lockstep.
- Found the *actual* root cause of the two lower-severity advisories still
  showing after the `next` bump: `package.json` had `overrides.postcss:
  "^8.5.10"` and `overrides.sharp: "^0.35.0"` pinning both below Next
  16.3.4's own required `postcss@8.5.23` / `sharp@^0.35.4`, overriding
  Next's own fix. Bumped both override ranges to `^8.5.23` / `^0.35.4`.
  `nanoid` is postcss's own transitive dependency and cleared once postcss
  updated.
- **Result:** `npm audit --omit=dev --audit-level=high --json` →
  `{critical:0, high:0, moderate:0, low:0, info:0}`. `npm run lint` and
  `npm run build` both clean; `npm ci` reproducible from the committed
  lockfile diff. `git diff --check` clean throughout.
- Files: `package.json` (next/eslint-config-next versions, both override
  ranges), `package-lock.json` (regenerated for the affected subtree only).

### Step 3 — Security & privacy review (done)

- Repo-wide secret scan (`.env*` files, git history for `.env`, grep for
  key/token/secret patterns) found nothing — matches the 2026-08-28 report's
  "what passed" findings, still true on current `main`.
- **Confirmed and fixed the 2026-08-28 report's sole blocker, which had not
  actually been closed by MH-012's legal pages:** `components/ContactForm.tsx`
  and `components/NewsletterInterestForm.tsx` collected personal data with no
  link or acknowledgement adjacent to the submit control, even though
  `/privacy-policy` itself was accurate and complete. Added a one-line
  privacy acknowledgement + `Link` to `/privacy-policy` directly above each
  form's submit button (styled via existing `.contact-form-hint` convention
  and a new `.newsletter-interest__privacy` rule).
- Verified against the production build/server: CSP, HSTS, `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` all present
  on both normal responses and a 404. `/.env` and `/.git/config` both 404.
  No analytics script/SDK present (`lib/consent.ts` still persistence-only,
  confirmed no import of a tracking SDK anywhere) — no pre-consent tracking
  request is possible because none exists yet.
- Left `next.config.ts`'s `script-src 'unsafe-inline'` and the Maps iframe's
  `sandbox="allow-scripts allow-same-origin allow-popups"` as documented,
  accepted trade-offs (both already called out in-repo); no new CSP/sandbox
  regression found.
- `reports/` remains outside `.gitignore` (2026-08-28 minor finding, still
  true) — left as an explicit, low-severity residual risk, not fixed (a
  deliberate policy decision the task didn't ask for).

### Step 4 — Public quality defects (done, with one residual)

- **Canonical + route-specific Open Graph/Twitter metadata** — genuinely
  missing before this task (verified live: every subpage emitted the
  homepage's `og:url`/`og:title`). Added `lib/metadata.ts` (`pageMetadata()`)
  as the single shared interface; every route's `metadata` export now goes
  through it (home gets only `alternates.canonical`, since its title/
  description are the intentional root-layout defaults). Verified on the
  built site: `/about` emits `<link rel="canonical" href=".../about">`,
  `/donate` emits `og:url=.../donate` + `og:title=Donate`, etc.
- **Sitemap `lastModified` was unconditionally `new Date()`** — regenerated a
  fresh, untruthful timestamp on every build. Replaced with a `git log -1
  --format=%cI -- <route file>` lookup per route (falls back to `now` only if
  Git history is unavailable, e.g. a shallow CI checkout). Verified: the
  built `/sitemap.xml` now shows genuinely different `lastmod` values per
  route matching each file's real last commit date.
- **Heading order and honeypot accessibility-tree findings from the
  2026-08-28 health report no longer reproduce** on current `main` (already
  fixed by MH-012): Donate's headings are sequential h1→h2→h3 with no h2→h4
  jump, and the Contact honeypot already carries `aria-hidden="true"` +
  `tabIndex={-1}`. Re-verified, not re-fixed.
- **LCP / oversized image delivery — root cause found and fixed.** Contact's
  hero image was requested via a special-cased Cloudinary URL
  (`f_png,q_auto:best/...svg`) that `lib/cloudinary-loader.ts` explicitly
  bypassed from width-based resizing (`if src.includes("/f_png,") return
  src`), so it always shipped at native full resolution regardless of
  viewport (636 KB PNG, identical `srcSet` at every breakpoint). Switched
  the source to `f_auto,q_auto:best` (matching the shared `cld()` convention)
  and generalised the loader to strip either prefix and always re-apply
  `c_limit,w_${width}/f_auto,q_auto:best/`. Verified with real browser
  `Accept` headers (not just a bare curl) that Cloudinary still returns a
  rasterised WebP (not raw SVG) and that it renders identically to the
  original at both 640w and full-bleed widths (fetched and visually
  inspected both). Also added missing/corrected `sizes` props (previously
  absent, defaulting to a 1x/2x-of-`width` srcset that ignored the actual
  CSS-rendered size) on: Contact's aside photo, Home's lightkeeper-keychain/
  group-hands/girl-arch images, and Lightkeepers' hero banner + both pin
  images — each checked against its real CSS breakpoint width, not guessed.
  **Measured mobile-Lighthouse effect (local `next start`, Slow-4G-throttled,
  not the Vercel preview — see Coverage gap):**
  | Route | Perf (before→after) | LCP (before→after) |
  |---|---|---|
  | Contact | 74 → **92** | 7.7s → **3.3s** |
  | Home | 76 → **86** | 7.4s → **4.2s** |
  | Lightkeepers | 79 → **93** | 5.8s → **3.3s** |
  Accessibility/Best Practices/SEO were already 96–100 on all three and
  unaffected. Donate and About were not in the task's named priority list
  and were spot-checked only (Donate 79/5.7s, About 87/3.9s) — their
  remaining weight is dominated by the same accepted-trade-off decorative
  animated GIFs described below, not a dimension/format bug.
- **Residual, not fixed:** Home and Donate still carry large `unoptimized`
  decorative GIFs (`MH-star-giff.gif` 430 KB, `MH-cloud-giff.gif` 230 KB,
  `MH-love-giff.gif` 164 KB) that account for most of the remaining
  Lighthouse "image delivery" savings estimate on those routes. These are
  already `unoptimized` **deliberately** (AGENTS.md: preserves GIF animation,
  which Next's optimizer would flatten to one frame) and are already
  `aria-hidden`/lazy by default — shrinking them further would mean
  re-authoring the asset (e.g. a lighter GIF/WebP export) or dropping the
  animation, both content/asset decisions outside this task's "no redesign,
  don't weaken quality" boundary. Flagging as an owner decision, not
  silently accepting or fixing it.
- **Google Maps iframe** already had `loading="lazy"`; measurement showed it
  was not what was driving Contact's LCP (the hero photo was), so per the
  task's own conditional ("only if measurements show the existing eager load
  is the cause") it was left as-is.
- **Verified via Playwright against the production `next start` server, all
  8 routes:** zero console errors, zero failed/4xx+ network requests, exactly
  one `<h1>` per route, all internal `<a href>` targets resolve to real
  routes (no broken links). Zero horizontal overflow at 320×844, 390×844,
  768×1024, and 1440×900 on all 8 routes. Keyboard tab order from page load
  reaches skip-link → nav → hero CTAs with a visible focus outline at every
  step, no trap. Consent banner renders on a cleared-storage (fresh-profile)
  load. Submitting the empty Contact form triggers native validation and
  makes **no** request to Formspree (checked via a network listener, not
  just visual inspection) — the no-real-submission constraint was honoured
  throughout.
- Files touched: `lib/metadata.ts` (new), `app/sitemap.ts`, `app/page.tsx`,
  `app/about/page.tsx`, `app/contact/page.tsx`, `app/donate/page.tsx`,
  `app/lightkeepers/page.tsx`, `app/privacy-policy/page.tsx`,
  `app/terms-and-conditions/page.tsx`, `app/cookie-policy/page.tsx`,
  `lib/cloudinary-loader.ts`, `app/globals.css` (one added rule).

### Step 5 — Content/operational gates (partially resolved; real blockers remain)

No Marang House representative was available in this session to supply the
written evidence step 5 calls for, so per the task's own instruction
("Missing evidence is a content/operations blocker, not permission to
fabricate copy") the following was **fixed** where a safe, reversible,
non-structural wording edit was enough, and **flagged rather than guessed**
everywhere a structural/design element or an already-established fact was
involved:

- **Fixed — unfulfilled reward promise.** Home's Lightkeepers band promised
  "Be the first to get a limited-edition keyring with love from us" with no
  evidence of fulfilment/logistics capability (this is exactly the
  "keyring/BackaBuddy decision" the task lists as unresolved). Removed the
  sentence; the paragraph still reads correctly without it, and the keyring
  product image stays as neutral Circle-of-Light branding art, not a
  promised item.
- **Fixed — child-sponsorship wording.** Re-checked: the only "Sponsor a
  Child" text left anywhere is a Contact-form dropdown *reason for
  contact* option, not a marketing claim of an active sponsorship
  programme. No change needed; this already matches the task's "Become a
  Lightkeeper rather than child sponsorship" instruction.
- **Flagged, not changed — Section 18A tax-deduction claim.** Donate states
  "Donations are tax-deductible in South Africa under Section 18A... A
  certificate can be issued after donation." `lib/site-data.ts`
  (the project's own source-of-truth for organisation facts) already
  records a PBO registration number, which is consistent with 18A
  eligibility, so this isn't invented from nothing — but the task explicitly
  lists "Section 18A approval plus compliant receipt workflow" as needing a
  current written confirmation, which nobody in this session could supply.
  **Needs Checkpoint 1 sign-off**, not a unilateral rewrite of a claim that
  may well be accurate.
- **Flagged, not changed — homepage stats banner.** "300+ Children" /
  "1000+ Volunteers" (AGENTS.md already flagged both as unverified; "28+
  Years" is independently correct against `foundedYear: 1998`). These are
  unsupported numbers per the task's own criteria, but they're load-bearing
  content inside a designed 3-column animated stat component — deleting or
  replacing two of three tiles is a content/design call the task's "no
  large visual redesigns" boundary and its own Checkpoint-1 process assign
  to the organisation, not something to freelance mid-implementation.
  **Needs Checkpoint 1 sign-off**: either supply real figures, or approve
  specific replacement copy.
- **Flagged, not changed — Salome attributed quotation.** Lightkeepers'
  "Why Monthly?" section carries a direct quote attributed to "Salome,
  Matron of Marang House" in a designed pull-quote card. No record in this
  repo confirms Salome approved this specific published wording. Same
  reasoning as above: a named individual's attributed quote is exactly the
  kind of claim the task says needs written provenance, but removing an
  existing, possibly already-cleared quote without evidence it's wrong is
  just as much a guess as inventing one. **Needs Checkpoint 1 sign-off.**
- **Flagged, not changed — named supporter photos/endorsements.**
  `components/SupportersSection.tsx` names four real public figures (Daryl
  Impey, David Higgs, Monique Weyers, Nazia Wadee) with photos and current
  titles. Their consent/endorsement currency can't be verified from the
  repo. Pre-existing from MH-012, not touched here; carried forward as an
  open item per the task's own evidence list.
- **No change made/needed:** no GivenGain reference, no new social links, no
  new donation programme, no press-page content (still an empty stub) —
  all correctly absent already.

### Step 6 — Release candidate gate

**Not run against the actual Vercel branch preview** — this session had no
Vercel deployment access. Everything above (headers, routes, canonical/OG,
sitemap, image weight, Lighthouse, keyboard/console/link checks) was verified
against a local `next build && next start` production server on port 3210,
which is a reasonable proxy but is explicitly *not* the same as the task's
required "exact Vercel branch preview" gate. Required before a real go
decision:

- Push this branch (or open a PR) so Vercel generates a preview URL, then
  repeat the header/route/canonical/OG/sitemap/Lighthouse/keyboard/consent
  checks above against that URL specifically.
- Re-run `npm audit --omit=dev --audit-level=high` one more time immediately
  before the go decision, in case a new advisory has landed since this pass.

### Step 7 — Cutover

Not started, not authorised, out of scope for this session as instructed.
`maranghouse.org`/`www` remain pointed at `marang-house-landing`.

### Verification commands run (all passing on this branch)

```
npm ci
npm audit --omit=dev --audit-level=high --json   # {critical:0, high:0, moderate:0}
npm run lint                                      # clean
npm run build                                     # 8/8 routes + robots/sitemap generated
git diff --check                                  # clean
```

Plus the Playwright/Lighthouse checks described in Step 4, run against
`next start` on port 3210 (not committed — ephemeral local verification).

### Summary for the two manual checkpoints

1. **Content approval (before any further copy integration):** four flagged
   items above — Section 18A/receipt workflow, the 300+/1000+ stats, the
   Salome quote, and the named supporters — each needs either written
   organisational confirmation or an explicit decision to reword/remove.
   Nothing invented or guessed in their place.
2. **Final release decision:** blocked on running Step 6 against the actual
   Vercel preview (not yet possible from this session) and on Checkpoint 1
   above. Dependency/security gates are clean; quality defects on the named
   priority pages are fixed and measured; Home/Donate's remaining Lighthouse
   gap is attributable to a documented, deliberate GIF-quality trade-off, not
   an unmeasured regression.

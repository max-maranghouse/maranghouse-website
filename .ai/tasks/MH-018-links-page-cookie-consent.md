# MH-018: Inline cookie preferences on the QR links page

Status: ready-for-check
Base: `d3df1fc71a78ae0c7856370fb3beef2671003591` (`HEAD`, QR links-page implementation)

## Goal

Adapt cookie consent on `/links` so a first-time QR visitor can see and use the
fundraiser actions without the current fixed, full-width banner covering them.
The links page must instead present the same necessary/analytics choice as a
compact, in-flow panel inside its white card. All other routes must retain the
existing fixed bottom banner unchanged.

User-visible outcome:

- On `/links` without a valid consent record, cookie controls appear after the
  donation/social actions in the page card, never as a viewport overlay.
- The primary BackaBuddy action and every keyboard-focused link remain
  unobscured at every viewport size.
- After a visitor saves a choice, a low-emphasis “Cookie preferences” control
  remains on `/links` so they can reopen and change that choice.
- Home, Donate, Contact, legal pages, and every other non-`/links` route keep
  their current fixed consent banner, footer reopening control, wording, and
  consent semantics.

## Repository evidence and current behaviour

- The supplied screenshot shows the current `.consent-banner` fixed to the
  bottom of `/links`, covering the lower actions. At desktop width its full
  horizontal bar obscures the Facebook action; the problem is more acute for
  short mobile viewports.
- `components/ConsentBanner.tsx` owns all persistence and interaction:
  necessary cookies are always on, the analytics checkbox feeds `writeConsent`,
  valid choices hide the banner, and the global reopen event restores focus.
  `lib/consent.ts` stores the versioned `mh-cookie-consent` record and gates
  analytics; neither policy nor storage shape should change.
- `app/layout.tsx` currently mounts one global `ConsentBanner` after
  `SiteShell`. `components/SiteShell.tsx` already makes an exact `/links`
  chrome exception; `components/links/LinksPage.tsx` owns the links card.
- `app/globals.css` has a global fixed-banner block and a strictly namespaced
  `.links-page` block. The `/links` isolation contract in `AGENTS.md` permits
  route-scoped presentation only; any shared consent/shell change requires
  regression verification of existing routes.

## Scope

### In

- Add a presentation-only `ConsentBanner` interface, defaulting to the current
  site banner and supporting a `links` variant. Its legal wording, controls,
  keyboard behaviour, local-storage record, events, and analytics choice must
  be identical between variants.
- Mount the default banner from `SiteShell` only for normal routes, preserving
  its current DOM order and fixed styling. Do not mount a duplicate banner on
  `/links`.
- Mount the `links` variant inside `components/links/LinksPage.tsx`, after the
  four approved link actions, so it participates in normal document flow.
- Add a small client `components/links/LinksCookiePreferencesButton.tsx` that
  appears only after a valid choice and calls the existing
  `openConsentPreferences()` event. The always-mounted inline banner handles
  that event and restores focus to this trigger after saving.
- Style only the `links` variant through `.links-page …` selectors: a compact
  cream/brand-soft preferences panel, readable consent text, visible checkbox,
  44px-or-larger controls, a clear primary Accept action, and secondary
  Reject/Save actions that reflow without clipping. Keep the explicit Cookie
  Notice link.
- Adjust only `.links-page` layout rules needed to keep the card top reachable
  when its in-flow consent content exceeds the viewport; do not change shared
  page, button, banner, or token rules.

### Out

- Any privacy-policy/cookie-notice copy change, change to the necessary vs.
  analytics categories, consent version/expiry/storage-key change, or new
  analytics provider.
- Changes to `GoogleAnalytics`, `lib/consent.ts`, footer cookie controls, QR
  destinations, sitemap/indexing, navigation, page copy, or non-`/links`
  visual design.
- A modal, fixed/sticky links-page overlay, an auto-accept flow, dependencies,
  production deployment, commits, pushes, PRs, or domain changes.

## Dependencies and ownership

This is one small vertical slice. The implementation lead owns
`components/ConsentBanner.tsx`, `components/SiteShell.tsx`,
`components/links/`, `app/layout.tsx`, and namespaced additions to
`app/globals.css`. The shared consent component and shell are an explicitly
approved exception to the `/links` isolation rule solely to provide a
route-specific presentation; their default non-`/links` output must remain
unchanged.

## Implementation steps

1. Refactor `ConsentBanner` to accept a presentation prop with a default
   `site` value and a `links` variant. Add only a variant class/semantics needed
   for styling; reuse the existing state, storage, event subscription, focus
   handling, text, checkbox, and three save paths. **Done when** choosing
   Reject, Save, or Accept writes exactly the same consent record in either
   presentation.
2. Move the default `ConsentBanner` mount from `app/layout.tsx` into the normal
   branch of `SiteShell`. Keep it after the existing page chrome/click-light
   sequence so every non-`/links` route remains visually and functionally
   equivalent. Keep the chromeless `/links` branch free of the default banner.
   **Done when** there is exactly one banner instance per route and normal
   routes still use the fixed bottom bar.
3. In `components/links/LinksPage.tsx`, render `<ConsentBanner
   presentation="links" />` after the action list. Add a dedicated,
   client-side links-page preference trigger that subscribes to the existing
   consent snapshot, stays hidden until a valid choice exists, and dispatches
   the existing reopen event. **Done when** an initial visitor sees the inline
   panel and a returning visitor can reopen it without a footer.
4. Add only `.links-page`-rooted CSS overrides for the inline variant. It must
   be `position: static`, full card width, visually subordinate to donation
   actions, and use an accessible light surface with brand-dark text. Reflow
   its checkbox and three actions to a single-column stack on narrow phones;
   use a compact multi-column arrangement only where each label fits and all
   targets remain at least 44px high. Do not add a new animation. **Done when**
   no banner overlays content or focus and the panel reads as part of the page.
5. Verify fresh-choice, saved-choice, and reopened-choice flows along with
   normal-route regression checks. Update Handoff with exact checks and mark
   the task `ready-for-check` only after all criteria pass.

## Success criteria

- With `mh-cookie-consent` absent or expired, `/links` contains one visible
  in-flow cookie-preferences region after its four actions and no fixed
  `.consent-banner` overlay.
- At 320×568, 390×844, and 1440×900, donation/social actions and their focus
  indicators are never obscured; there is no horizontal overflow or nested
  scroll region.
- Reject writes analytics `false`; Accept all writes analytics `true`; Save
  writes the checkbox value. These outcomes, cookie text, and Cookie Notice
  destination match the existing site banner.
- After any saved choice, `/links` exposes an operable Cookie preferences
  control. Opening it restores the inline panel; saving/rejecting returns focus
  to that control.
- The inline panel has visible labels, focus styles, 44px-or-larger buttons,
  8px-or-greater separation between controls, and contrast matching the
  existing brand tokens.
- On `/`, `/donate`, and `/contact`, the banner remains a fixed bottom bar;
  the footer Cookie preferences trigger still opens it and returns focus as it
  did before.
- `npm run lint` and `npm run build` pass.

## Verification

Automated:

```sh
npm run lint
npm run build
```

Manual checkpoint (final only): use a fresh browser storage profile at 320×568,
390×844, and 1440×900. On `/links`, tab through every action and all consent
controls before making a choice; verify no focus is covered. Test Reject,
Accept, and checked/unchecked Save paths, then reopen preferences using the
links-page trigger and verify focus returns to it after saving. Finally, clear
storage and inspect `/`, `/donate`, and `/contact`: their fixed banner and
footer preference flow must be unchanged. Confirm no analytics request fires
before consent and that rejected analytics stays disabled.

## Assumptions, risks, and decisions

- The attached screenshot is the acceptance reference: the issue to solve is
  the fixed banner covering QR-page actions, not the legal consent content.
- The links variant belongs after the action list in the card, not as a modal,
  sticky sheet, or overlay. This satisfies the WCAG focus-not-obscured
  requirement and keeps fundraising actions available immediately.
- The card may become scrollable as a normal document page on short phones;
  scroll is preferable to hiding actions behind persistent UI.
- The presentation prop and links-specific trigger are deliberately the only
  shared-component exceptions. All visual styling remains under
  `.links-page`; no generic consent/button styles are modified.
- No unresolved content, credential, or deployment decision blocks
  implementation.

## Handoff

**Changed files:**
- `components/ConsentBanner.tsx` — added an optional `presentation?: "site" |
  "links"` prop (default `"site"`). Only the wrapper `className` differs
  (`consent-banner` vs `consent-banner consent-banner--links`); state,
  storage, event subscription, focus handling, legal text, checkbox, and the
  three save paths (`save(false)`, `save(analyticsChecked)`, `save(true)`)
  are untouched and shared by both presentations.
- `components/SiteShell.tsx` — now imports and mounts `<ConsentBanner />`
  (default presentation) as the last element of the normal-route branch,
  after `ClickLightEffect`. The chromeless `/links` branch is unchanged (still
  renders only `<main>`), so it never gets the default banner.
- `app/layout.tsx` — removed the direct `<ConsentBanner />` mount and its
  import; the banner is now owned by `SiteShell` so there is exactly one
  instance per route.
- `components/links/LinksPage.tsx` — renders `<ConsentBanner
  presentation="links" />` after the four action `<li>`s, plus the new
  `<LinksCookiePreferencesButton />` trigger.
- `components/links/LinksCookiePreferencesButton.tsx` (new) — links-page
  equivalent of `CookiePreferencesButton`. Uses the same
  `useSyncExternalStore(subscribeToConsentChanges, hasValidConsentSnapshot,
  hasValidConsentServerSnapshot)` pattern and renders nothing until a valid
  choice exists, then calls `openConsentPreferences()` on click.
- `app/globals.css` — appended one new namespaced block (all selectors under
  `.links-page`): repositions `.consent-banner--links` from fixed to static
  in-flow, gives it a compact brand-soft surface, stacks/wraps its actions
  to fit the 26rem card, and styles `.links-page__cookie-btn` as a
  low-emphasis text trigger. No existing `.consent-banner*`, `.btn*`, token,
  or other-route selector was modified.

**Bug caught and fixed during manual verification:** the shared
`.consent-banner__text { flex: 1 1 20rem }` rule sets a *width* basis for the
site banner's row layout. Under the links variant's `flex-direction: column`
override, that same basis was read as a forced 20rem (320px) *height*,
producing a large empty gap between the checkbox note and the action buttons.
Fixed with a links-scoped `.links-page .consent-banner--links
.consent-banner__text { flex: 0 1 auto; }` override — no change to the shared
rule itself.

**Manual verification (Playwright against `npm run dev`, fresh `localStorage`
cleared before each flow):**
- `/links`, no consent record: inline "Cookie preferences" region renders
  after all four actions, no fixed overlay; confirmed via `position: static`
  on `.consent-banner--links` (site routes retained `position: fixed`).
- 390×844 and 320×568: no horizontal overflow (`scrollWidth === clientWidth`
  in both); full-page screenshots show all four actions and the inline panel
  clear of each other, no overlap, no dead space after the flex-basis fix.
- 1440×900: card content (1037px) exceeds the 900px viewport; verified
  `overflow-y: visible` on both `.links-page` and `.links-page__card` — this
  is normal in-flow page scroll, not a nested scroll region, matching the
  task's accepted assumption. Buttons wrap one-per-row inside the 26rem card
  because the three labels don't fit two-per-row at that width — expected
  `flex-wrap` behaviour of the "compact multi-column only where each label
  fits" requirement, not a bug.
- Checked "Analytics cookies" + Save → `localStorage['mh-cookie-consent']`
  written with `analytics: true`; panel closed; `LinksCookiePreferencesButton`
  appeared.
- Clicked the links-page trigger → panel reopened with the checkbox
  pre-checked (previous value restored) → clicked Reject → consent record
  updated to `analytics: false`, panel closed, and
  `document.activeElement` was confirmed back on the "Cookie preferences"
  trigger button.
- 0 console errors/warnings throughout every `/links` interaction.

**Normal-route regression (fresh consent state):**
- `/`: `.consent-banner` renders with `position: fixed`; header and footer
  both present. Accepted via "Accept all", then reopened via the footer's
  `CookiePreferencesButton`, saved again, and confirmed `document.activeElement`
  returned to that same footer button afterward — unchanged from pre-MH-018
  behaviour.
- `/donate`, `/contact`: both still render `.site-header` and `.site-footer`;
  banner correctly absent once a valid choice already exists from the Home
  check (consent persists across routes via `localStorage`, as before).

**Checks:**
- `npm run lint` — passes, no warnings/errors.
- `npm run build` — succeeds; `/links` and all 12 other routes still
  prerender statically.

**Deviations from the plan:** none, aside from the flex-basis fix above,
which was required to meet the "no banner overlays content" success
criterion and stayed entirely within the `.links-page`-scoped CSS the task
already authorized.

**Remaining risk:** none identified. Not committed, pushed, or deployed —
left for review per the task contract. (Note: running `npm run dev` for
manual verification causes Next.js to auto-append a `<!--
BEGIN:nextjs-agent-rules -->` block to `AGENTS.md`; this was stripped before
finalizing since it is unrelated to MH-018's scope.)

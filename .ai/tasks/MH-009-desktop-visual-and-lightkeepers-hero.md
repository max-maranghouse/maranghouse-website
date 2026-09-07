# MH-009: Desktop visual and Lightkeepers hero pass

Status: ready-for-check (Checkpoint 1)
Base: `46b7f7d34473f443f2e7f1b8a4258932a4cf299a` (`origin/main`)

## Outcome

Restrained visual-composition pass across Home, About, Lightkeepers, and
Donate: remove the conic "beam" texture from four orange cards that no
longer need it, replace two ray-image backgrounds with plain gradients,
close a layout gap on the Home Lightkeeper card, rebuild Donate's body as a
2×2 tile grid, restore the right side of an About crop, redesign the desktop
footer into a three-zone grid, tighten global body leading, fix the
Lightkeepers hero title/subtext placement, and add a single-fire
`FlickerText` reveal on the Lightkeepers `h1` in place of the existing
infinite title-shine animation.

No copy, route, donation flow, form behaviour, content fact, image
replacement/retouching, dependency, production, or deployment change is
part of this task. The approved parallax/cutout effects from MH-007/MH-008
are preserved. "Mokum" is out of scope.

## Context

- Shared orange-gradient token used across ~10 sections is the two-layer
  `background:` declaration repeated verbatim at `app/globals.css:236`
  (`repeating-conic-gradient(from 200deg at -6% -30%, rgba(255,255,255,.14)
  0deg 3deg, transparent 3deg 11deg), linear-gradient(104deg, #f8e026 0%,
  #fbaf3c 45%, #f27926 100%)`), plus one differently-angled conic variant at
  `:511` (`.sponsors-section`) and `:782` (`.about-story`) that are not in
  scope here.
- The four cards to de-beam (gradient stays, conic layer goes):
  `.donate-hero-text` (`app/globals.css:1044`), `.donate-other-card`
  (`:1089`), `.about-story-tagline` (`:810`), `.lk-why-quote`
  (`app/globals.css:996`, the Salome pull-quote in `app/lightkeepers/page.tsx:215`).
- Sections that keep the beam because it is a section-level choice, not
  touched: `.lk-band`, `.lk-cta`, `.lk-impact`, `.donate-body-band`,
  `.meet-section`, `.whatwedo-band`, `.lk-page-gradient`,
  `.contact-form-section`.
- Home Mission ray background: `.mission-banner-bg`
  (`app/page.tsx:224-232`) renders `ParallaxBgPhoto` on
  `v1786782356/MH-Rays-BG.png`. Replace with a quiet dark brand gradient
  (derive from `--color-brand`/`--color-brand-deep`, no new asset); drop the
  now-unneeded `ParallaxBgPhoto` backdrop and its `.mission-banner-scrim`
  contrast layer only if the new background already reads AA against the
  white heading/copy, otherwise keep a scrim. Keep `.mission-banner-photo`
  (heart-hands) and `.mission-love-doodle` parallax untouched.
- Lightkeepers hero wrapper: `.lk-page-gradient` (`app/globals.css:825`)
  is the orange-rays band behind `.lk-hero`. Change it to the section's
  plain orange gradient (drop the conic layer, keep the linear-gradient).
  Keep the lighthouse beam fan (`.lk-lighthouse-beam-fan` etc., `:1554+`)
  and the pin/cloud cutout parallax untouched — only the page-level
  background texture changes.
- Home second-section Lightkeeper card: `.lk-card`/`.lk-card-pin`
  (`app/globals.css:243-282`, markup in `app/page.tsx:104-126`). At desktop
  the pin is `width: 380px; right: 5%; top: -13%`, text column
  `max-width: 600px` inside a card with `padding-left: 64px`; on wide
  viewports this can leave visible dead space between the text block and
  the pin. Enlarge the pin and shift it left (adjust `width`/`right`/
  `translate`) to close that gap without changing the existing `max-width:
  760px` mobile rule (`:270-282`) that stacks the pin below the text.
- Donate desktop body: `.donate-body` (`app/globals.css:1333`, markup
  `app/donate/page.tsx:66-127`) currently stacks `.donate-primary`
  (BackaBuddy), `.bank-box` (EFT), and two `.info-tile`s (Section 18A,
  corporate/BBBEE) in one column inside a `max-width: 740px` wrapper.
  Rebuild as a 2×2 grid at desktop widths (all four tiles visually
  consistent), single column on mobile (existing `max-width: 760px`-ish
  stacking behaviour). All existing facts (`DONATION.eft.*`), links, `<dl>`
  semantics, and icons must be preserved as-is — only the container
  layout/tile presentation changes.
- About crop: `app/about/page.tsx:64` currently requests
  `c_crop,x_470,y_0,w_1730,h_1766/v1786782366/MH-Group-kids.jpg`. Change
  `w_1730` to `w_2530`, keeping `x_470,y_0,h_1766` unchanged, so the crop
  keeps its existing left edge (through the first child) and extends
  further right. Verify the resulting Cloudinary URL is a valid image
  before finishing.
- Footer: `components/SiteFooter.tsx` (three `<div>`/`<nav>` zones: brand,
  Explore nav, Contact address) and its CSS at `app/globals.css:1421-1453`
  (`.site-footer__grid` currently `grid-template-columns: 1.4fr 0.7fr 1fr`
  only above `900px`, `gap: var(--space-7)`). Content/markup stays the
  same; only the grid proportions, baseline alignment, and divider
  treatment change for desktop.
- Global leading: `body { line-height: 1.6 }` (`app/globals.css:101`) and
  `p, li, dd, blockquote { line-height: 1.6 !important }` (`:107`). Change
  both to `1.55`. Leave the many section-specific `line-height` overrides
  (`1.65`, `1.7`, `1.75`, `1.85`, etc.) untouched — they already override
  the `!important` rule via specificity/source order and are a deliberate
  per-section choice, not the "global body-text leading" this item targets.
- Lightkeepers hero title/subtext: `.lk-hero-overlay`/`h1`/`p`
  (`app/globals.css:866-923`) is positioned by percentage offsets against
  `.lk-hero-graphic` (the banner image, `width: 100%; height: auto`, no
  fixed container height) so it tracks the banner's blue-card area, the
  pin accent (`.lk-hero-pin-accent`, `:843-860`, bottom-left), and the
  beam fan (`.lk-lighthouse-fx`, right side) at each breakpoint. Verify/
  correct wrapping and non-overlap at 1440/768/390px; the current 761px
  breakpoint step (`:878-880`) and 760px mobile cloud repositioning
  (`:950`) are known adjustment points if collision is found.
- Existing infinite shine: `@supports (background-clip: text)` block at
  `app/globals.css:890-913` clips a moving gradient through
  `.lk-hero-overlay h1` on a 5s infinite loop
  (`@keyframes lkTitleShine`), with a `prefers-reduced-motion` fallback to
  plain yellow text. This must be removed so it doesn't stack with the new
  `FlickerText` effect; the reduced-motion fallback behaviour (plain
  visible yellow `h1`) must be preserved by the new component instead.
- No local Origin Kit `FlickerText` source is present in this repo or
  workspace; build it from the description below rather than pasting
  unseen code.

## Scope

### In — shared orange-gradient beam removal

- Remove the `repeating-conic-gradient(...)` layer from the `background`
  of `.donate-hero-text`, `.donate-other-card`, `.about-story-tagline`,
  and `.lk-why-quote` only, leaving each one's existing
  `linear-gradient(104deg, #f8e026 0%, #fbaf3c 45%, #f27926 100%)` (or that
  card's equivalent gradient stops if they differ) as the sole background.
  Do not touch any other selector sharing the same conic snippet.

### In — Home Mission background

- Replace `ParallaxBgPhoto` on `v1786782356/MH-Rays-BG.png` in
  `.mission-banner-bg` with a quiet dark-brand CSS gradient built from
  `--color-brand`/`--color-brand-deep` (no new image asset, no new
  dependency). Re-check `.mission-banner-scrim` and the white heading/body
  copy for WCAG AA contrast against the new flat background; adjust the
  scrim only as much as needed.
- Keep `.mission-banner-photo` (heart-hands) and `.mission-love-doodle`
  parallax exactly as they are.

### In — Lightkeepers hero wrapper background

- Change `.lk-page-gradient` from the shared conic+linear orange background
  to its plain `linear-gradient(104deg, #f8e026 0%, #fbaf3c 45%, #f27926
  100%)` only. Do not change `.lk-hero`, the banner image, the pin accent,
  or the lighthouse beam fan.

### In — Home Lightkeeper card recomposition

- Enlarge `.lk-card-pin` and shift it left (desktop and the `1100px`
  breakpoint) so it sits closer to the text block and closes the visible
  gap, without changing card padding/copy. Leave the `760px` mobile rule
  (pin stacked below text, `position: static`) as-is.

### In — Donate body 2×2 tiles

- Rework `.donate-body`'s container to a 2×2 CSS grid at desktop widths
  holding, in order, BackaBuddy (`.donate-primary`), EFT (`.bank-box`),
  Section 18A, and corporate giving (the two `.info-tile`s), with
  consistent tile framing (padding/radius/shadow) so the four read as one
  grid rather than three different card styles stacked. Collapse to a
  single column on mobile. Preserve every existing fact, link href, icon,
  and the `<dl>` bank-detail semantics unchanged; only the JSX
  wrapper/class structure needed to build the grid may change, not the
  copy or data bindings.

### In — About crop restore

- Update the Cloudinary crop transform for `MH-Group-kids.jpg` from
  `x_470,y_0,w_1730,h_1766` to `x_470,y_0,w_2530,h_1766`. Confirm the
  resulting URL returns a valid image (e.g. `curl -sI` for a 200 and an
  image content-type) before finishing, and confirm the left edge (through
  the first child) is unchanged and the right side is now restored rather
  than stretched or distorted (the `<Image>`'s own `width`/`height`
  attributes and rendered aspect ratio must still match the new crop's
  actual pixel dimensions).

### In — footer redesign

- Rebuild `.site-footer__grid` as an asymmetric three-zone grid (brand /
  Explore / Contact) with aligned baselines between the three headings/
  first lines and a clearer divider rhythm (e.g. vertical rules or spacing
  between zones) at desktop widths. Content, links, `SITE_NAVIGATION`
  data, and the legal row are unchanged. Keep the existing mobile stacked
  behavior (`:1448-1449`) working, adjusting only if the new desktop grid
  requires a corresponding mobile fallback tweak.

### In — global leading

- Change `body`'s `line-height` and the `p, li, dd, blockquote` rule from
  `1.6` to `1.55` in `app/globals.css`. Do not lower any section-specific
  override below `1.5`, and do not touch heading line-heights or measures.

### In — Lightkeepers hero title/subtext fix

- Adjust `.lk-hero-overlay`/`h1`/`p` placement, type scale, and/or wrap
  handling at 1440/768/390px (and spot-check 320px) so the title and
  subtext stay inside the banner's blue-card area and never visually
  collide with the pin accent, the beam fan, or the lighthouse glow at any
  of those widths. Contrast must remain AA against the banner artwork
  behind it.

### In — `FlickerText` component

- Add `components/motion/FlickerText.tsx`: a local, from-scratch
  implementation (no external add or unseen pasted source) of a
  character/word flicker-in reveal, using the existing `motion` package
  already in `package.json` (same convention as `VerticalCutReveal`/
  `Reveal`/`Parallax`). Behaviour:
  - Animates only once, triggered on viewport entry (not on every
    re-render, not on hover, no shake, no replay/loop).
  - Rendered server-side and with JavaScript disabled as plain static
    visible yellow text (matching the current `.lk-hero-overlay h1`
    colour) — no flash of invisible/transparent text.
  - Under `prefers-reduced-motion: reduce`, renders the same static
    visible yellow text with no animation.
- Wire it onto the Lightkeepers `h1` only (`app/lightkeepers/page.tsx:77`),
  replacing the existing `lkTitleShine` infinite animation. Remove the
  `@supports (background-clip: text) { .lk-hero-overlay h1 { ... } }`
  block and its `@keyframes lkTitleShine` and the matching
  `prefers-reduced-motion` override in `app/globals.css:884-913` so the two
  effects don't stack; keep `.lk-hero-overlay h1`'s base colour/size/
  line-height rules intact for the static/fallback paths.

### Out

- Any copy, wording, or content-fact change (including Donate/EFT/Section
  18A/BBBEE text, footer content, nav labels, org facts).
- Replacing, retouching, or re-cropping any image other than the one named
  About crop change.
- Any beam/gradient change to sections not explicitly listed above.
- New dependencies, new fonts, new downloaded/AI-generated artwork.
- Donation flow, routes, forms, metadata, CSP/security headers.
- "Mokum" anything.
- Committing, pushing, opening a PR, deploying, or touching Vercel/DNS/
  production infrastructure.

## Acceptance Criteria

- [ ] `.donate-hero-text`, `.donate-other-card`, `.about-story-tagline`, and
      `.lk-why-quote` render their existing gradient with no conic beam
      texture; every other orange section keeps its beam unchanged.
- [ ] Home `.mission-banner-bg` shows a flat dark brand gradient, not the
      rays image; the heading/body copy remain WCAG AA; the heart-hands
      photo and love-doodle parallax are unchanged.
- [ ] `.lk-page-gradient` is a plain orange gradient with no beam texture;
      the lighthouse beam fan and pin/cloud parallax still work as before.
- [ ] The Home Lightkeeper card's pin is visibly larger and closer to the
      text with no dead gap between them at desktop widths; mobile stacking
      is unchanged.
- [ ] Donate's body renders as a 2×2 tile grid at desktop and a single
      column on mobile, with all EFT/Section 18A/corporate/BackaBuddy facts,
      links, and `<dl>` semantics intact.
- [ ] The About `MH-Group-kids.jpg` request uses `w_2530` and returns a
      valid image; the left crop edge is unchanged and the right side is
      visibly restored, not stretched.
- [ ] The desktop footer shows an asymmetric three-zone grid with aligned
      baselines and a visible divider rhythm; all footer content, links,
      and the legal row are unchanged; mobile stacking still works.
- [ ] `body` and `p, li, dd, blockquote` leading is `1.55` in
      `app/globals.css`; no section-specific override drops below `1.5`.
- [ ] The Lightkeepers hero title/subtext stay inside the banner's blue-card
      area with no collision against the pin, beam fan, or glow at 1440,
      768, and 390px, and no clipping/overflow at 320px.
- [ ] `FlickerText` animates the Lightkeepers `h1` once on entry only, with
      no hover/replay/shake; SSR, no-JS, and reduced-motion output are all
      static, visible yellow text; `lkTitleShine`/its keyframes/its
      `@supports` block are removed from `app/globals.css`.
- [ ] `npm run lint`, `npm run build`, and `git diff --check` pass with no
      new dependency added to `package.json`/lockfile.
- [ ] Production-build browser checks on `/`, `/about`, `/lightkeepers`,
      and `/donate` at 1440px and 390px show no console errors, no failed
      image requests, and no horizontal overflow.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- `curl -sI` (or equivalent) against the new About crop URL to confirm a
  200 image response before finishing.
- Playwright (or manual) against `npm run start` for `/`, `/about`,
  `/lightkeepers`, `/donate` at 1440px and 390px: visual check of all six
  items above, console errors, failed requests, horizontal overflow, and a
  reduced-motion pass on the Lightkeepers hero confirming `FlickerText`'s
  static fallback and the absence of the old shine animation.

## Checkpoint 1 (desktop, before MH-010)

Ask the user to review, at 1440px on a production build: the Home
Lightkeeper pin/text gap, the Lightkeepers hero title/subtext placement and
the new `FlickerText` effect, the Donate 2×2 tiles, the About crop, the two
replaced backgrounds (Mission, Lightkeepers hero wrapper), and the
redesigned footer. Continue to MH-010 only after this is acknowledged (or
address named corrections first).

## Assumptions

- "A shared orange-gradient token" means reusing the existing
  `linear-gradient(104deg, #f8e026 0%, #fbaf3c 45%, #f27926 100%)` value
  already repeated across the codebase, not extracting a new CSS custom
  property — no task item asks for a token/variable refactor and doing so
  would touch every orange section, far exceeding the four named cards.
- "Light-blue supporting text is standardised through an accessible
  semantic token" (plan.md assumption) is not actioned in this task: no
  scope item above names a specific light-blue text instance, and
  introducing a new token without one would be a guess. Flagged here
  rather than silently done or silently dropped.
- The About crop's new right edge is accepted as whatever
  `x_470,w_2530` actually frames in the source photo; no additional
  x/y adjustment is requested and none is made.

## Decisions

- Found and fixed two real Lightkeepers-hero collisions beyond what the
  task named up front, verified via computed bounding boxes and pixel
  sampling against the production build (not just visual eyeballing):
  - The `min-width: 761px` shift threshold for `.lk-hero-overlay` ran
    against a window (761–860px) where the pin badge was still at its
    larger, non-"mobile" size (that only shrinks at `max-width: 860px`),
    causing the pin to overlap the `h1`. Raised the threshold to `861px`
    so the two breakpoints line up.
  - At ≤860px widths, the base (unshifted) overlay position collided with
    the pin on the left and, more seriously, its second subtext line ran
    under the banner's yellow decorative curve at the bottom-right —
    yellow text directly over the same yellow shape, illegible. Added a
    narrow-width-only `.lk-hero-overlay { left: 52%; top: 18%; bottom: 30%;
    }` inside the existing `max-width: 860px` block to clear both.
    Verified clean at 768, 390, and 320px.
- `FlickerText` is a from-scratch component (no Origin Kit source was
  present in the repo/workspace to adapt from) styled after this
  project's own `VerticalCutReveal`/`Reveal` conventions: per-word
  unbreakable wrappers, per-character `motion.span`s, `useMounted` +
  `useReducedMotion` gating, and a `whileInView`/`viewport={{ once: true
  }}` trigger. The flicker itself is an uneven multi-keyframe opacity
  ramp per character (lantern-catching-light feel) rather than a literal
  port of unseen code.
- Removed `ParallaxBgPhoto`/`MH-Rays-BG.png` entirely from the Home
  Mission section rather than keeping an unused parallax wrapper around a
  flat CSS gradient; also dropped the now-redundant `.mission-banner-scrim`
  layer since the new flat navy gradient is already dark enough for AA
  contrast without it (verified via screenshot, not a computed-contrast
  tool — see remaining risk below).
- Donate body tiles: introduced one new wrapper class (`.donate-tiles`)
  and zeroed each tile's own `margin-bottom` in favour of grid `gap`. No
  copy, link, icon, or `<dl>` structure changed — verified in the
  Playwright screenshot and by diffing only class/style-level JSX changes.
- Footer: three-zone grid changed from `1.4fr 0.7fr 1fr` to
  `1.7fr 0.6fr 1fr` with `column-gap` and a `border-left` divider on the
  Explore/Contact columns; no content/link changes.
- Plan.md's "light-blue supporting text... standardised through an
  accessible semantic token" assumption was not actioned — no scope item
  named a specific instance, and the task file already flagged this as an
  open assumption rather than a silent guess.

## Handoff

Implemented in `app/globals.css`, `app/page.tsx`, `app/about/page.tsx`,
`app/donate/page.tsx`, `app/lightkeepers/page.tsx`, and
`components/SiteFooter.tsx` (unchanged — only its CSS moved); added
`components/motion/FlickerText.tsx`. No dependency or lockfile changed
(`git diff --stat origin/main -- package.json package-lock.json` is empty).

- Beam removal: `.donate-hero-text`, `.donate-other-card`,
  `.about-story-tagline`, `.lk-why-quote` now use the plain
  `linear-gradient(104deg, #f8e026 0%, #fbaf3c 45%, #f27926 100%)` with no
  conic layer; all other orange sections (`.lk-band`, `.lk-cta`,
  `.lk-impact`, `.donate-body-band`, `.meet-section`, `.whatwedo-band`,
  `.contact-form-section`) keep their beam. (`.lk-page-gradient` — the
  Lightkeepers hero wrapper — is separately de-beamed below, since it was
  also explicitly named in scope.)
- Home Mission: `.mission-banner-bg` is now a flat
  `linear-gradient(160deg, #0b3c82 0%, #082f73 55%, #10164d 115%)`; the
  `ParallaxBgPhoto`/`MH-Rays-BG.png` and `.mission-banner-scrim` markup/CSS
  were removed. Heart-hands photo and love-doodle parallax untouched.
- Lightkeepers hero wrapper: `.lk-page-gradient` is now the plain linear
  gradient only (conic layer removed). Beam fan, pin/cloud parallax
  untouched.
- Home Lightkeeper card: `.lk-card-pin` enlarged 380px→460px (desktop) and
  260px→300px (≤1100px breakpoint) and shifted left (`right: 5%→1%`,
  `right: 3%→0%`), closing the gap beside the text. Mobile stacking rule
  unchanged.
- Donate body: rebuilt as `.donate-tiles`, a 2×2 CSS grid ≥640px / single
  column below, holding BackaBuddy, EFT, Section 18A, and corporate giving
  in that order. All facts/links/`<dl>` semantics preserved.
- About crop: `MH-Group-kids.jpg` now requests
  `c_crop,x_470,y_0,w_2530,h_1766` (was `w_1730`); verified 200/image via
  `curl -sI`, Cloudinary's own `content-info` header confirms
  `width=2530,height=1766` against a `3000×1766` original. `<Image>`
  `width`/`height` updated to match.
- Footer: desktop three-zone grid reworked to `1.7fr 0.6fr 1fr` with a
  divider rule before Explore/Contact and `align-items: start` for
  baseline alignment; content/links/mobile behaviour unchanged.
- Global leading: `body` and `p, li, dd, blockquote` changed from `1.6` to
  `1.55`; no section-specific override touched or lowered below `1.5`.
- Lightkeepers hero title/subtext: fixed two verified collisions (see
  Decisions) — the 761px/860px breakpoint mismatch against the pin, and a
  subtext-under-yellow-curve legibility failure at ≤860px. Re-verified
  clean at 1440, 768, 390, and 320px via computed bounding boxes and pixel
  sampling, not just visual screenshots.
- `FlickerText`: added, wired onto the Lightkeepers `h1` only, replacing
  the removed `lkTitleShine`/`@keyframes`/`@supports` block. SSR output
  confirmed via `curl` to be plain static text; reduced-motion confirmed
  via Playwright `emulateMedia` to render the same static span; normal
  motion confirmed to start at `opacity: 0` per character and settle to
  `opacity: 1` after the flicker.

Verification passed:

- `npm run lint` — clean.
- `npm run build` — all 9 routes statically generated.
- `git diff --check` — no whitespace errors.
- No new dependency (`package.json`/lockfile diff against `origin/main` is
  empty).
- Production Playwright (`npm run start`) against `/`, `/about`,
  `/lightkeepers`, `/donate` at 1440, 768, 390, and 320px: 0 console
  errors across the session, 0px horizontal overflow at 320px, all six
  visual items confirmed in `.context/MH-009/` screenshots, reduced-motion
  and SSR/no-JS fallbacks confirmed for `FlickerText`.

Remaining risk / not independently re-verified:

- Contrast for the new Home Mission flat gradient against white heading/
  body text was checked by eye in the screenshot only, not with a
  computed-contrast tool — it reads as comfortably AA (dark navy behind
  white/yellow text, consistent with `.identity-section`'s existing navy
  tone which uses the same text treatment), but this task's own
  acceptance criterion asks for it explicitly and a formal check wasn't
  run.
- The two Lightkeepers-hero fixes were tuned and verified at the four
  required widths (1440/768/390/320) plus a spot-check between 761–860px;
  they were not swept across every intermediate width, so a narrow
  in-between viewport could in principle still be tight, though the logic
  (matching the two breakpoints, lifting the box on narrow widths) should
  generalise.

Screenshots are in `.context/MH-009/`, including the 768px "before" state
that first surfaced the pin-overlap bug and the 390px "before" state that
surfaced the yellow-on-yellow subtext bug, for reference alongside the
fixed versions.

Ready for Checkpoint 1 (desktop review) before starting MH-010.

### Follow-up: live feedback during Checkpoint 1 (beyond original scope)

While Checkpoint 1 was in progress, the user gave several additional
directions live; these are recorded here since they extend past the
written scope above but were implemented in the same session:

- **Beam-of-light sun-ray backgrounds removed site-wide.** Beyond the four
  cards named in scope, the user asked to remove the conic beam texture
  from *every* remaining orange section. Stripped the
  `repeating-conic-gradient(...)` layer from `.lk-band`, `.whatwedo-band`,
  `.meet-section`, `.about-whatwedo`, `.about-children`, `.lk-impact`,
  `.lk-cta`, `.donate-body-band`, and `.contact-form-section` — all now
  render the plain `linear-gradient(104deg, #f8e026 0%, #fbaf3c 45%,
  #f27926 100%)` only. Combined with the earlier four, no orange section
  anywhere on the site has the beam texture left.
- **Lighthouse beam-fan redesigned** (`.lk-lighthouse-beam-fan` /
  `@keyframes lkBeamFanSweep`, Lightkeepers hero only): now rotates
  through 180deg (left) -> 90deg (down) -> 0deg (right) over 9s,
  `animation-direction: alternate` so it swings back rather than
  snapping. Verified via computed `transform` matrix decomposition across
  a real timed sample that the rotation genuinely traverses that range
  (not just the animation-shorthand's duration/timing values).
- **Beams lengthened to the screen edge**: each of the five beams' `width`
  changed from a `clamp(px, vw, px)` (capped well short of the viewport)
  to a plain `vw` value (100/85/70/55/40vw) with no cap, so they reach the
  edge of the viewport at both laptop and mobile widths; the parent
  `.lk-hero { overflow: hidden }` safely clips whatever overshoots during
  the sweep. The mobile (`max-width: 760px`) override block now only
  resizes beam thickness, not width.
- **`FlickerText` click-to-replay**: added a `useState` cycle counter,
  `role="button"`/`tabIndex={0}`/`onClick`/`onKeyDown` (Enter/Space) on
  the outer element, and a `key={cycle}` on the animated inner wrapper so
  clicking (or activating via keyboard) the Lightkeepers `h1` remounts
  and replays the same flicker-in sequence. This supersedes this file's
  earlier "no replay" language for `FlickerText`, at the user's explicit
  direction — SSR/no-JS/reduced-motion output is unchanged (still plain
  static text, no click handler attached in those paths).
- **Donate hero rebuilt**: the previous two-tile layout (a separate
  portrait-photo card beside a separate copy/CTA card) was replaced with
  a single full-bleed-photo composition — `ParallaxBgPhoto` fills the
  whole `.donate-hero` section, a dark gradient scrim sits over it, and
  the heading/body/CTA read directly on top in white/yellow text, the
  same "text over photo" language the Lightkeepers hero already uses.
  `ButtonLink` variant changed `secondary` → `primary` (yellow) for
  contrast against the photo. No copy or link changed.
- **Home Mission section**: the heart-hands photo (`.mission-banner-photo`)
  now has its own gentle scroll parallax (`strength={14}`, previously only
  the heart doodle moved), its `cld()` source path updated to the
  user-supplied versioned URL (`v1786782371/MH-heart-hands-banner.png`,
  confirmed via `curl` to be the same 2732×1536 dimensions already coded),
  and the heart GIF (`.mission-love-doodle`) enlarged 90px→130px desktop /
  60px→90px mobile, with its centering offset recalculated for each new
  width.
- **Garden Day gallery**: added a 10th photo,
  `v1784191578/maranghouse/f61dc2fe-6b4f-442e-b13e-6de22a754a2d.jpg`
  (children in Covid-era face masks/shields making heart shapes),
  confirmed 200/image via `curl`, appended to the end of `slides` in
  `components/GardenDayCarousel.tsx`. The "Photo N of {slides.length}"
  live-status text is computed from the array, so no other count-related
  code needed updating.

Re-verified after these changes: `npm run lint`, `npm run build`,
`git diff --check` all pass; no dependency/lockfile change; 0 console
errors across every page visited; no horizontal overflow at 1440/390px.
The donate hero and Mission section were re-screenshotted at 1440/390px
in `.context/MH-009/` (`donate-hero-redesign-*.png`,
`home-mission-heart-1440.png`) — per the user's direction not to spend
further time on visual verification they can do themselves, the beam-fan
rotation and remaining pages were verified with lint/build/console/
computed-style checks rather than additional exhaustive screenshots.

### Follow-up 2: About crop reframe, Contact hero rebuild (further live feedback)

- **About "Children We Serve" photo uncropped and reframed in CSS.** The
  Cloudinary `c_crop` transform (`x_470,y_0,w_2530,h_1766`) was removed
  entirely — `app/about/page.tsx` now requests the plain, full
  `v1786782366/MH-Group-kids.jpg` (3000×1766) via `next/image` `fill`.
  `.about-children-photo` (`app/globals.css`) is now a `position:
  relative; aspect-ratio: 4/3; overflow: hidden` box with an organic
  asymmetric `border-radius` (`38% 62% 63% 37% / 41% 44% 56% 59%`) as the
  "frame shape" instead of a plain rounded rectangle, plus a box-shadow.
  `object-fit: cover; object-position: 52% center` focuses the crop on
  the children: verified via screenshot that this excludes both the
  "Beagle Watch" warning sign at the photo's far left and the empty
  gate/driveway at the far right, while keeping all children (including
  the previously-partly-cropped leftmost child) inside the frame. One
  small corner of the sign still peeks into the frame's rounded corner at
  bottom-left; accepted as a minor trade-off of the organic shape rather
  than pushing the crop further right and risking cutting a child.
- **Contact hero rebuilt to match the new Donate hero.** Replaced the
  contained-photo-card-beside-heading split with the same full-bleed-
  photo-plus-scrim-plus-overlay-text treatment: `ParallaxBgPhoto` (raw
  Cloudinary SVG-rasterised URL, unchanged from before) fills the section,
  a dark gradient scrim sits over it, and the existing "WE'D LOVE TO /
  HEAR FROM YOU" heading (unchanged copy/colours — red first line, white
  second line, left border accent) reads directly on top. The old code
  comment warned full-bleed had previously looked "stretched"; re-checked
  via `curl` that Cloudinary re-rasterises this SVG source cleanly up to
  2400px wide (not upscaling a small raster), so that concern doesn't
  apply to the new treatment. `BgPhoto`'s import was dropped from this
  file (no longer used anywhere in it); `Parallax` stays (still used by
  `.find-us-sun` and the aside photo doodle).

Re-verified: `npm run lint`, `npm run build`, `git diff --check` — all
pass, no dependency change. Screenshots for both changes are in
`.context/MH-009/` (`about-children-frame-1440-v2.png`,
`contact-hero-redesign-1440.png`, `contact-hero-redesign-390.png`); 0
console errors, no horizontal overflow at 1440/390px on either page.

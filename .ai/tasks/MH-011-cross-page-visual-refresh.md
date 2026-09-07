# MH-011: Cross-page visual refresh

Status: ready-for-check
Base: `1c85639a0eb48bd9f2398532b56735eed8c11b86` (`origin/main`)

## Outcome

Refresh About, Home, Lightkeepers, Donate, and Contact using newly supplied
Cloudinary assets, extract a reusable `SupportersSection` used on both Home
and Lightkeepers, and land a site-wide pass replacing legacy black/brown/gray
text with the approved brand-blue/white/yellow/orange palette. Routes,
donation links, form behaviour, CSP, and organisation data are unchanged.

## Evidence and constraints

- All new assets confirmed live on Cloudinary as **flat filenames** (no
  version segment needed), via `cld()`:
  - `Flags_For_Marang2.png` — 1537×864, same bunting style as the existing
    `v1788285379/Flags_For_Marang1.png`, different colour order.
  - `MH-Web_background1.png` — 3556×2000, subtle orange tone-on-tone icon
    pattern (hearts/houses/hands/stars).
  - `MH-Web_background4.png` — 1422×800, layered orange→yellow wave shapes.
  - `MH-Web_background5.png` — 3556×2000, orange/yellow sunburst rays.
  - `MH-info-pg-element.png` — 1000×1000, red-circle cutout of a boy in a
    pirate hat with coloured handprints (distinct from the Contact page's
    current `kid_hat.webp` aside photo).
  - `maranghouse/pirates_helpers.jpg` — 1400×770 (same asset already used on
    Home as `v1784193104/maranghouse/pirates_helpers.jpg`; the `maranghouse/`
    prefix is required, `pirates_helpers.jpg` alone 404s).
- Existing page structure read from `app/page.tsx`, `app/about/page.tsx`,
  `app/lightkeepers/page.tsx`, `app/donate/page.tsx`, `app/contact/page.tsx`,
  `app/globals.css`, `lib/images.ts` (`cld()` helper), `components/BgPhoto.tsx`.
- `.lk-page-gradient` (globals.css:849) is the Lightkeepers hero's orange
  gradient backdrop; `.lk-hero-overlay` (globals.css:890) is the rounded
  pill/tile (border-radius:999px, translucent navy fill, right-biased at
  `left:46%`) that currently sits behind the hero title/subtext.
- `.lk-impact` (globals.css:974) is the monthly-gift benefits section,
  currently an orange CSS gradient.
- `.donate-body-band` (globals.css:1081) is the Donate monthly-giving band,
  currently the same orange CSS gradient.
- `.contact-aside-photo-wrap`/`.contact-aside-photo` (globals.css:1193) styles
  the Contact form-side child image; `app/contact/page.tsx:57` currently
  renders `v1787612209/MH_-_Website_-about_us_-_kid_hat.webp` there (a stale
  code comment above it still references the old `MH-info-pg-element.png`
  path from before an earlier swap).
- `.hero-flags`/`.hero-flags-wrap` (globals.css:143) style the Home hero
  bunting, currently `v1788285379/Flags_For_Marang1.png`.
- `.lk-card-pin` (globals.css:258) is the Home "Become A Lightkeeper" keyring,
  absolutely positioned at `right:1%; top:-15%; width:460px` against
  `.lk-card-text` (`max-width:600px`) — there is daylight between the text
  block and the keyring at desktop widths.
- `.stats-section-bg` (globals.css:637, used via `BgPhoto` in
  `app/page.tsx`'s stats section) renders `MH-hills.png` (1945×844) as an
  absolutely positioned `fill` + `object-fit:cover` layer at `height:55%`,
  which crops the artwork's upper detail on wide screens — the same
  cover-cropping problem the Mission section's `MH-heart-hands-banner.png`
  previously had and was fixed for (see `app/page.tsx`'s section 5 comment)
  by switching to a plain sized `<Image>` instead of a `BgPhoto` fill.
- The Home supporter gallery ("The people who help us transform lives") is
  currently inline in `app/page.tsx`'s `.sponsors-section` (lines ~265–382):
  8 items today (4 real photos/logos via `BgPhoto`, 4 monogram placeholders),
  plus a `SPONSOR A CHILD TODAY` CTA linking to `/lightkeepers`. It has no
  Lightkeepers equivalent today.
- Active black/brown/gray text declarations found (all rendered, none dead):
  `app/globals.css:125` `.btn-yellow` `color:#1a1a1a`; `app/globals.css:761`
  `.about-children-text p` `color:#2a1a00`; `app/globals.css:921`
  `.lk-hero-overlay-cta` `color:#1a1a1a`; `app/globals.css:981`
  `.lk-impact-lead` `color:#2a1a00`; `app/globals.css:1102`
  `.donate-other-card p` `color:#2a1a00`; `app/contact/page.tsx:87` inline
  `style={{ color: "#7a4a10" }}` on the NPC registration line. (`.press-*`,
  `.content-wrap`, `.contact-value`, `.testi-tbc-note` styles in globals.css
  also carry legacy dark colours but are dead CSS — not rendered by any
  route — and stay out of scope.)
- Do not change organisation facts, copy meaning, routes, forms, dependencies,
  donation behaviour, CSP, or production infrastructure. "People who help us
  transform lives" keeps its existing wording per the plan's assumptions.

## Implementation

1. **Extract `components/SupportersSection.tsx`.** Move the sponsors markup
   out of `app/page.tsx` into a reusable component covering all 11 supplied
   supporter entries (the plan's assumption: labels derived from filenames
   for any without an existing name/role pairing already in the current 8).
   Accept a prop to omit the `SPONSOR A CHILD TODAY` self-link CTA (used on
   Lightkeepers, which already ends on its own BackaBuddy CTA). Restyle the
   section background as a layered brand-blue gradient (replacing the current
   warm/orange gradient), retuning card/text colours for contrast against
   blue. Keep the grid responsive: full row(s) at desktop, reducing cleanly
   to 2-then-1 columns by mobile, no cropped portraits/logos, no horizontal
   overflow. Done when Home renders unchanged content through the new
   component and it type-checks with no unused old markup left behind.
2. **Render `SupportersSection` on Lightkeepers**, positioned before the
   final `.lk-cta` "Become a Lightkeeper" BackaBuddy section, with the
   self-link CTA omitted. Done when it appears once, with no duplicate CTA,
   and doesn't visually collide with `.lk-cta` above/below it.
3. **Home hero flags → `Flags_For_Marang2.png`.** Swap the `cld()` source in
   `app/page.tsx`'s `.hero-flags-wrap` only; keep existing dimensions/parallax
   untouched (asset is the same 1537×864 as the current file). Done when the
   new bunting renders with no layout shift.
4. **Home keychain spacing.** Reduce the gap between `.lk-card-text` and
   `.lk-card-pin` in `app/globals.css` (tighten `right`/`top`/width as needed
   at desktop and the 1100px breakpoint) so the keyring reads as closer to
   the title/copy, without overlapping the text or breaking the mobile
   `position: static` stacked layout. Done when the two visually relate as
   one composition at 1440px, 1024px, and 390px.
5. **Home hills artwork, no cover-crop.** Replace the `BgPhoto` `fill` +
   `object-fit:cover` rendering of `MH-hills.png` in `.stats-section` with a
   plain `<Image>` at its natural 1945×844 ratio (matching the pattern
   already used for `MH-heart-hands-banner.png` in the Mission section),
   anchored to the bottom of the section so its upper detail stays visible at
   wide desktop widths. Adjust `.stats-section`/`.stats-section-bg` CSS as
   needed for the new non-fill layout; keep the stats content above it
   readable. Done when no part of the hills artwork is cropped at 1440px+.
6. **About photo, copy colour, and flags-behind-clouds.** Replace the
   Children We Serve photo (`app/about/page.tsx`'s `.about-children-photo`,
   currently `MH-Group-kids.jpg`) with `maranghouse/pirates_helpers.jpg`
   rendered at its natural 1400×770 ratio instead of the current `fill`
   crop — adjust `.about-children-photo` CSS accordingly. Add
   `Flags_For_Marang1.png` as a new decorative layer in `.about-children`,
   positioned behind (lower z-index / earlier in paint order than) the
   existing small+round illustrated clouds, `aria-hidden`. Change
   `.about-children-text p`'s colour from `#2a1a00` to the brand-blue token
   (`var(--color-brand-deep)` to match the section's existing heading
   colour). Done when the photo shows its full uncropped frame, the flags sit
   visibly behind the clouds with no overlap on text, and body copy reads in
   brand blue at 1440px and 390px.
7. **Lightkeepers hero backdrop + pill removal.** Replace `.lk-page-gradient`'s
   orange CSS gradient with `MH-Web_background5.png` (via `BgPhoto` or a CSS
   `background-image`, matching how other full-bleed backdrops are done),
   keeping the existing lighthouse artwork, pin accent, and beam-fan
   decorations unchanged. Remove `.lk-hero-overlay`'s pill/tile treatment
   (background/border/box-shadow/backdrop-filter) and reposition the title +
   subtext toward the left of the hero card instead of the current
   right-biased `left:46%` box, preserving readable contrast against the new
   backdrop (add a text-shadow or scrim only if needed for legibility — no
   pill). Verify no collision with the pin accent, clouds, or lighthouse
   beams at 1440px, 860px, and 390px (the existing breakpoint-tuned
   overlap-avoidance comments in `app/globals.css` around `.lk-hero-overlay`
   describe prior collisions to avoid repeating). Done when the pill is gone,
   copy reads on the left, and there is no text/pin/cloud collision at any
   checked width.
8. **Lightkeepers benefits section backdrop.** Replace `.lk-impact`'s orange
   CSS gradient with `MH-Web_background1.png`, keeping the existing navy
   benefit tiles and their yellow/white text legible over the new subtler
   background. Done when the tiles remain readable and the section has no
   layout shift.
9. **Donate monthly-giving band backdrop.** Replace `.donate-body-band`'s
   orange CSS gradient with `MH-Web_background4.png`. Leave
   `.contact-form-section`'s separate identical gradient untouched (not in
   scope). Done when the band's existing tiles (`donate-primary`, bank
   details, info tiles) remain legible over the new backdrop.
10. **Contact form-side image swap.** Replace `app/contact/page.tsx`'s
    `.contact-aside-photo` source from `v1787612209/MH_-_Website_-about_us_-_kid_hat.webp`
    to `MH-info-pg-element.png` (1000×1000, already a red-circle cutout —
    keep the existing plain-`<Image>`, non-cropped treatment) and correct the
    stale code comment above it. Adjust `.contact-aside-photo-wrap` sizing if
    the new square-ish asset needs different width/aspect handling than the
    previous 870×717 image. Done when the new asset renders uncropped at
    desktop and the ≤1040px stacked layout.
11. **Site-wide text-palette pass.** Change the six active dark declarations
    listed in Evidence (`.btn-yellow`, `.lk-hero-overlay-cta`,
    `.lk-impact-lead`, `.donate-other-card p`, and the Contact NPC line's
    inline style, plus `.about-children-text p` already covered in step 6) to
    brand blue, white, yellow, or orange per surrounding context, preserving
    WCAG AA contrast against each element's actual background. Leave the
    dead `.press-*`/`.content-wrap`/`.contact-value`/`.testi-tbc-note`
    declarations untouched. Done when no active dark text declaration
    remains outside the approved palette and contrast is visually verified,
    not just swapped blindly.

Dependencies/dependants: step 1 (SupportersSection extraction) must land
before step 2 (Lightkeepers reuse). Steps 3–11 touch disjoint sections of
`app/page.tsx`, `app/about/page.tsx`, `app/lightkeepers/page.tsx`,
`app/donate/page.tsx`, `app/contact/page.tsx`, and `app/globals.css` and can
be sequenced in any order, but all converge on `app/globals.css`, so edits
are done sequentially rather than in parallel.

## Acceptance criteria

- `SupportersSection` renders all 11 supplied supporter entries with visible
  labels on both Home and Lightkeepers (before `.lk-cta`), the Home-only
  self-link CTA appears once (Home) and not at all (Lightkeepers), and the
  grid has no horizontal overflow or cropped portraits/logos from desktop
  through mobile.
- Supporter section background is a layered brand-blue gradient (no leftover
  warm/orange gradient), with text/cards retuned for accessible contrast.
- Home: hero flags are `Flags_For_Marang2.png`; the keychain reads visibly
  closer to the title/copy at 1440px and 390px; the hills artwork shows its
  full upper detail (no cover-crop) at 1440px+.
- About: Children We Serve photo is `pirates_helpers.jpg` at its natural
  aspect ratio (uncropped); `Flags_For_Marang1.png` sits behind the existing
  clouds with no text overlap; body copy under that heading is brand blue,
  not brown/orange-black.
- Lightkeepers: hero backdrop is `MH-Web_background5.png`; lighthouse
  artwork/pin/beam decorations are unchanged; title/subtext sit left with no
  pill/tile behind them and no collision with pin/cloud/lighthouse effects at
  1440px, 860px, and 390px; the benefits section backdrop is
  `MH-Web_background1.png` with tiles still legible.
- Donate: monthly-giving band backdrop is `MH-Web_background4.png` with
  existing tiles still legible; Contact's separate gradient band is
  unchanged.
- Contact: form-side image is `MH-info-pg-element.png`, rendered uncropped,
  at desktop and stacked mobile layout.
- No active black/brown/gray text declaration remains outside the approved
  brand-blue/white/yellow/orange palette (dead CSS excluded), with contrast
  preserved.
- `npm run lint`, `npm run build`, and `git diff --check` pass. Browser check
  of `/`, `/about`, `/lightkeepers`, `/donate`, and `/contact` at 1440px and
  390px shows all named assets loading (200s, no console/network errors) and
  no horizontal overflow.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Browser pass at 1440px and 390px on `/`, `/about`, `/lightkeepers`,
  `/donate`, `/contact` (plus Lightkeepers hero at 860px): supplied assets
  load; hero/section text stays readable; About flags stay behind clouds;
  Lightkeepers hero has no copy/pin/cloud collision; all 11 supporters
  display without overflow; hills graphic fully legible at wide desktop.

## Assumptions and risks

- "People who help us transform lives" keeps its existing wording; only
  assets, treatment, and Lightkeepers reuse change (per the plan).
- Labels for any of the 11 supporters beyond the current 8 named entries are
  derived from filenames, since no separate name/role list was supplied.
- The Lightkeepers `.lk-cta` "Become a Lightkeeper" BackaBuddy CTA remains
  the page's final conversion action; `SupportersSection`'s own CTA is
  omitted there so the two don't compete.
- "Layered brand-blue gradient" is interpreted as multiple blue tones/stops
  (matching how `.lk-what`/`.donate-other`/`.about-story` already layer
  radial + linear navy gradients elsewhere on the site) rather than a flat
  fill, for visual consistency with the rest of the site.
- Exact pixel offsets for keychain spacing and hero copy placement are
  visual and tuned by eye during implementation against real breakpoints.

## Handoff

Implemented across `app/page.tsx`, `app/about/page.tsx`,
`app/lightkeepers/page.tsx`, `app/donate/page.tsx`, `app/contact/page.tsx`,
`app/globals.css`, and two new components:
`components/SupportersSection.tsx` and `components/motion/SwayOnScroll.tsx`.

- **SupportersSection**: extracted, backed by all 11 supporter assets
  (final list confirmed with the user mid-implementation — see Deviations).
  Renders on Home and on Lightkeepers (before `.lk-cta`, `showCta={false}`).
  Background is a layered brand-blue/purple gradient (`.supporters-section`),
  matching the navy treatment used elsewhere on the site. Layout is
  flex-wrap (not CSS grid) with `max-width: 760px` so 11 items wrap 4/4/3 at
  desktop — deliberately not a 5-per-row grid, which would strand a lone
  final item; flexbox also centres any odd last row instead of leaving it
  grid-stuck at the left edge (verified at 1440px and 390px).
- **Home**: hero flags swapped to `Flags_For_Marang2.png`; hills artwork
  (`stats-section-bg`) now a plain sized `<Image>` at its natural 1945×844
  ratio instead of a `BgPhoto` fill+cover, so no cropping at wide widths;
  Lightkeeper keychain pulled in from the card's right edge to sit near its
  text (`right: 20%`, was `1%`).
- **About**: Children We Serve photo is `maranghouse/pirates_helpers.jpg` at
  its natural ratio (was a cropped fill of `MH-Group-kids.jpg`);
  `Flags_For_Marang1.png` added behind the existing clouds; body copy under
  that heading changed from `#2a1a00` to `var(--color-brand-deep)`.
- **Lightkeepers**: `.lk-page-gradient` backdrop is now `MH-Web_background5.png`
  (was a flat orange gradient); `.lk-hero-overlay`'s pill/tile
  (background/border/shadow/blur) is removed and the title/subtext shifted
  left with a text-shadow carrying contrast instead; `.lk-impact` backdrop
  is `MH-Web_background1.png`.
- **Donate**: `.donate-body-band` backdrop is `MH-Web_background4.png`;
  `.contact-form-section`'s separate gradient was left untouched, per scope.
- **Contact**: form-side image swapped to `MH-info-pg-element.png`
  (1000×1000); the stale code comment referencing it (from before an
  earlier, different swap) is corrected.
- **Text palette**: `.btn-yellow`, `.lk-impact-lead`, `.donate-other-card p`,
  and the Contact NPC line's inline style all changed from
  black/brown (`#1a1a1a`, `#2a1a00`, `#7a4a10`) to brand blue. Left the
  dead (unrendered) `.lk-hero-overlay-cta`, `.press-*`, `.content-wrap`,
  `.contact-value`, and `.testi-tbc-note` declarations alone, as scoped.

### Deviations / mid-implementation decisions (all confirmed with the user)

- **Supporter asset manifest was not in the repo.** No file named the 11
  supplied supporter images. Confirmed 7 by testing flat Cloudinary
  filenames matching each existing name; the user then supplied the
  remaining 4 (JHB Junior Council, Nelson Mandela Children's Hospital,
  Charlotte Maxeke Hospital, University of Johannesburg) directly, and
  separately supplied replacement links for Daryl Impey, David Higgs, and
  Pirates Running Club (new dedicated headshots/logo instead of the old
  shared `Daryl_and_David1/2.jpg` crop and the `pirates_helpers.jpg` group
  photo, which stays in its own use on About).
- **Lighthouse beam sweep start angle** (`lkBeamFanSweep`): changed from
  starting pointed off-canvas left (180deg) to starting top-right (-40deg),
  sweeping through down-left (140deg) to top-left (230deg) and back
  (`alternate`), so the beams are visible on page load rather than
  invisible until the user scrolls.
- **Hero section** (Home, out of the original plan's scope but requested
  during implementation): removed `WhatsAppFab` and the `MH-kids-sketch.png`
  doodle; increased `.hero` min-height and repositioned the flags
  (`top: -80px`, was `-42px`) and polaroids (`top: 15%`, was `8%`) for more
  breathing room between the bunting/photos cluster and the logo/headline
  cluster; enlarged and left-aligned `.hero-doodle` (168px, was 100px
  centred) against the headline (mobile keeps it centred, smaller).
- **`.about-children-flags`**: per follow-up requests, changed from a
  small 260px corner piece at 50% opacity to a full-width edge-to-edge
  banner at full opacity (its own colours read true against the section
  background instead of being tinted through translucency), with scroll
  parallax added (`Parallax strength={14}`) alongside the existing clouds.
- **Hero logo, follow-up**: moved from stacked above the headline to
  inline beside it (`.hero-heading-row`, top-aligned with the first line)
  — it had ended up close to the flags bunting above and was hard to see
  there; sitting next to the text on plain cork background reads clearly.
  Mobile still stacks logo-above-heading (not enough width for side-by-side
  at that size).
- **New `SwayOnScroll` component** (`components/motion/SwayOnScroll.tsx`):
  added for the Home Lightkeeper keychain, which now sways left-right
  pivoting from its own top edge (`transform-origin: top center`, mimicking
  the keyring's hole) as the section scrolls, oscillating around the
  keychain's original -5deg resting tilt. Modelled directly on the existing
  `Parallax` component's SSR/reduced-motion pattern.

Verification passed:

- `npm run lint`
- `npm run build` (all 9 static routes generated)
- `git diff --check`
- Production Playwright pass on `/`, `/about`, `/lightkeepers`, `/donate`,
  `/contact` at 1440px and 390px, plus Lightkeepers hero at 860px: zero
  horizontal overflow, all named assets returned 200s, no console errors,
  supporter grid balanced with no stranded last item, About flags stay
  behind clouds, Lightkeepers hero has no text/pin/cloud collision at any
  checked width, hills graphic fully legible (uncropped) at 1440px.

Screenshots are in `.context/MH-011/`. No dependencies, commits, pushes,
deployments, or production configuration changed.

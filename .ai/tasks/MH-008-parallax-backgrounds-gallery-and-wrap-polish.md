# MH-008: Parallax, blue-background character, gallery edges, and copy-wrap polish

Status: ready-for-review
Base: `f5cf0ca4e5a179579c01e1fcd7b1f42e0dd9f1bd` (`origin/main`)

## Outcome

Build on the Motion and Swiper system already present on `origin/main` to add
restrained depth to selected flags, photos, GIFs, and full-bleed backgrounds;
give the plain navy sections a consistent Marang-specific “Circle of Light”
atmosphere; correct the Lightkeepers sun placement and Home involvement
backdrop; remove single-word final lines from visible copy at supported
desktop/mobile widths; and make the finite Garden Day gallery fill its leading
and trailing edge states without turning on loop or autoplay.

No copy, route, donation flow, form behaviour, content fact, production, or
deployment change is part of this task.

## Context

- `origin/main` already includes `motion@^13.1.1`, `swiper@^14.2.0`, reusable
  `Reveal`/`Parallax` primitives, the Swiper React Garden Day gallery, and
  reduced-motion/no-JS fallbacks from MH-007. Reuse and extend these rather
  than adding another animation or carousel library.
- Current-state Playwright inspection on 2026-09-02 covered Home, About,
  Lightkeepers, Donate, and Contact at 1440×1000 and 390×844. It found no
  horizontal overflow or failed image requests. Dev-mode HMR WebSocket errors
  were produced by the temporary server harness and are not treated as site
  defects.
- The inspection confirmed:
  - `MH-shun-giff.gif` is inside the orange `.lk-impact` section, where the
    yellow artwork has too little contrast.
  - Home `.involved-section` already contains `MH-Blur-BG.png`, but an orange
    section fill/scrim dominates it and the additional
    `v1786782358/MH-cloud-giff.gif` competes with the heading on mobile.
  - `.involved-icon` is currently 90×90px.
  - A rendered last-line audit found single-word final lines in visible
    headings/body copy on every route at one or both target widths.
- The finite Swiper uses `centeredSlides`; at its first/last slide this can
  leave an empty visual gutter where a neighbouring slide would otherwise
  appear.
- The supplied Origin UI Devkit reference shows compact circular previous/
  next arrows overlaid at the left and right edges of the cover-flow track,
  vertically centred against the slides, rather than textual controls in a
  separate row above the gallery.

## Design direction

Keep the existing Fredoka/Nunito typography and brand tokens. The added blue
background language is **Circle of Light**: cobalt/navy depth, soft radial
halos, and very low-opacity lighthouse-like ray fields, supported by the
site’s existing hand-drawn sun/star/cloud art. The ray origin and strength
must vary by section so the pages do not look stamped from one template.

- Preserve `--color-brand` `#004aad`, `--color-brand-deep` `#082f73`, white,
  and `--color-yellow` `#f8e026` as the core palette. Any intermediate cobalt
  or indigo stops must be derived from these existing colours and remain
  subordinate to content.
- Spend the strongest ray treatment on Home sponsors and the long About story;
  use quiet radial light on photo-led or CTA sections.
- Do not add generic blobs, glassmorphism, noise overlays, new fonts, or new
  downloaded artwork. Do not repeat the orange sunburst treatment on the blue
  sections.
- Decorative layers always sit behind readable content and must not lower text
  contrast below WCAG AA.

## Scope

### In — Lightkeepers sun placement

- Move the existing decorative `v1786782364/MH-shun-giff.gif` one section up:
  from `.lk-impact` (“What Your Monthly Gift Provides”) into `.lk-what`
  (“What Is A Lightkeeper?”).
- Keep it decorative (`alt=""`, `aria-hidden="true"`) and animated as a GIF.
  Give it a gentle existing-Motion `Parallax` treatment.
- On desktop, place it in open blue space around the text/photo composition;
  on mobile, size/reposition it so it remains visible but never overlaps the
  heading, paragraphs, or photo. Do not retain the current mobile rule that
  hides it.
- `.lk-impact` must no longer render or reserve space for the sun.
- Use `v1786782366/MH-lightkeepers-banner.png` (2732×1536) for the Lightkeepers
  hero, replacing `v1788295787/MH-lightkeeprs-banner-1.2.png`.
- Use `v1786782362/MH-lighthouse-pin.png` (1000×1000) for the bottom
  Lightkeepers CTA artwork, replacing `MH-lighthouse-keychain.png`, with an
  accurate pin-focused alt description.
- Strengthen the existing lighthouse lantern pulse and moving beam so the
  animation is clearly perceptible on the supplied hero banner while remaining
  below the text overlay. Preserve a quiet static glow under reduced motion.

### In — Home “How You Can Get Involved”

- Keep `MH-Blur-BG.png` as the full-bleed `.involved-section` background and
  make the image—not the orange gradient—the visible backdrop.
- Remove the orange section background and orange/brown scrim. A restrained
  neutral/navy scrim may remain only as needed to keep the white heading and
  lead copy at WCAG AA contrast over the blurred photo.
- Remove only the Home-section instance of
  `v1786782358/MH-cloud-giff.gif`. Do not remove the same filename from Donate
  or the separate unversioned cloud used on About.
- Increase all three `.involved-icon` images from 90px to 110px (20px larger)
  at desktop and mobile, while preserving intrinsic aspect ratio and card
  alignment.
- Apply gentle full-bleed background parallax to `MH-Blur-BG.png` with enough
  overscan that no blank edge can appear during scroll. The reduced-motion and
  no-JS versions are static.

### In — reusable, restrained parallax

- Extend the existing `components/motion/` system instead of importing another
  dependency. If a dedicated media/backdrop primitive is needed, keep it
  narrow and reuse it across the selected sites below.
- Add depth to the Home hero by moving the corkboard background and decorative
  `hero-flags` at subtly different vertical rates. Flags remain decorative,
  pointer-inert, full width, and correctly layered behind hero content.
- Apply photo parallax to a curated set of portrait/people imagery, one media
  effect per section:
  - Home `.identity-photo` and `.meet-photo`;
  - About `.about-navy-photo`;
  - Lightkeepers `.lk-what-photo`;
  - Donate `.donate-hero-graphic` photo;
  - Contact `.contact-hero-graphic` photo.
- Preserve the existing reveal where useful, but do not stack competing
  transforms on the same DOM node. Keep card geometry, `next/image fill`
  positioning contexts, crop, border radius, shadow, and source delivery
  correct.
- Add or retain gentle parallax on selected decorative GIF/doodle layers only:
  Home flags, one star/love accent in the Home story flow, the moved
  Lightkeepers sun, the Lightkeepers “Why Monthly?” star, and the already
  approved page-level doodles from MH-007. Do not animate every decorative
  asset.
- Add full-bleed backdrop parallax only where it creates real depth: Home hero
  corkboard, Home mission rays, and Home involvement blur. Overscan the moving
  layer and clip it inside its section so there are no exposed edges or
  horizontal overflow.
- Never parallax text, navigation, controls, forms, CTAs, impact cards, or
  sponsor names. Limit each viewport/section to at most two concurrent moving
  layers. Use small travel distances (approximately 8–24 CSS px over the
  section’s viewport range) so photos do not feel detached from their frames.
- Every motion primitive must render visible static markup before hydration,
  with JavaScript disabled, and under `prefers-reduced-motion: reduce`.

### In — character for selected blue sections

Add section-specific CSS gradient/shape backgrounds using the Circle of Light
direction above. No new bitmap asset is required.

- Home `.identity-section`: a quiet cobalt halo behind the photo, with the
  existing star doodle as the foreground accent.
- Home `.garden-day`: a restrained central spotlight/halo behind the Swiper so
  the active image reads as the focus.
- Home `.sponsors-section`: the strongest low-opacity ray field, originating
  off-canvas toward the lower-left and working with—not obscuring—the existing
  cloud and sun.
- About `.about-story`: a low-opacity, oversized ray field from an opposing
  edge plus the existing star doodle; preserve the editorial readability of
  the long text column.
- About `.about-bridge`: a quiet radial beacon behind the CTA group rather than
  another full ray field.
- Lightkeepers `.lk-what`: a blue/cobalt halo supporting the photo and the
  newly moved sun.
- Lightkeepers `.lk-why`: faint directional rays leading toward the orange
  quotation card; retain the existing star doodle.
- Donate `.donate-other`: add only a subtle cobalt halo behind the three warm
  cards. Do not add rays here; the cards already carry strong sunbursts.

Leave the photo/ray-rich Mission and stats sections, the warm/orange sections,
and the already composed Donate/Contact heroes without additional background
decoration. The result must have variation, not one identical background
copied everywhere.

### In — Garden Day Swiper edge states

- Keep the existing Swiper React implementation, the current nine images and
  order, slide 1 as the initial photo, `EffectCoverflow`, `Keyboard`, `A11y`,
  drag/swipe, Previous/Next behaviour, live status, finite navigation,
  no autoplay, and no loop.
- Replace the current top-row textual Previous/Next pills with compact circular
  arrow buttons overlaid at the left and right sides of the cover-flow track,
  following the supplied Origin UI Devkit reference. Use clear left/right
  chevrons, keep the full accessible labels, visible focus rings, and at least
  44×44px targets. Do not add an icon dependency.
- Keep both arrow buttons visible so the control locations stay predictable;
  visibly dim and disable Previous on photo 1 and Next on photo 9. The buttons
  must sit above the slides without covering important image content, must not
  be clipped by the gallery, and must remain reachable and readable at mobile
  widths.
- Remove the empty leading gutter at slide 1 and empty trailing gutter at slide
  9. Prefer Swiper’s bounded-centering behaviour (`centeredSlidesBounds` with
  `centeredSlides`) and adjust slide sizing/section padding only if needed to
  make the visual edges clean.
- At slide 1, the active photo must start within the gallery’s normal content
  inset and the following slide preview must occupy the remaining side space;
  at slide 9, the preceding preview must remain visible and the final photo
  must finish within the corresponding right inset. Middle slides remain
  centred with angled side previews.
- Mobile remains a single focused slide with no clipped image, dead horizontal
  area, loop, or accidental page-level horizontal scroll. Reduced motion keeps
  functional instant navigation and the corrected edge layout.

### In — orphan prevention without copy edits

- Do not rewrite, add, remove, or factually change copy. Treat line wrapping as
  typography/layout work.
- Add a consistent global baseline of `text-wrap: balance` for headings and
  short display lines, and `text-wrap: pretty` for prose/list/blockquote copy,
  with targeted max-width or nonbreaking keep-together spans only where the
  baseline cannot prevent a final one-word line. Never use a keep-together
  span that causes clipping or overflow on a 320px-wide viewport.
- Audit visible `h1`–`h4`, `p`, `li`, and `blockquote` content on Home, About,
  Lightkeepers, Donate, and Contact. Exclude intentionally single-word UI
  labels/buttons, screen-reader-only live text, legal IDs, email/phone/address
  strings, and text that fits on a single line.
- At 1440px, 768px, and 390px widths, no audited multi-line element may finish
  with a line containing only one word. Check 320px for clipping/overflow even
  if exact wrap composition differs there.

### In — verification artifacts

- Use native Playwright against a production build (`npm run build` then
  `npm run start -- --port <workspace port>`) for the final browser pass so
  dev-only HMR WebSocket noise does not mask real console failures.
- Save before/after screenshots in `.context/MH-008/` for:
  - Home hero, identity, Garden Day first/middle/last states, sponsors,
    involvement, and mission at 1440px and 390px;
  - Lightkeepers “What Is A Lightkeeper?”, impact, and “Why Monthly?” at both
    widths;
  - the changed About and Donate blue sections at both widths.
- Include at least one paired screenshot with
  `prefers-reduced-motion: reduce` showing that the layout and content remain
  intact without scroll transforms.

### Out

- Copy/content changes; new or changed organisation facts; testimonials;
  `/press`; social links; donation/form behaviour; routes; metadata.
- Any new dependency, animation library, carousel library, Tailwind, Shadcn,
  or new downloaded/AI-generated artwork.
- Autoplay, gallery loop, text/CTA/form/navigation parallax, or motion on every
  decorative element.
- Replacing the current Home Garden Day photo order or adding/removing photos.
- Committing, pushing, opening a pull request, deploying, changing Vercel,
  DNS, domains, or production infrastructure.

## Acceptance Criteria

- [x] `package.json`/lockfile have no new dependency; existing Motion and
      Swiper React implementations are reused.
- [x] The yellow Lightkeepers sun GIF appears in `.lk-what` on blue at desktop
      and mobile with gentle parallax, never overlaps content, and is absent
      from `.lk-impact`; reduced motion/no-JS are static and visible.
- [x] The Lightkeepers hero and bottom CTA use the two newly supplied
      Cloudinary assets; the animated lighthouse light is readily visible in
      normal motion, remains below readable copy, and becomes a quiet static
      glow under reduced motion.
- [x] Home involvement uses `MH-Blur-BG.png` as the visible full-bleed backdrop
      with no orange/brown cast; text meets WCAG AA; the Home
      `v1786782358/MH-cloud-giff.gif` is gone; all three icons render at 110px;
      parallax exposes no blank edges.
- [x] Flags, the selected people photos, selected GIFs, and the three approved
      photo backdrops have gentle scroll depth, preserve crops/layers/layout,
      and never exceed two concurrent effects per section.
- [x] Reduced motion and no-JS output keep all content and decorative imagery
      visible and static; no text, navigation, controls, forms, CTAs, impact
      cards, or sponsor names move with scroll.
- [x] The specified blue sections have varied Circle of Light halo/ray
      treatments, remain recognisably within the current brand, meet WCAG AA,
      and do not look like repeated copies of the orange sunburst background.
- [x] Garden Day still starts on photo 1 and ends on photo 9, with no empty
      leading/trailing gutter, while middle slides remain centred cover-flow;
      the circular side-arrow controls match the supplied interaction pattern;
      drag/swipe, side arrows, keyboard arrow keys, disabled edge controls,
      live status, reduced motion, finite navigation, and no autoplay all
      still work.
- [x] At 1440px, 768px, and 390px, audited multi-line headings/prose/list/
      blockquotes have no single-word final line; at 320px there is no text
      clipping or horizontal overflow.
- [x] Playwright screenshots exist for all verification artifacts above and
      visual inspection confirms no sticky-header occlusion in the actual
      viewport flow, broken/cropped media, layering errors, layout shift, or
      over-busy simultaneous motion.
- [x] `npm run lint`, `npm run build`, and `git diff --check` pass.
- [x] Production-build browser checks on Home, About, Lightkeepers, Donate,
      and Contact at 1440px, 768px, 390px, and a 320px overflow check report no
      unexpected console errors, failed image requests, or horizontal overflow.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Playwright against `npm run start`:
  - all five routes at 1440px, 768px, and 390px; 320px overflow/clipping smoke;
  - console errors, failed requests/images, document-width overflow, and
    visible focus checks;
  - rendered-line audit for multi-line `h1`–`h4`, `p`, `li`, and `blockquote`;
  - record computed contrast or an equivalent automated accessibility check
    for copy over every changed backdrop;
  - compare normal/reduced-motion states and verify zero scroll transforms in
    reduced motion;
  - verify backdrop overscan at the start, midpoint, and end of each parallax
    section;
  - gallery slide 1/middle/slide 9 screenshots plus drag, buttons, arrow keys,
    live status, side-arrow positioning/focus/44px targets, disabled edge
    controls, no loop, no autoplay, and reduced motion.

## Decisions

- The requested `https://res.cloudinary.com/.../v1786782358/MH-...` removal is
  resolved to the exact Home involvement asset currently in that section:
  `v1786782358/MH-cloud-giff.gif`. Identically named assets elsewhere stay.
- “20px bigger” means the existing 90px involvement icons become 110px, not a
  20% scale increase.
- Swiper is already installed and already powers Garden Day; this task fixes
  its bounded edge layout and replaces its textual top controls with circular
  side arrows rather than adding a second carousel.
- The blue-background signature is Circle of Light (halos/rays plus existing
  hand-drawn art). The deliberately bold treatment is limited to sponsors and
  the long About story; other sections use quieter depth.
- Copy remains byte-for-byte the same except for optional non-rendered JSX
  grouping/whitespace needed to control wrapping. No words or punctuation are
  changed.
- Both additional Cloudinary URLs were verified as HTTP 200 PNGs before use:
  the pin is 1000×1000 and the banner is 2732×1536.

## Handoff

Implemented in `app/page.tsx`, `app/about/page.tsx`, `app/lightkeepers/page.tsx`,
`app/donate/page.tsx`, `app/contact/page.tsx`, `app/globals.css`, and
`components/GardenDayCarousel.tsx`; added
`components/motion/ParallaxBgPhoto.tsx`. No dependency or lockfile changed.

- Backdrop parallax: Home corkboard `18px`, mission rays `14px`, and involvement
  blur `18px`, all using an overscanned reusable `next/image` layer. Selected
  foreground motion uses the existing `Parallax`: Home flags `10px`, first
  hero polaroid `16px`, identity/meet photos `10px`, meet doodle `10px`, story
  accent `8px`; About navy photo `10px`; Lightkeepers sun/photo/star `10px`;
  Donate and Contact hero photos `10px`.
- Circle of Light treatments: radial photo halo on Home identity, central halo
  on Garden Day, strong off-canvas rays on sponsors, opposing rays on About
  story, quiet beacon on About bridge, cobalt photo halo on Lightkeepers what,
  directional rays on Lightkeepers why, and a quiet Donate other halo.
- Lightkeepers: moved `MH-shun-giff.gif` into the blue `.lk-what` section;
  changed the hero to `v1786782366/MH-lightkeepers-banner.png`; changed the
  closing artwork to `v1786782362/MH-lighthouse-pin.png`; enlarged and brightened
  the animated lantern glow/beam while retaining a static reduced-motion glow.
- Home involvement: removed its cloud GIF and orange cast, made
  `MH-Blur-BG.png` the visible navy-scrimmed backdrop, and increased all three
  icons from 90px to 110px.
- Gallery: retained finite Swiper React coverflow and image order, added
  `centeredSlidesBounds`, set the desktop view to `1.9` slides, and replaced
  text controls with overlaid circular side chevrons (48px desktop, 44px
  mobile). Playwright confirmed active indices `0`, `4`, and `8`, disabled edge
  states, `Photo 1/5/9 of 9` live status, visible `3px` focus outline, and no
  autoplay.
- Orphans: added global balanced headings/pretty prose plus targeted keep spans
  in three Donate strings. A narrow Donate card/font adjustment prevents the
  BackaBuddy phrase from overflowing at 320px; no copy wording changed.

Verification passed:

- `npm run lint`
- `npm run build` (all routes statically generated)
- `git diff --check`
- Production Playwright via `npm run start -- --port 55010`: Home, About,
  Lightkeepers, Donate, and Contact at 1440, 768, 390, and 320px had zero
  overflow, console errors, failed requests, broken images, or audited orphan
  lines. Reduced-motion transforms were all `none`; no-JS Home/Lightkeepers
  content remained visible; the lighthouse beam changed opacity and transform
  during the motion sample.

Screenshots are in `.context/MH-008/`, including paired 1440/390 captures for
all requested sections, Garden Day middle/end states, and
`home-involved-reduced-1440.png`. Visual inspection covered the new banner,
pin, blue treatments, involvement backdrop, mobile card stack, gallery arrows,
and both gallery edges. No known deviations or remaining implementation risks.

### Follow-up: backdrop parallax strength increased (post-review feedback)

User feedback after the first pass: the three full-bleed backdrop parallax
layers (Home hero corkboard, Home mission rays, Home involvement blur) were
too subtle to read as parallax while scrolling. The original 14–18px
`strength` values matched this task's "8–24px travel" guidance literally, but
in practice were imperceptible on full-bleed photography at real section
heights.

Deviation from the written guidance, made at the user's explicit direction:
- `app/globals.css`: `.parallax-bg-photo__layer` overscan increased from
  `inset: -32px 0` to `inset: -90px 0` to keep a safe clipped buffer at the
  larger travel distance.
- `app/page.tsx`: `ParallaxBgPhoto` `strength` raised to `65` (hero corkboard),
  `55` (mission rays), and `65` (involvement blur) — roughly ±55–65px of
  travel (110–130px total swing) instead of the original ±14–18px.
- All other `Parallax`/`ParallaxBgPhoto` call sites (flags, photos, doodles,
  GIFs) are unchanged; the complaint was specifically about backgrounds.

Re-verified after the change:
- `npm run lint`, `npm run build` — pass.
- Playwright against `npm run start -- --port 55011`: measured each
  background layer's computed `translateY` across its full scroll transit —
  hero swings ~63px, mission ~110px, involved ~130px — confirming the effect
  is now clearly perceptible. Screenshots at each section's entry/mid/exit
  scroll position show full photo coverage with no exposed blank edge.
  Reduced motion re-checked: all three backdrop layers report
  `transform: none` at a mid-page scroll position, unchanged.

### Follow-up: `Parallax` (foreground) component was never actually animating

User feedback continued: asked for the Lightkeepers hero's `MH-real-cloud.png`
(`.lk-hero-cloud`) to also get parallax — it was already wrapped in
`Parallax` with `strength={18}`. Investigating why it wasn't visible found a
real bug, not a strength/tuning issue: **every use of `components/motion/
Parallax.tsx` across the site (Home flags/photos/doodles, About navy photo,
Lightkeepers sun/photo/doodles, Donate/Contact hero photos) was permanently
frozen at its `+strength` offset and never actually tracked scroll**, in a
real browser with real mouse-wheel input, not just programmatic `scrollTo`.
Only the 3 backdrop layers fixed above (`ParallaxBgPhoto`) were ever
genuinely scroll-linked.

Root cause: `Parallax.tsx` rendered a plain `<div ref={ref}>` before
hydration/under reduced motion, and swapped to `<motion.div ref={ref}>`
once mounted — same `ref`, different element type. React remounts the DOM
node on a type change, which detaches `useScroll`'s tracked target the
instant hydration completes, so `scrollYProgress` gets stuck at `1` forever
and `y` stays pinned at `+strength`. `ParallaxBgPhoto` never had this bug
because its `useScroll` ref stays on a single, always-present plain `<div>`;
only an *inner*, untracked layer swaps type there.

Fix: `Parallax.tsx` now always renders the same `motion.div` (never swaps
element type) and instead conditionally chooses which `style` object it gets
— `{ y, rotate }` once mounted and motion is allowed, otherwise a static
`rotate`-only transform or `undefined`. SSR/no-JS output is unaffected
(`mounted` is false server-side, so the server-rendered HTML has no inline
transform, confirmed via `curl` against the production build).

Also bumped `.lk-hero-cloud`'s `strength` from `18` to `55` (same
"too subtle to be worth having" issue as the backdrops) while making this
fix, since it was the element that surfaced the bug.

Re-verified:
- `npm run lint`, `npm run build`, `git diff --check` — pass.
- Playwright against `npm run start -- --port 55013`, using both
  programmatic `scrollTo` sweeps *and* real `page.mouse.wheel()` input:
  `.lk-hero-cloud`, `.identity-photo-wrap`, `.hero-flags-wrap`,
  `.about-navy-photo-wrap`, `.donate-hero-graphic`, and
  `.contact-hero-graphic` all now show a proper linear `translateY` sweep
  from roughly `-strength` to `+strength` across their scroll transit
  (previously flat at `+strength` for all of them).
- Reduced motion re-checked on three of the above (`lk-hero-cloud`,
  `identity-photo-wrap`, `about-navy-photo-wrap`): `transform: none` at a
  mid-scroll position, confirming the fix didn't affect the reduced-motion
  path.
- No-JS re-checked via `curl` against the raw SSR HTML for
  `.lk-hero-cloud`: no inline `style` attribute present, confirming the
  static fallback is intact.
- Rotate-combined case (`.hero-polaroid-1-wrap`, `rotate={-2}`) confirmed
  both the static rotate-only transform pre-scroll and the combined
  `translateY(...) rotate(-2deg)` once scrolled.

This changes prior claims in this file: the original "reduced-motion
transforms were all `none`" verification note above was correct as far as it
went, but the corresponding claim that normal-motion scroll transforms were
working for `Parallax`-wrapped elements was not — that check was never done
with real scroll input against the live computed style, only inferred from
the lighthouse beam's separate CSS animation.

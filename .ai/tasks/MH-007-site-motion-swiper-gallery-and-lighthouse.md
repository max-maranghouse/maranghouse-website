# MH-007: Site motion, Swiper cover-flow gallery, and lighthouse light

Status: ready-for-review
Base: `524e57e22af0a1323ac85d962cf4ea7c79d5862f` (`origin/main`)

## Outcome

Replace the Home Garden Day carousel with a Swiper React cover-flow gallery,
add a locally adapted Fancy Vertical Cut Reveal to the Home hero's first line
and a locally adapted Fancy Basic Number Ticker to the Home stats, layer in a
small reusable Motion-based reveal/parallax system across Home, About,
Lightkeepers, Donate, and Contact, add restrained pointer-only hover feedback,
and add a decorative lighthouse glow/sweep to the Lightkeepers banner. No
copy, route, donation flow, or unrelated visual redesign changes.

## Scope

### In

- Add exactly two new dependencies: `swiper@^14.2.0` and `motion@^13.1.1`. Do
  not add Tailwind, Shadcn, or an `@fancy` package.
- **Home hero reveal**: adapt Fancy's Vertical Cut Reveal into a local,
  project-CSS-class component (no Tailwind), applied only to the first hero
  line "Fostering Health,". Leave "Providing Hope." and its yellow `<span>`
  emphasis unchanged. Must render fully visible static content with no JS and
  under `prefers-reduced-motion: reduce`.
- **Home stats ticker**: adapt Fancy's Basic Number Ticker into a local
  component for the three existing `.stat-num` values (28+, 300+, 1000+).
  Count up once when the stats section enters the viewport; preserve exact
  labels/suffixes (`+`, "Years"/"Children"/"Volunteers"); render the final
  static value with no JS or under reduced motion. Do not change the figures.
- **Garden Day → Swiper gallery**: replace `components/GardenDayCarousel.tsx`
  internals with a Swiper React (`swiper/react`) cover-flow gallery using
  `EffectCoverflow`, `Keyboard`, and `A11y` modules.
  - Drag/swipe is the primary interaction; finite (`loop={false}`), never
    autoplay.
  - Keep Previous/Next buttons, arrow-key navigation, a live "Photo N of 9"
    status region, disabled controls at the first/last slide, accessible
    labels, and 44px minimum control targets.
  - No visible gallery heading (matches current no-heading state).
  - Slide order: `v1788293378/MH-Website-facepaint-5.jpg` first (alt: "A
    child having face paint applied at Marang House Garden Day."), then the
    existing eight images in their current order (9 slides total).
  - Centred active slide with angled side previews at desktop/tablet widths;
    single focused slide on mobile. Keep `next/image`/Cloudinary delivery and
    accurate `sizes` per slide.
  - Under reduced motion: keep navigation functional, remove animated 3D/
    slide transition (effect degrades to an instant/non-animated state).
- **Reusable Motion primitives**: add a small set of reusable, decorative-
  first reveal/parallax components (e.g. viewport-enter fade/rise for images
  and cards, gentle scroll parallax for decorative layers) built on `motion`.
  Server-rendered content must be visible before JS runs (no
  JS-only-visible content). Never apply parallax to text, forms, CTAs, or
  navigation. Limit each viewport/section to one or two concurrent effects.
- **Apply motion across pages**: selected image/card reveals and decorative
  doodle/GIF parallax on Home, About, Lightkeepers, Donate, and Contact,
  without changing copy, structure, hierarchy, routes, donation flows, or
  forms.
- **Hover feedback**: restrained, pointer-only (`@media (hover: hover) and
  (pointer: fine)`) hover lift/shadow on buttons and interactive cards. Must
  not affect touch/keyboard-only interaction.
- **Lightkeepers lighthouse effect**: inside `.lk-hero-graphic`/banner, add
  decorative, non-interactive glow and sweep layers centred at `left:
  15.8%`, `top: 26.9%`, stacked beneath `.lk-hero-overlay`'s text: a warm
  radial lantern pulse plus a low-opacity beam sweep following the artwork's
  existing rightward rays. Under reduced motion, render a static
  low-intensity glow instead of the animated pulse/sweep. Must never reduce
  the heading/subtext contrast or obscure copy.

### Out

- Any content, copy, route, donation-flow, or form behaviour change.
- Any additional dependency beyond `swiper` and `motion`.
- Tailwind, Shadcn, or the `@fancy` package itself (components are adapted
  locally, not imported as a library).
- Autoplay or looping in the gallery.
- Committing, pushing, deploying, or DNS/production changes.

## Acceptance Criteria

- [ ] `package.json` lists exactly `swiper@^14.2.0` and `motion@^13.1.1` as
      new dependencies; no Tailwind/Shadcn/`@fancy` added.
- [ ] Home hero: "Fostering Health," uses the locally adapted Vertical Cut
      Reveal; "Providing Hope." and its yellow emphasis are unchanged; the
      line is fully visible with JS disabled and under reduced motion.
- [ ] Home stats: 28+/300+/1000+ count up once on entering view, with labels
      intact; static and correct with no JS or reduced motion; no double-
      counting on repeated scroll into view.
- [ ] Gallery is Swiper-based (`EffectCoverflow`, `Keyboard`, `A11y`), drag/
      swipe-first, finite, never autoplays; Previous/Next, arrow keys, "Photo
      N of 9" live status, disabled end controls, accessible labels, and
      44px targets all work; no visible heading; slide 1 is the face-paint
      image with the specified alt text, slides 2–9 are the existing eight
      in current order.
- [ ] Gallery shows a centred active slide with angled previews at desktop/
      tablet and a single focused slide on mobile; images still use
      Cloudinary/Next optimisation with accurate `sizes`; reduced motion
      keeps navigation but drops animated 3D/slide transitions.
- [ ] Motion reveal/parallax primitives are reusable, decorative-first,
      visible without JS, never applied to text/forms/CTAs/navigation, and
      limited to one–two concurrent effects per viewport; applied across
      Home, About, Lightkeepers, Donate, Contact without altering content or
      structure.
- [ ] Buttons/interactive cards get pointer-only hover lift/shadow; no
      change to touch/keyboard interaction.
- [ ] Lightkeepers banner has the lantern pulse + beam sweep at the
      specified coordinates, beneath the text overlay, following the
      existing rays; reduced motion shows a static low-intensity glow only;
      heading/subtext stay fully readable (no contrast loss, nothing
      obscured) at desktop and mobile.
- [ ] `npm run lint`, `npm run build`, and `git diff --check` all pass.
- [ ] Browser checks at 1440px and 390px on Home, About, Lightkeepers,
      Donate, Contact show no console errors, broken images, horizontal
      overflow, lost focus visibility, or unexpected layout shift.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Browser/Playwright pass: Home, About, Lightkeepers, Donate, Contact at
  1440px and 390px — console errors, image load failures, overflow, focus
  visibility, layout shift.
- Gallery: drag/swipe, Previous/Next, arrow keys, live status text, disabled
  end states, confirm no autoplay/loop, and repeat under
  `prefers-reduced-motion: reduce`.
- Stats: scroll into view once, confirm single count-up to final values;
  confirm static correct values under reduced motion and with JS disabled
  (or via server-rendered fallback inspection).
- Hero reveal: visual check at desktop and mobile widths, JS-disabled/
  reduced-motion fallback check.
- Lightkeepers banner: visual check at desktop and mobile that the glow/
  sweep sits beneath the text, tracks the given coordinates, doesn't reduce
  contrast, and degrades to a static glow under reduced motion.

## Decisions

- Fancy components are adapted as local, project-styled implementations
  (project CSS classes, no Tailwind) rather than installed as a library —
  per explicit instruction, no `@fancy` package is added.
- `motion` (the Motion library, formerly Framer Motion) is the only
  animation dependency added beyond `swiper`; existing CSS-only entrance
  animation on the hero content wrapper may be superseded where it conflicts
  with the new hero line reveal, but unrelated CSS animations are otherwise
  left alone.
- Gallery keeps its existing no-heading presentation; this is an explicit
  instruction, not an oversight.
- Lighthouse glow coordinates (`left: 15.8%`, `top: 26.9%`) are supplied
  exactly by the task; they are not re-derived from the artwork.

## Handoff

Implementation must record: every changed/added file; exact verification
commands and outcomes; the final dependency versions actually installed;
decisions and any deviations from scope with rationale; and remaining risks.
Set status to `ready-for-review` only once every acceptance criterion above
is met; otherwise record the specific unmet criterion and blocker here
instead.

### Implementation handoff — 2026-09-02

**Dependencies.** `npm install swiper@14.2.0 motion@13.1.1` — confirmed
installed exactly (`npm ls swiper motion` → `swiper@14.2.0`,
`motion@13.1.1`). No Tailwind, Shadcn, or `@fancy` package added.
`package.json`/`package-lock.json` are the only dependency-manifest changes.

**Files changed:**
- `package.json`, `package-lock.json` — new dependencies.
- `components/motion/useMounted.ts` (new) — `useSyncExternalStore`-based
  client-mount gate (not `useEffect`+`setState`, which
  `react-hooks/set-state-in-effect` flags as a lint error) used by every
  motion primitive below to render plain, fully visible markup until the
  client confirms JS is running.
- `components/motion/Reveal.tsx` (new) — viewport-enter fade/rise for
  images/cards (`div`/`figure`), plain-tag fallback pre-mount and under
  reduced motion.
- `components/motion/Parallax.tsx` (new) — decorative scroll parallax
  (`useScroll`/`useTransform`), with an optional `rotate` prop so a wrapped
  element's existing static CSS rotation isn't clobbered by Motion's own
  inline `transform`.
- `components/motion/VerticalCutReveal.tsx` (new) — local Vertical Cut
  Reveal adaptation, word-grouped (each word an unbreakable unit, ordinary
  breakable spaces between words) so per-character masking doesn't break
  the heading mid-word.
- `components/motion/NumberTicker.tsx` (new) — local Basic Number Ticker
  adaptation; counts 0→value once via `animate()` when scrolled into view,
  holds at the final value afterwards.
- `components/GardenDayCarousel.tsx` (rewritten) — Swiper React
  (`EffectCoverflow` + `Keyboard` + `A11y`), finite/no-autoplay, custom
  Previous/Next buttons wired to the Swiper instance, live "Photo N of 9"
  region, `effect`/`speed` swapped to `slide`/`0` under
  `prefers-reduced-motion`. Slide 1 is now
  `v1788293378/MH-Website-facepaint-5.jpg` with the specified alt text,
  followed by the original eight in their existing order.
- `app/page.tsx` — hero first line wrapped in `VerticalCutReveal`; stats
  wrapped in `NumberTicker` (values/suffixes/labels unchanged); curated
  `Reveal`/`Parallax` on the hero polaroid, identity photo+doodle, meet
  photo, mission photo+doodle, three involved-cards, and the stats skip-gif.
- `app/about/page.tsx` — `Reveal` on the hero photo and children photo;
  `Parallax` on the children-section cloud and the story-section star gif.
- `app/lightkeepers/page.tsx` — `Parallax` on the hero cloud; `Reveal` on
  the "what is a Lightkeeper" photo and the CTA keychain; added the
  `.lk-lighthouse-fx` glow/sweep markup inside `.lk-hero-graphic`.
- `app/donate/page.tsx` — `Reveal` on the hero photo (`BgPhoto` inner div
  switched to the new `.bg-fill` utility so it keeps its own `position`,
  see Decisions); `Parallax` on the "other ways to give" doodle.
- `app/contact/page.tsx` — `Reveal` on the hero photo (same `.bg-fill`
  fix) and the aside photo+doodle wrap; `Parallax` on the find-us sun
  (with `rotate={8}` to preserve its existing tilt).
- `app/globals.css` — Garden Day gallery rules rebuilt around Swiper's own
  slide markup (opacity-based active/inactive treatment instead of
  scroll-snap grid columns); `.vcr-word`/`.vcr-mask`/`.vcr-char`; `.bg-fill`
  utility; pointer-only hover-feedback rules (`.btn`, `.involved-card`,
  `.donate-other-card`, `.lk-impact-item`, `.sponsor-item`); the
  `.lk-lighthouse-fx`/`.lk-lighthouse-lantern`/`.lk-lighthouse-beam` glow
  and sweep with `@keyframes lkLanternPulse`/`lkBeamSweep` and a
  `prefers-reduced-motion` override to a static dim glow.

**Verification run:**
- `npm run lint` — clean.
- `npm run build` — clean (all 9 routes prerendered as static).
- `git diff --check` — clean, no whitespace errors.
- Playwright at 1440px and 390px on Home, About, Lightkeepers, Donate,
  Contact: 0 console errors on every page/width; no horizontal overflow
  (`scrollWidth`/`clientWidth` checked); focus-visible outline confirmed on
  the gallery's Next button.
- Gallery: confirmed slide 1 is the face-paint image with the exact alt
  text and slides 2–9 match the original eight in order (accessibility
  snapshot); Previous starts disabled, Next disables at slide 9 with no
  wraparound; `Photo N of 9` live text updates on click and on keyboard
  `ArrowRight`; confirmed no autoplay (index static after a 4s wait);
  confirmed `effect` switches `coverflow` → `slide` with `speed: 0` under
  `page.emulateMedia({reducedMotion:'reduce'})`; 44px+ control targets
  measured (109×50px rendered).
- Stats: fresh navigation (scrollY 0, stats off-screen) shows the static
  final values (`28+`/`300+`/`1000+`) before any animation; scrolling into
  view counts up once and holds; scrolling away and back does not re-count;
  reduced motion shows the static final values with no animation.
- Hero reveal: visually confirmed at 1440px and 390px; reduced motion
  confirmed to render plain text with no `.vcr` markup at all.
- Lighthouse glow: confirmed via `getBoundingClientRect`/`getComputedStyle`
  that `.lk-lighthouse-fx` sits exactly on the artwork's lantern at both
  widths; confirmed the lantern/beam opacity genuinely oscillates over
  time (animating); confirmed reduced motion sets `animation: none` with a
  fixed dim opacity on both layers; visual check at both widths found the
  overlay heading/subtext fully legible with no contrast loss.
- Hover feedback: confirmed `(hover:hover) and (pointer:fine)`-gated
  `:hover` box-shadow fires via simulated mouse move on `.involved-card`
  (see Decisions for why its lift, specifically, is shadow-only).

**Decisions:**
- `useMounted` uses `useSyncExternalStore` rather than the originally
  planned `useEffect`+`setState` gate — the latter trips
  `react-hooks/set-state-in-effect` in this repo's ESLint config, and
  `useSyncExternalStore` is the standard hydration-safe replacement for
  exactly this "differs between server and client" case.
- `Reveal`'s `as` prop is `"div" | "figure"` only (no `"li"`) — nothing in
  scope needed a list-item variant, and a `Record<Tag, typeof motion.div>`
  lookup doesn't type-check across heterogeneous motion tag components; an
  `if/else` branch was used instead.
- Every `Reveal`/`Parallax` usage passes the *original* CSS class straight
  through the wrapper (rather than introducing an additional unstyled
  nested `<div>`), specifically to avoid two classes of real bugs found
  during implementation: (1) percentage-based `position: absolute` styling
  breaks if the sized/positioned class moves to a different DOM depth than
  before, and (2) Motion's own inline `transform` silently overrides a
  same-element CSS `transform` (e.g. a static `rotate()`), which is why
  `Parallax` takes an explicit `rotate` prop instead of relying on the
  wrapped class's own CSS rotation.
- Where a `BgPhoto` was wrapped in `Reveal`/`Parallax` and its *own*
  sizing/position class moved to the wrapper, `BgPhoto`'s inner div was
  given a new shared `.bg-fill` utility (`position:absolute;inset:0`)
  instead of being left classless — Next's `fill` image mode expects its
  *direct* parent to declare `position`, not just a positioned grandparent,
  and leaving it classless produced a real dev-console warning on
  `/donate` and `/contact` that this fixes.
- `.involved-card`'s pointer-hover lift is box-shadow only, not
  `translateY`, because it is also a `Reveal` target: once its
  viewport-enter animation settles, Motion leaves the final `transform` as
  a persistent inline style, which always outranks a CSS `:hover
  { transform }` rule on the same element. The box-shadow lift (no inline
  conflict) still applies. `.donate-other-card`, `.lk-impact-item`, and
  `.sponsor-item` are plain (non-motion) elements and keep the full
  translateY + box-shadow treatment.
- The Lightkeepers lighthouse glow is pure CSS (`@keyframes`, no JS): its
  `prefers-reduced-motion` fallback is a self-contained media query rather
  than depending on a JS-detected state, so it degrades correctly even
  before hydration.

**Deviations / pre-existing issues observed, not fixed (out of scope):**
- `/lightkeepers` logs a pre-existing dev-console warning ("Image with
  src ... has 'fill' and parent element with invalid position") for the
  "What Is A Lightkeeper" photo. Confirmed via `git show HEAD:...` that
  this exact nesting (a sizing wrapper div around a `BgPhoto` whose own
  inner div carries a CSS class with no rules) predates this task; my edit
  only swapped the outer `<div>` for `<Reveal>` with the identical
  className, so the warning is unchanged, not introduced. Left as-is per
  "preserve unrelated pre-existing... changes" — flagging here rather than
  silently fixing it outside the approved scope.
- `/contact` logs two pre-existing, unrelated dev warnings (an SVG
  Cloudinary loader "missing width" notice, and an LCP "add loading=eager"
  suggestion for the aside photo) — both predate this task and are
  unrelated to the motion/gallery/lighthouse work.

**Remaining risks:** none identified that block review. The two
pre-existing warnings above are dev-only console notices (not errors) and
were present before this task.

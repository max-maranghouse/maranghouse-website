# MH-012: People/partners separation and About matron composition

Status: ready-for-check
Base: `52348bb2a3808fac7ffeb0c253d5246d5e3f28ef` (`origin/main`)

## Outcome

On both Home and Lightkeepers, the current mixed supporter gallery becomes
two consecutive sections: a people-only “The people who help us transform
lives” gallery and a separate “Our Partners” logo carousel. On About, the
Children We Serve heading/photo clear the flags and clouds, the highlighted
word “Marang” is readable in brand blue, and Salome’s supplied portrait is
integrated into the “Meet Salome, Our Matron” story.

## Evidence and constraints

- `components/SupportersSection.tsx` is already shared by `app/page.tsx` and
  `app/lightkeepers/page.tsx`. Its `SUPPORTERS` array currently mixes four
  people — Daryl Impey, David Higgs, Monique Weyers, and Nazia Wadee — with
  seven organization logos: Pirates Running Club, Reach For A Dream, PCI
  Carpets, JHB Junior Council, Nelson Mandela Children’s Hospital, Charlotte
  Maxeke Hospital, and the University of Johannesburg.
- The current supporter section’s subtitle describes businesses/foundations,
  so it belongs with the new partner logos rather than with the people-only
  gallery. Home currently keeps the `SPONSOR A CHILD TODAY` link; Lightkeepers
  calls the shared section with `showCta={false}` because its `.lk-cta`
  BackaBuddy action immediately follows it.
- `swiper` is installed and used by `components/GardenDayCarousel.tsx`, but a
  full interactive slider is unnecessary for the requested moving logo strip.
  A CSS marquee can remain a server component, adds no dependency or client
  JavaScript, and must stop under `prefers-reduced-motion`. Its duplicated
  visual track must not duplicate accessible logo names.
- `app/about/page.tsx` renders the Children We Serve decorations before
  `.about-children-inner`; `app/globals.css` currently starts the section at
  `padding: 148px ...` (`124px` at <=900px), while the full-width flags and
  top-right clouds occupy the same top rail. The inner heading and its photo
  therefore start too close to that artwork.
- The highlighted `<em>Marang</em>` is styled by
  `.about-children-text em { color: var(--orange); }`, which loses contrast
  against the orange background. Use the established deep brand-blue token;
  do not recolour unrelated emphasized copy.
- The supplied portrait URL
  `https://res.cloudinary.com/m4hqddxx/image/upload/v1788862586/MH-Web-Salome-Portrait-1.jpg`
  returned HTTP 200 as a 3000×4000 JPEG. Render it with `cld()` using the
  versioned path, as a real `next/image` portrait (not a CSS background),
  with descriptive alternative text.
- Preserve existing routes, organisation/donation data, Formspree behaviour,
  security headers, existing Cloudinary helper use, and all unrelated visual
  refresh work. Do not add a package or change production infrastructure.

## Scope

In scope:

- Split people and partner data/presentation while retaining their current
  names, roles, and logo assets.
- Add a shared, automatically moving partner-logo carousel directly below the
  people section on Home and Lightkeepers.
- Correct the About top-rail spacing, single word colour, and Salome story
  composition.

Out of scope:

- New partner links, partner copy beyond moving the existing business/
  foundation sentence, supporter facts, new page routes, or a donor showcase.
- Reworking the Garden Day Swiper, Lightkeepers CTA/donation flow, global
  tokens, or the existing About story wording.

## Implementation

1. **Make the existing shared supporter component people-only**
   (`components/SupportersSection.tsx`, owned by this task). Split the current
   asset data into the four named people and the seven partner organizations.
   Keep `SupportersSection` as the people gallery used by both routes: retain
   its portrait treatment, decorative clouds/sun, Home-only CTA prop, and the
   established heading. Remove the business/foundation subtitle from this
   people section so it does not imply that logos are people. Retune only the
   people-grid sizing/styles needed for a balanced four-person layout across
   desktop and mobile. Done when no organization logo can render in this
   component and the current Home-vs-Lightkeepers CTA behavior is unchanged.

2. **Create a reusable, accessible partners carousel**
   (`components/PartnersCarousel.tsx`, new; `app/globals.css` integration).
   Render a distinct `<section>` headed **“Our Partners”**, followed by the
   existing businesses/foundations support sentence and the seven logo assets
   in their existing order. Use fixed, responsive logo frames with
   `object-fit: contain` so differently shaped marks are never portrait-cropped.
   Implement the requested simple continuous horizontal movement with CSS:
   duplicate the logo group only for a seamless visual loop, mark that
   duplicate inaccessible, pause on pointer hover, and keep the original
   group semantically available with meaningful logo `alt` text. Under
   `prefers-reduced-motion`, stop the animation and present one non-duplicated
   responsive/scrollable logo group instead. Give this section a quieter
   branded treatment that is visibly separate from the deep-blue people
   section without introducing new colour tokens. Done when all seven logos
   are visible, legible, and contained at every breakpoint, while motion is
   absent for reduced-motion users.

3. **Integrate the two shared sections in page order**
   (`app/page.tsx`, `app/lightkeepers/page.tsx`). Import and render
   `PartnersCarousel` immediately after `SupportersSection`: on Home, before
   “How You Can Get Involved”; on Lightkeepers, before the existing final
   `.lk-cta` call to become a Lightkeeper. Do not duplicate either component
   within a route or alter the CTA prop contract. Done when both routes show
   people first, then partners, with the Home CTA shown once and no redundant
   Lightkeepers self-link.

4. **Create clear artwork space in Children We Serve**
   (`app/globals.css`). Increase the top rail/inner start spacing at desktop
   and mobile so the illustrated flags and both clouds remain decorative above
   the “The Children We Serve” heading and its photo, rather than intersecting
   them. Preserve the existing flags-behind-clouds z-index order and the
   photo’s uncropped 1400×770 treatment. Tune the responsive values against
   actual rendered art rather than relying on an arbitrary single offset.
   Done when the heading, photo border, and clouds/flags have visible space
   between them at 1440px and 390px, with no horizontal overflow.

5. **Make the single “Marang” emphasis blue**
   (`app/about/page.tsx`, `app/globals.css`). Give only the emphasized word in
   the 1998 paragraph a scoped class and style it in
   `var(--color-brand-deep)`, retaining its italic emphasis. Do not broadly
   recolour every `<em>` selector. Done when the word is visibly deep blue and
   remains readable against the orange section background.

6. **Integrate Salome’s portrait with her introduction**
   (`app/about/page.tsx`, `app/globals.css`). Add the verified versioned
   Cloudinary image using `Image`, `width={3000}`, `height={4000}`, a
   responsive `sizes` value, and alt text identifying Salome as Marang
   House’s matron. Restructure the beginning of `.about-story` into a
   desktop split introduction: portrait alongside the eyebrow/title/opening
   paragraph, followed by the existing quote and long-form narrative in the
   current readable centred column. On narrow screens, stack the title,
   portrait, and text in a deliberate reading order with an uncropped,
   face-preserving portrait frame. Keep the decorative sparkle non-interactive
   and clear of the new content. Done when the portrait reads as part of the
   Matron introduction without reducing paragraph readability or colliding
   with the sparkle at desktop or mobile widths.

### Dependencies and integration order

Steps 1 and 2 establish the shared people/partner contracts before step 3
adds them to the two routes. Steps 4–6 are independently scoped to About but
share `app/globals.css`, so their CSS work follows the carousel styles in one
sequential pass. No parallel edits are required or recommended.

## Acceptance criteria

- Home and Lightkeepers each render exactly four people (Daryl Impey, David
  Higgs, Monique Weyers, Nazia Wadee) in the people gallery and none of the
  seven organization logos there.
- A distinct **Our Partners** section directly follows the people gallery on
  both pages and displays all seven existing organization logos in a moving,
  non-cropped carousel; the Home CTA appears once, while Lightkeepers keeps
  only its existing final donation CTA.
- The partner animation pauses on hover and does not animate under
  `prefers-reduced-motion`; duplicate display items are excluded from the
  accessibility tree, and there is no horizontal page overflow at 1440px,
  768px, or 390px.
- On About at 1440px and 390px, flags and clouds do not overlap the Children
  We Serve heading or framed photo; flags remain behind clouds.
- The one highlighted “Marang” word is deep brand blue, italic, and readable
  on the orange background; no unrelated emphasis changes colour.
- The verified Salome portrait appears in the Meet Salome, Our Matron section
  with correct alt text, an uncropped face, a balanced desktop composition,
  and a clear stacked mobile composition.
- `npm run lint`, `npm run build`, and `git diff --check` pass.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Final visual checkpoint (one): run the local site and inspect `/`,
  `/lightkeepers`, and `/about` at 1440px and 390px (also the partner strip at
  768px). Confirm the asset requests succeed, logo frames are fully visible,
  the partner strip advances and pauses on hover, reduced-motion stops it,
  the people/partner division and CTA order are correct, and neither About
  composition has overlap or horizontal scroll.

## Assumptions and risks

- The four photographic/name entries are the requested people; all seven
  remaining supplied organization marks are partners. This classification is
  based on the current shared component rather than inventing new partners.
- “Simple partners carousel” means a non-clickable, automatically moving logo
  strip, not a Swiper with controls or partner destinations. It avoids new
  interaction/URL decisions and keeps the treatment lightweight.
- The existing business/foundation subtitle moves to Our Partners unchanged;
  no new marketing copy is needed.
- Exact top-rail spacing and portrait frame dimensions are visual tuning
  decisions, to be validated at the named breakpoints. If the supplied portrait
  requires a different focal `object-position` to preserve Salome’s face, tune
  that CSS without changing the asset.

## Handoff

Status: ready-for-check.

### Changed files

- `components/SupportersSection.tsx` — `SUPPORTERS` trimmed to the four named
  people; removed the businesses/foundations subtitle (moved to Partners).
- `components/PartnersCarousel.tsx` (new) — `PARTNERS` list (the seven
  organization logos), the moved subtitle sentence, and a CSS-only marquee:
  logo group duplicated once for the loop, duplicate `aria-hidden`, pauses on
  `:hover`, and swaps to a static non-duplicated scrollable row under
  `prefers-reduced-motion`.
- `app/page.tsx`, `app/lightkeepers/page.tsx` — import and render
  `PartnersCarousel` immediately after `SupportersSection`.
- `app/about/page.tsx` — scoped `about-children-marang` class on the "Marang"
  `<em>`; restructured `.about-story-inner`'s opening into
  `.about-story-intro` (heading block, portrait figure, lead paragraph) using
  Salome's verified Cloudinary portrait
  (`v1788862586/MH-Web-Salome-Portrait-1.jpg`, `width=3000 height=4000`).
- `app/globals.css` — new `.partners-*` rules (reusing `--color-brand-soft`,
  no new tokens); `.supporters-grid` retuned for 4 items; `.about-children`/
  mobile padding-top increased (148→240px desktop, 124→210px mobile) to clear
  the flags/clouds top rail; `.about-children-text em.about-children-marang`
  (scoped selector — had to out-specificity the existing
  `.about-children-text em` rule); new `.about-story-intro*` grid (desktop
  two-column via `grid-template-areas`, mobile single-column reorder to
  title → portrait → text at `max-width: 760px`).

### Verification

- `npm run lint` — pass, no warnings.
- `npm run build` — pass, all routes prerendered static.
- `git diff --check` — pass, no whitespace errors.
- Manual checkpoint via local Playwright at 1440/768/390px on `/`,
  `/lightkeepers`, `/about`:
  - Home and Lightkeepers each show exactly the 4 people, then a distinct
    "Our Partners" section with all 7 logos, uncropped, `object-fit: contain`.
  - Home's CTA appears once (in the people section); Lightkeepers shows no
    self-link CTA, only its existing final `.lk-cta` donation section.
  - Partner marquee: confirmed `animation-play-state` running by default,
    `paused` on real Playwright hover, and `none` (with the duplicate group
    `display: none`) under `prefers-reduced-motion: reduce`.
  - No horizontal overflow (`scrollWidth === innerWidth`) at 1440/768/390 on
    any of the three routes.
  - About: flags/clouds no longer overlap the heading or photo at 1440 or
    390 (confirmed by screenshot, not just bounding-box math — the flags PNG
    has a lot of transparent space below its visible triangles, so its raw
    bounding box is not a reliable overlap signal on its own).
  - "Marang" renders `rgb(8, 47, 115)` (`--color-brand-deep`), confirmed via
    `getComputedStyle`; no other emphasis colour changed.
  - Salome's portrait: balanced two-column split at 1440 (portrait beside
    eyebrow/title/opening paragraph, quote/narrative below in the original
    centred column); clean stacked title → portrait → text order at 390,
    clear of the sparkle doodle at both widths.

### Deviations / notes

- One real bug caught during the visual checkpoint and fixed before
  handoff: the first "Marang" colour attempt used a single-class selector
  (`.about-children-marang`) which the existing `.about-children-text em`
  rule out-specificities, so it silently had no effect. Fixed by scoping to
  `.about-children-text em.about-children-marang`.
- `.about-story` intro grid's mobile breakpoint uses its own
  `@media (max-width: 760px)` block (added just above the section's existing
  `@media (max-width: 600px)` block) rather than folding into the 600px one,
  since the two-column intro needs to collapse earlier than the rest of the
  section's mobile tuning.
- `.about-children` top-rail padding values (240px / 210px) were tuned
  empirically against the rendered flags/clouds artwork per the task's
  guidance, not derived from a fixed formula.

### Risks

- None identified beyond the assumptions already recorded above (people vs.
  partner classification, "simple carousel" = non-interactive CSS marquee).

### Post-handoff revisions

1. First revision: logos too small, moving marquee not wanted for 7
   partners → reworked to a static, non-animated, wrapping row.
2. Second revision (supersedes #1): user preferred the single moving line
   after seeing it static, wanted the logos bigger still, the section's
   background matched to the people section's deep-blue gradient, and a
   name label under each logo. Reworked `PartnersCarousel.tsx` back to a
   marquee — `partner-item` now pairs a white-card `partner-logo` (240×128
   desktop / 176×96 mobile, up from the original 140×72) with a
   `partner-name` label, track duplicated once for the loop with the
   duplicate `aria-hidden`, hover-pause and `prefers-reduced-motion`
   restored. `.partners-section`'s background now reuses
   `.supporters-section`'s exact gradient instead of `--color-brand-soft`,
   so light logo-card and name-label colours read against it the same way
   `.supporters-section` already does. Confirmed via Playwright:
   `animationPlayState` running by default and `paused` on real hover, and
   no horizontal overflow at 1440/390. `npm run lint` and `npm run build`
   both pass.
3. Third revision: removed the white card tiles behind each logo (logos now
   sit directly on the section's gradient, with a `drop-shadow` filter for
   definition instead) and closed up the excess side whitespace — the fade
   mask was landing well inside the screen edges because
   `.partners-track-viewport` was nested inside `.partners-section-inner`'s
   `max-width: 1100px` column. Moved the viewport to be a sibling of that
   inner column (full section width) and shifted the section's horizontal
   padding onto `.partners-section-inner` alone, so the heading/subtitle
   stay inset while the track and its edge fade now run to the actual
   viewport edges. Re-verified hover-pause and no-overflow on both Home and
   Lightkeepers at 1440/390; `npm run lint` and `npm run build` pass.

### Follow-up: About/Lightkeepers visual requests (out of original MH-012
scope but delivered in the same branch at the user's request)

1. **Salome portrait, About** — bigger portrait; tried a stacked
   title→portrait→text single column first (per the original ask), but the
   user found it "not looking nice" and asked for the photo on the left with
   text on the right instead. Reworked `.about-story-intro` to a
   vertically-centred flex row (portrait fixed at `min(30vw, 380px)`, text
   column `flex: 1`), pulled out of `.about-story-inner`'s narrower 760px
   prose column into its own `max-width: 980px` so the wider row has room;
   stacks back to a centred single column under 760px. Also removed
   `.about-story`'s `repeating-conic-gradient` rays layer — background is
   now the plain `linear-gradient(135deg, #0b3c82 0%, #171442 115%)` used
   elsewhere on the page.
2. **Children We Serve, About** — swapped `.about-children-flags`/
   `.about-children-cloud` z-index so the clouds sit behind the bunting
   (confirmed visually: clouds now peek out from behind the flags rather
   than sitting in front of them, which is what the code had actually been
   doing despite a stale comment claiming otherwise). Pushed
   `.about-children`'s top padding down further (240px→320px desktop,
   210px→270px mobile) for more clearance between the flags and the
   heading/photo.
3. **What We Do, About** — grid images 360px→400px, with `.about-whatwedo-grid`'s
   `max-width`/`gap` retuned (1300px / 24px) so the three cards still fit
   one row at 1440px instead of wrapping to 2-then-1.
4. **Lightkeepers hero lighthouse beam** — the `lkBeamFanSweep` keyframe
   range (`-40deg → 140deg → 230deg`) spent much of each cycle swung past
   straight-left into the upper-left quadrant, which is the anchor's
   shortest/most-clipped direction (anchor sits near the hero's top-left
   corner) — the beam was mostly invisible there. Re-bounded to
   `-10deg → 107deg → 165deg`: starts pointing to the screen's right side,
   swings down through straight-down, stops just short of straight-left,
   never re-entering the wasted upper-left arc. Verified by sampling
   screenshots across the 9s cycle.

Verification for this follow-up round: `npm run lint`, `npm run build`,
`git diff --check` all pass; visual check at 1440/390 on `/about` and
`/lightkeepers` (portrait row, children clearance, what-we-do grid, beam
sweep sampled at t≈0/3/6/8s) with no horizontal overflow at either width.

### Second follow-up round (also out of original MH-012 scope, same branch)

1. **SupportersSection colours** — background swapped from the deep-navy
   gradient to the site's warm orange gradient (`linear-gradient(104deg,
   #f8e026 0%, #fbaf3c 45%, #f27926 100%)`, matching `.about-children`/
   `.about-whatwedo`); the previously-white `.supporter-name`/its role span
   are now `var(--color-brand-deep)` so they still read. The title
   (`.supporters-section h2`) was tried in yellow first per the initial
   ask, then corrected to blue (`var(--color-brand-deep)`) per a same-turn
   follow-up — final state is blue, no text-shadow needed at that contrast.
2. **Removed from Home** — `SupportersSection` (and its import) deleted
   from `app/page.tsx`; `PartnersCarousel` stays. It remains in use on
   `/lightkeepers` (`showCta={false}`, unchanged) — the colour/copy above
   only shows there now. Note: this also removes the `SPONSOR A CHILD
   TODAY` → `/lightkeepers` CTA from Home entirely, since it lived inside
   `SupportersSection`; nobody asked to relocate it, flagging in case that
   was load-bearing for Home's conversion path.
3. **Partners marquee hover** — removed the `.partners-track-viewport:hover
   .partners-track { animation-play-state: paused; }` rule entirely; the
   scroll now keeps running under the pointer (verified via Playwright
   hover — `animationPlayState` stays `"running"`). `prefers-reduced-motion`
   handling is untouched.
4. **Salome section reorder, About** — the quote ("Years later, I worked
   alongside Dr Pieter Ernst…") and the "Children don't heal because of
   insulin alone…" standout line now open the section, directly under
   "Meet Salome, Our Matron"; the bio paragraph ("Salome, Matron of Marang
   House, was fourteen years old…") moved down into the centred
   `.about-story-inner` column, now the first paragraph there. Both moved
   elements keep their original CSS classes (`.about-story-quote`/
   `.about-story-standout`) so their existing site-wide look is unchanged
   elsewhere; added scoped `.about-story-intro-text .about-story-quote`/
   `.about-story-standout` overrides for left-alignment and no box/border
   in their new spot beside the portrait (desktop), falling back to
   centred at ≤760px alongside the rest of the intro column. Removed the
   now-orphaned `.about-story-intro-lead`/`about-story-intro-lead` class
   (JSX no longer uses it — the bio paragraph is a plain `<p>` now).
5. **Contact form "Reason for contact"** (not from this session's four
   numbered requests, but folded in) — new required `<select
   name="reason">` in `components/ContactForm.tsx`, between Name and
   Email/Phone: General Enquiry, Volunteering, Donation, Tax Certificate
   (Section 18A), Sponsor a Child, Media / Press, Other. Styled to match
   the existing text-input chrome in `globals.css` (`.contact-form
   select`), with a custom SVG chevron (`appearance: none` drops the
   native one) positioned clear of the existing required-marker span, and
   a `:invalid` rule to grey the placeholder option the same way real
   `::placeholder` text reads elsewhere. No Formspree config change
   needed — it's just another field name in the existing submission.

Verification: `npm run lint`, `npm run build`, `git diff --check` all pass.
Visual check at 1440/390: Lightkeepers people section (orange/blue/blue),
Home confirmed to have no `.supporters-section` but still render
`.partners-section`, partners marquee hover confirmed non-pausing, About
Salome section reorder confirmed matching the requested order, contact
form dropdown renders with all 7 options and no horizontal overflow at
either width.

### Third follow-up round (also out of original MH-012 scope, same branch)

1. **Cloud parallax strength, site-wide** — bumped `strength` on every
   `Parallax`-wrapped cloud illustration (the static cloud PNGs; the two
   `MH-cloud-giff.gif` doodles on About/Donate were left as-is — they're
   decorative swirl icons, not the cloud artwork, and aren't
   Parallax-wrapped anywhere already, matching the sun/star gif doodles'
   existing treatment): About's `.about-children-cloud--small` 12→22 and
   `--round` 20→34; Lightkeepers hero's `--long` 38→62 and `--tall`
   58→90; `SupportersSection`'s `--long` 18→30 and `--small` 30→48.
   Roughly 1.6-1.8x each — visibly stronger drift, verified no clipping at
   1440/390 (each parent section keeps `overflow: hidden`).
2. **Children We Serve pushed further down, About** — per direct follow-up
   feedback that the first pass wasn't low enough yet: `.about-children`
   padding-top 320px→420px desktop, 270px→340px mobile. Confirmed at
   1440/390 with a large, clear gap between the flags/heading now.
3. **Salome quote wording, About** — removed the leading "Years later, "
   and added "(Founder)" before "Dr Pieter Ernst": now reads `"I worked
   alongside (Founder) Dr Pieter Ernst in theatre. One day he asked me
   if I would come and help at a children's home called Marang House. He
   saw something in me that I couldn't yet see in myself. Today I know
   exactly what he saw."` Text-only change in `app/about/page.tsx`, no
   CSS/structure touched.

Verification: `npm run lint`, `npm run build`, `git diff --check` all pass.
Visual check at 1440/390 on `/about` and `/lightkeepers` confirming cloud
drift, the wider Children-We-Serve gap, and the corrected quote text; no
horizontal overflow at either width.

### Fourth follow-up round (also out of original MH-012 scope, same branch)

Removed the "Salome, Matron of Marang House, was fourteen years old when
she watched her grandmother pass away at home. That was the moment she
decided she wanted to become a nurse." paragraph entirely from
`.about-story-inner` — it's no longer used anywhere on the page. The
section's centred column now opens directly with "Every child who comes
to Marang House…" right after the quote/standout line beside the portrait.
`npm run lint`, `npm run build`, `git diff --check` pass; visually
confirmed at 1440 the removal leaves a clean paragraph gap with no
leftover empty space or broken flow.

### Fifth follow-up round (also out of original MH-012 scope, same branch)

Added the site's existing `MH-love-giff.gif` doodle (reused as-is, same
asset already used in Home's Mission section) centred directly under the
"Children don't heal because of insulin alone…secure and loved." standout
line, inside `.about-story-intro-text`. New `.about-story-love-doodle`
class centres it with `margin: 0 auto` on its own fixed width (84px
desktop / 68px mobile) rather than `text-align: center`, since the
column itself stays left-aligned everywhere except mobile. Wrapped in the
existing `Parallax` component (`strength={8}`, matching the Home usage)
for a subtle drift consistent with the rest of the site's doodles.
`npm run lint`, `npm run build`, `git diff --check` pass; visually
confirmed centred placement at both 1440 (beside the portrait, left-column
text above it) and 390 (fully centred column).

### Sixth follow-up round (also out of original MH-012 scope, same branch)

Added a scroll-linked "grows bigger" effect to Home's "A Day At Marang
House" photo (`MH-girl-arch.png`, the `.meet-photo`/`.meet-photo-wrap`
pair). New `components/motion/ScaleOnScroll.tsx` — same scroll-range
mechanics as the existing `Parallax` component (same target/offset setup,
same SSR/no-JS and `prefers-reduced-motion` gating via `useMounted`), but
transforms `scale` (default `from={0.88}` to `to={1.12}`) instead of `y`.
Replaced the `Parallax` wrapper that used to sit on `.meet-photo-wrap`
with this new component (that section's `overflow: visible` already
supports the grown image bleeding slightly past its box, so no CSS
change was needed there). Verified via Playwright: computed `transform`
scale increases from ~1.006 to ~1.076 as the section scrolls through the
viewport, resolves to `"none"` under `prefers-reduced-motion: reduce`,
and no horizontal overflow at 390px. `npm run lint`, `npm run build`,
`git diff --check` all pass.

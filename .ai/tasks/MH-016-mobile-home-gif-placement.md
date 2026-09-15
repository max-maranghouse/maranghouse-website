# MH-016: Mobile Home GIF placement

Status: ready-for-check
Base: `f57448fcd2b5b64be4eb337bc1995bde21f0b3f1` (`origin/main`)

## Goal

Correct the two decorative GIF compositions on the Home page at mobile
widths, while preserving their current desktop/tablet placement and all Home
copy, assets, motion, routes, and production infrastructure.

User-visible outcome:

- In **A Day At Marang House**, the stars GIF no longer overlaps or impairs
  reading the section subtext on mobile; it sits visibly lower in the section.
- In **Our Mission**, the love/hearts GIF is centred in the heart made by the
  hands in the heart-hands image on mobile.

## Repository evidence and current behaviour

- `app/page.tsx:186-223` renders the A Day section's decorative
  `MH-star-giff.gif` inside `Parallax.meet-doodle`, before `.meet-inner`.
  The GIF is decorative (`alt=""`, `aria-hidden`, `unoptimized`).
- `app/globals.css:383-407` defines the desktop A Day layout. Its only mobile
  rules are in the `@media (max-width: 860px)` block at `:465-472`; no
  mobile-specific position for `.meet-doodle` currently appears there.
- `app/page.tsx:237-265` nests `MH-love-giff.gif` inside
  `.mission-love-doodle`, over the heart-hands image; it is also correctly
  marked decorative and `unoptimized`.
- `app/globals.css:524-533` positions the mission doodle at desktop and at
  `max-width: 860px`. The mobile rule uses `top: calc(48% + 6px)`, which is
  not the centre of the visible heart at the mobile-rendered image crop.
- Existing finished task MH-005 already adjusted `.mission-love-doodle` for
  mobile and recorded that it should remain a CSS-only visual correction;
  this task is a follow-up limited to the two new placement observations.

## Scope

### In

- Add or adjust CSS under an existing/new mobile media query for
  `.meet-doodle` so its stars decoration is lower than the A Day text's
  subtext and does not overlap either paragraph at 320px, 390px, or 430px
  wide.
- Adjust only the mobile `.mission-love-doodle` offsets so the GIF's visual
  heart is centred inside the heart made by the hands. Keep its existing
  mobile size unless a size adjustment is necessary to achieve that centred
  placement without covering the hands.
- Preserve decorative-image semantics and GIF playback (`alt=""`,
  `aria-hidden`, `unoptimized`).
- Verify desktop remains governed by the existing base rules and is unchanged.

### Out

- Any desktop/tablet composition change.
- JSX/component restructuring, copy/content changes, new or replacement
  assets, GIF re-encoding, dependencies, or changes to motion behaviour.
- Other Home sections, global design tokens, accessibility/security headers,
  Vercel/GitHub/domain/deployment actions, commits, pushes, or PRs.

## Dependencies and ownership

This is one CSS-only vertical slice. `app/globals.css` is the sole owned
implementation file. It depends on the existing DOM/classes in `app/page.tsx`
but must not edit them. No parallel work is warranted because both outcomes
share the Home responsive stylesheet and can conflict in the same media query.

## Implementation steps

1. Establish the present mobile geometry in a local browser at 320x568,
   390x844, and 430x932. Record the current bounding boxes/visual relation of
   `.meet-doodle`, `.meet-text`, `.mission-banner-photo`, and
   `.mission-love-doodle` before editing. Outcome: placement targets are
   based on the actual rendered layout, including `Parallax` wrappers.
2. In `app/globals.css`, add a `max-width: 860px` (or narrower existing mobile)
   override for `.meet-doodle` that moves the stars downward and, if necessary,
   establishes its z-index/side offset within `.meet-section`. Constraint: the
   decoration must remain inside the A Day section and behind/away from
   readable text; do not alter `.meet-inner`, photo, or text dimensions.
   Done when both paragraphs are fully unobscured at all target widths.
3. In the existing mobile `@media (max-width: 860px)` block for
   `.mission-love-doodle`, tune the positional offset based on the centre of
   the hands' heart in the rendered image. Constraint: retain absolute
   positioning within `.mission-banner-photo-wrap`, preserve the image and
   parallax wrappers, and leave the base desktop rule untouched. Done when the
   GIF heart visually sits inside the hands' heart at every target width.
4. Run the required checks and perform the final responsive checkpoint.
   Outcome: the CSS is limited to mobile, has no horizontal overflow, and is
   visually accepted.

## Success criteria

- At 320x568, 390x844, and 430x932 Home page viewports, the A Day stars GIF
  does not overlap either `.meet-text p` rendered bounding box and is visibly
  lower than the start of the text block.
- At those same widths, the mission GIF is visually centred in the heart void
  formed by the two pairs of hands, rather than displaced above/below/aside
  from it.
- The stars and love GIFs remain animated decorative images with their
  existing accessibility attributes and do not cause horizontal page overflow.
- At 1440x900, computed base placement for `.meet-doodle` and
  `.mission-love-doodle` matches the pre-change desktop layout (no desktop
  selector/property change).
- `npm run lint` and `npm run build` pass.

## Verification

Automated:

```sh
npm run lint
npm run build
```

Manual checkpoint (final only): run the Home page locally and inspect at
320x568, 390x844, 430x932, and 1440x900. At mobile widths confirm both visual
outcomes above and no horizontal scrolling; at desktop confirm neither GIF
has moved. This is the only required human judgement because precise artwork
centering and legibility are visual qualities.

## Assumptions, risks, and decisions

- “Mobile only” means the existing `max-width: 860px` Home breakpoint is the
  default implementation target, provided the result is correct across the
  requested phone widths. A narrower breakpoint may be used only if it better
  isolates a phone-specific correction without a tablet regression.
- The request identifies the existing `MH-star-giff.gif` and
  `MH-love-giff.gif`; no new Cloudinary lookup is required. This avoids the
  unresolved `MH-hearts.gif` asset noted in `AGENTS.md`.
- Exact centre is assessed against the animated GIF's visible heart mark and
  the hands' heart shape, not merely the GIF element's rectangular bounding
  box. The final manual checkpoint is therefore required.
- No unresolved product/content/credential decision blocks implementation.

## Handoff

Implemented as a CSS-only change in `app/globals.css`. No JSX, assets, or
routes touched.

**Pre-change geometry (390×844, Playwright)**: `.meet-doodle` bottom-anchored
at `bottom: 24px; right: 5%` inside `.meet-section`, width forced to 132px by
the shared `@media (max-width: 760px)` rule. With `.meet-inner` stacked at
mobile, this placed the doodle's bounding box (top 3161→bottom 3293) directly
over the second `.meet-text p` (top 3127→bottom 3263) — both x- and
y-overlapping. `.mission-love-doodle` was centred horizontally (`left: calc(50%
- 45px)`) but its vertical anchor (`top: calc(48% + 6px)`) sat near the
bottom-most part of `.mission-banner-photo-wrap`, well below the visual heart
void formed by the hands, overlapping the wrists.

**Changes made**:
- `.mission-love-doodle` mobile rule (existing `@media (max-width: 860px)`
  block, ~line 529): `top` changed from `calc(48% + 6px)` to `calc(54% - 45px)`
  — re-anchors the doodle's vertical centre to ~54% of the photo wrap's
  height, matched empirically against the rendered heart-hands photo (verified
  with a temporary debug marker + screenshots, since removed). `left` and
  `width` unchanged.
- New `@media (max-width: 860px)` block after the shared doodle-width rule
  (~line 801, ordered after the `.meet-doodle` base rule so it wins cascade):
  adds `.meet-section { padding-bottom: 150px; }` and `.meet-doodle { bottom:
  16px; }`. The extra section padding creates clearance below `.meet-text`
  without touching `.meet-inner`/photo/text sizing; the doodle is re-anchored
  inside that new padding, well clear of both paragraphs.

**Post-change verification (Playwright, `npm run dev`)**:
- 320×568: `.meet-doodle` bottom -235.9 vs. paragraph bottoms -623.6/-443.9 —
  no overlap. No horizontal overflow (`scrollWidth === clientWidth`).
- 390×844: `.meet-doodle` top 3319.3 vs. second paragraph bottom 3263.3 — 56px
  clear gap, doodle fully contained within the extended section. Mission
  doodle re-centred inside the hands' heart void (confirmed visually across
  several GIF animation frames via screenshot, including the full-size heart
  frame). No overflow.
- 430×932: `.meet-doodle` bottom -476.3 vs. paragraph bottoms -836.7/-684.3 —
  no overlap. Mission doodle vertical centre 340.3 vs. photo-wrap vertical
  centre 329.8 — closely centred. No overflow.
- 1440×900 (desktop): `.meet-section` computed `padding-bottom: 0px` (mobile
  rule correctly scoped out), `.meet-doodle` width 200px at `bottom: 24px;
  right: 5%` (original desktop rule, untouched), `.mission-love-doodle` width
  130px at the original desktop `top`/`left` — both doodles match pre-change
  desktop placement exactly.
- Both GIFs retain `alt=""`, `aria-hidden="true"`, `unoptimized`, and
  `Parallax` wrapping — no JSX changes were made.

**Checks**:
- `npm run lint` — passes, no warnings/errors.
- `npm run build` — succeeds, all 11 routes prerender statically as before.

**Deviations from the plan**: none — implementation followed the two
prescribed edit points (`.meet-doodle`/`.meet-section` mobile block,
`.mission-love-doodle` mobile block) without touching `.meet-inner`, photo, or
text rules.

No commit/push made — left for review per task contract.

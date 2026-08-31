# MH-003: Home hero asset refresh

Status: ready-for-review
Base: `210e70828e65b5ce49af63b97c16fad4547dfe29` (`origin/main`)

## Outcome

The home hero's corkboard background and two polaroids use the newly
supplied Cloudinary artwork, with the polaroids' baked-in angle standing in
for the previous CSS rotation, and the board-pin doodad removed since the
new polaroid art no longer needs one.

## Context

Recorded from the user-approved plan delivered in this session (no
`.context/plans/` file — plan and acceptance criteria were given directly in
chat and are reproduced below). `AGENTS.md`'s branch baseline was updated in
this same session to name `origin/main` as authoritative; this task is based
on `origin/main` at `210e708`, the current tip.

Three new Cloudinary assets were supplied:
- `v1788169584/Cork_board_for_Marang.webp` (hero background)
- `v1788169591/Polaroid_1_Marang_House.png` (first hero polaroid)
- `v1788169586/Polaroid_2_Marang_House.png` (second hero polaroid)

All three verified to resolve (HTTP 200) via the `f_auto,q_auto` delivery
URL before wiring in.

## Scope

### In
- `app/page.tsx`: swap the three `cld(...)` source paths for the hero
  background (`BgPhoto` via `MH-pinboard-BG.png`) and the two polaroid
  `Image` components (`MH-polaroid-1.png`, `MH-polaroid-2.png`).
- `app/page.tsx`: remove the `hero-board-pin` `Image` element (the pin
  sitting on polaroid 1).
- `app/globals.css`: remove the `transform: rotate(...)` declarations from
  `.hero-polaroid-1-wrap` and `.hero-polaroid-2` (new artwork is
  pre-angled) — all other declarations on those rules (position, width,
  right/top offsets, filter) unchanged, including the two responsive
  breakpoints that only touch width/right/top.
- `app/globals.css`: remove the now-unused `.hero-board-pin` rule and its
  explanatory comment.

### Out
- Hero text, CTA, logo doodle, kids-sketch doodle, WhatsApp FAB.
- Any other page (About, Lightkeepers, Donate, Contact).
- Deployment, domain/branch changes, dependency changes.
- Polaroid/corkboard dimensions, crop position, `sizes`, or responsive
  breakpoint values — only the source path and rotation transform change.

## Acceptance Criteria

- [x] All three supplied Cloudinary assets load successfully in the
      rendered hero (no 404s, no broken-image icon).
- [x] Both replacement polaroids render in their current hero locations
      (same position/size/offsets as before) with no CSS rotation applied.
- [x] No board-pin image renders anywhere in the hero.
- [x] Hero text, CTA, sketch doodle, accessibility behaviour (alt text,
      `aria-hidden` on decorative doodads), and responsive layout at the
      existing breakpoints are otherwise unchanged.

## Verification

- `npm run lint`
- `npm run build`
- Browser-check the home page at 1440px and 390px widths: confirm all
  three assets load, no horizontal overflow
  (`document.documentElement.scrollWidth - clientWidth === 0`), stable
  polaroid placement, no visual collision with hero text/CTA.

## Assumptions

- The supplied Polaroid 1 and Polaroid 2 assets are correctly pre-angled
  for their respective existing placements (Polaroid 1's wrap previously
  rotated -4deg, Polaroid 2 previously rotated -14deg) — this task does not
  attempt to verify the art's angle by eye beyond the browser check above.

## Decisions

- Confirmed with Max: implement directly on the current workspace branch
  (`architect-these-changes`), no separate task branch cut for this change.

## Handoff

**Files changed:**
- `app/page.tsx` — swapped the three `cld(...)` source paths (background +
  both polaroids), removed the `hero-board-pin` `Image` element.
- `app/globals.css` — removed `transform: rotate(-4deg)` from
  `.hero-polaroid-1-wrap` and `transform: rotate(-14deg)` from
  `.hero-polaroid-2`; removed the `.hero-board-pin` rule and its
  explanatory comment. No other declarations on those rules touched;
  responsive breakpoints at 1400px/540px untouched.

**Verification run:**
- `npm run lint` — pass, no output.
- `npm run build` — pass, all 8 routes prerender as static content.
- `grep` confirmed no remaining references to `hero-board-pin`,
  `MH-board-pin-blue`, `MH-pinboard-BG`, or the old polaroid filenames
  anywhere in `app/` or `components/`.
- Cloudinary asset check: all three new URLs (`f_auto,q_auto` delivery)
  returned HTTP 200 before wiring in.
- Browser-verified via `next start` (production build) + Playwright at
  1440×900 and 390×844:
  - All three images (`complete: true`, non-zero `naturalWidth`) at both
    widths.
  - `document.documentElement.scrollWidth - clientWidth === 0` (no
    horizontal overflow) at both widths.
  - `document.querySelector('.hero-board-pin')` is `null` at both widths.
  - Screenshots confirm both polaroids sit pre-angled in their existing
    positions (no separate rotation applied), hero text/CTA/logo
    doodle/kids-sketch unchanged and not overlapped, nav and
    "Become a Lightkeeper" band render normally beneath the hero.

**Follow-up tweak (same session, post-review feedback from Max):**
- `.hero-polaroid-1-wrap` given `transform: translateY(-10px) rotate(15deg)`
  — raises polaroid 1 10px and angles it 15° clockwise, since the new
  artwork needed a bit more visual interest than dead-level.
- Added `.hero-photo::after`, a `rgba(150,70,10,.35)` tint overlay, because
  the new `Cork_board_for_Marang.webp` renders noticeably lighter than the
  original background — darkens/warms it back down without touching the
  image asset. Scoped to `.hero-photo` only (not reused elsewhere on the
  site, confirmed by grep), `pointer-events: none` so it doesn't block the
  WhatsApp FAB or any hero interaction.
- Re-verified: `npm run lint` clean, `npm run build` passes, Playwright at
  1440×900 and 390×844 — no horizontal overflow, tint visible, rotation
  applied (confirmed via computed `transform` matrix), no collision with
  hero text/CTA.

**Second follow-up tweak (same session, further feedback from Max):**
- `.hero-polaroid-1-wrap`: `top` changed from `15%` to `8%` (matches
  `.hero-polaroid-2`'s `top: 8%` exactly, same rendered height at 1440px:
  56px/56px), and `transform` changed from `translateY(-10px) rotate(15deg)`
  to `rotate(-5deg)` (angled left instead of right, no vertical nudge
  needed now that `top` matches directly).
- `.hero-sketch`: `right: 4%` → `right: calc(4% + 20px)`, shifting the
  kids-sketch doodle (`MH-kids-sketch.png`) 20px further left.
- Re-verified: `npm run lint` clean, `npm run build` passes, Playwright at
  1440×900 and 390×844 — computed `transform` matrices confirm exact -5°
  rotation on polaroid 1, computed `top` confirmed identical (56px) on
  both polaroids, no horizontal overflow, no collision with hero text/CTA.

**Third follow-up tweak (same session, further feedback from Max):**
- `.hero-polaroid-1-wrap`: `transform: rotate(-5deg)` → `rotate(-2deg)`
  (adjusted 3° right/clockwise from the previous angle).
- `.hero-sketch`: `right: calc(4% + 20px)` → `right: 23%`, moving the
  kids-sketch doodle out from behind/right of polaroid 2 into the seam
  underneath and between the two polaroids (measured via
  `getBoundingClientRect` on both photos to find the horizontal midpoint
  of their combined footprint before choosing the new offset). `bottom: 0`
  left unchanged — already put it below both photos' visible bottoms at
  every breakpoint checked.
- Re-verified: `npm run lint` clean, `npm run build` passes, Playwright at
  1440×900, 1024×768, and 390×844 — sketch sits in the gap under/between
  both polaroids with no overlap against either photo, the hero text/CTA,
  or the WhatsApp FAB (checked via `getBoundingClientRect` overlap test at
  390px); no horizontal overflow at any width.

**Deviations:** none from the approved scope.

**Remaining risks:** none identified. Only the home hero was touched;
About/Lightkeepers/Donate/Contact were not exercised by this task's
verification since they're out of scope and use unrelated assets.

Status set to `ready-for-review`.

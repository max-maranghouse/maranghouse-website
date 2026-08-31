# MH-004: Lightkeepers hero top spacing

Status: ready-for-review
Base: `210e70828e65b5ce49af63b97c16fad4547dfe29` (`origin/main`)

## Outcome

The Lightkeepers hero (lighthouse banner image, "The Lightkeepers" heading,
sub-line, and "Donate via BackaBuddy" button — all part of the single
banner graphic/overlay) sits close under the nav instead of leaving a
large gap of orange background above it.

## Context

Direct request from Max in this session, no separate plan file. The hero
text and CTA are an absolutely-positioned overlay (`.lk-hero-overlay`)
inside the banner image container (`.lk-hero-graphic`), so they move as
one unit with the image — there was no separate "text block" to reposition.

## Scope

### In
- `app/globals.css`: reduce `.lk-hero`'s top padding (`70px` → `24px`),
  pulling the whole hero graphic (image + overlaid heading/sub-line/CTA)
  up toward the nav. Bottom padding (`90px`) and left/right padding
  (`5.5%`) unchanged.

### Out
- Any other Lightkeepers section, any other page, the banner artwork
  itself, `.lk-hero-overlay`'s internal positioning (left/right/top/bottom
  percentages), deployment.

## Acceptance Criteria

- [x] Visible gap between the nav and the top of the lighthouse banner
      graphic is substantially reduced on desktop and mobile.
- [x] Heading, sub-line, and CTA remain correctly positioned on the
      banner's blue card area (unchanged relative position — they move
      with the image, not independently).
- [x] No overlap between the hero and the nav at any checked width.

## Verification

- `npm run lint` — pass, no output.
- `npm run build` — pass, all 8 routes prerender as static content.
- Browser-verified (Playwright, production build via `next start`) at
  1440×900 and 390×844: screenshots confirm the hero now starts right at
  the nav edge with minimal gap (previously ~70px empty padding plus the
  banner art's own transparent sky above the lighthouse); no horizontal
  overflow (`scrollWidth - clientWidth === 0`) at either width; no overlap
  with the nav.

## Decisions

- Only `.lk-hero`'s top padding was touched — the large *remaining* gap
  visible above the lighthouse tip in the screenshots is transparent sky
  baked into `MH-lightkeepers-banner.png` itself, not CSS spacing; fixing
  that would mean re-cropping the source artwork, which is out of scope
  for this request.

## Handoff

**Files changed:** `app/globals.css` — `.lk-hero` padding-top `70px` → `24px`.

**Verification run:** as above; both pass, screenshots reviewed at
1440×900 and 390×844.

**Deviations:** none.

**Remaining risks:** none identified. If more of the orange gap above the
lighthouse still reads as "too much space" after this, the remaining
whitespace is in the artwork itself and would need a re-crop/re-export of
`MH-lightkeepers-banner.png`, not a CSS change.

Status set to `ready-for-review`.

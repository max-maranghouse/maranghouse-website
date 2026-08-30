# MH-002: Visual polish, donation UI, and copy cleanup

Status: ready-for-review
Base: `0d0a5eb2b82efd9a50b0f4f20cb1c40a561fa721` (`origin/main`)

## Outcome

Home, About, Lightkeepers, Donate, and Contact read as a finished, coherent
visual pass — no cropped or undersized hero imagery, no decorative GIF
spilling across a section seam, a donation page whose bank/tax/B-BBEE
information reads as designed cards rather than plain white boxes, and
copy free of em dashes and the "towns and villages" phrasing.

## Context

Recorded from `.context/attachments/kPMrxg/plan.md` /
`.context/plans/mh-002-visual-polish-donation-ui-and-copy-cleanup.md` per
that plan's own assumption 3 ("recorded as `.ai/tasks/...` before
implementation").

`AGENTS.md` names `origin/rebuild/marang-v3` as the authoritative branch;
the plan explicitly bases this task on `origin/main` at `0d0a5eb` instead.
Confirmed with Max before implementation: proceed on `origin/main`,
`AGENTS.md` is stale on this point. The two branches have diverged since
`2e55780` and neither is an ancestor of the other — this task does not
reconcile them.

Two asset filenames in the plan (`MH-group-hands.png`, `MH-likes-giff.gif`)
had no confirmed Cloudinary path. Verified both resolve (HTTP 200) at the
flat-filename convention used elsewhere in the codebase before wiring them
in: `MH-group-hands.png` is 1000×667 (matches the plan's stated 3:2), and
`MH-likes-giff.gif`'s first frame renders blank/mostly-white — confirmed
this matches the same first-frame behaviour as the already-working
`MH-love-giff.gif`, not a broken asset.

## Scope

### In
- Home: group photo swap + wider photo stage, larger girl-arch photo,
  rebuilt mission section (sun rays + contained heart-hands image), smaller
  repositioned hero pin, involved-section reframe + Likes badge, decorative
  GIF audit/rebalance across the page.
- Decorative-asset audit across Home/About/Lightkeepers/Donate/Contact:
  every decorative GIF and the two `MH-real-cloud.png` instances brought
  to a positive, consistent inset and a 180px (desktop) / 132px (mobile)
  minimum rendered size.
- Lightkeepers: hero artwork cap 800px → 1600px, CTA keychain 180px → 540px
  desktop with a responsive mobile cap.
- Donate: two-column hero (photo left / high-contrast panel right,
  stacking photo-then-panel on narrow screens), bank-transfer box rebuilt
  as a navy `dl` card, tax/B-BBEE strips rebuilt as branded info tiles.
- Copy: every rendered em dash (including metadata and the Lightkeepers
  pull-quote citation) replaced with a comma or full stop as grammar
  requires; "towns and villages across South Africa" → "communities
  across South Africa".

### Out
- Dependencies, donation data, Formspree/contact-form behaviour,
  deployment, branch/domain changes, `/press`.
- Any copy meaning/claim change beyond the em-dash and village-phrase
  edits; developer comments (left untouched even where they contain em
  dashes).

## Acceptance Criteria

- [x] Home identity section shows `MH-group-hands.png` at its native 3:2
      ratio in a widened, uncropped photo stage.
- [x] "A Day at Marang House" girl-arch photo is visibly larger on both
      desktop and mobile without clipping.
- [x] Mission section shows the complete heart-hands image (top and bottom
      hands both visible) over a sun-rays backdrop, with mission text
      still readable above it.
- [x] Hero board pin is smaller, unstretched, fully on the first polaroid,
      and moved down/right from its previous position.
- [x] Involved-section background photo has no rounded/framed card
      treatment; the Likes badge sits centred on the section's top edge,
      half above and half over, with the heading clear of it.
- [x] Every decorative GIF instance (plus both `MH-real-cloud.png` uses)
      sits on a positive inset inside its own section and renders at
      ≥180px desktop / ≥132px mobile.
- [x] Lightkeepers hero artwork scales up to a 1600px cap without breaking
      the artwork-relative text/CTA overlay; the CTA keychain renders at
      540px desktop with a mobile cap that doesn't overflow.
- [x] Donate hero is a responsive two-column layout (photo left / panel
      right on desktop, photo above panel on mobile).
- [x] Donate bank-transfer details render as a semantic `dl` inside a navy
      card; the tax and B-BBEE strips render as matching tiles
      distinguished by icon/eyebrow/heading, not colour alone, with
      unchanged headings, facts, links, and heading order.
- [x] No rendered em dash remains in copy or metadata across the five
      pages/layout (developer comments excluded); "towns and villages"
      no longer appears.

## Verification

- `npm run lint` — pass, no output/warnings.
- `npm run build` — pass, all 6 routes prerender as static content.
- `grep -rn "—"` across all five page files + `app/layout.tsx` — only
  developer `{/* ... */}` comments remain; one missed rendered instance
  (Lightkeepers "Why Monthly?" paragraph) was caught by this sweep and
  fixed. `grep -rni "village"` returns no matches anywhere in `app/`,
  `lib/`, `components/`.
- Browser-verified (Playwright, production build via `next start`) at
  390×844, 768×1024, and 1440×900 on all five routes:
  - `document.documentElement.scrollWidth - clientWidth === 0` (no
    horizontal overflow) confirmed at all three widths on all five pages.
  - No console errors/warnings on any page at any width.
  - Mission section: confirmed both top and bottom hands visible in the
    heart-hands image, rays background behind it, text readable above —
    at both 1440 and 390. (Initial check hit a lazy-load timing false
    alarm — image wasn't yet in viewport — not a real defect.)
  - Hero pin: visually confirmed smaller, fully within the first
    polaroid's white border, no longer poking off the top/left edge.
  - Lightkeepers hero: artwork visibly wider than the old 800px cap;
    text/CTA overlay stayed correctly positioned on the artwork's blue
    card area. CTA keychain confirmed ~540px desktop, capped at 140px
    mobile.
  - Donate hero: confirmed two-column (photo left/panel right) at 1440,
    photo-above-panel stacking at both 768 and 390 (`getBoundingClientRect`
    check: photo `top` < panel `top` after stacking).
  - Bank-transfer `dl` renders as a single column at 390px; two-column
    label/value grid at 1440.
  - Automated `getBoundingClientRect()` overlap sweep of every decorative
    doodle against its section's nearest heading, at 390px, across all
    five pages: **found real collisions** on first pass — the Home
    sponsors-section cloud+sun, About's What-We-Do cloud, Lightkeepers'
    impact-section doodle, and the Home involved-section's pre-existing
    cloud doodle all sat on top of their section heading once the mobile
    minimum doodle size grew to 132px and insets became positive. Fixed
    by adding mobile `padding-top` clearance to `.sponsors-section`,
    `.about-whatwedo`, `.lk-impact`, and `.involved-band`; re-ran the same
    automated sweep after the fix — zero overlaps remained.
- Re-screenshotted all four patched sections at 390px after the fix (Home
  sponsors section, Home involved section including the badge/seam
  overlap, About What We Do, Lightkeepers impact grid) — all clear, no
  collision, badge straddles the section seam as designed.

## Decisions

- The Likes badge is treated as an *addition* to the involved section, not
  a replacement for its existing cloud doodle — matches the plan's own
  assumption 1 ("the Likes GIF is the requested new exception").
- Moved the sponsors section's second GIF (`MH-star-giff.gif`) to the
  identity section (opposite side from the meet-section doodle, to keep
  doodles alternating sides down the page) rather than deleting it.
- Standardised every decorative-doodle inset to a flat 24px (16px would
  have worked equally well) rather than preserving each section's
  original bespoke offset, per "consistent safe insets."
- Donate hero CTA button keeps the existing `ButtonLink` `primary` variant
  (yellow-on-navy) unchanged — reads as high-contrast against the new
  orange panel background without a variant change.
- Second follow-up round at Max's request: nudged the mission love-gif
  further down (2cm ≈ 76px, via the existing centred `transform`) so it
  sits lower in the hands' negative space; nudged the hero board pin 1cm
  down and 1cm right (≈38px via `calc()` added to its existing % offsets,
  transform/mirroring untouched) rather than moving the polaroid itself;
  swapped the "A Day At Marang House" section's love-heart gif for the
  star gif (`v1786782369/MH-star-giff.gif`, the same asset already used
  elsewhere) to vary the decorative gif per section; and moved the
  Likes badge from straddling the involved-section's top seam to sitting
  fully on the Blur background image, just above the heading — increased
  `.involved-band`'s padding-top to match so the heading still clears it.
  Verified in-browser (lint, build, screenshots at 1440 and 390, overlap
  + overflow checks) after each change.
- Follow-up round (post-review, same task) at Max's request: moved the
  mission section's love-gif to sit centred in the heart-hands negative
  space and shrank it (200px → 90px desktop / 60px mobile); reverted the
  hero board pin to its original position and instead enlarged and nudged
  the first polaroid down/right; enlarged the About "Children We Serve"
  photo 1.3x (400px → 520px max-width); centred the Salome section body
  copy and switched its pull-quote from a left-border to a centred
  top/bottom-rule treatment; enlarged the About "What We Do" tiles
  (280px → 360px); shrank the Lightkeepers CTA keychain back down
  (540px → 260px desktop) since it was crowding the CTA text; changed the
  Donate hero's copy panel from a flat orange fill to the same rays
  gradient used elsewhere on the site; and removed the sponsors ("Trusted
  By") section's faint rays-photo overlay so it no longer nearly
  duplicates the Mission section's background directly above it —
  verified in-browser (lint, build, and Playwright screenshots) after
  each change.
- Raising the mobile decorative-doodle minimum to 132px (from the previous
  effectively-100px cap) and switching top-corner doodles to positive
  insets pushed several of them down into their section's heading text at
  390px — not obvious from the CSS alone, only caught by an automated
  bounding-box overlap sweep in a real browser. Fixed with per-section
  mobile `padding-top` clearance (`.sponsors-section`, `.about-whatwedo`,
  `.lk-impact`, `.involved-band`) rather than shrinking the doodles below
  the required minimum.

## Handoff

- Repair 2026-08-30: restored the Bank transfer heading to `h3`, preserving
  the documented Donate heading order. Updated its scoped CSS selector from
  `.bank-box h2` to `.bank-box h3` so the visual treatment remains unchanged.
- Verification after repair: `npm run lint` — pass; `npm run build` — pass,
  all 9 static routes generated.

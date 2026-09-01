# MH-005: Mobile UI alignment and artwork correction

Status: ready-for-review
Base: `b761879` (`origin/main`)

## Outcome

A mobile-only CSS pass (`max-width: 760px`, with narrower hero-specific
refinements down through `max-width: 540px`) that: centers the Home hero's
logo/heading/body/CTA; nudges `.mission-love-doodle` 2px higher; keeps the
"How You Can Get Involved" likes GIF clipped inside its own section; hides
the Lightkeepers "sun" doodle GIF (`MH-shun-giff.gif`, `.lk-impact-doodle`)
on mobile and removes the padding added only to clear it; enlarges the
"Join The Circle of Light" keychain to 220px; and centers narrative
headings/copy/CTA groups on Home, About, Lightkeepers, Donate, Contact, and
the shared footer wherever they are presently left-aligned — while leaving
structured data (form fields, bank details, contact/address/hours blocks)
left-aligned.

**Post-implementation revisions (same session, both at Max's request):**
1. The Lightkeepers hero banner's mobile treatment (full-bleed, re-centered
   overlay with its own backdrop, raised type scale, 44px CTA) was
   reverted — that section is back to the pre-MH-005 mobile behaviour
   (desktop's `left: 46%` overlay box, no side-gutter changes).
2. The Home hero's mobile artwork treatment (re-laying the polaroids +
   kids sketch into an upper band) was replaced with hiding all three
   images outright on mobile — Max found the re-laid artwork wasn't
   fitting/working well at mobile widths. Desktop (`≥1400px` and the
   761px+ range) keeps the full corkboard artwork untouched.

See Decisions and Handoff below for both.

## Context

Direct request from Max, supplied as `.context/attachments/hPOPWG/plan.md`
in this session (no separate architect pass). Scope, breakpoints, and
per-section behaviour are taken verbatim from that plan; this task file
records it in the repo's task format and captures the implementation
decisions made while executing it.

## Scope

### In
- `app/globals.css` only. Mobile media queries (`max-width: 760px` and
  narrower) for:
  - `.hero-content`, `.hero-doodads`, `.hero-btns` (Home hero — text
    centering, and hiding `.hero-doodads` — the polaroids/sketch — on
    mobile; see Decisions).
  - `.mission-love-doodle` (Mission section, transform offset only).
  - `.involved-section` (How You Can Get Involved, likes GIF clipping).
  - `.lk-impact-doodle`, `.lk-impact` (remove the sun-doodle mobile
    clearance padding).
  - `.lk-cta-keychain` (Lightkeepers CTA keychain width).
  - `.lk-card-text`, `.identity-text`/`.identity-list`, `.lk-what-text`,
    `.lk-why-text`/`.lk-why-quote`, `.about-navy-left`/`.about-navy-list`,
    `.about-children-text`, `.donate-other-card`, `.site-footer__brand`/
    `.site-footer h2` (narrative-copy centering pass).

### Out
- Any desktop (non-mobile-media-query) rule, any component/JSX, any asset,
  Cloudinary URL, link, or copy text.
- `.lk-hero`, `.lk-hero-graphic`, `.lk-hero-overlay` and its children,
  `.lk-hero-overlay-cta` (Lightkeepers hero banner) — implemented, then
  explicitly reverted at Max's request in the same session; see Decisions.
- Structured-data elements: `.contact-form` fields, `.bank-box`/
  `.bank-details`, `.info-tile`, `.find-us-cols` (address/hours — already
  correctly left-aligned against a centered parent, used as the reference
  pattern for this task), `.contact-aside .contact-line`,
  `.site-footer__nav`, `.site-footer__contact address`.
- `/press` (empty stub, unaffected either way).

## Acceptance Criteria

- [x] Home hero: logo, heading, body, CTA centered on mobile.
- [ ] ~~Polaroids sit in an upper artwork band, sketch enlarged and placed
      below the polaroids and above the content area; all three clear of
      the title and CTA at 320–430px~~ — implemented, then replaced at
      Max's request: the re-laid artwork wasn't fitting/working well on
      mobile, so all three images (`.hero-doodads`) are hidden outright on
      mobile instead; desktop keeps them unchanged. See Decisions.
- [x] `.mission-love-doodle` sits 2px higher on mobile only (transform
      `+38px` → `+36px`), desktop untouched.
- [x] Likes GIF (`.involved-badge`) stays visually clipped inside its own
      section background, centered above the heading, at all checked
      mobile widths.
- [ ] ~~Lightkeepers hero is full-bleed on mobile, overlay text is centered
      and legible, CTA has a ≥44px touch height~~ — implemented, then
      reverted at Max's request (see Decisions); Lightkeepers hero is back
      to its pre-MH-005 mobile behaviour.
- [x] Sun doodle GIF (`.lk-impact-doodle`) is hidden on mobile and
      `.lk-impact`'s mobile-only clearance padding is removed; keychain
      (`.lk-cta-keychain`) is 220px wide.
- [x] Narrative headings/copy/CTA groups centered at mobile widths across
      Home, About, Lightkeepers, Donate, Contact, and the footer where
      previously left-aligned; structured data blocks remain left-aligned.
- [x] No desktop (1440×900) visual change on any touched page.

## Verification

- `npm run lint`
- `npm run build`
- Browser-check Home and Lightkeepers at 320×568, 390×844, 430×932: no
  horizontal overflow; Home hero artwork (polaroids/sketch) hidden with no
  leftover empty gap; love doodle centered and 2px higher; likes GIF
  inside its section background; sun doodle absent on Lightkeepers,
  keychain prominent.
- Check About, Donate, Contact, and footer at 390px: centered narrative
  copy, left-aligned bank details/form fields/address/hours.
- Regression-check Home and Lightkeepers at 1440×900 for no desktop change.

## Decisions

- **Home hero artwork on mobile — implemented, then replaced:** the first
  pass re-laid `.hero-polaroid-1-wrap`/`.hero-polaroid-2`/`.hero-sketch`
  into a stacked upper band (polaroids top, sketch centered beneath) at
  the `540px`/`410px` breakpoints, with `.hero` given extra `min-height`
  to fit them. Max reviewed this on mobile and found it wasn't fitting or
  working well, and asked for the three images to be removed on mobile
  entirely (desktop kept as-is). Implemented as `.hero-doodads { display:
  none; }` inside the existing `760px` text-centering block — this single
  rule hides all three images at once, since they're its only children.
  The now-dead per-breakpoint repositioning/`min-height` overrides at
  `540px`/`410px` were deleted rather than left in place hidden behind the
  `display: none`, and `.hero`'s `min-height` was allowed to fall back to
  the base (non-mobile-specific) `700px` rather than the artwork-driven
  `1060px`, since there's no photo content left to make room for — a
  taller mobile hero would otherwise just show more empty corkboard.
- **Lightkeepers hero overlay on mobile — implemented, then reverted:**
  the first pass gave the overlay full-bleed banner treatment and its own
  translucent backdrop, reasoning that the underlying artwork's blue-card
  region is a fixed percentage of the image regardless of viewport width,
  so a wider overlay box on a full-bleed image would otherwise land text
  over unrelated artwork (sky/lighthouse) with nothing legible behind it.
  Max reviewed this on mobile and asked for the section to be undone —
  the `max-width: 760px` block for `.lk-hero`/`.lk-hero-graphic`/
  `.lk-hero-overlay`/`.lk-hero-overlay-cta` was removed in full, restoring
  the pre-MH-005 mobile behaviour (desktop's `left: 46%` box, `padding: 24px
  5.5% 90px`, `clamp()`-scaled type, no backdrop). Nothing else in this
  task was touched by the revert.
- **List/bullet blocks inside centered narrative sections** (`.identity-list`,
  `.about-navy-list`): centered the parent block (heading/paragraphs) but
  reset the list itself back to `text-align: left`, following the same
  parent-centers/child-resets-left pattern already used by
  `.find-us-cols` (address/hours) against `.find-us-inner`'s centered
  text — treated as the established convention for "narrative container,
  structured-ish child" rather than inventing a new one.
- **`.donate-other-card` and footer headings** were included in the
  narrative-copy centering pass (previously left-aligned prose + CTA
  button) since the plan's exception list names bank/form/contact/address/
  hours specifically, not general card copy or section eyebrow headings.
- Several targets already matched the requested end state before this task
  (`.meet-text`, `.mission-banner-content`, `.involved-heading`/
  `.involved-lead`, `.stats-heading`, `.support-inner`,
  `.donate-hero-text`, `.contact-hero-content`, `.contact-form-aside-text`,
  `.find-us-cols`) — left untouched, not re-declared.

## Handoff

**Files changed:** `app/globals.css` only, all changes inside new or
existing mobile media queries (`max-width: 760px` and narrower — plus one
`max-width: 47.999rem` footer query, same 48rem/64rem breakpoint language
already used for `.site-footer__grid`). No JSX, assets, links, or copy
touched.

- Home hero (`.hero-content`, `.hero-doodads`, `.hero-btns`): `max-width:
  760px` block centers the text stack and hides `.hero-doodads` (the
  polaroids + kids sketch) outright. An interim version instead re-laid
  the three images into a stacked upper band at `540px`/`410px` — replaced
  per Max's request (see Decisions); the `540px`/`410px` blocks now only
  carry the (still-needed) CTA button width/wrap rules, and `.hero`'s
  mobile-only `min-height` bump was removed along with it.
- `.lk-card-text` (Become a Lightkeeper) and `.identity-text`/
  `.identity-list` (We Are Marang House): centered narrative copy at their
  existing 760px/1000px breakpoints; lists reset to `text-align: left`.
- `.mission-love-doodle`: new `max-width: 760px` rule, transform `+38px` →
  `+36px`, desktop's base rule untouched.
- `.involved-section`: `overflow: hidden` added at the existing 600px
  breakpoint so the likes GIF clips to its own section.
- Lightkeepers hero (`.lk-hero`, `.lk-hero-overlay` and children,
  `.lk-hero-overlay-cta`): initially given a `max-width: 760px` block —
  full-bleed padding, overlay re-centered with its own translucent
  backdrop, raised type scale, CTA `min-height: 44px` — then that entire
  block was deleted in a follow-up revert at Max's request (see
  Decisions). Net change to this section: **none**.
- `.lk-impact-doodle` hidden at 760px; the `.lk-impact` padding-top
  override that existed only to clear it was removed (falls back to the
  base rule's 80px).
- `.lk-what-text`, `.lk-why-text`, `.lk-why-quote`: centered at their
  existing 860px breakpoint.
- `.lk-cta-keychain`: 140px → 220px (`max-width: 60vw` added as a floor
  guard) at the existing 660px breakpoint.
- `.about-navy-left`/`.about-navy-list`, `.about-children-text`: centered
  at the existing 900px breakpoint (list reset left).
- `.donate-other-card`: centered card copy + CTA at the existing 760px
  breakpoint.
- `.site-footer__brand`, `.site-footer h2`: new `max-width: 47.999rem`
  block centers the brand name/tagline and section headings;
  `.site-footer__nav`/`.site-footer__contact address` untouched.

**Verification run:**
- `npm run lint` — pass, no output.
- `npm run build` — pass, all 9 routes prerender as static content.
- Browser-verified (Playwright, production build via `next start`):
  - Home and Lightkeepers at 320×568, 390×844, 430×932 — no horizontal
    overflow (`scrollWidth === clientWidth` confirmed at 320 and 390); love
    doodle centered in the heart-hands gap; likes GIF sits inside its
    orange section background, centered above the heading; `.lk-impact`
    has no sun doodle and normal top padding; keychain renders large and
    prominent. (Lightkeepers hero itself checked pre-revert only — see
    below.)
  - Re-checked Home at 390×844 after replacing the hero-artwork approach:
    `.hero-doodads` confirmed hidden, no leftover empty gap above the
    centered text (`.hero` height ~777px, vs. its base 700px min-height —
    driven by content, not an artwork allowance), no horizontal overflow.
  - About, Donate, Contact, and footer at 390×844 — narrative headings/
    copy/CTAs (We Are Marang House, The Children We Serve, Other Ways To
    Give cards, footer brand/section headings) centered; bank details,
    address, and opening hours confirmed still left-aligned.
  - Home and Lightkeepers at 1440×900 — visually compared against the
    pre-change desktop layout; hero, Become-a-Lightkeeper card, and
    Lightkeepers banner/overlay all unchanged; confirmed via computed
    styles that `.lk-impact-doodle` is still `display: block` and
    `.lk-cta-keychain` is still `260px` at this width. Re-checked Home at
    1440×900 again after hiding the mobile hero artwork: both polaroids
    and the kids sketch still render exactly as before.
  - `npm run lint` and `npm run build` both re-run clean after the
    hero-artwork change (in addition to the earlier post-revert re-run).

**Deviations:** two plan items were implemented, reviewed by Max on real
mobile viewports, and then changed in follow-up rounds within this same
session:
1. The Lightkeepers hero mobile treatment (plan item 4's full-bleed/
   centered-overlay/44px-CTA request) was implemented, verified, then
   fully reverted — the `max-width: 760px` block for `.lk-hero`/
   `.lk-hero-graphic`/`.lk-hero-overlay`/`.lk-hero-overlay-cta` was
   deleted outright, restoring the pre-MH-005 mobile behaviour.
2. The Home hero's mobile artwork treatment (plan item 1's "re-lay the
   polaroids/sketch into an upper band" request) was implemented,
   verified, then replaced with hiding all three images on mobile
   outright — Max found the re-laid artwork wasn't fitting/working well.
   Desktop is unaffected in both cases.

`npm run lint` and `npm run build` re-run clean after each change.
Everything else in the plan (mission doodle, likes GIF, sun doodle,
keychain width, and the general narrative-centering pass) is unaffected
and stands as originally implemented. Where the plan's general "center
narrative copy" instruction required a judgment call (list/bullet blocks,
which card/heading elements count as "narrative" vs. "structured"), the
call made is recorded under Decisions above.

**Remaining risks:** none identified for the current state. The Home hero
now shows only the corkboard background photo, headline, and CTA on
mobile — a deliberately simpler mobile hero than desktop's photo-rich
version, which is the outcome Max asked for, not a compromise. The
Lightkeepers hero banner is likewise now known to look acceptable to Max
in its original (desktop-matching) mobile form, so no further action is
expected on either.

Status set to `ready-for-review`.

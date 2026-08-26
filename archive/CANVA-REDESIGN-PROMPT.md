# Marang House — Canva Redesign: Claude Code Build Prompt

Paste this into Claude Code in the `Marang House Website` project to kick off the reskin.

---

## Task

Reskin the Marang House site to match the new Canva design exactly — layout, color, type,
iconography, motion — using the existing Next.js codebase on `overhaul/nextjs-migration` as
the base. Don't rebuild from scratch and don't lose the SEO/accessibility/security work
already done on that branch.

## Branch

New branch off `overhaul/nextjs-migration`: `redesign/canva-v2`. Nothing touches `main`.
Vercel preview deploys only until this is reviewed and approved.

## Visual reference (pixel-accurate target)

16 screenshots of the full Canva design, in page order, at `design-reference/canva-redesign/`:

```
01-home-hero.png                          — corkboard hero, bunting, polaroids, keyring badge
02-lightkeeper-banner-were-marang-house.png
03-mission-heart-hands.png
04-testimonials.png
05-all-support-welcome.png
06-how-you-can-get-involved.png           — Volunteer / Lightkeeper / Donate 3-card row
07-stats-band.png                         — Years / Children / Volunteers
08-we-are-marang-house-navy.png
09-what-we-do-icons.png                   — 3-icon row + "Nice To Meet You"
10-press-media.png                        — press hero + Featured Coverage grid
11-lightkeepers-hero.png                  — lighthouse graphic, "Donate via BackaBuddy" CTA
12-become-lightkeeper-card-real-info.png  — org info card: NPO/PBO/reg, address, bank, contact
13-lightkeepers-join-circle-INCOMPLETE.png — supporter showcase row, unfinished in the source (see note below)
14-contact-hero.png                       — "We'd Love To Hear From You" band
15-contact-form.png                       — Name / Email / Phone / Message form
16-contact-map-hours.png                  — "Where To Find Us" map + address + hours
```

Full editable Canva file (for reference if the screenshots are ever ambiguous — no need to
extract exact brand values from it, see below):
https://www.canva.com/design/DAHQ2U1QHUk/cfjkhvZUIFqcV6XymxF9SQ/view

Match spacing, type scale, corner radii, shadow style, and icon style as closely as the
screenshots show. Don't invent layout that isn't in them — if a breakpoint or state isn't
shown (e.g. mobile, hover states), ask rather than guess.

## Brand tokens — sample from the screenshots, don't chase the Canva source file

Max tried pulling exact hex/font values from Canva's Brand Kit and it wasn't worth the time —
**don't ask for that again.** Instead, sample colors directly from the PNG screenshots
(color-pick the pixels) and use the nearest round hex. The palette is clearly the same family
as the existing brand (`#004aad`-ish royal blue, orange, yellow, red) so this should land
close with no real risk. Same for fonts: match the visual weight/style shown (rounded, bold,
friendly sans for headings; clean sans for body) using the closest available Google/next-font
equivalent — don't block on identifying the exact typeface name. The main priority is that the
new design's layout, colors, and text are followed accurately — precision on exact hex codes
is explicitly not worth further time here.

## Assets — Cloudinary, already uploaded

- **Photography:** `maranghouse/marang-web-images/`
- **Static PNG cut-out elements** (icons, keyring art, house/sun mark, stat illustration):
  `maranghouse/MH-web-png-elements/`
- **Animated GIF overlay elements** (drifting clouds, twinkling sparkles, sun rays, bunting
  sway, pushpin/paperclip flourish): `maranghouse/MH-web-giff-elements/`

Use `f_auto,q_auto` on every Cloudinary URL per the existing convention (`lib/images.ts`).

**On the GIFs specifically:** check file size before wiring each one in. Anything over
~1–2MB will hurt LCP/CLS if it's above the fold (the hero has several animated overlays).
Where a GIF is large, convert it to a muted autoplay `<video>` loop instead — same visual
result, far lighter. Flag which ones you converted rather than silently converting
everything, and flag any that are fine to keep as-is.

## Sections to rebuild → existing routes

1. Home hero (corkboard bg, bunting, polaroid photos, keyring badge, "Fostering Health,
   Providing Hope." headline, Donate + Get Our Newsletter CTAs) → `/`
2. "Become A Lightkeeper" banner (limited-edition keyring copy) → home, Lightkeepers section
3. "We're Marang House" intro band → home / About teaser
4. "Our Mission" heart-hands full-bleed image band → home or `/about`
5. Testimonials (3 quotes) → home
6. "All support is Welcome!" band → home / Donate teaser
7. "How You Can Get Involved" — Volunteer / Lightkeeper / Donate 3-card row → home
8. Stats band (Years / Children / Volunteers) → home
9. "We are Marang House" navy band + "What We Do" 3-icon row + "Nice To Meet You" → `/about`
10. Press hero + "Featured Coverage" 3-card grid → `/press`
11. Lightkeepers hero (lighthouse graphic, "Donate via BackaBuddy" CTA) → `/lightkeepers`
12. "Become A Lightkeeper" info card (NPO/PBO/reg numbers, bank details, address, contact) →
    `/lightkeepers`
13. "Join The Circle" supporter showcase row → `/lightkeepers` — **see note below, this one
    isn't a straight port**
14. Contact hero ("We'd Love To Hear From You") → `/contact`
15. Contact form (Name / Email / Phone / Message) → `/contact` — keep the existing Formspree
    wiring (form ID `xjgnonlz`, `@formspree/core`), just rebuild the layout/fields to match:
    add a Phone Number field if the current form doesn't have one, keep honeypot spam field
16. "Where To Find Us" — map embed + address + hours → `/contact`

`/donate` detail page wasn't shown in the screenshots — confirm with Max whether it gets the
same redesign treatment or keeps its current layout.

### Lightkeepers "Join The Circle" section — not a straight build

Screenshot 13 shows this section unfinished in the Canva file itself — rows of circles with
literal "Insert Name Here" placeholder text, still in Canva's editor chrome. This isn't
content to port, it's an open product question: **how should recurring BackaBuddy donors
(the Circle of Light monthly givers) actually surface on this page?** Options, roughly in
order of effort:
- Check whether BackaBuddy's campaign page (backabuddy.co.za/campaign/marang-circle-of-light)
  offers an embeddable supporter widget — cheapest if it exists.
- A manually-curated list Max updates periodically (simplest to build, needs no integration).
- Skip this section for the initial redesign launch and revisit once the mechanism is decided.
Build the rest of `/lightkeepers` and leave this section as an explicit TODO rather than
guessing at a data source or inventing names to fill the placeholder circles.

## Content — use verified facts, not what's in the Canva mockup where they conflict

The Canva mockup has placeholder content in several spots that must not ship as real:

- **Press section headlines are questionable — build the layout, hold off publishing the
  copy as final.** The mockup shows three articles (Business Day "breaks ground on 200-unit
  Gauteng development," Property24 "Inside Marang Houses: Design meets affordability," Mail &
  Guardian "Community-first housing") describing a property developer building housing units
  — doesn't match a 12-child chronic-illness care home. Max's read is the links/sourcing may
  just be wrong rather than the section being fabricated outright, and he'll sort out the real
  citations later — not a launch blocker. Build the "Featured Coverage" 3-card layout exactly
  per the mockup, but keep the headline/date/link content easy to swap out in one place (e.g.
  a small data array) rather than hardcoded per-card, so it's a two-minute fix once Max
  confirms the real coverage.
- **Testimonial names/quotes don't match the site's own records.** Mockup shows Rosita
  Gaskin / Gugulethu Cele / Malwande Khumalo; the existing content inventory has Nkosi Speers
  / Eugalina Corn / Minwase Khamala for the same three slots, with slightly different quotes.
  Neither set is confirmed real. Use the mockup's visual style but leave the actual
  names/quotes as a placeholder TODO — don't merge the two sets or invent a third.
- **Stats band conflicts with existing copy.** Mockup: 27+ Years / 300+ Children / 1000+
  Volunteers. Existing site content: 25 Years / 100+ Children. Founding year is also
  inconsistent across sources (1993 per site context doc, 1998 per NPC registration number
  format). Style the band per the mockup but mark the actual numbers TBC pending Max's
  confirmation.
- **Age range: use 4–14, not 7–14.** The mockup says "children aged 7 to 14"; the site's
  verified content inventory says "4 and 14." Go with the verified figure unless Max
  overrides it.
- **Contact/org details — use these verbatim, confirmed real** (combined from the site's
  existing content and the new Canva screenshots, which agree with each other):
  - Phone: `011 476 6698` (also shown as `+27 11 476 6698`)
  - Email: `info@maranghouse.org`
  - Website: `www.maranghouse.org`
  - Address: 22 Milner Ave, Franklin Roosevelt Park, Johannesburg, 2195
  - Hours: Mon–Fri 9am–5pm, closed weekends
  - Bank: Nedbank, Business Northrand, branch 146-905, account 1469095769, SWIFT NEDSZAJJ
  - NPO number: 006 182
  - PBO number: 930 003 724
  - NPC registration: 1998/009809/08
  - Donations: BackaBuddy is the sole platform going forward (per the "Donate via BackaBuddy"
    CTA on the Lightkeepers screenshot and the existing site context doc) — campaign at
    backabuddy.co.za/campaign/marang-circle-of-light. GivenGain was dropped, don't reintroduce it.

## Constraints — carry over from the existing rebuild, don't regress

- Keep `next/image`, Cloudinary `remotePatterns`, `f_auto,q_auto`.
- Keep the security headers/CSP in `next.config.ts` — extend it if new asset types or paths
  need it, don't strip it.
- Keep the accessibility work already done — alt text on every new image, focus states and
  labels on every new interactive element, the skip-to-content link stays.
- Keep the Formspree contact form wiring (form ID `xjgnonlz`, `@formspree/core`) — rebuild
  `/contact`'s layout/fields per the new design, but the submission logic stays the same.
- Everything on `redesign/canva-v2` — don't touch `main`.

## Open questions — don't block the build on these, but don't guess either

1. Real press headlines/dates/links — not urgent, Max will supply once confirmed. Build the
   section so swapping copy in later is trivial.
2. Which testimonial names/quotes are real (mockup's Rosita Gaskin/Gugulethu Cele/Malwande
   Khumalo vs. the site's existing Nkosi Speers/Eugalina Corn/Minwase Khamala).
3. Correct founding year and current stats (years operating / children helped / volunteers).
4. Confirm age range: 4–14 or 7–14.
5. How recurring BackaBuddy donors surface on the Lightkeepers "Join The Circle" section (see
   note above) — needs a product decision, not a build guess.
6. Whether `/donate` also gets redesigned, or keeps its current layout.

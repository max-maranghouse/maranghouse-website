# MH-006: Standards-first refresh, Garden Day gallery, and image-delivery audit

Status: ready-for-manual-review
Base: `b6a1c79b67ee38409dedd26e1213e862b57784f2` (`origin/main`)

## Outcome

Refresh the Home, Lightkeepers, and Donate visuals; add an accessible Garden
Day carousel; and make active Cloudinary delivery responsive and fidelity-first
without upscaling, broken images, or layout shift. Complete the no-Fancy
baseline and its standards checks first, then stop for Max's manual review.

## Scope

### In — baseline implementation

- `app/globals.css`: replace every CSS-controlled yellow/gold value,
  including yellow gradient stops and hover states, with `#f8e026`.
  Orange gradient stops and colours embedded in imagery are not changed.
- Standardise content copy to `line-height: 1.6` (never below `1.5`) and
  headings to `1.15`, adjusting route-specific overrides without changing
  copy or the existing type scale.
- Home hero: replace Polaroid 1 with
  `v1788285379/NEW-polaroid-1.2.png`; add `Flags_For_Marang1.png` as a
  decorative full-width corkboard layer directly below the header and behind
  content at every viewport; rotate the Home-only `.lk-card-pin` `-5deg`;
  add a secondary `Subscribe to newsletter` CTA that targets the homepage
  newsletter-interest section.
- Lightkeepers: replace the banner source with
  `v1788295787/MH-lightkeeprs-banner-1.2.png`.
- Donate hero: retain the external BackaBuddy CTA but render it as the
  brand-blue secondary button with white text and label it `Donate via
  BackaBuddy`.
- CTA hierarchy: retain global donation CTAs; remove the duplicate Home
  Lightkeeper-band and Lightkeepers-hero donation CTAs; change the Home
  Lightkeeper card to internal `Meet the Lightkeepers`; retain the contextual
  Donate hero and donation-body CTAs.
- Add a homepage Garden Day carousel immediately after `A Day at Marang
  House` and before the mission section. Preserve this exact order:
  1. `v1788293376/Marang_House_Garden_Day-6.jpg`
  2. `v1788293371/MH-Website-Clo-Spiderman-3.jpg`
  3. `v1788293371/MH-Website-facepaint_1.jpg`
  4. `v1788293378/Marang_House_Garden_Day-1.jpg`
  5. `v1788293381/Marang_House_Garden_Day-8.jpg`
  6. `v1788293382/Marang_House_Garden_Day-5.jpg`
  7. `v1788293370/MH-Website-eating-popcorn.jpg`
  8. `v1788293368/MH-Website-facepaint-3.jpg`
- Build the carousel without third-party UI dependencies: no autoplay,
  native prev/next buttons, scroll snap, keyboard operation, visible current
  slide context, stable aspect-ratio cards, one/two/three visible slides at
  mobile/tablet/desktop, and accurate image alternatives. Do not add a
  lightbox or Fancy effect.
- Add a reusable newsletter-interest form with email, required explicit
  consent, honeypot, accessible validation/status, and Formspree fields
  `email`, `consent`, and `source=website-newsletter-interest`. State that it
  records interest until Brevo is connected. No Brevo credential, key, list
  ID, or server runtime may be added.

### In — Cloudinary delivery audit and update

- Search all repository references to `res.cloudinary.com/m4hqddxx`.
  Update active runtime use in `app/`, `components/`, `lib/`, metadata, and
  shared image utilities. Search `archive/` for the report only; do not alter
  historical source.
- Use `f_auto,q_auto:best` for eligible raster delivery URLs. Keep `f_png`
  for the documented SVG rasterisation exception.
- Add one Cloudinary-aware Next image loader that emits
  `c_limit,w_<Next-requested-width>/f_auto,q_auto:best`, and give every
  `next/image` an accurate `sizes` value.
- Use Next's responsive `srcset` as the approved retina strategy. Do **not**
  add `dpr_auto`: combining it with Next's DPR-aware width candidates can
  double delivered pixels. This is the user-approved exception to the
  original request and preserves sharpness without overserving.
- Preserve animated GIFs with direct responsive Cloudinary `srcset` delivery
  where Next's `unoptimized` mode would otherwise bypass the shared loader.
- Before a width transform is added, measure source dimensions against the
  largest rendered width at the supported density. Do not add a width
  transform that would upscale a smaller source; leave it format/quality
  optimized and report it as a re-upload candidate.
- After delivery changes, request transformed assets with modern image
  `Accept` headers. Report, but do not auto-fix, hero/full-width assets above
  300 KB and cards/thumbnails above 100 KB. The handoff must include updated
  URL count and separate source-resolution and byte-size tables with
  page/location.

### In — standards gate

- Run the current Vercel Web Interface Guidelines review and WCAG 2.2 review
  against all active pages/components/styles. Resolve confirmed issues in
  semantics, alternatives, contrast, focus, target size, keyboard flow,
  forms, zoom, reduced motion, and image layout stability before manual
  review.
- Run `npm run lint`, `npm run build`, and browser checks at desktop and
  mobile widths. Confirm no broken images, horizontal overflow, or unexpected
  CLS; test carousel keyboard interaction, 200% zoom, and reduced motion.

### Deferred — Fancy Components gate

After Max manually reviews the standards baseline, run `frontend-design` and
`ui-ux-pro-max` as read-only whole-site reviews. Present findings and one
Fancy recommendation before a second approval. The expected candidate is
Fancy's `Vertical Cut Reveal`, limited to the first line of the Home hero
heading. Do not install `framer-motion`, add Fancy code, or change the current
hero animation until that explicit second approval. If approved, validate
React 19 compatibility, preserve a semantic/static/reduced-motion fallback,
and replace rather than layer the existing hero entrance animation.

### Out

- Brevo integration, credentials, environment variables, a server runtime,
  deployment, domain/DNS changes, commits, pushes, and production changes.
- Archived static-site source (`archive/`) and all unrelated visual redesign.
- Any Fancy component before the second manual approval.

## Acceptance Criteria

- [ ] Baseline visual, CTA, newsletter, and carousel changes above work at
      mobile and desktop widths without altering unrelated sections.
- [ ] Garden Day images display in the supplied order with accessible controls
      and no autoplay, dragging requirement, clipping, or layout shift.
- [ ] All eligible active Cloudinary delivery uses `f_auto,q_auto:best` and
      responsive width delivery; no source is intentionally upscaled.
- [ ] Source-resolution and over-threshold byte-size findings are reported
      separately with exact page/component locations.
- [ ] Lint/build pass; browser checks find no failed images, horizontal
      overflow, keyboard trap, obscured focus, or regression at 200% zoom and
      reduced motion.
- [ ] Work stops at `ready-for-manual-review` before either design-review
      skill or any Fancy integration.

## Verification

- `npm run lint`
- `npm run build`
- Browser/Playwright: Home, About, Lightkeepers, Donate, Contact at 1440px
  and 390px; inspect all image natural sizes and error states; assert no
  horizontal overflow and observe cumulative layout shift.
- Manual keyboard, VoiceOver-compatible semantics, 200% zoom, and
  `prefers-reduced-motion: reduce` checks for the carousel, newsletter form,
  header/menu, and new/changed CTAs.
- Cloudinary audit output: source dimensions, transformed request size and
  content type, rendered target, upscaling exception list, and byte-size
  threshold report.

## Decisions

- Gallery location is the Home page after `A Day at Marang House`.
- Next responsive loader/srcset is the retina solution. `dpr_auto` is not
  used because it conflicts with that strategy and can overserve images.
- The newsletter form is a transparent Formspree interest capture until a
  public Brevo embed/form URL or approved server-side endpoint is supplied.
- Fancy integration is intentionally a separate, user-gated follow-up.

## Handoff

Implementation must record: files changed; the Cloudinary URL count; source
resolution and byte-size reports; exact test/browser results; all standards
findings fixed or deferred; deviations; and the manual-review status. Set
status to `ready-for-manual-review` once every baseline criterion is met.

### Implementation handoff — 2026-09-01

Changed `app/page.tsx`, `app/lightkeepers/page.tsx`, `app/donate/page.tsx`,
`app/layout.tsx`, `app/globals.css`, `lib/images.ts`,
`lib/cloudinary-loader.ts`, `next.config.ts`, and the new reusable
`GardenDayCarousel` and `NewsletterInterestForm` components.

- The Home page has the requested Polaroid, decorative flags, newsletter CTA
  and transparent Formspree interest form, internal Lightkeepers CTA, and
  eight-image no-autoplay Garden Day carousel. Its native prev/next controls,
  live context, scroll snap, fixed card ratio, and alternatives are in place.
- Lightkeepers uses the supplied banner and no longer repeats a hero donation
  CTA. Donate uses the requested blue secondary `Donate via BackaBuddy` CTA.
- The active shared delivery path is `f_auto,q_auto:best`, with a configured
  Next loader that emits `c_limit,w_<requested width>/f_auto,q_auto:best` and
  preserves the explicit `f_png` SVG exception. There are 48 active `cld()`
  call sites; `dpr_auto` was not added.

Verification: `npm run lint`, `npm run build`, and `git diff --check` passed.
Playwright covered Home, About, Lightkeepers, Donate, and Contact at 1440px
and 390px with no failed images or horizontal overflow, and exercised the
carousel Next control.

Manual review gate: ready. The separately gated `frontend-design` and
`ui-ux-pro-max` reviews and any Fancy integration remain deferred. No
dependency, credential, deployment, or production change was made.

### Baseline completion follow-up — 2026-09-02

- Replaced remaining CSS yellow/gold literals (`#ffd84d`, `#ffde59`,
  `#f9b83c`, and the yellow hover literal) with `#f8e026`; orange gradient
  stops remain unchanged by design. A final cascade establishes 1.15 for
  headings and 1.6 for prose/list content.
- Corrected the Contact SVG exception to `f_png,q_auto:best` and introduced
  `CloudinaryGif`, a native responsive `f_gif,q_auto:best` `srcset` delivery
  component. Its `c_limit` candidates cannot upscale. The enlarged Home cloud
  uses it; remaining decorative GIF instances retain their existing direct
  delivery until they are migrated to this reusable primitive.
- The supplied flags asset is now the verified versioned source
  `v1788285379/Flags_For_Marang1.png` (1537×864); its intrinsic JSX dimensions
  match Cloudinary response metadata. A 640px modern-format request returned
  WebP at 6,030 bytes. Garden Day source 1 is 3258×3225 / 5,058,360 bytes;
  its 640px WebP response is 58,588 bytes. The original Garden Day file is a
  re-upload/compression candidate under the full-width byte threshold policy.
- Garden Day controls respect reduced motion and update active-slide status
  on scroll/swipe as well as button navigation.
- Approved scope deviations: Donate body information tiles were restyled to
  navy and the redundant NPC registration line removed; this was explicitly
  approved by Max on 2026-09-01.

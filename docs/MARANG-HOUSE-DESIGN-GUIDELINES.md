# Marang House design guidelines

> **Baseline:** the live site at [www.maranghouse.org](https://www.maranghouse.org),
> captured from `origin/main` at `ee58cebd044f2ab42ab01be76cf42be16257b55f`
> (2026-09-18). This is the default visual reference for future site work.
> If a future code change intentionally updates shared tokens, typography, shell,
> or art direction, update this guide in that same reviewed change.

## Visual intent

Marang House should feel warm, hopeful and human: a carefully organised home
for children, not a corporate charity template. The system pairs confident blue
structure with sunshine-yellow and orange optimism, candid photography, and a
small amount of friendly hand-drawn or animated ornament.

The combination is important. Keep the generous, playful, hand-crafted energy,
but give information a calm, legible hierarchy. A section may feel like a
corkboard, a polaroid arrangement, a garden, or a lighthouse campaign scene;
the page as a whole should still feel easy to scan and trustworthy.

This is a guide to UI and visual craft, not a source of organisational facts,
campaign claims, donation details, or social links. Use `lib/site-data.ts` and
the applicable content approval process for those.

## Colour

Use the canonical `--color-*` tokens for new work. The older aliases such as
`--blue`, `--canva-yellow`, and `--orange` exist for route compatibility; they
are not the vocabulary to extend.

| Token | Value | Role and pairing |
| --- | --- | --- |
| `--color-brand` | `#004aad` | Primary Marang blue. Use for confident controls and blue sections; pair with white or yellow. |
| `--color-brand-deep` | `#082f73` | The structural navy: header, footer, strong panels, dark photo overlays. Use white or yellow text. |
| `--color-brand-soft` | `#e9f0ff` | Quiet blue tint for low-emphasis surfaces or transitions. |
| `--color-ink` | `#17213a` | Default dark text on light surfaces. |
| `--color-muted` | `#59647a` | Secondary text only when it remains comfortably readable. |
| `--color-white` | `#ffffff` | Clean foreground, light card surface, and text on dark colour. |
| `--color-cream` | `#fff9ed` | The warm, breathable alternative to white for body sections. |
| `--color-yellow` | `#f8e026` | Signature optimism and primary-action emphasis. Pair with deep blue text or blue surroundings. |
| `--color-orange` | `#f27926` | Warm campaign accent, transition band, or secondary emphasis. Pair with white or deep blue. |
| `--color-red` | `#df3436` | High-energy, sparing emphasis. Do not make it a routine text colour. |
| `--color-purple` | `#6a3fb5` | A bounded campaign accent, currently used in the Donate visual world. Do not replace the primary blue system with it. |
| `--color-border` | `#d8dfeb` | Subtle separation on pale surfaces. |

### Colour rules

- Let deep blue provide the frame and yellow provide the clearest call to
  action. Orange, red, and purple are accents with a reason, not competing
  primary buttons.
- Use white and cream generously to let photography, copy, and illustrated
  assets breathe.
- Existing orange-to-yellow and blue-to-deep-purple gradients are expressive
  **section treatments**, not a reason to introduce new global gradient tokens.
- On photography, introduce a dark or purpose-built scrim before placing copy
  over it. Never sacrifice legibility to preserve an image crop.
- Check each actual foreground/background pairing in context, including hover,
  focus, and photo-overlay states.

## Typography

The site uses three self-hosted `next/font` families.

| Use | Family | Available weights | Direction |
| --- | --- | --- | --- |
| Headings | Fredoka | 400, 500, 600, 700 | Friendly, rounded, generous display hierarchy. Use for `h1`–`h4`, major numeric moments, and the brand name. |
| Body and UI | Nunito | 400, 600, 700, 800, 900; normal and italic | Clear, warm prose and highly legible navigation, labels, forms, and buttons. |
| Hand-drawn accent | Permanent Marker | 400 | A rare expressive note in an illustration-led composition. It must not become body copy, navigation, or the default heading style. |

### Type rhythm

- The global baseline is `1.15` for headings and `1.55` for prose. Preserve
  balanced heading wrapping and readable paragraph wrapping instead of forcing
  tight, poster-like blocks of copy.
- Use Fredoka at a strong but approachable weight (normally 600–700) for major
  headings. Use Nunito 700–900 for compact functional labels and calls to
  action; reserve lower weights for body copy.
- The shared scale is `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, then fluid
  `--text-xl`, `--text-2xl`, and `--text-3xl`. Route-specific display type can
  be larger when it remains readable at the narrowest breakpoint.
- Give a display heading one clear idea. Support it with a short Nunito
  paragraph and one primary action rather than adding competing type styles.
- Use all-caps only for compact action labels and small eyebrow labels, with
  Nunito's existing weight and tracking. Do not set paragraphs in all-caps.

Example hierarchy: a Fredoka `h2` in deep blue or white; a brief Nunito body
paragraph; then a yellow primary action or a restrained secondary action.

## Layout, spacing and shape

### Containers and rhythm

| Token | Value | Use |
| --- | --- | --- |
| `--container-narrow` | `48rem` | Reading-focused copy and compact content. |
| `--container-default` | `72rem` | Most standard page sections. |
| `--container-wide` | `82rem` | Header, footer, wide editorial or gallery composition. |
| `--gutter` | `clamp(1.125rem, 0.75rem + 2vw, 2.5rem)` | Shared side breathing room; do not replace with a fixed desktop-only margin. |
| `--space-1` to `--space-8` | `0.25rem` to `4rem` | Internal spacing scale. |
| `--space-section` | `clamp(4rem, 3rem + 4vw, 7.5rem)` | Default vertical rhythm between major sections. |

Use the shared compact (`3rem`), default (`--space-section`), and spacious
(`1.2 × --space-section`) section treatments. A page should alternate scale and
tone deliberately: light/cream breathing space, then a strong blue or image-led
moment, rather than an uninterrupted wall of identical cards.

### Surfaces and composition

- Keep the rounded vocabulary: `6px` for small controls, `12px` for standard
  panels, `20px` for large cards and photo frames, and fully rounded pills for
  buttons. Use a radius to soften a clearly defined object, not every rectangle
  on a page.
- Use a full-bleed photo band when an emotional image and one clear message
  need to read as a single composition. Use a split editorial section when
  image and explanatory copy need equal attention. Use tiles or a centred grid
  for comparable, scannable options.
- The Home, About, Lightkeepers, and Donate pages intentionally vary their
  composition. Retain that pace; do not flatten future pages into a generic
  repeated-card layout.
- Build enough empty space around headline, photo, and doodle layers that each
  has a role. Ornament may overlap a section edge, but copy and actions must
  never be the part that gets crowded.

## Imagery and illustration

### Art direction

- Prefer genuine, warm, child-centred photography with connection, care,
  activity, and a sense of home. Photo choice should feel personal and
  dignified, never stock-corporate or clinical.
- Use cheerful oversized decoration as an accent: doodled stars, clouds,
  sunshine, hearts, bunting, polaroid/corkboard details, and the lighthouse or
  circle-of-light language when the campaign context calls for it.
- A decorative asset should frame or animate a moment, not explain essential
  information. Keep artwork sparse enough that the photo, message, and primary
  action remain obvious at a glance.
- Use light shadows, pins, overlap, and gentle rotation to create depth in
  collage treatments. Avoid glossy 3D effects, anonymous abstract blobs, or a
  new illustration style that competes with the existing friendly assets.

### Delivery and implementation

- Deliver site imagery through the `cld()` helper in `lib/images.ts`, which
  applies the existing Cloudinary `f_auto,q_auto:best` treatment. Do not add a
  second asset host for ordinary site work.
- Use `BgPhoto` for a photo behind content: the sized, positioned container
  owns the composition and the image uses `fill` with `object-fit: cover`.
  Review the image crop at both mobile and desktop; use `object-position` when
  a face or meaningful detail needs protection.
- Decorative GIFs use empty alt text, `aria-hidden="true"`, and `unoptimized`
  so their animation survives delivery. Meaningful images need useful,
  contextual alt text.
- `next/image` is not configured to serve SVG here. When an SVG asset is
  needed, request a Cloudinary raster (`f_png,q_auto`) URL and verify it before
  adding it. Some source SVG text does not survive raster delivery.

## Components and interaction

### Chrome

- Normal pages use a sticky deep-blue header with logo lock-up, concise
  navigation, a yellow active indicator, and a prominent giving action on
  larger layouts. The footer repeats the deep-blue structural frame and uses
  yellow for small section labels.
- Keep navigation short and action-oriented. The active state is a quiet line
  of yellow, not a second oversized button system.
- The normal shell belongs on every ordinary public route. `/links` is the
  intentional exception: it is a focused QR-first landing page with no normal
  header, footer, or click-light effect. Keep its route-specific styles and
  components isolated; do not generalise its chrome-less treatment.

### Actions and controls

- Prefer the shared `ButtonLink` for new link actions. Its standard treatment
  is a Nunito 800 uppercase pill with a minimum height of `3rem` (48px),
  modest tracking, and a restrained `translateY(-2px)` hover.
- Primary: yellow surface with deep-blue text. Give each visual group one
  unmistakable primary outcome.
- Secondary: Marang blue surface with white text when it sits on a light
  surface. Use the deep-blue variation in dark campaign contexts.
- Outline: transparent with the local blue text/border when an option should
  be available without competing with the primary action.
- Light: white surface with deep-blue text on the dark header/footer or a
  comparable dark field.
- Preserve clear text labels. An icon may support a label but cannot be the
  only way a visitor understands a core action.

### Feedback

Keep hover and focus feedback light: a small lift or scale, a yellow navigation
underline, and the existing visible yellow focus outline. The global
click-light flourish is decoration only; it must never block a click or convey
information that is unavailable to keyboard or reduced-motion users.

## Motion and responsive behaviour

- Motion makes the visual world feel alive: a reveal, gentle parallax, a
  carousel transition, a subtle flicker, or a small decorative animation. It
  should not delay, hide, or explain essential content.
- Every new animation or transition needs a `prefers-reduced-motion` outcome.
  The appropriate fallback is usually a calm static composition, not a faster
  version of the same motion.
- Start layout review at 320px, then check 390px and 1440px. Maintain the
  shared fluid gutter, readable type, usable tap targets, and no horizontal
  overflow.
- At narrow widths, simplify the composition before compressing it: stack
  editorial columns, centre appropriate hero copy, and hide or reposition
  nonessential polaroids/doodles. Do not shrink essential text, buttons, or
  imagery until they collide.
- Test real image crops and animation boundaries. Photo fills, parallax layers,
  and oversized doodles are the most likely causes of accidental clipping or
  exposed edges.

## Accessibility and quality bar

Future visual work is on-brand only if it remains usable.

- Preserve the skip link, semantic heading order, landmark structure, visible
  keyboard focus, and native buttons/links for their real behaviour.
- Check colour in its actual background context, especially yellow/orange text
  and words placed on imagery. Add an overlay or change the pairing when it
  does not read comfortably.
- Give informative images concise contextual alt text. Mark decoration as
  `alt=""` and `aria-hidden="true"`; do not make a screen reader announce
  ornamental clouds, sparkles, or GIFs.
- Keep form labels, input states, error/success feedback, and CTA wording clear
  without relying on colour alone.
- Review keyboard operation, focus order, touch targets, reduced motion,
  text wrapping, horizontal scroll, and image crops at 320px, 390px, and
  1440px before handoff.

## Reference routes

Use these live pages as the visual examples for the patterns above. They are
references, not templates to duplicate section-for-section.

| Route | Study it for |
| --- | --- |
| [Home](https://www.maranghouse.org/) | Corkboard/polaroid hero, playful layered artwork, alternating sections, statistics, and strong action hierarchy. |
| [About](https://www.maranghouse.org/about) | Editorial storytelling across navy, cream, photography, and warm illustrated detail. |
| [Lightkeepers](https://www.maranghouse.org/lightkeepers) | The lighthouse/circle-of-light campaign world, photo overlays, navy impact cards, and considered motion. |
| [Donate](https://www.maranghouse.org/donate) | A photo-led appeal, high-priority primary action, and practical information presented in clear tiles. |
| [Contact](https://www.maranghouse.org/contact) | A warm utility page that still uses a strong hero, helpful imagery, and an approachable form layout. |

For implementation detail, start with `app/globals.css`, `lib/fonts.ts`,
`components/ui/`, `components/BgPhoto.tsx`, `components/SiteHeader.tsx`, and
`components/SiteFooter.tsx`. Follow the extra route-isolation rules in
`AGENTS.md` for `/links`.

## Future-work checklist

Before approving a new interface, ask:

1. Does it feel like the existing warm, optimistic Marang House site rather
   than a generic nonprofit template?
2. Does it use the canonical palette and type families, with one obvious
   primary action and enough breathing room?
3. Does its photo/illustration treatment support the message without crowding
   it or adding a competing visual language?
4. Does it preserve mobile readability, keyboard focus, semantic controls,
   sensible alt text, and reduced-motion support at 320px, 390px, and 1440px?
5. Does it leave normal site chrome intact and respect special boundaries such
   as the QR-first `/links` page?

## Keep and avoid

**Keep:** friendly rounded display type; calm Nunito prose; deep-blue
structure; yellow optimism; warm photography; occasional hand-drawn motion and
campaign motifs; varied but ordered page composition; and generous space.

**Avoid:** a new palette or font pairing; corporate minimalism that removes the
site’s warmth; an all-card layout; dense layers of decoration; low-contrast
text on a photo; all-caps prose; isolated icon-only primary actions; and motion
that ignores user preferences or carries required meaning.

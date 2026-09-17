# MH-019: Current-site design guidelines

Status: ready-for-check — live visual checkpoint pending reviewer browser comparison
Base: `ee58cebd044f2ab42ab01be76cf42be16257b55f` (`origin/main`)

## Goal

Create `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md`: a practical, implementation-facing
reference that makes the present production site the visual baseline for future
Marang House work. It must capture the existing UI language rather than propose a
new identity, simplify it into generic brand theory, or make any application
change.

User-visible outcome:

- A future designer or developer can use one Markdown document to make an
  on-brand page, component, or campaign treatment without reverse-engineering
  every existing route.
- The guide gives exact reusable values where the code defines them, clear
  visual roles for those values, and concise direction for composition,
  imagery, controls, motion, responsive behaviour, and accessibility.
- It points readers back to the live site and implementation sources for
  examples, while keeping volatile organisational facts, fundraising claims,
  and release instructions out of a visual guide.

## Repository evidence and current baseline

- `AGENTS.md` identifies `https://www.maranghouse.org` as the live production
  Next.js site served from Vercel project `marang-house-website`; it also makes
  `origin/main` the authoritative branch. On 2026-09-18, that host returned an
  HTTP 200 response from Vercel for `/`.
- The fixed base above is the current `origin/main` commit. The current
  workspace has no diff from that base, so the guide can describe the exact
  checked-in visual system without reconciling branch-specific work.
- `app/globals.css:44-99` is the canonical source for the colour, typography,
  sizing, spacing, radius, container, and breakpoint tokens. Its `--blue`,
  `--canva-yellow`, and related aliases are explicitly marked legacy aliases;
  the guide must name the `--color-*` tokens as the canonical language.
- `lib/fonts.ts:8-28` loads Fredoka (heading), Nunito (body/UI), and Permanent
  Marker (accent). Global type rules in `app/globals.css:101-107` establish a
  1.15 heading line-height, 1.55 prose baseline, balanced headings, and pretty
  prose wrapping.
- The reusable site shell at `app/globals.css:1619-1678` establishes the
  container widths, section tones, sticky deep-blue header, uppercase pill
  actions, yellow active-navigation indicator, and deep-blue footer. Its
  matching components are `components/SiteHeader.tsx`,
  `components/SiteFooter.tsx`, and `components/ui/{ButtonLink,Container,Section}.tsx`.
- Existing pages show the intended visual vocabulary in context: the Home
  corkboard/polaroid hero and playful decorative layers (`app/page.tsx`),
  About’s editorial navy/cream storytelling (`app/about/page.tsx`),
  Lightkeepers’ lighthouse/circle-of-light campaign language
  (`app/lightkeepers/page.tsx`), and Donate’s photo-led appeal plus practical
  information tiles (`app/donate/page.tsx`). Contact is the reference for a
  warm, action-oriented utility page.
- `components/BgPhoto.tsx:12-35` is the standard photo-behind-content pattern;
  `lib/images.ts:1-5` makes Cloudinary delivery the image source convention.
  `components/motion/ClickLightEffect.tsx:9-17` and existing motion components
  demonstrate that ornament and motion are decorative and respect
  `prefers-reduced-motion`.
- The accessible baseline already includes a visible keyboard focus treatment
  in `app/globals.css:36-40`, a skip link, semantic site shell, and decorative
  GIF treatment described in `AGENTS.md`. The guide must preserve, not weaken,
  those constraints.

## Scope

### In

- Add `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` as the sole implementation
  deliverable.
- Establish the guide’s authority and scope: it is the default visual and UI
  reference for new work on the production Next.js site as at this fixed base;
  current code and `AGENTS.md` remain authoritative if they subsequently
  conflict with the guide.
- Document the canonical palette in a compact table with token name, exact hex
  value, visual role, and appropriate pairings. Include brand blue, deep blue,
  soft blue, ink, muted text, white, cream, yellow, orange, red, purple, and
  border. Mention gradients only as existing section treatments, not as new
  global tokens. Explain that legacy aliases are not the naming model for new
  work.
- Document typography: families, available weights, intended hierarchy,
  line-height/wrapping behaviour, display versus body versus rare hand-drawn
  accent use, and a short hierarchy example. Make clear that Permanent Marker
  is a sparse, expressive accent—not a substitute body/display system.
- Document spacing, layout, and shape using the actual token scale: gutters,
  48/72/82rem containers, compact/default/spacious section rhythm, 6/12/20px
  radii, 48px button minimum height, and pill actions. Explain when full-bleed
  photo bands, split editorial sections, centred information grids, and
  card/tile groups are appropriate.
- Capture the current art direction: warm, child-centred photography;
  oversized friendly illustrated/doodle/GIF accents; collage, corkboard,
  polaroid, lighthouse, sunlight/cloud, and circle-of-light motifs; enough
  negative space for content; and contrast scrims when text overlays photos.
  Include the approved Cloudinary and `BgPhoto` implementation conventions as
  developer notes, including the existing rasterisation requirement for SVG
  sources.
- Define component and interaction direction from the live system: deep-blue
  sticky chrome, yellow active/primary accents, high-contrast uppercase
  Nunito buttons, restrained lifted/scale hover feedback, concise navigation,
  and a single clear action hierarchy. Distinguish a primary donation/action
  from secondary, outline, and light-button contexts.
- Define motion and responsive guardrails: motion supports the playful visual
  world but never carries meaning; preserve `prefers-reduced-motion`; use
  decorative images out of the accessibility tree; start from 320px; retain
  readable type, touch targets, gutters, and no horizontal overflow; simplify
  or hide nonessential hero ornament before shrinking content into collision.
- Include an explicit accessibility and consistency checklist for future visual
  work: contrast/context, visible focus, semantic action choice, accurate alt
  text or `alt=""` for decoration, image-crop review, keyboard support,
  reduced-motion review, and checks at 320px, 390px, and 1440px.
- Include a brief “keep / avoid” section. Keep the warm, optimistic,
  hand-crafted but organised feel; familiar campaign motifs; genuine images;
  varied section composition; and the established palette. Avoid generic
  corporate minimalism, isolated new palettes/typefaces, decoration that
  competes with copy, all-card page layouts, unreadable photo overlays, and
  animation that ignores user settings.
- Name the `/links` page as an intentional, documented exception: it is a
  compact QR-first page without normal site chrome, must remain isolated as
  specified in `AGENTS.md`, and should borrow the visual language without
  changing the global shell rules.
- Link to the live canonical URLs for Home, About, Lightkeepers, Donate, and
  Contact as visual references, and cite the relevant local implementation
  files for future developers. Do not copy site imagery into the repository or
  depend on screenshots that will become stale.

### Out

- Any change to application source, CSS, components, routes, content data,
  assets, fonts, dependencies, configuration, tests, build output, or
  production infrastructure.
- A visual redesign, new logo, new palette, additional brand-mark assets,
  design-system migration, CSS-token cleanup, or standardisation of the
  current intentionally varied page compositions.
- Organisation facts, donation/bank details, campaign claims, testimonial
  copy, social URLs, or any other content that belongs to `lib/site-data.ts`
  or needs owner verification.
- Edits to `.ai/tasks/` other than this plan; commits, pushes, pull requests,
  previews, production deployments, domain changes, or any change to the
  retained emergency landing deployment.

## Dependencies and ownership

This is a documentation-only, single-file implementation after this plan. The
implementer owns `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` and must not alter any
other file. It has no credential, asset, or external-content dependency. The
final visual comparison uses the public production pages identified above; if a
page is temporarily unavailable, record that condition rather than deriving a
replacement style from an older branch or external source.

## Implementation steps

1. Reconfirm the fixed base and production reference, then gather only the
   visual-system evidence named above: tokens, font definitions, shell/primitives,
   representative route structures, image conventions, and accessibility/motion
   constraints. Do not treat legacy branches, archived pre-redesign material,
   or an unverified historical screenshot as design authority. **Done when**
   every exact value in the draft has a current-code source.
2. Author `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` as a concise working guide,
   ordered from design intent through tokens, type, layout, imagery, components,
   motion/responsiveness, accessibility, route references, and the future-work
   checklist. Use the exact values and conventions in Scope; label descriptive
   observations separately from future-work requirements. **Done when** a
   reader can make a well-bounded UI decision without reading the full CSS file.
3. Perform a source and live-reference accuracy pass. Compare the guide against
   the named production routes at desktop and mobile widths, correct any
   misleading generalisation, and ensure the special `/links` boundary and
   accessibility/motion rules are represented. **Done when** the document is
   faithful to current production rather than merely a style preference.
4. Review the documentation-only diff, run the exact checks below, record the
   results in Handoff, and mark the task `ready-for-check`. **Done when** the
   changed-file list contains only the guideline and this task record, with no
   code or configuration changes.

## Success criteria

- [ ] `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` exists and clearly identifies
      the current live site / fixed base as its baseline.
- [ ] It includes the canonical palette with all 12 current `--color-*`
      tokens, exact values, semantic roles, and pairing guidance; it does not
      promote legacy aliases as new-work vocabulary.
- [ ] It accurately specifies Fredoka, Nunito, and Permanent Marker usage,
      supported weights, global type rhythm, and the intended restraint for
      hand-drawn accents.
- [ ] It gives actionable, code-backed guidance for containers, spacing,
      radii, buttons, shell/navigation, section composition, image treatment,
      decorative motifs, motion, and responsive behaviour.
- [ ] It preserves core accessibility decisions: visible focus, usable contrast,
      semantic controls, appropriate alt text, decorative-media exclusion,
      keyboard access, and reduced-motion support.
- [ ] It includes the live reference routes and the `/links` exception without
      adding product claims or stale visual artefacts to the repository.
- [ ] It contains a short future-work checklist and a clear avoid list that
      prevents unintentional drift toward a generic or competing visual system.
- [ ] No application, asset, configuration, build, or deployment file changes
      are introduced.

## Verification

Automated/read-only:

```sh
git diff --check origin/main...
git diff --name-only origin/main...
grep -nE '^## (Visual intent|Colour|Typography|Layout|Imagery|Components|Motion|Accessibility|Reference|Future)' docs/MARANG-HOUSE-DESIGN-GUIDELINES.md
```

The whitespace check must pass. The changed-file list must contain only
`docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` and this task file. The heading search
may use equivalent, clearly named headings if the guide remains easy to scan.

Manual checkpoint (final only): compare the guide with Home, About,
Lightkeepers, Donate, and Contact at 390px and 1440px on
`https://www.maranghouse.org`. Confirm that its guidance describes what is
actually visible: friendly rounded type, blue/yellow/orange-led contrast,
warm photo and doodle composition, strong action hierarchy, comfortable
section rhythm, and simplified nonessential ornament on narrow screens. Check
that it does not accidentally prescribe the chrome-less `/links` treatment for
normal pages.

## Assumptions, risks, and decisions

- The owner has explicitly stated that the live site is the desired reference
  for future UI, colour, typography, and styling. This document therefore
  codifies current practice; it does not reopen the completed Canva-matching
  redesign.
- Exact token values and reusable implementation conventions are durable enough
  to document. Artwork placement and individual campaign copy are route-level
  treatments, so the guide will describe their patterns rather than freeze a
  page into a screenshot.
- The guide is intentionally markdown-first and does not duplicate image files
  or introduce a design-tool dependency. Its live route links are the visual
  proof, while code references make it maintainable when a visual decision
  needs implementation detail.
- The current CSS contains legacy aliases and some route-specific styles. The
  guide should state the preferred forward-looking token names without asking
  this task to refactor those aliases.
- Production pages may evolve after this plan. A substantive visual change to
  shared tokens, fonts, shell, or the established art direction must update
  the guide in the same reviewed change or create a follow-up task.

## Handoff

**Changed files:**

- `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` — new implementation-facing visual
  baseline. It covers intent; the complete canonical palette; typography;
  layout; imagery; shared chrome/actions; motion and responsive behaviour;
  accessibility; live route examples; the `/links` exception; and a short
  decision checklist.
- `.ai/tasks/MH-019-current-site-design-guidelines.md` — status and handoff
  recorded. No application or production file changed.

**Checks:**

- `git diff --no-index --check /dev/null docs/MARANG-HOUSE-DESIGN-GUIDELINES.md`
  — passed with no whitespace output.
- `git diff --no-index --check /dev/null .ai/tasks/MH-019-current-site-design-guidelines.md`
  — passed with no whitespace output.
- Heading coverage check — passed: Visual intent, Colour, Typography, Layout,
  Imagery, Components, Motion, Accessibility, Reference routes, Future-work
  checklist, and Keep and avoid are present.
- Canonical-token coverage check — passed: all 12 current `--color-*` tokens
  are named in the guide.
- Production availability check on 2026-09-18 — passed: `/`, `/about`,
  `/lightkeepers`, `/donate`, and `/contact` each returned HTTP 200 from
  `https://www.maranghouse.org`.
- Scoped worktree review — passed: only this task file and the new Markdown
  guide are untracked; no code, dependency, configuration, asset, build, or
  deployment file changed.

**Manual visual checkpoint:**

- Pending reviewer comparison of Home, About, Lightkeepers, Donate, and
  Contact at 390px and 1440px. The available browser provider was unavailable
  in this workspace, so no visual-browser result is claimed. The guide was
  instead checked against the current shared token, shell, route, image, and
  motion source evidence named above, and the five live routes were confirmed
  reachable. This is the only remaining review item.

**Deviations from the plan:**

- No implementation-scope deviation. The external visual browser checkpoint
  remains for review rather than being represented as completed.

### Implementation recap

**User-visible outcome:** Future design work now has one compact reference
document, [docs/MARANG-HOUSE-DESIGN-GUIDELINES.md](../../docs/MARANG-HOUSE-DESIGN-GUIDELINES.md),
that treats the current production site as the desired visual baseline rather
than a prompt for a fresh redesign.

**Key decisions:** The guide promotes the current canonical `--color-*` tokens
over legacy aliases, keeps Fredoka/Nunito/Permanent Marker in their established
roles, and describes the site as a structured but warm, illustration-led
system. It records `/links` as a specific chrome-less exception so future work
cannot accidentally spread that utility-page treatment to normal pages.

**Changed areas:** Documentation and its task handoff only. No source,
dependencies, assets, content facts, deployment state, commit, push, or PR was
changed.

**Verification evidence:** Token, heading, whitespace, scoped-worktree, and
production-route availability checks passed. A reviewer should complete the
remaining visual comparison at 390px and 1440px.

**Reusable lesson:** For an established visual redesign, codify reusable
tokens and decision rules alongside route examples—not pixel-for-pixel page
copies—so the system can grow without losing its character.

# MH-020: Align the QR links page with the Marang House visual system

Status: ready-for-check
Base: `167cb9fa1a4c4008e428023e90fe1ebceab9ef21` (`origin/main`)

## Goal

Restyle only `/links` so the QR-first fundraiser destination feels like a
compact part of the Marang House site rather than a separate dark-gradient
microsite. Retain its deliberately focused, chrome-less flow and every current
fundraising, social, cookie-consent, metadata, and accessibility behaviour.

User-visible outcome:

- The current navy-to-purple full-viewport gradient is replaced with the
  site's warmer cream, deep-blue, sunshine-yellow, and orange visual language.
- The page reads as a small, friendly Marang House composition: clear brand
  identity, one unmistakable donation action, supportive illustration, and
  restrained rounded surfaces rather than a generic centred white card on an
  unrelated gradient.
- A QR visitor still reaches the same four actions immediately, without the
  ordinary site header, footer, or click-light effect.

## Repository evidence and current behaviour

- `docs/MARANG-HOUSE-DESIGN-GUIDELINES.md` treats the production system as a
  warm, optimistic blend of cream/white breathing space, deep-blue structure,
  yellow primary emphasis, orange accents, Fredoka headings, Nunito UI text,
  and sparse friendly illustration. It explicitly calls `/links` a focused
  chrome-less exception, not a separate visual system.
- `components/links/LinksPage.tsx` already owns the route's presentational
  composition. It renders the established Marang House logo, the existing
  decorative `MH-shun-giff.gif` sun, ordered action list, and inline consent
  controls. `app/links/page.tsx` is a thin metadata route.
- The only base links-page styling at `app/globals.css` lines 2069–2141 is
  namespaced. Its `#0b3c82` → `#10164d` gradient plus purple radial glow is
  visually distinct from the rest of the site; the surrounding white card is
  a generic isolated panel rather than the varied editorial composition used
  by the reference routes.
- MH-017 and the repository `AGENTS.md` require every `/links` style selector
  to remain rooted at `.links-page`. The route must not enter navigation,
  footer, sitemap, or search indexing. `components/SiteShell.tsx` owns the
  exact `/links` shell opt-out and must keep every other pathname unchanged.
- MH-018 places cookie choices in normal document flow beneath the four link
  actions. Its links-specific styles are already under `.links-page` and must
  remain readable, reachable, and subordinate to actions in the refreshed
  composition.
- The retained `canva-fullpage.png` export and
  `archive/CANVA-REDESIGN-PROMPT.md` establish the original reference more
  specifically: a bright royal-blue structural frame; yellow as the key
  emphasis; warm orange-to-yellow transition bands; friendly rounded type and
  white-edged pill actions; and tangible, hand-made depth through sparse
  overlaps, paper/polaroid-like white surfaces, pins, and small illustrated
  marks. The current live implementation translates those cues rather than
  reproducing the obsolete Canva layouts pixel-for-pixel.

## Refined visual direction

Build `/links` as a compact **Marang House support card**, not a standalone
dark-gradient app screen:

- Use `--color-cream` as the full-page breathing field. A contained
  `--color-brand-deep` header/backdrop panel should establish the royal-blue
  frame behind the brand lock-up and title; it must not become an edge-to-edge
  navy/purple gradient.
- Let the white action surface overlap that blue panel slightly, with a warm,
  soft paper-like shadow and the existing animated sun tucked at a clear edge
  as the only decorative flourish. This borrows the site's collage depth
  without adding a photo, pin, texture, or new Cloudinary asset.
- Keep the orange-to-yellow energy as a bounded transitional accent (for
  example, a shallow bottom band or small non-interactive layer), consistent
  with the Home/About canvas language. Do not use it as a substitute for
  structure or place text on it without verified contrast.
- Set the BackaBuddy action in sunshine yellow with deep-blue text. Use
  confident Marang blue and/or a restrained white/blue outlined treatment for
  secondary actions, rather than repeating pale generic cards. Keep icons as
  supporting marks, never the only action cue.
- Use only the existing Fredoka heading and Nunito UI hierarchy, generous
  space, rounded but differentiated surfaces, and small, purposeful overlap.
  The composition must simplify to a calm vertical stack at phone widths.

## Scope

### In

- Refresh the layout and visuals in `components/links/LinksPage.tsx` and the
  `.links-page` block in `app/globals.css` only as needed to align the route
  with the documented Marang House visual baseline.
- Replace the outlying dark blue/purple page gradient with the refined compact
  support-card direction above: cream foundation, contained deep-blue frame,
  overlapping white action surface, and a bounded yellow/orange accent. The
  treatment may use pseudo-elements or small presentational wrappers, but must
  use existing canonical colour tokens and remain part of the page rather than
  introducing a new global background or palette.
- Recompose the current logo, title, sun GIF, and actions into a warm,
  illustration-led editorial unit. Retain the existing logo and sun asset;
  do not source new artwork. Use blue as the structural contrast, yellow for
  the BackaBuddy action, orange only as a supporting accent, and rounded
  surfaces/shadows with enough space for the visual layers to breathe.
- Keep the first BackaBuddy action unmistakably primary. Preserve the current
  action order, labels, hrefs, external-link safety/new-tab announcement,
  44px-or-larger targets, semantic list, and internal `/donate` navigation.
- Integrate the existing in-flow cookie panel and post-consent preference
  trigger visually with the updated surface without changing consent state,
  text, storage, events, focus restoration, or action order.
- Preserve the current static route, canonical URL, `noindex, follow`
  metadata, isolated `components/links/` boundary, and exact chrome exception.

### Out

- Copy, donation destination, social URL, metadata, sitemap, indexing,
  navigation, footer, cookie-policy, consent-state, analytics, or QR-code
  changes.
- New image assets, asset-host changes, dependencies, font changes, shared
  token changes, global element styles, generic button changes, shared shell
  changes, or visual changes to any non-`/links` route.
- New animation or a motion-dependent experience. The existing decorative GIF
  may remain, with its current decorative accessibility treatment.
- Commits, pushes, PR creation, merge, production deployment, domain changes,
  or changes to the retained emergency landing project.

## Dependencies and ownership

This is one visual vertical slice. The implementation lead owns
`components/links/LinksPage.tsx` and the `.links-page`-rooted additions or
replacements in `app/globals.css`. No shared component, shell, data model,
asset, or configuration file should be changed. No parallel code work is safe
or needed because the feature component and its isolated stylesheet section
jointly define the composition.

The current Vercel project is Git-connected and supports previews for work
branches. A preview is the final visual checkpoint prerequisite; it must never
be used as a public-domain or production deployment.

## Implementation steps

1. Inspect the computed visual structure of `/links` against the documented
   Home, Donate, and Contact reference patterns and the retained Canva export.
   Implement the refined compact support-card composition: warm cream field,
   contained deep-blue brand frame, slightly overlapping white action surface,
   existing sun at a clear edge, and a bounded yellow/orange accent. Remove
   the unrelated blue/purple gradient. **Done when** the new direction can be
   implemented solely through the links feature and its namespaced styles.
2. Adjust `components/links/LinksPage.tsx` only if a small presentational
   grouping is needed for the new composition (for example, a branded top
   panel or an action surface). Keep the current content hierarchy and all
   functional JSX unchanged unless the wrapper is required for layout.
   **Done when** the logo, heading, decorative sun, four-action list, inline
   consent region, and preference trigger retain their current semantic order
   and behaviour.
3. Replace the base `.links-page`/card/action visual rules and add any needed
   descendant rules in `app/globals.css`. Every selector, including media and
   pseudo-element rules, must begin with `.links-page`; do not edit shared,
   bare-element, token, `.btn`, or non-links selectors. Ensure warm background
   layers never intercept clicks or create overflow. **Done when** the route
   uses the site's canonical palette, rounded vocabulary, type hierarchy, and
   one clear primary action without reintroducing purple as a competing page
   theme.
4. Tune the existing links-scoped cookie styles within the same composition.
   It must stay in normal document flow after the actions and remain visually
   quieter than the BackaBuddy action, while preserving current readable
   contrast, checkbox visibility, focus indication, button sizing, wrap, and
   reopen behaviour. **Done when** fresh and saved-consent states remain
   complete and usable rather than becoming a crowded card or overlay.
5. Run the automated checks and browser review. Verify `/links` at 320px,
   390px, and 1440px with both fresh and saved cookie choices; test keyboard
   order/focus, all four links, and no horizontal or nested scrolling. Compare
   the approved preview with `/`, `/donate`, and `/contact` at mobile and
   desktop widths to confirm the special route now belongs visually while the
   normal shell is unchanged. Record exact results and the preview URL in
   Handoff. **Done when** every success criterion passes and the task is
   `ready-for-check`.

## Success criteria

- `/links` no longer uses the current navy-to-purple full-page gradient or
  purple radial glow; its background and content surfaces visibly use the
  established cream, deep-blue, yellow, and restrained orange system.
- At a glance, the page reads as an intentional Marang House QR destination:
  warm, friendly, rounded, illustration-supported, and clear—without normal
  navigation/footer chrome or a generic single-card-on-gradient treatment.
- The BackaBuddy action remains first and primary; the current four labels,
  destinations, order, safe external-link handling, internal Donate link,
  logo alt text, and decorative-sun handling are unchanged.
- The inline consent panel remains after the action list, never overlays or
  obscures content/focus, and its saved-choice preference trigger still works.
- At 320px, 390px, and 1440px, there is no horizontal overflow, nested scroll
  region, clipping, obscured focus, or colliding decorative layer; all actions
  and consent controls are keyboard reachable with 44px-or-larger targets.
- `/links` continues to render statically with its canonical URL and
  `noindex, follow` metadata; it is absent from navigation, footer navigation,
  and the sitemap.
- Home, Donate, and Contact retain their existing header, footer, click-light,
  layout, and fixed consent-banner behaviour. All modified CSS stays rooted
  at `.links-page`.
- `npm run lint` and `npm run build` pass, and the branch Vercel Preview has
  been visually reviewed before handoff.

## Verification

Automated:

```sh
npm run lint
npm run build
git diff --check origin/main...
```

Manual checkpoint (final only): open the branch Vercel Preview in a fresh
storage profile. At 320×568, 390×844, and 1440×900, inspect both no-consent
and saved-consent `/links` states; tab through its logo-adjacent content,
actions, consent controls, and preference trigger, and confirm no focus is
covered. Check the four hrefs and their new-tab behaviour. Then inspect `/`,
`/donate`, and `/contact` at mobile and desktop widths: their normal chrome,
click-light effect, and fixed consent flow must remain visually and
functionally unchanged.

## Assumptions, risks, and decisions

- The requester asks for visual alignment, not a new QR-page product or
  content revision. Existing copy, destinations, and consent semantics are
  therefore protected scope.
- "Match the rest of the site" means following the current production design
  guidelines, not copying a specific route wholesale. The focused `/links`
  layout stays intentionally compact and chrome-less, while its colour,
  typography, spacing, shape, and decorative restraint align with Home,
  Donate, and Contact.
- No new asset is necessary: the existing logo and sun GIF are sufficient to
  make the small composition feel owned by the site. Adding photos or a new
  Cloudinary lookup would introduce avoidable crop, loading, and content
  risks for a QR utility page.
- The `min-height: 100dvh` page may exceed short viewports when consent is
  open; ordinary document scrolling is acceptable and preferred to clipping
  or an inner scrolling card.
- No unresolved product, credential, content, or deployment blocker exists.

## Handoff

**Changed files:**

- `components/links/LinksPage.tsx` — split the single `.links-page__card`
  into `.links-page__frame` > `.links-page__header` (logo, title, sun) +
  `.links-page__surface` (action list, consent, preference trigger, accent
  band), and added one decorative `.links-page__accent` div.
- `app/globals.css` — replaced the `.links-page` block (previously lines
  2069–2141) with the frame/header/surface/accent rules described below.
  Everything remains rooted at `.links-page`.

**Final visual-direction decisions:**

- Removed the navy-to-purple full-viewport gradient. `.links-page` is now
  `var(--color-white)` (matching the rest of the site — `body` is white and
  the unused `--color-cream` token/`.section--cream` class aren't part of
  the live design anywhere else, so cream was dropped after user feedback
  rather than introduced as a new page-level field).
- `.links-page__frame` is a single rounded, shadowed card (`overflow:
  hidden` on the frame itself clips both children to one consistent
  shape) — no negative-margin overlap, no z-index layering, no absolute
  positioning. This is a deliberate simplification: an earlier iteration
  overlapped a blue header and white surface with the sun GIF tucked into
  the seam, but the sun's stacking context got clipped/misaligned at
  narrow widths and covered the heading text, and the overlap read as
  fussier than the original card. The user asked for the original card
  feel back, so the final version keeps the header/surface split (blue
  panel behind the brand mark, white surface for actions) but flush, not
  overlapping.
- `.links-page__header` uses a `var(--color-brand-deep)` → `var(--color-brand)`
  diagonal gradient (contained to the panel, not edge-to-edge) with the
  logo, white Fredoka title, and the existing sun GIF stacked in normal
  flow — this is the pre-task layout order, just recoloured onto blue
  instead of navy/purple.
- Primary action stays `var(--color-yellow)` fill / `var(--color-brand-deep)`
  text. Secondary actions kept their original `var(--color-brand-soft)`
  fill / `var(--color-brand-deep)` text / `var(--color-border)` border —
  an earlier iteration changed these to white-with-blue-outline, which the
  user said looked worse than the original; reverted.
- Added one small bounded accent: a `0.85rem` orange-to-yellow
  (`var(--color-orange)` → `var(--color-yellow)`) band along the bottom
  edge of the surface, clipped to the frame's rounded corner by the
  frame's `overflow: hidden`. Non-interactive (`aria-hidden`), doesn't sit
  under any text or control.
- Cookie panel and preference trigger styling untouched from MH-018 (still
  `var(--color-brand-soft)` panel in normal flow beneath the actions).

**Verification:**

- `npm run lint` — pass, no warnings.
- `npm run build` — pass; all 13 routes (including `/links`) still
  prerender as static content.
- `git diff --check origin/main...` — clean, exit 0.
- Browser review via Playwright MCP against the local dev server
  (`npm run dev`, `http://localhost:3000/links`) at 320×568, 390×844, and
  1440×900:
  - Fresh (no-consent) and saved-consent (`Reject non-essential`) states
    both checked — inline cookie panel and post-consent "Cookie
    preferences" trigger render correctly, always after the action list,
    never overlapping/obscuring anything.
  - No horizontal overflow at any width (`document.documentElement
    .scrollWidth === clientWidth`); no clipping or nested scroll region.
  - Tab order reaches all four actions (measured target rects ~368×54px,
    well over 44px) and the cookie preference trigger; no focus is
    covered by decorative layers.
  - Confirmed all four action hrefs/labels/order and external-link
    `target="_blank"`/`rel="noopener noreferrer"`/"(opens in a new tab)"
    sr-only text unchanged; internal `/donate` link unchanged.
  - Checked `/`, `/donate`, and `/contact` at 1440×900 — normal header/nav,
    fixed cookie banner, and page layouts are all visually unchanged.
- **Vercel Preview:** not created. The Vercel CLI in this session is
  unauthenticated (no linked/authenticated `vercel` MCP/CLI available in
  this workspace), so per the task's fallback instruction this was
  recorded rather than attempted; local build + browser verification
  above stand in for it. A preview should still be pulled and eyeballed
  before this ships, per the task's final manual checkpoint.

**Deviations:**

- An interim design (deep-blue/white overlapping card with the sun tucked
  into the seam) was built, then reworked after user feedback mid-session
  said it didn't read as well as the original card and that the cream
  background wasn't used anywhere else on the site. Final state described
  above supersedes that interim version; no trace of the cream background
  or seam-overlap sun remains.
- No commit, push, PR, merge, or production/domain action was performed.

**Remaining risks:**

- No Vercel Preview has actually been opened/reviewed yet — only local
  `next build` output and a local dev-server Playwright pass. Recommend
  pulling a preview before merge.
- Sun GIF and logo PNG are unchanged assets; no new Cloudinary lookups
  were introduced.

## Implementation recap

**User-visible outcome:** `/links` now reads as a compact Marang House
card instead of a dark navy/purple microsite: a blue-to-brand-blue header
holding the logo, title, and animated sun, sitting above a white action
surface with the yellow BackaBuddy button first, pale-blue secondary
actions, the existing in-flow cookie panel, and a thin orange-to-yellow
accent band along the bottom edge. Page background is plain white, matching
the rest of the site.

**Why this fits Marang House:** the header/surface split borrows the
brand's blue-structure-plus-yellow-emphasis language from Home/Donate
without adding chrome, new assets, or motion — it's the same card the QR
page already had, just re-skinned onto the canonical palette instead of a
one-off gradient. The bottom accent band is the only new decorative
element, and it's small, non-interactive, and reuses only existing colour
tokens.

**Changed areas:** `components/links/LinksPage.tsx` (presentational
wrapper split only — no functional/JSX logic changed) and the
`.links-page`-rooted block in `app/globals.css`. Nothing outside those two
files, and no selector outside `.links-page`, was touched.

**Verification evidence:** see above — lint/build/diff-check all pass;
manual Playwright pass covered all three required viewports, both consent
states, keyboard reachability, hrefs, and a same-session regression check
of Home/Donate/Contact.

**Reusable pattern:** when a small isolated utility route (like a
QR-landing page) needs to "feel like" the main site without adopting its
shared shell, the cheapest reliable route is reusing the site's literal
colour tokens on a plain, flush card — resist the urge to add
collage-style overlaps/z-index layering for a single decorative asset
unless there's room to verify it doesn't collide with wrapped text at the
narrowest supported viewport; it costs little visually to skip and a lot
to get wrong.

# MH-017: Fundraiser QR links page

Status: ready-for-check
Base: `d9d2bd8761ce88a903dde926f173443d76dc25ed` (`origin/main`)

## Goal

Publish a compact, branded landing page at `https://www.maranghouse.org/links`
for use as the stable destination of a fundraiser QR code. It must give a
mobile visitor immediate donation and social actions without changing the
normal site navigation or exposing an event-specific message that will become
stale after the fundraiser.

User-visible outcome:

- A scan of `https://www.maranghouse.org/links` opens a focused Marang House
  links page rather than a normal content page with the primary navigation and
  footer.
- The page offers, in order: the BackaBuddy donation campaign, the existing
  Donate page (for EFT and other options), Instagram, and Facebook.
- Future destination/label edits have one clear source of truth and can be
  delivered through the ordinary branch → preview → PR → `main` workflow.

## Repository evidence and current behaviour

- `app/layout.tsx` currently renders `SiteHeader`, the `main` landmark,
  `SiteFooter`, consent, and the click-light effect for every route. A nested
  `/links` layout cannot bypass this root layout, so a route-aware shell is
  needed to omit only the standard chrome on the focused links page.
- `lib/site-data.ts` is the project source of truth for `ORGANISATION`,
  `DONATION`, and navigation. It already contains the verified BackaBuddy URL
  and canonical `https://www.maranghouse.org` site URL; it deliberately has no
  social URLs yet.
- `app/donate/page.tsx` is the correct existing internal route for EFT and
  other donation information. The dedicated links page must not duplicate bank
  details.
- `app/sitemap.ts` derives public core pages solely from `SITE_NAVIGATION` and
  explicitly enumerated legal routes. `/links` must stay out of both lists.
- Production deploys only after a reviewed merge to `main`; work branches get
  Vercel previews. Do not use a preview URL in the printed QR code and do not
  deploy with `vercel --prod`.

## Scope

### In

- A static App Router `/links` route with generic, evergreen support copy,
  existing Marang House logo treatment, responsive styling, and route-specific
  `noindex` metadata.
- These destinations:

  | Label | Destination |
  | --- | --- |
  | Donate via BackaBuddy | `DONATION.primary.url` |
  | More ways to donate | `/donate` |
  | Follow Marang House on Instagram | `https://www.instagram.com/marang_house/` |
  | Follow Marang House on Facebook | `https://www.facebook.com/maranghouse/` |

- A central typed links-page configuration in `lib/site-data.ts`, including
  the canonical page URL `https://www.maranghouse.org/links` and button data.
- A dedicated `components/links/` component boundary for all links-page UI.
  Keep `app/links/page.tsx` as the thin route/metadata entry point so future
  visual work remains inside the links-page feature rather than existing site
  pages or shared UI components.
- A route-aware chrome boundary that leaves all existing routes functionally
  and visually unchanged while `/links` has no standard header, footer, or
  click-light effect. The main landmark, skip-link target, consent, and
  consent-gated analytics must remain available.
- Strict style isolation: every new CSS selector must be rooted at
  `.links-page` (including responsive rules). Do not modify generic element,
  shared `.btn`, token, or existing-route selectors for links-page visuals.
- Normal external-link safety (`target="_blank"` with `rel="noopener noreferrer"`)
  and an accessible indication that social destinations open a new tab.

### Out

- QR image generation, QR assets, printing, or a QR-code dependency. The user
  will generate the code manually from `https://www.maranghouse.org/links`
  after the route is live in Production.
- A CMS, runtime configuration, environment variables, social embeds,
  contact/WhatsApp actions, event name/date copy, payment processing, or new
  Cloudinary assets.
- Adding `/links` to `SITE_NAVIGATION`, the footer, sitemap, or search index.
- Commits, pushes, PR creation, merging, production deployment, Vercel domain
  changes, or changes to the retained emergency landing project.

## Dependencies and ownership

This is one vertical slice; do not split it across agents because the root
layout, central data, and global stylesheet are shared integration points.
The implementation lead owns `app/layout.tsx`, the exact-path shell exception,
the new `app/links/` and `components/links/` feature boundary,
`lib/site-data.ts`, and the namespaced additions to `app/globals.css`. The work
depends only on existing site assets and the current `DONATION`/`ORGANISATION`
data; it has no external credential or content dependency.

## Implementation steps

1. Add a typed `LINKS_PAGE` content model to `lib/site-data.ts`. It must own
   the canonical URL, title/tagline, and ordered link items, reuse
   `DONATION.primary.url` rather than duplicating it, and distinguish internal
   from external destinations. **Done when** all page-specific copy and all
   four URLs are editable in that one configuration.
2. Extract the header/main/footer/click-light arrangement in `app/layout.tsx`
   into a small route-aware client shell (for example,
   `components/SiteShell.tsx`). Use an exact `pathname === "/links"` exception:
   on that route render only the main content; on every other pathname,
   preserve the exact current chrome and interaction. Keep the global skip
   link, consent banner, JSON-LD, and consent-gated GA behaviour intact.
   **Done when** `/links` is focused while Home, Donate, and the remaining
   existing routes retain their normal shell.
3. Implement a thin `app/links/page.tsx` route entry and dedicated
   `components/links/` UI components using the central content model and
   existing local/Cloudinary logo pattern. Set canonical metadata for `/links`
   and `robots` to `noindex, follow`; do not change `app/sitemap.ts`. Use
   semantic heading and grouped/ordered actions, an internal `Link` for
   `/donate`, and safe external anchors for BackaBuddy and social links.
   **Done when** each supplied destination is reachable and no page content is
   invented beyond generic support copy.
4. Add only namespaced `.links-page` descendant styles to `app/globals.css`.
   Never change shared `.btn`, `body`, `main`, bare element, token, or
   existing-route selectors to achieve links-page visuals. Use existing Marang
   House tokens and fonts; make the primary donation action visually dominant,
   buttons readable and at least 44px high, and support 320px-wide screens
   with no horizontal overflow. **Done when** the new route is polished and
   responsive while every pre-existing route is unaffected.
5. Run automated verification and the final preview checkpoint. Record exact
   results, changed files, and any deviations in Handoff. **Done when** all
   success criteria pass and the task is marked `ready-for-check`.

## Success criteria

- `/links` renders statically, has a canonical URL of
  `https://www.maranghouse.org/links`, and sends `noindex, follow` metadata.
- It displays the four approved actions in the specified order and uses the
  exact supplied URLs; the internal Donate action remains same-site.
- It has no normal site header/footer/click-light effect, but its main landmark
  is a valid skip-link destination and consent/analytics controls still work.
- Links-page UI lives under `components/links/`; every new style rule is scoped
  below `.links-page`, with no modified shared button, bare-element, token, or
  existing-route selectors.
- At 320px, 390px, and 1440px wide, all text and buttons are readable,
  keyboard reachable, visually focused, and free of horizontal overflow.
- `/links` is absent from primary nav, footer nav, and `sitemap.xml`; other
  routes retain their existing site shell. At minimum, Home, Donate, and
  Contact must still show their normal header, footer, and click-light effect.
- `npm run lint` and `npm run build` pass.

## Verification

Automated:

```sh
npm run lint
npm run build
```

Manual checkpoint (final only): inspect the Vercel Preview at 320px, 390px,
and 1440px widths. Confirm the compact focused experience, all link targets,
keyboard focus, no horizontal scroll, and no normal site header/footer. Then
check Home, Donate, and Contact at desktop and mobile widths: each must retain
its existing header, footer, click-light behaviour, and page geometry. After
an approved merge, open the Production canonical URL before generating the
print QR; the QR must encode exactly `https://www.maranghouse.org/links`.

## Assumptions, risks, and decisions

- `maranhouse.org/links` in the initial request was a spelling error. The
  production canonical host is `www.maranghouse.org`; using its URL avoids the
  redirect from the apex host during a scan.
- The page is deliberately noindex and omitted from the sitemap because it is
  a QR-first utility landing page, not a public SEO destination.
- All future updates require a small branch, Vercel preview, and merge to
  `main`; a feature branch can be previewed but cannot independently serve
  only `/links` at the public production hostname.
- The `/links` component boundary and `.links-page` selector namespace are
  mandatory isolation boundaries. Rich links-page UI may be added freely
  inside them, but a change outside those boundaries is a separate-scope
  decision and requires explicit regression evidence for the affected site
  routes.
- The supplied social URLs are treated as verified by the requester. If either
  destination changes, update `LINKS_PAGE` and follow the same release flow.

## Handoff

**Changed files:**
- `lib/site-data.ts` — added `LinksPageItem` type and `LINKS_PAGE` config
  (canonical URL, title, tagline, ordered items). Reuses `DONATION.primary.url`
  rather than duplicating it; the two social URLs are the requester-supplied,
  verified `instagram.com/marang_house` and `facebook.com/maranghouse`.
- `components/SiteShell.tsx` (new) — extracted header/main/footer/click-light
  arrangement out of `app/layout.tsx` into a client component keyed on an
  exact `pathname === "/links"` check via a `CHROMELESS_ROUTES` set. Every
  other route renders the header, footer, and `ClickLightEffect` exactly as
  before; `/links` renders only `<main id="main-content">`.
- `app/layout.tsx` — now renders `<SiteShell>{children}</SiteShell>` instead
  of inlining `SiteHeader`/`SiteFooter`/`ClickLightEffect`. Skip-link, JSON-LD,
  `ConsentBanner`, and consent-gated `GoogleAnalytics` are unchanged and still
  render for every route including `/links`.
- `components/links/LinksPage.tsx` (new) — presentational component reading
  `LINKS_PAGE`; internal `/donate` action uses `next/link`, external actions
  use `target="_blank" rel="noopener noreferrer"` plus an `sr-only` "(opens in
  a new tab)" suffix.
- `app/links/page.tsx` (new) — thin route entry; builds metadata via
  `pageMetadata` (canonical `https://www.maranghouse.org/links`) with
  `robots: { index: false, follow: true }` added on top.
- `app/globals.css` — appended a `.links-page` block at the end of the file
  (full-viewport centred card, primary/secondary button variants, one
  `max-width: 22.5rem` tweak). No existing selector was edited.
- No changes to `app/sitemap.ts`, `SITE_NAVIGATION`, or `SiteFooter`/`SiteHeader`
  internals.

**Checks:**
- `npm run lint` — passes, no warnings/errors.
- `npm run build` — succeeds; `/links` appears in the route list and
  prerenders statically (`○`) alongside the other 12 routes.
- Verified `.next/server/app/sitemap.xml.body` contains no `links` entry.

**Manual verification (Playwright against `npm run dev`):**
- `/links` at 390×844: card renders centred, no header/footer, consent banner
  overlays correctly and is dismissible (`Accept all`).
- `/links` at 320×568: no horizontal overflow (`scrollWidth === clientWidth ===
  320`); all four actions visible after scrolling past the fold once consent
  is dismissed.
- `/links` at 1440×900: centred card, no header/footer, generous whitespace.
- Accessibility snapshot at `/links` confirms exactly the four specified
  actions in the specified order with correct hrefs (BackaBuddy campaign URL,
  `/donate`, Instagram, Facebook), a `main` landmark matching the skip-link
  target, and 0 console errors/warnings.
- Regression check: `/`, `/donate`, `/contact` each still render `.site-header`
  and `.site-footer` in the DOM after the `SiteShell` extraction.

**Deviations from the plan:** none. Implementation followed the five
prescribed steps (content model, `SiteShell` extraction, `/links` route +
`components/links/`, namespaced CSS, verification) without touching shared
`.btn`, bare-element, token, or existing-route selectors.

**Remaining risk:** none identified. Not committed, pushed, or deployed — left
for review per the task contract. The user must still generate/print the QR
code encoding `https://www.maranghouse.org/links` and confirm the Production
URL after an approved merge, per the task's "Out of scope" and Verification
sections.

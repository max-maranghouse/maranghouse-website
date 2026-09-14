# Marang House Website — AGENTS.md

Canonical, current-state reference for Codex and Claude Code sessions working
in this repo. Read this first. For deep history (the original static-site era, and
the 2026-07-22/23 GoDaddy hosting compromise), see
`MARANG-HOUSE-SITE-CONTEXT.md` §11 — still fully relevant, see the warning
below.

## ⚠️ Deployment status — read before assuming this is live

The production domain `maranghouse.org` is **not** currently pointed at this
Next.js project. It points at a separate, minimal static landing page in a
different repo/Vercel project (`marang-house-landing`), put up as a stopgap
after the original GoDaddy/WordPress hosting was compromised. Full story in
`MARANG-HOUSE-SITE-CONTEXT.md` §11. When this project is ready to launch,
the domain has to be manually moved from `marang-house-landing` to this
project (`marang-house-website`) in the Vercel dashboard — it will not happen
from a code merge alone.

- **Repo:** https://github.com/max-maranghouse/maranghouse-website
- **Vercel project:** `marang-house-website` (team `marang-house-team`)
- **`Maxwell103` is the standard working GitHub account for this repo** —
  it has push access (`max-maranghouse` remains the repo owner/admin
  account but isn't used for day-to-day pushes/PRs). If a push 403s, the
  wrong `gh` account is active: `gh auth switch --user Maxwell103` then
  `gh auth setup-git` — but inside a Conductor session that alone isn't
  enough; see the Conductor-specific gotcha directly below for the actual
  fix (`env -u GH_TOKEN -u GITHUB_TOKEN git push ...`).
- **Conductor-specific gotcha:** Conductor injects its own `GH_TOKEN` into
  every shell it gives an agent, which silently overrides `gh auth switch`
  for `gh api`/`gh pr`/`gh issue`/`gh auth switch` itself. That token can
  create PRs but not merge or comment on them. **This repo's `git push` is
  also affected**, not just `gh` subcommands: this machine's git is
  configured with `credential.https://github.com.helper = gh auth
  git-credential` (see `git config --list --show-origin | grep credential`),
  so `git push` shells out to `gh` for credentials too, and that call
  respects the injected `GH_TOKEN` the same as any other `gh` invocation —
  confirmed by a 403 (`Permission ... denied to Maxwell103`) on `git push`
  even right after a successful `gh auth switch --user Maxwell103`. To act
  as a real account (switch, merge, comment, **push**, etc.) from inside a
  Conductor session, unset the injected token first: `env -u GH_TOKEN -u
  GITHUB_TOKEN git push -u origin HEAD` / `env -u GH_TOKEN -u GITHUB_TOKEN
  gh pr merge <n> --squash`. `.conductor/settings.local.toml`
  (machine-local, gitignored) runs this automatically for `gh auth
  switch`/`setup-git` at workspace setup, but `git push`, `gh pr
  merge`/`comment`/etc. still need the `env -u` prefix per command since
  Conductor re-injects `GH_TOKEN` into every new shell.

## Branch baseline

- **Authoritative site branch:** `origin/main`.
- Create task branches directly from that remote branch and record the exact
  base commit in the task file.
- `origin/rebuild/marang-v3` and other historical branches are obsolete. Do
  not merge, rebase, or cherry-pick them into task branches.
- Review task branches before any release action. Vercel preview deploys per branch.

## Design status

The Canva-matching visual redesign is **complete** — Home, About,
Lightkeepers, and Donate/Contact have all been rebuilt to match the Canva
reference (see git log: "Checkpoint 0" through the later "stats/skipping/
likes badge" commits on `rebuild/marang-v3`). The original build brief
(`archive/CANVA-REDESIGN-PROMPT.md`) has been archived now that it's done
its job — its still-open content questions are carried forward below so
they aren't lost.

`/press` exists only as an **empty stub directory** (`app/press/`, no
`page.tsx`) — the Canva brief's press-page section was never built.

## Stack & conventions

- **Next.js 16, App Router**, fully static generation — no runtime data
  fetching, no env vars needed for the contact form (Formspree form ID
  isn't a secret).
- **Images:** all via Cloudinary, through the `cld()` helper in
  `lib/images.ts`, which prepends
  `https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/`. Two
  path conventions in use: flat filenames (`MH-Ray.gif`) for native site
  assets, versioned paths (`v.../maranghouse/name.jpg`) copied straight
  from a Cloudinary delivery URL.
  - **SVG assets:** `next/image` here has no SVG support
    (`next.config.ts` isn't set up for `dangerouslyAllowSVG`). Request an
    SVG source as a rasterised PNG via Cloudinary's on-the-fly
    `f_png,q_auto` transform instead, bypassing the shared `cld()` helper
    — e.g. `https://res.cloudinary.com/m4hqddxx/image/upload/f_png,q_auto/<path>.svg`.
    Always verify the resulting URL actually renders a raster image before
    wiring it into JSX — it may render *shapes only*, with any text in the
    original SVG silently dropped (this happened with the homepage's
    "Creating A Better Future" banner asset).
- **`components/BgPhoto.tsx`:** the standard "background image" pattern
  used throughout instead of CSS `background-image` — fills a
  `position: relative`-and-sized container with a `next/image` `fill` +
  `object-fit: cover`. Reach for this whenever a design calls for a photo
  behind text/overlay content.
- **Styling:** one `app/globals.css` file, no Tailwind/CSS-in-JS. Brand
  tokens live in `:root` — `--color-brand` (blue `#004aad`),
  `--color-orange`, `--color-yellow`/`--canva-yellow`, `--color-red`,
  `--color-purple` (`#6a3fb5`, added for the Donate hero), `--color-cream`.
  Fonts: Fredoka (heading), Nunito (body), Permanent Marker (accent),
  self-hosted via `next/font`.
- **Contact form:** Formspree, form ID `xjgnonlz`, via `@formspree/core`
  (deliberately not `@formspree/react`, which bundles the Stripe SDK for
  payment fields this form doesn't use). Component: `components/ContactForm.tsx`.
  Has a honeypot spam field.
- **Security:** CSP + security headers configured in `next.config.ts`
  (`img-src` allows `res.cloudinary.com` + `data:`, `connect-src` allows
  `formspree.io`, `frame-ancestors 'none'`, HSTS, etc.). Extend if a new
  asset host/type is needed — don't strip it.
- **Accessibility baseline:** skip-link, `.sr-only` utility, and
  `:focus-visible` outlines all live in `globals.css`. Decorative
  animated GIFs get `alt=""` + `aria-hidden="true"` + `unoptimized` (Next's
  image optimizer would otherwise flatten the animation to a single frame).
- **Org facts source of truth:** `lib/site-data.ts`
  (`ORGANISATION`, `DONATION`) — phone, email, address, NPC/NPO/PBO
  numbers, EFT bank details, BackaBuddy campaign URL. Import from there
  rather than hardcoding these values anywhere, markdown included.
  GivenGain was dropped as a donation platform — don't reintroduce it.

## Still-open content questions (unresolved — don't silently guess on these)

1. ~~**Age range.**~~ **Resolved 2026-08-27:** Max confirmed 7–14 is
   correct (`lib/site-data.ts` `agesServed`, and the About page copy). The
   "4–14" figure in `archive/CONTENT-INVENTORY-raw.md` was wrong/outdated
   — no code change needed, both already say 7–14.
2. **Homepage stats banner numbers** ("Creating A Better Future" section):
   28+ Years / 300+ Children / 1000+ Volunteers. 28+ Years is at least
   consistent with `foundedYear: 1998`; the Children/Volunteers figures
   aren't independently verified.
3. **Testimonials.** Never built into any page. Two conflicting
   name/quote sets exist historically (the Canva mockup's Rosita
   Gaskin/Gugulethu Cele/Malwande Khumalo vs. the content inventory's
   Nkosi Speers/Eugalina Corn/Minwase Khamala) — neither confirmed real,
   don't merge or invent a third. No testimonials section currently
   exists live at all.
4. **`/press` page.** Not built. If it ever is, do not reuse the old
   mockup's proposed headlines (Business Day/Property24/Mail & Guardian)
   — they read as property-developer coverage, not a children's chronic-
   illness care home, and were never verified as real.
5. **Lightkeepers "Join The Circle" donor showcase.** Never built — open
   product question on how recurring BackaBuddy Circle-of-Light donors
   should surface on `/lightkeepers` (an embeddable BackaBuddy widget if
   one exists vs. a manually-curated list vs. skipping it entirely).
6. **Social media links.** Still no real Facebook/Instagram/etc. URLs
   anywhere in the codebase (only Twitter Card *metadata*, not an actual
   profile link) — outstanding since the original Next.js migration.
7. **Two Cloudinary lookups that 404'd** during the last content pass and
   were left unresolved: `MH-hearts.gif` (only a filename was given, no
   real URL — ask for it before using) and `MH-skipping-gif.gif` (typo;
   the working asset is `MH-skipping-giff.gif`, already wired in where
   needed).

## Agent workflow

- Active work is specified in `.ai/tasks/`. The task file is the authority for
  outcome, scope, acceptance criteria, verification, decisions, and handoff.
- Codex inspects and architects the task, records the base commit, and reviews
  the completed diff against both the task and this guide.
- Claude Code implements only the approved scope, runs the task's verification,
  records results and deviations in its handoff, and marks it ready for review.
- Neither agent commits, pushes, deploys, or changes production infrastructure
  unless the user explicitly requests it.

## Related docs

- **`MARANG-HOUSE-SITE-CONTEXT.md`** — deep history: the original static
  `index.html` era (§1–9, superseded), the Next.js migration plan (§10,
  now also superseded by the Canva redesign above), and the GoDaddy
  hosting compromise / temporary landing page (§11, **still fully
  current** — read it before touching domains/DNS).
- **`archive/CONTENT-INVENTORY-raw.md`** — raw, non-authoritative
  pre-redesign content extraction; the source for the "verified" figures
  cited in the open questions above.
- **`archive/CANVA-REDESIGN-PROMPT.md`** — the original Canva-matching
  redesign brief, archived now that the redesign it describes is done.

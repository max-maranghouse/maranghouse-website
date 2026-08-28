# Marang House Website — Project Context & Working Guide

> ⚠️ **Start with `AGENTS.md` instead.** It's the current, maintained
> reference (stack, conventions, design status, open content questions).
> This file is kept for its historical/deployment record — §11 in
> particular (the GoDaddy hosting compromise) is still fully current and
> worth reading before touching domains/DNS — but §1–10 below describe
> earlier states of the project that have since moved on.

> Upload this file at the start of a chat when you want help working on the Marang House website. It contains everything needed to understand how the site is built, where things live, and how to make and publish changes.

> ⚠️ **Sections 1–9 below describe the site as it was originally built (a single static `index.html`).** They no longer describe what's actually live. §10 documents the Next.js rebuild plan and its status as of 2026-07-22 — that rebuild is itself now further along: a Canva-matching visual redesign was completed after this section was written (see `AGENTS.md` → "Design status"), and §10's two "outstanding before launch" items (social media links, press page content) are **still outstanding** as of the current `AGENTS.md`. The domain situation in **§11** is separate from all of that and still applies as written: `maranghouse.org` currently runs a temporary landing page in its own project/repo, not this one.

---

## 1. What this site is

A single-page static website for **Marang House**, a Johannesburg non-profit providing safe homes for seriously ill children. Built originally in Claude Design, exported to flat HTML, and deployed on Vercel with images served from Cloudinary.

- **Live site:** https://marang-house-website.vercel.app
- **GitHub repo:** https://github.com/max-maranghouse/maranghouse-website
- **Hosting:** Vercel (team: `marang-house-team`, Hobby/free plan)
- **Images/media:** Cloudinary (cloud name: `m4hqddxx`, folder: `maranghouse/`)
- **Type:** Plain static HTML — **no build step, no framework**. Just `index.html` served as-is.

---

## 2. The single most important fact

**The entire live site is one file: `index.html`.**

Everything else in the repo is tooling, source material, or history. To change the live site, you change `index.html` and redeploy. That's it.

---

## 3. Repository structure

| File / folder | What it is | Deployed? |
|---|---|---|
| `index.html` | **The live site.** The only file that matters for deployment. | ✅ Yes |
| `.vercelignore` | Tells Vercel to upload ONLY `index.html` (ignores everything below). | (config) |
| `.gitignore` | Keeps secrets and bulky local files out of git. | (config) |
| `Marang House.html` | Original flat export from Claude Design (references local images). Source of `index.html`. | ❌ No |
| `Marang House (standalone).html` | 6.6 MB bundled export with base64 images. Archive only. | ❌ No |
| `decoded_template.html` | Unbundled Next.js template (broken layout — do NOT use). | ❌ No |
| `uploads/` | Local copies of UI images (logo, sun, stars). Now on Cloudinary. | ❌ No |
| `web-images/` | Local copies of photos. Now on Cloudinary. | ❌ No |
| `*.py` scripts | One-time build tooling (see below). Kept as a record. | ❌ No |
| `uploads_map.json` | Maps local image paths → Cloudinary URLs (the current, correct map). | ❌ No |
| `url_map.json` | Older UUID→Cloudinary map from an abandoned approach. Ignore. | ❌ No |

### The Python scripts (historical — you rarely need these again)
- `extract_design.py` / `extract_assets.py` — pulled images out of the original Claude Design bundle.
- `upload_to_cloudinary.py` — early UUID-based upload (superseded).
- `upload_uploads.py` — **the one that matters:** uploaded the real referenced images to Cloudinary. Rerun this if adding new images from the `uploads/` or `web-images/` folders.
- `rewrite_final.py` — swapped local image paths for Cloudinary URLs to produce `index.html`.

---

## 4. How images work

All images load from Cloudinary, not from the repo. In `index.html` you'll see URLs like:

```
https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/maranghouse/<image-name>.<ext>
```

- `f_auto,q_auto` = automatic format + quality optimization (keeps the site fast). Keep this on photo URLs.
- `maranghouse/` = the Cloudinary folder holding all 21 site images.

**To replace an image:**
1. Upload the new image to Cloudinary (into the `maranghouse/` folder). Easiest via the Cloudinary web dashboard (Media Library → upload). To overwrite an existing one, give it the same "public ID" (filename without extension) and it replaces in place — no URL change needed.
2. If you used a new name, find the old URL in `index.html` and swap in the new one.
3. Redeploy (see section 6).

**Cloudinary credentials:** stored locally in a `.env` file (NOT in the repo, NOT in this doc). The live site doesn't need them — it only reads public image URLs. Credentials are only needed if re-running the upload scripts. If the API secret is ever exposed, rotate it in the Cloudinary console.

---

## 5. Fonts

The design uses two Google Fonts:
- **Fredoka One** — headings (rounded, playful)
- **Nunito** — body text

These load via Google Fonts links in `index.html`. If headings ever render in a plain/serif fallback font, the Google Fonts `<link>` in the `<head>` is missing or broken.

---

## 6. How to publish changes to the live site

There are two paths. **Both start by editing `index.html`.**

### Path A — Terminal (for developers using VS Code / Claude Code)
```bash
cd "/Users/maxwellernst/Documents/Marang House Website"
# make your edits to index.html
vercel --prod
```
Deploys in a few seconds. The live URL updates automatically.

### Path B — Git push (auto-deploy)
The GitHub repo is connected to Vercel, so pushing to the `main` branch *should* trigger an automatic deploy:
```bash
git add index.html
git commit -m "describe your change"
git push
```
Vercel picks it up and redeploys. (If auto-deploy ever doesn't fire, fall back to Path A.)

> ⚠️ Note on GitHub accounts: this machine has two GitHub identities — `max-maranghouse` (owns the repo) and `Maxwell103`. Pushes must authenticate as `max-maranghouse`. If a push is denied with a 403, the wrong cached credential is being used.

---

## 7. Design brand reference

Pulled from the original design, in case you're adding new sections:

- **Colours:** deep blue `#004aad` / `#00307a`, orange `#f27926`, yellow `#f8e026` / `#f9b83c`, red `#df3436` / `#FF3538`, light blues `#dde8ff` / `#e8f0ff`, cream `#fff8e6` / `#fffbee`.
- **Fonts:** Fredoka One (headings), Nunito (body).
- **Voice:** warm, hopeful, child-focused. Tagline: "Fostering Health, Providing Hope."
- **Sections on the page:** Hero, About, Contact, Donate, The Lightkeepers (monthly giving), Press.

---

## 8. Common tasks — quick reference

| I want to… | Do this |
|---|---|
| Change some text | Edit `index.html`, redeploy (§6). |
| Replace a photo | Upload to Cloudinary, update URL in `index.html` if renamed, redeploy. |
| Add a new photo | Upload to Cloudinary → copy its URL → add `<img>` or background in `index.html` → redeploy. |
| Fix broken fonts | Check the Google Fonts `<link>` in `<head>`. |
| Add a custom domain (e.g. maranghouse.org) | Vercel dashboard → project → Settings → Domains. |
| See what's deployed | Vercel dashboard → marang-house-team → marang-house-website. |

---

## 9. For a future Claude working on this site

- The deliverable is almost always an edit to **`index.html`**. Ask to see it (or the relevant section) before editing.
- Don't reintroduce local image paths (`uploads/…`, `web-images/…`) — all images must be Cloudinary URLs.
- Don't touch `decoded_template.html` — its layout is broken; it's not the real site.
- Keep `f_auto,q_auto` on Cloudinary photo URLs for performance.
- This is plain HTML/CSS/JS. No React, no build step. Keep it that way unless the user explicitly wants to migrate.
- After edits, remind the user to redeploy with `vercel --prod` (or push to `main`).

---

## 10. Site overhaul — plan & status (started 2026-07-22)

The original single-file static export (`index.html`) is being rebuilt as a Next.js
App Router project on Vercel, keeping the **visual design pixel-for-pixel identical**
while fixing code quality, UX, SEO, accessibility, and security gaps. All work happens
on a branch (`overhaul/nextjs-migration`) with Vercel preview deployments; `main` /
production is not touched until the rebuild is reviewed and approved.

**Rollback point:** git tag `backup/pre-overhaul-2026-07-22` (commit `1554a8a`) is the
exact pre-overhaul static site. `git checkout backup/pre-overhaul-2026-07-22` always
gets you back to it.

### Problems identified in the original `index.html`
- Fake routing — one URL, JS `show()` toggles which `<div class="page">` is visible,
  state mirrored into `localStorage`. No shareable links, no working back button,
  nothing for search engines to index per page.
- Contact form was non-functional — `onsubmit="return false;"`, no backend, no
  action/fetch. Submissions vanished.
- No SEO surface — no meta description, no OG/Twitter tags, no `robots.txt`, no
  `sitemap.xml`, no per-page titles.
- Accessibility gaps — only 1 `aria-*` attribute in the whole doc, no `<label>` on any
  form field (placeholder-only), no skip-to-content link, nav built from `onclick`
  handlers instead of real links.
- No security headers — no CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, or HSTS configured anywhere.
- Repo clutter — 6.6MB standalone export, a broken decoded template, one-off Python
  scripts, and duplicate image folders sitting in the working tree.

### Decisions made
- **Architecture:** migrate to Next.js (App Router) rather than patch the static file
  — real per-page routes, React components, `next/image` and `next/font`.
- **Contact form:** third-party form service, [Formspree](https://formspree.io)
  (form ID `xjgnonlz`), called client-side via `@formspree/core` — no custom backend.
  (Originally planned around Web3Forms; switched to Formspree once the site owner set
  up a Formspree form instead. Using `@formspree/core` directly rather than
  `@formspree/react` — the React package unconditionally bundles the Stripe SDK for
  payment-field support this form doesn't use; `@formspree/core` has no such
  dependency and implements the same submission/error contract.)

### Plan (phases)
1. Scaffold Next.js project; port every section verbatim into real routes (`/`,
   `/about`, `/lightkeepers`, `/donate`, `/press`, `/contact`) — pixel parity first.
2. Componentize (Nav, Hero, LightkeeperBand, About, Donate, Press, Contact, Footer)
   with real `<Link>` navigation and active states, no inline `onclick`.
3. Images via `next/image` (Cloudinary `remotePatterns`, keep `f_auto,q_auto`
   behaviour); fonts via `next/font` (Fredoka, Nunito, Permanent Marker — self-hosted,
   no runtime Google Fonts request).
4. Contact form wired to Formspree with real `<label>`s, validation, success/error
   states, honeypot spam field.
5. SEO: Metadata API per page, OG/Twitter cards, `app/sitemap.ts`, `app/robots.ts`,
   JSON-LD for the NPO.
6. Accessibility: skip link, semantic landmarks, visible focus states, labeled form
   fields, alt-text audit, contrast check.
7. Security headers in `next.config.js` (CSP scoped to Cloudinary/Formspree, X-Frame-
   Options, Referrer-Policy, Permissions-Policy, HSTS), dependency audit.
8. Performance pass (Lighthouse/Core Web Vitals, bundle size, confirm image
   optimization is landing).
9. Testing with Playwright — every route loads, nav/mobile menu, form submits
   end-to-end, responsive breakpoints, no console errors.
10. Repo cleanup — archive legacy Python scripts/exports/duplicate image folders out
    of the active tree (kept in git history, not deleted). Merge to `main`, promote to
    production once approved.

### Status (as of 2026-07-22)

Phases 1–10 are code-complete on branch `overhaul/nextjs-migration` (not yet merged
to `main` / production). The site is now a Next.js 16 App Router project:

- Real routes for every page, `next/image` (Cloudinary `remotePatterns`), `next/font`
  self-hosted fonts, static CSP + security headers in `next.config.ts`, SEO metadata /
  sitemap / robots / JSON-LD, accessibility fixes (skip link, labeled form fields,
  focus states), and the contact form wired to Formspree (client-side, no backend,
  no env vars needed — the form ID isn't a secret).
- `npm run build` and `npm run lint` pass clean; every route pre-renders as static
  content; Playwright pass across all 6 pages found 0 console errors and 0 broken
  images; screenshots confirm the design matches the original pixel-for-pixel.
- Old static-export files (`index.html`, the Python build scripts, HTML exports,
  local image dumps) moved to `archive/` — not deployed (see `.vercelignore`).

**Before this can go live, two things are still outstanding:**
1. **Social media links.** Site owner is providing the real Facebook/Twitter/
   Instagram/LinkedIn URLs (originally `<a>` tags with no `href` in the source site
   too — ported as inert rather than inventing URLs).
2. **Press page content.** The three "Featured Coverage" items (Business Day, 702,
   Mail & Guardian) with specific headlines and dates look like placeholder content
   from the original Claude Design export, not verified real press mentions —
   confirm these are real before launch, since attributing invented coverage to real
   publications is a reputational/legal risk. Explicitly deferred per site owner
   (2026-07-22) — revisit before production launch.

Once resolved: merge `overhaul/nextjs-migration` → `main`, Vercel redeploys
automatically (or `vercel --prod`).

---

## 11. GoDaddy hosting compromise & temporary landing page (2026-07-22/23)

**What happened:** the live site was, until this point, actually hosted separately on
GoDaddy (WordPress), not on the Vercel project this doc otherwise describes. That
GoDaddy-hosted site was hacked — apparent cause: a compromised WordPress plugin — and
taken down. `maranghouse.org` (the real production domain, registered at GoDaddy) was
pointing at that hosting.

**DNS-level compromise found too.** Reviewing the GoDaddy DNS zone turned up three
records that shouldn't have been there: a `_cf-custom-hostname.www` TXT record and a
Cloudflare delegated-DCV `_acme-challenge` CNAME — the signature of a "Cloudflare for
SaaS" custom-hostname setup the org never configured. Since DNS records can't be added
from inside WordPress alone, this meant something had GoDaddy **account**-level access,
not just a WordPress-admin foothold. Response, in order: locked down the GoDaddy
account (password + 2FA) before touching anything, confirmed via account activity that
the GoDaddy account itself wasn't separately breached, then deleted the unauthorized
records. Two other records (`pay` CNAME to GoDaddy's own Payment Links product, and a
`sender._domainkey`/SPF entry for a third-party mailer at `sendersrv.com`) were
confirmed as legitimate, pre-existing, and left alone. A couple of remaining records
tied to GoDaddy's WordPress hosting product itself couldn't be deleted from the DNS
panel (locked by the hosting product) — not a concern since nothing routes to that
hosting anymore.

**Still outstanding, not urgent:** the GoDaddy WordPress hosting account itself hasn't
been cleaned/scanned or decommissioned — it's just no longer publicly reachable via the
domain. Also, SPF ends in `?all` (neutral — doesn't stop spoofing) and DMARC is `p=none`
(monitor-only) — both worth tightening at some point, more so than usual given the
breach raises phishing risk, but not done yet.

**Stopgap while both the hosting cleanup and the Next.js rebuild are unfinished:** a
minimal, dependency-free static landing page.

- **Location:** separate directory and separate git repo —
  `/Users/maxwellernst/Documents/Marang House Website Landing/` — deliberately not part
  of this repo or the Next.js project. Single `index.html`, inline CSS, zero JS, zero
  third-party scripts (the opposite of what just got the WordPress site hacked).
- **Hosting:** new, separate Vercel project `marang-house-landing` (not
  `marang-house-website`, the project this repo deploys to).
- **DNS:** `maranghouse.org` and `www.maranghouse.org` now point at this Vercel
  project — A records `216.198.79.1` / `64.29.17.1` on `@`, `www` still CNAMEs to the
  apex (pre-existing chain, still resolves correctly through to the new records).
  Verified live via `vercel domains verify` and directly in-browser.
- **Content:** About blurb, a "Lightkeepers" donate card linking to the org's BackaBuddy
  campaign (`https://www.backabuddy.co.za/campaign/marang-circle-of-light`), contact
  info, and a real photo (reused from the existing Cloudinary asset library) as a hero
  background for legitimacy. A GivenGain donate button/widget was tried first — the
  GivenGain widget itself turned out to be broken on their end (its CSS asset URL
  returns their marketing homepage instead of stylesheet data) — and the org has since
  decided to only use BackaBuddy going forward, so GivenGain was dropped entirely.
- **Neutral "under maintenance" framing** used deliberately instead of disclosing the
  security incident publicly (avoids alarming donors / inviting further attacks).

**Important for whoever launches the Next.js rebuild:** the custom domain
(`maranghouse.org` / `www`) is currently attached to the `marang-house-landing` Vercel
project, not `marang-house-website`. A domain can only be attached to one Vercel
project at a time — when the rebuild in `overhaul/nextjs-migration` is ready to replace
this landing page, the domain needs to be moved (removed from `marang-house-landing`,
added to `marang-house-website`) as part of that launch, or it'll still be pointing at
the landing page after merging to `main`.

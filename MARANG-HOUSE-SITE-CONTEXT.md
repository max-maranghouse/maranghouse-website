# Marang House Website — Project Context & Working Guide

> Upload this file at the start of a chat when you want help working on the Marang House website. It contains everything needed to understand how the site is built, where things live, and how to make and publish changes.

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
- **Contact form:** third-party form service (Web3Forms) called client-side — no
  custom backend or API keys to manage on Vercel.

### Plan (phases)
1. Scaffold Next.js project; port every section verbatim into real routes (`/`,
   `/about`, `/lightkeepers`, `/donate`, `/press`, `/contact`) — pixel parity first.
2. Componentize (Nav, Hero, LightkeeperBand, About, Donate, Press, Contact, Footer)
   with real `<Link>` navigation and active states, no inline `onclick`.
3. Images via `next/image` (Cloudinary `remotePatterns`, keep `f_auto,q_auto`
   behaviour); fonts via `next/font` (Fredoka, Nunito, Permanent Marker — self-hosted,
   no runtime Google Fonts request).
4. Contact form wired to Web3Forms with real `<label>`s, validation, success/error
   states, honeypot spam field.
5. SEO: Metadata API per page, OG/Twitter cards, `app/sitemap.ts`, `app/robots.ts`,
   JSON-LD for the NPO.
6. Accessibility: skip link, semantic landmarks, visible focus states, labeled form
   fields, alt-text audit, contrast check.
7. Security headers in `next.config.js` (CSP scoped to Cloudinary/Web3Forms, X-Frame-
   Options, Referrer-Policy, Permissions-Policy, HSTS), dependency audit.
8. Performance pass (Lighthouse/Core Web Vitals, bundle size, confirm image
   optimization is landing).
9. Testing with Playwright — every route loads, nav/mobile menu, form submits
   end-to-end, responsive breakpoints, no console errors.
10. Repo cleanup — archive legacy Python scripts/exports/duplicate image folders out
    of the active tree (kept in git history, not deleted). Merge to `main`, promote to
    production once approved.

### Status
_Updated as work progresses — see git log on `overhaul/nextjs-migration` for details._

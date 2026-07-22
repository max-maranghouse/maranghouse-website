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

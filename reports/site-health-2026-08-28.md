# Site Health Audit — Marang House Website

**Date:** 2026-08-28
**Pages checked:** `/`, `/about`, `/lightkeepers`, `/donate`, `/contact`, generated `/robots.txt`, generated `/sitemap.xml`, and the intentional `/press` 404. Browser tests used the local production build at `http://127.0.0.1:3210`; domain/host checks used the current public stopgap at `https://maranghouse.org` and `https://www.maranghouse.org`.

## VERDICT: FAIL (0 blockers; major performance, SEO, and accessibility findings remain)

## Blockers

None. All five candidate routes returned 200, no uncaught page-load error was observed, every internal destination resolved, and the tested interactive paths remained functional.

## Major

1. **Mobile performance misses the ≥90 target on every route, with poor LCP on three routes.** Lighthouse 13.4.1, simulated mobile, produced:

   | Route | Performance | LCP | LCP band | TBT | Transfer |
   |---|---:|---:|---|---:|---:|
   | `/` | 72 | 4.97 s | Poor | 323 ms | 1.12 MB |
   | `/about` | 73 | 3.23 s | Needs improvement | 871 ms | 1.21 MB |
   | `/lightkeepers` | 77 | 4.92 s | Poor | 224 ms | 0.96 MB |
   | `/donate` | 89 | 2.54 s | Needs improvement | 356 ms | 0.78 MB |
   | `/contact` | 41 | 8.03 s | Poor | 1,738 ms | 1.39 MB |

   All recorded CLS values were 0 (good). The homepage desktop run scored 67 Performance with a good 1.63 s LCP, but transferred 2.51 MB (over the 1.5 MB page-weight budget) and recorded 558 ms TBT. Prioritise the Contact hero/map path, then the Home and Lightkeepers LCP assets; remeasure on the deployed Vercel preview after optimisation because localhost server timing is not production timing.

2. **Image delivery is the largest measured optimisation opportunity even though source URLs already use Cloudinary transforms.** Lighthouse estimated image-transfer savings of 776 KiB on About, 633 KiB on Home, 529 KiB on Lightkeepers, 493 KiB on Contact, and 396 KiB on Donate. The biggest individual examples were animated or oversized assets: About's star GIF (430 KB, 425 KB estimated waste), Lightkeepers' banner (262 KB, 247 KB estimated waste), Contact's rasterised SVG hero (378 KB, 310 KB estimated waste), and Donate's cloud GIF (230 KB, 227 KB estimated waste). `f_auto,q_auto`/`f_png,q_auto` is already present, so the practical fixes are smaller responsive dimensions/accurate `sizes`, purpose-built mobile derivatives, and lighter animation formats or static fallbacks—not merely adding the existing transform again.

3. **Contact exceeds both the above-the-fold image and third-party budgets.** A 390×844 browser pass measured 592 KB of above-the-fold images against the 500 KB target. Lighthouse loaded 610 KB of images and 605 KB of script; most script beyond the shared app bundle came from the Google Maps embed, and total third-party transfer was approximately 996 KB against the 200 KB target. Consider a static map preview that loads the interactive Google frame on request/visibility, reduce the 378 KB hero PNG, and replace or resize the 164 KB decorative GIF. All pages also load about 144 KB of fonts, exceeding the 100 KB font budget.

4. **Every candidate page lacks a canonical URL, and subpage Open Graph metadata points to the homepage.** Browser inspection found no `<link rel="canonical">` on any of the five routes. `/about`, `/lightkeepers`, `/donate`, and `/contact` all emit the homepage `og:title`, homepage `og:description`, and `og:url=https://www.maranghouse.org` rather than route-specific sharing metadata (`app/layout.tsx:20-32`; page metadata defines normal titles/descriptions only). Add route-aware canonicals and Open Graph fields. This matters further because the current public apex and `www` hosts both return 200 with byte-identical HTML, no redirect, and no canonical, creating two indexable host variants. Choose the primary host during the Vercel domain move and redirect the other permanently.

5. **Automated accessibility does not meet the required 100 on Contact or Donate.** Lighthouse scored Contact 95 because the off-screen honeypot checkbox remains in the accessibility tree without a label (`components/ContactForm.tsx:62`), and Donate 98 because the document jumps from `h2` to `h4` for “Tax Deductions”/“BBBEE Scorecard Points” (`app/donate/page.tsx:92-114`). Remove the honeypot from the accessibility tree while preserving bot behavior, and make the informational headings sequential or use non-heading markup when they are not structural headings. Home, About, and Lightkeepers scored 100 in the automated accessibility category.

## Minor

1. **Three page titles are shorter than the audit's ~30-character guidance.** About is 23 characters, Donate 21, and Contact 22. They are unique and descriptive enough to understand, but can carry a little more search context without exceeding 65 characters.

2. **Required form fields are not visually identified before submission.** Name, email, and message correctly expose native `required` semantics, but the placeholders and visible form copy do not tell sighted users which fields are mandatory. Add a concise “Required” convention or visible markers with an explanation. The deliberate blocked-network test did show a visible error and re-enabled Submit, so the error path itself works.

3. **The generated sitemap assigns a fresh build timestamp to every route.** `app/sitemap.ts` calls `new Date()` for all entries, so every deployment tells crawlers that all pages changed at build time even when content did not. Use meaningful content dates or omit `lastModified` until reliable values exist.

4. **The current emergency landing page has neither `robots.txt` nor `sitemap.xml`.** Both return 404. The candidate correctly generates both, so this disappears when the domain moves if the candidate is deployed as built; it remains a current-live SEO gap until then.

## What passed

- **Rendering and runtime:** A successful production build statically generated all five routes plus robots and sitemap. Headless Chromium 151 loaded every route at mobile width without console errors, page errors, failed requests, duplicate IDs, or broken images after scrolling the full document. Visual review found no obvious distortion or horizontal overflow.
- **Interaction:** The mobile menu opens, closes with Escape, and returns focus to its button. The honeypot path reaches the success state without a network request. A Formspree request deliberately aborted in-browser produced a visible “Failed to fetch” alert, restored the Submit button, and caused no uncaught exception. No real form submission was made.
- **Core Web Vitals:** Lighthouse CLS was 0 on all five mobile runs. The unthrottled browser pass also observed no layout shift. INP was not available from these lab page-load runs; it requires representative field data or a sufficiently long interaction trace.
- **Page structure:** Every candidate page has exactly one `<h1>`, an English `lang` attribute, a skip link, named navigation, unique normal HTML title and description, and no stray `noindex`. Home and Lightkeepers titles are within the 30–65 character guidance; all descriptions are present and sensibly sized.
- **Sitemap and crawlability:** Candidate `robots.txt` allows crawling and points to the candidate sitemap. The sitemap lists exactly `/`, `/about`, `/lightkeepers`, `/donate`, and `/contact`; all returned 200. `/press` correctly returns 404, is not linked, and is not in the sitemap. No candidate route was orphaned from navigation/footer links.
- **Links and media:** Internal links resolve. The BackaBuddy campaign returns 200, WhatsApp redirects to the correct phone endpoint, the Open Graph image returns JPEG 200, and the rasterised contact hero returns PNG 200. Every deployable Cloudinary URL uses `f_auto,q_auto` or the documented `f_png,q_auto` rasterisation exception. The Google map loads once scrolled into range.
- **Budgets that passed in the mobile browser pass:** Shared application JavaScript was about 148–151 KB compressed (below 300 KB), CSS about 11 KB (below 100 KB), and total route transfer stayed below 1.5 MB. Contact's Lighthouse script total exceeds the budget only after the third-party map scripts load, which is why that route is singled out above.
- **Lighthouse non-performance categories:** Best Practices and SEO scored 100 in the automated tool on all five local routes. The explicit canonical/Open Graph checks above are still findings because Lighthouse's score does not cover those route-consistency requirements.

## Coverage gap

- Lighthouse and browser measurements were made against a local production server, not the exact Vercel branch preview or the future custom-domain deployment. Network latency, CDN caching, image negotiation, primary-host redirects, and field Core Web Vitals may differ. Repeat Lighthouse on the branch preview and run PageSpeed Insights after launch.
- The public domain currently serves `marang-house-landing`, not this repo. Live checks were limited to host duplication, headers, robots, sitemap, and key URLs; its design/performance was not substituted for candidate-build measurements.
- Automated accessibility covers only a portion of WCAG 2.2 AA. No screen-reader session, keyboard-only walkthrough of every link, 200% zoom/reflow test, forced-colours test, or human cognitive/usability test was performed. Photo-background contrast and the correctness of alternative text still require human review with organisational context.
- Lab runs did not produce INP field data and used a single Chromium engine. Safari/iOS and Firefox behavior remain untested.

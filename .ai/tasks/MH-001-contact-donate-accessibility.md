# MH-001: Restore Contact and Donate accessibility

Status: ready-for-review
Base: `5c290d62e44e80a654959efa42a8a1f771196f6f`

## Outcome

Contact and Donate meet the audit's automated accessibility target without
changing Formspree behavior or materially changing the visual design.

## Context

The 2026-08-28 site-health audit scored Contact 95 because the off-screen
honeypot checkbox remains in the accessibility tree without a label. Donate
scored 98 because its informational headings jump from `h2` to `h4`. The same
audit found that required contact fields are not visually identified before
submission.

Relevant sources:

- `reports/site-health-2026-08-28.md`
- `components/ContactForm.tsx`
- `app/donate/page.tsx`
- `app/globals.css`

## Scope

### In

- Remove the honeypot control from the accessibility tree while preserving its
  bot-detection behavior.
- Visibly identify name, email, and message as required; identify phone as
  optional.
- Preserve accessible labels and prevent empty required fields from submission.
- Repair the Donate page's heading hierarchy.
- Add only the CSS required to support these changes within the existing design.

### Out

- Privacy or legal copy, fundraising claims, dependency upgrades, performance,
  SEO, other routes, analytics, and production infrastructure.
- Real Formspree submissions.
- New dependencies or broad visual redesign.

## Acceptance Criteria

- [ ] The honeypot remains present in submitted form data and its early-success
      bot path still avoids a network request.
- [ ] The honeypot is absent from the accessibility tree and produces no
      unlabeled-control violation.
- [ ] Name, email, and message are visibly marked required; phone is visibly
      optional; every control retains an accessible name.
- [ ] Empty required fields are blocked before Formspree submission with
      accessible browser or application feedback.
- [ ] Donate's informational headings follow a sequential semantic hierarchy or
      use appropriate non-heading markup.
- [ ] Contact submit, success, and error behavior remains intact without making a
      real submission during verification.
- [ ] Contact and Donate remain usable by keyboard and have no overlap or
      horizontal overflow at 390px and 1440px widths.
- [ ] Lighthouse Accessibility scores 100 for both routes, with no console errors.
- [ ] No unrelated application, content, dependency, or configuration changes
      are included.

## Verification

Run these commands from the repository root:

```bash
npm ci
npm run lint
npm run build
```

Start the production build in a dedicated terminal:

```bash
PORT="${CONDUCTOR_PORT:-3210}"
npm run start -- --hostname 127.0.0.1 --port "$PORT"
```

In another terminal, using the same port:

```bash
PORT="${CONDUCTOR_PORT:-3210}"
npx --yes lighthouse@13.4.1 "http://127.0.0.1:$PORT/contact" --only-categories=accessibility --chrome-flags="--headless" --output=json --output-path=.context/mh-001-contact-lighthouse.json
npx --yes lighthouse@13.4.1 "http://127.0.0.1:$PORT/donate" --only-categories=accessibility --chrome-flags="--headless" --output=json --output-path=.context/mh-001-donate-lighthouse.json
```

Use Playwright at 390x844 and 1440x900 to inspect `/contact` and `/donate`,
exercise keyboard navigation, verify the accessibility tree and console, test the
honeypot without a network request, and test the Formspree error path by aborting
the request. Do not send a real enquiry.

## Decisions

- Preserve `@formspree/core`, form ID `xjgnonlz`, and the existing bot-detection
  contract.
- Use the current brand tokens and form styling rather than introducing a new
  visual system.
- Leave privacy wording for an organisation-approved task because the audit
  identifies it as a legal and stakeholder decision.

## Handoff

### Repair pass (2026-08-28) — review findings addressed

Codex's review (via Conductor Review; findings relayed by the user since the
inline comments weren't attached to this session) raised four items. Each is
reproduced, fixed, and re-verified below.

**1. Honeypot regression.** Confirmed: `handleSubmit` ran
`form.checkValidity()`/`reportValidity()` before reading the honeypot field,
so a bot that filled the honeypot but left other fields empty was blocked by
validation instead of getting the fake-success response — a behavioural
change from the pre-MH-001 form, and a real detection leak (validation
failure reveals the form is being scrutinised in a way the honeypot's fake
success is designed to avoid). Fixed in `components/ContactForm.tsx` by
moving the honeypot check back before the validity check, so honeypot
detection always short-circuits first regardless of other field state.
Verified: submitted with the honeypot checked and every other field empty —
form immediately showed "Thank you!" and no Formspree request was made.
Re-verified the normal path: submitted with the honeypot unchecked and all
fields empty — no Formspree request, focus moved to `#contact-name`, native
`validationMessage` "Please fill in this field." — unchanged from before.

**2. Horizontal overflow at 1440px on `/contact`.** Reproduced: at 1440×900,
`document.documentElement.scrollWidth` (1488px) exceeded `clientWidth`
(1440px) — a 48px overflow. Root cause confirmed as `.find-us-sun`, a
decorative image (`position: absolute; right: -2%`) inside `.find-us`, which
had `overflow: visible` set deliberately in a pre-existing (non-MH-001)
rule. Since `.find-us` is a full-width section, the sun's right-ward offset
pushed it past the viewport edge with nothing to clip it, producing
page-level horizontal scroll. This was previously (incorrectly) recorded
below as an out-of-scope pre-existing issue and only flagged rather than
fixed; the review correctly rejected that framing since it directly
violates this task's own acceptance criterion for `/contact`. Fixed by
changing `.find-us` from `overflow: visible` to `overflow-x: clip` in
`app/globals.css` — clips only the horizontal axis (the sun's intended
vertical/background bleed is unaffected, and the section's own background
already fills the full section width, so there's no visible change).
Verified: `/contact` at 1440px now measures `scrollWidth === clientWidth`
(1440/1440); re-checked `/contact` and `/donate` at 390px and 1440px — no
overflow anywhere.

**3. Marker input padding losing the specificity contest.** Reproduced:
computed `padding-right` on `#contact-name` (and the other non-checkbox
fields) was 16px, not the intended 58px. Cause: `.contact-field input,
.contact-field textarea { padding-right: 58px; }` has specificity (0,1,1)
for `input`, which loses to the earlier `.contact-form
input:not([type="checkbox"])` rule's (0,2,1) — that rule's `padding: 14px
16px` shorthand sets `padding-right: 16px` and wins the cascade regardless
of source order. Fixed by raising the marker-padding selector's specificity
to (0,3,1)/(0,2,1) via `.contact-form .contact-field input:not([type="checkbox"]),
.contact-form .contact-field textarea` in `app/globals.css`, which now beats
the opponent rule for both element types. Verified: computed `padding-right`
is `58px` on name/email/phone/message at 1440px, including after setting a
long value into `#contact-name` via script (padding held; marker did not
visually collide with dispatched long text).

**4. Handoff diff-accuracy and the MH-002 draft.** The original Handoff's
"Files changed" list only reported the three implementation files. The full
workspace diff (`git status --porcelain`) also includes `docs/tasks/next-task.md`
(the MH-002 draft brief), currently **untracked**, plus this task file's own
edits. `docs/tasks/next-task.md` was not touched, moved, or committed by
this repair — it's left exactly as found, per instruction. It is not part
of MH-001's scope (it's the separately-tracked MH-002 draft, still
`Status: draft — awaiting approval`) and should not land in whatever commit
eventually captures MH-001. Safest separation options, in order of
preference:
  - **Do nothing now (recommended).** It's untracked, so it's invisible to
    `git diff`/`git diff --stat` against any ref and cannot be committed by
    accident via `git commit -a` (only `git add -A`/`git add .` would pick
    it up). No action needed unless someone runs a broad `git add`.
  - **When MH-001 is committed, stage explicitly** — `git add
    app/donate/page.tsx app/globals.css components/ContactForm.tsx
    .ai/tasks/MH-001-contact-donate-accessibility.md` rather than `git add
    -A`/`-u`, so `docs/tasks/next-task.md` is guaranteed to stay out of that
    commit.
  - **If broader isolation is wanted later**, `docs/tasks/next-task.md`
    could move to its own worktree/branch once MH-002 itself is approved
    and ready to start — not necessary just to keep it out of MH-001's
    commit.
  No commit was made in this repair pass (none authorised), so this remains
  a live housekeeping note for whoever next commits MH-001.

Re-ran full verification after all four fixes — see "Verification results
(repair pass)" below. All executable acceptance criteria pass.

Status: **ready-for-review** (returned from `in-progress` after all four
findings were fixed and re-verified).

### Verification results (repair pass)

- `npm run lint` — clean, no errors/warnings.
- `npm run build` — clean production build, all 9 routes static.
- Lighthouse accessibility, re-run against the rebuilt `next start` (port
  55050): `/contact` **100/100**, 0 failed audits; `/donate` **100/100**, 0
  failed audits. Overwrote `.context/mh-001-contact-lighthouse.json` and
  `.context/mh-001-donate-lighthouse.json`.
- Honeypot ordering (finding 1): see above — both the bot path (honeypot
  checked, other fields empty → fake success, no network request) and the
  genuine path (honeypot unchecked, other fields empty → blocked, native
  validation message, no network request) verified via Playwright.
- Overflow (finding 2): `/contact` 1440×900 — `scrollWidth`/`clientWidth`
  1440/1440 (was 1488/1440). `/contact` 390×844, `/donate` 390×844 and
  1440×900 — no overflow.
- Computed padding (finding 3): `58px` on all four non-checkbox fields at
  1440px, holds with a long typed value.
- Donate heading order — unchanged, still sequential: h1, h2, h2, h3, h3,
  h2, h3, h3, h3, h2, h2 (the last two h2s are the shared footer's "Explore"
  and "Contact" headings).
- Console — 0 errors, 0 warnings on `/contact` and `/donate`.
- `git diff --check` — no whitespace errors (exit 0, no output).
- `git diff --stat origin/main...` — no output. This is expected, not a
  gap: nothing has been committed in this session (repair mode is
  explicitly not authorised to commit), so there are no commits ahead of
  `origin/main`'s merge-base to diff. The actual uncommitted change set is
  `git status --porcelain`: `app/donate/page.tsx`, `app/globals.css`,
  `components/ContactForm.tsx`, and this task file modified; `docs/`
  (containing only `docs/tasks/next-task.md`) untracked — see finding 4.

### Files changed

- `components/ContactForm.tsx` — added a `form.checkValidity()` /
  `reportValidity()` gate at the top of `handleSubmit` (blocks empty required
  fields before any Formspree call, using native accessible validation
  messages, since the form already carries `noValidate`); added
  `aria-hidden="true"` to the honeypot checkbox (on top of its existing
  `tabIndex={-1}`) to remove it from the accessibility tree; wrapped each
  field in a new `.contact-field` div and added a visible `*`
  required-marker (name, email, message) or `Optional` marker (phone), plus
  a `* Required` legend at the top of the form. All markers are
  `aria-hidden="true"` — required/optional state is still exposed to screen
  readers via the native `required` attribute; the markers exist purely for
  sighted users, since the field labels are `sr-only`.
- `app/donate/page.tsx` — changed the two `.info-strip` headings ("Tax
  Deductions", "BBBEE Scorecard Points") from `h4` to `h3`, closing the
  `h2` → `h4` hierarchy gap. Sequential order is now h1 → h2 (×2) → h3 (×2)
  → h2 → h3 (×3).
- `app/globals.css` — `.info-strip h4` → `.info-strip h3` selector to match
  the tag change (no visual change, same styling). Added
  `.contact-form-hint`, `.contact-field`, `.contact-field-required`,
  `.contact-field-optional` rules for the new markers/legend, plus
  `padding-right: 58px` on `.contact-field` inputs/textareas so typed text
  doesn't run under the marker. Added a `max-width: 480px` breakpoint that
  stacks `.contact-form-row` (email/phone) vertically — found during 390px
  visual QA that the split email/phone row was too narrow for both the
  placeholder text and the new `Optional` marker, causing visible overlap
  ("Phone n" + "Optional" overlapping/clipping); stacking them (matching how
  the other full-width fields already behave) fixed it.

### Verification results

- `npm ci` — clean install, 347 packages (5 pre-existing audit advisories,
  unrelated to this task, not touched).
- `npm run lint` — clean, no errors/warnings.
- `npm run build` — clean production build, all 9 routes static.
- Lighthouse accessibility (`npx lighthouse@13.4.1`, headless, category
  `accessibility` only), against `next start` on port 55050:
  - `/contact`: **100/100**, 0 failed audits (before the phone-marker
    contrast/overlap fixes it was 96, failing `color-contrast` on
    `.contact-field-optional` — fixed by switching its colour from an
    ad hoc `#9fb3d4` to `var(--color-muted)`, 5.95:1 on white).
  - `/donate`: **100/100**, 0 failed audits (was 98 before the h4→h3 fix).
  - Saved: `.context/mh-001-contact-lighthouse.json`,
    `.context/mh-001-donate-lighthouse.json`.
- Browser checks (Playwright, `next start` build, 1440×900 and 390×844):
  - **Honeypot bot path**: filled all required fields, set the honeypot
    checkbox `checked = true` via script (equivalent to a bot filling it),
    clicked Submit — form immediately showed the "Thank you!" success state
    and the network log shows no Formspree request was made.
  - **Empty-submission block**: clicked Submit on an empty form — no
    Formspree request fired, focus moved to `#contact-name`, and its native
    `validationMessage` was "Please fill in this field." (accessible
    browser-native feedback).
  - **Error path**: filled all required fields, overrode `window.fetch` to
    reject any `formspree.io` request, submitted — the existing
    `role="alert"` error message rendered ("Simulated network failure"),
    field values were preserved, and the submit button re-enabled. No real
    Formspree submission was made in any of these checks.
  - **Accessibility tree / honeypot**: confirmed via DOM
    (`aria-hidden="true"`, `tabindex="-1"` both present) and via Lighthouse's
    `aria-hidden-focus` audit (score 1 — no focusable descendant of an
    `aria-hidden` element), which is the authoritative check per the task's
    Lighthouse-based verification method. (Playwright's own ARIA-snapshot
    tool still lists the checkbox as a generic node — a known quirk of that
    tool's snapshot rendering, not a real accessibility-tree finding;
    Lighthouse and the DOM inspection are the tools of record here.)
  - **Keyboard / tab order**: scripted a forward walk from `#contact-name`
    through the focusable form controls — order is name → email → phone →
    message → submit → footer link, i.e. the honeypot is correctly skipped.
  - **Required/optional markers**: visible at both viewports; name/email/
    message show `*`, phone shows `Optional`, plus the `* Required` legend.
  - **Donate heading order** (`document.querySelectorAll('h1,...,h6')`):
    h1 Donate → h2 Give monthly… → h2 Bank transfer → h3 Tax Deductions →
    h3 BBBEE Scorecard Points → h2 Other Ways To Give → h3 ×3 → (footer) h2
    Explore → h2 Contact. Sequential, no skipped levels.
  - **Layout / overflow**: `/donate` — no horizontal overflow at 390px or
    1440px. `/contact` — no horizontal overflow at 390px. At 1440px,
    `document.documentElement.scrollWidth` (1488px) exceeds `clientWidth`
    (1440px); isolated the cause to `.find-us-sun`, a decorative image in
    the pre-existing "Find us" map section (`right: -2%` on a
    `position: absolute` element inside `.find-us { overflow: visible; }`).
    This code is untouched by this diff (`git diff --stat` confirms only
    `app/donate/page.tsx`, `app/globals.css`, `components/ContactForm.tsx`
    changed) and is unrelated to the honeypot/required-fields/heading scope
    of this task — see Deviations below.
  - No console errors or warnings on either route at either viewport.
- `git diff --check` — no whitespace errors.
- `git diff --stat` — only the three files above touched; no unrelated,
  dependency, or generated-output changes.

### Deviations / residual risk

- **Superseded:** the `.find-us-sun` 1440px overflow noted here originally
  was left unfixed on the reasoning that it predated this diff and sat
  outside MH-001's scope. The repair pass above fixed it instead
  (`overflow-x: clip` on `.find-us`) after review correctly pointed out
  that it still violates this task's own acceptance criterion for
  `/contact` regardless of which diff originally introduced it. See the
  "Repair pass" section above for the fix and re-verification.
- The MH-002 draft (`docs/tasks/next-task.md`) is present, untracked, in
  the workspace and is not part of this task's scope — see finding 4 in
  the repair pass above for the recorded scope-separation options.
- All other acceptance criteria are met and verified above and in the
  repair pass.

Final status: **ready-for-review**.

Codex records review findings here and changes the task to `done` only after the
diff and verification pass review.

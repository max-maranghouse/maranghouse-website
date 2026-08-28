# MH-002: Refine verified fundraising copy and content UI

Status: draft — awaiting approval

Base: `5c290d62e44e80a654959efa42a8a1f771196f6f` (`origin/rebuild/marang-v3`)

Dependency: implement only after MH-001 has been reviewed and marked done. Both
tasks touch `app/donate/page.tsx`; this ordering avoids overwriting the approved
accessibility work.

## Outcome

The public site gives prospective supporters clear, evidence-backed reasons to
help Marang House. It retains the confirmed 28+ years, 300+ children, 1000+
volunteers, and Section 18A messages; removes unsupported claims and all
B-BBEE messaging; and makes the changed content easier to scan through
disciplined sentence case, punctuation, and text-to-element alignment. The
completed Canva-derived design remains intact.

## Why this is next

The 2026-08-28 audit correctly identified claims that needed confirmation. The
organisation owner has since confirmed that the 28+ years, 300+ children, and
1000+ volunteers statistics are correct and that Marang House provides
SARS-approved Section 18A certificates. This task applies those decisions while
resolving the remaining unsupported reward, sponsorship, Lightkeeper-count,
quote, B-BBEE, and absolute-promise issues. It does not invent facts for matters
the owner has not confirmed.

Relevant findings:

- `reports/full-audit-2026-08-28.md` — blockers 2–6 and recommended order.
- `reports/content-audit-2026-08-28.md` — all five blockers and the major
  over-promise findings.
- `AGENTS.md` — unresolved impact totals, testimonial/source restrictions,
  BackaBuddy constraint, and source-of-truth rules.
- Owner direction, 2026-08-28 — 28+ years, 300+ children, and 1000+
  volunteers are confirmed; Section 18A certificates are issued and
  SARS-approved.

## Scope

### In

- Update the Home, About, Lightkeepers, and Donate copy listed in the approved
  copy decisions below.
- Replace the unsupported Home CTA `SPONSOR A CHILD TODAY` with `BECOME A
  LIGHTKEEPER` while retaining its `/lightkeepers` destination.
- Remove the Home keyring-reward offer. The existing keyring artwork may remain
  as non-promissory decorative artwork, but must be hidden from the accessibility
  tree (`alt=""`, `aria-hidden="true"`) if it no longer conveys content.
- Retain the confirmed Home statistics: `28+ years`, `300+ children`, and
  `1000+ volunteers`. Keep their three-column visual treatment and use sentence
  case for their labels.
- Remove the unsupported `A Thousand Lightkeepers` donor count. Use
  non-numeric Circle of Light wording instead.
- Remove the unproven Salome biography, direct quotations, quote attribution,
  and `In Her Own Words` framing on About and Lightkeepers. Replace them only
  with non-quoted, role-based copy that does not add personal history or claims
  that need a transcript. Keep the existing section structure and avoid a new
  testimonial feature.
- Replace donation-allocation and delivery guarantees with qualified statements
  that say gifts *help fund* children’s care and the day-to-day running of
  Marang House. This includes the Home Donate card, Donate hero, Lightkeepers
  impact introduction/transport copy, and Lightkeepers capacity copy.
- Retain the Section 18A information, but make it precise and user-centred:
  state that qualifying donations can receive a SARS-approved Section 18A tax
  certificate, with the Contact link available for questions. Do not imply that
  every payment automatically qualifies.
- Remove B-BBEE scorecard points and recognition claims from the Donate page
  and corporate-partnership card. Do not replace them with B-BBEE-exempt status
  or any other B-BBEE statement.
- Apply a targeted copy style pass to the four changed routes: sentence case for
  headings, CTA labels, card labels, and other interface text except proper
  names/acronyms; standard South African/British spelling; no unnecessary em
  dashes; and consistent sentence punctuation in prose. Preserve intentional
  brand names such as Marang House, BackaBuddy, and Section 18A.
- Align content elements with the text they contain. Adjust only the targeted
  route markup/CSS so headings, body copy, icons/artwork, and CTAs form clear
  vertical groups, repeated cards share visual rhythm, and changed shorter or
  longer copy does not leave a visibly unbalanced section on mobile or desktop.
  Reuse `ORGANISATION`, `DONATION`, and existing style tokens rather than adding
  new data sources or dependencies.

### Out

- Publishing a privacy notice (requires organisation-approved POPIA content and
  processor/retention decisions).
- Verifying the 28+ years, 300+ children, 1000+ volunteers, or Section 18A
  confirmations again. They are approved implementation inputs for this task.
  Do not publish document identifiers or copies unless the owner separately
  provides and approves them for publication.
- Verifying the Lightkeeper total, named supporter permissions, Salome source
  material, or keyring fulfilment.
- Changes to the separate `marang-house-landing` project, domains/DNS, Vercel,
  Formspree, bank details, donation URL, dependencies, or analytics.
- A new sponsorship product, donor roster/showcase, testimonials, press page,
  broad visual redesign, or performance/SEO/accessibility work outside the
  focused content-layout regression checks below.

## Approved copy decisions

Use this style system across the changed content: sentence case, direct active
voice, plain language, full stops for complete prose sentences, and commas or
separate sentences instead of em dashes. Do not force the site's display font or
existing warm tone into generic corporate copy. If an implementer believes a
different claim needs a new fact, stop and return it for approval rather than
writing around the missing evidence.

| Location | Replace | With / treatment |
| --- | --- | --- |
| Home Lightkeeper band | Keyring eligibility sentence | “The Marang Circle of Light is a community of monthly donors who help keep home, joy and love within reach for children receiving treatment away from their families.” |
| Home supporter CTA | `SPONSOR A CHILD TODAY` | `Become a Lightkeeper` |
| Home Donate card | “Every rand goes directly…” | “Your gift helps fund children’s care and the day-to-day running of Marang House.” |
| Home stats | `28+ Years`, `300+ Children`, `1000+ Volunteers` | Retain all three confirmed statistics. Normalise only the labels to sentence case: `years`, `children`, and `volunteers`. |
| About introduction | Current historical sentence | Keep the confirmed “more than 300 children” history, in sentence case and without adding further numerical claims. |
| About Salome story | personal history, all direct quotes, `In Her Own Words` | A short non-quoted, role-based section about the care team; no personal biography, quotation marks, or attributed speech |
| About/Lightkeepers taglines | `A Thousand Lightkeepers` | `Lightkeepers` (non-numeric) |
| Lightkeepers impact/transport/capacity | direct-allocation and outcome guarantees | “helps fund…” / “helps keep hospital transport available…” / “helps Marang House plan capacity and care with greater confidence” |
| Lightkeepers quote | Salome blockquote and cite | Non-attributed prose on the value of predictable monthly support |
| Donate hero | “every contribution goes directly…” | “every contribution helps fund children’s care and the day-to-day running of Marang House” |
| Donate tax strip | categorical tax/certificate claim | “Qualifying donations can receive a SARS-approved Section 18A tax certificate. Contact us for more information.” |
| Donate B-BBEE strip/card | all scorecard points and recognition wording | Remove the B-BBEE information strip and related corporate-partnership wording. Do not replace it. |

## Acceptance criteria

- [ ] Home, About, Lightkeepers, and Donate contain none of the following
      unsupported public claims: the keyring reward, child-sponsorship label,
      “A Thousand Lightkeepers”, allocation absolutes, or the specified
      delivery/capacity guarantees.
- [ ] The confirmed `28+ years`, `300+ children`, and `1000+ volunteers` Home
      statistics remain visible, clear, and visually balanced as a three-column
      group at both target viewport sizes.
- [ ] The Section 18A copy says only that qualifying donations can receive a
      SARS-approved certificate.
- [ ] No B-BBEE, scorecard-points, recognition, or exempt-status wording
      remains in rendered source or user-visible metadata.
- [ ] No Salome quotation, quote attribution, `In Her Own Words` framing, or
      unverified biographical detail remains in rendered source.
- [ ] The existing BackaBuddy URL, EFT details, Contact link, organisation
      registration facts, confirmed 7–14 age range, and `Since 1998` founding
      context remain correct and continue to use `lib/site-data.ts` where
      applicable.
- [ ] All changed interface text uses sentence case except proper names and
      acronyms. It uses standard South African/British spelling, clean sentence
      punctuation, and commas or separate sentences instead of unnecessary em
      dashes.
- [ ] All replacement copy is grammatically clear, avoids new factual claims,
      and does not introduce a promise that every donation reaches a particular
      purpose or guarantees an outcome.
- [ ] Home’s renamed CTA still resolves to `/lightkeepers`; external donation
      links retain their URL, new-tab behaviour, and `rel="noopener noreferrer"`.
- [ ] At 390px and 1440px, the changed sections have no horizontal overflow,
      clipping, overlap, or inaccessible decorative-keyring announcement.
      Headings stay visually attached to their supporting text; card icons,
      copy, and CTAs have consistent vertical rhythm; and repeated cards align
      without large unexplained gaps caused by their copy length.
- [ ] No unrelated source, dependency, configuration, content, or generated
      build-output changes are included.

## Implementation notes

- Likely files: `app/page.tsx`, `app/about/page.tsx`,
  `app/lightkeepers/page.tsx`, `app/donate/page.tsx`, and only the minimum
  relevant rules in `app/globals.css`.
- Retain component and section structure where possible to protect the completed
  Canva match. Do not remove a decorative image merely because its reward copy
  is removed unless the layout requires it; make its accessibility treatment
  match its decorative role.
- The content-design direction is a warm, child-centred support journey for
  prospective donors. Its job is clarity, not a new campaign visual system:
  use the established Fredoka/Nunito/Permanent Marker hierarchy and brand
  palette, spend visual change only on making the revised text and actions feel
  deliberately grouped, and remove decorative tension rather than adding new
  flourishes.
- The Section 18A claim is authorised by the owner for this task. A future
  evidence-record task may add document details only with explicit approval.
  Salome content still requires dated source material and sign-off.
- The authoritative implementation baseline is `origin/rebuild/marang-v3` at
  the base commit above, per `AGENTS.md`. The current Conductor workspace branch
  is a merge branch and must not be renamed. Use `origin/main` only for the
  Conductor-requested comparison/reporting context, not as a source to merge or
  rebase into the task.

## Verification

Run from the repository root after MH-001’s reviewed changes are present:

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

Then verify Home, About, Lightkeepers, and Donate in a browser at 390×844 and
1440×900:

- check all changed copy and CTA destinations;
- check visible focus states and keyboard activation for the changed links;
- inspect the accessibility tree to confirm a retained keyring image is
  decorative; and
- check the console, failed requests, horizontal scroll, headline/body/CTA
  grouping, and repeated-card alignment.

Finally, search the edited route sources for the removed phrases and review the
scoped diff:

```bash
grep -RInE "limited-edition keyring|SPONSOR A CHILD|A Thousand Lightkeepers|Every rand goes directly|every contribution goes directly|no appointment is ever missed|there.s no room|In Her Own Words|B-BBEE|scorecard points|recognition" app/page.tsx app/about/page.tsx app/lightkeepers/page.tsx app/donate/page.tsx
git diff --check
git diff --stat origin/main...
```

The search must return no rendered content hits; an updated explanatory source
comment is acceptable only if it does not preserve a public claim. Separately
confirm that the three approved statistics and the precise Section 18A copy
remain present.

## Handoff

The implementer must record:

- the exact files changed and the reason for each;
- the final replacement text when it differs from this approved table;
- lint, build, browser, link, keyboard, accessibility-tree, and visual-check
  results, including the content grouping and repeated-card alignment review;
- the removed-phrase search result and scoped-diff result;
- any deviation, residual evidence gap, or unresolved approval; and
- final status `ready-for-review` only when every criterion passes.

Codex reviews the diff against this task and `AGENTS.md`, then changes the task
status to `done` only after review passes. No commit, push, deploy, domain move,
or change to the emergency landing page is authorised by this task.

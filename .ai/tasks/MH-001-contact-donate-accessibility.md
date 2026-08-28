# MH-001: Restore Contact and Donate accessibility

Status: approved
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

Claude Code must record:

- Files changed and the reason for each change.
- Exact lint, build, Lighthouse, browser, keyboard, honeypot, and error-path
  results.
- Any deviation from this task and any residual risk.
- Final status: `ready-for-review` when all acceptance criteria are satisfied.

Codex records review findings here and changes the task to `done` only after the
diff and verification pass review.

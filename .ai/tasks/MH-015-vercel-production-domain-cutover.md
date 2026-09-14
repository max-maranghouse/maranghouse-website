# MH-015: Make the Next.js site the production Vercel deployment

Status: ready-for-check

Base: `d6ca0974a73e0038287552d32a2764de2d772bcc` (`origin/main`)

## Goal and user-visible outcome

Publish the current `origin/main` Next.js site from Vercel project
`marang-house-website` at `https://www.maranghouse.org`, with
`https://maranghouse.org` permanently redirecting there. Preserve the separate
`marang-house-landing` project and repository as a reusable future stopgap,
but detach the public Marang House domains from it.

After the cutover, merging a reviewed change into `main` is the only normal
production-publish action: the existing Vercel Git integration deploys that
commit to production. Task branches continue to receive previews and must not
be promoted directly with `vercel --prod`.

## Current evidence

- `AGENTS.md` and `MARANG-HOUSE-SITE-CONTEXT.md` §11 establish that
  `maranghouse.org` and `www.maranghouse.org` presently belong to the distinct
  `marang-house-landing` Vercel project. A custom domain cannot be attached to
  both projects simultaneously.
- Live HTTP checks on 2026-09-14 show both public hosts return the static
  stopgap page (including its `script-src 'none'` CSP), while
  `https://marang-house-website.vercel.app/` returns the Next.js application
  and its intended CSP/security headers. The production site code is therefore
  reachable but not domain-bound.
- `origin/main` is at `d6ca0974a73e0038287552d32a2764de2d772bcc`. It contains
  the completed MH-013/MH-014 launch-candidate work. `ORGANISATION.websiteUrl`
  already uses `https://www.maranghouse.org`, so `www` is the intended
  canonical hostname for metadata, sitemap, robots, Open Graph, and JSON-LD.
- This workspace's authenticated Vercel CLI user is `maxwellernst-2864`, whose
  only visible team is `max-ernsts-projects`; it cannot inspect
  `marang-house-team`, either Marang House project, or either domain. The
  implementer must use an authorised `marang-house-team` Vercel dashboard
  session (or a CLI token that has equivalent access).
- Vercel access/DNS configuration are external state. The repository has no
  `.vercel/project.json` link and no source change can move a custom domain.
- The prior release task, `MH-014`, records clean source/build checks but still
  requires an owner review of the exact candidate and Formspree delivery
  confirmation before launch. This task must not claim that gate passed unless
  its evidence is supplied during the cutover.

## Scope

### In

- Verify the target Vercel project's Git integration and its Production Branch
  are the GitHub repository `max-maranghouse/maranghouse-website` and `main`.
- Record the exact preserved landing-project repository and its current
  production deployment URL before changing its domain assignments.
- Move `maranghouse.org` and `www.maranghouse.org` from
  `marang-house-landing` to `marang-house-website`; configure `www` as the
  primary host and the apex as a permanent redirect.
- Verify certificate/DNS status, the production deployment's source commit,
  canonical metadata, primary routes, headers, Contact form delivery evidence,
  and the post-cutover public hosts.
- Update the current deployment section of `AGENTS.md` and this task handoff
  with the final Vercel configuration, timestamp, deployment URL/commit,
  canonical-host result, and future branch-to-production workflow. Do not
  record tokens, credentials, recipient settings, or submitted message text.

### Out

- Deleting, archiving, redeploying, or altering the `marang-house-landing`
  repository/project/content; it remains the future emergency landing site.
- Changing GoDaddy DNS records unless Vercel explicitly reports they no longer
  verify after the project transfer. Do not guess replacement records.
- Reusing GoDaddy WordPress hosting, modifying the source site's visual/content
  design, adding analytics, changing Formspree recipients, or changing the
  BackaBuddy flow.
- Committing source changes, pushing, opening/merging a PR, or deploying a
  branch directly to production as part of the cutover. This task switches the
  domain to the existing production deployment only.

## Dependencies, ownership, and implementation order

An authorised Marang House Vercel administrator owns the dashboard/domain
actions and the final GO decision. The implementation lead owns the immutable
baseline, source/preview verification, public smoke test, and documentation
update. Do not make any Vercel mutation until all step-1 gates are evidenced.

1. **Freeze and identify the launch deployment.**
   In the `marang-house-website` Vercel dashboard, confirm the latest
   Production deployment is successful, was built from
   `max-maranghouse/maranghouse-website`, and is sourced from `main` at the
   intended launch commit (at least `d6ca097`; record the actual SHA shown).
   Confirm Project Settings → Git uses `main` as Production Branch and that
   automatic Git deployments are enabled. Inspect the corresponding preview
   at desktop and mobile, then complete the outstanding MH-014 owner review
   and Formspree dashboard/inbox launch-test evidence if it has not already
   been completed. Do not use `maranghouse.org` as proof at this stage.
   
   Done when the exact deployment, source commit, successful build, branch
   rule, preview URL, and required release approval are recorded; otherwise
   stop before domain transfer.

2. **Preserve the stopgap and capture rollback facts.**
   In `marang-house-landing`, record its Git repository, latest successful
   production deployment URL, and the two custom-domain assignments. Do not
   delete anything. Confirm that its Vercel-generated deployment URL loads;
   this remains the rollback destination even though it will no longer own the
   public domain. Capture the target project's current `*.vercel.app` URL as a
   second recovery reference.
   
   Done when an administrator can restore the public site to the known landing
   project without rebuilding or searching for a lost deployment.

3. **Transfer the two custom-domain assignments in Vercel.**
   Use the dashboard under team `marang-house-team`. Remove/transfer
   `maranghouse.org` and `www.maranghouse.org` from `marang-house-landing`
   only as required by Vercel's domain-transfer UI, then add both to
   `marang-house-website`. Follow the dashboard's verification instructions
   exactly. Existing DNS is Vercel-served and should normally remain valid;
   change GoDaddy only if the target project reports a concrete verification
   failure and specifies the required record. If Vercel supports an atomic
   transfer confirmation, use it; otherwise make the detach/attach interval as
   short as possible and do not leave either hostname unassigned.
   
   Done when both names are attached to the target project and Vercel reports
   them as valid/ready with HTTPS certificates provisioned.

4. **Set canonical-host behaviour.**
   In target Project Settings → Domains, make `www.maranghouse.org` the
   Primary Domain to match `lib/site-data.ts`, and configure the apex alias to
   permanently redirect to it. Do not add a source-level redirect unless the
   Vercel domain configuration demonstrably cannot provide one. Confirm Vercel
   did not create a redirect in the opposite direction.
   
   Done when `https://www.maranghouse.org/` returns the Next.js app with 200,
   and `https://maranghouse.org/` returns one permanent redirect to the `www`
   URL (then 200), without a redirect loop or `vercel.app` canonical URL.

5. **Run public post-cutover acceptance.**
   From an unauthenticated browser/curl context, test both hosts and the
   canonical host's `/`, `/about`, `/lightkeepers`, `/donate`, `/contact`,
   `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`,
   `/robots.txt`, and `/sitemap.xml`. Confirm:
   - the response is the Next.js site rather than the temporary static markup;
   - TLS is valid and the final URL/canonical/Open Graph/sitemap all use
     `https://www.maranghouse.org`;
   - CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and
     Permissions-Policy remain present;
   - `/.env` and `/.git/config` do not expose data;
   - navigation, donation destinations, and Contact validation work; and
   - the successful Formspree production test is evidenced only by the
     authorised owner, never by committing private test content.

   Observe Vercel's deployment/domain status for 24–72 hours and record any
   certificate, error, delivery, or redirect anomaly. If the public site fails
   materially, move both domain aliases back to the retained
   `marang-house-landing` deployment, then investigate from a preview; do not
   patch production directly.

6. **Document the stable publishing model.**
   Update `AGENTS.md` only after successful cutover: replace its current
   stopgap-live warning with the verified project/domain/primary-host facts,
   retain the GoDaddy incident warning and landing-project preservation note,
   and add the following operational rule: work branches get Vercel previews;
   reviewed PRs merge into `main`; Vercel's Git integration deploys `main` to
   production; verify the production deployment rather than calling
   `vercel --prod`. Include the existing Conductor `GH_TOKEN`-safe push/merge
   commands when GitHub actions are needed. Do not alter the historical
   documentation's account-security history.
   
   Done when a future agent can understand where the domain points, how to
   publish safely, and where the preserved landing fallback lives without
   assuming a merge also changes DNS.

## Observable success criteria

- `marang-house-website` is connected to the correct GitHub repository, has
  `main` as its Vercel Production Branch, and its latest successful Production
  deployment is traceable to the recorded `origin/main` commit.
- `marang-house-landing` and its repository/deployment remain intact and
  reachable by their recorded Vercel deployment URL, but neither public Marang
  House domain remains attached to it.
- Both public hostnames are attached to `marang-house-website`, show valid
  Vercel domain/certificate status, and produce exactly one canonical public
  hostname: `www` is 200 and apex permanently redirects to it.
- The public host serves the Next.js app (not the static temporary HTML), all
  listed routes return their expected public result, canonical/OG/robots/
  sitemap output is `www`-based, and no security header regresses.
- The exact launch revision has the MH-014 owner preview approval and Formspree
  recipient/test-delivery confirmation recorded, or cutover is explicitly
  stopped before it begins.
- `AGENTS.md` and the task Handoff accurately reflect the post-cutover state
  and state that future production changes arrive by merging reviewed work into
  `main`, not by moving domains or direct production CLI deploys.

## Required verification

Before changing domains:

```sh
git fetch origin
git rev-parse origin/main
npm ci
npm run lint
npm run build
git diff --check
```

After cutover (using the real public hosts, following redirects):

```sh
curl -sSIL https://maranghouse.org/
curl -sSIL https://www.maranghouse.org/
curl -sS https://www.maranghouse.org/robots.txt
curl -sS https://www.maranghouse.org/sitemap.xml
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' https://www.maranghouse.org/.env
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' https://www.maranghouse.org/.git/config
```

Use a clean-browser session for the route, responsive, navigation, and Contact
validation smoke test. Use Vercel dashboard evidence for project ownership,
production-branch configuration, source commit, domain status, and certificate
state; the current CLI identity does not have access to that team.

## One final manual checkpoint

Immediately before step 3, the authorised organisation/Vercel owner confirms
that the exact target deployment is the approved launch candidate, MH-014's
Formspree delivery gate is satisfied, the retained landing deployment has been
recorded, and they want the two public domains moved now. This is the external
production action the checkpoint authorises.

## Risks and blockers

- **Current blocker:** the available Vercel CLI account has no access to
  `marang-house-team`; an administrator session or suitable authorised token is
  necessary to inspect or transfer the domains.
- The Vercel UI may require a particular order for a domain transfer. Follow
  its specific prompt rather than treating the old DNS values as universal.
- The domain move is potentially briefly user-visible. Retain the landing
  deployment facts and make rollback a domain reassignment, never deletion.
- DNS, certificates, Formspree recipient setup/inbox delivery, and a final
  content approval are external facts. Missing evidence is a launch blocker,
  not a reason to infer success from source code or the `vercel.app` URL.
- The unverified stats and other open content decisions listed in `AGENTS.md`
  remain outside this infrastructure cutover; the owner must decide whether
  they are acceptable before the final GO checkpoint.

## Handoff

Architected 2026-09-14 from `origin/main`
`d6ca0974a73e0038287552d32a2764de2d772bcc`. No application code, Vercel
project/domain/DNS setting, deployment, commit, push, PR, or production
infrastructure changed in architect mode. The only change is this executable
cutover task.

At implementation start, mark this task `in-progress`. Append the Vercel
dashboard project/branch/deployment evidence, landing rollback URL, domain and
certificate statuses, every public smoke-test outcome, final documentation
files changed, and the 24–72 hour monitoring owner. Mark it `ready-for-check`
only after every observable criterion is evidenced. Do not mark it complete
when the Vercel-team access or final owner checkpoint is absent.

### Implementation evidence — 2026-09-15 (blocked before domain transfer)

- Baseline confirmed after `git fetch origin`: `origin/main` remains
  `d6ca0974a73e0038287552d32a2764de2d772bcc`, matching this task's fixed
  base. `npm ci`, `npm run lint`, `npm run build`, and `git diff --check`
  passed. The build statically generated the expected 12 routes.
- The locally available Vercel CLI is authenticated as `maxwellernst-2864`.
  `vercel teams ls` shows only `max-ernsts-projects`; it cannot inspect
  `marang-house-team`, either Marang House project, their Git configuration,
  deployment source SHA, domain assignments, certificates, or landing
  rollback deployment. No authorised browser/dashboard surface is available
  in this session either.
- Safe public checks confirm the cutover has **not** happened: both
  `https://maranghouse.org/` and `https://www.maranghouse.org/` return 200
  from the static stopgap page (`script-src 'none'` CSP). The target recovery
  URL `https://marang-house-website.vercel.app/` returns the Next.js app with
  its intended CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, and Permissions-Policy headers.
- On the target `vercel.app` URL, `/`, `/about`, `/lightkeepers`, `/donate`,
  `/contact`, `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`,
  `/robots.txt`, and `/sitemap.xml` each return 200. `robots.txt` references
  `https://www.maranghouse.org/sitemap.xml`; sitemap URLs are www-canonical.
  `/.env` and `/.git/config` both return 404.
- No Vercel, DNS, deployment, source, `AGENTS.md`, or other production-facing
  change was made. The task remains `in-progress`, blocked pending an
  authorised `marang-house-team` administrator session/token, the exact
  MH-014 owner approval and Formspree-delivery evidence, the landing rollback
  deployment facts, and the final owner GO checkpoint immediately before
  moving the two domains.

### Cutover completion evidence — 2026-09-15

- The authorised `marang-house-team` owner confirmed the MH-014/Formspree
  delivery gate and gave the final GO in the cutover session. Vercel dashboard
  evidence shows target Production deployment `d6ca097` from `main` as Ready;
  its deployment URL is
  `marang-house-website-ghboswu9i-marang-house-team.vercel.app` and its
  generated project URL is `marang-house-website.vercel.app`.
- The retained landing rollback deployment was confirmed Ready and loading at
  `marang-house-landing-alhbhg9i0-marang-house-team.vercel.app`. It remains
  intact; its two public Marang House domain assignments were removed.
- Both public domains are now valid on `marang-house-website`: the Vercel
  domain view shows `www.maranghouse.org` connected to Production and
  `maranghouse.org` explicitly configured as a 308 redirect to
  `www.maranghouse.org`.
- Public acceptance passed: `www` returns 200 for `/`, `/about`,
  `/lightkeepers`, `/donate`, `/contact`, `/privacy-policy`,
  `/terms-and-conditions`, `/cookie-policy`, `/robots.txt`, and
  `/sitemap.xml`; apex `/` and `/donate` return one 308 redirect to their
  respective `www` URLs then 200. Robots, sitemap, canonical, and Open Graph
  output are `https://www.maranghouse.org`-based. CSP, HSTS,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and
  Permissions-Policy are present. `/.env` and `/.git/config` return 404.
- `AGENTS.md` now records the live deployment, preserved fallback, and safe
  Git-to-production workflow. No source, Vercel CLI deployment, commit,
  push, PR, or GoDaddy DNS change was made during implementation.
- Monitoring owner: Maxwell. Check the Vercel deployment/domain status and
  Formspree delivery for certificate, redirect, error, or delivery anomalies
  over the next 24–72 hours. Roll back a material public failure by reassigning
  both domain aliases to the retained landing deployment; do not patch
  production directly.

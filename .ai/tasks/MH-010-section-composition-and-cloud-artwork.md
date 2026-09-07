# MH-010: Section composition and illustrated cloud artwork

Status: ready-for-check
Base: `46b7f7d34473f443f2e7f1b8a4258932a4cf299a` (`origin/main`)

## Outcome

Bring the About children section, Home supporter/involvement sections, Contact
hero, and Lightkeepers hero into a more consistent visual composition. Replace
the remaining photographic cloud decorations with the four supplied illustrated
Cloudinary assets, preserving gentle parallax and keeping decoration clear of
copy and controls.

## Evidence and constraints

- MH-009 is already implemented in the working tree and is the immediate visual
  baseline; its unrelated edits must remain intact.
- Relevant markup is in `app/page.tsx`, `app/about/page.tsx`,
  `app/contact/page.tsx`, and `app/lightkeepers/page.tsx`; shared styling is in
  `app/globals.css`.
- Use the existing `Parallax` component for decorative clouds and preserve its
  reduced-motion/static fallback. Use `cld()` with versioned Cloudinary paths.
- Do not change organisation facts, copy, routes, forms, dependencies,
  donation behaviour, or production infrastructure.

## Implementation

1. Recompose About's “The Children We Serve” as a balanced, conventional
   rounded photo/text section, removing the organic blob frame. Done when the
   full group reads cleanly beside the long-form copy at desktop and stacks
   without overlap on mobile.
2. Move the Contact hero artwork lower so the tallest child's head is visible,
   with a mobile-specific focal point if needed.
3. Replace all remaining `MH-real-cloud.png` uses with the supplied illustrated
   long/tall/small/round clouds. Use a long+tall parallax pair in the
   Lightkeepers hero and restrained pairs in suitable About/Home edge space;
   no cloud may overlap text or controls.
4. Restyle Home's supporter section without the blue field or conic beam while
   retaining layered gradients. Add a pointer-only glow behind each supporter
   portrait/monogram on hover, with larger portrait circles.
5. Increase the three involvement icons while keeping them immediately above
   Volunteer, Lightkeeper, and Donate and preserving responsive card layout.
6. Move the About Salome sparkle GIF from bottom-left to top-left, with enough
   section padding/positioning to stay clear of the heading and copy.
7. Re-align the Lightkeepers hero title/subtext, enlarge the subtext, and add a
   rounded tile behind the copy. It must stay within the artwork's blue area and
   clear the pin/cloud/lighthouse effects at desktop and mobile widths.

Dependencies/dependants: steps 1–3 establish decorative placement before the
hero/supporter responsive tuning in steps 4–7. All changes converge in
`app/globals.css`, so edits are sequential.

## Acceptance criteria

- About children photo uses a regular rounded frame and the photo/copy feel
  balanced at 1440px and 390px.
- Contact hero visibly preserves the tallest child's head at desktop/mobile.
- No `MH-real-cloud.png` reference remains; all four supplied cloud assets are
  used, the Lightkeepers hero contains the long+tall pair with parallax, and no
  cloud overlaps readable content.
- Home supporter section has no blue/conic background, retains warm layered
  gradients, and supporter avatars receive an accessible pointer-hover glow.
- Involvement icons are materially larger and remain above their titles.
- Salome's sparkle is top-left and clear of content.
- Lightkeepers hero copy is aligned on a rounded tile; its subtext is materially
  larger and the composition has no overlap/overflow at 1440px, 768px, 390px,
  or 320px.
- `npm run lint`, `npm run build`, and `git diff --check` pass. Browser checks
  of `/`, `/about`, `/contact`, and `/lightkeepers` show no console errors,
  failed supplied-cloud requests, or horizontal overflow at 1440px and 390px.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Production browser pass at 1440px and 390px, plus Lightkeepers at 768px and
  320px; inspect cloud/text separation, hero crops, hover state, console/network,
  and horizontal overflow.

## Assumptions and risks

- “Keep the gradients” on the supporter section means retain layered warm/radial
  depth while removing the blue base and beam layer, not make it flat white.
- “Round tile” means a pill/oval navy surface behind the Lightkeepers copy,
  chosen because a literal circle would constrain the sentence excessively on
  small screens.
- Exact focal offsets are visual and will be tuned in the production build.

## Handoff

Implemented in `app/about/page.tsx`, `app/contact/page.tsx`,
`app/lightkeepers/page.tsx`, `app/page.tsx`, and `app/globals.css`, preserving
the existing MH-009 working-tree changes.

- About children now uses a standard 24px rounded, white-edged landscape frame
  above a balanced two-column editorial text layout; mobile stacks to one
  column with a 4:3 frame. The small+round illustrated clouds occupy a separate
  top rail.
- Contact uses a top-aligned image plus a contact-specific parallax overscan
  biased below the frame and gentler motion, keeping the tallest child's full
  head visible.
- All `MH-real-cloud.png` references are gone. Lightkeepers uses the supplied
  long+tall parallax pair above its banner; Home supporters uses a restrained
  long+small pair; About uses small+round. All four supplied assets returned
  HTTP 200 `image/png` and use their actual source aspect ratios.
- Home supporters now sits on layered warm cream/yellow/orange gradients with
  no blue base or conic beam. Avatars grew from 96px to 126px and gain a
  pointer-only radial glow on hover. Text colours were retuned to deep navy.
- Involvement artwork grew from 110px to a responsive 150–178px desktop / 160px
  stacked size and remains immediately above each card title.
- Salome's sparkle moved from bottom-left to top-left; mobile top padding keeps
  it clear of the eyebrow, heading, and copy.
- Lightkeepers hero has a dedicated illustrated-cloud rail and a centred oval
  navy copy tile. Subtext is larger (up to 1.16rem), white for contrast, and
  clears the pin, lighthouse effects, clouds, and artwork curves at all checked
  widths.

Verification passed:

- `npm run lint`
- `npm run build` (all 9 static routes generated)
- `git diff --check`
- Production Playwright pass on `/`, `/about`, `/contact`, and `/lightkeepers`
  at 1440px and 390px, plus Lightkeepers at 768px and 320px: zero console
  errors, failed requests, or horizontal overflow. Supporter hover pseudo-glow
  computed opacity reached `1`.

Screenshots are in `.context/MH-010/`. No dependencies, commits, pushes,
deployments, or production configuration changed.

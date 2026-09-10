import Link from "next/link";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import LegalPage from "@/components/legal/LegalPage";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal-data";
import { ORGANISATION } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cookie Notice",
  description:
    "What Necessary and Analytics cookies maranghouse.org uses, how consent is gated, and how to change your choice at any time.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Notice"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro={
        <p>
          This notice explains the categories of cookies and similar browser storage that{" "}
          <strong>maranghouse.org</strong> uses, and how to change your choice at any time.
        </p>
      }
    >
      <h2>Necessary</h2>
      <p>
        This category covers the storage needed for the site to run. Currently, the only
        Necessary storage is a record of your cookie-preference choice, saved in your
        browser&apos;s local storage (not a tracking cookie) so we don&apos;t ask you again on
        every page. Necessary storage cannot be switched off, because the site cannot function
        without it.
      </p>

      <h2>Analytics</h2>
      <p>
        This category covers <strong>Google Analytics (GA4)</strong> and{" "}
        <strong>PostHog</strong> (which also provides session replay and heatmaps), which help
        us understand how visitors use the site. Neither is active on this site yet: their
        scripts, cookies, and any network requests will only load after you actively consent
        to Analytics cookies, using the banner or the &ldquo;Cookie preferences&rdquo; control
        in the footer. When enabled, PostHog will be configured to mask the content of form
        and input fields in any session recording.
      </p>

      <h2>Third-party storage outside our control</h2>
      <p>
        Some parts of this site link to or embed services we don&apos;t control, and each sets
        its own cookies under its own policy, not this one:
      </p>
      <ul>
        <li>
          The <strong>Google Maps</strong> embed on our Contact page may set cookies from
          Google when it loads.
        </li>
        <li>
          Following a <strong>BackaBuddy</strong> donation link takes you to an external site,
          where BackaBuddy&apos;s own cookies and privacy policy apply.
        </li>
      </ul>
      <p>
        {ORGANISATION.name} does not control, and this notice does not cover, what Google or
        BackaBuddy do with their own cookies. Refer to their respective privacy policies for
        that information.
      </p>

      <h2>Changing your choice</h2>
      <p>
        You can accept or decline Analytics cookies, or change a previous choice, at any time
        using this button:
      </p>
      <p className="legal-article__cookie-control">
        <CookiePreferencesButton />
      </p>
      <p>
        Your choice is remembered for up to 12 months, after which we&apos;ll ask again. See
        our <Link href="/privacy-policy">Privacy &amp; POPIA Notice</Link> for how any
        information collected is used.
      </p>
    </LegalPage>
  );
}

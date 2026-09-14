import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { LEGAL_EFFECTIVE_DATE, REGISTERED_OFFICE_ADDRESS } from "@/lib/legal-data";
import { DONATION, ORGANISATION } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing use of maranghouse.org, including third-party services, BackaBuddy donations, and the governing law that applies.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro={
        <p>
          These terms govern your use of <strong>maranghouse.org</strong>, the website of{" "}
          {ORGANISATION.name} NPC. By using this site, you agree to them.
        </p>
      }
    >
      <h2>Using this website</h2>
      <p>
        You may browse this site and use its Contact form for its intended purpose — learning
        about {ORGANISATION.name}, getting in touch, and giving. You agree not to misuse the
        site, attempt to disrupt it, or submit false or malicious information through its forms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, photographs, and design on this site belong to {ORGANISATION.name} or are
        used under licence. You may not reproduce or reuse them for commercial purposes
        without our written permission.
      </p>

      <h2>Third-party services</h2>
      <p>
        This site relies on third-party services to operate: <strong>Formspree</strong> to
        deliver form submissions, <strong>Cloudinary</strong> to serve images, and a{" "}
        <strong>Google Maps</strong> embed on our Contact page. Each operates under its own
        terms, which are independent of these terms.
      </p>

      <h2>Donations via BackaBuddy</h2>
      <p>
        Online donations are processed by <strong>BackaBuddy</strong>, an independent
        third-party donation platform, not by {ORGANISATION.name} directly. Following a
        donation link on this site (for example, {DONATION.primary.label}) takes you to
        BackaBuddy, where BackaBuddy&apos;s own terms, refund process, and donation receipts
        apply. {ORGANISATION.name}{" "}
        is not responsible for BackaBuddy&apos;s platform, payment processing, or receipt
        issuance.
      </p>

      <h2>Availability and disclaimer</h2>
      <p>
        We aim to keep this site available and accurate, but we make no guarantee that it will
        always be uninterrupted, error-free, or fully up to date. The site is provided
        &ldquo;as is&rdquo;, and we do not accept liability for loss arising from your use of
        it, to the extent permitted by law.
      </p>

      <h2>Governing law and jurisdiction</h2>
      <p>
        These terms are governed by the laws of South Africa. Any dispute arising from your
        use of this site is subject to the exclusive jurisdiction of the Gauteng Division of
        the High Court of South Africa.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The effective date at the top of this
        page reflects the most recent update.
      </p>

      <h2>Notices and contact</h2>
      <p>
        Legal notices relating to this site should be sent to our registered office, or by
        email to <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>. For privacy
        matters, see our <Link href="/privacy-policy">Privacy &amp; POPIA Notice</Link>.
      </p>
      <address>
        {ORGANISATION.name} NPC
        <br />
        {REGISTERED_OFFICE_ADDRESS}
      </address>
    </LegalPage>
  );
}

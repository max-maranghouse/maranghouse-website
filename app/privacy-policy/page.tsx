import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { INFO_REGULATOR_URL, LEGAL_EFFECTIVE_DATE } from "@/lib/legal-data";
import { ORGANISATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy & POPIA Notice",
  description:
    "How Marang House NPC collects, uses, and protects personal information submitted through maranghouse.org, in line with South Africa's POPIA.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy & POPIA Notice"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro={
        <p>
          This notice explains how {ORGANISATION.name} NPC collects, uses, and protects
          personal information when you visit <strong>maranghouse.org</strong> or use its
          Contact and newsletter-interest forms. It is written to comply with South
          Africa&apos;s Protection of Personal Information Act (POPIA).
        </p>
      }
    >
      <h2>Who is responsible for your information</h2>
      <p>
        {ORGANISATION.name} NPC (registration {ORGANISATION.registrations.npc}) is the
        responsible party for the personal information described in this notice. We have not
        yet appointed a named Information Officer; until the board makes that appointment,
        all privacy requests are handled at the contact details below.
      </p>

      <h2>Information we collect</h2>
      <p>When you use this website, we may collect:</p>
      <ul>
        <li>
          <strong>Contact form details</strong> — your name, email address, phone number (if
          given), and the content of your message, submitted through our Contact page.
        </li>
        <li>
          <strong>Newsletter interest details</strong> — your name and email address, if you
          ask to be kept informed about Marang House news.
        </li>
        <li>
          <strong>Cookie-preference choice</strong> — whether you&apos;ve accepted or declined
          analytics cookies, stored in your browser. See our{" "}
          <Link href="/cookie-policy">Cookie Notice</Link>.
        </li>
      </ul>
      <p>
        We do not collect payment details, banking information, or medical records of the
        children in our care through this website.
      </p>

      <h2>Why we process it, and on what basis</h2>
      <p>
        We process Contact and newsletter-interest submissions with your consent, given when
        you submit the relevant form, for the purpose you submitted it: to respond to your
        enquiry or to send you the updates you asked for. Where enabled, analytics cookies are
        also processed only with your separate, specific consent — see below.
      </p>

      <h2>How your form submissions are handled</h2>
      <p>
        Our Contact and newsletter-interest forms are processed through{" "}
        <strong>Formspree</strong>, a third-party form-delivery service, which receives and
        forwards your submission to us by email. Newsletter-interest submissions are also
        entered into <strong>Brevo</strong>, an email-marketing platform we use to send
        updates, which processes and stores that data on servers located in the{" "}
        <strong>European Union</strong>. By submitting the newsletter-interest form, you
        consent to this cross-border transfer, which is necessary to provide the service you
        requested.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This site does not load any analytics or tracking scripts by default. If we enable
        Google Analytics (GA4) and/or PostHog in future, they will only run after you actively
        consent to Analytics cookies through the cookie banner or the footer&apos;s
        &ldquo;Cookie preferences&rdquo; control, and PostHog will be configured to mask input
        field content. Full detail is in our <Link href="/cookie-policy">Cookie Notice</Link>.
      </p>

      <h2>Other service providers we use</h2>
      <ul>
        <li>
          <strong>Cloudinary</strong> delivers the images on this site. Loading a page may
          request images from Cloudinary&apos;s servers.
        </li>
        <li>
          <strong>Google Maps</strong> is embedded on our Contact page to show our location.
          Google may set its own cookies when the map loads, under Google&apos;s own privacy
          policy.
        </li>
        <li>
          <strong>BackaBuddy</strong> is an independent, external donation platform we link to
          for online giving. When you follow a donation link, you leave this site and BackaBuddy
          handles your information under its own privacy policy and terms.
        </li>
      </ul>

      <h2>How long we keep information</h2>
      <p>
        We keep Contact and newsletter-interest submissions only for as long as needed to
        respond to you or to continue sending the updates you asked for, and we delete
        information on request. We do not have a fixed retention schedule beyond this.
      </p>

      <h2>Keeping information secure</h2>
      <p>
        We take reasonable technical and organisational measures to protect the personal
        information we hold, and we rely on our service providers&apos; own security measures
        for the information they process on our behalf.
      </p>

      <h2>Your rights under POPIA</h2>
      <p>
        You have the right to ask us what personal information we hold about you, to request
        correction or deletion of it, to object to our processing of it, and to withdraw
        consent at any time (which does not affect processing already carried out). To
        exercise any of these rights, contact us at{" "}
        <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>.
      </p>
      <p>
        If you believe we have not handled your information properly, you may lodge a
        complaint with South Africa&apos;s Information Regulator:{" "}
        <a href={INFO_REGULATOR_URL} target="_blank" rel="noopener noreferrer">
          {INFO_REGULATOR_URL}
        </a>
        .
      </p>

      <h2>Access to information (PAIA)</h2>
      <p>
        {ORGANISATION.name} does not currently have a published PAIA manual. Until one is in
        place, requests for access to information should be sent to{" "}
        <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>, and we will respond
        as required by the Promotion of Access to Information Act.
      </p>

      <h2>Changes to this notice</h2>
      <p>
        We may update this notice from time to time. The effective date at the top of this
        page reflects the most recent update.
      </p>

      <h2>Contact us</h2>
      <address>
        {ORGANISATION.name} NPC
        <br />
        <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>
        <br />
        <a href={ORGANISATION.phone.href}>{ORGANISATION.phone.display}</a>
      </address>
    </LegalPage>
  );
}

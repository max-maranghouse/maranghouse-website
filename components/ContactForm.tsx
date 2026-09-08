"use client";

import { useState, type FormEvent } from "react";
import { createClient, isSubmissionError } from "@formspree/core";

type Status = "idle" | "submitting" | "success" | "error";

// Formspree form ID from https://formspree.io/f/xjgnonlz. Using
// @formspree/core directly (not @formspree/react) — the React package
// unconditionally bundles the Stripe SDK for its payment-field support,
// which this form doesn't need; @formspree/core has no such dependency
// and implements the same submission/error-parsing contract.
const FORMSPREE_FORM_ID = "xjgnonlz";
const formspreeClient = createClient();

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real users never fill this hidden field; bots usually do.
    // Checked before validity so a bot that fills the honeypot but leaves
    // other fields empty still gets the fake-success response instead of
    // being blocked by validation and revealing that it was detected.
    if (formData.get("botcheck")) {
      setStatus("success");
      form.reset();
      return;
    }
    formData.delete("botcheck");

    // The form carries noValidate so we control the submit flow, but native
    // constraint validation (required/type=email) still works on demand:
    // reportValidity() blocks submission and shows the browser's built-in,
    // accessible validation message on the first invalid field.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const result = await formspreeClient.submitForm(FORMSPREE_FORM_ID, formData);

    if (isSubmissionError(result)) {
      setStatus("error");
      const message = result.getFormErrors()[0]?.message;
      setErrorMessage(message || "Something went wrong. Please try again.");
    } else {
      setStatus("success");
      form.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form" role="status">
        <h2 style={{ color: "var(--blue)", marginBottom: "10px" }}>Thank you!</h2>
        <p style={{ color: "var(--blue)", fontWeight: 700 }}>
          Your message has been sent. We&rsquo;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: aria-hidden removes it from the accessibility tree
          entirely (it's decorative-to-bots, not a real field a screen
          reader user should ever encounter), on top of the existing
          tabIndex={-1} that already kept it out of the tab order. */}
      <input
        type="checkbox"
        name="botcheck"
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <p className="contact-form-hint">
        <span aria-hidden="true">*</span> Required
      </p>

      <div className="contact-field">
        <label htmlFor="contact-name" className="sr-only">
          Name and surname
        </label>
        <input id="contact-name" type="text" name="name" placeholder="Name and Surname" required autoComplete="name" />
        <span className="contact-field-required" aria-hidden="true">*</span>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-reason" className="sr-only">
          Reason for contact
        </label>
        <select id="contact-reason" name="reason" required defaultValue="">
          <option value="" disabled>
            Reason for contact
          </option>
          <option value="General Enquiry">General Enquiry</option>
          <option value="Volunteering">Volunteering</option>
          <option value="Donation">Donation</option>
          <option value="Tax Certificate (Section 18A)">Tax Certificate (Section 18A)</option>
          <option value="Sponsor a Child">Sponsor a Child</option>
          <option value="Media / Press">Media / Press</option>
          <option value="Other">Other</option>
        </select>
        <span className="contact-field-required" aria-hidden="true">*</span>
      </div>

      <div className="contact-form-row">
        <div className="contact-field" style={{ flex: 1 }}>
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input id="contact-email" type="email" name="email" placeholder="Email address" required autoComplete="email" />
          <span className="contact-field-required" aria-hidden="true">*</span>
        </div>
        <div className="contact-field" style={{ flex: 1 }}>
          <label htmlFor="contact-phone" className="sr-only">
            Phone number
          </label>
          <input id="contact-phone" type="tel" name="phone" placeholder="Phone number" autoComplete="tel" />
          <span className="contact-field-optional" aria-hidden="true">Optional</span>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea id="contact-message" name="message" placeholder="Hi..." required />
        <span className="contact-field-required" aria-hidden="true">*</span>
      </div>

      {status === "error" && (
        <p role="alert" style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.88rem" }}>
          {errorMessage}
        </p>
      )}

      <button className="contact-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "SENDING…" : "SUBMIT"} <span aria-hidden="true">➤</span>
      </button>
    </form>
  );
}

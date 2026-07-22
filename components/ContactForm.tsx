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
    if (formData.get("botcheck")) {
      setStatus("success");
      form.reset();
      return;
    }
    formData.delete("botcheck");

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
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" />

      <label htmlFor="contact-name" className="sr-only">
        Name and surname
      </label>
      <input id="contact-name" type="text" name="name" placeholder="Name and Surname" required autoComplete="name" />

      <div className="contact-form-row">
        <div style={{ flex: 1 }}>
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input id="contact-email" type="email" name="email" placeholder="Email address" required autoComplete="email" />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="contact-phone" className="sr-only">
            Phone number
          </label>
          <input id="contact-phone" type="tel" name="phone" placeholder="Phone number" autoComplete="tel" />
        </div>
      </div>

      <label htmlFor="contact-message" className="sr-only">
        Message
      </label>
      <textarea id="contact-message" name="message" placeholder="Hi..." required />

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

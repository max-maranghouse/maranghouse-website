"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        "This form isn't configured yet — a Web3Forms access key is missing. Contact the site administrator."
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real users never fill this hidden field; bots usually do.
    if (formData.get("botcheck")) {
      setStatus("success");
      form.reset();
      return;
    }

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New message from marang house website");
    formData.append("from_name", "Marang House website");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
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

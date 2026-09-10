"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient, isSubmissionError } from "@formspree/core";

const formspreeClient = createClient();
const FORMSPREE_FORM_ID = "xjgnonlz";

export default function NewsletterInterestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    if (data.get("botcheck")) { setStatus("sent"); form.reset(); return; }
    data.delete("botcheck"); if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("sending"); setError(""); const result = await formspreeClient.submitForm(FORMSPREE_FORM_ID, data);
    if (isSubmissionError(result)) { setStatus("error"); setError(result.getFormErrors()[0]?.message || "We could not record your interest. Please try again."); }
    else { setStatus("sent"); form.reset(); }
  }
  return <section id="newsletter-interest" className="newsletter-interest" aria-labelledby="newsletter-interest-heading">
    <div><p>STAY CONNECTED</p><h2 id="newsletter-interest-heading">Subscribe to our newsletter</h2><span>We&rsquo;ll record your interest until Brevo is connected.</span></div>
    {status === "sent" ? <p role="status" className="newsletter-interest__status">Thank you — your interest has been recorded.</p> : <form onSubmit={submit} noValidate>
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="source" value="website-newsletter-interest" />
      <label htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" required />
      <label className="newsletter-interest__consent"><input name="consent" type="checkbox" value="yes" required /> I consent to Marang House recording my newsletter interest.</label>
      <p className="newsletter-interest__privacy">See our <Link href="/privacy-policy">Privacy &amp; POPIA Notice</Link> for how this is processed via Formspree and Brevo.</p>
      {status === "error" && <p role="alert">{error}</p>}<button type="submit" className="btn btn-blue" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Register interest"}</button>
    </form>}
  </section>;
}

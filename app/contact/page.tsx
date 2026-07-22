import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/nav-items";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Marang House — call, email, or send us a message. 22 Milner Ave, Franklin Roosevelt Park, Johannesburg.",
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <h1>
          WE&apos;D LOVE TO
          <br />
          <span>HEAR FROM YOU.</span>
        </h1>
      </section>

      <section className="contact-form-wrap">
        <ContactForm />
        <div className="contact-aside">
          <h2>Get in touch!</h2>
          <p>
            Businesses and fellow foundations have given their time and support to help us make a
            difference in children&apos;s lives.
          </p>
          <div className="contact-line">
            📞 <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
          <div className="contact-line">
            ✉ <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="contact-line" style={{ color: "#888", fontSize: ".82rem", fontWeight: 600, marginTop: "12px" }}>
            {SITE.npcReg}
          </div>
        </div>
      </section>

      <section className="find-us">
        <div className="find-us-pin">
          <svg viewBox="0 0 150 190" aria-hidden="true">
            <path d="M75 8C40 8 14 34 14 68c0 44 61 114 61 114s61-70 61-114C136 34 110 8 75 8z" fill="#7ba6dd" />
            <circle cx="75" cy="64" r="26" fill="#004aad" />
          </svg>
        </div>
        <div className="find-us-body">
          <h2>
            WHERE TO
            <br />
            <span>FIND US</span>
          </h2>
          <div className="find-us-cols">
            <div className="find-us-col">
              <div className="find-us-label">Address:</div>
              <p>
                22 Milner Ave,
                <br />
                Franklin Roosevelt Park,
                <br />
                Johannesburg, 2195
              </p>
            </div>
            <div className="find-us-col">
              <div className="find-us-label">Hours</div>
              <div className="hours-row">
                <div className="times">
                  9 am – 5 pm
                  <br />
                  9 am – 5 pm
                  <br />
                  9 am – 5 pm
                  <br />
                  9 am – 5 pm
                  <br />
                  9 am – 5 pm
                  <br />
                  Closed
                </div>
                <div>
                  Monday
                  <br />
                  Tuesday
                  <br />
                  Wednesday
                  <br />
                  Thursday
                  <br />
                  Friday
                  <br />
                  Saturday &amp; Sunday
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

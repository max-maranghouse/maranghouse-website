import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { cld } from "@/lib/images";
import { ORGANISATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Marang House — call, email, or send us a message. 22 Milner Ave, Franklin Roosevelt Park, Johannesburg.",
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        {/* v1787612207/MH_-_Website_-_contact_hero.webp — a sepia/duotone
            photo with its own baked-in wavy transparent bottom edge (not a
            plain rectangle), matching the reference. Rendered at its
            natural aspect ratio (width: 100%, height: auto — same pattern
            as .lk-hero-graphic) instead of BgPhoto's fill+cover, which
            would force-crop a rectangle and destroy the wave shape. */}
        <div className="contact-hero-graphic">
          <Image
            src={cld("v1787612207/MH_-_Website_-_contact_hero.webp")}
            alt=""
            width={814}
            height={503}
            priority
            style={{ width: "100%", height: "auto" }}
          />
          <div className="contact-hero-overlay" />
          {/* The wave cuts the photo away in the bottom-left corner, so the
              red-accent-bar text block sits in that negative space (over
              the page background showing through) rather than on top of
              the photo, per the reference. Percentage-positioned — tune by
              eye against the live render once in the dev server. */}
          <div className="contact-hero-content">
            <h1>
              WE&apos;D LOVE TO
              <span>HEAR FROM YOU</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-wrap">
          <div className="contact-form-aside-text">
            <h2>Get in touch!</h2>
            <p>
              Businesses and fellow foundations have given their time and support to help us make a
              difference in children&apos;s lives.
            </p>
            <div className="contact-aside">
              <div className="contact-line">
                📞 <a href={ORGANISATION.phone.href}>{ORGANISATION.phone.display}</a>
              </div>
              <div className="contact-line">
                ✉ <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>
              </div>
              <div className="contact-line" style={{ color: "#7a4a10", fontSize: ".82rem", fontWeight: 600, marginTop: "12px" }}>
                NPC Reg # {ORGANISATION.registrations.npc}
              </div>
            </div>
            {/* v1786782356/MH-info-pg-element.png — freed up by the step-14
                hero swap (that section now uses the dedicated contact-hero
                asset instead). Plain <Image>, not BgPhoto/fill, so the
                cutout's own irregular transparent edges render as-is rather
                than being cropped to a rectangle. */}
            <div className="contact-aside-photo-wrap">
              <Image
                className="contact-aside-photo"
                src={cld("MH-info-pg-element.png")}
                alt=""
                width={1000}
                height={1000}
                style={{ height: "auto" }}
              />
              <Image
                className="contact-aside-photo-doodle"
                src={cld("v1786782367/MH-love-giff.gif")}
                alt=""
                width={200}
                height={200}
                style={{ height: "auto" }}
                unoptimized
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="contact-form-card">
            <ContactForm />
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
        <div className="find-us-map">
          <iframe
            src="https://maps.google.com/maps?q=22+Milner+Ave,+Franklin+Roosevelt+Park,+Johannesburg,+2195&output=embed"
            title="Map showing the Marang House location at 22 Milner Ave, Franklin Roosevelt Park, Johannesburg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
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

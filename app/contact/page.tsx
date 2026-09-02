import type { Metadata } from "next";
import Image from "next/image";
import BgPhoto from "@/components/BgPhoto";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { cld } from "@/lib/images";
import { ORGANISATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Marang House, call, email, or send us a message. 22 Milner Ave, Franklin Roosevelt Park, Johannesburg.",
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        {/* v1787695702/MH_-_Website_-_contact_hero_image.svg — an SVG export,
            so it's requested as a rasterised PNG via Cloudinary's on-the-fly
            f_png,q_auto transform instead of the shared cld() f_auto,q_auto
            helper (next/image has no SVG support here). Verified this
            renders a real raster image (1366x768 PNG) before wiring it in.
            Previously ran full-bleed, forcing an awkward crop/stretch at
            every viewport width. Split layout instead — a contained,
            rounded photo card (BgPhoto fill+cover into a fixed 4/3 aspect
            ratio, so it crops cleanly rather than stretching) on the left,
            heading on the right, same text/image-split language as the
            Donate hero. */}
        <div className="contact-hero-inner">
          <Parallax className="contact-hero-graphic" strength={10}>
            <BgPhoto
              src="https://res.cloudinary.com/m4hqddxx/image/upload/f_png,q_auto:best/v1787695702/MH_-_Website_-_contact_hero_image.svg"
              alt="Children at Marang House wearing Marang House t-shirts"
              className="bg-fill"
              position="center 32%"
              sizes="(max-width: 760px) 90vw, 50vw"
              priority
            />
          </Parallax>
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
          {/* v1786782356/MH-info-pg-element.png — leads the row (left of the
              text) as a deliberate, large visual anchor rather than a small
              afterthought. Plain <Image>, not BgPhoto/fill, so the cutout's
              own irregular transparent edges render as-is rather than being
              cropped to a rectangle. */}
          <Reveal className="contact-aside-photo-wrap">
            <Image
              className="contact-aside-photo"
              src={cld("v1787612209/MH_-_Website_-about_us_-_kid_hat.webp")}
              alt="A child at Marang House"
              width={870}
              height={717}
              style={{ height: "auto" }}
            />
            <Image
              className="contact-aside-photo-doodle"
              src={cld("v1786782365/MH-love-giff.gif")}
              alt=""
              width={200}
              height={200}
              style={{ height: "auto" }}
              unoptimized
              aria-hidden="true"
            />
          </Reveal>
          <div className="contact-form-aside-text">
            <h2>Get in touch!</h2>
            <p>
              Whether you&apos;d like to volunteer, arrange a visit, or simply ask a question,
              we&apos;d love to hear from you.
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
          </div>
          <div className="contact-form-card">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="find-us">
        <Parallax className="find-us-sun" strength={20} rotate={8}>
          <Image
            src={cld("v1786782354/MH-sun-sticker.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ width: "100%", height: "auto" }}
            aria-hidden="true"
          />
        </Parallax>
        <div className="find-us-inner">
          {/* Map, pin, and location doodad share their own positioning
              wrapper (sized to the map, since it's the only in-flow child)
              instead of being positioned relative to the whole section —
              keeps the pin/doodad centered on the map regardless of how
              wide .find-us-inner or .find-us-body end up. */}
          <div className="find-us-map-wrap">
            <Image
              className="find-us-location-doodad"
              src={cld("v1786782348/MH-location-element-1.png")}
              alt=""
              width={1000}
              height={1000}
              aria-hidden="true"
            />
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
        </div>
      </section>
    </>
  );
}

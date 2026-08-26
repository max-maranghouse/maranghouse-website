import type { Metadata } from "next";
import Image from "next/image";
import { cld } from "@/lib/images";
import { DONATION, ORGANISATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "The Lightkeepers",
  description:
    "The Lightkeepers are a community of monthly donors, sponsors, and champions who keep the lights on at Marang House. Join the Circle of Light via BackaBuddy.",
};

export default function LightkeepersPage() {
  return (
    <>
      <div className="lk-page-gradient">
        <section className="lk-hero">
          <div className="lk-hero-graphic">
            <Image
              src={cld("MH-lightkeepers-banner.png")}
              alt="A lighthouse beaming light onto the Marang House Lightkeeper enamel badge"
              width={2732}
              height={1536}
              priority
            />
            {/* Overlaid on the open blue-card area to the right of the
                heart badge (not centered over the whole graphic) —
                percentage-based so it scales with the image at every
                width, same idea as .contact-hero-content. */}
            <div className="lk-hero-overlay">
              <h1>The Lightkeepers</h1>
              <p>Become a lightkeeper, join Marang&rsquo;s circle of light!</p>
              <a href={DONATION.primary.url} className="btn lk-hero-overlay-cta" target="_blank" rel="noopener noreferrer">
                DONATE VIA BACKABUDDY
              </a>
            </div>
          </div>
        </section>

        {/* Reuses .lk-circle-section — already defined in globals.css but
            unused until now — as a short emotional lead-in between the
            hero and the practical info card below. */}
        <section className="lk-circle-section">
          <h2>Join the Circle of Light</h2>
          <p>
            We invite you to become a Lightkeeper. Join the Marang House Circle of Light as a monthly
            donor — your monthly gift provides more than food or shelter, it gives a child what every
            child deserves.
          </p>
          <p>
            They need stability. They need nutritious meals, transport to hospital, school uniforms,
            shoes, electricity, warm beds and, most importantly, people who care.
          </p>
        </section>

        <section className="lk-info-section">
          <div className="lk-info-card">
            <h2>BECOME A LIGHTKEEPER</h2>
            <p>
              The Marang <strong>Circle Of Light</strong> is a community that keeps the light of home, joy,
              and love shining for chronically ill children receiving treatment away from home.
            </p>
            <p className="lk-info-bank">
              {DONATION.eft.bank}: Account No: {DONATION.eft.accountNumber}
            </p>
            <div className="lk-info-grid">
              <Image
                className="lk-info-keychain"
                src={cld("MH-lighthouse-keychain.png")}
                alt="Lightkeeper enamel keyring badge"
                width={1000}
                height={1000}
                style={{ height: "auto" }}
              />
              <div className="lk-info-divider" aria-hidden="true" />
              <div className="lk-info-general">
                <h3>General info</h3>
                <p>
                  NPO Number:
                  <strong>{ORGANISATION.registrations.npo}</strong>
                </p>
                <p>
                  PBO Number:
                  <strong>{ORGANISATION.registrations.pbo}</strong>
                </p>
                <p>
                  Reg. Number:
                  <strong>{ORGANISATION.registrations.npc}</strong>
                </p>
              </div>
              <div className="lk-info-contact">
                <div className="lk-info-contact-row">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                  </svg>
                  <span>{ORGANISATION.address.formatted}</span>
                </div>
                <div className="lk-info-contact-row">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.5 1.7 2.5 4 2.7 6H9.3c.2-2 1.2-4.3 2.7-6zM4.3 12c0-.7.1-1.4.2-2H8c-.1.7-.1 1.3-.1 2s0 1.3.1 2H4.5c-.1-.6-.2-1.3-.2-2zm.9 4h3.1c.3 1.4.8 2.6 1.4 3.7A8 8 0 015.2 16zm3.1-8H5.2a8 8 0 014.6-3.7C9.2 5.4 8.7 6.6 8.3 8zm2.7 8.1c-.2-1-.4-2-.4-2.1h3.7c-.1.1-.3 1.1-.4 2.1-.5.9-1 1.6-1.4 2-.5-.4-1-1.1-1.5-2zm3.7-.1c.6-1.1 1.1-2.3 1.4-3.7h3.1a8 8 0 01-4.5 3.7zm1.7-5.7c.1-.7.1-1.3.1-2s0-1.3-.1-2h3.5c.1.6.2 1.3.2 2s-.1 1.4-.2 2zm-.3-6c-.4-1.4-.9-2.6-1.4-3.7a8 8 0 014.5 3.7z" />
                  </svg>
                  <a href="https://www.maranghouse.org">www.maranghouse.org</a>
                </div>
                <div className="lk-info-contact-row">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.3 2.3z" />
                  </svg>
                  <a href={ORGANISATION.phone.href}>Tel: {ORGANISATION.phone.display}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Salome's story, in her own words — sits on plain white outside
          .lk-page-gradient so it reads as a distinct, quieter beat after
          the bright orange hero/info block above, closing with the
          tagline band as the page's final note. */}
      <section className="lk-story">
        <div className="lk-story-inner">
          <span className="lk-story-eyebrow">In Her Own Words</span>
          <h2>Meet Salome, Our Matron</h2>
          <p>
            Salome, Matron of Marang House, was fourteen years old when she watched her grandmother pass
            away at home. That was the moment she decided she wanted to become a nurse.
          </p>
          <p className="lk-story-quote">
            &ldquo;Years later, I worked alongside Dr Pieter Ernst in theatre. One day he asked me if I
            would come and help at a children&rsquo;s home called Marang House. He saw something in me
            that I couldn&rsquo;t yet see in myself. Today I know exactly what he saw.&rdquo;
          </p>
          <p className="lk-story-standout">
            Children don&rsquo;t heal because of insulin alone. Children heal because they feel
            <span> secure and loved.</span>
          </p>
          <p>
            Every child who comes to Marang House has already faced more than most adults. They leave
            their families and travel hundreds of kilometres to Johannesburg for life-saving treatment.
            Many arrive frightened. Some have spent more days in hospital than they have at home.
          </p>
          <p>Every one of them deserves to feel safe. That is why Marang House exists.</p>
          <p>
            It takes many people to create that feeling of security. A volunteer helping with homework.
            A donor buying school shoes. A warm meal after a long day at hospital. A hug before bedtime.
          </p>
          <p>Together, those small acts of kindness become something much bigger.</p>
          <p>
            They become <strong>The Marang House Circle of Light</strong>. Together, we are the
            Lightkeepers.
          </p>
          <p>
            Security isn&rsquo;t created in a single day. It is built every single month. That is why
            monthly giving matters. Because when children know they are safe, healing can begin.
          </p>
          <div className="lk-story-tagline">
            One Home &middot; One Circle &middot; <span>A Thousand Lightkeepers</span> &middot; Endless
            Hope
          </div>
        </div>
      </section>
    </>
  );
}

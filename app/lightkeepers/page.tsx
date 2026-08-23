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
          </div>
          <h1>The Lightkeepers</h1>
          <p>Become a lightkeeper, join Marang&rsquo;s circle of light!</p>
          <a href={DONATION.primary.url} className="btn" target="_blank" rel="noopener noreferrer">
            DONATE VIA BACKABUDDY
          </a>
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

    </>
  );
}

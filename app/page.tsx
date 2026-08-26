import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import WhatsAppFab from "@/components/WhatsAppFab";
import { cld } from "@/lib/images";
import { DONATION } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — corkboard, bunting, polaroids */}
      <section className="hero">
        <BgPhoto
          src={cld("MH-pinboard-BG.png")}
          alt=""
          className="hero-photo"
          position="center 30%"
          sizes="100vw"
          priority
        />
        <div className="hero-content">
          <Image
            className="hero-doodle"
            src={cld("v1784193083/maranghouse/marang_house_logo_sm.png")}
            alt="Marang House logo"
            width={120}
            height={120}
            style={{ height: "auto" }}
          />
          <h1>
            Fostering Health,
            <br />
            Providing <span>Hope.</span>
          </h1>
          <p className="hero-sub">
            Creating a safe, clean, and nurturing home for children living with chronic illnesses.
          </p>
          <div className="hero-btns">
            <a
              href={DONATION.primary.url}
              className="btn btn-hero-solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              {DONATION.primary.label}
            </a>
          </div>
        </div>
        <div className="hero-doodads" aria-hidden="true">
          {/* Pin is a child of the polaroid's own wrapper (not a sibling
              positioned against the whole hero) so it always sticks to
              polaroid-1's top-left corner, at every breakpoint, without
              needing its own position overrides to track the polaroid's
              — the wrap carries the position/rotation that used to live
              directly on the photo. */}
          <div className="hero-polaroid-1-wrap">
            <Image
              className="hero-polaroid-1"
              src={cld("MH-polaroid-1.png")}
              alt=""
              width={1000}
              height={1000}
              style={{ height: "auto" }}
            />
            <Image
              className="hero-board-pin"
              src={cld("v1786782350/MH-board-pin-blue.png")}
              alt=""
              width={1000}
              height={1000}
              style={{ height: "auto" }}
            />
          </div>
          <Image
            className="hero-polaroid-2"
            src={cld("MH-polaroid-2.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
          <Image
            className="hero-sketch"
            src={cld("MH-kids-sketch.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
        </div>
        <WhatsAppFab />
      </section>

      {/* 2. BECOME A LIGHTKEEPER — positioned immediately after the hero
          to match the Canva layout, where this is the first section below
          the fold. The ask lands while the hero's emotional momentum is
          still fresh. */}
      <section className="lk-band">
        <div className="lk-card">
          <div className="lk-card-text">
            <h2 className="lk-title">Become A Lightkeeper</h2>
            <p className="lk-desc">
              The <strong>Marang Circle of Light</strong> is a community of <strong>monthly donors</strong>{" "}
              who keep the light of home shining, joy and love for chronically ill children receiving
              treatment away from home. Be the first to get a limited-edition keyring with love from us.
            </p>
            <div className="lk-cta-row">
              <a
                href={DONATION.primary.url}
                className="btn lk-signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                {DONATION.primary.label}
              </a>
            </div>
          </div>
          <Image
            className="lk-card-pin"
            src={cld("MH-lighthouse-keychain.png")}
            alt="Lightkeeper enamel keyring badge"
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
        </div>
      </section>

      {/* 3. WE ARE MARANG HOUSE + WHAT WE DO — identity, merged into one
          continuous navy → gradient composition so "what we do" reads as
          part of the same visual event rather than a separate card row. */}
      <section className="identity-section">
        <div className="identity-top">
          <div className="identity-text">
            <h2>
              We are <span>Marang House.</span>
            </h2>
            <p>
              Marang House is a home, and a Circle of Light, for children living with serious chronic
              illness.
            </p>
            <ul className="identity-list">
              <li>Children aged 7 to 14 whose conditions demand constant medical care</li>
              <li>A safe, loving place to live, with daily treatment at a tertiary hospital</li>
              <li>An education that never stops</li>
            </ul>
            <p className="identity-important">
              <strong>Since 1998,</strong>{" "}we&rsquo;ve made sure no child has to choose between their health
              and their future.
            </p>
          </div>
          <div className="identity-photo-wrap">
            <Image
              className="identity-photo"
              src={cld("v1786782357/MH-boy-arch.png")}
              alt="A child in school uniform celebrating with caregivers at Marang House"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="whatwedo-band">
          <Image
            className="whatwedo-sun"
            src={cld("MH-shun-giff.gif")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
          <h3 className="whatwedo-heading">What We Do</h3>
          <div className="whatwedo-grid">
            <Image
              className="whatwedo-card"
              src={cld("MH-what-we-do-1.png")}
              alt="Accommodate 12 children at a time"
              width={1000}
              height={1000}
            />
            <Image
              className="whatwedo-card"
              src={cld("MH-what-we-do-2.png")}
              alt="Offer the necessities: food and housing"
              width={1000}
              height={1000}
            />
            <Image
              className="whatwedo-card"
              src={cld("MH-what-we-do-3.png")}
              alt="Round-the-clock medical care"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* 4. NICE TO MEET YOU — circular photo + intro text, matching
          Canva ref 09 bottom half: white section, photo left, text right. */}
      <section className="meet-section">
        <div className="meet-inner">
          <div className="meet-photo-wrap">
            <BgPhoto
              src={cld("MH-girl-arch.png")}
              alt="A child celebrating with her caregiver at Marang House"
              className="meet-photo"
              position="center 25%"
              sizes="(max-width: 860px) 88vw, 48vw"
            />
          </div>
          <div className="meet-text">
            <h2>
              Nice To<br />Meet You.
            </h2>
            <p>
              The reality for children suffering from chronic illnesses is a harsh one.
            </p>
            <p>
              Marang House provides a safe and loving home where brave kids can thrive and learn to
              manage their illness — because no child should face it alone.
            </p>
          </div>
        </div>
      </section>

      {/* 5. OUR MISSION — full-bleed heart-hands photo banner with
          centered mission statement, matching Canva ref 03. */}
      <section className="mission-banner">
        <BgPhoto
          src={cld("MH-heart-hands-banner.png")}
          alt=""
          className="mission-banner-photo"
          position="center center"
          sizes="100vw"
        />
        <div className="mission-banner-scrim" aria-hidden="true" />
        <div className="mission-banner-content">
          <p className="mission-label">OUR</p>
          <h2>MISSION</h2>
          <p>
            Providing a safe and loving home where brave kids can thrive and learn to manage their
            illness.
          </p>
          <Image
            className="mission-love-doodle"
            src={cld("MH-love-giff.gif")}
            alt=""
            width={200}
            height={200}
            style={{ height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
        </div>
      </section>

      {/* 6. TRUSTED BY — existing, verified supporter recognition. Demoted to
          a quieter trust-signal band (smaller heading, one star doodle
          instead of two, unified placeholder styling) rather than a full
          narrative beat, since it sits outside the core content priorities. */}
      <section className="sponsors-section">
        <BgPhoto
          src={cld("v1786782356/MH-Rays-BG.png")}
          alt=""
          className="sponsors-section-bg"
          sizes="100vw"
        />
        <div className="sponsors-section-inner">
        <h2>
          Meet a few of the people who
          <br />
          help us transform lives
        </h2>
        <p className="sponsors-sub">
          Businesses and fellow foundations have given their time and support to help us make a
          difference in children&apos;s lives.
        </p>
        <div className="sponsors-row">
          <div className="sponsor-item">
            <BgPhoto
              src={cld("v1784193096/maranghouse/Daryl_and_David1.jpg")}
              alt="Daryl Impey"
              className="sponsor-avatar"
              position="70% center"
              sizes="96px"
            />
            <div className="sponsor-name">
              Professional Road Cyclist
              <span>Daryl Impey</span>
            </div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder">MW</div>
            <div className="sponsor-name">
              Mrs Universe
              <span>Monique Weyers</span>
            </div>
          </div>
          <div className="sponsor-item">
            <BgPhoto
              src={cld("v1784193104/maranghouse/pirates_helpers.jpg")}
              alt="Pirates Running Club"
              className="sponsor-avatar"
              position="right center"
              sizes="96px"
            />
            <div className="sponsor-name">
              Pirates
              <span>Running Club</span>
            </div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder">JJC</div>
            <div className="sponsor-name">
              JHB Junior
              <span>Council</span>
            </div>
          </div>
        </div>
        <div className="sponsors-row">
          <div className="sponsor-item">
            <BgPhoto
              src={cld("v1784193097/maranghouse/Daryl_and_David2.jpg")}
              alt="David Higgs"
              className="sponsor-avatar"
              position="65% top"
              sizes="96px"
            />
            <div className="sponsor-name">
              Chef &amp; Personality
              <span>David Higgs</span>
            </div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder">NW</div>
            <div className="sponsor-name">
              Miss Earth 2019
              <span>Nazia Wadee</span>
            </div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder">RD</div>
            <div className="sponsor-name">Reach For A Dream</div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder">PCI</div>
            <div className="sponsor-name">PCI Carpets</div>
          </div>
        </div>
        <Image
          className="sponsors-stars"
          src={cld("MH-star-giff.gif")}
          alt=""
          width={425}
          height={425}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <Link href="/lightkeepers" className="btn btn-blue">
          SPONSOR A CHILD TODAY
        </Link>
        </div>
      </section>

      {/* 7. ALL SUPPORT IS WELCOME — cream bg, text left, photo right.
          Matches Canva ref 05. Separate from the 3-card involvement grid. */}
      <section className="support-section">
        <div className="support-inner">
          <div className="support-text">
            <h2>
              All support is <strong>Welcome!</strong>
            </h2>
            <p className="support-lead">
              Marang House is funded entirely through the generosity of donors, sponsors, volunteers, and
              corporate partners.
            </p>
            <p className="support-note">
              Your support helps provide a home away from home for seriously ill children and their
              families, while offering tax-deductible benefits and potential B-BBEE scorecard
              contributions.
            </p>
          </div>
          <div className="support-photo-wrap">
            <BgPhoto
              src={cld("MH-landing-support2.png")}
              alt="A volunteer caring for a child at Marang House"
              className="support-photo"
              position="center 20%"
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 8. HOW YOU CAN GET INVOLVED — photo-backdrop,
          3 white cards (Volunteer / Lightkeeper / Donate).
          Matches Canva ref 06. */}
      <section className="involved-section">
        <div className="involved-band">
          <div className="involved-band-inner">
            <BgPhoto src={cld("MH-Blur-BG.png")} alt="" className="involved-band-bg" sizes="100vw" />
            <div className="involved-band-overlay" />
          </div>
          <h2 className="involved-heading">How You Can Get Involved</h2>
          <div className="involved-grid">
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-1.png")} alt="" width={1000} height={1000} />
              <h3>VOLUNTEER</h3>
              <p>Our volunteer program is the heartbeat of Marang House.</p>
              <Link href="/contact" className="btn btn-blue">
                VOLUNTEER
              </Link>
            </div>
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-2.png")} alt="" width={1000} height={1000} />
              <h3>LIGHTKEEPER</h3>
              <p>Be part of our Monthly Giving Program.</p>
              <a href={DONATION.primary.url} className="btn btn-blue" target="_blank" rel="noopener noreferrer">
                {DONATION.primary.label}
              </a>
            </div>
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-3.png")} alt="" width={1000} height={1000} />
              <h3>DONATE</h3>
              <p>Make a once off payment, get our bank details now.</p>
              <Link href="/donate" className="btn btn-blue">
                DONATE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CREATING A BETTER FUTURE — new closing section, built from
          MH_-_Website_-Creating_a_better_future.svg. NOTE: this task's own
          QA step (verify the f_png,q_auto raster renders before wiring it
          in) found the asset is NOT a fully-composed flattened graphic like
          the .whatwedo-card PNGs — it's background shapes only (a yellow/
          orange wave pair + 3 empty pale card silhouettes), with no baked-in
          heading, subheading, stat numbers, or skipping-kid illustration.
          Built here with real HTML text over it instead — the site's
          established convention, and what the pre-existing (previously
          unused) .stats-section/.stat-num CSS below was already set up for
          — rather than shipping three blank cards. Flagged to Max. */}
      <section className="stats-section">
        <BgPhoto
          src="https://res.cloudinary.com/m4hqddxx/image/upload/f_png,q_auto/v1787612210/MH_-_Website_-Creating_a_better_future.svg"
          alt=""
          className="stats-section-bg"
          sizes="100vw"
        />
        <div className="stats-section-inner">
          <div className="stats-heading">
            <h2>Creating A Better Future</h2>
            <p className="stats-subheading">For Children Living With Chronic Illness</p>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">28+</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">300+</div>
              <div className="stat-label">Children</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">1000+</div>
              <div className="stat-label">Volunteers</div>
            </div>
          </div>
        </div>
        {/* No baked-in skipping-kid illustration exists in the background
            graphic to duplicate/clash with (see note above), so this can
            be placed cleanly over the yellow hill, bottom-left. */}
        <Image
          className="stats-skip-gif"
          src={cld("MH-skipping-giff.gif")}
          alt=""
          width={300}
          height={300}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
      </section>

    </>
  );
}

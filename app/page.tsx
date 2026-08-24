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
          <Image
            className="hero-polaroid-1"
            src={cld("MH-polaroid-1.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
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
          <Image
            className="lk-card-rays"
            src={cld("MH-Ray.gif")}
            alt=""
            width={800}
            height={800}
            style={{ height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
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
              <Image
                className="lk-card-badge"
                src={cld("MH-lighthouse-pin.png")}
                alt=""
                width={1000}
                height={1000}
                aria-hidden="true"
              />
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
            <BgPhoto
              src={cld("MH-kid-pirate.png")}
              alt="A child at Marang House"
              className="identity-photo"
              position="center 20%"
              sizes="(max-width: 1000px) 100vw, 50vw"
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
              sizes="(max-width: 860px) 80vw, 360px"
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
      </section>

      {/* 6. WAYS TO HELP — merged "All Support Is Welcome" + "How You Can Get
          Involved" into one destination: the general-support message leads
          straight into the three concrete actions, on one shared photo
          backdrop instead of two separate sections with two separate
          photos. */}
      <section className="ways-section">
        <div className="involved-band">
          <div className="involved-band-inner">
            <BgPhoto src={cld("MH-Blur-BG.png")} alt="" className="involved-band-bg" sizes="100vw" />
            <div className="involved-band-overlay" />
          </div>
          <div className="likes-badge">
            <Image
              className="likes-badge-gif"
              src={cld("MH-likes-giff.gif")}
              alt=""
              width={30}
              height={30}
              style={{ height: "auto" }}
              unoptimized
              aria-hidden="true"
            />
            <span>45</span>
          </div>
          <div className="ways-intro">
            <h2>
              All support is <strong>Welcome!</strong>
            </h2>
            <p className="ways-lead">
              Marang House is funded entirely through the generosity of donors, sponsors, volunteers, and
              corporate partners.
            </p>
            <p className="ways-note">
              Your support helps provide a home away from home for seriously ill children and their
              families, while offering tax-deductible benefits and potential B-BBEE scorecard
              contributions.
            </p>
          </div>
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

    </>
  );
}

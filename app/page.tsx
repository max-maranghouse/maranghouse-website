import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import WhatsAppFab from "@/components/WhatsAppFab";
import { cld } from "@/lib/images";
import { DONATION } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — corkboard, bunting, polaroids — UNTOUCHED */}
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

      {/* 2. BECOME A LIGHTKEEPER — orange gradient band with navy card */}
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

      {/* 3. WE ARE MARANG HOUSE — identity section, deep navy bg.
          "What We Do" 3-card grid REMOVED (now About-exclusive). */}
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
      </section>

      {/* 4. A DAY AT MARANG HOUSE — replaces the old "Nice To Meet You"
          with a concrete vignette instead of repeating the mission.
          Girl-arch shown as plain cutout image (no card/shadow tile). */}
      <section className="meet-section">
        <Image
          className="meet-doodle"
          src={cld("v1786782365/MH-love-giff.gif")}
          alt=""
          width={200}
          height={200}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="meet-inner">
          <div className="meet-photo-wrap">
            <Image
              className="meet-photo"
              src={cld("MH-girl-arch.png")}
              alt="A child celebrating with her caregiver at Marang House"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="meet-text">
            <h2>
              A Day At<br />Marang House.
            </h2>
            <p>
              Morning starts with breakfast around a family table — not a hospital trolley.
              Then it&rsquo;s off to a tertiary hospital for treatment: dialysis, check-ups,
              the daily routines that keep these children alive.
            </p>
            <p>
              By afternoon they&rsquo;re back at Marang House, doing homework at the kitchen
              counter, playing in the garden, being children. That is what makes this place
              different — it is a home, not a ward.
            </p>
          </div>
        </div>
      </section>

      {/* 5. OUR MISSION — photo banner with distinct mission wording */}
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
            To give every child facing chronic illness a stable home, continuous medical care,
            and an education that never stops — so healing and growing happen together.
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

      {/* 6. TRUSTED BY — social proof, deep navy bg */}
      <section className="sponsors-section">
        <BgPhoto
          src={cld("v1786782356/MH-Rays-BG.png")}
          alt=""
          className="sponsors-section-bg"
          sizes="100vw"
        />
        <Image
          className="sponsors-cloud"
          src={cld("v1786782353/MH-real-cloud.png")}
          alt=""
          width={400}
          height={400}
          style={{ height: "auto" }}
          aria-hidden="true"
        />
        <Image
          className="sponsors-sun"
          src={cld("v1786782364/MH-shun-giff.gif")}
          alt=""
          width={300}
          height={300}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="sponsors-section-inner">
        <h2>
          The people who help us
          <br />
          transform lives
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
        <Link href="/lightkeepers" className="btn btn-yellow">
          SPONSOR A CHILD TODAY
        </Link>
        </div>
      </section>

      {/* 7. HOW YOU CAN GET INVOLVED — MERGED from old §7 "All Support Is
          Welcome" + §8 "How You Can Get Involved". Emotional pitch as intro,
          3-card grid as action. Tax/B-BBEE moved to Donate. */}
      <section className="involved-section">
        <Image
          className="involved-doodle"
          src={cld("v1786782358/MH-cloud-giff.gif")}
          alt=""
          width={300}
          height={300}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="involved-band">
          <div className="involved-band-inner">
            <BgPhoto src={cld("MH-Blur-BG.png")} alt="" className="involved-band-bg" sizes="100vw" />
            <div className="involved-band-overlay" />
          </div>
          <h2 className="involved-heading">How You Can Get Involved</h2>
          <p className="involved-lead">
            Marang House is funded entirely through the generosity of donors, sponsors,
            volunteers, and corporate partners. Your support helps provide a home away
            from home for seriously ill children and their families.
          </p>
          <div className="involved-grid">
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-1.png")} alt="" width={1000} height={1000} />
              <h3>VOLUNTEER</h3>
              <p>
                Our volunteer program is the heartbeat of Marang House. Help with homework,
                cook a meal, or simply be a friendly face after a long day at hospital.
              </p>
              <Link href="/contact" className="btn btn-blue">
                VOLUNTEER
              </Link>
            </div>
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-2.png")} alt="" width={1000} height={1000} />
              <h3>LIGHTKEEPER</h3>
              <p>
                Join the Circle of Light as a monthly donor. Your recurring gift brings
                stability and security to children who need it most.
              </p>
              <a href={DONATION.primary.url} className="btn btn-blue" target="_blank" rel="noopener noreferrer">
                {DONATION.primary.label}
              </a>
            </div>
            <div className="involved-card">
              <Image className="involved-icon" src={cld("MH-involvment-icons-3.png")} alt="" width={1000} height={1000} />
              <h3>DONATE</h3>
              <p>
                Make a once-off contribution via bank transfer or BackaBuddy. Every
                rand goes directly to the children in our care.
              </p>
              <Link href="/donate" className="btn btn-blue">
                DONATE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CREATING A BETTER FUTURE — stats, deep navy gradient bg.
          Hills image sits at the bottom of the section. */}
      <section className="stats-section">
        <BgPhoto
          src={cld("v1786782346/MH-hills.png")}
          alt=""
          className="stats-section-bg"
          position="center bottom"
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

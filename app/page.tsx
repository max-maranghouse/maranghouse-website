import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import WhatsAppFab from "@/components/WhatsAppFab";
import Stats from "@/components/sections/Stats";
import { cld } from "@/lib/images";

// Testimonial names/quotes are unconfirmed — the Canva mockup (Rosita Gaskin /
// Gugulethu Cele / Malwande Khumalo) and the site's existing content
// inventory (Nkosi Speers / Eugalina Corn / Minwase Khamala) disagree on who
// said what, and neither is verified. Placeholder copy ships instead of
// picking one set — see MARANG-HOUSE-SITE-CONTEXT.md and the Canva redesign
// brief. Swap in the confirmed names/quotes here once Max signs off.
const TESTIMONIALS = [
  { quote: "[Testimonial quote — TBC]", name: "— Name TBC" },
  { quote: "[Testimonial quote — TBC]", name: "— Name TBC" },
  { quote: "[Testimonial quote — TBC]", name: "— Name TBC" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — corkboard, bunting, polaroids, keyring badge */}
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
            <Link href="/donate" className="btn btn-hero-solid">
              DONATE
            </Link>
            <Link href="/contact" className="btn btn-hero-solid">
              GET OUR NEWSLETTER
            </Link>
          </div>
        </div>
        <div className="hero-doodads" aria-hidden="true">
          <Image
            className="hero-keyring"
            src={cld("MH-lighthouse-keychain.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
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
          <Image
            className="hero-pin-1"
            src={cld("MH-board-pin-yellow.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
          <Image
            className="hero-pin-2"
            src={cld("MH-board-pin-blue.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
          <Image
            className="hero-pin-3"
            src={cld("MH-board-pin-blue.png")}
            alt=""
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
        </div>
        <WhatsAppFab />
      </section>

      {/* 2. BECOME A LIGHTKEEPER banner */}
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
            <Link href="/lightkeepers" className="btn lk-signup">
              SIGN&ndash;ME&ndash;UP!
            </Link>
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

      {/* 3. WE'RE MARANG HOUSE — home teaser */}
      <section className="home-intro-section">
        <Image
          className="home-intro-doodle-2"
          src={cld("MH-shun-giff.gif")}
          alt=""
          width={1000}
          height={1000}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <Image
          className="home-intro-doodle-3"
          src={cld("MH-shun-giff.gif")}
          alt=""
          width={1000}
          height={1000}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="home-intro-inner">
          <div className="home-intro-left">
            <Image
              className="home-intro-doodle"
              src={cld("MH-shun-giff.gif")}
              alt=""
              width={1000}
              height={1000}
              style={{ height: "auto" }}
              unoptimized
            />
            <Image
              className="home-intro-cloud"
              src={cld("MH-cloud-giff.gif")}
              alt=""
              width={1000}
              height={1000}
              style={{ height: "auto" }}
              unoptimized
            />
            <h2>We&rsquo;re Marang House.</h2>
            <p>Marang House is a home, and a Circle of Light, for children living with serious chronic illness.</p>
            <p>
              We take in kids aged 4 to 14 whose conditions demand constant medical care, and we give them
              what every child deserves: a safe, loving place to live, daily treatment at a tertiary
              hospital, and an education that never stops.
            </p>
            <p>Since 1998, we&rsquo;ve made sure no child has to choose between their health and their future.</p>
            <p className="home-intro-what">What we do:</p>
            <div className="home-intro-cards">
              <Image
                src={cld("MH-what-we-do-1.png")}
                alt="Accommodate 12 children at a time"
                width={1000}
                height={1000}
              />
              <Image
                src={cld("MH-what-we-do-2.png")}
                alt="Offer the necessities: food, housing"
                width={1000}
                height={1000}
              />
              <Image
                src={cld("MH-what-we-do-3.png")}
                alt="Round-the-clock medical care"
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <div className="home-intro-right">
            <BgPhoto
              src={cld("MH-kid-pirate.png")}
              alt="A child at Marang House"
              className="home-intro-photo"
              position="center 20%"
            />
          </div>
        </div>
      </section>

      {/* 4. OUR MISSION — heart hands full-bleed */}
      <section className="mission-section">
        <div className="mission-card">
          <BgPhoto src={cld("MH-heart-hands-banner.png")} alt="" className="mission-bg" />
          <Image
            className="mission-love-doodle"
            src={cld("MH-love-giff.gif")}
            alt=""
            width={200}
            height={200}
            style={{ height: "auto" }}
            unoptimized
          />
          <div className="mission-content">
            <p className="mission-eyebrow">our</p>
            <h2>MISSION</h2>
            <p>Providing a safe and loving home where brave kids can thrive and learn to manage their illness.</p>
          </div>
        </div>
      </section>

      {/* MEET THE PEOPLE — present in the Canva source between Mission and
          Testimonials, restored on request even though it wasn't in the 16
          curated screenshots. */}
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
            <div className="sponsor-avatar placeholder" style={{ backgroundColor: "#b47fd6" }}>
              MW
            </div>
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
            <div className="sponsor-avatar placeholder" style={{ backgroundColor: "#33334a" }}>
              JJC
            </div>
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
            <div className="sponsor-avatar placeholder" style={{ backgroundColor: "#8a6248" }}>
              NW
            </div>
            <div className="sponsor-name">
              Miss Earth 2019
              <span>Nazia Wadee</span>
            </div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder" style={{ backgroundColor: "#3fa9d8" }}>
              RD
            </div>
            <div className="sponsor-name">Reach For A Dream</div>
          </div>
          <div className="sponsor-item">
            <div className="sponsor-avatar placeholder" style={{ backgroundColor: "#1d2a4d" }}>
              PCI
            </div>
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
        />
        <Image
          className="sponsors-stars-2"
          src={cld("MH-star-giff.gif")}
          alt=""
          width={425}
          height={425}
          style={{ height: "auto" }}
          unoptimized
        />
        <Link href="/lightkeepers" className="btn btn-blue">
          SPONSOR A CHILD TODAY
        </Link>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="testimonials-section">
        <BgPhoto
          src={cld("MH-Little-boy.jpeg")}
          alt="A child at Marang House with a caregiver"
          className="testi-photo"
          position="center 30%"
        />
        <Image
          className="testi-stars-doodle"
          src={cld("MH-star-giff.gif")}
          alt=""
          width={425}
          height={425}
          unoptimized
        />
        <Image
          className="testi-stars-doodle-2"
          src={cld("MH-star-giff.gif")}
          alt=""
          width={425}
          height={425}
          unoptimized
        />
        <div className="testi-content">
          <h2>
            See what our sponsors &amp;
            <br />
            volunteers have to say
          </h2>
          {TESTIMONIALS.map((t, i) => (
            <div key={i}>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <p className="testi-name">{t.name}</p>
            </div>
          ))}
          <p className="testi-tbc-note">
            Names and quotes above are placeholders pending confirmation of the real supporter testimonials.
          </p>
        </div>
      </section>

      {/* 6. ALL SUPPORT IS WELCOME */}
      <section className="support-section">
        <div className="support-text">
          <h2>
            All support is
            <br />
            <strong>Welcome!</strong>
          </h2>
          <p className="support-lead">
            Marang House is funded entirely through the generosity of donors, sponsors, volunteers, and
            corporate partners.
          </p>
          <p>
            Your support helps provide a home away from home for seriously ill children and their families,
            while offering tax-deductible benefits and potential B-BBEE scorecard contributions.
          </p>
        </div>
        <div className="support-photo-wrap">
          <BgPhoto src={cld("MH-landing-support2.png")} alt="A caregiver and child at Marang House" className="support-photo" />
        </div>
      </section>

      {/* 7. HOW YOU CAN GET INVOLVED */}
      <section className="involved-section">
        <div className="involved-band">
          <div className="involved-band-inner">
            <BgPhoto src={cld("MH-Blur-BG.png")} alt="" className="involved-band-bg" />
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
            />
            <span>45</span>
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
              <Link href="/lightkeepers" className="btn btn-blue">
                SPONSOR A CHILD TODAY
              </Link>
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

      {/* 8. CREATING A BETTER FUTURE */}
      <Stats />
    </>
  );
}

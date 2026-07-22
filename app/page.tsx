import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import WhatsAppFab from "@/components/WhatsAppFab";
import Stats from "@/components/sections/Stats";
import { cld } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="hero">
        <BgPhoto
          src={cld("v1784193102/maranghouse/SmacPix_Marang2.jpg")}
          alt=""
          className="hero-photo"
          position="center 30%"
          sizes="100vw"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <Image
            className="hero-doodle"
            src={cld("v1784193083/maranghouse/marang_house_logo_sm.png")}
            alt="Marang House logo"
            width={120}
            height={120}
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
            <Link href="/donate" className="btn btn-white-outline">
              DONATE IN KIND
            </Link>
          </div>
        </div>
        <WhatsAppFab />
      </section>

      {/* 2. LIGHTKEEPER BAND */}
      <section className="lk-band">
        <div className="lk-card">
          <div className="lk-card-text">
            <p className="lk-eyebrow">The Marang Circle of Light</p>
            <h2 className="lk-title">LIGHTKEEPER</h2>
            <p className="lk-desc">
              Join &ldquo;The&nbsp;Circle Of Light&rdquo;, become a Marang House lightkeeper, and donate
              monthly to Marang House.
            </p>
            <Link href="/lightkeepers" className="btn lk-signup">
              SIGN&ndash;UP
            </Link>
          </div>
          <Image
            className="lk-card-pin"
            src={cld("v1784193082/maranghouse/Marang_House_Website_Element.png")}
            alt="Lightkeeper badge"
            width={280}
            height={280}
          />
        </div>
      </section>

      {/* 3. WE'RE MARANG HOUSE */}
      <section className="intro-section">
        <div className="intro-inner">
          <div className="intro-left">
            <h2 className="intro-heading">We&rsquo;re Marang House.</h2>
            <p className="intro-body">
              We provide a nurturing home environment for children between the ages of 7 and 14,
              empowering them to learn and manage their illnesses. They face serious health conditions
              that demand continuous monitoring and specialized treatments at a tertiary hospital.
            </p>
            <p className="intro-body">
              Importantly, we ensure that their education remains a priority by taking them to the
              hospital daily, where they receive disease management training alongside traditional
              schooling
            </p>
            <p className="intro-what">What we do:</p>
            <div className="intro-cards">
              <Image
                className="intro-card"
                src={cld("v1784193087/maranghouse/mh_element_3.png")}
                alt="Accommodate 12 Children at a time"
                width={172}
                height={172}
              />
              <Image
                className="intro-card"
                src={cld("v1784193084/maranghouse/mh_element_1.png")}
                alt="Offer the Necessities"
                width={172}
                height={172}
              />
              <Image
                className="intro-card"
                src={cld("v1784193086/maranghouse/mh_element_2.png")}
                alt="Round-the-clock Medical Care"
                width={172}
                height={172}
              />
            </div>
          </div>
          <div className="intro-right">
            <Image
              className="intro-suncloud"
              src={cld("v1784193092/maranghouse/mh_element_sun_and_cloud.png")}
              alt=""
              width={330}
              height={183}
            />
            <BgPhoto
              src={cld("v1784193101/maranghouse/SmacPix_Marang1.jpg")}
              alt="Children at Marang House"
              className="arch-photo intro-right-photo"
            />
          </div>
        </div>
      </section>

      {/* 4. NICE TO MEET YOU */}
      <section className="ntmy-section">
        <div className="ntmy-inner">
          <BgPhoto
            src={cld("v1784193098/maranghouse/MARANG-1.jpg")}
            alt="Marang House building"
            className="arch-photo ntmy-photo"
          />
          <div className="ntmy-content">
            <h2>Nice To Meet You.</h2>
            <p className="ntmy-sub">
              The reality for children suffering from chronic illnesses is a harsh one.
            </p>
            <p>
              Many families simply cannot afford the constant medical care, supervision, and suitable
              environment required for their children&rsquo;s well-being.
            </p>
            <p>
              The road to overcoming these illnesses seems like an uphill battle, filled with daily
              routines of testing, dialysis, and the uncertain waiting game for organ transplants.
            </p>
            <p>
              In 1998, Marang House emerged as a beacon of hope, dedicated to bringing light into the
              lives of South Africa&rsquo;s seriously ill children.
            </p>
          </div>
        </div>
        <Image
          className="ntmy-sun"
          src={cld("v1784193093/maranghouse/mh_element_sun.gif")}
          alt=""
          width={300}
          height={300}
          unoptimized
        />
      </section>

      {/* 5. OUR MISSION */}
      <section className="mission-section">
        <div className="mission-card">
          <BgPhoto
            src={cld("v1784193098/maranghouse/MARANG-1.jpg")}
            alt=""
            className="mission-bg"
          />
          <div className="mission-overlay" />
          <div className="mission-content">
            <p className="mission-eyebrow">our</p>
            <h2>MISSION</h2>
            <div className="mission-divider" />
            <p>Providing a safe and loving home where brave kids can thrive and learn to manage their illness.</p>
          </div>
        </div>
        <Image
          className="mission-sun"
          src={cld("v1784193093/maranghouse/mh_element_sun.gif")}
          alt=""
          width={300}
          height={300}
          unoptimized
        />
      </section>

      {/* 6. MEET THE PEOPLE */}
      <section className="sponsors-section">
        <h2>
          Meet some of the people who
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
              sizes="104px"
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
              sizes="104px"
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
              sizes="104px"
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
          src={cld("v1784193091/maranghouse/mh_element_stars.gif")}
          alt=""
          width={130}
          height={130}
          unoptimized
        />
        <Link href="/lightkeepers" className="btn btn-blue">
          SPONSOR A CHILD TODAY
        </Link>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="testimonials-section">
        <BgPhoto
          src={cld("v1784193102/maranghouse/SmacPix_Marang2.jpg")}
          alt="Children at Marang House"
          className="testi-photo"
          position="center 25%"
        />
        <Image
          className="testi-stars-doodle"
          src={cld("v1784193091/maranghouse/mh_element_stars.gif")}
          alt=""
          width={150}
          height={150}
          unoptimized
        />
        <div className="testi-content">
          <h2>
            See what our sponsors &amp;
            <br />
            volunteers have to say
          </h2>
          <p className="testi-quote">
            &ldquo;Such a humbling experience to know that there places like Marang. I donated some stuff
            and will be making an effort to do so more often.&rdquo;
          </p>
          <p className="testi-name">&ndash; Rosita Gaskin</p>
          <p className="testi-quote">&ldquo;I loved my visit there. The little ones were so much fun to be with❤️❤️❤️❤️&rdquo;</p>
          <p className="testi-name">&ndash; Gugulethu Cele</p>
          <p className="testi-quote">&ldquo;It a good place full of warmth for kids and respect for volunteers.&rdquo;</p>
          <p className="testi-name" style={{ marginBottom: 0 }}>
            &ndash; Malwande Khumalo
          </p>
        </div>
      </section>

      {/* 8. ALL SUPPORT IS WELCOME */}
      <section className="support-section">
        <div className="support-inner">
          <div className="support-text">
            <h2>
              All support is
              <br />
              <strong>Welcome!</strong>
            </h2>
            <p className="support-lead">
              Marang House is funded entirely through the generosity of donors, sponsors, volunteers,
              and corporate partners.
            </p>
            <p>
              Your support helps provide a home away from home for seriously ill children and their
              families, while offering tax-deductible benefits and potential B-BBEE scorecard
              contributions.
            </p>
          </div>
          <div className="support-photo-wrap">
            <BgPhoto
              src={cld("v1784193101/maranghouse/SmacPix_Marang1.jpg")}
              alt="Children at Marang House"
              className="arch-photo support-photo"
              position="center 20%"
            />
            <Image
              className="support-heart"
              src={cld("v1784193088/maranghouse/mh_element_hearts.gif")}
              alt=""
              width={170}
              height={170}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 9. HOW YOU CAN GET INVOLVED */}
      <section className="involved-section">
        <div className="involved-head">
          <h2 className="involved-heading">
            How You Can Get
            <br />
            Involved
          </h2>
          <div className="likes-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>2</span>
          </div>
        </div>
        <div className="involved-grid">
          <div className="involved-card">
            <BgPhoto
              src={cld("v1784193101/maranghouse/SmacPix_Marang1.jpg")}
              alt=""
              className="involved-photo"
              position="center 20%"
            />
            <h3>Volunteer Your Time</h3>
            <p>
              Our volunteer program is the
              <br />
              heartbeat of Marang House.
            </p>
            <Link href="/contact" className="btn btn-blue">
              VOLUNTEER
            </Link>
          </div>
          <div className="involved-card">
            <BgPhoto
              src={cld("v1784193102/maranghouse/SmacPix_Marang2.jpg")}
              alt=""
              className="involved-photo"
              position="center 25%"
            />
            <h3>Sponsor Programme</h3>
            <p>
              Be part of our &ldquo;Monthly Giving Program&rdquo; and bring stability to seriously ill
              children with your generous donation! Together, we make a lasting impact
            </p>
            <Link href="/lightkeepers" className="btn btn-blue">
              SPONSOR A CHILD TODAY
            </Link>
          </div>
          <div className="involved-card">
            <BgPhoto src={cld("v1784193098/maranghouse/MARANG-1.jpg")} alt="" className="involved-photo" />
            <h3>Donate</h3>
            <p>
              We rely on our community
              <br />
              help keep us going.
            </p>
            <Link href="/donate" className="btn btn-blue">
              DONATE
            </Link>
          </div>
        </div>
      </section>

      {/* 10. CREATING A BETTER FUTURE */}
      <Stats />
    </>
  );
}

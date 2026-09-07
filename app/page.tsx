import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import WhatsAppFab from "@/components/WhatsAppFab";
import GardenDayCarousel from "@/components/GardenDayCarousel";
import NewsletterInterestForm from "@/components/NewsletterInterestForm";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import ParallaxBgPhoto from "@/components/motion/ParallaxBgPhoto";
import VerticalCutReveal from "@/components/motion/VerticalCutReveal";
import NumberTicker from "@/components/motion/NumberTicker";
import { cld } from "@/lib/images";
import { DONATION } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — corkboard, bunting, polaroids — UNTOUCHED */}
      <section className="hero">
        <ParallaxBgPhoto
          src={cld("v1788169584/Cork_board_for_Marang.webp")}
          alt=""
          className="hero-photo"
          position="center 30%"
          sizes="100vw"
          priority
          strength={65}
        />
        <Parallax className="hero-flags-wrap" strength={10}>
          <Image
            className="hero-flags"
            src={cld("v1788285379/Flags_For_Marang1.png")}
            alt=""
            width={1537}
            height={864}
            sizes="100vw"
            aria-hidden="true"
          />
        </Parallax>
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
            <VerticalCutReveal text="Fostering Health," />
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
            <a href="#newsletter-interest" className="btn btn-yellow">Subscribe to newsletter</a>
          </div>
        </div>
        <div className="hero-doodads" aria-hidden="true">
          <Parallax className="hero-polaroid-1-wrap" strength={16} rotate={-2}>
            <Image
              className="hero-polaroid-1"
              src={cld("v1788285379/NEW-polaroid-1.2.png")}
              alt=""
              width={1000}
              height={1000}
              priority
              style={{ height: "auto" }}
            />
          </Parallax>
          <Image
            className="hero-polaroid-2"
            src={cld("v1788169586/Polaroid_2_Marang_House.png")}
            alt=""
            width={1000}
            height={1000}
            priority
            style={{ height: "auto" }}
          />
          <Image
            className="hero-sketch"
            src={cld("MH-kids-sketch.png")}
            alt=""
            width={1000}
            height={1000}
            priority
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
              <Link href="/lightkeepers" className="btn lk-signup">Meet the Lightkeepers</Link>
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
          <Parallax className="identity-photo-wrap" strength={10}>
            <Image
              className="identity-doodle"
              src={cld("v1786782369/MH-star-giff.gif")}
              alt=""
              width={200}
              height={200}
              style={{ height: "auto" }}
              unoptimized
              aria-hidden="true"
            />
            <Image
              className="identity-photo"
              src={cld("MH-group-hands.png")}
              alt="Children and caregivers at Marang House waving and celebrating together"
              width={1000}
              height={667}
              style={{ width: "100%", height: "auto" }}
            />
          </Parallax>
        </div>
      </section>

      {/* 4. A DAY AT MARANG HOUSE — replaces the old "Nice To Meet You"
          with a concrete vignette instead of repeating the mission.
          Girl-arch shown as plain cutout image (no card/shadow tile). */}
      <section className="meet-section">
        <Parallax className="meet-doodle" strength={10}>
          <Image
            src={cld("v1786782369/MH-star-giff.gif")}
            alt=""
            width={200}
            height={200}
            style={{ width: "100%", height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
        </Parallax>
        <div className="meet-inner">
          <Parallax className="meet-photo-wrap" strength={10}>
            <Image
              className="meet-photo"
              src={cld("MH-girl-arch.png")}
              alt="A child celebrating with her caregiver at Marang House"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "auto" }}
            />
          </Parallax>
          <div className="meet-text">
            <h2>
              A Day At<br />Marang House.
            </h2>
            <p>
              Morning starts with breakfast around a family table, not a hospital trolley.
              Then it&rsquo;s off to a tertiary hospital for treatment: dialysis, check-ups,
              the daily routines that keep these children alive.
            </p>
            <p>
              By afternoon they&rsquo;re back at Marang House, doing homework at the kitchen
              counter, playing in the garden, being children. That is what makes this place
              different. It is a home, not a ward.
            </p>
          </div>
        </div>
      </section>

      <GardenDayCarousel />

      {/* 5. OUR MISSION — sun rays behind a contained heart-hands photo.
          Previously a full-bleed BgPhoto fill+cover of the 2732x1536
          source cropped into a short section height, cutting off the top
          and bottom hands. A plain <Image> at its own aspect ratio shows
          the whole thing, so the section grows to fit it instead. */}
      <section className="mission-banner">
        <div className="mission-banner-bg" aria-hidden="true" />
        <div className="mission-banner-content">
          <p className="mission-label">OUR</p>
          <h2>MISSION</h2>
          <p>
            To give every child facing chronic illness a stable home, continuous medical care,
            and an education that never stops, so healing and growing happen together.
          </p>
        </div>
        <Reveal className="mission-banner-photo-wrap">
          <Parallax className="mission-banner-photo-scroll" strength={14}>
            <Image
              className="mission-banner-photo"
              src={cld("v1786782371/MH-heart-hands-banner.png")}
              alt="Two pairs of hands forming a heart shape"
              width={2732}
              height={1536}
            />
          </Parallax>
          <Parallax className="mission-love-doodle" strength={8}>
            <Image
              src={cld("MH-love-giff.gif")}
              alt=""
              width={200}
              height={200}
              style={{ width: "100%", height: "auto" }}
              unoptimized
              aria-hidden="true"
            />
          </Parallax>
        </Reveal>
      </section>

      <NewsletterInterestForm />

      {/* 6. TRUSTED BY — social proof, deep navy bg. Plain gradient, no
          rays photo overlay — the Mission section right above this one
          already uses that same rays image, and stacking it here too
          made the two sections read as one long, indistinguishable blue
          block instead of two distinct sections. */}
      <section className="sponsors-section">
        <Parallax className="sponsors-cloud sponsors-cloud--long" strength={18}>
          <Image
            src={cld("v1788471574/MH-Website-long-cloud.png")}
            alt=""
            width={1672}
            height={941}
            style={{ width: "100%", height: "auto" }}
            aria-hidden="true"
          />
        </Parallax>
        <Parallax className="sponsors-cloud sponsors-cloud--small" strength={30}>
          <Image
            src={cld("v1788471578/MH-Website-small-cloud.png")}
            alt=""
            width={1536}
            height={1024}
            style={{ width: "100%", height: "auto" }}
            aria-hidden="true"
          />
        </Parallax>
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
              sizes="126px"
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
              sizes="126px"
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
        <Link href="/lightkeepers" className="btn btn-yellow">
          SPONSOR A CHILD TODAY
        </Link>
        </div>
      </section>

      {/* 7. HOW YOU CAN GET INVOLVED — MERGED from old §7 "All Support Is
          Welcome" + §8 "How You Can Get Involved". Emotional pitch as intro,
          3-card grid as action. Tax/B-BBEE moved to Donate. */}
      <section className="involved-section">
        <ParallaxBgPhoto
          src={cld("MH-Blur-BG.png")}
          alt=""
          className="involved-bg"
          sizes="100vw"
          strength={65}
        />
        <div className="involved-overlay" />
        <Image
          className="involved-badge"
          src={cld("MH-likes-giff.gif")}
          alt=""
          width={200}
          height={200}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="involved-band">
          <h2 className="involved-heading">How You Can Get Involved</h2>
          <p className="involved-lead">
            Marang House is funded entirely through the generosity of donors, sponsors,
            volunteers, and corporate partners. Your support helps provide a home away
            from home for seriously ill children and their families.
          </p>
          <div className="involved-grid">
            <Reveal as="div" className="involved-card" delay={0}>
              <Image className="involved-icon" src={cld("MH-involvment-icons-1.png")} alt="" width={1000} height={1000} />
              <h3>VOLUNTEER</h3>
              <p>
                Our volunteer program is the heartbeat of Marang House. Help with homework,
                cook a meal, or simply be a friendly face after a long day at hospital.
              </p>
              <Link href="/contact" className="btn btn-blue">
                VOLUNTEER
              </Link>
            </Reveal>
            <Reveal as="div" className="involved-card" delay={0.08}>
              <Image className="involved-icon" src={cld("MH-involvment-icons-2.png")} alt="" width={1000} height={1000} />
              <h3>LIGHTKEEPER</h3>
              <p>
                Join the Circle of Light as a monthly donor. Your recurring gift brings
                stability and security to children who need it most.
              </p>
              <a href={DONATION.primary.url} className="btn btn-blue" target="_blank" rel="noopener noreferrer">
                {DONATION.primary.label}
              </a>
            </Reveal>
            <Reveal as="div" className="involved-card" delay={0.16}>
              <Image className="involved-icon" src={cld("MH-involvment-icons-3.png")} alt="" width={1000} height={1000} />
              <h3>DONATE</h3>
              <p>
                Make a once-off contribution via bank transfer or BackaBuddy. Every
                rand goes directly to the children in our care.
              </p>
              <Link href="/donate" className="btn btn-blue">
                DONATE
              </Link>
            </Reveal>
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
              <div className="stat-num"><NumberTicker value={28} suffix="+" /></div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-item">
              <div className="stat-num"><NumberTicker value={300} suffix="+" /></div>
              <div className="stat-label">Children</div>
            </div>
            <div className="stat-item">
              <div className="stat-num"><NumberTicker value={1000} suffix="+" /></div>
              <div className="stat-label">Volunteers</div>
            </div>
          </div>
        </div>
        <Parallax className="stats-skip-gif" strength={12}>
          <Image
            src={cld("MH-skipping-giff.gif")}
            alt=""
            width={300}
            height={300}
            style={{ width: "100%", height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
        </Parallax>
      </section>

    </>
  );
}

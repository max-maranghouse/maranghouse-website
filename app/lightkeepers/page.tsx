import type { Metadata } from "next";
import Image from "next/image";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";
import { DONATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "The Lightkeepers",
  description:
    "The Lightkeepers are a community of monthly donors who keep the lights on at Marang House. Join the Circle of Light via BackaBuddy.",
};

export default function LightkeepersPage() {
  return (
    <>
      {/* 1. HERO — lighthouse banner, kept from original */}
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
            <div className="lk-hero-overlay">
              <h1>The Lightkeepers</h1>
              <p>Become a lightkeeper, join Marang&rsquo;s circle of light!</p>
              <a href={DONATION.primary.url} className="btn lk-hero-overlay-cta" target="_blank" rel="noopener noreferrer">
                DONATE VIA BACKABUDDY
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 2. WHAT IS A LIGHTKEEPER? — explains the concept with a photo */}
      <section className="lk-what">
        <div className="lk-what-inner">
          <div className="lk-what-text">
            <h2>What Is A Lightkeeper?</h2>
            <p>
              A Lightkeeper is more than a donor. A Lightkeeper is part of the family.
            </p>
            <p>
              The <strong>Marang House Circle of Light</strong> is a community of people who
              give monthly — not because they were asked once, but because they chose to stay.
              They are the quiet, steady light that keeps Marang House standing.
            </p>
            <p>
              When a child arrives at Marang House, often frightened and far from home,
              it is the Lightkeepers who have already made the bed, stocked the kitchen,
              and kept the electricity on. That child will never know your name — but
              they will feel your presence every single day.
            </p>
          </div>
          <div className="lk-what-photo-wrap">
            <BgPhoto
              src={cld("v1784193094/maranghouse/424483000_363605573122900_9062681933234070373_n.jpg")}
              alt="Children and caregivers sharing a moment at Marang House"
              className="lk-what-photo"
              position="center center"
              sizes="(max-width: 860px) 90vw, 44vw"
            />
          </div>
        </div>
      </section>

      {/* 3. WHAT YOUR GIFT PROVIDES — concrete impact, orange rays bg, navy tiles */}
      <section className="lk-impact">
        <Image
          className="lk-impact-doodle"
          src={cld("v1786782364/MH-shun-giff.gif")}
          alt=""
          width={300}
          height={300}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="lk-impact-inner">
          <h2>What Your Monthly Gift Provides</h2>
          <p className="lk-impact-lead">
            Every rand goes directly to keeping Marang House running for the children
            who call it home. Here is what monthly giving makes possible:
          </p>
          <div className="lk-impact-grid">
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">🏥</span>
              <h3>Daily Hospital Transport</h3>
              <p>
                Every child at Marang House attends a tertiary hospital for treatment — some daily.
                Your gift keeps the transport running so no appointment is ever missed.
              </p>
            </div>
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">🍽️</span>
              <h3>Warm, Nutritious Meals</h3>
              <p>
                Chronically ill children need proper nutrition to heal. Three meals a day,
                every day, prepared with care in a home kitchen — not a hospital canteen.
              </p>
            </div>
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">📚</span>
              <h3>Education That Continues</h3>
              <p>
                Illness should not end a child&rsquo;s education. Marang House ensures
                schooling runs alongside treatment, so children don&rsquo;t fall behind.
              </p>
            </div>
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">🛏️</span>
              <h3>A Safe Bed Every Night</h3>
              <p>
                Electricity, clean linen, warm blankets, a bedroom that feels like home.
                These basics are what monthly giving keeps secure.
              </p>
            </div>
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">👟</span>
              <h3>School Uniforms &amp; Shoes</h3>
              <p>
                A child in school uniform feels normal — not like a patient.
                Your gift restores a sense of everyday childhood.
              </p>
            </div>
            <div className="lk-impact-item">
              <span className="lk-impact-icon" aria-hidden="true">💛</span>
              <h3>People Who Care</h3>
              <p>
                Matron Salome and the team are here around the clock. Your monthly gift
                makes it possible to keep skilled, loving caregivers at the house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY MONTHLY? — deep navy bg, Salome pull-quote in orange card */}
      <section className="lk-why">
        <Image
          className="lk-why-doodle"
          src={cld("v1786782369/MH-star-giff.gif")}
          alt=""
          width={480}
          height={480}
          style={{ height: "auto" }}
          unoptimized
          aria-hidden="true"
        />
        <div className="lk-why-inner">
          <div className="lk-why-text">
            <h2>Why Monthly?</h2>
            <p>
              The children at Marang House don&rsquo;t stay for days — they stay for months,
              sometimes years. Their treatment is long-term. Their need for a safe home is
              constant. A one-off donation is a gift. A monthly donation is a promise.
            </p>
            <p>
              Monthly giving lets Marang House plan ahead: buy food in bulk, keep the lights
              on through winter, pay caregivers a stable salary, and never have to tell a child
              there&rsquo;s no room.
            </p>
          </div>
          <blockquote className="lk-why-quote">
            <p>
              &ldquo;Security isn&rsquo;t created in a single day. It is built every single month.
              Because when children know they are safe, healing can begin.&rdquo;
            </p>
            <cite>— Salome, Matron of Marang House</cite>
          </blockquote>
        </div>
      </section>

      {/* 5. CTA — prominent BackaBuddy link */}
      <section className="lk-cta">
        <div className="lk-cta-inner">
          <Image
            className="lk-cta-keychain"
            src={cld("MH-lighthouse-keychain.png")}
            alt="Lightkeeper enamel keyring badge"
            width={1000}
            height={1000}
            style={{ height: "auto" }}
          />
          <div className="lk-cta-text">
            <h2>Join The Circle of Light</h2>
            <p>
              Become a Lightkeeper today. Your monthly gift — no matter the amount — keeps
              the light of home, joy, and love shining for children who need it most.
            </p>
            <p className="lk-cta-tagline">
              One Home &middot; One Circle &middot; <span>A Thousand Lightkeepers</span> &middot; Endless Hope
            </p>
            <a
              href={DONATION.primary.url}
              className="btn btn-lk-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Lightkeeper
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

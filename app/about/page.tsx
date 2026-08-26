import type { Metadata } from "next";
import Image from "next/image";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Marang House provides a nurturing home for children aged 7 to 14 living with chronic illnesses, ensuring their medical care and education go hand in hand.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-navy">
        <div className="about-navy-left">
          <h1>
            We are
            <span>Marang House</span>
          </h1>
          <ul className="about-navy-list">
            <li>A nurturing, home-like environment</li>
            <li>Children aged 7 to 14</li>
            <li>Support to manage their illnesses long-term</li>
          </ul>
          <p>
            They face serious, chronic health conditions that require continuous monitoring and
            specialised treatment at a tertiary hospital.
          </p>
          <p className="about-navy-important">Importantly:</p>
          <p className="about-navy-italic">
            We keep their education a priority — taking them to hospital daily for treatment, with
            disease-management training running alongside their regular schooling.
          </p>
        </div>
        <div className="about-navy-photo-wrap">
          {/* v1786782366/MH-Group-kids.jpg — replaces the old MH-kid-pirate.png
              cutout. Landscape group shot, so cropped with a slight upward
              bias (center 35%) to favour faces/branded t-shirts over the
              gravel foreground, per the wider .about-navy-photo split above. */}
          <BgPhoto
            src={cld("v1786782366/MH-Group-kids.jpg")}
            alt="Children at Marang House wearing Marang House t-shirts"
            className="about-navy-photo"
            position="center 35%"
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      <section className="about-whatwedo">
        <Image
          className="about-whatwedo-cloud"
          src={cld("MH-cloud-giff.gif")}
          alt=""
          width={1000}
          height={1000}
          style={{ height: "auto" }}
          aria-hidden="true"
          unoptimized
        />
        <h2>What We Do:</h2>
        <div className="about-whatwedo-grid">
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
      </section>

      <section className="about-ntmy">
        <BgPhoto
          src={cld("v1787612209/MH_-_Website_-about_us_-_kid_hat.webp")}
          alt="A child at Marang House"
          className="about-ntmy-photo"
          sizes="(max-width: 900px) 90vw, 42vw"
        />
        <div className="about-ntmy-text">
          <h2>Nice To Meet You.</h2>
          <p className="about-ntmy-lead">
            The reality for children suffering from chronic illnesses is a harsh one.
          </p>
          <p>
            Many families simply cannot afford the constant medical care, supervision, and suitable
            environment required for their children&apos;s well-being.
          </p>
          <p>
            The road to overcoming these illnesses seems like an uphill battle, filled with daily routines
            of testing, dialysis, and the uncertain waiting game for organ transplants.
          </p>
          {/* Founder + name meaning verified against en.wikipedia.org/wiki/Marang_House
              and iol.co.za's 2023 Saturday Star profile before adding —
              Dr Pieter Ernst founded the home in 1998; "Marang" is Setswana
              for a ray of sunshine, which is why the sun motif runs through
              the branding (logo, "Circle of Light", Lightkeepers). */}
          <p>
            In 1998, Dr Pieter Ernst founded Marang House as a beacon of hope for South Africa&apos;s
            seriously ill children. Marang is the Setswana word for a ray of sunshine — the light we try
            to bring into the life of every child who walks through our doors.
          </p>
        </div>
      </section>

    </>
  );
}

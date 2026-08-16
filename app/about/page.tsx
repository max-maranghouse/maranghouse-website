import type { Metadata } from "next";
import Image from "next/image";
import BgPhoto from "@/components/BgPhoto";
import Stats from "@/components/sections/Stats";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Marang House provides a nurturing home for children aged 4 to 14 living with chronic illnesses, ensuring their medical care and education go hand in hand.",
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
            <li>Provide a nurturing home environment</li>
            <li>Children between the ages of 4 and 14</li>
            <li>Learning to manage their illnesses</li>
          </ul>
          <p>
            They face serious health conditions that demand continuous monitoring and specialized
            treatments at a tertiary hospital.
          </p>
          <p className="about-navy-important">Importantly:</p>
          <p className="about-navy-italic">
            We ensure that their education remains a priority by taking them to the hospital daily, where
            they receive disease management training alongside traditional schooling
          </p>
        </div>
        <BgPhoto
          src={cld("MH-kid-pirate.png")}
          alt="A child at Marang House"
          className="about-navy-photo"
        />
      </section>

      <section className="about-whatwedo">
        <Image
          className="about-whatwedo-rays"
          src={cld("MH-Ray.gif")}
          alt=""
          width={800}
          height={800}
          style={{ height: "auto" }}
          aria-hidden="true"
          unoptimized
        />
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
          src={cld("MH-kid-group.png")}
          alt="A grandmother and children at Marang House"
          className="about-ntmy-photo"
          sizes="260px"
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
          <p>
            In 1998, Marang House emerged as a beacon of hope, dedicated to bringing light into the lives
            of South Africa&apos;s seriously ill children.
          </p>
        </div>
      </section>

      <Stats variant="about" />
    </>
  );
}

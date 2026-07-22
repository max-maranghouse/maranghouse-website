import type { Metadata } from "next";
import Image from "next/image";
import BgPhoto from "@/components/BgPhoto";
import Stats from "@/components/sections/Stats";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Marang House provides a nurturing home for children aged 7 to 14 living with chronic illnesses, ensuring their medical care and education go hand in hand.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-intro">
        <div className="about-intro-left">
          <h1>
            We&apos;re Marang House<span>.</span>
          </h1>
          <p>
            We provide a nurturing home environment for children between the ages of 7 and 14,
            empowering them to learn and manage their illnesses. They face serious health conditions
            that demand continuous monitoring and specialised treatments at a tertiary hospital.
          </p>
          <p>
            Importantly, we ensure that their education remains a priority by taking them to the
            hospital daily, where they receive disease management training alongside traditional
            schooling.
          </p>
          <p style={{ fontWeight: 800, marginTop: "22px" }}>What we do:</p>
          <div className="cards-row" style={{ marginTop: "8px" }}>
            <Image
              src={cld("v1784193087/maranghouse/mh_element_3.png")}
              alt="Accommodate 12 children at a time"
              width={150}
              height={150}
            />
            <Image
              src={cld("v1784193084/maranghouse/mh_element_1.png")}
              alt="Offer the necessities"
              width={150}
              height={150}
            />
            <Image
              src={cld("v1784193086/maranghouse/mh_element_2.png")}
              alt="Round-the-clock medical care"
              width={150}
              height={150}
            />
          </div>
        </div>
        <BgPhoto
          src={cld("v1784193095/maranghouse/424572362_392057836643691_8244405606096808142_n.jpg")}
          alt="A child at Marang House"
          className="about-intro-photo"
        />
      </section>

      <section className="about-ntmy">
        <BgPhoto
          src={cld("v1784193098/maranghouse/MARANG-1.jpg")}
          alt="Marang House building"
          className="about-ntmy-photo"
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
            The road to overcoming these illnesses seems like an uphill battle, filled with daily
            routines of testing, dialysis, and the uncertain waiting game for organ transplants.
          </p>
          <p>
            In 1998, Marang House emerged as a beacon of hope, dedicated to bringing light into the
            lives of South Africa&apos;s seriously ill children.
          </p>
        </div>
      </section>

      <Stats variant="about" />
    </>
  );
}

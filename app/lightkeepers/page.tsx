import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Lightkeepers",
  description:
    "The Lightkeepers are a community of monthly donors, sponsors, and champions who keep the lights on at Marang House. Join the Circle of Light.",
};

const PEOPLE = [
  {
    role: "Professional Road Cyclist",
    name: "Daryl Impey",
    photo: cld("v1784193096/maranghouse/Daryl_and_David1.jpg"),
  },
  { role: "Mrs Universe", name: "Monique Weyers", placeholder: "MW" },
  {
    role: "Pirates Running Club",
    name: "Johannesburg",
    photo: cld("v1784193104/maranghouse/pirates_helpers.jpg"),
  },
  { role: "JHB Junior Council", name: "Youth Volunteers", placeholder: "JJC" },
  {
    role: "Chef & Personality",
    name: "David Higgs",
    photo: cld("v1784193097/maranghouse/Daryl_and_David2.jpg"),
    position: "right center",
  },
  { role: "Miss Earth SA 2019", name: "Nazia Wadee", placeholder: "NW" },
  { role: "Reach For A Dream", name: "Foundation", placeholder: "RD" },
  { role: "PCI Carpets", name: "Corporate Sponsor", placeholder: "PCI" },
] as const;

export default function LightkeepersPage() {
  return (
    <>
      <section className="lk-hero">
        <BgPhoto
          src={cld("v1784193104/maranghouse/pirates_helpers.jpg")}
          alt=""
          className="lk-hero-bg"
          position="center 30%"
          sizes="100vw"
          priority
        />
        <div className="lk-hero-overlay" />
        <div className="lk-hero-content">
          <p className="eyebrow">The Marang Circle of Light</p>
          <h1>The Lightkeepers</h1>
          <p>
            A community of supporters, sponsors, and champions who give monthly to keep the lights on
            at Marang House.
          </p>
        </div>
        <Image
          className="lk-hero-pin"
          src={cld("v1784193082/maranghouse/Marang_House_Website_Element.png")}
          alt="Lightkeeper badge"
          width={190}
          height={190}
        />
      </section>

      <section className="lk-gold">
        <h2>
          Join The Circle Of Light,
          <br />
          Become A Lightkeeper Today.
        </h2>
        <Link href="/donate" className="btn btn-blue">
          JOIN THE CIRCLE
        </Link>
      </section>

      <section className="lk-people">
        <div className="lk-people-grid">
          {PEOPLE.map((person) => (
            <div className="lk-person" key={person.name}>
              {"photo" in person ? (
                <BgPhoto
                  src={person.photo}
                  alt={person.name}
                  className="lk-person-photo"
                  position={"position" in person ? person.position : undefined}
                  sizes="130px"
                />
              ) : (
                <div className="lk-person-photo placeholder">{person.placeholder}</div>
              )}
              <div className="lk-person-role">{person.role}</div>
              <div className="lk-person-name">{person.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

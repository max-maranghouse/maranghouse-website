import Image from "next/image";
import { cld } from "@/lib/images";

type Partner = {
  name: string;
  src: string;
  alt: string;
};

/**
 * The seven organization logos that used to share SupportersSection's grid
 * with the four named people — split out here by MH-012 so the people
 * gallery reads as people and this reads as businesses/foundations.
 */
const PARTNERS: Partner[] = [
  {
    name: "Pirates Running Club",
    src: cld("v1788812598/Pirates_Road_Running.png"),
    alt: "Pirates Road Running logo",
  },
  {
    name: "Reach For A Dream",
    src: cld("Reach_For_A_Dream.png"),
    alt: "Reach For A Dream logo",
  },
  {
    name: "PCI Carpets",
    src: cld("PCI_Carpets.png"),
    alt: "PCI Carpets logo",
  },
  {
    name: "JHB Junior Council",
    src: cld("v1788812597/7.png"),
    alt: "JHB Junior Council emblem",
  },
  {
    name: "Nelson Mandela Children's Hospital",
    src: cld("v1788812595/Nelson_Mandela_s_Children_Hospital.png"),
    alt: "Nelson Mandela Children's Hospital logo",
  },
  {
    name: "Charlotte Maxeke Hospital",
    src: cld("v1788812595/Charlotte_Maxeke_Hospital.png"),
    alt: "Charlotte Maxeke Johannesburg Academic Hospital logo",
  },
  {
    name: "University of Johannesburg",
    src: cld("v1788812594/University_of_Johannesburg.png"),
    alt: "University of Johannesburg logo",
  },
];

/**
 * A single moving line of partner logos, each labelled with its name — a
 * plain server component, no client JS. The row is duplicated once for a
 * seamless CSS marquee loop; the duplicate is hidden from the
 * accessibility tree so screen readers only ever see each logo once.
 * `prefers-reduced-motion` swaps the animation for a single static,
 * horizontally scrollable row.
 */
export default function PartnersCarousel() {
  return (
    <section className="partners-section">
      <div className="partners-section-inner">
        <h2>Our Partners</h2>
        <p className="partners-sub">
          Businesses and fellow foundations have given their time and support to help us make a
          difference in children&apos;s lives.
        </p>
      </div>
      {/* Full section width (not the text column's max-width above), so the
          edge fade-mask below sits at the screen edges instead of leaving
          empty side margins around a narrower centred track. */}
      <div className="partners-track-viewport">
        <div className="partners-track">
          <ul className="partners-group">
            {PARTNERS.map((partner) => (
              <li className="partner-item" key={partner.name}>
                <div className="partner-logo">
                  <Image src={partner.src} alt={partner.alt} fill sizes="220px" style={{ objectFit: "contain" }} />
                </div>
                <div className="partner-name">{partner.name}</div>
              </li>
            ))}
          </ul>
          <ul className="partners-group" aria-hidden="true">
            {PARTNERS.map((partner) => (
              <li className="partner-item" key={`${partner.name}-dup`}>
                <div className="partner-logo">
                  <Image src={partner.src} alt="" fill sizes="220px" style={{ objectFit: "contain" }} />
                </div>
                <div className="partner-name">{partner.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

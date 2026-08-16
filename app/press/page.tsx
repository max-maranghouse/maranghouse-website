import type { Metadata } from "next";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "Press",
  description: "Marang House in the news — media coverage, awards, and milestones.",
};

// Headlines/dates/links here are placeholders, not verified press mentions.
// The Canva mockup's three items (Business Day "breaks ground on 200-unit
// Gauteng development", Property24, Mail & Guardian) describe a property
// developer, which doesn't match a 12-child chronic-illness care home — Max's
// read is the sourcing is wrong rather than the section being fabricated
// outright, and he'll supply the real coverage later. Kept as a single array
// so swapping in confirmed headlines/dates/links is a one-place edit.
const PRESS_CARDS = [
  {
    source: "Business Day",
    title: "[Headline TBC — Marang House press coverage]",
    date: "Date TBC",
    photo: cld("MH-kid-pirate.png"),
  },
  {
    source: "702",
    title: "[Headline TBC — Marang House press coverage]",
    date: "Date TBC",
    photo: cld("MH-Little-boy.jpeg"),
    position: "center 20%",
  },
  {
    source: "Mail & Guardian",
    title: "[Headline TBC — Marang House press coverage]",
    date: "Date TBC",
    photo: cld("MH-kid-group.png"),
  },
] as const;

export default function PressPage() {
  return (
    <>
      <section className="press-hero">
        <BgPhoto
          src={cld("MH-news-banner.png")}
          alt=""
          className="press-hero-bg"
          position="center 30%"
          sizes="100vw"
          priority
        />
        <div className="press-hero-overlay" />
        <div className="press-hero-content">
          <h1>
            Marang House
            <span>In The News</span>
          </h1>
          <p>
            Explore our latest media coverage, awards, and milestones as we care for South Africa&apos;s
            seriously ill children.
          </p>
        </div>
      </section>

      <div className="press-ribbon">PRESS &amp; MEDIA</div>

      <section className="press-featured">
        <h2>Featured Coverage</h2>
        <div className="press-cards">
          {PRESS_CARDS.map((card) => (
            <div className="press-card" key={card.source}>
              <BgPhoto
                src={card.photo}
                alt=""
                className="press-card-photo"
                position={"position" in card ? card.position : undefined}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="press-card-body">
                <div className="press-card-source">{card.source}</div>
                <div className="press-card-title">{card.title}</div>
                <div className="press-card-date">{card.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="press-enquiries">
        <h2>Media Enquiries</h2>
        <p>
          For press kits, interviews, or media partnerships, get in touch with our communications team at{" "}
          <a href="mailto:info@maranghouse.org">info@maranghouse.org</a>
        </p>
        <Link href="/contact" className="btn btn-red">
          CONTACT US
        </Link>
      </section>
    </>
  );
}

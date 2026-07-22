import type { Metadata } from "next";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "Press",
  description: "Marang House in the news — media coverage, awards, and milestones.",
};

const PRESS_CARDS = [
  {
    source: "Business Day",
    title: "Marang House marks 25 years of fostering health and hope",
    date: "12 March 2026",
    photo: cld("v1784193101/maranghouse/SmacPix_Marang1.jpg"),
  },
  {
    source: "702",
    title: "Inside Marang House: a home away from home for chronically ill children",
    date: "28 January 2026",
    photo: cld("v1784193100/maranghouse/Marang_House_SM_posts_may_8.jpg"),
    position: "center top",
  },
  {
    source: "Mail & Guardian",
    title: "The Lightkeepers: how monthly giving keeps Marang House shining",
    date: "5 November 2025",
    photo: cld("v1784193104/maranghouse/pirates_helpers.jpg"),
  },
] as const;

export default function PressPage() {
  return (
    <>
      <section className="press-hero">
        <p className="eyebrow">Press &amp; Media</p>
        <h1>Marang House in the News</h1>
        <p>
          Explore our latest media coverage, awards, and milestones as we care for South Africa&apos;s
          seriously ill children.
        </p>
      </section>

      <section className="press-featured">
        <h2>Featured Coverage</h2>
        <div className="press-cards">
          {PRESS_CARDS.map((card) => (
            <div className="press-card" key={card.title}>
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
          For press kits, interviews, or media partnerships, get in touch with our communications team
          at <a href="mailto:info@maranghouse.org">info@maranghouse.org</a>
        </p>
        <Link href="/contact" className="btn btn-red">
          CONTACT US
        </Link>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import Parallax from "@/components/motion/Parallax";
import { cld } from "@/lib/images";

type Supporter = {
  name: string;
  role?: string;
  src: string;
  alt: string;
  position?: string;
};

/**
 * The four named individuals only. Partner organization logos live in
 * PartnersCarousel's PARTNERS list — MH-012 split the two apart so this
 * gallery reads as people, not a mix of faces and business marks.
 */
const SUPPORTERS: Supporter[] = [
  {
    name: "Daryl Impey",
    role: "Professional Road Cyclist",
    src: cld("Daryl_Impey.jpg"),
    alt: "Daryl Impey",
  },
  {
    name: "David Higgs",
    role: "Chef & Personality",
    src: cld("David_Higgs.jpg"),
    alt: "David Higgs",
  },
  {
    name: "Monique Weyers",
    role: "Mrs Universe",
    src: cld("Monique_Weyers.jpg"),
    alt: "Monique Weyers",
  },
  {
    name: "Nazia Wadee",
    role: "Miss Earth 2019",
    src: cld("Nazia_Wadee.jpg"),
    alt: "Nazia Wadee",
  },
];

type SupportersSectionProps = {
  /**
   * Home links onward to /lightkeepers from here; Lightkeepers itself
   * already ends on its own BackaBuddy CTA (.lk-cta) right after this
   * section, so it omits this self-link to avoid a redundant same-page CTA.
   */
  showCta?: boolean;
};

export default function SupportersSection({ showCta = true }: SupportersSectionProps) {
  return (
    <section className="supporters-section">
      <Parallax className="supporters-cloud supporters-cloud--long" strength={30}>
        <Image
          src={cld("v1788471574/MH-Website-long-cloud.png")}
          alt=""
          width={1672}
          height={941}
          style={{ width: "100%", height: "auto" }}
          aria-hidden="true"
        />
      </Parallax>
      <Parallax className="supporters-cloud supporters-cloud--small" strength={48}>
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
        className="supporters-sun"
        src={cld("v1786782364/MH-shun-giff.gif")}
        alt=""
        width={300}
        height={300}
        style={{ height: "auto" }}
        unoptimized
        aria-hidden="true"
      />
      <div className="supporters-section-inner">
        <h2>
          The people who help us
          <br />
          transform lives
        </h2>
        <div className="supporters-grid">
          {SUPPORTERS.map((supporter) => (
            <div className="supporter-item" key={supporter.name}>
              <BgPhoto
                src={supporter.src}
                alt={supporter.alt}
                className="supporter-avatar"
                position={supporter.position ?? "center"}
                sizes="126px"
              />
              <div className="supporter-name">
                {supporter.role ? (
                  <>
                    {supporter.role}
                    <span>{supporter.name}</span>
                  </>
                ) : (
                  supporter.name
                )}
              </div>
            </div>
          ))}
        </div>
        {showCta && (
          <Link href="/lightkeepers" className="btn btn-yellow">
            SPONSOR A CHILD TODAY
          </Link>
        )}
      </div>
    </section>
  );
}

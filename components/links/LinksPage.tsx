import Image from "next/image";
import Link from "next/link";
import ConsentBanner from "@/components/ConsentBanner";
import LinksCookiePreferencesButton from "@/components/links/LinksCookiePreferencesButton";
import { cld } from "@/lib/images";
import { LINKS_PAGE, ORGANISATION } from "@/lib/site-data";

export default function LinksPage() {
  return (
    <div className="links-page">
      <div className="links-page__card">
        <Image
          className="links-page__logo"
          src={cld("v1784193083/maranghouse/marang_house_logo_sm.png")}
          alt={`${ORGANISATION.name} logo`}
          width={72}
          height={72}
        />
        <h1 className="links-page__title">{LINKS_PAGE.title}</h1>
        <p className="links-page__tagline">{LINKS_PAGE.tagline}</p>

        <ul className="links-page__list">
          {LINKS_PAGE.items.map((item, index) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  className="links-page__action"
                  data-variant={index === 0 ? "primary" : "secondary"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="links-page__action"
                  data-variant={index === 0 ? "primary" : "secondary"}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <ConsentBanner presentation="links" />
        <LinksCookiePreferencesButton />
      </div>
    </div>
  );
}

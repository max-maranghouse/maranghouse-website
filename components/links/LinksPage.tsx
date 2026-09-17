import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import ConsentBanner from "@/components/ConsentBanner";
import LinksCookiePreferencesButton from "@/components/links/LinksCookiePreferencesButton";
import { BackaBuddyIcon, DonateIcon, FacebookIcon, InstagramIcon } from "@/components/links/icons";
import { cld } from "@/lib/images";
import { LINKS_PAGE, ORGANISATION, type LinksPageItemId } from "@/lib/site-data";

const ICONS: Record<LinksPageItemId, ComponentType<{ className?: string }>> = {
  backabuddy: BackaBuddyIcon,
  donate: DonateIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

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

        <Image
          className="links-page__sun"
          src={cld("v1786782364/MH-shun-giff.gif")}
          alt=""
          width={140}
          height={140}
          unoptimized
          priority
          aria-hidden="true"
        />

        <ul className="links-page__list">
          {LINKS_PAGE.items.map((item, index) => {
            const Icon = ICONS[item.id];
            return (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    className="links-page__action"
                    data-variant={index === 0 ? "primary" : "secondary"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="links-page__action-icon" />
                    <span>{item.label}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="links-page__action"
                    data-variant={index === 0 ? "primary" : "secondary"}
                  >
                    <Icon className="links-page__action-icon" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <ConsentBanner presentation="links" />
        <LinksCookiePreferencesButton />
      </div>
    </div>
  );
}

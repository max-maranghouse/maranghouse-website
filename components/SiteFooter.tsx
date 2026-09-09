import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { DONATION, ORGANISATION, SITE_NAVIGATION } from "@/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__name">
            {ORGANISATION.name}
          </Link>
          <p>{ORGANISATION.tagline}</p>
          <ButtonLink
            href={DONATION.primary.url}
            variant="light"
            size="small"
            target="_blank"
            rel="noopener noreferrer"
          >
            {DONATION.primary.label}
          </ButtonLink>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>
            {SITE_NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <h2>Contact</h2>
          <address>
            <a href={ORGANISATION.phone.href}>{ORGANISATION.phone.display}</a>
            <a href={`mailto:${ORGANISATION.email}`}>{ORGANISATION.email}</a>
            <span>{ORGANISATION.address.formatted}</span>
          </address>
        </div>
      </Container>

      <Container className="site-footer__legal" size="wide">
        <p>© {new Date().getFullYear()} {ORGANISATION.name}</p>
        <p>
          NPC {ORGANISATION.registrations.npc} · NPO {ORGANISATION.registrations.npo} · PBO{" "}
          {ORGANISATION.registrations.pbo}
        </p>
        <nav className="site-footer__legal-links" aria-label="Legal">
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy &amp; POPIA Notice</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie Notice</Link>
            </li>
            <li>
              <CookiePreferencesButton />
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

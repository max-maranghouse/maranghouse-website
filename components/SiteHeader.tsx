"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cld } from "@/lib/images";
import { DONATION, ORGANISATION, SITE_NAVIGATION } from "@/lib/site-data";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <Link
          href="/"
          className="site-brand"
          aria-label={`${ORGANISATION.name} home`}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="site-brand__mark" aria-hidden="true">
            <Image
              src={cld("v1784193083/maranghouse/marang_house_logo_sm.png")}
              alt=""
              width={64}
              height={64}
            />
          </span>
          <span className="site-brand__text">
            <strong>{ORGANISATION.name}</strong>
            <small>Fostering health. Providing hope.</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul>
            {SITE_NAVIGATION.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ButtonLink
            href={DONATION.primary.url}
            size="small"
            target="_blank"
            rel="noopener noreferrer"
          >
            {DONATION.primary.label}
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
      >
        <Container size="wide">
          <ul>
            {SITE_NAVIGATION.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink
            href={DONATION.primary.url}
            className="mobile-nav__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            {DONATION.primary.label}
          </ButtonLink>
        </Container>
      </nav>
    </header>
  );
}

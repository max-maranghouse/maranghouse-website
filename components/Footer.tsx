import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/nav-items";

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="footer-logo">{SITE.name}</div>
        <div>{SITE.npcReg}</div>
      </div>
      <div className="footer-links">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div style={{ textAlign: "right" }}>
        <div>
          <a href={SITE.phoneHref} style={{ color: "inherit", textDecoration: "none" }}>
            📞 {SITE.phone}
          </a>
        </div>
        <div style={{ marginTop: "4px" }}>
          <a href={`mailto:${SITE.email}`} style={{ color: "inherit", textDecoration: "none" }}>
            ✉ {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

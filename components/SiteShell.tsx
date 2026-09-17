"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClickLightEffect from "@/components/motion/ClickLightEffect";

// `/links` is a QR-first focused landing page: it must skip the normal
// header/footer/click-light chrome while every other route keeps it exactly
// as before. This is the one shared-shell exception MH-017 introduces — kept
// to an exact pathname match so it can never silently widen to other routes.
const CHROMELESS_ROUTES = new Set(["/links"]);

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChromeless = CHROMELESS_ROUTES.has(pathname);

  if (isChromeless) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <ClickLightEffect />
    </>
  );
}

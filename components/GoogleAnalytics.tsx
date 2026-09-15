"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_UPDATED_EVENT,
  readConsent,
  type ConsentChoice,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

const GOOGLE_TAG_ID_PATTERN = /^G-[A-Z0-9]+$/i;

/**
 * Loads GA4 only after the visitor has opted in to Analytics cookies.
 *
 * The Measurement ID is public by design, but is supplied at build time from
 * Vercel rather than committed to the repository. With no ID, this component
 * renders nothing and no Google endpoint is contacted.
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);
  const previousConsent = useRef<boolean | null>(null);

  useEffect(() => {
    function updateConsent(event?: Event) {
      const choice = event instanceof CustomEvent ? (event.detail as ConsentChoice) : readConsent();
      setHasAnalyticsConsent(choice?.analytics === true);
    }

    updateConsent();
    window.addEventListener(CONSENT_UPDATED_EVENT, updateConsent);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, updateConsent);
  }, []);

  useEffect(() => {
    if (!hasAnalyticsConsent) {
      // A visitor can withdraw consent from the footer. Deny storage before
      // reloading into the no-script state, so no subsequent event is queued.
      if (previousConsent.current === true) {
        window.gtag?.("consent", "update", { analytics_storage: "denied" });
        window.location.reload();
      }
      previousConsent.current = false;
      return;
    }

    previousConsent.current = true;
    if (!GOOGLE_TAG_ID_PATTERN.test(measurementId)) return;

    const existingTag = document.querySelector<HTMLScriptElement>(
      `script[data-ga4-measurement-id="${measurementId}"]`,
    );
    if (existingTag) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
    // Consent is granted before the tag is fetched. This preserves the site's
    // strict no-Google-request-before-consent policy while still making a
    // later withdrawal explicit to Google.
    window.gtag("consent", "default", { analytics_storage: "granted" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.ga4MeasurementId = measurementId;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      window.gtag?.("config", measurementId, { send_page_view: false });
    });
    document.head.appendChild(script);
  }, [hasAnalyticsConsent, measurementId]);

  useEffect(() => {
    if (!hasAnalyticsConsent) return;

    const tag = document.querySelector<HTMLScriptElement>(
      `script[data-ga4-measurement-id="${measurementId}"]`,
    );
    if (!tag) return;

    function trackPageView() {
      window.gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title,
        send_to: measurementId,
      });
    }

    if (tag.dataset.loaded === "true") {
      trackPageView();
      return;
    }

    tag.addEventListener("load", trackPageView, { once: true });
    return () => tag.removeEventListener("load", trackPageView);
  }, [hasAnalyticsConsent, measurementId, pathname]);

  return null;
}

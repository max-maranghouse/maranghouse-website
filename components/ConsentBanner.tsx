"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  OPEN_CONSENT_PREFERENCES_EVENT,
  hasValidConsentServerSnapshot,
  hasValidConsentSnapshot,
  readConsent,
  subscribeToConsentChanges,
  writeConsent,
} from "@/lib/consent";

type ConsentBannerProps = {
  /**
   * `site` (default) is the fixed bottom bar used on every normal route.
   * `links` is the same state/storage/behaviour rendered in-flow inside the
   * `/links` card instead, so it never overlays the page's donation/social
   * actions (MH-018). Only a modifier class differs between the two.
   */
  presentation?: "site" | "links";
};

export default function ConsentBanner({ presentation = "site" }: ConsentBannerProps) {
  // Derived (not effect-set) so the server/first-hydration render and the
  // real client value never disagree in a way React would warn about —
  // useSyncExternalStore is built for exactly this "read an external,
  // browser-only store" case.
  const hasValidConsent = useSyncExternalStore(
    subscribeToConsentChanges,
    hasValidConsentSnapshot,
    hasValidConsentServerSnapshot,
  );

  // Explicit open/close from user action (the footer's reopen control, or a
  // save/accept/reject click) overrides the derived value until the next
  // external change; null means "no override, defer to hasValidConsent".
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const isOpen = manualOverride ?? !hasValidConsent;

  // Subscribe to the footer's "reopen" request — setState here runs inside
  // the event callback, not synchronously in the effect body.
  useEffect(() => {
    function handleOpenRequest() {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setAnalyticsChecked(readConsent()?.analytics ?? false);
      setManualOverride(true);
    }

    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleOpenRequest);
    return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleOpenRequest);
  }, []);

  // Move focus into the panel when it's explicitly reopened, and return
  // focus to the trigger on close.
  useEffect(() => {
    if (isOpen && previouslyFocused.current) {
      panelRef.current?.querySelector<HTMLElement>("button, input, a")?.focus();
    }
    if (!isOpen && previouslyFocused.current) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
  }, [isOpen]);

  function save(analytics: boolean) {
    writeConsent(analytics);
    setManualOverride(false);
  }

  if (!isOpen) return null;

  const className =
    presentation === "links" ? "consent-banner consent-banner--links" : "consent-banner";

  return (
    <div className={className} role="region" aria-label="Cookie preferences">
      <div className="consent-banner__inner" ref={panelRef}>
        <div className="consent-banner__text">
          <p>
            We use cookies to understand how visitors use our site. See our{" "}
            <Link href="/cookie-policy">Cookie Notice</Link> for details.
          </p>
          <label className="consent-banner__toggle">
            <input
              type="checkbox"
              checked={analyticsChecked}
              onChange={(event) => setAnalyticsChecked(event.target.checked)}
            />
            <span>Analytics cookies</span>
          </label>
          <p className="consent-banner__necessary-note">Necessary cookies are always on.</p>
        </div>
        <div className="consent-banner__actions">
          <button type="button" className="btn btn-blue-outline" onClick={() => save(false)}>
            Reject non-essential
          </button>
          <button
            type="button"
            className="btn btn-blue-outline"
            onClick={() => save(analyticsChecked)}
          >
            Save preferences
          </button>
          <button type="button" className="btn btn-yellow" onClick={() => save(true)}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

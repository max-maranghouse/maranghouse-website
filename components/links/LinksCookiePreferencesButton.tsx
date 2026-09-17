"use client";

import { useSyncExternalStore } from "react";
import {
  hasValidConsentServerSnapshot,
  hasValidConsentSnapshot,
  openConsentPreferences,
  subscribeToConsentChanges,
} from "@/lib/consent";

// Links-page equivalent of the footer's CookiePreferencesButton (MH-018).
// Only rendered once a valid choice exists, since before that the inline
// ConsentBanner is already open in the card and a second visible trigger
// would be redundant.
export default function LinksCookiePreferencesButton() {
  const hasValidConsent = useSyncExternalStore(
    subscribeToConsentChanges,
    hasValidConsentSnapshot,
    hasValidConsentServerSnapshot,
  );

  if (!hasValidConsent) return null;

  return (
    <button type="button" className="links-page__cookie-btn" onClick={openConsentPreferences}>
      Cookie preferences
    </button>
  );
}

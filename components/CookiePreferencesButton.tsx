"use client";

import { openConsentPreferences } from "@/lib/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="site-footer__cookie-btn"
      onClick={openConsentPreferences}
    >
      Cookie preferences
    </button>
  );
}

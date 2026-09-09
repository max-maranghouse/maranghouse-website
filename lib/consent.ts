// MH-012: provider-agnostic cookie-consent state.
//
// This module owns persistence only — it stores the visitor's
// Necessary/Analytics choice and exposes it, but it must never import or
// initialise an analytics SDK itself. A later analytics integration reads
// `readConsent()?.analytics` (or listens for `CONSENT_UPDATED_EVENT`) to
// decide whether GA4/PostHog may load, and must initialise PostHog with
// input masking enabled before any recording starts.

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  /** ISO timestamp of when this choice was recorded. */
  timestamp: string;
  /** Bump when the consent model changes shape, to invalidate old records. */
  version: number;
};

const STORAGE_KEY = "mh-cookie-consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // ~12 months

/** Fired on `window` whenever a new choice is saved, with the choice as `detail`. */
export const CONSENT_UPDATED_EVENT = "mh-consent-updated";
/** Fired on `window` to ask the banner to reopen (e.g. the footer "Cookie preferences" control). */
export const OPEN_CONSENT_PREFERENCES_EVENT = "mh-open-consent-preferences";

/** Reads the current choice, or null if unset, unversioned, or expired past 12 months. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (parsed.version !== CONSENT_VERSION || !parsed.timestamp) return null;

    const recordedAt = new Date(parsed.timestamp).getTime();
    if (Number.isNaN(recordedAt) || Date.now() - recordedAt > CONSENT_MAX_AGE_MS) {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics === true,
      timestamp: parsed.timestamp,
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

/** Persists a choice and notifies any listeners (e.g. a future analytics gate) immediately. */
export function writeConsent(analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_UPDATED_EVENT, { detail: choice }));
  }

  return choice;
}

/** Asks the consent banner to reopen for revision (used by the footer "Cookie preferences" control). */
export function openConsentPreferences(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT));
  }
}

/**
 * `useSyncExternalStore` subscription for whether a valid (unexpired) choice
 * exists. Kept as a primitive boolean snapshot, and paired with a
 * server-safe default, so the banner's initial visibility can be derived
 * during render instead of set from inside an effect.
 */
export function subscribeToConsentChanges(callback: () => void): () => void {
  window.addEventListener(CONSENT_UPDATED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_UPDATED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function hasValidConsentSnapshot(): boolean {
  return readConsent() !== null;
}

/** Server snapshot assumes a choice exists, so the banner never renders open during SSR. */
export function hasValidConsentServerSnapshot(): boolean {
  return true;
}

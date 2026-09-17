// Small inline icon set for the /links action buttons. Monochrome and
// `currentColor`-based so each icon inherits its button's text colour;
// decorative only (the button's visible label already carries the meaning).
type IconProps = { className?: string };

export function BackaBuddyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 20.3s-7.6-4.7-7.6-10.1A4.6 4.6 0 0 1 9 5.6c1.2 0 2.3.5 3 1.4a4 4 0 0 1 3-1.4 4.6 4.6 0 0 1 4.6 4.6c0 5.4-7.6 10.1-7.6 10.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DonateIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3.5" y="9.5" width="17" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 13.5h17M12 9.5v10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 9.5c-1.8 0-3.2-1-3.2-2.6S9.4 4 11 4.6c1 .4 1.6 1.8 1 2.9M12 9.5c1.8 0 3.2-1 3.2-2.6S14.6 4 13 4.6c-1 .4-1.6 1.8-1 2.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M13.6 20.4v-6.2h2.1l.3-2.4h-2.4V10.2c0-.7.2-1.2 1.2-1.2h1.3V6.8c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8H8.9v2.4H11v6.2"
        fill="currentColor"
      />
    </svg>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMounted } from "./useMounted";

type VerticalCutRevealProps = {
  text: string;
  className?: string;
};

/**
 * Local adaptation of Fancy's Vertical Cut Reveal, styled with this
 * project's own CSS classes (`.vcr-word`/`.vcr-mask`/`.vcr-char` in
 * globals.css) instead of Tailwind. Each character sits in an
 * overflow-hidden mask and slides up into view with a short stagger, as if
 * being cut into visibility. Characters are grouped per word (each word an
 * unbreakable `inline-block`) with ordinary breakable spaces between words,
 * so the heading still wraps at word boundaries instead of mid-word.
 *
 * Renders the plain text node — no masks, no animation — for SSR/no-JS
 * output and for `prefers-reduced-motion: reduce`, so the heading is always
 * fully visible without depending on JavaScript.
 */
export default function VerticalCutReveal({ text, className }: VerticalCutRevealProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className ? `${className} vcr` : "vcr"} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex}>
          {wordIndex > 0 ? " " : null}
          <span className="vcr-word">
            {Array.from(word).map((char, i) => {
              const delay = charIndex * 0.028;
              charIndex += 1;
              return (
                <span className="vcr-mask" key={i} aria-hidden="true">
                  <motion.span
                    className="vcr-char"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

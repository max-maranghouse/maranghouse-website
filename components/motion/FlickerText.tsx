"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMounted } from "./useMounted";

type FlickerTextProps = {
  text: string;
  className?: string;
};

/**
 * Local, from-scratch flicker-in reveal for a single heading, styled with
 * this project's own CSS (no Tailwind) instead of a pasted third-party
 * component. Each character fades in with a couple of uneven opacity
 * flickers before settling — like a lantern catching light — the first
 * time the heading scrolls into view, and again on click/keyboard-activate
 * (a small deliberate easter egg on the Lightkeepers hero, not a hover or
 * auto-replay effect).
 *
 * Renders the plain, fully visible text node — no spans, no animation, no
 * click handler — for SSR/no-JS output and for `prefers-reduced-motion:
 * reduce`, so the heading is always static, visible text without
 * depending on JavaScript.
 */
export default function FlickerText({ text, className }: FlickerTextProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  if (!mounted || prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  const replay = () => setCycle((c) => c + 1);

  return (
    <motion.span
      className={className}
      aria-label={text}
      role="button"
      tabIndex={0}
      onClick={replay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          replay();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Remounting this wrapper on every click (via `key`) forces each
          character's whileInView animation to run again from `initial`,
          the same as if it were freshly scrolling into view. */}
      <span key={cycle}>
        {(() => {
          let charIndex = 0;
          return words.map((word, wordIndex) => (
            <span key={wordIndex} aria-hidden="true">
              {wordIndex > 0 ? " " : null}
              <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {Array.from(word).map((char, i) => {
                  const delay = charIndex * 0.035;
                  charIndex += 1;
                  return (
                    <motion.span
                      key={i}
                      style={{ display: "inline-block" }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 0.15, 1, 0.3, 1] }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.7,
                        delay,
                        times: [0, 0.2, 0.4, 0.55, 0.7, 1],
                        ease: "easeInOut",
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            </span>
          ));
        })()}
      </span>
    </motion.span>
  );
}

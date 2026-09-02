"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useMounted } from "./useMounted";

type RevealTag = "div" | "figure";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Pixels the content rises as it fades in. */
  y?: number;
  /** Stagger delay in seconds. */
  delay?: number;
  as?: RevealTag;
};

/**
 * Decorative-first viewport-enter reveal for selected images/cards. Always
 * renders the plain, fully visible element for SSR and no-JS output; swaps
 * to a one-time fade/rise on scroll-into-view only once mounted on the
 * client, and never animates for `prefers-reduced-motion: reduce`. Not for
 * text, forms, CTAs, or navigation — those must stay static.
 */
export default function Reveal({ children, className, y = 28, delay = 0, as = "div" }: RevealProps) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted || prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const transition = { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (as === "figure") {
    return (
      <motion.figure
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        {children}
      </motion.figure>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

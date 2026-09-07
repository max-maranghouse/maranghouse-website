"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMounted } from "./useMounted";

type SwayOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Degrees of tilt at the widest point of the sway, either side of `base`. */
  strength?: number;
  /** Resting tilt (degrees) the sway oscillates around, and the static
   * fallback for SSR/no-JS output and `prefers-reduced-motion: reduce`. */
  base?: number;
};

/**
 * Decorative-only scroll-linked pendulum sway — pivots from the wrapper's
 * top edge (`transform-origin: top center`), so a hanging object (like a
 * keyring) reads as swinging from its own hook/hole rather than rotating
 * around its centre. Renders a plain static wrapper for SSR/no-JS output
 * and under `prefers-reduced-motion: reduce`; once mounted (and motion is
 * allowed) it swings left/right as it crosses the viewport. Never wrap
 * text, forms, CTAs, or navigation in this.
 */
export default function SwayOnScroll({ children, className, strength = 7, base = 0 }: SwayOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [base - strength, base + strength, base - strength, base + strength, base - strength]
  );
  const active = mounted && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformOrigin: "top center", rotate: active ? rotate : base }}
    >
      {children}
    </motion.div>
  );
}

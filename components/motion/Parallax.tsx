"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMounted } from "./useMounted";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels of vertical travel across the wrapper's scroll range. */
  strength?: number;
  /**
   * Degrees to hold the wrapper rotated at, replicating a static CSS
   * `transform: rotate()` that would otherwise be clobbered by Motion's
   * own inline `transform` while animating `y`.
   */
  rotate?: number;
};

/**
 * Decorative-only scroll parallax for doodle/GIF wrappers — never wrap
 * text, forms, CTAs, or navigation in this. Renders a plain static wrapper
 * for SSR/no-JS output and under `prefers-reduced-motion: reduce`; once
 * mounted (and motion is allowed) the wrapper drifts gently as it crosses
 * the viewport. Pass `rotate` instead of a CSS `transform: rotate(...)` on
 * the same class, since Motion's inline transform would otherwise replace
 * it outright rather than combine with it.
 */
export default function Parallax({ children, className, strength = 36, rotate }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  if (!mounted || prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, rotate }}>
      {children}
    </motion.div>
  );
}

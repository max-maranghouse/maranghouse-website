"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMounted } from "./useMounted";

type ScaleOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Scale at the very start of the wrapper's scroll range (bottom of viewport). */
  from?: number;
  /** Scale at the very end of the wrapper's scroll range (top of viewport). */
  to?: number;
};

/**
 * Decorative-only scroll-linked grow/shrink for photo wrappers — same
 * scroll-range mechanics as `Parallax` (target: this wrapper, mapped across
 * ["start end", "end start"]) but transforms `scale` instead of `y`, so the
 * image visibly grows as it travels up through the viewport. Renders a
 * plain static wrapper for SSR/no-JS output and under
 * `prefers-reduced-motion: reduce`. The wrapper only adds a transform, not
 * layout — pair it with a parent that has `overflow: visible` (as
 * `Parallax` usage already expects) so the grown image isn't clipped.
 */
export default function ScaleOnScroll({ children, className, from = 0.88, to = 1.12 }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const active = mounted && !prefersReducedMotion;

  return (
    <motion.div ref={ref} className={className} style={active ? { scale } : undefined}>
      {children}
    </motion.div>
  );
}

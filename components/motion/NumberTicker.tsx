"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMounted } from "./useMounted";

type NumberTickerProps = {
  /** Final integer value, e.g. 28, 300, 1000. */
  value: number;
  /** Appended after the number, e.g. "+". */
  suffix?: string;
  className?: string;
  /** Count-up duration in seconds. */
  duration?: number;
};

/**
 * Local adaptation of Fancy's Basic Number Ticker for the Home stats.
 * Always renders the final static value (with its suffix) for SSR/no-JS
 * output and under `prefers-reduced-motion: reduce`. Once mounted, it
 * counts up from 0 to `value` a single time when the number scrolls into
 * view, then holds at the final value — it never re-counts.
 */
export default function NumberTicker({ value, suffix = "", className, duration = 1.4 }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value);
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!mounted || prefersReducedMotion || !inView || hasCounted.current) return;
    hasCounted.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [mounted, prefersReducedMotion, inView, value, duration]);

  const shown = !mounted || prefersReducedMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}

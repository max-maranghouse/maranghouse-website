"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMounted } from "./useMounted";

type ParallaxBgPhotoProps = {
  src: string;
  alt: string;
  className: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  /** Pixels of vertical travel across the section's scroll range. */
  strength?: number;
};

/**
 * A fill image with gentle, clipped scroll depth. The outer element owns the
 * section geometry while an overscanned inner layer moves, so parallax never
 * exposes a blank edge. SSR, no-JS and reduced-motion output stays static and
 * fully visible.
 */
export default function ParallaxBgPhoto({
  src,
  alt,
  className,
  position = "center",
  sizes = "100vw",
  priority = false,
  strength = 16,
}: ParallaxBgPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: position }}
    />
  );

  return (
    <div ref={ref} className={className} data-parallax-backdrop>
      {!mounted || prefersReducedMotion ? (
        <div className="parallax-bg-photo__layer">{image}</div>
      ) : (
        <motion.div className="parallax-bg-photo__layer" style={{ y }}>
          {image}
        </motion.div>
      )}
    </div>
  );
}

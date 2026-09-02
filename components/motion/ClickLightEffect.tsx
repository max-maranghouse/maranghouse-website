"use client";

import { useEffect, useState } from "react";

type Burst = { id: number; x: number; y: number };

let nextId = 0;

/**
 * Site-wide decorative left-click flourish: a small burst of light at the
 * cursor on every primary click, echoing the Lightkeepers "circle of
 * light" theme. Purely visual feedback layered above the page —
 * `pointer-events: none` throughout, so it never intercepts the click that
 * triggered it or the element being clicked — and skipped entirely under
 * `prefers-reduced-motion: reduce` (checked live via a MediaQueryList
 * listener, not just at mount, so it responds if the OS setting changes
 * mid-session).
 */
export default function ClickLightEffect() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mq.matches;
    const onChange = () => {
      reducedMotion = mq.matches;
    };
    mq.addEventListener("change", onChange);

    function handleClick(e: MouseEvent) {
      if (reducedMotion || e.button !== 0) return;
      const id = nextId++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== id));
      }, 650);
    }

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  if (bursts.length === 0) return null;

  return (
    <div className="click-light-layer" aria-hidden="true">
      {bursts.map((b) => (
        <span key={b.id} className="click-light-burst" style={{ left: b.x, top: b.y }} />
      ))}
    </div>
  );
}

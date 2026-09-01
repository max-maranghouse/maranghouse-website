"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cld } from "@/lib/images";

const slides = [
  ["v1788293376/Marang_House_Garden_Day-6.jpg", "Children enjoying activities at Marang House Garden Day"],
  ["v1788293371/MH-Website-Clo-Spiderman-3.jpg", "A child dressed as Spider-Man at Marang House Garden Day"],
  ["v1788293371/MH-Website-facepaint_1.jpg", "A child with colourful face paint at Marang House Garden Day"],
  ["v1788293378/Marang_House_Garden_Day-1.jpg", "Garden Day celebrations at Marang House"],
  ["v1788293381/Marang_House_Garden_Day-8.jpg", "Children taking part in Garden Day activities"],
  ["v1788293382/Marang_House_Garden_Day-5.jpg", "A Garden Day moment at Marang House"],
  ["v1788293370/MH-Website-eating-popcorn.jpg", "Children sharing popcorn at Marang House Garden Day"],
  ["v1788293368/MH-Website-facepaint-3.jpg", "A child showing their face paint at Marang House Garden Day"],
] as const;

export default function GardenDayCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  function updateCurrent() {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const trackLeft = track.getBoundingClientRect().left;
    const nearest = cards.reduce((best, card, index) =>
      Math.abs(card.getBoundingClientRect().left - trackLeft) < Math.abs(cards[best].getBoundingClientRect().left - trackLeft) ? index : best, 0);
    setCurrent(nearest + 1);
  }
  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const next = Math.max(0, Math.min(cards.length - 1, current - 1 + direction));
    cards[next]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
    setCurrent(next + 1);
  }
  return <section className="garden-day" aria-label="Garden Day photo gallery">
    <div className="garden-day__controls">
      <button type="button" onClick={() => move(-1)} disabled={current === 1} aria-label="Show previous Garden Day photo">Previous</button>
      <p className="sr-only" aria-live="polite">Photo {current} of {slides.length}</p>
      <button type="button" onClick={() => move(1)} disabled={current === slides.length} aria-label="Show next Garden Day photo">Next</button>
    </div>
    <div className="garden-day__track" ref={trackRef} onScroll={updateCurrent} aria-label="Garden Day photo gallery">
      {slides.map(([src, alt], index) => <figure className="garden-day__slide" key={src} aria-label={`Photo ${index + 1} of ${slides.length}`}><Image src={cld(src)} alt={alt} fill sizes="(max-width: 600px) 82vw, (max-width: 1000px) 44vw, 29vw" /></figure>)}
    </div>
  </section>;
}

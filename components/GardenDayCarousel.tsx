"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, EffectCoverflow, Keyboard } from "swiper/modules";
import { cld } from "@/lib/images";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/keyboard";
import "swiper/css/a11y";

const slides = [
  ["v1788293378/MH-Website-facepaint-5.jpg", "A child having face paint applied at Marang House Garden Day."],
  ["v1788293376/Marang_House_Garden_Day-6.jpg", "Children enjoying activities at Marang House Garden Day"],
  ["v1788293371/MH-Website-Clo-Spiderman-3.jpg", "A child dressed as Spider-Man at Marang House Garden Day"],
  ["v1788293371/MH-Website-facepaint_1.jpg", "A child with colourful face paint at Marang House Garden Day"],
  ["v1788293378/Marang_House_Garden_Day-1.jpg", "Garden Day celebrations at Marang House"],
  ["v1788293381/Marang_House_Garden_Day-8.jpg", "Children taking part in Garden Day activities"],
  ["v1788293382/Marang_House_Garden_Day-5.jpg", "A Garden Day moment at Marang House"],
  ["v1788293370/MH-Website-eating-popcorn.jpg", "Children sharing popcorn at Marang House Garden Day"],
  ["v1788293368/MH-Website-facepaint-3.jpg", "A child showing their face paint at Marang House Garden Day"],
] as const;

/**
 * Drag/swipe-first cover-flow gallery: a centred active photo with angled
 * side previews on desktop/tablet, narrowing to a single focused slide on
 * mobile. Finite (no loop) and never autoplays. Previous/Next buttons and
 * arrow keys stay the primary non-pointer path, with a live "Photo N of 9"
 * status. Under reduced motion the 3D cover-flow transform and animated
 * transitions are swapped for an instant slide change, navigation intact.
 */
export default function GardenDayCarousel() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [current, setCurrent] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  function syncState(swiper: SwiperInstance) {
    setCurrent(swiper.activeIndex + 1);
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  }

  return (
    <section className="garden-day" aria-label="Garden Day photo gallery">
      <div className="garden-day__controls">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={atStart}
          aria-label="Show previous Garden Day photo"
        >
          Previous
        </button>
        <p className="sr-only" aria-live="polite">
          Photo {current} of {slides.length}
        </p>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={atEnd}
          aria-label="Show next Garden Day photo"
        >
          Next
        </button>
      </div>
      <Swiper
        key={reducedMotion ? "reduced" : "full"}
        modules={[EffectCoverflow, Keyboard, A11y]}
        effect={reducedMotion ? "slide" : "coverflow"}
        speed={reducedMotion ? 0 : 500}
        coverflowEffect={{ rotate: 28, stretch: 0, depth: 140, modifier: 1, slideShadows: false }}
        centeredSlides
        loop={false}
        grabCursor
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        slidesPerView={1.08}
        spaceBetween={16}
        breakpoints={{
          601: { slidesPerView: 1.6, spaceBetween: 24 },
          1001: { slidesPerView: 2.3, spaceBetween: 32 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          syncState(swiper);
        }}
        onSlideChange={syncState}
        className="garden-day__swiper"
      >
        {slides.map(([src, alt]) => (
          <SwiperSlide key={src} className="garden-day__slide">
            <Image
              src={cld(src)}
              alt={alt}
              fill
              sizes="(max-width: 600px) 84vw, (max-width: 1000px) 56vw, 38vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

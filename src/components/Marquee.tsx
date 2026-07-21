"use client";

import { useRef, useEffect } from "react";

export default function Marquee() {
  const text = "VS GROWTH ";
  const repeated = Array(20).fill(text).join("   ·   ");
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      // Move based on scroll position (speed multiplier)
      offsetRef.current = window.scrollY * 0.1;
      track.style.transform = `translateX(-${offsetRef.current % (track.scrollWidth / 2)}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative py-4 overflow-hidden z-[1]" style={{
        background:
          "linear-gradient(90deg, #0068cf 0%, #0080ff 51.5%, #51d9fe 100%)",
      }}>
      <div ref={trackRef} className="whitespace-nowrap flex w-max">
        <span className="inline-block font-display text-sm font-bold tracking-[0.2em] text-white/90">
          {repeated}
        </span>
        <span className="inline-block font-display text-sm font-bold tracking-[0.2em] text-white/90">
          {repeated}
        </span>
      </div>
    </div>
  );
}

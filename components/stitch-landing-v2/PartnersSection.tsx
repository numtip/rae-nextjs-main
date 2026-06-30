"use client";
/* eslint-disable @next/next/no-img-element */
import type { StitchLandingContent } from "@/content/stitch-landing";
import { useState, useRef, useEffect } from "react";

type Props = { c: StitchLandingContent };

/** Generate a deterministic muted colour from a string */
function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 36) * 10; // 0–350°
  return `hsl(${hue}, 28%, 62%)`;
}

/** Initials fallback (first letter of first two words) */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function PartnersSection({ c }: Props) {
  const items = c.partners.items;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const idx = Math.round(el.scrollLeft / (el.clientWidth * 0.5));
    setActiveDot(Math.min(idx, items.length - 1));
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative bg-white py-16 overflow-hidden">
        {/* Subtle CSS-only dotted pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #005C3B 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-3">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1F2937]">
              {c.partners.title}
            </h3>
            {/* Gold accent divider */}
            <div className="flex items-center justify-center gap-2 mt-3 mb-4">
              <span className="block w-8 h-0.5 bg-[#D8A01A] rounded-full" />
              <span className="block w-16 h-0.5 bg-[#D8A01A] rounded-full opacity-40" />
              <span className="block w-8 h-0.5 bg-[#D8A01A] rounded-full" />
            </div>
            <p className="text-[#6B7280] text-sm max-w-xl mx-auto">
              {c.partners.subtitle}
            </p>
          </div>

          {/* Desktop scroll / card row */}
          <div className="relative mt-10">
            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scrollBy(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-[#005C3B] hover:bg-gray-50 transition-colors hidden md:flex"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Cards container — horizontal scroll */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {items.map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 w-[165px] md:w-[175px] snap-start bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center p-5"
                >
                  {/* Logo area — real logo or initials fallback */}
                  {partner.logo ? (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white overflow-hidden mb-3 ring-2 ring-gray-100 shadow-sm">
                      <img
                        alt={partner.nameEn}
                        src={partner.logo}
                        className="w-full h-full object-contain p-1.5"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold mb-3 ring-2 ring-white shadow-sm" style={{ backgroundColor: hashColor(partner.nameEn) }}>
                      <span className="select-none">{initials(partner.nameEn)}</span>
                    </div>
                  )}

                  {/* Name */}
                  <h4 className="text-sm font-bold text-[#1F2937] leading-tight mb-0.5">
                    {partner.shortName || partner.nameTh}
                  </h4>
                  <p className="text-[10px] text-[#6B7280] leading-tight line-clamp-2">
                    {partner.nameEn}
                  </p>

                  {/* Type badge */}
                  <span className="mt-2 text-[10px] font-medium text-[#005C3B] bg-green-50 px-2 py-0.5 rounded-full">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            {canScrollRight && (
              <button
                onClick={() => scrollBy(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-[#005C3B] hover:bg-gray-50 transition-colors hidden md:flex"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (el) el.scrollTo({ left: i * 340 * 0.5, behavior: "smooth" });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeDot
                    ? "bg-[#D8A01A] w-5"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to partner ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Green divider before footer */}
      <div className="relative h-2 bg-[#005C3B] overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#005C3B] rotate-45" />
      </div>
    </>
  );
}

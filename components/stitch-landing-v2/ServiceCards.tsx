"use client";
import Image from "next/image";
import type { StitchLandingContent } from "@/content/stitch-landing";
import {
  Sprout,
  Leaf,
  Microscope,
  UsersRound,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

type Props = { c: StitchLandingContent };

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sprout,
  Leaf,
  Microscope,
  UsersRound,
  PackageCheck,
};

export function ServiceCards({ c }: Props) {
  const sorted = [...c.services.cards].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* ─── Section Header ─────────────────────────────── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#005C3B]">
            {c.services.kicker === "OUR SERVICES"
              ? "บริการของเรา"
              : c.services.kicker}
          </h2>
          <div className="w-12 h-1 bg-[#D8A01A] rounded-full mx-auto mt-3 mb-3" />
          <p className="text-[#6B7280] text-sm max-w-xl mx-auto">
            {c.services.description}
          </p>
        </div>

        {/* ─── Cards Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sorted.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <a
                key={card.id}
                href={card.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                aria-label={`${c.services.viewAllLabel}: ${card.title}`}
              >
                {/* Image — 16:9 with next/image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    alt={card.imageAlt}
                    src={card.image}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Floating icon badge */}
                <div className="relative z-10 flex justify-center -mt-10 mb-1">
                  <div className="w-[76px] h-[76px] rounded-full bg-white shadow-md ring-4 ring-[#EAF7EF] flex items-center justify-center text-[#005C3B]">
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 pb-6 pt-2 flex flex-col flex-1 text-center items-center">
                  <h3 className="text-lg font-bold text-[#005C3B] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  {/* Gold divider */}
                  <div className="w-8 h-0.5 bg-[#D8A01A]/70 rounded-full mb-3" />

                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[#005C3B] font-semibold text-sm group-hover:text-[#D8A01A] transition-colors">
                    {c.services.viewAllLabel}
                    <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* ─── Bottom CTA Button ──────────────────────────── */}
        <div className="flex justify-center mt-12">
          <a
            href={c.services.viewAllHref}
            className="inline-flex items-center gap-2 bg-[#005C3B] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#003F2A] transition-colors shadow-md hover:shadow-lg"
            aria-label="สำรวจงานบริการวิชาการทั้งหมด"
          >
            สำรวจงานบริการวิชาการทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

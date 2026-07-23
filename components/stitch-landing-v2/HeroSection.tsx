"use client";
/* eslint-disable @next/next/no-img-element */
import type { StitchLandingContent } from "@/content/stitch-landing";
import { assetPath } from "@/lib/assetPath";

type Props = { c: StitchLandingContent };

export function HeroSection({ c }: Props) {
  const isTh = c.lang === "th";

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          alt=""
          src={assetPath(c.hero.backgroundImage)}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="w-full h-full bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-transparent absolute inset-0 z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className={isTh ? "max-w-2xl text-white" : "max-w-[720px] text-white"}>
          <h1 className={`font-bold mb-4 ${
            isTh
              ? "text-4xl md:text-5xl lg:text-6xl leading-tight"
              : "text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02]"
          }`}>
            {c.hero.headlineBeforeGold}{" "}
            <span className="text-brand-gold">{c.hero.headlineGold}</span>{" "}
            {c.hero.headlineAfterGold}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {c.hero.paragraph}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={c.hero.primaryCta.href}
              className="bg-brand-primary hover:bg-brand-forest text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg"
            >
              {c.hero.primaryCta.label}
            </a>
            <a
              href={c.hero.secondaryCta.href}
              className="bg-brand-gold hover:bg-brand-goldhover text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg"
            >
              {c.hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

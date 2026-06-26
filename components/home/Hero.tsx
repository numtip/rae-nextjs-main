/**
 * Hero — Homepage hero section
 *
 * Client component that dynamically loads the canvas engine.
 * Dynamic import with ssr:false ensures canvas code is never SSR'd.
 *
 * Env flag: NEXT_PUBLIC_HERO_CONCEPT = d (default) | b (CSS fallback) | x (campaign only)
 * — checked inside HeroLivingAg at runtime.
 */

'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { hero } from "@/data/hero";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import type { QualityTier } from "@/components/hero/useHeroEngine";

/* Client-only entry: canvas animation, IntersectionObserver, reduced motion */
const HeroLivingAg = dynamic(
  () => import("@/components/hero/HeroLivingAg"),
  { ssr: false },
);

type Props = {
  locale: Locale;
  qualityTier?: QualityTier;
};

export default function Hero({ locale, qualityTier }: Props) {
  const h = hero[locale];
  const base = withLocale(locale, "/");

  return (
    <HeroLivingAg
      qualityTier={qualityTier}
      content={{
        eyebrow: h.kicker,
        headline: h.title,
        subline: h.text,
        actions: (
          <>
            <Link className="btn-link btn-link-primary" href={`${base}${h.primaryCta.hash}`}>
              {h.primaryCta.label}
            </Link>
            <Link className="btn-link btn-link-secondary" href={`${base}${h.secondaryCta.hash}`}>
              {h.secondaryCta.label}
            </Link>
          </>
        ),
      }}
    />
  );
}

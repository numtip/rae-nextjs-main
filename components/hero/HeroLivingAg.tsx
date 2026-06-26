/**
 * HeroLivingAg — Concept D: Living Agriculture Intelligence
 *
 * Orchestrator that selects the rendering path based on:
 * - Env flag `NEXT_PUBLIC_HERO_CONCEPT` (d | b | x)
 * - `prefers-reduced-motion` media query
 * - Low-power device detection (navigator.hardwareConcurrency)
 *
 * SSR: false — loaded via `dynamic(() => import(...), { ssr: false })`
 *
 * Paths:
 *   d + normal motion → HeroCanvas + useHeroEngine (animated canvas)
 *   d + reduced motion → HeroFallback poster (static T0)
 *   b (any motion)    → CSS gradient only (Concept B fallback)
 *   x                 → Not rendered on homepage (campaign only)
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import HeroContainer from './HeroContainer';
import HeroFallback from './HeroFallback';
import { useHeroEngine } from './useHeroEngine';
import type { QualityTier } from './useHeroEngine';
import styles from './hero-living-ag.module.css';

// ── Types ──────────────────────────────────────────────────────────────────

export type HeroConcept = 'd' | 'b' | 'x';

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subline: string;
  actions: React.ReactNode;
}

interface HeroLivingAgProps {
  /** Locale-specific hero content */
  content: HeroContent;
  /** Override quality tier (default: auto from DPR) */
  qualityTier?: QualityTier;
}

// ── Env flag ───────────────────────────────────────────────────────────────

function getEnvConcept(): HeroConcept {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_HERO_CONCEPT) {
    const val = process.env.NEXT_PUBLIC_HERO_CONCEPT as HeroConcept;
    if (val === 'd' || val === 'b' || val === 'x') return val;
  }
  return 'd'; /* default */
}

// ── Client Canvas Wrapper ──────────────────────────────────────────────────

function HeroCanvasWithEngine({
  qualityTier,
}: {
  qualityTier?: QualityTier;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroEngine(canvasRef, { qualityTier });

  return <canvas ref={canvasRef} className={styles.canvas} id="hero-d-canvas" aria-hidden="true" />;
}

// ── HeroLivingAg ───────────────────────────────────────────────────────────

export default function HeroLivingAg({ content, qualityTier }: HeroLivingAgProps) {
  const concept = getEnvConcept();
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Detect prefers-reduced-motion on mount + listen for changes */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Rollback to Concept B (CSS gradient only) */
  if (concept === 'b') {
    return (
      <HeroContainer
        headline={content.headline}
        eyebrow={content.eyebrow}
        subline={content.subline}
        actions={content.actions}
      >
        <HeroFallback gradientOnly />
      </HeroContainer>
    );
  }

  /* Concept X is not rendered on homepage */
  if (concept === 'x') {
    return null;
  }

  /* Concept D + reduced motion → poster fallback */
  if (reducedMotion) {
    return (
      <HeroContainer
        headline={content.headline}
        eyebrow={content.eyebrow}
        subline={content.subline}
        actions={content.actions}
      >
        <HeroFallback />
      </HeroContainer>
    );
  }

  /* Concept D + normal motion → animated canvas */
  return (
    <HeroContainer
      headline={content.headline}
      eyebrow={content.eyebrow}
      subline={content.subline}
      actions={content.actions}
    >
      <HeroCanvasWithEngine qualityTier={qualityTier} />
    </HeroContainer>
  );
}

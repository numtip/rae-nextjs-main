/**
 * HeroFallback — Static fallback for reduced-motion or low-power paths
 *
 * Two modes:
 * 1. Poster mode: displays d-poster.webp (T0 static frame) — preferred for reduced motion
 * 2. CSS gradient mode: green-to-deep-green gradient — for env flag 'b' (Concept B)
 *
 * SSR: Yes
 */

import styles from './hero-living-ag.module.css';

interface HeroFallbackProps {
  /** Use CSS gradient instead of poster image */
  gradientOnly?: boolean;
  /** Poster image path (default: /assets/hero/d-poster.webp) */
  posterSrc?: string;
  /** Poster alt text */
  posterAlt?: string;
}

export default function HeroFallback({
  gradientOnly = false,
  posterSrc = '/assets/hero/d-poster.webp',
  posterAlt = '',
}: HeroFallbackProps) {
  /* CSS gradient mode — Concept B fallback */
  if (gradientOnly) {
    return null; /* The hero container already has the green bg; no extra asset needed */
  }

  /* Poster mode — static T0 frame for reduced motion */
  return (
    <img
      className={styles.poster}
      src={posterSrc}
      alt={posterAlt}
      aria-hidden="true"
      loading="lazy"
      fetchPriority="high"
    />
  );
}

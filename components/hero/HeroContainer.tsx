/**
 * HeroContainer — SSR-safe layout shell
 *
 * Renders the green background, readability scrim, and content slot.
 * The content slot is filled by HeroLivingAg with locale text.
 * Canvas/poster are injected as children (client-only).
 *
 * SSR: Yes — green bg + scrim + headline are SSR-safe for LCP.
 */

import type { ReactNode } from 'react';
import styles from './hero-living-ag.module.css';

interface HeroContainerProps {
  /** Headline text */
  headline: string;
  /** Eyebrow/kicker text */
  eyebrow: string;
  /** Subline / description text */
  subline: string;
  /** CTA action buttons (React nodes for links) */
  actions: ReactNode;
  /** Children — canvas or poster (client-only) */
  children?: ReactNode;
}

export default function HeroContainer({
  headline,
  eyebrow,
  subline,
  actions,
  children,
}: HeroContainerProps) {
  return (
    <section
      className={styles.hero}
      role="img"
      aria-label="Living Agriculture Intelligence — animated hero showing soil strata, root networks, and data discovery"
    >
      {/* Motion layer: canvas or poster injected client-side */}
      {children}

      {/* Readability scrim */}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Content slot — SSR-safe HTML */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.headline}>{headline}</h1>
          {subline && <p className={styles.subline}>{subline}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </section>
  );
}

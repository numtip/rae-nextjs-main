/**
 * HeroCanvas — Canvas element with DPR-aware sizing
 *
 * Pure render component. Animation managed by useHeroEngine.
 * SSR: false (dynamic import).
 */

'use client';

import { forwardRef } from 'react';
import styles from './hero-living-ag.module.css';

interface HeroCanvasProps {
  /** Additional class names */
  className?: string;
}

/**
 * Canvas element for Concept D animation.
 * - pointer-events: none (non-interactive decorative layer)
 * - 100% width/height
 * - DPR managed by useHeroEngine via ref
 */
const HeroCanvas = forwardRef<HTMLCanvasElement, HeroCanvasProps>(
  function HeroCanvas({ className }, ref) {
    return (
      <canvas
        ref={ref}
        className={`${styles.canvas}${className ? ` ${className}` : ''}`}
        id="hero-d-canvas"
        aria-hidden="true"
      />
    );
  },
);

export default HeroCanvas;

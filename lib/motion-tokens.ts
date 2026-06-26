/**
 * Motion tokens — RAE hero animation design system
 *
 * Shared constants for canvas (Concept D/X) and CSS (Concept B) animation.
 * Aligned with MOTION_LANGUAGE_BIBLE.md and HERO_EXPERIENCE_PLAYBOOK.md.
 */

/** Duration of one complete hero loop in milliseconds */
export const HERO_LOOP_DURATION_MS = 8000;

/** Maximum device pixel ratio for canvas rendering */
export const DPR_CAP = 2;

/** Hero height constraints (in pixels) */
export const HERO_HEIGHT = {
  min: 400,
  max: 900,
} as const;

/** Target frames per second by quality tier */
export const FPS_TARGETS = {
  desktop: 55,
  mobile: 30,
  low: 30,
  medium: 55,
  high: 60,
} as const;

/** Phase names for Concept D phase machine */
export const D_PHASES = {
  SOIL: 0,
  ROOT: 0.15,
  DATA: 0.35,
  DISCOVERY: 0.5625,
  IMPACT: 0.6875,
  LOOP: 0.875,
  END: 1,
} as const;

/** Phase names for Concept D with human-readable labels */
export const D_PHASE_LABELS: Record<string, string> = {
  '0': 'Soil',
  '0.15': 'Root',
  '0.35': 'Data',
  '0.5625': 'Discovery',
  '0.6875': 'Impact',
  '0.875': 'Loop',
  '1': 'End (T0)',
};

/** Gold timing windows (phase-normalized, 0–1) */
export const GOLD_WINDOWS = {
  D_DISCOVERY: { start: 0.5625, end: 0.6875 },
  D_IMPACT: { start: 0.6875, end: 0.875 },
  X_IMPACT: { start: 0.5, end: 0.6875 },
  X_FLOW: { start: 0.6875, end: 0.875 },
} as const;

/** Easing reference names matching MOTION_LANGUAGE_BIBLE.md */
export const EASING = {
  natural: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  linear: 'linear',
} as const;

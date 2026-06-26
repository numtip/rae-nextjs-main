/**
 * useHeroEngine — Concept D Living Agriculture Intelligence
 *
 * Ported from prototypes/hero-motion-demo/scripts/hero-d-living.js
 * Adds: DPR quality tiers, IntersectionObserver pause, visibility pause
 *
 * Bundle target: ≤8 KB gzipped
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Constants ──────────────────────────────────────────────────────────────
const DURATION_MS = 8000;

const COLORS = {
  green: '#005C3B',
  greenDeep: '#004A2F',
  greenLight: '#006B45',
  gold: '#FFDE00',
  white: '#FFFFFF',
  gray: '#4C4C4C',
} as const;

/* Phase boundaries (normalized 0–1) */
const PHASE = {
  SOIL: 0,
  ROOT: 0.15,
  DATA: 0.35,
  DISCOVERY: 0.5625,
  IMPACT: 0.6875,
  LOOP: 0.875,
  END: 1,
} as const;

/* Precomputed root bezier paths — normalized coords */
const ROOTS = [
  { c1: [0.46, 0.78], c2: [0.38, 0.58], end: [0.28, 0.38] },
  { c1: [0.48, 0.75], c2: [0.42, 0.52], end: [0.36, 0.32] },
  { c1: [0.52, 0.76], c2: [0.55, 0.55], end: [0.58, 0.34] },
  { c1: [0.54, 0.74], c2: [0.62, 0.54], end: [0.72, 0.36] },
  { c1: [0.50, 0.72], c2: [0.50, 0.48], end: [0.50, 0.30] },
  { c1: [0.47, 0.80], c2: [0.44, 0.62], end: [0.40, 0.44] },
];

const HUB = { x: 0.5, y: 0.48 };

const DATA_NODES = [
  { x: 0.5, y: 0.48, hub: true },
  { x: 0.4, y: 0.44, hub: false },
  { x: 0.36, y: 0.32, hub: false },
  { x: 0.58, y: 0.34, hub: false },
  { x: 0.44, y: 0.62, hub: false },
  { x: 0.28, y: 0.38, hub: false },
  { x: 0.72, y: 0.36, hub: false },
  { x: 0.5, y: 0.3, hub: false },
];

const DATA_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 4], [2, 5], [3, 6], [1, 2], [3, 7],
];

// ── Types ──────────────────────────────────────────────────────────────────

export type QualityTier = 'high' | 'medium' | 'low';

export interface EngineState {
  phase: number;
  fps: number;
  qualityTier: QualityTier;
  isPaused: boolean;
  elapsed: number;
}

interface BeatState {
  soilBreathe: number;
  strataOpacity: number;
  rootProgress: number;
  rootOpacity: number;
  dataProgress: number;
  networkOpacity: number;
  discoveryPulse: number;
  impactRipple: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeNatural(t: number): number {
  return t * t * (3 - 2 * t);
}

function phaseInRange(p: number, start: number, end: number): number {
  return clamp((p - start) / (end - start), 0, 1);
}

function getLoopPhase(elapsed: number): number {
  return (elapsed % DURATION_MS) / DURATION_MS;
}

function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Phase Machine ──────────────────────────────────────────────────────────

function computeBeatState(phase: number): BeatState {
  const p = phase >= 1 ? 0 : phase;

  const soilBreathe = 0.5 + 0.5 * Math.sin(p * Math.PI * 2 * 0.5);

  let rootProgress = 0;
  let rootOpacity = 0;
  let dataProgress = 0;
  let networkOpacity = 0;
  let discoveryPulse = 0;
  let impactRipple = 0;
  let strataOpacity = 1;

  if (p < PHASE.ROOT) {
    /* Soil — T0 strata baseline */
    strataOpacity = 1;
  } else if (p < PHASE.DATA) {
    /* Root network grows */
    rootProgress = easeNatural(phaseInRange(p, PHASE.ROOT, PHASE.DATA));
    rootOpacity = 1;
    strataOpacity = 1;
  } else if (p < PHASE.DISCOVERY) {
    /* Data network overlays roots */
    rootProgress = 1;
    rootOpacity = 1;
    dataProgress = easeNatural(phaseInRange(p, PHASE.DATA, PHASE.DISCOVERY));
    networkOpacity = 1;
    strataOpacity = lerp(1, 0.4, phaseInRange(p, PHASE.DATA, PHASE.DISCOVERY));
  } else if (p < PHASE.IMPACT) {
    /* Discovery — gold pulse */
    rootProgress = 1;
    rootOpacity = 1;
    dataProgress = 1;
    networkOpacity = 1;
    strataOpacity = 0.3;
    const discT = phaseInRange(p, PHASE.DISCOVERY, PHASE.IMPACT);
    discoveryPulse = discT < 0.5
      ? easeNatural(discT * 2)
      : easeNatural((1 - discT) * 2);
  } else if (p < PHASE.LOOP) {
    /* Impact — ripple + network dissolve */
    const impactT = phaseInRange(p, PHASE.IMPACT, PHASE.LOOP);
    impactRipple = easeNatural(impactT);
    networkOpacity = 1 - easeNatural(impactT);
    rootOpacity = 1 - easeNatural(impactT * 0.9);
    rootProgress = 1;
    dataProgress = 1;
    strataOpacity = lerp(0.3, 1, impactT);
  } else {
    /* Loop dissolve — return to soil T0 */
    rootProgress = 0;
    rootOpacity = 0;
    dataProgress = 0;
    networkOpacity = 0;
    strataOpacity = 1;
  }

  return {
    soilBreathe,
    strataOpacity,
    rootProgress,
    rootOpacity,
    dataProgress,
    networkOpacity,
    discoveryPulse,
    impactRipple,
  };
}

// ── Drawing Functions ──────────────────────────────────────────────────────

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  soilBreathe: number,
  qualityTier: QualityTier,
) {
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, COLORS.greenLight);
  grd.addColorStop(0.35, COLORS.green);
  grd.addColorStop(1, COLORS.greenDeep);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  /* Mist — skip on low quality */
  if (qualityTier !== 'low') {
    const mistAlpha = lerp(0.04, 0.07, soilBreathe);
    const mist = ctx.createLinearGradient(0, 0, 0, h * 0.35);
    mist.addColorStop(0, rgba(COLORS.white, mistAlpha));
    mist.addColorStop(1, rgba(COLORS.white, 0));
    ctx.fillStyle = mist;
    ctx.fillRect(0, 0, w, h * 0.35);
  }
}

function drawSoilStrata(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  opacity: number,
  qualityTier: QualityTier,
) {
  if (opacity <= 0.001) return;
  const lineCount = qualityTier === 'low' ? 3 : 5;
  ctx.save();
  ctx.strokeStyle = rgba(COLORS.gray, 0.08 * opacity);
  ctx.lineWidth = 1;
  for (let i = 0; i < lineCount; i++) {
    const y = h * (0.55 + i * 0.09);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBezierPath(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  x1: number,
  y1: number,
  progress: number,
  qualitySteps: number,
) {
  if (progress <= 0) return;
  const steps = Math.max(qualitySteps, Math.floor(qualitySteps * 1.5 * progress));
  const maxStep = Math.floor(steps * progress);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  for (let i = 1; i <= maxStep; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const x = mt * mt * mt * x0 + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x1;
    const y = mt * mt * mt * y0 + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y1;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawRoots(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rootProgress: number,
  rootOpacity: number,
  qualityTier: QualityTier,
) {
  if (rootProgress <= 0 || rootOpacity <= 0.001) return;

  const activeRoots = qualityTier === 'low'
    ? ROOTS.slice(0, 3)  /* 3 roots on low quality */
    : ROOTS;              /* 6 roots on medium/high */

  const steps = qualityTier === 'high' ? 30 : qualityTier === 'medium' ? 24 : 18;
  const originX = w * 0.5;
  const originY = h * 1.02;

  ctx.save();
  ctx.strokeStyle = rgba(COLORS.white, 0.12 * rootOpacity);
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  for (let i = 0; i < activeRoots.length; i++) {
    const r = activeRoots[i];
    drawBezierPath(
      ctx,
      originX, originY,
      r.c1[0] * w, r.c1[1] * h,
      r.c2[0] * w, r.c2[1] * h,
      r.end[0] * w, r.end[1] * h,
      rootProgress,
      steps,
    );
  }
  ctx.restore();
}

function drawDataNetwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dataProgress: number,
  networkOpacity: number,
  qualityTier: QualityTier,
) {
  if (dataProgress <= 0 || networkOpacity <= 0.001) return;

  const activeEdges = qualityTier === 'low'
    ? DATA_EDGES.slice(0, 6)  /* fewer edges on low quality */
    : DATA_EDGES;

  ctx.save();
  ctx.strokeStyle = rgba(COLORS.gray, 0.15 * networkOpacity);
  ctx.lineWidth = 1;

  for (let e = 0; e < activeEdges.length; e++) {
    const edge = activeEdges[e];
    const from = DATA_NODES[edge[0]];
    const to = DATA_NODES[edge[1]];
    if (!from || !to) continue;
    const x0 = from.x * w;
    const y0 = from.y * h;
    const x1 = to.x * w;
    const y1 = to.y * h;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(lerp(x0, x1, dataProgress), lerp(y0, y1, dataProgress));
    ctx.stroke();
  }

  /* Draw nodes */
  const activeNodes = qualityTier === 'low' ? DATA_NODES.slice(0, 5) : DATA_NODES;
  for (let n = 0; n < activeNodes.length; n++) {
    const node = activeNodes[n];
    const nodeAlpha = easeNatural(clamp(dataProgress * 1.4, 0, 1)) * networkOpacity;
    if (nodeAlpha <= 0.001) continue;
    ctx.beginPath();
    ctx.fillStyle = rgba(COLORS.white, 0.18 * nodeAlpha);
    ctx.arc(node.x * w, node.y * h, node.hub ? 3.5 : 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawDiscoveryPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pulse: number,
) {
  if (pulse <= 0.001) return;
  const cx = HUB.x * w;
  const cy = HUB.y * h;
  const maxR = Math.min(w, h) * 0.08;
  const r = maxR * easeNatural(pulse);
  const alpha = 0.12 * (1 - pulse);

  ctx.save();
  /* Pulse ring */
  ctx.beginPath();
  ctx.fillStyle = rgba(COLORS.gold, alpha);
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  /* Hub dot */
  ctx.beginPath();
  ctx.fillStyle = rgba(COLORS.gold, 0.35 * (1 - pulse * 0.5));
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawImpactRipple(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  ripple: number,
  qualityTier: QualityTier,
) {
  if (ripple <= 0.001) return;
  const cx = HUB.x * w;
  const cy = HUB.y * h;
  const maxR = Math.max(w, h) * 0.72;
  const r = maxR * easeNatural(ripple);
  const alpha = 0.1 * (1 - ripple);

  ctx.save();
  ctx.strokeStyle = rgba(COLORS.gold, alpha);
  ctx.lineWidth = qualityTier === 'low' ? 1.5 : 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  phase: number,
  qualityTier: QualityTier,
) {
  const state = computeBeatState(phase);

  drawBackground(ctx, w, h, state.soilBreathe, qualityTier);
  drawSoilStrata(ctx, w, h, state.strataOpacity, qualityTier);
  drawRoots(ctx, w, h, state.rootProgress, state.rootOpacity, qualityTier);
  drawDataNetwork(ctx, w, h, state.dataProgress, state.networkOpacity, qualityTier);

  /* Gold effects — skip on low quality tier */
  if (qualityTier !== 'low') {
    if (state.discoveryPulse > 0) {
      drawDiscoveryPulse(ctx, w, h, state.discoveryPulse);
    }
    if (state.impactRipple > 0) {
      drawImpactRipple(ctx, w, h, state.impactRipple, qualityTier);
    }
  }
}

// ── Hook ───────────────────────────────────────────────────────────────────

export interface UseHeroEngineOptions {
  /** Manual override for quality tier (default: auto from DPR) */
  qualityTier?: QualityTier;
}

export interface UseHeroEngineReturn {
  /** Start the animation rAF loop */
  start: () => void;
  /** Stop the animation rAF loop */
  stop: () => void;
  /** Activate or deactivate the animation (calls start/stop) */
  setActive: (active: boolean) => void;
  /** Current engine state for debugging/QA */
  state: EngineState;
}

export function useHeroEngine(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseHeroEngineOptions = {},
): UseHeroEngineReturn {
  const [state, setState] = useState<EngineState>({
    phase: 0,
    fps: 0,
    qualityTier: options.qualityTier ?? 'medium',
    isPaused: false,
    elapsed: 0,
  });

  const runningRef = useRef(false);
  const activeRef = useRef(false);
  const rafIdRef = useRef(0);
  const startTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const dprRef = useRef(1);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const qualityTierRef = useRef<QualityTier>(options.qualityTier ?? 'medium');
  const fpsFramesRef = useRef<number[]>([]);
  const lastFpsTimeRef = useRef(0);
  const stateRef = useRef(state);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // ── Resize ─────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    /* Determine quality tier */
    if (options.qualityTier) {
      qualityTierRef.current = options.qualityTier;
    } else {
      /* Auto: low for DPR > 2 (shouldn't happen with cap) or low-memory */
      qualityTierRef.current = dpr > 2 ? 'low' : 'medium';
      /* Check hardware concurrency for mobile */
      if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) {
        qualityTierRef.current = 'low';
      }
    }

    wRef.current = rect.width;
    hRef.current = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [canvasRef, options.qualityTier]);

  // ── Tick ───────────────────────────────────────────────────────────────
  const tick = useCallback((timestamp: number) => {
    if (!runningRef.current || !activeRef.current || pausedRef.current) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const phase = getLoopPhase(elapsed);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        renderFrame(ctx, wRef.current, hRef.current, phase, qualityTierRef.current);
      }
    }

    /* FPS tracking */
    if (!lastFpsTimeRef.current) lastFpsTimeRef.current = timestamp;
    const frameInterval = timestamp - lastFpsTimeRef.current;
    lastFpsTimeRef.current = timestamp;
    fpsFramesRef.current.push(frameInterval);
    if (fpsFramesRef.current.length > 60) fpsFramesRef.current.shift();

    /* Update state every 30 frames */
    if (fpsFramesRef.current.length >= 30) {
      const sum = fpsFramesRef.current.reduce((a, b) => a + b, 0);
      const avg = sum / fpsFramesRef.current.length;
      const fps = avg > 0 ? Math.round(1000 / avg) : 60;
      setState((prev) => ({
        ...prev,
        phase,
        fps,
        elapsed,
        qualityTier: qualityTierRef.current,
        isPaused: pausedRef.current,
      }));
    }

    rafIdRef.current = requestAnimationFrame(tick);
  }, [canvasRef]);

  // ── Start / Stop / SetActive ───────────────────────────────────────────
  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    startTimeRef.current = 0;
    lastFpsTimeRef.current = 0;
    fpsFramesRef.current = [];
    pausedRef.current = false;
    rafIdRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
    setState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const setActive = useCallback((active: boolean) => {
    activeRef.current = active;
    if (active && !pausedRef.current) {
      start();
    } else {
      stop();
    }
  }, [start, stop]);

  // ── IntersectionObserver ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          pausedRef.current = false;
          if (activeRef.current) start();
        } else {
          pausedRef.current = true;
          stop();
        }
        setState((prev) => ({ ...prev, isPaused: pausedRef.current }));
      },
      { threshold: 0 },
    );

    observerRef.current.observe(canvas);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [canvasRef, start, stop]);

  // ── Visibility change ──────────────────────────────────────────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        stop();
      } else {
        pausedRef.current = false;
        if (activeRef.current) start();
      }
      setState((prev) => ({ ...prev, isPaused: pausedRef.current }));
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [start, stop]);

  // ── Resize listener ────────────────────────────────────────────────────
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener('resize', handleResize);
    resize(); /* initial sizing */

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [resize]);

  // ── Draw static frame on mount ──────────────────────────────────────────
  useEffect(() => {
    resize();
    /* Draw initial T0 frame */
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        renderFrame(ctx, wRef.current, hRef.current, 0, qualityTierRef.current);
      }
    }
  }, [resize, canvasRef]);

  // ── Cleanup ────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      runningRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return { start, stop, setActive, state };
}

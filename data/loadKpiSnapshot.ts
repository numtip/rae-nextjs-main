/**
 * Build-time KPI snapshot loader.
 *
 * Imports the checked-in JSON snapshot (`kpiSnapshot.json`) at build time
 * and exports typed wrappers.  Safe for static export — no fetch, no secrets.
 *
 * The snapshot is validated separately via `scripts/validate-kpi-snapshot.ts`.
 * This module provides the typed bridge between the JSON contract and the
 * KpiMetric format expected by `/components/home/KpiImpactStrip.tsx`.
 */
import kpiSnapshotRaw from "./kpiSnapshot.json";
import type { Locale } from "@/lib/locale";

// ---------------------------------------------------------------------------
// Types mirroring the JSON schema contract (data/kpiSnapshot.schema.json)
// ---------------------------------------------------------------------------

export type MetricId =
  | "research-projects"
  | "publications-outputs"
  | "training-outreach"
  | "partner-organisations";

export type SnapshotSource =
  | "manual"
  | "registry-api"
  | "metabase-export"
  | "placeholder";

export type SnapshotStatus =
  | "verified"
  | "pending-live-source";

export type SnapshotMetric = {
  id: MetricId;
  value: string;
  labelTh: string;
  labelEn: string;
  contextTh?: string;
  contextEn?: string;
  highlight?: boolean;
};

export type KpiSnapshot = {
  schemaVersion: "1";
  generatedAt: string;
  source: SnapshotSource;
  status: SnapshotStatus;
  metrics: SnapshotMetric[];
};

// ---------------------------------------------------------------------------
// Runtime types (duck-compatible with KpiMetric from kpiImpact.ts)
// ---------------------------------------------------------------------------

export type SnapshotKpiSource = SnapshotSource;
export type SnapshotKpiStatus = SnapshotStatus;

export type SnapshotKpiMetric = {
  value: string;
  label: Record<Locale, string>;
  context?: Record<Locale, string>;
  highlight?: boolean;
  source: SnapshotKpiSource;
  status: SnapshotKpiStatus;
};

// ---------------------------------------------------------------------------
// Typed import
// ---------------------------------------------------------------------------

/** The raw build-time snapshot, type-asserted against the known contract. */
export const kpiSnapshot = kpiSnapshotRaw as KpiSnapshot;

// ---------------------------------------------------------------------------
// Conversion helpers
// ---------------------------------------------------------------------------

/**
 * Convert snapshot metrics (flat TH/EN fields) into the KpiMetric-like format
 * used by the KpiImpactStrip component (Record<Locale, string>).
 */
export function snapshotToKpiMetrics(
  metrics: SnapshotMetric[],
  meta: { source: SnapshotSource; status: SnapshotStatus },
): SnapshotKpiMetric[] {
  return metrics.map((m) => ({
    value: m.value,
    label: { th: m.labelTh, en: m.labelEn } as Record<Locale, string>,
    context:
      m.contextTh != null && m.contextEn != null
        ? ({ th: m.contextTh, en: m.contextEn } as Record<Locale, string>)
        : undefined,
    highlight: m.highlight,
    source: meta.source,
    status: meta.status,
  }));
}

/** Convenience: convert the current snapshot to KpiMetrics using its own meta. */
export function getSnapshotKpiMetrics(): SnapshotKpiMetric[] {
  return snapshotToKpiMetrics(kpiSnapshot.metrics, {
    source: kpiSnapshot.source,
    status: kpiSnapshot.status,
  });
}

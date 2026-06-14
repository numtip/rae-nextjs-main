/**
 * Budget Statistics Adapter
 *
 * Pure transformation layer that converts raw research data into
 * the BudgetStats contract type. No SQL coupling, no UI coupling.
 *
 * Accepts a normalized ResearchDataset (from CSV loader or future
 * SQL adapter) and returns typed BudgetStats with edge-case handling.
 *
 * @see lib/data/aggregates.ts — computeBudgetStats (canonical aggregation)
 * @see lib/contracts/budgetStats.ts — wire contract types
 */

import type { ResearchDataset } from "@/lib/data/models";
import { computeBudgetStats } from "@/lib/data/aggregates";
import type {
  BudgetStats,
  BudgetStatsResponse,
  BudgetByYear,
  BudgetByType,
  BudgetBySource,
  BudgetByLevel,
  BudgetSummary,
} from "@/lib/contracts/budgetStats";

// ─── Constants ─────────────────────────────────────────────────────

const EMPTY_STATS: BudgetStats = {
  byYear: [],
  byType: [],
  bySource: [],
  byLevel: [],
  summary: {
    zeroBudgetProjects: 0,
    highestBudgetYear: 0,
    highestBudgetAmount: 0,
    averageBudgetPerYear: 0,
  },
  generatedAt: new Date().toISOString(),
};

// ─── Adapter ───────────────────────────────────────────────────────

/**
 * Transform a ResearchDataset into BudgetStats.
 *
 * Delegates to computeBudgetStats for canonical aggregation logic,
 * handling edge cases at the boundary.
 *
 * @param dataset - Normalized research dataset (may be empty)
 * @returns BudgetStats with valid (possibly empty) breakdowns
 */
export function datasetToBudgetStats(dataset: ResearchDataset): BudgetStats {
  if (!dataset || !dataset.budgets || dataset.budgets.length === 0) {
    return { ...EMPTY_STATS, generatedAt: new Date().toISOString() };
  }

  try {
    return computeBudgetStats(dataset);
  } catch {
    console.warn(
      "budgetStatsAdapter: computeBudgetStats failed, returning empty stats"
    );
    return { ...EMPTY_STATS, generatedAt: new Date().toISOString() };
  }
}

/**
 * Wrap BudgetStats in the standard API response envelope.
 *
 * @param stats - BudgetStats to wrap
 * @returns BudgetStatsResponse with success flag and timestamp
 */
export function wrapBudgetStatsResponse(stats: BudgetStats): BudgetStatsResponse {
  return {
    success: true,
    generatedAt: stats.generatedAt,
    data: stats,
  };
}

/**
 * Full pipeline: dataset → BudgetStats → wrapped response.
 *
 * Convenience function for API routes. Returns a guaranteed-valid
 * response even for empty or malformed datasets.
 *
 * @param dataset - Normalized research dataset
 * @returns BudgetStatsResponse (always valid, never throws)
 */
export function computeAndWrapBudgetStats(dataset: ResearchDataset): BudgetStatsResponse {
  const stats = datasetToBudgetStats(dataset);
  return wrapBudgetStatsResponse(stats);
}

// ─── Edge-case helpers (exported for testing) ──────────────────────

/**
 * Create an empty (zero-value) BudgetStats snapshot.
 * Useful for fallback/loading states.
 */
export function createEmptyBudgetStats(): BudgetStats {
  return { ...EMPTY_STATS, generatedAt: new Date().toISOString() };
}

/**
 * Validate that a BudgetStats object has structural integrity.
 *
 * Checks that all expected fields are present and of the correct
 * shape. Does NOT check monetary values or counts.
 *
 * @param stats - BudgetStats to validate
 * @returns true if structurally valid
 */
export function isValidBudgetStats(stats: unknown): stats is BudgetStats {
  if (!stats || typeof stats !== "object") return false;

  const s = stats as Record<string, unknown>;

  // Must have all array fields
  if (!Array.isArray(s.byYear)) return false;
  if (!Array.isArray(s.byType)) return false;
  if (!Array.isArray(s.bySource)) return false;
  if (!Array.isArray(s.byLevel)) return false;

  // Must have summary object
  if (!s.summary || typeof s.summary !== "object") return false;

  // Must have generatedAt
  if (typeof s.generatedAt !== "string") return false;

  // Validate summary fields
  const summary = s.summary as Record<string, unknown>;
  if (typeof summary.zeroBudgetProjects !== "number") return false;
  if (typeof summary.highestBudgetYear !== "number") return false;
  if (typeof summary.highestBudgetAmount !== "number") return false;
  if (typeof summary.averageBudgetPerYear !== "number") return false;

  // Validate byYear entries (if present)
  for (const entry of s.byYear) {
    if (!entry || typeof entry !== "object") return false;
    const y = entry as Record<string, unknown>;
    if (typeof y.year !== "number") return false;
    if (typeof y.totalBudget !== "number") return false;
    if (typeof y.projectCount !== "number") return false;
  }

  // Validate byType entries (if present)
  for (const entry of s.byType) {
    if (!entry || typeof entry !== "object") return false;
    const t = entry as Record<string, unknown>;
    if (typeof t.label !== "string") return false;
    if (typeof t.budget !== "number") return false;
    if (typeof t.percentage !== "number") return false;
  }

  // Validate bySource entries (if present)
  for (const entry of s.bySource) {
    if (!entry || typeof entry !== "object") return false;
    const src = entry as Record<string, unknown>;
    if (typeof src.label !== "string") return false;
    if (typeof src.budget !== "number") return false;
    if (typeof src.count !== "number") return false;
  }

  // Validate byLevel entries (if present)
  for (const entry of s.byLevel) {
    if (!entry || typeof entry !== "object") return false;
    const lvl = entry as Record<string, unknown>;
    if (typeof lvl.label !== "string") return false;
    if (typeof lvl.budget !== "number") return false;
    if (typeof lvl.count !== "number") return false;
  }

  return true;
}

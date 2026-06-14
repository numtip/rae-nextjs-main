/**
 * Budget Statistics — API Contract Types
 *
 * These types define the wire contract for budget statistics endpoints.
 * They are re-exported from the canonical data models to avoid duplication,
 * with additional types for the standardized API response envelope.
 *
 * @see lib/data/models.ts — canonical BudgetStats type
 * @see docs/contracts/BUDGET_STATS_CONTRACT.md — full contract documentation
 */

import type {
  BudgetStats as DataBudgetStats,
} from "@/lib/data/models";

// ─── Re-export canonical types ──────────────────────────────────────

/**
 * Budget statistics with breakdowns by year, funding type,
 * source, level, and summary metrics.
 */
export type BudgetStats = DataBudgetStats;

// ─── Computed budget detail types ───────────────────────────────────

export interface BudgetByYear {
  year: number;
  totalBudget: number;
  projectCount: number;
}

export interface BudgetByType {
  label: string;
  budget: number;
  percentage: number;
}

export interface BudgetBySource {
  label: string;
  budget: number;
  count: number;
}

export interface BudgetByLevel {
  label: string;
  budget: number;
  count: number;
}

export interface BudgetSummary {
  zeroBudgetProjects: number;
  highestBudgetYear: number;
  highestBudgetAmount: number;
  averageBudgetPerYear: number;
}

// ─── Conceptual field aliases (zero-duplication) ────────────────────
// These alias existing types to satisfy the conceptual contract fields
// without introducing duplicate interfaces.

/** @alias BudgetByYear — fiscal year breakdown */
export type BudgetTrend = BudgetByYear;

/** @alias BudgetByType — grouped by funding source (internal/external/personal) */
export type BudgetByFundingSource = BudgetByType;

/** @alias BudgetByLevel — grouped by research level (university/national/international) */
export type BudgetByResearchType = BudgetByLevel;

/** @alias BudgetBySource — grouped by faculty/department funding source.
 *  Dedicated faculty-level aggregation is available in ViewResearchRow.facultyID
 *  and will be added in a future slice when SQL Server integration is active. */
export type BudgetByFaculty = BudgetBySource;

// ─── Standardized API response envelope ─────────────────────────────

/**
 * Standard API response wrapper for budget stats.
 * Used by the wrapped endpoint at /api/research/budget/stats.
 */
export interface BudgetStatsResponse {
  success: boolean;
  generatedAt: string;
  data: BudgetStats;
}

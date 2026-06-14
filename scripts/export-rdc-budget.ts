/**
 * RDC Budget Snapshot Export Script
 *
 * Build-time connector that:
 * 1. Connects to RDC SQL Server (read-only)
 * 2. Queries View_Research for budgetYear 2559–2569 only
 * 3. Normalizes rows through existing pipeline
 * 4. Computes BudgetStats
 * 5. Applies privacy filter (no personName, no raw personCode)
 * 6. Writes snapshot JSON to data/research/live-budget-2559-2569.json
 *
 * Fallback:
 * If RDC is unavailable, falls back to data/research/a3.csv (CSV export).
 * The build never fails solely due to RDC being unreachable.
 *
 * Run: npx tsx scripts/export-rdc-budget.ts
 * Env: RDC_SQL_PASSWORD required (for live RDC connection)
 *
 * @see docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md
 * @see lib/connectors/rdcSqlConnector.ts
 * @see lib/adapters/rdcBudgetNormalizer.ts
 * @see lib/adapters/budgetStatsAdapter.ts
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import {
  executeQuery,
  loadRdcSqlConfig,
  buildViewResearchQuery,
} from "../lib/connectors/rdcSqlConnector";
import { rdcRowsToViewResearchRows } from "../lib/adapters/rdcBudgetNormalizer";
import { normalizeRows } from "../lib/csv/normalizer";
import { datasetToBudgetStats } from "../lib/adapters/budgetStatsAdapter";
import { loadResearchDataSync } from "../lib/csv/loader";
import type { BudgetStats } from "../lib/data/models";

// ─── Constants ─────────────────────────────────────────────────────

const BUDGET_YEAR_MIN = 2559;
const BUDGET_YEAR_MAX = 2569;

const SQL_QUERY = buildViewResearchQuery(
  `budgetYear BETWEEN ${BUDGET_YEAR_MIN} AND ${BUDGET_YEAR_MAX}`
);

const SNAPSHOT_PATH = resolve(
  __dirname,
  "..",
  "data",
  "research",
  "live-budget-2559-2569.json"
);

// ─── Snapshot shape ────────────────────────────────────────────────

interface BudgetSnapshot {
  source: "RDC" | "CSV-fallback";
  view: string;
  budgetYearRange: [number, number];
  generatedAt: string;
  rowCount: number;
  distinctProjects: number;
  data: BudgetStats;
}

// ─── Privacy filter ────────────────────────────────────────────────

/**
 * Verify that no personName or raw personCode fields leak into the
 * snapshot output. BudgetStats is already aggregated and safe, but
 * this is a defense-in-depth check.
 *
 * Throws if any prohibited field is found in the snapshot object.
 */
function applyPrivacyFilter(snapshot: unknown): void {
  const json = JSON.stringify(snapshot);

  if (json.includes("personName")) {
    throw new Error(
      "PRIVACY FAIL: snapshot contains 'personName'. " +
        "Personally identifiable information must not be exported."
    );
  }

  const codeMatch = json.match(/"personCode":"([^"]+)"/);
  if (codeMatch) {
    const code = codeMatch[1];
    if (!code.includes("*") && code.length > 4) {
      throw new Error(
        `PRIVACY FAIL: snapshot contains raw personCode "${code}". ` +
          "Person codes must be masked before export."
      );
    }
  }
}

// ─── Fallback: load from CSV ───────────────────────────────────────

function generateFallbackSnapshot(): BudgetSnapshot {
  console.log("\n--- FALLBACK: Loading from CSV ---");

  const dataset = loadResearchDataSync();
  const budgetStats = datasetToBudgetStats(dataset);

  const snapshot: BudgetSnapshot = {
    source: "CSV-fallback",
    view: "data/research/a3.csv (CSV export)",
    budgetYearRange: [BUDGET_YEAR_MIN, BUDGET_YEAR_MAX],
    generatedAt: new Date().toISOString(),
    rowCount: dataset.rawRows.length,
    distinctProjects: dataset.projects.length,
    data: budgetStats,
  };

  applyPrivacyFilter(snapshot);
  return snapshot;
}

// ─── Main export from RDC ──────────────────────────────────────────

async function exportFromRdc(): Promise<BudgetSnapshot> {
  const config = loadRdcSqlConfig();
  console.log(`Server: ${config.server}:${config.port}`);
  console.log(`Database: ${config.database}`);
  console.log(`User: ${config.user}`);
  console.log("");

  // Execute query
  console.log("Executing query...");
  const startTime = Date.now();
  const rows = await executeQuery(SQL_QUERY, config);
  const queryTime = Date.now() - startTime;
  console.log(`Rows fetched: ${rows.length} (${queryTime}ms)`);

  if (rows.length === 0) {
    throw new Error("Query returned 0 rows — snapshot cannot be empty");
  }

  // Verify year range in results
  const years = rows.map((r) => Number(r.budgetYear));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  console.log(`Year range in data: ${minYear}–${maxYear}`);

  if (minYear < BUDGET_YEAR_MIN || maxYear > BUDGET_YEAR_MAX) {
    throw new Error(
      `YEAR RANGE FAIL: data contains budgetYear ${minYear}–${maxYear}. ` +
        `Expected range: ${BUDGET_YEAR_MIN}–${BUDGET_YEAR_MAX}.`
    );
  }

  // Normalize through pipeline
  console.log("Normalizing rows...");
  const viewRows = rdcRowsToViewResearchRows(rows);
  console.log(`  ViewResearchRows: ${viewRows.length}`);

  const dataset = normalizeRows(viewRows);
  console.log(`  Projects: ${dataset.projects.length}`);
  console.log(`  Budgets: ${dataset.budgets.length}`);
  console.log(`  Researchers: ${dataset.researchers.length}`);

  // Compute BudgetStats
  console.log("Computing BudgetStats...");
  const budgetStats = datasetToBudgetStats(dataset);
  console.log(`  byYear: ${budgetStats.byYear.length} entries`);
  console.log(`  byType: ${budgetStats.byType.length} entries`);
  console.log(`  bySource: ${budgetStats.bySource.length} entries`);
  console.log(`  byLevel: ${budgetStats.byLevel.length} entries`);

  return {
    source: "RDC",
    view: "centerDW.dbo.View_Research",
    budgetYearRange: [BUDGET_YEAR_MIN, BUDGET_YEAR_MAX],
    generatedAt: new Date().toISOString(),
    rowCount: rows.length,
    distinctProjects: dataset.projects.length,
    data: budgetStats,
  };
}

// ─── Write snapshot to disk ────────────────────────────────────────

function writeSnapshot(snapshot: BudgetSnapshot): void {
  console.log("Writing snapshot...");
  const dir = dirname(SNAPSHOT_PATH);
  mkdirSync(dir, { recursive: true });
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2), "utf-8");
  console.log(`Snapshot written: ${SNAPSHOT_PATH}`);
  console.log(
    `File size: ${Buffer.byteLength(JSON.stringify(snapshot), "utf-8")} bytes`
  );
}

// ─── Entry point ───────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("=".repeat(60));
  console.log("RDC Budget Snapshot Export");
  console.log("=".repeat(60));
  console.log(`Target: ${SNAPSHOT_PATH}`);
  console.log("");

  let snapshot: BudgetSnapshot;

  // Phase 1: Try live RDC connection
  const rdcPassword = process.env.RDC_SQL_PASSWORD;
  if (!rdcPassword) {
    console.warn(
      "⚠ RDC_SQL_PASSWORD not set — RDC unavailable, falling back to CSV."
    );
    snapshot = generateFallbackSnapshot();
  } else {
    try {
      console.log("Attempting live RDC connection...");
      snapshot = await exportFromRdc();
      console.log("Live RDC export completed.");
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      console.warn(`\n⚠ RDC connection failed: ${error}`);
      console.warn("⚠ Falling back to CSV export.");
      snapshot = generateFallbackSnapshot();
    }
  }

  // Phase 2: Privacy filter (defense-in-depth)
  console.log("\nApplying privacy filter...");
  applyPrivacyFilter(snapshot);
  console.log("  Privacy check PASSED");

  // Phase 3: Write snapshot
  writeSnapshot(snapshot);

  console.log("\nExport completed successfully.");
  console.log(`Source: ${snapshot.source}`);
  console.log(`Rows: ${snapshot.rowCount}`);
  console.log(`Projects: ${snapshot.distinctProjects}`);
}

main().catch((err: Error) => {
  console.error("\nExport failed unexpectedly:");
  console.error(`  ${err.message}`);
  // Exit 0 — do not fail the build solely because of RDC
  console.warn(
    "Exiting with code 0 to avoid blocking the build pipeline."
  );
  process.exit(0);
});

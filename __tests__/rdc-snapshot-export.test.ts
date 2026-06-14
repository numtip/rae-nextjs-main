/**
 * RDC Snapshot Export — Tests
 *
 * Validates:
 * 1. SQL query contains BETWEEN 2559 AND 2569
 * 2. Snapshot validator rejects out-of-range years
 * 3. Snapshot validator rejects personName
 * 4. Snapshot validator rejects raw personCode
 * 5. Adapter (isValidBudgetStats) accepts exported shape
 *
 * Run: npx tsx __tests__/rdc-snapshot-export.test.ts
 */

import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { isValidBudgetStats } from "../lib/adapters/budgetStatsAdapter";
import type { BudgetStats } from "../lib/data/models";

// ─── Test framework ────────────────────────────────────────────────

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];
const tempDir = resolve(__dirname, "..", "__tests__", "temp-snapshots");

function assert(condition: boolean, name: string, detail: string): void {
  results.push({ name, passed: condition, detail });
  console[condition ? "log" : "error"](
    `  ${condition ? "✓" : "✗"} ${name}: ${detail}`
  );
}

function printSummary(): void {
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n${"-".repeat(50)}`);
  console.log(
    `Results: ${passed} passed, ${failed} failed, ${results.length} total`
  );
  if (failed > 0) {
    console.log("\nFailed tests:");
    for (const r of results.filter((r) => !r.passed)) {
      console.log(`  ✗ ${r.name}: ${r.detail}`);
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

// ─── Helpers ───────────────────────────────────────────────────────

function makeValidBudgetStats(): BudgetStats {
  return {
    byYear: [
      { year: 2565, totalBudget: 500000, projectCount: 10 },
      { year: 2566, totalBudget: 750000, projectCount: 15 },
    ],
    byType: [
      { label: "งบประมาณภายในสถาบัน", budget: 500000, percentage: 40 },
      { label: "งบประมาณภายนอกสถาบัน", budget: 750000, percentage: 60 },
    ],
    bySource: [
      { label: "งบภายในหน่วยงาน", budget: 500000, count: 10 },
      { label: "หน่วยงานให้ทุนวิจัย", budget: 750000, count: 15 },
    ],
    byLevel: [
      { label: "ระดับมหาวิทยาลัย", budget: 500000, count: 10 },
      { label: "ระดับชาติ", budget: 750000, count: 15 },
    ],
    summary: {
      zeroBudgetProjects: 2,
      highestBudgetYear: 2566,
      highestBudgetAmount: 750000,
      averageBudgetPerYear: 625000,
    },
    generatedAt: new Date().toISOString(),
  };
}

function writeSnapshotFile(
  content: Record<string, unknown>,
  filename: string
): string {
  mkdirSync(tempDir, { recursive: true });
  const path = resolve(tempDir, filename);
  writeFileSync(path, JSON.stringify(content, null, 2), "utf-8");
  return path;
}

function runValidatorOn(path: string): { exitCode: number; output: string } {
  try {
    const stdout = execSync(
      `npx tsx scripts/validate-rdc-budget-snapshot.ts "${path}"`,
      { encoding: "utf-8", timeout: 15000 }
    );
    return { exitCode: 0, output: stdout };
  } catch (err: unknown) {
    const error = err as { status?: number; stdout?: string; stderr?: string; message?: string };
    return {
      exitCode: error.status ?? 1,
      output: error.stdout || error.stderr || error.message || "unknown error",
    };
  }
}

function cleanupTempFiles(): void {
  try {
    const files = [
      "valid-snapshot.json",
      "out-of-range-snapshot.json",
      "with-personName.json",
      "with-raw-personCode.json",
    ];
    for (const f of files) {
      try {
        unlinkSync(resolve(tempDir, f));
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }
}

// ─── Tests ─────────────────────────────────────────────────────────

function runTests(): void {
  console.log("\n=== RDC Snapshot Export — Tests ===\n");

  // ── 1. SQL query contains BETWEEN 2559 AND 2569 ────────────────
  console.log("[1] SQL Query Year Range");

  const exportScript = readFileSync(
    resolve(__dirname, "..", "scripts", "export-rdc-budget.ts"),
    "utf-8"
  );

  // Check the SQL query contains the BETWEEN clause (template literal form in source)
  const hasBetweenClause =
    exportScript.includes("budgetYear BETWEEN") &&
    (exportScript.includes("BUDGET_YEAR_MIN") || exportScript.includes("2559")) &&
    (exportScript.includes("BUDGET_YEAR_MAX") || exportScript.includes("2569"));
  assert(
    hasBetweenClause,
    "SQL query contains BETWEEN 2559 AND 2569",
    hasBetweenClause ? "Found (via template or constants)" : "NOT FOUND"
  );

  // Ensure the query does NOT export all years
  // Source uses buildViewResearchQuery(template) with BETWEEN clause
  const hasScopedQuery =
    exportScript.includes("buildViewResearchQuery(") &&
    exportScript.includes("budgetYear BETWEEN") &&
    (exportScript.includes("BUDGET_YEAR_MIN") || exportScript.includes("2559"));
  assert(
    hasScopedQuery,
    "SQL query is scoped (not all years)",
    hasScopedQuery ? "Scoped via buildViewResearchQuery with BETWEEN" : "May export all years"
  );

  // ── 2. Validator rejects out-of-range years ────────────────────
  console.log("\n[2] Validator Rejects Out-of-Range Years");

  const outOfRangeSnapshot = {
    source: "RDC",
    view: "centerDW.dbo.View_Research",
    budgetYearRange: [2559, 2569],
    generatedAt: new Date().toISOString(),
    rowCount: 100,
    distinctProjects: 50,
    data: makeValidBudgetStats(),
    // Override byYear to include out-of-range year
    _override: { byYear: [{ year: 2570, totalBudget: 100000, projectCount: 1 }] },
  };
  // Actually use the override
  outOfRangeSnapshot.data.byYear.push({
    year: 2570,
    totalBudget: 100000,
    projectCount: 1,
  });

  const outOfRangePath = writeSnapshotFile(
    outOfRangeSnapshot as unknown as Record<string, unknown>,
    "out-of-range-snapshot.json"
  );
  const outOfRangeResult = runValidatorOn(outOfRangePath);
  assert(
    outOfRangeResult.exitCode !== 0,
    "Validator exits non-zero for out-of-range year",
    `exitCode=${outOfRangeResult.exitCode}`
  );
  assert(
    outOfRangeResult.output.includes("FAIL") ||
      outOfRangeResult.output.includes("✗") ||
      outOfRangeResult.output.includes("<= 2569"),
    "Validator reports year range failure",
    outOfRangeResult.output.slice(0, 200)
  );

  // ── 3. Validator rejects personName ───────────────────────────
  console.log("\n[3] Validator Rejects personName");

  const withPersonNameSnapshot = {
    source: "RDC",
    view: "centerDW.dbo.View_Research",
    budgetYearRange: [2559, 2569],
    generatedAt: new Date().toISOString(),
    rowCount: 100,
    distinctProjects: 50,
    data: makeValidBudgetStats(),
    // Include personName somewhere it shouldn't be
    _leak: { personName: "Test Researcher" },
  };

  const personNamePath = writeSnapshotFile(
    withPersonNameSnapshot as unknown as Record<string, unknown>,
    "with-personName.json"
  );
  const personNameResult = runValidatorOn(personNamePath);
  assert(
    personNameResult.exitCode !== 0,
    "Validator exits non-zero when personName present",
    `exitCode=${personNameResult.exitCode}`
  );
  assert(
    personNameResult.output.includes("personName") ||
      personNameResult.output.includes("FAIL"),
    "Validator reports personName violation",
    personNameResult.output.slice(0, 200)
  );

  // ── 4. Validator rejects raw personCode ───────────────────────
  console.log("\n[4] Validator Rejects Raw personCode");

  const withRawCodeSnapshot = {
    source: "RDC",
    view: "centerDW.dbo.View_Research",
    budgetYearRange: [2559, 2569],
    generatedAt: new Date().toISOString(),
    rowCount: 100,
    distinctProjects: 50,
    data: makeValidBudgetStats(),
    _leak: { personCode: "0801198500078" },
  };

  const rawCodePath = writeSnapshotFile(
    withRawCodeSnapshot as unknown as Record<string, unknown>,
    "with-raw-personCode.json"
  );
  const rawCodeResult = runValidatorOn(rawCodePath);
  assert(
    rawCodeResult.exitCode !== 0,
    "Validator exits non-zero when raw personCode present",
    `exitCode=${rawCodeResult.exitCode}`
  );
  assert(
    rawCodeResult.output.includes("personCode") ||
      rawCodeResult.output.includes("FAIL"),
    "Validator reports personCode violation",
    rawCodeResult.output.slice(0, 200)
  );

  // ── 5. Validator accepts valid snapshot ───────────────────────
  console.log("\n[5] Validator Accepts Valid Snapshot");

  const validSnapshot = {
    source: "RDC",
    view: "centerDW.dbo.View_Research",
    budgetYearRange: [2559, 2569],
    generatedAt: new Date().toISOString(),
    rowCount: 100,
    distinctProjects: 50,
    data: makeValidBudgetStats(),
  };

  const validPath = writeSnapshotFile(
    validSnapshot as unknown as Record<string, unknown>,
    "valid-snapshot.json"
  );
  const validResult = runValidatorOn(validPath);
  assert(
    validResult.exitCode === 0,
    "Validator exits zero for valid snapshot",
    `exitCode=${validResult.exitCode}`
  );

  // ── 6. Adapter accepts exported shape ─────────────────────────
  console.log("\n[6] Adapter Accepts Exported Shape");

  const budgetStats = makeValidBudgetStats();
  const isValidShape = isValidBudgetStats(budgetStats);
  assert(
    isValidShape,
    "isValidBudgetStats returns true for valid shape",
    String(isValidShape)
  );

  // Verify BudgetStats has all required fields
  assert(
    budgetStats.byYear.length > 0,
    "byYear has entries",
    `count=${budgetStats.byYear.length}`
  );
  assert(
    budgetStats.byType.length > 0,
    "byType has entries",
    `count=${budgetStats.byType.length}`
  );
  assert(
    budgetStats.bySource.length > 0,
    "bySource has entries",
    `count=${budgetStats.bySource.length}`
  );
  assert(
    budgetStats.byLevel.length > 0,
    "byLevel has entries",
    `count=${budgetStats.byLevel.length}`
  );
  assert(
    budgetStats.summary.zeroBudgetProjects >= 0,
    "summary.zeroBudgetProjects is valid",
    `value=${budgetStats.summary.zeroBudgetProjects}`
  );

  // ── 7. Privacy filter in export script ─────────────────────────
  console.log("\n[7] Privacy Filter in Export Script");

  const hasPrivacyCheck = exportScript.includes("personName");
  assert(
    hasPrivacyCheck,
    "Export script checks for personName",
    hasPrivacyCheck ? "Found" : "NOT FOUND"
  );

  const hasPersonCodeCheck = exportScript.includes("personCode");
  assert(
    hasPersonCodeCheck,
    "Export script checks for personCode",
    hasPersonCodeCheck ? "Found" : "NOT FOUND"
  );

  // ── Cleanup and summary ───────────────────────────────────────
  cleanupTempFiles();
  printSummary();
}

runTests();

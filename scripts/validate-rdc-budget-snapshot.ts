/**
 * RDC Budget Snapshot Validator
 *
 * Validates that the exported snapshot at data/research/live-budget-2559-2569.json
 * satisfies all constraints before it can be used by the application.
 *
 * Checks:
 * - File exists and is valid JSON
 * - budgetYear range is exactly 2559–2569
 * - No personName field in output
 * - No raw (unmasked) personCode
 * - rowCount > 0
 * - All required BudgetStats fields are present and valid
 *
 * Run: npx tsx scripts/validate-rdc-budget-snapshot.ts [path-to-snapshot]
 * Default path: data/research/live-budget-2559-2569.json
 *
 * @see scripts/export-rdc-budget.ts
 * @see lib/contracts/budgetStats.ts
 * @see docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// ─── Constants ─────────────────────────────────────────────────────

const BUDGET_YEAR_MIN = 2559;
const BUDGET_YEAR_MAX = 2569;

const DEFAULT_SNAPSHOT_PATH = resolve(
  __dirname,
  "..",
  "data",
  "research",
  "live-budget-2559-2569.json"
);

// ─── Types ─────────────────────────────────────────────────────────

interface BudgetSnapshot {
  source: string;
  view: string;
  budgetYearRange: [number, number];
  generatedAt: string;
  rowCount: number;
  distinctProjects: number;
  data: {
    byYear: Array<{ year: number; totalBudget: number; projectCount: number }>;
    byType: Array<{ label: string; budget: number; percentage: number }>;
    bySource: Array<{ label: string; budget: number; count: number }>;
    byLevel: Array<{ label: string; budget: number; count: number }>;
    summary: {
      zeroBudgetProjects: number;
      highestBudgetYear: number;
      highestBudgetAmount: number;
      averageBudgetPerYear: number;
    };
    generatedAt: string;
  };
}

// ─── Validation checks ─────────────────────────────────────────────

interface ValidationCheck {
  name: string;
  passed: boolean;
  detail: string;
}

const checks: ValidationCheck[] = [];

function check(condition: boolean, name: string, detail: string): void {
  checks.push({ name, passed: condition, detail });
  console[condition ? "log" : "error"](
    `  ${condition ? "✓" : "✗"} ${name}: ${detail}`
  );
}

// ─── Main validation ───────────────────────────────────────────────

function validate(snapshotPath: string): void {
  console.log("\n=== RDC Budget Snapshot Validator ===\n");
  console.log(`File: ${snapshotPath}`);
  console.log("");

  // 1. File exists
  console.log("[1] File Existence");
  const fileExists = existsSync(snapshotPath);
  check(fileExists, "Snapshot file exists", snapshotPath);
  if (!fileExists) {
    printResults();
    process.exit(1);
  }

  // 2. Parse JSON
  console.log("\n[2] JSON Parsing");
  let snapshot: BudgetSnapshot;
  try {
    const content = readFileSync(snapshotPath, "utf-8");
    snapshot = JSON.parse(content);
    check(true, "Valid JSON", `Size: ${content.length} bytes`);
  } catch (err) {
    check(false, "Valid JSON", String(err));
    printResults();
    process.exit(1);
  }

  // 3. Top-level structure
  console.log("\n[3] Top-Level Structure");
  check(snapshot.source === "RDC", `source is "RDC"`, snapshot.source);
  check(
    snapshot.view === "centerDW.dbo.View_Research",
    `view is "centerDW.dbo.View_Research"`,
    snapshot.view
  );
  check(
    typeof snapshot.generatedAt === "string" && snapshot.generatedAt.length > 0,
    "generatedAt is present",
    snapshot.generatedAt
  );

  // 4. Year range
  console.log("\n[4] Budget Year Range");
  const hasYearRange = Array.isArray(snapshot.budgetYearRange) &&
    snapshot.budgetYearRange.length === 2;
  check(hasYearRange, "budgetYearRange is [min, max]", String(hasYearRange));

  if (hasYearRange) {
    const [rangeMin, rangeMax] = snapshot.budgetYearRange;
    check(
      rangeMin === BUDGET_YEAR_MIN,
      `budgetYearRange min = ${BUDGET_YEAR_MIN}`,
      String(rangeMin)
    );
    check(
      rangeMax === BUDGET_YEAR_MAX,
      `budgetYearRange max = ${BUDGET_YEAR_MAX}`,
      String(rangeMax)
    );

    // Verify data content respects year range
    // byYear entries all within range
    const byYearYears = snapshot.data.byYear.map((e) => e.year);
    const dataMinYear = Math.min(...byYearYears);
    const dataMaxYear = Math.max(...byYearYears);
    check(
      dataMinYear >= BUDGET_YEAR_MIN,
      `All byYear entries >= ${BUDGET_YEAR_MIN}`,
      `min=${dataMinYear}`
    );
    check(
      dataMaxYear <= BUDGET_YEAR_MAX,
      `All byYear entries <= ${BUDGET_YEAR_MAX}`,
      `max=${dataMaxYear}`
    );
  }

  // 5. Row count
  console.log("\n[5] Row Count");
  check(
    typeof snapshot.rowCount === "number" && snapshot.rowCount > 0,
    "rowCount > 0",
    `count=${snapshot.rowCount}`
  );
  check(
    typeof snapshot.distinctProjects === "number" && snapshot.distinctProjects > 0,
    "distinctProjects > 0",
    `count=${snapshot.distinctProjects}`
  );

  // 6. Privacy: no personName
  console.log("\n[6] Privacy Check — personName");
  const jsonStr = JSON.stringify(snapshot);
  const hasPersonName = jsonStr.includes("personName");
  check(!hasPersonName, "No personName in snapshot", "personName is excluded");

  // 7. Privacy: no raw personCode
  console.log("\n[7] Privacy Check — personCode (masked only)");
  const codeRegex = /"personCode":"([^"]+)"/g;
  let codeMatch: RegExpExecArray | null;
  let rawCodesFound = 0;
  while ((codeMatch = codeRegex.exec(jsonStr)) !== null) {
    const code = codeMatch[1];
    if (code && !code.includes("*") && code.length > 4) {
      rawCodesFound++;
    }
  }
  check(
    rawCodesFound === 0,
    "No raw (unmasked) personCode",
    rawCodesFound > 0
      ? `Found ${rawCodesFound} unmasked codes`
      : "All codes masked or absent"
  );

  // 8. BudgetStats structure
  console.log("\n[8] BudgetStats Structure");
  const d = snapshot.data;

  // byYear
  check(Array.isArray(d.byYear), "data.byYear is an array", "");
  for (const entry of d.byYear) {
    check(
      typeof entry.year === "number" &&
        typeof entry.totalBudget === "number" &&
        typeof entry.projectCount === "number",
      `byYear entry ${entry.year}: valid types`,
      `budget=${entry.totalBudget}, count=${entry.projectCount}`
    );
  }

  // byType
  check(Array.isArray(d.byType), "data.byType is an array", "");
  for (const entry of d.byType) {
    check(
      typeof entry.label === "string" &&
        typeof entry.budget === "number" &&
        typeof entry.percentage === "number",
      `byType entry "${entry.label}": valid types`,
      `budget=${entry.budget}, percentage=${entry.percentage}`
    );
  }

  // bySource
  check(Array.isArray(d.bySource), "data.bySource is an array", "");
  for (const entry of d.bySource) {
    check(
      typeof entry.label === "string" &&
        typeof entry.budget === "number" &&
        typeof entry.count === "number",
      `bySource entry "${entry.label}": valid types`,
      `budget=${entry.budget}, count=${entry.count}`
    );
  }

  // byLevel
  check(Array.isArray(d.byLevel), "data.byLevel is an array", "");
  for (const entry of d.byLevel) {
    check(
      typeof entry.label === "string" &&
        typeof entry.budget === "number" &&
        typeof entry.count === "number",
      `byLevel entry "${entry.label}": valid types`,
      `budget=${entry.budget}, count=${entry.count}`
    );
  }

  // summary
  check(d.summary !== null && typeof d.summary === "object", "data.summary exists", "");
  if (d.summary) {
    check(
      typeof d.summary.zeroBudgetProjects === "number",
      "summary.zeroBudgetProjects is number",
      `value=${d.summary.zeroBudgetProjects}`
    );
    check(
      typeof d.summary.highestBudgetYear === "number",
      "summary.highestBudgetYear is number",
      `value=${d.summary.highestBudgetYear}`
    );
    check(
      typeof d.summary.highestBudgetAmount === "number",
      "summary.highestBudgetAmount is number",
      `value=${d.summary.highestBudgetAmount}`
    );
    check(
      typeof d.summary.averageBudgetPerYear === "number",
      "summary.averageBudgetPerYear is number",
      `value=${d.summary.averageBudgetPerYear}`
    );
  }

  // generatedAt
  check(
    typeof d.generatedAt === "string",
    "data.generatedAt is string",
    d.generatedAt
  );

  // ── Results ─────────────────────────────────────────────────────
  printResults();
}

function printResults(): void {
  const passed = checks.filter((c) => c.passed).length;
  const failed = checks.filter((c) => !c.passed).length;
  console.log(`\n${"-".repeat(50)}`);
  console.log(
    `Validation: ${passed} passed, ${failed} failed, ${checks.length} total`
  );
  if (failed > 0) {
    console.log("\nFailed checks:");
    for (const c of checks.filter((c) => !c.passed)) {
      console.log(`  ✗ ${c.name}: ${c.detail}`);
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

// ─── Entry point ───────────────────────────────────────────────────

const snapshotPath = process.argv[2] || DEFAULT_SNAPSHOT_PATH;
validate(snapshotPath);

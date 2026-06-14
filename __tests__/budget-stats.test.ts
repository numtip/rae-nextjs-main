/**
 * Budget Statistics — Unit and Integration Tests
 *
 * Tests the adapter layer, schema integrity, and edge-case handling
 * for the Budget Statistics API.
 *
 * Run: npx tsx __tests__/budget-stats.test.ts
 */

import { loadResearchDataSync } from "../lib/csv/loader";
import { computeBudgetStats } from "../lib/data/aggregates";
import {
  datasetToBudgetStats,
  computeAndWrapBudgetStats,
  createEmptyBudgetStats,
  isValidBudgetStats,
} from "../lib/adapters/budgetStatsAdapter";
import type { ResearchDataset, ResearchBudget, ResearchProject, Researcher, ViewResearchRow } from "../lib/data/models";
import type { BudgetStats, BudgetStatsResponse } from "../lib/contracts/budgetStats";

// ─── Test framework ────────────────────────────────────────────────

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

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
  console.log(`Results: ${passed} passed, ${failed} failed, ${results.length} total`);
  if (failed > 0) {
    console.log("\nFailed tests:");
    for (const r of results.filter((r) => !r.passed)) {
      console.log(`  ✗ ${r.name}: ${r.detail}`);
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

// ─── Test data factories ───────────────────────────────────────────

function makeEmptyDataset(): ResearchDataset {
  return {
    projects: [],
    budgets: [],
    researchers: [],
    rawRows: [],
  };
}

function makeValidBudgetRow(overrides: Partial<ResearchBudget> = {}): ResearchBudget {
  return {
    budgetId: 1,
    researchId: 100,
    moneyTypeId: 1,
    moneyTypeName: "งบประมาณภายในสถาบัน",
    moneyId: 1,
    moneyName: "งบภายในหน่วยงาน",
    moneyLevelId: 1,
    levelName: "ระดับคณะ/สำนักงาน",
    budgetDetail: "Test budget",
    budgetYear: 2565,
    budgetBath: 500000,
    ...overrides,
  };
}

function makeValidProject(overrides: Partial<ResearchProject> = {}): ResearchProject {
  return {
    researchId: 100,
    refCode: "TEST-001",
    nameTh: "โครงการทดสอบ",
    nameEng: "Test Project",
    typeId: 1,
    typeName: "การวิจัยประยุกต์",
    programId: 1,
    programName: "ทดสอบ",
    denominationId: 1,
    denominationName: "-- ไม่ระบุ --",
    roadmapId: 1,
    roadmapName: "-- ไม่ระบุ --",
    isSeries: false,
    isSeriesMain: false,
    isSuccess: true,
    dateBegin: "2023-01-01",
    dateFinish: "2024-12-31",
    ...overrides,
  };
}

function makeResearcher(overrides: Partial<Researcher> = {}): Researcher {
  return {
    researcherId: 1,
    researchId: 100,
    personType: 1,
    personTypeName: "บุคลากรภายใน",
    personCode: "****0078",
    personName: "Test Researcher",
    positionId: "001",
    position: "นักวิจัย",
    departmentCode: "001",
    divisionCode: null,
    sectionCode: null,
    facultyId: null,
    programCode: null,
    departmentName: "คณะทดสอบ",
    workPercent: 100,
    researchPersonBudget: 500000,
    disciplineGroupId: 1,
    disciplineGroupName: "วิทยาศาสตร์และเทคโนโลยี",
    ...overrides,
  };
}

// ─── Tests ─────────────────────────────────────────────────────────

function runTests(): void {
  console.log("\n=== Budget Statistics — Tests ===\n");

  // ── 1. Smoke test: real CSV data ──────────────────────────────
  console.log("[1] Real CSV Data Smoke Test");

  let realDataset: ResearchDataset;
  try {
    realDataset = loadResearchDataSync();
    assert(true, "CSV loads successfully", `projects=${realDataset.projects.length}`);
  } catch (err) {
    assert(false, "CSV loads successfully", String(err));
    console.log("\n  ⚠ CSV not found — running with synthetic data only.\n");
    // We can still test with synthetic data
    realDataset = makeEmptyDataset();
  }

  if (realDataset.projects.length > 0) {
    // Test computeBudgetStats (canonical aggregation)
    const stats = computeBudgetStats(realDataset);
    assert(stats.byYear.length > 0, "computeBudgetStats produces byYear", `count=${stats.byYear.length}`);
    assert(typeof stats.byYear[0].year === "number", "byYear[0].year is number", `value=${stats.byYear[0].year}`);
    assert(typeof stats.byYear[0].totalBudget === "number", "byYear[0].totalBudget is number", `value=${stats.byYear[0].totalBudget}`);
    assert(typeof stats.byYear[0].projectCount === "number", "byYear[0].projectCount is number", `value=${stats.byYear[0].projectCount}`);
    assert(typeof stats.generatedAt === "string", "generatedAt is string", `value=${stats.generatedAt}`);

    // Test adapter with real data
    const adapterStats = datasetToBudgetStats(realDataset);
    assert(isValidBudgetStats(adapterStats), "adapter produces valid BudgetStats from real data", "");
    assert(adapterStats.byYear.length > 0, "adapter byYear not empty", `count=${adapterStats.byYear.length}`);

    // Test wrapped response
    const wrapped = computeAndWrapBudgetStats(realDataset);
    assert(wrapped.success === true, "wrapped response has success=true", "");
    assert(typeof wrapped.generatedAt === "string", "wrapped response has generatedAt", "");
    assert(isValidBudgetStats(wrapped.data), "wrapped response data is valid", "");
    assert(wrapped.data.byYear.length > 0, "wrapped response data has byYear", "");

    // Verify byType percentages sum to ~100%
    const totalPercentage = wrapped.data.byType.reduce((s, t) => s + t.percentage, 0);
    assert(totalPercentage > 90 && totalPercentage <= 100, "byType percentages sum reasonably", `sum=${totalPercentage}%`);

    // Verify summary fields
    const summary = wrapped.data.summary;
    assert(summary.zeroBudgetProjects >= 0, "zeroBudgetProjects >= 0", `value=${summary.zeroBudgetProjects}`);
    assert(summary.averageBudgetPerYear >= 0, "averageBudgetPerYear >= 0", `value=${summary.averageBudgetPerYear}`);
  }

  // ── 2. Empty dataset handling ─────────────────────────────────
  console.log("\n[2] Empty Dataset Handling");

  const emptyDataset = makeEmptyDataset();

  const emptyStats = datasetToBudgetStats(emptyDataset);
  assert(isValidBudgetStats(emptyStats), "empty dataset produces valid BudgetStats", "");
  assert(emptyStats.byYear.length === 0, "empty dataset: byYear is empty", "");
  assert(emptyStats.byType.length === 0, "empty dataset: byType is empty", "");
  assert(emptyStats.bySource.length === 0, "empty dataset: bySource is empty", "");
  assert(emptyStats.byLevel.length === 0, "empty dataset: byLevel is empty", "");
  assert(emptyStats.summary.zeroBudgetProjects === 0, "empty dataset: zeroBudgetProjects = 0", "");
  assert(emptyStats.summary.highestBudgetYear === 0, "empty dataset: highestBudgetYear = 0", "");
  assert(emptyStats.summary.highestBudgetAmount === 0, "empty dataset: highestBudgetAmount = 0", "");
  assert(emptyStats.summary.averageBudgetPerYear === 0, "empty dataset: averageBudgetPerYear = 0", "");

  const emptyWrapped = computeAndWrapBudgetStats(emptyDataset);
  assert(emptyWrapped.success === true, "empty dataset: wrapped success=true", "");
  assert(isValidBudgetStats(emptyWrapped.data), "empty dataset: wrapped data valid", "");

  // Test createEmptyBudgetStats helper
  const emptyHelper = createEmptyBudgetStats();
  assert(isValidBudgetStats(emptyHelper), "createEmptyBudgetStats produces valid stats", "");
  assert(emptyHelper.byYear.length === 0, "createEmptyBudgetStats: byYear empty", "");

  // ── 3. Null and malformed data ─────────────────────────────────
  console.log("\n[3] Null and Malformed Data Handling");

  // Budgets with null year (unique budget sum to avoid cache collision)
  const nullYearBudgets: ResearchBudget[] = [
    makeValidBudgetRow({ researchId: 200, budgetYear: null, budgetBath: 111 }),
    makeValidBudgetRow({ researchId: 200, budgetId: 2, budgetYear: null, budgetBath: 222 }),
  ];
  const nullYearDataset: ResearchDataset = {
    projects: [makeValidProject({ researchId: 200 })],
    budgets: nullYearBudgets,
    researchers: [makeResearcher({ researchId: 200 })],
    rawRows: [],
  };
  const nullYearStats = datasetToBudgetStats(nullYearDataset);
  assert(isValidBudgetStats(nullYearStats), "null budgetYear: valid stats", "");
  assert(nullYearStats.byYear.length === 0, "null budgetYear: excluded from byYear", "");

  // Budgets with null moneyTypeName (unique budget sum)
  const nullTypeBudgets: ResearchBudget[] = [
    makeValidBudgetRow({ researchId: 300, budgetId: 10, moneyTypeName: null, budgetBath: 100000 }),
    makeValidBudgetRow({ researchId: 300, budgetId: 11, moneyTypeName: "ภายนอก", budgetBath: 200000 }),
  ];
  const nullTypeDataset: ResearchDataset = {
    projects: [makeValidProject({ researchId: 300 })],
    budgets: nullTypeBudgets,
    researchers: [makeResearcher({ researchId: 300 })],
    rawRows: [],
  };
  const nullTypeStats = datasetToBudgetStats(nullTypeDataset);
  assert(isValidBudgetStats(nullTypeStats), "null moneyTypeName: valid stats", "");
  const nullTypeEntry = nullTypeStats.byType.find((t) => t.label === "Unspecified");
  assert(nullTypeEntry !== undefined, "null moneyTypeName: labeled as Unspecified", `labels=${nullTypeStats.byType.map((t) => t.label).join(",")}`);
  assert(nullTypeEntry.budget === 100000, "null moneyTypeName: budget counted", `value=${nullTypeEntry.budget}`);

  // Budgets with null budgetBath (unique budget sum)
  const nullAmountBudgets: ResearchBudget[] = [
    makeValidBudgetRow({ researchId: 400, budgetBath: null }),
    makeValidBudgetRow({ researchId: 400, budgetId: 2, budgetBath: 999999, budgetYear: 2565 }),
  ];
  const nullAmountDataset: ResearchDataset = {
    projects: [makeValidProject({ researchId: 400 })],
    budgets: nullAmountBudgets,
    researchers: [makeResearcher({ researchId: 400 })],
    rawRows: [],
  };
  const nullAmountStats = datasetToBudgetStats(nullAmountDataset);
  assert(isValidBudgetStats(nullAmountStats), "null budgetBath: valid stats", "");
  // Null budgetBath treated as 0
  const yearEntry = nullAmountStats.byYear.find((y) => y.year === 2565);
  assert(yearEntry !== undefined, "null budgetBath: byYear entry exists", "");
  assert(yearEntry!.totalBudget === 999999, "null budgetBath: total is sum of non-null", `value=${yearEntry!.totalBudget}`);

  // ── 4. Schema integrity ────────────────────────────────────────
  console.log("\n[4] Schema Integrity");

  assert(isValidBudgetStats(null) === false, "null is not valid BudgetStats", "");
  assert(isValidBudgetStats(undefined) === false, "undefined is not valid BudgetStats", "");
  assert(isValidBudgetStats("string") === false, "string is not valid BudgetStats", "");
  assert(isValidBudgetStats(123) === false, "number is not valid BudgetStats", "");
  assert(isValidBudgetStats({}) === false, "empty object is not valid BudgetStats", "");

  const partial = { byYear: [], byType: [] };
  assert(isValidBudgetStats(partial) === false, "partial object is not valid BudgetStats", "");

  // ── 5. Multiple budgets per project (aggregation) ──────────────
  console.log("\n[5] Multi-Budget Aggregation");

  const multiBudgets: ResearchBudget[] = [
    makeValidBudgetRow({ budgetId: 1, researchId: 100, budgetYear: 2565, budgetBath: 100000, moneyTypeName: "ภายใน" }),
    makeValidBudgetRow({ budgetId: 2, researchId: 100, budgetYear: 2565, budgetBath: 200000, moneyTypeName: "ภายใน" }),
    makeValidBudgetRow({ budgetId: 3, researchId: 101, budgetYear: 2565, budgetBath: 300000, moneyTypeName: "ภายนอก" }),
  ];
  const multiDataset: ResearchDataset = {
    projects: [
      makeValidProject({ researchId: 100 }),
      makeValidProject({ researchId: 101 }),
    ],
    budgets: multiBudgets,
    researchers: [],
    rawRows: [],
  };
  const multiStats = datasetToBudgetStats(multiDataset);
  assert(isValidBudgetStats(multiStats), "multi-budget: valid stats", "");
  const multiYear = multiStats.byYear.find((y) => y.year === 2565);
  assert(multiYear !== undefined, "multi-budget: year entry exists", "");
  assert(multiYear!.totalBudget === 600000, "multi-budget: total sums correctly", `value=${multiYear!.totalBudget}`);
  assert(multiYear!.projectCount === 2, "multi-budget: projectCount counts distinct projects", `value=${multiYear!.projectCount}`);

  // Verify byType aggregation
  const internalType = multiStats.byType.find((t) => t.label === "ภายใน");
  const externalType = multiStats.byType.find((t) => t.label === "ภายนอก");
  assert(internalType !== undefined, "multi-budget: internal type present", "");
  assert(internalType!.budget === 300000, "multi-budget: internal budget sums across budgets", `value=${internalType!.budget}`);
  assert(externalType !== undefined, "multi-budget: external type present", "");
  assert(externalType!.budget === 300000, "multi-budget: external budget correct", `value=${externalType!.budget}`);

  // ── 6. Dataset with null (missing) researchId ─────────────────
  console.log("\n[6] Orphan Budgets (no matching project)");

  const orphanBudgets: ResearchBudget[] = [
    makeValidBudgetRow({ researchId: 999, budgetYear: 2565, budgetBath: 50000 }),
  ];
  const orphanDataset: ResearchDataset = {
    projects: [],
    budgets: orphanBudgets,
    researchers: [],
    rawRows: [],
  };
  const orphanStats = datasetToBudgetStats(orphanDataset);
  assert(isValidBudgetStats(orphanStats), "orphan budgets: valid stats", "");
  assert(orphanStats.byYear.length === 1, "orphan budgets: byYear has entry", "year=2565");
  assert(orphanStats.byYear[0].totalBudget === 50000, "orphan budgets: totalBudget correct", `value=${orphanStats.byYear[0].totalBudget}`);

  // ── Summary ────────────────────────────────────────────────────
  printSummary();
}

runTests();

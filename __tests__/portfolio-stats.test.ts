/**
 * Portfolio Statistics — Unit Tests
 *
 * Tests the computePortfolioStats aggregate function and the
 * /api/research/stats/portfolio response shape.
 *
 * Run: npx tsx __tests__/portfolio-stats.test.ts
 */

import { computePortfolioStats } from "../lib/data/aggregates";
import type { ResearchDataset, ResearchProject, ResearchBudget, Researcher, ViewResearchRow } from "../lib/data/models";

// ─── Minimal test framework ────────────────────────────────────────

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

function makeDataset(
  projects: ResearchProject[],
  budgets: ResearchBudget[],
  researchers: Researcher[]
): ResearchDataset {
  return { projects, budgets, researchers, rawRows: [] as ViewResearchRow[] };
}

function makeProject(id: number, opts: Partial<ResearchProject> = {}): ResearchProject {
  return {
    researchId: id,
    refCode: `REF-${id}`,
    nameTh: `โครงการ ${id}`,
    nameEng: null,
    typeId: 1,
    typeName: opts.typeName ?? "วิจัยพื้นฐาน",
    programId: null,
    programName: null,
    denominationId: null,
    denominationName: null,
    roadmapId: null,
    roadmapName: null,
    isSeries: false,
    isSeriesMain: false,
    isSuccess: opts.isSuccess ?? false,
    dateBegin: null,
    dateFinish: null,
    ...opts,
  };
}

function makeBudget(id: number, researchId: number, opts: Partial<ResearchBudget> = {}): ResearchBudget {
  return {
    budgetId: id,
    researchId,
    moneyTypeId: 1,
    moneyTypeName: "ทุนภายใน",
    moneyId: 1,
    moneyName: "งบประมาณแผ่นดิน",
    moneyLevelId: null,
    levelName: null,
    budgetDetail: null,
    budgetYear: 2567,
    budgetBath: 100000,
    ...opts,
  };
}

function makeResearcher(id: number, researchId: number, opts: Partial<Researcher> = {}): Researcher {
  return {
    researcherId: id,
    researchId,
    personType: 1,
    personTypeName: "หัวหน้าโครงการ",
    personCode: `P${id}`,
    personName: `นักวิจัย ${id}`,
    positionId: "01",
    position: "อาจารย์",
    departmentCode: opts.departmentCode ?? "DEP01",
    divisionCode: null,
    sectionCode: null,
    facultyId: null,
    programCode: null,
    departmentName: opts.departmentName ?? "สาขาวิชาวิทยาการคอมพิวเตอร์",
    workPercent: 100,
    researchPersonBudget: 100000,
    disciplineGroupId: 1,
    disciplineGroupName: "วิทยาศาสตร์และเทคโนโลยี",
    ...opts,
  };
}

// ─── Tests ────────────────────────────────────────────────────────

console.log("\nPortfolio Stats Tests\n" + "=".repeat(50));

// ── Empty dataset ──────────────────────────────────────────────────
console.log("\n[1] Empty dataset");
{
  const stats = computePortfolioStats(makeDataset([], [], []));

  assert(stats.summary.totalProjects === 0, "empty: totalProjects = 0", String(stats.summary.totalProjects));
  assert(stats.summary.totalBudget === 0, "empty: totalBudget = 0", String(stats.summary.totalBudget));
  assert(stats.summary.activeProjects === 0, "empty: activeProjects = 0", String(stats.summary.activeProjects));
  assert(stats.summary.completedProjects === 0, "empty: completedProjects = 0", String(stats.summary.completedProjects));
  assert(stats.summary.successRate === 0, "empty: successRate = 0", String(stats.summary.successRate));
  assert(stats.summary.researchTypeCount === 0, "empty: researchTypeCount = 0", String(stats.summary.researchTypeCount));
  assert(stats.summary.departmentCount === 0, "empty: departmentCount = 0", String(stats.summary.departmentCount));
  assert(stats.byResearchType.length === 0, "empty: byResearchType = []", String(stats.byResearchType.length));
  assert(stats.byDepartment.length === 0, "empty: byDepartment = []", String(stats.byDepartment.length));
  assert(stats.recentProjects.length === 0, "empty: recentProjects = []", String(stats.recentProjects.length));
  assert(typeof stats.generatedAt === "string", "empty: generatedAt is string", typeof stats.generatedAt);
}

// ── Single project ─────────────────────────────────────────────────
console.log("\n[2] Single successful project");
{
  const p = makeProject(1, { isSuccess: true, typeName: "วิจัยพื้นฐาน" });
  const b = makeBudget(1, 1, { budgetBath: 500000 });
  const r = makeResearcher(1, 1, { departmentName: "สาขาคอมพิวเตอร์" });
  const stats = computePortfolioStats(makeDataset([p], [b], [r]));

  assert(stats.summary.totalProjects === 1, "single: totalProjects = 1", String(stats.summary.totalProjects));
  assert(stats.summary.totalBudget === 500000, "single: totalBudget = 500000", String(stats.summary.totalBudget));
  assert(stats.summary.completedProjects === 1, "single: completedProjects = 1", String(stats.summary.completedProjects));
  assert(stats.summary.activeProjects === 0, "single: activeProjects = 0", String(stats.summary.activeProjects));
  assert(stats.summary.successRate === 100, "single: successRate = 100", String(stats.summary.successRate));
  assert(stats.summary.researchTypeCount === 1, "single: researchTypeCount = 1", String(stats.summary.researchTypeCount));
  assert(stats.summary.departmentCount === 1, "single: departmentCount = 1", String(stats.summary.departmentCount));
}

// ── Success rate calculation ───────────────────────────────────────
console.log("\n[3] Success rate: 2 of 4 projects");
{
  const projects = [
    makeProject(1, { isSuccess: true }),
    makeProject(2, { isSuccess: true }),
    makeProject(3, { isSuccess: false }),
    makeProject(4, { isSuccess: false }),
  ];
  const budgets = projects.map((p, i) => makeBudget(i + 1, p.researchId));
  const stats = computePortfolioStats(makeDataset(projects, budgets, []));

  assert(stats.summary.totalProjects === 4, "rate: totalProjects = 4", String(stats.summary.totalProjects));
  assert(stats.summary.completedProjects === 2, "rate: completedProjects = 2", String(stats.summary.completedProjects));
  assert(stats.summary.activeProjects === 2, "rate: activeProjects = 2", String(stats.summary.activeProjects));
  assert(stats.summary.successRate === 50, "rate: successRate = 50", String(stats.summary.successRate));
}

// ── byResearchType breakdown ───────────────────────────────────────
console.log("\n[4] byResearchType breakdown");
{
  const projects = [
    makeProject(1, { typeName: "วิจัยพื้นฐาน" }),
    makeProject(2, { typeName: "วิจัยพื้นฐาน" }),
    makeProject(3, { typeName: "วิจัยประยุกต์" }),
  ];
  const budgets = [
    makeBudget(1, 1, { budgetBath: 100000 }),
    makeBudget(2, 2, { budgetBath: 200000 }),
    makeBudget(3, 3, { budgetBath: 300000 }),
  ];
  const stats = computePortfolioStats(makeDataset(projects, budgets, []));

  assert(stats.byResearchType.length === 2, "byType: 2 types", String(stats.byResearchType.length));
  const top = stats.byResearchType[0];
  assert(top.label === "วิจัยพื้นฐาน", "byType: top is วิจัยพื้นฐาน", top.label);
  assert(top.count === 2, "byType: top count = 2", String(top.count));
  assert(top.budget === 300000, "byType: top budget = 300000", String(top.budget));
  assert(typeof top.percentage === "number", "byType: percentage is number", typeof top.percentage);
  assert(top.percentage > 0 && top.percentage <= 100, "byType: percentage in range", String(top.percentage));
}

// ── byDepartment breakdown ─────────────────────────────────────────
console.log("\n[5] byDepartment breakdown");
{
  const projects = [
    makeProject(1),
    makeProject(2),
    makeProject(3),
  ];
  const budgets = projects.map((p, i) => makeBudget(i + 1, p.researchId, { budgetBath: 100000 }));
  const researchers = [
    makeResearcher(1, 1, { departmentName: "คณะวิทยาศาสตร์" }),
    makeResearcher(2, 2, { departmentName: "คณะวิทยาศาสตร์" }),
    makeResearcher(3, 3, { departmentName: "คณะวิศวกรรมศาสตร์" }),
  ];
  const stats = computePortfolioStats(makeDataset(projects, budgets, researchers));

  assert(stats.byDepartment.length === 2, "byDept: 2 departments", String(stats.byDepartment.length));
  const top = stats.byDepartment[0];
  assert(top.label === "คณะวิทยาศาสตร์", "byDept: top is คณะวิทยาศาสตร์", top.label);
  assert(top.count === 2, "byDept: top count = 2", String(top.count));
  assert(stats.summary.departmentCount === 2, "byDept: departmentCount = 2", String(stats.summary.departmentCount));
}

// ── recentProjects capped at 10 ────────────────────────────────────
console.log("\n[6] recentProjects capped at 10");
{
  const projects = Array.from({ length: 15 }, (_, i) => makeProject(i + 1));
  const budgets = projects.map((p, i) => makeBudget(i + 1, p.researchId));
  const stats = computePortfolioStats(makeDataset(projects, budgets, []));

  assert(stats.recentProjects.length === 10, "recent: capped at 10", String(stats.recentProjects.length));
  // Should be sorted by researchId desc — highest IDs first
  assert(
    stats.recentProjects[0].researchId > stats.recentProjects[9].researchId,
    "recent: sorted desc by researchId",
    `${stats.recentProjects[0].researchId} > ${stats.recentProjects[9].researchId}`
  );
}

// ── response shape is complete ─────────────────────────────────────
console.log("\n[7] Response shape completeness");
{
  const stats = computePortfolioStats(
    makeDataset(
      [makeProject(1, { isSuccess: true })],
      [makeBudget(1, 1)],
      [makeResearcher(1, 1)]
    )
  );

  assert("summary" in stats, "shape: has summary", "ok");
  assert("byResearchType" in stats, "shape: has byResearchType", "ok");
  assert("byDepartment" in stats, "shape: has byDepartment", "ok");
  assert("recentProjects" in stats, "shape: has recentProjects", "ok");
  assert("generatedAt" in stats, "shape: has generatedAt", "ok");
  assert(Array.isArray(stats.byResearchType), "shape: byResearchType is array", String(Array.isArray(stats.byResearchType)));
  assert(Array.isArray(stats.byDepartment), "shape: byDepartment is array", String(Array.isArray(stats.byDepartment)));
  assert(Array.isArray(stats.recentProjects), "shape: recentProjects is array", String(Array.isArray(stats.recentProjects)));

  // Verify breakdown items have all required fields
  if (stats.byResearchType.length > 0) {
    const item = stats.byResearchType[0];
    assert("label" in item, "shape: breakdown has label", "ok");
    assert("count" in item, "shape: breakdown has count", "ok");
    assert("budget" in item, "shape: breakdown has budget", "ok");
    assert("percentage" in item, "shape: breakdown has percentage", "ok");
  }
}

// ── print summary ──────────────────────────────────────────────────
printSummary();

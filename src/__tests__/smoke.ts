/**
 * Smoke test script for the Research Analytics data layer.
 *
 * Run: npx tsx src/__tests__/smoke.ts
 *
 * Tests:
 * 1. CSV file loading
 * 2. Row parsing and normalization
 * 3. Entity splitting (projects, budgets, researchers)
 * 4. Overview aggregation
 * 5. personCode masking
 * 6. Placeholder normalization
 */

import { loadResearchDataSync } from "../lib/csv/loader";
import { maskPersonCode } from "../lib/csv/normalizer";
import { computeOverviewStats, computeBudgetStats, computeFilters, computeProjects, computeProjectDetail, computeResearcherDetail, DEFAULT_PROJECTS_PARAMS } from "../lib/data/aggregates";
import type { ResearchDataset, FiltersResponse, FilterOption } from "../lib/data/models";

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, detail: string): void {
  results.push({ name, passed: condition, detail });
  console[condition ? "log" : "error"](`  ${condition ? "✓" : "✗"} ${name}: ${detail}`);
}

function runTests(): void {
  console.log("\n=== Research Analytics — Smoke Tests ===\n");

  // ── 1. CSV Loading ─────────────────────────────────────────────
  console.log("[1] CSV Loading");

  let dataset: ResearchDataset;
  try {
    dataset = loadResearchDataSync();
    assert(true, "CSV loads successfully", `from data/research/a3.csv`);
  } catch (err) {
    assert(false, "CSV loads successfully", String(err));
    console.log("\n⚠ CSV loading failed — skipping remaining tests.\n");
    return;
  }

  assert(dataset.projects.length > 0, "Has projects", `count=${dataset.projects.length}`);
  assert(dataset.budgets.length > 0, "Has budgets", `count=${dataset.budgets.length}`);
  assert(dataset.researchers.length > 0, "Has researchers", `count=${dataset.researchers.length}`);
  assert(dataset.rawRows.length > 0, "Has raw rows", `count=${dataset.rawRows.length}`);

  // ── 2. Data Quality ────────────────────────────────────────────
  console.log("\n[2] Data Quality");

  // personCode masking
  const firstResearcher = dataset.researchers[0];
  if (firstResearcher?.personCode) {
    const masked = firstResearcher.personCode;
    const hasAsterisk = masked.includes("*");
    const last4 = masked.slice(-4);
    assert(hasAsterisk || masked.length <= 4, "personCode masked",
      `"${masked}" → last 4: "${last4}"`);
  } else {
    assert(true, "personCode is null", "no personCode to mask (null is acceptable)");
  }

  // Placeholder normalization
  const projectsWithUnspecified = dataset.projects.filter((p) => p.typeName === "-- ไม่ระบุ --");
  assert(projectsWithUnspecified.length === 0, "Placeholders normalized to null",
    `0 projects have "-- ไม่ระบุ --" typeName`);

  // Budget years are numbers
  const budgetYears = dataset.budgets.filter((b) => b.budgetYear !== null).map((b) => b.budgetYear);
  const allNumericYears = budgetYears.every((y) => typeof y === "number" && !isNaN(y!));
  assert(allNumericYears, "Budget years are valid numbers",
    `sample years: ${budgetYears.slice(0, 5).join(", ")}`);

  // ── 3. Deduplication ───────────────────────────────────────────
  console.log("\n[3] Project Deduplication");

  const projectIds = dataset.projects.map((p) => p.researchId);
  const uniqueIds = new Set(projectIds);
  assert(uniqueIds.size === projectIds.length, "No duplicate research IDs",
    `unique=${uniqueIds.size}, total=${projectIds.length}`);

  // ── 4. Overview Stats ──────────────────────────────────────────
  console.log("\n[4] Overview Aggregation");

  const stats = computeOverviewStats(dataset);
  assert(stats.kpis.totalProjects === dataset.projects.length, "totalProjects matches",
    `${stats.kpis.totalProjects} === ${dataset.projects.length}`);
  assert(stats.kpis.totalBudget > 0, "totalBudget > 0",
    `฿${stats.kpis.totalBudget.toLocaleString()}`);
  assert(stats.kpis.budgetYears.length > 0, "Has budget years",
    `years: ${stats.kpis.budgetYears.join(", ")}`);
  assert(stats.byType.length > 0, "Has type breakdown",
    `${stats.byType.length} types: ${stats.byType.map((t) => t.label).join(", ")}`);
  assert(stats.byDiscipline.length > 0, "Has discipline breakdown",
    `${stats.byDiscipline.length} groups`);
  assert(stats.byFundingType.length > 0, "Has funding type breakdown",
    `${stats.byFundingType.length} types`);
  assert(stats.generatedAt.length > 0, "Has generatedAt timestamp",
    stats.generatedAt);

  // ── 5. Budget Consistency ──────────────────────────────────────
  console.log("\n[5] Budget Consistency");

  const zeroBudgetBudgets = dataset.budgets.filter((b) => b.budgetBath === 0);
  assert(zeroBudgetBudgets.length > 0, "Zero-budget records preserved (not treated as null)",
    `count=${zeroBudgetBudgets.length}`);

  // ── 6. Budget Stats ────────────────────────────────────────────
  console.log("\n[6] Budget Stats");

  const budgetStats = computeBudgetStats(dataset);

  // byYear shape
  assert(budgetStats.byYear.length > 0, "Budget byYear has entries",
    `${budgetStats.byYear.length} years: ${budgetStats.byYear.map((y) => y.year).join(", ")}`);
  assert(budgetStats.byYear.every((y) => y.year > 0), "byYear years are valid",
    "all years are positive numbers");
  assert(budgetStats.byYear.every((y) => y.totalBudget >= 0), "byYear budgets are non-negative",
    "all budgets >= 0");
  assert(budgetStats.byYear.every((y) => y.projectCount > 0), "byYear project counts are positive",
    "all projectCount > 0");

  // byType shape
  assert(budgetStats.byType.length > 0, "Budget byType has entries",
    `${budgetStats.byType.length} types: ${budgetStats.byType.map((t) => t.label).join(", ")}`);
  assert(budgetStats.byType.every((t) => t.budget >= 0), "byType budgets are non-negative",
    "all budgets >= 0");
  assert(budgetStats.byType.every((t) => t.percentage >= 0), "byType percentages are non-negative",
    "all percentages >= 0");

  // bySource shape
  assert(budgetStats.bySource.length > 0, "Budget bySource has entries",
    `${budgetStats.bySource.length} sources: ${budgetStats.bySource.map((s) => s.label).join(", ")}`);
  assert(budgetStats.bySource.every((s) => s.budget >= 0), "bySource budgets are non-negative",
    "all budgets >= 0");
  assert(budgetStats.bySource.every((s) => s.count > 0), "bySource counts are positive",
    "all counts > 0");

  // byLevel shape
  assert(budgetStats.byLevel.length > 0, "Budget byLevel has entries",
    `${budgetStats.byLevel.length} levels: ${budgetStats.byLevel.map((l) => l.label).join(", ")}`);
  assert(budgetStats.byLevel.every((l) => l.budget >= 0), "byLevel budgets are non-negative",
    "all budgets >= 0");
  assert(budgetStats.byLevel.every((l) => l.count > 0), "byLevel counts are positive",
    "all counts > 0");

  // Summary shape
  assert(typeof budgetStats.summary.zeroBudgetProjects === "number", "summary has zeroBudgetProjects",
    `zeroBudgetProjects=${budgetStats.summary.zeroBudgetProjects}`);
  assert(typeof budgetStats.summary.highestBudgetYear === "number", "summary has highestBudgetYear",
    `highestBudgetYear=${budgetStats.summary.highestBudgetYear}`);
  assert(typeof budgetStats.summary.highestBudgetAmount === "number", "summary has highestBudgetAmount",
    `highestBudgetAmount=${budgetStats.summary.highestBudgetAmount}`);
  assert(typeof budgetStats.summary.averageBudgetPerYear === "number", "summary has averageBudgetPerYear",
    `averageBudgetPerYear=${budgetStats.summary.averageBudgetPerYear}`);
  assert(budgetStats.generatedAt.length > 0, "Has generatedAt timestamp",
    budgetStats.generatedAt);

  // Cross-footing check: total budget across byType should equal total budget across bySource
  const totalByType = budgetStats.byType.reduce((s, t) => s + t.budget, 0);
  const totalBySource = budgetStats.bySource.reduce((s, t) => s + t.budget, 0);
  const totalByLevel = budgetStats.byLevel.reduce((s, t) => s + t.budget, 0);
  const crossFootTolerance = 0.01;
  assert(
    Math.abs(totalByType - totalBySource) < crossFootTolerance,
    "Budget cross-footing: byType ≈ bySource",
    `byType=${totalByType}, bySource=${totalBySource}`
  );
  assert(
    Math.abs(totalByType - totalByLevel) < crossFootTolerance,
    "Budget cross-footing: byType ≈ byLevel",
    `byType=${totalByType}, byLevel=${totalByLevel}`
  );

  // Percentage sum should be ~100%
  const totalPercentage = budgetStats.byType.reduce((s, t) => s + t.percentage, 0);
  assert(
    Math.abs(totalPercentage - 100) < 1,
    "byType percentages sum to ~100%",
    `total=${totalPercentage}%`
  );

  // byYear entries are sorted ascending
  const years = budgetStats.byYear.map((y) => y.year);
  const sortedYears = [...years].sort((a, b) => a - b);
  assert(
    JSON.stringify(years) === JSON.stringify(sortedYears),
    "byYear is sorted ascending",
    `years: ${years.join(", ")}`
  );

  // ── 7. Filters API ────────────────────────────────────────────
  console.log("\n[7] Filters API");

  const filters = computeFilters(dataset);

  // Response structure
  assert(Array.isArray(filters.budgetYears), "budgetYears is an array",
    `length=${filters.budgetYears.length}`);
  assert(Array.isArray(filters.fundingTypes), "fundingTypes is an array",
    `length=${filters.fundingTypes.length}`);
  assert(Array.isArray(filters.moneySources), "moneySources is an array",
    `length=${filters.moneySources.length}`);
  assert(Array.isArray(filters.levels), "levels is an array",
    `length=${filters.levels.length}`);
  assert(Array.isArray(filters.disciplines), "disciplines is an array",
    `length=${filters.disciplines.length}`);
  assert(Array.isArray(filters.researchTypes), "researchTypes is an array",
    `length=${filters.researchTypes.length}`);
  assert(filters.generatedAt.length > 0, "Has generatedAt timestamp",
    filters.generatedAt);

  // All sections have entries
  assert(filters.budgetYears.length > 0, "budgetYears has entries",
    `${filters.budgetYears.length} years`);
  assert(filters.fundingTypes.length > 0, "fundingTypes has entries",
    `${filters.fundingTypes.length} types`);
  assert(filters.moneySources.length > 0, "moneySources has entries",
    `${filters.moneySources.length} sources`);
  assert(filters.levels.length > 0, "levels has entries",
    `${filters.levels.length} levels`);
  assert(filters.disciplines.length > 0, "disciplines has entries",
    `${filters.disciplines.length} disciplines`);
  assert(filters.researchTypes.length > 0, "researchTypes has entries",
    `${filters.researchTypes.length} types`);

  // Uniqueness
  const uniqueYears = new Set(filters.budgetYears.map((o) => o.value));
  assert(uniqueYears.size === filters.budgetYears.length, "budgetYears are unique",
    `${uniqueYears.size} unique values`);
  const uniqueTypes = new Set(filters.fundingTypes.map((o) => o.value));
  assert(uniqueTypes.size === filters.fundingTypes.length, "fundingTypes are unique",
    `${uniqueTypes.size} unique values`);
  const uniqueSources = new Set(filters.moneySources.map((o) => o.value));
  assert(uniqueSources.size === filters.moneySources.length, "moneySources are unique",
    `${uniqueSources.size} unique values`);
  const uniqueLevels = new Set(filters.levels.map((o) => o.value));
  assert(uniqueLevels.size === filters.levels.length, "levels are unique",
    `${uniqueLevels.size} unique values`);
  const uniqueDisciplines = new Set(filters.disciplines.map((o) => o.value));
  assert(uniqueDisciplines.size === filters.disciplines.length, "disciplines are unique",
    `${uniqueDisciplines.size} unique values`);
  const uniqueResearchTypes = new Set(filters.researchTypes.map((o) => o.value));
  assert(uniqueResearchTypes.size === filters.researchTypes.length, "researchTypes are unique",
    `${uniqueResearchTypes.size} unique values`);

  // Sort order: budgetYears descending
  const yearValues = filters.budgetYears.map((o) => parseInt(o.value));
  const sortedYearValues = [...yearValues].sort((a, b) => b - a);
  assert(
    JSON.stringify(yearValues) === JSON.stringify(sortedYearValues),
    "budgetYears sorted descending",
    `years: ${yearValues.join(", ")}`
  );

  // Sort order: others by count descending
  for (const key of ["fundingTypes", "moneySources", "levels", "disciplines", "researchTypes"] as const) {
    const arr = filters[key];
    const counts = arr.map((o) => o.count);
    const sortedCounts = [...counts].sort((a, b) => b - a);
    assert(
      JSON.stringify(counts) === JSON.stringify(sortedCounts),
      `${key} sorted by count descending`,
      `counts: ${counts.join(", ")}`
    );
  }

  // FilterOption shape: each option has label, value, count
  const allOptions: FilterOption[] = [
    ...filters.budgetYears,
    ...filters.fundingTypes,
    ...filters.moneySources,
    ...filters.levels,
    ...filters.disciplines,
    ...filters.researchTypes,
  ];
  assert(allOptions.every((o) => typeof o.label === "string"), "All options have label",
    `${allOptions.length} options`);
  assert(allOptions.every((o) => typeof o.value === "string"), "All options have value",
    `${allOptions.length} options`);
  assert(allOptions.every((o) => typeof o.count === "number" && o.count >= 0), "All options have count >= 0",
    `${allOptions.length} options`);

  // Unspecified research type uses __unspecified__ value
  const unspecifiedFilter = filters.researchTypes.find((rt) => rt.label === "Unspecified");
  assert(unspecifiedFilter !== undefined, "Unspecified research type present",
    unspecifiedFilter ? `count=${unspecifiedFilter.count}` : "not found");
  assert(unspecifiedFilter?.value === "__unspecified__", "Unspecified uses __unspecified__ value",
    `value="${unspecifiedFilter?.value}"`);

  // Deterministic check: calling twice gives same result
  const filters2 = computeFilters(dataset);
  assert(JSON.stringify(filters) === JSON.stringify(filters2), "Filters output is deterministic",
    `same output on repeated call`);

  // ── 8. Projects API ───────────────────────────────────────────
  console.log("\n[8] Projects API");

  const defaultResult = computeProjects(dataset, DEFAULT_PROJECTS_PARAMS);

  // Response structure
  assert(Array.isArray(defaultResult.items), "items is an array", `length=${defaultResult.items.length}`);
  assert(typeof defaultResult.pagination === "object", "pagination is an object", "");
  assert(typeof defaultResult.filters === "object", "filters is an object", "");
  assert(typeof defaultResult.generatedAt === "string", "generatedAt is string", defaultResult.generatedAt);

  // Pagination shape
  assert(defaultResult.pagination.page === 1, "default page is 1", `page=${defaultResult.pagination.page}`);
  assert(defaultResult.pagination.pageSize === 20, "default pageSize is 20", `pageSize=${defaultResult.pagination.pageSize}`);
  assert(typeof defaultResult.pagination.totalItems === "number", "totalItems is number",
    `totalItems=${defaultResult.pagination.totalItems}`);
  assert(typeof defaultResult.pagination.totalPages === "number", "totalPages is number",
    `totalPages=${defaultResult.pagination.totalPages}`);
  assert(defaultResult.pagination.totalItems === dataset.projects.length, "totalItems equals project count",
    `${defaultResult.pagination.totalItems} === ${dataset.projects.length}`);

  // Item shape
  if (defaultResult.items.length > 0) {
    const first = defaultResult.items[0];
    assert(typeof first.researchId === "number", "item has researchId", `${first.researchId}`);
    assert(typeof first.totalBudget === "number", "item has totalBudget", `${first.totalBudget}`);
    assert(Array.isArray(first.researcherNames), "item has researcherNames array", `${first.researcherNames.length} names`);
    assert(typeof first.isSuccess === "boolean", "item has isSuccess boolean", `${first.isSuccess}`);
  }

  // personCode never leaks into response (researcher names only, not codes)
  const hasExposedCode = defaultResult.items.some((i) =>
    i.researcherNames.some((n) => /^\d{9,}$/.test(n))
  );
  assert(!hasExposedCode, "personCode not exposed in researcherNames", "codes never appear as names");

  // Zero-budget preserved
  const zeroBudgetItems = defaultResult.items.filter((i) => i.totalBudget === 0);
  assert(zeroBudgetItems.length > 0, "Zero-budget projects included", `count=${zeroBudgetItems.length}`);

  // Default sort: researchId descending
  const ids = defaultResult.items.map((i) => i.researchId);
  const sortedDesc = [...ids].sort((a, b) => b - a);
  assert(JSON.stringify(ids) === JSON.stringify(sortedDesc), "Default sort is researchId desc",
    `first=${ids[0]}, last=${ids[ids.length - 1]}`);

  // Sort asc
  const ascResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, order: "asc" });
  const idsAsc = ascResult.items.map((i) => i.researchId);
  const sortedAsc = [...idsAsc].sort((a, b) => a - b);
  assert(JSON.stringify(idsAsc) === JSON.stringify(sortedAsc), "Sort asc: researchId ascending",
    `first=${idsAsc[0]}, last=${idsAsc[idsAsc.length - 1]}`);

  // Sort by totalBudget desc
  const budgetSortResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, sort: "totalBudget", order: "desc", pageSize: 100 });
  const budgets2 = budgetSortResult.items.map((i) => i.totalBudget);
  const isBudgetSortedDesc = budgets2.every((v, i) => i === 0 || budgets2[i - 1] >= v);
  assert(isBudgetSortedDesc, "Sort by totalBudget desc is correct",
    `first=${budgets2[0]}, last=${budgets2[budgets2.length - 1]}`);

  // Pagination: page 1 + page 2 = full dataset (pageSize=10)
  const p1 = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, page: 1, pageSize: 10 });
  const p2 = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, page: 2, pageSize: 10 });
  assert(p1.items.length <= 10, "Page 1 has ≤10 items", `count=${p1.items.length}`);
  assert(p1.pagination.totalItems === dataset.projects.length, "Pagination totalItems correct",
    `${p1.pagination.totalItems}`);
  const p1Ids = new Set(p1.items.map((i) => i.researchId));
  const p2Ids = new Set(p2.items.map((i) => i.researchId));
  const overlap = [...p1Ids].filter((id) => p2Ids.has(id));
  assert(overlap.length === 0, "Pages do not overlap", `overlap=${overlap.length}`);
  assert(p1.items.length + p2.items.length <= dataset.projects.length, "Page 1+2 ≤ total",
    `${p1.items.length} + ${p2.items.length} ≤ ${dataset.projects.length}`);

  // Search: narrow down results
  if (dataset.projects.length > 0) {
    const sampleName = dataset.projects[0]?.nameTh?.slice(0, 5) ?? null;
    if (sampleName) {
      const searchResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, q: sampleName });
      assert(searchResult.pagination.totalItems <= dataset.projects.length, "Search reduces result count",
        `${searchResult.pagination.totalItems} ≤ ${dataset.projects.length}`);
      assert(searchResult.items.every((i) => i.nameTh?.includes(sampleName) || i.nameEng?.includes(sampleName) || i.refCode?.includes(sampleName)),
        "Search results contain query term", `q="${sampleName}"`);
    }
  }

  // Search: no match
  const noMatchResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, q: "ZZZZZZ_NO_MATCH_XYZ" });
  assert(noMatchResult.pagination.totalItems === 0, "Search with no match returns empty", "totalItems=0");
  assert(noMatchResult.items.length === 0, "Empty search has no items", "items=[]");
  assert(noMatchResult.pagination.totalPages >= 1, "totalPages >= 1 even when empty", `totalPages=${noMatchResult.pagination.totalPages}`);

  // Filter by budgetYear
  const yearFilterResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, budgetYears: [2561] });
  assert(yearFilterResult.pagination.totalItems <= dataset.projects.length, "Budget year filter reduces count",
    `${yearFilterResult.pagination.totalItems} ≤ ${dataset.projects.length}`);
  assert(yearFilterResult.pagination.totalItems > 0, "Budget year 2561 has results", `count=${yearFilterResult.pagination.totalItems}`);

  // Filter by fundingType
  const ftFilterResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, fundingTypes: ["งบประมาณภายในสถาบัน"] });
  assert(ftFilterResult.pagination.totalItems > 0, "FundingType filter has results", `count=${ftFilterResult.pagination.totalItems}`);

  // Filter: __unspecified__ research type
  const unspecResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, researchTypes: ["__unspecified__"] });
  assert(unspecResult.pagination.totalItems > 0, "Unspecified type filter has results", `count=${unspecResult.pagination.totalItems}`);
  assert(unspecResult.items.every((i) => i.typeName === null), "Unspecified filter returns only null-type projects",
    `all typeName=null`);

  // Filter: named research type excludes unspecified
  const namedTypeResult = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, researchTypes: ["การวิจัยประยุกต์"] });
  assert(namedTypeResult.pagination.totalItems > 0, "Named research type filter has results", `count=${namedTypeResult.pagination.totalItems}`);
  assert(namedTypeResult.items.every((i) => i.typeName === "การวิจัยประยุกต์"), "Named type filter matches correctly", "all typeName correct");

  // Filters echo back in response
  const withFilters = computeProjects(dataset, { ...DEFAULT_PROJECTS_PARAMS, budgetYears: [2561, 2562], q: "test" });
  assert(JSON.stringify(withFilters.filters.budgetYears) === JSON.stringify([2561, 2562]), "filters.budgetYears echoed", `${JSON.stringify(withFilters.filters.budgetYears)}`);
  assert(withFilters.filters.q === "test", "filters.q echoed", `q="${withFilters.filters.q}"`);

  // Deterministic output
  const r1 = computeProjects(dataset, DEFAULT_PROJECTS_PARAMS);
  const r2 = computeProjects(dataset, DEFAULT_PROJECTS_PARAMS);
  assert(JSON.stringify(r1.items.map((i) => i.researchId)) === JSON.stringify(r2.items.map((i) => i.researchId)),
    "Output is deterministic", "same IDs on repeated call");

  // ── 9. Project Detail API ──────────────────────────────────────
  console.log("\n[9] Project Detail API");

  // Pick a known valid ID from the dataset
  const knownProject = dataset.projects[0];
  const knownId = knownProject.researchId;

  // Valid project detail response
  const detail = computeProjectDetail(dataset, knownId);
  assert(detail !== null, "computeProjectDetail returns non-null for known ID",
    `researchId=${knownId}`);

  if (detail !== null) {
    // project shape
    assert(typeof detail.project.researchId === "number", "detail.project has researchId",
      `researchId=${detail.project.researchId}`);
    assert(detail.project.researchId === knownId, "detail.project.researchId matches lookup ID",
      `${detail.project.researchId} === ${knownId}`);
    assert(typeof detail.project.totalBudget === "number", "detail.project.totalBudget is number",
      `totalBudget=${detail.project.totalBudget}`);
    assert(detail.project.totalBudget >= 0, "detail.project.totalBudget >= 0",
      `${detail.project.totalBudget}`);
    assert(typeof detail.project.isSuccess === "boolean", "detail.project.isSuccess is boolean",
      `isSuccess=${detail.project.isSuccess}`);

    // researchers array shape
    assert(Array.isArray(detail.researchers), "detail.researchers is an array",
      `length=${detail.researchers.length}`);
    if (detail.researchers.length > 0) {
      const r = detail.researchers[0];
      assert(typeof r.researcherId === "number", "researcher has researcherId",
        `researcherId=${r.researcherId}`);
      assert(typeof r.personTypeName === "string", "researcher has personTypeName",
        `personTypeName=${r.personTypeName}`);
      assert(typeof r.disciplineGroupName === "string", "researcher has disciplineGroupName",
        `disciplineGroupName=${r.disciplineGroupName}`);
    }

    // budgets array shape
    assert(Array.isArray(detail.budgets), "detail.budgets is an array",
      `length=${detail.budgets.length}`);
    if (detail.budgets.length > 0) {
      const b = detail.budgets[0];
      assert(typeof b.budgetId === "number", "budget has budgetId",
        `budgetId=${b.budgetId}`);
    }

    // generatedAt is ISO string
    assert(typeof detail.generatedAt === "string" && detail.generatedAt.length > 0,
      "detail has generatedAt timestamp", detail.generatedAt);

    // personCode masking: no researcher should expose a raw numeric-only code
    const leaksCode = detail.researchers.some((r) =>
      r.personCode !== null && /^\d{9,}$/.test(r.personCode)
    );
    assert(!leaksCode, "personCode masked in detail researchers",
      "no raw numeric-only personCode exposed");

    // personCode format: if present, must contain asterisks or be short (≤4 chars)
    const allMasked = detail.researchers.every((r) =>
      r.personCode === null || r.personCode.includes("*") || r.personCode.length <= 4
    );
    assert(allMasked, "personCode format is masked or null",
      `${detail.researchers.length} researchers checked`);

    // All researcher entries belong to this project (via dataset cross-check)
    const expectedResearcherIds = new Set(
      dataset.researchers.filter((r) => r.researchId === knownId).map((r) => r.researcherId)
    );
    const actualResearcherIds = new Set(detail.researchers.map((r) => r.researcherId));
    assert(
      expectedResearcherIds.size === actualResearcherIds.size,
      "detail.researchers count matches dataset",
      `expected=${expectedResearcherIds.size}, actual=${actualResearcherIds.size}`
    );

    // All budget entries belong to this project (via dataset cross-check)
    const expectedBudgetIds = new Set(
      dataset.budgets.filter((b) => b.researchId === knownId).map((b) => b.budgetId)
    );
    const actualBudgetIds = new Set(detail.budgets.map((b) => b.budgetId));
    assert(
      expectedBudgetIds.size === actualBudgetIds.size,
      "detail.budgets count matches dataset",
      `expected=${expectedBudgetIds.size}, actual=${actualBudgetIds.size}`
    );

    // totalBudget equals sum of all budgetBath for this project
    const expectedTotal = Math.round(
      dataset.budgets
        .filter((b) => b.researchId === knownId)
        .reduce((s, b) => s + (b.budgetBath ?? 0), 0) * 100
    ) / 100;
    assert(
      detail.project.totalBudget === expectedTotal,
      "detail.project.totalBudget matches sum of budgetBath",
      `${detail.project.totalBudget} === ${expectedTotal}`
    );

    // Researchers sorted ascending by researcherId (deterministic)
    const rIds = detail.researchers.map((r) => r.researcherId);
    const sortedRIds = [...rIds].sort((a, b) => a - b);
    assert(
      JSON.stringify(rIds) === JSON.stringify(sortedRIds),
      "detail.researchers sorted by researcherId ascending",
      `first=${rIds[0]}, last=${rIds[rIds.length - 1]}`
    );

    // Budgets sorted ascending by budgetId (deterministic)
    const bIds = detail.budgets.map((b) => b.budgetId);
    const sortedBIds = [...bIds].sort((a, b) => a - b);
    assert(
      JSON.stringify(bIds) === JSON.stringify(sortedBIds),
      "detail.budgets sorted by budgetId ascending",
      `first=${bIds[0]}, last=${bIds[bIds.length - 1]}`
    );

    // Deterministic output: two calls produce identical JSON
    const detail2 = computeProjectDetail(dataset, knownId);
    assert(
      JSON.stringify(detail) === JSON.stringify(detail2),
      "Project detail output is deterministic",
      "same JSON on repeated call"
    );
  }

  // 404 for unknown ID
  const unknownDetail = computeProjectDetail(dataset, 999999999);
  assert(unknownDetail === null, "computeProjectDetail returns null for unknown ID",
    "researchId=999999999 → null");

  // Zero-budget preservation: find a project with budgetBath=0
  const zeroBudgetProject = dataset.budgets.find((b) => b.budgetBath === 0);
  if (zeroBudgetProject) {
    const zeroDetail = computeProjectDetail(dataset, zeroBudgetProject.researchId);
    assert(zeroDetail !== null, "Zero-budget project detail is retrievable",
      `researchId=${zeroBudgetProject.researchId}`);
    if (zeroDetail) {
      const zeroBudgetEntry = zeroDetail.budgets.find((b) => b.budgetBath === 0);
      assert(zeroBudgetEntry !== undefined, "Zero-budget entry preserved in detail.budgets",
        `budgetBath=0 present`);
    }
  }

  // Placeholder normalization: typeName should never be "-- ไม่ระบุ --"
  if (detail !== null) {
    assert(
      detail.project.typeName !== "-- ไม่ระบุ --",
      "Placeholder normalized: typeName is not raw placeholder",
      `typeName="${detail.project.typeName}"`
    );
  }

  // Existing APIs unaffected: computeProjects still returns same total
  const existingCheck = computeProjects(dataset, DEFAULT_PROJECTS_PARAMS);
  assert(
    existingCheck.pagination.totalItems === dataset.projects.length,
    "Existing Projects API unaffected by Slice 5",
    `totalItems=${existingCheck.pagination.totalItems}`
  );

  // ── 10. Researcher Detail API ─────────────────────────────────
  console.log("\n[10] Researcher Detail API");

  // Pick a known researcher with a non-null personCode
  const researcherWithCode = dataset.researchers.find((r) => r.personCode !== null);
  const knownMaskedCode = researcherWithCode?.personCode ?? null;

  if (knownMaskedCode === null) {
    assert(true, "No researcher with personCode in dataset — skipping detail tests", "no personCode");
  } else {
    // Valid researcher detail response
    const rDetail = computeResearcherDetail(dataset, knownMaskedCode);
    assert(rDetail !== null, "computeResearcherDetail returns non-null for known masked code",
      `personCode=${knownMaskedCode}`);

    if (rDetail !== null) {
      // researcher profile shape
      assert(typeof rDetail.researcher === "object", "detail.researcher is an object", "");
      assert(rDetail.researcher.personCode === knownMaskedCode,
        "detail.researcher.personCode matches lookup code",
        `"${rDetail.researcher.personCode}" === "${knownMaskedCode}"`);
      assert(typeof rDetail.researcher.personTypeName === "string",
        "detail.researcher.personTypeName is string",
        rDetail.researcher.personTypeName);
      assert(typeof rDetail.researcher.position === "string",
        "detail.researcher.position is string",
        rDetail.researcher.position);
      assert(rDetail.researcher.nameEn === null,
        "detail.researcher.nameEn is always null",
        "nameEn=null");
      assert(rDetail.researcher.facultyName === null,
        "detail.researcher.facultyName is always null",
        "facultyName=null");

      // stats shape
      assert(typeof rDetail.stats === "object", "detail.stats is an object", "");
      assert(typeof rDetail.stats.totalProjects === "number",
        "stats.totalProjects is number", `${rDetail.stats.totalProjects}`);
      assert(rDetail.stats.totalProjects > 0,
        "stats.totalProjects > 0", `${rDetail.stats.totalProjects}`);
      assert(typeof rDetail.stats.totalBudget === "number",
        "stats.totalBudget is number", `${rDetail.stats.totalBudget}`);
      assert(rDetail.stats.totalBudget >= 0,
        "stats.totalBudget >= 0", `${rDetail.stats.totalBudget}`);
      assert(Array.isArray(rDetail.stats.budgetYears),
        "stats.budgetYears is array", `length=${rDetail.stats.budgetYears.length}`);
      assert(Array.isArray(rDetail.stats.roles),
        "stats.roles is array", `length=${rDetail.stats.roles.length}`);

      // projects array shape
      assert(Array.isArray(rDetail.projects), "detail.projects is an array",
        `length=${rDetail.projects.length}`);
      assert(rDetail.projects.length > 0, "detail.projects is not empty",
        `count=${rDetail.projects.length}`);
      assert(rDetail.projects.length === rDetail.stats.totalProjects,
        "projects.length equals stats.totalProjects",
        `${rDetail.projects.length} === ${rDetail.stats.totalProjects}`);

      if (rDetail.projects.length > 0) {
        const p0 = rDetail.projects[0];
        assert(typeof p0.researchId === "number", "project item has researchId", `${p0.researchId}`);
        assert(typeof p0.totalBudget === "number", "project item has totalBudget", `${p0.totalBudget}`);
        assert(typeof p0.isSuccess === "boolean", "project item has isSuccess boolean", `${p0.isSuccess}`);
      }

      // projects sorted ascending by researchId (deterministic)
      const pIds = rDetail.projects.map((p) => p.researchId);
      const sortedPIds = [...pIds].sort((a, b) => a - b);
      assert(JSON.stringify(pIds) === JSON.stringify(sortedPIds),
        "detail.projects sorted by researchId ascending",
        `first=${pIds[0]}, last=${pIds[pIds.length - 1]}`);

      // byYear array shape
      assert(Array.isArray(rDetail.byYear), "detail.byYear is an array",
        `length=${rDetail.byYear.length}`);
      if (rDetail.byYear.length > 0) {
        const y0 = rDetail.byYear[0];
        assert(typeof y0.year === "number", "byYear entry has year", `${y0.year}`);
        assert(typeof y0.totalBudget === "number", "byYear entry has totalBudget", `${y0.totalBudget}`);
        assert(typeof y0.projectCount === "number", "byYear entry has projectCount", `${y0.projectCount}`);
        assert(Array.isArray(y0.projects), "byYear entry has projects array", `length=${y0.projects.length}`);
        assert(y0.projectCount === y0.projects.length,
          "byYear.projectCount matches projects.length",
          `${y0.projectCount} === ${y0.projects.length}`);
      }

      // byYear sorted ascending by year
      const byYearYears = rDetail.byYear.map((y) => y.year);
      const sortedByYears = [...byYearYears].sort((a, b) => a - b);
      assert(JSON.stringify(byYearYears) === JSON.stringify(sortedByYears),
        "detail.byYear sorted ascending by year",
        `years: ${byYearYears.join(", ")}`);

      // generatedAt is ISO string
      assert(typeof rDetail.generatedAt === "string" && rDetail.generatedAt.length > 0,
        "detail has generatedAt timestamp", rDetail.generatedAt);

      // ── Privacy checks ─────────────────────────────────────────
      // 1. personCode in response uses masked form
      const pc = rDetail.researcher.personCode;
      const isRawNumeric = pc !== null && /^\d{5,}$/.test(pc);
      assert(!isRawNumeric,
        "detail.researcher.personCode is not raw numeric",
        `value="${pc}"`);

      // 2. Serialized JSON contains no raw personCode (9+ digit all-numeric)
      const serialized = JSON.stringify(rDetail);
      const rawCodePattern = /"\d{9,}"/;
      assert(!rawCodePattern.test(serialized),
        "Serialized response contains no raw 9+ digit personCode",
        "no raw numeric codes in JSON output");

      // 3. Masking is idempotent: applying maskPersonCode to the masked code yields the same value
      const reMasked = maskPersonCode(knownMaskedCode);
      assert(reMasked === knownMaskedCode,
        "maskPersonCode is idempotent on masked code",
        `maskPersonCode("${knownMaskedCode}") === "${reMasked}"`);

      // 4. All projects belong to this researcher (cross-check with dataset)
      const expectedIds = new Set(
        dataset.researchers
          .filter((r) => r.personCode === knownMaskedCode)
          .map((r) => r.researchId)
      );
      const actualIds = new Set(rDetail.projects.map((p) => p.researchId));
      assert(expectedIds.size === actualIds.size,
        "detail.projects count matches dataset researcher rows",
        `expected=${expectedIds.size}, actual=${actualIds.size}`);

      // Deterministic output: two calls produce identical JSON
      const rDetail2 = computeResearcherDetail(dataset, knownMaskedCode);
      assert(JSON.stringify(rDetail) === JSON.stringify(rDetail2),
        "Researcher detail output is deterministic",
        "same JSON on repeated call");

      // Zero-budget preservation: if any project has totalBudget=0, it appears in projects
      const zeroBudgetInDataset = dataset.budgets.find(
        (b) => b.budgetBath === 0 && expectedIds.has(b.researchId)
      );
      if (zeroBudgetInDataset) {
        const zeroProjInDetail = rDetail.projects.find((p) => p.totalBudget === 0);
        assert(zeroProjInDetail !== undefined,
          "Zero-budget project preserved in researcher detail",
          `researchId=${zeroBudgetInDataset.researchId}`);
      }
    }
  }

  // 404 behaviour: unknown masked code returns null
  const unknownResearcher = computeResearcherDetail(dataset, "*****UNKNOWN");
  assert(unknownResearcher === null,
    "computeResearcherDetail returns null for unknown masked code",
    "maskedCode='*****UNKNOWN' → null");

  // maskPersonCode utility: real code → masked form
  const realCode = "123456780078";
  const expectedMasked = "********0078";
  const actualMasked = maskPersonCode(realCode);
  assert(actualMasked === expectedMasked,
    "maskPersonCode: real code → expected masked form",
    `"${realCode}" → "${actualMasked}"`);

  // maskPersonCode utility: null → null
  assert(maskPersonCode(null) === null,
    "maskPersonCode(null) returns null", "null → null");

  // maskPersonCode utility: short code (≤4 chars) returned as-is
  assert(maskPersonCode("1234") === "1234",
    "maskPersonCode: short code ≤4 returned as-is", "1234 → 1234");

  // Existing APIs unaffected
  const existingCheck2 = computeProjects(dataset, DEFAULT_PROJECTS_PARAMS);
  assert(
    existingCheck2.pagination.totalItems === dataset.projects.length,
    "Existing Projects API unaffected by Slice 6",
    `totalItems=${existingCheck2.pagination.totalItems}`
  );

  // ── Summary ────────────────────────────────────────────────────
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n=== Results: ${passed} passed, ${failed} failed (${results.length} total) ===\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();

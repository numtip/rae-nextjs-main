/**
 * Aggregate functions for computing overview KPIs and breakdowns
 * from a ResearchDataset.
 */

import type { ResearchDataset, OverviewStats, BudgetStats, FiltersResponse, FilterOption, ProjectListItem, ProjectsResponse, ProjectDetailResponse, ResearcherDetail, BudgetDetail, ProjectDetailProject, ResearcherDetailResponse, ResearcherProfile, ResearcherStats, ResearcherProjectItem, ResearcherByYear, PortfolioStats, PortfolioBreakdownItem } from "@/lib/data/models";
import { PERSON_TYPE } from "@/lib/constants";
import { dataCache } from "@/lib/cache";
import { CACHE_TTL } from "@/lib/constants";

/**
 * Compute the executive overview KPIs from a (possibly filtered) dataset.
 *
 * Returns: totalProjects, totalBudget, successCount, successRate,
 *          externalFundingCount, internalFundingCount, budgetYears,
 *          plus breakdowns by type, discipline, and funding type.
 */
export function computeOverviewStats(dataset: ResearchDataset): OverviewStats {
  const cacheKey = `overview:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<OverviewStats>(cacheKey);
  if (cached) return cached;

  const { projects, budgets, researchers } = dataset;

  // ── KPI: Total projects ────────────────────────────────────────
  const totalProjects = projects.length;

  // ── KPI: Total budget (sum of distinct project budgets) ────────
  // Use the first budget entry per project to avoid double-counting
  const projectBudgets = new Map<number, number>();
  for (const b of budgets) {
    if (!projectBudgets.has(b.researchId) && b.budgetBath !== null) {
      projectBudgets.set(b.researchId, b.budgetBath);
    }
  }
  const totalBudget = Array.from(projectBudgets.values()).reduce((sum, v) => sum + v, 0);

  // ── KPI: Success count ─────────────────────────────────────────
  const successCount = projects.filter((p) => p.isSuccess).length;
  const successRate = totalProjects > 0 ? Math.round((successCount / totalProjects) * 100 * 10) / 10 : 0;

  // ── KPI: Funding counts ────────────────────────────────────────
  // Determine external/internal from the first budget of each project
  const externalFundingIds = new Set<number>();
  const internalFundingIds = new Set<number>();
  const seen = new Set<number>();
  for (const b of budgets) {
    if (!seen.has(b.researchId)) {
      seen.add(b.researchId);
      if (b.moneyTypeName === PERSON_TYPE.EXTERNAL || b.moneyTypeName?.includes("ภายนอก")) {
        externalFundingIds.add(b.researchId);
      } else {
        internalFundingIds.add(b.researchId);
      }
    }
  }
  // Also check via researcher personTypeName
  for (const r of researchers) {
    if (!seen.has(r.researchId)) {
      seen.add(r.researchId);
      if (r.personTypeName === PERSON_TYPE.EXTERNAL) {
        externalFundingIds.add(r.researchId);
      } else {
        internalFundingIds.add(r.researchId);
      }
    }
  }

  // ── KPI: Budget years ──────────────────────────────────────────
  const yearSet = new Set<number>();
  for (const b of budgets) {
    if (b.budgetYear !== null) yearSet.add(b.budgetYear);
  }
  const budgetYears = Array.from(yearSet).sort((a, b) => b - a); // descending

  // ── Breakdown: by research type ────────────────────────────────
  const typeMap = new Map<string, { count: number; budget: number }>();
  for (const p of projects) {
    const key = p.typeName ?? "Unspecified";
    const entry = typeMap.get(key) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += projectBudgets.get(p.researchId) ?? 0;
    typeMap.set(key, entry);
  }
  const byType = Array.from(typeMap.entries())
    .map(([label, v]) => ({ label, count: v.count, budget: Math.round(v.budget * 100) / 100 }))
    .sort((a, b) => b.count - a.count);

  // ── Breakdown: by discipline group ─────────────────────────────
  const discMap = new Map<string, { count: number; budget: number }>();
  for (const r of researchers) {
    const key = r.disciplineGroupName || "Unspecified";
    const entry = discMap.get(key) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += r.researchPersonBudget ?? 0;
    discMap.set(key, entry);
  }
  // Deduplicate: a project belongs to one discipline group
  const discByProject = new Map<string, { count: number; budget: number }>();
  for (const p of projects) {
    const projectResearchers = researchers.filter((r) => r.researchId === p.researchId);
    const key = projectResearchers[0]?.disciplineGroupName || "Unspecified";
    const entry = discByProject.get(key) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += projectBudgets.get(p.researchId) ?? 0;
    discByProject.set(key, entry);
  }
  const byDiscipline = Array.from(discByProject.entries())
    .map(([label, v]) => ({ label, count: v.count, budget: Math.round(v.budget * 100) / 100 }))
    .sort((a, b) => b.count - a.count);

  // ── Breakdown: by funding type ─────────────────────────────────
  const fundingMap = new Map<string, { count: number; budget: number }>();
  const seenFunding = new Set<number>();
  for (const b of budgets) {
    if (seenFunding.has(b.researchId)) continue;
    seenFunding.add(b.researchId);
    const key = b.moneyTypeName ?? "Unspecified";
    const entry = fundingMap.get(key) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += b.budgetBath ?? 0;
    fundingMap.set(key, entry);
  }
  const byFundingType = Array.from(fundingMap.entries())
    .map(([label, v]) => ({ label, count: v.count, budget: Math.round(v.budget * 100) / 100 }))
    .sort((a, b) => b.budget - a.budget);

  const result: OverviewStats = {
    kpis: {
      totalProjects,
      totalBudget: Math.round(totalBudget * 100) / 100,
      successCount,
      successRate,
      externalFundingCount: externalFundingIds.size,
      internalFundingCount: internalFundingIds.size,
      budgetYears,
    },
    byType,
    byDiscipline,
    byFundingType,
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, result, CACHE_TTL.AGGREGATES);
  return result;
}

/**
 * Compute a lightweight hash of the dataset to use as a cache key.
 * Based on project count and total budget — sufficient for invalidation.
 */
function computeDatasetHash(dataset: ResearchDataset): string {
  const ids = dataset.projects.map((p) => p.researchId).sort().join(",");
  const budgetSum = dataset.budgets.reduce((s, b) => s + (b.budgetBath ?? 0), 0);
  return `${dataset.projects.length}-${dataset.budgets.length}-${budgetSum}`;
}

/**
 * Compute budget statistics from a (possibly filtered) dataset.
 *
 * Returns breakdowns by year, funding type, source, and level,
 * plus a summary of key budget metrics.
 */
export function computeBudgetStats(dataset: ResearchDataset): BudgetStats {
  const cacheKey = `budget:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<BudgetStats>(cacheKey);
  if (cached) return cached;

  const { budgets } = dataset;

  // ── byYear: Group budgets by year ───────────────────────────────
  const yearMap = new Map<number, { totalBudget: number; projectIds: Set<number> }>();
  for (const b of budgets) {
    if (b.budgetYear === null) continue;
    let entry = yearMap.get(b.budgetYear);
    if (!entry) {
      entry = { totalBudget: 0, projectIds: new Set<number>() };
      yearMap.set(b.budgetYear, entry);
    }
    entry.totalBudget += b.budgetBath ?? 0;
    entry.projectIds.add(b.researchId);
  }
  const byYear = Array.from(yearMap.entries())
    .map(([year, v]) => ({
      year,
      totalBudget: Math.round(v.totalBudget * 100) / 100,
      projectCount: v.projectIds.size,
    }))
    .sort((a, b) => a.year - b.year);

  // ── Total budget across all years (for percentage calc) ─────────
  const totalBudgetAll = byYear.reduce((sum, y) => sum + y.totalBudget, 0);

  // ── byType: Group by moneyTypeName (funding type) ────────────────
  const typeMap = new Map<string, number>();
  for (const b of budgets) {
    const key = b.moneyTypeName ?? "Unspecified";
    typeMap.set(key, (typeMap.get(key) ?? 0) + (b.budgetBath ?? 0));
  }
  const byType = Array.from(typeMap.entries())
    .map(([label, budget]) => ({
      label,
      budget: Math.round(budget * 100) / 100,
      percentage: totalBudgetAll > 0
        ? Math.round((budget / totalBudgetAll) * 100 * 10) / 10
        : 0,
    }))
    .sort((a, b) => b.budget - a.budget);

  // ── bySource: Group by moneyName (funding source) ────────────────
  const sourceMap = new Map<string, { budget: number; count: number }>();
  for (const b of budgets) {
    const key = b.moneyName ?? "Unspecified";
    const entry = sourceMap.get(key) ?? { budget: 0, count: 0 };
    entry.budget += b.budgetBath ?? 0;
    entry.count++;
    sourceMap.set(key, entry);
  }
  const bySource = Array.from(sourceMap.entries())
    .map(([label, v]) => ({
      label,
      budget: Math.round(v.budget * 100) / 100,
      count: v.count,
    }))
    .sort((a, b) => b.budget - a.budget);

  // ── byLevel: Group by levelName ──────────────────────────────────
  const levelMap = new Map<string, { budget: number; count: number }>();
  for (const b of budgets) {
    const key = b.levelName ?? "Unspecified";
    const entry = levelMap.get(key) ?? { budget: 0, count: 0 };
    entry.budget += b.budgetBath ?? 0;
    entry.count++;
    levelMap.set(key, entry);
  }
  const byLevel = Array.from(levelMap.entries())
    .map(([label, v]) => ({
      label,
      budget: Math.round(v.budget * 100) / 100,
      count: v.count,
    }))
    .sort((a, b) => b.budget - a.budget);

  // ── Summary ─────────────────────────────────────────────────────
  // Zero-budget projects: distinct projects where all budgetBath entries sum to 0
  const projectBudgetMap = new Map<number, number>();
  for (const b of budgets) {
    const current = projectBudgetMap.get(b.researchId) ?? 0;
    projectBudgetMap.set(b.researchId, current + (b.budgetBath ?? 0));
  }
  // Count projects where total budget is exactly 0
  const zeroBudgetProjects = Array.from(projectBudgetMap.values()).filter((v) => v === 0).length;

  // Highest budget year
  const sortedYears = Array.from(yearMap.entries()).sort((a, b) => b[1].totalBudget - a[1].totalBudget);
  const highestBudgetYear = sortedYears.length > 0 ? sortedYears[0][0] : 0;
  const highestBudgetAmount = sortedYears.length > 0
    ? Math.round(sortedYears[0][1].totalBudget * 100) / 100
    : 0;

  // Average budget per year
  const averageBudgetPerYear = byYear.length > 0
    ? Math.round((totalBudgetAll / byYear.length) * 100) / 100
    : 0;

  const result: BudgetStats = {
    byYear,
    byType,
    bySource,
    byLevel,
    summary: {
      zeroBudgetProjects,
      highestBudgetYear,
      highestBudgetAmount,
      averageBudgetPerYear,
    },
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, result, CACHE_TTL.AGGREGATES);
  return result;
}

/**
 * Compute available filter options from the dataset.
 *
 * Derives unique, sorted, counted options for each filter dimension
 * used by the global filter bar and Filters API endpoint.
 */
export function computeFilters(dataset: ResearchDataset): FiltersResponse {
  const cacheKey = `filters:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<FiltersResponse>(cacheKey);
  if (cached) return cached;

  const { budgets, researchers, projects } = dataset;

  // ── budgetYears from budgets ──────────────────────────────────
  const yearCounts = new Map<string, number>();
  for (const b of budgets) {
    if (b.budgetYear === null) continue;
    const key = String(b.budgetYear);
    yearCounts.set(key, (yearCounts.get(key) ?? 0) + 1);
  }
  const budgetYears: FilterOption[] = Array.from(yearCounts.entries())
    .map(([value, count]) => ({ label: value, value, count }))
    .sort((a, b) => parseInt(b.value) - parseInt(a.value)); // descending

  // ── fundingTypes (moneyTypeName) from budgets ──────────────────
  const ftCounts = new Map<string, number>();
  for (const b of budgets) {
    if (b.moneyTypeName === null) continue;
    ftCounts.set(b.moneyTypeName, (ftCounts.get(b.moneyTypeName) ?? 0) + 1);
  }
  const fundingTypes: FilterOption[] = Array.from(ftCounts.entries())
    .map(([label, count]) => ({ label, value: label, count }))
    .sort((a, b) => b.count - a.count);

  // ── moneySources (moneyName) from budgets ─────────────────────
  const msCounts = new Map<string, number>();
  for (const b of budgets) {
    if (b.moneyName === null) continue;
    msCounts.set(b.moneyName, (msCounts.get(b.moneyName) ?? 0) + 1);
  }
  const moneySources: FilterOption[] = Array.from(msCounts.entries())
    .map(([label, count]) => ({ label, value: label, count }))
    .sort((a, b) => b.count - a.count);

  // ── levels from budgets ──────────────────────────────────────
  const lvCounts = new Map<string, number>();
  for (const b of budgets) {
    if (b.levelName === null) continue;
    lvCounts.set(b.levelName, (lvCounts.get(b.levelName) ?? 0) + 1);
  }
  const levels: FilterOption[] = Array.from(lvCounts.entries())
    .map(([label, count]) => ({ label, value: label, count }))
    .sort((a, b) => b.count - a.count);

  // ── disciplines from researchers ─────────────────────────────
  const discCounts = new Map<string, number>();
  for (const r of researchers) {
    const key = r.disciplineGroupName || "ไม่ระบุ";
    discCounts.set(key, (discCounts.get(key) ?? 0) + 1);
  }
  const disciplines: FilterOption[] = Array.from(discCounts.entries())
    .map(([label, count]) => ({ label, value: label, count }))
    .sort((a, b) => b.count - a.count);

  // ── researchTypes from projects (null → Unspecified) ──────────
  const rtCounts = new Map<string, number>();
  for (const p of projects) {
    const key = p.typeName ?? "Unspecified";
    rtCounts.set(key, (rtCounts.get(key) ?? 0) + 1);
  }
  const researchTypes: FilterOption[] = Array.from(rtCounts.entries())
    .map(([label, count]) => ({
      label,
      value: label === "Unspecified" ? "__unspecified__" : label,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const result: FiltersResponse = {
    budgetYears,
    fundingTypes,
    moneySources,
    levels,
    disciplines,
    researchTypes,
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, result, CACHE_TTL.FILTER_OPTIONS);
  return result;
}

// ─── Projects list query params ────────────────────────────────────

export interface ProjectsQueryParams {
  page: number;
  pageSize: number;
  q: string | null;
  sort: "researchId" | "budgetYear" | "totalBudget" | "nameTh";
  order: "asc" | "desc";
  budgetYears: number[];
  fundingTypes: string[];
  moneySources: string[];
  levels: string[];
  disciplines: string[];
  researchTypes: string[];
}

export const DEFAULT_PROJECTS_PARAMS: ProjectsQueryParams = {
  page: 1,
  pageSize: 20,
  q: null,
  sort: "researchId",
  order: "desc",
  budgetYears: [],
  fundingTypes: [],
  moneySources: [],
  levels: [],
  disciplines: [],
  researchTypes: [],
};

/**
 * Build a denormalized list of project items from the dataset.
 *
 * Each item aggregates project metadata, first-budget summary, and
 * a list of researcher display names. Applies pagination, search,
 * sort, and multi-dimensional filters.
 */
export function computeProjects(
  dataset: ResearchDataset,
  params: ProjectsQueryParams
): ProjectsResponse {
  const { projects, budgets, researchers } = dataset;

  // ── Pre-index budgets and researchers by researchId ─────────
  const budgetsByProject = new Map<number, typeof budgets>();
  for (const b of budgets) {
    let list = budgetsByProject.get(b.researchId);
    if (!list) { list = []; budgetsByProject.set(b.researchId, list); }
    list.push(b);
  }

  const researchersByProject = new Map<number, typeof researchers>();
  for (const r of researchers) {
    let list = researchersByProject.get(r.researchId);
    if (!list) { list = []; researchersByProject.set(r.researchId, list); }
    list.push(r);
  }

  // ── Build denormalized items with budget/researcher join ──────
  let items: ProjectListItem[] = projects.map((p) => {
    const pBudgets = budgetsByProject.get(p.researchId) ?? [];
    const pResearchers = researchersByProject.get(p.researchId) ?? [];
    const firstBudget = pBudgets[0] ?? null;
    const totalBudget = pBudgets.reduce((sum, b) => sum + (b.budgetBath ?? 0), 0);
    const researcherNames = pResearchers
      .map((r) => r.personName)
      .filter((n): n is string => n !== null);
    const disciplineGroup = pResearchers[0]?.disciplineGroupName || null;
    return {
      researchId: p.researchId,
      refCode: p.refCode,
      nameTh: p.nameTh,
      nameEng: p.nameEng,
      typeName: p.typeName,
      programName: p.programName,
      isSuccess: p.isSuccess,
      dateBegin: p.dateBegin,
      dateFinish: p.dateFinish,
      totalBudget: Math.round(totalBudget * 100) / 100,
      budgetYear: firstBudget?.budgetYear ?? null,
      fundingType: firstBudget?.moneyTypeName ?? null,
      moneySource: firstBudget?.moneyName ?? null,
      level: firstBudget?.levelName ?? null,
      researcherNames,
      disciplineGroup,
    };
  });

  // ── Filter: budgetYears ───────────────────────────────────────
  if (params.budgetYears.length > 0) {
    const yearSet = new Set(params.budgetYears);
    const matchIds = new Set<number>();
    for (const b of budgets) {
      if (b.budgetYear !== null && yearSet.has(b.budgetYear)) {
        matchIds.add(b.researchId);
      }
    }
    items = items.filter((i) => matchIds.has(i.researchId));
  }

  // ── Filter: fundingTypes ──────────────────────────────────────
  if (params.fundingTypes.length > 0) {
    const ftSet = new Set(params.fundingTypes);
    const matchIds = new Set<number>();
    for (const b of budgets) {
      if (b.moneyTypeName !== null && ftSet.has(b.moneyTypeName)) matchIds.add(b.researchId);
    }
    items = items.filter((i) => matchIds.has(i.researchId));
  }

  // ── Filter: moneySources ──────────────────────────────────────
  if (params.moneySources.length > 0) {
    const msSet = new Set(params.moneySources);
    const matchIds = new Set<number>();
    for (const b of budgets) {
      if (b.moneyName !== null && msSet.has(b.moneyName)) matchIds.add(b.researchId);
    }
    items = items.filter((i) => matchIds.has(i.researchId));
  }

  // ── Filter: levels ────────────────────────────────────────────
  if (params.levels.length > 0) {
    const lvSet = new Set(params.levels);
    const matchIds = new Set<number>();
    for (const b of budgets) {
      if (b.levelName !== null && lvSet.has(b.levelName)) matchIds.add(b.researchId);
    }
    items = items.filter((i) => matchIds.has(i.researchId));
  }

  // ── Filter: disciplines ───────────────────────────────────────
  if (params.disciplines.length > 0) {
    const discSet = new Set(params.disciplines);
    const matchIds = new Set<number>();
    for (const r of researchers) {
      if (discSet.has(r.disciplineGroupName)) matchIds.add(r.researchId);
    }
    items = items.filter((i) => matchIds.has(i.researchId));
  }

  // ── Filter: researchTypes ─────────────────────────────────────
  if (params.researchTypes.length > 0) {
    const wantsUnspecified = params.researchTypes.includes("__unspecified__");
    const typeSet = new Set(params.researchTypes.filter((t) => t !== "__unspecified__"));
    items = items.filter((i) => {
      if (i.typeName === null) return wantsUnspecified;
      return typeSet.has(i.typeName);
    });
  }

  // ── Search ────────────────────────────────────────────────────
  if (params.q) {
    const q = params.q.toLowerCase();
    items = items.filter((i) => {
      if (i.nameTh?.toLowerCase().includes(q)) return true;
      if (i.nameEng?.toLowerCase().includes(q)) return true;
      if (i.refCode?.toLowerCase().includes(q)) return true;
      return false;
    });
  }

  // ── Sort ──────────────────────────────────────────────────────
  const dir = params.order === "asc" ? 1 : -1;
  items.sort((a, b) => {
    let cmp = 0;
    switch (params.sort) {
      case "budgetYear":
        cmp = ((a.budgetYear ?? 0) - (b.budgetYear ?? 0)) * dir;
        break;
      case "totalBudget":
        cmp = (a.totalBudget - b.totalBudget) * dir;
        break;
      case "nameTh": {
        const aName = a.nameTh ?? "";
        const bName = b.nameTh ?? "";
        cmp = aName.localeCompare(bName) * dir;
        break;
      }
      default:
        cmp = (a.researchId - b.researchId) * dir;
    }
    // Secondary sort by researchId for stability
    if (cmp === 0) cmp = a.researchId - b.researchId;
    return cmp;
  });

  // ── Paginate ──────────────────────────────────────────────────
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const safePage = Math.min(params.page, totalPages);
  const start = (safePage - 1) * params.pageSize;
  const pageItems = items.slice(start, start + params.pageSize);

  return {
    items: pageItems,
    pagination: {
      page: safePage,
      pageSize: params.pageSize,
      totalItems,
      totalPages,
    },
    filters: {
      q: params.q,
      sort: params.sort,
      order: params.order,
      budgetYears: params.budgetYears,
      fundingTypes: params.fundingTypes,
      moneySources: params.moneySources,
      levels: params.levels,
      disciplines: params.disciplines,
      researchTypes: params.researchTypes,
    },
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Look up a single project by researchId and return its full detail view.
 *
 * Returns null when no project with the given ID exists.
 * All budget and researcher entries for the project are included.
 * Arrays are sorted by their stable IDs for deterministic output.
 * personCode remains masked (masked at load time by the normalizer).
 * budgetBath = 0 is preserved (zero-budget is valid).
 */
export function computeProjectDetail(
  dataset: ResearchDataset,
  researchId: number
): ProjectDetailResponse | null {
  const cacheKey = `detail:${researchId}:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<ProjectDetailResponse>(cacheKey);
  if (cached) return cached;

  const { projects, budgets, researchers } = dataset;

  const project = projects.find((p) => p.researchId === researchId);
  if (!project) return null;

  // ── Budgets: all entries for this project, sorted by budgetId ─────
  const projectBudgets = budgets
    .filter((b) => b.researchId === researchId)
    .sort((a, b) => a.budgetId - b.budgetId);

  const budgetDetails: BudgetDetail[] = projectBudgets.map((b) => ({
    budgetId: b.budgetId,
    moneyTypeId: b.moneyTypeId,
    moneyTypeName: b.moneyTypeName,
    moneyId: b.moneyId,
    moneyName: b.moneyName,
    moneyLevelId: b.moneyLevelId,
    levelName: b.levelName,
    budgetDetail: b.budgetDetail,
    budgetYear: b.budgetYear,
    budgetBath: b.budgetBath,
  }));

  // ── Total budget: sum of all budgetBath (0 preserved) ─────────────
  const totalBudget = Math.round(
    projectBudgets.reduce((sum, b) => sum + (b.budgetBath ?? 0), 0) * 100
  ) / 100;

  // ── Researchers: all entries for this project, sorted by researcherId
  const projectResearchers = researchers
    .filter((r) => r.researchId === researchId)
    .sort((a, b) => a.researcherId - b.researcherId);

  const researcherDetails: ResearcherDetail[] = projectResearchers.map((r) => ({
    researcherId: r.researcherId,
    personTypeName: r.personTypeName,
    personCode: r.personCode,
    personName: r.personName,
    positionId: r.positionId,
    position: r.position,
    departmentCode: r.departmentCode,
    departmentName: r.departmentName,
    workPercent: r.workPercent,
    researchPersonBudget: r.researchPersonBudget,
    disciplineGroupId: r.disciplineGroupId,
    disciplineGroupName: r.disciplineGroupName,
  }));

  const projectDetail: ProjectDetailProject = {
    ...project,
    totalBudget,
  };

  const result: ProjectDetailResponse = {
    project: projectDetail,
    researchers: researcherDetails,
    budgets: budgetDetails,
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, result, CACHE_TTL.AGGREGATES);
  return result;
}

/**
 * Look up a researcher by their masked personCode and return their
 * full profile, stats, and project history.
 *
 * The caller is responsible for masking the raw input before calling
 * this function (use maskPersonCode from normalizer.ts).
 * Masking is idempotent, so passing an already-masked code is safe.
 *
 * Returns null when no researcher with the given masked code exists.
 * personCode in the response is always masked (masked at load time).
 * Zero-budget projects are preserved.
 * All arrays are sorted for deterministic output.
 */
export function computeResearcherDetail(
  dataset: ResearchDataset,
  maskedPersonCode: string
): ResearcherDetailResponse | null {
  const cacheKey = `researcher:${maskedPersonCode}:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<ResearcherDetailResponse>(cacheKey);
  if (cached) return cached;

  const { projects, budgets, researchers } = dataset;

  // ── Find all researcher rows matching the masked code ────────────
  const matchingRows = researchers
    .filter((r) => r.personCode === maskedPersonCode)
    .sort((a, b) => a.researcherId - b.researcherId);

  if (matchingRows.length === 0) return null;

  // ── Build researcher profile from first (lowest researcherId) row ─
  const firstRow = matchingRows[0];
  const profile: ResearcherProfile = {
    personCode: firstRow.personCode,
    nameTh: firstRow.personName,
    nameEn: null,
    departmentName: firstRow.departmentName,
    facultyName: null,
    personTypeName: firstRow.personTypeName,
    position: firstRow.position,
    disciplineGroupName: firstRow.disciplineGroupName,
  };

  // ── Collect distinct researchIds for this researcher ─────────────
  const researchIdSet = new Set(matchingRows.map((r) => r.researchId));

  // ── Pre-index all budgets for these projects ─────────────────────
  const budgetsByProject = new Map<number, typeof budgets>();
  for (const b of budgets) {
    if (!researchIdSet.has(b.researchId)) continue;
    let list = budgetsByProject.get(b.researchId);
    if (!list) { list = []; budgetsByProject.set(b.researchId, list); }
    list.push(b);
  }

  // ── Build project items ───────────────────────────────────────────
  // Index matching rows by researchId for work percent / person budget lookup
  const rowByProject = new Map<number, typeof matchingRows[0]>();
  for (const r of matchingRows) {
    if (!rowByProject.has(r.researchId)) rowByProject.set(r.researchId, r);
  }

  const projectItems: ResearcherProjectItem[] = projects
    .filter((p) => researchIdSet.has(p.researchId))
    .map((p) => {
      const pBudgets = budgetsByProject.get(p.researchId) ?? [];
      const totalBudget = Math.round(
        pBudgets.reduce((s, b) => s + (b.budgetBath ?? 0), 0) * 100
      ) / 100;
      const firstBudget = pBudgets[0] ?? null;
      const rRow = rowByProject.get(p.researchId) ?? null;
      return {
        researchId: p.researchId,
        refCode: p.refCode,
        nameTh: p.nameTh,
        nameEng: p.nameEng,
        typeName: p.typeName,
        isSuccess: p.isSuccess,
        dateBegin: p.dateBegin,
        dateFinish: p.dateFinish,
        totalBudget,
        budgetYear: firstBudget?.budgetYear ?? null,
        fundingType: firstBudget?.moneyTypeName ?? null,
        workPercent: rRow?.workPercent ?? null,
        researchPersonBudget: rRow?.researchPersonBudget ?? null,
      };
    })
    .sort((a, b) => a.researchId - b.researchId);

  // ── Stats ─────────────────────────────────────────────────────────
  const totalBudget = Math.round(
    projectItems.reduce((s, p) => s + p.totalBudget, 0) * 100
  ) / 100;

  const budgetYearSet = new Set<number>();
  for (const p of projectItems) {
    if (p.budgetYear !== null) budgetYearSet.add(p.budgetYear);
  }
  const budgetYears = Array.from(budgetYearSet).sort((a, b) => a - b);

  const roleMap = new Map<string, number>();
  for (const r of matchingRows) {
    roleMap.set(r.personTypeName, (roleMap.get(r.personTypeName) ?? 0) + 1);
  }
  const roles = Array.from(roleMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const stats: ResearcherStats = {
    totalProjects: projectItems.length,
    totalBudget,
    budgetYears,
    roles,
  };

  // ── byYear grouping (null-year projects excluded) ─────────────────
  const yearMap = new Map<number, ResearcherProjectItem[]>();
  for (const p of projectItems) {
    if (p.budgetYear === null) continue;
    const list = yearMap.get(p.budgetYear) ?? [];
    list.push(p);
    yearMap.set(p.budgetYear, list);
  }
  const byYear: ResearcherByYear[] = Array.from(yearMap.entries())
    .map(([year, yProjects]) => ({
      year,
      totalBudget: Math.round(
        yProjects.reduce((s, p) => s + p.totalBudget, 0) * 100
      ) / 100,
      projectCount: yProjects.length,
      projects: yProjects,
    }))
    .sort((a, b) => a.year - b.year);

  const result: ResearcherDetailResponse = {
    researcher: profile,
    stats,
    projects: projectItems,
    byYear,
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, result, CACHE_TTL.AGGREGATES);
  return result;
}

/**
 * Compute portfolio overview stats for the /dashboard/portfolio page.
 *
 * Returns summary KPIs, breakdown by research type, breakdown by department,
 * and the 10 most recent projects (sorted by researchId desc).
 */
export function computePortfolioStats(dataset: ResearchDataset): PortfolioStats {
  const cacheKey = `portfolio:${computeDatasetHash(dataset)}`;
  const cached = dataCache.get<PortfolioStats>(cacheKey);
  if (cached) return cached;

  const { projects, budgets, researchers } = dataset;

  // ── Per-project budget (first non-null budgetBath per project) ─
  const projectBudgets = new Map<number, number>();
  for (const b of budgets) {
    if (!projectBudgets.has(b.researchId) && b.budgetBath !== null) {
      projectBudgets.set(b.researchId, b.budgetBath);
    }
  }

  // ── Summary KPIs ───────────────────────────────────────────────
  const totalProjects = projects.length;
  const totalBudget = Array.from(projectBudgets.values()).reduce((s, v) => s + v, 0);
  const completedProjects = projects.filter((p) => p.isSuccess).length;
  const activeProjects = totalProjects - completedProjects;
  const successRate = totalProjects > 0
    ? Math.round((completedProjects / totalProjects) * 100 * 10) / 10
    : 0;

  const typeSet = new Set(projects.map((p) => p.typeName ?? "Unspecified"));
  const researchTypeCount = typeSet.size;

  const deptSet = new Set<string>();
  for (const r of researchers) {
    if (r.departmentName) deptSet.add(r.departmentName);
  }
  const departmentCount = deptSet.size;

  // ── Breakdown: by research type ────────────────────────────────
  const typeMap = new Map<string, { count: number; budget: number }>();
  for (const p of projects) {
    const key = p.typeName ?? "Unspecified";
    const entry = typeMap.get(key) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += projectBudgets.get(p.researchId) ?? 0;
    typeMap.set(key, entry);
  }
  const byResearchType: PortfolioBreakdownItem[] = Array.from(typeMap.entries())
    .map(([label, v]) => ({
      label,
      count: v.count,
      budget: Math.round(v.budget * 100) / 100,
      percentage: totalProjects > 0
        ? Math.round((v.count / totalProjects) * 100 * 10) / 10
        : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // ── Breakdown: by department (first researcher per project) ────
  const researchersByProject = new Map<number, typeof researchers>();
  for (const r of researchers) {
    let list = researchersByProject.get(r.researchId);
    if (!list) { list = []; researchersByProject.set(r.researchId, list); }
    list.push(r);
  }

  const deptMap = new Map<string, { count: number; budget: number }>();
  for (const p of projects) {
    const pResearchers = researchersByProject.get(p.researchId) ?? [];
    const dept = pResearchers[0]?.departmentName ?? "ไม่ระบุหน่วยงาน";
    const entry = deptMap.get(dept) ?? { count: 0, budget: 0 };
    entry.count++;
    entry.budget += projectBudgets.get(p.researchId) ?? 0;
    deptMap.set(dept, entry);
  }
  const byDepartment: PortfolioBreakdownItem[] = Array.from(deptMap.entries())
    .map(([label, v]) => ({
      label,
      count: v.count,
      budget: Math.round(v.budget * 100) / 100,
      percentage: totalProjects > 0
        ? Math.round((v.count / totalProjects) * 100 * 10) / 10
        : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // ── Recent projects (10 newest by researchId desc) ─────────────
  const recentProjects = computeProjects(dataset, {
    ...DEFAULT_PROJECTS_PARAMS,
    page: 1,
    pageSize: 10,
    sort: "researchId",
    order: "desc",
  }).items;

  const portfolioResult: PortfolioStats = {
    summary: {
      totalProjects,
      totalBudget: Math.round(totalBudget * 100) / 100,
      activeProjects,
      completedProjects,
      successRate,
      researchTypeCount,
      departmentCount,
    },
    byResearchType,
    byDepartment,
    recentProjects,
    generatedAt: new Date().toISOString(),
  };

  dataCache.set(cacheKey, portfolioResult, CACHE_TTL.AGGREGATES);
  return portfolioResult;
}

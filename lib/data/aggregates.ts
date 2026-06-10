/**
 * Aggregate functions for computing overview KPIs and breakdowns
 * from a ResearchDataset.
 */

import type { ResearchDataset, OverviewStats } from "@/lib/data/models";
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

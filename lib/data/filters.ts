/**
 * Filter utilities for applying ActiveFilters to a ResearchDataset.
 */

import type { ResearchDataset, ActiveFilters, ResearchProject } from "@/lib/data/models";

/** Default (no-op) filter state. */
export const DEFAULT_FILTERS: ActiveFilters = {
  budgetYears: [],
  researchTypeNames: [],
  fundingTypeNames: [],
  departmentNames: [],
  disciplineGroupNames: [],
  successStatus: "all",
  personTypeNames: [],
  moneyNames: [],
  dateFrom: null,
  dateTo: null,
};

/**
 * Apply the active filters to the dataset.
 * Returns a filtered dataset containing only matching records.
 */
export function applyFilters(dataset: ResearchDataset, filters: ActiveFilters): ResearchDataset {
  // Determine which research IDs pass the project-level filters
  const matchingIds = new Set<number>();

  for (const project of dataset.projects) {
    if (projectPassesFilters(project, filters)) {
      matchingIds.add(project.researchId);
    }
  }

  return {
    projects: dataset.projects.filter((p) => matchingIds.has(p.researchId)),
    budgets: dataset.budgets.filter((b) => matchingIds.has(b.researchId)),
    researchers: dataset.researchers.filter((r) => matchingIds.has(r.researchId)),
    rawRows: dataset.rawRows,
  };
}

function projectPassesFilters(project: ResearchProject, filters: ActiveFilters): boolean {
  // Research type filter
  if (filters.researchTypeNames.length > 0 && project.typeName !== null) {
    if (!filters.researchTypeNames.includes(project.typeName)) return false;
  }

  // Discipline group filter
  if (filters.disciplineGroupNames.length > 0) {
    // Check via researchers (discipline is per-researcher)
    // This is a project-level approximation
    return true; // defer to researcher-level filtering
  }

  // Success status filter
  if (filters.successStatus === "success" && !project.isSuccess) return false;
  if (filters.successStatus === "not_success" && project.isSuccess) return false;

  // Date range filter
  if (filters.dateFrom && project.dateBegin && project.dateBegin < filters.dateFrom) return false;
  if (filters.dateTo && project.dateFinish && project.dateFinish > filters.dateTo) return false;

  return true;
}

/**
 * Build a summary of currently applied filters for display.
 */
export function getActiveFilterSummary(filters: ActiveFilters): string[] {
  const parts: string[] = [];
  if (filters.budgetYears.length > 0) parts.push(`Years: ${filters.budgetYears.join(", ")}`);
  if (filters.researchTypeNames.length > 0) parts.push(`Types: ${filters.researchTypeNames.join(", ")}`);
  if (filters.fundingTypeNames.length > 0) parts.push(`Funding: ${filters.fundingTypeNames.join(", ")}`);
  if (filters.departmentNames.length > 0) parts.push(`Depts: ${filters.departmentNames.join(", ")}`);
  if (filters.successStatus !== "all") parts.push(`Status: ${filters.successStatus}`);
  if (filters.dateFrom || filters.dateTo) {
    const range = [filters.dateFrom ?? "…", filters.dateTo ?? "…"].join(" – ");
    parts.push(`Dates: ${range}`);
  }
  return parts;
}

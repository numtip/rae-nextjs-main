import type { ResearchDataset, ActiveFilters } from "@/lib/data/models";

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

export function applyFilters(
  dataset: ResearchDataset,
  filters: ActiveFilters
): ResearchDataset {
  let { projects, budgets, researchers } = dataset;

  // ── Research type name filter ────────────────────────────────
  if (filters.researchTypeNames.length > 0) {
    const typeSet = new Set(filters.researchTypeNames);
    const matchIds = new Set(
      projects.filter((p) => p.typeName !== null && typeSet.has(p.typeName)).map((p) => p.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  // ── Department name filter ───────────────────────────────────
  if (filters.departmentNames.length > 0) {
    const deptSet = new Set(filters.departmentNames);
    const matchIds = new Set(
      researchers.filter((r) => r.departmentName !== null && deptSet.has(r.departmentName)).map((r) => r.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  // ── Discipline group name filter ─────────────────────────────
  if (filters.disciplineGroupNames.length > 0) {
    const discSet = new Set(filters.disciplineGroupNames);
    const matchIds = new Set(
      researchers.filter((r) => discSet.has(r.disciplineGroupName)).map((r) => r.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  // ── Success status filter ────────────────────────────────────
  if (filters.successStatus !== "all") {
    const wantSuccess = filters.successStatus === "success";
    const matchIds = new Set(
      projects.filter((p) => p.isSuccess === wantSuccess).map((p) => p.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  // ── Person type name filter ──────────────────────────────────
  if (filters.personTypeNames.length > 0) {
    const personSet = new Set(filters.personTypeNames);
    const matchIds = new Set(
      researchers.filter((r) => personSet.has(r.personTypeName)).map((r) => r.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  // ── Date range filter ────────────────────────────────────────
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : null;
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : null;
    const matchIds = new Set(
      projects
        .filter((p) => {
          if (!p.dateBegin) return false;
          const begin = new Date(p.dateBegin).getTime();
          if (from !== null && begin < from) return false;
          if (to !== null && begin > to) return false;
          return true;
        })
        .map((p) => p.researchId)
    );
    projects = projects.filter((p) => matchIds.has(p.researchId));
    budgets = budgets.filter((b) => matchIds.has(b.researchId));
    researchers = researchers.filter((r) => matchIds.has(r.researchId));
  }

  return { projects, budgets, researchers, rawRows: dataset.rawRows };
}

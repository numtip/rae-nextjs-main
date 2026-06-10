/**
 * Normalized TypeScript models for the View_Research dataset.
 *
 * The flat 44-column view is split into 3 logical entities:
 * - ResearchProject
 * - ResearchBudget
 * - Researcher
 *
 * Plus an aggregated overview model for dashboard KPIs.
 */

// ─── CSV raw row (flat 44-column structure) ───────────────────────

export interface ViewResearchRow {
  research_id: number;
  research_ref_code: string | null;
  research_name_th: string | null;
  research_name_eng: string | null;
  research_type_id: number | null;
  research_type_name: string | null;
  research_program_id: number | null;
  research_program_name: string | null;
  denomination_id: number | null;
  denomination_name: string | null;
  road_map_id: number | null;
  road_map_name: string | null;
  research_series: boolean | null;
  research_series_main: boolean | null;
  research_success: boolean | null;
  budgetID: number;
  money_type_id: number | null;
  research_money_type_name: string | null;
  money_id: number | null;
  money_name: string | null;
  moneyLevelID: number | null;
  levelName: string | null;
  budgetDetail: string | null;
  budgetYear: number | null;
  budgetBath: number | null;
  researcherID: number;
  personType: number | null;
  personTypeName: string;
  personCode: string | null;
  personName: string | null;
  apiPositionID: string;
  Position: string;
  departmentCode: string | null;
  divisionCode: string | null;
  sectionCode: string | null;
  facultyID: string | null;
  programCode: string | null;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupID: number;
  disciplineGroupName: string;
  dateBegin: string | null;
  dateFinish: string | null;
}

// ─── Normalized entities ──────────────────────────────────────────

export interface ResearchProject {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeId: number | null;
  typeName: string | null;
  programId: number | null;
  programName: string | null;
  denominationId: number | null;
  denominationName: string | null;
  roadmapId: number | null;
  roadmapName: string | null;
  isSeries: boolean;
  isSeriesMain: boolean;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
}

export interface ResearchBudget {
  budgetId: number;
  researchId: number;
  moneyTypeId: number | null;
  moneyTypeName: string | null;
  moneyId: number | null;
  moneyName: string | null;
  moneyLevelId: number | null;
  levelName: string | null;
  budgetDetail: string | null;
  budgetYear: number | null;
  budgetBath: number | null;
}

export interface Researcher {
  researcherId: number;
  researchId: number;
  personType: number | null;
  personTypeName: string;
  personCode: string | null;
  personName: string | null;
  positionId: string;
  position: string;
  departmentCode: string | null;
  divisionCode: string | null;
  sectionCode: string | null;
  facultyId: string | null;
  programCode: string | null;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupId: number;
  disciplineGroupName: string;
}

// ─── Dataset container ────────────────────────────────────────────

export interface ResearchDataset {
  projects: ResearchProject[];
  budgets: ResearchBudget[];
  researchers: Researcher[];
  rawRows: ViewResearchRow[];
}

// ─── Overview / KPI aggregation models ────────────────────────────

export interface OverviewStats {
  kpis: {
    totalProjects: number;
    totalBudget: number;
    successCount: number;
    successRate: number;
    externalFundingCount: number;
    internalFundingCount: number;
    budgetYears: number[];
  };
  byType: Array<{ label: string; count: number; budget: number }>;
  byDiscipline: Array<{ label: string; count: number; budget: number }>;
  byFundingType: Array<{ label: string; count: number; budget: number }>;
  generatedAt: string;
}

// ─── Filter model ─────────────────────────────────────────────────

export interface ActiveFilters {
  budgetYears: number[];
  researchTypeNames: string[];
  fundingTypeNames: string[];
  departmentNames: string[];
  disciplineGroupNames: string[];
  successStatus: "all" | "success" | "not_success";
  personTypeNames: string[];
  moneyNames: string[];
  dateFrom: string | null;
  dateTo: string | null;
}

// ─── Error response ───────────────────────────────────────────────

export interface ApiError {
  error: string;
  code: string;
  details: Record<string, unknown> | null;
}

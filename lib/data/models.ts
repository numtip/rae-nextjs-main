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

// ─── Budget Stats aggregation model ───────────────────────────────

export interface BudgetStats {
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
}

// ─── Projects list models ──────────────────────────────────────────

export interface ProjectListItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  programName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  moneySource: string | null;
  level: string | null;
  researcherNames: string[];
  disciplineGroup: string | null;
}

export interface ProjectsResponse {
  items: ProjectListItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  filters: {
    q: string | null;
    sort: string;
    order: string;
    budgetYears: number[];
    fundingTypes: string[];
    moneySources: string[];
    levels: string[];
    disciplines: string[];
    researchTypes: string[];
  };
  generatedAt: string;
}

// ─── Filters API models ────────────────────────────────────────────

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface FiltersResponse {
  budgetYears: FilterOption[];
  fundingTypes: FilterOption[];
  moneySources: FilterOption[];
  levels: FilterOption[];
  disciplines: FilterOption[];
  researchTypes: FilterOption[];
  generatedAt: string;
}

// ─── Researcher Detail models ─────────────────────────────────────

export interface ResearcherProfile {
  personCode: string | null;
  nameTh: string | null;
  nameEn: null;
  departmentName: string | null;
  facultyName: null;
  personTypeName: string;
  position: string;
  disciplineGroupName: string;
}

export interface ResearcherStats {
  totalProjects: number;
  totalBudget: number;
  budgetYears: number[];
  roles: Array<{ label: string; count: number }>;
}

export interface ResearcherProjectItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
}

export interface ResearcherByYear {
  year: number;
  totalBudget: number;
  projectCount: number;
  projects: ResearcherProjectItem[];
}

export interface ResearcherDetailResponse {
  researcher: ResearcherProfile;
  stats: ResearcherStats;
  projects: ResearcherProjectItem[];
  byYear: ResearcherByYear[];
  generatedAt: string;
}

// ─── Project Detail models ─────────────────────────────────────────

export interface ResearcherDetail {
  researcherId: number;
  personTypeName: string;
  personCode: string | null;
  personName: string | null;
  positionId: string;
  position: string;
  departmentCode: string | null;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupId: number;
  disciplineGroupName: string;
}

export interface BudgetDetail {
  budgetId: number;
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

export interface ProjectDetailProject extends ResearchProject {
  totalBudget: number;
}

export interface ProjectDetailResponse {
  project: ProjectDetailProject;
  researchers: ResearcherDetail[];
  budgets: BudgetDetail[];
  generatedAt: string;
}

// ─── Portfolio stats model ─────────────────────────────────────────

export interface PortfolioBreakdownItem {
  label: string;
  count: number;
  budget: number;
  percentage: number;
}

export interface PortfolioStats {
  summary: {
    totalProjects: number;
    totalBudget: number;
    activeProjects: number;
    completedProjects: number;
    successRate: number;
    researchTypeCount: number;
    departmentCount: number;
  };
  byResearchType: PortfolioBreakdownItem[];
  byDepartment: PortfolioBreakdownItem[];
  recentProjects: ProjectListItem[];
  generatedAt: string;
}

// ─── Error response ───────────────────────────────────────────────

export interface ApiError {
  error: string;
  code: string;
  details: Record<string, unknown> | null;
}

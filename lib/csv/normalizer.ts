/**
 * CSV parser and row normalizer for View_Research data.
 *
 * Reads the flat 44-column CSV export, casts fields to their
 * proper TypeScript types, normalizes placeholders to null,
 * and splits into the normalized entity model.
 */

import type { ViewResearchRow, ResearchProject, ResearchBudget, Researcher, ResearchDataset } from "@/lib/data/models";
import { PLACEHOLDER_VALUES } from "@/lib/constants";

// ─── Field-level parsing ──────────────────────────────────────────

function parseNullableInt(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const n = parseInt(value, 10);
  return isNaN(n) ? null : n;
}

function parseNullableFloat(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function parseNullableBool(value: string): boolean | null {
  if (!value || value.trim() === "") return null;
  return value.trim() === "1" || value.trim().toLowerCase() === "true";
}

function parseRequiredInt(value: string): number {
  const n = parseInt(value, 10);
  return isNaN(n) ? 0 : n;
}

function parseRequiredString(value: string): string {
  return value?.trim() ?? "";
}

function normalizeNullableString(value: string): string | null {
  const trimmed = value?.trim() ?? "";
  if (trimmed === "" || PLACEHOLDER_VALUES.has(trimmed)) return null;
  return trimmed;
}

// ─── Mask personCode (show last 4 digits) ─────────────────────────

function maskPersonCode(code: string | null): string | null {
  if (!code) return null;
  const trimmed = code.trim();
  if (trimmed.length <= 4) return trimmed;
  return "*".repeat(trimmed.length - 4) + trimmed.slice(-4);
}

// ─── Row parsing ──────────────────────────────────────────────────

export function parseRow(fields: string[]): ViewResearchRow {
  const get = (idx: number): string => fields[idx]?.trim() ?? "";
  return {
    research_id: parseRequiredInt(get(0)),
    research_ref_code: normalizeNullableString(get(1)),
    research_name_th: normalizeNullableString(get(2)),
    research_name_eng: normalizeNullableString(get(3)),
    research_type_id: parseNullableInt(get(4)),
    research_type_name: normalizeNullableString(get(5)),
    research_program_id: parseNullableInt(get(6)),
    research_program_name: normalizeNullableString(get(7)),
    denomination_id: parseNullableInt(get(8)),
    denomination_name: normalizeNullableString(get(9)),
    road_map_id: parseNullableInt(get(10)),
    road_map_name: normalizeNullableString(get(11)),
    research_series: parseNullableBool(get(12)),
    research_series_main: parseNullableBool(get(13)),
    research_success: parseNullableBool(get(14)),
    budgetID: parseRequiredInt(get(15)),
    money_type_id: parseNullableInt(get(16)),
    research_money_type_name: normalizeNullableString(get(17)),
    money_id: parseNullableInt(get(18)),
    money_name: normalizeNullableString(get(19)),
    moneyLevelID: parseNullableInt(get(20)),
    levelName: normalizeNullableString(get(21)),
    budgetDetail: normalizeNullableString(get(22)),
    budgetYear: parseNullableInt(get(23)),
    budgetBath: parseNullableFloat(get(24)),
    researcherID: parseRequiredInt(get(25)),
    personType: parseNullableInt(get(26)),
    personTypeName: parseRequiredString(get(27)),
    personCode: maskPersonCode(normalizeNullableString(get(28))),
    personName: normalizeNullableString(get(29)),
    apiPositionID: parseRequiredString(get(30)),
    Position: parseRequiredString(get(31)),
    departmentCode: normalizeNullableString(get(32)),
    divisionCode: normalizeNullableString(get(33)),
    sectionCode: normalizeNullableString(get(34)),
    facultyID: normalizeNullableString(get(35)),
    programCode: normalizeNullableString(get(36)),
    departmentName: normalizeNullableString(get(37)),
    workPercent: parseNullableFloat(get(38)),
    researchPersonBudget: parseNullableFloat(get(39)),
    disciplineGroupID: parseRequiredInt(get(40)),
    disciplineGroupName: parseRequiredString(get(41)),
    dateBegin: normalizeNullableString(get(42)),
    dateFinish: normalizeNullableString(get(43)),
  };
}

// ─── Entity splitting ─────────────────────────────────────────────

export function toProject(row: ViewResearchRow): ResearchProject {
  return {
    researchId: row.research_id,
    refCode: row.research_ref_code,
    nameTh: row.research_name_th,
    nameEng: row.research_name_eng,
    typeId: row.research_type_id,
    typeName: row.research_type_name,
    programId: row.research_program_id,
    programName: row.research_program_name,
    denominationId: row.denomination_id,
    denominationName: row.denomination_name,
    roadmapId: row.road_map_id,
    roadmapName: row.road_map_name,
    isSeries: row.research_series ?? false,
    isSeriesMain: row.research_series_main ?? false,
    isSuccess: row.research_success ?? false,
    dateBegin: row.dateBegin,
    dateFinish: row.dateFinish,
  };
}

export function toBudget(row: ViewResearchRow): ResearchBudget {
  return {
    budgetId: row.budgetID,
    researchId: row.research_id,
    moneyTypeId: row.money_type_id,
    moneyTypeName: row.research_money_type_name,
    moneyId: row.money_id,
    moneyName: row.money_name,
    moneyLevelId: row.moneyLevelID,
    levelName: row.levelName,
    budgetDetail: row.budgetDetail,
    budgetYear: row.budgetYear,
    budgetBath: row.budgetBath,
  };
}

export function toResearcher(row: ViewResearchRow): Researcher {
  return {
    researcherId: row.researcherID,
    researchId: row.research_id,
    personType: row.personType,
    personTypeName: row.personTypeName,
    personCode: row.personCode, // already masked in parseRow
    personName: row.personName,
    positionId: row.apiPositionID,
    position: row.Position,
    departmentCode: row.departmentCode,
    divisionCode: row.divisionCode,
    sectionCode: row.sectionCode,
    facultyId: row.facultyID,
    programCode: row.programCode,
    departmentName: row.departmentName,
    workPercent: row.workPercent,
    researchPersonBudget: row.researchPersonBudget,
    disciplineGroupId: row.disciplineGroupID,
    disciplineGroupName: row.disciplineGroupName,
  };
}

// ─── Full pipeline: raw CSV rows → normalized dataset ─────────────

export function normalizeRows(rawRows: ViewResearchRow[]): ResearchDataset {
  const projects = new Map<number, ResearchProject>();
  const budgets: ResearchBudget[] = [];
  const researchers: Researcher[] = [];

  for (const row of rawRows) {
    // Deduplicate projects by researchId
    if (!projects.has(row.research_id)) {
      projects.set(row.research_id, toProject(row));
    }
    budgets.push(toBudget(row));
    researchers.push(toResearcher(row));
  }

  return {
    projects: Array.from(projects.values()),
    budgets,
    researchers,
    rawRows,
  };
}

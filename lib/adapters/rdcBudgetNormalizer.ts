/**
 * RDC Budget Normalizer — SQL Row to ViewResearchRow
 *
 * Pure transformation layer. No database connection, no secrets.
 *
 * Maps SQL result rows (from View_Research) into the existing
 * ViewResearchRow type, which feeds directly into the existing
 * normalizeRows() → computeBudgetStats() pipeline.
 *
 * @see lib/csv/normalizer.ts — existing CSV normalizer (same target type)
 * @see lib/data/models.ts — ViewResearchRow type definition
 * @see docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md — SQL source contract
 */

import type { ViewResearchRow } from "@/lib/data/models";
import { PLACEHOLDER_VALUES } from "@/lib/constants";
import { maskPersonCode } from "@/lib/csv/normalizer";

// ─── Field-level parsers (mirrors CSV normalizer) ─────────────────

function parseNullableInt(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (str === "") return null;
  const n = parseInt(str, 10);
  return isNaN(n) ? null : n;
}

function parseNullableFloat(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (str === "") return null;
  const n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function parseRequiredInt(value: unknown): number {
  if (value === null || value === undefined) return 0;
  const n = parseInt(String(value).trim(), 10);
  return isNaN(n) ? 0 : n;
}

function parseRequiredString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parseNullableBool(value: unknown): boolean | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (str === "") return null;
  return str === "1" || str.toLowerCase() === "true";
}

function normalizeNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = String(value).trim();
  if (trimmed === "" || PLACEHOLDER_VALUES.has(trimmed)) return null;
  return trimmed;
}

// ─── SQL column name → ViewResearchRow field mapping ──────────────

/**
 * SQL column name constants for View_Research.
 *
 * These match the column names returned by INFORMATION_SCHEMA.COLUMNS
 * for the View_Research view. Used as lookup keys when mapping
 * SQL result rows to ViewResearchRow fields.
 *
 * TODO: Confirm exact SQL column casing with RDC team.
 * SQL Server is case-insensitive by default, but some drivers
 * preserve source casing.
 */
export const SQL_COLUMNS = {
  RESEARCH_ID: "research_id",
  RESEARCH_REF_CODE: "research_ref_code",
  RESEARCH_NAME_TH: "research_name_th",
  RESEARCH_NAME_ENG: "research_name_eng",
  RESEARCH_TYPE_ID: "research_type_id",
  RESEARCH_TYPE_NAME: "research_type_name",
  RESEARCH_PROGRAM_ID: "research_program_id",
  RESEARCH_PROGRAM_NAME: "research_program_name",
  DENOMINATION_ID: "denomination_id",
  DENOMINATION_NAME: "denomination_name",
  ROAD_MAP_ID: "road_map_id",
  ROAD_MAP_NAME: "road_map_name",
  RESEARCH_SERIES: "research_series",
  RESEARCH_SERIES_MAIN: "research_series_main",
  RESEARCH_SUCCESS: "research_success",
  BUDGET_ID: "budgetID",
  MONEY_TYPE_ID: "money_type_id",
  RESEARCH_MONEY_TYPE_NAME: "research_money_type_name",
  MONEY_ID: "money_id",
  MONEY_NAME: "money_name",
  MONEY_LEVEL_ID: "moneyLevelID",
  LEVEL_NAME: "levelName",
  BUDGET_DETAIL: "budgetDetail",
  BUDGET_YEAR: "budgetYear",
  BUDGET_BATH: "budgetBath",
  RESEARCHER_ID: "researcherID",
  PERSON_TYPE: "personType",
  PERSON_TYPE_NAME: "personTypeName",
  PERSON_CODE: "personCode",
  PERSON_NAME: "personName",
  API_POSITION_ID: "apiPositionID",
  POSITION: "Position",
  DEPARTMENT_CODE: "departmentCode",
  DIVISION_CODE: "divisionCode",
  SECTION_CODE: "sectionCode",
  FACULTY_ID: "facultyID",
  PROGRAM_CODE: "programCode",
  DEPARTMENT_NAME: "departmentName",
  WORK_PERCENT: "workPercent",
  RESEARCH_PERSON_BUDGET: "researchPersonBudget",
  DISCIPLINE_GROUP_ID: "disciplineGroupID",
  DISCIPLINE_GROUP_NAME: "disciplineGroupName",
  DATE_BEGIN: "dateBegin",
  DATE_FINISH: "dateFinish",
} as const;

// ─── SQL row → ViewResearchRow ────────────────────────────────────

/**
 * Convert a raw SQL result row (column name → value) into a
 * ViewResearchRow.
 *
 * @param row - SQL result row as key-value pairs
 * @returns Fully typed ViewResearchRow
 *
 * @example
 * ```typescript
 * const sqlRow = {
 *   research_id: 3962,
 *   budgetBath: 255340.00,
 *   budgetYear: 2558,
 *   // ... other columns
 * };
 * const viewRow = rdcToViewResearchRow(sqlRow);
 * ```
 */
export function rdcToViewResearchRow(
  row: Record<string, unknown>
): ViewResearchRow {
  const get = (columnName: string): unknown => row[columnName];

  return {
    research_id: parseRequiredInt(get(SQL_COLUMNS.RESEARCH_ID)),
    research_ref_code: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_REF_CODE)),
    research_name_th: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_NAME_TH)),
    research_name_eng: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_NAME_ENG)),
    research_type_id: parseNullableInt(get(SQL_COLUMNS.RESEARCH_TYPE_ID)),
    research_type_name: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_TYPE_NAME)),
    research_program_id: parseNullableInt(get(SQL_COLUMNS.RESEARCH_PROGRAM_ID)),
    research_program_name: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_PROGRAM_NAME)),
    denomination_id: parseNullableInt(get(SQL_COLUMNS.DENOMINATION_ID)),
    denomination_name: normalizeNullableString(get(SQL_COLUMNS.DENOMINATION_NAME)),
    road_map_id: parseNullableInt(get(SQL_COLUMNS.ROAD_MAP_ID)),
    road_map_name: normalizeNullableString(get(SQL_COLUMNS.ROAD_MAP_NAME)),
    research_series: parseNullableBool(get(SQL_COLUMNS.RESEARCH_SERIES)),
    research_series_main: parseNullableBool(get(SQL_COLUMNS.RESEARCH_SERIES_MAIN)),
    research_success: parseNullableBool(get(SQL_COLUMNS.RESEARCH_SUCCESS)),
    budgetID: parseRequiredInt(get(SQL_COLUMNS.BUDGET_ID)),
    money_type_id: parseNullableInt(get(SQL_COLUMNS.MONEY_TYPE_ID)),
    research_money_type_name: normalizeNullableString(get(SQL_COLUMNS.RESEARCH_MONEY_TYPE_NAME)),
    money_id: parseNullableInt(get(SQL_COLUMNS.MONEY_ID)),
    money_name: normalizeNullableString(get(SQL_COLUMNS.MONEY_NAME)),
    moneyLevelID: parseNullableInt(get(SQL_COLUMNS.MONEY_LEVEL_ID)),
    levelName: normalizeNullableString(get(SQL_COLUMNS.LEVEL_NAME)),
    budgetDetail: normalizeNullableString(get(SQL_COLUMNS.BUDGET_DETAIL)),
    budgetYear: parseNullableInt(get(SQL_COLUMNS.BUDGET_YEAR)),
    budgetBath: parseNullableFloat(get(SQL_COLUMNS.BUDGET_BATH)),
    researcherID: parseRequiredInt(get(SQL_COLUMNS.RESEARCHER_ID)),
    personType: parseNullableInt(get(SQL_COLUMNS.PERSON_TYPE)),
    personTypeName: parseRequiredString(get(SQL_COLUMNS.PERSON_TYPE_NAME)),
    personCode: maskPersonCode(normalizeNullableString(get(SQL_COLUMNS.PERSON_CODE))),
    personName: normalizeNullableString(get(SQL_COLUMNS.PERSON_NAME)),
    apiPositionID: parseRequiredString(get(SQL_COLUMNS.API_POSITION_ID)),
    Position: parseRequiredString(get(SQL_COLUMNS.POSITION)),
    departmentCode: normalizeNullableString(get(SQL_COLUMNS.DEPARTMENT_CODE)),
    divisionCode: normalizeNullableString(get(SQL_COLUMNS.DIVISION_CODE)),
    sectionCode: normalizeNullableString(get(SQL_COLUMNS.SECTION_CODE)),
    facultyID: normalizeNullableString(get(SQL_COLUMNS.FACULTY_ID)),
    programCode: normalizeNullableString(get(SQL_COLUMNS.PROGRAM_CODE)),
    departmentName: normalizeNullableString(get(SQL_COLUMNS.DEPARTMENT_NAME)),
    workPercent: parseNullableFloat(get(SQL_COLUMNS.WORK_PERCENT)),
    researchPersonBudget: parseNullableFloat(get(SQL_COLUMNS.RESEARCH_PERSON_BUDGET)),
    disciplineGroupID: parseRequiredInt(get(SQL_COLUMNS.DISCIPLINE_GROUP_ID)),
    disciplineGroupName: parseRequiredString(get(SQL_COLUMNS.DISCIPLINE_GROUP_NAME)),
    dateBegin: normalizeNullableString(get(SQL_COLUMNS.DATE_BEGIN)),
    dateFinish: normalizeNullableString(get(SQL_COLUMNS.DATE_FINISH)),
  };
}

// ─── Batch conversion ─────────────────────────────────────────────

/**
 * Convert an array of SQL result rows into ViewResearchRow[].
 *
 * @param rows - Array of SQL result rows
 * @returns Array of typed ViewResearchRow
 */
export function rdcRowsToViewResearchRows(
  rows: Record<string, unknown>[]
): ViewResearchRow[] {
  return rows.map(rdcToViewResearchRow);
}

// ─── CSV-style row adapter ────────────────────────────────────────

/**
 * Convert a positional-array CSV row (string[]) to a named-column
 * record so it can be processed by rdcToViewResearchRow.
 *
 * This is useful for testing and for the transitional period where
 * CSV exports are still the primary data source.
 *
 * @param fields - Positional CSV fields (as parsed by PapaParse)
 * @param headers - Column header names (44 columns)
 * @returns Named-column record
 *
 * TODO: Remove this adapter once SQL connector is the primary source.
 */
export function csvArrayToRecord(
  fields: string[],
  headers: readonly string[]
): Record<string, unknown> {
  const record: Record<string, unknown> = {};
  for (let i = 0; i < headers.length && i < fields.length; i++) {
    record[headers[i]] = fields[i];
  }
  return record;
}

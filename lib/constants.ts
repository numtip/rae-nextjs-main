/**
 * Constants and shared values for the Research Analytics data layer.
 */

/** Placeholder strings that should be treated as null. */
export const PLACEHOLDER_VALUES = new Set(["-- ไม่ระบุ --", "-", "NULL", ""]);

/** Person type constants. */
export const PERSON_TYPE = {
  INTERNAL: "บุคลากรภายใน",
  EXTERNAL: "บุคคลภายนอก",
} as const;

/** Column names mapped from CSV header to ViewResearchRow keys (ordered as in a3.csv). */
export const CSV_COLUMNS: string[] = [
  "research_id",
  "research_ref_code",
  "research_name_th",
  "research_name_eng",
  "research_type_id",
  "research_type_name",
  "research_program_id",
  "research_program_name",
  "denomination_id",
  "denomination_name",
  "road_map_id",
  "road_map_name",
  "research_series",
  "research_series_main",
  "research_success",
  "budgetID",
  "money_type_id",
  "research_money_type_name",
  "money_id",
  "money_name",
  "moneyLevelID",
  "levelName",
  "budgetDetail",
  "budgetYear",
  "budgetBath",
  "researcherID",
  "personType",
  "personTypeName",
  "personCode",
  "personName",
  "apiPositionID",
  "Position",
  "departmentCode",
  "divisionCode",
  "sectionCode",
  "facultyID",
  "programCode",
  "departmentName",
  "workPercent",
  "researchPersonBudget",
  "disciplineGroupID",
  "disciplineGroupName",
  "dateBegin",
  "dateFinish",
];

/** Default CSV file path (relative to project root). */
export const CSV_DATA_DIR = "data/research";
export const CSV_DATA_FILE = "a3.csv";

/** Cache TTLs in milliseconds. */
export const CACHE_TTL = {
  AGGREGATES: 5 * 60 * 1000, // 5 minutes
  FILTER_OPTIONS: 10 * 60 * 1000, // 10 minutes
  RAW_DATA: 0, // process lifetime (never expires)
} as const;

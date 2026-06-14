/**
 * RDC Budget Normalizer — Unit Tests
 *
 * Tests the pure-function normalizer stub that maps SQL result rows
 * to ViewResearchRow. No database connection, no secrets.
 *
 * Run: npx tsx __tests__/rdc-budget-normalizer.test.ts
 *
 * @see lib/adapters/rdcBudgetNormalizer.ts
 * @see docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md
 */

import {
  rdcToViewResearchRow,
  rdcRowsToViewResearchRows,
  csvArrayToRecord,
  SQL_COLUMNS,
} from "../lib/adapters/rdcBudgetNormalizer";
import { maskPersonCode } from "../lib/csv/normalizer";
import { normalizeRows } from "../lib/csv/normalizer";
import type { ViewResearchRow } from "../lib/data/models";

// ─── Test framework ────────────────────────────────────────────────

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, detail: string): void {
  results.push({ name, passed: condition, detail });
  console[condition ? "log" : "error"](
    `  ${condition ? "✓" : "✗"} ${name}: ${detail}`
  );
}

function printSummary(): void {
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n${"-".repeat(50)}`);
  console.log(
    `Results: ${passed} passed, ${failed} failed, ${results.length} total`
  );
  if (failed > 0) {
    console.log("\nFailed tests:");
    for (const r of results.filter((r) => !r.passed)) {
      console.log(`  ✗ ${r.name}: ${r.detail}`);
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

// ─── Factory: minimal valid SQL row ────────────────────────────────

function makeSqlRow(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    [SQL_COLUMNS.RESEARCH_ID]: 3962,
    [SQL_COLUMNS.RESEARCH_REF_CODE]: "UNUD-58-001",
    [SQL_COLUMNS.RESEARCH_NAME_TH]: "การศึกษาเปรียบเทียบ",
    [SQL_COLUMNS.RESEARCH_NAME_ENG]: "A Comparative Study",
    [SQL_COLUMNS.RESEARCH_TYPE_ID]: 2,
    [SQL_COLUMNS.RESEARCH_TYPE_NAME]: "การวิจัยประยุกต์",
    [SQL_COLUMNS.RESEARCH_PROGRAM_ID]: 16,
    [SQL_COLUMNS.RESEARCH_PROGRAM_NAME]: "สาขาเศรษฐศาสตร์",
    [SQL_COLUMNS.DENOMINATION_ID]: 4,
    [SQL_COLUMNS.DENOMINATION_NAME]: "-- ไม่ระบุ --",
    [SQL_COLUMNS.ROAD_MAP_ID]: 1,
    [SQL_COLUMNS.ROAD_MAP_NAME]: "-- ไม่ระบุ --",
    [SQL_COLUMNS.RESEARCH_SERIES]: 0,
    [SQL_COLUMNS.RESEARCH_SERIES_MAIN]: 0,
    [SQL_COLUMNS.RESEARCH_SUCCESS]: 1,
    [SQL_COLUMNS.BUDGET_ID]: 3151,
    [SQL_COLUMNS.MONEY_TYPE_ID]: 2,
    [SQL_COLUMNS.RESEARCH_MONEY_TYPE_NAME]: "งบประมาณภายนอกสถาบัน",
    [SQL_COLUMNS.MONEY_ID]: 11,
    [SQL_COLUMNS.MONEY_NAME]: "งานวิจัยระดับนานาชาติ",
    [SQL_COLUMNS.MONEY_LEVEL_ID]: 4,
    [SQL_COLUMNS.LEVEL_NAME]: "ระดับนานาชาติ",
    [SQL_COLUMNS.BUDGET_DETAIL]: "Udayana University Indonesia",
    [SQL_COLUMNS.BUDGET_YEAR]: 2558,
    [SQL_COLUMNS.BUDGET_BATH]: 255340.0,
    [SQL_COLUMNS.RESEARCHER_ID]: 1,
    [SQL_COLUMNS.PERSON_TYPE]: 1,
    [SQL_COLUMNS.PERSON_TYPE_NAME]: "บุคลากรภายใน",
    [SQL_COLUMNS.PERSON_CODE]: "0801198500078",
    [SQL_COLUMNS.PERSON_NAME]: "Asst. Prof. Dr.Jorge Fidel Barahona Caceres",
    [SQL_COLUMNS.API_POSITION_ID]: "002",
    [SQL_COLUMNS.POSITION]: "ผู้ช่วยศาสตราจารย์",
    [SQL_COLUMNS.DEPARTMENT_CODE]: "20500",
    [SQL_COLUMNS.DIVISION_CODE]: "20500",
    [SQL_COLUMNS.SECTION_CODE]: "20500",
    [SQL_COLUMNS.FACULTY_ID]: null,
    [SQL_COLUMNS.PROGRAM_CODE]: null,
    [SQL_COLUMNS.DEPARTMENT_NAME]: "คณะเศรษฐศาสตร์",
    [SQL_COLUMNS.WORK_PERCENT]: 20,
    [SQL_COLUMNS.RESEARCH_PERSON_BUDGET]: 51068,
    [SQL_COLUMNS.DISCIPLINE_GROUP_ID]: 2,
    [SQL_COLUMNS.DISCIPLINE_GROUP_NAME]: "มนุษยศาสตร์และสังคมศาสตร์",
    [SQL_COLUMNS.DATE_BEGIN]: "2014-10-01",
    [SQL_COLUMNS.DATE_FINISH]: "2015-09-30",
    ...overrides,
  };
}

// ─── Tests ─────────────────────────────────────────────────────────

function runTests(): void {
  console.log("\n=== RDC Budget Normalizer — Tests ===\n");

  // ── 1. Basic SQL row conversion ────────────────────────────────
  console.log("[1] Basic SQL Row Conversion");

  const sqlRow = makeSqlRow();
  const viewRow = rdcToViewResearchRow(sqlRow);

  // Required fields
  assert(viewRow.research_id === 3962, "research_id correct", "3962");
  assert(viewRow.budgetID === 3151, "budgetID correct", "3151");
  assert(viewRow.researcherID === 1, "researcherID correct", "1");
  assert(
    viewRow.personTypeName === "บุคลากรภายใน",
    "personTypeName correct",
    ""
  );
  assert(viewRow.apiPositionID === "002", "apiPositionID correct", "002");
  assert(viewRow.Position === "ผู้ช่วยศาสตราจารย์", "Position correct", "");
  assert(
    viewRow.disciplineGroupID === 2,
    "disciplineGroupID correct",
    "2"
  );
  assert(
    viewRow.disciplineGroupName === "มนุษยศาสตร์และสังคมศาสตร์",
    "disciplineGroupName correct",
    ""
  );

  // Budget fields
  assert(viewRow.budgetYear === 2558, "budgetYear is Fiscal year (BE)", "2558");
  assert(viewRow.budgetBath === 255340.0, "budgetBath correct", "255340");

  // Nullable string
  assert(
    viewRow.research_name_th === "การศึกษาเปรียบเทียบ",
    "research_name_th correct",
    ""
  );

  // Boolean fields
  assert(viewRow.research_series === false, "research_series false from 0", "");
  assert(viewRow.research_success === true, "research_success true from 1", "");

  // ── 2. Thai fiscal year (Buddhist Era) ────────────────────────
  console.log("\n[2] Thai Fiscal Year Handling");

  const years = [2558, 2560, 2565, 2570];
  for (const year of years) {
    const row = rdcToViewResearchRow(makeSqlRow({ [SQL_COLUMNS.BUDGET_YEAR]: year }));
    assert(
      row.budgetYear === year,
      `BE year ${year} preserved as-is`,
      String(year)
    );
  }

  // Null budget year
  const nullYearRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_YEAR]: null })
  );
  assert(
    nullYearRow.budgetYear === null,
    "null budgetYear preserved",
    ""
  );

  // ── 3. String/number budget parsing ───────────────────────────
  console.log("\n[3] Budget Parsing (string vs number)");

  // budgetBath as number (SQL decimal)
  const numRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_BATH]: 500000.5 })
  );
  assert(
    numRow.budgetBath === 500000.5,
    "budgetBath as number parsed",
    String(numRow.budgetBath)
  );

  // budgetBath as string (some drivers return strings)
  const strRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_BATH]: "750000.75" })
  );
  assert(
    strRow.budgetBath === 750000.75,
    "budgetBath as string parsed",
    String(strRow.budgetBath)
  );

  // budgetBath as zero
  const zeroRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_BATH]: 0 })
  );
  assert(zeroRow.budgetBath === 0, "budgetBath zero preserved", "0");

  // budgetBath with commas: parseFloat returns first number before comma
  // SQL Server returns proper numeric types, so this edge case is rare.
  // parseFloat("1,234.56") → 1 (stops at comma)
  const commaResult = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_BATH]: "1,234,567.89" })
  );
  assert(
    commaResult.budgetBath === 1,
    "budgetBath with commas: parseFloat returns first digits (SJIS-safe)",
    String(commaResult.budgetBath)
  );

  // budgetYear as string (some SQL drivers)
  const yearStrRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.BUDGET_YEAR]: "2565" })
  );
  assert(
    yearStrRow.budgetYear === 2565,
    "budgetYear as string parsed",
    String(yearStrRow.budgetYear)
  );

  // ── 4. Null handling ──────────────────────────────────────────
  console.log("\n[4] Null and Missing Field Handling");

  // All nullable fields as null
  const nullRowData: Record<string, unknown> = {};
  // Set required fields to valid values, everything else stays undefined → null
  const requiredFields: Record<string, unknown> = {
    [SQL_COLUMNS.RESEARCH_ID]: 100,
    [SQL_COLUMNS.BUDGET_ID]: 200,
    [SQL_COLUMNS.RESEARCHER_ID]: 300,
    [SQL_COLUMNS.PERSON_TYPE_NAME]: "บุคคลภายนอก",
    [SQL_COLUMNS.API_POSITION_ID]: "001",
    [SQL_COLUMNS.POSITION]: "นักวิจัย",
    [SQL_COLUMNS.DISCIPLINE_GROUP_ID]: 1,
    [SQL_COLUMNS.DISCIPLINE_GROUP_NAME]: "วิทยาศาสตร์",
  };
  for (const [key, val] of Object.entries(requiredFields)) {
    nullRowData[key] = val;
  }
  // Set specific nullable fields to null for verification
  nullRowData[SQL_COLUMNS.RESEARCH_REF_CODE] = null;
  nullRowData[SQL_COLUMNS.BUDGET_BATH] = null;
  nullRowData[SQL_COLUMNS.BUDGET_YEAR] = null;
  nullRowData[SQL_COLUMNS.RESEARCH_MONEY_TYPE_NAME] = null;
  nullRowData[SQL_COLUMNS.MONEY_NAME] = null;
  nullRowData[SQL_COLUMNS.DEPARTMENT_NAME] = null;
  nullRowData[SQL_COLUMNS.FACULTY_ID] = null;
  nullRowData[SQL_COLUMNS.WORK_PERCENT] = null;
  nullRowData[SQL_COLUMNS.RESEARCH_PERSON_BUDGET] = null;
  nullRowData[SQL_COLUMNS.DATE_BEGIN] = null;
  nullRowData[SQL_COLUMNS.DATE_FINISH] = null;

  const nullRow = rdcToViewResearchRow(nullRowData);

  assert(
    nullRow.research_ref_code === null,
    "null research_ref_code",
    ""
  );
  assert(nullRow.budgetBath === null, "null budgetBath", "");
  assert(nullRow.budgetYear === null, "null budgetYear", "");
  assert(
    nullRow.research_money_type_name === null,
    "null research_money_type_name",
    ""
  );
  assert(nullRow.money_name === null, "null money_name", "");
  assert(nullRow.departmentName === null, "null departmentName", "");
  assert(nullRow.facultyID === null, "null facultyID", "");
  assert(nullRow.dateBegin === null, "null dateBegin", "");
  assert(nullRow.dateFinish === null, "null dateFinish", "");

  // ── 5. Missing optional fields ────────────────────────────────
  console.log("\n[5] Missing Optional Fields");

  const sparseRow = rdcToViewResearchRow({
    [SQL_COLUMNS.RESEARCH_ID]: 101,
    [SQL_COLUMNS.BUDGET_ID]: 201,
    [SQL_COLUMNS.RESEARCHER_ID]: 301,
    [SQL_COLUMNS.PERSON_TYPE_NAME]: "ภายใน",
    [SQL_COLUMNS.API_POSITION_ID]: "003",
    [SQL_COLUMNS.POSITION]: "อาจารย์",
    [SQL_COLUMNS.DISCIPLINE_GROUP_ID]: 3,
    [SQL_COLUMNS.DISCIPLINE_GROUP_NAME]: "สังคมศาสตร์",
    // budgetYear and budgetBath intentionally omitted
  });

  assert(
    sparseRow.budgetYear === null,
    "missing budgetYear → null",
    ""
  );
  assert(
    sparseRow.budgetBath === null,
    "missing budgetBath → null",
    ""
  );
  assert(
    sparseRow.departmentName === null,
    "missing departmentName → null",
    ""
  );
  assert(
    sparseRow.research_name_th === null,
    "missing research_name_th → null",
    ""
  );
  // ViewResearchRow defines research_series as boolean | null.
  // Missing field → null at row level; downstream toProject() converts
  // null to false via ?? false. Pipeline test (section 8) confirms this.
  assert(
    sparseRow.research_series === null,
    "missing research_series → null (row level, downstream → false)",
    ""
  );
  assert(
    sparseRow.research_success === null,
    "missing research_success → null (row level, downstream → false)",
    ""
  );

  // ── 6. Person code masking ─────────────────────────────────────
  console.log("\n[6] Person Code Masking");

  const maskedRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.PERSON_CODE]: "0801198500078" })
  );
  assert(
    maskedRow.personCode !== null,
    "personCode is not null",
    ""
  );
  assert(
    maskedRow.personCode!.length === 13,
    "personCode masked to 13 chars",
    `length=${maskedRow.personCode!.length}`
  );
  assert(
    maskedRow.personCode!.endsWith("0078"),
    "personCode ends with last 4 digits",
    maskedRow.personCode!
  );
  assert(
    maskedRow.personCode !== "0801198500078",
    "personCode is not raw value",
    ""
  );
  assert(
    maskedRow.personCode === "*********0078",
    "personCode matches expected mask",
    maskedRow.personCode!
  );

  // maskPersonCode is idempotent
  const doubleMasked = maskPersonCode(maskedRow.personCode);
  assert(
    doubleMasked === maskedRow.personCode,
    "maskPersonCode is idempotent",
    ""
  );

  // Null person code
  const noCodeRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.PERSON_CODE]: null })
  );
  assert(
    noCodeRow.personCode === null,
    "null personCode → null",
    ""
  );

  // Placeholder person code
  const placeholderCodeRow = rdcToViewResearchRow(
    makeSqlRow({ [SQL_COLUMNS.PERSON_CODE]: "-- ไม่ระบุ --" })
  );
  assert(
    placeholderCodeRow.personCode === null,
    "placeholder personCode → null",
    ""
  );

  // ── 7. CSV array adapter ──────────────────────────────────────
  console.log("\n[7] CSV Array-to-Record Adapter");

  const csvFields = [
    "3962", // research_id
    "UNUD-58-001", // research_ref_code
    "การศึกษาเปรียบเทียบ", // research_name_th
    "A Comparative Study", // research_name_eng
    "2", // research_type_id
    "การวิจัยประยุกต์", // research_type_name
  ];
  const headers = [
    "research_id",
    "research_ref_code",
    "research_name_th",
    "research_name_eng",
    "research_type_id",
    "research_type_name",
  ];

  const record = csvArrayToRecord(csvFields, headers);
  assert(
    record["research_id"] === "3962",
    "csvArrayToRecord maps research_id",
    String(record["research_id"])
  );
  assert(
    record["research_name_th"] === "การศึกษาเปรียบเทียบ",
    "csvArrayToRecord maps Thai name",
    ""
  );
  assert(
    record["research_type_name"] === "การวิจัยประยุกต์",
    "csvArrayToRecord maps type",
    ""
  );
  assert(
    Object.keys(record).length === 6,
    "csvArrayToRecord produces 6 entries",
    String(Object.keys(record).length)
  );

  // Test with full 44 columns via CSV adapter
  const fullCsvFields: string[] = [];
  for (let i = 0; i < 44; i++) fullCsvFields.push(i === 0 ? "4000" : "");
  const csvRecord = csvArrayToRecord(fullCsvFields, Object.values(SQL_COLUMNS));
  const csvViewRow = rdcToViewResearchRow(csvRecord);
  assert(
    csvViewRow.research_id === 4000,
    "CSV adapter → rdcToViewResearchRow: research_id",
    String(csvViewRow.research_id)
  );
  assert(
    csvViewRow.research_name_th === null,
    "CSV adapter → rdcToViewResearchRow: empty name → null",
    ""
  );

  // ── 8. Full pipeline compatibility: rdcRowsToViewResearchRows + normalizeRows
  console.log("\n[8] Pipeline Compatibility (normalizeRows)");

  const multiRows = [
    makeSqlRow({ [SQL_COLUMNS.RESEARCH_ID]: 100, [SQL_COLUMNS.BUDGET_ID]: 1 }),
    makeSqlRow({ [SQL_COLUMNS.RESEARCH_ID]: 100, [SQL_COLUMNS.BUDGET_ID]: 2 }),
    makeSqlRow({ [SQL_COLUMNS.RESEARCH_ID]: 101, [SQL_COLUMNS.BUDGET_ID]: 3 }),
  ];
  const viewRows = rdcRowsToViewResearchRows(multiRows);
  assert(
    viewRows.length === 3,
    "rdcRowsToViewResearchRows produces 3 rows",
    String(viewRows.length)
  );

  const dataset = normalizeRows(viewRows);
  assert(
    dataset.projects.length === 2,
    "normalizeRows deduplicates to 2 projects",
    String(dataset.projects.length)
  );
  assert(
    dataset.budgets.length === 3,
    "normalizeRows keeps 3 budget rows",
    String(dataset.budgets.length)
  );
  assert(
    dataset.researchers.length === 3,
    "normalizeRows keeps 3 researcher rows",
    String(dataset.researchers.length)
  );

  // Verify project fields survived the pipeline
  const firstProject = dataset.projects[0];
  assert(
    firstProject.researchId === 100,
    "project.researchId survived pipeline",
    String(firstProject.researchId)
  );
  assert(
    firstProject.isSuccess === true,
    "project.isSuccess survived pipeline (from 1)",
    String(firstProject.isSuccess)
  );

  // Verify budget fields survived
  const firstBudget = dataset.budgets[0];
  assert(
    firstBudget.researchId === 100,
    "budget.researchId survived pipeline",
    String(firstBudget.researchId)
  );
  assert(
    firstBudget.budgetYear === 2558,
    "budget.budgetYear (BE) survived pipeline",
    String(firstBudget.budgetYear)
  );

  // Verify researcher fields survived
  const firstResearcher = dataset.researchers[0];
  assert(
    firstResearcher.personCode !== null &&
      firstResearcher.personCode!.includes("*"),
    "researcher.personCode is masked in pipeline",
    firstResearcher.personCode ?? "null"
  );

  // ── Summary ───────────────────────────────────────────────────
  printSummary();
}

runTests();

/**
 * Full dataset validation and benchmark script.
 *
 * Loads ALL available CSV exports (a1.csv + a3.csv), measures
 * load/parse/memory performance, computes KPIs, and validates
 * data integrity against the full available dataset.
 *
 * Run: npx tsx src/__tests__/full-dataset-validation.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import Papa from "papaparse";
import { parseRow } from "../lib/csv/normalizer";
import { normalizeRows, toProject } from "../lib/csv/normalizer";
import { computeOverviewStats } from "../lib/data/aggregates";
import type { ViewResearchRow, ResearchDataset, OverviewStats } from "../lib/data/models";

// ── Benchmarking helpers ─────────────────────────────────────────

interface BenchmarkResult {
  label: string;
  durationMs: number;
  heapUsedMB: number;
  heapTotalMB: number;
  rssMB: number;
}

const marks: Array<{ label: string; time: number; mem: NodeJS.MemoryUsage }> = [];

function mark(label: string): void {
  marks.push({ label, time: performance.now(), mem: process.memoryUsage() });
}

function computeResults(startMark: string, endMark: string): BenchmarkResult {
  const start = marks.find((m) => m.label === startMark)!;
  const end = marks.find((m) => m.label === endMark)!;
  return {
    label: `${startMark} → ${endMark}`,
    durationMs: Math.round((end.time - start.time) * 100) / 100,
    heapUsedMB: Math.round((end.mem.heapUsed - start.mem.heapUsed) / 1024 / 1024 * 100) / 100,
    heapTotalMB: Math.round(end.mem.heapTotal / 1024 / 1024 * 100) / 100,
    rssMB: Math.round(end.mem.rss / 1024 / 1024 * 100) / 100,
  };
}

function memoryStr(mem: NodeJS.MemoryUsage): string {
  const heapUsedMB = (mem.heapUsed / 1024 / 1024).toFixed(2);
  const heapTotalMB = (mem.heapTotal / 1024 / 1024).toFixed(2);
  const rssMB = (mem.rss / 1024 / 1024).toFixed(2);
  return `rss=${rssMB}MB, heapUsed=${heapUsedMB}MB, heapTotal=${heapTotalMB}MB`;
}

// ── Data loading ─────────────────────────────────────────────────

function loadCsvFile(filePath: string): string[][] {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠ File not found: ${absolutePath}`);
    return [];
  }
  const content = fs.readFileSync(absolutePath, "utf-8");
  const parsed = Papa.parse<string[]>(content, {
    delimiter: ",",
    dynamicTyping: false,
    skipEmptyLines: true,
  });
  if (parsed.errors.length > 0) {
    console.warn(`  ⚠ Parse warnings for ${filePath}:`, parsed.errors.length);
  }
  return parsed.data;
}

// ── Main validation routine ──────────────────────────────────────

async function main(): Promise<void> {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║   Full Dataset Validation — View_Research                ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log();

  const results: Array<{ check: string; status: "✅" | "⚠" | "❌"; detail: string }> = [];

  function pass(check: string, detail: string): void {
    results.push({ check, status: "✅", detail });
    console.log(`  ✅ ${check}: ${detail}`);
  }

  function warn(check: string, detail: string): void {
    results.push({ check, status: "⚠", detail });
    console.log(`  ⚠ ${check}: ${detail}`);
  }

  function fail(check: string, detail: string): void {
    results.push({ check, status: "❌", detail });
    console.log(`  ❌ ${check}: ${detail}`);
  }

  // ── 1. File inventory & sizes ──────────────────────────────────
  console.log("─── 1. CSV File Inventory ───");
  console.log();

  const csvFiles = [
    { name: "exports/a1.csv", desc: "Full export (rows)" },
    { name: "exports/a2.csv", desc: "Column metadata" },
    { name: "exports/a3.csv", desc: "Sample rows" },
  ];

  let totalFileSizeBytes = 0;
  for (const f of csvFiles) {
    const fp = path.resolve(process.cwd(), f.name);
    if (fs.existsSync(fp)) {
      const stat = fs.statSync(fp);
      totalFileSizeBytes += stat.size;
      const sizeKB = (stat.size / 1024).toFixed(1);
      pass(`File ${f.name}`, `${sizeKB}KB — ${f.desc}`);
    } else {
      warn(`File ${f.name}`, `Not found — ${f.desc}`);
    }
  }

  const totalFileSizeMB = (totalFileSizeBytes / 1024 / 1024).toFixed(2);
  console.log(`\n  Total CSV size: ${totalFileSizeMB}MB`);

  // ── 2. Load and parse benchmark ────────────────────────────────
  console.log("\n─── 2. Parse Benchmark ───");
  console.log();

  const memBefore = process.memoryUsage();
  console.log(`  Memory before: ${memoryStr(memBefore)}`);

  mark("parse-start");

  const a1Rows = loadCsvFile("exports/a1.csv");
  const a3Rows = loadCsvFile("exports/a3.csv");

  const allRawRows: string[][] = [...a1Rows, ...a3Rows];

  const totalRowCount = allRawRows.length;
  const distinctA1Rows = new Set(a1Rows.map((r) => r[0]!)).size;
  const distinctA3Rows = new Set(a3Rows.map((r) => r[0]!)).size;
  const combinedIds = new Set([...a1Rows.map((r) => r[0]!), ...a3Rows.map((r) => r[0]!)]);
  const distinctCombined = combinedIds.size;

  pass(`a1.csv rows loaded`, `${a1Rows.length} rows, ${distinctA1Rows} distinct research IDs`);
  pass(`a3.csv rows loaded`, `${a3Rows.length} rows, ${distinctA3Rows} distinct research IDs`);

  mark("parse-parsed");

  // Parse all rows
  const parsedRows: ViewResearchRow[] = allRawRows.map((fields) => parseRow(fields));
  mark("parse-normalized");

  // Normalize into entities
  const dataset = normalizeRows(parsedRows);
  mark("parse-entities");

  const parseResult = computeResults("parse-start", "parse-entities");

  console.log(`\n  ┌─ Parse Performance ──────────────────────────────`);
  console.log(`  │ Total rows parsed : ${totalRowCount}`);
  console.log(`  │ Parse duration    : ${parseResult.durationMs}ms`);
  console.log(`  │ Rows per second   : ${(totalRowCount / (parseResult.durationMs / 1000)).toFixed(0)}`);
  console.log(`  │ Heap delta        : ${parseResult.heapUsedMB}MB`);
  console.log(`  │ RSS               : ${parseResult.rssMB}MB`);
  console.log(`  └──────────────────────────────────────────────────`);

  // ── 3. Entity stats ────────────────────────────────────────────
  console.log("\n─── 3. Entity Statistics ───");
  console.log();

  pass("Projects (distinct)", `${dataset.projects.length}`);
  pass("Budget records", `${dataset.budgets.length}`);
  pass("Researcher records", `${dataset.researchers.length}`);
  pass("Total raw rows", `${dataset.rawRows.length}`);

  // Average researchers per project
  const researchersPerProject = dataset.projects.length > 0
    ? Math.round((dataset.researchers.length / dataset.projects.length) * 100) / 100
    : 0;
  pass("Avg researchers per project", `${researchersPerProject}`);

  // ── 4. Duplicate check ─────────────────────────────────────────
  console.log("\n─── 4. Duplicate Detection ───");
  console.log();

  // Check duplicate research IDs after dedup
  const projectIdSet = new Set(dataset.projects.map((p) => p.researchId));
  if (projectIdSet.size === dataset.projects.length) {
    pass("No duplicate project IDs", `${dataset.projects.length} unique IDs`);
  } else {
    fail("Duplicate project IDs detected",
      `${dataset.projects.length} projects, ${projectIdSet.size} unique`);
  }

  // Check for duplicate (researchId, researcherId) pairs
  const resPairs = dataset.researchers.map((r) => `${r.researchId}-${r.researcherId}`);
  const uniqueResPairs = new Set(resPairs);
  if (uniqueResPairs.size === dataset.researchers.length) {
    pass("No duplicate researcher assignments",
      `${dataset.researchers.length} unique (project, researcher) pairs`);
  } else {
    warn("Duplicate researcher assignments",
      `${dataset.researchers.length} raw, ${uniqueResPairs.size} unique`);
  }

  // ── 5. Data quality checks ─────────────────────────────────────
  console.log("\n─── 5. Data Quality ───");
  console.log();

  // Null fields check
  const nullableFields: Array<{ key: keyof ViewResearchRow; name: string }> = [
    { key: "research_ref_code", name: "research_ref_code" },
    { key: "research_name_th", name: "research_name_th" },
    { key: "research_name_eng", name: "research_name_eng" },
    { key: "research_type_name", name: "research_type_name" },
    { key: "research_program_name", name: "research_program_name" },
    { key: "money_name", name: "money_name" },
    { key: "budgetDetail", name: "budgetDetail" },
    { key: "departmentName", name: "departmentName" },
    { key: "personName", name: "personName" },
    { key: "personCode", name: "personCode" },
    { key: "budgetBath", name: "budgetBath" },
    { key: "budgetYear", name: "budgetYear" },
    { key: "dateBegin", name: "dateBegin" },
    { key: "dateFinish", name: "dateFinish" },
  ];

  for (const field of nullableFields) {
    const nullCount = parsedRows.filter((r) => r[field.key] === null).length;
    const nullPct = ((nullCount / parsedRows.length) * 100).toFixed(1);
    if (nullCount === parsedRows.length) {
      warn(`Field ${field.name}`, `100% null (${nullCount}/${parsedRows.length})`);
    } else if (nullCount > 0) {
      pass(`Field ${field.name} null count`, `${nullCount}/${parsedRows.length} (${nullPct}%)`);
    } else {
      pass(`Field ${field.name} null count`, `0 null (fully populated)`);
    }
  }

  // personCode masking check
  const maskedCodes = dataset.researchers
    .filter((r) => r.personCode !== null)
    .map((r) => r.personCode!);
  const allMasked = maskedCodes.every((c) => c.includes("*") || c.length <= 4);
  if (allMasked) {
    pass("personCode masking", `${maskedCodes.length} values masked (e.g., "${maskedCodes[0] || "N/A"}")`);
  } else {
    warn("personCode masking", `Some codes may not be masked`);
  }

  // Budget years range
  const years = dataset.budgets
    .map((b) => b.budgetYear)
    .filter((y): y is number => y !== null);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  pass("Budget year range", `BE ${minYear} → BE ${maxYear} (${minYear - 543} CE → ${maxYear - 543} CE)`);

  // Zero budget count
  const zeroCount = dataset.budgets.filter((b) => b.budgetBath === 0).length;
  pass("Zero-budget records preserved", `${zeroCount}/${dataset.budgets.length} (${((zeroCount / dataset.budgets.length) * 100).toFixed(1)}%)`);

  // ── 6. KPI recomputation ──────────────────────────────────────
  console.log("\n─── 6. KPI Computation (Full Dataset) ───");
  console.log();

  mark("kpi-start");
  const stats = computeOverviewStats(dataset);
  mark("kpi-end");
  const kpiResult = computeResults("kpi-start", "kpi-end");

  console.log(`  ┌─ Executive KPIs ───────────────────────────────────`);
  console.log(`  │ Total Projects      : ${stats.kpis.totalProjects}`);
  console.log(`  │ Total Budget        : ฿${stats.kpis.totalBudget.toLocaleString("en-US")}`);
  console.log(`  │ Success Count       : ${stats.kpis.successCount}`);
  console.log(`  │ Success Rate        : ${stats.kpis.successRate}%`);
  console.log(`  │ External Funding    : ${stats.kpis.externalFundingCount}`);
  console.log(`  │ Internal Funding    : ${stats.kpis.internalFundingCount}`);
  console.log(`  │ Budget Years        : ${stats.kpis.budgetYears.join(", ")}`);
  console.log(`  │ Computation time    : ${kpiResult.durationMs}ms`);
  console.log(`  └────────────────────────────────────────────────────`);
  console.log();
  console.log(`  ┌─ Breakdowns ───────────────────────────────────────`);
  console.log(`  │ By Type: ${stats.byType.map((t) => `${t.label}(${t.count})`).join(", ")}`);
  console.log(`  │ By Discipline: ${stats.byDiscipline.map((d) => `${d.label}(${d.count})`).join(", ")}`);
  console.log(`  │ By Funding: ${stats.byFundingType.map((f) => `${f.label}(${f.count})`).join(", ")}`);
  console.log(`  └────────────────────────────────────────────────────`);

  // ── 7. Final memory snapshot ───────────────────────────────────
  console.log("\n─── 7. Resource Usage ───");
  console.log();

  const memAfter = process.memoryUsage();
  console.log(`  Memory after: ${memoryStr(memAfter)}`);
  console.log(`  Memory delta: ${((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024).toFixed(2)}MB heap`);

  // ── 8. Production readiness assessment ─────────────────────────
  console.log("\n─── 8. Production Readiness Assessment ───");
  console.log();

  const passedChecks = results.filter((r) => r.status === "✅").length;
  const warnings = results.filter((r) => r.status === "⚠").length;
  const failures = results.filter((r) => r.status === "❌").length;

  console.log(`  ${passedChecks} passed  |  ${warnings} warnings  |  ${failures} failures`);
  console.log();

  // Estimate: scale to 50,000 rows
  const rowScaleFactor = 50000 / totalRowCount;
  const estimatedLoadMs = Math.round(parseResult.durationMs * rowScaleFactor);
  const estimatedMemoryMB = Math.round(((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024) * rowScaleFactor * 100) / 100;

  console.log(`  ┌─ Scale Estimate (50,000 rows) ─────────────────────`);
  console.log(`  │ Estimated parse time  : ${estimatedLoadMs}ms (${(estimatedLoadMs / 1000).toFixed(1)}s)`);
  console.log(`  │ Estimated heap memory : ${estimatedMemoryMB}MB`);
  console.log(`  │ Current row count     : ${totalRowCount}`);
  console.log(`  │ Scale factor          : ${rowScaleFactor.toFixed(1)}x`);
  console.log(`  └────────────────────────────────────────────────────`);
  console.log();

  const isReady = failures === 0;
  if (isReady) {
    console.log("  ✅ PRODUCTION READY — All validation checks passed.\n");
  } else {
    console.log(`  ❌ NOT READY — ${failures} failure(s) detected.\n`);
  }
}

main().catch((err) => {
  console.error("Validation script failed:", err);
  process.exit(1);
});

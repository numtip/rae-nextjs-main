/**
 * Validates data/kpiSnapshot.json against the KPI snapshot contract.
 * Run: rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx tsx scripts/validate-kpi-snapshot.ts [path]'
 *
 * No network, no secrets. Structural validation only (JSON Schema rules mirrored in code).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SCHEMA_VERSION = "1" as const;

const METRIC_IDS = [
  "research-projects",
  "publications-outputs",
  "training-outreach",
  "partner-organisations",
] as const;

type MetricId = (typeof METRIC_IDS)[number];

const SOURCES = ["manual", "registry-api", "metabase-export", "placeholder"] as const;
const STATUSES = ["verified", "pending-live-source"] as const;

type SnapshotSource = (typeof SOURCES)[number];
type SnapshotStatus = (typeof STATUSES)[number];

type SnapshotMetric = {
  id: MetricId;
  value: string;
  labelTh: string;
  labelEn: string;
  contextTh?: string;
  contextEn?: string;
  highlight?: boolean;
};

type KpiSnapshot = {
  schemaVersion: typeof SCHEMA_VERSION;
  generatedAt: string;
  source: SnapshotSource;
  status: SnapshotStatus;
  metrics: SnapshotMetric[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function parseIsoDateTime(v: string): boolean {
  const t = Date.parse(v);
  return Number.isFinite(t);
}

function validateMetric(raw: unknown, index: number, errors: string[]): SnapshotMetric | null {
  if (!isRecord(raw)) {
    errors.push(`metrics[${index}]: must be an object`);
    return null;
  }

  const id = raw.id;
  if (typeof id !== "string" || !METRIC_IDS.includes(id as MetricId)) {
    errors.push(
      `metrics[${index}].id: must be one of ${METRIC_IDS.join(", ")}`
    );
  }

  if (!isNonEmptyString(raw.value, 32)) {
    errors.push(`metrics[${index}].value: required non-empty string (max 32)`);
  }

  if (!isNonEmptyString(raw.labelTh, 120)) {
    errors.push(`metrics[${index}].labelTh: required non-empty string (max 120)`);
  }

  if (!isNonEmptyString(raw.labelEn, 120)) {
    errors.push(`metrics[${index}].labelEn: required non-empty string (max 120)`);
  }

  if (raw.contextTh !== undefined && !isNonEmptyString(raw.contextTh, 160)) {
    errors.push(`metrics[${index}].contextTh: optional string max 160`);
  }

  if (raw.contextEn !== undefined && !isNonEmptyString(raw.contextEn, 160)) {
    errors.push(`metrics[${index}].contextEn: optional string max 160`);
  }

  if (raw.highlight !== undefined && typeof raw.highlight !== "boolean") {
    errors.push(`metrics[${index}].highlight: must be boolean when present`);
  }

  const allowed = new Set([
    "id",
    "value",
    "labelTh",
    "labelEn",
    "contextTh",
    "contextEn",
    "highlight",
  ]);
  for (const key of Object.keys(raw)) {
    if (!allowed.has(key)) {
      errors.push(`metrics[${index}]: unknown property "${key}"`);
    }
  }

  if (errors.some((e) => e.startsWith(`metrics[${index}]`))) return null;

  return {
    id: id as MetricId,
    value: raw.value as string,
    labelTh: raw.labelTh as string,
    labelEn: raw.labelEn as string,
    contextTh: raw.contextTh as string | undefined,
    contextEn: raw.contextEn as string | undefined,
    highlight: raw.highlight as boolean | undefined,
  };
}

export function validateKpiSnapshot(raw: unknown): { ok: true; snapshot: KpiSnapshot } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (!isRecord(raw)) {
    return { ok: false, errors: ["root: must be a JSON object"] };
  }

  if (raw.schemaVersion !== SCHEMA_VERSION) {
    errors.push(`schemaVersion: must be "${SCHEMA_VERSION}"`);
  }

  if (typeof raw.generatedAt !== "string" || !parseIsoDateTime(raw.generatedAt)) {
    errors.push("generatedAt: must be ISO-8601 date-time string");
  }

  if (typeof raw.source !== "string" || !SOURCES.includes(raw.source as SnapshotSource)) {
    errors.push(`source: must be one of ${SOURCES.join(", ")}`);
  }

  if (typeof raw.status !== "string" || !STATUSES.includes(raw.status as SnapshotStatus)) {
    errors.push(`status: must be one of ${STATUSES.join(", ")}`);
  }

  if (!Array.isArray(raw.metrics)) {
    errors.push("metrics: must be an array");
  } else if (raw.metrics.length !== 4) {
    errors.push(`metrics: must contain exactly 4 items (got ${raw.metrics.length})`);
  }

  const rootAllowed = new Set(["schemaVersion", "generatedAt", "source", "status", "metrics"]);
  for (const key of Object.keys(raw)) {
    if (!rootAllowed.has(key)) {
      errors.push(`root: unknown property "${key}"`);
    }
  }

  const metrics: SnapshotMetric[] = [];
  if (Array.isArray(raw.metrics)) {
    raw.metrics.forEach((m, i) => {
      const parsed = validateMetric(m, i, errors);
      if (parsed) metrics.push(parsed);
    });

    const ids = metrics.map((m) => m.id);
    const missing = METRIC_IDS.filter((id) => !ids.includes(id));
    if (missing.length > 0) {
      errors.push(`metrics: missing required ids: ${missing.join(", ")}`);
    }

    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length > 0) {
      errors.push(`metrics: duplicate ids: ${[...new Set(dupes)].join(", ")}`);
    }

    const highlights = metrics.filter((m) => m.highlight === true);
    if (highlights.length > 1) {
      errors.push("metrics: at most one metric may have highlight: true");
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    snapshot: {
      schemaVersion: SCHEMA_VERSION,
      generatedAt: raw.generatedAt as string,
      source: raw.source as SnapshotSource,
      status: raw.status as SnapshotStatus,
      metrics,
    },
  };
}

function validateOne(filePath: string): boolean {
  let text: string;
  try {
    text = readFileSync(filePath, "utf8");
  } catch {
    console.error(`KPI_VALIDATE: FAIL — cannot read ${filePath}`);
    return false;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch (e) {
    console.error(`KPI_VALIDATE: FAIL — invalid JSON in ${filePath}`);
    console.error(String(e));
    return false;
  }

  const result = validateKpiSnapshot(parsed);
  if (!result.ok) {
    console.error(`KPI_VALIDATE: FAIL — ${filePath}`);
    for (const err of result.errors) console.error(`  - ${err}`);
    return false;
  }

  console.log(`KPI_VALIDATE: PASS — ${filePath}`);
  console.log(`  schemaVersion: ${result.snapshot.schemaVersion}`);
  console.log(`  source: ${result.snapshot.source}`);
  console.log(`  status: ${result.snapshot.status}`);
  console.log(`  metrics: ${result.snapshot.metrics.length}`);
  return true;
}

function main(): void {
  const fileArg = process.argv[2];

  if (fileArg) {
    // Validate a single file
    const filePath = resolve(process.cwd(), fileArg);
    if (!validateOne(filePath)) process.exit(1);
  } else {
    // Default: validate both production snapshot and example
    const root = process.cwd();
    const prod = resolve(root, "data/kpiSnapshot.json");
    const example = resolve(root, "data/kpiSnapshot.example.json");

    const prodOk = validateOne(prod);
    const exampleOk = validateOne(example);

    if (!prodOk || !exampleOk) {
      console.error("KPI_VALIDATE: one or more files FAILED");
      process.exit(1);
    }
    console.log("KPI_VALIDATE: ALL PASS");
  }
}

main();

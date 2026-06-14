# RDC SQL Connector Plan — Read-Only Budget Integration

> **Status:** Planning — no implementation started  
> **Date:** 2026-06-14  
> **Upstream:** Research Data Center — `centerDW.dbo.View_Research`  

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Build Time (CI / Local)                       │
│                                                                  │
│  SQL Server (RDC)         rdc-sql-connector.ts    ResearchDataset│
│  ┌──────────────┐        ┌──────────────────┐    ┌────────────┐ │
│  │ View_Research│───────▶│ query + fetch     │───▶│ normalize  │ │
│  │ (44 columns) │        │ parse rows        │    │ → models   │ │
│  └──────────────┘        │ handle errors     │    └─────┬──────┘ │
│                          └──────────────────┘          │         │
│                                                         ▼         │
│                                                  budgetStats     │
│                                                  Adapter         │
│                                                  ┌──────────────┐│
│                                                  │ BudgetStats  ││
│                                                  │ (API shape)  ││
│                                                  └──────────────┘│
│                                                         │         │
│                                                         ▼         │
│                                                  Next.js API     │
│                                                  Route           │
│                                                  (server-side)   │
└─────────────────────────────────────────────────────────────────┘
```

### Design principles

| Principle | Rationale |
|-----------|-----------|
| **Build-time execution** | SQL connection runs in CI or local dev — never in browser |
| **Fail closed** | Connector failure → build failure → no stale data deployed |
| **Read-only** | `SELECT` only — no write operations |
| **No secrets in repo** | Credentials via environment variables or CI secrets |
| **Reuse existing pipeline** | SQL output normalizes to `ViewResearchRow[]`, feeding existing `normalizeRows()` → `computeBudgetStats()` |
| **Gradual rollout** | CSV export path remains operational until SQL is verified |

---

## 2. Planned Connector Architecture

### 2.1 File location

```
lib/connectors/rdcSqlConnector.ts   — SQL query + connection logic
lib/connectors/rdcSqlConfig.ts      — configuration types (no secrets)
```

### 2.2 Environment variables (placeholders only)

| Variable | Purpose | Example value |
|----------|---------|---------------|
| `RDC_SQL_SERVER` | SQL Server hostname | `{{rdc-sql-server.example.com}}` |
| `RDC_SQL_DATABASE` | Database name | `centerDW` |
| `RDC_SQL_USER` | Read-only username | `{{rdc-readonly-user}}` |
| `RDC_SQL_PASSWORD` | Read-only password | `{{rdc-readonly-password}}` |
| `RDC_SQL_ENCRYPT` | SSL enforcement | `true` |
| `RDC_SQL_TRUST_SERVER_CERT` | Self-signed cert policy | `false` (default) |

### 2.3 Connection string pattern

```
Server={{RDC_SQL_SERVER}};Database=centerDW;User Id={{RDC_SQL_USER}};Password={{RDC_SQL_PASSWORD}};Encrypt=true;TrustServerCertificate=false;
```

### 2.4 Planned query

```sql
SELECT *
FROM View_Research
WHERE budgetYear IS NOT NULL
ORDER BY research_id, budgetID;
```

The WHERE clause excludes rows with null budget years from the result set (they would be excluded anyway by the normalizer, but reducing row count improves performance).

### 2.5 Planned connector signature

```typescript
// lib/connectors/rdcSqlConnector.ts (planned — not yet implemented)

import type { ViewResearchRow } from "@/lib/data/models";

export interface RdcSqlConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  encrypt: boolean;
  trustServerCertificate: boolean;
}

/**
 * Fetch all rows from View_Research via SQL Server.
 * Returns raw rows ready for normalization.
 * Throws on connection failure, query error, or empty result.
 */
export async function fetchViewResearch(
  config: RdcSqlConfig
): Promise<ViewResearchRow[]> {
  // TODO: Implement using mssql (tedious) or pg-mssql connector
  // ConnectionString from config
  // Execute: SELECT * FROM View_Research ORDER BY research_id, budgetID
  // Map result rows to ViewResearchRow[] shape using rdcToViewResearchRow()
  throw new Error("RDC SQL connector not yet implemented");
}
```

---

## 3. Normalization Flow

The planned connector reuses the existing normalization pipeline:

```
SQL rows (raw)
    │
    ▼
rdcToViewResearchRow()    ← new function (lib/adapters/rdcBudgetNormalizer.ts)
    │                        Maps SQL column names → ViewResearchRow fields
    ▼
normalizeRows()            ← existing function (lib/csv/normalizer.ts)
    │                        Splits into projects, budgets, researchers
    ▼
ResearchDataset            ← existing type (lib/data/models.ts)
    │
    ▼
computeBudgetStats()       ← existing function (lib/data/aggregates.ts)
    │
    ▼
BudgetStats                ← existing type (lib/contracts/budgetStats.ts)
```

**Key insight:** The `rdcToViewResearchRow()` function is the only new code needed. Everything downstream already handles `ViewResearchRow[]` as input.

---

## 4. Failure Handling

| Failure Mode | Behavior | Recovery |
|-------------|----------|----------|
| **Connection refused** | Connector throws, build fails | Check network, credentials, firewall |
| **Query timeout** | Connector throws, build fails | Add query timeout config, retry logic |
| **Empty result set** | Connector returns empty array, `normalizeRows()` returns empty dataset, adapter returns empty stats | Valid — not an error (data source may be empty) |
| **Missing column** | `rdcToViewResearchRow()` silently uses `null` for missing optional columns | Log warning; required columns throw |
| **Type mismatch** (e.g., `budgetBath` is string instead of number) | Column-specific parser handles gracefully | Log and coerce |

### 4.1 Graceful degradation strategy

```typescript
export async function fetchResearchDataSafe(
  config: RdcSqlConfig
): Promise<ResearchDataset> {
  try {
    const rows = await fetchViewResearch(config);
    return normalizeRows(rows);
  } catch (error) {
    console.error("RDC SQL connector failed:", error);
    // Fallback: return empty dataset instead of crashing entire build
    return { projects: [], budgets: [], researchers: [], rawRows: [] };
  }
}
```

**Note:** The "fail open" fallback (returning empty data) is only acceptable during development. In production CI, the build should fail on connector failure to prevent stale data from being deployed.

---

## 5. Cache Strategy

| Level | Mechanism | TTL | Notes |
|-------|-----------|-----|-------|
| **Build-time** | Connector runs once per build | Per-build | No caching needed — build is the cache boundary |
| **CI** | SQL query on every CI run | Per-CI-run | Can be optimized with snapshot file if query is expensive |
| **Local dev** | SQL query on `npm run build` | Per-build | Can use CSV fallback if SQL unavailable |
| **Snapshot fallback** | `data/research/a3.csv` | Manual | Already implemented; serves as offline/fallback source |

### 5.1 Snapshot caching pattern (future)

```
RDC SQL        ──[connector]──▶  data/research/a3.csv  ──[normalizer]──▶  ResearchDataset
                                     ▲
                                     │
                              Manual CSV export (fallback)
```

The CSV file at `data/research/a3.csv` acts as a **build-time cache**: when the SQL connector is unavailable (local dev without VPN), the CSV export provides the same data shape.

---

## 6. No Production Impact Guarantee

| Risk | Mitigation |
|------|------------|
| SQL connection from CI slows RDC production DB | Query is `SELECT *` against a view with no JOINs — lightweight. Add `TOP` limit until row count is known |
| Credentials leaked in build logs | Log connection errors without exposing password. Use `***` masking |
| Accidental write operation | Connector uses `SELECT` only. SQL login has `db_datareader` role only |
| Development connector hits production DB | Environment variables control target — CI uses production, local dev uses staging or CSV fallback |
| Connector modifies local files | Connector only reads; never writes to the filesystem |

---

## 7. Implementation Order (Future Slices)

| Step | Task | Dependencies |
|------|------|--------------|
| 0 | Confirm SQL Server host, auth, and SSL with RDC team | RDC team availability |
| 1 | Install `mssql` (tedious) npm dependency | — |
| 2 | Create `lib/connectors/rdcSqlConfig.ts` | Step 0 |
| 3 | Create `lib/connectors/rdcSqlConnector.ts` | Step 1–2 |
| 4 | Implement `rdcToViewResearchRow()` in normalizer | Existing `lib/adapters/rdcBudgetNormalizer.ts` |
| 5 | Integration test against staging DB | Step 3–4 |
| 6 | CI pipeline integration | Step 3–5 |
| 7 | CSV fallback guard (use CSV if SQL unavailable) | Step 3–6 |

**Current slice (Slice 14) completes Steps 0, 4 (stub), and documentation (Steps 0–4 plan).**

---

## 8. Related Documents

- `docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md` — SQL source column contract
- `docs/architecture/RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` — Overall RDC integration blueprint
- `lib/adapters/budgetStatsAdapter.ts` — BudgetStats transformation layer
- `lib/csv/normalizer.ts` — Existing CSV normalizer (reusable pipeline)
- `lib/data/models.ts` — TypeScript data models
- `docs/contracts/BUDGET_STATS_CONTRACT.md` — BudgetStats API contract

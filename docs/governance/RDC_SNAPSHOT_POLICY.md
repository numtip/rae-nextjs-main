# RDC Budget Snapshot Governance Policy

> **Status:** Active  
> **Date:** 2026-06-14  
> **Upstream:** Research Data Center — `centerDW.dbo.View_Research`  
> **Scope:** Budget years BE 2559–2569 only  

---

## 1. Source

| Property | Value |
|----------|-------|
| **System** | Research Data Center (RDC) — internal university SQL Server |
| **Host** | `10.1.254.53:1433` |
| **Database** | `centerDW` |
| **Schema** | `dbo` |
| **View** | `View_Research` |
| **Columns** | 44 (see `docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md`) |
| **Auth** | SQL Server Authentication — read-only user `DCResearchUser` |

---

## 2. Scope

| Constraint | Rule |
|------------|------|
| **Budget years** | `BETWEEN 2559 AND 2569` only |
| **Data type** | Aggregated BudgetStats (not raw rows) |
| **Access pattern** | Build-time batch extraction — never from browser |
| **Connection** | Read-only, `Encrypt=true`, `TrustServerCertificate=true` |

**Enforcement:** The export script (`scripts/export-rdc-budget.ts`) throws immediately if any row in the result set has a `budgetYear` outside 2559–2569.

---

## 3. Privacy Rules

| Rule | Enforcement |
|------|-------------|
| No `personName` in snapshot | `applyPrivacyFilter()` scans JSON for `personName` key before writing |
| No raw `personCode` in snapshot | Normalizer masks via `maskPersonCode()`; filter rejects unmasked codes >4 chars |
| Aggregated only | Snapshot contains `BudgetStats` — no row-level or person-level data |

The privacy filter is a **defense-in-depth** layer. Even though BudgetStats is already aggregated (no personnel fields), the filter independently verifies the output before writing.

---

## 4. Refresh Policy

| Trigger | Behavior |
|---------|----------|
| **Manual** | `npx tsx scripts/export-rdc-budget.ts` with `RDC_SQL_PASSWORD` set |
| **CI (workflow_dispatch)** | GitHub Actions workflow `rdc-snapshot.yml` |
| **CI (weekly schedule)** | Optional — configurable in workflow |

**Refresh frequency:** On-demand. The RDC view is updated by the data center team independently. The website is a static export and rebuilds are triggered manually, so automatic weekly snapshots are sufficient.

---

## 5. Fallback

| Scenario | Behavior |
|----------|----------|
| **RDC unavailable** | Build uses `data/research/a3.csv` (existing CSV export) |
| **RDC unavailable + fallback missing** | Build continues with empty BudgetStats |

**Rule:** A build must **never** fail solely because the RDC SQL Server is unreachable. The build pipeline wraps the export in a try/catch that logs the failure and continues gracefully.

---

## 6. Retention

| Constraint | Rule |
|------------|------|
| **Storage** | Only the latest snapshot is retained at `data/research/live-budget-2559-2569.json` |
| **Previous snapshots** | Overwritten on each successful export |
| **CSV fallback** | `data/research/a3.csv` is committed to the repository and versioned |

---

## 7. Validation

Each snapshot must pass `scripts/validate-rdc-budget-snapshot.ts` which checks:

- File exists and is valid JSON
- `budgetYearRange` is exactly `[2559, 2569]`
- All `byYear` entries are within range
- No `personName` anywhere in output
- No unmasked `personCode`
- `rowCount` > 0
- Required BudgetStats fields present and typed correctly

---

## 8. Failure Policy

| Failure Mode | Behavior |
|-------------|----------|
| **RDC unreachable** | Log warning, use fallback CSV, continue build |
| **Validation fails** | Log error, do not write snapshot, continue build (snapshot is optional — stale data is better than no build) |
| **Empty result set** | Log warning, do not write snapshot, continue build |
| **Privacy violation** | Log error, do not write snapshot (cannot risk exposure) |

**Key principle:** RDC availability must not block the website build. The snapshot is a build-time optimization, not a dependency.

---

## 9. Related Documents

- `docs/contracts/RDC_CONNECTION_CONTRACT.md` — Connection parameters
- `docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md` — Column-level contract
- `docs/reports/RDC_ENVIRONMENT_DISCOVERY.md` — Full environment discovery
- `docs/architecture/RDC_SQL_CONNECTOR_PLAN.md` — Connector architecture
- `scripts/export-rdc-budget.ts` — Export script
- `scripts/validate-rdc-budget-snapshot.ts` — Validator script
- `.github/workflows/rdc-snapshot.yml` — CI workflow

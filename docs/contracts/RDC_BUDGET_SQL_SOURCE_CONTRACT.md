# RDC Budget SQL Source Contract — View_Research

> **Status:** Discovery — not yet connected  
> **Date:** 2026-06-14  
> **Upstream:** Research Data Center (RDC) — internal university system  
> **SQL View:** `centerDW.dbo.View_Research`  
> **Current local proxy:** CSV export (`data/research/a3.csv` — 44 columns, 20 sample rows)  

---

## 1. Purpose

This contract documents the expected SQL Server schema for budget-related columns in the `View_Research` view. It serves as the bridge between the RDC SQL source and the existing `ResearchDataset` / `BudgetStats` TypeScript contracts.

The contract is **read-only, source-agnostic, and credential-free**. No real server names, credentials, or connection strings are stored in this document.

---

## 2. Expected SQL Source

| Property | Value (placeholder) | Status |
|----------|--------------------|--------|
| **Server** | `{{RDC_SQL_SERVER}}` | Unknown — placeholder |
| **Database** | `centerDW` | Known from CSV path |
| **Schema** | `dbo` | Assumed (standard SQL Server) |
| **View** | `View_Research` | Confirmed by existing CSV export |
| **Authentication** | SQL Server / Windows Auth | Unknown — `{{RDC_SQL_AUTH}}` |
| **Port** | `1433` | Assumed (default SQL Server) |
| **SSL/TLS** | Required | For production data transit |
| **Read-only user** | `{{RDC_SQL_USER}}` | Required — must have SELECT only |

---

## 3. Required Columns (Budget Stats)

These columns are required for the `BudgetStats` aggregation pipeline. They are confirmed from the existing CSV export and `ViewResearchRow` type definition.

| # | Column Name | CSV Position | TypeScript Type | Nullable | Purpose |
|---|-------------|-------------|-----------------|----------|---------|
| 1 | `research_id` | 0 | `number` | No | Project identifier used as foreign key across entities |
| 2 | `budgetID` | 15 | `number` | No | Budget row identifier |
| 3 | `research_money_type_name` | 17 | `string \| null` | Yes | Funding type label (e.g., "งบประมาณภายในสถาบัน", "งบประมาณภายนอกสถาบัน", "ทุนส่วนตัว") |
| 4 | `money_name` | 19 | `string \| null` | Yes | Funding source name (e.g., "งบภายในหน่วยงาน", "หน่วยงานให้ทุนวิจัย") |
| 5 | `levelName` | 21 | `string \| null` | Yes | Research level (e.g., "ระดับมหาวิทยาลัย", "ระดับชาติ", "ระดับนานาชาติ") |
| 6 | `budgetDetail` | 22 | `string \| null` | Yes | Budget line description |
| 7 | `budgetYear` | 23 | `number \| null` | Yes | Fiscal year (Buddhist Era, e.g., 2565) |
| 8 | `budgetBath` | 24 | `number \| null` | Yes | Budget amount in Thai Baht |

---

## 4. Optional Columns (Extended Budget Stats)

These columns exist in the source and are used for additional breakdowns or filtering.

| # | Column Name | CSV Position | TypeScript Type | Nullable | Purpose |
|---|-------------|-------------|-----------------|----------|---------|
| 1 | `research_ref_code` | 1 | `string \| null` | Yes | Project reference code |
| 2 | `research_name_th` | 2 | `string \| null` | Yes | Project name (Thai) |
| 3 | `research_name_eng` | 3 | `string \| null` | Yes | Project name (English) |
| 4 | `research_type_id` | 4 | `number \| null` | Yes | Research type ID |
| 5 | `research_type_name` | 5 | `string \| null` | Yes | Research type label |
| 6 | `money_type_id` | 16 | `number \| null` | Yes | Funding type ID |
| 7 | `money_id` | 18 | `number \| null` | Yes | Funding source ID |
| 8 | `moneyLevelID` | 20 | `number \| null` | Yes | Level ID |
| 9 | `departmentName` | 37 | `string \| null` | Yes | Department name (for faculty grouping) |
| 10 | `facultyID` | 35 | `string \| null` | Yes | Faculty ID (for faculty grouping) |
| 11 | `disciplineGroupName` | 41 | `string` | No | Discipline group label |
| 12 | `dateBegin` | 42 | `string \| null` | Yes | Project start date |
| 13 | `dateFinish` | 43 | `string \| null` | Yes | Project end date |

---

## 5. Data Type Assumptions (SQL → TypeScript)

| SQL Data Type | TypeScript Type | Parsing Rule |
|--------------|-----------------|--------------|
| `int` | `number` | `parseInt(value, 10)` — NaN → `null` (nullable) or `0` (required) |
| `decimal(18,2)` | `number` | `parseFloat(value)` — NaN → `null` |
| `nvarchar(n)` | `string \| null` | Trimmed; empty or placeholder → `null` |
| `bit` | `boolean \| null` | `"1"`/`"true"` → `true`, `"0"`/`"false"` → `false`, else `null` |
| `date` | `string \| null` | ISO date string, preserved as-is |

---

## 6. Null Handling

| Scenario | Behavior |
|----------|----------|
| `budgetBath IS NULL` | Treated as 0 in aggregation (excluded from sum) |
| `budgetYear IS NULL` | Row excluded from `byYear` grouping, counted in `zeroBudgetProjects` |
| `money_name IS NULL` | Labeled as `"Unspecified"` in `bySource` breakdown |
| `research_money_type_name IS NULL` | Labeled as `"Unspecified"` in `byType` breakdown |
| `levelName IS NULL` | Labeled as `"Unspecified"` in `byLevel` breakdown |
| Placeholder strings | `"-- ไม่ระบุ --"`, `"-"`, `"NULL"`, `""` all normalized to `null` |

**Policy:** Absence of data is valid. The aggregation pipeline never throws on nulls.

---

## 7. Security Rules

| Rule | Enforcement |
|------|-------------|
| **Read-only** | Connector must use a SQL login with `SELECT` only — no `INSERT`, `UPDATE`, `DELETE`, or `DDL` |
| **No credentials in repo** | Connection strings, usernames, passwords stored as CI/CD secrets (GitHub Actions secrets or `.env` excluded by `.gitignore`) |
| **No client exposure** | SQL connector runs at build time only — never in browser JavaScript |
| **SSL required** | `Encrypt=yes` in connection string for production |
| **Public data only** | Adapter must filter to public/non-confidential rows only |

---

## 8. Mapping to BudgetStats Adapter

```
View_Research (SQL)              ResearchDataset (TS)          BudgetStats (API)
─────────────────                ────────────────────          ─────────────────
research_id          ────────▶   ResearchProject.researchId    byYear[].year
budgetYear           ────────▶   ResearchBudget.budgetYear     byYear[].totalBudget
budgetBath           ────────▶   ResearchBudget.budgetBath     byYear[].projectCount
research_money_type  ────────▶   ResearchBudget.moneyTypeName  byType[].label
money_name           ────────▶   ResearchBudget.moneyName      byType[].budget
levelName            ────────▶   ResearchBudget.levelName      byType[].percentage
                                                                bySource[]
                                                                byLevel[]
                                                                summary
```

The existing `lib/adapters/budgetStatsAdapter.ts` accepts `ResearchDataset` as input. The SQL normalizer only needs to produce `ViewResearchRow[]` — the rest of the pipeline is already built.

---

## 9. Unresolved Questions

| Question | Impact | Needs |
|----------|--------|-------|
| What is the exact SQL Server hostname/IP? | Cannot build connection string | RDC team to provide |
| What authentication method is supported? | Affects connector design (SQL Auth vs Windows Auth vs token) | RDC team to confirm |
| Is `View_Research` scoped to public data only? | If not, additional filtering needed | RDC team to confirm |
| How many rows does `View_Research` contain? | Determines pagination strategy | Run `SELECT COUNT(*) FROM View_Research` |
| What is the column data type for `budgetBath`? | Assumed `decimal(18,2)` — needs confirmation | Run `01_columns.sql` |
| Are there indexes on `budgetYear` or `research_id`? | Affects query performance | SQL Server DBA |
| Is SSL certificate properly configured? | Required for secure connection | RDC team to confirm |
| What is the refresh frequency of `View_Research`? | Determines cache strategy | RDC team to confirm |

---

## 10. Discovery Queries (to run against live database)

```sql
-- Column types
SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'View_Research'
ORDER BY ORDINAL_POSITION;

-- Row count
SELECT COUNT(*) AS TotalRows FROM View_Research;

-- Sample data (first 20)
SELECT TOP 20 * FROM View_Research;

-- Distinct budget years
SELECT DISTINCT budgetYear FROM View_Research ORDER BY budgetYear DESC;

-- Distinct funding types
SELECT DISTINCT research_money_type_name FROM View_Research;

-- Budget range
SELECT MIN(budgetBath) AS MinBudget, MAX(budgetBath) AS MaxBudget, AVG(budgetBath) AS AvgBudget
FROM View_Research;
```

**These queries are for reference only. Do not run against production without RDC team approval.**

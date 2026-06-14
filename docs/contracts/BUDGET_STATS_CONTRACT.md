# API Contract — GET /api/research/stats/budget

> **Status:** Implemented
> **Date:** 2026-06-14
> **Source:** `centerDW.View_Research` (CSV export)

---

## 1. Endpoint

```
GET /api/research/stats/budget
```

Returns budget-specific analytics with multiple breakdowns: by year, by funding type, by source, and by level. Supports all common filter parameters.

**Cache:** `s-maxage=300` (5 minutes)
**Dynamic:** `force-dynamic` with ISR revalidation

---

## 2. Response Shape

```typescript
interface BudgetStats {
  byYear: BudgetYearEntry[];
  byType: BudgetTypeEntry[];
  bySource: BudgetSourceEntry[];
  byLevel: BudgetLevelEntry[];
  summary: BudgetSummary;
  generatedAt: string;
}

interface BudgetYearEntry {
  year: number;
  totalBudget: number;
  projectCount: number;
}

interface BudgetTypeEntry {
  label: string;
  budget: number;
  percentage: number;
}

interface BudgetSourceEntry {
  label: string;
  budget: number;
  count: number;
}

interface BudgetLevelEntry {
  label: string;
  budget: number;
  count: number;
}

interface BudgetSummary {
  zeroBudgetProjects: number;
  highestBudgetYear: number;
  highestBudgetAmount: number;
  averageBudgetPerYear: number;
}
```

---

## 3. Query Parameters

All parameters are optional. Multi-value parameters are comma-separated.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `budgetYears` | `int[]` | `[]` (all) | Filter by budget year(s) |
| `researchTypeNames` | `string[]` | `[]` (all) | Filter by research type label(s) |
| `fundingTypeNames` | `string[]` | `[]` (all) | Filter by funding type label(s) |
| `departmentNames` | `string[]` | `[]` (all) | Filter by department name(s) |
| `disciplineGroupNames` | `string[]` | `[]` (all) | Filter by discipline group(s) |
| `successStatus` | `string` | `'all'` | `'all'`, `'success'`, or `'not_success'` |
| `personTypeNames` | `string[]` | `[]` (all) | Filter by person type(s) |
| `moneyNames` | `string[]` | `[]` (all) | Filter by funding source(s) |
| `dateFrom` | `string` | — | Start date (ISO) for date range filter |
| `dateTo` | `string` | — | End date (ISO) for date range filter |

Example:

```
GET /api/research/stats/budget?budgetYears=2562,2563&fundingTypeNames=งบประมาณภายนอกสถาบัน
```

---

## 4. Example Response

```json
{
  "byYear": [
    { "year": 2558, "totalBudget": 255340.00, "projectCount": 1 },
    { "year": 2561, "totalBudget": 376900.00, "projectCount": 7 },
    { "year": 2562, "totalBudget": 1730000.00, "projectCount": 6 },
    { "year": 2563, "totalBudget": 30000.00, "projectCount": 1 }
  ],
  "byType": [
    { "label": "งบประมาณภายในสถาบัน", "budget": 388600.00, "percentage": 13.9 },
    { "label": "งบประมาณภายนอกสถาบัน", "budget": 2300000.00, "percentage": 82.1 },
    { "label": "ทุนส่วนตัว", "budget": 112900.00, "percentage": 4.0 }
  ],
  "bySource": [
    { "label": "หน่วยงานให้ทุนวิจัย", "budget": 2300000.00, "count": 4 },
    { "label": "งบภายในหน่วยงาน", "budget": 388600.00, "count": 5 },
    { "label": "ส่วนตัวของผู้วิจัย", "budget": 112900.00, "count": 5 }
  ],
  "byLevel": [
    { "label": "ระดับคณะ/สำนักงาน", "budget": 80000.00, "count": 3 },
    { "label": "ระดับมหาวิทยาลัย", "budget": 288600.00, "count": 1 },
    { "label": "ระดับชาติ", "budget": 2300000.00, "count": 4 },
    { "label": "ระดับนานาชาติ", "budget": 255340.00, "count": 1 },
    { "label": "อื่นๆ", "budget": 45900.00, "count": 2 }
  ],
  "summary": {
    "zeroBudgetProjects": 5,
    "highestBudgetYear": 2562,
    "highestBudgetAmount": 1730000.00,
    "averageBudgetPerYear": 588060.00
  },
  "generatedAt": "2026-06-14T06:00:00.000Z"
}
```

---

## 5. Standard Wrapped Response

For API consumers preferring a uniform envelope:

```
GET /api/research/budget/stats
```

```json
{
  "success": true,
  "generatedAt": "2026-06-14T06:00:00.000Z",
  "data": {
    "byYear": [],
    "byType": [],
    "bySource": [],
    "byLevel": [],
    "summary": {
      "zeroBudgetProjects": 0,
      "highestBudgetYear": 0,
      "highestBudgetAmount": 0,
      "averageBudgetPerYear": 0
    }
  }
}
```

---

## 6. Derivation Rules

| Field | Source Entity | Aggregation | Sort Order |
|-------|-------------|-------------|-----------|
| `byYear[].year` | `budgets[].budgetYear` | Distinct year from budget records | Ascending |
| `byYear[].totalBudget` | `budgets[].budgetBath` | Sum per year | — |
| `byYear[].projectCount` | `budgets[].researchId` | Distinct project count per year | — |
| `byType[].label` | `budgets[].moneyTypeName` | Distinct funding type label | — |
| `byType[].budget` | `budgets[].budgetBath` | Sum per funding type | By budget descending |
| `byType[].percentage` | Computed | `(typeBudget / totalBudgetAll) * 100` | — |
| `bySource[].label` | `budgets[].moneyName` | Distinct source name | — |
| `bySource[].budget` | `budgets[].budgetBath` | Sum per source | By budget descending |
| `bySource[].count` | `budgets[].budgetId` | Record count per source | — |
| `byLevel[].label` | `budgets[].levelName` | Distinct level name | — |
| `byLevel[].budget` | `budgets[].budgetBath` | Sum per level | By budget descending |
| `byLevel[].count` | `budgets[].budgetId` | Record count per level | — |
| `summary.zeroBudgetProjects` | Computed | Distinct projects where sum(budgetBath) === 0 | — |
| `summary.highestBudgetYear` | Computed | Year with highest total budget | — |
| `summary.highestBudgetAmount` | Computed | Highest year total | — |
| `summary.averageBudgetPerYear` | Computed | totalBudgetAll / number of years | — |

---

## 7. Edge Cases

| Condition | Behavior |
|-----------|----------|
| **Empty dataset** | All arrays empty, summary fields are 0 |
| **Null budgetBath** | Treated as 0 for sum/count purposes |
| **Null budgetYear** | Excluded from byYear grouping |
| **Null moneyTypeName** | Labeled as "Unspecified" |
| **Null moneyName** | Labeled as "Unspecified" |
| **Null levelName** | Labeled as "Unspecified" |
| **Only zero-budget projects** | byYear arrays may be empty, zeroBudgetProjects > 0 |
| **Filter matches nothing** | Returns empty arrays with valid summary shape |
| **Single year filtered** | byYear returns one entry; averages computed from that single entry |

---

## 8. Error Responses

### 503 — Dataset Unavailable

```json
{
  "error": "Data source not available",
  "code": "CSV_NOT_FOUND",
  "details": { "message": "CSV data file not found: ..." }
}
```

### 500 — Internal Error

```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "details": null
}
```

---

## 9. Response Headers

| Header | Value |
|--------|-------|
| `Cache-Control` | `public, s-maxage=300, stale-while-revalidate=600` |
| `X-API-Version` | `1.0` |
| `X-Generated-At` | ISO 8601 timestamp |
| `X-Data-Source` | `centerDW.View_Research` |
| `X-Record-Count` | Total dataset project count |

---

## 10. Conceptual Field Mapping

The requested conceptual fields map to the actual API fields as follows:

| Conceptual Field | API Field | Current Status |
|-----------------|-----------|----------------|
| `fiscalYear` | `byYear[].year` | Implemented — budget year (Buddhist Era) |
| `totalBudget` | `byYear[].totalBudget` (per year) / `summary.highestBudgetAmount` (peak) | Implemented |
| `projectCount` | `byYear[].projectCount` (per year) | Implemented — distinct project count |
| `budgetByFaculty[]` | `bySource[]` (via `moneyName` grouping) | Implemented — funding source level |
| `budgetByFundingSource[]` | `byType[]` (via `moneyTypeName` grouping) | Implemented — internal/external/personal |
| `budgetByResearchType[]` | `byLevel[]` (via `levelName` grouping) | Implemented — university/national/international |
| `yearlyTrend[]` | `byYear[]` | Implemented — ascending year order |

**Note:** Dedicated `budgetByFaculty` (grouping by `facultyID`/`departmentName`) is available in the raw dataset (`ViewResearchRow.facultyID`, `researchers[].departmentName`) but not yet exposed as a standalone breakdown. This can be added in a future slice if required.

---

## 11. Future SQL Compatibility

This contract is designed to be source-agnostic. When migrating from CSV to SQL Server (RDC):

### Source changes only (adapter layer)

The adapter (`lib/adapters/budgetStatsAdapter.ts`) accepts `ResearchDataset` as input. A future SQL adapter would:

1. Query `centerDW.View_Research` (or equivalent view)
2. Normalize rows into the same `ViewResearchRow[]` shape
3. Pass to existing `normalizeRows()` → `computeBudgetStats()` pipeline

### No contract changes required

The `BudgetStats` response type, error format, and caching headers remain identical regardless of data source. The adapter layer isolates source complexity.

### Future fields (SQL-only)

| Field | SQL Source | Benefit |
|-------|-----------|---------|
| `budgetByFaculty[]` | `SELECT facultyID, departmentName, SUM(budgetBath) ... GROUP BY facultyID` | Department-level budget allocation |
| Real-time `generatedAt` | `GETDATE()` or query timestamp | Live data freshness |
| Paginated budget detail | `OFFSET/FETCH` | Drill-down from summary |

---

## 12. Constraints

| Rule | Reason |
|------|--------|
| **No SQL** | Data comes from CSV, not a database |
| **Read-only** | Never modify source files |
| **Deterministic** | Same dataset always produces same output |
| **Cache-friendly** | 5-minute cache TTL |
| **Sorted** | Years ascending, breakdowns by budget descending |
| **Precision** | All monetary values rounded to 2 decimal places |

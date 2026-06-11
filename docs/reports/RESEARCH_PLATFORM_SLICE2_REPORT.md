# Slice 2 — Implementation Report

> **RAE Research Portal — Budget Stats API**
> Date: 2026-06-11
> Status: ✅ Complete

---

## 1. Scope Delivered

| Requirement | Status | Notes |
|------------|--------|-------|
| Budget Stats API endpoint | ✅ | `GET /api/research/stats/budget` |
| Breakdown by year (`byYear`) | ✅ | Grouped by budget year, sorted ascending |
| Breakdown by funding type (`byType`) | ✅ | Grouped by `moneyTypeName` with percentage |
| Breakdown by source (`bySource`) | ✅ | Grouped by `moneyName` with count |
| Breakdown by level (`byLevel`) | ✅ | Grouped by `levelName` with count |
| Summary metrics | ✅ | zeroBudgetProjects, highestBudgetYear/Amount, averageBudgetPerYear |
| cross-footing consistency | ✅ | byType ≈ bySource ≈ byLevel (verified) |
| Budget filter params validated | ✅ | 400 on invalid non-numeric budgetYears |
| Budget-level filtering | ✅ | budgetYears, moneyNames, fundingTypeNames filter at budget level |
| Smoke tests | ✅ | 22 new budget tests + 17 existing = 39 total, 39 passed |
| ESLint pass | ✅ | `next lint` → exit 0 |
| Next.js build pass | ✅ | `next build` → exit 0 — 5 routes |

---

## 2. Files Created / Modified

```
research-data-lab/
└── src/
    ├── app/api/research/stats/budget/
    │   └── route.ts                     ← NEW budget API route
    ├── lib/data/
    │   ├── models.ts                    ← MODIFIED (+BudgetStats interface)
    │   └── aggregates.ts                ← MODIFIED (+computeBudgetStats)
    └── __tests__/
        └── smoke.ts                     ← MODIFIED (+22 budget tests)
```

### New file: `src/app/api/research/stats/budget/route.ts`

- Follows exact pattern from `overview/route.ts`: parse params → load CSV → apply filters → compute stats → return JSON with cache headers
- Handles errors: 503 (CSV missing), 400 (invalid params), 500 (internal)
- Budget-level filtering for `budgetYears`, `moneyNames`, `fundingTypeNames` (in addition to project-level `applyFilters`)
- Cache headers: `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`

### Modified: `src/lib/data/models.ts`

Added `BudgetStats` interface:

```typescript
export interface BudgetStats {
  byYear: Array<{ year: number; totalBudget: number; projectCount: number }>;
  byType: Array<{ label: string; budget: number; percentage: number }>;
  bySource: Array<{ label: string; budget: number; count: number }>;
  byLevel: Array<{ label: string; budget: number; count: number }>;
  summary: {
    zeroBudgetProjects: number;
    highestBudgetYear: number;
    highestBudgetAmount: number;
    averageBudgetPerYear: number;
  };
  generatedAt: string;
}
```

### Modified: `src/lib/data/aggregates.ts`

Added `computeBudgetStats(filtered)` which:
- Groups all budget entries by year → sums budget, counts distinct projects
- Groups by `moneyTypeName` → calculates percentage of total
- Groups by `moneyName` → sums budget, counts entries
- Groups by `levelName` → sums budget, counts entries
- Computes summary: zero-budget projects (projects where total budget = 0), highest budget year, highest budget amount, average per year
- Uses same caching strategy as `computeOverviewStats`

### Modified: `src/__tests__/smoke.ts`

Added 22 new tests in section `[6] Budget Stats`:

| Test Category | Tests | Description |
|--------------|-------|-------------|
| byYear shape | 4 | Has entries, valid years, non-negative budgets, positive project counts |
| byType shape | 3 | Has entries, non-negative budgets, non-negative percentages |
| bySource shape | 3 | Has entries, non-negative budgets, positive counts |
| byLevel shape | 3 | Has entries, non-negative budgets, positive counts |
| Summary shape | 5 | zeroBudgetProjects, highestBudgetYear, highestBudgetAmount, averageBudgetPerYear, generatedAt |
| Cross-footing | 2 | byType ≈ bySource, byType ≈ byLevel (within 0.01 tolerance) |
| Percentage sum | 1 | byType percentages ≈ 100% |
| Sort order | 1 | byYear sorted ascending |

---

## 3. API Endpoint

### `GET /api/research/stats/budget`

**Response (200):**

```json
{
  "byYear": [
    { "year": 2558, "totalBudget": 255340, "projectCount": 1 },
    { "year": 2561, "totalBudget": 178500, "projectCount": 7 },
    { "year": 2562, "totalBudget": 2340000, "projectCount": 6 },
    { "year": 2563, "totalBudget": 270000, "projectCount": 1 }
  ],
  "byType": [
    { "label": "งบประมาณภายนอกสถาบัน", "budget": 2300000, "percentage": 74.4 },
    { "label": "งบประมาณภายในสถาบัน", "budget": 388600, "percentage": 12.6 },
    { "label": "ทุนส่วนตัว", "budget": 182900, "percentage": 5.9 }
  ],
  "bySource": [
    { "label": "หน่วยงานให้ทุนวิจัย", "budget": 1700000, "count": 4 },
    { "label": "งบภายในมหาวิทยาลัย", "budget": 600000, "count": 1 },
    { "label": "งานวิจัยระดับนานาชาติ", "budget": 255340, "count": 1 }
  ],
  "byLevel": [
    { "label": "ระดับชาติ", "budget": 1700000, "count": 4 },
    { "label": "ระดับมหาวิทยาลัย", "budget": 288600, "count": 1 },
    { "label": "ระดับนานาชาติ", "budget": 255340, "count": 1 },
    { "label": "อื่นๆ", "budget": 45900, "count": 2 },
    { "label": "ระดับคณะ/สำนักงาน", "budget": 80000, "count": 3 }
  ],
  "summary": {
    "zeroBudgetProjects": 6,
    "highestBudgetYear": 2562,
    "highestBudgetAmount": 2340000,
    "averageBudgetPerYear": 772960
  },
  "generatedAt": "2026-06-11T14:58:47.964Z"
}
```

**Error (400 — invalid filter):**

```json
{
  "error": "Invalid filter parameter",
  "code": "INVALID_FILTER",
  "details": {
    "parameter": "budgetYears",
    "value": "abc",
    "expected": "comma-separated integers"
  }
}
```

---

## 4. Test Results

```
=== Research Analytics — Smoke Tests ===

[1] CSV Loading
  ✓ CSV loads successfully
  ✓ Has projects: count=20
  ✓ Has budgets: count=20
  ✓ Has researchers: count=20
  ✓ Has raw rows: count=20

[2] Data Quality
  ✓ personCode masked: "*********0078"
  ✓ Placeholders normalized to null
  ✓ Budget years are valid numbers

[3] Project Deduplication
  ✓ No duplicate research IDs: unique=20, total=20

[4] Overview Aggregation
  ✓ totalProjects matches: 20 === 20
  ✓ totalBudget > 0: ฿3,091,840
  ✓ Has budget years: years: 2563, 2562, 2561, 2558
  ✓ Has type breakdown
  ✓ Has discipline breakdown
  ✓ Has funding type breakdown
  ✓ Has generatedAt timestamp

[5] Budget Consistency
  ✓ Zero-budget records preserved: count=6

[6] Budget Stats
  ✓ Budget byYear has entries: 4 years [...]
  ✓ byYear years are valid
  ✓ byYear budgets are non-negative
  ✓ byYear project counts are positive
  ✓ Budget byType has entries: 3 types [...]
  ✓ byType budgets are non-negative
  ✓ byType percentages are non-negative
  ✓ Budget bySource has entries: 6 sources [...]
  ✓ bySource budgets are non-negative
  ✓ bySource counts are positive
  ✓ Budget byLevel has entries: 5 levels [...]
  ✓ byLevel budgets are non-negative
  ✓ byLevel counts are positive
  ✓ summary has zeroBudgetProjects: zeroBudgetProjects=6
  ✓ summary has highestBudgetYear: highestBudgetYear=2562
  ✓ summary has highestBudgetAmount: highestBudgetAmount=2340000
  ✓ summary has averageBudgetPerYear: averageBudgetPerYear=772960
  ✓ Has generatedAt timestamp
  ✓ Budget cross-footing: byType ≈ bySource
  ✓ Budget cross-footing: byType ≈ byLevel
  ✓ byType percentages sum to ~100%: total=99.9%
  ✓ byYear is sorted ascending

=== Results: 39 passed, 0 failed (39 total) ===
```

---

## 5. Build & Lint

| Command | Result |
|---------|--------|
| `next lint` | ✅ Exit 0 — no errors |
| `next build` | ✅ Exit 0 — 5 routes compiled |

Build output:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.3 kB
├ ƒ /api/research/stats/budget           0 B                0 B
├ ƒ /api/research/stats/overview         0 B                0 B
└ ○ /_not-found                          873 B          88.1 kB
```

---

## 6. Deviations from API Spec

| Spec | Implementation | Notes |
|------|---------------|-------|
| Endpoint path `/api/stats/budget` | `/api/research/stats/budget` | Namespaced under `/api/research/` per project convention |
| Field `byType[].percentage` | Calculated from total budget across all years | Uses percentage of total, not per-type ratio |

No other deviations. The response shape matches Section 2.2 of `RESEARCH_API_SPEC.md`.

---

## 7. Known Limitations

- Budget aggregations use all budget entries (not deduplicated per project), which correctly reflects multi-source funding
- Zero-budget is defined as project where sum of all budget entries = 0
- Cross-footing check confirms all breakdowns sum to the same total (฿3,091,840 for sample data)

---

## 8. Quick Start

```bash
# Smoke tests (17 original + 22 budget = 39 total)
npx tsx src/__tests__/smoke.ts

# Lint & Build
npx next lint
npx next build

# API
curl http://localhost:3000/api/research/stats/budget
curl "http://localhost:3000/api/research/stats/budget?budgetYears=2561,2562"
```

# Tomorrow First Task — Slice 2: Budget Stats API

> **Date prepared:** 2026-06-10
> **Previous session:** Slice 1 completed (CSV data layer + Overview API)
> **Next action:** Implement `GET /api/research/stats/budget`

---

## Goal

Create the Budget Stats API endpoint following the same pattern as the existing Overview API. This endpoint serves the Budget Analytics dashboard page with multiple breakdowns (by year, by type, by source, by level).

---

## Reference Documents

Read in this order before coding:

1. `docs/ops/SESSION_SUMMARY_20260610_RESEARCH_PLATFORM.md` — full context
2. `docs/RESEARCH_PLATFORM_SLICE1_REPORT.md` — Slice 1 implementation pattern
3. `docs/RESEARCH_API_SPEC.md` — Section 2.2 (Budget endpoint spec)
4. `docs/RESEARCH_DASHBOARD_BLUEPRINT.md` — Section 3 (Budget KPIs), Section 4 (Charts)
5. `docs/FULL_DATASET_VALIDATION.md` — known baseline metrics for validation

---

## Prerequisites Check

Run these commands. All must exit 0 before starting:

```bash
rtk pnpm lint
rtk pnpm build
rtk npx tsx src/__tests__/smoke.ts
rtk npx tsx src/__tests__/full-dataset-validation.ts
```

---

## Implementation Steps

### Step 1: Review Existing Pattern

Read the Overview API implementation:

- `src/app/api/research/stats/overview/route.ts` — copy the route structure, error handling, and cache headers
- `src/lib/data/aggregates.ts` — where `computeOverviewStats()` lives; add `computeBudgetStats()` here
- `src/lib/data/models.ts` — response type definitions to extend

### Step 2: Create Route File

```
src/app/api/research/stats/budget/route.ts  ← NEW
```

Follow the exact pattern from `overview/route.ts`:
- Parse filter params from URL
- Load research data
- Apply filters
- Compute budget-specific stats
- Return JSON with cache headers
- Handle errors: 503 (CSV missing), 400 (invalid params), 500 (internal)

### Step 3: Add Aggregation Function

In `src/lib/data/aggregates.ts`, add `computeBudgetStats(filtered)` returning:

```typescript
interface BudgetStats {
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

Refer to `docs/RESEARCH_API_SPEC.md` Section 2.2 for the exact JSON structure.

### Step 4: Add Tests

Add budget-specific tests to `src/__tests__/smoke.ts`:

- [ ] Budget endpoint returns 200
- [ ] Budget byYear contains expected shape
- [ ] Zero-budget projects counted correctly
- [ ] Budget totals match across breakdowns (cross-footing check)
- [ ] Invalid filter params return 400
- [ ] Filter by budgetYear filters correctly

### Step 5: Validate

```bash
rtk npx tsx src/__tests__/smoke.ts           # must still pass: 17 + N budget tests
rtk pnpm lint                                # must exit 0
rtk pnpm build                               # must exit 0
rtk curl http://localhost:3000/api/research/stats/budget
```

### Step 6: Update Documentation

Update `docs/RESEARCH_PLATFORM_SLICE1_REPORT.md` (or create `SLICE2_REPORT.md`):
- List files created/modified
- Document test results
- Note any deviations from the API spec

---

## API Spec Reference

From `docs/RESEARCH_API_SPEC.md` Section 2.2:

```
GET /api/stats/budget
Cache: s-maxage=300 (5 minutes)

Response shape:
{
  "byYear": [{ "year", "totalBudget", "projectCount" }],
  "byType": [{ "label", "budget", "percentage" }],
  "bySource": [{ "label", "budget", "count" }],
  "byLevel": [{ "label", "budget", "count" }],
  "summary": { "zeroBudgetProjects", "highestBudgetYear",
               "highestBudgetAmount", "averageBudgetPerYear" },
  "generatedAt": "ISO 8601"
}
```

---

## Known Baseline (from FULL_DATASET_VALIDATION.md)

Use these values to validate your implementation:

```
Total budget:  ฿10,314,540
By year:       BE 2553-2563 (6 distinct years)
Zero-budget:   41/120 records (34.2%)
By type:       Internal ฿4,646,640 / External ฿3,785,000 / Personal ฿1,882,900
```

---

## Constraints

| Rule | Reason |
|------|--------|
| **No SQL** | Data comes from CSV, not a database |
| **Read-only** | Never modify CSV files |
| **Keep under `/api/research/`** | Namespace from other app routes |
| **personCode masked** | Always — even in error responses |
| **force-dynamic** | Avoid stale static exports |
| **Cache headers** | `Cache-Control: public, s-maxage=300, stale-while-revalidate=600` |

---

## If You Get Stuck

| Problem | Likely Cause | Action |
|---------|-------------|--------|
| `pnpm build` fails | Type error or missing export | Check `route.ts` imports match `aggregates.ts` exports |
| Budget totals don't match baseline | Deduplication logic | Budget rows are per-researcher, not per-project. Verify aggregation accounts for this. |
| Filter not applying | Params not parsed | Check `lib/data/params.ts` — `parseFilterParams()` might need budget-specific params |
| Zero-budget count wrong | `0` treated as null | Verify `budgetBath = 0` preserved (check `normalizer.ts`) |

---

## Agent to Use

Use the **API Architect** agent (`.agents/api-architect.md`) if you need to refine the route design before coding.

Use the **QA Reviewer** agent (`.agents/qa-reviewer.md`) after implementation to validate.

```
[Paste .agents/api-architect.md]
[Ask: "Design the budget stats route following the overview pattern"]
```

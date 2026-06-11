# API Contract — GET /api/research/projects/[id]

> **Status:** Implemented
> **Slice:** 5 — Research Project Detail API
> **Date:** 2026-06-11

---

## 1. Endpoint

```
GET /api/research/projects/:id
```

Returns the full detail view for a single research project identified by its `researchId`. Includes all associated budget entries, all researcher entries (with `personCode` masked), and ISO timestamp.

**Cache:** `s-maxage=300` (5 minutes — detail data is stable)

---

## 2. Path Parameter

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `int` | Numeric `researchId` from the dataset (must be a positive integer) |

---

## 3. Response Shape

```typescript
interface ProjectDetailResponse {
  project: ResearchProject;
  researchers: ResearcherDetail[];
  budgets: BudgetDetail[];
  generatedAt: string;
}

interface ResearchProject {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeId: number | null;
  typeName: string | null;
  programId: number | null;
  programName: string | null;
  denominationId: number | null;
  denominationName: string | null;
  roadmapId: number | null;
  roadmapName: string | null;
  isSeries: boolean;
  isSeriesMain: boolean;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
}

interface ResearcherDetail {
  researcherId: number;
  personTypeName: string;
  personCode: string | null;      // masked: "****XXXX" format
  personName: string | null;
  positionId: string;
  position: string;
  departmentCode: string | null;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupId: number;
  disciplineGroupName: string;
}

interface BudgetDetail {
  budgetId: number;
  moneyTypeId: number | null;
  moneyTypeName: string | null;
  moneyId: number | null;
  moneyName: string | null;
  moneyLevelId: number | null;
  levelName: string | null;
  budgetDetail: string | null;
  budgetYear: number | null;
  budgetBath: number | null;      // preserved as-is; 0 is valid
}
```

### Example Response

```json
{
  "project": {
    "researchId": 4001,
    "refCode": "MJU-63-001",
    "nameTh": "ชื่อโครงการวิจัย",
    "nameEng": "Research Project Title",
    "typeId": 1,
    "typeName": "การวิจัยประยุกต์",
    "programId": 5,
    "programName": "สาขาเกษตรศาสตร์และชีววิทยา",
    "denominationId": null,
    "denominationName": null,
    "roadmapId": null,
    "roadmapName": null,
    "isSeries": false,
    "isSeriesMain": false,
    "isSuccess": false,
    "dateBegin": "2020-10-01",
    "dateFinish": "2021-09-30",
    "totalBudget": 150000
  },
  "researchers": [
    {
      "researcherId": 10001,
      "personTypeName": "บุคลากรภายใน",
      "personCode": "****5678",
      "personName": "ผศ.ดร.สมศักดิ์ ใจดี",
      "positionId": "AJ",
      "position": "อาจารย์",
      "departmentCode": "AGR",
      "departmentName": "คณะเกษตรศาสตร์",
      "workPercent": 100,
      "researchPersonBudget": 150000,
      "disciplineGroupId": 3,
      "disciplineGroupName": "เกษตรศาสตร์"
    }
  ],
  "budgets": [
    {
      "budgetId": 20001,
      "moneyTypeId": 1,
      "moneyTypeName": "งบประมาณภายในสถาบัน",
      "moneyId": 2,
      "moneyName": "งบภายในมหาวิทยาลัย",
      "moneyLevelId": 1,
      "levelName": "ระดับมหาวิทยาลัย",
      "budgetDetail": "ทุนวิจัยทั่วไป",
      "budgetYear": 2563,
      "budgetBath": 150000
    }
  ],
  "generatedAt": "2026-06-11T15:30:00.000Z"
}
```

---

## 4. Derivation Rules

- `project.totalBudget` — sum of all `budgetBath` values for the project (zero preserved, not omitted)
- `researchers` — all rows from the researchers array with matching `researchId`, sorted by `researcherId` ascending (deterministic)
- `budgets` — all rows from the budgets array with matching `researchId`, sorted by `budgetId` ascending (deterministic)
- `personCode` — always masked at data-load time; never exposed raw
- Placeholder values (`-- ไม่ระบุ --`) normalized to `null` at load time

---

## 5. Error Responses

| Status | Code | Condition |
|--------|------|-----------|
| 400 | `INVALID_PARAM` | `id` is not a valid positive integer |
| 404 | `NOT_FOUND` | No project with the given `researchId` exists in the dataset |
| 503 | `CSV_NOT_FOUND` | CSV source file missing or inaccessible |
| 500 | `CSV_PARSE_ERROR` | CSV file exists but could not be parsed |
| 500 | `INTERNAL_ERROR` | Unexpected failure |

---

## 6. Response Headers

| Header | Value |
|--------|-------|
| `Cache-Control` | `public, s-maxage=300, stale-while-revalidate=600` |
| `X-API-Version` | `1.0` |
| `X-Generated-At` | ISO 8601 timestamp of response generation |
| `X-Data-Source` | `centerDW.View_Research` |
| `X-Research-Id` | The resolved `researchId` (as string) |

---

## 7. Constraints

| Rule | Reason |
|------|--------|
| `personCode` always masked | PII safety — masked at parse time in normalizer |
| `force-dynamic` | Avoid stale static build with dynamic path segment |
| Placeholders normalized to `null` | Consistent with all other endpoints |
| Zero-budget preserved | `budgetBath = 0` is valid and must not be treated as null |
| Deterministic output | Arrays sorted by stable IDs (researcherId, budgetId) |
| No SQL | CSV-only data layer |
| Cache headers identical to stats endpoints | `s-maxage=300, stale-while-revalidate=600` |

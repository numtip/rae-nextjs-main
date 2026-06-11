# API Contract — GET /api/research/projects

> **Status:** Implemented
> **Date:** 2026-06-11

---

## 1. Endpoint

```
GET /api/research/projects
```

Returns a paginated, searchable, sortable, and filterable list of research projects. Each item is a denormalized view combining project metadata, budget summary, and researcher display names.

**Cache:** `s-maxage=120` (2 minutes — list data changes more often)

---

## 2. Query Parameters

### Pagination

| Parameter | Type | Default | Constraints |
|-----------|------|---------|-------------|
| `page` | `int` | `1` | ≥ 1 |
| `pageSize` | `int` | `20` | 1–100 |

### Search

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | `string` | Full-text search across `nameTh`, `nameEng`, `refCode` |

### Sort

| Parameter | Type | Default | Allowed Values |
|-----------|------|---------|----------------|
| `sort` | `string` | `researchId` | `researchId`, `budgetYear`, `totalBudget`, `nameTh` |
| `order` | `string` | `desc` | `asc`, `desc` |

### Filters (all optional, comma-separated multi-value)

| Parameter | Source Field | Example |
|-----------|-------------|---------|
| `budgetYears` | `budgetYear` | `2561,2562` |
| `fundingTypes` | `moneyTypeName` | `งบประมาณภายในสถาบัน` |
| `moneySources` | `moneyName` | `งบภายในมหาวิทยาลัย` |
| `levels` | `levelName` | `ระดับมหาวิทยาลัย` |
| `disciplines` | `disciplineGroupName` | `เกษตรศาสตร์` |
| `researchTypes` | `typeName` | `การวิจัยประยุกต์` or `__unspecified__` |

---

## 3. Response Shape

```typescript
interface ProjectsResponse {
  items: ProjectListItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  filters: {
    q: string | null;
    sort: string;
    order: string;
    budgetYears: number[];
    fundingTypes: string[];
    moneySources: string[];
    levels: string[];
    disciplines: string[];
    researchTypes: string[];
  };
  generatedAt: string;
}

interface ProjectListItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  programName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  moneySource: string | null;
  level: string | null;
  researcherNames: string[];
  disciplineGroup: string | null;
}
```

### Example Response

```json
{
  "items": [
    {
      "researchId": 4001,
      "refCode": "MJU-63-001",
      "nameTh": "ชื่อโครงการวิจัย",
      "nameEng": "Research Project Title",
      "typeName": "การวิจัยประยุกต์",
      "programName": "สาขาเกษตรศาสตร์และชีววิทยา",
      "isSuccess": false,
      "dateBegin": "2020-10-01",
      "dateFinish": "2021-09-30",
      "totalBudget": 150000,
      "budgetYear": 2563,
      "fundingType": "งบประมาณภายในสถาบัน",
      "moneySource": "งบภายในมหาวิทยาลัย",
      "level": "ระดับมหาวิทยาลัย",
      "researcherNames": ["ผศ.ดร.สมศักดิ์ ใจดี"],
      "disciplineGroup": "เกษตรศาสตร์"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 50,
    "totalPages": 3
  },
  "filters": {
    "q": null,
    "sort": "researchId",
    "order": "desc",
    "budgetYears": [],
    "fundingTypes": [],
    "moneySources": [],
    "levels": [],
    "disciplines": [],
    "researchTypes": []
  },
  "generatedAt": "2026-06-11T15:30:00.000Z"
}
```

---

## 4. Derivation Rules

- `totalBudget` — sum of all `budgetBath` values for the project (zero-budget preserved)
- `budgetYear` — from the first budget entry for the project
- `fundingType`, `moneySource`, `level` — from the first budget entry for the project
- `researcherNames` — distinct `personName` values for the project (null filtered out)
- `disciplineGroup` — from the first researcher's `disciplineGroupName`
- `researchTypes` filter: `__unspecified__` maps to `typeName === null`

---

## 5. Error Responses

| Status | Code | Condition |
|--------|------|-----------|
| 400 | `INVALID_PARAM` | Non-numeric `page`/`pageSize`, `pageSize > 100`, invalid `sort` or `order` |
| 503 | `CSV_NOT_FOUND` | CSV source file missing |
| 500 | `INTERNAL_ERROR` | Unexpected failure |

---

## 6. Response Headers

| Header | Value |
|--------|-------|
| `Cache-Control` | `public, s-maxage=120, stale-while-revalidate=300` |
| `X-API-Version` | `1.0` |
| `X-Total-Items` | Total matching item count |
| `X-Record-Count` | Total dataset project count |

---

## 7. Constraints

| Rule | Reason |
|------|--------|
| `personCode` always masked | PII safety — already masked at parse time |
| `force-dynamic` | Avoid stale static build |
| Stable sort | Add `researchId` as secondary sort for determinism |
| No SQL | CSV-only data layer |

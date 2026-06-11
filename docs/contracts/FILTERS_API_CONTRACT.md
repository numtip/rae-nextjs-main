# API Contract — GET /api/research/filters

> **Status:** Draft → Implemented
> **Date:** 2026-06-11

---

## 1. Endpoint

```
GET /api/research/filters
```

Returns all available filter options with display labels and matching record counts. Used by the global filter bar in the dashboard.

**Cache:** `s-maxage=600` (10 minutes — filter options are stable)
**Dynamic:** `force-dynamic` with ISR revalidation

---

## 2. Response Shape

```typescript
interface FiltersResponse {
  budgetYears: FilterOption[];
  fundingTypes: FilterOption[];
  moneySources: FilterOption[];
  levels: FilterOption[];
  disciplines: FilterOption[];
  researchTypes: FilterOption[];
  generatedAt: string;
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}
```

### Example Response

```json
{
  "budgetYears": [
    { "label": "2563", "value": "2563", "count": 1 },
    { "label": "2562", "value": "2562", "count": 6 },
    { "label": "2561", "value": "2561", "count": 7 },
    { "label": "2558", "value": "2558", "count": 1 },
    { "label": "2554", "value": "2554", "count": 3 },
    { "label": "2553", "value": "2553", "count": 2 }
  ],
  "fundingTypes": [
    { "label": "งบประมาณภายในสถาบัน", "value": "งบประมาณภายในสถาบัน", "count": 35 },
    { "label": "ทุนส่วนตัว", "value": "ทุนส่วนตัว", "count": 9 },
    { "label": "งบประมาณภายนอกสถาบัน", "value": "งบประมาณภายนอกสถาบัน", "count": 6 }
  ],
  "moneySources": [
    { "label": "งบภายในมหาวิทยาลัย", "value": "งบภายในมหาวิทยาลัย", "count": 101 },
    { "label": "ส่วนตัวของผู้วิจัย", "value": "ส่วนตัวของผู้วิจัย", "count": 9 },
    { "label": "หน่วยงานให้ทุนวิจัย", "value": "หน่วยงานให้ทุนวิจัย", "count": 5 },
    { "label": "งบภายในหน่วยงาน", "value": "งบภายในหน่วยงาน", "count": 4 },
    { "label": "งานวิจัยระดับนานาชาติ", "value": "งานวิจัยระดับนานาชาติ", "count": 1 },
    { "label": "งานวิจัยระดับชาติ", "value": "งานวิจัยระดับชาติ", "count": 1 }
  ],
  "levels": [
    { "label": "ระดับมหาวิทยาลัย", "value": "ระดับมหาวิทยาลัย", "count": 101 },
    { "label": "อื่นๆ", "value": "อื่นๆ", "count": 9 },
    { "label": "ระดับชาติ", "value": "ระดับชาติ", "count": 5 },
    { "label": "ระดับคณะ/สำนักงาน", "value": "ระดับคณะ/สำนักงาน", "count": 4 },
    { "label": "ระดับนานาชาติ", "value": "ระดับนานาชาติ", "count": 1 }
  ],
  "disciplines": [
    { "label": "ไม่ระบุ", "value": "ไม่ระบุ", "count": 82 },
    { "label": "วิทยาศาสตร์และเทคโนโลยี", "value": "วิทยาศาสตร์และเทคโนโลยี", "count": 16 },
    { "label": "เกษตรศาสตร์", "value": "เกษตรศาสตร์", "count": 15 },
    { "label": "มนุษยศาสตร์และสังคมศาสตร์", "value": "มนุษยศาสตร์และสังคมศาสตร์", "count": 7 }
  ],
  "researchTypes": [
    { "label": "การวิจัยประยุกต์", "value": "การวิจัยประยุกต์", "count": 29 },
    { "label": "การพัฒนาทดลอง", "value": "การพัฒนาทดลอง", "count": 4 },
    { "label": "Unspecified", "value": "__unspecified__", "count": 17 }
  ],
  "generatedAt": "2026-06-11T15:30:00.000Z"
}
```

---

## 3. Derivation Rules

| Field | Source Entity | Deduplication | Sort Order |
|-------|-------------|--------------|-----------|
| `budgetYears` | `budgets[].budgetYear` | Distinct values, filter null | Descending (newest first) |
| `fundingTypes` | `budgets[].moneyTypeName` | Distinct values, filter null | By count descending |
| `moneySources` | `budgets[].moneyName` | Distinct values, filter null | By count descending |
| `levels` | `budgets[].levelName` | Distinct values, filter null | By count descending |
| `disciplines` | `researchers[].disciplineGroupName` | Distinct values, filter null/empty | By count descending |
| `researchTypes` | `projects[].typeName` | Distinct values, null → "Unspecified" | By count descending |

---

## 4. Error Responses

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

## 5. Response Headers

| Header | Value |
|--------|-------|
| `Cache-Control` | `public, s-maxage=600, stale-while-revalidate=1200` |
| `X-API-Version` | `1.0` |
| `X-Generated-At` | ISO 8601 timestamp |
| `X-Data-Source` | `centerDW.View_Research` |
| `X-Record-Count` | Total dataset project count |

---

## 6. Constraints

| Rule | Reason |
|------|--------|
| **No SQL** | Data comes from CSV, not a database |
| **Read-only** | Never modify CSV files |
| **Deterministic** | Same dataset always produces same output |
| **Cache-friendly** | 10-minute cache TTL |
| **Sorted** | Years desc, strings by count desc |
| **Unique** | No duplicate filter options |

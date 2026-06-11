# API Contract — GET /api/research/researchers/[personCode]

> **Status:** Implemented
> **Slice:** 6 — Researcher Detail API
> **Date:** 2026-06-11

---

## 1. Endpoint

```
GET /api/research/researchers/:personCode
```

Returns the full profile and project history for a single researcher identified by their `personCode`. The route accepts either the real (unmasked) personCode or the masked form — both are normalised server-side before lookup. The response **always** uses the masked form; the full personCode is never echoed back.

**Cache:** `s-maxage=300` (5 minutes — same as stats endpoints)

---

## 2. Path Parameter

| Parameter | Type | Description |
|-----------|------|-------------|
| `personCode` | `string` | Researcher's personCode — real or masked form accepted; URL-encode if it contains `*` characters |

### Masking Contract

The server applies `maskPersonCode()` to the input before lookup:

```
"1234567890078"   →  "*********0078"  (real code input)
"*********0078"   →  "*********0078"  (already-masked input, idempotent)
```

The response always contains the masked form. The raw input is never included in any response body.

---

## 3. Response Shape

```typescript
interface ResearcherDetailResponse {
  researcher: ResearcherProfile;
  stats: ResearcherStats;
  projects: ResearcherProjectItem[];
  byYear: ResearcherByYear[];
  generatedAt: string;
}

interface ResearcherProfile {
  personCode: string | null;      // always masked: "****XXXX" format
  nameTh: string | null;          // personName from dataset
  nameEn: null;                   // not present in dataset
  departmentName: string | null;
  facultyName: null;              // only facultyId available, not name
  personTypeName: string;
  position: string;
  disciplineGroupName: string;
}

interface ResearcherStats {
  totalProjects: number;
  totalBudget: number;
  budgetYears: number[];          // distinct years, sorted ascending
  roles: Array<{ label: string; count: number }>;  // by personTypeName
}

interface ResearcherProjectItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
}

interface ResearcherByYear {
  year: number;
  totalBudget: number;
  projectCount: number;
  projects: ResearcherProjectItem[];
}
```

### Example Response

```json
{
  "researcher": {
    "personCode": "*********0078",
    "nameTh": "ผศ.ดร.สมศักดิ์ ใจดี",
    "nameEn": null,
    "departmentName": "คณะเกษตรศาสตร์",
    "facultyName": null,
    "personTypeName": "บุคลากรภายใน",
    "position": "อาจารย์",
    "disciplineGroupName": "เกษตรศาสตร์"
  },
  "stats": {
    "totalProjects": 3,
    "totalBudget": 450000,
    "budgetYears": [2558, 2561, 2562],
    "roles": [{ "label": "บุคลากรภายใน", "count": 3 }]
  },
  "projects": [
    {
      "researchId": 4001,
      "refCode": "MJU-63-001",
      "nameTh": "ชื่อโครงการวิจัย",
      "nameEng": null,
      "typeName": "การวิจัยประยุกต์",
      "isSuccess": false,
      "dateBegin": "2020-10-01",
      "dateFinish": "2021-09-30",
      "totalBudget": 150000,
      "budgetYear": 2563,
      "fundingType": "งบประมาณภายในสถาบัน",
      "workPercent": 100,
      "researchPersonBudget": 150000
    }
  ],
  "byYear": [
    {
      "year": 2558,
      "totalBudget": 120000,
      "projectCount": 1,
      "projects": [...]
    }
  ],
  "generatedAt": "2026-06-11T15:30:00.000Z"
}
```

---

## 4. Derivation Rules

- **Lookup key**: input personCode is masked via `maskPersonCode()` before querying the dataset; matching is exact string equality against `researcher.personCode`
- **Profile** (`researcher`): derived from the **first** matching researcher row (sorted by `researcherId` ascending for determinism); `nameEn` and `facultyName` are always `null` (not in dataset)
- **`stats.totalBudget`**: sum of `totalBudget` across all researcher projects (zero preserved)
- **`stats.budgetYears`**: distinct `budgetYear` values from the researcher's project budgets, sorted ascending
- **`stats.roles`**: count of rows per `personTypeName`, sorted by count descending
- **`projects`**: all projects the researcher participated in, sorted by `researchId` ascending (deterministic); `totalBudget` = sum of all `budgetBath` entries for that project
- **`byYear`**: researcher's projects grouped by `budgetYear`; null-year projects are excluded from `byYear`; sorted ascending by year
- **Zero-budget**: projects with `totalBudget = 0` are included in all arrays
- **Placeholders**: normalised to `null` at load time — never appear in responses

---

## 5. Error Responses

| Status | Code | Condition |
|--------|------|-----------|
| 400 | `INVALID_PARAM` | `personCode` path param is empty after trim |
| 404 | `NOT_FOUND` | No researcher with the derived masked personCode exists in the dataset |
| 503 | `CSV_NOT_FOUND` | CSV source file missing |
| 500 | `CSV_PARSE_ERROR` | CSV file exists but could not be parsed |
| 500 | `INTERNAL_ERROR` | Unexpected failure |

**Privacy rule**: the 404 body includes only the **masked** form of the lookup code — never the raw input.

---

## 6. Response Headers

| Header | Value |
|--------|-------|
| `Cache-Control` | `public, s-maxage=300, stale-while-revalidate=600` |
| `X-API-Version` | `1.0` |
| `X-Generated-At` | ISO 8601 timestamp |
| `X-Data-Source` | `centerDW.View_Research` |
| `X-Person-Code` | Masked personCode (never raw) |

---

## 7. Constraints

| Rule | Reason |
|------|--------|
| `personCode` **always** masked | PII safety — raw codes never stored post-parse |
| Masking is idempotent | `maskPersonCode(maskedCode) === maskedCode` — safe to apply twice |
| Raw personCode never echoed | Not in response body, not in error details, not in headers |
| `force-dynamic` | Dynamic path segment — no static export |
| Deterministic output | Profile from first researcherId row; projects/byYear sorted by stable IDs |
| Zero-budget preserved | `totalBudget = 0` valid and included |
| No SQL | CSV-only data layer |
| Cache headers identical to stats endpoints | `s-maxage=300, stale-while-revalidate=600` |

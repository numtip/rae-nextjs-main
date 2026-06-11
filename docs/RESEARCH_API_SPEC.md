# Research Analytics Platform — API Specification

> **RAE Research Portal**
> Source: `centerDW.View_Research` (CSV export)
> Status: Specification (no implementation)
> Base URL: `/api`

---

## 1. API Overview

The API provides read-only access to the Research Analytics dataset. All endpoints return JSON. The API is consumed by dashboard React components and can also serve as a data source for external reporting tools.

### 1.1 Base Conventions

| Aspect | Convention |
|--------|-----------|
| **Protocol** | HTTP/HTTPS (via Next.js API routes) |
| **Format** | JSON only (`Content-Type: application/json`) |
| **Encoding** | UTF-8 (Thai text supported natively) |
| **Authentication** | Not required for MVP (internal tool) |
| **Caching** | `Cache-Control: public, s-maxage=300, stale-while-revalidate=600` |
| **Error format** | `{ error: string, code: string, details?: unknown }` |
| **Pagination** | Cursor or offset-based (`page`, `pageSize`) |
| **Filtering** | Query parameters for all filter dimensions |

### 1.2 Common Request Parameters

These parameters are accepted by all analytic endpoints:

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

Multi-value parameters are comma-separated: `?budgetYears=2561,2562`

---

## 2. Endpoints

### 2.1 `GET /api/stats/overview`

Executive summary statistics — all KPIs in a single response.

**Response:**

```json
{
  "kpis": {
    "totalProjects": 1247,
    "totalBudget": 45200000.00,
    "successRate": 78.5,
    "activeProjects": 342,
    "totalResearchers": 890,
    "externalFundingRatio": 45.2,
    "avgBudgetPerProject": 36247.00,
    "departmentsActive": 12
  },
  "byType": [
    { "label": "การวิจัยประยุกต์", "count": 480, "budget": 18500000.00 },
    { "label": "การวิจัยพื้นฐาน",   "count": 320, "budget": 12000000.00 }
  ],
  "byDiscipline": [
    { "label": "มนุษยศาสตร์และสังคมศาสตร์", "count": 720, "budget": 28000000.00 },
    { "label": "วิทยาศาสตร์และเทคโนโลยี",   "count": 527, "budget": 17200000.00 }
  ],
  "byFundingType": [
    { "label": "งบประมาณภายในสถาบัน", "count": 680, "budget": 18500000.00 },
    { "label": "งบประมาณภายนอกสถาบัน", "count": 450, "budget": 22000000.00 },
    { "label": "ทุนส่วนตัว",          "count": 117, "budget": 4700000.00 }
  ],
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=300` (5 minutes)

---

### 2.2 `GET /api/stats/budget`

Budget-specific analytics with multiple breakdowns.

**Response:**

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
    { "label": "ทุนส่วนตัว",          "budget": 112900.00, "percentage": 4.0 }
  ],
  "bySource": [
    { "label": "หน่วยงานให้ทุนวิจัย",    "budget": 2300000.00, "count": 4 },
    { "label": "งบภายในหน่วยงาน",      "budget": 388600.00, "count": 5 },
    { "label": "ส่วนตัวของผู้วิจัย",    "budget": 112900.00, "count": 5 }
  ],
  "byLevel": [
    { "label": "ระดับคณะ/สำนักงาน", "budget": 80000.00, "count": 3 },
    { "label": "ระดับมหาวิทยาลัย",   "budget": 288600.00, "count": 1 },
    { "label": "ระดับชาติ",         "budget": 2300000.00, "count": 4 },
    { "label": "ระดับนานาชาติ",     "budget": 255340.00, "count": 1 },
    { "label": "อื่นๆ",            "budget": 45900.00, "count": 2 }
  ],
  "summary": {
    "zeroBudgetProjects": 5,
    "highestBudgetYear": 2562,
    "highestBudgetAmount": 1730000.00,
    "averageBudgetPerYear": 588060.00
  },
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=300`

---

### 2.3 `GET /api/stats/faculty`

Faculty and department-level analytics.

**Response:**

```json
{
  "byDepartment": [
    {
      "department": "คณะเศรษฐศาสตร์",
      "projectCount": 6,
      "totalBudget": 325340.00,
      "avgBudget": 54223.33,
      "researcherCount": 1,
      "internalProjects": 5,
      "externalProjects": 1,
      "successCount": 2,
      "disciplineGroups": [
        { "label": "มนุษยศาสตร์และสังคมศาสตร์", "count": 6 }
      ]
    }
  ],
  "summary": {
    "totalDepartments": 2,
    "avgProjectsPerDept": 10.5,
    "avgBudgetPerDept": 5220000.00
  },
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=300`

---

### 2.4 `GET /api/stats/researchers`

Researcher participation and effort analytics.

**Response:**

```json
{
  "byPersonType": [
    { "label": "บุคลากรภายใน",   "count": 6, "avgWorkPercent": 35.0 },
    { "label": "บุคคลภายนอก",    "count": 15, "avgWorkPercent": 77.0 }
  ],
  "effortScatter": [
    {
      "personName": "Asst. Prof. Dr.Jorge Fidel Barahona Caceres",
      "workPercent": 20,
      "researchPersonBudget": 51068.00,
      "projectCount": 6,
      "department": "คณะเศรษฐศาสตร์"
    },
    {
      "personName": "ดร.ชุลีรัตน์ บรรจงลิขิตกุล",
      "workPercent": 100,
      "researchPersonBudget": 600000.00,
      "projectCount": 7,
      "department": null
    }
  ],
  "summary": {
    "totalResearchers": 3,
    "internalResearchers": 1,
    "externalResearchers": 2,
    "avgWorkPercent": 62.5,
    "avgBudgetPerResearcher": 190543.00
  },
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=300`

---

### 2.5 `GET /api/stats/trends`

Year-over-year trend data for time-series analysis.

**Response:**

```json
{
  "budgetTrend": [
    { "year": 2558, "totalBudget": 255340.00, "projectCount": 1, "avgBudget": 255340.00 },
    { "year": 2561, "totalBudget": 376900.00, "projectCount": 7, "avgBudget": 53842.86 },
    { "year": 2562, "totalBudget": 1730000.00, "projectCount": 6, "avgBudget": 288333.33 },
    { "year": 2563, "totalBudget": 30000.00,  "projectCount": 1, "avgBudget": 30000.00 }
  ],
  "successTrend": [
    { "year": 2558, "successCount": 0, "totalCount": 1, "successRate": 0 },
    { "year": 2561, "successCount": 2, "totalCount": 7, "successRate": 28.6 },
    { "year": 2562, "successCount": 3, "totalCount": 6, "successRate": 50.0 },
    { "year": 2563, "successCount": 0, "totalCount": 1, "successRate": 0 }
  ],
  "fundingTrend": [
    {
      "year": 2558,
      "internal": 0,
      "external": 255340.00,
      "personal": 0
    },
    {
      "year": 2561,
      "internal": 388600.00,
      "external": 0,
      "personal": -11700.00
    }
  ],
  "typeTrend": [
    {
      "year": 2558,
      "types": [
        { "label": "การวิจัยประยุกต์", "count": 1 }
      ]
    },
    {
      "year": 2561,
      "types": [
        { "label": "การวิจัยประยุกต์", "count": 1 },
        { "label": "-- ไม่ระบุ --",   "count": 6 }
      ]
    }
  ],
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=600` (10 minutes — trends change slowly)

---

### 2.6 `GET /api/research`

Paginated list of research projects.

**Query parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `int` | `1` | Page number (1-indexed) |
| `pageSize` | `int` | `20` | Items per page (max 100) |
| `sort` | `string` | `research_id` | Sort field |
| `order` | `string` | `desc` | Sort order: `asc` or `desc` |
| `search` | `string` | — | Full-text search across name fields |
| *filter params* | *various* | — | All common filter parameters apply |

**Response:**

```json
{
  "projects": [
    {
      "researchId": 3962,
      "refCode": "UNUD-58-001",
      "nameTh": "การศึกษาเปรียบเทียบ...",
      "nameEng": "A Comparative study of entrepreneurial re-entry...",
      "typeName": "การวิจัยประยุกต์",
      "programName": "สาขาเศรษฐศาสตร์และบริหารธุรกิจ",
      "isSuccess": false,
      "budgetYear": 2558,
      "budgetBath": 255340.00,
      "departmentName": "คณะเศรษฐศาสตร์",
      "researchers": ["Asst. Prof. Dr.Jorge Fidel Barahona Caceres"],
      "dateBegin": "2014-10-01",
      "dateFinish": "2015-09-30"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 15,
    "totalPages": 1
  },
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=120` (2 minutes)

---

### 2.7 `GET /api/research/[id]`

Full detail for a single research project.

**Response:**

```json
{
  "project": {
    "researchId": 3962,
    "refCode": "UNUD-58-001",
    "nameTh": "การศึกษาเปรียบเทียบ...",
    "nameEng": "A Comparative study of entrepreneurial re-entry...",
    "typeId": 2,
    "typeName": "การวิจัยประยุกต์",
    "programId": 16,
    "programName": "สาขาเศรษฐศาสตร์และบริหารธุรกิจ",
    "denominationId": 4,
    "denominationName": "-- ไม่ระบุ --",
    "roadmapId": 1,
    "roadmapName": "-- ไม่ระบุ --",
    "isSeries": false,
    "isSeriesMain": false,
    "isSuccess": false,
    "dateBegin": "2014-10-01",
    "dateFinish": "2015-09-30"
  },
  "budgets": [
    {
      "budgetId": 3151,
      "moneyTypeName": "งบประมาณภายนอกสถาบัน",
      "moneyName": "งานวิจัยระดับนานาชาติ",
      "levelName": "ระดับนานาชาติ",
      "budgetDetail": "Udayana University Indonesia",
      "budgetYear": 2558,
      "budgetBath": 255340.00
    }
  ],
  "researchers": [
    {
      "researcherId": 1,
      "personTypeName": "บุคลากรภายใน",
      "personCode": "0801****0078",
      "personName": "Asst. Prof. Dr.Jorge Fidel Barahona Caceres",
      "position": "ผู้ช่วยศาสตราจารย์",
      "departmentName": "คณะเศรษฐศาสตร์",
      "workPercent": 20,
      "researchPersonBudget": 51068.00,
      "disciplineGroupName": "มนุษยศาสตร์และสังคมศาสตร์"
    }
  ],
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=600` (10 minutes)

**Error:** Returns `404` if `research_id` not found.

---

### 2.8 `GET /api/filters`

Returns available filter options with counts (for faceted filtering).

**Response:**

```json
{
  "budgetYears": [
    { "label": "2563", "value": "2563", "count": 1 },
    { "label": "2562", "value": "2562", "count": 6 },
    { "label": "2561", "value": "2561", "count": 7 },
    { "label": "2558", "value": "2558", "count": 1 }
  ],
  "researchTypeNames": [
    { "label": "การวิจัยประยุกต์", "value": "การวิจัยประยุกต์", "count": 3 },
    { "label": "-- ไม่ระบุ --", "value": "__unspecified__", "count": 17 }
  ],
  "fundingTypeNames": [
    { "label": "งบประมาณภายในสถาบัน", "value": "งบประมาณภายในสถาบัน", "count": 4 },
    { "label": "งบประมาณภายนอกสถาบัน", "value": "งบประมาณภายนอกสถาบัน", "count": 4 },
    { "label": "ทุนส่วนตัว", "value": "ทุนส่วนตัว", "count": 7 }
  ],
  "departmentNames": [
    { "label": "คณะเศรษฐศาสตร์", "value": "คณะเศรษฐศาสตร์", "count": 6 }
  ],
  "disciplineGroupNames": [
    { "label": "มนุษยศาสตร์และสังคมศาสตร์", "value": "มนุษยศาสตร์และสังคมศาสตร์", "count": 6 },
    { "label": "ไม่ระบุ", "value": "ไม่ระบุ", "count": 9 }
  ],
  "personTypeNames": [
    { "label": "บุคลากรภายใน", "value": "บุคลากรภายใน", "count": 6 },
    { "label": "บุคคลภายนอก", "value": "บุคคลภายนอก", "count": 15 }
  ],
  "moneyNames": [
    { "label": "งานวิจัยระดับนานาชาติ", "value": "งานวิจัยระดับนานาชาติ", "count": 1 },
    { "label": "ส่วนตัวของผู้วิจัย", "value": "ส่วนตัวของผู้วิจัย", "count": 5 },
    { "label": "งบภายในหน่วยงาน", "value": "งบภายในหน่วยงาน", "count": 4 },
    { "label": "หน่วยงานให้ทุนวิจัย", "value": "หน่วยงานให้ทุนวิจัย", "count": 4 },
    { "label": "งานวิจัยระดับชาติ", "value": "งานวิจัยระดับชาติ", "count": 1 }
  ],
  "generatedAt": "2026-06-10T15:30:00Z"
}
```

**Cache:** `s-maxage=600` (10 minutes — filter options are stable)

---

## 3. Error Responses

All errors follow a consistent format:

### 400 Bad Request

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

### 404 Not Found

```json
{
  "error": "Research project not found",
  "code": "RESEARCH_NOT_FOUND",
  "details": { "researchId": 99999 }
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "details": null
}
```

---

## 4. Response Headers

All API responses include:

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Type` | `application/json; charset=utf-8` | Encoding |
| `Cache-Control` | `public, s-maxage=300, stale-while-revalidate=600` | CDN and browser caching |
| `X-API-Version` | `1.0` | API version identifier |
| `X-Generated-At` | ISO 8601 timestamp | Data generation timestamp |
| `X-Data-Source` | `centerDW.View_Research` | Dataset identifier |
| `X-Record-Count` | Integer | Total records in dataset |

---

## 5. Rate Limiting (Future)

For production deployment with external consumers:

| Limit | Scope | Window | Policy |
|-------|-------|--------|--------|
| 100 requests | Per IP | 1 minute | Returns `429 Too Many Requests` |
| 1000 requests | Per IP | 1 hour | Returns `429 Too Many Requests` |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## 6. Client-Side Integration

### SWR Hook Example

```typescript
// hooks/useDashboardData.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useOverviewData(filters: ActiveFilters) {
  const params = buildFilterParams(filters);  // → "?budgetYears=2561,2562&..."
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/stats/overview${params}`,
    fetcher,
    {
      dedupingInterval: 2000,
      revalidateOnFocus: true,
      errorRetryCount: 3,
    }
  );
  return { data, error, isLoading, isValidating };
}
```

### Filter Parameter Builder

```typescript
// utils/api.ts
export function buildFilterParams(filters: ActiveFilters): string {
  const params = new URLSearchParams();
  if (filters.budgetYears.length)      params.set('budgetYears', filters.budgetYears.join(','));
  if (filters.researchTypeNames.length) params.set('researchTypeNames', filters.researchTypeNames.join(','));
  if (filters.fundingTypeNames.length)  params.set('fundingTypeNames', filters.fundingTypeNames.join(','));
  if (filters.departmentNames.length)   params.set('departmentNames', filters.departmentNames.join(','));
  if (filters.disciplineGroupNames.length) params.set('disciplineGroupNames', filters.disciplineGroupNames.join(','));
  if (filters.successStatus !== 'all')  params.set('successStatus', filters.successStatus);
  if (filters.personTypeNames.length)   params.set('personTypeNames', filters.personTypeNames.join(','));
  if (filters.moneyNames.length)        params.set('moneyNames', filters.moneyNames.join(','));
  if (filters.dateRange?.start)         params.set('dateFrom', filters.dateRange.start);
  if (filters.dateRange?.end)           params.set('dateTo', filters.dateRange.end);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
```

---

## 7. API Route Implementation Pattern

Each API route follows this pattern:

```typescript
// app/api/stats/overview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loadResearchData } from '@/lib/csv/loader';
import { buildFilter } from '@/lib/data/filters';
import { computeOverviewStats } from '@/lib/data/aggregates';
import { parseFilterParams } from '@/lib/data/params';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parseFilterParams(searchParams);

    const dataset = await loadResearchData();
    const filtered = buildFilter(dataset, filters);
    const stats = computeOverviewStats(filtered);

    return NextResponse.json(
      { ...stats, generatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Record-Count': String(dataset.projects.length),
        },
      }
    );
  } catch (error) {
    console.error('GET /api/stats/overview failed:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR', details: null },
      { status: 500 }
    );
  }
}
```

---

## 8. API Endpoint Summary

| Method | Path | Purpose | Cache TTL | Page |
|--------|------|---------|-----------|------|
| `GET` | `/api/stats/overview` | Executive KPIs + top-level breakdowns | 5 min | Executive Dashboard |
| `GET` | `/api/stats/budget` | Budget breakdowns (year, type, source, level) | 5 min | Budget Analytics |
| `GET` | `/api/stats/faculty` | Department-level analytics | 5 min | Faculty Dashboard |
| `GET` | `/api/stats/researchers` | Researcher participation analytics | 5 min | Researcher Dashboard |
| `GET` | `/api/stats/trends` | Year-over-year trend data | 10 min | Trend Analysis |
| `GET` | `/api/research` | Paginated research project list | 2 min | Portfolio page |
| `GET` | `/api/research/[id]` | Single project full detail | 10 min | Research detail |
| `GET` | `/api/filters` | Available filter options with counts | 10 min | Global filter bar |

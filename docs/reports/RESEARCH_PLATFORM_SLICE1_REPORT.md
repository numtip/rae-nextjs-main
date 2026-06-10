# Slice 1 — Implementation Report

> **RAE Research Portal — CSV Data Layer + Overview API**
> Date: 2026-06-10
> Status: ✅ Complete

---

## 1. Scope Delivered

| Requirement | Status | Notes |
|------------|--------|-------|
| CSV-based read-only data layer | ✅ | `papaparse` parses `a3.csv` once per process lifetime |
| Normalized TypeScript models | ✅ | 3 entities: `ResearchProject`, `ResearchBudget`, `Researcher` |
| Overview API endpoint | ✅ | `GET /api/research/stats/overview` |
| personCode masking | ✅ | Shows last 4 digits (e.g., `*********0078`) |
| Placeholder normalization | ✅ | `-- ไม่ระบุ --` → `null` at parse time |
| Zero-budget preservation | ✅ | `0` values kept, not treated as null |
| Safe fallback if CSV missing | ✅ | Returns `503 CSV_NOT_FOUND` |
| Smoke tests | ✅ | 17 tests, 17 passed |
| ESLint pass | ✅ | `next lint` → exit 0 |
| Next.js build pass | ✅ | `next build` → exit 0 |

---

## 2. Files Changed / Created

```
research-data-lab/
├── data/research/
│   ├── a2.csv                          ← copy of exports/a2.csv
│   └── a3.csv                          ← copy of exports/a3.csv
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← root layout (NEW)
│   │   ├── page.tsx                    ← landing page (NEW)
│   │   ├── globals.css                 ← tailwind globals (NEW)
│   │   └── api/research/stats/overview/
│   │       └── route.ts                ← overview API (NEW)
│   ├── lib/
│   │   ├── cache.ts                    ← in-memory cache with TTL (NEW)
│   │   ├── constants.ts                ← shared constants (NEW)
│   │   ├── csv/
│   │   │   ├── normalizer.ts           ← row parser + entity splitter (NEW)
│   │   │   └── loader.ts               ← CSV file loader (NEW)
│   │   └── data/
│   │       ├── models.ts               ← TypeScript interfaces (NEW)
│   │       ├── aggregates.ts           ← overview stat computation (NEW)
│   │       ├── filters.ts              ← filter application (NEW)
│   │       └── params.ts              ← URL param parser (NEW)
│   └── __tests__/
│       └── smoke.ts                    ← 17 smoke tests (NEW)
├── .eslintrc.json                      ← updated for strict config
├── next.config.mjs                     ← Next.js config (NEW)
├── package.json                        ← with dependencies (NEW)
├── postcss.config.mjs                  ← Tailwind config (NEW)
├── tailwind.config.ts                  ← Tailwind config (NEW)
├── tsconfig.json                       ← TypeScript config (NEW)
├── next-env.d.ts                       ← type declarations (NEW)
└── pnpm-lock.yaml                      ← lockfile (NEW)
```

---

## 3. API Endpoint

### `GET /api/research/stats/overview`

**Response (200):**

```json
{
  "kpis": {
    "totalProjects": 20,
    "totalBudget": 3091840,
    "successCount": 8,
    "successRate": 40,
    "externalFundingCount": 7,
    "internalFundingCount": 8,
    "budgetYears": [2563, 2562, 2561, 2558]
  },
  "byType": [
    { "label": "Unspecified", "count": 17, "budget": 2736500 },
    { "label": "การวิจัยประยุกต์", "count": 3, "budget": 355340 }
  ],
  "byDiscipline": [
    { "label": "มนุษยศาสตร์และสังคมศาสตร์", "count": 6, "budget": 355340 },
    { "label": "ไม่ระบุ", "count": 9, "budget": 2541600 },
    { "label": "สาขาวิศวกรรมศาสตร์และอุตสาหกรรมวิจัย", "count": 1, "budget": 100000 }
  ],
  "byFundingType": [
    { "label": "งบประมาณภายนอกสถาบัน", "count": 3, "budget": 1700000 },
    { "label": "ทุนส่วนตัว", "count": 6, "budget": 182900 },
    { "label": "งบประมาณภายในสถาบัน", "count": 4, "budget": 388600 }
  ],
  "generatedAt": "2026-06-10T16:10:00.000Z"
}
```

**Error (503 — CSV not found):**

```json
{
  "error": "Data source not available",
  "code": "CSV_NOT_FOUND",
  "details": { "message": "CSV data file not found: ..." }
}
```

Response headers include `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`, `X-API-Version`, `X-Generated-At`, `X-Data-Source`, and `X-Record-Count`.

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

=== Results: 17 passed, 0 failed (17 total) ===
```

---

## 5. Build & Lint

| Command | Result |
|---------|--------|
| `pnpm lint` (next lint) | ✅ Exit 0 — no errors |
| `pnpm build` (next build) | ✅ Exit 0 — 4 routes compiled |
| `pnpm tsx src/__tests__/smoke.ts` | ✅ Exit 0 — 17/17 passed |

Build output summary:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.3 kB
├ ○ /_not-found                          873 B          88.1 kB
└ ƒ /api/research/stats/overview         0 B                0 B
+ First Load JS shared by all            87.2 kB
```

---

## 6. Known Limitations

| Limitation | Impact | Future Work |
|------------|--------|-------------|
| **20 sample rows only** | KPIs reflect a small subset; not representative | Load full dataset when available |
| **Research type "Unspecified"** | 17/20 projects have null typeName (CSV has `-- ไม่ระบุ --` as majority) | Data source needs richer classification |
| **No discipline group for external researchers** | 9 projects fall into "ไม่ระบุ" discipline | External researcher data is sparse in sample |
| **FacultyID / programCode blank** | Faculty-level drill-down limited | Wait for fuller dataset |
| **No authentication** | API accessible to anyone on the network | Add API key or auth middleware |
| **No rate limiting** | Potential for abuse in production | Add token-bucket middleware |
| **In-memory only** | Cache lost on server restart | Add Redis or file-system cache for production |
| **Budget deduplication logic** | Uses first budget entry per project; may miss multi-budget projects | Refine with explicit budget merge rules |

---

## 7. API Config (production readiness)

- `400` — invalid filter parameters (e.g., non-numeric `budgetYears`)
- `503` — CSV data file not found (graceful degradation)
- `500` — parse errors or unexpected failures
- `Cache-Control: public, s-maxage=300` — CDN-friendly caching
- `force-dynamic` + `revalidate=300` — ISR-compatible

---

## 8. Next Recommended Slice

| Priority | Slice | Description |
|----------|-------|-------------|
| **P0** | Slice 2 — Budget Stats API | `GET /api/research/stats/budget` with by-year, by-type, by-source, by-level breakdowns |
| **P0** | Slice 3 — Faculty Stats API | `GET /api/research/stats/faculty` with department-level KPIs |
| **P1** | Slice 4 — Filters API | `GET /api/filters` returning available filter options with counts |
| **P1** | Slice 5 — Executive Dashboard | First dashboard page consuming `/stats/overview` with KPI cards and charts |
| **P2** | Slice 6 — Research List API | `GET /api/research` with pagination, sort, search |

---

## 9. Quick Start

```bash
# Development
pnpm dev

# Test
pnpm tsx src/__tests__/smoke.ts

# Lint & Build
pnpm lint
pnpm build

# API
curl http://localhost:3000/api/research/stats/overview
curl http://localhost:3000/api/research/stats/overview?budgetYears=2561,2562
```

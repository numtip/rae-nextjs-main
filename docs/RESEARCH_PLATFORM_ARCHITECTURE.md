# Research Analytics Platform — System Architecture

> **RAE Research Portal**
> Source: `centerDW.View_Research` (CSV export)
> Status: Architecture design (no implementation)

---

## 1. Architecture Overview

The platform follows a **Next.js 14+ App Router** full-stack architecture with a **read-only CSV-based data layer**. All analytics are computed server-side from the exported dataset and delivered through React Server Components (RSC) and RESTful API routes.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐   │
│  │ Dashboard      │  │ Reports View   │  │ API Explorer    │   │
│  │ (RSC + Client) │  │ (RSC)          │  │ (Client)        │   │
│  └───────┬───────┘  └───────┬───────┘  └───────┬────────┘   │
└──────────┼──────────────────┼──────────────────┼────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js 14 App Router                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Server Actions / API Routes (route.ts)                 │ │
│  │  - /api/research/*                                      │ │
│  │  - /api/stats/*                                         │ │
│  │  - /api/filters/*                                       │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  React Server Components (app/page.tsx)                 │ │
│  │  - Server-side data fetching & aggregation              │ │
│  │  - Streaming with Suspense boundaries                   │ │
│  │  - Static generation for slow-changing data             │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  Data Access Layer                                       │ │
│  │  - CSV parser + transform pipeline                       │ │
│  │  - In-memory cache with TTL                              │ │
│  │  - Normalized data models                                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                              │                                │
└──────────────────────────────┼────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    Data Layer (Read-Only)                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ exports/a2.csv  │  │ exports/a3.csv  │  │ Normalized     │  │
│  │ (column meta)   │  │ (sample rows)   │  │ Views          │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Core Design Principles

| Principle | Application |
|-----------|------------|
| **Read-only** | CSV files are never modified at runtime |
| **Server-first** | All aggregation and filtering runs server-side |
| **Cache-heavy** | Processed data is cached aggressively |
| **Progressive enhancement** | Static shell → streaming content → client hydration |
| **Bilingual ready** | Thai + English field support from the ground up |
| **No SQL** | Pure Node.js data processing from CSV |

---

## 3. Data Model (Normalized)

The flat 44-column `View_Research` view is normalized into 5 logical entities for code maintainability and clear separation of concerns.

### 3.1 Project Entity

```typescript
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
  dateBegin: string | null;   // ISO date
  dateFinish: string | null;  // ISO date
}
```

### 3.2 Budget Entity

```typescript
interface ResearchBudget {
  budgetId: number;
  researchId: number;
  moneyTypeId: number | null;
  moneyTypeName: string | null;
  moneyId: number | null;
  moneyName: string | null;
  moneyLevelId: number | null;
  levelName: string | null;
  budgetDetail: string | null;
  budgetYear: number | null;   // Buddhist Era year
  budgetBath: number | null;   // Amount in THB
}
```

### 3.3 Researcher Entity

```typescript
interface Researcher {
  researcherId: number;
  researchId: number;
  personType: number | null;
  personTypeName: string;
  personCode: string | null;
  personName: string | null;
  positionId: string;
  position: string;
  departmentCode: string | null;
  divisionCode: string | null;
  sectionCode: string | null;
  facultyId: string | null;
  programCode: string | null;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupId: number;
  disciplineGroupName: string;
}
```

### 3.4 Aggregated View (for dashboards)

```typescript
interface ProjectAggregate {
  projectCount: number;
  totalBudget: number;
  successCount: number;
  successRate: number;
  externalFundingCount: number;
  internalFundingCount: number;
  externalFundingRatio: number;
  totalResearchers: number;
  avgBudgetPerProject: number;
  activeProjects: number;
  yearRange: { min: number; max: number };
}
```

---

## 4. Data Processing Pipeline

```
CSV File (a3.csv)
    │
    ▼
RawRowParser — parse CSV into raw string arrays
    │
    ▼
FieldNormalizer — cast types, trim whitespace, convert BE years
    │
    ▼
PlaceholderCleaner — replace "-- ไม่ระบุ --" with null
    │
    ▼
EntitySplitter — split into Project[], Budget[], Researcher[]
    │
    ▼
IndexBuilder — build lookup maps (by researchId, by dept, by year...)
    │
    ▼
CacheStore — in-memory cache with configurable TTL
    │
    ▼
API / RSC Consumers
```

**Data cleaning rules:**
- `-- ไม่ระบุ --` → `null` (or `"Unspecified"` for display)
- `budgetBath = 0` → preserved (zero ≠ null), flagged for optional filtering
- Buddhist Era years → display as-is (standard in Thai academia), stored as `number`
- `dateBegin` / `dateFinish` → parsed to ISO strings for range operations
- `personCode` → masked to last 4 digits when exposed via API
- `facultyID`, `programCode` blanks → `null`

---

## 5. Caching Strategy

| Layer | Mechanism | TTL | Invalidation |
|-------|-----------|-----|-------------|
| **CSV in memory** | `Map<string, string[]>` | Process lifetime | Restart server |
| **Normalized entities** | `Map<EntityType, Entity[]>` | Process lifetime | Restart server |
| **Aggregated stats** | `computed on demand, cached` | 5 minutes | Time-based |
| **Filtered/grouped results** | `computed on demand` | 5 minutes | Time-based |
| **Static pages** | Next.js `export const dynamic = 'force-static'` | Build / revalidate | `revalidate` prop |
| **API responses** | Next.js `stale-while-revalidate` headers | `s-maxage=300, stale-while-revalidate=600` | Time-based |
| **Client SWR** | `useSWR` hook | `dedupingInterval: 2000` | Refetch on focus |

### Cache implementation sketch

```typescript
// lib/cache.ts
class DataCache {
  private store = new Map<string, { data: unknown; expiry: number }>();

  get<T>(key: string): T | null { /* check expiry, return or null */ }
  set<T>(key: string, data: T, ttlMs: number): void { /* store with timestamp */ }
  invalidate(pattern: string): void { /* clear by key prefix */ }
  clear(): void { this.store.clear(); }
}
```

---

## 6. Folder Structure

```
research-data-lab/
├── docs/                              # Architecture & design docs
│   ├── VIEW_RESEARCH_DATA_DICTIONARY.md
│   ├── VIEW_RESEARCH_DISCOVERY.md
│   ├── VIEW_RESEARCH_ANALYTICS_OPPORTUNITIES.md
│   ├── RESEARCH_PLATFORM_ARCHITECTURE.md   ← this file
│   ├── RESEARCH_DASHBOARD_BLUEPRINT.md
│   └── RESEARCH_API_SPEC.md
│
├── exports/                           # Read-only CSV source data
│   ├── a2.csv                         # Column metadata
│   └── a3.csv                         # Sample rows
│
├── data/                              # Processed data artifacts (gitignored)
│   └── .gitkeep
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Dashboard home / redirect
│   │   ├── loading.tsx                # Global loading
│   │   ├── error.tsx                  # Global error boundary
│   │   │
│   │   ├── dashboard/                 # Main dashboard pages
│   │   │   ├── page.tsx               # Executive summary
│   │   │   ├── portfolio/             # Research portfolio view
│   │   │   ├── budget/                # Budget analytics
│   │   │   ├── faculty/               # Faculty / department view
│   │   │   ├── researchers/           # Researcher analytics
│   │   │   └── trends/                # Trend analysis
│   │   │
│   │   ├── research/                  # Research detail / browse
│   │   │   ├── page.tsx               # Research list (paginated)
│   │   │   └── [id]/                  # Single research detail
│   │   │
│   │   └── api/                       # REST API routes
│   │       ├── research/
│   │       │   ├── route.ts           # GET /api/research
│   │       │   └── [id]/
│   │       │       └── route.ts       # GET /api/research/:id
│   │       ├── stats/
│   │       │   ├── overview/
│   │       │   │   └── route.ts       # GET /api/stats/overview
│   │       │   ├── budget/
│   │       │   │   └── route.ts       # GET /api/stats/budget
│   │       │   ├── faculty/
│   │       │   │   └── route.ts       # GET /api/stats/faculty
│   │       │   ├── trends/
│   │       │   │   └── route.ts       # GET /api/stats/trends
│   │       │   └── researchers/
│   │       │       └── route.ts       # GET /api/stats/researchers
│   │       └── filters/
│   │           └── route.ts           # GET /api/filters
│   │
│   ├── components/
│   │   ├── ui/                        # Base UI primitives
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── Table.tsx
│   │   │
│   │   ├── dashboard/                 # Dashboard-specific components
│   │   │   ├── KpiCard.tsx
│   │   │   ├── KpiGrid.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   └── DashboardShell.tsx
│   │   │
│   │   ├── charts/                    # Chart components
│   │   │   ├── BudgetTrendLine.tsx
│   │   │   ├── ProjectTypeBar.tsx
│   │   │   ├── FundingStackedBar.tsx
│   │   │   ├── FundingDonut.tsx
│   │   │   ├── DeptHorizontalBar.tsx
│   │   │   ├── DisciplineGroupBar.tsx
│   │   │   ├── BudgetTreemap.tsx
│   │   │   ├── TypeProgramHeatmap.tsx
│   │   │   └── WorkPercentScatter.tsx
│   │   │
│   │   └── shared/                    # Shared layout components
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Footer.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── lib/                           # Core library code
│   │   ├── csv/
│   │   │   ├── parser.ts              # CSV parsing
│   │   │   ├── normalizer.ts          # Type casting & cleaning
│   │   │   └── loader.ts              # File loading & initialization
│   │   ├── data/
│   │   │   ├── models.ts              # TypeScript interfaces
│   │   │   ├── transform.ts           # Entity splitting
│   │   │   ├── aggregates.ts          # Aggregation functions
│   │   │   └── filters.ts             # Filter application logic
│   │   ├── cache.ts                   # In-memory cache
│   │   └── constants.ts               # Lookup placeholders, BE year offsets
│   │
│   ├── hooks/                         # React hooks
│   │   ├── useDashboardData.ts
│   │   ├── useFilters.ts
│   │   └── useResearchDetail.ts
│   │
│   ├── types/                         # Shared types
│   │   └── index.ts                   # Re-exports from lib/data/models
│   │
│   └── utils/
│       ├── format.ts                  # Number, date, currency formatters
│       ├── year.ts                    # BE <-> CE conversion helpers
│       └── api.ts                     # Fetch helpers for client components
│
├── public/
│   └── assets/
│       └── images/
│
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 7. Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14 (App Router) | Full-stack, RSC, static generation |
| **Language** | TypeScript 5.x | Type safety for 44-column schema |
| **Styling** | Tailwind CSS 3.x | Rapid UI development |
| **Charts** | Recharts 2.x | React-native, composable, SSR-safe |
| **CSV parsing** | papaparse | Fast, streaming, well-maintained |
| **Client fetching** | SWR | Stale-while-revalidate, dedup |
| **State** | React Context (filter state) | Lightweight, no Redux needed |
| **Linting** | ESLint + Prettier | Code consistency |

---

## 8. Data Flow Architecture

### 8.1 Server Components (Default)

```
Request → RSC → lib/loader (static cache) → CSV parse → aggregate → render HTML
```

- Uses `react/cache` for deduplication within a request
- Data is fetched once and shared across all components in the tree
- Streaming allows progressive rendering of chart cards

### 8.2 Client Components (Interactive)

```
Interaction → useSWR → /api/* → route.ts → lib/loader → JSON response → re-render
```

- Filter changes trigger SWR revalidation
- Chart components receive data as props, animate transitions
- Client components are wrapped in `'use client'` boundaries

### 8.3 API Routes

```
/api/stats/overview  →  { kpis, aggregated metrics }
/api/stats/budget    →  { byYear[], byType[], bySource[] }
/api/stats/faculty   →  { byDepartment[], byDiscipline[] }
/api/stats/trends    →  { yearly[], successTrend[], typeTrend[] }
/api/stats/researchers → { topResearchers[], byType[] }
/api/research        →  { projects[], total, page, pageSize }
/api/research/:id    →  { project, budgets[], researchers[] }
/api/filters         →  { years[], types[], departments[], ... }
```

---

## 9. Performance Considerations

| Strategy | Implementation |
|----------|---------------|
| **Eager loading** | CSV parsed once at server start, cached in memory |
| **Pre-computation** | Common aggregates computed once on load |
| **Lazy computation** | Cross-filtered results computed on demand |
| **Streaming** | Dashboard sections use `<Suspense>` boundaries |
| **Bundle splitting** | Chart components are dynamically imported |
| **Static generation** | `/research/[id]` pages can be pre-generated |
| **SWR deduplication** | Multiple components fetching same data get one request |

---

## 10. Error Handling Strategy

| Scenario | Handling |
|----------|----------|
| CSV file missing or corrupt | Error boundary + admin alert |
| Malformed row | Log warning, skip row, continue processing |
| Empty dataset | Graceful empty state with "no data" UI |
| Invalid filter combination | Return empty results, show "no matching records" |
| API timeout | Return 503 with retry-after header |
| Client network error | SWR retry + cached stale data fallback |

---

## 11. Security Considerations

| Concern | Mitigation |
|---------|------------|
| Person identifiers | `personCode` masked in API responses (show last 4 digits) |
| Budget data | Allowed for internal dashboards; external API opt-in |
| CSV injection | Input sanitization during parsing |
| XSS | React's built-in escaping + Content-Security-Policy headers |
| Rate limiting | Next.js middleware with token bucket for API routes |
| Data freshness | API responses include `generatedAt` timestamp |

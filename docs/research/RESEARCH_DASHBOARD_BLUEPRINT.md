# Research Analytics Platform — Dashboard Blueprint

> **RAE Research Portal**
> Source: `centerDW.View_Research` (CSV export)
> Status: Blueprint design (no implementation)

---

## 1. Dashboard Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RAE Research Portal                          │
├─────────────────────────────────────────────────────────────────────┤
│  [Executive]  [Portfolio]  [Budget]  [Faculty]  [Researchers] [Trends]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   Global Filter Bar                           │   │
│  │  [Year ▼] [Research Type ▼] [Funding Type ▼] [Dept ▼] [...] │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ KPI Card │ │ KPI Card │ │ KPI Card │ │ KPI Card │ │ KPI Card ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │           Chart Section (2-column or full-width)               │ │
│  │  ┌──────────────────────┐  ┌──────────────────────┐          │ │
│  │  │  Chart 1 (Line)      │  │  Chart 2 (Donut)     │          │ │
│  │  └──────────────────────┘  └──────────────────────┘          │ │
│  │  ┌──────────────────────┐  ┌──────────────────────┐          │ │
│  │  │  Chart 3 (Bar)       │  │  Chart 4 (Treemap)   │          │ │
│  │  └──────────────────────┘  └──────────────────────┘          │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │           Data Table (sortable, paginated)                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dashboard Pages and Routes

| Route | Page | Layout Type | Components |
|-------|------|-------------|------------|
| `/dashboard` | Executive Summary | 2-column grid | KPI grid, Budget trend, Funding donut, Project type bar, Discipline group bar |
| `/dashboard/portfolio` | Research Portfolio | Full-width + sidebar | Filter bar, Research list table, Research type vs program heatmap |
| `/dashboard/budget` | Budget Analytics | 2-column grid | Budget trend, Funding stacked bar, Treemap budget by source, Budget by detail |
| `/dashboard/faculty` | Faculty/Department | 2-column grid | Dept projects bar, Dept budget bar, Researcher count, Internal/external split |
| `/dashboard/researchers` | Researcher Analytics | 2-column grid | Researcher count by type, Work% vs budget scatter, Top researchers list |
| `/dashboard/trends` | Trend Analysis | Full-width | Year-over-year trends, Success trend, Type trend, Funding source trend |

---

## 3. KPI Cards — Complete Specification

All KPI cards share a consistent visual pattern:
- **Icon** (left-aligned, muted color)
- **Label** (small uppercase, gray)
- **Value** (large, bold, primary color)
- **Trend indicator** (up/down/neutral arrow + percentage vs previous period)
- **Sparkline** (optional, mini inline chart for time-series KPIs)

### Executive Dashboard KPIs

| # | KPI Name | Data Source | Aggregation | Format | Filterable |
|---|----------|-------------|-------------|--------|------------|
| K1 | **Total Projects** | `research_id` (distinct) | `COUNT(DISTINCT research_id)` | Integer (e.g. 1,247) | Yes |
| K2 | **Total Budget** | `budgetBath` (distinct per project) | `SUM(budgetBath) / distinct research_id` | THB (e.g. ฿45.2M) | Yes |
| K3 | **Success Rate** | `research_success` | `SUM(research_success=1) / COUNT(DISTINCT research_id)` | Percentage (e.g. 78%) | Yes |
| K4 | **Active Projects** | `dateBegin`, `dateFinish` | `COUNT WHERE dateBegin ≤ now AND (dateFinish IS NULL OR dateFinish ≥ now)` | Integer | Yes |
| K5 | **Total Researchers** | `researcherID` (distinct) | `COUNT(DISTINCT researcherID)` | Integer | Yes |
| K6 | **External Funding Ratio** | `research_money_type_name` | `COUNT(external) / COUNT(all)` | Percentage (e.g. 45%) | Yes |
| K7 | **Avg Budget / Project** | `budgetBath` | `SUM(budgetBath) / COUNT(DISTINCT research_id)` | THB (e.g. ฿185K) | Yes |
| K8 | **Departments Active** | `departmentName` (distinct) | `COUNT(DISTINCT departmentName)` | Integer | Yes |

### Portfolio KPIs

| # | KPI Name | Source |
|---|----------|--------|
| P1 | **Research by Type** | `research_type_name` distribution |
| P2 | **Internal vs External Count** | `research_money_type_name` split |
| P3 | **Discipline Group Distribution** | `disciplineGroupName` count |
| P4 | **Program Coverage** | `research_program_name` distinct count |

### Budget KPIs

| # | KPI Name | Source |
|---|----------|--------|
| B1 | **Yearly Budget Total** | `budgetBath` by `budgetYear` |
| B2 | **Top Funding Source** | `moneyName` by total budget |
| B3 | **Zero-Budget Projects** | `COUNT WHERE budgetBath = 0` |
| B4 | **External Budget Share** | `budgetBath` where `moneyTypeName = external` |

### Faculty KPIs

| # | KPI Name | Source |
|---|----------|--------|
| F1 | **Projects per Department** | `departmentName` count |
| F2 | **Budget per Department** | `budgetBath` by `departmentName` |
| F3 | **Researchers per Department** | `researcherID` distinct by `departmentName` |
| F4 | **Internal vs External by Department** | Cross of `departmentName` and `personTypeName` |

### Researcher KPIs

| # | KPI Name | Source |
|---|----------|--------|
| R1 | **Total Internal Researchers** | `personTypeName = 'บุคลากรภายใน'` |
| R2 | **Total External Researchers** | `personTypeName = 'บุคคลภายนอก'` |
| R3 | **Avg Work Percent** | `AVG(workPercent)` |
| R4 | **Top Researcher by Projects** | `personName` with most distinct `research_id` |

---

## 4. Charts — Complete Specification

All charts built with **Recharts**. Each chart component is:
- Responsive (using `ResponsiveContainer`)
- Server-side rendered skeleton, client-side hydrated
- Animated on mount and data change
- Exportable as PNG (via `html-to-image` utility)

### Chart Library

| # | Chart Name | Type | X-Axis | Y-Axis / Segments | Data Source | Page |
|---|-----------|------|--------|-------------------|-------------|------|
| C1 | **Budget by Year** | Line | `budgetYear` | `SUM(budgetBath)` | `stats/budget` → `byYear[]` | Executive, Budget, Trends |
| C2 | **Projects by Research Type** | Bar | `research_type_name` | `COUNT(research_id)` | `stats/overview` → `byType[]` | Executive, Portfolio |
| C3 | **Internal vs External Funding by Year** | Stacked Bar | `budgetYear` | `SUM(budgetBath)` stacked by `moneyTypeName` | `stats/trends` → `fundingTrend[]` | Budget, Trends |
| C4 | **Budget Share by Funding Type** | Donut / Pie | — | `SUM(budgetBath)` by `research_money_type_name` | `stats/budget` → `byType[]` | Executive, Budget |
| C5 | **Projects by Department** | Horizontal Bar | `departmentName` | `COUNT(research_id)` | `stats/faculty` → `byDepartment[]` | Faculty, Executive |
| C6 | **Projects by Discipline Group** | Bar | `disciplineGroupName` | `COUNT(research_id)` | `stats/overview` → `byDiscipline[]` | Executive |
| C7 | **Budget Distribution by Source** | Treemap | — | `SUM(budgetBath)` by `money_name` | `stats/budget` → `bySource[]` | Budget |
| C8 | **Research Type vs Program** | Heatmap | `research_type_name` | `research_program_name` | Cell: `COUNT(projects)` | Portfolio |
| C9 | **Work Percent vs Researcher Budget** | Scatter | `workPercent` | `researchPersonBudget` | `stats/researchers` → `effortScatter[]` | Researchers |
| C10 | **Success Trend Over Years** | Line | `budgetYear` | `SUM(success)/COUNT(projects)` | `stats/trends` → `successTrend[]` | Trends |
| C11 | **Funding Source Trend** | Stacked Area | `budgetYear` | `SUM(budgetBath)` by `money_name` | `stats/trends` → `sourceTrend[]` | Trends |
| C12 | **Budget by Funding Level** | Bar | `levelName` | `SUM(budgetBath)` | `stats/budget` → `byLevel[]` | Budget |

### Chart component interface

```typescript
interface ChartProps {
  data: ChartDataPoint[];
  filters?: ActiveFilters;
  onPointClick?: (point: ChartDataPoint) => void;
  className?: string;
}

interface ChartDataPoint {
  label: string;                // Display label for axis/tooltip
  value: number;                // Primary value
  secondary?: number;           // For stacked/grouped
  category?: string;            // For color mapping
  metadata?: Record<string, unknown>;  // Raw data for drill-down
}
```

---

## 5. Filters — Complete Specification

### Global Filter Bar

The global filter bar appears at the top of every dashboard page. Filter state is shared across all KPIs and charts on the page via React Context.

| # | Filter | Type | Options Source | Default | Multi-select |
|---|--------|------|---------------|---------|-------------|
| F1 | **Budget Year** | Dropdown / Range | Distinct `budgetYear` values (sorted desc) | All years | Yes (multi) |
| F2 | **Research Type** | Dropdown | Distinct `research_type_name` (excluding `-- ไม่ระบุ --`) | All types | Yes (multi) |
| F3 | **Funding Type** | Dropdown | Distinct `research_money_type_name` | All types | Yes (multi) |
| F4 | **Department** | Dropdown | Distinct `departmentName` (non-null) | All depts | Yes (multi) |
| F5 | **Discipline Group** | Dropdown | Distinct `disciplineGroupName` | All groups | Yes (multi) |
| F6 | **Success Status** | Toggle / Dropdown | `Success`, `Not Success`, `All` | All | Single |
| F7 | **Person Type** | Dropdown | Distinct `personTypeName` | All | Yes (multi) |
| F8 | **Funding Source** | Dropdown | Distinct `money_name` | All | Yes (multi) |
| F9 | **Date Range** | Date picker | `dateBegin` to `dateFinish` range | All dates | Range |

### Filter State Model

```typescript
interface ActiveFilters {
  budgetYears: number[];
  researchTypeNames: string[];
  fundingTypeNames: string[];
  departmentNames: string[];
  disciplineGroupNames: string[];
  successStatus: 'all' | 'success' | 'not_success';
  personTypeNames: string[];
  moneyNames: string[];
  dateRange: { start: string | null; end: string | null } | null;
}

interface FilterOption {
  label: string;      // Display value
  value: string;      // URL/code value
  count: number;      // Number of matching records (for faceted filtering)
}
```

### Filter Behavior

- **Faceted filtering**: When one filter is changed, option counts in other filters update to reflect available combinations
- **URL sync**: Filter state is encoded in URL search params for shareability: `/dashboard?year=2561&type=การวิจัยประยุกต์`
- **Clear all**: A "Clear filters" button resets all filters to defaults
- **Active count**: Badge shows how many filters are active (e.g., "Filters (3)")
- **Persistence**: Filter state persists across page navigation within the same session

### Filter Data Flow

```
User selects filter → React Context update → URL search param update
    → SWR re-fetch with new params → API applies filters → Returns filtered aggregates
    → KPI cards + Charts re-render with new data
```

---

## 6. Responsive Layout Breakpoints

| Breakpoint | Width | Layout | Behavior |
|------------|-------|--------|----------|
| Mobile | < 640px | Single column | Stacked KPIs, full-width charts, collapsible filter bar |
| Tablet | 640–1024px | 2 columns | 2-column KPI grid, charts in 2x2 grid |
| Desktop | 1024–1440px | 2 columns + sidebar | Filter sidebar on left, content on right |
| Wide | > 1440px | 3 columns | KPIs in 5-column row, charts in 3-column grid |

---

## 7. Interactive Behaviors

| Behavior | Implementation |
|----------|---------------|
| **Chart drill-down** | Click chart segment → filter applied for that segment |
| **Cross-filtering** | Click bar in Chart A → KPI cards + Chart B update |
| **Tooltip on hover** | All charts show rich tooltips with label, value, percentage |
| **Data table sync** | Table below charts updates to match visible filtered data |
| **Export to CSV** | Button above data table exports visible (filtered) rows |
| **Export chart as PNG** | Download button on each chart card |
| **Full-screen chart** | Expand button opens chart in modal for closer inspection |
| **Auto-refresh** | Data refreshes every 5 minutes (SWR revalidation) |

---

## 8. Empty & Loading States

| State | Visual Treatment |
|-------|-----------------|
| **Loading** | Skeleton cards (pulsing placeholders matching KPI/chart dimensions) |
| **Empty (no data matches filters)** | Centered illustration + "No data matches your filter criteria" message + "Clear filters" button |
| **Error (data unavailable)** | Alert banner + retry button + fallback to last cached data |
| **Single data point** | Chart renders normally with a single bar/point + callout annotation |
| **Zero values** | Show "0" on KPI cards, chart bars at baseline with muted color |

---

## 9. Color Palette

```typescript
const chartColors = {
  primary:    '#2563EB',   // Blue-600
  secondary:  '#7C3AED',   // Violet-600
  success:    '#059669',   // Emerald-600
  warning:    '#D97706',   // Amber-600
  danger:     '#DC2626',   // Red-600
  neutral:    '#6B7280',   // Gray-500

  // Categorical (for charts with 5+ groups)
  category: [
    '#2563EB', '#7C3AED', '#059669', '#D97706',
    '#DC2626', '#0891B2', '#DB2777', '#65A30D',
  ],

  // Funding type colors
  fundingType: {
    internal: '#059669',        // Internal = green
    external: '#2563EB',        // External = blue
    personal: '#D97706',        // Personal = amber
  },

  // Success status
  successStatus: {
    success:    '#059669',
    notSuccess: '#DC2626',
  },
};
```

---

## 10. Navigation Structure

```
Sidebar Navigation
├── 📊  Executive Dashboard       → /dashboard
├── 📋  Research Portfolio        → /dashboard/portfolio
├── 💰  Budget Analytics          → /dashboard/budget
├── 🏛️  Faculty & Departments    → /dashboard/faculty
├── 👥  Researcher Analytics      → /dashboard/researchers
└── 📈  Trend Analysis            → /dashboard/trends
```

- Active route is highlighted
- Collapses to icon-only on narrower screens
- Sticky sidebar, independent scroll

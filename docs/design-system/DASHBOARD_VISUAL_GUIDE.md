# Dashboard Visual Guide — RAE MJU (RC5.6)

**Purpose**: Define the **executive dashboard experience** for the RAE Digital Experience — public preview on landing and future full dashboard product.

**Philosophy anchor**: Data → Insight → Action

**Visual tokens**: `dash-*` palette in `BRAND_SYSTEM.md` — neutral-first, green accent, gold highlight max one per view

**Scope**: Documentation only. No Next.js components, charts libraries, or `app/` implementation in this workspace.

**Audience tiers**:

| Tier | User | Depth |
|------|------|-------|
| **Public preview** | Visitor on landing | 3–4 headline KPIs + static mock |
| **Executive** | Leadership, partners | Trends, comparisons, narrative captions |
| **Operational** | RAE staff (future) | Drill-down — out of RC6 scope |

---

## 1. Dashboard Philosophy

### Data → Insight → Action

```
Data          Insight              Action
(raw metrics) (what it means)      (what to do next)
     │              │                    │
  Numbers      Narrative label      CTA / link / policy
  Trends       Benchmark delta      Contact unit
  Sources      Footnote trust       Open full report
```

| Layer | Dashboard expression |
|-------|---------------------|
| **Data** | KPI cards, sparklines, sourced figures |
| **Insight** | One-line interpretation under metric ("↑ 12% vs prior year") |
| **Action** | Text link: ดูรายงานฉบับเต็ม · ติดต่อหน่วยวิจัย · เปิดแดชบอร์ด |

**Institutional tone**: Transparent, calm, confident — not startup growth-hacking. Reference: Stripe dashboard clarity, Linear density, UTCC public reporting sobriety.

**RC6 boundary**: Landing **Dashboard Preview** uses approved static metrics or placeholder "—" with `Coming soon` — do not invent statistics from legacy WTMS pages.

---

## 2. KPI Card Standards

### Anatomy

```
┌─────────────────────────────┐
│ LABEL (meta, uppercase optional) │
│ 42,500  or  ฿12.4M          │  ← dash-metric, tabular nums
│ ↑ 8.2% vs 2567              │  ← insight line, dash-accent if positive
│ ที่มา: RAE รายงาน 2567      │  ← source footnote, dash-text
└─────────────────────────────┘
```

### Rules

| Rule | Standard |
|------|----------|
| Count per row | 3–4 cards desktop · 2 tablet · 1 scroll mobile |
| Primary metric | One number per card — no compound stats |
| Label | Thai primary; abbreviate only if defined in footnote |
| Delta | Show direction + period; hide if unverified |
| Gold highlight | **Max 1 card** per view for flagship metric |
| Background | `dash-surface` on `dash-bg` or `surface-sunken` on landing |
| Border | `dash-border` 1px; radius `radius-lg` (12px) |
| Motion | Count-up 800–1200ms once (see MOTION_LANGUAGE_BIBLE) |

### Forbidden on KPI cards

- Raw spreadsheet cells
- More than 2 lines of explanation
- Decorative icons spinning on load
- Unsourced round numbers from legacy pages

---

## 3. Trend Visualization Rules

### Allowed chart types

| Type | Use case |
|------|----------|
| **Line** | Time series (publications, extension reach, project count) |
| **Bar** (vertical/horizontal) | Category comparison (topics, regions) |
| **Sparkline** | Inline in KPI card — 12–24 periods max |
| **Donut** (single series) | Part-to-whole when ≤5 segments |

### Chart styling

| Property | Value |
|----------|-------|
| Series 1 | `#005C3B` (dash-chart-1) |
| Series 2 | `#79C2A7` (dash-chart-2) |
| Series 3 | `#78716C` (dash-chart-3) |
| Grid lines | `#E7E5E4` horizontal only, subtle |
| Axis labels | `dash-text` 12–14px |
| Tooltip | White surface, 1px border, no shadow glow |

### Trend rules

- Always label **time range** (e.g. 2565–2567)
- Y-axis starts at zero for count data unless scientifically misleading — document exception
- Max 3 series per chart
- No animation on initial draw except fade-in 400ms
- Missing data: gap or dashed segment — never interpolate silently

---

## 4. Executive Metrics Rules

Metrics suitable for **leadership and public trust** (not internal HR/finance).

### Approved executive metric categories

| Category | Examples | Verification |
|----------|----------|--------------|
| Research output | Publications, patents, funded projects | Annual RAE report |
| Extension reach | Farmers trained, provinces served | Program records |
| Partnerships | MOUs, industry collaborations | Official count |
| Innovation adoption | Hectares, adopters, demo plots | Field program data |
| Academic service | Requests fulfilled, workshops | Service unit (PAGE-1014 domain) |

### Executive presentation rules

- Round display OK (42K vs 42,137) — footnote "ข้อมูล ณ เดือน…"
- Compare to **prior period** or **target** — not vanity benchmarks
- Negative trends: show honestly with neutral copy — do not hide
- No metric without owner unit identified in source footnote

### Forbidden executive metrics

- Individual employee performance
- Unreleased financial detail
- Metrics scraped from legacy WTMS without verification
- Vanity totals ("downloads ever" without context)

---

## 5. Research Metrics Rules

Distinct from executive totals — **program-level** research health.

| Metric type | Display | Story link |
|-------------|---------|------------|
| Active projects | Count by status | Link to Research hub filter |
| Field trials | Locations / crops | Link to Success Story |
| Symposium / events | Annual count | News archive — not KPI card unless current year |
| Citations / outputs | Bibliometric summary | Evidence PDFs |

### Research-specific rules

- Align numbers with **RESEARCH_STORY_FRAMEWORK** — metric must map to Innovation or Impact stage
- Symposium pages (PAGE-1024): event metric only if editorially current; otherwise archive
- Do not conflate **news items** with **research outcomes**
- Research KPI cards on landing: max **2** of 4 landing KPI slots

---

## 6. Dashboard Storytelling

Charts alone are insufficient. Each dashboard view includes **narrative frame**.

### Section header pattern

```
[Section title — Thai]
[One sentence insight — what changed and why it matters]
[Optional: Action link]
```

### Example (reference copy only)

> **ขยายผลสู่เกษตรกร**  
> ในปี 2567 หน่วยขยายผลเข้าถึงเกษตรกรมากขึ้น 12% จากปีก่อน เนื่องจากโครงการสาธิตใน 4 จังหวัดภาคเหนือ  
> [ดูรายละเอียดโครงการ →]

### Dashboard + Research integration

| Dashboard shows | Story delivers |
|-----------------|----------------|
| +18% demo plot adoption | Named Success Story with Community stage |
| 3 active lychee research threads | Research Showcase cards |
| Flat publication trend | Honest caption + link to report |

**Anti-pattern**: Dashboard preview on landing that contradicts Research Showcase stories.

---

## 7. Mobile Dashboard Rules

| Rule | Standard |
|------|----------|
| Layout | Single column KPI stack |
| Charts | Full width; simplify to sparkline or top-3 bars |
| Interaction | Tap card → sheet with detail — no hover-only insight |
| Scroll | Sticky section title optional; no horizontal chart scroll unless swipe-labeled |
| Density | Max 4 KPIs before "View full dashboard" |
| Preview mock | Static PNG acceptable for RC6 landing (performance) |

Touch targets ≥44px; chart legends below chart on mobile.

---

## 8. Accessibility Rules

| Requirement | Standard |
|-------------|----------|
| Color | Do not rely on color alone for trend direction — use ↑↓ text or icons |
| Contrast | KPI numbers `dash-metric` on white ≥4.5:1 |
| Charts | Provide data table alternative or `aria-label` summary |
| Motion | Respect `prefers-reduced-motion` — show final values |
| Language | `lang="th"` on metric labels; EN duplicates marked |
| Focus | Keyboard navigable cards and chart controls |

---

## 9. Visual Anti-Patterns

### Forbidden

| Anti-pattern | Why |
|--------------|-----|
| **Spreadsheet appearance** | Grid of unformatted cells, visible column headers |
| **Dense tables** | >5 columns or >10 rows on public dashboard |
| **Rainbow charts** | >3 unapproved colors; confuses brand |
| **3D charts** | Distorts perception; off-brand |
| **Pie explosion** | Clutter; use donut sparingly |
| **Dual Y-axes abuse** | Implies false correlation |
| **Live iframe embed** | Performance + a11y risk on landing preview |
| **Fake real-time** | Simulated ticking numbers |
| **Gaming gradients** | RGB, neon, dark-mode hacker aesthetic |

### Landing Dashboard Preview (RC6)

- Prefer **curated static mock** with 3 verified or clearly labeled placeholder KPIs
- CTA: `Open dashboard` disabled until product exists
- Must pass `RC6_READINESS_CHECKLIST.md` Dashboard row

---

## Related documents

| Document | Path |
|----------|------|
| Color tokens | `docs/design-system/BRAND_SYSTEM.md` |
| Landing section 7 | `docs/design-system/LANDING_EXPERIENCE_GUIDE.md` |
| Motion | `docs/design-system/MOTION_LANGUAGE_BIBLE.md` |
| Research narratives | `docs/design-system/RESEARCH_STORY_FRAMEWORK.md` |
| Governance QA | `docs/design-system/DESIGN_GOVERNANCE.md` |

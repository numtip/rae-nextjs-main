# Data Quality Audit — View_Research Dataset

> **Date:** 2026-06-11
> **Audit script:** `src/__tests__/data-quality-audit.ts`
> **Scope:** Filter dimensions for Filters API

---

## 1. Dataset Overview

| Metric | Value |
|--------|-------|
| Source files | `exports/a1.csv` + `exports/a3.csv` |
| Total rows | 120 |
| Distinct projects | 50 |
| Distinct researchers | 120 entries (2.4 avg/project) |
| Budget records | 120 |
| Budget year range | BE 2553 → BE 2563 (6 years) |

---

## 2. Dimension Completeness

### Row-Level (120 raw rows)

| Dimension | Completeness | Null | Unique Values | Top Values |
|-----------|-------------|------|---------------|------------|
| **researchType** | 85.8% | 14.2% | 2 | การวิจัยประยุกต์ (73.3%), การพัฒนาทดลอง (12.5%) |
| **discipline** | 100.0% | 0.0% | 4 | ไม่ระบุ (68.3%), วิทยาศาสตร์ฯ (13.3%), เกษตรศาสตร์ (12.5%) |
| **faculty/dept** | 59.2% | 40.8% | 23 | คณะวิทยาศาสตร์ (10.0%), คณะเทคโนโลยีการประมงฯ (9.2%) |
| **program** | 88.3% | 11.7% | 6 | สาขาเกษตรศาสตร์และชีววิทยา (77.5%) |
| **fundingSource** | 100.0% | 0.0% | 6 | งบภายในมหาวิทยาลัย (84.2%), ส่วนตัวผู้วิจัย (7.5%) |
| **fundingType** | 100.0% | 0.0% | 3 | ภายในสถาบัน (87.5%), ทุนส่วนตัว (7.5%), ภายนอกสถาบัน (5.0%) |
| **level** | 100.0% | 0.0% | 5 | ระดับมหาวิทยาลัย (84.2%), อื่นๆ (7.5%), ระดับชาติ (4.2%) |
| **budgetYear** | 100.0% | 0.0% | 6 | 2563, 2562, 2561, 2558, 2554, 2553 |

### Entity-Level (50 distinct projects)

| Dimension | Completeness | Null Projects |
|-----------|-------------|--------------|
| researchType | 66.0% | 17/50 (34.0%) |
| program | 72.0% | 14/50 (28.0%) |

---

## 3. Duplicate Analysis

| Check | Result |
|-------|--------|
| Duplicate project IDs | ✅ NONE — 50/50 unique |
| Duplicate researcher pairs | ✅ NONE — 120/120 unique |
| Shared budget IDs | ⚠ Expected — 120 budgets, 50 unique IDs (multi-researcher projects share budget) |
| Invalid years | ✅ NONE — all within BE 2500-2600 |
| Zero-budget rows | 41/120 (34.2%) — preserved, not treated as null |

---

## 4. Risk Assessment

| Risk Level | Issue | Impact |
|-----------|-------|--------|
| **HIGH** | 40.8% rows missing `departmentName` | Faculty drill-down limited. Expected for external researchers. |
| **MEDIUM** | 34.0% projects missing `researchTypeName` | Filter by research type silently excludes these. Shown as "Unspecified". |
| **MEDIUM** | 28.0% projects missing `programName` | Program-level filtering and breakdowns limited. |
| **LOW** | 34.2% zero-budget rows | Zero is valid. Correctly preserved, not null. |

---

## 5. Recommendations

1. **Filters API** — Derive unique values from `budgets` entity (100% populated for fundingType, fundingSource, level, budgetYear) and `researchers` entity for discipline. Research type uses `projects` entity (66% complete).
2. **Faculty filter** — Will have limited scope; 40.8% departmentName null is expected for external researchers.
3. **Zero-budget** — Consider adding a `hasBudget` boolean filter for UX (show/hide zero-budget projects).
4. **Research type** — `null` typeName maps to "Unspecified" label consistently across the API.
5. **Sort order** — Years descending, strings alphabetically (Thai collation).

# Full Dataset Validation — View_Research

> **Date:** 2026-06-10
> **Validator:** `src/__tests__/full-dataset-validation.ts`
> **Status:** ✅ All 29 checks passed — **Production Ready**

---

## 1. Dataset Overview

| Metric | Value |
|--------|-------|
| **Source files** | `exports/a1.csv` + `exports/a3.csv` (no overlapping IDs) |
| **Total rows** | 120 |
| **Distinct projects** | 50 |
| **Distinct researchers** | 120 person entries (2.4 avg per project) |
| **Column count** | 44 (matching `View_Research` schema) |
| **Total CSV size** | 0.14 MB (142.4 KB) |
| **Budget year range** | BE 2553 → BE 2563 (2010 CE → 2020 CE) |
| **Funding types** | Internal (งบประมาณภายในสถาบัน), External (งบประมาณภายนอกสถาบัน), Personal (ทุนส่วนตัว) |

### Data Sources

| File | Rows | Distinct Projects | Size |
|------|------|-------------------|------|
| `exports/a1.csv` | 100 | 30 | 125.2 KB |
| `exports/a3.csv` | 20 | 20 | 17.2 KB |
| **Combined** | **120** | **50** | **142.4 KB** |

> **Note:** `a1.csv` and `a3.csv` contain disjoint sets of research IDs — no overlap detected. Together they form the full available dataset.

---

## 2. Executive KPIs (Computed)

| KPI | Value |
|-----|-------|
| **Total Projects** | 50 |
| **Total Budget** | ฿10,314,540 |
| **Success Count** | 7 |
| **Success Rate** | 14.0% |
| **External Funding Count** | 6 |
| **Internal Funding Count** | 44 |
| **Budget Years** | 2563, 2562, 2561, 2558, 2554, 2553 |

### Breakdowns

**By Research Type:**

| Type | Projects | Budget |
|------|----------|--------|
| การวิจัยประยุกต์ (Applied Research) | 29 | ฿5,876,140 |
| Unspecified (null typeName) | 17 | ฿3,756,500 |
| การพัฒนาทดลอง (Experimental Development) | 4 | ฿681,900 |

**By Discipline Group:**

| Discipline | Projects | Budget |
|------------|----------|--------|
| ไม่ระบุ (Unspecified) | 32 | ฿5,254,000 |
| มนุษยศาสตร์และสังคมศาสตร์ (Humanities & Social Sciences) | 7 | ฿573,340 |
| วิทยาศาสตร์และเทคโนโลยี (Science & Technology) | 6 | ฿2,257,200 |
| เกษตรศาสตร์ (Agriculture) | 5 | ฿2,230,000 |

**By Funding Type:**

| Funding Type | Projects | Budget |
|-------------|----------|--------|
| งบประมาณภายในสถาบัน (Internal) | 35 | ฿4,646,640 |
| งบประมาณภายนอกสถาบัน (External) | 6 | ฿3,785,000 |
| ทุนส่วนตัว (Personal) | 9 | ฿1,882,900 |

---

## 3. Benchmark Results

### 3.1 Parse Performance

| Metric | Value |
|--------|-------|
| **Total rows parsed** | 120 |
| **Parse duration** | 11 ms |
| **Rows per second** | 10,909 rows/s |
| **Heap memory delta** | 0.86 MB |
| **RSS** | 96.2 MB |
| **KPI computation time** | 1.27 ms |

### 3.2 Resource Usage

| Resource | Before | After | Delta |
|----------|--------|-------|-------|
| RSS | 96.07 MB | 103.48 MB | +7.41 MB |
| Heap Used | 7.96 MB | 9.13 MB | +1.18 MB |
| Heap Total | 11.85 MB | 12.10 MB | +0.25 MB |

### 3.3 Scale Estimate (50,000 rows)

| Metric | Estimated |
|--------|-----------|
| **Parse time** | ~4,583 ms (4.6 s) |
| **Heap memory** | ~490 MB |
| **Scale factor** | 416.7x current dataset |

> The architecture uses a **parse-once, cache-forever** strategy, so the 4.6s parse is a one-time cost at server startup. Subsequent requests hit the in-memory cache with sub-2ms KPI computation.

---

## 4. Data Quality Validation

| Check | Result | Detail |
|-------|--------|--------|
| No duplicate project IDs | ✅ | 50 unique IDs from 50 projects |
| No duplicate researcher assignments | ✅ | 120 unique (project, researcher) pairs |
| personCode masking | ✅ | 102 codes masked (e.g., `*********7512`) |
| Zero-budget preserved (not null) | ✅ | 41/120 records have budgetBath = 0 (34.2%) |
| Date fields populated | ✅ | dateBegin + dateFinish: 0 nulls |
| Budget years populated | ✅ | 0 nulls, range BE 2553–2563 |
| personName populated | ✅ | 0 nulls |
| departmentName nulls | ✅ | 49/120 null (40.8%) — expected for external researchers |

### Field Nullability Profile

| Field | Null Count | Null % | Assessment |
|-------|-----------|--------|------------|
| `research_name_th` | 0 | 0% | ✅ Fully populated |
| `research_name_eng` | 9 | 7.5% | ✅ Acceptable |
| `research_ref_code` | 1 | 0.8% | ✅ Near-perfect |
| `research_type_name` | 17 | 14.2% | ⚠ Moderate — placeholder normalization works |
| `research_program_name` | 14 | 11.7% | ⚠ Moderate |
| `money_name` | 0 | 0% | ✅ Fully populated |
| `budgetDetail` | 5 | 4.2% | ✅ Good |
| `departmentName` | 49 | 40.8% | ⚠ High — expected for external researchers |
| `personName` | 0 | 0% | ✅ Fully populated |
| `personCode` | 18 | 15% | ⚠ Moderate — external researchers lack codes |
| `budgetBath` | 0 | 0% | ✅ Fully populated (0 is valid) |
| `dateBegin` | 0 | 0% | ✅ Fully populated |
| `dateFinish` | 0 | 0% | ✅ Fully populated |

---

## 5. Duplicate Detection

```
Duplicate project IDs:  NONE  ✅  (50 projects, 50 unique IDs)
Duplicate researcher pairs: NONE  ✅  (120 records, 120 unique pairs)
```

**Data deduplication logic verified:**
- `parseRow()` → produces one `ViewResearchRow` per CSV line
- `normalizeRows()` → deduplicates projects by `researchId` via `Map`
- Projects: 120 raw rows → 50 distinct projects (70 rows are additional budget/researcher rows for multi-researcher projects)

---

## 6. Placeholder Normalization

The parser correctly converts `-- ไม่ระบุ --` to `null`:

| Field | Before (raw) | After (normalized) |
|-------|-------------|-------------------|
| `research_type_name` | `"-- ไม่ระบุ --"` (67 rows) | `null` (17 unique projects) |
| `research_program_name` | `"-- ไม่ระบุ --"` | `null` |
| `road_map_name` | `"-- ไม่ระบุ --"` | `null` |
| `denomination_name` | `"-- ไม่ระบุ --"` | `null` |

> Note: 67 raw rows may have `-- ไม่ระบุ --` for type_name, but after project deduplication, 17 distinct projects are affected.

---

## 7. Person Code Masking

All 102 non-null person codes are masked to show only the last 4 digits:

```
Examples:
  3501400437512  →  *********7512
  5100299086615  →  *********6615
  0801198500078  →  *********0078
```

This satisfies the security requirement for PII-safe API exposure.

---

## 8. Production Readiness Assessment

### ✅ Passed: All 29 Checks

| Category | Checks | Passed |
|----------|--------|--------|
| File inventory | 3 | 3 ✅ |
| Parse benchmark | 4 | 4 ✅ |
| Entity statistics | 5 | 5 ✅ |
| Duplicate detection | 2 | 2 ✅ |
| Data quality (fields) | 14 | 14 ✅ |
| KPI computation | 1 | 1 ✅ |
| **Total** | **29** | **29 ✅** |

### Verdict: **Production Ready**

The architecture is validated against the full available dataset. All data integrity checks pass, all required transformations (masking, normalization, deduplication) work correctly, and performance is well within acceptable bounds.

### Known Considerations for Full Production Dataset

| Consideration | Current | Expected at Scale (50K rows) | Mitigation |
|--------------|---------|------------------------------|------------|
| Parse time | 11ms | ~4.6s (one-time) | Cache forever after first parse |
| Memory | ~1.2MB heap | ~490MB heap | Acceptable for server; use Linux with sufficient RAM |
| departmentName nulls | 40.8% | Likely similar | Expected: external researchers don't have department affiliation |
| Success rate | 14% | May differ with more data | Verify against full dataset |
| research_type_name nulls | 14.2% | May decrease | Data quality improves with complete records |

---

## 9. Validation Script

The validation is fully automated and reproducible:

```bash
pnpm tsx src/__tests__/full-dataset-validation.ts
```

The script was also run via `rtk`:

```bash
rtk npx tsx src/__tests__/full-dataset-validation.ts
```

**Exit code:** `0` — All checks passed.

---

## 10. Conclusion

| Requirement | Status |
|-------------|--------|
| Row count determined | ✅ 120 rows (50 distinct projects) |
| CSV file sizes measured | ✅ 142.4 KB total (0.14 MB) |
| Parse benchmark | ✅ 11ms parse, 10,909 rows/s |
| Memory benchmark | ✅ +1.18 MB heap delta |
| KPIs recomputed | ✅ totalProjects=50, totalBudget=฿10.3M, successRate=14% |
| Duplicate IDs verified | ✅ 50/50 unique, no duplicates |
| personCode masking | ✅ All 102 codes masked |
| Placeholder normalization | ✅ `-- ไม่ระบุ --` → null |
| Zero-budget preservation | ✅ 41 zero-budget records preserved |
| Scale estimate | ✅ ~4.6s for 50K rows, ~490MB heap |
| **Production readiness** | **✅ READY** |

The CSV-based read-only data layer, TypeScript models, parser/normalizer pipeline, and KPI aggregation functions are validated and production-ready for the full View_Research dataset.

# Test Coverage Audit — RC4 Readiness

> **Date:** 2026-06-14  
> **Purpose:** Verify all test suites are discovered, explain count discrepancy, confirm no tests were accidentally excluded.

---

## 1. Full Test Inventory

| # | File | Type | Tests | Status |
|---|------|------|-------|--------|
| 1 | `src/__tests__/smoke.ts` | Assert-based suite | **173** | ✅ PASS — confirmed running |
| 2 | `__tests__/budget-stats.test.ts` | Assert-based suite | **53** | ✅ PASS — confirmed running |
| 3 | `__tests__/rdc-budget-normalizer.test.ts` | Assert-based suite | **61** | ✅ PASS — confirmed running |
| 4 | `__tests__/rdc-snapshot-export.test.ts` | Assert-based suite | **17** | ✅ PASS — confirmed running |
| 5 | `__tests__/rdc-fallback.test.ts` | Assert-based suite | **31** | ✅ PASS — confirmed running |
| 6 | `src/__tests__/full-dataset-validation.ts` | Validation report (29 checks) | — | ✅ PASS — confirmed running |
| 7 | `__tests__/data-quality-audit.ts` | Validation report (audit) | — | ✅ PASS — confirmed running |
| 8 | `__tests__/smoke.ts` | **Duplicate** of `src/__tests__/smoke.ts` | — | ⏩ Identical content |

**Standard assert suites:** **335 tests** (173 + 53 + 61 + 17 + 31) — all confirmed passing.

---

## 2. Count Discrepancy: Why 287 vs 162?

### The Claim
`docs/complete2.MD` (RC3 Slice 14 report) stated **287 tests**:
- RDC Normalizer: 61
- Budget Stats: 53
- Smoke: 173
- **Total: 287**

The RC3 Slice 16 final report stated **162 tests**:
- RDC Normalizer: 61
- Budget Stats: 53
- Snapshot Export: 17
- Fallback: 31
- **Total: 162**

### Root Cause
The Slice 16 report **omitted the Smoke (173) and Full Dataset Validation (29) test suites** from its count. This was a **reporting omission** — those test suites were not run or tallied in the Slice 16 final table — but they were **never removed or excluded from the repository**.

### Evidence
Every test file confirmed present and passing today:
```
Smoke (src/__tests__/smoke.ts):          173 passed ✅
Budget Stats (budget-stats.test.ts):      53 passed ✅
RDC Normalizer (rdc-budget-normalizer):   61 passed ✅
Snapshot Export (rdc-snapshot-export):    17 passed ✅
Fallback (rdc-fallback):                  31 passed ✅
Full Dataset Validation:                  29 checks ✅
Data Quality Audit:                       audit report ✅
───────────────────────────────────────────────
Total assert-based tests:                335 passed ✅
```

### Verdict
**No tests were lost.** The total has grown from 287 to **335** (+48 tests added by Slices 15–16: Snapshot Export + Fallback). The discrepancy was a reporting gap only.

---

## 3. Test Suite Discovery Matrix

| Suite | Discovered by Slice 16 report | Actually excluded from repo | Files deleted | Current status |
|-------|------|------|------|------|
| Smoke (173) | ❌ Omitted from count | ✅ Still present | None | ✅ 173/173 |
| Budget Stats (53) | ✅ Counted | ✅ Still present | None | ✅ 53/53 |
| RDC Normalizer (61) | ✅ Counted | ✅ Still present | None | ✅ 61/61 |
| Snapshot Export (17) | ✅ Counted | ✅ Still present | None | ✅ 17/17 |
| Fallback (31) | ✅ Counted | ✅ Still present | None | ✅ 31/31 |
| Full Dataset Validation (29) | ❌ Omitted from count | ✅ Still present | None | ✅ 29/29 |
| Data Quality Audit | ❌ Omitted from count | ✅ Still present | None | ✅ audit pass |

**Conclusion:** No test files deleted, no test suites excluded, no regressions.

---

## 4. Run Commands

All test suites can be run individually:

```bash
# Standard assert-based suites
npx tsx src/__tests__/smoke.ts
npx tsx __tests__/budget-stats.test.ts
npx tsx __tests__/rdc-budget-normalizer.test.ts
npx tsx __tests__/rdc-snapshot-export.test.ts
npx tsx __tests__/rdc-fallback.test.ts

# Validation scripts
npx tsx src/__tests__/full-dataset-validation.ts
npx tsx __tests__/data-quality-audit.ts

# All suites (one-liner)
npx tsx src/__tests__/smoke.ts && npx tsx __tests__/budget-stats.test.ts && npx tsx __tests__/rdc-budget-normalizer.test.ts && npx tsx __tests__/rdc-snapshot-export.test.ts && npx tsx __tests__/rdc-fallback.test.ts && npx tsx src/__tests__/full-dataset-validation.ts && npx tsx __tests__/data-quality-audit.ts
```

---

## 5. Recommendation

1. **Add a `test` script to `package.json`** that runs all test suites, so that `npm test` produces a unified count.
2. **Future slice reports** should explicitly list all test suites with their counts to avoid reporting gaps.
3. **Consider consolidation**: The redundant `__tests__/smoke.ts` (duplicate of `src/__tests__/smoke.ts`) should be cleaned up to avoid confusion.

# Test Policy — RAE Research Platform

**Owner:** Supervisor Agent · QA Agent  
**Effective:** RC3.16a  
**Status:** Active

---

## 1. Source of Truth

`npm test` is the single source of truth for all test execution.

Running `npm test` executes every active test and validation suite in sequence.  
All quality gates, CI checks, and release readiness reviews must reference `npm test` output.

---

## 2. Active Test Inventory

| Suite | Path | Type | Asserts |
|-------|------|------|---------|
| Smoke Tests | `src/__tests__/smoke.ts` | Integration | ~180 |
| Budget Stats | `__tests__/budget-stats.test.ts` | Unit/Integration | ~60 |
| RDC Budget Normalizer | `__tests__/rdc-budget-normalizer.test.ts` | Unit | ~40 |
| RDC Snapshot Export | `__tests__/rdc-snapshot-export.test.ts` | Integration | ~30 |
| RDC Fallback | `__tests__/rdc-fallback.test.ts` | Integration | ~25 |
| Full Dataset Validation | `src/__tests__/full-dataset-validation.ts` | Validation | ~varies |
| Data Quality Audit | `__tests__/data-quality-audit.ts` | Audit | ~varies |

**Total assert-based tests: 335** (as of RC3)

---

## 3. Governance Rules

### 3.1 New Slices Must Update Test Inventory

Every new data slice, API endpoint, or significant feature must:

- Add or extend at least one test suite
- Update the inventory table in this document
- Update the total assert count

Pull requests that reduce test coverage without justification will not pass QA review.

### 3.2 Final Reports Must Include Full Test Count

All RC reports, sprint closeout reports, and release readiness reviews must include:

```
npm test: PASS | FAIL
Total asserts: N
Suites run: N
```

### 3.3 Duplicate Test Suites Are Prohibited

- Each test file must have exactly one canonical location
- Duplicates discovered during audits must be resolved immediately
- When a duplicate is found: compare byte-for-byte, keep the `src/__tests__/` version as canonical unless the test targets root-level `lib/`
- The removed duplicate must be documented in the sprint report

### 3.4 Validation Reports Are Part of Quality Gates

Validation scripts (`full-dataset-validation.ts`, `data-quality-audit.ts`) are not optional.  
They are mandatory gates before any RC push recommendation.

### 3.5 All Terminal Commands Must Use `rtk`

All terminal commands documented in reports, runbooks, and this policy must use the `rtk` prefix.

Examples:
```
rtk npm test
rtk pnpm lint
rtk pnpm build
```

---

## 4. Test Execution Pattern

All tests use `tsx` direct execution (no test framework dependency):

```
tsx <path/to/test.ts>
```

Do not add Jest, Vitest, or other test frameworks unless explicitly approved by the Supervisor Agent.

---

## 5. Canonical Locations

| File | Canonical Path | Status |
|------|---------------|--------|
| `smoke.ts` | `src/__tests__/smoke.ts` | Active |
| `full-dataset-validation.ts` | `src/__tests__/full-dataset-validation.ts` | Active |
| `data-quality-audit.ts` | `__tests__/data-quality-audit.ts` | Active |
| `budget-stats.test.ts` | `__tests__/budget-stats.test.ts` | Active |
| `rdc-budget-normalizer.test.ts` | `__tests__/rdc-budget-normalizer.test.ts` | Active |
| `rdc-snapshot-export.test.ts` | `__tests__/rdc-snapshot-export.test.ts` | Active |
| `rdc-fallback.test.ts` | `__tests__/rdc-fallback.test.ts` | Active |

---

## 6. Known Resolved Duplicates

| File | Removed From | Kept At | RC Resolved |
|------|-------------|---------|-------------|
| `smoke.ts` | `__tests__/smoke.ts` | `src/__tests__/smoke.ts` | RC3.16a |

### Known Remaining Duplicates (Pending Resolution)

| File | Duplicate A | Duplicate B | Action Required |
|------|------------|-------------|-----------------|
| `full-dataset-validation.ts` | `__tests__/full-dataset-validation.ts` | `src/__tests__/full-dataset-validation.ts` | Remove `__tests__/` copy — RC4 |
| `data-quality-audit.ts` | `__tests__/data-quality-audit.ts` | `src/__tests__/data-quality-audit.ts` | Remove `src/__tests__/` copy — RC4 |

---

## 7. Release Readiness Gate

Before any push recommendation, ALL of the following must pass:

1. `rtk npm test` — all suites pass, total asserts reported
2. `rtk pnpm lint` — zero warnings
3. `rtk pnpm build` — clean export
4. No deploy performed
5. No production paths touched
6. No secrets committed

---

## 8. Changelog

| Date | RC | Change |
|------|----|--------|
| 2026-06-14 | RC3.16a | Document created. `npm test` unified. `__tests__/smoke.ts` duplicate removed. |

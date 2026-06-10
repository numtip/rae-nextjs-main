# RC2 Slice 3 — KPI UI Wiring QA

**Date:** 2026-06-10  
**RC:** RC2 Slice 3  
**Commit (HEAD):** `776273e` — feat: add KPI snapshot loader  
**Branch:** `main`

---

## Files Changed

| File | Action | Purpose |
|---|---|---|
| `components/home/KpiImpactStrip.tsx` | **MODIFY** | Replace `kpiMetrics` import from `kpiImpact.ts` with `getSnapshotKpiMetrics()` from `loadKpiSnapshot.ts` |
| `docs/architecture/KPI_LIVE_SOURCE_PLAN.md` | **MODIFY** | Status → RC2 Slice 3; wiring marked done; implementation steps updated |

### Unchanged

- `data/kpiImpact.ts` — preserved as reference; `kpiMetrics` still exported
- `data/loadKpiSnapshot.ts` — no changes needed
- `data/kpiSnapshot.json` — no changes needed
- `components/home/HomeSectionRenderer.tsx` — unchanged interface
- `components/home/index.ts` — unchanged re-export

---

## QA Gates

| Gate | Result | Detail |
|---|---|---|
| Snapshot validation (production + example) | **PASS** | Both files pass schema v1 contract |
| `npm run lint` | **PASS** | ESLint 0 warnings (max-warnings 0) |
| `tsc --noEmit` | **PASS** | Strict TypeScript — no errors |
| `npm run build` | **PASS** | Next.js 16.2.4 — 32 pages compiled and exported |

---

## Runtime Wiring

```
KpiImpactStrip.tsx  ──imports──▶  loadKpiSnapshot.ts
                                      │
                                  imports (build-time JSON)
                                      │
                                  kpiSnapshot.json  ◄── checked in, validated
```

| Concern | Finding |
|---|---|
| Runtime `JSON.parse` or `fetch` | **None.** JSON imported via Next.js `resolveJsonModule` — compile-time only |
| Async or client-side parsing | **None.** Module-level `getSnapshotKpiMetrics()` call, no `use client` |
| Type mismatch | **None.** `SnapshotKpiMetric` is structurally compatible with `KpiMetric` — same fields, same types |
| `data/kpiSnapshot.json` stale or missing | **Low risk.** Validated before commit; build would fail on import error |
| `kpiImpact.ts` still exports `kpiMetrics` | **No impact.** Unused by the component now; preserved as reference for tests |

---

## Visual Change

**None.** The snapshot values match the previous inline placeholder values:

| Metric | Previous | Snapshot |
|---|---|---|
| research-projects | 120+ | 120+ |
| publications-outputs | 85 (highlight) | 85 (highlight) |
| training-outreach | 40+ | 40+ |
| partner-organisations | 25 | 25 |

Labels, context, highlight assignment, and placeholder notice are identical.

---

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Snapshot JSON becomes stale | **Low** | Checked-in file — validated at commit, updated explicitly |
| Schema drifts silently from component types | **Low** | `loadKpiSnapshot.ts` provides typed bridge; validator checks the JSON contract |
| `kpiImpact.ts` inline placeholders diverge | **Low** | Preserved as reference only; component no longer imports them |

---

## Ready For Push?

**YES** ✅

All QA gates passed. The wiring is additive and preserves existing visual output, locale behavior, and static-export safety.

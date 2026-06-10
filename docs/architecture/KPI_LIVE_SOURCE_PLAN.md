# KPI Live Source Plan

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Status:** RC2 Slice 3 — **loader wired into KPI UI**; still static checked-in snapshot  
**Governance:** `docs/agent/AGENCY_AGENTS_POLICY.md` · `docs/architecture/VISUAL_GOVERNANCE.md`

---

## Current placeholder model

KPI data lives in `data/kpiImpact.ts` and renders via `components/home/KpiImpactStrip.tsx`.

| Field | Current value |
|-------|---------------|
| `KpiDataSource` | `"placeholder"` only |
| `KpiDataStatus` | `"pending-live-source"` |
| Strip meta | `data-kpi-source="placeholder"` · `data-kpi-status="pending-live-source"` |
| User notice | Bilingual `placeholderNotice` — figures are samples, not verified live data |
| Metrics | Four static strings (`120+`, `85`, `40+`, `25`) with TH/EN labels and context |

No API calls, env secrets, or build-time fetch today. Values ship in the static export as-is.

---

## Candidate data source options

| Option | Mechanism | Fit for `output: "export"` | Risk |
|--------|-----------|---------------------------|------|
| **A. Build-time JSON fetch** | CI or pre-build script fetches public JSON → writes `data/kpiSnapshot.json` | **Best** — values baked into static HTML at build | Requires scheduled rebuild; source must be public or CI-only creds |
| **B. Checked-in snapshot file** | Human or ops updates `data/kpiSnapshot.json` on cadence | **Good** — no runtime dependency | Stale data if update process slips |
| **C. Client-side fetch** | Browser calls API after page load | Works but **not ideal** for static export | CORS, flash of placeholder, secrets in client forbidden |
| **D. Metabase embed/API** | Direct query to Metabase on port 3100 | **Poor** — wrong service boundary; auth complexity | Secrets, VPS coupling, not static-friendly |
| **E. CMS / headless field** | Future CMS numeric fields | Future sprint | Out of scope now |

---

## Recommended safest source format (static export)

**Primary recommendation: Option A or B — build-time snapshot as typed JSON.**

```
data/kpiSnapshot.json   ← generated or manually updated
data/kpiImpact.ts       ← imports snapshot; maps to KpiMetric[]
```

### Snapshot contract (RC2 Slice 1)

| Artifact | Path |
|----------|------|
| JSON Schema | `data/kpiSnapshot.schema.json` |
| Example (reference) | `data/kpiSnapshot.example.json` |
| Validator | `scripts/validate-kpi-snapshot.ts` |
| Production file | `data/kpiSnapshot.json` — committed with placeholder values |
| Typed loader | `data/loadKpiSnapshot.ts` — build-time import + `snapshotToKpiMetrics` helper |
| Wired into UI | `components/home/KpiImpactStrip.tsx` — imports `getSnapshotKpiMetrics()` from loader |

**Validate (default validates both production + example):**

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx tsx scripts/validate-kpi-snapshot.ts'
```

**Validate a single file:**

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx tsx scripts/validate-kpi-snapshot.ts data/kpiSnapshot.example.json'
```

**Metric IDs (fixed set, order-independent):**

| ID | Maps from current `kpiImpact.ts` |
|----|----------------------------------|
| `research-projects` | Research projects supported |
| `publications-outputs` | Publications & outputs (highlight allowed) |
| `training-outreach` | Training & outreach events |
| `partner-organisations` | Partner organisations |

**Root fields:**

| Field | Type | Notes |
|-------|------|-------|
| `schemaVersion` | `"1"` | Bump with migration notes only |
| `generatedAt` | ISO-8601 | Refresh timestamp |
| `source` | `manual` \| `registry-api` \| `metabase-export` \| `placeholder` | Provenance only — no credentials |
| `status` | `verified` \| `pending-live-source` | Controls placeholder notice in UI (Slice 2+) |
| `metrics` | array[4] | Exactly four cards; at most one `highlight: true` |

- **No secrets** in repo or client bundle
- Fetch credentials only in CI (GitHub Actions secrets) if Option A
- Build should fail loudly if snapshot invalid; validator runs as standalone CLI check
- `KpiImpactStrip` keeps `data-kpi-source` / `data-kpi-status` attributes for QA

---

## Fallback behavior

1. If snapshot fetch fails at build time → **keep last committed snapshot** (do not ship empty strip)
2. If snapshot is stale (> N days, TBD by ops) → set `status: "pending-live-source"` and show placeholder notice
3. If individual metric missing → omit card or show em dash with `role="note"` — never invent numbers
4. If live source unavailable at runtime (client fetch, if ever used) → retain visible placeholder notice; no silent substitution

---

## Governance rules

| Rule | Requirement |
|------|-------------|
| Accuracy | Unverified metrics must show placeholder notice (current behavior) |
| Visual | Reuse `.kpi-strip`, `.kpi-card`, `.grid-four` — no new brand colors |
| IA | Section remains `impact-metrics` in `KpiImpactStrip` / `home-sections` registry |
| Types | Extend `KpiDataSource` union when wiring — e.g. `"snapshot" \| "registry-api"` |
| Build | `npm run build` must pass after snapshot integration |
| Runtime QA | `serve out -l 3110` — verify `/th/` and `/en/` KPI section markers |
| Deploy | No production deploy without explicit approval |

---

## No-secret rule

- **Never** commit API keys, Metabase tokens, or DB credentials to `data/` or `.env` in git
- **Never** expose secrets via `NEXT_PUBLIC_*` for KPI fetch
- CI-only secrets for build-time fetch; document in deploy runbook, not in public docs
- Metabase on port 3100 is a **separate service** — not an in-app KPI endpoint

---

## Implementation steps

| Step | Status | Notes |
|------|--------|-------|
| 1. Data-owner sign-off on metric definitions | **Open** | Required before `kpiSnapshot.json` goes live |
| 2. Publish snapshot contract | **Done (RC2 Slice 1)** | Schema + validator + example |
| 3. KPI snapshot loader | **Done (RC2 Slice 2)** | `data/loadKpiSnapshot.ts` — typed import + conversion helpers |
| 4. Wire loader into KPI UI | **Done (RC2 Slice 3)** | `KpiImpactStrip` imports `getSnapshotKpiMetrics()` — no visual change |
| 5. Build hook `npm run kpi:validate` | **Future** | Run `npx tsx scripts/validate-kpi-snapshot.ts` before build |
| 6. Optional `npm run kpi:sync` (CI) | **Future** | Option A fetch; CI-only secrets |
| 7. Notice copy when `status: verified` | **Future** | Soften/remove placeholder notice |
| 8. QA gate on `impact-metrics` | **Per release** | `RUNTIME_QA` + `HOMEPAGE_REVIEW` |
| 9. Deploy | **Approval only** | `DEPLOYMENT.md` |

**RC2 Slice 1:** contract only — schema + validator + example.  
**RC2 Slice 2:** production `kpiSnapshot.json` committed + `loadKpiSnapshot.ts` typed loader.  
**RC2 Slice 3:** `KpiImpactStrip` imports `getSnapshotKpiMetrics()` — snapshot wired into UI.  
**Next:** data-owner sign-off, build hook, live API integration.

---

## Related

- `data/kpiImpact.ts` — current placeholder registry  
- `data/loadKpiSnapshot.ts` — typed snapshot loader (RC2 Slice 2)  
- `data/kpiSnapshot.json` — production snapshot file (RC2 Slice 2)  
- `components/home/KpiImpactStrip.tsx` — render + `data-kpi-*` attributes  
- `scripts/validate-kpi-snapshot.ts` — CLI validator (validates both snapshot files by default)  
- `docs/reports/RC2_RUNTIME_QA_WITNESS.md` — RC2 Slice 1 runtime QA  
- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA.md` — runtime QA reference

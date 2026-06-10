# KPI Live Source Plan

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Status:** RC2 Slice 4 — **build hook + data-owner governance**  
**Upstream:** Research Data Center (university system) — see `RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md`  
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
| **A. Build-time JSON fetch** | CI script fetches from **Research Data Center API** → writes `data/kpiSnapshot.json` | **Best** — values baked into static HTML at build; authoritative source | Requires API readiness + CI secrets |
| **B. Checked-in snapshot file** | Human or ops updates `data/kpiSnapshot.json` on cadence | **Good** — zero dependency; works today | Stale data if update process slips; interim until Option A |
| **C. Client-side fetch** | Browser calls API after page load | Works but **not ideal** for static export | CORS, flash of placeholder, secrets in client forbidden |
| **D. Metabase embed/API** | Direct query to Metabase on port 3100 | **Poor** — wrong service boundary; auth complexity | Secrets, VPS coupling, not static-friendly |
| **E. CMS / headless field** | Future CMS numeric fields | Future sprint | Out of scope now |

---

## Recommended safest source format (static export)

**Primary recommendation: Option A — build-time fetch from Research Data Center.**
**Interim fallback: Option B — checked-in snapshot, which is currently in place.**

```
Research Data Center (future API)
        │
        ▼
data-integration/rdc-adapter.ts  ◄── build-time CI script (future)
        │
        ▼
data/kpiSnapshot.json   ← generated (CI) or manually updated (interim)
data/loadKpiSnapshot.ts ← imports snapshot; maps to KpiMetric[]
```

### Snapshot contract (RC2 Slices 1–4)

| Artifact | Path |
|----------|------|
| JSON Schema | `data/kpiSnapshot.schema.json` |
| Example (reference) | `data/kpiSnapshot.example.json` |
| Validator | `scripts/validate-kpi-snapshot.ts` |
| Production file | `data/kpiSnapshot.json` — committed with placeholder values |
| Typed loader | `data/loadKpiSnapshot.ts` — build-time import + `snapshotToKpiMetrics` helper |
| Wired into UI | `components/home/KpiImpactStrip.tsx` — imports `getSnapshotKpiMetrics()` from loader |
| Data-owner workflow | `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` |
| Build hook | `npm run kpi:validate` runs automatically before every build via `prebuild` |

**Validate (default validates both production + example):**

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run kpi:validate'
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
- Build fails if snapshot invalid — `prebuild` hook runs `npm run kpi:validate` automatically
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
| 1. Data-owner sign-off on metric definitions | **Open** | Required before real values go live |
| 2. Publish snapshot contract | **Done (RC2 Slice 1)** | Schema + validator + example |
| 3. KPI snapshot loader | **Done (RC2 Slice 2)** | `data/loadKpiSnapshot.ts` — typed import + conversion helpers |
| 4. Wire loader into KPI UI | **Done (RC2 Slice 3)** | `KpiImpactStrip` imports `getSnapshotKpiMetrics()` — no visual change |
| 5. Build hook `npm run kpi:validate` | **Done (RC2 Slice 4)** | Runs automatically via `prebuild` before every `npm run build` |
| 6. Data-owner workflow doc | **Done (RC2 Slice 4)** | `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` — guides non-developer edits |
| 7. Research Data Center integration blueprint | **Done (RC2 Alignment)** | `docs/architecture/RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` |
| 8. RDC API contract negotiation | **Not started** | Requires RDC team — endpoints, auth, schema |
| 9. RDC adapter implementation | **Not started** | `data-integration/rdc-adapter.ts` — build-time fetch |
| 10. CI `npm run kpi:sync` script | **Not started** | Optional fetch shim before production API |
| 11. Notice copy when `status: verified` | **Future** | Soften/remove placeholder notice |
| 12. QA gate on `impact-metrics` | **Per release** | `RUNTIME_QA` + `HOMEPAGE_REVIEW` |
| 13. Deploy | **Approval only** | `DEPLOYMENT.md` |

**RC2 Slice 1:** contract only — schema + validator + example.  
**RC2 Slice 2:** production `kpiSnapshot.json` committed + `loadKpiSnapshot.ts` typed loader.  
**RC2 Slice 3:** `KpiImpactStrip` imports `getSnapshotKpiMetrics()` — snapshot wired into UI.  
**RC2 Slice 4:** `npm run kpi:validate` + `prebuild` hook + data-owner workflow documented.  
**RC2 Alignment:** Research Data Center identified as upstream source — blueprint documented.  
**Next:** RDC API contract negotiation with data-owner and RDC team.

---

## Related

- `data/kpiImpact.ts` — current placeholder registry  
- `data/loadKpiSnapshot.ts` — typed snapshot loader (RC2 Slice 2)  
- `data/kpiSnapshot.json` — production snapshot file (RC2 Slice 2)  
- `components/home/KpiImpactStrip.tsx` — render + `data-kpi-*` attributes  
- `scripts/validate-kpi-snapshot.ts` — CLI validator (validates both snapshot files by default)  
- `docs/architecture/RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` — upstream integration blueprint  
- `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` — data-owner update guide (RC2 Slice 4)  
- `docs/reports/RC2_RUNTIME_QA_WITNESS.md` — RC2 Slice 1 runtime QA  
- `docs/reports/RC2_SLICE2_KPI_SNAPSHOT_LOADER_QA.md` — RC2 Slice 2 QA  
- `docs/reports/RC2_SLICE3_KPI_UI_WIRING_QA.md` — RC2 Slice 3 QA  
- `docs/reports/RC2_SLICE4_KPI_BUILD_HOOK_QA.md` — RC2 Slice 4 QA  
- `docs/reports/RC2_RESEARCH_DATA_CENTER_ALIGNMENT.md` — RC2 alignment note  
- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA.md` — runtime QA reference

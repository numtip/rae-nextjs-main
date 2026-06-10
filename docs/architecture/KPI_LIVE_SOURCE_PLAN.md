# KPI Live Source Plan

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Status:** Planning only — **no live wiring in Sprint 2 Week 2 Slice 2**  
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

Snapshot schema (proposed):

```json
{
  "generatedAt": "ISO-8601",
  "source": "registry-api | manual | metabase-export",
  "status": "verified | pending-live-source",
  "metrics": [
    { "id": "research-projects", "value": "120+", "labelTh": "...", "labelEn": "...", "highlight": false }
  ]
}
```

- **No secrets** in repo or client bundle
- Fetch credentials only in CI (GitHub Actions secrets) if Option A
- Build fails loudly if snapshot missing or schema invalid
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

## Future implementation steps

1. **Define source of truth** — which RAE registry/report owns each metric (owner sign-off)
2. **Publish snapshot contract** — JSON schema + validation script (`scripts/validate-kpi-snapshot.ts`)
3. **Add build hook** — optional `npm run kpi:sync` before `npm run build` (CI only)
4. **Extend types** — `KpiDataSource`, `KpiDataStatus`; loader in `data/kpiImpact.ts`
5. **Update notice copy** — remove or soften placeholder text when `status: "verified"`
6. **QA gate** — `RUNTIME_QA` + `HOMEPAGE_REVIEW` on `impact-metrics` section
7. **Documentation** — update this plan with chosen source URL and refresh cadence
8. **Deploy** — separate approval; static copy to staging path per `DEPLOYMENT.md`

**Slice 2 delivers this plan only.** Implementation is a future slice after data owner confirmation.

---

## Related

- `data/kpiImpact.ts` — current placeholder registry
- `components/home/KpiImpactStrip.tsx` — render + `data-kpi-*` attributes
- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA.md` — runtime QA reference
- `docs/agent/skills/RUNTIME_QA.md` — verification skill

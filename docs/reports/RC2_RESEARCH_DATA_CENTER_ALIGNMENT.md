# RC2 Research Data Center Alignment

**Date:** 2026-06-10  
**Branch:** `main`  
**Commit:** `6e4f8fa` — chore: validate KPI snapshot before build  

---

## Why direction changed

The previous KPI roadmap (RC2 Slices 1–4) was designed around a generic "checked-in JSON snapshot" strategy. The intended upstream was unspecified — only referred to as "data owner" or "live API."

The **Research Data Center** is now confirmed as the authoritative upstream for all research-related data on the new RAE website:

- Research projects
- Publications
- Researchers / personnel
- Training / outreach events
- Partner organisations
- Patents / innovation
- Funding / grants

---

## Why current snapshot work remains valid

The RC2 slices completed so far are **not wasted**. Each deliverable maps cleanly to the Research Data Center integration:

| RC2 Slice | Deliverable | RDC alignment |
|-----------|-------------|---------------|
| Slice 1 — Schema + validator | `kpiSnapshot.schema.json`, `validate-kpi-snapshot.ts` | The schema is **source-agnostic** — RDC adapter output must also pass validation |
| Slice 2 — Snapshot file + loader | `kpiSnapshot.json`, `loadKpiSnapshot.ts` | The typed loader is the **bridge contract** — RDC adapter writes the same JSON format |
| Slice 3 — UI wiring | `KpiImpactStrip` → `getSnapshotKpiMetrics()` | UI is **decoupled** from source — swap placeholder for verified data by updating the JSON |
| Slice 4 — Build hook + governance | `prebuild`, `KPI_DATA_OWNER_WORKFLOW.md` | Build hook **protects** against invalid adapter output; workflow doc guides manual updates until API is live |

**Key architectural insight:** The snapshot JSON file acts as a **build-time cache**:

```
RDC API  ──[adapter]──▶  kpiSnapshot.json  ──[loader]──▶  Static HTML
                            ▲
                            │
                    Manual update (interim)
```

This decouples website releases from API readiness. The website can ship with manually maintained snapshots today and switch to adapter-driven snapshots without any UI change.

---

## What changes

- The intended upstream is now explicitly the **Research Data Center**
- Future adapter will be at `data-integration/rdc-adapter.ts`
- Additional data domains (projects, publications, personnel) will follow the same snapshot pattern
- The snapshot `source` field will eventually become `"registry-api"` instead of `"placeholder"`

---

## What does NOT change

- **Static export** — still `output: "export"`, no runtime fetch
- **TH/EN locale model** — unchanged
- **Schema contract** — unchanged; RDC adapter output must validate
- **Build hook** — `prebuild` runs regardless of data source
- **Component code** — `KpiImpactStrip` and all other UI components remain unchanged
- **No client-side secrets** — adapter runs in CI only

---

## Next recommended implementation slice

**Phase: RDC API contract negotiation**

Concrete action items:

1. Meet with Research Data Center team to confirm:
   - Available endpoints and response schemas
   - Authentication model (API token, OAuth, or public read-only)
   - Rate limits and availability SLA
   - Locale support (TH/EN for each field)
   - Data classification (public vs internal vs confidential)
2. Draft the adapter specification based on responses
3. Update `RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` with confirmed API details
4. Build `data-integration/rdc-adapter.ts` against a staging or test endpoint

Until the RDC API is ready, the current snapshot workflow (manual updates + `kpi:validate` + `prebuild`) remains the production path.

---

## References

- `docs/architecture/RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` — full integration blueprint
- `docs/architecture/KPI_LIVE_SOURCE_PLAN.md` — KPI-specific roadmap (updated)
- `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` — manual snapshot update guide
- `data/kpiSnapshot.schema.json` — source-agnostic JSON Schema
- `scripts/validate-kpi-snapshot.ts` — build-time validator (works for any source)

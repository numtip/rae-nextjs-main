# Research Data Center — Website Integration Blueprint

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Status:** Planning — no implementations started  
**Upstream:** Research Data Center (internal university system)  
**Governance:** `docs/architecture/KPI_LIVE_SOURCE_PLAN.md` · `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md`

---

## 1. Goal

The new RAE public website will be powered by the **Research Data Center** — the university's authoritative repository of research activity, personnel, publications, patents, training, and partnership data.

The website is a **static export** (`output: "export"`). It consumes data at **build time** only. No live `fetch` calls from the browser.

---

## 2. Current state

The website already has a **checked-in JSON snapshot** adapter:

```
Research Data Center (future)
        │
        ▼
  [API adapter — future]
        │
        ▼
data/kpiSnapshot.json  ◄── typed, validated, committed to repo
        │
        ▼
data/loadKpiSnapshot.ts  ◄── build-time import (Next.js resolveJsonModule)
        │
        ▼
components/home/KpiImpactStrip.tsx  ◄── homepage KPI cards
```

| Artifact | Status |
|----------|--------|
| `data/kpiSnapshot.json` | **Done** — placeholder values, validated by schema |
| `data/loadKpiSnapshot.ts` | **Done** — typed loader + `snapshotToKpiMetrics` helper |
| `scripts/validate-kpi-snapshot.ts` | **Done** — runs automatically via `prebuild` |
| `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` | **Done** — guides manual snapshot updates |
| API adapter (live) | **Not started** |

---

## 3. Target state

```
Research Data Center (internal)
        │
        ▼
  data-integration/rdc-adapter.ts  ◄── build-time script
        │                 (runs during CI / npm run build)
        ▼
data/research-projects.json     │   Static JSON artifacts
data/publications.json          │   (checked-in or CI-generated)
data/researchers.json           │
data/departments.json           │
data/funding.json               │
data/patents.json               │
data/training-events.json       │
data/partner-organisations.json │
data/executive-dashboard.json   ▼
        │
        ▼
  loadKpiSnapshot.ts           ◄── imports snapshot (unchanged contract)
  + new loaders for showcases, directory, etc.
        │
        ▼
  Static site pages            ◄── Next.js SSG
```

---

## 4. Data domains

| Domain | Website surfaces | Sensitivity | Priority |
|--------|-----------------|-------------|----------|
| **Research projects** | Homepage KPI, showcase pages, search | Public (after approval) | P0 |
| **Publications** | Homepage KPI (count), publications page, search | Public | P0 |
| **Researchers / personnel** | Directory, profile pages | Public (internal) | P1 |
| **Departments / faculties** | Filter, browse, org chart | Public | P1 |
| **Funding** | KPI (grants received), reports | Public (aggregate) | P1 |
| **Patents / innovation** | KPI, innovation showcase | Public | P2 |
| **Training / outreach** | Homepage KPI, training page, calendar | Public | P0 |
| **Partner organisations** | Homepage KPI, partner logos/links | Public | P1 |

### Classification rules

| Classification | Definition | Website visibility |
|---------------|-----------|-------------------|
| **Public** | Official statistics, approved publications, open data | Full display |
| **Internal** | Personnel contacts, department structure | Displayed (no secrets) |
| **Confidential** | Reviewer comments, financial details in progress | **Never** on website |
| **Embargoed** | Pre-publication data, pending approvals | Only after status = `verified` |

**Rule:** The static site never receives credentials, API keys, or database access. The build-time adapter fetches from a **public-read API endpoint** only.

---

## 5. KPI mapping (current snapshot → Research Data Center)

| Snapshot metric ID | Research Data Center source | Current value |
|---|---|---|
| `research-projects` | Count of active projects in fiscal year | `120+` |
| `publications-outputs` | Count of peer-reviewed + grey literature | `85` |
| `training-outreach` | Count of training/outreach events (FY) | `40+` |
| `partner-organisations` | Count of active MOUs / partnerships | `25` |

The `kpiSnapshot.schema.json` contract is source-agnostic. When the adapter is built, only the `source` and `generatedAt` fields change — the metric structure stays the same.

---

## 6. Research showcase mapping

| Website page | Data domain | Adapter output | Status |
|---|---|---|---|
| `/research-services` | Static content (services registry) | Already in `data/research-services-registry.ts` | Done |
| `/research-systems` | Static list of system links | Already in `data/hero.ts` + `cta.ts` | Done |
| Research showcase / gallery | Research projects | JSON array of project cards | Future |
| Researcher directory | Personnel | JSON array of personnel records | Future |
| Publications listing | Publications | JSON array of publication entries | Future |

---

## 7. Executive dashboard mapping

The homepage KPI strip is the current executive summary. Future expansion:

| Dashboard element | Source | Priority |
|---|---|---|
| 4-metric KPI strip (current) | `kpiSnapshot.json` | **Done** |
| Trend arrows (↑↓) vs previous year | RDC aggregated stats | P2 |
| Per-faculty breakdown | RDC filtered counts | P2 |
| Funding volume (THB) | RDC grants data | P2 |

---

## 8. API readiness checklist

For the Research Data Center to serve the website, the following API capabilities are needed:

- [ ] **Public-read endpoint** — no auth required for GET requests
- [ ] **CORS headers** — `Access-Control-Allow-Origin: *` or allow specific origins
- [ ] **JSON response** — structured, consistent schema per domain
- [ ] **Period snapshot endpoint** — returns aggregated KPI counts as a single JSON document (mirrors `kpiSnapshot.schema.json` contract)
- [ ] **Individual domain endpoints** — projects, publications, personnel, partners
- [ ] **Locale support** — TH/EN labels for each result
- [ ] **Pagination** — for large result sets (publications, projects)
- [ ] **Rate limiting** — build-time fetch only, so low throughput requirement (< 100 requests/day)
- [ ] **SSL/TLS** — HTTPS only

---

## 9. Temporary no-API strategy

Until the Research Data Center API is ready:

1. **Use checked-in JSON snapshots** — current approach, already working
2. **Data owners update `kpiSnapshot.json` manually** — guided by `KPI_DATA_OWNER_WORKFLOW.md`
3. **CI-driven fetch shim** — a future `npm run kpi:sync` script can hit a staging endpoint and write `kpiSnapshot.json` during CI, even before production API is finalised
4. **No client-side fallback** — the site must never `fetch` from the browser; all data is baked into the static export

This is **safe, testable, and reversible**. The snapshot contract decouples website deployment from API readiness.

---

## 10. Future adapter design

```typescript
// data-integration/rdc-adapter.ts  (future)

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const RDC_BASE = process.env.RDC_API_BASE;          // CI-only secret
const RDC_TOKEN = process.env.RDC_API_TOKEN;         // CI-only secret

type RdcSnapshotResponse = {
  schemaVersion: "1";
  generatedAt: string;
  source: "registry-api";
  status: "verified" | "pending-live-source";
  metrics: {
    id: string;
    value: string;
    labelTh: string;
    labelEn: string;
    contextTh?: string;
    contextEn?: string;
    highlight?: boolean;
  }[];
};

async function fetchSnapshot(): Promise<RdcSnapshotResponse> {
  const res = await fetch(`${RDC_BASE}/api/v1/kpi-snapshot`, {
    headers: { Authorization: `Bearer ${RDC_TOKEN}` },
  });
  if (!res.ok) throw new Error(`RDC API error: ${res.status}`);
  return res.json() as Promise<RdcSnapshotResponse>;
}

async function main() {
  const snapshot = await fetchSnapshot();
  const outPath = resolve(process.cwd(), "data/kpiSnapshot.json");
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log("RDC adapter: snapshot written to", outPath);
}

main().catch((err) => {
  console.error("RDC adapter failed:", err);
  process.exit(1);
});
```

### Design principles

| Principle | Rationale |
|-----------|-----------|
| **Build-time only** | No runtime fetch, no client bundle secrets |
| **Fail closed** | Adapter failure → build failure → no stale data deployed |
| **Overrideable** | `data/kpiSnapshot.json` can be updated manually or by CI |
| **Type-safe** | Adapter output validates against existing `kpiSnapshot.schema.json` |
| **Locale pair** | TH/EN labels embedded in each metric, matching existing UI expectations |
| **Auditable** | `generatedAt` and `source` fields record provenance |

---

## 11. Security and privacy notes

| Concern | Mitigation |
|---------|-----------|
| API credentials in client bundle | **Impossible** — adapter runs in CI only, never in browser |
| Personal data leak | Adapter must filter to **public** data only. No salaries, reviewer names, or internal notes |
| Embargoed publications | Adapter checks `status === "published"` before inclusion |
| CORS / XSS | Static export has no JS runtime that calls the API — no CORS exposure |
| Build secrets | `RDC_API_TOKEN` stored as GitHub Actions secret, never in `.env` or repo |
| Rate limiting | Build runs at most a few times per day — negligible API load |
| Data integrity | Snapshot JSON validated by `scripts/validate-kpi-snapshot.ts` before export |

---

## 12. Rollout phases

| Phase | Scope | Depends on | Status |
|-------|-------|-----------|--------|
| **0 — Snapshot contract** | Schema, validator, example JSON | — | **Done (RC2 Slice 1)** |
| **1 — Loader** | `loadKpiSnapshot.ts`, typed bridge | Phase 0 | **Done (RC2 Slice 2)** |
| **2 — UI wiring** | `KpiImpactStrip` imports snapshot | Phase 1 | **Done (RC2 Slice 3)** |
| **3 — Build hook** | `npm run kpi:validate` + `prebuild` | Phase 0–2 | **Done (RC2 Slice 4)** |
| **4 — Adapter design** | This blueprint document | — | **This document** |
| **5 — RDC API contract negotiation** | Agree endpoints, schemas, auth | RDC team availability | **Not started** |
| **6 — RDC adapter implementation** | `data-integration/rdc-adapter.ts` | Phase 5 | **Not started** |
| **7 — Expanded data domains** | Projects, publications, personnel JSONs | Phase 5 | **Not started** |
| **8 — Showcase/directory pages** | New pages consuming domain JSONs | Phases 6–7 | **Not started** |
| **9 — Executive dashboard expansion** | Trends, breakdowns, funding volume | Phases 6–7 | **Not started** |

---

## 13. Related documents

- `docs/architecture/KPI_LIVE_SOURCE_PLAN.md` — KPI-specific roadmap (upstream: Research Data Center)
- `docs/architecture/KPI_DATA_OWNER_WORKFLOW.md` — Manual snapshot update guide (interim strategy)
- `docs/reports/RC2_RESEARCH_DATA_CENTER_ALIGNMENT.md` — Alignment rationale and next steps
- `data/kpiSnapshot.schema.json` — JSON Schema contract (source-agnostic)
- `scripts/validate-kpi-snapshot.ts` — Build-time validator
- `data/loadKpiSnapshot.ts` — Current typed loader (will be extended for multi-domain)

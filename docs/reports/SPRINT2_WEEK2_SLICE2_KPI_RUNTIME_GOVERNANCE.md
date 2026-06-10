# Sprint 2 Week 2 Slice 2 — KPI Live-Source Plan + Runtime QA Governance

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**GitHub SoT:** `numtip/rae-nextjs-main`

---

## Confirmed path

`/home/rae_admin/rae-nextjs-main/` — verified via `rtk pwd`

---

## Skills used

| Skill | Result |
|-------|--------|
| TOKEN_SAVIOR_WORKFLOW | OK — targeted reads only (brief file list) |
| HOMEPAGE_REVIEW | N/A — no component edits; KPI plan references `impact-metrics` |
| A11Y_REVIEW | N/A — no UI structure changes |
| BUILD_VERIFICATION | PASS (lint + build) |
| RUNTIME_QA | Governance updated; prior run PASS (`SPRINT2_WEEK2_RUNTIME_QA.md`) |
| RELEASE_SAFETY_CHECK | PASS — production untouched; no deploy/push |

---

## Runtime QA governance update

| Change | Location |
|--------|----------|
| New skill `RUNTIME_QA.md` | `docs/agent/skills/` |
| Build gate: lint + runtime QA for major sprint / RC / push | `BUILD_VERIFICATION.md` |
| Release gate: static preview + production untouched | `RELEASE_SAFETY_CHECK.md` |
| Skill index + workflow stack | `SKILLS_INDEX.md`, `AGENT_WORKFLOW.md` |

**Key rules codified:**

- Build pass alone is **insufficient** for major sprint / RC / push recommendation
- Preview: `rtk npx serve out -l 3110` (static export)
- **Forbidden:** `next start`, port **3100** (Metabase)
- `/var/www/raeservice/landing/` must remain untouched unless deploy approved

---

## KPI live-source plan summary

**Document:** `docs/architecture/KPI_LIVE_SOURCE_PLAN.md`

| Topic | Decision |
|-------|----------|
| Current state | Placeholder metrics in `data/kpiImpact.ts`; `pending-live-source` status |
| Recommended approach | Build-time JSON snapshot (`data/kpiSnapshot.json`) — static-export safe |
| Rejected for now | Client-side Metabase/API on port 3100; secrets in client |
| Fallback | Last good snapshot; placeholder notice when unverified |
| Slice 2 scope | **Planning only** — no live wiring |

---

## Validation status

| Gate | Status | Notes |
|------|--------|-------|
| Lint | **PASS** | `eslint . --max-warnings 0` exit 0 |
| Build | **PASS** | Node v20.19.5 · static export |
| Runtime QA (this slice) | **SKIPPED** | Doc-only; prior Week 2 run PASS on 3110 |
| Production safety | **PASS** | No deploy; `/var/www/raeservice/landing/` untouched |

---

## Files changed

| File | Action |
|------|--------|
| `docs/agent/skills/RUNTIME_QA.md` | Created |
| `docs/agent/skills/BUILD_VERIFICATION.md` | Updated |
| `docs/agent/skills/RELEASE_SAFETY_CHECK.md` | Updated |
| `docs/agent/SKILLS_INDEX.md` | Updated |
| `docs/agent/AGENT_WORKFLOW.md` | Updated |
| `docs/architecture/KPI_LIVE_SOURCE_PLAN.md` | Created |
| `docs/reports/SPRINT2_WEEK2_SLICE2_KPI_RUNTIME_GOVERNANCE.md` | Created |

---

## Risks

| ID | Risk | Mitigation |
|----|------|------------|
| R1 | Agents may still use port 3100 or `next start` | Documented in three skills + workflow |
| R2 | KPI placeholders mistaken for live data | Plan + existing `placeholderNotice` + `data-kpi-status` |
| R3 | Build pass without runtime check before push | RUNTIME_QA now mandatory in release stack |
| R4 | Live KPI wiring may need CI secrets | No-secret rule in plan; snapshot pattern |

---

## Next recommendation

1. **Data owner sign-off** — confirm metric definitions and source system for KPI snapshot
2. **Implement snapshot loader** — future slice after approval (not Slice 2)
3. **Run full RUNTIME_QA** — before any push recommendation: lint → build → `serve out -l 3110` → `/th/` `/en/`
4. **Browser visual QA** — KPI strip and homepage on 3110 before deploy approval
5. **Push** — only when explicitly requested; SSH auth confirmed

---

## Sign-off

| Gate | Status |
|------|--------|
| Runtime QA requirement updated | **YES** |
| KPI live-source plan | **YES** (planning only) |
| Deploy | **NOT PERFORMED** |
| Push | **NOT PERFORMED** |

# RC1 Status

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Repository:** `numtip/rae-nextjs-main`  
**Status date:** 2026-06-10  
**RC1 closeout:** Formal — ready for RC2 planning

---

## Executive Summary

RC1 closes successfully. Sprint 2 Week 2 delivered a governed static-export homepage prototype with full QA coverage: runtime, locale, visual, mobile, and release readiness review (88% score). Lint, build, and static export pass on Node 20. Locale metadata (`html lang`, canonical, hreflang, og) is corrected. KPI metrics remain labeled placeholders — acceptable for RC1 source publication, not for production deploy.

Repository is **7 commits ahead** of `origin/main` with a **clean working tree**. `.cursorrules` governance is committed. **No push or deploy has been performed.**

---

## Completed Work

### Sprint accomplishments

- Homepage prototype: 8 sections via `data/home-sections.ts` registry
- Bilingual routes (`/th/`, `/en/`) with static export (`output: "export"`)
- Research systems CTA, documents/green-office utility sections, news highlights polish
- ESLint baseline (`eslint . --max-warnings 0`)
- Locale fix: server-rendered `html lang` per locale (`e9d5225`)
- Agency agent skills: `RUNTIME_QA`, updated `BUILD_VERIFICATION`, `RELEASE_SAFETY_CHECK`
- KPI live-source **planning** document (no implementation)

### Major commits (RC1 window)

| Commit | Summary |
|--------|---------|
| `54969f4` | Sprint 2 runtime QA report |
| `0fd16c6` | Runtime QA skill + KPI live-source plan |
| `5f844d1` | Runtime QA pass on port 3110 |
| `e9d5225` | Fix locale `html lang` and page metadata |
| `fb0a6ad` | Visual and mobile QA + screenshots |
| `c7ae232` | RC1 release readiness review |
| `7d6a383` | Project governance `.cursorrules` |

### Governance additions

- `.cursorrules` — agent behavior, QA gates, static export rules
- `docs/agent/skills/RUNTIME_QA.md`
- `docs/architecture/KPI_LIVE_SOURCE_PLAN.md`
- `docs/reports/RELEASE_READINESS_REVIEW_RC1.md`
- QA reports under `docs/reports/` (runtime, locale, visual/mobile)

---

## QA Results

| Gate | Report | Result |
|------|--------|--------|
| Runtime QA | `SPRINT2_WEEK2_RUNTIME_QA_3110.md` | **PASS** — `serve out -l 3110`; `/th/` `/en/` HTTP 200 |
| Locale QA | `SPRINT2_WEEK2_LOCALE_AUDIT.md` | **PASS** — `lang`, canonical, hreflang, og:locale |
| Visual QA | `SPRINT2_WEEK2_VISUAL_MOBILE_QA.md` | **PASS** — hero, nav, CTA, KPI notice, footer |
| Mobile QA | `SPRINT2_WEEK2_VISUAL_MOBILE_QA.md` | **PASS** — 390px layout, tap targets, no overflow |
| Release Review | `RELEASE_READINESS_REVIEW_RC1.md` | **PASS** (88%) — push conditional GO; deploy NO-GO |

**Preview rule (codified):** `rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx serve out -l 3110'` — port 3100 is Metabase; do not use `next start`.

---

## Current Repository State

| Item | Value |
|------|-------|
| Branch | `main` |
| Ahead count | 7 (vs `origin/main`) |
| Working tree | Clean |
| Latest commit | `7d6a383` — docs: add project governance cursorrules |
| Static pages | 29 `index.html` in `out/` after build |
| Node | v20.19.5 |

---

## Open Risks

| Risk | Severity | Notes |
|------|----------|-------|
| KPI placeholders | Medium | Bilingual notice present; not verified live data |
| Staging validation | Medium | No smoke test on live nginx `/rae-landing/` path |
| Deploy approval | Required | Per `AGENCY_AGENTS_POLICY.md` and `.cursorrules` |
| Port 3100 confusion | Low | Metabase on shared VPS — use 3110 for RAE QA |
| No Playwright CI | Low | Visual QA used Chromium headless; no automated regression |
| SSH push auth | Low | Not verified in RC1 cycle |

---

## Not Started

- KPI snapshot loader (`data/kpiSnapshot.json` integration)
- Live KPI integration (build-time fetch or CI sync)
- Staging deployment to nginx path
- Production deployment
- GitHub push (awaiting explicit approval)
- Playwright / automated visual regression in CI

---

## RC2 Recommended Scope

**Only:**

1. **KPI Snapshot Architecture** — finalize JSON schema, validation script, governance rules per `KPI_LIVE_SOURCE_PLAN.md`
2. **KPI Snapshot Loader** — wire `data/kpiImpact.ts` to snapshot; extend `KpiDataSource` types; build-time validation
3. **Data source governance** — data-owner sign-off, refresh cadence, no-secret rule, fallback behavior

**Out of scope for RC2:** production deploy, UI redesign, new homepage sections, Metabase client integration, push without approval.

---

## GO / NO-GO Matrix

| Action | RC1 Decision | Condition |
|--------|--------------|-----------|
| **GitHub Push** | **GO** (conditional) | Human approval; SSH auth confirmed; all QA gates passed |
| **Staging Deploy** | **NO-GO** | Staging smoke not run; KPI placeholders; explicit approval required |
| **Production Deploy** | **NO-GO** | Policy block; KPI placeholders; rollback untested this cycle |
| **RC2 KPI work** | **GO** (planning → implementation) | After data-owner sign-off on metric definitions |

---

## Next Recommended Action

1. **Human decision:** Approve GitHub push of 7 ahead commits (RC1 candidate)
2. **RC2 kickoff:** Data-owner sign-off on KPI metrics and snapshot source
3. **RC2 Slice 1:** Implement KPI snapshot schema + loader per `KPI_LIVE_SOURCE_PLAN.md`
4. **Before any deploy:** Staging copy + live-path smoke on `https://raeservice.mju.ac.th/rae-landing/th/` and `/en/`

---

## References

- `docs/reports/RELEASE_READINESS_REVIEW_RC1.md`
- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA_3110.md`
- `docs/reports/SPRINT2_WEEK2_LOCALE_AUDIT.md`
- `docs/reports/SPRINT2_WEEK2_VISUAL_MOBILE_QA.md`
- `docs/architecture/KPI_LIVE_SOURCE_PLAN.md`
- `.cursorrules`

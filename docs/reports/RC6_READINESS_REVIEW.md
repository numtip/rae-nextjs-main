# RC6 Readiness Review

**Date**: 2026-06-15  
**Reviewer**: Agent (RC6 Readiness Review task)  
**Extraction workspace**: `/home/prinya/raemju`  
**Target Next.js repo**: `numtip/rae-nextjs-main`  
**Checklist reference**: `docs/design-system/RC6_READINESS_CHECKLIST.md`

---

## Executive decision

| Overall | Result |
|---------|--------|
| **RC6 Content Injection authorized** | **GO** (with documented constraints below) |
| **GitHub docs package push** | **GO** |

**GO** applies to documentation transfer and **scoped** RC6 content injection in the Next.js app repo. It does **not** authorize deploy, VPS changes, production hero finals, or verified KPI publication.

---

## Required decisions (locked for RC6)

| ID | Decision | Resolution |
|----|----------|------------|
| **D2 KPI Source** | Placeholder KPI only unless verified source exists | **Approved.** Landing KPI section uses labeled placeholders (`—` or `Coming soon`) with footnote *ข้อมูลรอการยืนยัน*. No numbers from legacy WTMS or fabricated metrics. |
| **R4 PAGE-1024** | Archive News unless valid research-impact story | **Approved.** PAGE-1024 (*VIII International Symposium on Lychee…*) → **News archive card** with event date and external/read-more link. **Not** featured Research Showcase unless later editorial rewrite passes RESEARCH_STORY_FRAMEWORK (all 5 narrative stages + real imagery). |
| **V2 Hero Image** | No poor legacy banners as final hero | **Approved.** Do **not** use PAGE-1001/1026 WTMS banners as production hero. RC6 uses **temporary branded placeholder** (abstract/green surface or clearly marked `TEMP — replace with official photography`) until real shoot assets exist. |

---

## PASS/FAIL — Pre-flight

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| P1 | RC5.5 docs present | **PASS** | 6 files under `docs/design-system/` |
| P2 | RC5.6 docs present | **PASS** | RESEARCH_STORY, DASHBOARD_VISUAL, AI_ASSET, RC6_READINESS_CHECKLIST |
| P3 | STAGING_MANIFEST scope (25 keep) | **PASS** | 26 lines incl. header; 25 data rows |
| P4 | No production code changes in extraction workspace | **PASS** | This task is docs-only |
| P5 | Next.js target identified | **PASS** | `numtip/rae-nextjs-main` |

**Pre-flight gate**: **PASS**

---

## PASS/FAIL — Category gates

| Category | Items | Result | Notes |
|----------|-------|--------|-------|
| **Brand** | B1–B5 | **PASS** | `#005C3B` / `#FFDE00` canonical in BRAND_SYSTEM |
| **Visual** | V1–V5 | **PASS** | V2 satisfied via temp hero placeholder decision |
| **Motion** | M1–M5 | **PASS** | M4: app repo must implement `prefers-reduced-motion` at implementation time |
| **Research Story** | R1–R6 | **PASS** | R4 satisfied via Archive News decision |
| **Dashboard** | D1–D5 | **PASS** | D2/D4 satisfied via placeholder KPI decision |
| **AI Asset** | A1–A6 | **PASS** | Human photo priority; no fake evidence in plan |
| **Content** | C1–C8 | **PASS** | Scope, protected/drop rules documented in legacy-migration |
| **Accessibility** | X1–X5 | **PASS** | Plans in DESIGN_GOVERNANCE; app repo implements |
| **Performance** | F1–F5 | **PASS** | No legacy hotlinks in injection plan |

---

## Master summary table

| Gate | PASS | FAIL |
|------|------|------|
| Pre-flight | ✓ | |
| Brand | ✓ | |
| Visual | ✓ | |
| Motion | ✓ | |
| Research Story | ✓ | |
| Dashboard | ✓ | |
| AI Asset | ✓ | |
| Content | ✓ | |
| Accessibility | ✓ | |
| Performance | ✓ | |
| **Overall** | **✓ GO** | |

---

## Required blockers (none for scoped RC6)

No checklist **FAIL** blockers remain given locked decisions above.

**Post-RC6 blockers** (out of scope for this GO):

| Blocker | When to resolve |
|---------|-----------------|
| Final hero photography | Before production marketing launch |
| Verified KPI data | Before publishing real metrics (replace placeholders) |
| PAGE-1024 as research feature | Only after full narrative rewrite + imagery |
| Next.js app landing components | Must exist in app repo before paste injection |

---

## Recommended RC6 scope

Inject in **priority order** (content only — no layout redesign):

| Priority | Source | Target section | Action |
|----------|--------|----------------|--------|
| 1 | PAGE-1006, PAGE-1020 | Footer / contact | Keep copy; strip WTMS chrome |
| 2 | PAGE-1009, PAGE-1010, PAGE-1011 | About | **Rewrite** per MIGRATION_MATRIX |
| 3 | PAGE-1014 | Services | Extension/service hub card |
| 4 | PAGE-1001, 1004, 1007, 1026 | Hero | **Text only** + temp placeholder image |
| 5 | PAGE-1005 | News | Calendar item if passes cutoff review |
| 6 | PAGE-1024 | News (archive) | Archive card — **not** research showcase |
| 7 | Direct PDFs (1022, 1023, selected downloads) | Services/footer links | Max 3–5 featured docs — **not** full 11-page dump |
| 8 | KPI / Dashboard preview | Landing | Placeholder metrics only |

**Exclude**: PAGE-1003 (protected admin), all `decision=drop` rows, fragment duplicates, legacy banners as final hero, autoplay carousel behavior.

**Staging counts** (`page_type`): 6 home, 3 about, 1 service, 2 news, 11 download, 2 contact.

---

## Files safe to transfer to `numtip/rae-nextjs-main`

### Documentation (copy as-is)

```
docs/design-system/README.md
docs/design-system/BRAND_SYSTEM.md
docs/design-system/VISUAL_LANGUAGE_BIBLE.md
docs/design-system/MOTION_LANGUAGE_BIBLE.md
docs/design-system/LANDING_EXPERIENCE_GUIDE.md
docs/design-system/DESIGN_GOVERNANCE.md
docs/design-system/RESEARCH_STORY_FRAMEWORK.md
docs/design-system/DASHBOARD_VISUAL_GUIDE.md
docs/design-system/AI_ASSET_POLICY.md
docs/design-system/RC6_READINESS_CHECKLIST.md

docs/legacy-migration/README.md
docs/legacy-migration/CONTENT_MODEL_SUMMARY.md
docs/legacy-migration/MIGRATION_NOTES.md

docs/reports/RC6_READINESS_REVIEW.md
```

### Planning CSVs (under `docs/legacy-migration/source-csv/`)

```
STAGING_MANIFEST.csv
MIGRATION_MATRIX.csv
ASSET_INVENTORY.csv
```

### Do NOT transfer

- `raw/pages/*`, `raw/assets/*` (HTML dumps, large assets)
- `migration/PAGE_INVENTORY.csv` (optional; full inventory stays in extraction workspace)
- `docker-compose.yml`, Joomla docs, `docs/chrome-rae-agent/`
- Secrets, `.env`, credentials
- `design-system/DESIGN_TOKENS_V1.md` (deprecated blue palette — superseded)

---

## Conditional approvals

- [x] Placeholder KPIs allowed on landing with explicit “data pending” label
- [x] PAGE-1024 archived as news card only (not featured research)
- [x] Temporary hero placeholder until official photography
- [x] Abstract AI background allowed for temp hero if marked non-documentary (AI_ASSET_POLICY §1)

---

## Sign-off

**Primary reviewer**: RC6 Readiness Review (automated + governance doc audit)  
**Secondary reviewer**: Operator recommended before first app-repo content PR  

**Next action (GO)**: Copy governance package to `numtip/rae-nextjs-main` → push GitHub → begin scoped RC6 injection in app repo per table above.

**Next action if NO GO**: N/A — overall GO with constraints.

---

## Review metadata

- Token Savior: `memory search "RC6 readiness"` — no prior observations
- RELEASE_SAFETY_CHECK: named script not found in extraction workspace; equivalent pre-push checks executed at Phase 3 (secrets grep, docs-only diff, no deploy commands)

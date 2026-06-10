# Release Readiness Review — RC1

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Date:** 2026-06-10  
**Head commit:** `fb0a6ad` — docs: visual and mobile QA report with screenshots  
**Branch:** `main` (ahead 5 vs `origin/main`)  
**Scope:** Verification and governance only — no feature development

---

## Executive Summary

RC1 is **technically ready for GitHub push** after Sprint 2 Week 2 QA cycles. Lint, TypeScript compile, static export build, runtime preview (port 3110), locale metadata, and visual/mobile checks all pass. KPI metrics remain **explicit placeholders** with bilingual notices — acceptable for RC1 source publication, **not** for production deploy without stakeholder sign-off.

Locale `html lang` mismatch on `/en/` (found in early runtime QA) was **fixed** in `e9d5225` and re-verified in locale audit and visual QA.

**Overall readiness score: 88%**

| Area | Score | Status |
|------|-------|--------|
| A. Code Quality | 100% | PASS |
| B. Runtime Quality | 100% | PASS |
| C. SEO Readiness | 95% | PASS |
| D. Accessibility Readiness | 85% | PASS (gaps noted) |
| E. Content Readiness | 70% | CONDITIONAL |
| F. Deployment Readiness | 80% | CONDITIONAL |

---

## Prior QA Reports Reviewed

| Report | Result | Key outcome |
|--------|--------|-------------|
| `SPRINT2_WEEK2_RUNTIME_QA_3110.md` | PASS (conditional) | Static serve on 3110; `/th/` `/en/` 200; lang issue flagged (later fixed) |
| `SPRINT2_WEEK2_LOCALE_AUDIT.md` | PASS | Server-rendered `lang`; canonical, hreflang, og:locale on audited routes |
| `SPRINT2_WEEK2_VISUAL_MOBILE_QA.md` | PASS | Desktop + mobile screenshots; hero, nav, KPI notice, footer OK |

Supporting governance: `RUNTIME_QA` skill, `KPI_LIVE_SOURCE_PLAN.md`, `SPRINT2_WEEK2_SLICE2_KPI_RUNTIME_GOVERNANCE.md`.

---

## Final Verification (this review)

```bash
rtk git status -sb          # ahead 5; clean except untracked .cursorrules
rtk git log --oneline -10
rtk bash -lc '... npm run lint'   # PASS
rtk bash -lc '... npm run build'  # PASS
```

| Check | Result |
|-------|--------|
| Lint | **PASS** — `eslint . --max-warnings 0` |
| TypeScript | **PASS** — compiles via `next build` |
| Build | **PASS** — Node v20.19.5, `output: "export"` |
| Export artifacts | **PASS** — `out/th/index.html`, `out/en/index.html`, `sitemap.xml`, `robots.txt`, 29 `index.html` pages |

---

## Evaluation

### A. Code Quality — PASS

| Gate | Status |
|------|--------|
| ESLint | PASS |
| TypeScript (build) | PASS |
| Static export build | PASS |
| Node 20 engine | PASS (`engines: >=20 <21`) |

### B. Runtime Quality — PASS

| Gate | Status |
|------|--------|
| Static export (`out/`) | PASS |
| Preview method | `serve out -l 3110` (not `next start`, not port 3100) |
| `/th/`, `/en/` | HTTP 200, homepage markers present |
| Inner routes (green-office, research-systems) | HTTP 200 |
| Asset sample (`/_next/static/*`) | HTTP 200 |

### C. SEO Readiness — PASS

| Gate | Status | Evidence |
|------|--------|----------|
| `html lang` | PASS | `th` on `/th/`, `en` on `/en/` (post-`e9d5225`) |
| `metadataBase` | PASS | `https://raeservice.mju.ac.th/rae-landing/` |
| Canonical | PASS | Per-page via `buildPageMetadata` |
| hreflang | PASS | `th`, `en`, `x-default` alternates |
| `og:locale` | PASS | `th_TH` / `en_US` + alternateLocale |
| Twitter card | PASS | `summary_large_image` on metadata helper pages |
| Sitemap | PASS | Both locales, static segments + news slugs |
| Robots | PASS | `Allow: /rae-landing/`, sitemap reference |

### D. Accessibility Readiness — PASS (with gaps)

| Gate | Status | Notes |
|------|--------|-------|
| `html lang` | PASS | Server-rendered per locale |
| Mobile navigation | PASS | Menu button + `main-nav`; visual QA 390px |
| Touch targets | PASS | `--nav-touch-min: 2.75rem` in tokens |
| Landmarks | PASS | `header`, `main`, `nav` aria-labels present |
| Automated a11y audit | **GAP** | No axe/Playwright a11y suite |
| Console errors | **GAP** | Not captured (no browser MCP / Playwright) |

### E. Content Readiness — CONDITIONAL

| Gate | Status | Notes |
|------|--------|-------|
| Homepage sections (8) | PASS | All registered in `data/home-sections.ts` |
| Bilingual parity | PASS | TH/EN routes and copy |
| KPI placeholder notice | PASS | Visible notice + `data-kpi-status="pending-live-source"` |
| KPI live data | **OPEN** | Placeholder values only — plan in `KPI_LIVE_SOURCE_PLAN.md` |
| News content | PASS | Static registry; published slugs in sitemap |
| Search page | PASS | Present; noindex where configured |

### F. Deployment Readiness — CONDITIONAL

| Gate | Status | Notes |
|------|--------|-------|
| Export artifacts | PASS | `out/` complete after build |
| Environment | Documented | `NEXT_PUBLIC_SITE_ORIGIN`, `NEXT_PUBLIC_SITE_PATH_PREFIX` (defaults: raeservice + `/rae-landing`) |
| nginx mount assumption | Documented | Static files under `/rae-landing/` |
| `next start` | N/A | Not used — static export only |
| Rollback | PASS | Existing Joomla landing at `/var/www/raeservice/landing/` unchanged — revert = restore prior tree |
| Production touched | PASS | No deploy performed in Sprint 2 QA |
| Staging validation on VPS | **GAP** | Not executed on live nginx path |
| Human deploy approval | **REQUIRED** | Per `AGENCY_AGENTS_POLICY.md` |

---

## Passed Gates (summary)

1. Lint + build on Node 20  
2. Static export with 29 HTML pages  
3. Runtime QA on port 3110 (`/th/`, `/en/`, inner pages)  
4. Locale metadata (`html lang`, canonical, hreflang, og)  
5. Visual + mobile QA (Chromium screenshots)  
6. Homepage IA complete (8 sections)  
7. KPI placeholders explicitly labeled  
8. Production landing untouched  
9. Agency skills and runtime QA governance documented  
10. Git history clean (5 commits ahead, report-only + verified fixes)

---

## Open Risks

| ID | Risk | Severity |
|----|------|------------|
| R1 | KPI figures are placeholders — not verified live metrics | Medium |
| R2 | Port 3100 is Metabase — RAE QA must use 3110+ | Low |
| R3 | No Playwright / CI visual regression | Low |
| R4 | No automated a11y or console-error gate | Low |
| R5 | Staging not validated on live nginx `/rae-landing/` path | Medium |
| R6 | Static news/KPI content requires manual refresh cadence | Low |
| R7 | SSH push auth not verified in this review | Low |

---

## Blockers

| Target | Blockers |
|--------|----------|
| **GitHub Push** | None technical. Requires explicit human approval + SSH auth confirmation. |
| **Staging Deploy** | Human approval; staging copy to nginx path not yet executed; KPI placeholder policy sign-off recommended. |
| **Production Deploy** | Human approval; KPI placeholders; no staging smoke on live URL; rollback plan documented but untested in this cycle. |

**No release-blocking code defects identified.**

---

## Recommended Actions

### Before push
1. Confirm SSH access to `numtip/rae-nextjs-main`
2. Review 5 ahead commits (docs + locale fix + features from Sprint 2)
3. Push when explicitly approved

### Before staging deploy
1. Copy `out/` to staging nginx path per `DEPLOYMENT.md`
2. Smoke-test `https://raeservice.mju.ac.th/rae-landing/th/` and `/en/` on live host
3. Confirm assets resolve under path prefix

### Before production deploy
1. Data-owner sign-off on KPI placeholder policy OR implement snapshot loader
2. Staging validation complete
3. Rollback procedure confirmed (restore prior `/var/www/raeservice/landing/` tree)
4. Optional: add Playwright smoke for CI

---

## GO / NO-GO Matrix

| Action | Decision | Rationale |
|--------|----------|-----------|
| **GitHub Push** | **GO** (conditional) | All code-quality and QA gates pass; 5 commits ready; human approval required |
| **Staging Deploy** | **NO-GO** | Not executed; KPI placeholders; needs explicit approval and live-path smoke |
| **Production Deploy** | **NO-GO** | Policy requires approval; placeholders; staging unverified; production untouched by design |

---

## Sign-off

| Reviewer role | Outcome |
|---------------|---------|
| QA / Runtime | PASS |
| Locale / SEO | PASS |
| Visual / Mobile | PASS |
| Content | CONDITIONAL (placeholders acknowledged) |
| DevOps / Deploy | NO-GO until approved |

**RC1 verdict:** Ready to **push source to GitHub** as RC1 candidate. **Not ready** for staging or production deploy without further approval and staging validation.

---

## References

- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA_3110.md`
- `docs/reports/SPRINT2_WEEK2_LOCALE_AUDIT.md`
- `docs/reports/SPRINT2_WEEK2_VISUAL_MOBILE_QA.md`
- `docs/architecture/KPI_LIVE_SOURCE_PLAN.md`
- `docs/agent/AGENCY_AGENTS_POLICY.md`
- `DEPLOYMENT.md`

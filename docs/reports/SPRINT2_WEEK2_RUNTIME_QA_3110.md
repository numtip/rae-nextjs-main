# Sprint 2 Week 2 — Runtime QA (Port 3110)

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Commit:** `0fd16c63faa247d2c0606b45d384fa4c629e11e2`  
**Branch:** `main` (ahead 2 vs `origin/main`)  
**Skill:** `RUNTIME_QA`

---

## Commands run

```bash
rtk pwd
rtk git status -sb
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx serve out -l 3110'
rtk bash -lc 'curl -sI http://127.0.0.1:3110/th/'
rtk bash -lc 'curl -sI http://127.0.0.1:3110/en/'
# HTML smoke + asset HEAD checks via curl
```

**Note:** `rtk npx serve out -l 3110` failed (`Missing script: serve`). Preview started via `rtk bash -lc '... npx serve out -l 3110'`. Port **3100** not used (Metabase). **`next start` not used** (`output: "export"`).

---

## Results

| Gate | Status | Detail |
|------|--------|--------|
| Lint | **PASS** | `eslint . --max-warnings 0` exit 0 |
| Build | **PASS** | Node v20.19.5 · static export · `out/th/index.html` + `out/en/index.html` |
| Preview | **PASS** | `serve out -l 3110` — Accepting connections |
| `/th/` HTTP | **PASS** | 200 · `Content-Length: 72866` |
| `/en/` HTTP | **PASS** | 200 · `Content-Length: 56028` |
| Production safety | **PASS** | `/var/www/raeservice/landing/` exists · not modified · no deploy |

### Smoke checks

| Check | `/th/` | `/en/` |
|-------|--------|--------|
| Not 404 | PASS | PASS |
| `hero-title` | PASS | PASS |
| `impact-metrics` / KPI strip | PASS | PASS |
| `quick-links` | PASS | PASS |
| `services-overview` | PASS | PASS |
| `research-systems-cta-strip` | PASS | PASS |
| `site-footer` | PASS | PASS |
| Locale heading | `ผลงานและผลกระทบ` | `Impact at a glance` |
| KPI placeholder notice | PASS | PASS |
| Sample `/_next/static/*` assets | 200 | 200 |

### Visual QA

**Playwright / browser screenshots:** Not available (no Playwright in project; browser automation not run). Curl + HTML marker checks only.

---

## Warnings (non-blocking)

| ID | Finding |
|----|---------|
| A11Y-1 | `/en/` HTML root has `lang="th"` while content is English — verify `<html lang>` in layout for `/en/` |
| ENV-1 | Port 3100 still serves Metabase (confirmed separate from RAE) — do not use for RAE QA |

---

## Pass / fail

**RUNTIME_QA: PASS** (conditional — html `lang` mismatch on `/en/` is a follow-up, not a runtime blocker)

---

## Risks

- Port 3100 confusion with Metabase on shared VPS
- KPI figures remain placeholders (`data-kpi-status="pending-live-source"`)
- No browser-level visual regression in this run
- `/en/` `lang` attribute may affect screen readers / SEO

---

## Screenshots

None — Playwright unavailable; curl-only verification.

---

## Push recommendation

**Conditional GO for push consideration** (human approval still required):

- Lint + build + static runtime QA on **3110** all pass
- `/th/` and `/en/` serve expected homepage HTML
- Production landing untouched
- Recommend fixing `/en/` `lang="th"` before deploy approval
- KPI snapshot loader out of scope — placeholders acceptable for push QA gate

**Do not deploy** without separate approval.

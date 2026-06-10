# Sprint 2 Week 2 — Visual & Mobile QA

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Commit:** `e9d5225` — fix locale html lang and page metadata  
**Preview:** `serve out -l 3110` (port 3100 not used)

---

## Commands run

```bash
rtk git status -sb
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx serve out -l 3110'
# curl + Chromium headless screenshots (Playwright not in project)
```

---

## Tooling

| Tool | Status |
|------|--------|
| Playwright | **Not in project** — not installed |
| Browser MCP | **Unavailable** — no console log capture |
| Chromium headless | **Used** — desktop (1280×900) + mobile (390×844) screenshots |

---

## Lint / build / runtime

| Gate | Result |
|------|--------|
| Lint | **PASS** |
| Build | **PASS** (Node v20.19.5, static export) |
| Runtime (3110) | **PASS** — all 6 routes HTTP 200 |

### Routes verified

| Route | HTTP | `html lang` | Shell |
|-------|------|-------------|-------|
| `/th/` | 200 | `th` | header, main, footer |
| `/en/` | 200 | `en` | header, main, footer |
| `/th/green-office/` | 200 | `th` | header, main, footer |
| `/en/green-office/` | 200 | `en` | header, main, footer |
| `/th/research-systems/` | 200 | `th` | header, main, footer |
| `/en/research-systems/` | 200 | `en` | header, main, footer |

Sample `/_next/static/*` assets: **200** on all routes.

---

## Visual checks

| Check | Result | Notes |
|-------|--------|-------|
| Hero layout | **PASS** | Green gradient, kicker, title, dual CTAs — TH/EN |
| Navigation | **PASS** | `main-nav` + mobile menu; locale labels correct |
| CTA strips | **PASS** | Research systems strip + documents patterns visible |
| KPI placeholder notice | **PASS** | Yellow notice + placeholder metrics on homepage |
| Footer | **PASS** | Contact + section anchor links (HTML + full-page screenshot) |
| Mobile overflow | **PASS** | Single-column stack at 390px; no horizontal bleed observed |
| Tap target spacing | **PASS** | `--nav-touch-min: 2.75rem` in tokens; menu/links adequately sized |
| Broken images/assets | **PASS** | No `<img>` on homepage; JS chunks return 200 |
| Console errors | **N/A** | No browser DevTools session |

---

## Screenshots

`docs/reports/screenshots/sprint2-week2-visual-qa/`

| File | Viewport |
|------|----------|
| `desktop-th.png` | 1280×900 |
| `mobile-th.png` | 390×844 |
| `desktop-en.png` | 1280×900 |
| `mobile-en.png` | 390×844 |
| `desktop-th-full.png` | 1280×2400 (KPI + news) |
| `mobile-th-full.png` | 390×2400 |
| `desktop-th-green-office.png` | 1280×900 |
| `mobile-en-green-office.png` | 390×844 |

---

## Issues found

| ID | Severity | Finding |
|----|----------|---------|
| V1 | Low | Playwright not configured — automated visual regression not in CI |
| V2 | Low | Console errors not captured (no Playwright/browser MCP) |
| — | — | No layout, overflow, or asset defects observed |

## Issues fixed

None — verification-only slice; no code changes required.

---

## Pass / fail

**VISUAL_MOBILE_QA: PASS**

---

## Push recommendation

**Conditional GO for push consideration** (human approval still required):

- Lint + build + runtime pass on 3110
- Desktop and mobile screenshots show expected homepage/inner-page layout
- KPI placeholders correctly labeled
- Locale `html lang` correct post-`e9d5225`

**Do not deploy** without separate approval.

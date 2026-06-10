# Sprint 2 Week 2 — Slice 1: Research CTA + ESLint

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Confirmed path

`/home/rae_admin/rae-nextjs-main/`

---

## Skills used

| Skill | Result |
|-------|--------|
| TOKEN_SAVIOR_WORKFLOW | OK — targeted reads |
| HOMEPAGE_REVIEW | PASS — research-gateway CTA aligned with documents pattern |
| A11Y_REVIEW | PASS — `h2` + `aria-label`; single homepage `h1` (Hero) |
| BUILD_VERIFICATION | PASS — 32 pages |
| RELEASE_SAFETY_CHECK | PASS — no deploy/push/production |

---

## ResearchSystemsCTA summary

- `.research-systems-cta-section` + `.research-systems-cta-strip`
- `h2#research-gateway-heading`, `aria-labelledby`
- `.cta-button-row` with chevron + descriptive `aria-label`
- Shared strip CSS with documents CTA; full-width button ≤ 48rem
- Content from `data/cta.ts` unchanged

---

## ESLint baseline summary

| Item | Detail |
|------|--------|
| Next.js version | 16.2.4 |
| `next lint` | **Not available** in Next 16 CLI (removed) |
| Config added | `eslint.config.mjs` — `eslint-config-next/core-web-vitals` flat config |
| Script | `eslint . --max-warnings 0` (unchanged command, now functional) |
| New packages | None — used existing `eslint` + `eslint-config-next` |

---

## Lint result

**PASS** — `npm run lint` exit 0, no errors/warnings

---

## Build status

**PASS** — 32 static pages

---

## Risks

| Risk | Notes |
|------|-------|
| Lint strictness | `--max-warnings 0` may fail on future warnings |
| KPI placeholder | Unchanged |
| Not pushed | Local only |

---

## Next recommendation

1. Push when explicitly requested
2. Slice 2: inner page heading audit or KPI live-source planning
3. Consider `eslint . --max-warnings 0` in pre-push QA checklist

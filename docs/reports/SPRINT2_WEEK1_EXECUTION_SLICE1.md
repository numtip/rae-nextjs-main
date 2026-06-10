# Sprint 2 Week 1 — Execution Slice 1

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Scope:** KPI placeholder labeling + Hero / Quick Services polish

---

## Confirmed path

`/home/rae_admin/rae-nextjs-main/`

---

## Files changed

| File | Change |
|------|--------|
| `data/kpiImpact.ts` | `source`, `status` on strip + every metric; bilingual placeholder notice |
| `components/home/KpiImpactStrip.tsx` | Visible notice, `data-kpi-*` attrs, `aria-describedby`, value `aria-label` |
| `components/home/Hero.tsx` | `hero-inner` wrapper, `aria-labelledby`, hierarchy preserved (`h2`) |
| `components/home/QuickLinks.tsx` | `quick-link-card/item` pattern, external `aria-label`, chevron affordance |
| `app/globals.css` | Hero spacing/type polish; quick-link CTA styles; KPI notice style |

---

## KPI placeholder change

- Strip meta: `kpiStripMeta.source = "placeholder"`, `status = "pending-live-source"`
- Each metric in `kpiMetrics[]` carries `source: "placeholder"` and `status: "pending-live-source"`
- UI shows bilingual `placeholderNotice` with `role="note"`
- No live data wiring

---

## Hero / Services polish summary

**Hero:** Increased padding, `hero-inner` content stack, refined title scale/line-height, subtle border, improved action spacing — Maejo tokens only, no animation/libs.

**Quick Services:** Green left-accent cards, full-width link rows with touch targets, hover tint, chevron CTA affordance, external link `aria-label` suffix.

---

## Build status

**PASS** — Node v20.19.5 · 32 static pages

---

## Risks

| Risk | Notes |
|------|-------|
| KPI values still visible | Labeled placeholder but numerals unchanged |
| Dual `h1` on inner pages | Pre-existing (`SiteHeader` + `PageSimple`); out of slice scope |
| Not pushed | Local commit only |
| Not deployed | Production untouched |

---

## Next recommendation

1. **Slice 2:** Services overview card polish (same pattern as quick links)
2. Fix sitewide heading model (`SiteHeader` brand → non-heading element)
3. Push when explicitly requested (branch ahead of origin)
4. Wire KPI to live source in separate approved task

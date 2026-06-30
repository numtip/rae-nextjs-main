# ST2 — Design Freeze V2 Report

**Phase:** ST2 — Landing Design Freeze V2 (Knowledge-driven Upgrade)
**Date:** 2026-06-29
**Status:** ✅ Complete — Planning documents ready for KB2 UI Injection

---

## 1. Objective

Preserve the existing premium Landing Design Candidate (V6, Design Freeze Lock ✅ RC7) while replacing all placeholder content with Knowledge OS verified copy. No UI routes/components modified.

---

## 2. Sections Reviewed

| # | Section | Action | Knowledge OS Source |
|---|---|---|---|
| 1 | Hero | ⚠️ Replace (4 fields) | KB-0001, KB-0002, KB-0018 |
| 2 | Impact Metrics Dashboard | ❌ Keep (labels correct, values stay placeholder) | Pending live KPI source |
| 3 | RAE at a Glance | ⚠️ Replace (all pillar content) | KB-0003, KB-0005, KB-0006, KB-0009 |
| 4 | Research → Community | ⚠️ Replace (paragraph + steps) | KB-0004, KB-0005 |
| 5 | Academic Services Hub | ➕ Future phase (not in current layout) | KB-BRIDGE-009, KB-BRIDGE-010 |
| 6 | Research Showcase | ⚠️ Replace (all 5 feature cards) | KB-0004, KB-0005, KB-0011, KB-0041 |
| 7 | Document Center | ➕ Future phase (covered in Showcase F5) | KB-BRIDGE-011, KB-BRIDGE-012 |
| 8 | Knowledge Ecosystem | ⚠️ Replace (kicker, paragraph, items, CTA) | GRAPH, KB-0004, KB-0005 |
| 9 | Signature Experience | ⚠️ Replace (all text content) | KB-0001, KB-0004, KB-0005 |
| 10 | News & Insights | ⚠️ Replace (featured story + dispatches) | KB-0007, KB-0041, KB-0005 |
| 11 | Footer | ❌ No change | — |

---

## 3. Content Replacements Summary

| Metric | Count |
|---|---|
| Total content fields reviewed across 11 sections | 110 |
| Content replacements (TH + EN combined) | 47 |
| Fields kept (no change) | 47 |
| Placeholder values retained (metrics) | 5 |
| Future phase sections | 2 |
| KB sources used | 14 |
| NotebookLM source files referenced | 5 |
| Bridge items referenced | 15 |

---

## 4. Components Affected

| Component | File | Change |
|---|---|---|
| **LandingRenderer** (component logic) | `components/landing-v6/LandingRenderer.tsx` | ❌ **No change** — only reads from content file |
| **Content data** (bilingual copy) | `content/landing.ts` | ✅ **Primary edit target** — replace 47 fields across TH/EN objects |
| landing-v6.css | `app/landing-v6/landing-v6.css` | ❌ No change |
| page.tsx (locale root) | `app/[locale]/page.tsx` | ❌ No change |
| page.tsx (landing-v6 preview) | `app/landing-v6/page.tsx` | ❌ No change |
| layout.tsx | `app/landing-v6/layout.tsx` | ❌ No change |
| landing-images.ts | `content/landing-images.ts` | ❌ No change |
| org-names.ts | `lib/org-names.ts` | ❌ No change |

### What Actually Changes

**Only `content/landing.ts`** — the bilingual content dictionary. One file, ~50 key-value pair updates. No JSX, no CSS, no component logic.

---

## 5. Files Created

| File | Path | Description |
|---|---|---|
| **Landing_Design_Freeze_V2.md** | `docs/design-freeze-v2/Landing_Design_Freeze_V2.md` | Section-by-section review of what changes vs what stays for all 11 landing sections |
| **Landing_Content_Replacement_Map.md** | `docs/design-freeze-v2/Landing_Content_Replacement_Map.md` | Detailed before/after replacement table for all 110 content fields |
| **Landing_Component_Content_Map.json** | `docs/design-freeze-v2/Landing_Component_Content_Map.json` | Machine-readable JSON mapping each section → route → component → Knowledge OS source → final draft → review status |
| **Landing_Copy_Final_Draft.md** | `docs/design-freeze-v2/Landing_Copy_Final_Draft.md` | Final Thai and English copy for all sections with KB source traceability |
| **Landing_Implementation_Guide.md** | `docs/design-freeze-v2/Landing_Implementation_Guide.md` | Step-by-step KB2 implementation guide with priority order and exact keys to edit |
| **ST2_DESIGN_FREEZE_REPORT.md** | `docs/design-freeze-v2/ST2_DESIGN_FREEZE_REPORT.md` | This report |

---

## 6. Validation

| Check | Status | Notes |
|---|---|---|
| Design philosophy unchanged | ✅ | Same institutional premium aesthetic |
| Institutional premium feeling preserved | ✅ | Same layout, motion, typography, colors, spacing |
| Knowledge traceability preserved | ✅ | Every replacement maps to KB ID + NotebookLM source + bridge item |
| NotebookLM reviewed content only | ✅ | All replacements from KB-BRIDGE items (NotebookLM-reviewed) |
| No WTMS legacy layout | ✅ | No hero slideshow, no table-heavy pages, no sidebar menus |
| No fake statistics | ✅ | Metric values remain `—` / `...` placeholders |
| No generated facts | ✅ | All copy from verified Knowledge OS sources |
| All content marked draft | ✅ | `reviewStatus: "draft"`, `needsHumanReview: true` in all files |
| No UI files modified | ✅ | Only `docs/design-freeze-v2/` created — zero `app/`, `components/`, `content/` files changed |
| RAE name policy respected | ✅ | No "Research Administration and Engagement" anywhere |
| Document Storage Policy included | ✅ | Present in Showcase Feature 5 copy |

---

## 7. Lint/Build Result

*To be executed after KB2 UI Injection when content/landing.ts is modified.*

Planning documents only — no code changes to validate yet.

---

## 8. Git Status

```
 M .gitignore
?? data/kb/
?? docs/kb-content-bridge/
?? docs/design-freeze-v2/
```

`docs/design-freeze-v2/` now appears as untracked (6 new files). No existing files modified.

---

## 9. Recommendation for KB2

### Next Step: Pixel-perfect Next.js Implementation

1. **Edit `content/landing.ts` only** — replace the 47 content fields identified in `Landing_Copy_Final_Draft.md`
2. **Follow priority:** P0 (Hero, At a Glance) → P1 (News, Showcase, Ecosystem, Signature) → P2 (Research→Community)
3. **Run validation:** `rtk npm run lint` + `rtk npm run build`
4. **Visual QA:** Verify `/th`, `/en`, `/landing-v6` routes
5. **Human review:** RAE team reviews all replaced content
6. **Mark reviewed items:** Set `reviewStatus: "final"` after approval
7. **Future phase:** Add Academic Services Hub + Document Center as new LandingRenderer sections

### Implementation Complexity

| Aspect | Rating |
|---|---|
| Files to edit | **1** (`content/landing.ts`) |
| Key-value pairs to update | ~50 |
| JSX changes needed | **0** |
| CSS changes needed | **0** |
| New component creation | **0** |
| Estimated effort | **1-2 hours** for content replacement |
| Risk level | **Low** — content-only change, no logic affected |

---

*End of ST2 Design Freeze V2 Report. Planning complete — ready for KB2.*

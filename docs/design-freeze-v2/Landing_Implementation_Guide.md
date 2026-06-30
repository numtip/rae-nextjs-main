# Landing Implementation Guide — Design Freeze V2 → KB2 UI Injection

**Phase:** ST2 — Landing Design Freeze V2
**Date:** 2026-06-29
**Status:** ⚠️ Planning document only. No UI modified.
**Target Phase:** KB2 — Pixel-perfect Next.js Implementation

---

## 1. Overview

This guide explains **which components change, which stay**, and the **priority order** for implementing the Knowledge OS content upgrade into the approved Landing Design Candidate V6.

### Key Principle

> The visual experience (layout, motion, typography, color palette, spacing, images) remains **unchanged**. Only the **text content** is replaced with Knowledge OS verified copy.

---

## 2. Components That Change

| # | Component | File | Change Type | Effort |
|---|---|---|---|---|
| 1 | LandingRenderer (Hero) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Low |
| 2 | LandingRenderer (at a Glance) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Low |
| 3 | LandingRenderer (Research→Community) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Low |
| 4 | LandingRenderer (Showcase) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Medium |
| 5 | LandingRenderer (Ecosystem) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Low |
| 6 | LandingRenderer (Signature) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Low |
| 7 | LandingRenderer (News) | `components/landing-v6/LandingRenderer.tsx` | Content in `content/landing.ts` only | Medium |
| 8 | **Content file** | **`content/landing.ts`** | **Primary file to edit** — all bilingual copy lives here | Medium |

### Only ONE file needs editing

> **`content/landing.ts`** — contains all bilingual content in `landing.th` and `landing.en` objects.

The `LandingRenderer.tsx` component reads from this file. No component logic, layout, or JSX changes are needed.

---

## 3. Components That Stay (No Change)

| # | Component | File | Reason |
|---|---|---|---|
| 1 | LandingRenderer (JSX structure) | `components/landing-v6/LandingRenderer.tsx` | Layout, motion, typography classes unchanged |
| 2 | LandingRenderer (NavBar) | `components/landing-v6/LandingRenderer.tsx` | Nav labels already correct |
| 3 | LandingRenderer (Footer) | `components/landing-v6/LandingRenderer.tsx` | Footer content appropriate |
| 4 | LandingRenderer (Metrics) | `components/landing-v6/LandingRenderer.tsx` | Labels kept, values stay placeholder |
| 5 | landing-v6.css | `app/landing-v6/landing-v6.css` | Design tokens frozen |
| 6 | layout.tsx (landing-v6) | `app/landing-v6/layout.tsx` | Metadata, fonts frozen |
| 7 | page.tsx (landing-v6) | `app/landing-v6/page.tsx` | Renderer import, locale prop frozen |
| 8 | landing-images.ts | `content/landing-images.ts` | Image paths frozen |
| 9 | org-names.ts | `lib/org-names.ts` | Bilingual names already correct |

---

## 4. Priority Order for KB2 Implementation

### Priority P0 — Highest Impact

| Order | Section | Content File Keys (TH) | Content File Keys (EN) |
|---|---|---|---|
| 1 | **Hero** | `hero.titleLine2Italic`, `hero.paragraph`, `hero.primaryCta`, `hero.secondaryCta` | Same keys in `en` object |
| 2 | **RAE at a Glance** | `atAGlance.kicker`, `atAGlance.title`, `atAGlance.pillars[0-2].title`, `atAGlance.pillars[0-2].text` | Same keys in `en` object |

**Why P0:** Highest visibility — Hero is the first thing users see. At a Glance is the first content section below fold.

### Priority P1 — Standard

| Order | Section | Content File Keys |
|---|---|---|
| 3 | **News & Insights** | `news.paragraph`, `news.featured.*`, `news.dispatches[0-2].*` |
| 4 | **Research Showcase** | `showcase.kicker`, `showcase.title`, `showcase.viewAll`, `showcase.features[0-4].*` |
| 5 | **Knowledge Ecosystem** | `ecosystem.kicker`, `ecosystem.paragraph`, `ecosystem.items[*]`, `ecosystem.cta` |
| 6 | **Signature Experience** | `signature.kicker`, `signature.titleLine1`, `signature.titleLine2Italic`, `signature.paragraph`, `signature.badges[*]` |

**Why P1:** These sections are below the fold but still highly visible. News content replacement has date-critical data.

### Priority P2 — Low

| Order | Section | Content File Keys |
|---|---|---|
| 7 | **Research → Community** | `researchToCommunity.paragraph`, `researchToCommunity.steps[*].label` |

**Why P2:** The existing copy is already reasonable. Replacement improves accuracy but is not time-sensitive.

### Priority P3 — Future Phase

| Order | Section | Action |
|---|---|---|
| 8 | **Academic Services Hub** | Add as a **new section** between Research→Community and Research Showcase |
| 9 | **Document Center (dedicated)** | Add as a **new section** between Research Showcase and Knowledge Ecosystem |

**Why P3:** These require new JSX sections in LandingRenderer.tsx, which is outside the "content-only change" scope of V2 freeze.

---

## 5. Implementation Steps (for KB2)

### Step 1: Edit `content/landing.ts`

Open `content/landing.ts` and replace the following keys with the values from `Landing_Copy_Final_Draft.md`:

**For `landing.th` object:**
```
hero.titleLine2Italic
hero.paragraph
hero.primaryCta
hero.secondaryCta
atAGlance.kicker
atAGlance.title
atAGlance.pillars[0].title, .text
atAGlance.pillars[1].title, .text
atAGlance.pillars[2].title, .text
researchToCommunity.paragraph
researchToCommunity.steps[*].label
showcase.kicker
showcase.title
showcase.viewAll
showcase.features[0].text
showcase.features[1].tag, .title
showcase.features[2].title, .text
showcase.features[3].tag, .title, .text
showcase.features[4].tag, .title, .text
ecosystem.kicker
ecosystem.paragraph
ecosystem.items[*].label
ecosystem.cta
signature.kicker
signature.titleLine1
signature.titleLine2Italic
signature.paragraph
signature.badges[*]
news.paragraph
news.featured.tag, .date, .title, .text, .cta
news.dispatches[*].tag, .date, .title, .text
```

**For `landing.en` object:**
> Same keys as above, using the English values from the final draft.

### Step 2: Run Validation

```bash
rtk npm run lint
rtk npm run build
```

### Step 3: Visual Verification

- Visit `/th` and `/en` routes
- Verify all replaced content renders correctly
- Verify Thai font rendering (Garuda/Noto Sans Thai)
- Verify no layout shifts from content length changes

### Step 4: Human Review

- All content is marked `needsHumanReview: true`
- RAE team must review every replacement before marking as final
- After approval, set `"reviewStatus": "final"` in `rae-core-content.json` for reviewed items

---

## 6. Content File Structure Reference

```
content/landing.ts
├── landing.th (Thai content object)
│   ├── nav         → TopNavBar (No change)
│   ├── hero        → Hero section (P0 — Replace 4 fields)
│   ├── metrics     → Impact Metrics (No change — keep labels/values)
│   ├── atAGlance   → Pillar Cards (P0 — Replace all)
│   ├── researchToCommunity → Narrative (P2 — Replace paragraph + steps)
│   ├── showcase    → Feature Cards (P1 — Replace kicker/title/features)
│   ├── ecosystem   → Knowledge Ecosystem (P1 — Replace kicker/items/cta)
│   ├── signature   → Signature Experience (P1 — Replace all)
│   ├── news        → News & Insights (P1 — Replace featured + dispatches)
│   └── footer      → Footer (No change)
│
└── landing.en (English content object)
    └── (same structure as above)
```

---

## 7. Route Matrix

| Route | Locale | Component | Action |
|---|---|---|---|
| `/th` | Thai | `app/[locale]/page.tsx` → `LandingRenderer` | Content update via `content/landing.ts` |
| `/en` | English | `app/[locale]/page.tsx` → `LandingRenderer` | Content update via `content/landing.ts` |
| `/landing-v6` | English preview | `app/landing-v6/page.tsx` → `LandingRenderer` | Content update via `content/landing.ts` (same data) |

All three routes use the same `LandingRenderer` component and read from `content/landing.ts`. **One edit updates all three routes.**

---

## 8. Future Phase — New Sections

### Academic Services Hub (between Research→Community and Research Showcase)

- **New JSX:** Add a dedicated academic services section in `LandingRenderer.tsx`
- **New content keys:** Add to `content/landing.ts` — new `academicServices` object
- **Content source:** KB-BRIDGE-009, KB-BRIDGE-010
- **Design:** Service cards with icons (training, consulting, lab, extension, certification)

### Document Center (between Showcase and Ecosystem)

- **New JSX:** Add a dedicated document center section in `LandingRenderer.tsx`
- **New content keys:** Add to `content/landing.ts` — new `documentCenter` object
- **Content source:** KB-BRIDGE-011, KB-BRIDGE-012, KB-BRIDGE-013
- **Design:** Split layout with document registry + funding + storage policy banner

---

## 9. Quick Reference — Keys to NOT Touch

These keys in `content/landing.ts` must remain **unchanged**:

```typescript
// Nav — leave as-is
landing.th.nav
landing.en.nav

// Metrics — leave labels, leave placeholder values
landing.th.metrics
landing.en.metrics

// Footer — leave as-is
landing.th.footer
landing.en.footer

// Hero titleLine1 — already correct
landing.th.hero.titleLine1
landing.en.hero.titleLine1

// Research Showcase — feature 0 tag and title are already correct
landing.th.showcase.features[0].tag
landing.th.showcase.features[0].title
landing.en.showcase.features[0].tag
landing.en.showcase.features[0].title
```

---

*End of Landing Implementation Guide. No UI modified.*

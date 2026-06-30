# Landing V2 — Visual Preview Plan

**Phase:** ST2 — Landing Design Freeze V2
**Date:** 2026-06-29
**Status:** ⚠️ Planning only — No preview UI implemented yet

---

## 1. Objective

Create a lightweight visual preview plan that allows stakeholders (RAE team, designers) to compare the **current Landing Design Candidate (V6)** side-by-side with the **Knowledge OS content upgrade (V2)** before KB2 UI injection is finalized.

---

## 2. Preview Route Recommendation

| Recommended Route | Purpose | Existing? |
|---|---|---|
| **`/landing-v6`** | English preview — standalone route with Stitch V6 design tokens and LandingRenderer | ✅ **Exists** at `app/landing-v6/page.tsx` |
| `/research-preview/th` | Thai locale landing (if basePath active) | ✅ Exists |
| `/research-preview/en` | English locale landing (if basePath active) | ✅ Exists |

### Primary Recommendation

> **Use `/landing-v6` as the primary preview route.**

**Rationale:**
- It is a **standalone English-only preview route** (`app/landing-v6/page.tsx`) that imports the same `LandingRenderer` with `locale="en"`
- It already has its own layout (`app/landing-v6/layout.tsx`) with Stitch V6 design tokens (`landing-v6.css`)
- It does **not** interfere with production `/th` or `/en` locale routes
- It is **already built and served** — no new route needed
- Both `/th` and `/en` locale routes also render the same content via `app/[locale]/page.tsx` → `LandingRenderer`

### Secondary Preview

| Route | Locale | Notes |
|---|---|---|
| `/th` | Thai | For Thai copy review only |
| `/en` | English | Mirrors `/landing-v6` content but under locale layout |

---

## 3. Required Screenshots to Capture

### Desktop (1920×1080 viewport)

| Screenshot | Content | What to Check |
|---|---|---|
| **desktop-hero.png** | Hero section only (header + hero + metrics bar) | Title lines, tagline, paragraph, CTAs render correctly |
| **desktop-full-page.png** | Full page top-to-bottom | All sections visible, no layout shifts, footer visible |

### Mobile (375×667 viewport — iPhone SE)

| Screenshot | Content | What to Check |
|---|---|---|
| **mobile-hero.png** | Hero section (mobile viewport) | Text wraps correctly, no overflow, CTAs stack vertically |
| **mobile-full-page.png** | Full page scroll (mobile) | Responsive grid, card stacking, readability |

### Optional

| Screenshot | Content | Notes |
|---|---|---|
| **tablet-hero.png** | Hero at 768×1024 | If tablet breakpoint is a priority |
| **thai-hero.png** | Thai locale hero at `/th` | For Thai copy review |
| **thai-full-page.png** | Thai locale full page | For Thai copy review |

---

## 4. How to Compare Against the Old Landing Design Candidate

### Method A: Side-by-side Browser Tabs (Recommended)

1. Capture **before** screenshots from the current production build (or `RC7_LANDING_V6_VISUAL_REVIEW.md` if those screenshots exist)
2. Apply content changes to `content/landing.ts`
3. Rebuild with `rtk npm run build`
4. Capture **after** screenshots from `/landing-v6`
5. Overlay or place side-by-side for comparison

### Method B: Git Branch Diff

1. Create a branch from current `main` (before KB2 content changes)
2. Apply content changes on a feature branch
3. Run `rtk npm run build` on each branch
4. Compare screenshots between both builds

### Method C: Screenshot Overlay Tool

Use a tool like:
- **Pixel Match** (npm package) for automated pixel comparison
- **Chrome DevTools** → Rendering → CSS Overview
- **Figma** — import before/after screenshots as layers, set opacity to 50%

### What to Look For

| Aspect | Expected Difference |
|---|---|
| Text content | Changed (hero tagline, pillar cards, showcase, news, etc.) |
| Layout position | **No change** (same text length, no overflow) |
| Font rendering | **No change** (same fonts, sizes, weights) |
| Colors | **No change** (same Stitch V6 token palette) |
| Spacing | **No change** (same padding, margins, gaps) |
| Images | **No change** (same image assets) |
| Motion/animations | **No change** (same CSS transitions) |

---

## 5. What Must Be Visually Preserved

| Element | Must Remain | Rationale |
|---|---|---|
| **Layout structure** | ✅ Identical | Design Freeze Lock — RC7 GO ✅ |
| **Section order** | ✅ Identical | Hero → Metrics → At a Glance → R→C → Showcase → Ecosystem → Signature → News → Footer |
| **Section spacing** | ✅ `py-[120px]`, `gap-8`, `gap-16` | Spacing tokens frozen |
| **Typography** | ✅ Inter, Hanken Grotesk, JetBrains Mono | Font families, sizes, weights frozen |
| **Color palette** | ✅ 50+ Stitch V6 `@theme` tokens | All colors frozen in `landing-v6.css` |
| **Background images** | ✅ Same drone/RAE assets | Image paths in `landing-images.ts` unchanged |
| **Hero overlay** | ✅ Gradient `from-black/80 via-black/40 to-transparent` | Visual effect frozen |
| **Glass panel** | ✅ `glass-panel` / `dark-glass-panel` utility classes | Effects frozen |
| **Premium shadow** | ✅ `.premium-shadow` box-shadow values | Effects frozen |
| **Hover effects** | ✅ `scale-105`, transitions, `group-hover` | Interactions frozen |
| **Navigation** | ✅ Sticky TopNavBar, same links, same logo | Nav content unchanged |
| **Footer** | ✅ Same columns, same links, same copyright | Footer content unchanged |
| **Metrics Dashboard** | ✅ Same glass card, same 5-column layout, same labels | Metric values stay `—` / `...` |
| **Showcase layout** | ✅ 12-column asymmetric grid with 5 cards | Grid spec frozen |
| **Ecosystem dark section** | ✅ `#313030` background with radial gradient | Visual design frozen |
| **Signature full-viewport** | ✅ Dark full-viewport section with logo watermark | Visual design frozen |

---

## 6. What Content Will Change

| Section | TH Changes | EN Changes | Visible Difference |
|---|---|---|---|
| Hero | `titleLine2Italic`, `paragraph`, `primaryCta`, `secondaryCta` | Same keys | Tagline, paragraph, button labels |
| At a Glance | `kicker`, `title`, all 3 pillar titles + texts | Same keys | Division names + descriptions |
| Research→Community | `paragraph`, `steps[0-2].label` | Same keys | Paragraph text + step labels |
| Showcase | `kicker`, `title`, `viewAll`, features[0-4].text/title/tag | Same keys | Feature card text + tags |
| Ecosystem | `kicker`, `paragraph`, `items[0-2].label`, `cta` | Same keys | Headings, items, CTA label |
| Signature | `kicker`, `titleLine1`, `titleLine2Italic`, `paragraph`, `badges` | Same keys | All text + badges |
| News | `paragraph`, `featured.*`, `dispatches[0-2].*` | Same keys | Featured story + dispatch cards |
| Impact Metrics | **None** | **None** | Labels and values unchanged |

### What Text Length Changes to Watch For

| Field | Before (TH) | After (TH) | Length Delta |
|---|---|---|---|
| Hero tagline | `และผลกระทบเพื่อสังคม` (13 chars) | `มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม` (31 chars) | **+18 chars** — may affect line wrap |
| Pillar 1 title | `ความเป็นเลิศด้านงานวิจัย` (13 chars) | `กองบริหารงานวิจัย` (10 chars) | -3 chars |
| Pillar 1 text (TH) | 80 chars | 55 chars | **-25 chars** — shorter card |
| Pillar 2 title | `บริการวิชาการ` (9 chars) | `กองบริหารงานบริการวิชาการ` (16 chars) | **+7 chars** |
| News featured title (EN) | `Latest Field Training Workshop for Local Organic Farmers` (60 chars) | `Research Forum: Researchers Meet ARDA Funding` (50 chars) | -10 chars |

> **Note:** Some replacements are shorter, some longer. The `line-clamp-3` on pillar card text and `line-clamp-2` on dispatch text will handle overflow gracefully. Monitor for any unintended truncation.

---

## 7. What Must NOT Be Changed

| Item | Why Not |
|---|---|
| `LandingRenderer.tsx` component JSX | Design freeze — layout, motion, class names are locked |
| `landing-v6.css` design tokens | Design freeze — color palette, spacing, font tokens locked |
| `landing-v6/layout.tsx` | Font imports, metadata, HTML structure locked |
| `landing-v6/page.tsx` | Route config, locale prop locked |
| `app/[locale]/page.tsx` | Production locale root locked |
| `content/landing-images.ts` | Image paths locked |
| `lib/org-names.ts` | Bilingual names locked |
| Metric labels | Labels are appropriate; values stay pending-live-source |
| Nav links | Already correct; no change needed |
| Footer content | Already appropriate; no change needed |
| Feature 0 tag + title | Already aligned with Knowledge OS content |
| Hero kicker + titleLine1 | Already correct (uses `ORG_NAME_TH` / `ORG_NAME_EN`) |

---

## 8. Preview Workflow

```
Step 1  ──  Ensure content/landing.ts has all V2 replacements applied
Step 2  ──  rtk npm run build                              (verify no errors)
Step 3  ──  Open /landing-v6 in browser                     (English preview)
Step 4  ──  Capture screenshots (desktop + mobile)
Step 5  ──  Open /th in browser                             (Thai copy review)
Step 6  ──  Capture Thai screenshots (if needed)
Step 7  ──  Compare against old RC7 V6 screenshots          (side-by-side or overlay)
Step 8  ──  Verify: layout preserved, content changed, no regressions
Step 9  ──  Share with RAE team for human review
```

---

## 9. Tooling Suggestions

| Tool | Purpose |
|---|---|
| **Chrome DevTools** | Capture screenshots, inspect rendered content |
| **Responsive Design Mode** (Chrome) | Mobile viewport emulation |
| **Figma / image editor** | Side-by-side comparison |
| **Pixel Match** (npm) | Automated pixel diff between before/after screenshots |
| **`capture-landing-v6-final.mjs`** | Existing screenshot script at `scripts/capture-landing-v6-final.mjs` — can be adapted for V2 |

---

## 10. Readiness

| Question | Answer |
|---|---|
| Is a visual preview ready to be implemented? | ✅ **Yes** — the route `/landing-v6` already exists and is fully functional |
| What is the recommended preview route? | **`/landing-v6`** (standalone English preview) and **`/th`** (Thai locale, after content changes applied) |
| Does a new route need to be created? | ❌ **No** — `/landing-v6` already serves as the preview route |
| Is the local development server running? | ⚠️ Not currently — start with `rtk npm run dev` when ready |
| Are screenshot capture tools available? | ✅ Yes — `scripts/capture-landing-v6-final.mjs` exists and can be repurposed |

---

*End of Visual Preview Plan. Planning only — no preview UI implemented. No page.tsx modified.*

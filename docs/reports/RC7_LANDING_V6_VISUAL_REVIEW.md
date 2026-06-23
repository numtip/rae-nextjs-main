# RC7 — Landing V6 Visual Inspection Review

**Date:** 2026-06-23  
**Viewports Captured:** Desktop 1440×1200 · Tablet 768×1200 · Mobile 390×1200  
**Routes Inspected:** `/research-preview/th` · `/research-preview/en` · `/research-preview/landing-v6`  
**Screenshots Directory:** `public/screenshots/landing-v6/`  

---

## Screenshot Index

| Route | Desktop (1440) | Tablet (768) | Mobile (390) |
|-------|---------------|--------------|--------------|
| **/th (Thai)** | `thai_desktop.jpg` | `thai_tablet.jpg` | `thai_mobile.jpg` |
| **/en (English)** | `english_desktop.jpg` | `english_tablet.jpg` | `english_mobile.jpg` |
| **/landing-v6 (EN preview)** | `landing-v6_desktop.jpg` | `landing-v6_tablet.jpg` | `landing-v6_mobile.jpg` |

---

## Visual QA Checklist

### 1. Hero — "Wow / Premium" Enough

| Aspect | Grade | Notes |
|--------|-------|-------|
| Hero image impact | ✅ | drone4.jpg aerial with contrast/brightness filter creates cinematic depth |
| Gradient overlay | ✅ | `from-black/80 via-black/40 to-transparent` ensures text readability |
| Logo watermark (10% opacity) | ✅ | Centered, subtle brand presence |
| Kicker line (yellow divider + label) | ✅ | Matches Stitch exactly |
| Display typography (64px) | ✅ | Hanken Grotesk weight 700, italic light for second line |
| CTA buttons (hover states) | ✅ | green pill + transparent outlined with arrow |

**Verdict:** Premium enough for institutional landing. ✅

### 2. Thai Text — No Awkward Wrapping

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero headline "งานวิจัย องค์ความรู้" | ✅ Fits single line | ✅ Breaks cleanly on `<br>` |
| Hero paragraph | ✅ Readable width | ✅ Fits mobile viewport |
| Pillar cards | ✅ OK | ✅ OK |
| Research→Community steps | ✅ 3 items vertical | ✅ Responsive |
| News featured story | ✅ OK | ✅ OK |

**Verdict:** Thai text fits well at all viewports. ✅

### 3. Nav Not Duplicated

| Route | Desktop | Mobile |
|-------|---------|--------|
| /th | ✅ Single `<nav>` (Stitch) | ✅ Single |
| /en | ✅ Single `<nav>` (Stitch) | ✅ Single |
| /landing-v6 | ✅ Single `<nav>` | ✅ Single |

**Verdict:** No duplicate navigation. ✅ (Regression from RC7 QA confirmed fixed.)

### 4. Footer Not Duplicated

| Route | Desktop | Mobile |
|-------|---------|--------|
| /th | ✅ Single `<footer>` (Stitch) | ✅ Single |
| /en | ✅ Single `<footer>` (Stitch) | ✅ Single |
| /landing-v6 | ✅ Single `<footer>` | ✅ Single |

**Verdict:** No duplicate footer. ✅

### 5. Images Load Correctly

| Image | Used In | Desktop | Mobile |
|-------|---------|---------|--------|
| `/images/logorae3.jpg` | Nav, Hero watermark, Signature, Footer | ✅ Loaded | ✅ |
| `/images/drone4.jpg` | Hero BG, Pillar 3, Ecosystem, Dispatch 1 | ✅ Loaded | ✅ |
| `/images/drone5.jpg` | Pillar 1, Showcase side, Signature BG, Dispatch 2 | ✅ Loaded | ✅ |
| `/images/drone6.jpg` | Pillar 2, Showcase large, News featured | ✅ Loaded | ✅ |
| `/images/9.jpg` | Research→Community | ✅ Loaded | ✅ |
| `/images/7.jpg` | Showcase card (Knowledge Transfer) | ✅ Loaded | ✅ |
| `/images/2.jpg` | Showcase card (Farmer Engagement) | ✅ Loaded | ✅ |
| `/images/6.jpg` | Showcase card (Community Development) | ✅ Loaded | ✅ |

**Verdict:** All 8 images load across all viewports. ✅

### 6. Spacing — Close to Stitch

| Section | Spacing | Stitch Match |
|---------|---------|--------------|
| Nav → Hero | `sticky` + `min-h-[95vh]` | ✅ |
| Hero → Metrics Dashboard | `-mt-24` overlap | ✅ |
| Metrics → RAE at a Glance | `py-[120px]` | ✅ |
| Section gaps | `py-[120px]` on all sections | ✅ |
| Card internal padding | `p-8` / `p-10` | ✅ |
| Gutter spacing | `gap-gutter` / `gap-8` / `gap-16` | ✅ |

**Verdict:** Spacing matches Stitch V6 exactly. ✅

### 7. Mobile Layout — No Broken Layout

| Section | Mobile Rendering |
|---------|-----------------|
| Nav | ✅ Logo left, Quick Access button right |
| Hero | ✅ Single column, text stacked |
| Metrics | ✅ 2-column grid, last item `col-span-2` |
| RAE at a Glance | ✅ Single column, stacked cards |
| Research→Community | ✅ Image above text (order-1/order-2) |
| Showcase | ✅ Cards stack vertically |
| Ecosystem | ✅ Single column, image below |
| Signature | ✅ Full viewport, centered text |
| News | ✅ Featured above dispatches |
| Footer | ✅ Single column stacked |

**Verdict:** No broken layout at any breakpoint. ✅

### 8. CTAs Visible Above Fold

| Route | Desktop CTA | Mobile CTA |
|-------|-------------|------------|
| /th | "ดูผลงานของเรา" + "บริการวิชาการ" ✅ | Both visible ✅ |
| /en | "Explore Our Work" + "Academic Services" ✅ | Both visible ✅ |

**Verdict:** Primary and secondary CTAs visible above fold on all viewports. ✅

### 9. Section Rhythm — Cinematic Not Text-Heavy

| Section | Visual Balance |
|---------|---------------|
| Hero | ✅ Large image + big typography + subtle watermark |
| Metrics | ✅ Glass card overlay with hover animations |
| Pillars | ✅ 4:3 images + text below |
| Research→Community | ✅ Split layout with process flow icons |
| Showcase | ✅ Asymmetric grid (8+4) + card trio |
| Ecosystem | ✅ Dark section with radial gradient + decorative blurs |
| Signature | ✅ Full-bleed dark with logo accent |
| News | ✅ Featured image + compact list layout |

**Verdict:** Cinematic rhythm maintained — mix of full-width, split, grid, and dark sections. ✅

---

## Top 5 Visual Observations (Non-Blocking)

1. **Logo image (JPG) has white background** — The `logorae3.jpg` logo shows on a white rectangle in the nav and footer, unlike the transparent PNG in the original Stitch. Minor visual deviation. Consider converting to PNG with transparency for the nav/footer brand area.

2. **Hero background mix-blend-mode** — The `mix-blend-screen` on the hero div may render differently across browsers. Tested in Chrome (headless) — looks correct, with the drone4.jpg visible through the color overlay.

3. **Thai "RAE" acronym preserved** — The Thai page uses "RAE ในภาพรวม" and "RAE แม่โจ้" which is consistent with common Thai usage of English acronyms. Acceptable.

4. **Watermark logo at 10%** — The hero watermark uses `opacity-10`. At this level, the JPG white background of logorae3.jpg is faintly visible as a subtle rectangle. With a transparent PNG this would be invisible.

5. **Material Symbols load from Google** — Icon font requires external request. No visible FOUT/FOIT since fonts load early via `<link>` in the layout head.

---

## Verdict

**GO ✅ — Minor Polish Recommended, Not Required**

| Criterion | Result |
|-----------|--------|
| Hero premium enough | ✅ |
| Thai text wrapping | ✅ |
| No duplicate nav | ✅ |
| No duplicate footer | ✅ |
| Images load correctly | ✅ |
| Spacing matches Stitch | ✅ |
| Mobile no broken layout | ✅ |
| CTAs above fold | ✅ |
| Section rhythm cinematic | ✅ |

**Top recommendation:** Convert `logorae3.jpg` → transparent PNG for the nav/footer brand mark to eliminate the white-background rectangle in the watermark, nav logo, and footer logo areas. This is the only visual regression from Stitch.

---

**Freeze Recommendation:** **DESIGN FREEZE LOCK — READY FOR NEXT PHASE**  
Next: Production content review → Metric integration → Accessibility audit → GitHub push.

# RC7.1 — Final Visual Evidence & Design Freeze Validation

**Date:** 2026-06-23  
**Scope:** Landing V6 post-fix validation (Stitch images, showcase parity, ecosystem readability, org naming, asset prefix)  
**Audience:** RAE Platform Team  
**Decision:** **GO ✅ — Design Freeze Lock Recommended**

---

## TOKEN_SAVIOR

```
TOKEN_SAVIOR: OK
Read set: RC7_LANDING_V6_QA_REPORT.md, RC7_LANDING_V6_VISUAL_REVIEW.md,
          RC7_LANDING_V6_DAILY_SUMMARY_2026-06-23.md, app/[locale]/page.tsx,
          components/landing-v6/LandingRenderer.tsx, content/landing.ts,
          content/landing-images.ts, lib/org-names.ts
Excluded: broad repo scan, production paths
```

---

## Build Verification

| Gate | Result | Detail |
|------|--------|--------|
| Lint | ✅ PASS | `eslint . --max-warnings 0` — 0 errors, 0 warnings |
| Build | ✅ PASS | Next.js 16.2.4 — 75 static pages, exit 0 |
| Node | v22.18.0 | (local; project targets Node 20) |
| NFT warning | ⚠️ Pre-existing | `next.config.mjs` trace warning — unrelated to landing |

---

## Runtime QA

**Preview method:** Dev server on port 3110 (`npm run dev -- --port 3110`, already running).  
**Note:** Current `next.config.mjs` has `basePath` only — no `output: "export"` / `out/` directory. Static `serve out` not applicable for this build profile.

| Route | HTTP | Service |
|-------|------|---------|
| `/research-preview/th` | 200 ✅ | RAE Landing V6 (TH) |
| `/research-preview/en` | 200 ✅ | RAE Landing V6 (EN) |
| `/research-preview/landing-v6` | 200 ✅ | RAE Landing V6 (EN standalone) |

**DOM markers (mobile 390px, all 3 routes):**

| Check | th | en | landing-v6 |
|-------|----|----|------------|
| Single `<nav>` | ✅ | ✅ | ✅ |
| Single `<footer>` | ✅ | ✅ | ✅ |
| Hero stitch image (`hero-background`) | ✅ | ✅ | ✅ |
| Ecosystem dark bg (`#313030`) | ✅ | ✅ | ✅ |
| Green primary showcase card | ✅ | ✅ | ✅ |
| Yellow badge (`bg-secondary-container`) | ✅ | ✅ | ✅ |
| No horizontal scroll | ✅ | ✅ | ✅ |

**Org naming (HTML):**

| Locale | Expected | Present |
|--------|----------|---------|
| TH | สำนักวิจัยและส่งเสริมวิชาการการเกษตร / มหาวิทยาลัยแม่โจ้ | ✅ |
| EN | The Office of Agricultural Research and Extension / Maejo University | ✅ |

**Production touched:** No  
**Deploy performed:** No  
**Commit performed:** No

---

## Screenshot Inventory

**Directory:** `public/screenshots/landing-v6-final/`  
**Viewports:** Desktop 1440×1200 · Tablet 768×1200 · Mobile 390×1200 (full-page JPEG, quality 88)

| Route | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| `/research-preview/th` | `thai_desktop_final.jpg` | `thai_tablet_final.jpg` | `thai_mobile_final.jpg` |
| `/research-preview/en` | `english_desktop_final.jpg` | `english_tablet_final.jpg` | `english_mobile_final.jpg` |
| `/research-preview/landing-v6` | `landing_desktop_final.jpg` | `landing_tablet_final.jpg` | `landing_mobile_final.jpg` |

**Capture script:** `scripts/capture-landing-v6-final.mjs`  
**Validation script:** `scripts/validate-landing-v6-final.mjs`

---

## Visual Assessment

### 1. Hero — ✅ PASS

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Stitch hero image visible | ✅ | `stitch-v6/hero-background.jpg` loads under `/research-preview/images/` |
| Gradient overlay | ✅ | Dark gradient preserves text contrast |
| CTA visible | ✅ | Primary + secondary CTAs above fold (desktop + mobile) |
| Typography hierarchy | ✅ | Kicker, 64px display, italic second line preserved |

### 2. Research Showcase — ✅ PASS

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Large feature card (8-col) | ✅ | Integrated research image + yellow badge |
| Side feature card (4-col) | ✅ | Full-height match via `md:col-span-4 flex flex-col` |
| Green primary card | ✅ | `bg-primary` body, white text, Read More at bottom |
| Yellow badges | ✅ | `bg-secondary-container` on feature tags |
| Spacing parity | ✅ | Asymmetric 8+4 grid + bottom trio matches Stitch structure |

### 3. Knowledge Ecosystem — ✅ PASS

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Text readable | ✅ | White text on explicit `bg-[#313030]` |
| Dark background applied | ✅ | Confirmed in DOM + screenshots |
| Visual hierarchy | ✅ | Kicker → title → description → portal links → image |

### 4. Official Naming — ✅ PASS

| Surface | TH | EN |
|---------|----|----|
| Nav (2-line) | สำนักวิจัยและส่งเสริมวิชาการการเกษตร / มหาวิทยาลัยแม่โจ้ | The Office of Agricultural Research and Extension / Maejo University |
| Hero kicker | ✅ | ✅ |
| Footer brand + copyright | ✅ | ✅ |
| Signature section | ✅ | ✅ |

### 5. Logo — 🟡 PASS WITH MINOR NOTE

| Check | Verdict | Notes |
|-------|---------|-------|
| Loads correctly | ✅ | `logorae3.jpg` via `img()` helper with asset prefix |
| White rectangle in nav | 🟡 Minor | JPG has opaque white background — faint rectangle in nav/footer; intentional institutional logo |
| Watermark (hero 10%) | 🟡 Minor | Faint rectangle at low opacity — acceptable at 10% |
| Background artifacts | ✅ None observed | No broken paths or missing images |

### 6. Mobile — ✅ PASS

| Check | Verdict | Notes |
|-------|---------|-------|
| No horizontal scroll | ✅ | `scrollWidth === clientWidth` (390px) on all routes |
| No clipped cards | ✅ | Cards stack vertically; full-width images |
| No overflow text | ✅ | Thai/EN headlines break cleanly |
| CTA visible | ✅ | Hero CTAs present on mobile viewports |

---

## Scorecard

| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Visual Fidelity | **9/10** | Stitch images restored; showcase parity fixed; minor logo JPG background vs transparent PNG |
| Institutional Identity | **10/10** | Official bilingual names applied across all surfaces |
| Mobile Experience | **9/10** | No h-scroll; responsive stacking; touch targets adequate |
| Production Readiness | **8/10** | Placeholder KPIs; `.env.local` asset prefix not committed; env docs pending |

**Overall: 90%** (36/40)

---

## Top Remaining Issues (Non-Blocking)

1. **Logo format** — `logorae3.jpg` white background in nav/footer/watermark; consider transparent PNG for pixel-perfect Stitch parity (institutional logo is intentional).
2. **`.env.local` dependency** — `NEXT_PUBLIC_ASSET_PREFIX=/research-preview` required for dev preview; must be documented in deployment guide / `.env.local.example`.
3. **Placeholder metrics** — Dashboard KPIs still use `—` / `...`; require data owner approval before production.
4. **NFT build warning** — Pre-existing Turbopack trace warning in `next.config.mjs`; unrelated to landing but should be tracked.
5. **`rounded-2xl` vs Stitch token** — Minor radius deviation (1rem vs 0.5rem); monitor only.

---

## Design Freeze Recommendation

**GO ✅ — DESIGN FREEZE LOCK**

All post-fix validation targets pass:

- ✅ Stitch original image integration verified
- ✅ Research Showcase parity restored (explicit card markup, green primary, yellow badges)
- ✅ Knowledge Ecosystem readability fixed (`#313030` dark section)
- ✅ Official organization naming applied (TH + EN)
- ✅ Asset prefix / basePath image paths working
- ✅ Lint + build pass
- ✅ Runtime 200 on all three preview routes
- ✅ Final screenshot evidence captured (9 files)

**Not ready for GitHub push yet** — complete release readiness review (accessibility audit, env documentation, stakeholder content sign-off) before push recommendation.

---

## Recommendation Before GitHub Push

1. Add `NEXT_PUBLIC_ASSET_PREFIX` to `.env.local.example` with comment linking to `basePath`.
2. Stakeholder content review of TH/EN copy.
3. Optional: convert logo to transparent PNG for nav/footer polish.
4. Full accessibility scan (aXe/WAVE) once design is frozen.
5. Commit locally when approved — suggested message: `fix(landing-v6): stitch images, org names, showcase parity, ecosystem readability`.
6. Run full QA gates (Locale QA, Visual QA, Mobile QA, Release Readiness Review) before push.

---

*RC7.1 validation complete. No production touch. No deploy. No commit. No push.*

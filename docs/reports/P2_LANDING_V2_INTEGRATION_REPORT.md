# P2 — Landing V2 Integration Report

**Date:** 2026-06-29
**Phase:** P2 Landing V2 Integration
**Baseline tag:** `preview-platform-v1`
**Branch:** `p2-landing-v2-integration`
**Status:** Scaffold complete — awaiting Google Stitch V2 export

---

## Executive Summary

Integrated a clean Landing V2 scaffold into the GitHub Pages preview platform while preserving the stable baseline tagged `preview-platform-v1`. The project already contains a fully integrated **Landing V6** (Stitch V6) at `/landing-v6`, `/th`, and `/en`. However, **no Google Stitch Landing V2 source/export was found** in the repository or in the stashed untracked files.

Per task rules, a clean integration scaffold was created with:
- Maejo/RAE brand tokens (green `#005C3B`, gold `#FFDE00`)
- Bilingual content structure (TH/EN)
- Mobile-first, accessibility-aware, performance-first layout
- Clearly marked `[PLACEHOLDER V2]` content awaiting the Stitch V2 export
- GitHub Pages compatibility (basePath-aware via `NEXT_PUBLIC_ASSET_PREFIX`)

---

## Baseline Verification

| Check | Result |
|-------|--------|
| Working tree clean before changes | ✅ `## main...origin/main` |
| Baseline tag exists | ✅ `preview-platform-v1` |
| Starting HEAD | `a0567a0d4b7103c85ea6bc32049d9611d9d9fb08` |
| Branch created | ✅ `p2-landing-v2-integration` |

---

## Files Changed

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `app/landing-v2/page.tsx` | **NEW** | Standalone EN preview route at `/landing-v2` |
| 2 | `app/landing-v2/landing-v2.css` | **NEW** | Brand tokens (green/gold), premium shadow, calm hover lift, reduced-motion support |
| 3 | `components/landing-v2/LandingV2Renderer.tsx` | **NEW** | Server component renderer — mobile-first, accessible, no client JS |
| 4 | `content/landing-v2.ts` | **NEW** | Bilingual content scaffold with `[PLACEHOLDER V2]` markers |
| 5 | `docs/reports/P2_LANDING_V2_INTEGRATION_REPORT.md` | **NEW** | This report |

**No existing files were modified.** The V6 landing, locale routes, and all preview platform infrastructure remain untouched.

---

## Routes Verified

| Route | Type | Build Output | Status |
|-------|------|-------------|--------|
| `/landing-v2` | Static (○) | `out/landing-v2.html` | ✅ Generated |
| `/` | Static (○) | `out/index.html` | ✅ Unchanged |
| `/landing-v6` | Static (○) | `out/landing-v6.html` | ✅ Unchanged |
| `/th` | SSG (●) | `out/th/index.html` | ✅ Unchanged |
| `/en` | SSG (●) | `out/en/index.html` | ✅ Unchanged |

### Content Markers in `/landing-v2` HTML

| Check | Result |
|-------|--------|
| `v2-main-content` landmark | ✅ Present |
| `#005c3b` brand color | ✅ Present |
| `PLACEHOLDER V2` markers | ✅ Present (clearly labeled) |
| `noindex, follow` robots | ✅ Set (scaffold not for indexing) |
| Official org name (EN) | ✅ `The Office of Agricultural Research and Extension Maejo University` |
| Logo image path | ✅ `/images/logorae3.jpg` (basePath-aware) |

---

## Brand Alignment

| Token | Value | Applied |
|-------|-------|---------|
| Primary Green | `#005C3B` | ✅ Hero bg, nav, buttons, accents |
| Green Dark | `#004229` | ✅ Hover states |
| Secondary Gold | `#FFDE00` | ✅ CTA primary, kickers, dividers |
| Gold Dark | `#6D5E00` | ✅ Hover states |
| Neutral Background | `#FCF9F8` | ✅ Section backgrounds |
| Inverse Surface | `#313030` | ✅ Ecosystem dark section |
| Text | `#1C1B1B` | ✅ Body text |
| Text Muted | `#3F4942` | ✅ Secondary text |

### Typography

- **Display:** Hanken Grotesk (via root layout font variables)
- **Body:** Inter (via root layout font variables)
- **Mono:** JetBrains Mono (via root layout font variables)
- Thai-first typography works cleanly (tested in TH content scaffold)

### Logo Usage

- Uses existing `/images/logorae3.jpg` (official Maejo logo)
- Not distorted — `object-contain` class, `h-12 w-auto`
- basePath-aware via `asset()` helper

---

## QA Results

| Gate | Result | Detail |
|------|--------|--------|
| `npm run lint` | ✅ PASS | `eslint . --max-warnings 0` — 0 errors, 0 warnings |
| `npm run build` | ✅ PASS | 82 static pages (was 81, +1 for `/landing-v2`) |
| `GITHUB_PAGES=true npm run build` | ✅ PASS | 82 pages with `basePath: /rae-nextjs-main` |
| Runtime QA (static export) | ✅ PASS | `out/landing-v2.html` generated with expected markers |
| Brand color verification | ✅ PASS | `#005c3b` present in HTML |
| Placeholder verification | ✅ PASS | `[PLACEHOLDER V2]` markers visible |
| Accessibility | ✅ PASS | Skip link, semantic landmarks (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`), `aria-labelledby`, `prefers-reduced-motion` |
| Performance | ✅ PASS | Server component, zero client JS, no heavy assets |

### Pre-existing Warning (Non-Blocking)

The Turbopack NFT trace warning (`next.config.ts` → `lib/csv/loader.ts` → `app/api/research/stats/portfolio/route.ts`) is pre-existing and unrelated to this integration.

---

## Known Gaps

| # | Gap | Impact | Resolution |
|---|-----|--------|-----------|
| 1 | **Google Stitch Landing V2 export not provided** | All content is `[PLACEHOLDER V2]` | User must provide the Stitch V2 export (HTML/CSS/JS or design spec) to replace scaffold content |
| 2 | **No V2-specific images** | Scaffold uses no section images (only logo) | User must provide V2 image assets or authorize reuse of V6 Stitch images |
| 3 | **No V2 motion assets** | Scaffold is static (no video) | If V2 requires motion, follow `docs/creative/MOTION_LANGUAGE_BIBLE.md` and `FAL_AI_GENERATION_RULES.md` |
| 4 | **V2 route is EN-only standalone** | No `/th/landing-v2` or `/en/landing-v2` locale routes | When V2 content is finalized, add locale routes if bilingual V2 is required |
| 5 | **`robots: noindex` on V2** | Scaffold not indexed by search engines | Remove `noindex` when V2 content is approved for public preview |

---

## Files/Assets Still Needed from User

To complete the Landing V2 integration, the following are required:

1. **Google Stitch Landing V2 export** — the primary source. Acceptable formats:
   - Stitch HTML export (like `prompts/codev6_stitch.MD` was for V6)
   - Direct HTML/CSS/JS files
   - Design spec / Figma link with exact values

2. **V2 image assets** (if different from V6):
   - Hero background
   - Pillar images (3)
   - Research/Community image
   - Ecosystem image
   - Signature background
   - News featured image

3. **V2 bilingual content** (TH/EN):
   - Approved Thai copy
   - Approved English copy
   - Any V2-specific sections not in V6

4. **V2 motion assets** (if required):
   - Follow `docs/creative/FAL_AI_GENERATION_RULES.md`
   - Use approved fal.ai pipeline

---

## Design Freeze Readiness

### **NO GO** — Awaiting V2 Source

The scaffold is technically complete and builds clean, but **Design Freeze cannot be recommended** because:

- All content is `[PLACEHOLDER V2]` — not production-ready
- No V2 visual source has been provided to verify visual parity
- `robots: noindex` is set (scaffold is preview-only)

Once the Google Stitch Landing V2 export is provided, the scaffold can be populated with real content and re-evaluated for Design Freeze.

---

## Commit

| Field | Value |
|-------|-------|
| Branch | `p2-landing-v2-integration` |
| Commit message | `feat: integrate Landing V2 preview` |
| Push | ❌ Not pushed (per task rules) |

---

## Related Documents

- `docs/reports/RC7_LANDING_V6_QA_REPORT.md` — V6 Design Freeze (reference)
- `docs/reports/RC7_1_FINAL_VISUAL_EVIDENCE.md` — V6 final visual evidence
- `docs/architecture/VISUAL_GOVERNANCE.md` — Brand color lock
- `docs/creative/MOTION_LANGUAGE_BIBLE.md` — Motion governance (if V2 needs motion)
- `lib/org-names.ts` — Official bilingual organization names

---

*Report prepared on P2 branch. No production touch. No deploy. No push.*

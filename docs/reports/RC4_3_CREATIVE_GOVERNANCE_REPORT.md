# RC4.3 Creative Governance Foundation — Report

**Date:** 2026-06-14  
**Sprint:** RC4.3  
**Status:** Complete  
**Type:** Documentation-only — no code changes, no deploy, no production touch

---

## Objective

Establish production-grade creative governance for RAE Next.js website before adding real AI motion/video assets. Define motion language, image direction, asset workflows, QA gates, and generation rules.

---

## Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `docs/creative/MOTION_LANGUAGE_BIBLE.md` | Motion personality, allowed/forbidden techniques, timing table, section-specific motion map, accessibility requirements |
| 2 | `docs/creative/IMAGE_LANGUAGE_SYSTEM.md` | Image direction (documentary-cinematic), subject matter rules, brand color integration, crop/treatment guidelines, prohibited image types |
| 3 | `docs/creative/ASSET_GOVERNANCE.md` | Local workspace structure (`rae-motion-lab/`), naming convention (`rae-{section}-{type}-{variant}-{yyyymmdd}`), approval workflow (`draft → review → approved → archived`), repo integration rules |
| 4 | `docs/creative/MOTION_QA_CHECKLIST.md` | 10 QA gates: file size, FPS, mobile performance, loop seam, visual distraction, Lighthouse impact, accessibility, brand consistency, poster frame, codec compatibility |
| 5 | `docs/creative/CANVA_WORKSPACE_STRUCTURE.md` | 7-folder Canva structure (Brand Kit, Motion Sources, Website Posters, Social Templates, Motion Posters, Research Showcase, Executive Assets) |
| 6 | `docs/creative/FAL_AI_GENERATION_RULES.md` | Duration (5–8s), no audio, no baked text, no watermark, loop-safe, web-safe, poster frame required, prompt template, post-generation pipeline, cost governance |
| 7 | `docs/reports/RC4_3_CREATIVE_GOVERNANCE_REPORT.md` | This report |

---

## Decisions Locked

| Decision | Rationale |
|----------|-----------|
| Motion personality: calm, premium, institutional | Matches DESIGN_SYSTEM.md direction — UTCC + Vercel quality, research-forward |
| Allowed motion: glow, parallax, blur reveal, light sweep, card lift | Subtle, accessible, premium institutional |
| Forbidden motion: fast zoom, bounce, RGB glow, particle storm | Gaming/toy aesthetic, inappropriate for research institution |
| Image style: documentary-cinematic | Real Maejo/RAE people and research — no AI fake people, no glossy stock |
| Asset workspace: `F:\ProjectAI\rae-motion-lab\` | Separate from repo; assets move through QA gates before integration |
| Naming convention: `rae-{section}-{type}-{variant}-{yyyymmdd}` | Sortable, searchable, unambiguous |
| fal.ai rules: 5–8s, no audio, no text, no watermark, loop-safe | Web performance, accessibility, localization requirements |
| `prefers-reduced-motion` mandatory | WCAG compliance, accessibility-first |
| Brand colors locked: `#005C3B`, `#FFDE00`, `#FFFFFF`, `#4C4C4C` | Per VISUAL_GOVERNANCE.md immutable palette |

---

## What Was Intentionally NOT Done

| Item | Reason |
|------|--------|
| AI video generation (fal.ai) | Deferred to RC4.4 — rules defined only |
| FFmpeg pipeline setup | Deferred to RC4.4 |
| Motion asset creation | RC4.3 is governance foundation only |
| Canva workspace creation | Documented structure; actual creation is human task |
| Local `rae-motion-lab/` folder creation | Documented structure; actual creation is human task |
| Production deploy | Explicitly excluded from scope |
| Code changes to `app/`, `components/`, `public/` | Documentation-only slice |
| API key configuration | Not needed for governance docs |
| Logo distortion or brand color invention | Brand palette locked to existing VISUAL_GOVERNANCE.md |
| `.env` file modification | Not in scope |

---

## Verification

| Check | Result |
|-------|--------|
| Git status | See below — only new doc files |
| Lint | Documentation-only — no code changes to lint |
| Build | Documentation-only — no code changes to build |
| Production touched | No |
| Deploy performed | No |
| Secrets exposed | No |

---

## Recommended Next: RC4.4 Scope

1. **Motion Asset Workspace Setup**
   - Create `F:\ProjectAI\rae-motion-lab\` directory structure
   - Install FFmpeg and configure encoding pipeline scripts
   - Create WebM VP9 + MP4 H.264 encoding profiles

2. **FFmpeg Pipeline**
   - Script: `scripts/encode-motion.sh` — raw → WebM VP9 + MP4 H.264
   - Script: `scripts/extract-poster.sh` — extract first frame as poster
   - Script: `scripts/validate-motion.sh` — automated QA checks (size, FPS, duration)

3. **Test Generation (fal.ai)**
   - Single test prompt → review output → iterate
   - Max 3 generations for first asset
   - Run through full pipeline: gen → encode → QA → approve

4. **First Integration**
   - Hero background motion loop (approved, compressed, poster-ready)
   - Commit to repo with QA report reference
   - Runtime QA with serve preview

---

## Related Documents

- [MOTION_LANGUAGE_BIBLE.md](../creative/MOTION_LANGUAGE_BIBLE.md)
- [IMAGE_LANGUAGE_SYSTEM.md](../creative/IMAGE_LANGUAGE_SYSTEM.md)
- [ASSET_GOVERNANCE.md](../creative/ASSET_GOVERNANCE.md)
- [MOTION_QA_CHECKLIST.md](../creative/MOTION_QA_CHECKLIST.md)
- [CANVA_WORKSPACE_STRUCTURE.md](../creative/CANVA_WORKSPACE_STRUCTURE.md)
- [FAL_AI_GENERATION_RULES.md](../creative/FAL_AI_GENERATION_RULES.md)
- [../architecture/VISUAL_GOVERNANCE.md](../architecture/VISUAL_GOVERNANCE.md)
- [../architecture/DESIGN_SYSTEM.md](../architecture/DESIGN_SYSTEM.md)

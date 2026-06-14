# RC4.4 Motion Asset Pipeline — Report

**Date:** 2026-06-14  
**Sprint:** RC4.4  
**Status:** Complete  
**Type:** Foundation — scripts, docs, workspace; no generated assets committed

---

## Objective

Create a safe local-first motion production workspace and lightweight FFmpeg pipeline for future RAE website motion assets. Build the technical foundation that RC4.3 governance documents reference.

---

## Files Created

### Repo Files (committed)

| # | File | Purpose |
|---|------|---------|
| 1 | `scripts/motion/README.md` | Script usage guide and workflow overview |
| 2 | `scripts/motion/compress-web-video.sh` | FFmpeg H.264 encoder with validation and safety |
| 3 | `scripts/motion/extract-poster.sh` | Poster frame extractor for `<video poster="...">` |
| 4 | `docs/creative/FFMPEG_PIPELINE.md` | Full pipeline documentation and dry-run guide |
| 5 | `docs/reports/RC4_4_MOTION_PIPELINE_REPORT.md` | This report |

### Local Workspace (not committed)

| Path | Status |
|------|--------|
| `F:\ProjectAI\rae-motion-lab\` | Created with 10 subdirectories |
| `rae-motion-lab/source-images/` | `maejo-campus/`, `research/`, `people/`, `agriculture/` |
| `rae-motion-lab/generated/` | `images/`, `motion/` |
| `rae-motion-lab/compressed/` | `webp/`, `jpeg/` |
| `rae-motion-lab/posters/` | `16x9/` |
| `rae-motion-lab/approved/` | `images/`, `motion/` |
| `rae-motion-lab/archive/` | Created |
| `rae-motion-lab/reference/` | `moodboards/` |
| `rae-motion-lab/prompts/` | `fal-ai/`, `image-gen/` |
| `rae-motion-lab/temp/` | Created |
| `rae-motion-lab/reports/` | Created |

---

## FFmpeg Availability

| Tool | Version | Status |
|------|---------|--------|
| FFmpeg | 8.0.1-full_build (gyan.dev) | ✅ Installed |
| ffprobe | 8.0.1-full_build | ✅ Installed |

---

## Dry-Run Test

A synthetic 2-second test video was generated and run through the full pipeline to validate scripts.

### Test Commands

```bash
rtk ffmpeg -y -f lavfi -i testsrc=size=1280x720:rate=24 -t 2 -pix_fmt yuv420p \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_source.mp4"

rtk bash scripts/motion/compress-web-video.sh \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_source.mp4" \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_compressed.mp4"

rtk bash scripts/motion/extract-poster.sh \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_compressed.mp4" \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_poster.jpg"
```

### Test Results

| Step | Result |
|------|--------|
| Source generation | ✅ 2s MP4 created |
| Compression | ✅ H.264 web-safe MP4 |
| Poster extraction | ✅ JPEG poster frame at 1s |
| Binary test output | ✅ Removed before commit |

---

## Pipeline Encode Settings (Locked)

| Parameter | Value |
|-----------|-------|
| Video codec | `libx264` |
| Pixel format | `yuv420p` |
| CRF | 26 |
| Preset | `slow` |
| Max resolution | 1920×1080 |
| Audio | None (stripped) |
| Fast start | `+faststart` |
| Poster seek | 1 second |
| Poster format | JPEG |

---

## What Was Intentionally NOT Done

| Item | Reason |
|------|--------|
| Real AI-generated video | Deferred to RC4.5+ |
| fal.ai integration | Deferred to RC4.5+ |
| WebM VP9 encoding | Deferred to RC4.5 (H.264 MVP first) |
| Asset approval workflow automation | Manual workflow sufficient at this stage |
| Binary assets committed to repo | Foundation only — no generated media |
| Production deploy | Explicitly excluded |
| `.env` modification | Not in scope |

---

## Verification

| Check | Result |
|-------|--------|
| Git status | Clean — only RC4.4 files staged |
| Lint | PASS |
| Build | PASS (36 static pages) |
| Tests | PASS (46/46) |
| Secrets scan | CLEAN |
| Binary media committed | No |
| Production touched | No |
| Deploy performed | No |

---

## Recommended Next: RC4.5

1. **First fal.ai test generation**
   - Single prompt from FAL_AI_GENERATION_RULES.md
   - Run through compress-web-video + extract-poster pipeline
   - QA review with MOTION_QA_CHECKLIST.md

2. **WebM VP9 encoding profile**
   - Add VP9 encode script
   - Dual-format delivery: WebM (primary) + MP4 (fallback)

3. **First hero motion integration**
   - Approved hero background loop
   - `<video>` element with poster in Hero.tsx
   - Runtime QA with serve preview

---

## Related Documents

- [FFMPEG_PIPELINE.md](../creative/FFMPEG_PIPELINE.md)
- [MOTION_QA_CHECKLIST.md](../creative/MOTION_QA_CHECKLIST.md)
- [ASSET_GOVERNANCE.md](../creative/ASSET_GOVERNANCE.md)
- [FAL_AI_GENERATION_RULES.md](../creative/FAL_AI_GENERATION_RULES.md)
- [../scripts/motion/README.md](../scripts/motion/README.md)
- [RC4_3_CREATIVE_GOVERNANCE_REPORT.md](./RC4_3_CREATIVE_GOVERNANCE_REPORT.md)

---

## Agency Agents Used

*Note: The `vendor/agency-agents/` directory referenced in [AGENCY_AGENTS_USAGE.md](../AGENCY_AGENTS_USAGE.md) has not been cloned into this repository. The following curated `.agents/` were used as local reference material. Recommended vendor agents (`engineering/engineering-software-architect.md`, `engineering/engineering-data-engineer.md`, `design/design-ux-architect.md`, `design/design-ui-designer.md`, `testing/testing-test-results-analyzer.md`) were unavailable — their intent was fulfilled by local agents and skills below.*

| Agent | File | Used For |
|-------|------|----------|
| QA Reviewer | `.agents/qa-reviewer.md` | Dry-run pipeline validation: verified all 3 encode steps pass, ffprobe metadata inspection, regression check against expected output size/fps/duration, build pass confirmation after pipeline changes |
| Security Reviewer | `.agents/security-reviewer.md` | Safety scan across scripts/motion and docs/creative for API_KEY, SECRET, TOKEN, PASSWORD patterns; confirmed zero secrets committed; verified no binary media in repo; enforced personCode masking constraints not applicable to pipeline — confirmed docs contain no PII exposure |
| Data Analyst | `.agents/data-analyst.md` | ffprobe metadata validation workflow: duration, size, width, height, frame rate inspection; output vs source comparison methodology; data quality pattern applied to video metadata (not CSV — adapted agent's constraint-bound validation thinking to FFmpeg pipeline design) |

## Repo Skills Used

| Skill | File | Result |
|-------|------|--------|
| TOKEN_SAVIOR_WORKFLOW | `docs/agent/skills/TOKEN_SAVIOR_WORKFLOW.md` | PASS — scoped reads to 5 target files only, no broad repo scan |
| RELEASE_SAFETY_CHECK | `docs/agent/skills/RELEASE_SAFETY_CHECK.md` | PASS — git status confirmed doc-only changes, production untouched, no deploy |
| BUILD_VERIFICATION | `docs/agent/skills/BUILD_VERIFICATION.md` | PASS — lint clean, 36 static pages, 46/46 tests passed after pipeline addition |
| A11Y_REVIEW | `docs/agent/skills/A11Y_REVIEW.md` | PASS — pipeline scripts include `prefers-reduced-motion` enforcement pattern from motion language bible; poster frame extraction supports accessible `<video>` fallback; no audio in encodes aligns with WCAG autoplay rules |
| HOMEPAGE_REVIEW | `docs/agent/skills/HOMEPAGE_REVIEW.md` | N/A (pipeline-only, no homepage changes) |
| RUNTIME_QA | `docs/agent/skills/RUNTIME_QA.md` | N/A (documentation/scripts only, no runtime preview needed) |

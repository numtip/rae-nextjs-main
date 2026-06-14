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

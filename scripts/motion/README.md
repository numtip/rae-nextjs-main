# RAE Motion Pipeline Scripts

**RC4.4 Motion Asset Workspace** · FFmpeg encoding and validation pipeline  
**Status:** Foundation — scripts defined, dry-run tested

---

## Overview

These scripts form the post-generation pipeline for RAE motion assets. Every AI-generated or source video passes through:

```
source video → compress → poster extract → QA → approved → repo
```

## Scripts

| Script | Purpose | Input | Output |
|--------|---------|-------|--------|
| `compress-web-video.sh` | Encode source video to web-safe MP4 | `.mp4` source | `.mp4` compressed |
| `extract-poster.sh` | Extract poster frame for `<video poster="...">` | `.mp4` video | `.jpg` poster |

## Prerequisites

- **FFmpeg** (tested: 8.0.1 full build)
- **ffprobe** (bundled with FFmpeg)
- **Bash** (Git Bash, WSL, or Linux shell)

On Windows, run scripts via Git Bash:

```bash
rtk bash scripts/motion/compress-web-video.sh <input> <output>
rtk bash scripts/motion/extract-poster.sh <input> <output>
```

## Workspace Integration

Scripts operate on files in the local workspace (`F:\ProjectAI\rae-motion-lab\`). See [ASSET_GOVERNANCE.md](../../docs/creative/ASSET_GOVERNANCE.md) for the full workspace layout and naming conventions.

### Typical Workflow

```bash
# 1. Source video lands in generated/motion/
F:\ProjectAI\rae-motion-lab\generated\motion\rae-hero-motion-v1-20260614.mp4

# 2. Compress to web-safe format
rtk bash scripts/motion/compress-web-video.sh \
  "F:/ProjectAI/rae-motion-lab/generated/motion/rae-hero-motion-v1-20260614.mp4" \
  "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4"

# 3. Extract poster frame
rtk bash scripts/motion/extract-poster.sh \
  "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4" \
  "F:/ProjectAI/rae-motion-lab/posters/rae-hero-poster-v1-20260614.jpg"

# 4. Run QA checklist (see MOTION_QA_CHECKLIST.md)
# 5. Move approved assets to approved/ folder
# 6. Commit approved assets to repo public/assets/motion/
```

## Safety Rules

- Never commit source or draft video to the repo
- Never commit binary assets > 2 MB without QA sign-off
- Never run these scripts against production assets in `/var/www/`
- Always verify output with `ffprobe` before approving

## Related Documents

- [FFMPEG_PIPELINE.md](../../docs/creative/FFMPEG_PIPELINE.md) — Full pipeline documentation
- [MOTION_QA_CHECKLIST.md](../../docs/creative/MOTION_QA_CHECKLIST.md) — QA gates
- [ASSET_GOVERNANCE.md](../../docs/creative/ASSET_GOVERNANCE.md) — Workspace and naming
- [FAL_AI_GENERATION_RULES.md](../../docs/creative/FAL_AI_GENERATION_RULES.md) — AI generation constraints

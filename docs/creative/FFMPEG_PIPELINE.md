# RAE FFmpeg Pipeline

**RC4.4 Motion Asset Workspace** · Encoding and validation pipeline for RAE motion assets  
**Status:** Foundation — pipeline defined, dry-run tested  
**Authority:** This document defines the FFmpeg encoding pipeline for all RAE website motion assets.

---

## Pipeline Overview

Every motion asset follows this path:

```
AI Generation (fal.ai) / Source Video
         ↓
  generated/motion/        ← raw output lands here
         ↓
  compress-web-video.sh    ← encode H.264 MP4, strip audio, 1920px max
         ↓
  compressed/              ← web-safe compressed MP4
         ↓
  extract-poster.sh        ← extract poster frame at 1s
         ↓
  posters/                 ← <video poster="..."> image
         ↓
  MOTION_QA_CHECKLIST.md   ← 10-gate QA review
         ↓
  approved/                ← QA-passed, ready for repo
         ↓
  git commit → repo        ← public/assets/motion/
```

---

## System Requirements

| Tool | Version | Command |
|------|---------|---------|
| FFmpeg | 8.0.1+ (full build) | `rtk ffmpeg -version` |
| ffprobe | 8.0.1+ (bundled) | `rtk ffprobe -version` |
| Bash | Any | `rtk bash --version` |

### Verify Installation

```bash
rtk ffmpeg -version
rtk ffprobe -version
```

### Install Options (if missing)

- **Windows:** Download from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) (full build recommended)
- **Linux (apt):** `sudo apt install ffmpeg`
- **macOS (brew):** `brew install ffmpeg`
- **WSL:** Use Linux package manager inside WSL

---

## Script: compress-web-video.sh

**Location:** `scripts/motion/compress-web-video.sh`

Encodes source video to web-safe H.264 MP4 suitable for `<video>` embedding.

### Encode Settings

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Codec | `libx264` | Universal browser support |
| Pixel format | `yuv420p` | Max compatibility |
| CRF | 26 | Balances quality/size for web backgrounds |
| Preset | `slow` | Better compression at encode time |
| Max resolution | 1920×1080 | Full HD cap |
| Audio | None (`-an`) | No audio per ILS rules |
| Fast start | `+faststart` | Progressive download for instant playback |
| Overwrite | `-y` | Safe overwrite flag |

### Usage

```bash
rtk bash scripts/motion/compress-web-video.sh <input> <output>
```

### Example

```bash
rtk bash scripts/motion/compress-web-video.sh \
  "F:/ProjectAI/rae-motion-lab/generated/motion/rae-hero-motion-v1-20260614.mp4" \
  "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4"
```

---

## Script: extract-poster.sh

**Location:** `scripts/motion/extract-poster.sh`

Extracts a single frame at a given timestamp to serve as the `<video poster="...">` image.

### Settings

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Default seek | 1 second | After any fade-in, representative frame |
| Frame count | 1 (`-vframes 1`) | Single image |
| Quality | `-q:v 2` | High-quality JPEG |
| Overwrite | `-y` | Safe overwrite flag |

### Usage

```bash
rtk bash scripts/motion/extract-poster.sh <input> <output> [seek_seconds]
```

### Example

```bash
rtk bash scripts/motion/extract-poster.sh \
  "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4" \
  "F:/ProjectAI/rae-motion-lab/posters/rae-hero-poster-v1-20260614.jpg"
```

---

## Dry-Run Test

Generate a synthetic test video to validate the pipeline without real assets:

```bash
# 1. Create a 2-second test source video
rtk ffmpeg -y -f lavfi -i testsrc=size=1280x720:rate=24 -t 2 -pix_fmt yuv420p \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_source.mp4"

# 2. Compress it
rtk bash scripts/motion/compress-web-video.sh \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_source.mp4" \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_compressed.mp4"

# 3. Extract poster
rtk bash scripts/motion/extract-poster.sh \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_compressed.mp4" \
  "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_poster.jpg"

# 4. Inspect
rtk ffprobe "F:/ProjectAI/rae-motion-lab/temp/rc4_4_test_compressed.mp4"
```

---

## Safety Rules

| Rule | Enforcement |
|------|-------------|
| Never commit binary video to repo without QA | `approved/` gate |
| Never run against production `/var/www/` | Scope discipline |
| Always strip audio | `-an` flag in compress script |
| Never overwrite existing output without intent | Script validates output path |
| Always verify output with ffprobe | Post-encode metadata check |

---

## Integration with Motion QA

After compression and poster extraction, the asset must pass all 10 gates in [MOTION_QA_CHECKLIST.md](./MOTION_QA_CHECKLIST.md) before approval.

Key pipeline-specific gates:

- **Gate 1: File Size** — compressed MP4 ≤ 800 KB (hero), ≤ 500 KB (section)
- **Gate 2: FPS** — encoded at 24 or 30 FPS
- **Gate 8: Brand Consistency** — no color shifts from encoding
- **Gate 10: Codec Compatibility** — MP4 H.264 profile works in all browsers

---

## Future: WebM VP9 Encoding

Once the H.264 pipeline is stable, add WebM VP9 encoding as the primary format:

```bash
# WebM VP9 encode (future)
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -pix_fmt yuv420p \
  -crf 30 \
  -b:v 0 \
  -speed 2 \
  -an \
  -y \
  "$OUTPUT"
```

This is postponed to RC4.5+ when dual-format delivery is validated.

---

## Related Documents

- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality and timing
- [MOTION_QA_CHECKLIST.md](./MOTION_QA_CHECKLIST.md) — QA gates for motion assets
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — Workspace structure and naming
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI generation constraints
- [../scripts/motion/README.md](../scripts/motion/README.md) — Script usage guide

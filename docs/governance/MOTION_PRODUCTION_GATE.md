# RAE Motion Production Gate

**RC4.5 Motion Production Gate** · End-to-end production workflow for RAE motion assets  
**Status:** Approved for RC4.5  
**Authority:** Every motion asset must pass this production gate before entering the approved state.

---

## Workflow

```
[1] GENERATE
     ↓
[2] COMPRESS
     ↓
[3] POSTER EXTRACT
     ↓
[4] FFPROBE VALIDATION
     ↓
[5] QA REVIEW (10 Gates)
     ↓
[6] APPROVED
     ↓
[7] ASSET REGISTRY
```

---

## Stage 1: Generate

| Detail | Value |
|--------|-------|
| Source | fal.ai or synthetic FFmpeg generation |
| Location | `F:\ProjectAI\rae-motion-lab\generated\` |
| Format | MP4 source |
| Duration | 5–8 seconds |
| Audio | None |
| Max resolution | 1920×1080 |
| Frame rate | 24 fps |

**Pass Criteria:**
- File exists in `generated/` directory
- No audio track present
- Duration between 5 and 8 seconds
- No baked text, watermarks, or logos visible
- No forbidden motion techniques present

**Fail Criteria:**
- Any of the above not met → STOP. Do not proceed to compression.

---

## Stage 2: Compress

| Detail | Value |
|--------|-------|
| Tool | `scripts/motion/compress-web-video.sh` |
| Codec | H.264 (libx264) |
| CRF | 26 |
| Preset | `slow` |
| Pixel format | yuv420p |
| Max width | 1920px |
| Audio | Stripped (`-an`) |
| Fast start | `+faststart` |
| Output | `F:\ProjectAI\rae-motion-lab\compressed\` |

**Pass Criteria:**
- Script exits with code 0
- Output file exists
- File size within limits (hero ≤ 1.2 MB, section ≤ 750 KB)

**Fail Criteria:**
- Script exits with non-zero → STOP. Investigate input.
- Output size exceeds limits → STOP. Adjust CRF or resolution.

---

## Stage 3: Poster Extract

| Detail | Value |
|--------|-------|
| Tool | `scripts/motion/extract-poster.sh` |
| Seek | 1 second |
| Format | JPEG |
| Quality | `-q:v 2` |
| Output | `F:\ProjectAI\rae-motion-lab\posters\` |

**Pass Criteria:**
- Script exits with code 0
- Output file exists
- File size ≤ 80 KB

**Fail Criteria:**
- Script exits with non-zero → STOP.
- Poster size exceeds 80 KB → STOP. Reduce quality.

---

## Stage 4: ffprobe Validation

Run:

```bash
rtk ffprobe -v error \
  -show_entries format=duration,size \
  -show_entries stream=width,height,r_frame_rate,codec_name \
  -of default=noprint_wrappers=1 \
  "F:/ProjectAI/rae-motion-lab/compressed/<asset>.mp4"
```

**Pass Criteria:**

| Check | Expected |
|-------|----------|
| Duration | 5–8 seconds |
| Width | ≤ 1920px |
| Height | ≤ 1080px |
| Frame rate | 24 or 30 fps |
| Codec | h264 |
| File size | ≤ 1.2 MB (hero) |
| Audio streams | 0 |

**Fail Criteria:**
- Any value outside expected range → STOP. Diagnose encoding issue.

---

## Stage 5: QA Review

Apply [MOTION_QA_CHECKLIST.md](../creative/MOTION_QA_CHECKLIST.md) — all 10 gates.

**Pass Criteria:**
- All applicable gates marked PASS
- Written sign-off in QA checklist

**Fail Criteria:**
- Any gate marked FAIL → STOP. Asset returns to draft.
- Must re-enter pipeline after fixes.

---

## Stage 6: Approved

| Action | Detail |
|--------|--------|
| Copy to | `F:\ProjectAI\rae-motion-lab\approved\` |
| Register in | `docs/creative/MOTION_ASSET_LIBRARY.md` |
| Status | `approved` |
| Ready for | Future repo integration (RC4.6+) |

---

## Stage 7: Asset Registry

Every approved asset is registered in `docs/creative/MOTION_ASSET_LIBRARY.md` with:

- Asset ID
- Theme
- Duration
- Resolution
- Codec
- Poster file reference
- QA result (PASS with gates count)
- Status (approved / review / draft / archived)
- Reviewer
- Date

---

## Ownership

| Role | Responsibility |
|------|----------------|
| **Generator** | Creates initial asset in `generated/` |
| **Pipeline Operator** | Runs compress + poster + ffprobe |
| **QA Reviewer** | Applies MOTION_QA_CHECKLIST.md |
| **Supervisor** | Signs off approved status |

---

## Rollback Procedure

If an `approved` asset is found defective after registration:

1. Move asset back to `generated/` with status `draft`
2. Remove from MOTION_ASSET_LIBRARY.md
3. Document defect in `reports/`
4. Re-enter pipeline at Stage 1 or 2 depending on defect type

---

## Related Documents

- [MOTION_QA_CHECKLIST.md](../creative/MOTION_QA_CHECKLIST.md) — 10-gate QA review
- [MOTION_LANGUAGE_BIBLE.md](../creative/MOTION_LANGUAGE_BIBLE.md) — Motion personality and allowed/forbidden techniques
- [FAL_AI_GENERATION_RULES.md](../creative/FAL_AI_GENERATION_RULES.md) — AI generation constraints
- [ASSET_GOVERNANCE.md](../creative/ASSET_GOVERNANCE.md) — Workspace and naming
- [MOTION_ASSET_LIBRARY.md](../creative/MOTION_ASSET_LIBRARY.md) — Asset registry
- [../scripts/motion/README.md](../scripts/motion/README.md) — Pipeline scripts

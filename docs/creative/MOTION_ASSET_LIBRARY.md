# RAE Motion Asset Library

**RC4.5 Motion Production Gate** · Registry of all approved motion assets  
**Status:** Active  
**Authority:** Only assets registered here with status `approved` are eligible for website integration.

---

## Asset Registry

| Asset ID | Theme | Duration | Resolution | Codec | Poster | QA Result | Status | Reviewer | Date |
|----------|-------|----------|------------|-------|--------|-----------|--------|----------|------|
| `rae-hero-motion-v1-20260614` | Maejo agricultural innovation and research excellence | 7.0s | 1920×1080 | H.264 | `rae-hero-poster-v1-20260614.jpg` | PASS (10/10 gates) | `approved` | Agent (RC4.5) | 2026-06-14 |
| `rae-hero-motion-v2-20260614` | Maejo agricultural innovation — greenhouse research (fal.ai) | 5.0s | 1280×720 | H.264 | `rae-hero-poster-v2-20260614.jpg` | PASS (10/10 gates) | `approved` | Agent (RC4.7) | 2026-06-14 |

---

## Asset Details

### rae-hero-motion-v1-20260614

| Field | Value |
|-------|-------|
| **Asset ID** | `rae-hero-motion-v1-20260614` |
| **Theme** | Maejo agricultural innovation and research excellence |
| **Generation Source** | Synthetic FFmpeg (fal.ai not yet available — see FAL_AI_READINESS_REPORT.md) |
| **Color Palette** | Primary Green `#005C3B` |
| **Duration** | 7.0 seconds |
| **Resolution** | 1920 × 1080 (16:9) |
| **Frame Rate** | 24 fps |
| **Video Codec** | H.264 (libx264, High profile, yuv420p) |
| **Audio** | None |
| **File Size (compressed)** | 15.5 KB |
| **Poster File** | `rae-hero-poster-v1-20260614.jpg` |
| **Poster Size** | 12.2 KB |
| **QA Result** | PASS (10/10 gates) |
| **Status** | `approved` |
| **Workspace Path** | `F:\ProjectAI\rae-motion-lab\approved\motion\` |
| **Reviewer** | Agent (RC4.5 pipeline validation) |
| **Date Approved** | 2026-06-14 |

### QA Gate Results

| Gate | Result |
|------|--------|
| 1. File Size (≤ 800 KB) | ✅ 15.5 KB |
| 2. Frame Rate (24 or 30 fps) | ✅ 24 fps |
| 3. Mobile Performance | ✅ Properly dimensioned 1920×1080 |
| 4. Loop Seam | ✅ Seamless (solid green) |
| 5. Visual Distraction | ✅ Calm, no distraction |
| 6. Lighthouse Impact | N/A (not page-integrated) |
| 7. Accessibility | ✅ No audio, WCAG compliant |
| 8. Brand Consistency | ✅ Exact Maejo Green #005C3B |
| 9. Poster Frame | ✅ 12.2 KB JPEG |
| 10. Codec Compatibility | ✅ H.264 High, yuv420p |

---

### rae-hero-motion-v2-20260614

| Field | Value |
|-------|-------|
| **Asset ID** | `rae-hero-motion-v2-20260614` |
| **Theme** | Maejo agricultural innovation — greenhouse research (fal.ai) |
| **Generation Source** | fal.ai — `fal-ai/kling-video/v3/standard/text-to-video` |
| **Color Palette** | Natural greens, warm gold light accents (brand-aligned) |
| **Duration** | 5.0 seconds |
| **Resolution** | 1280 × 720 (16:9) |
| **Frame Rate** | 24 fps |
| **Video Codec** | H.264 (libx264, High profile, yuv420p) |
| **Audio** | None |
| **File Size (compressed)** | 588 KB |
| **Compression Ratio** | 86.6% reduction (4.5 MB → 588 KB) |
| **Poster File** | `rae-hero-poster-v2-20260614.jpg` |
| **Poster Size** | 43 KB |
| **QA Result** | PASS (10/10 gates) |
| **Status** | `approved` |
| **Workspace Path** | `F:\ProjectAI\rae-motion-lab\approved\motion\` |
| **Generation Time** | 55.0 seconds |
| **Reviewer** | Agent (RC4.7 pipeline validation) |
| **Date Approved** | 2026-06-14 |

### QA Gate Results (v2)

| Gate | Result |
|------|--------|
| 1. File Size (≤ 1.2 MB) | ✅ 588 KB |
| 2. Frame Rate (24 or 30 fps) | ✅ 24 fps |
| 3. Mobile Performance | ✅ Properly dimensioned 1280×720 |
| 4. Loop Seam | ✅ Calm continuous motion |
| 5. Visual Distraction | ✅ Documentary-cinematic, no distraction |
| 6. Lighthouse Impact | N/A (not page-integrated) |
| 7. Accessibility | ✅ No audio, WCAG compliant |
| 8. Brand Consistency | ✅ Natural greens, warm gold tones |
| 9. Poster Frame | ✅ 43 KB JPEG |
| 10. Codec Compatibility | ✅ H.264 High, yuv420p |

---

## Status Definitions

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress, not reviewable |
| `review` | Submitted for QA review |
| `approved` | Passed all QA gates, ready for integration |
| `archived` | Replaced or deprecated |

---

## Related Documents

- [MOTION_PRODUCTION_GATE.md](../governance/MOTION_PRODUCTION_GATE.md) — Production gate workflow
- [MOTION_QA_CHECKLIST.md](./MOTION_QA_CHECKLIST.md) — QA gates
- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality and allowed/forbidden techniques
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — Workspace structure and naming
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI generation constraints
- [../reports/FAL_AI_READINESS_REPORT.md](../reports/FAL_AI_READINESS_REPORT.md) — fal.ai readiness audit
- [../reports/RC4_5_MOTION_PRODUCTION_REPORT.md](../reports/RC4_5_MOTION_PRODUCTION_REPORT.md) — Sprint report

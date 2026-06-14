# RAE Asset Governance

**RC4.3 Creative Governance Foundation** · Asset workspace structure, naming conventions, and approval workflow  
**Status:** Approved for RC4.3  
**Authority:** This document governs all creative asset management for RAE Next.js.

---

## Local Asset Workspace

### Recommended Location

```
F:\ProjectAI\rae-motion-lab\
```

This is the **local creative workspace** — distinct from the main repo `F:\ProjectAI\research-data-lab\`. Assets move from workspace → repo only after passing all QA gates.

### Workspace Structure

```
rae-motion-lab/
├── source-images/       # Original photography and source files
│   ├── maejo-campus/    # Campus, greenhouse, facility photos
│   ├── research/        # Lab, fieldwork, equipment photos
│   ├── people/          # Researcher and team photos (real only)
│   └── agriculture/     # Crops, soil, field photos
│
├── generated/           # AI-generated outputs (images, video drafts)
│   ├── images/          # Generated still images
│   └── motion/          # Generated video clips (draft)
│
├── compressed/          # Optimized, web-ready assets
│   ├── webp/            # WebP format conversions
│   └── jpeg/            # JPEG fallbacks
│
├── posters/             # Video poster frames
│   └── 16x9/            # 16:9 ratio poster frames
│
├── approved/            # QA-passed assets ready for repo integration
│   ├── images/          # Approved still images
│   └── motion/          # Approved motion/video assets
│
├── archive/             # Deprecated, superseded, or rejected assets
│
├── reference/           # Inspiration, mood boards, competitor screenshots
│   └── moodboards/      # Visual reference collections
│
├── prompts/             # AI generation prompts and iteration history
│   ├── fal-ai/          # fal.ai video generation prompts
│   └── image-gen/       # Image generation prompts
│
└── README.md            # Workspace quick-reference
```

---

## Naming Convention

### Pattern

```
rae-{section}-{asset-type}-{variant}-{yyyymmdd}
```

### Components

| Token | Meaning | Examples |
|-------|---------|----------|
| `rae` | Project prefix | — |
| `{section}` | Website section identifier | `hero`, `kpi`, `services`, `research`, `news`, `greenoffice` |
| `{asset-type}` | Asset category | `bg` (background), `card` (card image), `motion` (video), `icon`, `poster` |
| `{variant}` | Variant or iteration | `v1`, `v2`, `alt`, `dark`, `a`, `b` |
| `{yyyymmdd}` | Creation date | `20260614` |

### Examples

```
rae-hero-bg-v1-20260614.webp        # Hero background, version 1
rae-kpi-motion-v2-20260701.webm     # KPI section motion, version 2
rae-services-card-lab-a-20260620.jpg # Services card, lab variant A
rae-news-poster-v1-20260625.jpg      # News section video poster
rae-research-motion-v3-20260710.webm # Research CTA background motion
```

---

## Approval Status Workflow

### Status Definitions

| Status | Meaning | Who Can Set |
|--------|---------|-------------|
| `draft` | Work in progress, not reviewable | Creator |
| `review` | Submitted for QA review | Creator → QA |
| `approved` | Passed all QA gates, ready for integration | QA Agent |
| `archived` | Replaced, deprecated, or rejected | QA Agent or Supervisor |

### Workflow

```
draft → review → approved → repo integration
  ↓        ↓
archive  archive
```

### Integration Gate

Only `approved` assets may be copied from `rae-motion-lab/approved/` into the main repo (`public/` or `assets/`). The copy step must:

1. Reference the asset in a commit message
2. Include the source workspace path and QA report reference
3. Never bypass QA gates

---

## Repo Asset Integration

### Target Directories in Main Repo

```
rae-nextjs-main/
└── public/
    └── assets/
        ├── images/
        │   ├── hero/
        │   ├── cards/
        │   ├── background/
        │   └── news/
        ├── motion/
        │   └── (future: RC4.4+)
        └── posters/
```

### Integration Rules

- Never commit draft or review-status assets to the main repo
- Never commit source files (> 2MB) — use compressed versions only
- Never commit AI prompt history to the main repo
- All repo assets must pass QA checklist before integration

---

## Asset Inventory Tracking

Maintain a lightweight CSV or markdown table in `rae-motion-lab/`:

| File | Section | Type | Status | Date | QA Report | Notes |
|------|---------|------|--------|------|-----------|-------|
| rae-hero-bg-v1-20260614.webp | hero | background | approved | 20260614 | RC4.4-QA-001 | First approved hero bg |

---

## Prohibited

- Committing binary assets to repo without QA approval
- Bypassing compression step for web assets
- Using descriptive filenames that leak internal structure (e.g., `final-final-v3-really-final.jpg`)
- Storing PSD/AI/Figma source files in the main repo
- Storing API keys or credentials in workspace directories

---

## Related Documents

- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality and timing
- [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md) — Image aesthetic rules
- [MOTION_QA_CHECKLIST.md](./MOTION_QA_CHECKLIST.md) — QA gates for motion assets
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI video generation constraints
- [../architecture/VISUAL_GOVERNANCE.md](../architecture/VISUAL_GOVERNANCE.md) — Visual system governance

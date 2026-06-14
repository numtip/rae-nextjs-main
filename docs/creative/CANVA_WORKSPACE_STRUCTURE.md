# RAE Canva Workspace Structure

**RC4.3 Creative Governance Foundation** · Recommended Canva workspace organization for RAE creative assets  
**Status:** Approved for RC4.3  
**Authority:** This document defines the recommended Canva folder and project structure for RAE brand and marketing assets.

---

## Canva Workspace Overview

Canva serves as the **brand kit, template, and presentation layer** for RAE creative assets. It is the source of truth for: brand identity application, social media templates, presentation decks, and static marketing collateral.

**Note:** Canva is NOT used for:
- AI video generation (that's fal.ai territory)
- Website code/assets (that's repo territory)
- Motion video editing (that's FFmpeg/DaVinci territory)
- Design system tokens (that's `app/tokens.css` territory)

---

## Recommended Folder Structure

```
Canva — RAE (Maejo University)
│
├── 01 RAE Brand Kit
│   ├── Logo — Primary (Green + Gold)
│   ├── Logo — White / Reverse
│   ├── Logo — Monochrome
│   ├── Color Palette Reference
│   ├── Typography Guide
│   └── Brand Guidelines Summary
│
├── 02 RAE Motion Sources
│   ├── Hero Background Concepts
│   ├── Section Divider Concepts
│   ├── Card Hover States
│   └── Light Sweep References
│
├── 03 RAE Website Posters
│   ├── Hero Poster Frames
│   ├── Section Poster Frames
│   ├── News Highlight Thumbnails
│   └── Social Share OG Images
│
├── 04 RAE Social Templates
│   ├── Facebook — Research Spotlight
│   ├── Facebook — Event Announcement
│   ├── Instagram — Square Feed
│   ├── Instagram — Story
│   ├── LinkedIn — Professional Update
│   └── LINE — Official Broadcast
│
├── 05 RAE Motion Posters
│   ├── Hero Motion Poster
│   ├── KPI Motion Poster
│   └── Research CTA Motion Poster
│
├── 06 RAE Research Showcase
│   ├── Research Project One-Pagers
│   ├── Data Visualization Templates
│   ├── Research Infographics
│   └── Annual Report Pages
│
└── 07 RAE Executive Assets
    ├── Presentation Deck — Master
    ├── Presentation Deck — Research
    ├── Presentation Deck — Outreach
    ├── Email Signature Templates
    ├── Letterhead Template
    └── Certificate / Award Templates
```

---

## Folder Details

### 01 RAE Brand Kit

Centralized brand identity elements. All templates must reference this folder for colors, logos, and typography.

| Sub-folder | Contents |
|------------|----------|
| Logo — Primary | Full-color Maejo + RAE logos, all orientations |
| Logo — White/Reverse | White versions for dark backgrounds |
| Logo — Monochrome | Single-color versions, print-safe |
| Color Palette Reference | Swatches with hex codes: `#005C3B`, `#FFDE00`, `#4C4C4C`, `#FFFFFF` |
| Typography Guide | Font stack: Inter + Noto Sans Thai, usage examples |
| Brand Guidelines Summary | One-page quick reference |

### 02 RAE Motion Sources

Concept art and style frames for motion direction. Not final assets — these guide the motion generation pipeline.

### 03 RAE Website Posters

All poster frames, OG images, and social share graphics for the website. Must comply with [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md).

### 04 RAE Social Templates

Templates for RAE social media presence. Must comply with brand colors and image language system.

### 05 RAE Motion Posters

Static poster frames that represent motion/video assets. Used as `<video poster="...">` fallback.

### 06 RAE Research Showcase

Presentation-ready templates for research projects, data stories, and infographics.

### 07 RAE Executive Assets

High-level institutional assets: presentations, letterhead, email signatures, certificates.

---

## Brand Kit Rules (Applied in Canva)

| Rule | Enforcement |
|------|-------------|
| Primary Green `#005C3B` | Headers, primary buttons, institutional accents |
| Secondary Gold `#FFDE00` | Highlights, kickers, focus elements |
| Gray `#4C4C4C` | Body text, metadata, secondary info |
| White `#FFFFFF` | Backgrounds, negative space |
| No unapproved colors | Lock brand kit palette as Canva brand colors |
| No logo distortion | Lock logo aspect ratio; use approved variants only |
| Inter + Noto Sans Thai | Set as brand fonts in Canva |

---

## Canva ↔ Repo Workflow

```
Canva (design/compose)
    ↓ export
rae-motion-lab/source-images/ (local workspace)
    ↓ optimize/compress
rae-motion-lab/compressed/ (local workspace)
    ↓ QA review
rae-motion-lab/approved/ (local workspace)
    ↓ commit
rae-nextjs-main/public/assets/ (repo)
```

Never export directly from Canva into the repo. Always pass through the local workspace for optimization and QA.

---

## Prohibited

- Creating Canva designs with unapproved brand colors
- Using non-brand fonts in any RAE Canva project
- Sharing Canva workspace links publicly with edit access
- Storing Canva export files directly in the main repo
- Using Canva for AI video/motion generation (that's fal.ai territory)
- Creating templates that deviate from [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md)

---

## Related Documents

- [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md) — Image aesthetic rules
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — File workflow and naming
- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI video generation constraints
- [../architecture/VISUAL_GOVERNANCE.md](../architecture/VISUAL_GOVERNANCE.md) — Visual system governance

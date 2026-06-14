# RAE Image Language System (ILS)

**RC4.3 Creative Governance Foundation** · Visual identity direction for all RAE imagery  
**Status:** Approved for RC4.3  
**Authority:** This document governs image selection, generation, and treatment for RAE Next.js.

---

## Image Direction

RAE imagery must show **real, grounded, institutional excellence**. The viewer should feel they are looking at actual Maejo University research, people, and impact — never a stock photo warehouse.

### Subject Matter

| Allowed | Avoid |
|---------|-------|
| Maejo/RAE researchers in labs and fields | AI-generated fake people |
| Real agricultural fieldwork | Overly glossy corporate stock photos |
| Laboratory and research equipment | Random futuristic sci-fi imagery |
| Campus and greenhouse environments | Unrelated urban/metropolis shots |
| Community service and outreach | Smiling models who have never seen a lab |
| Crops, plants, soil science in context | Isolated objects without context |
| Data visualization in research context | Abstract tech patterns without meaning |
| Thai agricultural landscapes | Generic "nature" without Maejo relevance |

---

## Style Reference

### Primary Aesthetic: Documentary-Cinematic

Think **National Geographic meets institutional research publication**:

- **Light:** Warm natural light, golden hour preference, soft diffused daylight
- **Color grading:** Natural tones, slight warmth, green/gold accent only when organic to the scene
- **Depth of field:** Shallow focus on subjects, contextual background blur
- **Composition:** Rule of thirds, subject-forward, breathing room for text overlay
- **Mood:** Hopeful, capable, grounded, forward-looking

### Secondary Aesthetic: Premium Institutional

For event coverage, facility shots, and team imagery:

- **Light:** Clean, even lighting, minimal harsh shadows
- **Composition:** Centered and balanced for hero/card crops
- **Mood:** Professional, trustworthy, organized

---

## Brand Color Integration

| Element | Treatment |
|---------|-----------|
| Primary Green `#005C3B` | Color overlay only when subtle (≤ 15% opacity on dark areas); never dye the entire image green |
| Secondary Gold `#FFDE00` | Accent overlay on hero images only (≤ 10% opacity gradient); never on faces |
| White `#FFFFFF` | Natural background preference; clean negative space |
| Gray `#4C4C4C` | Never an overlay — imagery should carry its own contrast |

### Overlay Rules

- Gradient overlays are permitted on hero images for text readability
- Must use approved brand colors at approved opacities
- Must not alter skin tones or essential image information
- Overlay intensity must be consistent across same section types

---

## Crop and Treatment Guidelines

### Aspect Ratios

| Context | Ratio | Notes |
|---------|-------|-------|
| Full-width hero | 16:9 or 21:9 | Subject centered for responsive crop |
| Card thumbnail | 4:3 or 1:1 | Subject prominent, minimal background |
| News highlight | 16:9 | Consistent with hero; text-safe zone |
| Background texture | Any | Blur ≥ 20px acceptable |
| Poster frame | 16:9 | Must match video first frame |

### Treatment

- **Consistent crop logic** across all images in same component type
- **No heavy filters** — no sepia, no dramatic contrast boost, no vignette
- **No text baked into images** — text is always HTML overlay
- **No borders or frames** around images unless intentionally designed as a card
- **Sharpening:** subtle only; never crunchy

---

## Prohibited Image Types

| Type | Reason |
|------|--------|
| AI-generated human faces | Uncanny valley, misrepresentation |
| Overly glossy stock photography | Looks fake, cheapens institution |
| Sci-fi / futuristic renderings | Wrong brand, wrong audience |
| Cartoon or illustration (non-data) | Conflicts with institutional tone |
| Low-resolution / pixelated | Unacceptable for premium web |
| Watermarked stock photos | Unprofessional |
| Politically sensitive imagery | Institutional neutrality required |
| Religious iconography | Not relevant to RAE mission |

---

## Image Sourcing Priority

1. **Original RAE/Maejo photography** — first choice always
2. **Licensed institutional photography** — properly attributed, rights-cleared
3. **Curated documentary-style stock** — Unsplash+, institution-grade collections only
4. **AI-generated environments/textures** — only with ILS compliance review (no people)

---

## Image File Specifications

| Spec | Requirement |
|------|-------------|
| Format | WebP primary, JPEG fallback |
| Max dimensions | 2400px longest edge for hero; 1200px for cards |
| Compression | Quality 80–85 for JPEG; quality 75–80 for WebP |
| Max file size | 300KB hero, 150KB thumbnail |
| Color profile | sRGB |
| Metadata | Stripped of location/GPS data before commit |

---

## Image Review Checklist

Before any image is placed on the RAE website:

- [ ] Subject matter appropriate (Maejo/RAE/agriculture/research context)
- [ ] Style matches documentary-cinematic or premium institutional
- [ ] No AI-generated human faces
- [ ] Brand color overlay within approved opacities
- [ ] No text baked into image
- [ ] No watermarks visible
- [ ] Correct aspect ratio for component context
- [ ] File size within limits
- [ ] WebP format with JPEG fallback
- [ ] Alt text written (descriptive, not keyword-stuffed)

---

## Related Documents

- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality and timing
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — File workflow and naming
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI video generation constraints
- [../architecture/VISUAL_GOVERNANCE.md](../architecture/VISUAL_GOVERNANCE.md) — Visual system governance
- [../architecture/DESIGN_SYSTEM.md](../architecture/DESIGN_SYSTEM.md) — Design tokens and typography
- [../architecture/HOMEPAGE_VISUAL_SYSTEM.md](../architecture/HOMEPAGE_VISUAL_SYSTEM.md) — Per-pattern visual spec

# Visual Language Bible — Photography & Imagery (RC5.5)

**Scope**: All photography, hero media, card imagery, Canva exports, fal.ai generations, and RC6-injected assets on the RAE MJU Next.js experience.

**North star**: Authentic agricultural research institution — not generic university marketing, not startup SaaS stock.

---

## Photography style — allowed subjects

Use imagery that proves **real work** at RAE and Maejo:

| Category | Examples | Landing use |
|----------|----------|-------------|
| **Real researchers** | Faculty, lab staff, field teams with consent | Hero, Research Showcase, Impact Story |
| **Laboratories** | Equipment in use, samples, clean but lived-in spaces | Research Showcase, Services |
| **Agricultural innovation** | Trials, greenhouse, precision ag, post-harvest | Hero, KPI context, Impact Story |
| **Field operations** | Planting, harvesting, extension visits | Hero, Services, News |
| **Community engagement** | Farmer training, outreach, workshops | Impact Story, News |
| **Campus environment** | Maejo landmarks, RAE building exteriors/interiors | Hero, Footer, About |

**Thai context**: Prefer visibly Thai settings, signage, and participants when representing public-facing programs — aligns with Thai-first UX direction.

---

## Photography style — forbidden subjects

| Forbidden | Why |
|-----------|-----|
| Generic stock business people in suits | Breaks institutional authenticity |
| Handshake photos | Cliché; reads as corporate filler |
| Fake AI corporate imagery | Uncanny, damages trust |
| Unrealistic students | Staged diversity boards, obviously synthetic faces |
| Legacy WTMS banner collage | Low resolution, dated layout, wrong color treatment |
| Random agriculture stock (non-Thai, non-contextual) | Mismatch with RAE mission |
| Over-saturated “filter influencer” looks | Conflicts with premium institutional tone |

When legacy assets from `migration/ASSET_INVENTORY.csv` fail these rules, **replace** during RC6 — do not inject as-is.

---

## Composition

| Rule | Guidance |
|------|----------|
| **Subject clarity** | One primary subject per frame; avoid cluttered collages |
| **Rule of thirds** | Horizon or researcher gaze on third lines |
| **Institutional framing** | Leave safe zones for headline overlay (hero: 40% left or bottom third) |
| **Scale cues** | Wide for field/campus; medium for labs; tight for detail/tools |
| **Human dignity** | Document work; avoid posed “thumb up” gestures |
| **Text-safe areas** | Maintain 20% minimum clear zone for Thai + EN headlines |

**Hero**: Prefer single strong image or slow crossfade of 2–3 **approved** frames — not 6-up legacy carousel density.

---

## Contrast

| Context | Target |
|---------|--------|
| Hero with text overlay | Overlay scrim `rgba(0, 47, 30, 0.55–0.72)` over `#002F1E` family |
| Card thumbnails | Subject separated from background; readable at 320px width |
| Research detail | Sufficient midtone separation for figure captions |
| Accessibility | Text-on-image must meet WCAG AA with scrim (see DESIGN_GOVERNANCE.md) |

Avoid harsh clipped highlights on skin tones and crop greens.

---

## Depth

| Technique | Usage |
|-----------|--------|
| Shallow depth of field | Research detail, equipment close-ups |
| Environmental depth | Field rows, greenhouse aisles, campus paths |
| Layered hero | Foreground subject + soft background blur (real photo or subtle fal.ai extend — must pass authenticity review) |
| Flat illustration | **Not default** — photography-first brand |

No fake bokeh overlays on flat stock.

---

## Cropping

| Format | Aspect | Notes |
|--------|--------|-------|
| Hero desktop | 16:9 or 21:9 | Safe zone center-weighted |
| Hero mobile | 4:5 or 1:1 crop from master | Recompose — do not only center-crop |
| Card | 4:3 or 3:2 | Consistent within section |
| Profile | 1:1 | Researcher headshots — real photos only |
| OG / social | 1.91:1 | Separate export |

**Master rule**: Keep masters at 2× display resolution; crop derivatives in Canva or build pipeline — never upscale low-res legacy banners.

---

## Lighting

| Preferred | Avoid |
|-----------|-------|
| Natural daylight (field, campus) | Harsh noon overhead without fill |
| Soft lab lighting | Mixed color casts (green + magenta) |
| Golden hour for field hero | Heavy HDR glow |
| Even indoor for portraits | Hard flash on glass/wet surfaces |

Color temperature target: **5200–6500K** neutral-warm; align greens with brand `#005C3B` in grade — do not push teal.

---

## Color treatment

Post-processing aligned with `BRAND_SYSTEM.md`:

| Parameter | Guidance |
|-----------|----------|
| **Saturation** | Moderate; greens rich but not neon |
| **Brand green** | Use in overlays/scrims — not full-image green wash |
| **Gold accent** | sparing in UI badges — not color grading entire photo |
| **Skin tones** | Natural; no orange push |
| **Legacy assets** | Re-grade or replace; legacy banners often oversaturated |
| **Monochrome** | Allowed for Impact Story **only** if single-series editorial |

**Canva / fal.ai**: Match white balance and green cast to approved reference stills before batch export.

---

## Image types by landing section

| Section | Image type |
|---------|------------|
| Hero | Campus, field innovation, or symposium **real** photography |
| KPI | Optional subtle texture — prefer typography-led |
| Services | Lab + extension field pairing |
| Research Showcase | Project photos, plots, equipment |
| News | Event photography with date context |
| Impact Story | Before/after field outcomes, community |
| Dashboard Preview | UI screenshot or abstract data viz — no fake people |
| Footer | Campus exterior or map still — low visual noise |

---

## RC6 legacy asset handling

From `docs/legacy-migration/MIGRATION_NOTES.md`:

- PAGE-1001 banner assets may be **low resolution** — use for content reference, not final hero without upscaling review.
- Prefer direct photography shoots or approved Canva/fal.ai over WTMS `banners/*.jpg` when quality fails this bible.
- Document replacement in asset registry (see DESIGN_GOVERNANCE.md naming).

---

## Related documents

- `docs/design-system/BRAND_SYSTEM.md` — color tokens for overlays and UI
- `docs/design-system/LANDING_EXPERIENCE_GUIDE.md` — per-section emotional goals
- `docs/design-system/DESIGN_GOVERNANCE.md` — approval and fal.ai/Canva rules

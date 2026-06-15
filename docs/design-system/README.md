# Design System — Documentation Index (RC5.5)

Visual governance **Source of Truth** for RAE MJU Next.js landing and RC6 content injection.

**Status**: Documentation only — no production code in this repo path.  
**Joomla**: Legacy archive — not implementation reference.  
**GitHub**: Canonical store for all rules below.

---

## Start here

| Audience | Read first |
|----------|------------|
| New agent / designer | `DESIGN_GOVERNANCE.md` → `BRAND_SYSTEM.md` |
| Content injection (RC6) | `docs/legacy-migration/README.md` → `LANDING_EXPERIENCE_GUIDE.md` |
| Photography / Canva / fal.ai | `VISUAL_LANGUAGE_BIBLE.md` → `DESIGN_GOVERNANCE.md` |
| Motion / Framer | `MOTION_LANGUAGE_BIBLE.md` |

---

## RC5.5 canonical documents (this folder)

| File | Purpose |
|------|---------|
| [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) | Colors (`#005C3B`, `#FFDE00`), scales, surfaces, CTA, dashboard tokens, CSS examples |
| [VISUAL_LANGUAGE_BIBLE.md](./VISUAL_LANGUAGE_BIBLE.md) | Photography allowed/forbidden, composition, grade |
| [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) | Motion allowed/forbidden, timing, Framer examples |
| [LANDING_EXPERIENCE_GUIDE.md](./LANDING_EXPERIENCE_GUIDE.md) | Hero → Footer experience spec |
| [DESIGN_GOVERNANCE.md](./DESIGN_GOVERNANCE.md) | Approval workflow, naming, Canva/fal.ai, QA checklists |

---

## Related repo documents

| Topic | Path |
|-------|------|
| Legacy migration index | `docs/legacy-migration/README.md` |
| Content → section mapping | `docs/legacy-migration/CONTENT_MODEL_SUMMARY.md` |
| Staging scope (25 pages) | `migration/STAGING_MANIFEST.csv` |
| Homepage prototype | `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` |
| Service / research prototypes | `frontend-prototypes/SERVICE_HUB_BLUEPRINT_V1.md`, `RESEARCH_SHOWCASE_BLUEPRINT_V1.md` |
| Token Savior workflow | `docs/TOKEN_SAVIOR_WORKFLOW.md` |

---

## Deprecated for new visual work

| Path | Reason |
|------|--------|
| `design-system/DESIGN_TOKENS_V1.md` | Blue `#1A237E` palette — superseded by green brand |
| `design-system/DESIGN_SYSTEM_NOTES_V1.md` | Joomla/SCSS oriented |
| `docs/JOOMLA_*` | CMS archive |
| `docs/HOMEPAGE_BLUEPRINT_V1.md` | Joomla implementation detail — use LANDING_EXPERIENCE_GUIDE for Next.js |

---

## Brand quick reference

- **Primary Green**: `#005C3B`
- **Secondary Gold**: `#FFDE00`
- **Experience**: Premium Institutional
- **Motion**: Calm reveals — no bounce/spin/RGB

---

## Cross-release map

| Release | Focus | Primary docs |
|---------|-------|--------------|
| RC5.5 | Visual governance foundation | `docs/design-system/*` |
| RC6 | Content injection | `docs/legacy-migration/*` + LANDING_EXPERIENCE_GUIDE |
| App implementation | Next.js tokens/components | App repo (not this archive workspace) |

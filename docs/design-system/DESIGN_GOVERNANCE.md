# Design Governance — RAE MJU (RC5.5)

**Authority**: This folder (`docs/design-system/`) is the **visual governance Source of Truth** for Landing, Motion, Canva, fal.ai, Next.js UI, and RC6 Content Injection.

**GitHub** remains the canonical store — no off-repo design specs without mirroring here.

---

## Document hierarchy

| Priority | Document | Governs |
|----------|----------|---------|
| 1 | `BRAND_SYSTEM.md` | Color, type, surfaces, CTA, dashboard tokens |
| 2 | `VISUAL_LANGUAGE_BIBLE.md` | Photography, imagery, cropping, grade |
| 3 | `MOTION_LANGUAGE_BIBLE.md` | Animation patterns, timing, Framer reference |
| 4 | `LANDING_EXPERIENCE_GUIDE.md` | Section purpose, emotion, CTA, motion strategy |
| 5 | `DESIGN_GOVERNANCE.md` | This file — process, naming, QA |

**Legacy / deprecated for new work**:

- `design-system/DESIGN_TOKENS_V1.md` — blue palette superseded by green `#005C3B`
- `design-system/DESIGN_SYSTEM_NOTES_V1.md` — Joomla-oriented notes
- `docs/JOOMLA_*`, `docker-compose.yml` — archive only

**Content injection (RC6)**:

- `docs/legacy-migration/*` + `migration/STAGING_MANIFEST.csv`

---

## Approval workflow

```
Design → Review → QA → Production
```

| Stage | Owner | Output | Gate |
|-------|-------|--------|------|
| **Design** | Designer / agent with brief | Figma frame, Canva export spec, or markdown spec PR | Aligns with BRAND + VISUAL bibles |
| **Review** | Design lead or operator | Signed checklist (below) | No forbidden patterns; Thai copy reviewed |
| **QA** | QA / second agent | Motion, a11y, performance pass | All checklists green |
| **Production** | Next.js implementer | PR in app repo | Tokens map to CSS; no drift from GitHub docs |

**Rules**:

- No production merge without Review + QA for **new** visual patterns.
- RC6 content-only injection: Review may be lightweight if no layout/motion/token changes — but imagery still requires Visual Language compliance.
- Disputes resolved by updating **this repo’s docs** first, then implementing.

---

## Asset naming

### Images (photography, hero, cards)

```
rae-{section}-{subject}-{variant}-{width}w.{ext}
```

| Segment | Values |
|---------|--------|
| `section` | `hero`, `service`, `research`, `news`, `impact`, `about`, `footer`, `og` |
| `subject` | kebab-case descriptor (`field-trial`, `lab-microscope`, `campus-main`) |
| `variant` | `01`, `02` or `th`, `en` for localized crops |
| `width` | `640`, `1280`, `1920` |
| `ext` | `webp` (preferred), `avif`, `jpg` (fallback) |

**Examples**:

- `rae-hero-field-innovation-01-1920w.webp`
- `rae-research-lychee-symposium-01-1280w.webp`
- `rae-og-default-01-1200w.jpg`

### Icons & SVG

```
rae-icon-{name}-{size}.svg
```

### Legacy traceability (RC6)

When sourcing from migration:

```
rae-{section}-legacy-{PAGE-ID}-{asset-id}.{ext}
```

Example: `rae-hero-legacy-PAGE-1001-ASSET-1001-3.webp`

### Canva exports

```
rae-canva-{template-id}-{section}-{revision}.{ext}
```

### fal.ai outputs

```
rae-fal-{prompt-slug}-{seed}-{width}w.{ext}
```

Store prompt + seed in PR description or asset manifest — not in filename secrets.

---

## Image governance

| Rule | Requirement |
|------|-------------|
| Source approval | Real photo, approved Canva, or approved fal.ai only |
| Visual bible | Must pass VISUAL_LANGUAGE_BIBLE.md forbidden list |
| Resolution | ≥2× target display; hero master ≥1920w |
| Format | WebP/AVIF with JPG fallback for email/OG |
| Alt text | Thai primary + EN where bilingual; never empty for content images |
| Legacy WTMS | Default **replace** unless QA documents acceptable quality |
| Storage | App `public/` or CDN — paths referenced in content layer |
| Registry | New assets logged in PR; optional `assets/manifest.json` in app repo |

---

## Canva governance

| Rule | Requirement |
|------|-------------|
| Templates | Use org-approved templates locked to BRAND_SYSTEM colors |
| Colors | `#005C3B`, `#FFDE00`, neutrals only — no legacy blue `#1A237E` |
| Fonts | Prompt / Noto Sans Thai — no decorative script |
| Exports | PNG/WebP for static; MP4/WebM only if MOTION bible allows |
| Brand lock | Canva brand kit must match BRAND_SYSTEM.md hex values |
| Review | Marketing exports require Review stage before web upload |
| RC6 | Canva may **typeset** injected copy — not redefine layout components |

---

## fal.ai governance

| Rule | Requirement |
|------|-------------|
| Use case | Gap-fill when no real photo exists — not default hero |
| Prompts | Must specify: Thai agricultural research, Maejo context, realistic, no stock business |
| Forbidden | Handshakes, suits, fake students, corporate AI aesthetic |
| Human subjects | Prefer real photography; fal.ai people require explicit approval |
| Post-process | Color grade to VISUAL_LANGUAGE_BIBLE; no uncanny faces on landing |
| Metadata | Record prompt, model version, seed in PR |
| Motion | fal outputs are static unless video explicitly approved |

**Prompt skeleton**:

```
Documentary photograph, Maejo University agricultural research,
[specific scene], natural lighting, authentic Thai rural/campus context,
professional institutional photography, no text overlay, no watermark
-- negative: handshake, business suit, stock photo, cartoon, AI gloss
```

---

## Motion QA checklist

Before production merge:

- [ ] Only allowed patterns (fade, blur reveal, ambient, subtle parallax, hover lift)
- [ ] No forbidden patterns (bounce, spin, RGB, gaming, excessive zoom)
- [ ] Hover 150–300ms; reveal 600–1200ms; interaction 200–400ms
- [ ] `prefers-reduced-motion` respected — essential content visible without animation
- [ ] Hero total sequence ≤1500ms
- [ ] No autoplay carousel
- [ ] Lighthouse / CPU spot check — no jank on mid-tier mobile
- [ ] Framer `viewport={{ once: true }}` on scroll reveals

---

## Performance checklist

- [ ] Hero LCP image preloaded; priority hint on Next.js `<Image>`
- [ ] Images WebP/AVIF; hero ≤200KB optimized where possible
- [ ] No layout shift — explicit width/height or aspect-ratio
- [ ] Motion uses transform/opacity only (GPU-friendly)
- [ ] Third-party fonts subset for Thai + Latin
- [ ] No legacy WTMS asset hotlinks in production
- [ ] Dashboard preview mock — static screenshot preferred over live iframe

---

## Accessibility checklist

- [ ] WCAG 2.1 AA color contrast (text + UI)
- [ ] Text on hero images uses scrim — verify 4.5:1 body, 3:1 large text
- [ ] Focus visible on all interactive elements (green ring `#79C2A7`)
- [ ] Alt text for informative images; decorative `alt=""`
- [ ] Motion reducible — no content gated on animation completion
- [ ] Thai language `lang="th"`; EN blocks `lang="en"`
- [ ] Touch targets ≥44×44px
- [ ] No flash >3Hz

---

## RC6 Content Injection governance

| Area | Rule |
|------|------|
| Scope | `migration/STAGING_MANIFEST.csv` only (25 pages) |
| Experience | Follow LANDING_EXPERIENCE_GUIDE — inject content, not redesign |
| Copy | Rewrite where MIGRATION_MATRIX notes `rewrite` |
| Imagery | VISUAL_LANGUAGE_BIBLE — replace failing legacy banners |
| Tokens | BRAND_SYSTEM colors only |
| Motion | No new motion patterns during RC6 unless RC5.5 QA passed |

---

## Change control

Updates to governance docs require:

1. PR to this repo (`docs/design-system/`)
2. Note in `docs/DECISIONS_LOG.md` for material brand changes
3. Optional Token Savior observation:

```bash
python3 ts-tools/scripts/ts_cli.py memory save \
  --type observation \
  --title "Design: RC5.5 Brand Green Governance" \
  --content "Primary #005C3B supersedes legacy blue tokens" \
  --project raemju \
  --tag design
```

---

## Related paths

| Resource | Path |
|----------|------|
| Legacy content index | `docs/legacy-migration/README.md` |
| Staging manifest | `migration/STAGING_MANIFEST.csv` |
| Token Savior workflow | `docs/TOKEN_SAVIOR_WORKFLOW.md` |
| Homepage prototype | `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` |

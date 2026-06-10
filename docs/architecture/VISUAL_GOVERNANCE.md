# Visual Governance

**Sprint 1 Week 2** · RAE Next.js Main · **Sprint 2:** agency agents + homepage prototype  
**Authority:** This document governs all homepage and shared layout visual decisions. Sprint 2 UI work must comply with agent policy (`docs/agent/AGENCY_AGENTS_POLICY.md`) — no deploy without approval.

---

## Governance scope

| In scope | Out of scope (Week 2) |
|----------|----------------------|
| Homepage section patterns | Inner page redesign |
| Shared tokens (`tokens.css`) | Production deploy |
| Navigation / footer shell | New brand colors |
| Mobile nav behavior | CMS / content migration |
| Documentation of patterns | Production deploy |

---

## Brand palette (locked)

These three colors are **immutable** for Sprint 1. Do not substitute, approximate, or add parallel primaries.

| Name | Hex | CSS token | Permitted use |
|------|-----|-----------|---------------|
| Primary Green | `#005C3B` | `--maejo-green`, `--primary` | Links, nav, CTA fills, institutional accents |
| Secondary Gold | `#FFDE00` | `--maejo-gold`, `--accent` | Hero kicker, primary hero CTA, focus rings, CTA strip left border |
| Neutral Gray | `#4C4C4C` | `--neutral-gray` | Body secondary text, KPI labels (future), meta copy |

### Derived tokens (allowed)

| Token | Derivation | Use |
|-------|------------|-----|
| `--maejo-green-strong` | `#004A2F` | Hover, active states |
| `--maejo-green-muted` | `#0A7A52` | Hero gradient endpoint |
| `--maejo-green-light` | `#E8F5EF` | Backgrounds, badges |
| `--maejo-gold-dark` | `#E6C800` | Gold hover |
| `--color-text-muted` | `#4C4C4C` | Alias of neutral gray (via `--muted`) |

### Prohibited

- New primary hues (blue, red, purple as brand anchors)
- Hard-coded hex in components — must trace to `app/tokens.css`
- Gold as large background fills (accent only)
- Neutral gray replacing primary green on interactive elements

---

## Token change process

1. Propose change in `docs/architecture/` with rationale.
2. Edit `app/tokens.css` only (not scattered in components).
3. Update `DESIGN_SYSTEM.md` and `HOMEPAGE_VISUAL_SYSTEM.md` if pattern-affecting.
4. Run `npm run build` — static export must pass.
5. Local commit only; no production deploy without explicit approval.

---

## Component class registry

Homepage and shell classes are defined in `app/globals.css`. New homepage sections **must** reuse existing classes before adding new ones.

### Layout

| Class | Owner |
|-------|-------|
| `.layout-container` | `PageContainer` |
| `.main-content` | `SiteShell` |
| `.section-block` | All homepage sections |

### Patterns

| Class group | Pattern |
|-------------|---------|
| `.hero-*` | Hero |
| `.grid-two`, `.grid-three` | Card grids |
| `.card-panel`, `.panel-*` | Cards |
| `.cta-strip`, `.cta-button` | Section CTAs |
| `.btn-link-*` | Hero buttons |
| `.news-*` | News cards |
| `.site-footer`, `.footer-*` | Footer hub |

### Navigation

| Class | Notes |
|-------|-------|
| `.main-nav` | Desktop only (hidden ≤ 48rem) |
| `.mobile-nav`, `.mobile-nav-panel` | Drawer; closes on tap + Escape |
| `.nav-list a` | Shared link styling |

---

## CTA governance

| Type | Class | When to use |
|------|-------|-------------|
| Hero primary | `.btn-link-primary` | One per hero — highest prominence |
| Hero secondary | `.btn-link-secondary` | Supporting hero action |
| Section action | `.cta-button` | Strip CTAs (research, documents) |
| Text link | `a` with primary color | In-card navigation |

**Rules:**

- Maximum one `.cta-strip` per IA group on homepage.
- CTA button labels come from `data/cta.ts` — not inline in components.
- External links must open in same tab unless `data/` explicitly marks `external`.

---

## Typography governance

- Font stack locked in `--font-sans` (Inter + Noto Sans Thai fallback).
- Section headings use `.section-heading` — do not introduce ad-hoc `h2` sizes on homepage.
- Hero is the only zone using `.hero-title` scale.
- Thai line-height override stays at 1.75 via `:lang(th)`.

---

## Spacing governance

- Section vertical rhythm: `--spacing-section` via `.section-block`.
- Do not add per-section `margin-top` overrides without documenting in `HOMEPAGE_VISUAL_SYSTEM.md`.
- Container width always via `.layout-container` / `PageContainer`.

---

## Mobile governance

| Rule | Enforcement |
|------|-------------|
| Touch min 2.75rem | `--nav-touch-min` on interactive elements |
| Single-column grids ≤ 48rem | `globals.css` media query |
| Mobile nav closes on navigate | `MobileNav` → `NavItem.onNavigate` |
| Escape closes drawer | `MobileNav` keydown handler |
| No horizontal scroll | `min()` container, no fixed widths on cards |

---

## Accessibility minimums

- Skip link: `SiteShell` → `.skip-to-main`
- Focus visible: gold outline (`--maejo-gold`) on links, buttons, inputs
- Landmarks: `<main id="main-content">`, `<footer>`, `<nav aria-label>`
- Section anchors: `id` on each homepage `<section>` per `data/home-sections.ts`

---

## Review checklist (pre-commit)

- [ ] No new hex colors outside `tokens.css`
- [ ] Homepage section uses registry + `HomeSectionRenderer`
- [ ] Footer anchors align with section IDs
- [ ] Build passes (`npm run build`)
- [ ] Mobile nav closes after link selection
- [ ] Documentation updated if pattern added or changed

---

## Related documents

| Document | Purpose |
|----------|---------|
| `DESIGN_SYSTEM.md` | Week 1 token and architecture overview |
| `HOMEPAGE_IA.md` | Section order and data flow |
| `HOMEPAGE_VISUAL_SYSTEM.md` | Per-pattern visual spec |
| `docs/reports/SPRINT1_WEEK2_STATUS.md` | Sprint 1 progress report |
| `docs/agent/AGENCY_AGENTS_POLICY.md` | Multi-agent guardrails |
| `docs/agent/AGENT_WORKFLOW.md` | Architect / Builder workflow |
| `docs/reports/SPRINT2_WEEK1_PLAN.md` | Sprint 2 execution plan |

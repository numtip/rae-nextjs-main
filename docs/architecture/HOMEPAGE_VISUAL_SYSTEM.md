# Homepage Visual System

**Sprint 1 Week 2** · RAE Next.js Main · **Sprint 2:** production prototype (governed)  
**Scope:** Homepage section patterns only (`/[locale]/`)  
**CSS source:** `app/tokens.css`, `app/globals.css`  
**IA reference:** `docs/architecture/HOMEPAGE_IA.md`  
**Agent policy:** `docs/agent/AGENCY_AGENTS_POLICY.md`

---

## Section map

| Pattern | Section ID | Component | CSS classes |
|---------|------------|-----------|-------------|
| Hero | `hero` | `Hero` | `.hero-section`, `.hero-kicker`, `.hero-title`, `.hero-text`, `.hero-actions` |
| Quick access services | `quick-links` | `QuickLinks` | `.section-heading`, `.grid-two`, `.card-panel`, `.panel-list` |
| Research showcase | `services-overview` | `ServicesOverview` | `.grid-three`, `.card-panel` |
| Research gateway CTA | `research-systems-cta` | `ResearchSystemsCTA` | `.cta-strip`, `.cta-button` |
| KPI / impact | `kpi-impact` | `KpiImpactStrip` | `.kpi-strip`, `.grid-four`, `.kpi-card`, `.kpi-value` |
| News / announcements | `news-highlights` | `NewsHighlights` | `.grid-three`, `.news-card-meta`, `.news-category` |
| Documents utility CTA | `documents-cta` | `DocumentsCTA` | `.cta-strip` |
| Green office utility | `green-office` | `GreenOfficeSection` | `.greenoffice-section` |
| Footer hub | — | `SiteFooter` | `.site-footer`, `.footer-links` |

Renderer: `components/home/HomeSectionRenderer.tsx` · Registry: `data/home-sections.ts`

---

## 1. Hero pattern

**Purpose:** Institutional entry point — kicker, headline, supporting copy, dual CTAs.

| Element | Class | Typography |
|---------|-------|------------|
| Kicker | `.hero-kicker` | 0.88rem, uppercase, gold (`--maejo-gold`) |
| Title | `.hero-title` | `clamp(1.7rem, 2.8vw, 2.5rem)`, weight 700 |
| Body | `.hero-text` | Muted on green gradient, max-width 47.5rem |
| Actions | `.hero-actions` | Flex wrap, gap 0.625rem |

**Surface:** Green gradient (`#003d28` → `--maejo-green` → `--maejo-green-muted`) with gold radial accent.  
**Spacing:** `padding: 1.75rem` (1.25rem on mobile ≤ 48rem).  
**Anchor:** `#hero`

---

## 2. Quick access services pattern

**Purpose:** Grouped shortcut links for high-frequency tasks.

| Element | Rule |
|---------|------|
| Layout | `.grid-two` — 2 columns desktop, 1 column ≤ 48rem |
| Card | `.card-panel` per group |
| Links | `.panel-list a` — primary green, weight 600 |

**Hierarchy:** `h2.section-heading` → `p.section-subtext` → card grid.  
**Anchor:** `#quick-links`

---

## 3. Research showcase pattern

**Purpose:** Surface core service areas as scannable cards (no inline CTA).

| Element | Rule |
|---------|------|
| Layout | `.grid-three` — 3 → 2 (≤ 57.5rem) → 1 (≤ 48rem) |
| Card | `.card-panel` with `.panel-title` + `.panel-text` |
| Copy tone | Title 1.06rem; body `--muted` at 0.95rem |

**Anchor:** `#services-overview`

---

## 4. News / announcement pattern

**Purpose:** Latest institutional news with category, date, summary, read-more.

| Element | Class | Rule |
|---------|-------|------|
| Grid | `.grid-three` | Same responsive breakpoints as showcase |
| Meta row | `.news-card-meta` | Category badge + `<time>` |
| Category | `.news-category` | Green-light pill, uppercase |
| Read more | `.news-card-more a` | Primary link |
| Index link | `.news-index-link` | Below grid, view-all |

**Anchor:** `#news-highlights`

---

## 5. KPI / impact pattern

**Purpose:** Institutional impact metrics in a scannable four-up strip.

| Element | Class | Rule |
|---------|-------|------|
| Container | `.kpi-strip` | Standard `.section-block` rhythm |
| Grid | `.grid-four` | 4 → 2 (≤ 57.5rem) → 1 (≤ 48rem) |
| Card | `.kpi-card` | Centered, `.card-panel`-like surface |
| Highlight | `.kpi-card-highlight` | Gold top border — **one metric only** |
| Value | `.kpi-value` | Large numeral, `--maejo-green` |
| Label | `.kpi-label` | `--neutral-gray`, weight 600 |
| Context | `.kpi-context` | Optional, `--muted` |

**Data:** `data/kpiImpact.ts` · **Component:** `components/home/KpiImpactStrip.tsx`  
**Anchor:** `#impact-metrics`

---

## 6. CTA strip pattern

**Used by:** `ResearchSystemsCTA`, `DocumentsCTA`

| Element | Class | Rule |
|---------|-------|------|
| Container | `.cta-strip` | Grid 2-col; stacks ≤ 57.5rem |
| Accent | `border-left: 4px solid --maejo-gold` | Required |
| Background | `--maejo-green-light` | Institutional tint |
| Button | `.cta-button` | Green fill, white text, min-height `--nav-touch-min` |

**CTA hierarchy:**

1. **Primary on hero:** `.btn-link-primary` (gold fill, green text)
2. **Secondary on hero:** `.btn-link-secondary` (ghost on green)
3. **Section CTA:** `.cta-button` (green fill)
4. **Inline links:** `.panel-list a`, `.news-card-more a` (text primary)

---

## 7. Footer hub pattern

**Purpose:** Contact block + homepage anchor cross-links.

| Element | Class | Rule |
|---------|-------|------|
| Landmark | `.site-footer` | `id="contact-footer"`, top border |
| Links | `.footer-links` | Flex wrap, primary green |
| Meta | `.footer-meta` | 0.82rem, `--muted` |

Anchors in `data/footer.ts` must match `data/home-sections.ts` (see `HOMEPAGE_IA.md`).

---

## Spacing scale

| Token / class | Value | Usage |
|---------------|-------|-------|
| `--spacing-section` | 1.375rem | `.section-block` margin-top between homepage sections |
| `--spacing-container-x` | `clamp(1rem, 4vw, 1.5rem)` | Horizontal page padding |
| `--spacing-container-max` | 68.75rem | Max content width |
| `.main-content` | `1.75rem 0 3rem` | Main vertical rhythm (1.25rem top on mobile) |
| `.card-panel` padding | 1.125rem | All cards |
| Grid gaps | 0.875rem | `.grid-two`, `.grid-three` |
| `.site-footer` margin-top | 1.875rem | Footer separation |

---

## Typography hierarchy

| Level | Selector | Size | Weight | Color |
|-------|----------|------|--------|-------|
| Hero title | `.hero-title` | clamp 1.7–2.5rem | 700 | `#f3faf6` |
| Hero kicker | `.hero-kicker` | 0.88rem | 700 | `--maejo-gold` |
| Section heading | `.section-heading` | 1.2rem | inherited | `--text` |
| Section subtext | `.section-subtext` | 0.95rem | inherited | `--muted` |
| Card title | `.panel-title` | 1.06rem | inherited | `--text` |
| Card body | `.panel-text` | 0.95rem | inherited | `--muted` |
| CTA title | `.cta-title` | 1.05rem | inherited | `--text` |
| Footer | `.site-footer` | 0.9rem | inherited | `--muted` |

Thai pages: body `line-height: 1.75` via `:lang(th) body`.

---

## Card rules

All homepage cards use `.card-panel`:

- Background: `--surface`
- Border: 1px `--line`
- Radius: `--radius` (1rem)
- Shadow: `--shadow-sm`
- Padding: 1.125rem

**Variants:**

- `.greenoffice-section` — left green border + green-light background
- News cards — add `.news-category` badge in meta row

**Do not:** invent new card border colors or primary fills outside brand tokens.

---

## Mobile behavior

Breakpoint reference (`app/tokens.css`): `--breakpoint-md: 48rem`

| ≤ 48rem | Behavior |
|---------|----------|
| Navigation | Desktop `.main-nav` hidden; `.mobile-nav` drawer shown |
| Hero | Reduced padding (1.25rem) |
| Grids | `.grid-two`, `.grid-three` → single column |
| CTA strip | Single column stack |
| Touch targets | `--nav-touch-min: 2.75rem` on buttons, nav links, footer links |

| ≤ 57.5rem | `.grid-three` → 2 columns (news/services) |

**Mobile nav:** Drawer closes on link tap (`onNavigate`) and Escape key.

---

## Brand color lock

| Role | Hex | Token |
|------|-----|-------|
| Primary Green | `#005C3B` | `--maejo-green`, `--primary` |
| Secondary Gold | `#FFDE00` | `--maejo-gold`, `--accent` |
| Neutral Gray | `#4C4C4C` | `--neutral-gray`, `--color-neutral-gray` |

Derived greens (`--maejo-green-strong`, `--maejo-green-light`, `--maejo-green-muted`) are tints/shades of primary only. **No new primary brand colors.**

---

## File references

```
app/[locale]/(site)/page.tsx          → metadata + HomeSectionRenderer
components/home/                      → Hero, QuickLinks, ServicesOverview, ResearchSystemsCTA,
                                        KpiImpactStrip, NewsHighlights, DocumentsCTA, GreenOfficeSection
components/home/HomeSectionRenderer.tsx
data/home-sections.ts
data/kpiImpact.ts
app/tokens.css
app/globals.css
components/layout/SiteShell.tsx
components/layout/PageContainer.tsx
components/navigation/SiteHeader.tsx
components/navigation/MainNav.tsx
components/navigation/MobileNav.tsx
```

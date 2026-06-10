# RAE Design System

**Sprint 1 Week 1** · Maejo institutional web · Mobile-first

---

## Design direction

| Influence | Application |
|-----------|-------------|
| **UTCC** | Clear institutional hierarchy, bilingual parity, service-oriented navigation |
| **Vercel** | Clean typography, subtle elevation, performant static export |
| **Institutional Premium** | Maejo Green + Gold palette, generous whitespace, trustworthy tone |
| **Mobile First** | Touch targets ≥ 44px, collapsible nav, single-column grids below 768px |

---

## Brand colors

| Token | Value | Usage |
|-------|-------|-------|
| `--maejo-green` | `#005C3B` | Primary actions, links, header accents |
| `--maejo-green-strong` | `#004A2F` | Hover states, active nav |
| `--maejo-green-light` | `#E8F5EF` | Backgrounds, badges, card tints |
| `--maejo-gold` | `#FFDE00` | Hero kicker, CTA primary, focus rings |
| `--maejo-gold-dark` | `#E6C800` | Gold hover |

Semantic aliases: `--primary`, `--accent`, `--bg`, `--surface`, `--text`, `--muted`, `--line`.

**Source file:** `app/tokens.css`

---

## Typography

| Element | Style |
|---------|-------|
| Font stack | Inter + system + Noto Sans Thai fallback |
| Body | 1rem, line-height 1.65 (1.75 for `:lang(th)`) |
| Headings | Inherited weight; section headings 1.2rem |
| Hero title | `clamp(1.7rem, 2.8vw, 2.5rem)` |

---

## Spacing & layout

| Token | Value |
|-------|-------|
| `--spacing-container-max` | 68.75rem (1100px) |
| `--spacing-container-x` | `clamp(1rem, 4vw, 1.5rem)` |
| `--spacing-section` | 1.375rem between sections |
| `--radius-lg` | 1rem (cards, hero) |

**Layout shell:** `SiteShell` → `SiteHeader` + `main` + `SiteFooter`  
**Content width:** `PageContainer` (`.layout-container`)

---

## Component architecture

```
components/
├── layout/
│   ├── SiteShell.tsx      # Skip link, header, main, footer
│   └── PageContainer.tsx  # Max-width container
├── navigation/
│   ├── SiteHeader.tsx     # Brand + tools + nav hosts
│   ├── MainNav.tsx        # Desktop horizontal nav
│   ├── MobileNav.tsx      # Hamburger drawer (client)
│   └── NavItem.tsx        # Active route link (client)
├── footer/
│   ├── SiteFooter.tsx     # Footer landmark
│   ├── FooterContact.tsx  # Org contact block
│   └── FooterLinks.tsx    # Homepage anchor links
└── home/
    ├── HomeSectionRenderer.tsx  # Ordered homepage sections
    ├── Hero.tsx · QuickLinks.tsx · ServicesOverview.tsx
    ├── ResearchSystemsCTA.tsx · KpiImpactStrip.tsx
    └── NewsHighlights.tsx · DocumentsCTA.tsx · GreenOfficeSection.tsx
```

---

## CSS architecture

```
app/
├── tokens.css    # @theme + :root semantic tokens
└── globals.css   # @import tailwindcss + component classes
```

**Layers:**

1. `@theme` — Tailwind v4 design tokens (Maejo palette)
2. `@layer base` — Body, focus, Thai line-height
3. Component classes — `.site-header`, `.hero-section`, `.card-panel`, etc.

**Do not** commit compiled Tailwind output. Edit `tokens.css` and `globals.css` only.

---

## Navigation

- **Data:** `data/navigation.ts` — flat list with optional `group` (`primary` | `secondary` | `utility`)
- **Desktop:** `MainNav` — horizontal list, hidden below 768px
- **Mobile:** `MobileNav` — toggle button + panel, Escape to close
- **Active state:** `NavItem` + `lib/navigation-utils.isNavActive()`

---

## Accessibility baseline

- Skip-to-main link (visible on focus)
- `aria-current="page"` on active nav items
- `aria-expanded` on mobile menu toggle
- `:focus-visible` with Maejo Gold outline
- Semantic landmarks: `header`, `nav`, `main`, `footer`
- Minimum touch target: `--nav-touch-min` (2.75rem)

---

## Responsive breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< 480px` | Single column, stacked header |
| `< 768px` | Mobile nav, 1-col grids, hide runtime badge |
| `< 920px` | 2-col grid-three, stacked CTAs |
| `≥ 768px` | Desktop MainNav visible |

---

## Related docs

- [HOMEPAGE_IA.md](./HOMEPAGE_IA.md) — Homepage section registry
- [../roadmap/SPRINT1_FOUNDATION_PLAN.md](../roadmap/SPRINT1_FOUNDATION_PLAN.md) — Full sprint plan

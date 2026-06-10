# Sprint 1 — Foundation Plan

**Project:** RAE Next.js Main  
**Sprint goal:** Establish a maintainable design and layout foundation before UI redesign.  
**Constraint:** No production deploy, no nginx changes, no UI visual redesign yet — architecture and CSS source only.

**Duration estimate:** 2–3 weeks  
**Prerequisite:** GitHub push unblocked (SSH deploy key)

---

## Current baseline

| Area | State today |
|------|-------------|
| CSS | `app/globals.css` is **479-line compiled Tailwind output** — not editable source |
| Tailwind | v4.2.4 via `@tailwindcss/postcss`; no `tailwind.config.*` |
| Layout | 3-tier: root → `[locale]` → `(site)` with HeaderNav + Footer |
| Navigation | Static `data/navigation.ts` + `HeaderNav` desktop horizontal list |
| Homepage | 7 sections composed in `app/[locale]/(site)/page.tsx` |
| Service pages | `ServiceCatalog` + static registries in `data/` |
| Mobile | CSS classes exist but no dedicated mobile nav pattern |
| A11y | Skip link, `aria-label` on nav, semantic landmarks — partial |
| AI readiness | Content in TypeScript registries; no structured schema layer |

---

## 1. Design token system

### Objective

Replace ad-hoc CSS custom properties scattered in compiled output with a single, documented token layer that supports RAE brand colors, typography, spacing, and bilingual layout needs.

### Deliverables

- `app/tokens.css` (or `@theme` block in source `globals.css`) defining:
  - **Brand:** RAE green palette, accent, neutral grays
  - **Typography:** Inter (existing), Thai-safe line-height and letter-spacing scales
  - **Spacing:** Consistent section rhythm (`--section-y`, `--container-x`)
  - **Radii, shadows, borders:** Reusable across cards, nav, CTAs
  - **Breakpoints:** `--bp-sm`, `--bp-md`, `--bp-lg` as CSS variables for consistency
- `docs/design/TOKENS.md` — token catalog with usage examples (reference only, no Figma yet)
- Map existing compiled classes (`.site-header`, `.hero`, `.nav-list`, etc.) to token-backed rules

### Acceptance criteria

- [ ] All color values in component CSS trace back to named tokens
- [ ] Token file is human-editable (< 100 lines)
- [ ] Thai and English pages render identically to current production after token migration

---

## 2. Tailwind v4 cleanup

### Objective

Adopt idiomatic Tailwind v4 PostCSS setup and remove dependency on compiled utility dump.

### Deliverables

- Source `globals.css` with:

```css
@import "tailwindcss";
@theme { /* design tokens */ }
@layer base { /* resets + semantic element styles */ }
@layer components { /* .site-header, .hero, etc. */ }
```

- Verify `postcss.config.mjs` (`@tailwindcss/postcss`) — already recovered
- Remove unused default Next.js SVG placeholders from `public/` if not referenced
- Add `@source` paths if Tailwind purge misses any `app/` or `components/` files
- Document Tailwind v4 conventions in a short comment block at top of `globals.css`

### Acceptance criteria

- [ ] `npm run build` produces equivalent `out/` content (visual diff spot-check on `/th/` and `/en/`)
- [ ] No 400+ line compiled CSS in repo — source file < 200 lines + `@theme`
- [ ] All existing semantic class names preserved (no mass JSX class renames in Sprint 1)

---

## 3. `globals.css` rewrite

### Objective

Replace recovered compiled CSS with maintainable source that preserves current visual output.

### Approach

1. **Inventory** — Extract custom rules from compiled file (non-Tailwind resets, `.site-header`, `.layout-container`, `.skip-to-main`, etc.)
2. **Classify** — Separate into `@layer base`, `@layer components`, `@layer utilities`
3. **Rewrite** — Use `@apply` sparingly; prefer component classes for complex blocks
4. **Validate** — Side-by-side HTML size check vs production `landing/th/index.html`

### Known custom classes to preserve

| Class | Used by |
|-------|---------|
| `.layout-container` | Site shell, header, nav |
| `.site-header`, `.header-inner`, `.brand-*` | HeaderNav |
| `.nav-row`, `.nav-list` | Main navigation |
| `.main-content`, `.skip-to-main` | Site layout a11y |
| `.hero`, `.quick-links`, `.service-card` | Homepage sections |
| `.page-simple`, `.doc-table` | Inner pages |

### Acceptance criteria

- [ ] Source `globals.css` is editable and documented
- [ ] Compiled `out/th/index.html` byte size within ±5% of production
- [ ] No visual regression on homepage, about, forms-documents (manual check)

---

## 4. Layout architecture

### Objective

Formalize the layout hierarchy and prepare for future template variants (inner page vs landing vs portal).

### Current chain

```
app/layout.tsx                    → Root: font, metadataBase, globals.css
└── app/[locale]/layout.tsx       → Locale guard, HtmlLang, generateStaticParams
    └── app/[locale]/(site)/layout.tsx → HeaderNav, Footer, skip link, main shell
        └── page.tsx
```

### Deliverables

- `components/layout/SiteShell.tsx` — extract skip link + header + main + footer wrapper from `(site)/layout.tsx`
- `components/layout/PageContainer.tsx` — standardized inner page width/padding
- `lib/layout-types.ts` — types for layout variants (`"default" | "narrow" | "full-bleed"`)
- Document layout contract in `ARCHITECTURE.md` (update after implementation)

### Acceptance criteria

- [ ] `(site)/layout.tsx` is ≤ 30 lines, delegates to `SiteShell`
- [ ] All pages use consistent `#main-content` landmark
- [ ] Locale prop flows explicitly through shell components

---

## 5. Navigation architecture

### Objective

Prepare navigation for mobile-first responsive behavior and future service portal expansion without changing visual design yet.

### Current state

- `data/navigation.ts` — 10-item flat list
- `HeaderNav.tsx` — horizontal `<ul>`, no mobile menu, search link in header tools
- No active-route indication

### Deliverables

- `data/navigation.ts` — add optional `group` field (`"primary" | "secondary" | "utility"`) for future grouping
- `components/navigation/MainNav.tsx` — extract nav list from HeaderNav
- `components/navigation/NavItem.tsx` — single link with active-state hook (CSS class only, no visual change)
- `hooks/useActivePath.ts` — client hook for pathname matching (for future mobile drawer)
- `docs/architecture/NAVIGATION.md` — nav data model, locale rules, extensibility notes

### Future-ready (document only, no UI yet)

- Mobile drawer pattern spec
- Service portal sub-nav injection point
- Breadcrumb data model for inner pages

### Acceptance criteria

- [ ] HeaderNav composes MainNav + LanguageSwitch + search link
- [ ] Nav data remains single source in `data/navigation.ts`
- [ ] Active route class applied (visually subtle or same as today)

---

## 6. Homepage architecture

### Objective

Structure homepage as a declarative section registry for easier content updates and AI-assisted editing.

### Current composition

```
Hero → QuickLinks → ServicesOverview → ResearchSystemsCTA → NewsHighlights → DocumentsCTA → GreenOfficeSection
```

### Deliverables

- `data/home-sections.ts` — ordered section registry:

```typescript
export type HomeSectionId =
  | "hero"
  | "quick-links"
  | "services-overview"
  | "research-systems-cta"
  | "news-highlights"
  | "documents-cta"
  | "green-office";

export const homeSections: HomeSectionId[] = [ /* order */ ];
```

- `components/home/HomeSectionRenderer.tsx` — maps section ID → component
- Refactor `app/[locale]/(site)/page.tsx` to iterate registry (behavior unchanged)

### Acceptance criteria

- [ ] Homepage section order controlled from one data file
- [ ] Each section component accepts `{ locale: Locale }` consistently
- [ ] No visual or content change on `/th/` or `/en/`

---

## 7. Service portal architecture

### Objective

Unify academic services, research services, and research systems under a consistent portal pattern for future RAEMJU integration.

### Current state

| Route | Component | Data |
|-------|-----------|------|
| `/academic-services/` | `ServiceCatalog` | `academic-services-registry.ts` |
| `/research-services/` | `ServiceCatalog` | `research-services-registry.ts` |
| `/research-systems/` | `PageSimple` | `pages.ts` |

### Deliverables

- `data/service-portal.ts` — portal metadata (title, lead, category) per service area
- `components/services/ServicePortalLayout.tsx` — shared wrapper: title, lead, catalog slot, related links
- `lib/services-i18n.ts` — extend with portal-level helpers (already has `localizeService`)
- Align `research-systems` page to use portal layout shell (content unchanged)
- Document external system links pattern (Metabase, RAEMJU SSO — out of scope for deploy)

### Acceptance criteria

- [ ] All three service routes share `ServicePortalLayout`
- [ ] Service registries remain static TypeScript (no CMS)
- [ ] Portal layout ready for future authenticated sub-routes without refactor

---

## 8. Mobile-first requirements

### Objective

Establish responsive baseline in CSS architecture before visual redesign.

### Requirements

| Requirement | Sprint 1 action |
|-------------|-----------------|
| Viewport meta | Verify in `app/layout.tsx` |
| Touch targets | Min 44×44px on nav links and CTAs (token + CSS) |
| Readable line length | `--content-max-width` token, applied via `.layout-container` |
| Horizontal scroll | Zero overflow on 320px viewport |
| Navigation | Document mobile drawer spec; optional `display: none` nav below `md` with visually hidden accessible fallback **or** horizontal scroll nav as interim |
| Images/PDFs | Responsive embed rules in base layer |
| Thai text | `line-height: 1.7+` for body Thai copy |

### Deliverables

- Responsive rules in source `globals.css` using mobile-first `@media (min-width: ...)`
- `docs/design/MOBILE_FIRST.md` — breakpoint table and test viewports
- Manual test checklist: 320, 375, 768, 1024, 1280 px

### Acceptance criteria

- [ ] No horizontal scrollbar on homepage at 320px width
- [ ] All nav links reachable on mobile (scroll or drawer — document choice)
- [ ] Font sizes use `rem` / fluid scale from tokens

---

## 9. Accessibility requirements

### Objective

Meet WCAG 2.1 AA baseline for a public university website.

### Current strengths

- Skip-to-main link in `(site)/layout.tsx`
- `aria-label` on main nav
- Semantic `<header>`, `<nav>`, `<main>`, `<footer>`
- `HtmlLang` sets document language per locale

### Gaps to close in Sprint 1

| Gap | Action |
|-----|--------|
| Focus visibility | `:focus-visible` styles on all interactive elements |
| Color contrast | Audit brand greens against WCAG AA (document ratios in tokens) |
| Heading hierarchy | Audit homepage — ensure single `<h1>` per page |
| Link purpose | External links get `rel="noopener"` + visible external indicator (CSS) |
| Search | `SiteSearch` — label association, keyboard trap prevention |
| Language switch | `LanguageSwitch` — announce locale change (aria-live or link text) |
| PDF links | Document file type and size in link text where possible |

### Deliverables

- `docs/a11y/CHECKLIST.md` — page-by-page audit template
- Focus and skip-link styles in source CSS
- Fix any heading hierarchy issues found in audit (no visual redesign)

### Acceptance criteria

- [ ] axe-core or Lighthouse a11y score ≥ 90 on `/th/` and `/en/` homepage
- [ ] Keyboard-only navigation reaches all interactive elements
- [ ] Skip link visible on focus

---

## 10. AI-ready architecture

### Objective

Structure content and metadata so AI tools (Cursor, future CMS bots, search indexing) can read, suggest, and update content safely.

### Principles

1. **Content as data** — keep registries in `data/` as the single source; no copy in JSX
2. **Typed schemas** — strengthen `content-models.ts` with JSDoc and validation
3. **Stable IDs** — every news item, service, document has a permanent `id` field
4. **Bilingual blocks** — consistent `translation_en` pattern across all registries
5. **Section metadata** — add optional `summary`, `keywords`, `lastUpdated` fields for AI context
6. **Machine-readable exports** — optional `scripts/export-content-json.ts` for corpus dump

### Deliverables

- Harden `data/content-models.ts` — validate against all 20 registries
- Add JSDoc to each registry file describing purpose and edit rules
- `data/README.md` — content authoring guide for humans and AI agents
- Optional: `public/content-manifest.json` generated at build time (news + services index)

### Acceptance criteria

- [ ] Every content registry item has a unique `id`
- [ ] `content-models.ts` types compile with zero `@ts-expect-error`
- [ ] Content authoring guide documents locale rules and org naming (`lib/org-names.ts`)
- [ ] AI agent can add a news article by editing only `data/news-registry.ts` + `data/newsHighlights.ts`

---

## Sprint 1 task order

```
Week 1
├── 1. Design tokens (foundation for everything)
├── 2. Tailwind v4 cleanup
├── 3. globals.css rewrite
└── 4. Layout architecture (SiteShell extraction)

Week 2
├── 5. Navigation architecture
├── 6. Homepage section registry
├── 7. Service portal layout
└── 8. Mobile-first CSS baseline

Week 3
├── 9. Accessibility audit + fixes
├── 10. AI-ready content schemas
└── Final: npm run build + diff vs production landing
```

---

## Out of scope (Sprint 1)

- Visual redesign or new brand assets
- Production or staging deploy
- Nginx configuration
- Joomla changes
- Archive phase (`VPS_ORGANIZATION_PLAN.md`)
- CI/CD pipeline (defer to post-GitHub push)
- RAEMJU authenticated portal integration

---

## Definition of done

Sprint 1 is complete when:

1. Source `globals.css` replaces compiled output and builds cleanly
2. Layout, nav, homepage, and service pages use documented architecture patterns
3. Mobile and accessibility baselines documented and verified
4. Content models validated and AI authoring guide published
5. `npm run build` output matches production content (diff approved)
6. All changes committed and pushed to `main` on GitHub

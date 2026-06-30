# STITCH Landing V2 — Implementation Audit

**Date:** 2026-06-29
**Source:** `docs/design-freeze-v2/stitch-landing-v2/code.html` + `screen.png`
**Status:** ⚠️ Audit only — no production code changes

---

## 1. Overall Design Analysis

The Stitch Landing V2 is a **brand-new Thai-first landing design** built with Tailwind CSS v3 CDN. It uses Sarabun (Thai-optimized sans-serif) as the primary font, a different color system (`brand` namespace vs V6's 50+ Material tokens), and a traditional corporate-institutional layout with an ivory/cream background palette (`#F7F3EA`).

**Key differences from current V6 LandingRenderer:**
- **Thai-first** — the HTML is entirely in Thai; current V6 is English-first with `locale="en"` hardcoded for `/landing-v6`
- **Sarabun font** vs V6's Inter/Hanken Grotesk/JetBrains Mono
- **Brand color tokens** (`#005C3B` primary, `#D8A01A` gold) vs V6's 50+ Material Design token system
- **Traditional layout** — container-based, max-width sections, white cards with shadows vs V6's full-bleed dark hero, glass panels, premium shadows
- **5-column service grid** vs V6's 3-column pillar cards
- **Real statistics (hardcoded)** — 586 projects, 1,248 publications, 124 personnel, 8,732 beneficiaries — vs V6's placeholder `—` / `...`
- **Research list with thumbnails** vs V6's large showcase feature cards
- **Knowledge resource grid** (5-column) vs V6's ecosystem dark section
- **Partner logos section** — not present in V6

---

## 2. Section Inventory

| # | Section | ID/Semantic | Description | Present in V6? |
|---|---|---|---|---|
| 1 | **Top Bar** | `<header>` | Utility bar: staff login, language switch | ❌ No (V6 has none) |
| 2 | **Main Navigation** | `<header> <nav>` | Logo, site title (TH), nav links (TH), search bar, mobile hamburger | ⚠️ Partial (V6 has fewer nav items, different layout) |
| 3 | **Hero** | `<section>` | Full-width dark green gradient bg, TH headline, tagline, 2 CTAs | ⚠️ Partial (V6 is full-viewport dark with parallax; Stitch is 600px fixed height) |
| 4 | **Services Section** | `<section>` | Off-white bg, 5-column grid of service cards with icons, "view all" link | ⚠️ Partial (V6 has At a Glance with 3 pillar cards) |
| 5 | **Statistics Section** | `<section>` | Dark green (`brand-forest`) bg, 4 stats + header column, real numbers | ⚠️ Partial (V6 has metrics dashboard as glass overlay, placeholder values) |
| 6 | **Content Section** | `<section>` | Two-column grid: research list (left) + news list (right) | ⚠️ Partial (V6 splits these into separate Showcase + News sections) |
| 7 | **Knowledge Resources** | `<section>` | Gray bg, 5-column grid of knowledge resource cards with icons | ❌ No (V6 has dark Ecosystem section) |
| 8 | **Partners Section** | `<section>` | White bg, horizontal partner logo row | ❌ No |
| 9 | **Footer** | `<footer>` | 4-column grid: logo/contact, main menu, popular services, social/newsletter | ⚠️ Partial (V6 has 4-column footer but different content) |

**Total sections: 9** (Stitch) vs **11 sections** (V6 LandingRenderer)

---

## 3. Component Inventory

| Component | Stitch Implementation | Reusable from V6? | Notes |
|---|---|---|---|
| **Header/TopBar** | Utility bar + sticky nav with logo, nav links, search | ❌ **New** | V6 TopNavBar is different layout, no utility bar |
| **Logo** | `w-12 h-12` white circle with RAE logo image | ❌ **New layout** | V6 uses `h-12 w-auto` with text beside |
| **Nav Links** | 6 links: หน้าหลัก, เกี่ยวกับเรา, วิจัยฯ, บริการวิชาการ, เอกสารฯ, ข่าวสารฯ | ❌ **New** | V6 has 5 EN links |
| **Search** | Inline search input with icon | ❌ **New** | V6 uses icon-only button |
| **Mobile Menu** | Hamburger icon button | ❌ **New** | V6 has no mobile menu toggle |
| **Hero Background** | 600px fixed height, gradient overlay, content left-aligned | ❌ **New** | V6 is 95vh, centered, with logo watermark |
| **Hero Headline** | Sarabun bold, 4xl-6xl, gold accent span | ❌ **New** | V6 uses Hanken Grotesk, italic secondary line |
| **Hero CTAs** | 2 buttons: "เกี่ยวกับเรา" (green), "บริการของเรา" (gold) | ❌ **New** | Different labels, different styling |
| **Service Cards** | 5-card grid, centered icons, hover lift effect | ❌ **New** | Similar concept to V6 At a Glance but different layout |
| **Service Card Icon** | `w-16 h-16` green circle with SVG icon | ❌ **New** | V6 uses image thumbnails |
| **Statistics Section** | 4 stat items with icons, real numbers, gold accent | ❌ **New** | V6 uses glass overlay with placeholder values |
| **Research List** | Grid: featured large image + 3 small items with thumbnails | ❌ **New** | Different from V6 Showcase (asymmetric 12-col grid) |
| **News List** | Featured news + 3 small news items with thumbnails | ❌ **New** | Different from V6 News (featured story + dispatches) |
| **Knowledge Resources** | 5-card resource grid with icons | ❌ **New** | Different from V6 Ecosystem dark section |
| **Partners** | Logo row, horizontally centered | ❌ **New** | Not in V6 |
| **Footer** | 4-column: contact, menu, services, social/newsletter | ⚠️ Partial | V6 has 4-column too but different structure |
| **Social Icons** | Facebook, Line, YouTube with brand colors | ❌ **New** | Not in V6 |
| **Newsletter Form** | Email input + "subscribe" button | ❌ **New** | Not in V6 |

---

## 4. Layout Hierarchy

```
Page
├── Header (sticky, z-50)
│   ├── Top Bar (utility: login, language)
│   └── Main Nav (logo + nav links + search + hamburger)
├── Hero Section
│   ├── Background image + gradient overlay
│   └── Content container (headline, paragraph, 2 CTAs)
├── Services Section (ivory bg, -mt-10 overlap)
│   ├── Section header (title + view-all link)
│   └── 5-column service card grid
├── Statistics Section (dark green bg)
│   ├── Header column (title + "view all" link)
│   └── 4-column stat grid (icon + number + label)
├── Content Section (white bg)
│   ├── Left: Research List (featured + 3 items)
│   └── Right: News List (featured + 3 items)
├── Knowledge Resources (gray bg)
│   ├── Section header (title + description)
│   └── 5-column resource card grid
├── Partners Section (white bg)
│   └── Logo row (centered, horizontal)
└── Footer (dark green bg)
    ├── 4-column grid (contact/menu/services/social)
    └── Bottom bar (copyright + legal links)
```

---

## 5. Responsive Notes

| Breakpoint | Behavior | Observations |
|---|---|---|
| **Desktop (lg: 1024px+)** | Full multi-column layouts, nav visible, search visible | 5-col services, 4-col stats, 5-col resources |
| **Tablet (md: 768px+)** | Grids collapse to 2 columns, nav hidden | md:grid-cols-2 for research list |
| **Mobile (<768px)** | Single column, hamburger menu visible | All grids go to grid-cols-1 or grid-cols-2 |
| **Hero** | Always 600px height (fixed) | Text reflows but height stays fixed — risk of overflow on small screens |

**Responsive classes used:**
- Services: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5`
- Stats: `grid-cols-2 md:grid-cols-4`
- Research list: `grid-cols-1 md:grid-cols-2`
- Knowledge: `grid-cols-2 md:grid-cols-5`
- Footer: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

**No visible responsive text size adjustments** beyond the hero headline (`text-4xl md:text-5xl lg:text-6xl`).

---

## 6. Typography Analysis

| Property | Stitch V2 | Current V6 LandingRenderer | Verdict |
|---|---|---|---|
| **Primary Font** | Sarabun (Thai sans-serif) | Inter (Latin sans-serif) | ❌ Different |
| **Display Font** | Sarabun (same) | Hanken Grotesk (Latin display) | ❌ Different |
| **Mono Font** | None used | JetBrains Mono | ❌ Different |
| **Hero Headline** | `text-4xl md:text-5xl lg:text-6xl` bold | `font-display-lg text-display-lg` (64px) | ❌ Different sizing |
| **Body Text** | `text-lg md:text-xl` / `text-sm` / `text-xs` | `font-body-lg text-body-lg` / `text-sm` / `text-[11px]` | ⚠️ Similar scale |
| **Heading Scale** | h2: `text-2xl font-bold` | `font-headline-xl text-headline-xl` | ❌ Different scale |
| **Label Style** | `text-xs font-semibold` (uppercase) | `font-label-sm text-[10px] uppercase tracking-widest` | ⚠️ Similar |
| **Thai Support** | ✅ Sarabun has native Thai glyphs | ⚠️ Inter has limited Thai (would need Noto Sans Thai) | ❌ Critical difference |

**Critical finding:** The current V6 landing uses Latin-only fonts (Inter, Hanken Grotesk). The Stitch V2 design is Thai-first with Sarabun — a font that properly supports both Thai and Latin characters. This is a **fundamental typography architecture change**.

---

## 7. Color Token Analysis

| Stitch Token | Value | V6 Token | Value | Match? |
|---|---|---|---|---|
| `brand-primary` | `#005C3B` | `--color-primary` | `#004229` | ⚠️ Close (slightly darker in V6) |
| `brand-dark` | `#003F2A` | `--color-primary-container` | `#005c3b` | ❌ Different |
| `brand-forest` | `#014D35` | — | — | ❌ New |
| `brand-gold` | `#D8A01A` | `--color-secondary-container` | `#fddc00` | ❌ Different (Stitch gold is darker, more amber) |
| `brand-goldhover` | `#c79318` | — | — | ❌ New |
| `brand-ivory` | `#F7F3EA` | `--color-surface` | `#fcf9f8` | ⚠️ Close |
| `brand-light` | `#f8f9fa` | `--color-surface-bright` | `#fcf9f8` | ⚠️ Close |
| `gray-50` | `#f9fafb` | `--color-surface-container-low` | `#f6f3f2` | ⚠️ Close |
| `gray-100` | `#f3f4f6` | `--color-surface-container` | `#f0edec` | ⚠️ Close |
| `gray-200` | `#e5e7eb` | `--color-outline-variant` | `#bfc9c0` | ❌ Different |
| `gray-800` | `#1f2937` | `--color-on-surface` | `#1c1b1b` | ✅ Close |
| `green-50` | `#f0fdf4` | — | — | ❌ New |
| `green-800/50` | rgba(22,101,52,0.5) | — | — | ❌ New |
| `green-200` | `#bbf7d0` | — | — | ❌ New |

**Overall:** Stitch uses a **brand-constrained palette** (5 brand colors + Tailwind grays/greens). V6 uses a **50+ Material Design token system**. The brand green is similar but the gold is significantly different. The Stitch palette is simpler and more traditional; the V6 palette is more nuanced and modern.

---

## 8. CSS Strategy

| Aspect | Stitch Approach | V6 Approach |
|---|---|---|
| **Framework** | Tailwind v3 CDN (via script tag) | Tailwind v4 (via `landing-v6.css` @theme) |
| **Custom Classes** | `.shadow-soft`, `.card-hover` (inline `<style>`) | `.glass-panel`, `.dark-glass-panel`, `.premium-shadow`, `.active\:scale-98` |
| **Color System** | `brand-*` in `tailwind.config.theme.extend.colors` | 50+ `--color-*` tokens via `@theme` |
| **Custom Spacing** | Default Tailwind spacing | `--spacing-*` tokens (margin-mobile, margin-desktop, gutter) |
| **Font Loading** | Google Fonts (Sarabun via `<link>`) | `next/font/google` (Inter, Hanken Grotesk, JetBrains Mono) |
| **Icons** | Inline SVG | Material Symbols (icon font via CDN `<link>`) |

**Recommendation:** For a Next.js implementation, all Tailwind should be server-side (no CDN). SVG icons should be extracted as React components. The `@theme` approach from V6 should be adapted with new Stitch brand tokens.

---

## 9. Motion Opportunities

| Element | Current | Recommendation | Priority |
|---|---|---|---|
| **Card hover** | `.card-hover`: translateY(-5px) + shadow increase | ✅ Reuse as Tailwind class or CSS module | P0 |
| **Hero gradient** | Static | Subtle ambient animation on gradient opacity | P2 |
| **Stat counters** | Static | Animate counting on scroll (Intersection Observer) | P1 |
| **Section reveals** | None | Add `fade-in-up` on scroll reveal | P1 |
| **Nav link hover** | Color transition | ✅ Reuse current `transition-colors` | P0 |
| **Resource card hover** | Border + shadow + icon bg color | ✅ Reuse pattern | P0 |

---

## 10. Accessibility Observations

| Check | Status | Notes |
|---|---|---|
| **Semantic HTML** | ✅ Good | `<header>`, `<nav>`, `<section>`, `<footer>` used correctly |
| **Heading hierarchy** | ⚠️ Issue | Uses `<h1>` for logo text "RAE", `<h2>` for hero headline, `<h3>` for section titles, `<h4>` for card titles — hierarchy exists but logo as h1 is debatable |
| **Alt text** | ❌ Missing | Images have `alt` attributes but they're empty or generic |
| **Form labels** | ❌ Missing | Search input and newsletter email input have no `<label>` |
| **Focus styles** | ⚠️ Default | Only `focus:ring-2 focus:ring-brand-gold` on search input |
| **Color contrast** | ✅ Likely OK | Dark green on white, white on dark green all pass WCAG AA |
| **Skip to content** | ❌ Missing | No skip navigation link |
| **Link purpose** | ⚠️ Partial | Many `href="#"` — no real navigation yet |
| **Touch targets** | ⚠️ Edge | Some mobile icons might be < 44px |

---

## 11. Components That Can Be Reused

| Component | From V6 | Notes |
|---|---|---|
| `TopNavBar` | `LandingRenderer.tsx` (lines ~35-60) | Can be adapted — same sticky concept, different content |
| `Footer` | `LandingRenderer.tsx` (lines ~520-550) | 4-column grid layout is similar — can be restructured |
| `Service Card` pattern | `atAGlance.pillars` mapping | Different layout (icon vs image) but same card concept |
| `News Item` pattern | `news.dispatches` mapping | Similar concept — image + text + tag |
| `Button` styles | Primary/secondary CTA patterns | Can reuse Tailwind utility patterns |

---

## 12. Components That Must Be New

| Component | Reason | Complexity |
|---|---|---|
| **TopBar** (utility bar) | Not present in V6 | Low |
| **Hero Section** | Different layout (600px fixed, left-aligned content, no watermark) | Medium |
| **Service Cards Grid** (5-column) | Different from V6 3-column pillars | Medium |
| **Statistics Section** (dark green with real numbers) | Different from V6 glass metrics overlay | Medium |
| **Research List** (featured + thumbnails) | Different from V6 showcase grid | Medium |
| **News List** (featured + small items) | Different from V6 news layout | Medium |
| **Knowledge Resources Grid** (5-column) | Different from V6 dark ecosystem | Medium |
| **Partners Section** (logo row) | Not present in V6 | Low |
| **Newsletter Signup Form** | Not present in V6 | Low |
| **Social Media Icons** (Facebook/Line/YouTube) | Not present in V6 | Low |
| **SVG Icon System** | V6 uses Material Symbols; Stitch uses inline SVGs | Medium |
| **Mobile Hamburger Menu** | V6 has no mobile menu toggle | Medium |

---

## 13. Estimated Implementation Complexity

| Category | Rating | Reasoning |
|---|---|---|
| **Overall complexity** | **Medium** | Mix of new components + adapted patterns |
| **New components needed** | ~12 | Most are medium complexity |
| **Reusable components** | ~3 | TopNavBar, Footer, card patterns |
| **CSS work** | Medium | New color tokens, font switch, no CDN Tailwind |
| **Data integration** | Low | Static content — no API dependency |
| **Typography overhaul** | High | Switching from Inter/Hanken to Sarabun affects every text element |
| **Icon system** | Medium | Converting inline SVGs to React components |
| **Responsive design** | Low | Already defined in Stitch HTML's responsive classes |
| **Accessibility fixes** | Low | Mostly adding labels and alt text |
| **Motion** | Low | Simple hover effects + potential scroll reveals |
| **Estimated effort** | **3–5 days** | For a single developer familiar with the codebase |

---

*End of Implementation Audit. Planning only — no production code changes.*

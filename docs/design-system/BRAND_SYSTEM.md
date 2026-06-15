# Brand System — RAE MJU Visual Source of Truth (RC5.5)

**Status**: Canonical for Landing, Motion, Canva, fal.ai, Next.js UI, and RC6 Content Injection  
**Supersedes for color**: `design-system/DESIGN_TOKENS_V1.md` (legacy blue `#1A237E` palette — do not use for new work)  
**GitHub**: Source of truth for all design decisions documented here

---

## Brand foundation

| Token | Hex | Role |
|-------|-----|------|
| **Primary Green** | `#005C3B` | Institutional identity, primary actions, headings accent |
| **Secondary Gold** | `#FFDE00` | Highlight, secondary CTA, achievement markers, sparing accent |

**Institution**: สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ (RAE, Maejo University)  
**Experience direction**: Premium Institutional — calm authority, research credibility, Thai-first readability  
**Reference aesthetics** (tone, not copy): UTCC institutional clarity, Vercel/Stripe polish, Linear restraint, Apple Education warmth, MIT Media Lab innovation without noise

---

## Green scale (50–900)

Base primary: **500 = `#005C3B`**

| Step | Hex | Usage |
|------|-----|-------|
| 50 | `#E8F5F0` | Subtle backgrounds, success tint wash |
| 100 | `#C5E6D9` | Hover wash on light surfaces |
| 200 | `#9FD4C0` | Borders on green-tinted cards |
| 300 | `#79C2A7` | Decorative accents, chart secondary |
| 400 | `#4DAF8C` | Interactive hover on green elements |
| **500** | **`#005C3B`** | **Primary brand, primary buttons, logo mark** |
| 600 | `#004D32` | Button hover, active nav |
| 700 | `#003E28` | Dark section backgrounds |
| 800 | `#002F1E` | Footer deep, hero overlay base |
| 900 | `#001F14` | Maximum contrast green, data viz dark |

---

## Neutral scale

Warm stone neutrals — avoid cold blue-grays on marketing surfaces.

| Step | Hex | Usage |
|------|-----|-------|
| 50 | `#FAFAF9` | Page background default |
| 100 | `#F5F5F4` | Section alternate background |
| 200 | `#E7E5E4` | Dividers, input borders |
| 300 | `#D6D3D1` | Disabled borders |
| 400 | `#A8A29E` | Placeholder text, meta labels |
| 500 | `#78716C` | Secondary body text |
| 600 | `#57534E` | Strong meta, captions |
| 700 | `#44403C` | Subheadings on light |
| 800 | `#292524` | Primary body text |
| 900 | `#1C1917` | Headlines on light surfaces |

---

## Surface colors

| Token | Light mode | Usage |
|-------|------------|-------|
| `surface-page` | `#FAFAF9` | Default page canvas |
| `surface-raised` | `#FFFFFF` | Cards, modals, dropdowns |
| `surface-sunken` | `#F5F5F4` | KPI band, inset panels |
| `surface-brand` | `#005C3B` | Hero overlays, brand bands |
| `surface-brand-subtle` | `#E8F5F0` | About preview, soft brand sections |
| `surface-gold-subtle` | `#FFF9CC` | Achievement / highlight strip (gold 50) |
| `surface-inverse` | `#1C1917` | Dark footer, inverse sections |

Dark mode (when implemented): invert surfaces using neutral 900 page, neutral 800 raised, green 400 for accents — document in Next.js theme layer, not here.

---

## Border colors

| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#E7E5E4` | Card edges, section dividers |
| `border-strong` | `#D6D3D1` | Input focus ring base |
| `border-brand` | `#79C2A7` | Selected cards, active filters |
| `border-gold` | `#FFDE00` | Achievement badge outline (use sparingly) |
| `border-inverse` | `#44403C` | Borders on dark surfaces |

---

## Text hierarchy

| Level | Color token | Size guidance | Weight | Usage |
|-------|-------------|---------------|--------|-------|
| Display | `text-primary` `#1C1917` | 48–64px / clamp | 600–700 | Hero headline (Thai + EN) |
| H1 | `text-primary` | 36–48px | 600 | Section titles |
| H2 | `text-primary` | 28–36px | 600 | Subsection titles |
| H3 | `text-primary` | 22–28px | 500–600 | Card titles |
| Body | `text-body` `#292524` | 16–18px | 400 | Paragraphs, descriptions |
| Body small | `text-secondary` `#57534E` | 14–16px | 400 | Supporting copy |
| Meta | `text-muted` `#78716C` | 12–14px | 400 | Dates, labels, captions |
| Inverse | `text-inverse` `#FAFAF9` | per level | 400–600 | Text on brand/dark surfaces |
| Link | `text-link` `#005C3B` | inherit | 500 | Inline links; underline on hover |
| Link hover | `text-link-hover` `#004D32` | inherit | 500 | — |

**Typography families** (align with existing notes):

- Thai + Latin UI: `'Prompt'`, `'Noto Sans Thai'`, system-ui fallback
- Data / dashboard numerals: `'Inter'`, `'Noto Sans Thai'`, tabular-nums

---

## CTA colors

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| **Primary** | `#005C3B` | `#FFFFFF` | none | `#004D32` |
| **Secondary** | transparent | `#005C3B` | `#005C3B` | bg `#E8F5F0` |
| **Gold accent** | `#FFDE00` | `#1C1917` | none | `#E6C800` |
| **Ghost inverse** | transparent | `#FAFAF9` | `#FAFAF9` | bg `rgba(255,255,255,0.12)` |
| **Disabled** | `#E7E5E4` | `#A8A29E` | none | — |

**Rules**:

- One primary CTA per viewport section maximum.
- Gold accent CTA: hero or KPI only — never compete with primary green in same row.
- Do not use legacy WTMS banner colors or unapproved blues from old tokens.

---

## Dashboard colors

Dashboard UI (internal/admin preview on landing) uses **neutral-first** palette with green for status only.

| Token | Hex | Usage |
|-------|-----|-------|
| `dash-bg` | `#F5F5F4` | Panel background |
| `dash-surface` | `#FFFFFF` | Widget cards |
| `dash-border` | `#E7E5E4` | Grid lines |
| `dash-text` | `#292524` | Labels |
| `dash-metric` | `#1C1917` | KPI numbers |
| `dash-accent` | `#005C3B` | Positive trend, active tab |
| `dash-gold` | `#FFDE00` | Highlight metric (max 1 per view) |
| `dash-warning` | `#B45309` | Caution states |
| `dash-error` | `#B91C1C` | Error states |
| `dash-chart-1` | `#005C3B` | Primary series |
| `dash-chart-2` | `#79C2A7` | Secondary series |
| `dash-chart-3` | `#78716C` | Tertiary series |

---

## Spacing, radius, elevation (companion tokens)

| Token | Value | Notes |
|-------|-------|-------|
| `space-base` | `16px` | Grid unit (from DESIGN_TOKENS_V1) |
| `radius-sm` | `6px` | Chips, tags |
| `radius-md` | `8px` | Buttons, inputs (legacy default) |
| `radius-lg` | `12px` | Cards |
| `radius-xl` | `16px` | Hero media, large panels |
| `shadow-sm` | `0 1px 2px rgba(28,25,23,0.06)` | Cards at rest |
| `shadow-md` | `0 4px 12px rgba(28,25,23,0.08)` | Hover lift |
| `shadow-brand` | `0 8px 24px rgba(0,92,59,0.12)` | Primary CTA emphasis |

---

## CSS token examples

### `:root` custom properties

```css
:root {
  /* Brand core */
  --color-green-50: #E8F5F0;
  --color-green-100: #C5E6D9;
  --color-green-200: #9FD4C0;
  --color-green-300: #79C2A7;
  --color-green-400: #4DAF8C;
  --color-green-500: #005C3B;
  --color-green-600: #004D32;
  --color-green-700: #003E28;
  --color-green-800: #002F1E;
  --color-green-900: #001F14;

  --color-gold-500: #FFDE00;
  --color-gold-600: #E6C800;

  /* Neutrals */
  --color-neutral-50: #FAFAF9;
  --color-neutral-100: #F5F5F4;
  --color-neutral-200: #E7E5E4;
  --color-neutral-300: #D6D3D1;
  --color-neutral-400: #A8A29E;
  --color-neutral-500: #78716C;
  --color-neutral-600: #57534E;
  --color-neutral-700: #44403C;
  --color-neutral-800: #292524;
  --color-neutral-900: #1C1917;

  /* Semantic shortcuts */
  --color-primary: var(--color-green-500);
  --color-secondary: var(--color-gold-500);
  --color-surface-page: var(--color-neutral-50);
  --color-surface-raised: #FFFFFF;
  --color-text-primary: var(--color-neutral-900);
  --color-text-body: var(--color-neutral-800);
  --color-text-muted: var(--color-neutral-500);
  --color-border-default: var(--color-neutral-200);

  /* CTA */
  --color-cta-primary-bg: var(--color-green-500);
  --color-cta-primary-hover: var(--color-green-600);
  --color-cta-primary-text: #FFFFFF;
  --color-cta-gold-bg: var(--color-gold-500);
  --color-cta-gold-text: var(--color-neutral-900);

  /* Motion (see MOTION_LANGUAGE_BIBLE.md) */
  --duration-hover: 200ms;
  --duration-reveal: 800ms;
  --duration-interaction: 300ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Tailwind-style extension (reference for Next.js config)

```js
// tailwind.config — reference only; implement in app repo when approved
const brand = {
  green: {
    50: '#E8F5F0', 100: '#C5E6D9', 200: '#9FD4C0', 300: '#79C2A7',
    400: '#4DAF8C', 500: '#005C3B', 600: '#004D32', 700: '#003E28',
    800: '#002F1E', 900: '#001F14',
  },
  gold: { 500: '#FFDE00', 600: '#E6C800' },
};
```

### Component token usage

```css
.btn-primary {
  background: var(--color-cta-primary-bg);
  color: var(--color-cta-primary-text);
  border-radius: var(--radius-md, 8px);
  transition: background var(--duration-hover) var(--ease-out);
}
.btn-primary:hover {
  background: var(--color-cta-primary-hover);
}

.card-raised {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-default);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(28, 25, 23, 0.06));
}
```

---

## Related documents

| Document | Path |
|----------|------|
| Visual photography rules | `docs/design-system/VISUAL_LANGUAGE_BIBLE.md` |
| Motion rules | `docs/design-system/MOTION_LANGUAGE_BIBLE.md` |
| Landing section experience | `docs/design-system/LANDING_EXPERIENCE_GUIDE.md` |
| Governance & QA | `docs/design-system/DESIGN_GOVERNANCE.md` |
| Legacy tokens (deprecated colors) | `design-system/DESIGN_TOKENS_V1.md` |

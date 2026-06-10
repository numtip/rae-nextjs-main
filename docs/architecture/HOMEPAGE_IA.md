# Homepage Information Architecture

**Route:** `/[locale]/` (`/th/`, `/en/`)  
**Renderer:** `components/home/HomeSectionRenderer.tsx`  
**Registry:** `data/home-sections.ts`

---

## Section order

Homepage content is driven by a declarative registry — not hard-coded JSX order in the page file.

| # | Section ID | DOM anchor | Group | Component |
|---|------------|------------|-------|-----------|
| 1 | `hero` | `#hero` | intro | `Hero` |
| 2 | `quick-links` | `#quick-links` | intro | `QuickLinks` |
| 3 | `services-overview` | `#services-overview` | services | `ServicesOverview` |
| 4 | `research-systems-cta` | `#research-gateway` | services | `ResearchSystemsCTA` |
| 5 | `kpi-impact` | `#impact-metrics` | content | `KpiImpactStrip` |
| 6 | `news-highlights` | `#news-highlights` | content | `NewsHighlights` |
| 7 | `documents-cta` | `#forms-documents` | utility | `DocumentsCTA` |
| 8 | `green-office` | `#green-office` | utility | `GreenOfficeSection` |

---

## IA groups

```
┌─────────────────────────────────────────┐
│  INTRO                                  │
│  Hero → Quick Links                     │
├─────────────────────────────────────────┤
│  SERVICES                               │
│  Services Overview → Research Systems CTA │
├─────────────────────────────────────────┤
│  CONTENT                                │
│  KPI Impact → News Highlights           │
├─────────────────────────────────────────┤
│  UTILITY                                │
│  Documents CTA → Green Office           │
└─────────────────────────────────────────┘
```

---

## Data flow

```
data/home-sections.ts
        │
        ▼
HomeSectionRenderer (maps id → component)
        │
        ├── data/hero.ts
        ├── data/quickLinks.ts
        ├── data/servicesOverview.ts
        ├── data/cta.ts (research systems)
        ├── data/kpiImpact.ts
        ├── data/newsHighlights.ts + news-registry.ts
        ├── data/cta.ts (documents)
        └── data/greenOffice.ts
```

Each section component reads its own data module. The registry controls **order only**.

---

## Footer cross-links

`data/footer.ts` anchor hashes align with section IDs:

| Footer anchor | Section |
|---------------|---------|
| `#hero` | Hero |
| `#quick-links` | Quick Links |
| `#services-overview` | Services Overview |
| `#research-gateway` | Research Systems CTA |
| `#impact-metrics` | KPI Impact Strip |
| `#news-highlights` | News Highlights |
| `#forms-documents` | Documents CTA |
| `#green-office` | Green Office |

Rendered by `components/footer/FooterLinks.tsx`.

---

## Extending the homepage

To add a section:

1. Add `HomeSectionId` and entry in `data/home-sections.ts`
2. Create or wire component in `HomeSectionRenderer.sectionComponents`
3. Add content module in `data/`
4. Update `data/footer.ts` anchors if the section should appear in footer nav
5. Add CSS in `app/globals.css` if new semantic classes are needed

To reorder: edit `homeSections` array only — no page file changes.

---

## SEO & metadata

Homepage metadata remains in `app/[locale]/(site)/page.tsx` via `generateMetadata()` reading `data/hero.ts`.

---

## Future (Sprint 2+)

- Section-level `visible` flags for seasonal content
- A/B variant slots in registry
- Structured data (`JSON-LD`) per section group
- Service portal deep-links from Quick Links grid

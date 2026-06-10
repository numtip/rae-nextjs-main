# RAE Next.js Main — Project Structure

**Path:** `/home/rae_admin/rae-nextjs-main-recovered`  
**Package:** `rae-nextjs-main@0.1.0`  
**Stack:** Next.js 16.2.4 · React 19.2.4 · TypeScript 5.9.3 · Tailwind CSS 4.2.4  
**Export mode:** `output: "export"` · `trailingSlash: true`  
**Public mount:** `/rae-landing/` (via `lib/site.ts` + nginx alias)

---

## Directory Overview

```
rae-nextjs-main-recovered/
├── app/                    # App Router pages, layouts, metadata routes
├── components/             # Presentational + feature UI components
├── data/                   # Static bilingual content registries
├── lib/                    # Locale, SEO, i18n helpers, site URL utilities
├── public/                 # Static assets (PDFs, SVG placeholders)
├── _recovered-dev-scaffold/ # Isolated dev-only routes (not production)
├── _recovery-manifest.json # Source-map extraction log
├── _extract-from-maps.mjs  # Recovery tooling (read-only on .next)
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── next-env.d.ts
```

**Build artifacts (not source-of-truth):** `.next/`, `node_modules/`, `out/`

---

## Routes

### Static export routes (32 pages)

| Public path | Source file | Type | Primary UI |
|-------------|-------------|------|------------|
| `/` | `app/page.tsx` | Client redirect | Redirect → `/th/` |
| `/th/` | `app/[locale]/(site)/page.tsx` | SSG | Hero, ServicesOverview, NewsHighlights, QuickLinks, CTAs |
| `/en/` | `app/[locale]/(site)/page.tsx` | SSG | Same as Thai home |
| `/th/about/` | `app/[locale]/(site)/about/page.tsx` | SSG | PageSimple, PersonnelSection |
| `/en/about/` | `app/[locale]/(site)/about/page.tsx` | SSG | Same |
| `/th/contact/` | `app/[locale]/(site)/contact/page.tsx` | SSG | PageSimple, PersonnelSection |
| `/en/contact/` | `app/[locale]/(site)/contact/page.tsx` | SSG | Same |
| `/th/academic-services/` | `app/[locale]/(site)/academic-services/page.tsx` | SSG | PageSimple, ServiceCatalog |
| `/en/academic-services/` | `app/[locale]/(site)/academic-services/page.tsx` | SSG | Same |
| `/th/research-services/` | `app/[locale]/(site)/research-services/page.tsx` | SSG | PageSimple, ServiceCatalog |
| `/en/research-services/` | `app/[locale]/(site)/research-services/page.tsx` | SSG | Same |
| `/th/forms-documents/` | `app/[locale]/(site)/forms-documents/page.tsx` | SSG | PageSimple, DocumentRegistry |
| `/en/forms-documents/` | `app/[locale]/(site)/forms-documents/page.tsx` | SSG | Same |
| `/th/green-office/` | `app/[locale]/(site)/green-office/page.tsx` | SSG | PageSimple |
| `/en/green-office/` | `app/[locale]/(site)/green-office/page.tsx` | SSG | Same |
| `/th/research-systems/` | `app/[locale]/(site)/research-systems/page.tsx` | SSG | PageSimple |
| `/en/research-systems/` | `app/[locale]/(site)/research-systems/page.tsx` | SSG | Same |
| `/th/news-events/` | `app/[locale]/(site)/news-events/page.tsx` | SSG | PageSimple, NewsListing |
| `/en/news-events/` | `app/[locale]/(site)/news-events/page.tsx` | SSG | Same |
| `/th/news-events/[slug]/` | `app/[locale]/(site)/news-events/[slug]/page.tsx` | SSG | NewsArticleBody (6 slugs) |
| `/en/news-events/[slug]/` | `app/[locale]/(site)/news-events/[slug]/page.tsx` | SSG | Same |
| `/th/search/` | `app/[locale]/(site)/search/page.tsx` | SSG | PageSimple, SiteSearch |
| `/en/search/` | `app/[locale]/(site)/search/page.tsx` | SSG | Same |
| `/robots.txt` | `app/robots.ts` | Metadata route | — |
| `/sitemap.xml` | `app/sitemap.ts` | Metadata route | — |
| `/_not-found` | (Next.js built-in) | Static | 404 |

### Layout chain

```
app/layout.tsx                          # Root: Inter font, metadataBase, globals.css
└── app/[locale]/layout.tsx             # Locale guard, HtmlLang, generateStaticParams
    └── app/[locale]/(site)/layout.tsx  # HeaderNav, Footer, skip link, main shell
        └── page.tsx (per route)
```

### Metadata & i18n

- **Locales:** `th` (default), `en` — defined in `lib/locale.ts`
- **Path helper:** `lib/paths.ts` → `withLocale(locale, path)`
- **SEO:** `lib/seo.ts` → `buildPageMetadata()`
- **Site URLs:** `lib/site.ts` → `SITE_ORIGIN`, `SITE_PATH_PREFIX` (`rae-landing`)

---

## Components (18)

| Component | Role | Used by |
|-----------|------|---------|
| `DocumentRegistry` | Forms & documents table | forms-documents |
| `DocumentsCTA` | Home CTA to documents | home |
| `Footer` | Site footer | site layout |
| `GreenOfficeSection` | Green office panel | home |
| `HeaderNav` | Brand + nav + language switch | site layout |
| `Hero` | Homepage hero | home |
| `HtmlLang` | Sets `<html lang>` per locale | locale layout |
| `LanguageSwitch` | TH/EN toggle | HeaderNav |
| `NewsArticleBody` | Single news article | news-events/[slug] |
| `NewsHighlights` | Home news preview | home |
| `NewsListing` | News index | news-events |
| `PageSimple` | Inner page title/lead/bullets | Most inner pages |
| `PersonnelSection` | Leadership & units | about, contact |
| `QuickLinks` | Home quick links grid | home |
| `ResearchSystemsCTA` | Research systems CTA | home |
| `ServiceCatalog` | Service listings with steps | academic/research services |
| `ServicesOverview` | Home service cards | home |
| `SiteSearch` | Client-side search UI | search |

**Client components:** `SiteSearch`, `LanguageSwitch`, `HtmlLang`, `app/page.tsx` (redirect portal)

---

## Data Modules (21)

| Module | Purpose |
|--------|---------|
| `content-models.ts` | Shared TypeScript types (NewsRecord, DocumentRecord, etc.) |
| `academic-services-registry.ts` | Academic service catalog |
| `research-services-registry.ts` | Research service catalog |
| `brand.ts` | Header brand strings (TH/EN) |
| `cta.ts` | Call-to-action copy |
| `doc-table-ui.ts` | Document table labels |
| `documents.ts` | Document registry (PDF links) |
| `footer.ts` | Footer copy |
| `greenOffice.ts` | Green office content |
| `hero.ts` | Homepage hero copy |
| `navigation.ts` | Main nav items |
| `news-registry.ts` | News articles (source of truth) |
| `news-ui.ts` | News listing labels |
| `newsHighlights.ts` | Home news preview selection |
| `pages.ts` | Inner page titles/leads/bullets |
| `personnel-registry.ts` | Leadership & unit contacts |
| `personnel-ui.ts` | Personnel section labels |
| `quickLinks.ts` | Home quick link cards |
| `search-corpus.ts` | Search index builder |
| `search-ui.ts` | Search page labels |
| `servicesOverview.ts` | Home service overview cards |

**Content pattern:** Static TypeScript registries with optional `translation_en` blocks.

---

## Lib Modules (9)

| Module | Purpose |
|--------|---------|
| `locale.ts` | `locales`, `Locale` type, `isLocale()` |
| `paths.ts` | `withLocale()` path prefixing |
| `site.ts` | Origin, path prefix, absolute URL builders |
| `org-names.ts` | Official bilingual org names |
| `seo.ts` | Page metadata builder |
| `news-i18n.ts` | `localizeNews()` |
| `documents-i18n.ts` | `localizeDocument()` |
| `services-i18n.ts` | `localizeService()` |
| `personnel-i18n.ts` | `localizePersonnel()` |

---

## Public Assets

### `public/documents/` (5 PDFs)

| File | Referenced in |
|------|---------------|
| `rae-research-ethics-notification.pdf` | `data/documents.ts` |
| `rae-academic-service-request.pdf` | `data/documents.ts` |
| `rae-fund-disbursement-checklist.pdf` | `data/documents.ts` |
| `rae-procurement-documentation-guide.pdf` | `data/documents.ts` |
| `rae-project-board-meeting-minutes.pdf` | `data/documents.ts` |

### `public/` SVG placeholders

`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

### `app/favicon.ico`

Copied from production `out/` during recovery.

---

## Config Files

| File | Notes |
|------|-------|
| `next.config.ts` | Reconstructed: static export, trailing slash |
| `postcss.config.mjs` | Recovered: `@tailwindcss/postcss` |
| `tsconfig.json` | `@/*` path alias |
| `package.json` | Reconstructed from lockfile metadata |

**Not present:** `tailwind.config.*` (Tailwind v4 PostCSS-only), `middleware.ts`, `eslint.config.*`, `README.md`

---

## Isolated Artifacts (non-production)

| Path | Reason |
|------|--------|
| `_recovered-dev-scaffold/app-(site)/` | Early dev routes without `[locale]` — conflicts with production layout |
| `*.proxy-artifact/` | Next.js internal proxy dirs from map extraction |
| `_extract-from-maps.mjs` | One-time recovery script |

---

## Dependency Summary

**Runtime:** `next`, `react`, `react-dom`  
**Dev:** `tailwindcss`, `@tailwindcss/postcss`, `typescript`, `eslint`, `eslint-config-next`, `@types/*`

**Node requirement:** ≥ 18 (build verified on v20.19.5; system default v12 will fail)

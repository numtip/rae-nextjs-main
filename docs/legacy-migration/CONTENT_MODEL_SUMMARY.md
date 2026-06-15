# Content Model Summary — Legacy to Next.js (RC6)

Short reference for mapping legacy inventory types to Next.js landing content. Joomla CMS mapping is included only as historical context.

## Legacy content categories

From `migration/STAGING_MANIFEST.csv` (25 approved pages) and `docs/CONTENT_GROUPING_V1.md`:

| Category | `page_type` | Count | Legacy meaning |
|----------|-------------|-------|----------------|
| Home | `home` | 6 | WTMS index / landing variants, banners, highlights |
| About | `about` | 3 | Organization, management, leadership structure |
| Services | `service` | 1 | Academic service unit page |
| News / events | `news` | 2 | Calendar, symposium / announcement |
| Downloads | `download` | 11 | Document hubs, PDFs, `wtms_documentDownload` links |
| Contact | `contact` | 2 | Address page, unit contact / inquiry |

Dropped from injection (in `PAGE_INVENTORY.csv` only): empty pages, fragment-anchor duplicates (`#bodyTab*`, `#carousel*`), and rows with `decision=drop`.

## Inventory `page_type` → Next.js landing sections

Use `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` as the UX target. Map legacy content into these sections **without redesigning layout**:

| `page_type` | STAGING pages (examples) | Next.js landing section | Injection notes |
|-------------|--------------------------|---------------------------|-----------------|
| `home` | PAGE-1001, 1004, 1007, 1026 (canonical); variants 1002 | **Hero** + optional highlight strip | Consolidate 6 rows into one hero; pull banner assets from PAGE-1001/1026 via `ASSET_INVENTORY`. Skip PAGE-1003 (protected login). |
| `about` | PAGE-1009, 1010, 1011 | **About preview** or dedicated About block | Editorial **rewrite** required (institutional org charts). Do not paste legacy WTMS wrapper HTML. |
| `service` | PAGE-1014 | **Quick links / Service hub** card | Title + short description + link to service detail route when it exists. |
| `news` | PAGE-1005, 1024 | **News & events preview** | Calendar title/copy; symposium as featured item. Review age against cutoff (see `MIGRATION_NOTES.md`). |
| `download` | PAGE-1008–1019, 1021–1023, 1025 | **Featured downloads** or resources list | Extract document titles and URLs from `assets`; prefer direct PDF paths over `wtms_documentDownload.aspx` when resolvable. |
| `contact` | PAGE-1006, 1020 | **Footer / contact CTA** | Address, phone, unit inquiry text; no admin or login links. |

### Research content

`content-model/CONTENT_MODEL_V2.md` defines **Research** entities (title, abstract, authors, files). No dedicated `page_type=research` row exists in the current staging batch. Treat symposium/news pages as candidates for research showcase **only after editorial review** — do not auto-promote PAGE-1024 without checking recency and relevance.

## Joomla-era model → Next.js-era usage (historical → active)

Joomla docs describe CMS structure. For RC6, translate concepts to Next.js content usage only:

| Joomla-era (retired) | Legacy source | Next.js-era (active) |
|----------------------|---------------|----------------------|
| Custom homepage module | 6× `home` articles consolidated | Single landing page hero + modules as React sections |
| Article + Category (About) | 3× `about` pages | Static or CMS-driven About section; markdown/JSON content |
| Article (Services) | 1× `service` | Service card in quick-links grid |
| Article (News category) | 2× `news` | News/events list or preview component |
| Media Manager + download articles | 11× `download` + `ASSET_INVENTORY` | Public `/files` or CDN links; link list component |
| Contacts component | 2× `contact` | Footer contact block; form handled by Next.js app |
| Custom fields (`old_url`, PAGE-ID) | CSV `id`, `url` columns | Metadata in content layer for redirects and traceability |
| Menu / Cassiopeia template | Legacy WTMS chrome | **Do not migrate** — use existing Next.js design system only |

## Content entity shapes (CONTENT_MODEL_V2)

When structuring injected content in Next.js, align fields loosely with `content-model/CONTENT_MODEL_V2.md`:

| Entity | Fields | Legacy source |
|--------|--------|---------------|
| Article | title, summary, body, images, tags | `title`, raw HTML body, `assets`, `notes` |
| Service | name, description, category, contact | PAGE-1014 + contact rows |
| Research | title, abstract, authors, files | Future; partial from PAGE-1024 if approved |

Prefer short summaries and image-first presentation (mobile notes in CONTENT_MODEL_V2).

## CSV fields agents use most

From `migration/STAGING_MANIFEST.csv` / `PAGE_INVENTORY.csv`:

| Column | RC6 use |
|--------|---------|
| `id` | Traceability (PAGE-1009 → About org structure) |
| `url` | Legacy URL for redirect metadata |
| `title` | Headline / card title |
| `menu_label` | Nav label if different from title |
| `page_type` | Target Next.js section (table above) |
| `section` | IA grouping hint |
| `decision` | Must be `keep` for injection |
| `notes` | Classification rationale, rewrite flags |
| `protected` | Skip if `yes` (e.g. PAGE-1003 admin login) |
| `filename` | Path to captured raw HTML for text extraction |
| `assets` | Semicolon-separated asset URLs to resolve via `ASSET_INVENTORY` |

## Which files to read first for RC6

| Order | File | Why |
|-------|------|-----|
| 1 | `docs/legacy-migration/README.md` | Index, constraints, workflow |
| 2 | `docs/legacy-migration/MIGRATION_NOTES.md` | Rules, warnings, injection boundaries |
| 3 | `migration/STAGING_MANIFEST.csv` | Exact 25-page scope |
| 4 | This file | Section mapping |
| 5 | `migration/ASSET_INVENTORY.csv` | Resolve images and PDFs |
| 6 | `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` | Target section names (Hero, quick links, footer) |
| 7 | `docs/CONTENT_GROUPING_V1.md` | Page-by-page titles and grouping detail |
| 8 | `docs/JOOMLA_CONTENT_MODEL_V1.md` | **Optional** — only if you need per-page Joomla-era rationale |

Do **not** start with `docs/JOOMLA_BUILD_SEQUENCE_V1.md` or `docker-compose.yml` for RC6 — those are retired runtime paths.

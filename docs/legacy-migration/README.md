# Legacy Migration Documentation Index (RC6)

## Purpose

This folder is an **agent-friendly documentation and index layer** for the RAE MJU legacy migration project. It consolidates pointers, summaries, and RC6 workflow guidance so agents and operators can find migration artifacts quickly without hunting across the repo.

**This folder does not contain migration data.** CSV inventories remain in their original locations. Scripts continue to read `migration/*.csv` unchanged.

## Documentation layer only

| What this folder is | What this folder is not |
|---------------------|-------------------------|
| Index and reading guide for legacy assets | Source of truth for page/asset rows |
| RC6 Content Injection onboarding | Runtime or deployment config |
| Mapping legacy inventory → Next.js landing use | Joomla Docker stack or installer docs |

Do **not** move, copy, or symlink CSV files into this folder. Do **not** change script paths that reference `migration/`.

## Joomla runtime is retired

This project originally targeted **Joomla 6** migration. That implementation path is **retired**. Docker Compose, Joomla build sequences, and CMS-specific blueprints in `docs/` are **historical reference only**.

The **active implementation** is **Next.js**. Reusable value from the legacy migration work:

- Content inventory and classification
- Migration matrix (keep / rewrite / merge / drop decisions)
- Staging manifest (approved subset for injection)
- Asset inventory (images, PDFs, download links)
- Sitemap and IA decisions
- Governance rules and decision log

Agents working on RC6 should treat Joomla docs as **content-model context**, not as implementation instructions.

## Source of truth paths

### Migration CSV (canonical — do not relocate)

| File | Path | Role |
|------|------|------|
| Page inventory | `migration/PAGE_INVENTORY.csv` | All captured legacy pages (30 rows): URL, `page_type`, `decision`, raw HTML path, assets |
| Staging manifest | `migration/STAGING_MANIFEST.csv` | Approved subset for content injection (25 rows, `decision=keep`) |
| Migration matrix | `migration/MIGRATION_MATRIX.csv` | Old → new mapping, actions, rewrite scope, redirect notes |
| Asset inventory | `migration/ASSET_INVENTORY.csv` | Per-asset rows linked to `PAGE-*` IDs (~380 rows) |

### Related documentation (read as needed)

| Topic | Path |
|-------|------|
| Sitemap (inventory-derived) | `docs/SITEMAP_V1.md`, `docs/SITEMAP_V2.md` |
| Content grouping / IA | `docs/CONTENT_GROUPING_V1.md` |
| Joomla-era content model (historical mapping) | `docs/JOOMLA_CONTENT_MODEL_V1.md` |
| Content model v2 (entity shapes) | `content-model/CONTENT_MODEL_V2.md` |
| Migration rules | `docs/MIGRATION_RULES.md` |
| Project memory / status | `docs/PROJECT_MEMORY.md` |
| Decision log | `docs/DECISIONS_LOG.md` |
| Repo baseline index | `docs/REPO_MEMORY_BASELINE.md` |
| Next.js homepage direction | `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` |

### Validation and scripts (unchanged paths)

- `scripts/validate_inventory.py migration/PAGE_INVENTORY.csv`
- `scripts/auto_classify_downloads.py`, `scripts/reclassify_other_rows.py`, `build_ia_structure.py`

## How RC6 Content Injection should use these files

RC6 means **inject approved legacy content into the Next.js landing** — not redesign layout, not revive Joomla, not redeploy CMS containers.

### Recommended workflow

1. **Start here** — `docs/legacy-migration/README.md` (this file) and `MIGRATION_NOTES.md`.
2. **Scope content** — Read `migration/STAGING_MANIFEST.csv` only (25 approved pages). Do not inject `decision=drop` rows from `PAGE_INVENTORY.csv`.
3. **Understand mapping** — Read `CONTENT_MODEL_SUMMARY.md` for section → Next.js landing mapping.
4. **Pull copy and assets** — Use `filename` column → local raw HTML under `raw/pages/`; use `assets` column and `migration/ASSET_INVENTORY.csv` for media/PDFs.
5. **Respect decisions** — Cross-check `migration/MIGRATION_MATRIX.csv` for `rewrite`, `merge`, and redirect intent before pasting legacy markup verbatim.
6. **Apply governance** — Follow `docs/MIGRATION_RULES.md` and `docs/DECISIONS_LOG.md`; skip protected, fragment-duplicate, and stale content per `MIGRATION_NOTES.md`.
7. **Content only** — Extract titles, body text, document links, and images. **Do not** import legacy CSS, JS, WTMS chrome, or old menu structure.

### RC6 constraints

- Inject content into existing Next.js components/sections; do not redesign the landing.
- Consolidate home variants (multiple `page_type=home` rows) into one canonical hero + highlights block.
- Use editorial rewrite where matrix notes say `rewrite` (especially About institutional pages).
- Preserve `old_url` metadata for future redirect planning; do not invent URLs not present in inventory.

## Quick map: legacy artifacts → Next.js landing use

| Legacy artifact | Primary file | Next.js landing use |
|-----------------|--------------|---------------------|
| Approved pages | `migration/STAGING_MANIFEST.csv` | Scope of what to inject (25 pages) |
| Full capture set | `migration/PAGE_INVENTORY.csv` | Context, drops, protected flags, duplicates |
| Actions / redirects | `migration/MIGRATION_MATRIX.csv` | Which pages need rewrite vs verbatim keep |
| Images / PDFs / downloads | `migration/ASSET_INVENTORY.csv` + `assets` column | Hero banners, download links, inline images |
| Section IA | `docs/CONTENT_GROUPING_V1.md`, `docs/SITEMAP_V1.md` | Nav sections and content grouping |
| Entity shapes | `content-model/CONTENT_MODEL_V2.md` | Article / Service / Research field expectations |
| Homepage UX | `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md` | Hero, quick links, news preview, footer targets |

### STAGING_MANIFEST snapshot (approved `page_type` counts)

| `page_type` | Count | Typical Next.js section |
|-------------|-------|-------------------------|
| download | 11 | Downloads / resources block, document links |
| home | 6 | Hero, highlights, carousel assets (consolidate to one page) |
| about | 3 | About / institutional section |
| news | 2 | News & events preview |
| contact | 2 | Footer contact, inquiry copy |
| service | 1 | Services / quick links |
| **Total keep** | **25** | |

## Files in this folder

| File | Purpose |
|------|---------|
| `README.md` | Index, source paths, RC6 workflow (this file) |
| `CONTENT_MODEL_SUMMARY.md` | Legacy categories → Next.js section mapping |
| `MIGRATION_NOTES.md` | Rules, CSV field notes, warnings, RC6 injection guidance |

## Related reading order for new agents

1. `docs/legacy-migration/README.md`
2. `docs/legacy-migration/MIGRATION_NOTES.md`
3. `migration/STAGING_MANIFEST.csv`
4. `docs/legacy-migration/CONTENT_MODEL_SUMMARY.md`
5. `docs/MIGRATION_RULES.md` + `docs/DECISIONS_LOG.md` (when a decision is unclear)

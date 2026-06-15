# Migration Notes — Rules, CSV Guide, RC6 Warnings

Operational notes for agents using legacy migration assets in **RC6 Content Injection** (Next.js landing, content only).

## Key migration rules

From `docs/MIGRATION_RULES.md` and `docs/DECISIONS_LOG.md`:

- **Decisions** use exact values: `keep`, `rewrite`, `merge`, `drop`.
- **Selective migration** — high-value public pages only; no wholesale copy of legacy layout/CSS/JS.
- **Cutoff date: 2023-04-20** — content older than three years → treat as `drop_old` unless marked **evergreen** (institutional About, contact, core services).
- **News/events/articles** older than cutoff default to drop unless editorially justified.
- **Evergreen** institutional pages may be kept regardless of age; mark explicitly in notes.
- **Missing publication dates** → `needs_manual_date_review` before injection.
- **Duplicate/fragment pages** → `drop` (archived locally, not injected).
- **Protected/admin/login** → exclude (`protected=yes`); never inject into public landing.
- **Downloads** older than cutoff → usually drop unless actively used; document rationale in `notes`.
- **Matrix is authoritative for actions** — do not override `migration/MIGRATION_MATRIX.csv` without new evidence.

## keep / rewrite / merge / drop principles

| Action | Meaning | RC6 behavior |
|--------|---------|--------------|
| **keep** | Content approved; may use with minimal cleanup | Inject after stripping legacy chrome; fix links |
| **rewrite** | Facts kept; presentation and prose modernized | Extract facts from raw HTML; write new copy for Next.js (required for About institutional pages) |
| **merge** | Multiple legacy URLs → one canonical destination | Combine variant home rows into one hero; one contact block from PAGE-1006 + 1020 where appropriate |
| **drop** | Do not migrate | Skip entirely — includes fragments, empty pages, admin URLs |

Fragment-only anchors (e.g. `#`, `#bodyTab1`, `#carouselExampleIndicators`) are **drop** — use canonical page without hash (e.g. PAGE-1026 or PAGE-1001).

## CSV file notes

### `migration/PAGE_INVENTORY.csv`

- **Master list** of all captured legacy pages (~30 rows including drops).
- Columns: `id`, `url`, `type`, `decision`, `notes`, `protected`, `filename`, `page_type`, `assets`, etc.
- Use for **full context** — including dropped and protected rows.
- RC6 injection scope should prefer **`STAGING_MANIFEST.csv`**, not the full inventory.

### `migration/STAGING_MANIFEST.csv`

- **Approved subset** — 25 rows with `decision=keep`.
- Primary **scope file for RC6 Content Injection**.
- `page_type` breakdown: 11 download, 6 home, 3 about, 2 news, 2 contact, 1 service.
- Do not add rows here without re-running validation workflow.

### `migration/MIGRATION_MATRIX.csv`

- Per-page **migration actions** and redirect/rewrite intent.
- Fields include `old_id`, `old_url`, `action`, `rewrite_scope`, `notes`.
- Check before injecting: institutional About pages often note **rewrite**; home variants note **merge/drop** for duplicates.
- `new_url` columns may be empty — Next.js routes are defined in the app, not in this CSV.

### `migration/ASSET_INVENTORY.csv`

- ~380 asset rows: images, PDFs, download endpoints linked via `related_page`.
- Local paths under `raw/assets/` when captured.
- Resolve `assets` column on page rows through this file for filenames and checksums.
- External URLs (e.g. `erp.mju.ac.th`) may still be hotlinked legacy dependencies — prefer local copies when available.

## Warnings

### Placeholders

- Legacy pages reference `placeholder.png` and empty titles — do not inject placeholder-only blocks into production landing content.
- Empty `menu_label` or sparse `section` values are common on download hubs; derive labels from `title` or raw HTML `<title>`.

### Protected / private pages

- **PAGE-1003** (`wtms_adminIndex.aspx`) — admin/login; `protected=yes`. Never expose on public Next.js landing.
- Any row with `protected=yes` or notes containing `admin-or-login` → **exclude**.

### Duplicate fragments

- **PAGE-1027–1030** — fragment duplicates of PAGE-1026; `decision=drop`.
- **PAGE-1002** — anchor duplicate of home; matrix action **drop**.
- Do not create separate Next.js routes for hash-only URL variants.

### Stale content

- Apply **2023-04-20 cutoff** to news, events, and time-bound downloads.
- PAGE-1024 (symposium) and calendar content (PAGE-1005) — verify relevance before featuring on landing.
- Download pages with many `wtms_documentDownload.aspx` links — audit each file; old forms/regulations may be obsolete.

### Legacy markup hazards

- Do not inject WTMS system chrome, legacy menus, inline scripts, or table-layout HTML.
- Do not migrate `docs/JOOMLA_*` implementation steps as runtime instructions — Joomla path is **retired**.

### Script and path stability

- Scripts read `migration/*.csv` at repo root — **do not move CSVs** or change paths for this documentation layer.
- Validation: `python scripts/validate_inventory.py migration/PAGE_INVENTORY.csv` (operator workstation).

## RC6-specific guidance: inject content only, do not redesign

RC6 Content Injection means:

1. **Do** extract approved text, titles, document links, and images from staging rows into **existing** Next.js landing sections.
2. **Do** consolidate home variants into one canonical hero using the best banner assets (PAGE-1001 / 1026).
3. **Do** rewrite About institutional copy where matrix notes require it.
4. **Do** preserve legacy URL metadata for future redirect maps (`url` column → `old_url`).
5. **Do not** redesign the landing layout, add new sections, or change the design system.
6. **Do not** run Docker/Joomla setup, deploy containers, or treat CMS build sequences as active tasks.
7. **Do not** modify `migration/*.csv` during content injection — propose inventory changes separately.

### Suggested injection order

1. Contact footer (PAGE-1006, 1020) — low risk, evergreen.
2. About facts (PAGE-1009–1011) — rewrite, not copy-paste.
3. Service card (PAGE-1014).
4. Featured downloads subset — start with direct PDFs (PAGE-1022, 1023) before large download hubs.
5. News preview — only if content passes cutoff review.
6. Hero — last, after assets resolved from `ASSET_INVENTORY`.

## Cross-references

| Topic | Path |
|-------|------|
| Full rules | `docs/MIGRATION_RULES.md` |
| Decisions with dates | `docs/DECISIONS_LOG.md` |
| Page-type heuristics | `docs/PAGE_TYPE_RULES.md` |
| IA detail | `docs/CONTENT_GROUPING_V1.md` |
| Redirect planning | `docs/REDIRECT_STRATEGY_V1.md` |
| Index | `docs/legacy-migration/README.md` |

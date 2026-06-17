# PHASE5D-C Closeout Readiness Report

## Summary

- Result: NO GO for commit readiness
- Reason: the MVP route imports `data/documents/document-registry.wtms-1920.partial.json` and `data/documents/search-index.wtms-1920.partial.json`, but `data/` is ignored by `.gitignore`, so a normal commit would omit the runtime data source.
- Suggested commit message after blocker resolution: `feat: add document center MVP route`

## What Was Implemented

- Added localized Document Center routes under `/[locale]/documents`.
- Added document hub, search, category, and detail pages.
- Added reusable Document Center components and styles.
- Connected the hub/search/detail experience to the WTMS-1920 partial registry and search index.
- Rendered the 11 imported WTMS-1920 documents with OneDrive-backed download links.

## Exact Route URLs

- Preview Thai: `/research-preview/th/documents`
- Preview English: `/research-preview/en/documents`
- App route pattern: `/[locale]/documents`

## Data Files Used

- `data/documents/document-registry.wtms-1920.partial.json`
- `data/documents/search-index.wtms-1920.partial.json`
- `docs/document-center/taxonomy.json`

## QA Results

- `rtk node scripts/validate-document-registry-partial.mjs`: PASS
- `rtk npm run validate:documents`: PASS
- `rtk npm run lint`: PASS
- `rtk npm run build`: PASS

## Runtime QA

- Preview base path: `/research-preview`
- `/research-preview/th/documents`: 200
- `/research-preview/en/documents`: 200
- Visible document cards: 11
- Visible storage/download links: 11
- Preview server stderr: empty
- Runtime server errors observed during QA: none

## Security And Governance Check

- Secret-pattern scan found 22 matches, all in existing docs/scripts as placeholder, example, or security guidance text.
- No actual secret value was identified in the reviewed Document Center changes.
- Folder-share URL pattern `maejo365-my.sharepoint.com/:f:` matches: 0
- Download links use registry `storageUrl`; no invented share URLs were found in the route code.
- External download links use `target="_blank"` and `rel="noopener noreferrer"`.

## Dirty Tree Classification

| Classification | Files / paths | Notes |
| --- | --- | --- |
| Document Center MVP changes | `app/[locale]/(site)/documents/`, `src/features/document-center/`, `docs/document-center/PHASE5D_B_DOCUMENTS_MVP_ROUTE_REPORT.md`, `docs/document-center/PHASE5D_C_CLOSEOUT_READINESS_REPORT.md` | Route and UI implementation for the 11-document MVP. |
| Imported registry/data changes | `docs/document-center/import-package/wtms-1920-partial-001/`, `docs/document-center/wtms-1920/`, `data/documents/document-registry.wtms-1920.partial.json`, `data/documents/search-index.wtms-1920.partial.json` | `data/documents/*` exists locally but is ignored by `.gitignore`; this blocks normal commit readiness. |
| Validation/scripts changes | `scripts/validate-document-registry-partial.mjs`, `scripts/validate-document-registry.ts`, `package.json` | `package.json` adds `validate:documents` and includes `__tests__/research-data-filters.test.ts` in `test`. |
| Pre-existing unrelated changes | `__tests__/research-data-filters.test.ts`, `docs/reports/RUNTIME_QA_DOCUMENT_CENTER.md`, `scripts/crawl-wtms-inventory.ts`, `scripts/populate-registry-from-inventory.ts`, `scripts/prepare-batch-001-upload-pack.ts`, `scripts/prepare-migration-batch-001.ts`, `scripts/resolve-batch-001-extensions.ts`, `scripts/triage-registry-review.ts`, broad historical files under `docs/document-center/` | These appear to predate Phase 5D-C or belong to earlier migration phases; review before bundling into a single commit. |
| Unknown / needs human review | `package.json`, all untracked historical `docs/document-center/*` files not specific to Phase 5D-B/C | Decide whether to include all Document Center history in one commit or split into migration docs, validation scripts, and MVP route commits. |

## Risks And Known Warnings

- Duplicate title warning remains for `แบบฟอร์มคำร้องขอหนังสือรับรอง สำหรับลูกจ้างชั่วคราว (จ้างเหมา)` with 2 entries.
- Build still reports the existing Turbopack NFT warning from `next.config.mjs -> lib/csv/loader.ts -> app/api/research/stats/portfolio/route.ts`.
- `package.json` has a pre-existing or earlier-phase change; include deliberately if committing validation work.
- Primary blocker: `data/` is ignored, but the MVP imports data from `data/documents/*`.

## Commit Recommendation

- NO GO until the ignored data-source issue is resolved.
- Recommended resolution options:
  - Track the two `data/documents/*` JSON files intentionally with a `.gitignore` exception or force-add policy.
  - Or change the route data import to a tracked registry location such as `docs/document-center/import-package/wtms-1920-partial-001/`.
- After resolving that blocker and reviewing unrelated dirty files, commit message recommendation: `feat: add document center MVP route`

## Confirmations

- No production/VPS touched.
- No OneDrive upload performed.
- No share URLs modified or invented.
- No commit/push performed.
- The 42-file/manual-required migration was not started.

## Phase 5D-D Update — Ignored Data Blocker Resolved

- Date: 2026-06-17
- Fix: Moved runtime registry data from ignored `data/documents/*` to tracked `src/features/document-center/registry/*`.
- Files copied:
  - `data/documents/document-registry.wtms-1920.partial.json` → `src/features/document-center/registry/document-registry.wtms-1920.partial.json`
  - `data/documents/search-index.wtms-1920.partial.json` → `src/features/document-center/registry/search-index.wtms-1920.partial.json`
- `src/features/document-center/data.ts` imports updated to use `./registry/*`.
- `scripts/validate-document-registry-partial.mjs` updated to validate tracked path.
- Validation re-run: PASS (11 docs, 11 search-index entries).
- Result: GO for commit pending lint, build, and runtime QA.

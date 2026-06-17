# PHASE5D-D Ignored Data Blocker Fix Report

## Summary

- Result: RESOLVED
- Blocker: `data/` is ignored by `.gitignore` line 14, but `/documents` MVP imported runtime registry JSON from `data/documents/*`.
- Fix: Moved registry data to tracked source path `src/features/document-center/registry/`.

## Why Not Unignore `data/`

- `data/` is broadly ignored to prevent accidental commit of local working files, exports, logs, and other artifacts.
- Unignoring the entire `data/` directory would risk committing unrelated local data.
- A tracked source path under `src/features/document-center/registry/` keeps the registry data alongside the code that consumes it.

## Files Changed

### New Files

- `src/features/document-center/registry/document-registry.wtms-1920.partial.json` — exact copy from `data/documents/`
- `src/features/document-center/registry/search-index.wtms-1920.partial.json` — exact copy from `data/documents/`

### Modified Files

- `src/features/document-center/data.ts` — import paths changed from `../../../data/documents/` to `./registry/`
- `scripts/validate-document-registry-partial.mjs` — validation path updated to `src/features/document-center/registry/`

### Preserved Local Artifacts

- `data/documents/document-registry.wtms-1920.partial.json` — kept as local working artifact (still ignored, not required by route)
- `data/documents/search-index.wtms-1920.partial.json` — kept as local working artifact (still ignored, not required by route)

## Validation Results

- `rtk node scripts/validate-document-registry-partial.mjs`: PASS — 11 docs, 11 search-index entries, all checks pass
- Duplicate title warning (non-blocking): `แบบฟอร์มคำร้องขอหนังสือรับรอง สำหรับลูกจ้างชั่วคราว (จ้างเหมา)` (2 entries)

## Route Impact

- Route `/documents` now imports registry data from `src/features/document-center/registry/` (tracked).
- No runtime dependency on ignored `data/documents/*`.
- All 11 documents, download links, KPI counts, search, and filters remain functional.

## Confirmations

- No production/VPS touched.
- No OneDrive upload performed.
- No share URLs modified or invented.
- No 42-file migration started.
- `data/` gitignore rule unchanged.

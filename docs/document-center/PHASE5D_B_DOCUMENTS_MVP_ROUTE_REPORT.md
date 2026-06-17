# PHASE5D-B Documents MVP Route Report

## Route Created

- Locale route: `/[locale]/documents`
- Preview URLs verified:
  - `/research-preview/th/documents`
  - `/research-preview/en/documents`

## Data Source Used

- `data/documents/document-registry.wtms-1920.partial.json`
- `data/documents/search-index.wtms-1920.partial.json`
- Taxonomy: `docs/document-center/taxonomy.json`

## Registry Summary

- Registry count: 11
- Search index count: 11
- Displayed document count on hub: 11

## UI Features

- Hero section with localized search entry point
- KPI strip for total documents, categories, latest update, and file-type count
- Quick filter chips for:
  - all documents
  - search page
  - category links
  - file-type links
- Category cards
- Full document grid rendered from the partial WTMS-1920 registry
- Detail and download links on every document card

## Limitations

- This is a partial MVP import only.
- The hub currently covers the 11 imported WTMS-1920 admin documents.
- The remaining 42 manual-required rows are still out of scope for this phase.
- Preview is served under the repo base path `/research-preview`.

## QA Results

- `npm run build`: PASS
- `npm run lint`: PASS
- Runtime preview: PASS
- `th` route status: 200
- `en` route status: 200
- Document cards rendered: 11
- Document detail links in visible markup: 22
- Storage/download links in visible markup: 11
- Runtime errors observed: none

## Next Phase Recommendation

- Import the remaining WTMS-1920 manual-required rows into the same registry/search-index pipeline, then expand category coverage and retry the blocked downloads list.

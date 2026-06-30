# Source Traceability — RAE Knowledge Engine → Next.js

**Phase:** RAE-NEXT-KB1
**Date:** 2026-06-29

---

## Traceability Chain

```
rae.mju.ac.th (legacy website)
    │
    ▼
02_CRAWLED/raw-html/    ← crawl-rae-sources.js (K0.2A)
    │
    ▼
02_CRAWLED/text/        ← extract-text.js (K0.2A)
    │
    ▼
04_KNOWLEDGE/registry/
knowledge-registry.json ← canonical + reference records (K0.3)
    │
    ▼
04_KNOWLEDGE/graph/
knowledge-links.json    ← semantic relationships (K0.3)
    │
    ▼
06_RUNTIME/output/      ← compile-knowledge-runtime.js (K1.1)
├── runtime-registry.json
├── runtime-graph.json
├── runtime-products.json
├── runtime-index.json
└── runtime-build-manifest.json
    │
    ▼
06_RUNTIME/connectors/notebooklm/output/  ← publish-notebooklm.js (K1.3+K1.4A)
├── 01_Identity_and_Mission.md
├── 02_Governance_and_Architecture.md
├── 03_Research_and_Academic_Services.md
├── 04_Documents_and_Funding.md
└── 05_AI_Assistant_FAQ.md
    │
    ▼
rae-nextjs-main/data/kb/rae-core-content.json  ← THIS BRIDGE (RAE-NEXT-KB1)
    │
    ▼
rae-nextjs-main/app/[locale]/(site)/*  ← UI Injection (RAE-NEXT-KB2)
```

---

## Pipeline Verification

| Stage | Tool | Input | Output | KB ID Present |
|---|---|---|---|---|
| Crawl | `crawl-rae-sources.js` | target-urls.csv | raw-html/*.html | ❌ No |
| Extract | `extract-text.js` | raw-html/*.html | text/*.txt | ❌ No |
| Classify | `classify-content.js` | text/*.txt | classification/*.json | ❌ No |
| Register | `knowledge-registry.json` | classification | KB-0001 to KB-0044 | ✅ Yes |
| Compile | `compile-knowledge-runtime.js` | registry + graph | runtime-*.json | ✅ Yes |
| Publish | `publish-notebooklm.js` | runtime outputs | *.md | ✅ Yes |
| Bridge | `rae-core-content.json` | *.md | staged JSON | ✅ Yes |

---

## Content Provenance Fields

Every staged content item in `rae-core-content.json` includes:

| Field | Description | Example |
|---|---|---|
| `id` | Unique bridge item ID | `KB-BRIDGE-001` |
| `title` | Content title from KB | `RAE — Mission Statement` |
| `pageTarget` | Next.js route | `app/[locale]/(site)/about` |
| `sectionTarget` | Section within the page | `mission-statement` |
| `sourceFile` | NotebookLM source file | `01_Identity_and_Mission.md` |
| `sourceKB` | Knowledge Base ID | `KB-0001` |
| `sourceURL` | Original legacy URL | `https://rae.mju.ac.th/wtms_index.aspx?&lang=th-TH` |
| `confidence` | Content confidence score | `0.95` |
| `lineage` | Processing history | `register → compile → publish → bridge` |
| `draftContentTH` | Thai content | `มุ่งพัฒนางานวิจัย...` |
| `status` | Review status | `draft` |
| `needsHumanReview` | Requires human verification | `true` |

---

## Source File → KB ID Mapping

| Source File | KB IDs Referenced |
|---|---|
| `01_Identity_and_Mission.md` | KB-0001, KB-0002, KB-0012, KB-0015, KB-0018, KB-0004, KB-0005, KB-0006, KB-0007, KB-0008 |
| `02_Governance_and_Architecture.md` | KB-0003, KB-0006, KB-0009, KB-0010, KB-0013, KB-0014 + ALL 44 in inventory |
| `03_Research_and_Academic_Services.md` | KB-0004, KB-0005 + KB-0025 through KB-0040 |
| `04_Documents_and_Funding.md` | KB-0011, KB-0041, KB-0042, KB-0043, KB-0044, KB-0007 |
| `05_AI_Assistant_FAQ.md` | KB-0001, KB-0002, KB-0004, KB-0005, KB-0007, KB-0008, KB-0009, KB-0011, KB-0016, KB-0019, KB-0041 |

---

## Audit Trail

| Date | Action | Tool | Operator |
|---|---|---|---|
| 2026-06-29 | Source URLs identified | `target-urls.csv` | Manual |
| 2026-06-29 | HTML crawled | `crawl-rae-sources.js` | Automated |
| 2026-06-29 | Text extracted | `extract-text.js` | Automated |
| 2026-06-29 | Content classified | `classify-content.js` | Automated |
| 2026-06-29 | Registry created (44 KB IDs) | `knowledge-registry.json` | Automated |
| 2026-06-29 | Runtime compiled | `compile-knowledge-runtime.js` | Automated |
| 2026-06-29 | NotebookLM Markdown published | `publish-notebooklm.js` | Automated |
| 2026-06-29 | Content bridge staged | `RAE-NEXT-KB1` | Automated + Pending Human Review |

---

## Verification

- ✅ All content originates from `rae.mju.ac.th` domain
- ✅ No external sources introduced
- ✅ Full pipeline from crawl to bridge is documented
- ✅ Every staged item has a traceable source KB ID
- ✅ Content confidence scores are preserved
- ✅ Processing lineage is included
- ✅ All content is staged as `draft` — nothing is marked final

# RAE Next.js — KB Content Injection Plan

**Phase:** RAE-NEXT-KB1 — Content Injection Bridge
**Date:** 2026-06-29
**Status:** ✅ Planning Complete — Ready for KB2 UI Injection

---

## 1. Objective

Inject NotebookLM-reviewed legacy RAE content from the Knowledge Engine into the RAE Next.js website through a structured, traceable, human-reviewed process.

---

## 2. Source

| Attribute | Value |
|---|---|
| **Source System** | RAE Knowledge Engine (NotebookLM Publishing Connector) |
| **Source Directory** | `G:\ProjectAI\RAE Knowledge Engine\06_RUNTIME\connectors\notebooklm\output\` |
| **Source Files** | 5 Markdown files (via `publish-notebooklm.js`) |
| **Source Format** | NotebookLM-optimized Markdown with KB IDs, confidence, lineage |
| **Total KB Records** | 44 (10 canonical, 34 reference) |
| **Quality Gate** | ✅ Passed QA (9/9 checks) |

### Source Files

| File | Primary Focus | KB Records |
|---|---|---|
| `01_Identity_and_Mission.md` | Mission, Vision, Identity, Core Services | KB-0001, KB-0002, KB-0012, KB-0015, KB-0018 + core services |
| `02_Governance_and_Architecture.md` | Architecture, Governance, Complete KB Inventory | KB-0003, KB-0006, KB-0009, KB-0010, KB-0013, KB-0014 + ALL 44 |
| `03_Research_and_Academic_Services.md` | Research Services, Academic Services, Community | KB-0004, KB-0005 + 16 research reference pages |
| `04_Documents_and_Funding.md` | Documents, Funding, Taxonomy, News | KB-0011, KB-0041, KB-0042 + taxonomy + news |
| `05_AI_Assistant_FAQ.md` | FAQ (17 Q&A pairs) | KB-0001, KB-0008, KB-0011 + multiple |

---

## 3. Target Routes

### Public Routes (7 targets)

| Route | Current Status | KB Content to Inject |
|---|---|---|
| `app/landing-v6` | ✅ Exists | Hero identity, tagline (from Identity & Mission) |
| `app/[locale]/(site)/about` | ✅ Exists (page.tsx) | Mission, Vision, Organization Structure, History, Naming Convention, FAQ |
| `app/[locale]/(site)/research-services` | ✅ Exists (page.tsx) | Research overview, Funding section, Research pages index |
| `app/[locale]/(site)/academic-services` | ✅ Exists (page.tsx) | Services overview, Community impact section |
| `app/[locale]/(site)/documents` | ✅ Exists (page.tsx + category/ sub-routes) | Documents overview, Storage policy notice, FAQ |
| `app/[locale]/(site)/contact` | ✅ Exists | Contact FAQ items |
| `app/[locale]/(site)/news-events` | ✅ Exists | News listing reference |

### Internal Routes (non-public)

| Route | Purpose |
|---|---|
| `internal/docs` | Architecture reference, Knowledge Inventory, Graph relationships, Taxonomy |

---

## 4. Injection Phases

### Phase KB1: Planning & Staging (CURRENT) ✅
- [x] Repo audit and route discovery
- [x] Content target mapping (24 mappings)
- [x] Source traceability documentation
- [x] Data staging file creation
- [x] No UI modifications

### Phase KB2: UI Injection (NEXT)
- [ ] Inject `rae-core-content.json` into `about/page.tsx`
- [ ] Inject hero content into `landing-v6/page.tsx`
- [ ] Inject research/services content into `research-services/page.tsx`
- [ ] Inject academic services content into `academic-services/page.tsx`
- [ ] Inject document policy into `documents/page.tsx`
- [ ] Add FAQ section to `about/page.tsx`
- [ ] Add funding section to `research-services/page.tsx`
- [ ] Human review of all injected content
- [ ] Set `needsHumanReview: false` for reviewed items
- [ ] Run lint + build validation

### Phase KB3: Content Expansion
- [ ] Add content to `contact` page from FAQ
- [ ] Enhance `news-events` page with KB news data
- [ ] Add research detail pages index to `research-services`
- [ ] Build internal docs from governance/architecture content

---

## 5. Content Quality Rules

| Rule | Enforcement |
|---|---|
| No raw HTML/crawled content | Source is NotebookLM-reviewed Markdown ✅ |
| No JSON code blocks in UI | Staging JSON is for injection only, not display |
| KB ID traceability preserved | Every staged item has `sourceKB` field |
| Human review required | All staged items default `needsHumanReview: true` |
| Thai text preserved verbatim | No translation without explicit mention |
| Confidence scores retained | Displayed as metadata badge where appropriate |
| Never mark as final | `status: draft` until human review |

---

## 6. Target Mapping Overview

```
NotebookLM Markdown                    Next.js Route
─────────────────────                  ────────────
01_Identity_and_Mission.md  ───────→  about/  (mission, vision, history)
                                    ─→  landing-v6/  (hero tagline)

02_Governance_and_Architecture.md  ─→  about/  (org structure, divisions)
                                    ─→  internal/docs  (architecture, inventory)

03_Research_and_Academic_Services.md ─→  research-services/  (research, funding)
                                      ─→  academic-services/  (services, community)

04_Documents_and_Funding.md  ──────→  documents/  (policy, overview, FAQ)
                                    ─→  research-services/  (funding)
                                    ─→  news-events/  (news listing)

05_AI_Assistant_FAQ.md  ───────────→  about/  (FAQ section)
                                    ─→  contact/  (contact FAQ)
                                    ─→  documents/  (storage FAQ)
```

---

## 7. Staged Data

**File:** `data/kb/rae-core-content.json`

Contains 17 staged content items from all 5 source files, mapped to their Next.js targets with full source traceability, KB IDs, and draft status.

---

*End of Injection Plan — Ready for KB2 UI Injection*

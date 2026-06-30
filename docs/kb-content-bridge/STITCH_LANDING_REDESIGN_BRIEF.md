# STITCH — Landing Redesign Brief

**Phase:** ST1 — Stitch Landing Redesign Content Pack
**Date:** 2026-06-29
**Status:** Draft — Ready for Google Stitch paste
**Review Status:** ⚠️ All content is **draft** — not final. Human review required before deployment.

---

## 1. Project Background

The Office of Agricultural Research and Extension (RAE), Maejo University, is undergoing a complete digital transformation. The legacy WTMS-based website (built on an outdated ASP.NET Web Forms platform) is being replaced by a modern Next.js application (rae-nextjs-main).

This brief is for **Google Stitch**, the AI-powered design tool, to generate a premium landing page redesign. The landing page will serve as the institutional front door — replacing the old hero slideshow-driven layout with a modern, content-rich design that communicates RAE's mission, impact, and services.

---

## 2. RAE Identity

### Official Name

| Language | Full Name |
|---|---|
| **English** | The Office of Agricultural Research and Extension, Maejo University |
| **Thai (ภาษาไทย)** | สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ |
| **Acronym** | RAE |

### ⚠️ Forbidden Expansion

**Do NOT** use "Research Administration and Engagement" under any circumstances. This expansion is incorrect and has been explicitly rejected through the NotebookLM pilot feedback process. The correct expansion is:

> **The Office of Agricultural Research and Extension**

> **สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้**

### Mission (Philosophy)

> มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม โดยมีการเกษตรเป็นรากฐาน

> "Advance research and academic services to society, grounded in agriculture."

**Source:** KB-0001 | Confidence: 95%

### Vision

> เป็นศูนย์กลางการพัฒนางานวิจัยและบริการวิชาการ เพื่อผลักดันมหาวิทยาลัยสู่ระดับนานาชาติ

> "Become a center for research and academic service development to drive the university toward international recognition."

**Source:** KB-0002 | Confidence: 95%

---

## 3. Design Goal

### Institutional Wow — Premium but Not Flashy

The landing page must convey institutional gravitas, academic excellence, and community impact. The design should feel:

- **Premium** — high-end typography, generous whitespace, refined color palette
- **Trustworthy** — clean, organized, authoritative but approachable
- **Timeless** — not trendy. Avoid "brochure-ware" or corporate-generic
- **Thai-first** — bilingual design that prioritizes Thai typography and reading patterns
- **Impactful** — content should tell a story, not just list features

---

## 4. Visual Direction

### Imagery & Atmosphere

- **Maejo Agriculture:** Rice fields, farms, agricultural research stations, crops, farmers
- **Research in Action:** Scientists in labs, field research, data collection, innovation
- **Academic Service:** Training sessions, community workshops, knowledge transfer
- **Community Impact:** Farmers benefiting from research, local communities, sustainable practices
- **University Campus:** Maejo University landmarks, academic buildings
- **Thai Identity:** Subtle Thai cultural motifs, traditional patterns as design accents

Do NOT use:
- Stock photography that doesn't represent Maejo
- Generic office/corporate imagery
- Any imagery implying "Research Administration and Engagement" (wrong identity)

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| **Maejo Green** | `#005C3B` | Primary brand color — headers, navigation, primary buttons, key accents |
| **Maejo Gold** | `#FFDE00` | Accent — highlights, CTAs, decorative elements |
| **Neutral White** | `#FFFFFF` | Backgrounds, cards |
| **Off-White** | `#F7F8FA` | Section backgrounds, subtle separation |
| **Dark Text** | `#1A1A2E` | Primary body text |
| **Muted Text** | `#6B7280` | Secondary/supporting text |

### Typography

- **Thai-first institutional typography**
- Primary Thai typeface with strong readability at display sizes
- Support for Latin script matching the Thai typeface's proportions
- Serif options for body text in long-form content sections
- Sans-serif for navigation, headings, and UI elements
- Well-tuned type scale for responsive display (H1–H6)

### Design Inspiration

| Source | Why |
|---|---|
| **UTCC (University of the Thai Chamber of Commerce)** | Premium Thai university design, strong Thai-English typography |
| **Apple Education** | Clean, content-first layouts with generous whitespace |
| **Vercel** | Modern, minimal, developer-friendly aesthetic |
| **Premium university websites** | Harvard, Cambridge, Stanford — institutional gravitas |

---

## 5. Landing Narrative

The landing page must tell a coherent story through its section sequence:

```
Research → Knowledge → Academic Extension → Community Impact
```

### Narrative Arc

1. **Identity:** Who is RAE? (Hero section)
2. **Scale/Presence:** RAE at a Glance (key facts — only verified data)
3. **Process:** How research transforms into community benefit (Research → Community)
4. **Offerings:** What services does RAE provide? (Academic Services Hub)
5. **Evidence:** Real research output (Research Showcase)
6. **Resources:** How to access documents and funding (Document Center)
7. **Ecosystem:** The complete knowledge system (Knowledge Ecosystem)
8. **Action:** How to engage with RAE (Contact / CTA)

---

## 6. Motion Direction

- **Ambient motion** — subtle background animations that add atmosphere without distraction
- **Soft reveal** — content fades/slides into view on scroll (Intersection Observer)
- **Subtle parallax** — gentle depth effect on hero imagery
- **No RGB/gaming effects** — no neon, no glitch, no particle explosions, no cyberpunk
- **No flashy transitions** — elegant, understated, smooth
- **Micro-interactions** — subtle hover states, smooth anchor scroll
- **Performance-first** — motion must not block paint or cause layout shifts

---

## 7. Content Constraints (Critical — Must Follow)

| Constraint | Rule |
|---|---|
| **No fake KPIs** | Do not invent or fabricate research metrics, statistics, or numerical claims. Only real, verified institutional data may be used. |
| **No invented research metrics** | Do not create KPIs like "500+ research projects" unless verified from official university sources. |
| **No old WTMS layout** | The legacy ASP.NET Web Forms layout (hero slideshow, sidebar menus, table-heavy pages) must not be replicated. |
| **No local VPS document links** | All document download links must point to Microsoft 365 / SharePoint / OneDrive — never to the local VPS server path. |
| **No master file storage on website** | The website is a Document Registry / Discovery Layer only. Master files are stored in Microsoft 365. |
| **No "Research Administration and Engagement"** | That expansion is incorrect. Use "The Office of Agricultural Research and Extension" only. |
| **No stock photography** | Use authentic Maejo University imagery. |
| **All content is draft** | Every section must be marked as `review status: draft`. Nothing is final until human review. |

---

## 8. Section Requirements

| # | Section | Key Content | Source KB |
|---|---|---|---|
| 1 | Hero | RAE full name (TH + EN), mission tagline, visual identity | KB-0001, KB-0002, KB-0018 |
| 2 | RAE at a Glance | Verified institutional facts, org structure | KB-0003, KB-0009 |
| 3 | Research → Community | Narrative of how research reaches community | KB-0004, KB-0005 |
| 4 | Academic Services Hub | Training, consulting, lab services, extension | KB-0005 |
| 5 | Research Showcase | Real research areas, detail pages index | KB-0025 to KB-0040 |
| 6 | Document Center / Funding | Document registry, storage policy, ARDA funding | KB-0011, KB-0041, KB-0042 |
| 7 | Knowledge Ecosystem | Knowledge graph, connections across services | GRAPH |
| 8 | Contact / CTA | Address, phone, email, inquiry form link | KB-0008 |

---

## 9. Document Storage Policy (Critical)

The RAE website is **NOT** a document management system. It functions as a **Document Registry / Discovery Layer** only. All master files are stored in **Microsoft 365 / SharePoint / OneDrive**. This policy must be prominently displayed in any Document Center section.

**Policy text (do not alter):**

> ⚠️ เว็บไซต์ RAE ไม่ใช่ระบบจัดเก็บเอกสาร เว็บไซต์ทำหน้าที่เป็น Document Registry / Discovery Layer เท่านั้น ไฟล์ต้นฉบับทั้งหมดจัดเก็บใน Microsoft 365 / SharePoint / OneDrive

> ⚠️ The RAE website is NOT a document management system. It functions as a Document Registry / Discovery Layer only. All master files are stored in Microsoft 365 / SharePoint / OneDrive. No master files are stored on the VPS.

---

## 10. Copy-Paste Stitch Prompt

> **Copy the block below and paste directly into Google Stitch:**

---

```
You are designing a premium landing page for The Office of Agricultural Research and Extension (RAE), Maejo University — a government academic office in Thailand.

IMPORTANT: The correct English name is "The Office of Agricultural Research and Extension, Maejo University". The Thai name is "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้". NEVER use "Research Administration and Engagement" — that expansion is INCORRECT.

Mission: "มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม โดยมีการเกษตรเป็นรากฐาน" (Advance research and academic services to society, grounded in agriculture.)
Vision: "เป็นศูนย์กลางการพัฒนางานวิจัยและบริการวิชาการ เพื่อผลักดันมหาวิทยาลัยสู่ระดับนานาชาติ" (Become a center for research and academic service development to drive the university toward international recognition.)

Design Goal: Institutional Wow — premium but not flashy. Convey trust, academic gravitas, and community impact. Thai-first bilingual design.

Brand Colors:
- Maejo Green: #005C3B (primary)
- Maejo Gold: #FFDE00 (accent)
- Backgrounds: #FFFFFF and #F7F8FA
- Text: #1A1A2E and #6B7280

Typography: Thai-first institutional typography. Prioritize Thai reading patterns. Serif for body text, sans-serif for UI/navigation.

Imagery: Maejo agriculture (rice fields, farms), research in action (labs, field work), academic service (training, workshops), community impact (farmers, local communities), Maejo University campus. No stock photography. No generic corporate imagery.

Design Inspiration: UTCC, Apple Education, Vercel, premium university websites (Harvard, Cambridge).

Landing Narrative (8 sections):
1. HERO — Full RAE identity (TH + EN), mission tagline, premium hero visual
2. RAE AT A GLANCE — Verified institutional facts, organizational overview (do NOT invent KPIs)
3. RESEARCH → COMMUNITY — Narrative showing how agricultural research transforms into community benefit
4. ACADEMIC SERVICES HUB — Training, consulting, lab services, community extension
5. RESEARCH SHOWCASE — Real research output and areas (no fake metrics)
6. DOCUMENT CENTER / FUNDING — Document registry with storage policy notice + ARDA funding opportunities. Include this policy prominently: "The RAE website is NOT a document management system. It functions as a Document Registry / Discovery Layer only. All master files are stored in Microsoft 365 / SharePoint / OneDrive. No master files are stored on the VPS."
7. KNOWLEDGE ECOSYSTEM — Connected knowledge graph showing relationships across services
8. CONTACT / CTA — Full address (3rd Floor, Chalermprakiat Building, 63 Moo 4, Tambon Nong Han, Amphoe San Sai, Chiang Mai 50290), phone (+66 0 5387 3400), email (raemju@gmail.com, researchmju@mju.ac.th)

Motion: Ambient, soft reveal on scroll, subtle parallax, NO RGB/gaming effects, no flashy transitions.

CRITICAL CONSTRAINTS:
- No fake KPIs or invented research metrics
- No old WTMS layout (no hero slideshow, no table-heavy pages)
- No local VPS document links — all document links must point to Microsoft 365/SharePoint/OneDrive
- No master file storage on website
- All download links must go to SharePoint/OneDrive, never VPS paths
- No stock photography — use authentic Maejo University imagery
- All content is DRAFT — mark as draft until human review
- Thai copy must be preserved verbatim — do not translate without explicit instruction
- Never expand RAE as "Research Administration and Engagement"
```

---

## 11. Source Traceability

| Source File | KB IDs Used | Sections |
|---|---|---|
| `01_Identity_and_Mission.md` | KB-0001, KB-0002, KB-0012, KB-0018 | Hero, RAE Identity, Mission, Vision |
| `03_Research_and_Academic_Services.md` | KB-0004, KB-0005, KB-0025–KB-0040 | Research, Services, Community, Showcase |
| `04_Documents_and_Funding.md` | KB-0011, KB-0041, KB-0042 | Document Center, Funding, Storage Policy |
| `05_AI_Assistant_FAQ.md` | KB-0001, KB-0008 | Identity FAQ, Contact Info |

---

## 12. Validation Checklist

- [x] No UI route/component files changed
- [x] No generated content is marked final (all `status: draft`)
- [x] All sections have source traceability
- [x] RAE name policy included (forbidden expansion documented)
- [x] Document Storage Policy included in Document Center section
- [x] Stitch prompt ready for copy-paste
- [x] Thai copy preserved verbatim
- [x] Content constraints documented

---

*End of ST1 — Stitch Landing Redesign Brief. Ready for Google Stitch paste.*

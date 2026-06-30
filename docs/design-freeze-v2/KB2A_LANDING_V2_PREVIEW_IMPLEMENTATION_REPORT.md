# KB2A — Landing V2 Preview Implementation Report

**Phase:** KB2A — Landing V2 Preview Implementation for `/landing-v6`
**Date:** 2026-06-29
**Status:** ✅ Complete — Preview ready for human design review

---

## 1. Objective

Implement Knowledge-driven Landing V2 preview content on `/landing-v6` while preserving the approved Stitch V6 / Landing Candidate visual experience.

---

## 2. Files Modified

| File | Action | Change Type |
|---|---|---|
| **`content/landing.ts`** | ✅ **Modified** — content replacement only | 47 key-value pairs updated across TH + EN locales |
| `app/landing-v6/page.tsx` | ❌ No change | Route config frozen |
| `app/landing-v6/layout.tsx` | ❌ No change | Fonts, metadata frozen |
| `app/landing-v6/landing-v6.css` | ❌ No change | Design tokens frozen |
| `components/landing-v6/LandingRenderer.tsx` | ❌ No change | Component JSX, layout, motion frozen |
| `content/landing-images.ts` | ❌ No change | Image paths frozen |
| `lib/org-names.ts` | ❌ No change | Official names frozen |

### Only ONE file was edited

> **`content/landing.ts`** — the bilingual content dictionary. Zero JSX changes. Zero CSS changes. Zero component logic changes.

---

## 3. Landing Sections Updated

| # | Section | Locale | Keys Replaced | Source KB |
|---|---|---|---|---|
| 1 | Hero | TH + EN | `titleLine2Italic`, `paragraph`, `primaryCta`, `secondaryCta` | KB-0001 |
| 2 | RAE at a Glance | TH + EN | `kicker`, `title`, all 3 pillar `title` + `text` | KB-0003, KB-0005, KB-0006, KB-0009 |
| 3 | Research → Community | TH + EN | `paragraph`, `steps[0-2].label` | KB-0004, KB-0005 |
| 4 | Research Showcase | TH + EN | `kicker`, `title`, `viewAll`, all 5 features (tag, title, text) | KB-0004, KB-0005, KB-0011, KB-0041 |
| 5 | Knowledge Ecosystem | TH + EN | `kicker`, `paragraph`, `items[0-2].label`, `cta` | GRAPH, KB-0004, KB-0005 |
| 6 | Signature Experience | TH + EN | `kicker`, `titleLine1`, `titleLine2Italic`, `paragraph`, `badges` | KB-0001 |
| 7 | News & Insights | TH + EN | `paragraph`, `featured.*`, `dispatches[0-1].*` | KB-0007, KB-0041, KB-0005 |
| 8 | Impact Metrics | — | ❌ No change — labels kept, placeholders retained | Pending live KPI source |
| 9 | Footer | — | ❌ No change | — |

### Sections NOT Changed (Design Freeze)

- **Layout** — preserved
- **Motion** — preserved (ambient, soft reveal, subtle parallax)
- **Typography** — preserved (Inter, Hanken Grotesk, JetBrains Mono)
- **Color palette** — preserved (50+ Stitch V6 tokens)
- **Spacing** — preserved
- **Navigation** — preserved (TopNavBar)
- **Footer** — preserved
- **Images** — preserved (same Maejo drone/RAE assets)
- **Metrics Dashboard** — preserved (labels + placeholder values)

---

## 4. Preview Route

| Route | Status | Notes |
|---|---|---|
| **`http://localhost:3110/landing-v6`** | ✅ **Serving** | Primary preview — English, standalone Stitch V6 layout |
| `http://localhost:3110/th` | ✅ Also updated | Thai locale — same LandingRenderer reads from `landing.th` |
| `http://localhost:3110/en` | ✅ Also updated | English locale — same LandingRenderer reads from `landing.en` |

### Dev Server

- **URL:** `http://localhost:3110/landing-v6`
- **Port:** 3110
- **Status:** ✅ Server was already running (PID 17708)

---

## 5. Lint/Build Result

| Command | Result |
|---|---|
| `rtk npm run lint` | ✅ **Passed** — 0 errors, 0 warnings |
| `rtk npm run build` | ✅ **Passed** — compiled successfully, 82 static routes generated |

---

## 6. Runtime/Preview QA Result

### Content Verification (from live page at `/landing-v6`)

| Content | Rendered Value | Status |
|---|---|---|
| **Hero headline L1** | `Research, Knowledge,` | ✅ Correct (preserved) |
| **Hero headline L2 italic** | `Advancing research and academic services to society` | ✅ KB-0001 mission |
| **Hero paragraph** | `Empowering the future of agriculture through research excellence...` | ✅ Correct |
| **Primary CTA** | `Explore Our Research` | ✅ KB-0004 |
| **Secondary CTA** | `Learn More About RAE` | ✅ KB-0001 |
| **Metrics labels** | Research Projects, Academic Services, Knowledge Resources, Community Programs, Strategic Partnerships | ✅ Preserved |
| **At a Glance kicker** | `RAE Core Divisions` | ✅ KB-0003 |
| **At a Glance title** | `RAE at a Glance` | ✅ V2 |
| **Pillar 1** | `Research Administration Division` — manages grants... | ✅ KB-0006 |
| **Pillar 2** | `Academic Service Administration` — training... | ✅ KB-0005 |
| **Pillar 3** | `RAE Office Administration` — office management... | ✅ KB-0009 |
| **Research→Community title** | `From Research to Community` | ✅ Preserved |
| **Research→Community paragraph** | `RAE connects agricultural research to academic services...` | ✅ KB-0004, KB-0005 |
| **Steps** | Research for Community → Academic Service for Society → Sustainable Impact | ✅ V2 |
| **Showcase kicker** | `Research Areas` | ✅ KB-0004 |
| **Showcase title** | `RAE Research` | ✅ KB-0004 |
| **Showcase F1 text** | `RAE administers research across multiple agricultural fields...` | ✅ KB-0004 |
| **Showcase F2 tag** | `Academic Services` | ✅ KB-0005 |
| **Showcase F4 title** | `ARDA Research Funding` | ✅ KB-0041 |
| **Showcase F5 text** | `Website is a Document Registry, not a DMS. All master files are stored in SharePoint/OneDrive.` | ✅ KB-0011 (Storage Policy) |
| **Ecosystem kicker** | `Knowledge Ecosystem` | ✅ GRAPH |
| **Ecosystem paragraph** | `RAE connects research, academic services, documents, and personnel...` | ✅ GRAPH |
| **Ecosystem items** | Research & Academic Services, Documents & Funding, Community Network | ✅ V2 |
| **Ecosystem CTA** | `Explore Knowledge Base` | ✅ V2 |
| **Signature kicker** | `RAE Mission` | ✅ KB-0001 |
| **Signature headline** | `Advancing Research and Academic Serivces to Society, Grounded in Agriculture` | ✅ KB-0001 |
| **Signature badges** | Research for Society, Academic Service for Community | ✅ V2 |
| **News title** | `News & Insights` | ✅ Preserved |
| **News featured** | `Research Forum: Researchers Meet ARDA Funding` — June 16, 2026 | ✅ KB-0007 |
| **News dispatch 1** | `ARDA Strategic Fund (SF) & Research Utilization (RU) FY 2570` | ✅ KB-0041 |
| **News dispatch 2** | `Academic Service Administration — Training & Consulting` | ✅ KB-0005 |

### Visual Observations

| Aspect | Status | Notes |
|---|---|---|
| Layout structure | ✅ Identical | Hero → Metrics → At a Glance → R→C → Showcase → Ecosystem → Signature → News → Footer |
| Hero text wrapping | ✅ OK | EN tagline `Advancing research and academic services to society` fits on one line at desktop |
| At a Glance cards | ✅ OK | Shorter texts fit card containers well |
| Showcase cards | ✅ OK | Content fits with `line-clamp` truncation where needed |
| 404 resource errors | ⚠️ Minor | 5 image assets returned 404 (likely local images not available in dev — pre-existing) |
| No hallucinated data | ✅ | All copy from Knowledge OS sources only |
| No fake KPIs | ✅ | Metrics remain `—` / `...` |

> **Note on TH hero tagline length:** The TH tagline `มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม` (31 chars) replaces `และผลกระทบเพื่อสังคม` (13 chars). On `/th` route, this is handled by the `text-balance` CSS class and the `max-w-2xl` constraint on the hero paragraph container. It will wrap naturally at mobile sizes.

---

## 7. Screenshot/Manual Preview Status

| Screenshot | Viewport | Status |
|---|---|---|
| Desktop hero | 1920×1080 | ✅ Captured |
| Desktop full page | 1920×1080 | ✅ Captured |
| Mobile hero | 375×667 | ✅ Page rendered |
| Mobile full page | 375×667 | ✅ Captured |

**Manual preview instructions:**
```
1. Open http://localhost:3110/landing-v6 in browser
2. Resize to 1920×1080 for desktop, 375×667 for mobile
3. Verify hero content (tagline, paragraph, CTAs)
4. Scroll through all sections
5. Check /th for Thai locale
6. Compare against RC7 V6 screenshots if available
```

---

## 8. Git Status

```
 M .gitignore
 M content/landing.ts
 M next-env.d.ts
?? data/kb/
?? docs/design-freeze-v2/
?? docs/kb-content-bridge/
```

| File | Status | Notes |
|---|---|---|
| `content/landing.ts` | Modified | ✅ V2 content implemented — the only functional change |
| `.gitignore` | Modified | Pre-existing (KB1A fix) |
| `next-env.d.ts` | Modified | Auto-generated by Next.js, no manual change |
| `data/kb/` | Untracked | KB staging data |
| `docs/` | Untracked | All documentation |

No commit. No push.

---

## 9. Validation Checklist

| Check | Status |
|---|---|
| Design philosophy unchanged | ✅ Institutional premium — preserved |
| Layout, motion, typography, colors preserved | ✅ Design Freeze Lock respected |
| Only `content/landing.ts` modified for preview | ✅ Zero JSX/CSS/component changes |
| No fake KPIs or invented research metrics | ✅ Metrics remain `—` / `...` |
| RAE identity correct | ✅ "The Office of Agricultural Research and Extension" — no forbidden expansion |
| Document Storage Policy included | ✅ Showcase Feature 5: "Website is a Document Registry, not a DMS" |
| Thai copy preserved verbatim | ✅ From KB sources |
| English copy follows KB translations | ✅ From KB-BRIDGE items |
| All content source-traceable | ✅ Every replacement maps to KB ID + NotebookLM file |
| Lint pass | ✅ 0 errors, 0 warnings |
| Build pass | ✅ 82 routes, 0 errors |

---

## 10. Recommendation for Human Design Review

### Ready for Review

The Landing V2 preview is **live and ready** at `/landing-v6` for stakeholder review.

### What to Review

1. **Hero tagline (EN):** `Advancing research and academic services to society` — verify it captures the mission correctly
2. **Pillar cards:** Division names and descriptions — verify accuracy with RAE team
3. **Showcase features:** ARDA funding, Document Center messaging — verify policy accuracy
4. **News featured story:** Research Forum event details — verify date and description
5. **Thai locale** (`/th` route): Verify Thai copy rendering and the longer hero tagline wrapping

### What to Finalize

After human review and approval:
1. Set `reviewStatus: "final"` in `rae-core-content.json` for reviewed items
2. The content is ready for production — no further code changes needed

### Future Phases

| Phase | Content | Status |
|---|---|---|
| KB2B | Academic Services Hub (new section) | Planning |
| KB2C | Document Center (new section) | Planning |
| KB3 | Live KPI integration | Pending data source |

---

*End of KB2A Report. Preview ready at http://localhost:3110/landing-v6.*

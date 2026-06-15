# Research Story Framework — RAE MJU (RC5.6)

**Purpose**: Define how research, extension, and impact content is transformed into **institutional storytelling** — not document dumps.

**Scope**: Research Showcase, Impact Story, Success Stories, Extension/Outreach narratives, and RC6 editorial transformation of legacy pages (especially PAGE-1024, PAGE-1014, download hubs reframed as evidence).

**Upstream**: `LANDING_EXPERIENCE_GUIDE.md` (sections 4 & 6) · `VISUAL_LANGUAGE_BIBLE.md` · `content-model/CONTENT_MODEL_V2.md`

**Downstream**: RC6 Content Injection — rewrite layer before any copy enters Next.js

**Workspace note**: This repo is the legacy extraction workspace. Story structures are **content schema guidance** for the separate Next.js app repo — not component implementation.

---

## 1. Research Narrative Model

Every research story published on the RAE Digital Experience must follow this arc. Skip or collapse steps only when data is genuinely unavailable — never publish a step as empty filler.

```
Problem
   ↓
Research
   ↓
Innovation
   ↓
Impact
   ↓
Community
```

| Stage | Question answered | Content signals | Thai-first headline pattern |
|-------|-------------------|-----------------|-----------------------------|
| **Problem** | What agricultural or community challenge exists? | Crop loss, climate, market access, soil, pest, knowledge gap | 「…ปัญหาที่เกษตรกรเผชิญ」 |
| **Research** | What did RAE/Maejo investigate? | Method, trial design, lab/field scope, duration | 「การวิจัยเพื่อ…」 |
| **Innovation** | What new knowledge, variety, process, or tool emerged? | Protocol, technology, cultivar, extension package | 「นวัตกรรมที่ได้」 |
| **Impact** | What measurable or observable outcome followed? | Yield, income, adoption rate, hectares, partners | 「ผลลัพธ์ที่วัดได้」 |
| **Community** | Who benefited and how was outreach delivered? | Farmers trained, provinces, cooperatives, workshops | 「การขยายผลสู่ชุมชน」 |

**Minimum viable story**: Problem + Innovation + Community (Research and Impact may be merged in short cards).

**Legacy mapping**:

| Legacy source | Narrative use |
|---------------|---------------|
| PAGE-1024 (symposium) | Problem → Research (international collaboration); rewrite required per MIGRATION_MATRIX |
| PAGE-1014 (service unit) | Frame as **enabler** of Research → Community, not a service catalog |
| Download PDFs | Evidence appendix — never the primary story surface |
| `page_type=news` | Timeliness layer — link to full story, not substitute |

---

## 2. Showcase Card Structure

Used on landing **Research Showcase** grid and hub listing pages.

### Required fields

| Field | Max length | Rules |
|-------|------------|-------|
| `title` | 80 chars | Outcome-oriented Thai; EN subtitle optional |
| `summary` | 160 chars | One narrative hook — not abstract jargon |
| `topic` | 1 tag | e.g. เกษตร precision, หลังการเก็บเกี่ยว, ขยายผล |
| `heroImage` | 4:3 or 3:2 | Real field/lab photo per VISUAL_LANGUAGE_BIBLE |
| `narrativeStage` | enum | Which step is **featured** above fold (usually Innovation or Impact) |
| `ctaPrimary` | label + URL | `View story` / `ดูรายละเอียด` |
| `ctaSecondary` | optional | `Contact researcher` — ghost style |
| `legacyRef` | PAGE-ID | Traceability for RC6 |

### Card layout hierarchy (experience)

1. Image (authentic, cropped safe for title overlay optional)
2. Topic chip (green subtle surface)
3. Title
4. Summary (2 lines max on desktop)
5. Single CTA

### Card quality gate

- [ ] Passes narrative model (≥3 stages present in full story page)
- [ ] Not title + description only
- [ ] Image is not logo-only (reject PAGE-1024 logo asset as card hero)

---

## 3. Research Landing Structure

Dedicated **Research** hub page (future route in Next.js app — structure only here).

### Page sections (top to bottom)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | **Hero** | Mission statement + one featured story |
| 2 | **Topic filter** | Chips: วิจัย · นวัตกรรม · ขยายผล · ความร่วมมือ |
| 3 | **Featured program** | One deep narrative (full 5-step model) |
| 4 | **Showcase grid** | 6–9 cards using Showcase Card Structure |
| 5 | **Researchers** | Real profiles — photo, name, unit, 1-line focus (no AI portraits) |
| 6 | **Publications & evidence** | Linked PDFs styled as **citations**, not file dump |
| 7 | **CTA band** | Contact research office / symposium archive |

### Content density rules

- Max 1 featured program above fold
- Grid: 3 columns desktop · 2 tablet · 1 mobile
- PDF links: icon + title + year — grouped by topic, max 5 visible before "View all"

---

## 4. Success Story Structure

Long-form proof narrative for Impact Story section and case-study pages.

### Template

```markdown
## [Outcome headline — Thai]

**Context (Problem)** — 2–3 sentences: who faced what challenge.

**Approach (Research + Innovation)** — what RAE did differently.

**Results (Impact)** — 2–4 bullets with numbers where verified.

**Outreach (Community)** — training, adoption geography, partners.

**Quote** — optional; real stakeholder with attribution.

**Evidence** — 1–2 PDF/links, labeled "เอกสารอ้างอิง".
```

| Element | Rule |
|---------|------|
| Headline | Outcome-first, not project code name |
| Stats | Source + year footnote; no unverified KPIs |
| Length | 400–700 words Thai; EN summary 150 words optional |
| Imagery | Before/after pair OR single strong field photo |
| Legacy | Rewrite all WTMS body copy — never paste tables |

---

## 5. Extension / Outreach Story Structure

RAE's **ส่งเสริมวิชาการ** mandate — distinct from pure lab research.

### Narrative emphasis

Community stage **equal weight** to Innovation. Problem often originates with farmer practice gap, not academic curiosity.

### Structure

| Block | Content |
|-------|---------|
| **Audience** | เกษตรกร · วิสาหกิจ · หน่วยงานพันธมิตร |
| **Program** | Workshop series, demo plot, on-farm trial |
| **Delivery** | Provinces, seasons, participant counts |
| **Materials** | Link to governed downloads — max 3 primary docs |
| **Follow-up** | Hotline, unit contact (PAGE-1020 pattern) |

### Service page transformation (PAGE-1014)

Legacy: single service unit listing.  
Target: **Extension hub intro** + 2–3 outreach story cards + link to academic service request.

Do not present as bureaucratic org chart.

---

## 6. Before / After Transformation Pattern

Editorial pattern for Impact Story and Success Story visuals.

### Narrative pairing

| Before | After |
|--------|-------|
| Problem state (crop, practice, yield) | Improved state with same framing angle |
| Same location or crop type when possible | Consistent season/lighting notes in caption |
| Caption: สถานการณ์ก่อน | Caption: หลังการขยายผล |

### Visual rules

- Real photography only for evidence pairs (no AI-generated before/after)
- Labels must not mislead — "before" must be documented pre-intervention
- If only "after" exists, use single hero + Problem text — **do not fabricate before**
- Align color grade with VISUAL_LANGUAGE_BIBLE

### RC6 legacy transformation

| Anti-pattern (legacy) | Target pattern |
|----------------------|----------------|
| PDF list page (11× download) | Topic-grouped evidence links at story footer |
| Symposium title only (PAGE-1024) | Full narrative or archive card with date + relevance note |
| Org structure pages (about) | Leadership **context** in researcher section — not story body |

---

## 7. Forbidden Patterns

### Content anti-patterns

| Pattern | Why forbidden | Example |
|---------|---------------|---------|
| **Project dump** | Unstructured list of grant codes, years, PI names | "โครงการ 2565-2567 จำนวน 12 โครงการ…" |
| **PDF repository style** | Page is mostly download links | Legacy download hubs as primary UX |
| **Title + description only** | Fails narrative model; no trust arc | Card with one sentence + button |
| **Abstract-only** | Academic abstract without Problem/Community | Pasted journal abstract |
| **Symposium poster wall** | Event titles without story | News list masquerading as research |
| **Logo-as-hero** | No visual credibility | PAGE-1024 `images/logo.png` only |
| **Bilingual wall** | EN/TH duplicate paragraphs | Side-by-side unedited WTMS blocks |
| **Stale event as flagship** | Damages credibility | Old symposium without archival framing |

### Structural anti-patterns

- Carousel of unrelated projects with no topic filter
- "Research" section that only mirrors News
- Metrics in story body without dashboard/KPI sourcing
- AI-generated field photos presented as trial evidence

### RC6 injection rule

When legacy HTML is **only** forbidden patterns → **rewrite** using this framework; do not inject verbatim.

---

## Editorial workflow (reference)

```
Legacy capture → Narrative draft (this framework) → Visual review → RC6 inject
```

Cross-reference: `AI_ASSET_POLICY.md` for imagery · `RC6_READINESS_CHECKLIST.md` for gate

---

## Related documents

| Document | Path |
|----------|------|
| Landing Research section | `docs/design-system/LANDING_EXPERIENCE_GUIDE.md` |
| Dashboard KPI sourcing | `docs/design-system/DASHBOARD_VISUAL_GUIDE.md` |
| Photography | `docs/design-system/VISUAL_LANGUAGE_BIBLE.md` |
| Legacy scope | `migration/STAGING_MANIFEST.csv` |
| Content entities | `content-model/CONTENT_MODEL_V2.md` |

# AI Asset Policy — RAE MJU (RC5.6)

**Purpose**: Govern **all AI-generated content** used in the RAE Digital Experience — imagery, motion, illustration, icons, video, and composed layouts.

**Extends**: `DESIGN_GOVERNANCE.md` (Canva/fal.ai summaries) — this document is the **authoritative AI policy** for RC6 and beyond.

**Principle**: AI assists production; **human photography and verified evidence** remain the trust foundation for research and institutional claims.

**Workspace**: Documentation only — no asset files or tool configs in this repo.

---

## 1. Allowed AI Assets

AI may be used **without executive approval** (standard Review still required) for:

| Category | Use cases | Constraints |
|----------|-----------|-------------|
| **Abstract backgrounds** | Hero gradients, section textures, subtle agricultural patterns | No fake landscapes presented as real locations; label decorative if ambiguous |
| **Motion loops** | Ambient hero drift, soft particle grain, abstract loop ≤15s | MOTION_LANGUAGE_BIBLE timing; no autoplay with sound |
| **Conceptual illustrations** | Process diagrams, iconographic farming cycles, non-photographic infographics | Must not depict specific real people; stylized only |
| **Icon generation** | UI icons, topic chips, service pictograms | SVG preferred; match BRAND_SYSTEM colors |

### Quality bar for allowed assets

- Passes forbidden list in `VISUAL_LANGUAGE_BIBLE.md`
- Brand colors only: `#005C3B`, `#FFDE00`, neutrals
- No embedded text in image (typeset in HTML/Canva separately)
- File naming: see DESIGN_GOVERNANCE asset naming + `rae-ai-*` prefix below

---

## 2. Restricted AI Assets

Require **explicit approver** (design lead or institutional comms) before Production:

| Category | Restriction reason |
|----------|-------------------|
| **Executive portraits** | Misrepresentation of leadership; legal/reputational risk |
| **Researcher identities** | Cannot fabricate or substitute real faculty/staff |
| **Official evidence imagery** | Trial plots, lab results, before/after claimed as documentary |
| **Event photography** | Symposium, royal/university ceremonies |
| **Identifiable farmers/community members** | Consent and dignity requirements |

### Default stance

**Do not generate** restricted categories with AI. Use real photography or omit image.

If exception granted: watermark internal draft, document approver + date in asset manifest, never use on landing until Approved.

---

## 3. Human Photography Priority Rules

Priority order for all public surfaces:

```
1. Commissioned / official RAE photography
2. Verified legacy asset (re-graded) from ASSET_INVENTORY — if quality passes VISUAL_LANGUAGE_BIBLE
3. Approved Canva compositing of real photos + brand typesetting
4. Allowed AI categories (Section 1)
5. Restricted AI (Section 2) — only with written approval
```

### Research & extension

- Success Story hero: **real field/lab photo** mandatory
- Research Showcase card: real photo mandatory for featured slot; AI abstract allowed for supporting tiles only
- Before/after evidence: **no AI** (see RESEARCH_STORY_FRAMEWORK.md)

### RC6 legacy

Legacy WTMS banners and logo-only assets (e.g. PAGE-1024) → replace, not AI-upscale as fake documentary.

---

## 4. Canva Rules

Canva is **composition and typesetting** — not a bypass for restricted AI.

| Rule | Requirement |
|------|-------------|
| Brand kit | Locked to BRAND_SYSTEM.md hex and fonts (Prompt, Noto Sans Thai) |
| Templates | Org-approved only; no third-party "university" generic templates |
| AI features inside Canva | Magic Media / AI photo → treat as **fal.ai equivalent**; apply this policy |
| People in Canva AI | **Restricted** — same as Section 2 |
| Exports | WebP/PNG static; video only per MOTION_LANGUAGE_BIBLE |
| Text | Thai primary; verify spelling with native reviewer |
| RC6 | Typeset injected copy into **existing** layout frames — do not redesign landing |

**Naming**: `rae-canva-{template-id}-{section}-{revision}.{ext}`

---

## 5. Stitch Rules

**Stitch** (Google Stitch / AI UI composition tools) — used for mockups, layout exploration, and marketing compositing.

| Rule | Requirement |
|------|-------------|
| Purpose | Prototype dashboard previews, social crops, presentation decks — not production HTML |
| Production use | Export **static assets** only after Review; do not ship Stitch HTML/React to Next.js |
| Brand | Import BRAND_SYSTEM tokens manually — verify hex match |
| Components | Stitch output does not override Next.js design system |
| People / evidence | Same restrictions as Sections 2–3 |
| Handoff | Designer exports PNG/WebP → asset manifest → app repo `public/` |

**Naming**: `rae-stitch-{screen}-{variant}-{revision}.png`

---

## 6. fal.ai Rules

| Rule | Requirement |
|------|-------------|
| Primary use | Gap-fill abstract backgrounds, conceptual textures, allowed illustrations |
| Not for | Hero documentary photos, researcher portraits, field evidence |
| Prompt | Include: Maejo agricultural research context, realistic **or** explicitly abstract style |
| Negative prompt | handshake, business suit, stock photo, watermark, text overlay, uncanny face |
| Post-process | Color grade to VISUAL_LANGUAGE_BIBLE; crop to composition rules |
| Metadata | Model, version, prompt, seed in PR / manifest |
| Batch | No bulk generate-and-publish; each asset Reviewed |

**Prompt skeleton** (abstract — allowed):

```
Abstract organic texture inspired by agricultural leaf patterns,
institutional green #005C3B palette, soft gradient, minimal,
no people, no text, no watermark, premium institutional mood
```

**Prompt skeleton** (conceptual illustration — allowed):

```
Flat vector illustration of greenhouse research, simplified shapes,
Thai agricultural context, brand colors green and gold accent,
no faces, no photorealism
```

**Naming**: `rae-fal-{prompt-slug}-{seed}-{width}w.{ext}`

---

## 7. AI Video Rules

| Rule | Requirement |
|------|-------------|
| Landing | Avoid autoplay video; prefer static hero |
| Allowed | Short ambient loops (abstract), ≤15s, muted, no faces |
| Restricted | Documentary-style AI video of people, labs, or fields |
| fal / Runway / similar | Restricted categories need approver |
| Format | WebM/MP4 optimized; poster frame required |
| Motion | MOTION_LANGUAGE_BIBLE — no bounce, spin, RGB |
| Accessibility | Pause control if autoplay; respect reduced motion |

---

## 8. Attribution Rules

| Asset type | Attribution |
|------------|-------------|
| Real photography | © RAE / Maejo + photographer credit if contract requires |
| Legacy migrated | `Source: RAE archive (PAGE-XXXX)` in manifest |
| AI allowed (Section 1) | `Visual: AI-generated (tool, date)` in manifest — optional public caption "ภาพประกอบสร้างโดย AI" for transparency on ambiguous abstracts |
| AI restricted (approved) | Internal log mandatory; public caption if depicting realistic scene |
| Canva/Stitch composite | `Design: RAE Communications` |

**Public site**: Small caption not required on decorative abstract backgrounds; **required** if image could be mistaken for documentary photo.

**Research integrity**: Never attribute AI image as trial evidence.

---

## 9. Asset Approval Workflow

```
Draft → Review → Approved → Production
```

| Stage | Activities | Exit criteria |
|-------|------------|---------------|
| **Draft** | Generate/create asset; fill manifest (tool, prompt, seed, category, legacyRef) | File exported; self-check against Sections 1–2 |
| **Review** | Visual Language + Brand + Research/Dashboard relevance | Reviewer sign-off; restricted items flagged |
| **Approved** | Asset registered; naming convention applied | Entry in manifest with approver + date |
| **Production** | Copied to Next.js app repo / CDN | RC6_READINESS_CHECKLIST AI row PASS |

### Manifest fields (reference schema)

```yaml
id: rae-fal-field-texture-01-1920w
category: allowed | restricted
tool: fal.ai | Canva | Stitch | other
prompt: "..."
seed: "12345"
approver: null | name
approvedDate: null | ISO date
usedIn: landing-hero | research-card-3
legacyRef: PAGE-1024 | null
publicCaption: optional Thai caption
```

### Rejection triggers (auto-fail Review)

- Restricted category without approver
- Forbidden VISUAL_LANGUAGE patterns
- Mislabeled AI as photography
- Wrong brand colors
- Embedded faces on restricted workflow

---

## RC6 Content Injection interaction

| Activity | AI policy |
|----------|-----------|
| Inject legacy text | No AI on copy — human rewrite |
| Replace legacy images | Human photo first; allowed AI for non-evidence slots |
| Generate placeholder | Label `DRAFT` — not Production |
| Dashboard mock | Stitch/fal abstract UI chrome OK; numbers not AI-invented |

---

## Related documents

| Document | Path |
|----------|------|
| Photography | `docs/design-system/VISUAL_LANGUAGE_BIBLE.md` |
| General governance | `docs/design-system/DESIGN_GOVERNANCE.md` |
| Research evidence | `docs/design-system/RESEARCH_STORY_FRAMEWORK.md` |
| RC6 gate | `docs/design-system/RC6_READINESS_CHECKLIST.md` |

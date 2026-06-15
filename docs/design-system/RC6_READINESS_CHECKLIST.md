# RC6 Readiness Checklist — RAE MJU

**Purpose**: Single **PASS/FAIL gate** before RC6 Content Injection begins.

**When to run**: After RC5.5 Visual Governance and RC5.6 Research Governance are complete; immediately before any legacy content is injected into the Next.js application repo.

**Who runs**: Operator or agent lead — second reviewer recommended for FAIL items.

**Workspace**: This checklist lives in the legacy extraction repo. The Next.js app repo has its own implementation QA — both must PASS for production.

---

## Pre-flight confirmations

| # | Confirmation | PASS | FAIL |
|---|--------------|------|------|
| P1 | RC5.5 docs present and unchanged (`BRAND_SYSTEM`, `VISUAL_LANGUAGE`, `MOTION`, `LANDING`, `DESIGN_GOVERNANCE`) | ☐ | ☐ |
| P2 | RC5.6 docs present (`RESEARCH_STORY`, `DASHBOARD_VISUAL`, `AI_ASSET`, this checklist) | ☐ | ☐ |
| P3 | `migration/STAGING_MANIFEST.csv` scope understood (25 pages, keep only) | ☐ | ☐ |
| P4 | No production code changes planned in extraction workspace | ☐ | ☐ |
| P5 | Next.js app repo identified for injection target (separate from this workspace) | ☐ | ☐ |

---

## Gate categories

### 1. Brand

**Reference**: `docs/design-system/BRAND_SYSTEM.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| B1 | Primary Green `#005C3B` and Gold `#FFDE00` documented as canonical | ☐ | ☐ |
| B2 | Legacy blue `#1A237E` (`design-system/DESIGN_TOKENS_V1.md`) explicitly excluded for new work | ☐ | ☐ |
| B3 | CTA color rules understood (one primary green CTA per viewport) | ☐ | ☐ |
| B4 | Typography families identified (Prompt / Noto Sans Thai) | ☐ | ☐ |
| B5 | Dashboard `dash-*` tokens referenced for preview section | ☐ | ☐ |

**Brand gate**: PASS only if B1–B5 all PASS.

---

### 2. Visual

**Reference**: `docs/design-system/VISUAL_LANGUAGE_BIBLE.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| V1 | Allowed/forbidden photography lists reviewed | ☐ | ☐ |
| V2 | Plan to replace logo-only / low-res legacy banners (PAGE-1001, PAGE-1024) | ☐ | ☐ |
| V3 | Hero safe zones and cropping rules understood | ☐ | ☐ |
| V4 | No handshake / stock business / fake student imagery in injection plan | ☐ | ☐ |
| V5 | Alt text strategy defined (Thai primary) | ☐ | ☐ |

**Visual gate**: PASS only if V1–V5 all PASS.

---

### 3. Motion

**Reference**: `docs/design-system/MOTION_LANGUAGE_BIBLE.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| M1 | Allowed motion patterns only (fade, blur reveal, ambient, parallax, hover lift) | ☐ | ☐ |
| M2 | Forbidden patterns excluded (bounce, spin, RGB, gaming, excessive zoom) | ☐ | ☐ |
| M3 | Timing bands documented (hover 150–300ms, reveal 600–1200ms) | ☐ | ☐ |
| M4 | `prefers-reduced-motion` fallback planned in app repo | ☐ | ☐ |
| M5 | No legacy WTMS autoplay carousel in injection scope | ☐ | ☐ |

**Motion gate**: PASS only if M1–M5 all PASS.

---

### 4. Research Story

**Reference**: `docs/design-system/RESEARCH_STORY_FRAMEWORK.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| R1 | Narrative model understood (Problem → Research → Innovation → Impact → Community) | ☐ | ☐ |
| R2 | Showcase card structure defined before injecting PAGE-1024 or service content | ☐ | ☐ |
| R3 | Forbidden patterns blocked (project dump, PDF repository, title+description only) | ☐ | ☐ |
| R4 | PAGE-1024 rewrite plan (symposium → story or dated archive) documented | ☐ | ☐ |
| R5 | PAGE-1014 framed as extension/service hub — not bureaucratic dump | ☐ | ☐ |
| R6 | Before/after pairs only with real photography | ☐ | ☐ |

**Research Story gate**: PASS only if R1–R6 all PASS.

---

### 5. Dashboard

**Reference**: `docs/design-system/DASHBOARD_VISUAL_GUIDE.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| D1 | Data → Insight → Action model understood for KPI section | ☐ | ☐ |
| D2 | KPI sources identified or placeholders explicitly labeled (not invented from legacy) | ☐ | ☐ |
| D3 | Visual anti-patterns excluded (spreadsheet, dense tables, rainbow/3D charts) | ☐ | ☐ |
| D4 | Landing dashboard preview = static mock or verified metrics only | ☐ | ☐ |
| D5 | Research vs executive metrics distinction documented | ☐ | ☐ |

**Dashboard gate**: PASS only if D1–D5 all PASS.

---

### 6. AI Asset

**Reference**: `docs/design-system/AI_ASSET_POLICY.md`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| A1 | Allowed vs restricted AI categories understood | ☐ | ☐ |
| A2 | Human photography priority rule accepted for research heroes | ☐ | ☐ |
| A3 | Canva / Stitch / fal.ai rules reviewed for any planned assets | ☐ | ☐ |
| A4 | Draft → Review → Approved → Production workflow assigned | ☐ | ☐ |
| A5 | No AI executive portraits or fake evidence imagery in plan | ☐ | ☐ |
| A6 | Attribution/manifest strategy defined for AI-assisted assets | ☐ | ☐ |

**AI Asset gate**: PASS only if A1–A6 all PASS.

---

### 7. Content

**Reference**: `docs/legacy-migration/*`, `migration/STAGING_MANIFEST.csv`, `migration/MIGRATION_MATRIX.csv`

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| C1 | Injection scope = STAGING_MANIFEST only (25 rows) | ☐ | ☐ |
| C2 | Protected pages excluded (PAGE-1003 admin/login) | ☐ | ☐ |
| C3 | Fragment duplicates excluded (PAGE-1027–1030, etc.) | ☐ | ☐ |
| C4 | `rewrite` rows identified in MIGRATION_MATRIX (About, PAGE-1024) | ☐ | ☐ |
| C5 | 2023-04-20 cutoff applied to news/events/downloads | ☐ | ☐ |
| C6 | Home variants consolidation plan (6 → 1 canonical hero) | ☐ | ☐ |
| C7 | No WTMS HTML/CSS/JS paste — content extraction only | ☐ | ☐ |
| C8 | `old_url` metadata preserved for redirect planning | ☐ | ☐ |

**Content gate**: PASS only if C1–C8 all PASS.

---

### 8. Accessibility

**Reference**: `docs/design-system/DESIGN_GOVERNANCE.md` (accessibility checklist)

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| X1 | WCAG 2.1 AA contrast plan for text and CTAs | ☐ | ☐ |
| X2 | Hero scrim contrast verified for Thai headlines | ☐ | ☐ |
| X3 | Keyboard focus and 44px touch targets in app repo plan | ☐ | ☐ |
| X4 | Chart/dashboard non-color cues planned | ☐ | ☐ |
| X5 | `lang="th"` / `lang="en"` content marking strategy | ☐ | ☐ |

**Accessibility gate**: PASS only if X1–X5 all PASS.

---

### 9. Performance

**Reference**: `docs/design-system/DESIGN_GOVERNANCE.md` (performance checklist)

| # | Criterion | PASS | FAIL |
|---|-----------|------|------|
| F1 | Image format strategy (WebP/AVIF, optimized hero ≤200KB target) | ☐ | ☐ |
| F2 | No legacy hotlinked WTMS assets in production plan | ☐ | ☐ |
| F3 | LCP hero priority strategy documented for app repo | ☐ | ☐ |
| F4 | Dashboard preview prefers static mock over heavy iframe | ☐ | ☐ |
| F5 | Font subsetting plan for Thai + Latin | ☐ | ☐ |

**Performance gate**: PASS only if F1–F5 all PASS.

---

## Master gate summary

| Category | Gate | PASS | FAIL |
|----------|------|------|------|
| Pre-flight | P1–P5 | ☐ | ☐ |
| Brand | B1–B5 | ☐ | ☐ |
| Visual | V1–V5 | ☐ | ☐ |
| Motion | M1–M5 | ☐ | ☐ |
| Research Story | R1–R6 | ☐ | ☐ |
| Dashboard | D1–D5 | ☐ | ☐ |
| AI Asset | A1–A6 | ☐ | ☐ |
| Content | C1–C8 | ☐ | ☐ |
| Accessibility | X1–X5 | ☐ | ☐ |
| Performance | F1–F5 | ☐ | ☐ |

---

## PASS/FAIL review template

Copy for each RC6 kickoff review:

```markdown
# RC6 Readiness Review

**Date**: YYYY-MM-DD  
**Reviewer**: [name / agent session]  
**Target**: [Next.js app repo + branch]  
**Extraction workspace**: /home/prinya/raemju

## Result

| Overall | PASS | FAIL |
|---------|------|------|
| RC6 Content Injection authorized | ☐ | ☐ |

## Category results

| Category | Result | Notes |
|----------|--------|-------|
| Pre-flight | PASS / FAIL | |
| Brand | PASS / FAIL | |
| Visual | PASS / FAIL | |
| Motion | PASS / FAIL | |
| Research Story | PASS / FAIL | |
| Dashboard | PASS / FAIL | |
| AI Asset | PASS / FAIL | |
| Content | PASS / FAIL | |
| Accessibility | PASS / FAIL | |
| Performance | PASS / FAIL | |

## Blocking issues (FAIL items)

1. 
2. 

## Conditional approvals

- [ ] Placeholder KPIs allowed on landing with "Coming soon" label
- [ ] PAGE-1024 archived as news card only (not featured research)
- [ ] AI abstract backgrounds only for hero until photo shoot

## Sign-off

**Primary reviewer**: _______________  
**Secondary reviewer** (optional): _______________  

**Next action if PASS**: Begin RC6 injection per `docs/legacy-migration/README.md`  
**Next action if FAIL**: Resolve blockers; re-run checklist — do not inject
```

---

## Documentation index (RC5.5 + RC5.6)

| Phase | Document |
|-------|----------|
| RC5.5 | `README.md`, `BRAND_SYSTEM.md`, `VISUAL_LANGUAGE_BIBLE.md`, `MOTION_LANGUAGE_BIBLE.md`, `LANDING_EXPERIENCE_GUIDE.md`, `DESIGN_GOVERNANCE.md` |
| RC5.6 | `RESEARCH_STORY_FRAMEWORK.md`, `DASHBOARD_VISUAL_GUIDE.md`, `AI_ASSET_POLICY.md`, `RC6_READINESS_CHECKLIST.md` (this file) |
| RC6 content | `docs/legacy-migration/README.md`, `migration/STAGING_MANIFEST.csv` |

---

## RC6 authorization rule

**RC6 Content Injection may begin only when:**

1. Overall result = **PASS**
2. Zero unresolved blockers in FAIL items
3. Conditional approvals documented if any checkbox used

If any category FAIL → fix governance gap or injection plan → re-run checklist.

# Landing Experience Guide — RAE MJU (RC5.5)

**Scope**: Experience definition for the Next.js landing — purpose, emotion, hierarchy, CTA, and motion per section.

**Not in scope**: Component implementation, route structure, or CMS wiring (those live in the Next.js app repo).

**Content source (RC6)**: `migration/STAGING_MANIFEST.csv` mapped via `docs/legacy-migration/CONTENT_MODEL_SUMMARY.md`

**Design references**: UTCC institutional clarity · Vercel polish · Stripe trust · Linear density · Apple Education warmth · MIT Media Lab innovation

---

## Global experience principles

| Principle | Expression |
|-----------|------------|
| Premium institutional | Generous whitespace, confident typography, restrained color |
| Thai-first | Headlines and primary CTAs in Thai; English secondary where needed |
| Research credibility | Real photography, data-backed KPIs, no stock clichés |
| Calm motion | Reveals and hover only — see MOTION_LANGUAGE_BIBLE.md |
| One primary action per viewport | Green primary CTA; gold accent sparingly |

---

## Section 1 — Hero

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Establish RAE as Maejo’s agricultural research authority; orient visitors to services and research |
| **User emotion** | Trust, clarity, pride in institution |
| **Visual hierarchy** | 1) Thai institution name 2) One-line mission 3) Primary CTA 4) Secondary link 5) Hero media |
| **CTA strategy** | Primary: `Explore services` (green) · Secondary: `View research` (outline) · Max 2 actions |
| **Motion strategy** | Blur reveal headline (800–1000ms); optional ambient background drift; no autoplay carousel |

**RC6 content**: Consolidate PAGE-1001/1004/1007/1026 copy; replace legacy banners per VISUAL_LANGUAGE_BIBLE.md

---

## Section 2 — KPI

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Quantify institutional impact — projects, partnerships, extension reach, publications |
| **User emotion** | Confidence, scale, legitimacy |
| **Visual hierarchy** | 1) Section label 2) 3–4 metrics 3) Optional footnote/source |
| **CTA strategy** | Optional text link `See full report` → dashboard or about — no competing button row |
| **Motion strategy** | Stagger fade + count-up (800–1200ms, once); no spinning icons |

**RC6 content**: Editorial metrics — not extracted verbatim from legacy WTMS; align with approved institutional data

---

## Section 3 — Services

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Route users to academic services (PAGE-1014 hub + future expansion) |
| **User emotion** | Capability, accessibility, “they can help me” |
| **Visual hierarchy** | 1) Section title 2) Service category cards 3) Per-card CTA |
| **CTA strategy** | Card-level `Learn more` / `Request service` · Section footer link to full service hub |
| **Motion strategy** | Stagger card reveal; soft hover lift (200ms) |

**RC6 content**: PAGE-1014 (กองบริหารงานบริการวิชาการ) + download cross-links where relevant

**Reference blueprint**: `frontend-prototypes/SERVICE_HUB_BLUEPRINT_V1.md`

---

## Section 4 — Research Showcase

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Highlight research programs, symposia, and innovation stories |
| **User emotion** | Curiosity, intellectual energy, forward-looking |
| **Visual hierarchy** | 1) Featured project 2) Supporting cards 3) Filter or topic chips (optional) |
| **CTA strategy** | `View project` · `Contact researcher` — secondary ghost style |
| **Motion strategy** | User-driven horizontal scroll or grid stagger; **no** auto-rotating carousel |

**RC6 content**: PAGE-1024 (symposium) only after editorial review; CONTENT_MODEL_V2 Research entity shape

**Reference blueprint**: `frontend-prototypes/RESEARCH_SHOWCASE_BLUEPRINT_V1.md`

---

## Section 5 — News

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Surface timely announcements, calendar items, events |
| **User emotion** | Informed, connected, current |
| **Visual hierarchy** | 1) Section title 2) Featured item 3) List of 2–4 items with dates |
| **CTA strategy** | `View all news` text link; item-level `Read more` |
| **Motion strategy** | Simple fade-in list; no marquee |

**RC6 content**: PAGE-1005 (calendar), PAGE-1024 (event) — apply 2023-04-20 cutoff rules from MIGRATION_NOTES.md

---

## Section 6 — Impact Story

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Humanize outcomes — farmers, communities, field results tied to RAE mission |
| **User emotion** | Empathy, purpose, social proof |
| **Visual hierarchy** | 1) Pull quote or outcome headline 2) Short narrative 3) Supporting photo 4) Optional stat |
| **CTA strategy** | Single `Read impact stories` or link to case study — no hard sell |
| **Motion strategy** | Scroll-triggered fade; subtle parallax on photo only (≤10px) |

**RC6 content**: Editorial — not a direct legacy page type; synthesize from About + field photography guidelines

---

## Section 7 — Dashboard Preview

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Tease internal transparency — research metrics, project status, or public data portal |
| **User emotion** | Transparency, modernity, operational seriousness |
| **Visual hierarchy** | 1) Section title 2) UI mock or simplified widget grid 3) Explainer line |
| **CTA strategy** | `Open dashboard` (secondary) — only if product exists; otherwise `Coming soon` disabled state |
| **Motion strategy** | Fade panel; tab crossfade 300ms max; chart draw **without** animation excess |

**Visual tokens**: `dash-*` colors from BRAND_SYSTEM.md — neutral-first, green accents

---

## Section 8 — Footer

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Contact, navigation redundancy, legal, social, language |
| **User emotion** | Grounded, reachable, complete |
| **Visual hierarchy** | 1) Contact block (PAGE-1006) 2) Link columns 3) Legal/copyright 4) Maejo mark |
| **CTA strategy** | `Contact us` · `Unit inquiry` (PAGE-1020) · Phone/email prominent — no marketing CTAs |
| **Motion strategy** | Optional 600ms fade on first view; static thereafter |

**RC6 content**: PAGE-1006, PAGE-1020 — evergreen; inject address and inquiry copy

---

## Section flow (recommended scroll order)

```
Hero → KPI → Services → Research Showcase → News → Impact Story → Dashboard Preview → Footer
```

Matches premium institutional pacing: **promise → proof → paths → depth → timeliness → humanity → systems → contact**

Legacy Joomla homepage blueprint (`docs/HOMEPAGE_BLUEPRINT_V1.md`) included downloads band mid-page — on Next.js landing, fold **featured downloads** into Services or Footer links unless product requires dedicated Downloads section later.

---

## Emotion arc (visitor journey)

```
Trust (Hero) → Proof (KPI) → Utility (Services) → Inspiration (Research)
→ Currency (News) → Purpose (Impact) → Transparency (Dashboard) → Access (Footer)
```

---

## RC6 injection boundaries (experience)

| Do | Do not |
|----|--------|
| Inject approved titles, body copy, contact data | Paste WTMS HTML tables or legacy menus |
| Replace low-quality banners with governed photography | Import legacy carousel behavior |
| Rewrite About institutional pages | Copy org-chart images without accessibility review |
| Link downloads as clean document list | Expose admin/login URLs (PAGE-1003) |

---

## Related documents

- `docs/design-system/BRAND_SYSTEM.md`
- `docs/design-system/VISUAL_LANGUAGE_BIBLE.md`
- `docs/design-system/MOTION_LANGUAGE_BIBLE.md`
- `docs/legacy-migration/CONTENT_MODEL_SUMMARY.md`
- `frontend-prototypes/HOMEPAGE_BLUEPRINT_V1.md`

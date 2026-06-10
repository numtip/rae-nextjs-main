# Sprint 2 Week 1 — RC2 Close-out QA

**Date:** 2026-06-10  
**Project:** RAE Next.js Main (`numtip/rae-nextjs-main`)  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Baseline:** `origin/main` @ `b0fdbbb` (Sprint 1 RC1 QA)

---

## Confirmed path

`/home/rae_admin/rae-nextjs-main/`

---

## Ahead count

**5 commits** ahead of `origin/main`  
Working tree: **clean**

---

## Commit list (origin/main..HEAD)

| SHA | Message |
|-----|---------|
| `9d8dba4` | docs: add Sprint 2 agency agents governance |
| `9630548` | feat: polish homepage hero services and label KPI placeholders |
| `9fc9bec` | feat: activate agent skills and polish services heading model |
| `5faa688` | feat: polish news highlights and harden service links |
| `e464b8f` | feat: polish documents and green office utility sections |

**Diff summary:** 31 files · **+1,441 / −83** (`b0fdbbb..HEAD`)

---

## Skills verified

| Skill | Artifact | Status |
|-------|----------|--------|
| TOKEN_SAVIOR_WORKFLOW | `docs/agent/skills/TOKEN_SAVIOR_WORKFLOW.md` | Present |
| BUILD_VERIFICATION | `docs/agent/skills/BUILD_VERIFICATION.md` | Present |
| HOMEPAGE_REVIEW | `docs/agent/skills/HOMEPAGE_REVIEW.md` | Present |
| A11Y_REVIEW | `docs/agent/skills/A11Y_REVIEW.md` | Present |
| RELEASE_SAFETY_CHECK | `docs/agent/skills/RELEASE_SAFETY_CHECK.md` | Present |
| Index | `docs/agent/SKILLS_INDEX.md` | Present |

`AGENT_WORKFLOW.md` includes skill-first rule.

---

## Homepage sections verified

| Check | Status | Evidence |
|-------|--------|----------|
| KPI placeholder labeled | **PASS** | `source: "placeholder"`, `status: "pending-live-source"`, `placeholderNotice`, `role="note"` |
| Hero present | **PASS** | `components/home/Hero.tsx` — `h1#hero-title` |
| QuickLinks present | **PASS** | `components/home/QuickLinks.tsx` — polished pattern |
| Services explicit path | **PASS** | `ServiceCard.path` + `card.path` in `ServicesOverview` |
| NewsHighlights polished | **PASS** | `.news-card-cta`, `aria-label` |
| DocumentsCTA polished | **PASS** | `.documents-cta-strip`, `h2`, chevron CTA |
| GreenOffice explicit path | **PASS** | `greenOffice.path` + utility CTA |
| SiteHeader not h1 | **PASS** | `<p className="brand-title">` |
| Homepage single h1 | **PASS** | Hero `h1` only in `components/home/` |

**Not polished (known gap):** `ResearchSystemsCTA` — still base `.cta-strip` from Slice 1 era.

---

## Build status

| Check | Result |
|-------|--------|
| Node | v20.19.5 (nvm) |
| `npm run build` | **PASS** — 32 static pages |
| TypeScript (in build) | **PASS** |

---

## Forbidden-area check

| Area | Result |
|------|--------|
| `/var/www/` | **PASS** — not in diff |
| nginx configs | **PASS** — not in diff |
| docker / systemd | **PASS** — not in diff |
| production deploy scripts | **PASS** — not in diff |
| Production deploy performed | **NO** |

---

## QA skill invocation summary

| Skill | RC2 result |
|-------|------------|
| TOKEN_SAVIOR_WORKFLOW | OK — scoped inspection |
| HOMEPAGE_REVIEW | PASS — 8 sections registry intact |
| A11Y_REVIEW | PASS — heading model fixed |
| BUILD_VERIFICATION | PASS |
| RELEASE_SAFETY_CHECK | PASS |

---

## Risks

| Risk | Severity | Notes |
|------|----------|-------|
| KPI values still visible | Medium | Labeled placeholder; not live data |
| `path` duplicated th/en | Low | `servicesOverview`, `greenOffice` |
| `ResearchSystemsCTA` unpolished | Low | Visual parity gap vs documents CTA |
| ESLint non-functional | Low | No `eslint.config.*` |
| `git diff origin/main..HEAD` empty via rtk | Low | Verified via `b0fdbbb..HEAD` |
| Push ≠ deploy | Info | GitHub sync only |

---

## Push readiness recommendation

### **GO** (conditional) for GitHub push

Push recommended when:

1. SSH auth confirmed (`rtk ssh -T github-rae-nextjs-main`)
2. Stakeholders accept KPI placeholder display
3. Push understood as **source sync only** — no production deploy

**Do not deploy** to `/var/www/raeservice/landing/` with this push.

If SSH unavailable: **NO-GO on execution**, **GO on code quality** — build-verified, infra-safe.

---

## Sign-off

| Gate | Status |
|------|--------|
| Sprint 2 Week 1 polish slices | PASS (4/4 + skills) |
| Agent skills library | PASS |
| Build QA | PASS |
| Infra safety | PASS |
| RC2 push readiness | Conditional GO |

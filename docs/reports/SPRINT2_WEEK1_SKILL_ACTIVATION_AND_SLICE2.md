# Sprint 2 Week 1 — Skill Activation & Slice 2

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Confirmed path

`/home/rae_admin/rae-nextjs-main/`

---

## Skills created

| Skill | Path |
|-------|------|
| Token Savior Workflow | `docs/agent/skills/TOKEN_SAVIOR_WORKFLOW.md` |
| Build Verification | `docs/agent/skills/BUILD_VERIFICATION.md` |
| Homepage Review | `docs/agent/skills/HOMEPAGE_REVIEW.md` |
| A11y Review | `docs/agent/skills/A11Y_REVIEW.md` |
| Release Safety Check | `docs/agent/skills/RELEASE_SAFETY_CHECK.md` |
| Skills Index | `docs/agent/SKILLS_INDEX.md` |

`docs/agent/AGENT_WORKFLOW.md` updated with skill-first rule.

---

## Skills used (this slice)

| Skill | Result |
|-------|--------|
| TOKEN_SAVIOR_WORKFLOW | OK — targeted reads only |
| HOMEPAGE_REVIEW | PASS — `services-overview` pattern aligned; registry unchanged |
| A11Y_REVIEW | PASS — single `h1` on homepage (Hero); header brand demoted |
| BUILD_VERIFICATION | PASS — Node v20.19.5, 32 pages |
| RELEASE_SAFETY_CHECK | PASS — no deploy/push/production touch |

---

## Files changed

| File | Change |
|------|--------|
| `docs/agent/skills/*` (5) | New reusable skills |
| `docs/agent/SKILLS_INDEX.md` | Skill catalog |
| `docs/agent/AGENT_WORKFLOW.md` | Skill-first rule |
| `components/home/ServicesOverview.tsx` | Service cards + CTA links |
| `components/home/Hero.tsx` | `h1` primary homepage title |
| `components/navigation/SiteHeader.tsx` | Brand `h1` → `p.brand-title` |
| `app/globals.css` | `.service-card`, `.service-card-cta` styles |
| `docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md` | Services pattern + heading model |

---

## Services polish summary

- `.service-card` mirrors `.quick-link-card` (green left accent, flex column)
- Each card links to `/research-services/`, `/academic-services/`, `/research-systems/`
- CTA row with touch target, chevron, `aria-label` per card
- Section `aria-labelledby` on `#services-overview`

---

## Heading model fix

| Location | Before | After |
|----------|--------|-------|
| `SiteHeader` brand | `h1` | `p.brand-title` |
| Homepage `Hero` | `h2` | `h1` (sole homepage h1) |
| Inner pages | `PageSimple` / article `h1` | Unchanged — owns page h1 |

---

## Build status

**PASS** — 32 static pages

---

## Risks

| Risk | Notes |
|------|-------|
| Service paths by index | Order-locked to `serviceCards` array; OK while data order stable |
| Not pushed | Local only |
| ESLint still absent | Build/tsc only |
| KPI still placeholder | Unchanged |

---

## Next recommendation

1. Slice 3: news highlights card polish (same skill stack)
2. Push 3+ local commits when explicitly requested
3. Add `eslint.config.js` in scoped tooling task
4. Wire KPI live source in separate approved task

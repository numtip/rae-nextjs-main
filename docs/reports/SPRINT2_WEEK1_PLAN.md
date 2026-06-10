# Sprint 2 Week 1 — Plan

**Date:** 2026-06-10  
**Project:** RAE Next.js Main (`numtip/rae-nextjs-main`)  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Current repo state

| Item | Status |
|------|--------|
| GitHub `main` | In sync with local `main` |
| Sprint 1 | Complete (tokens, layout, nav, footer, homepage IA, KPI strip, governance docs) |
| Build | Passes on Node v20.19.5 (`.nvmrc` + `engines`) |
| Production | **Not deployed** — `/var/www/raeservice/landing/` untouched |
| KPI data | Static placeholders in `data/kpiImpact.ts` |
| ESLint | Script exists; no `eslint.config.*` — lint non-functional |
| Agent governance | **New** — `docs/agent/` (this sprint) |

---

## Sprint 2 goals

1. **Agency Agents governance** — policy and workflow for multi-agent execution
2. **Homepage Production Prototype (safe start)** — evolve visual polish within Sprint 1 patterns without deploy
3. **Content integrity** — label placeholders; prepare for verified KPI source
4. **Tooling hygiene** — plan ESLint v9 config (implement when scoped)

---

## Homepage prototype scope (Week 1)

### In scope

- Documentation and agent policy (this deliverable)
- Minor targeted CSS/component tweaks aligned with `HOMEPAGE_VISUAL_SYSTEM.md`
- Explicit `PLACEHOLDER` marking on KPI and unverified content
- Prototype review checklist before any Week 2 UI pass
- Local commits only; build verification after code changes

### Prototype principles

- Reuse existing patterns: `.hero-section`, `.card-panel`, `.cta-strip`, `.kpi-strip`
- No new primary brand colors (`#005C3B`, `#FFDE00`, `#4C4C4C` locked)
- Section order via `data/home-sections.ts` only
- Bilingual parity (`th` / `en`) for all visible copy changes

---

## Excluded scope

| Excluded | Reason |
|----------|--------|
| Production deploy | Approval required; RC1 pushed source only |
| `/var/www/raeservice/landing/` edits | Production path |
| nginx / Docker / systemd | Infrastructure |
| GitHub push | Unless explicitly requested |
| Major UI redesign | Week 1 is governance + safe prototype prep |
| CMS / live KPI integration | Data source not wired |
| Inner page visual redesign | Homepage prototype focus |
| Broad repo refactor | Token and scope control |

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Agents bypass RTK / canonical path | High | `AGENCY_AGENTS_POLICY.md` mandatory |
| Static KPI presented as live | Medium | Add placeholder flags in `data/kpiImpact.ts` in Week 1–2 |
| ESLint gap | Low | Build/tsc gates; add `eslint.config.js` in scoped task |
| Accidental deploy | High | DevOps agent read-only; no rsync in agent workflows |
| Token burn on broad scans | Medium | token-savior + scoped paths |
| Node 12 system default | Low | `nvm use 20` in every build session |

---

## Next execution recommendation

**Week 1 completion (after this commit):**

1. Add `PLACEHOLDER` annotation to `data/kpiImpact.ts` and visual indicator in docs
2. Create homepage prototype checklist in `docs/reports/`
3. Optional: add minimal `eslint.config.js` (ESLint 9 flat config) — separate scoped task

**Week 2 execution:**

1. Homepage production prototype pass — hero and services section polish only
2. QA report: `SPRINT2_PROTOTYPE_QA.md`
3. Push to GitHub only after QA go and explicit request

**Never in agent default flow:** deploy to production.

---

## Related documents

| Document | Purpose |
|----------|---------|
| `docs/agent/AGENCY_AGENTS_POLICY.md` | Agent roles and guardrails |
| `docs/agent/AGENT_WORKFLOW.md` | GPT / Cursor / RTK workflow |
| `docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md` | Pattern spec |
| `docs/reports/SPRINT1_RC1_PRE_PUSH_QA.md` | RC1 baseline |

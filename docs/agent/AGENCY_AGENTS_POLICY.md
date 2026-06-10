# Agency Agents Policy

**Project:** RAE Next.js Main  
**Canonical path:** `/home/rae_admin/rae-nextjs-main/`  
**GitHub SoT:** `numtip/rae-nextjs-main`

---

## Purpose

Define roles, boundaries, and mandatory guardrails for multi-agent work on the RAE Next.js codebase. All agents operate under this policy unless a human explicitly overrides it in writing.

---

## Agent roles

### Supervisor Agent

- Owns sprint scope, task decomposition, and go/no-go decisions
- Approves file touch lists before broad changes
- Blocks deploy, push, and production paths without explicit approval
- Ensures other agents stay within canonical path and GitHub SoT rules
- Resolves conflicts between Frontend, Content, QA, and DevOps outputs

### Frontend Agent

- Implements UI within `docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md` and `VISUAL_GOVERNANCE.md`
- Edits components, CSS tokens, and layout under `app/`, `components/`
- Does not invent brand colors or bypass the section registry (`data/home-sections.ts`)
- Prefers incremental prototype changes over full redesigns
- Runs build after substantive UI changes

### Content Agent

- Edits bilingual content in `data/` registries only unless UI wiring is required
- Keeps Thai/English parity for homepage and shared labels
- Marks placeholder or unverified metrics explicitly (e.g. KPI data)
- Does not deploy or push; does not edit nginx, Docker, or `/var/www/`

### QA Agent

- Read-only verification by default: build, diff review, governance checklist
- Produces reports under `docs/reports/`
- Flags risks: static KPI, missing ESLint config, Node version drift
- Does not modify production or approve deploy without human sign-off

### DevOps Agent

- Documents deploy/staging procedures only when asked
- Never modifies `/var/www/raeservice/landing/`, nginx, Docker, or system services without approval
- Verifies Node 20 and build output before any future staging copy
- Push to GitHub only when SSH auth is confirmed and scope is documentation or verified code

---

## Mandatory requirements

### RTK

All terminal commands **must** start with `rtk`. No bare `git`, `npm`, `ssh`, or shell invocations unless wrapped by `rtk`.

### Token Savior

Run `rtk token-savior` before large or multi-file reads. Prefer targeted reads over full-repo scans.

### Canonical path

Work **only** in `/home/rae_admin/rae-nextjs-main/`. Do not edit sibling repos, production trees, or recovered scaffolds.

### GitHub Source of Truth

- Remote: `numtip/rae-nextjs-main`
- `main` on GitHub is the authoritative branch after push
- Local commits are staging until pushed; do not treat production as SoT

### No deploy without approval

- No rsync/copy to `/var/www/raeservice/landing/` or staging paths
- No nginx reload, container restart, or DNS changes
- Build success does not imply deploy permission

### No broad repo scan

- Do not run exploratory full-tree searches without a scoped path or file list
- Use `data/home-sections.ts`, architecture docs, and task briefs as navigation anchors
- Ignore `_recovered-dev-scaffold/` and other gitignored artifacts

---

## Prohibited actions (all agents)

| Action | Rule |
|--------|------|
| Production deploy | Approval required |
| Edit `/var/www/raeservice/landing/` | Forbidden |
| nginx / Docker / systemd changes | Forbidden |
| Force push to `main` | Forbidden unless explicit |
| New primary brand colors | Forbidden (see `VISUAL_GOVERNANCE.md`) |
| Broad unscoped codebase scan | Avoid; use token-savior + targeted paths |

---

## Escalation

Escalate to human when:

- SSH push fails or remote diverges
- Build fails on Node 20
- Task requires production or infrastructure touch
- Visual change conflicts with locked brand tokens
- KPI or content cannot be verified as accurate

---

## Related documents

| Document | Role |
|----------|------|
| `docs/agent/AGENT_WORKFLOW.md` | Tool and role workflow |
| `docs/architecture/VISUAL_GOVERNANCE.md` | Visual rules |
| `docs/reports/SPRINT2_WEEK1_PLAN.md` | Sprint 2 execution plan |
| `DEPLOYMENT.md` | Deploy rules (reference only) |

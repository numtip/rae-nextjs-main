# Agent Workflow

**Project:** RAE Next.js Main  
**Sprint 2+** · Agency multi-agent execution model

---

## Tool stack

| Layer | Tool | Responsibility |
|-------|------|----------------|
| **Architect** | GPT | Scope, acceptance criteria, architecture decisions, risk review |
| **Builder** | Cursor Composer | Implementation, refactors, local commits within policy |
| **Execution Guard** | RTK | Wraps all terminal commands; enforces command discipline |
| **Cost Control** | Token Savior | Reduces token burn on large reads; targeted file access |
| **Source of Truth** | GitHub (`numtip/rae-nextjs-main`) | Canonical code history after push |
| **Production** | VPS `/var/www/...` | **Approval only** — never default workflow step |

---

## Skill-first rule

1. Supervisor selects skill(s) from `docs/agent/SKILLS_INDEX.md` **before** Builder starts
2. Builder invokes skills in process order (document results in slice report)
3. **No broad repo scan** unless `TOKEN_SAVIOR_WORKFLOW` approves a scoped path list
4. Default stack: Token Savior → domain review → A11y (if UI) → Build → Runtime QA (major sprint / RC / push) → Release Safety

---

## Standard flow

```
┌─────────────┐     brief + constraints      ┌──────────────┐
│ GPT         │ ───────────────────────────► │ Supervisor   │
│ (Architect) │                              │ (scope gate) │
└─────────────┘                              └──────┬───────┘
                                                    │
                    ┌───────────────────────────────┼───────────────────────────────┐
                    ▼                               ▼                               ▼
            ┌──────────────┐               ┌──────────────┐               ┌──────────────┐
            │ Frontend     │               │ Content      │               │ QA           │
            │ (UI/CSS)     │               │ (data/*)     │               │ (verify)     │
            └──────┬───────┘               └──────┬───────┘               └──────┬───────┘
                   │                                │                                │
                   └────────────────┬───────────────┴────────────────────────────────┘
                                    ▼
                          ┌──────────────────┐
                          │ Cursor Composer  │
                          │ rtk + token-savior│
                          │ nvm use 20       │
                          └────────┬─────────┘
                                   ▼
                          ┌──────────────────┐
                          │ lint + build     │
                          │ serve out (QA)   │
                          │ local commit     │
                          └────────┬─────────┘
                                   ▼
                          ┌──────────────────┐
                          │ GitHub push      │  ◄── only when approved + SSH OK + Runtime QA
                          └────────┬─────────┘
                                   ▼
                          ┌──────────────────┐
                          │ Deploy           │  ◄── separate approval; DevOps doc only
                          └──────────────────┘
```

---

## Per-role workflow

### Architect (GPT)

1. Read sprint plan and architecture docs (not full repo)
2. Produce scoped task list with explicit exclusions
3. Define acceptance criteria and output format
4. Do not assume production access or deploy permission

### Builder (Cursor Composer)

1. `rtk pwd` + `rtk git status` — confirm canonical path
2. `rtk token-savior` before multi-file reads
3. `rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && ...'` for Node tasks
4. Implement within `docs/agent/AGENCY_AGENTS_POLICY.md` boundaries
5. `npm run build` after code changes
6. Local commit only unless push is explicitly requested

### Supervisor

1. Validate task against Sprint plan excluded scope
2. Reject broad scans and out-of-path edits
3. Require QA report before push or prototype sign-off

### QA

1. Read-only checks: build, diff stat, governance alignment
2. Write `docs/reports/*.md`
3. Go/no-go for push — not for deploy

### DevOps

1. Document procedures; do not execute deploy in Sprint 2 Week 1
2. Reference `DEPLOYMENT.md` for future staging path

---

## Command checklist (every session)

```bash
rtk pwd
rtk git remote -v
rtk git status
rtk token-savior status || true
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && node -v'
```

Before build:

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
```

Before push recommendation (static export — not `next start`):

```bash
rtk npx serve out -l 3110
```

See `skills/RUNTIME_QA.md`. **Do not use port 3100** (Metabase). `/var/www/raeservice/landing/` must remain untouched unless deploy is approved.

---

## Sprint 2 default mode

| Allowed | Not allowed (Week 1) |
|---------|----------------------|
| Docs under `docs/agent/`, `docs/reports/` | Production deploy |
| Homepage prototype planning | Major UI redesign |
| Targeted component polish | nginx / Docker changes |
| KPI placeholder labeling | GitHub push (unless requested) |
| ESLint config planning | Broad repo refactor |

---

## References

- `docs/agent/SKILLS_INDEX.md`
- `docs/agent/skills/` — reusable execution skills
- `docs/agent/AGENCY_AGENTS_POLICY.md`
- `docs/reports/SPRINT2_WEEK1_PLAN.md`
- `docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md`
- `docs/reports/SPRINT1_RC1_PRE_PUSH_QA.md`

# RAE Next.js — Repository Status

**Generated:** 2026-06-10  
**VPS path:** `/home/rae_admin/rae-nextjs-main`

---

## Repository

| Field | Value |
|-------|-------|
| **URL** | https://github.com/numtip/rae-nextjs-main |
| **Remote** | `origin` → `git@github.com:numtip/rae-nextjs-main.git` |
| **Branch** | `main` |
| **Latest commit** | `036ac79` — *chore: establish RAE Next.js main source of truth* (2026-06-10) |
| **Package** | `rae-nextjs-main@0.1.0` |
| **Stack** | Next.js 16.2.4 · React 19.2.4 · Tailwind CSS 4.2.4 · TypeScript 5.9.3 |

---

## GitHub sync status

| Item | Status |
|------|--------|
| Local git initialized | ✅ Yes |
| `origin` remote configured | ✅ Yes |
| Push to GitHub | ❌ **Blocked** — SSH authentication failure |

**Push error:** `Host key verification failed` (initial) → after host key added: `Permission denied (publickey)`.

**Diagnosis:** No `~/.ssh/` directory or deploy keys on this VPS. GitHub host key is now in `known_hosts`, but no SSH key pair is available for `git@github.com`.

**Required to unblock:** Generate or install an SSH deploy key, add the public key to the GitHub repo (or org), then `git push -u origin main`.

---

## Working tree (local only)

Uncommitted changes present (not pushed):

| Path | State |
|------|-------|
| `next-env.d.ts` | Modified |
| `tsconfig.json` | Modified |
| `_extract-from-maps.mjs` | Untracked |
| `_recovered-dev-scaffold/` | Untracked |

These are recovery artifacts and build-time edits — review before next commit.

---

## Build status

| Check | Result |
|-------|--------|
| Node version | v20.19.5 (via nvm) |
| `npm run build` | ✅ **Pass** (2026-06-10) |
| Static routes | 32 pages (11 types × 2 locales + metadata) |
| Export mode | `output: "export"` → `out/` |
| `out/` file count | ~318 files |

---

## Documentation health

| Document | Status | Notes |
|----------|--------|-------|
| `README.md` | ✅ Present | SoT overview, quick start, governance |
| `ARCHITECTURE.md` | ✅ Present | Stack, routing, VPS roles, nginx reference |
| `DEPLOYMENT.md` | ✅ Present | Staging pipeline, rollback, checklists |
| `PROJECT_STRUCTURE.md` | ✅ Present | Routes, components, data inventory |
| `SOURCE_RECOVERY_AUDIT.md` | ✅ Present | Recovery method, risks, quality score ~90% |
| `VPS_ORGANIZATION_PLAN.md` | ✅ Present | Folder classification, archive plan (not started) |
| `docs/ops/VPS_CLEANUP_CANDIDATES.md` | ✅ Present | Detailed cleanup candidates |
| `docs/ops/REPOSITORY_STATUS.md` | ✅ Present | This file |
| `docs/roadmap/SPRINT1_FOUNDATION_PLAN.md` | ✅ Present | Sprint 1 foundation planning |

---

## Source recovery status

| Dimension | Score | Detail |
|-----------|-------|--------|
| Route coverage | 100% | All production routes build statically |
| Component coverage | 100% | 18/18 components recovered |
| Data coverage | 95% | 20 registries; `content-models.ts` inferred |
| Config coverage | 80% | Core config present; ESLint config missing |
| CSS maintainability | 40% | `globals.css` is compiled Tailwind output (479 lines) |
| **Overall** | **~90%** | Production-equivalent static export confirmed |

**Outstanding recovery items:**

- [ ] Rewrite `globals.css` from Tailwind v4 source (Sprint 1)
- [ ] Validate `content-models.ts` against all registries
- [ ] Add ESLint config + smoke tests
- [ ] Push git history to GitHub (blocked on SSH)
- [ ] Copy `public/health` if ops probes require it

---

## Production status

| Item | Status |
|------|--------|
| Live URL | https://raeservice.mju.ac.th/rae-landing/ |
| Production path | `/var/www/raeservice/landing/` |
| Staging path | `/var/www/raeservice/next-main/` — **not created** |
| Production touched this session | ✅ **No** |
| Nginx modified | ✅ **No** |
| Joomla modified | ✅ **No** |

Production remains served from the existing static export. All development is isolated to `/home/rae_admin/rae-nextjs-main`.

---

## Next roadmap

### Immediate (unblock GitHub)

1. Install SSH deploy key on VPS → add to GitHub repo
2. `git push -u origin main`
3. Commit or gitignore recovery artifacts (`_extract-from-maps.mjs`, `_recovered-dev-scaffold/`)

### Sprint 1 — Foundation (see `docs/roadmap/SPRINT1_FOUNDATION_PLAN.md`)

1. Design token system
2. Tailwind v4 cleanup + `globals.css` rewrite
3. Layout and navigation architecture hardening
4. Homepage and service portal structure
5. Mobile-first + accessibility baseline
6. AI-ready content architecture

### Post-Sprint 1

1. Create staging at `/var/www/raeservice/next-main/` (with approval)
2. ESLint + smoke tests + CI on GitHub
3. Archive phase per `VPS_ORGANIZATION_PLAN.md` (after SoT confirmed on GitHub)

---

## Governance reminders

- No direct production overwrite without approval
- No nginx changes without approval
- Deploy to staging first, diff against live, then approve switch
- Joomla at `/raenew2026/` is frozen legacy

# VPS Organization Plan

**Status:** Planning only — no moves, archives, or deletions executed yet.  
**Date:** 2026-06-10

---

## Target architecture

```
/home/rae_admin/
├── rae-nextjs-main/              ← ACTIVE SoT (Next.js main website)
├── archive/                      ← future home for stale artifacts
├── raenew2026-deploy/            ← frozen Joomla ops
├── docker-raeserver/             ← infrastructure
├── raemju-project/               ← independent app
└── (legacy paths → archive later)

/var/www/raeservice/
├── landing/                      ← LIVE production static export
└── next-main/                    ← FUTURE staging (create after approval)

/opt/raenew2026/                  ← FROZEN Joomla legacy
```

---

## Folder classification

| Path | Size | Current role | Future role | Action |
|------|------|-------------|-------------|--------|
| `/home/rae_admin/rae-nextjs-main` | ~488M | **Active SoT** | Primary dev source | **keep** |
| `/home/rae_admin/rae-nextjs-main-recovered` | 488M | Recovery workspace | Redundant after SoT commit | **archive later** |
| `/home/rae_admin/rae-landing-next` | 731M | Build artifacts only (`.next`, `node_modules`, `out`) | Reference for maps/deps | **archive later** |
| `/home/rae_admin/rae-landing` | 457M | Pre-Next static + nginx config | Legacy reference | **archive later** (retain `nginx/rae-landing.conf` ref) |
| `/home/rae_admin/rae-nextjs-source-audit` | 6.6M | Wrong fork (`open-lovable`) | Not RAE landing | **archive later** |
| `/home/rae_admin/landing-page` | 104K | Tiny backups | Archive | **archive later** |
| `/home/rae_admin/open-design` | 328K | Design experiments | Design reference for Phase 4 | **archive/reference** |
| `/home/rae_admin/raemju-project` | 66M | Metabase/SSO separate app | Independent project | **keep** |
| `/home/rae_admin/docker-raeserver` | 121M | Docker/nginx/mariadb | VPS orchestration | **keep** |
| `/home/rae_admin/raenew2026-deploy` | 121M | Joomla deploy scripts/data | Frozen ops companion | **freeze** |
| `/opt/raenew2026` | 81G | Live Joomla stack | Legacy CMS frozen | **freeze** |
| `/var/www/raeservice/landing` | 3.9M | Live Next.js static export | Current production | **keep** |
| `/var/www/raeservice/next-main` | — | Does not exist yet | Future staging deploy | **create later** |

---

## Archive phase (not started)

When approved, move to `/home/rae_admin/archive/`:

1. `rae-nextjs-main-recovered` (after confirming SoT git commit)
2. `rae-landing-next`
3. `rae-landing` (copy `nginx/rae-landing.conf` into SoT `docs/` first)
4. `rae-nextjs-source-audit`
5. `landing-page`

**Estimated space recovered:** ~1.7 GB (excluding 81G Joomla)

---

## Freeze boundaries

| System | URL | Rule |
|--------|-----|------|
| Next.js main | `/rae-landing/` | Active development in `rae-nextjs-main` |
| Joomla legacy | `/raenew2026/` | No further development; ops-only maintenance |

---

## Related documents

- [docs/ops/VPS_CLEANUP_CANDIDATES.md](./docs/ops/VPS_CLEANUP_CANDIDATES.md) — detailed cleanup candidates with risks
- [DEPLOYMENT.md](./DEPLOYMENT.md) — staging and production deploy procedure
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design

# VPS Cleanup Candidates

**Status:** Dry plan only — no moves, archives, or deletions executed.  
**Generated:** 2026-06-10  
**Approval required before any action.**

---

## Summary

| Category | Paths | Combined size | Proposed action |
|----------|-------|---------------|-----------------|
| Archive after SoT commit | 5 paths | ~1.7 GB | Move to `/home/rae_admin/archive/` |
| Freeze (no cleanup) | 2 paths | ~81 GB | Keep; no development |
| Keep active | 4 paths | ~700 MB | No action |
| Create later | 1 path | — | Create after deploy approval |

---

## Candidates

### 1. `/home/rae_admin/rae-nextjs-main-recovered`

| Field | Value |
|-------|-------|
| **Size** | 488M |
| **Current role** | Source-map recovery workspace (pre-promotion copy) |
| **Proposed action** | Move to `/home/rae_admin/archive/rae-nextjs-main-recovered` |
| **Risk** | Low — identical content promoted to `rae-nextjs-main` |
| **Prerequisite** | SoT git commit verified; confirm no unique files remain |
| **Approval** | Archive phase sign-off |

---

### 2. `/home/rae_admin/rae-landing-next`

| Field | Value |
|-------|-------|
| **Size** | 731M |
| **Current role** | Build artifacts only (`.next/`, `node_modules/`, `out/`) — original source lost |
| **Proposed action** | Move to `/home/rae_admin/archive/rae-landing-next` |
| **Risk** | Medium — `.next/` source maps were used for recovery; keep until archive phase confirms maps not needed |
| **Prerequisite** | Recovery audit signed off; `rae-nextjs-main` builds independently |
| **Approval** | Archive phase sign-off |

---

### 3. `/home/rae_admin/rae-landing`

| Field | Value |
|-------|-------|
| **Size** | 457M |
| **Current role** | Pre-Next.js static site + nginx config reference |
| **Proposed action** | Move to `/home/rae_admin/archive/rae-landing` after copying `nginx/rae-landing.conf` to SoT `docs/ops/` |
| **Risk** | Low-Medium — nginx include may still reference this path on VPS |
| **Prerequisite** | Verify nginx uses `/etc/nginx/...` copy, not live path from this folder |
| **Approval** | Archive phase + nginx config review |

---

### 4. `/home/rae_admin/rae-nextjs-source-audit`

| Field | Value |
|-------|-------|
| **Size** | 6.6M |
| **Current role** | Clone of `numtip/rae-nextjs` (`open-lovable` AI builder — wrong lineage) |
| **Proposed action** | Move to `/home/rae_admin/archive/rae-nextjs-source-audit` |
| **Risk** | Low — unrelated to production landing; governance docs may have reference value |
| **Prerequisite** | Extract any useful governance docs into SoT `docs/` first |
| **Approval** | Archive phase sign-off |

---

### 5. `/home/rae_admin/landing-page`

| Field | Value |
|-------|-------|
| **Size** | 104K |
| **Current role** | Tiny landing backups |
| **Proposed action** | Move to `/home/rae_admin/archive/landing-page` |
| **Risk** | Very low |
| **Prerequisite** | None |
| **Approval** | Archive phase sign-off |

---

### 6. `/home/rae_admin/open-design`

| Field | Value |
|-------|-------|
| **Size** | 328K |
| **Current role** | Design experiments (`rae-homepage/` CSS) |
| **Proposed action** | **Keep as reference** — do not archive until Phase 4 homepage redesign completes |
| **Risk** | Low if kept; may lose design tokens if archived prematurely |
| **Prerequisite** | Homepage redesign phase complete or tokens migrated to SoT |
| **Approval** | Phase 4 completion |

---

## Not cleanup candidates

### `/home/rae_admin/rae-nextjs-main` — **ACTIVE SoT**

| Field | Value |
|-------|-------|
| **Size** | ~488M (includes node_modules) |
| **Action** | **Keep** — primary development source |

### `/home/rae_admin/raemju-project` — **Independent app**

| Field | Value |
|-------|-------|
| **Size** | 66M |
| **Action** | **Keep** — separate Metabase/SSO service |

### `/home/rae_admin/docker-raeserver` — **Infrastructure**

| Field | Value |
|-------|-------|
| **Size** | 121M |
| **Action** | **Keep** — Docker/nginx/mariadb orchestration |

### `/home/rae_admin/raenew2026-deploy` — **Frozen Joomla ops**

| Field | Value |
|-------|-------|
| **Size** | 121M |
| **Action** | **Freeze** — deploy scripts and data for Joomla |

### `/opt/raenew2026` — **Frozen Joomla legacy**

| Field | Value |
|-------|-------|
| **Size** | 81G |
| **Action** | **Freeze** — live Joomla stack; no cleanup |

### `/var/www/raeservice/landing` — **Live production**

| Field | Value |
|-------|-------|
| **Size** | 3.9M |
| **Action** | **Keep** — do not modify without deploy approval |

### `/var/www/raeservice/next-main` — **Future staging**

| Field | Value |
|-------|-------|
| **Size** | Does not exist |
| **Action** | **Create later** after deploy pipeline approval |

---

## Estimated space recovery

| Action | Space |
|--------|-------|
| Archive items 1–5 | ~1.7 GB |
| Joomla freeze (no removal) | 0 (81G retained) |

---

## Approval workflow

```
1. SoT git commit verified          ← current step
2. GitHub repo created (no force)   ← next
3. Staging deploy to next-main      ← after approval
4. Archive phase sign-off           ← after steps 1–3
5. Execute moves to archive/        ← manual, one path at a time
```

**No automated cleanup.** Each path requires explicit approval before any `mv` operation.

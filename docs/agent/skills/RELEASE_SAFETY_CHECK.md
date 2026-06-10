# Skill: Release Safety Check

**Owner:** Supervisor Agent · DevOps Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Confirm changes are safe to commit/push without deploy or production touch. Before push recommendation, static runtime preview must be verified (see `RUNTIME_QA.md`).

## When to use

- Before local commit
- Before GitHub push recommendation
- End of every execution slice

## Required RTK commands

```bash
rtk pwd
rtk git status --short
rtk git diff --name-only
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
```

### Static runtime preview (before push recommendation)

```bash
rtk npx serve out -l 3110
```

Verify `/th/` and `/en/` on port **3110** — not 3100 (Metabase). Do not use `next start` (`output: "export"`).

### Production untouched verification

```bash
rtk bash -lc 'test -d /var/www/raeservice/landing/ && echo PROD_PATH_EXISTS: unchanged'
```

`/var/www/raeservice/landing/` **must remain untouched** unless deploy is explicitly approved.

## Token-saving rules

- `git diff --name-only` only — not full diff unless QA report requires it
- Do not inspect `/var/www/` unless deploy is explicitly in scope (it is not)

## Output format

```
RELEASE_SAFETY: PASS | FAIL
Path: /home/rae_admin/rae-nextjs-main/
Lint: PASS | FAIL
Build: PASS | FAIL
Runtime preview: PASS | FAIL | N/A (doc-only)
Deploy: not performed
Production touched: no
/var/www/raeservice/landing/: untouched
Push: not performed | recommended
Files outside scope: [list or none]
```

## Failure conditions

- Any change under `/var/www/raeservice/landing/` → **FAIL**
- Production deploy or rsync without approval → **FAIL**
- nginx/docker/systemd edit → **FAIL**
- Push performed without explicit approval → **FAIL**
- Deploy performed → **FAIL**
- Lint or build fail at commit time → **FAIL**
- Push recommended without static runtime preview (`serve out`) → **FAIL**
- Runtime preview on port 3100 mistaken for RAE → **FAIL**

# Skill: Release Safety Check

**Owner:** Supervisor Agent · DevOps Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Confirm changes are safe to commit/push without deploy or production touch.

## When to use

- Before local commit
- Before GitHub push recommendation
- End of every execution slice

## Required RTK commands

```bash
rtk pwd
rtk git status --short
rtk git diff --name-only
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
```

## Token-saving rules

- `git diff --name-only` only — not full diff unless QA report requires it
- Do not inspect `/var/www/` unless deploy is explicitly in scope (it is not)

## Output format

```
RELEASE_SAFETY: PASS | FAIL
Path: /home/rae_admin/rae-nextjs-main/
Deploy: not performed
Production touched: no
Push: not performed | recommended
Files outside scope: [list or none]
```

## Failure conditions

- Any change under `/var/www/raeservice/landing/` → **FAIL**
- nginx/docker/systemd edit → **FAIL**
- Push performed without explicit approval → **FAIL**
- Deploy performed → **FAIL**
- Build fail at commit time → **FAIL**

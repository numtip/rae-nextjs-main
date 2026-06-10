# Skill: Build Verification

**Owner:** Frontend Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Confirm Node 20 production build passes after code changes.

## When to use

- After any `components/`, `app/`, or `data/` edit affecting render
- Before local commit
- Before push recommendation (QA)

## Required RTK commands

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && node -v'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
```

## Token-saving rules

- Do not read build output verbatim into reports — capture pass/fail + page count only
- Do not re-run build if no code changed since last pass in same session

## Output format

```
BUILD: PASS | FAIL
Node: v20.x.x
Pages: N static
Errors: [summary or none]
```

## Failure conditions

- System Node 12 used (no nvm) → **FAIL** — rerun with nvm 20
- TypeScript or compile error → **FAIL** — fix before commit
- Build pass claimed without running command → **FAIL**

# Skill: Build Verification

**Owner:** Frontend Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Confirm Node 20 lint and production build pass after code changes. For major sprint / RC / push recommendation, **build pass alone is insufficient** — Runtime QA is mandatory (see `RUNTIME_QA.md`).

## When to use

- After any `components/`, `app/`, or `data/` edit affecting render
- Before local commit
- Before push recommendation (QA)
- **Major sprint / RC gate:** lint + build + Runtime QA (static serve)

## Required RTK commands

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && node -v'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
```

### Runtime QA gate (major sprint / RC / push recommendation)

After build passes, run static export preview — **not** `next start`:

```bash
rtk npx serve out -l 3110
```

Verify `http://127.0.0.1:3110/th/` and `http://127.0.0.1:3110/en/` return HTTP 200. Full procedure: `skills/RUNTIME_QA.md`.

| Warning | Detail |
|---------|--------|
| **Do not use port 3100** | Metabase occupies 3100 on this VPS — not RAE |
| **`next start` unsuitable** | Project uses `output: "export"` — preview `out/` with `serve` |

## Token-saving rules

- Do not read build output verbatim into reports — capture pass/fail + page count only
- Do not re-run build if no code changed since last pass in same session

## Output format

```
BUILD: PASS | FAIL
Lint: PASS | FAIL
Node: v20.x.x
Pages: N static
Runtime QA: PASS | FAIL | SKIPPED (minor doc-only slice)
Errors: [summary or none]
```

## Failure conditions

- System Node 12 used (no nvm) → **FAIL** — rerun with nvm 20
- ESLint error or warning over max → **FAIL** — fix before commit
- TypeScript or compile error → **FAIL** — fix before commit
- Build pass claimed without running command → **FAIL**
- Major sprint / RC / push recommended without Runtime QA → **FAIL**
- Runtime QA used `next start` or port 3100 for RAE verification → **FAIL**

# Skill: Runtime QA

**Owner:** QA Agent · Supervisor Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Verify the static export serves correctly at runtime — beyond lint/build pass. Confirms `/th/` and `/en/` routes return RAE homepage HTML, not another service on the VPS.

## When to use

- Major sprint sign-off or RC gate
- Before push recommendation (with `RELEASE_SAFETY_CHECK`)
- After homepage or routing changes affecting `out/`
- When `BUILD_VERIFICATION` passes but runtime behavior is unverified

**Build pass alone is insufficient** for major sprint / RC / push recommendation.

## Required RTK commands

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
rtk npx serve out -l 3110
```

Then verify routes (separate shell or after serve is up):

```bash
rtk bash -lc 'curl -sI http://127.0.0.1:3110/th/ | head -5'
rtk bash -lc 'curl -sI http://127.0.0.1:3110/en/ | head -5'
```

Production safety (read-only):

```bash
rtk bash -lc 'test -d /var/www/raeservice/landing/ && echo PROD_PATH_EXISTS'
rtk git status --short
```

## Correct static export preview method

This project uses `output: "export"` in `next.config.ts`. Preview the `out/` directory:

```bash
rtk npx serve out -l 3110
```

Use a **free port** (3110 is the project default for runtime QA). Stop the serve process after checks.

## Forbidden methods / ports

| Forbidden | Reason |
|-----------|--------|
| `next start` | Incompatible with `output: "export"` — no Node server bundle |
| Port **3100** | Occupied by **Metabase** on this VPS — returns wrong service |
| Deploy to `/var/www/raeservice/landing/` | Requires explicit human approval |
| nginx / Docker / systemd changes | Out of scope |

## Route checks

| Route | Expected |
|-------|----------|
| `http://127.0.0.1:3110/th/` | HTTP 200 · `text/html` · RAE homepage markers (`hero-title`, `impact-metrics`, section IDs) |
| `http://127.0.0.1:3110/en/` | HTTP 200 · `text/html` · same structural markers in English locale |

**Do not** use `http://127.0.0.1:3100/` for RAE verification.

## Runtime log review

- `serve` should log `Accepting connections` without crash
- HEAD/GET to `/th/` and `/en/` should return 200 in reasonable latency
- No application stack traces from RAE build in serve output
- Document `EADDRINUSE` if port conflict — pick another free port, not 3100

## Production safety check

| Check | Pass criterion |
|-------|----------------|
| `/var/www/raeservice/landing/` | Exists — **not modified** by this session |
| `git status` | No staged/unstaged changes under production paths |
| Deploy | **NOT performed** unless explicitly approved |

## Token-saving rules

- Capture HTTP status + content-type only — do not paste full HTML into reports
- Grep `out/th/index.html` for key markers instead of full page read when build already passed
- Stop serve after QA — do not leave background servers running

## Output format

```
RUNTIME_QA: PASS | FAIL
Lint: PASS | FAIL
Build: PASS | FAIL
Preview: serve out -l <port>
/th: HTTP <code> | service=Rae|Wrong
/en: HTTP <code> | service=Rae|Wrong
Production touched: no | yes
Deploy: not performed
Log findings: [summary]
```

## Failure conditions

- Lint or build fail → **FAIL** — fix before runtime step
- `/th/` or `/en/` non-200 on correct serve port → **FAIL**
- Port 3100 used and Metabase/wrong service detected → **FAIL**
- `next start` used as primary preview method → **FAIL**
- Production path modified → **FAIL**
- Runtime QA skipped for major sprint / RC / push recommendation → **FAIL**

## Related

- `skills/BUILD_VERIFICATION.md` — build gate (includes runtime QA requirement for major releases)
- `skills/RELEASE_SAFETY_CHECK.md` — pre-push gate
- `docs/reports/SPRINT2_WEEK2_RUNTIME_QA.md` — reference run

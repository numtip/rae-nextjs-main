# Sprint 2 Week 2 — Runtime QA

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`  
**Skills:** TOKEN_SAVIOR_WORKFLOW · BUILD_VERIFICATION · A11Y_REVIEW · RELEASE_SAFETY_CHECK

---

## Lint result

**PASS** — `npm run lint` exit 0 (`eslint . --max-warnings 0`)

---

## Build result

**PASS** — Node v20.19.5 · 32 static pages · `out/th/index.html` + `out/en/index.html` present

---

## Local preview result

| Attempt | Result |
|---------|--------|
| `npm run start -p 3100` | **FAIL** — `EADDRINUSE` (port 3100 occupied) |
| `npx serve out -l 3110` | **PASS** — static export served (workaround; project uses `output: "export"`) |

**Note:** `next start` is not compatible with static export; use `serve out` for local runtime QA.

---

## /th status

| Endpoint | HTTP | Notes |
|----------|------|-------|
| `http://127.0.0.1:3100/th/` | 200 | **Wrong service** — Metabase (cookies/headers), not RAE |
| `http://127.0.0.1:3110/th/` | 200 | RAE build — `Content-Length: 72866`, `text/html` |

**Content checks (`out/th/index.html`):** `id="hero-title"`, `research-systems-cta-strip`, section markers present.

---

## /en status

| Endpoint | HTTP | Notes |
|----------|------|-------|
| `http://127.0.0.1:3100/en/` | 200 | **Wrong service** — Metabase |
| `http://127.0.0.1:3110/en/` | 200 | RAE build — `Content-Length: 56028`, `text/html` |

---

## Runtime log findings

```
next start -p 3100 → EADDRINUSE
serve out -l 3110  → Accepting connections; HEAD/GET /th/ /en/ returned 200 in 3–48ms
```

No RAE application errors in serve logs. Preview stopped after QA.

---

## Production untouched check

| Check | Result |
|-------|--------|
| `/var/www/raeservice/landing/` | Exists — not modified by this QA |
| `https://raeservice.mju.ac.th/rae-landing/th/` | HTTP 200 · `last-modified: Thu, 23 Apr 2026` (unchanged Joomla landing) |
| Deploy performed | **NO** |

---

## Bugs found

| ID | Severity | Finding |
|----|----------|-----------|
| ENV-1 | Medium | Port **3100** is Metabase — not usable for RAE preview |
| ENV-2 | Low | `next start` unsuitable for `output: "export"` project |
| APP | — | **None** — served `/th/` and `/en/` render expected homepage HTML |

---

## Go/no-go recommendation

### **GO** (conditional) — round complete for source quality

- Lint + build pass
- Static runtime preview verified on port **3110**
- Production landing untouched

**Caveats:** Use `serve out -l <free-port>` for future runtime QA; avoid port 3100 on this VPS. Browser/visual QA still recommended before any deploy approval.

---

## Sign-off

| Gate | Status |
|------|--------|
| Lint | PASS |
| Build | PASS |
| Runtime (static serve) | PASS |
| Production safety | PASS |
| Deploy | NOT PERFORMED |

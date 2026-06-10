# RAE Next.js — Deployment Guide

## Golden rules

1. **Never overwrite production directly** without explicit approval
2. **Never modify** `/var/www/raeservice/landing/` in place during development
3. **Never edit** `/etc/nginx` or reload nginx without approval
4. **Never stop/restart** containers as part of a deploy
5. Always **dry-build** and **diff** before any production switch

---

## Deployment pipeline

```
Source of Truth                    Staging                      Production
─────────────────────────────────────────────────────────────────────────
/home/rae_admin/rae-nextjs-main    /var/www/raeservice/         /var/www/raeservice/
        │                          next-main/ (future)          landing/ (live)
        │ npm run build                  │                           │
        ▼                                ▼                           ▼
      out/                          staged copy                  nginx alias
```

---

## Step 1 — Dry build (always)

```bash
export PATH="/home/rae_admin/.nvm/versions/node/v20.19.5/bin:$PATH"
cd /home/rae_admin/rae-nextjs-main

npm install          # if dependencies changed
npm run build        # produces out/
```

Verify:

```bash
test -d out && find out -type f | wc -l    # expect ~318 files
grep -q "ประตูบริการดิจิทัล" out/th/index.html && echo CONTENT_OK
```

---

## Step 2 — Deploy to staging (requires approval)

**Target:** `/var/www/raeservice/next-main/` (create directory after approval)

```bash
# DO NOT RUN without approval
# mkdir -p /var/www/raeservice/next-main
# rsync -a --delete /home/rae_admin/rae-nextjs-main/out/ /var/www/raeservice/next-main/
```

Use `rsync --delete` only after confirming staging path is empty or dedicated.

---

## Step 3 — Diff against production

```bash
diff -rq /var/www/raeservice/next-main /var/www/raeservice/landing | head -50
```

Expected differences on every rebuild:

- `_next/static/` chunk hashes (new build IDs)
- `sitemap.xml` `lastmod` timestamps
- RSC `.txt` sidecar files

Content checks (should match):

```bash
wc -c /var/www/raeservice/next-main/th/index.html \
      /var/www/raeservice/landing/th/index.html

cmp /var/www/raeservice/next-main/robots.txt \
    /var/www/raeservice/landing/robots.txt

cmp /var/www/raeservice/next-main/documents/*.pdf \
    /var/www/raeservice/landing/documents/*.pdf
```

---

## Step 4 — Approve production switch (requires approval)

Two safe options:

### Option A — Alias swap (preferred, needs nginx approval)

Point nginx `alias` from `landing/` to `next-main/` (or swap directory names). Requires nginx config change + reload — **not autonomous**.

### Option B — Copy to production (needs write approval)

```bash
# DO NOT RUN without approval
# rsync -a /var/www/raeservice/next-main/ /var/www/raeservice/landing/
```

---

## Rollback concept

Before any production switch:

1. **Snapshot live** — copy current production to a dated backup:

```bash
# DO NOT RUN without approval
# cp -a /var/www/raeservice/landing /home/rae_admin/archive/landing-YYYYMMDD-HHMMSS
```

2. **Keep staging** — do not delete `next-main/` until live is verified

3. **Rollback** — restore backup copy or reverse alias swap:

```bash
# DO NOT RUN without approval
# rsync -a /home/rae_admin/archive/landing-YYYYMMDD-HHMMSS/ /var/www/raeservice/landing/
```

4. **Verify** — curl live URLs, check `/rae-landing/th/` returns 200

---

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://raeservice.mju.ac.th` | Absolute URL origin |
| `NEXT_PUBLIC_SITE_PATH_PREFIX` | `rae-landing` | nginx mount prefix |

Set in `.env.local` for local overrides. Production build uses defaults matching live nginx.

---

## Pre-deploy checklist

- [ ] `npm run build` succeeds on Node 20
- [ ] `out/` file count reasonable (~318)
- [ ] Thai and English homepages render expected content
- [ ] PDF links in `out/documents/` present
- [ ] `sitemap.xml` URLs use `/rae-landing/` prefix
- [ ] Staging deploy completed
- [ ] Diff reviewed and approved
- [ ] Production backup taken
- [ ] Rollback path documented

---

## What NOT to do

| Action | Why |
|--------|-----|
| `rsync` directly to `landing/` | Overwrites live without staging |
| Edit nginx config | Requires coordinated reload |
| Restart containers | Unrelated to static deploy |
| Push to GitHub without review | SoT promotion is local-first |
| Delete old folders | Archive phase is separate |

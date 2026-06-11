# VPS Preview Deploy Report

**Date:** 2026-06-12  
**Slice:** 12 — VPS Preview Deployment  
**Project:** RAE Research Portal  
**Local Workspace:** `F:\projectAi\research-data-lab`

---

## 1. Local Commit

| Field | Value |
|-------|-------|
| Branch | `main` |
| Commit | `43de118` |
| Message | `feat: add research portal preview dashboard` |
| Files | 73 files, 15011 insertions |

## 2. Local QA Summary

| Check | Result |
|-------|--------|
| `pnpm lint` | PASS |
| `pnpm build` | PASS — 12 routes compiled |
| `npx tsx src/__tests__/smoke.ts` | PASS — 173/173 tests |

## 3. Deployment Blocker

**VPS `10.1.245.190` is not reachable from the current network.**  
SSH connection timed out. The code must be deployed manually by someone with VPS & GitHub access.

---

## 4. Manual Deploy Instructions

### Step 1 — Push to GitHub

If you have GitHub push access, set the remote and push:

```bash
git remote set-url origin https://github.com/numtip/rae-nextjs-main.git
git push -u origin main
```

Alternatively, copy the code via SCP/rsync if GitHub push is not available.

### Step 2 — SSH to VPS

```bash
# Use the configured host
ssh rae_admin@10.1.245.190
```

### Step 3 — Prepare Directory

```bash
mkdir -p /home/rae_admin/research-preview
cd /home/rae_admin/research-preview
git clone https://github.com/numtip/rae-nextjs-main.git .
# OR if using rsync from local:
# rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
#   /path/to/research-data-lab/ rae_admin@10.1.245.190:/home/rae_admin/research-preview/
```

### Step 4 — Install Dependencies

```bash
cd /home/rae_admin/research-preview
pnpm install --frozen-lockfile
```

### Step 5 — Place CSV Data

The app reads CSV from one of two paths. Place the data file:

```bash
# Option A: exports/a3.csv (recommended fallback)
mkdir -p exports
cp /path/to/your/a3.csv exports/a3.csv

# Option B: data/research/a3.csv (default path)
mkdir -p data/research
cp /path/to/your/a3.csv data/research/a3.csv
```

### Step 6 — Build

```bash
cd /home/rae_admin/research-preview
pnpm build
npx tsx src/__tests__/smoke.ts
```

Stop if either fails.

### Step 7 — Start PM2 Process

```bash
pm2 start pnpm --name "rae-research-preview" -- start -p 3012
pm2 status
curl -I http://127.0.0.1:3012/research-preview/dashboard
```

Expected: HTTP 200

### Step 8 — Configure Nginx

Backup existing config first:

```bash
sudo cp /etc/nginx/sites-available/raeservice.mju.ac.th \
       /etc/nginx/sites-available/raeservice.mju.ac.th.bak.$(date +%Y%m%d_%H%M%S)
```

Edit the config and add this location block inside the `server` block:

```nginx
location /research-preview/ {
    proxy_pass http://127.0.0.1:3012/research-preview/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 9 — Verify Public URLs

```bash
curl -I https://raeservice.mju.ac.th/research-preview/dashboard
curl -I https://raeservice.mju.ac.th/research-preview/research/projects
curl -I https://raeservice.mju.ac.th/research-preview/research/budget
curl -I https://raeservice.mju.ac.th/research-preview/api/research/stats/overview
curl -I https://raeservice.mju.ac.th/research-preview/api/research/projects?pageSize=1
```

All should return HTTP/2 200.

---

## 5. Rollback Commands

```bash
# Stop and delete PM2 process
pm2 stop rae-research-preview
pm2 delete rae-research-preview

# Restore nginx configuration from backup
# Find the backup file first:
ls -la /etc/nginx/sites-available/raeservice.mju.ac.th.bak.*
# Then restore (use the actual backup filename):
sudo cp /etc/nginx/sites-available/raeservice.mju.ac.th.bak.20260612_* \
       /etc/nginx/sites-available/raeservice.mju.ac.th
sudo nginx -t
sudo systemctl reload nginx

# Optional: remove preview directory
rm -rf /home/rae_admin/research-preview
```

**Rollback time:** < 5 minutes

---

## 6. Risks / Warnings

| Risk | Severity | Mitigation |
|------|----------|------------|
| VPS unreachable from current network | HIGH | Manual deploy required by someone with network access |
| No GitHub push credentials configured | MEDIUM | Alternative: SCP/rsync files directly to VPS |
| CSV data file must be placed manually | MEDIUM | Provided in Step 5 above |
| basePath configured as `/research-preview` | LOW — intentional | All routes will be served under this prefix |
| Existing production routes untouched | N/A | Only the `/research-preview/` location block is added |

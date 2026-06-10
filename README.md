# RAE Next.js Main

Official **Source of Truth** for the RAE (Office of Agricultural Research and Extension, Maejo University) public website.

This is a **Next.js 16** bilingual static site (Thai / English) exported and served under **`/rae-landing/`** on `raeservice.mju.ac.th`.

## Stack

| Item | Value |
|------|-------|
| Framework | Next.js 16.2.4 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Export | `output: "export"` (static HTML) |
| Locales | `th` (default), `en` |
| Public URL prefix | `/rae-landing/` |

## Legacy CMS (frozen)

**Joomla** at `/raenew2026/` (`/opt/raenew2026`) is **legacy reference only**. Do not develop Joomla further. All new website work happens in this repository.

## Requirements

- **Node.js v20** preferred (minimum v18)
- System default Node (v12) will fail — use nvm:

```bash
export PATH="/home/rae_admin/.nvm/versions/node/v20.19.5/bin:$PATH"
node -v   # should show v20.x
```

## Quick start

```bash
cd /home/rae_admin/rae-nextjs-main
export PATH="/home/rae_admin/.nvm/versions/node/v20.19.5/bin:$PATH"

npm install
npm run dev      # local development
npm run build    # produces out/ static export
```

## Project layout

```
app/          Routes, layouts, metadata (robots, sitemap)
components/   UI components
data/         Static bilingual content registries
lib/          Locale, SEO, i18n, site URL helpers
public/       PDFs and static assets
```

## Production paths (VPS)

| Path | Role |
|------|------|
| `/home/rae_admin/rae-nextjs-main` | **This repo** — development source |
| `/var/www/raeservice/landing` | **Live** static export (do not overwrite without approval) |
| `/var/www/raeservice/next-main` | **Future staging** deploy target |
| `/opt/raenew2026` | Frozen Joomla legacy |

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design and folder roles
- [DEPLOYMENT.md](./DEPLOYMENT.md) — safe deploy procedure
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — route and module inventory
- [SOURCE_RECOVERY_AUDIT.md](./SOURCE_RECOVERY_AUDIT.md) — how this source was recovered
- [VPS_ORGANIZATION_PLAN.md](./VPS_ORGANIZATION_PLAN.md) — VPS folder classification

## Governance

- No direct production overwrite without approval
- No nginx changes without approval
- Deploy to `/var/www/raeservice/next-main` first, diff against live, then approve switch

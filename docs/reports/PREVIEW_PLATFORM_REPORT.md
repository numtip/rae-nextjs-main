# Preview Platform Report

## Overview

The GitHub Pages Preview Platform transforms how RAE releases are validated by providing an automated, zero-cost preview environment for every push to `main`. This document captures the architecture, workflow, and operational details.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub                               │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Feature   │───▶│ main branch  │───▶│ pages.yml     │  │
│  │ Branch    │    │ (merge)      │    │ (CI/CD)       │  │
│  └──────────┘    └──────────────┘    └───────┬───────┘  │
│                                              │          │
│  ┌───────────────────────────────────────────▼────────┐  │
│  │              GitHub Actions Workflow                │  │
│  │                                                     │  │
│  │  1. Checkout                                        │  │
│  │  2. Setup Node 20                                    │  │
│  │  3. npm ci                                          │  │
│  │  4. Build (GITHUB_PAGES=true, NEXT_PUBLIC_ENV=preview)│  │
│  │  5. .nojekyll                                       │  │
│  │  6. Configure Pages                                  │  │
│  │  7. Upload Artifact                                  │  │
│  │  8. Deploy to Pages                                  │  │
│  │  9. Runtime QA Check                                 │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                 │
│  ┌──────────────────────▼──────────────────────────────┐  │
│  │         GitHub Pages (Preview)                      │  │
│  │  https://numtip.github.io/rae-nextjs-main/          │  │
│  │                                                     │  │
│  │  • Preview banner (top-right)                       │  │
│  │  • Build metadata in footer                          │  │
│  │  • 81 static pages                                  │  │
│  │  • Bilingual (th/en)                                 │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
               ┌──────────────────┐
               │  Human QA Gate    │
               └────────┬─────────┘
                        │
                        ▼
               ┌──────────────────┐
               │  VPS Production   │
               │  raeservice.mju   │
               │  .ac.th/rae-      │
               │  landing/         │
               └──────────────────┘
```

## Preview URL

**https://numtip.github.io/rae-nextjs-main/**

| Locale | Path | Status |
|--------|------|--------|
| Thai | `/th` | ✅ Live |
| English | `/en` | ✅ Live |

## Deployment Flow

| Step | Action | Time |
|------|--------|------|
| 1 | Push to `main` | Instant |
| 2 | Checkout + setup Node | ~15s |
| 3 | `npm ci` | ~30s |
| 4 | Build (81 pages) | ~20s |
| 5 | Upload artifact | ~5s |
| 6 | Deploy to Pages | ~15s |
| 7 | Runtime QA | ~10s |
| | **Total** | **~95s** |

## Workflow File

`.github/workflows/pages.yml` — the single source of truth for preview deployment.

## Environment Separation

| Aspect | Preview (GitHub Pages) | Production (VPS) |
|--------|----------------------|-------------------|
| URL | `github.io/rae-nextjs-main` | `raeservice.mju.ac.th/rae-landing` |
| basePath | `/rae-nextjs-main` | `/rae-landing` |
| NEXT_PUBLIC_ENV | `preview` | not set (invisible) |
| Preview banner | ✅ Visible | ❌ Hidden |
| Build trigger | Push to `main` | Manual approval |
| Runtime QA | ✅ Auto | Manual |

## Known Limitations

1. **Dynamic API routes** — 8 API routes with `force-dynamic` or `generateStaticParams` are excluded from the static export. These work only when served via `next start` on the VPS.
2. **Researcher/Project detail pages** — 4 dynamic page routes (`[id]`, `[personCode]`) removed from build. Backed up at `_server-only-backup/`.
3. **Runtime QA runs after deploy** — if QA fails, the broken version is briefly live. Mitigation: the workflow is fast (~95s) and the previous version is restored on re-deploy.
4. **Node 20 deprecation** — GitHub Actions warns about Node 20 deprecation. Plan to migrate to Node 22+.

## Recommendations

1. Add a `workflow_dispatch` GitHub Pages deploy action for manual re-deploys
2. Add Lighthouse CI score thresholds to the runtime QA step
3. Migrate dynamic API routes to static data files for full preview parity
4. Add Slack/email notification on workflow failure

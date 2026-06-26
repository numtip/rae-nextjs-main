# Preview Platform Workflow

## Purpose

Define the standard Preview Platform workflow for all RAE releases. GitHub Pages serves as the canonical preview environment, gating every push to `main` before production deployment.

## Architecture

```
Developer
   │
   ├── Feature Branch
   │       │
   │       └── Pull Request → Human Review
   │
   ├── main (merge)
   │       │
   │       ├── GitHub Actions (pages.yml)
   │       │       │
   │       │       ├── Build (GITHUB_PAGES=true, NEXT_PUBLIC_ENV=preview)
   │       │       ├── Runtime QA Check
   │       │       └── Deploy to GitHub Pages
   │       │
   │       ├── Preview: https://numtip.github.io/rae-nextjs-main/
   │       │       │
   │       │       └── Human QA (visual, locale, mobile, accessibility)
   │       │
   │       └── Production Approval Gate
   │               │
   │               └── VPS Deploy
```

## Stages

### 1. Development
- Work on feature branches
- Run `npm run dev` for local development
- Run `npm run lint && npm run build` before committing

### 2. Merge to `main`
- Push triggers `pages.yml` workflow
- Build runs with `output: "export"` + `GITHUB_PAGES=true`
- Preview environemnt variables injected automatically

### 3. GitHub Pages Preview
- **URL:** `https://numtip.github.io/rae-nextjs-main/`
- Preview banner visible in top-right corner
- Build metadata displayed in footer
- Runtime QA check runs automatically during deploy

### 4. Human QA
Before production approval:

- [ ] Homepage (th/en) renders correctly
- [ ] Navigation works on all routes
- [ ] Thai locale (`/th`) verified
- [ ] English locale (`/en`) verified
- [ ] Mobile responsive (no horizontal scroll)
- [ ] Touch targets ≥ 44px
- [ ] No broken assets (CSS, JS, images)
- [ ] Metadata / SEO correct (html lang, canonical, hreflang)
- [ ] Console shows no errors
- [ ] Lighthouse passes basic audit

### 5. Production Approval
- QA report reviewed
- Rollback plan confirmed
- VPS deploy script executed

## Release Checklist

| Step | Action | Owner |
|------|--------|-------|
| 1 | Feature branch merged to `main` | Developer |
| 2 | GitHub Actions workflow completes | CI |
| 3 | Runtime QA passes | CI |
| 4 | Preview URL announced to team | Developer |
| 5 | Visual QA completed | Reviewer |
| 6 | Mobile QA completed | Reviewer |
| 7 | Locale QA completed | Reviewer |
| 8 | Accessibility QA completed | Reviewer |
| 9 | Production approval granted | Lead |
| 10 | VPS deploy executed | DevOps |

## Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `GITHUB_PAGES` | `true` | Enables basePath and assetPrefix |
| `NEXT_PUBLIC_ENV` | `preview` | Shows preview banner in UI |
| `NEXT_PUBLIC_BUILD_SHA` | `${{ github.sha }}` | Commit hash for build metadata |
| `NEXT_PUBLIC_BUILD_DATE` | ISO timestamp | Build timestamp |
| `NEXT_PUBLIC_BUILD_BRANCH` | `${{ github.ref_name }}` | Branch name |

See `pages.yml` for exact injection points.

## Rollback

If a preview deployment has issues:

1. Revert the commit on `main`:
   ```
   git revert HEAD
   git push origin main
   ```
2. The workflow will auto-deploy the previous version.
3. Verify at the preview URL.

## Known Limitations

- Dynamic API routes (`api/research/*`) are not available in static export
- Researcher and project detail dynamic pages are not available in preview
- Runtime QA runs after first deploy; a retrigger may be needed on initial failure

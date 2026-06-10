# RAE Next.js — Architecture

## Stack decision

**Next.js is the main website stack.** All public-facing RAE website development, content updates, and design changes happen in this repository.

**Joomla (`/raenew2026/`) is frozen legacy.** It remains available as a reference CMS but receives no further development.

---

## High-level diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Developer workstation / VPS dev                            │
│  /home/rae_admin/rae-nextjs-main                            │
│  npm run build → out/                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ deploy (approved only)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Staging (future)                                           │
│  /var/www/raeservice/next-main/                             │
│  diff vs live before switch                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ alias switch (approved only)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Production (live today)                                    │
│  /var/www/raeservice/landing/                               │
│  nginx: location /rae-landing/ → alias landing/             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Legacy (frozen)                                            │
│  /opt/raenew2026 → Joomla @ /raenew2026/                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Application architecture

### Rendering model

- **Static export** (`output: "export"` in `next.config.ts`)
- No server runtime in production — nginx serves pre-built HTML/CSS/JS
- **Trailing slashes** enabled (`trailingSlash: true`)

### Routing

```
/                     → client redirect to /th/
/[locale]/            → homepage (th | en)
/[locale]/about/      → about + personnel
/[locale]/contact/    → contact + personnel
/[locale]/academic-services/
/[locale]/research-services/
/[locale]/forms-documents/
/[locale]/green-office/
/[locale]/research-systems/
/[locale]/news-events/
/[locale]/news-events/[slug]/
/[locale]/search/
/robots.txt
/sitemap.xml
```

Public URLs are prefixed by nginx mount: `https://raeservice.mju.ac.th/rae-landing/th/`, etc.

### i18n pattern

- Locale segment: `app/[locale]/`
- Content registries in `data/` with optional `translation_en` blocks
- Localization helpers in `lib/*-i18n.ts`
- No middleware — locale validated in layout/page via `isLocale()`

### Content model

Static TypeScript registries (no database):

| Registry | Content |
|----------|---------|
| `news-registry.ts` | News articles |
| `documents.ts` | Forms & PDF links |
| `academic-services-registry.ts` | Academic services |
| `research-services-registry.ts` | Research services |
| `personnel-registry.ts` | Leadership contacts |
| `pages.ts` | Inner page copy |
| `search-corpus.ts` | Client-side search index |

Types defined in `data/content-models.ts`.

### URL resolution

`lib/site.ts` provides:

- `SITE_ORIGIN` — default `https://raeservice.mju.ac.th`
- `SITE_PATH_PREFIX` — default `rae-landing`
- Override via `NEXT_PUBLIC_SITE_ORIGIN` and `NEXT_PUBLIC_SITE_PATH_PREFIX`

---

## VPS folder roles

| Path | Role | Status |
|------|------|--------|
| `/home/rae_admin/rae-nextjs-main` | **Active SoT** — develop here | keep |
| `/home/rae_admin/rae-nextjs-main-recovered` | Recovery workspace copy | archive later |
| `/home/rae_admin/rae-landing-next` | Build artifacts only (no source) | archive later |
| `/home/rae_admin/rae-landing` | Pre-Next static/nginx reference | archive later (keep nginx conf ref) |
| `/home/rae_admin/rae-nextjs-source-audit` | Wrong fork (open-lovable) | archive later |
| `/home/rae_admin/open-design` | Design experiments | archive/reference |
| `/home/rae_admin/raemju-project` | Separate Metabase/SSO app | keep independent |
| `/home/rae_admin/docker-raeserver` | Docker/nginx/mariadb infra | keep |
| `/home/rae_admin/raenew2026-deploy` | Joomla deploy ops | freeze |
| `/opt/raenew2026` | Joomla runtime + data | freeze legacy |
| `/var/www/raeservice/landing` | **Live** Next.js static export | keep (production) |
| `/var/www/raeservice/next-main` | Future staging deploy | create after approval |

---

## Nginx integration (read-only reference)

From `rae-landing/nginx/rae-landing.conf`:

- `/rae-landing/` → `alias /var/www/raeservice/landing/`
- `/th/`, `/en/` → 301 redirect to `/rae-landing/th/`, `/rae-landing/en/`
- `/_next/` → alias `landing/_next/` with immutable cache headers

**Do not modify nginx without explicit approval.**

---

## Related systems (out of scope)

| System | Path / URL | Relationship |
|--------|-----------|--------------|
| Joomla legacy | `/raenew2026/` | Frozen CMS reference |
| RAEMJU portal | `raemju-project` | Separate service portal |
| Metabase SSO | `raemju-project/metabase-sso-deploy` | Analytics auth |

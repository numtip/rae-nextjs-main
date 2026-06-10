# Sprint 2 Week 2 — Locale Audit

**Date:** 2026-06-10  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Commands run

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run lint'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run build'
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npx serve out -l 3110'
# curl verification on /th/, /en/, /th/green-office/, /en/green-office/
```

---

## Issues found

| ID | Area | Finding |
|----|------|---------|
| L1 | `html lang` | Root `app/layout.tsx` hardcoded `lang="th"`; `HtmlLang` client `useEffect` did not affect static export — `/en/` served `lang="th"` |
| L2 | Page metadata | `green-office`, `research-systems` lacked `generateMetadata` (no canonical, alternates, og:locale, twitter) |
| L3 | News articles | `[slug]` pages used title-only metadata — missing hreflang, canonical, og:locale |
| L4 | Root metadata | Default root title/description were Thai-biased (`ORG_NAME_TH` default) |

## Issues not found (OK)

| Area | Status |
|------|--------|
| `metadataBase` | `https://raeservice.mju.ac.th/rae-landing/` via `getMetadataBase()` |
| `buildPageMetadata` alternates | `canonical`, `languages` (th/en/x-default), `og:locale`, `twitter:card` on pages using helper |
| Sitemap | Both `th/` and `en/` routes listed |
| Robots | `Allow: /rae-landing/` + sitemap reference |

---

## Issues fixed

| ID | Fix |
|----|-----|
| L1 | Passthrough root layout; `html lang={locale}` in `app/[locale]/layout.tsx`; portal redirect under `app/(portal)/` with `lang="th"`; removed client `HtmlLang` |
| L2 | Added `generateMetadata` + `buildPageMetadata` to `green-office` and `research-systems` |
| L3 | News `[slug]` pages now use `buildPageMetadata` with summary + segment path |
| L4 | Root layout retains only `metadataBase` + `robots`; locale-specific title/description in locale layout |

---

## Verification (port 3110)

| Route | HTTP | `html lang` | `og:locale` | Canonical |
|-------|------|-------------|-------------|-----------|
| `/th/` | 200 | `th` | `th_TH` | `/rae-landing/th/` |
| `/en/` | 200 | `en` | `en_US` | `/rae-landing/en/` |
| `/th/green-office/` | 200 | `th` | `th_TH` | `/rae-landing/th/green-office/` |
| `/en/green-office/` | 200 | `en` | `en_US` | `/rae-landing/en/green-office/` |

Hreflang alternates present: `th`, `en`, `x-default` (→ Thai).

---

## Pass / fail

| Gate | Result |
|------|--------|
| Lint | **PASS** |
| Build | **PASS** |
| Runtime QA (3110) | **PASS** |
| Locale audit | **PASS** |

---

## Risks

- Root portal (`/`) still uses `lang="th"` (redirect to Thai — acceptable)
- KPI metrics remain placeholders
- No browser visual regression in this run

---

## Push recommendation

**Conditional GO** — locale metadata fixed in static export; lint/build/runtime pass. Push only when explicitly requested. Deploy requires separate approval.

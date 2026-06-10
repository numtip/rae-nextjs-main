# Skill: A11y Review

**Owner:** QA Agent · Frontend Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Validate heading hierarchy, landmarks, labels, and focus patterns on changed UI.

## When to use

- After heading element changes (`h1`–`h3`)
- After nav, card link, or CTA changes
- After Hero or header structure edits

## Required RTK commands

```bash
rtk token-savior read components/navigation/SiteHeader.tsx components/home/Hero.tsx
rg -n '<h[1-6]' components/home components/navigation components/layout --glob '*.tsx'
```

## Token-saving rules

- Grep headings only in touched component directories
- Do not run full-site a11y audit tools unless scoped in brief

## Output format

```
A11Y_REVIEW: PASS | WARN | FAIL
Homepage h1: [single owner]
Inner page h1: [page content]
Landmarks: header | main | footer | section ids
Link labels: clear | issues [list]
```

## Failure conditions

- Multiple `h1` on same page view → **FAIL**
- Section without `id` matching `home-sections` anchor → **WARN**
- Icon-only control without `aria-label` → **FAIL**
- Removed `skip-to-main` or `main` landmark → **FAIL**

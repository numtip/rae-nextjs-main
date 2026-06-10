# Skill: Homepage Review

**Owner:** Frontend Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Verify homepage changes comply with IA registry, visual system, and scoped file limits.

## When to use

- Before/after homepage section polish (Hero, Quick Links, Services, KPI)
- When editing `components/home/*` or `data/home-sections.ts`

## Required RTK commands

```bash
rtk token-savior read data/home-sections.ts components/home/HomeSectionRenderer.tsx
rtk token-savior read docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md
```

## Token-saving rules

- Review section registry first — do not open all section components if only one changes
- Cross-check footer anchors only if section `id` or anchor changes

## Output format

```
HOMEPAGE_REVIEW: PASS | WARN | FAIL
Sections touched: [ids]
Pattern compliance: [classes/patterns used]
IA registry: unchanged | updated [reason]
```

## Failure conditions

- Section added without `data/home-sections.ts` entry → **FAIL**
- New primary color outside tokens → **FAIL**
- Section order hard-coded outside `HomeSectionRenderer` → **FAIL**
- IA rewrite beyond brief scope → **STOP**

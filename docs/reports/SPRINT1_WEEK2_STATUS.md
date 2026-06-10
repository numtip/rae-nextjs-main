# Sprint 1 Week 2 — Status Report

**Date:** 2026-06-10  
**Project:** RAE Next.js Main (`numtip/rae-nextjs-main`)  
**Phase:** Homepage Visual System foundation

---

## Objective

Establish visual governance and homepage pattern documentation on top of Week 1 layout architecture (tokens, navigation, footer, homepage IA).

---

## Completed

| Task | Status | Artifact |
|------|--------|----------|
| Repo path confirmed | Done | `/home/rae_admin/rae-nextjs-main/` |
| Homepage file audit | Done | See audit table below |
| Homepage visual system doc | Done | `docs/architecture/HOMEPAGE_VISUAL_SYSTEM.md` |
| Visual governance doc | Done | `docs/architecture/VISUAL_GOVERNANCE.md` |
| Brand color lock | Done | `#005C3B`, `#FFDE00`, `#4C4C4C` in `tokens.css` |
| MobileNav drawer close on tap | Done | `NavItem.onNavigate` + `MobileNav.close` |
| Escape close preserved | Done | Existing `keydown` handler unchanged |
| Build verification | Done | `npm run build` |
| Local commit | Done | See commit hash in delivery output |

---

## Homepage audit summary

| File | Role | Week 2 notes |
|------|------|--------------|
| `app/[locale]/(site)/page.tsx` | Thin page; delegates to renderer | No change needed |
| `data/home-sections.ts` | Section registry (7 sections) | Anchors aligned with footer |
| `components/home/HomeSectionRenderer.tsx` | Ordered section map | Single SoT for render order |
| `app/tokens.css` | Design tokens | Added `--neutral-gray` / `--color-neutral-gray` |
| `app/globals.css` | Pattern CSS (hero, cards, grids, footer) | Patterns documented, not refactored |
| `components/layout/SiteShell.tsx` | Skip link + header + main + footer | Shell stable |
| `components/layout/PageContainer.tsx` | Max-width container | Shell stable |
| `components/navigation/SiteHeader.tsx` | Brand + tools + nav hosts | Shell stable |
| `components/navigation/MainNav.tsx` | Desktop nav | Hidden ≤ 48rem |
| `components/navigation/MobileNav.tsx` | Mobile drawer | Fixed: closes on link tap |
| `components/navigation/NavItem.tsx` | Active route link | Added optional `onNavigate` |

Section components (outside `components/home/` but homepage-bound): `Hero`, `QuickLinks`, `ServicesOverview`, `ResearchSystemsCTA`, `NewsHighlights`, `DocumentsCTA`, `GreenOfficeSection`.

---

## Patterns defined

| Pattern | Implementation | Doc section |
|---------|----------------|-------------|
| Hero | Live | §1 |
| Quick access services | Live | §2 |
| Research showcase | Live | §3 |
| News / announcements | Live | §4 |
| KPI / impact | Reserved (not built) | §5 |
| CTA strip | Live | §6 |
| Footer hub | Live | §7 |

Also documented: spacing scale, typography hierarchy, CTA rules, card rules, mobile behavior.

---

## Not in scope (deferred)

- KPI/impact section component implementation
- Visual redesign of section content
- Production deploy or push
- Inner page pattern governance
- Figma / design tool sync

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| KPI pattern documented but not built | Low | Marked reserved in visual system doc |
| `--color-text-muted` (#4A5F56) differs from locked neutral (#4C4C4C) | Low | Both documented; neutral gray for new meta/KPI use |
| Section components live outside `components/home/` | Low | Week 3 may consolidate; renderer already centralizes order |
| Untracked scaffold files in repo root | Low | Not committed; cleanup in separate task |

---

## Next recommendation (Week 3)

1. Implement KPI/impact strip using reserved pattern in `HOMEPAGE_VISUAL_SYSTEM.md`.
2. Consolidate homepage section components under `components/home/`.
3. Add visual regression checklist against governance doc before any redesign pass.
4. Push local commits to `origin/main` when deploy window opens.

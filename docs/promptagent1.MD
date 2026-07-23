TASK: Visual polish stitch-landing-v2 hero + add language switcher to menu.

PROJECT:
G:\ProjectAI\rae-nextjs-main

TARGET PAGE:
http://localhost:3000/stitch-landing-v2
GitHub Pages target:
https://numtip.github.io/rae-nextjs-main/stitch-landing-v2

STRICT RULES:
- All terminal commands MUST start with rtk.
- Do not deploy production.
- Do not change unrelated sections.
- Do not rewrite whole app.
- Do not touch data models unless required for language switcher.
- Keep GitHub Pages basePath compatibility.
- Use existing assetPath() helper for image/static asset paths.
- Make the smallest safe changes.

PART A — HERO VISUAL POLISH

File likely:
components/stitch-landing-v2/HeroSection.tsx

Polish the existing hero only.

1. Overlay refinement
Current overlay is too dark.
Change left green overlay from roughly:
rgba(0,45,28,0.92)
to a softer premium gradient:

linear-gradient(
  90deg,
  rgba(0, 55, 35, 0.82) 0%,
  rgba(0, 55, 35, 0.68) 32%,
  rgba(0, 55, 35, 0.28) 58%,
  rgba(0, 55, 35, 0.00) 100%
)

Add bottom readability gradient:
linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.00) 45%,
  rgba(0, 30, 18, 0.72) 100%
)

2. Hero image position
Set image object position:
desktop: object-position: 65% center
tablet: object-position: 62% center
mobile: object-position: 68% center

Use CSS/className safely.

3. Typography scale
Increase desktop headline size:
mobile: text-4xl or equivalent
tablet: text-5xl
desktop: text-6xl
large desktop: text-7xl

Use tighter but readable line-height:
leading-[1.05] or leading-[1.08]

Keep gold/green gradient highlight on:
สู่นวัตกรรมเกษตร
or English equivalent.

4. Logo size
Increase logo:
mobile: 56px
desktop: 72–84px

Keep object-contain and no distortion.

5. CTA buttons
Primary CTA:
- Gold premium button
- bg gradient from #FFDE00 to warm gold
- text deep green
- subtle shadow/glow
- hover translate-y small
- no aggressive animation

Secondary CTA:
- Glass button
- rgba white background 0.08–0.12
- white border 0.18
- backdrop blur
- hover background 0.16

6. KPI strip
Replace dark black box with premium glass:

background: rgba(255,255,255,0.08)
border: 1px solid rgba(255,255,255,0.15)
backdrop-filter: blur(20px)
box-shadow: 0 24px 80px rgba(0,0,0,0.22)

KPI values:
- gold or warm ivory
- readable on dark overlay

Mobile:
- 2 columns
Desktop:
- 4 columns

7. Spacing
Ensure content block max-width around 680px.
Ensure hero text has enough vertical breathing room.
Hero should not look cramped on 1366px width.

PART B — ADD LANGUAGE SWITCHER TO MENU

Goal:
Add a visible language switcher in the header/menu for stitch-landing-v2.

Requirements:
- Show TH / EN switcher.
- Current Thai page should link to English page.
- Current English page should link back to Thai page.
- Must support GitHub Pages basePath.
- Use existing routing convention in the project.
- Do not hardcode basePath manually if assetPath or route helper exists.
- If locale route already exists, use it.
- If current route supports locale prop, wire switcher to the matching route.

Expected links:
- TH: /stitch-landing-v2
- EN: /en/stitch-landing-v2 OR existing English route discovered in project

IMPORTANT:
Before implementing, inspect:
- app routes for stitch-landing-v2
- locale structure
- header/nav component used by stitch-landing-v2
- existing language switcher implementation elsewhere

Use existing project convention.

Possible files:
components/stitch-landing-v2/Header.tsx
components/stitch-landing-v2/Navigation.tsx
components/stitch-landing-v2/LandingHeader.tsx
app/stitch-landing-v2/page.tsx
app/en/stitch-landing-v2/page.tsx
content/stitch-landing.ts

Implementation behavior:
- Add compact pill button at right side of menu.
- On Thai page: show "EN" as target.
- On English page: show "TH" as target.
- Desktop: place beside nav/CTA.
- Mobile: place inside mobile menu or visible top-right.
- Style: glass / institutional, not loud.
- aria-label:
  Thai page: "Switch to English"
  English page: "เปลี่ยนเป็นภาษาไทย"

PART C — VALIDATION

Run:
rtk git status -sb
rtk npm run lint
rtk npm run build

Runtime QA:
rtk npm run dev

Open:
http://localhost:3000/stitch-landing-v2

Also check English route discovered by project, for example:
http://localhost:3000/en/stitch-landing-v2

Verify:
- Hero image still loads
- Overlay not too dark
- headline readable
- KPI glass readable
- CTA buttons look premium
- language switcher appears in desktop menu
- language switcher appears or works on mobile
- TH -> EN link works
- EN -> TH link works
- no console errors
- no broken image paths
- no unrelated sections changed

REPORT BACK:
1. Changed files
2. Exact English route used
3. Language switcher behavior
4. Lint result
5. Build result
6. Runtime QA result
7. Whether ready to commit
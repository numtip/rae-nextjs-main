# RAE Motion Language Bible

**RC4.3 Creative Governance Foundation** · Motion personality and governance for RAE Next.js  
**Status:** Approved for RC4.3  
**Authority:** This document governs all motion decisions for the RAE website. No motion asset may ship without compliance.

---

## Motion Personality

RAE is Maejo University's research, agriculture, and service engine. Motion must reflect:

- **Calm** — never frantic, never attention-seeking
- **Premium** — institutional confidence, not marketing hype
- **Institutional** — research-forward, trustworthy, academic
- **Agriculture Innovation** — organic, grounded, forward-looking
- **Thai Heritage** — respectful, warm, never orientalist

### One-Sentence North Star

*Motion should feel like natural light moving across a research greenhouse — present, beautiful, never distracting.*

---

## Allowed Motion

| Category | Technique | Context |
|----------|-----------|---------|
| **Glow** | Soft radial glow pulse on hero background | Hero section · `< 15% opacity shift` |
| **Parallax** | Slow background parallax on scroll | Hero, section dividers · `≤ 0.3px per scroll px` |
| **Blur Reveal** | Gaussian blur → sharp on section enter | Section entrances · Intersection Observer trigger |
| **Light Sweep** | Subtle horizontal light sweep on cards | KPI cards, service cards · `≤ 10% brightness shift` |
| **Card Hover Lift** | `translateY(-4px)` + soft shadow | Interactive cards · CTA zones |
| **Fade In** | `opacity 0 → 1` on scroll entry | All below-fold sections |
| **Accordion Expand** | `max-height` transition on FAQ/expand | Collapsible content blocks |
| **Number Count-Up** | KPI value animation on scroll | Impact metrics strip · once-only |

### Timing Table

| Motion Type | Duration | Easing |
|-------------|----------|--------|
| Hover response | 150–300ms | `ease-out` |
| Section reveal | 600–1200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Page/section transition | 400–800ms | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Video/motion asset loop | 5–8s total | Seamless, imperceptible loop point |
| Carousel auto-advance | 4000–6000ms pause | `ease-in-out` slide |

---

## Forbidden Motion

| Technique | Reason |
|-----------|--------|
| **Fast zoom** (scale > 1.05 in < 300ms) | Motion sickness, cheap marketing feel |
| **Bounce / spring overshoot** | Gaming / toy aesthetic |
| **RGB / neon glow** | Gaming aesthetic, distorts brand colors |
| **Particle storms / confetti** | Flashy, inappropriate for research institution |
| **Text-heavy video animation** | ILS violation — text belongs in HTML |
| **Auto-playing audio** | Accessibility violation, terrible UX |
| **Infinite spin / pulse loops** | Distracting, reduces readability |
| **Scroll-jacking** | Removes user control |
| **Strobe / rapid blink** | Seizure risk, accessibility FAIL |
| **TikTok-style fast cuts** | Wrong audience, wrong brand |
| **3D transforms without fallback** | Performance risk on low-end devices |

---

## Accessibility Requirements

| Rule | Implementation |
|------|----------------|
| `prefers-reduced-motion` | All motion MUST be disabled or reduced to instant transitions when `prefers-reduced-motion: reduce` |
| No essential info in motion only | All content readable without animation |
| WCAG 2.2 SC 2.3.1 | No flashes above 3 per second |
| Keyboard | Motion triggers must not interfere with focus order |
| Screen reader | Animated content must have accessible text alternatives |

### CSS Implementation Pattern

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Section-Specific Motion Map

| Section | Primary Motion | Secondary Motion | Prohibited |
|---------|---------------|------------------|------------|
| Hero | Soft glow + slow parallax | Fade-in CTA | Fast zoom, text animation |
| Quick Links | Card hover lift | — | Bounce |
| Services | Card hover lift + blur reveal | Light sweep (subtle) | RGB glow |
| KPI Impact | Count-up numbers | Fade-in row | Bounce, particle |
| Research CTA | Light sweep on strip | — | Fast zoom |
| Documents CTA | Card hover lift | — | Any video motion |
| News | Card hover lift | — | Carousel auto-advance without pause control |
| Green Office | Blur reveal | Fade-in | Any motion on static info |
| Footer | None | — | All motion |

---

## Video/Motion Asset Rules (Future RC4.4+)

When motion video assets are integrated:

- **Duration:** 5–8 seconds, seamless loop
- **No baked text** — text is rendered in HTML overlay
- **No audio track**
- **No visible watermark or branding baked into video**
- **Web-safe** codecs: WebM (VP9) primary, MP4 (H.264) fallback
- **Poster frame** required for every `<video>` element
- **`loading="lazy"`** on below-fold video
- **`autoplay muted loop playsinline`** attributes required

---

## Motion Review Checklist

Before any motion asset is approved:

- [ ] Respects `prefers-reduced-motion`
- [ ] No essential content in motion only
- [ ] Timing within allowed ranges
- [ ] No forbidden techniques
- [ ] Brand colors respected (no neon, no unapproved hues)
- [ ] Mobile performance acceptable (no jank on mid-range device)
- [ ] Lighthouse score impact ≤ 2 points
- [ ] Loop seam imperceptible (if video)
- [ ] Poster frame present (if video)

---

## Related Documents

- [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md) — Image/video aesthetic rules
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — File workflow and naming
- [MOTION_QA_CHECKLIST.md](./MOTION_QA_CHECKLIST.md) — QA gates for motion assets
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI video generation constraints
- [../architecture/VISUAL_GOVERNANCE.md](../architecture/VISUAL_GOVERNANCE.md) — Visual system governance
- [../architecture/DESIGN_SYSTEM.md](../architecture/DESIGN_SYSTEM.md) — Design tokens and typography

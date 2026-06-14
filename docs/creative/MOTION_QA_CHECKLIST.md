# RAE Motion QA Checklist

**RC4.3 Creative Governance Foundation** · Mandatory QA gates for all motion and video assets  
**Status:** Approved for RC4.3  
**Authority:** No motion asset may be integrated into the RAE website without passing every applicable gate.

---

## QA Gate Summary

| Gate | Applies To | Critical |
|------|-----------|----------|
| 1. File Size | All assets | Yes |
| 2. Frame Rate (FPS) | Video/motion assets | Yes |
| 3. Mobile Performance | All assets | Yes |
| 4. Loop Seam | Looping video | Yes |
| 5. Visual Distraction | All animated elements | Yes |
| 6. Lighthouse Impact | Page-integrated assets | Yes |
| 7. Accessibility | All motion | Yes |
| 8. Brand Consistency | All assets | Yes |
| 9. Poster Frame | Video assets | Yes |
| 10. Codec Compatibility | Video assets | Yes |

---

## Gate 1: File Size

| Asset Type | Max Size (WebM VP9) | Max Size (MP4 H.264 fallback) |
|------------|---------------------|-------------------------------|
| Hero background loop | 800 KB | 1.2 MB |
| Section motion background | 500 KB | 750 KB |
| Card hover animation | 200 KB | 300 KB |
| Still image (hero) | 300 KB | — |
| Still image (card) | 150 KB | — |
| Poster frame | 80 KB | — |

### Validation

```bash
ls -lh public/assets/motion/
```

- [ ] WebM file size ≤ limit
- [ ] MP4 fallback file size ≤ limit
- [ ] No asset over 2 MB in repo under any circumstance

---

## Gate 2: Frame Rate (FPS)

| Context | Required FPS |
|---------|-------------|
| Hero loop | 24 or 30 fps |
| Section background | 24 fps |
| All motion assets | ≤ 30 fps |

- [ ] FPS is 24 or 30 (hero), 24 (section background)
- [ ] No 60 fps assets (unnecessary bandwidth)
- [ ] Consistent FPS within same asset

### Validation

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 <file>
```

---

## Gate 3: Mobile Performance

- [ ] Asset does not cause layout shift on load (CLS ≤ 0.1)
- [ ] Asset dimensions specified (`width` and `height` attributes)
- [ ] `loading="lazy"` on below-fold assets
- [ ] No jank or frame drops on mid-range mobile (Moto G4 or equivalent)
- [ ] Asset scales correctly at 375px and 414px viewport widths
- [ ] No horizontal overflow caused by asset

---

## Gate 4: Loop Seam

For looping video assets:

- [ ] Start and end frames are visually identical
- [ ] No visible jump, flash, or color shift at loop point
- [ ] No audio pop or click (audio track must be empty anyway)
- [ ] Loop tested for 3+ consecutive cycles without visible artifact

---

## Gate 5: Visual Distraction

- [ ] Motion does not compete with text readability
- [ ] Animation does not draw eye away from primary CTA
- [ ] Motion stops or reduces when user is interacting with other elements
- [ ] No rapid color changes (> 2 distinct color states in < 1 second)
- [ ] Motion style matches [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) allowed techniques
- [ ] No forbidden motion techniques present

---

## Gate 6: Lighthouse Impact

Run Lighthouse audit with and without the new asset:

- [ ] Performance score drop ≤ 2 points
- [ ] LCP (Largest Contentful Paint) increase ≤ 200ms
- [ ] CLS (Cumulative Layout Shift) remains ≤ 0.1
- [ ] TBT (Total Blocking Time) increase ≤ 50ms

### Validation

```bash
npx lighthouse http://127.0.0.1:3110/th/ --preset=desktop --output=html --output-path=./lighthouse-before.html
# Add asset, rebuild, re-serve
npx lighthouse http://127.0.0.1:3110/th/ --preset=desktop --output=html --output-path=./lighthouse-after.html
```

---

## Gate 7: Accessibility

- [ ] `prefers-reduced-motion` respected — all motion disabled or instant
- [ ] No essential content conveyed through motion only
- [ ] No flashes above 3 per second (WCAG 2.3.1)
- [ ] Autoplaying video has `muted` attribute
- [ ] Video does not auto-play with audio (audio track must be empty)
- [ ] Accessible text alternative available for any animated content
- [ ] Focus order undisturbed by motion triggers

---

## Gate 8: Brand Consistency

- [ ] Colors used match approved brand palette:
  - Primary Green `#005C3B`
  - Secondary Gold `#FFDE00`
  - White `#FFFFFF`
  - Gray `#4C4C4C`
- [ ] No unapproved colors visible in asset
- [ ] No neon, RGB, or gaming-style effects
- [ ] Brand logo not distorted or recolored
- [ ] Asset tone matches premium institutional direction

---

## Gate 9: Poster Frame

For `<video>` elements:

- [ ] Poster frame file exists and is loaded
- [ ] Poster frame is same 16:9 ratio as video
- [ ] Poster frame is representative of video content
- [ ] Poster frame passes still-image QA (file size, brand, quality)
- [ ] No text baked into poster frame

---

## Gate 10: Codec Compatibility

- [ ] WebM (VP9) primary source provided
- [ ] MP4 (H.264) fallback provided
- [ ] Both formats play correctly in Chrome, Firefox, Safari, Edge

```html
<video autoplay muted loop playsinline poster="/assets/posters/rae-hero-poster.jpg">
  <source src="/assets/motion/rae-hero-bg.webm" type="video/webm">
  <source src="/assets/motion/rae-hero-bg.mp4" type="video/mp4">
</video>
```

---

## QA Sign-Off

All gates must pass before an asset status changes from `review` → `approved`.

| Asset | Reviewer | Date | Gates Passed | Notes |
|-------|----------|------|-------------|-------|
| — | — | — | — | — |

---

## Related Documents

- [MOTION_LANGUAGE_BIBLE.md](./MOTION_LANGUAGE_BIBLE.md) — Motion personality and allowed/forbidden techniques
- [IMAGE_LANGUAGE_SYSTEM.md](./IMAGE_LANGUAGE_SYSTEM.md) — Image aesthetic rules
- [ASSET_GOVERNANCE.md](./ASSET_GOVERNANCE.md) — File workflow and naming
- [FAL_AI_GENERATION_RULES.md](./FAL_AI_GENERATION_RULES.md) — AI video generation constraints
- [../agent/skills/A11Y_REVIEW.md](../agent/skills/A11Y_REVIEW.md) — Accessibility review skill

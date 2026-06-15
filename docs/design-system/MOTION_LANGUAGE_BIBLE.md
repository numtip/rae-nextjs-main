# Motion Language Bible — RAE MJU (RC5.5)

**Scope**: Landing page motion, micro-interactions, Canva animated exports, and Next.js Framer Motion implementation reference.

**Philosophy**: Motion communicates **confidence and calm** — institutional premium, not consumer app playfulness.

**Reference tone**: Vercel/Linear subtle reveals; Stripe purposeful feedback; avoid gaming or social-app patterns.

---

## Allowed motion

| Pattern | Description | Typical use |
|---------|-------------|-------------|
| **Fade** | Opacity 0 → 1 | Section enter, text reveal |
| **Blur reveal** | `filter: blur(8px→0)` + opacity | Hero headline, KPI numbers |
| **Ambient motion** | Slow loop, ≤3% scale or parallax drift | Hero background, decorative grain |
| **Subtle parallax** | 5–15px scroll-linked shift | Hero image depth only |
| **Soft hover lift** | `translateY(-2px)` + shadow increase | Cards, service tiles |

All motion must respect `prefers-reduced-motion` (see DESIGN_GOVERNANCE.md).

---

## Forbidden motion

| Pattern | Why forbidden |
|---------|---------------|
| **Bounce** | Reads playful / consumer — off-brand |
| **Spin** | Loading gimmicks, icon rotations >90° without purpose |
| **RGB effects** | Gaming aesthetic |
| **Gaming-style animation** | Particles, confetti, streak effects |
| **Excessive zoom** | Scale >1.05 on scroll or hover |
| **Carousel autoplay slide** | Legacy WTMS pattern — use static hero or user-controlled fade |
| **Rubber-band overscroll effects** | Distracting on institutional sites |

---

## Timing tokens

| Category | Duration | Easing |
|----------|----------|--------|
| **Hover** | 150–300ms | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) |
| **Reveal** | 600–1200ms | ease-out; stagger children 80–120ms |
| **Interaction** | 200–400ms | ease-out for press; 300ms default |
| **Ambient loop** | 8–20s | linear; imperceptible loop point |

CSS variables (defined in BRAND_SYSTEM.md):

```css
--duration-hover: 200ms;
--duration-reveal: 800ms;
--duration-interaction: 300ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Stagger and viewport rules

| Rule | Value |
|------|-------|
| Max staggered children | 6 per section |
| Viewport trigger | `once: true` for reveals (no re-animate on every scroll pass) |
| Hero sequence total | ≤1500ms |
| KPI count-up | 800–1200ms once visible |

---

## Framer Motion examples (reference implementations)

These are **documentation references** for the Next.js app team — not production files in this repo.

### 1. Fade reveal (section default)

```tsx
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeIn}
    >
      {children}
    </motion.section>
  );
}
```

### 2. Blur reveal (hero headline)

```tsx
const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

<motion.h1 variants={blurReveal} initial="hidden" animate="visible">
  สำนักวิจัยและส่งเสริมวิชาการการเกษตร
</motion.h1>
```

### 3. Staggered card grid (services / research)

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map((card) => (
    <motion.li key={card.id} variants={item}>
      {card.content}
    </motion.li>
  ))}
</motion.ul>
```

### 4. Soft hover lift (card)

```tsx
<motion.a
  whileHover={{ y: -2, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.99, transition: { duration: 0.15 } }}
  className="card-raised"
>
  {children}
</motion.a>
```

### 5. Ambient hero background (subtle)

```tsx
<motion.div
  aria-hidden
  animate={{ scale: [1, 1.02, 1] }}
  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
  className="hero-bg"
/>
```

### 6. Reduced motion fallback

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
/>
```

---

## Motion by landing section

| Section | Allowed | Forbidden |
|---------|---------|-----------|
| Hero | Blur reveal headline, ambient bg, fade CTA | Autoplay carousel slide, bounce CTA |
| KPI | Count-up fade, stagger metrics | Spinning icons |
| Services | Stagger cards, hover lift | Flip cards |
| Research Showcase | Horizontal scroll snap (user-driven), fade | Auto-spin carousel |
| News | Fade list | Marquee ticker |
| Impact Story | Scroll-linked fade (not parallax zoom) | Ken Burns extreme zoom |
| Dashboard Preview | Fade panel, subtle tab crossfade | RGB chart animations |
| Footer | None or 200ms fade-in once | Any decorative loop |

Detail: `docs/design-system/LANDING_EXPERIENCE_GUIDE.md`

---

## Canva animated exports

- Max duration: 3s loops for social; **avoid** animated hero on web unless ≤1.5s fade loop
- Export as WebM/MP4 only when motion adds clarity — prefer static WebP/AVIF on landing
- Must pass Motion QA checklist in DESIGN_GOVERNANCE.md

---

## fal.ai motion

- Image generation: **static first** — motion is post-process in Next.js, not in fal output
- If using fal video tools: field/research context only; no synthetic corporate actors
- All fal outputs require Visual Language Bible approval before motion is applied

---

## Related documents

- `docs/design-system/BRAND_SYSTEM.md` — duration CSS variables
- `docs/design-system/LANDING_EXPERIENCE_GUIDE.md` — section motion strategy
- `docs/design-system/DESIGN_GOVERNANCE.md` — Motion QA checklist

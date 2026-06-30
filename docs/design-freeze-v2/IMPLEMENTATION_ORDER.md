# Implementation Order — Stitch Landing V2

**Date:** 2026-06-29
**Status:** ⚠️ Planning only — no production code changes
**Order:** Prioritized by risk (high-risk first, low-risk last)

---

## Implementation Sequence

```
Phase 0 ── Foundation (Day 1)          🏗️
Phase 1 ── Header (Day 1-2)            🎯 Highest visibility 
Phase 2 ── Hero (Day 2)                🎯 Highest visibility
Phase 3 ── Statistics (Day 2-3)        ⚠️ Contains hardcoded data
Phase 4 ── Service Cards (Day 3)       🔄 Reusable pattern
Phase 5 ── Content/Research (Day 3-4)  🔄 Medium complexity
Phase 6 ── News (Day 4)                🔄 Medium complexity
Phase 7 ── Knowledge Resources (Day 4) 🔄 Reusable pattern
Phase 8 ── Partners (Day 4-5)          ✅ Low complexity
Phase 9 ── Footer (Day 5)              🔄 Adapt from V6
Phase 10 ─ Polish (Day 5)              🧹 Motion, a11y, responsive
```

---

## Phase 0: Foundation

**Risk:** ⚠️ Medium (affects everything downstream)
**Effort:** ~2 hours
**File:** `app/stitch-landing-v2/`

### Tasks
| # | Task | Details | Dependencies |
|---|---|---|---|
| 0.1 | Create route directory | `app/stitch-landing-v2/` | None |
| 0.2 | Create layout with Sarabun font | `layout.tsx` — Sarabun via `next/font/google` | None |
| 0.3 | Create brand token CSS | `stitch-landing.css` — `@theme` with Stitch brand tokens | None |
| 0.4 | Create page entry | `page.tsx` — imports `StitchLandingRenderer` | 0.1 |
| 0.5 | Create data file | `content/stitch-landing.ts` — TH content from `code.html` | None |
| 0.6 | Create SVG icon components | `components/stitch-landing-v2/icons/*.tsx` | None |
| 0.7 | Verify build | `rtk npm run build` | 0.1–0.6 |

### Deliverables
- ✅ Route serves `http://localhost:3110/stitch-landing-v2` with Sarabun font
- ✅ All brand tokens registered
- ✅ SVG icons render correctly

---

## Phase 1: Header (TopBar + SiteHeader)

**Risk:** 🟢 Low (isolated component)
**Effort:** ~2 hours
**Files:** `TopBar.tsx`, `SiteHeader.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 1.1 | Create TopBar component | Staff login link + language switch |
| 1.2 | Create SiteHeader component | Logo, nav links, search, hamburger button |
| 1.3 | Wire data from content file | Read nav links, search placeholder, logo config |
| 1.4 | Implement sticky behavior | `sticky top-0 z-50` |
| 1.5 | Verify rendering | Desktop nav visible, mobile shows hamburger |

### Props to finalize
```typescript
TopBarProps
├── loginLabel: string
├── loginHref: string
├── altLocale: "th" | "en"
├── altLocaleLabel: string
└── altLocaleHref: string

SiteHeaderProps
├── logo: { src, alt }
├── siteName: string
├── siteSubtitle: string
├── navLinks: NavLink[]
└── searchPlaceholder: string
```

---

## Phase 2: Hero

**Risk:** 🟡 Medium (fixed height + gradient overlay + responsive text)
**Effort:** ~2 hours
**File:** `HeroSection.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 2.1 | Create HeroSection component | Background image, gradient, content |
| 2.2 | Implement background with overlay | `absolute inset-0` + gradient |
| 2.3 | Add responsive headline | Sarabun, `text-4xl md:text-5xl lg:text-6xl` |
| 2.4 | Add CTAs | Two buttons: brand-primary, brand-gold |
| 2.5 | Verify hero text wrapping | Thai text at all breakpoints |
| 2.6 | Replace external images | Use local RAE assets (like V6 pattern) |

### Key concerns
- **Fixed 600px height** at desktop: use `min-h-[600px]` to prevent overflow on mobile
- **Golden accent span**: The headline has `<span class="text-brand-gold">` — this needs to be parsed from the content string or split into two content fields
- **Thai headline length**: `สร้างองค์ความรู้ สู่นวัตกรรมเกษตร เพื่อชุมชน และสังคมที่ยั่งยืน` — needs proper line breaking at mobile

---

## Phase 3: Service Cards

**Risk:** 🟢 Low (pure presentational, no data)
**Effort:** ~1.5 hours
**Files:** `ServiceCards.tsx`, `ServiceCard.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 3.1 | Create ServiceCard component | Icon circle, title, description, hover effect |
| 3.2 | Implement `card-hover` utility | translateY(-5px) + shadow on hover |
| 3.3 | Create ServiceCards container | Section header + 5-column grid |
| 3.4 | Wire 5 service items from content | Analysis, Training, Consulting, Facilities, Certification |
| 3.5 | Verify responsive grid | 1-col mobile → 2-col tablet → 5-col desktop |

### Card data (from Stitch HTML)
| # | Title (TH) | Icon |
|---|---|---|
| 1 | บริการตรวจวิเคราะห์ | Flask/beaker SVG |
| 2 | บริการอบรมและถ่ายทอด | Book SVG |
| 3 | ให้คำปรึกษาและแนะนำ | Chat SVG |
| 4 | บริการพื้นที่และเครื่องมือ | Globe SVG |
| 5 | บริการรับรองมาตรฐาน | Badge/shield SVG |

---

## Phase 4: Statistics

**Risk:** 🟡 Medium (hardcoded real numbers — data integrity concern)
**Effort:** ~1.5 hours
**Files:** `StatisticsSection.tsx`, `StatItem.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 4.1 | Create StatItem component | Icon + number + label + unit |
| 4.2 | Create StatisticsSection container | Header column + 4-column stat grid |
| 4.3 | Add optional count-up animation | Intersection Observer + animated counter |
| 4.4 | Mark all values as `pending-verification` | Add comment/flag in content file |
| 4.5 | Verify responsive layout | 2-col mobile → 4-col desktop |

### Statistical data (from Stitch HTML)
| Stat | Value | Unit | Source Status |
|---|---|---|---|
| งานวิจัยที่ดำเนินการ | 586 | โครงการ | ⚠️ Hardcoded — needs source verification |
| ผลงานตีพิมพ์ | 1,248 | เรื่อง | ⚠️ Hardcoded — needs source verification |
| นักวิจัยและบุคลากร | 124 | คน | ⚠️ Hardcoded — needs source verification |
| ชุมชนที่ได้รับประโยชน์ | 8,732 | คน | ⚠️ Hardcoded — needs source verification |

**Important:** These numbers appear to be real institutional data (not placeholders). They must be verified with the RAE team before production. Consider adding a `source: "pending-verification"` flag to the content model.

---

## Phase 5: Content — Research List

**Risk:** 🟡 Medium (complex layout: featured image + 3 thumbnails)
**Effort:** ~2 hours
**Files:** `ContentSection.tsx`, `ResearchList.tsx`, `ResearchListItem.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 5.1 | Create ResearchListItem component | Thumbnail image + tag + title + researcher name |
| 5.2 | Create ResearchList container | Featured image (large) + 3 small items |
| 5.3 | Implement grid layout | `md:row-span-3` for featured image |
| 5.4 | Create ContentSection wrapper | Two-column layout: left (research) + right (news) |
| 5.5 | Wire data from content | 3 research items with categories |

### Research items (from Stitch HTML)
| Item | Category | Title | Researcher |
|---|---|---|---|
| Featured | — | (large image of robotic arm in greenhouse) | — |
| 1 | นวัตกรรม | ระบบปลูกพืชอัจฉริยะในโรงเรือนควบคุมอัตโนมัติ | รศ.ดร.สมชาย โชติ และคณะ |
| 2 | พืชและเทคโนโลยีการผลิต | การพัฒนาพันธุ์ข้าวหอมคุณภาพทนแล้ง | ผศ.ดร.นฤมล พรมจง และคณะ |
| 3 | สัตว์และเทคโนโลยีชีวภาพ | โปรไบโอติกจากจุลินทรีย์ท้องถิ่นเพื่อสุขภาพสัตว์ | ดร.วราภรณ์ ชัยเชษฐ์ และคณะ |

---

## Phase 6: Content — News List

**Risk:** 🟢 Low (similar pattern to research list)
**Effort:** ~1.5 hours
**Files:** `NewsList.tsx`, `NewsItem.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 6.1 | Create NewsItem component | Thumbnail + title + date (small) or image + title + date (featured) |
| 6.2 | Create NewsList container | Featured news (horizontal layout) + 3 small items |
| 6.3 | Wire data from content | 4 news items with dates |

### News items (from Stitch HTML)
| Item | Title | Date |
|---|---|---|
| Featured | พิธีลงนามบันทึกข้อตกลงความร่วมมือด้านวิจัยและนวัตกรรม... | 20 พฤษภาคม 2567 |
| 1 | อบรมเชิงปฏิบัติการ "เทคโนโลยีการผลิตพืชปลอดภัย" ... | 15 พฤษภาคม 2567 |
| 2 | ประชุมวิชาการระดับชาติ มหาวิทยาลัยแม่โจ้ ครั้งที่ 10 | 10 พฤษภาคม 2567 |
| 3 | ลงพื้นที่ติดตามผลการดำเนินงานโครงการยกระดับคุณภาพชีวิตชุมชน | 5 พฤษภาคม 2567 |

---

## Phase 7: Knowledge Resources

**Risk:** 🟢 Low (reusable card pattern, similar to Service Cards)
**Effort:** ~1 hour
**Files:** `KnowledgeResources.tsx`, `KnowledgeResourceCard.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 7.1 | Create KnowledgeResourceCard component | Icon + title + description, hover effect |
| 7.2 | Create KnowledgeResources container | Section header + 5-column grid |
| 7.3 | Wire 5 resource items from content | Research DB, Publications, Knowledge Base, Journals, Media |

### Resource items (from Stitch HTML)
| # | Title | Description |
|---|---|---|
| 1 | ฐานข้อมูลงานวิจัย | ค้นหาและสืบค้นงานวิจัย |
| 2 | เอกสารเผยแพร่ | รายงานวิจัย คู่มือ แนวทาง |
| 3 | คลังความรู้การเกษตร | องค์ความรู้ เทคโนโลยี |
| 4 | วารสารและสิ่งพิมพ์ | วารสารวิชาการ ออนไลน์ |
| 5 | สื่อและมัลติมีเดีย | วิดีโอ สื่อการสอน Infographic |

---

## Phase 8: Partners

**Risk:** ✅ Lowest (simple presentational)
**Effort:** ~30 min
**File:** `PartnersSection.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 8.1 | Create PartnersSection component | Logo row with placeholders |
| 8.2 | Wire partner logos from content | 8 placeholder circles/rectangles |
| 8.3 | Implement responsive layout | `flex-wrap justify-center` |

---

## Phase 9: Footer

**Risk:** 🟢 Low (adapt from existing V6 footer pattern)
**Effort:** ~1.5 hours
**Files:** `SiteFooter.tsx`, `SocialIcons.tsx`, `NewsletterForm.tsx`

### Tasks
| # | Task | Details |
|---|---|---|
| 9.1 | Create SocialIcons component | Facebook (blue), Line (green), YouTube (red) |
| 9.2 | Create NewsletterForm component | Email input + submit button |
| 9.3 | Create SiteFooter component | 4-column grid with all content |
| 9.4 | Wire data from content | Contact info, links, social URLs |
| 9.5 | Implement bottom bar | Copyright + legal links |

---

## Phase 10: Polish

**Risk:** 🟢 Low (improvements only)
**Effort:** ~2 hours

### Tasks
| # | Task | Details | Priority |
|---|---|---|---|
| 10.1 | Add skip-to-content link | Accessibility | P0 |
| 10.2 | Add form labels to search + newsletter | Accessibility | P0 |
| 10.3 | Add meaningful alt text to images | Accessibility | P0 |
| 10.4 | Implement mobile hamburger menu | Slide-in panel | P1 |
| 10.5 | Add count-up animation on stats | Intersection Observer | P1 |
| 10.6 | Add scroll-reveal animations on sections | fade-in-up | P2 |
| 10.7 | Implement proper focus styles | WCAG compliance | P1 |
| 10.8 | Replace external image URLs with local assets | Production readiness | P1 |
| 10.9 | Add `pending-verification` flag to statistics | Data integrity | P1 |
| 10.10 | Run `rtk npm run lint` + `rtk npm run build` | Validation | P0 |

---

## Risk Matrix

| Risk | Phase | Mitigation |
|---|---|---|
| **Typography mismatch** — Sarabun looks different from V6 fonts | Foundation, All phases | Preview early at `/stitch-landing-v2` and compare to `screen.png` |
| **Statistics are hardcoded** — may be inaccurate | Phase 4 | Flag all values as `pending-verification`, don't deploy without RAE team approval |
| **Fixed hero height** — content overflow on mobile | Phase 2 | Use `min-h-[600px]` instead of `h-[600px]` |
| **Nav links have `href="#"`** — no real routing | Phase 1 | Use actual locale routes (`/th/about`, `/th/research-services`, etc.) |
| **External image URLs** — may break without Google access | All | Replace with local assets during Polish phase |
| **Thai font rendering** — Sarabun needs Thai subset | Phase 0 | Verify `subsets: ["thai", "latin"]` in font config |
| **Mobile menu** — client-side interactivity needed | Phase 10 | Isolate as `"use client"` component |

---

## Total Estimate: 3–5 Days

| Phase | Effort | Risk | Dependencies |
|---|---|---|---|
| P0 Foundation | 2h | Medium | None |
| P1 Header | 2h | Low | P0 |
| P2 Hero | 2h | Medium | P0 |
| P3 Service Cards | 1.5h | Low | P0 |
| P4 Statistics | 1.5h | Medium | P0 |
| P5 Research | 2h | Medium | P0 |
| P6 News | 1.5h | Low | P0 |
| P7 Knowledge | 1h | Low | P0 |
| P8 Partners | 0.5h | Low | P0 |
| P9 Footer | 1.5h | Low | P0 |
| P10 Polish | 2h | Low | P1–P9 |
| **Total** | **~17.5h** | — | — |

---

*End of Implementation Order. Planning only — no production code changes.*

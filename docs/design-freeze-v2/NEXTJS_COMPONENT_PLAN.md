# NEXT.JS Component Plan — Stitch Landing V2

**Date:** 2026-06-29
**Status:** ⚠️ Planning only — no production code changes

---

## 1. Folder Tree

```
components/stitch-landing-v2/
├── StitchLandingRenderer.tsx      # Top-level renderer (new)
├── TopBar.tsx                      # Utility bar (staff login, language)
├── SiteHeader.tsx                  # Logo + nav + search + hamburger
├── HeroSection.tsx                 # Hero with bg image, headline, CTAs
├── ServiceCards.tsx                # 5-column service card grid
├── ServiceCard.tsx                 # Individual service card
├── StatisticsSection.tsx           # Dark green stats bar
├── StatItem.tsx                    # Single stat (icon + number + label)
├── ContentSection.tsx              # Two-column research + news layout
├── ResearchList.tsx                # Featured image + thumbnail items
├── ResearchListItem.tsx            # Individual research item
├── NewsList.tsx                    # Featured + small news items
├── NewsItem.tsx                    # Individual news item
├── KnowledgeResources.tsx          # 5-column resource card grid
├── KnowledgeResourceCard.tsx       # Individual resource card
├── PartnersSection.tsx             # Partner logo row
├── SiteFooter.tsx                  # Footer with 4 columns
├── NewsletterForm.tsx              # Email subscription form
├── SocialIcons.tsx                 # Facebook, Line, YouTube icons
└── icons/                          # SVG icon components
    ├── ResearchIcon.tsx
    ├── TrainingIcon.tsx
    ├── ConsultingIcon.tsx
    ├── FacilityIcon.tsx
    ├── CertificationIcon.tsx
    ├── StatsProjectIcon.tsx
    ├── StatsPublicationIcon.tsx
    ├── StatsPersonnelIcon.tsx
    ├── StatsCommunityIcon.tsx
    ├── SearchIcon.tsx
    ├── HamburgerIcon.tsx
    ├── ArrowIcon.tsx
    ├── FacebookIcon.tsx
    ├── LineIcon.tsx
    └── YouTubeIcon.tsx
```

---

## 2. Component Tree

```
<StitchLandingRenderer locale="th">
├── <TopBar />
│   ├── "เข้าสู่ระบบสำหรับบุคลากร" link
│   └── "English" / "ไทย" language switch
│
├── <SiteHeader />
│   ├── Logo (image + RAE text + subtitle)
│   ├── <NavLinks />  (6 links: หน้าหลัก, เกี่ยวกับเรา, วิจัยฯ, บริการฯ, เอกสารฯ, ข่าวสารฯ)
│   ├── <SearchBar />  (input + search icon)
│   └── <HamburgerButton />  (mobile only)
│
├── <HeroSection />
│   ├── Background image + gradient overlay
│   ├── Headline (TH, gold accent span)
│   ├── Paragraph (TH)
│   └── 2 × CTA buttons
│
├── <ServiceCards />
│   ├── Section header (title + "ดูทั้งหมด" link)
│   └── 5 × <ServiceCard />
│       ├── Icon circle (SVG)
│       ├── Title
│       └── Description
│
├── <StatisticsSection />
│   ├── Header column (title + "ดูสถิติทั้งหมด" link)
│   └── 4 × <StatItem />
│       ├── Icon (SVG)
│       ├── Number (real data)
│       └── Label + unit
│
├── <ContentSection />
│   ├── <ResearchList />
│   │   ├── Header (title + "ดูทั้งหมด" link)
│   │   ├── Featured image (large)
│   │   └── 3 × <ResearchListItem />
│   │       ├── Thumbnail
│   │       ├── Tag (category)
│   │       ├── Title
│   │       └── Researcher name
│   └── <NewsList />
│       ├── Header (title + "ดูทั้งหมด" link)
│       ├── <NewsItem /> featured (image + title + date)
│       └── 3 × <NewsItem /> small (thumbnail + title + date)
│
├── <KnowledgeResources />
│   ├── Section header (title + description)
│   └── 5 × <KnowledgeResourceCard />
│       ├── Icon circle (SVG, hover transition)
│       ├── Title
│       └── Description
│
├── <PartnersSection />
│   └── Logo row (8 placeholder circles/rectangles)
│
└── <SiteFooter />
    ├── 4-column grid
    │   ├── Column 1: Logo + contact info (address, phone, email)
    │   ├── Column 2: Main menu links
    │   ├── Column 3: Popular services links
    │   └── Column 4: Social icons + newsletter form
    └── Bottom bar: copyright + legal links
```

---

## 3. Props Interface

```typescript
// ─── Top-level ────────────────────────────────────
type StitchLandingProps = {
  locale: "th" | "en";
};

// ─── Navigation ────────────────────────────────────
type NavLink = {
  label: string;       // "หน้าหลัก", "เกี่ยวกับเรา", etc.
  href: string;        // "/", "/about", etc.
  isActive?: boolean;  // true for current page
};

type TopBarProps = {
  loginLabel: string;          // "เข้าสู่ระบบสำหรับบุคลากร"
  loginHref: string;           // "/staff/login"
  altLocale: "th" | "en";     // for language switch
  altLocaleLabel: string;      // "English" / "ไทย"
  altLocaleHref: string;       // "/en" / "/th"
};

type SiteHeaderProps = {
  logo: {
    src: string;
    alt: string;
  };
  siteName: string;            // "RAE"
  siteSubtitle: string;        // "สำนักงานวิจัยและส่งเสริมวิชาการการเกษตร\nมหาวิทยาลัยแม่โจ้"
  navLinks: NavLink[];
  searchPlaceholder: string;   // "ค้นหา..."
};

// ─── Hero ───────────────────────────────────────────
type HeroSectionProps = {
  backgroundImage: string;
  headline: string;            // includes gold-accented span
  paragraph: string;
  primaryCta: {
    label: string;             // "เกี่ยวกับเรา"
    href: string;
    variant: "primary" | "gold";
  };
  secondaryCta: {
    label: string;             // "บริการของเรา"
    href: string;
    variant: "primary" | "gold";
  };
};

// ─── Service Cards ─────────────────────────────────
type ServiceCardData = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href: string;
};

type ServiceCardsProps = {
  kicker: string;              // "บริการของเรา"
  description: string;         // "บริการวิชาการและการถ่ายทอดองค์ความรู้สู่สังคม"
  viewAllHref: string;
  viewAllLabel: string;        // "ดูทั้งหมด"
  cards: ServiceCardData[];
};

// ─── Statistics ────────────────────────────────────
type StatItemData = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
  label: string;               // "งานวิจัยที่ดำเนินการ"
  unit: string;                // "โครงการ"
};

type StatisticsSectionProps = {
  title: string;               // "ผลงานและสถิติ"
  subtitle: string;            // "(ข้อมูลโดยสังเขป)"
  viewAllHref: string;
  viewAllLabel: string;        // "ดูสถิติทั้งหมด"
  stats: StatItemData[];
};

// ─── Research List ─────────────────────────────────
type ResearchItemData = {
  id: string;
  thumbnail: string;
  tag: string;                 // "นวัตกรรม", "พืชและเทคโนโลยีการผลิต", etc.
  title: string;
  researcher: string;          // "นักวิจัย: รศ.ดร.สมชาย โชติ และคณะ"
};

type ResearchListProps = {
  title: string;               // "งานวิจัยและนวัตกรรมเด่น"
  viewAllHref: string;
  viewAllLabel: string;        // "ดูทั้งหมด"
  featuredImage: string;
  items: ResearchItemData[];
};

// ─── News List ─────────────────────────────────────
type NewsItemData = {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  isFeatured?: boolean;
};

type NewsListProps = {
  title: string;               // "ข่าวสารและกิจกรรม"
  viewAllHref: string;
  viewAllLabel: string;        // "ดูทั้งหมด"
  featured: NewsItemData;
  items: NewsItemData[];
};

// ─── Knowledge Resources ──────────────────────────
type KnowledgeResourceData = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href: string;
};

type KnowledgeResourcesProps = {
  title: string;               // "แหล่งองค์ความรู้"
  description: string;         // "เข้าถึงองค์ความรู้และเอกสารเผยแพร่ด้านการเกษตร"
  resources: KnowledgeResourceData[];
};

// ─── Partners ──────────────────────────────────────
type PartnersSectionProps = {
  title: string;               // "หน่วยงานและเครือข่ายความร่วมมือ"
  logos: { src: string; alt: string; href?: string }[];
};

// ─── Footer ──────────────────────────────────────────
type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type SiteFooterProps = {
  logo: { src: string; alt: string };
  organizationName: string;    // "สำนักงานวิจัยและส่งเสริมวิชาการการเกษตร"
  universityName: string;      // "มหาวิทยาลัยแม่โจ้"
  address: string;             // Full address
  phone: string;               // "0 5387 3400"
  email: string;               // "rae@mju.ac.th"
  columns: FooterColumn[];     // Main menu, Popular services
  socialLinks: {
    platform: "facebook" | "line" | "youtube";
    href: string;
  }[];
  newsletterPlaceholder: string; // "อีเมลของคุณ"
  newsletterButtonLabel: string; // "สมัครรับข่าวสาร"
  copyright: string;
  legalLinks: { label: string; href: string }[];
};
```

---

## 4. Data Source

### Recommendation: New `content/stitch-landing.ts`

Create a new data file at `content/stitch-landing.ts` with a `Record<Locale, StitchLandingContent>` pattern (same as `content/landing.ts`).

```typescript
// content/stitch-landing.ts
export type StitchLandingContent = {
  topBar: { /* ... */ };
  nav: { /* ... */ };
  hero: { /* ... */ };
  services: { /* ... */ };
  statistics: { /* ... */ };
  researchList: { /* ... */ };
  newsList: { /* ... */ };
  knowledgeResources: { /* ... */ };
  partners: { /* ... */ };
  footer: { /* ... */ };
};

export const stitchLanding: Record<Locale, StitchLandingContent> = {
  th: { /* Thai content from code.html */ },
  en: { /* English translations */ },
};
```

### Alternative: Extend `content/landing.ts`

If the Stitch V2 replaces the current Landing V6, add new section types to the existing `LandingContent` type. This is riskier and would affect the existing V6 route.

### Data storage for statistics (hardcoded in Stitch HTML):

The statistics in the Stitch HTML (586 projects, 1,248 publications, 124 personnel, 8,732 beneficiaries) are hardcoded. For the Next.js implementation, these should:
- Start as hardcoded in the content file (same as Stitch source)
- Be flagged as `pending-live-source` (similar to V6 KPI snapshot pattern)
- Get a data loading mechanism (API endpoint or CMS integration) in future phases

---

## 5. Responsive Strategy

| Breakpoint | Implementation | Tailwind Classes |
|---|---|---|
| **Mobile (default)** | Single column, stacked | `grid-cols-1` |
| **Tablet (md: 768px+)** | 2-column grids, nav hidden | `md:grid-cols-2` |
| **Desktop (lg: 1024px+)** | Multi-column, nav visible | `lg:grid-cols-5`, `lg:grid-cols-4` |
| **Hero** | Fixed 600px height → use `min-h-[600px]` for mobile | `min-h-[600px]` |
| **Hero text** | Fluid type scale | `text-4xl md:text-5xl lg:text-6xl` |
| **Card grid** | Auto-fill with responsive columns | Various grid classes |

**Mobile navigation:** New `<HamburgerMenu>` component using a `mobileMenuOpen` state toggle. No existing V6 component to reuse.

---

## 6. Animation Strategy

| Element | Animation | Implementation |
|---|---|---|
| **Card hover** | translateY(-5px) + shadow increase | Tailwind `group` + `hover:-translate-y-1` + `hover:shadow-lg` |
| **Resource card hover** | Border color + icon bg color | Tailwind `group-hover:border-brand-primary` + `group-hover:bg-brand-primary` |
| **Stat counter** | Count-up on scroll | Intersection Observer + `useEffect` counter animation |
| **Section entrance** | Fade-in-up on scroll | Tailwind + `useInView` from framer-motion or custom hook |
| **Hero** | Subtle gradient shift | CSS `@keyframes` on gradient position |
| **Nav link hover** | Color transition | `transition-colors` |
| **Mobile menu** | Slide-in panel | `translate-x-full` → `translate-x-0` |

---

## 7. CSS Ownership

| Concern | Location | Strategy |
|---|---|---|
| **Color tokens** | `app/stitch-landing-v2/stitch-landing.css` | `@theme` block with Stitch brand tokens (similar to `landing-v6.css`) |
| **Typography** | Same CSS file | Sarabun via `next/font/google` + `@theme` font-family tokens |
| **Custom utilities** | Same CSS file | `.shadow-soft`, `.card-hover` migrated to Tailwind v4 utilities |
| **Component styles** | Tailwind classes in JSX | No CSS modules — all inline Tailwind |
| **Animations** | Tailwind + CSS `@keyframes` | Minimal, defined in the central CSS file |
| **Responsive** | Tailwind responsive prefixes | `sm:`, `md:`, `lg:` prefixes on grid/width classes |

### Font Loading (next/font/google)

```typescript
// In app/stitch-landing-v2/layout.tsx
import { Sarabun } from "next/font/google";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});
```

---

## 8. Route Strategy

### Option A: New route `/stitch-landing-v2` (Recommended for preview)

```
app/stitch-landing-v2/
├── page.tsx           → imports StitchLandingRenderer with locale="th"
├── layout.tsx         → Sarabun font, brand tokens CSS, metadata
└── stitch-landing.css → @theme with Stitch brand tokens
```

### Option B: Replace existing `/landing-v6` (Production)

Modify `app/landing-v6/page.tsx` to render `<StitchLandingRenderer locale="th" />` instead of `<LandingRenderer locale="en" />`.

### Option C: New locale route `/th/landing-v2`

Add under `app/[locale]/` as a new route, similar to how `landing-v6` works.

**Recommendation:** Option A (new route) for initial implementation and review, then Option B for production replacement after approval.

---

## 9. Key Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Build new or refactor V6?** | **Build new** | Stitch V2 has fundamentally different layout, colors, fonts, and section structure from V6. Merging into V6 would create an unmaintainable component. |
| **Shared or separate content file?** | **Separate** (`content/stitch-landing.ts`) | Cleaner separation. V6 content can be phased out after Stitch goes live. |
| **SVG icons or icon library?** | **React SVG components** | Stitch uses specific SVG icons that don't match Material Symbols. Extract as reusable components under `icons/`. |
| **Tailwind CDN or build-time?** | **Build-time (Tailwind v4 + @theme)** | Matches existing project architecture. No CDN dependency. |
| **Server or client component?** | **Server component** | All content is static — no interactivity needed except mobile menu (can be isolated as client island). |
| **Image handling** | `<img>` with `NEXT_PUBLIC_ASSET_PREFIX` | Follows existing V6 pattern. Stitch uses external `lh3.googleusercontent.com` URLs — replace with local assets. |

---

## 10. Component Dependency Graph

```
StitchLandingRenderer
├── TopBar                 ← standalone, leaf
├── SiteHeader             ← standalone, leaf
├── HeroSection            ← standalone, leaf
├── ServiceCards
│   └── ServiceCard ×5     ← reusable card pattern
├── StatisticsSection
│   └── StatItem ×4        ← reusable stat pattern
├── ContentSection
│   ├── ResearchList
│   │   └── ResearchListItem ×3  ← reusable item pattern
│   └── NewsList
│       └── NewsItem ×4         ← reusable item pattern
├── KnowledgeResources
│   └── KnowledgeResourceCard ×5 ← reusable card pattern
├── PartnersSection        ← standalone, leaf
└── SiteFooter
    ├── SocialIcons        ← standalone, leaf
    └── NewsletterForm     ← standalone, leaf
```

**8 leaf components**, **4 container components**, **1 top-level renderer**. Total: ~13 components.

---

*End of Next.js Component Plan. Planning only — no production code changes.*

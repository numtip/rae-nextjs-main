/* eslint-disable @next/next/no-img-element */
import { landingV2 } from "@/content/landing-v2";
import type { Locale } from "@/lib/locale";

type Props = { locale: Locale };

/**
 * Prepend NEXT_PUBLIC_ASSET_PREFIX so images resolve correctly under
 * the GitHub Pages basePath (set via GITHUB_PAGES=true in CI).
 */
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";
function asset(path: string): string {
  return `${ASSET_BASE}${path}`;
}

/**
 * Landing V2 Renderer — scaffold awaiting Google Stitch V2 export.
 *
 * Design principles:
 * - Mobile-first, institutional, premium (not flashy)
 * - Calm, subtle motion that supports content
 * - Accessibility: skip link, semantic landmarks, reduced-motion respected
 * - Performance: server component, no client JS, no heavy assets
 * - Placeholders clearly marked [PLACEHOLDER V2] until V2 content arrives
 */
export default function LandingV2Renderer({ locale }: Props) {
  const c = landingV2[locale];
  const logoSrc = asset("/images/logorae3.jpg");

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#v2-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#005c3b] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        {locale === "th" ? "ข้ามไปยังเนื้อหาหลัก" : "Skip to main content"}
      </a>

      <div id="v2-main-content">
        {/* ─── Top Nav ─────────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-50 bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-[#bfc9c0]/20"
          aria-label={locale === "th" ? "เมนูหลัก" : "Main navigation"}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex items-center justify-between h-20">
            <a
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
              href="#"
              aria-label={`${c.nav.universityName} ${c.nav.subtitle}`}
            >
              <img
                alt={`${c.nav.universityName} ${c.nav.subtitle}`}
                className="h-12 w-auto object-contain"
                src={logoSrc}
              />
              <div className="hidden md:flex flex-col">
                <span className="font-bold text-[#005c3b] leading-tight tracking-tight text-sm">
                  {c.nav.universityName}
                </span>
                <span className="text-[10px] text-[#3f4942] tracking-widest uppercase">
                  {c.nav.subtitle}
                </span>
              </div>
            </a>
            <button
              className="bg-[#005c3b] text-white text-xs px-5 py-2.5 rounded-full hover:bg-[#004229] transition-colors duration-300 font-medium"
              type="button"
            >
              {c.nav.quickAccess}
            </button>
          </div>
        </nav>

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <header className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#005c3b]">
          {/* Subtle gradient overlay — calm, institutional */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#005c3b] via-[#004229] to-[#005c3b]"></div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16 w-full py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-[#ffde00]"></span>
                <span className="text-[#ffde00] text-xs tracking-widest uppercase font-medium">
                  {c.hero.kicker}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {c.hero.titleLine1}
                <br />
                <span className="text-white/80 italic font-light">
                  {c.hero.titleLine2Italic}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                {c.hero.paragraph}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-[#ffde00] text-[#005c3b] text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 font-semibold shadow-lg"
                  type="button"
                >
                  {c.hero.primaryCta}
                </button>
                <button
                  className="bg-transparent text-white border border-white/30 text-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-colors duration-300 font-medium"
                  type="button"
                >
                  {c.hero.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Pillars ─────────────────────────────────────────────── */}
        <section
          className="bg-[#fcf9f8] py-24"
          aria-labelledby="v2-pillars-heading"
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-16">
            <div className="mb-16 text-center">
              <span className="text-[#005c3b] text-xs tracking-widest uppercase font-medium mb-4 block">
                {c.pillars.kicker}
              </span>
              <h2
                id="v2-pillars-heading"
                className="text-3xl md:text-5xl font-bold text-[#1c1b1b] mb-6"
              >
                {c.pillars.title}
              </h2>
              <div className="w-16 h-1 bg-[#ffde00] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.pillars.items.map((item) => (
                <div
                  key={item.title}
                  className="v2-card-lift bg-white rounded-lg p-8 v2-premium-shadow border border-[#bfc9c0]/20"
                >
                  <h3 className="text-xl font-bold text-[#1c1b1b] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#3f4942] text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Research ────────────────────────────────────────────── */}
        <section
          className="bg-[#f6f3f2] py-24"
          aria-labelledby="v2-research-heading"
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-16">
            <div className="max-w-3xl">
              <span className="text-[#005c3b] text-xs tracking-widest uppercase font-medium mb-4 block">
                {c.research.kicker}
              </span>
              <h2
                id="v2-research-heading"
                className="text-3xl md:text-5xl font-bold text-[#1c1b1b] mb-6"
              >
                {c.research.title}
              </h2>
              <div className="w-16 h-1 bg-[#005c3b] mb-8"></div>
              <p className="text-lg text-[#3f4942] mb-8 leading-relaxed">
                {c.research.paragraph}
              </p>
              <button
                className="text-[#005c3b] text-sm font-semibold border-b-2 border-[#005c3b] hover:border-[#ffde00] hover:text-[#6d5e00] transition-colors duration-300 pb-1"
                type="button"
              >
                {c.research.cta} →
              </button>
            </div>
          </div>
        </section>

        {/* ─── Ecosystem ────────────────────────────────────────────── */}
        <section
          className="bg-[#313030] py-24"
          aria-labelledby="v2-ecosystem-heading"
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-16">
            <div className="max-w-3xl">
              <span className="text-[#ffde00] text-xs tracking-widest uppercase font-medium mb-4 block">
                {c.ecosystem.kicker}
              </span>
              <h2
                id="v2-ecosystem-heading"
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                {c.ecosystem.title}
              </h2>
              <div className="w-16 h-1 bg-[#ffde00] mb-8"></div>
              <p className="text-lg text-white/80 leading-relaxed">
                {c.ecosystem.paragraph}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Signature ────────────────────────────────────────────── */}
        <section
          className="bg-[#005c3b] py-32 text-center"
          aria-labelledby="v2-signature-heading"
        >
          <div className="max-w-3xl mx-auto px-5 md:px-16">
            <span className="text-[#ffde00] text-xs tracking-widest uppercase font-medium mb-4 block">
              {c.signature.kicker}
            </span>
            <h2
              id="v2-signature-heading"
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              {c.signature.title}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {c.signature.paragraph}
            </p>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────── */}
        <footer className="bg-[#1c1b1b] py-12">
          <div className="max-w-[1280px] mx-auto px-5 md:px-16 text-center">
            <p className="text-white/60 text-sm">
              {c.footer.copyright}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

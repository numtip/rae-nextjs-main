/* eslint-disable @next/next/no-img-element */
import { landingImages } from "@/content/landing-images";
import { landing } from "@/content/landing";
import type { Locale } from "@/lib/locale";

type Props = { locale: Locale };

/** Prepend NEXT_PUBLIC_ASSET_PREFIX so images resolve correctly under basePath. */
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";
function img(path: string): string {
  return `${ASSET_BASE}${path}`;
}

export default function LandingRenderer({ locale }: Props) {
  const c = landing[locale];

  return (
    <>
      {/* Skip to main */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        {locale === "th" ? "ข้ามไปยังเนื้อหาหลัก" : "Skip to main content"}
      </a>

      <div id="main-content">
        {/* ─── TopNavBar ───────────────────────────────────────────────── */}
        <nav className="docked full-width top-0 sticky z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 flat no shadows transition-all duration-300">
          <div className="max-w-[1280px] mx-auto px-margin-desktop flex items-center justify-between h-20">
            <a
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 active:scale-98"
              href="#"
            >
              <img
                alt={`${c.nav.universityName} ${c.nav.subtitle}`}
                className="h-12 w-auto object-contain"
                src={img(landingImages.logo)}
              />
              <div className="hidden md:flex flex-col">
                <span className="font-headline-md font-bold text-primary leading-tight tracking-tight">
                  {c.nav.universityName}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant tracking-widest uppercase">
                  {c.nav.subtitle}
                </span>
              </div>
            </a>
            <div className="hidden md:flex space-x-8 items-center">
              {c.nav.links.map((link) => (
                <a
                  key={link.label}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-4">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">language</span>
                </button>
              </div>
              <button className="bg-primary text-on-primary font-label-sm text-label-sm px-5 py-2.5 rounded-full hover:bg-primary-container hover:shadow-lg transition-all duration-300 active:scale-98 font-medium">
                {c.nav.quickAccess}
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Hero Section ────────────────────────────────────────────── */}
        <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 bg-surface-variant opacity-80 mix-blend-screen">
            <img
              alt=""
              className="w-full h-full object-cover"
              src={img(landingImages.heroBackground)}
              style={{ filter: "contrast(1.1) brightness(0.9)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              alt=""
              className="w-[800px] h-auto object-contain"
              src={img(landingImages.logo)}
            />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 md:grid-cols-12 gap-gutter pt-20">
            <div className="md:col-span-10 lg:col-span-8 flex flex-col items-start justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-secondary-container"></span>
                <span className="font-label-sm text-label-sm text-secondary-container tracking-widest uppercase">
                  {c.hero.kicker}
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-white mb-6 text-balance leading-tight">
                {c.hero.titleLine1} <br />
                <span className="text-white/80 italic font-light">
                  {c.hero.titleLine2Italic}
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-white/80 mb-12 max-w-2xl text-xl leading-relaxed">
                {c.hero.paragraph}
              </p>
              <div className="flex flex-wrap gap-5">
                <button className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1 shadow-xl tracking-wide">
                  {c.hero.primaryCta}
                </button>
                <button className="bg-transparent text-white border border-white/30 font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center gap-3 tracking-wide backdrop-blur-sm">
                  {c.hero.secondaryCta}{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Impact Metrics Dashboard ────────────────────────────────── */}
        <section className="bg-surface relative z-20 -mt-24 mx-margin-mobile md:mx-margin-desktop max-w-[1280px] md:mx-auto rounded-2xl premium-shadow overflow-hidden border border-white">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-outline-variant/20 bg-white/60 backdrop-blur-xl">
            {c.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden ${
                  i === c.metrics.length - 1 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                  {metric.placeholder}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── RAE at a Glance ─────────────────────────────────────────── */}
        <section className="bg-surface py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 text-center">
              <span className="font-label-sm text-primary tracking-widest uppercase mb-4 block">
                {c.atAGlance.kicker}
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                {c.atAGlance.title}
              </h2>
              <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.atAGlance.pillars.map((pillar, i) => (
                <div key={pillar.title} className="flex flex-col group cursor-pointer">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 premium-shadow relative">
                    <img
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      src={img(
                        [
                          landingImages.pillars.researchExcellence,
                          landingImages.pillars.academicServices,
                          landingImages.pillars.communityImpact,
                        ][i]!
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Research to Community Storytelling ──────────────────────── */}
        <section className="bg-surface-container-low py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                  {c.researchToCommunity.title}
                </h2>
                <div className="w-16 h-1 bg-primary mb-8"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 text-lg">
                  {c.researchToCommunity.paragraph}
                </p>
                <div className="flex flex-col gap-6">
                  {c.researchToCommunity.steps.map((step, i) => (
                    <div key={step.label}>
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-secondary-container text-3xl">
                          {step.icon}
                        </span>
                        <span className="font-headline-lg text-xl">
                          {step.label}
                        </span>
                      </div>
                      {i < c.researchToCommunity.steps.length - 1 && (
                        <div className="ml-4 w-px h-8 bg-outline-variant/50"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden premium-shadow aspect-[16/10] group">
                <img
                  alt={c.researchToCommunity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  src={img(landingImages.researchToCommunity)}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Research Showcase ─────────────────────────────────────────── */}
        <section className="bg-surface py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <span className="font-label-sm text-primary tracking-widest uppercase mb-4 block">
                  {c.showcase.kicker}
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                  {c.showcase.title}
                </h2>
                <div className="w-16 h-1 bg-secondary-container mb-6"></div>
              </div>
              <button className="bg-transparent text-primary border border-primary font-label-sm text-label-sm px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                {c.showcase.viewAll}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Feature 1: Large Asymmetric */}
              <div className="md:col-span-8 group relative rounded-2xl overflow-hidden aspect-[16/10] premium-shadow cursor-pointer">
                <img
                  alt={c.showcase.features[0]?.title ?? ""}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={img(landingImages.showcase.integratedResearch)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 flex flex-col justify-end w-full md:w-3/4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-[10px] uppercase tracking-widest rounded-full">
                      {c.showcase.features[0]?.tag}
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-3xl md:text-4xl text-white mb-4 leading-tight group-hover:text-secondary-container transition-colors">
                    {c.showcase.features[0]?.title}
                  </h3>
                  <p className="font-body-md text-white/80 line-clamp-2">
                    {c.showcase.features[0]?.text}
                  </p>
                </div>
              </div>

              {/* Feature 2: Side Feature */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <div className="group relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full premium-shadow cursor-pointer">
                  <img
                    alt={c.showcase.features[1]?.title ?? ""}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={img(landingImages.showcase.academicServices)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary text-white font-label-sm text-[10px] uppercase tracking-widest rounded-full">
                        {c.showcase.features[1]?.tag}
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-2xl text-white mb-3 leading-tight group-hover:text-secondary-container transition-colors">
                      {c.showcase.features[1]?.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Feature 3: Standard */}
              <div className="md:col-span-4 group bg-surface rounded-2xl overflow-hidden premium-shadow border border-outline-variant/10 cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt={c.showcase.features[2]?.title ?? ""}
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={img(landingImages.showcase.knowledgeTransfer)}
                />
                <div className="p-8">
                  <span className="text-primary font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                    {c.showcase.features[2]?.tag}
                  </span>
                  <h3 className="font-headline-lg text-2xl text-on-surface mb-4">
                    {c.showcase.features[2]?.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant mb-6 text-sm">
                    {c.showcase.features[2]?.text}
                  </p>
                  <span className="text-primary font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    {c.showcase.features[2]?.cta}{" "}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>

              {/* Feature 4: Standard */}
              <div className="md:col-span-4 group bg-surface rounded-2xl overflow-hidden premium-shadow border border-outline-variant/10 cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt={c.showcase.features[3]?.title ?? ""}
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={img(landingImages.showcase.farmerEngagement)}
                />
                <div className="p-8">
                  <span className="text-primary font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                    {c.showcase.features[3]?.tag}
                  </span>
                  <h3 className="font-headline-lg text-2xl text-on-surface mb-4">
                    {c.showcase.features[3]?.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant mb-6 text-sm">
                    {c.showcase.features[3]?.text}
                  </p>
                  <span className="text-primary font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    {c.showcase.features[3]?.cta}{" "}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>

              {/* Feature 5: Primary highlight */}
              <div className="md:col-span-4 group bg-primary rounded-2xl overflow-hidden premium-shadow cursor-pointer hover:-translate-y-1 transition-transform duration-300 relative">
                <img
                  alt={c.showcase.features[4]?.title ?? ""}
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={img(landingImages.showcase.communityDevelopment)}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="p-8 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="text-secondary-container font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                      {c.showcase.features[4]?.tag}
                    </span>
                    <h3 className="font-headline-lg text-2xl text-white mb-4">
                      {c.showcase.features[4]?.title}
                    </h3>
                    <p className="font-body-md text-white/80 mb-6 text-sm">
                      {c.showcase.features[4]?.text}
                    </p>
                  </div>
                  <span className="text-secondary-container font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    {c.showcase.features[4]?.cta}{" "}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Knowledge Ecosystem ──────────────────────────────────────── */}
        <section className="bg-[#313030] py-[120px] overflow-hidden text-white relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #005c3b 0%, transparent 70%)",
            }}
          ></div>
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 flex flex-col">
                <span className="font-label-sm text-secondary-container tracking-widest uppercase mb-4 block border-b border-secondary-container/30 pb-4 inline-block w-max">
                  {c.ecosystem.kicker}
                </span>
                <h2 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">
                  {c.ecosystem.title}
                </h2>
                <p className="font-body-lg text-white/70 mb-10 text-lg font-light">
                  {c.ecosystem.paragraph}
                </p>
                <ul className="space-y-6 mb-10">
                  {c.ecosystem.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-4 text-white/90">
                      <span className="material-symbols-outlined text-secondary-container">
                        {item.icon}
                      </span>
                      <span className="font-label-sm uppercase tracking-wider">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300 w-max tracking-wide shadow-lg">
                  {c.ecosystem.cta}
                </button>
              </div>
              <div className="lg:col-span-7 relative group perspective-1000">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-black">
                  <img
                    alt={c.ecosystem.title}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    src={img(landingImages.ecosystem)}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-container rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Signature Experience ─────────────────────────────────────── */}
        <section className="relative full-width min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
          <div className="absolute inset-0 z-0">
            <img
              alt={c.signature.kicker}
              className="w-full h-full object-cover opacity-60"
              src={img(landingImages.signatureBackground)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full">
            <div className="flex flex-col items-center text-center">
              <div className="mb-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
                <img
                  alt={c.footer.brandName}
                  className="h-16 w-auto grayscale brightness-200"
                  src={img(landingImages.logo)}
                />
              </div>
              <span className="font-label-sm text-secondary-container tracking-[0.3em] uppercase mb-6 block">
                {c.signature.kicker}
              </span>
              <h2 className="font-display-lg text-display-lg md:text-[84px] leading-[1.05] mb-8 max-w-4xl">
                {c.signature.titleLine1} <br />
                <span className="italic font-light text-white/70">
                  {c.signature.titleLine2Italic}
                </span>
              </h2>
              <p className="font-body-lg text-white/80 max-w-2xl text-xl leading-relaxed mb-8">
                {c.signature.paragraph}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                {c.signature.badges.map((badge, i) => (
                  <div key={badge} className="flex flex-col items-center">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-white/50 mb-2">
                      {badge}
                    </span>
                    <div
                      className={`h-px w-12 ${
                        i === 1 ? "bg-secondary-container" : "bg-primary"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── News & Insights ────────────────────────────────────────── */}
        <section className="bg-surface-bright py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant/30 pb-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
                  {c.news.title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
                  {c.news.paragraph}
                </p>
              </div>
              <button className="text-primary font-label-sm text-label-sm hover:text-primary-container transition-all duration-300 flex items-center gap-2 uppercase tracking-widest">
                {c.news.goToNewsroom}{" "}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Featured Story */}
              <div className="lg:col-span-7 flex flex-col group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 premium-shadow">
                  <img
                    alt={c.news.featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src={img(landingImages.news.featured)}
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                    {c.news.featured.tag}
                  </span>
                  <span className="font-label-sm text-on-surface-variant">
                    {c.news.featured.date}
                  </span>
                </div>
                <h3 className="font-headline-xl text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
                  {c.news.featured.title}
                </h3>
                <p className="font-body-lg text-on-surface-variant mb-6 text-lg font-light leading-relaxed">
                  {c.news.featured.text}
                </p>
                <div className="flex items-center text-on-surface font-label-sm text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2 hover:gap-3 transition-all text-primary">
                    {c.news.featured.cta}{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>

              {/* Recent Dispatches */}
              <div className="lg:col-span-5 flex flex-col gap-0 border-t lg:border-t-0 border-outline-variant/30">
                {c.news.dispatches.map((dispatch, i) => (
                  <a
                    key={dispatch.title}
                    className={`group py-8 ${
                      i < c.news.dispatches.length - 1
                        ? "border-b border-outline-variant/30"
                        : ""
                    } flex gap-6 items-center`}
                    href="#"
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-3">
                        <span
                          className={`font-label-sm text-[10px] px-2 py-0.5 rounded uppercase tracking-widest ${
                            dispatch.tagColor === "primary"
                              ? "text-primary bg-primary/10"
                              : "text-secondary-container bg-secondary-container/10"
                          }`}
                        >
                          {dispatch.tag}
                        </span>
                        <span className="font-label-sm text-xs text-on-surface-variant">
                          {dispatch.date}
                        </span>
                      </div>
                      <h5 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                        {dispatch.title}
                      </h5>
                      <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm">
                        {dispatch.text}
                      </p>
                    </div>
                    {i < 2 && (
                      <div className="hidden sm:block w-28 h-24 rounded-xl overflow-hidden shrink-0">
                        <img
                          alt={dispatch.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={img(
                            i === 0
                              ? landingImages.news.smartExtension
                              : landingImages.news.precisionAgriculture
                          )}
                        />
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────────── */}
        <footer className="full-width py-[100px] bg-surface-container-lowest border-t border-outline-variant/20 flat no shadows">
          <div className="max-w-[1280px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="md:col-span-1 flex flex-col">
              <img
                alt={c.footer.brandName}
                className="h-16 w-auto object-contain mb-6"
                src={img(landingImages.logo)}
              />
              <span className="font-headline-lg text-xl font-bold text-primary mb-4 block">
                {c.footer.brandName}
              </span>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">
                {c.footer.copyright}
              </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 md:pt-0">
              {c.footer.links.map((link) => (
                <div key={link.label} className="flex flex-col space-y-4">
                  <a
                    className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-200"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

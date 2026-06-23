/* eslint-disable @next/next/no-img-element */

import "./landing-v6.css";

export default function LandingV6Page() {
  return (
    <>
      {/* Skip to main */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <div id="main-content">
        {/* ─── TopNavBar ───────────────────────────────────────────────── */}
        <nav className="docked full-width top-0 sticky z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 flat no shadows transition-all duration-300">
          <div className="max-w-[1280px] mx-auto px-margin-desktop flex items-center justify-between h-20">
            {/* Brand */}
            <a
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 active:scale-98"
              href="#"
            >
              <img
                alt="Maejo Agricultural Research Logo"
                className="h-12 w-auto object-contain"
                src="/images/logorae3.jpg"
              />
              <div className="hidden md:flex flex-col">
                <span className="font-headline-md font-bold text-primary leading-tight tracking-tight">
                  Maejo University
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant tracking-widest uppercase">
                  Research &amp; Extension (RAE)
                </span>
              </div>
            </a>
            {/* Links (Desktop) */}
            <div className="hidden md:flex space-x-8 items-center">
              <a
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                href="#"
              >
                Research
              </a>
              <a
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                href="#"
              >
                Innovation
              </a>
              <a
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                href="#"
              >
                Extension
              </a>
              <a
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                href="#"
              >
                Impact
              </a>
              <a
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-98"
                href="#"
              >
                About
              </a>
            </div>
            {/* Actions */}
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
                Quick Access
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Hero Section ────────────────────────────────────────────── */}
        <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-black">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-surface-variant opacity-80 mix-blend-screen">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="/images/drone4.jpg"
              style={{ filter: "contrast(1.1) brightness(0.9)" }}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          {/* Hero Watermark */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              alt=""
              className="w-[800px] h-auto object-contain"
              src="/images/logorae3.jpg"
            />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 md:grid-cols-12 gap-gutter pt-20">
            <div className="md:col-span-10 lg:col-span-8 flex flex-col items-start justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-secondary-container"></span>
                <span className="font-label-sm text-label-sm text-secondary-container tracking-widest uppercase">
                  Office of Agricultural Research &amp; Extension
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-white mb-6 text-balance leading-tight">
                Research, Knowledge, <br />
                <span className="text-white/80 italic font-light">
                  and Impact for Society
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-white/80 mb-12 max-w-2xl text-xl leading-relaxed">
                Empowering the future of agriculture through research
                excellence, academic services, and dedicated community extension
                from Maejo University.
              </p>
              <div className="flex flex-wrap gap-5">
                <button className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1 shadow-xl tracking-wide">
                  Explore Our Work
                </button>
                <button className="bg-transparent text-white border border-white/30 font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center gap-3 tracking-wide backdrop-blur-sm">
                  Academic Services{" "}
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
            <div className="p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                &mdash;
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                Research Projects
              </span>
            </div>
            <div className="p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                ...
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                Academic Services
              </span>
            </div>
            <div className="p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                &mdash;
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                Knowledge Resources
              </span>
            </div>
            <div className="p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                ...
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                Community Programs
              </span>
            </div>
            <div className="p-8 flex flex-col items-start justify-center group hover:bg-surface-container-lowest transition-colors duration-500 relative overflow-hidden col-span-2 md:col-span-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="font-headline-xl text-4xl text-primary font-bold tracking-tight">
                &mdash;
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mt-3">
                Strategic Partnerships
              </span>
            </div>
          </div>
        </section>

        {/* ─── RAE at a Glance ─────────────────────────────────────────── */}
        <section className="bg-surface py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 text-center">
              <span className="font-label-sm text-primary tracking-widest uppercase mb-4 block">
                Institutional Pillars
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                RAE at a Glance
              </h2>
              <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 premium-shadow relative">
                  <img
                    alt="Research Excellence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="/images/drone5.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Research Excellence
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">
                  Driving fundamental and applied agricultural science to solve
                  global challenges through rigorous methodologies and
                  state-of-the-art facilities.
                </p>
              </div>
              {/* Pillar 2 */}
              <div className="flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 premium-shadow relative">
                  <img
                    alt="Academic Services"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="/images/drone6.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Academic Services
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">
                  Translating complex research data into accessible knowledge,
                  technical training, and advisory services for the agricultural
                  sector.
                </p>
              </div>
              {/* Pillar 3 */}
              <div className="flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 premium-shadow relative">
                  <img
                    alt="Community Impact"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="/images/drone4.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Community Impact
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">
                  Empowering local farmers and cooperatives through active
                  extension programs, ensuring academic innovation reaches the
                  fields.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Research to Community Storytelling ──────────────────────── */}
        <section className="bg-surface-container-low py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                  From Research to Community
                </h2>
                <div className="w-16 h-1 bg-primary mb-8"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 text-lg">
                  Our mandate goes beyond discovery. We ensure that every
                  breakthrough in the lab translates into tangible, sustainable
                  practices on the ground. This is the Maejo extension
                  philosophy.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-container text-3xl">
                      science
                    </span>
                    <span className="font-headline-lg text-xl">
                      Research Discovery
                    </span>
                  </div>
                  <div className="ml-4 w-px h-8 bg-outline-variant/50"></div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-container text-3xl">
                      school
                    </span>
                    <span className="font-headline-lg text-xl">
                      Knowledge Synthesis
                    </span>
                  </div>
                  <div className="ml-4 w-px h-8 bg-outline-variant/50"></div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-container text-3xl">
                      handshake
                    </span>
                    <span className="font-headline-lg text-xl">
                      Community Extension
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden premium-shadow aspect-[16/10] group">
                <img
                  alt="Research to Community"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  src="/images/9.jpg"
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
                  Editorial Showcase
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
                  Pioneering Fields of Study
                </h2>
                <div className="w-16 h-1 bg-secondary-container mb-6"></div>
              </div>
              <button className="bg-transparent text-primary border border-primary font-label-sm text-label-sm px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                View All Disciplines
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Feature 1: Large Asymmetric */}
              <div className="md:col-span-8 group relative rounded-2xl overflow-hidden aspect-[16/10] premium-shadow cursor-pointer">
                <img
                  alt="Integrated Agricultural Research"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/images/drone6.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 flex flex-col justify-end w-full md:w-3/4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-[10px] uppercase tracking-widest rounded-full">
                      Research
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-3xl md:text-4xl text-white mb-4 leading-tight group-hover:text-secondary-container transition-colors">
                    Integrated Agricultural Research
                  </h3>
                  <p className="font-body-md text-white/80 line-clamp-2">
                    Driving fundamental and applied agricultural science to
                    solve global challenges through rigorous methodologies and
                    state-of-the-art facilities.
                  </p>
                </div>
              </div>
              {/* Feature 2: Side Feature */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <div className="group relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full premium-shadow cursor-pointer">
                  <img
                    alt="Professional Academic Services"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src="/images/drone5.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary text-white font-label-sm text-[10px] uppercase tracking-widest rounded-full">
                        Services
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-2xl text-white mb-3 leading-tight group-hover:text-secondary-container transition-colors">
                      Professional Academic Services
                    </h3>
                  </div>
                </div>
              </div>
              {/* Feature 3: Standard */}
              <div className="md:col-span-4 group bg-surface rounded-2xl overflow-hidden premium-shadow border border-outline-variant/10 cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt="Knowledge Transfer &amp; Extension"
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/images/7.jpg"
                />
                <div className="p-8">
                  <span className="text-primary font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                    Extension
                  </span>
                  <h3 className="font-headline-lg text-2xl text-on-surface mb-4">
                    Knowledge Transfer &amp; Extension
                  </h3>
                  <p className="font-body-md text-on-surface-variant mb-6 text-sm">
                    Empowering local farmers and cooperatives through active
                    extension programs, ensuring academic innovation reaches the
                    fields.
                  </p>
                  <span className="text-primary font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More{" "}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
              {/* Feature 4: Standard */}
              <div className="md:col-span-4 group bg-surface rounded-2xl overflow-hidden premium-shadow border border-outline-variant/10 cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt="Farmer Engagement Programs"
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/images/2.jpg"
                />
                <div className="p-8">
                  <span className="text-primary font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                    Community
                  </span>
                  <h3 className="font-headline-lg text-2xl text-on-surface mb-4">
                    Farmer Engagement Programs
                  </h3>
                  <p className="font-body-md text-on-surface-variant mb-6 text-sm">
                    Translating academic models into mobile-accessible insights
                    for regional cooperatives.
                  </p>
                  <span className="text-primary font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More{" "}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
              {/* Feature 5: Standard */}
              <div className="md:col-span-4 group bg-primary rounded-2xl overflow-hidden premium-shadow cursor-pointer hover:-translate-y-1 transition-transform duration-300 relative">
                <img
                  alt="Community Development Initiatives"
                  className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/images/6.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="p-8 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="text-secondary-container font-label-sm text-[10px] uppercase tracking-widest mb-3 block">
                      Development
                    </span>
                    <h3 className="font-headline-lg text-2xl text-white mb-4">
                      Community Development Initiatives
                    </h3>
                    <p className="font-body-md text-white/80 mb-6 text-sm">
                      Integrating hardware sensors with predictive weather
                      models for hyper-efficient water use.
                    </p>
                  </div>
                  <span className="text-secondary-container font-label-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Read More{" "}
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
        <section className="bg-inverse-surface py-[120px] overflow-hidden text-on-primary relative">
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
                  Integrated Platform
                </span>
                <h2 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">
                  Knowledge Ecosystem
                </h2>
                <p className="font-body-lg text-white/70 mb-10 text-lg font-light">
                  Access our centralized digital infrastructure connecting
                  academic research, extension documents, learning modules, and
                  institutional initiatives in one seamless experience to
                  reinforce our Research to Impact narrative.
                </p>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-center gap-4 text-white/90">
                    <span className="material-symbols-outlined text-secondary-container">
                      menu_book
                    </span>
                    <span className="font-label-sm uppercase tracking-wider">
                      Research Portal &amp; Document Center
                    </span>
                  </li>
                  <li className="flex items-center gap-4 text-white/90">
                    <span className="material-symbols-outlined text-secondary-container">
                      school
                    </span>
                    <span className="font-label-sm uppercase tracking-wider">
                      Learning Center
                    </span>
                  </li>
                  <li className="flex items-center gap-4 text-white/90">
                    <span className="material-symbols-outlined text-secondary-container">
                      eco
                    </span>
                    <span className="font-label-sm uppercase tracking-wider">
                      Green Office Initiative
                    </span>
                  </li>
                </ul>
                <button className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300 w-max tracking-wide shadow-lg">
                  Enter Ecosystem
                </button>
              </div>
              <div className="lg:col-span-7 relative group perspective-1000">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-black">
                  <img
                    alt="Knowledge Ecosystem Visualization"
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    src="/images/drone4.jpg"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-container rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Signature Experience ─────────────────────────────────────── */}
        <section className="relative full-width min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
          {/* Background Visual */}
          <div className="absolute inset-0 z-0">
            <img
              alt="The Pulse of Innovation"
              className="w-full h-full object-cover opacity-60"
              src="/images/drone5.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
          </div>
          {/* Content Overlay */}
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full">
            <div className="flex flex-col items-center text-center">
              {/* Subtle Logo Accent */}
              <div className="mb-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
                <img
                  alt="Maejo Logo"
                  className="h-16 w-auto grayscale brightness-200"
                  src="/images/logorae3.jpg"
                />
              </div>
              <span className="font-label-sm text-secondary-container tracking-[0.3em] uppercase mb-6 block">
                The Pulse of Innovation
              </span>
              <h2 className="font-display-lg text-display-lg md:text-[84px] leading-[1.05] mb-8 max-w-4xl">
                From Discovery <br />
                <span className="italic font-light text-white/70">
                  to Community
                </span>
              </h2>
              <p className="font-body-lg text-white/80 max-w-2xl text-xl leading-relaxed mb-8">
                Empowering the future of agriculture through research
                excellence, academic services, and dedicated community extension
                from Maejo University.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex flex-col items-center">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-white/50 mb-2">
                    National-Level Contribution
                  </span>
                  <div className="h-px w-12 bg-primary"></div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-white/50 mb-2">
                    Data-Driven Impact
                  </span>
                  <div className="h-px w-12 bg-secondary-container"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── News & Insights / Editorial Briefings ────────────────────── */}
        <section className="bg-surface-bright py-[120px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant/30 pb-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
                  News &amp; Insights
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
                  Latest publications, methodological breakthroughs, and
                  institutional announcements from our research teams.
                </p>
              </div>
              <button className="text-primary font-label-sm text-label-sm hover:text-primary-container transition-all duration-300 flex items-center gap-2 uppercase tracking-widest">
                Go to Newsroom{" "}
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
                    alt="Lab Research Breakthrough"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="/images/drone6.jpg"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                    Extension Activity
                  </span>
                  <span className="font-label-sm text-on-surface-variant">
                    Oct 24, 2024
                  </span>
                </div>
                <h3 className="font-headline-xl text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
                  Latest Field Training Workshop for Local Organic Farmers
                </h3>
                <p className="font-body-lg text-on-surface-variant mb-6 text-lg font-light leading-relaxed">
                  A decade-long study reveals novel bacterial consortia capable
                  of significantly buffering root systems against prolonged
                  high-temperature exposure in tropical climates.
                </p>
                <div className="flex items-center text-on-surface font-label-sm text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2 hover:gap-3 transition-all text-primary">
                    Read Full Paper{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
              {/* Recent Dispatches List */}
              <div className="lg:col-span-5 flex flex-col gap-0 border-t lg:border-t-0 border-outline-variant/30">
                {/* Dispatch 1 */}
                <a
                  className="group py-8 border-b border-outline-variant/30 first:pt-0 flex gap-6 items-center"
                  href="#"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-label-sm text-[10px] text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded uppercase tracking-widest">
                        Research Highlight
                      </span>
                      <span className="font-label-sm text-xs text-on-surface-variant">
                        Oct 18, 2024
                      </span>
                    </div>
                    <h5 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                      Sustainable Rice Cultivation Systems for Regional
                      Resilience
                    </h5>
                    <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm">
                      Securing $4M to expand multi-site testing of
                      low-methane emitting paddy cultivation techniques.
                    </p>
                  </div>
                  <div className="hidden sm:block w-28 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      alt="Smart Extension"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="/images/drone4.jpg"
                    />
                  </div>
                </a>
                {/* Dispatch 2 */}
                <a
                  className="group py-8 border-b border-outline-variant/30 flex gap-6 items-center"
                  href="#"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-label-sm text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">
                        Training Program
                      </span>
                      <span className="font-label-sm text-xs text-on-surface-variant">
                        Oct 12, 2024
                      </span>
                    </div>
                    <h5 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                      Upcoming Professional Certification in Precision
                      Agriculture
                    </h5>
                    <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm">
                      New Python library released for researchers to streamline
                      LiDAR point cloud processing of orchard systems.
                    </p>
                  </div>
                  <div className="hidden sm:block w-28 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      alt="Precision Agriculture"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="/images/drone5.jpg"
                    />
                  </div>
                </a>
                {/* Dispatch 3 */}
                <a className="group py-8 flex gap-6 items-center" href="#">
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-label-sm text-[10px] text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded uppercase tracking-widest">
                        Community Project
                      </span>
                      <span className="font-label-sm text-xs text-on-surface-variant">
                        Oct 05, 2024
                      </span>
                    </div>
                    <h5 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                      Maejo RAE Partners with Regional Cooperatives for
                      Value-Added Production
                    </h5>
                    <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm">
                      Join global experts at Maejo University for a three-day
                      summit on climate-adaptive agriculture.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────────── */}
        <footer className="full-width py-[100px] bg-surface-container-lowest border-t border-outline-variant/20 flat no shadows">
          <div className="max-w-[1280px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="md:col-span-1 flex flex-col">
              <img
                alt="Maejo Logomark"
                className="h-16 w-auto object-contain mb-6"
                src="/images/logorae3.jpg"
              />
              <span className="font-headline-lg text-xl font-bold text-primary mb-4 block">
                Maejo Research RAE
              </span>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">
                &copy; 2024 Maejo University Agricultural Research &amp;
                Extension. Precision in Growth.
              </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 md:pt-0">
              {/* Navigation links */}
              <div className="flex flex-col space-y-4">
                <a
                  className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
              <div className="flex flex-col space-y-4">
                <a
                  className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Terms of Research
                </a>
              </div>
              <div className="flex flex-col space-y-4">
                <a
                  className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Ethics
                </a>
              </div>
              <div className="flex flex-col space-y-4">
                <a
                  className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-200"
                  href="#"
                >
                  Annual Report
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

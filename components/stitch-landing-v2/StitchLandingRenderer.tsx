"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { stitchLanding } from "@/content/stitch-landing";
import type { Locale } from "@/lib/locale";
import { assetPath } from "@/lib/assetPath";
import { SearchIcon, HamburgerIcon, ArrowIcon } from "./icons/index";
import { HeroSection } from "./HeroSection";
import { ServiceCards } from "./ServiceCards";
import { ResearchInnovationSection } from "./ResearchInnovationSection";
import { StatisticsSection } from "./StatisticsSection";
import { ContentSection } from "./ContentSection";
import { KnowledgeResources } from "./KnowledgeResources";
import { PartnersSection } from "./PartnersSection";
import { SiteFooter } from "./SiteFooter";

type Props = { locale: Locale };

export default function StitchLandingRenderer({ locale }: Props) {
  const c = stitchLanding[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        {locale === "th" ? "ข้ามไปยังเนื้อหาหลัก" : "Skip to main content"}
      </a>

      <div id="main-content">
        {/* ─── Header (Stitch white layout) ───────────────── */}
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
          {/* Top Utility Bar — white bg, gray text */}
          <div className="border-b border-gray-200">
            <div className="container mx-auto px-4 h-9 flex justify-end items-center gap-4 text-xs">
              <a
                href={c.topBar.loginHref}
                className="text-gray-600 hover:text-brand-primary transition-colors"
              >
                {c.topBar.loginLabel}
              </a>
              <span className="text-gray-300">|</span>
              <a
                href={c.topBar.altLocaleHref}
                className="text-gray-600 hover:text-brand-primary transition-colors"
              >
                {c.topBar.altLocaleLabel}
              </a>
            </div>
          </div>

          {/* Main Nav — white bg, dark text */}
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo — left */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                <img
                  alt={c.nav.logoAlt}
                  src={assetPath("/images/logorae.png")}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-bold leading-tight block text-gray-800 whitespace-pre-line">
                  {c.nav.siteSubtitle}
                </span>
              </div>
            </a>

            {/* Nav Links — center */}
            <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
              {c.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={
                    link.isActive
                      ? "text-brand-gold border-b-2 border-brand-gold pb-0.5"
                      : "text-gray-700 hover:text-brand-primary transition-colors"
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder={c.nav.searchPlaceholder}
                className="w-48 rounded-full py-1.5 px-4 pr-10 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold border border-gray-300 placeholder:text-gray-400"
                aria-label={c.nav.searchPlaceholder}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                aria-label={c.nav.searchPlaceholder}
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Dropdown — white bg */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {c.nav.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={
                      link.isActive
                        ? "text-brand-gold font-medium"
                        : "text-gray-700 hover:text-brand-primary transition-colors"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder={c.nav.searchPlaceholder}
                    className="w-full rounded-full py-1.5 px-4 pr-10 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold border border-gray-300 placeholder:text-gray-400"
                    aria-label={c.nav.searchPlaceholder}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    aria-label={c.nav.searchPlaceholder}
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ─── Hero ─────────────────────────────────────────── */}
        <HeroSection c={c} />

        {/* ─── Research & Innovation ─────────────────────────── */}
        <ResearchInnovationSection />

        {/* ─── Services ─────────────────────────────────────── */}
        <ServiceCards c={c} />

        {/* ─── Statistics ───────────────────────────────────── */}
        <StatisticsSection c={c} />

        {/* ─── Content: Research + News ─────────────────────── */}
        <ContentSection c={c} />

        {/* ─── Knowledge Resources ──────────────────────────── */}
        <KnowledgeResources c={c} />

        {/* ─── Partners ─────────────────────────────────────── */}
        <PartnersSection c={c} />

        {/* ─── Footer ───────────────────────────────────────── */}
        <SiteFooter c={c} locale={locale} />
      </div>
    </>
  );
}

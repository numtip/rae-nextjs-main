import type { HomeSectionId } from "@/data/home-sections";
import { homeSectionOrder } from "@/data/home-sections";
import type { Locale } from "@/lib/locale";
import type { ReactElement } from "react";
import DocumentsCTA from "./DocumentsCTA";
import GreenOfficeSection from "./GreenOfficeSection";
import Hero from "./Hero";
import { HeroVariantA, HeroVariantB, HeroVariantC } from "./hero/index";
import KpiImpactStrip from "./KpiImpactStrip";
import NewsHighlights from "./NewsHighlights";
import QuickLinks from "./QuickLinks";
import ResearchSystemsCTA from "./ResearchSystemsCTA";
import ServicesOverview from "./ServicesOverview";

type Props = {
  locale: Locale;
};

/** Resolve the active motion variant from env */
function resolveHeroVariant(): "A" | "B" | "C" | null {
  const enabled = process.env.NEXT_PUBLIC_HERO_MOTION_PREVIEW === "true";
  if (!enabled) return null;
  const variant = process.env.NEXT_PUBLIC_HERO_MOTION_VARIANT;
  if (variant === "B") return "B";
  if (variant === "C") return "C";
  return "A";
}

const motionVariant = resolveHeroVariant();

const variantMap: Record<"A" | "B" | "C", (locale: Locale) => ReactElement> = {
  A: (locale) => <HeroVariantA locale={locale} />,
  B: (locale) => <HeroVariantB locale={locale} />,
  C: (locale) => <HeroVariantC locale={locale} />,
};

const sectionComponents: Record<HomeSectionId, (locale: Locale) => ReactElement> = {
  hero: motionVariant
    ? variantMap[motionVariant]
    : (locale) => <Hero locale={locale} />,
  "quick-links": (locale) => <QuickLinks locale={locale} />,
  "services-overview": (locale) => <ServicesOverview locale={locale} />,
  "research-systems-cta": (locale) => <ResearchSystemsCTA locale={locale} />,
  "kpi-impact": (locale) => <KpiImpactStrip locale={locale} />,
  "news-highlights": (locale) => <NewsHighlights locale={locale} />,
  "documents-cta": (locale) => <DocumentsCTA locale={locale} />,
  "green-office": (locale) => <GreenOfficeSection locale={locale} />,
};

export default function HomeSectionRenderer({ locale }: Props) {
  return (
    <>
      {homeSectionOrder.map((id) => (
        <div key={id} data-home-section={id}>
          {sectionComponents[id](locale)}
        </div>
      ))}
    </>
  );
}

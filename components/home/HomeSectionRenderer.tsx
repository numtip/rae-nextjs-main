import type { HomeSectionId } from "@/data/home-sections";
import { homeSectionOrder } from "@/data/home-sections";
import type { Locale } from "@/lib/locale";
import type { ReactElement } from "react";
import DocumentsCTA from "./DocumentsCTA";
import GreenOfficeSection from "./GreenOfficeSection";
import Hero from "./Hero";
import KpiImpactStrip from "./KpiImpactStrip";
import NewsHighlights from "./NewsHighlights";
import QuickLinks from "./QuickLinks";
import ResearchSystemsCTA from "./ResearchSystemsCTA";
import ServicesOverview from "./ServicesOverview";

type Props = {
  locale: Locale;
};

const sectionComponents: Record<HomeSectionId, (locale: Locale) => ReactElement> = {
  hero: (locale) => <Hero locale={locale} />,
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

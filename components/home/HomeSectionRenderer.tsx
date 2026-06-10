import DocumentsCTA from "@/components/DocumentsCTA";
import GreenOfficeSection from "@/components/GreenOfficeSection";
import Hero from "@/components/Hero";
import NewsHighlights from "@/components/NewsHighlights";
import QuickLinks from "@/components/QuickLinks";
import ResearchSystemsCTA from "@/components/ResearchSystemsCTA";
import ServicesOverview from "@/components/ServicesOverview";
import type { HomeSectionId } from "@/data/home-sections";
import { homeSectionOrder } from "@/data/home-sections";
import type { Locale } from "@/lib/locale";
import type { ReactElement } from "react";

type Props = {
  locale: Locale;
};

const sectionComponents: Record<HomeSectionId, (locale: Locale) => ReactElement> = {
  hero: (locale) => <Hero locale={locale} />,
  "quick-links": (locale) => <QuickLinks locale={locale} />,
  "services-overview": (locale) => <ServicesOverview locale={locale} />,
  "research-systems-cta": (locale) => <ResearchSystemsCTA locale={locale} />,
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

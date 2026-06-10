import Link from "next/link";
import { serviceCards, servicesSection } from "@/data/servicesOverview";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

const servicePaths = ["/research-services/", "/academic-services/", "/research-systems/"] as const;

const learnMoreLabel: Record<Locale, string> = {
  th: "ดูรายละเอียดบริการ",
  en: "View service details",
};

export default function ServicesOverview({ locale }: { locale: Locale }) {
  const sec = servicesSection[locale];
  const cards = serviceCards[locale];

  return (
    <section
      className="section-block services-section"
      id="services-overview"
      aria-labelledby="services-overview-heading"
    >
      <h2 id="services-overview-heading" className="section-heading">
        {sec.heading}
      </h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-three services-grid">
        {cards.map((card, index) => {
          const href = withLocale(locale, servicePaths[index]);
          const ctaLabel = `${learnMoreLabel[locale]}: ${card.title}`;
          return (
            <article key={card.title} className="card-panel service-card">
              <h3 className="panel-title">{card.title}</h3>
              <p className="panel-text">{card.text}</p>
              <Link href={href} className="service-card-cta" aria-label={ctaLabel}>
                <span className="service-card-cta-label">{learnMoreLabel[locale]}</span>
                <span className="service-card-chevron" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

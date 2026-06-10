import { serviceCards, servicesSection } from "@/data/servicesOverview";
import type { Locale } from "@/lib/locale";

export default function ServicesOverview({ locale }: { locale: Locale }) {
  const sec = servicesSection[locale];
  const cards = serviceCards[locale];

  return (
    <section className="section-block" id="services-overview">
      <h2 className="section-heading">{sec.heading}</h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-three">
        {cards.map((card) => (
          <article key={card.title} className="card-panel">
            <h3 className="panel-title">{card.title}</h3>
            <p className="panel-text">{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { ServiceRecord } from "@/data/content-models";
import type { Locale } from "@/lib/locale";
import { localizeService } from "@/lib/services-i18n";

const labels: Record<Locale, { sectionAria: string; steps: string; contact: string }> = {
  th: {
    sectionAria: "รายการบริการ",
    steps: "ขั้นตอนการดำเนินการ",
    contact: "จุดติดต่อ",
  },
  en: {
    sectionAria: "Service listings",
    steps: "How it works",
    contact: "Contact",
  },
};

export default function ServiceCatalog({
  locale,
  services,
}: {
  locale: Locale;
  services: ServiceRecord[];
}) {
  const ui = labels[locale];

  return (
    <section className="section-block service-catalog" aria-label={ui.sectionAria}>
      <div className="service-catalog-grid">
        {services.map((record) => {
          const s = localizeService(record, locale);
          return (
            <article key={record.name} className="card-panel service-record">
              <h2 className="panel-title service-record-title">{s.name}</h2>
              <p className="panel-text service-record-desc">{s.description}</p>
              <h3 className="service-record-steps-heading">{ui.steps}</h3>
              <ol className="service-steps">
                {s.steps.map((step, i) => (
                  <li key={i} className="service-step-item">
                    {step}
                  </li>
                ))}
              </ol>
              <p className="panel-text service-contact">
                <span className="service-contact-label">{ui.contact}</span>
                {": "}
                {s.contact_point}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

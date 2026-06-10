import { kpiImpactSection, kpiMetrics } from "@/data/kpiImpact";
import type { Locale } from "@/lib/locale";

export default function KpiImpactStrip({ locale }: { locale: Locale }) {
  const sec = kpiImpactSection[locale];

  return (
    <section className="section-block kpi-strip" id="impact-metrics">
      <h2 className="section-heading">{sec.heading}</h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-four">
        {kpiMetrics.map((metric) => (
          <article
            key={metric.label.en}
            className={`kpi-card${metric.highlight ? " kpi-card-highlight" : ""}`}
          >
            <p className="kpi-value">{metric.value}</p>
            <p className="kpi-label">{metric.label[locale]}</p>
            {metric.context ? <p className="kpi-context">{metric.context[locale]}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

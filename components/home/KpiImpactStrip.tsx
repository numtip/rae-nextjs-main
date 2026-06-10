import { kpiImpactSection, kpiMetrics, kpiStripMeta } from "@/data/kpiImpact";
import type { Locale } from "@/lib/locale";

export default function KpiImpactStrip({ locale }: { locale: Locale }) {
  const sec = kpiImpactSection[locale];
  const noticeId = "kpi-placeholder-notice";

  return (
    <section
      className="section-block kpi-strip"
      id="impact-metrics"
      aria-describedby={noticeId}
      data-kpi-source={kpiStripMeta.source}
      data-kpi-status={kpiStripMeta.status}
    >
      <h2 className="section-heading">{sec.heading}</h2>
      <p className="section-subtext">{sec.subtext}</p>
      <p id={noticeId} className="kpi-placeholder-notice" role="note">
        {sec.placeholderNotice}
      </p>
      <div className="grid-four">
        {kpiMetrics.map((metric) => (
          <article
            key={metric.label.en}
            className={`kpi-card${metric.highlight ? " kpi-card-highlight" : ""}`}
            data-kpi-source={metric.source}
            data-kpi-status={metric.status}
          >
            <p className="kpi-value" aria-label={`${metric.label[locale]}: ${metric.value}`}>
              {metric.value}
            </p>
            <p className="kpi-label">{metric.label[locale]}</p>
            {metric.context ? <p className="kpi-context">{metric.context[locale]}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

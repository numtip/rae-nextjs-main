import type { Locale } from "@/lib/locale";
import { formatDocumentDate } from "../format";
import { uiLabels } from "../labels";

type Props = {
  locale: Locale;
  totalDocuments: number;
  totalCategories: number;
  latestUpdated: string;
  fileTypeCount: number;
};

export default function DocumentKpiStrip({
  locale,
  totalDocuments,
  totalCategories,
  latestUpdated,
  fileTypeCount,
}: Props) {
  const labels = uiLabels[locale];

  const items = [
    { label: labels.kpiDocuments, value: String(totalDocuments) },
    { label: labels.kpiCategories, value: String(totalCategories) },
    {
      label: labels.kpiLatest,
      value: formatDocumentDate(latestUpdated, locale),
    },
    { label: labels.kpiFileTypes, value: String(fileTypeCount) },
  ];

  return (
    <section className="dc-section" aria-label={labels.kpiDocuments}>
      <div className="dc-kpi-strip">
        {items.map((item) => (
          <div key={item.label} className="dc-kpi-card">
            <p className="dc-kpi-value">{item.value}</p>
            <p className="dc-kpi-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

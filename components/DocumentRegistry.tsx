import type { DocumentRecord } from "@/data/content-models";
import { documentRegistry } from "@/data/documents";
import { docTableLabels } from "@/data/doc-table-ui";
import { localizeDocument } from "@/lib/documents-i18n";
import type { Locale } from "@/lib/locale";

function formatUpdated(isoDate: string, locale: Locale): string {
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function DocumentRegistry({
  locale,
  items = documentRegistry,
}: {
  locale: Locale;
  items?: DocumentRecord[];
}) {
  const labels = docTableLabels[locale];

  return (
    <section className="section-block document-registry" aria-labelledby="document-registry-heading">
      <h2 id="document-registry-heading" className="section-heading">
        {labels.registryTitle}
      </h2>
      <p className="section-subtext">{labels.registrySub}</p>
      <div className="doc-table-wrap card-panel">
        <table className="doc-table">
          <thead>
            <tr>
              <th scope="col">{labels.colName}</th>
              <th scope="col">{labels.colCategory}</th>
              <th scope="col">{labels.colType}</th>
              <th scope="col">{labels.colVersion}</th>
              <th scope="col">{labels.colUpdated}</th>
              <th scope="col">{labels.colFile}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => {
              const r = localizeDocument(row, locale);
              return (
                <tr key={r.name + r.version}>
                  <td className="doc-name">{r.name}</td>
                  <td>{r.category}</td>
                  <td>{r.type}</td>
                  <td>
                    <span className="doc-version">v{r.version}</span>
                  </td>
                  <td>
                    <time dateTime={r.updated_at}>{formatUpdated(r.updated_at, locale)}</time>
                  </td>
                  <td>
                    <a href={r.file_url} className="doc-download" download>
                      {labels.download}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

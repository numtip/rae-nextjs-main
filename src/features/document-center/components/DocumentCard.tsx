import Link from "next/link";
import type { DocumentRecord } from "../types";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { getCategoryById } from "../data";
import { formatDocumentDate } from "../format";
import { uiLabels } from "../labels";
import DocumentBadge from "./DocumentBadge";

type Props = {
  locale: Locale;
  document: DocumentRecord;
};

export default function DocumentCard({ locale, document }: Props) {
  const labels = uiLabels[locale];
  const category = getCategoryById(document.category);
  const categoryName =
    locale === "th"
      ? (category?.name_th ?? document.category)
      : (category?.name_en ?? document.category);
  const detailHref = withLocale(locale, `/documents/document/${document.id}`);
  const visibleTags = document.tags.slice(0, 3);
  const extraTags = document.tags.length - visibleTags.length;
  const downloadLabel = `${labels.download} ${document.file_type.toUpperCase()}`;
  const downloadAria = `${labels.download} ${document.title} v${document.version} (${document.file_type})`;

  return (
    <article className="card-panel dc-doc-card">
      <div className="dc-doc-card-header">
        <span className="dc-file-type">{document.file_type}</span>
        <DocumentBadge kind="visibility" value={document.visibility} locale={locale} />
      </div>

      <h3 className="dc-doc-title">
        <Link href={detailHref}>{document.title}</Link>
      </h3>

      <div className="dc-badge-row">
        <span className="dc-tag">{categoryName}</span>
        <DocumentBadge kind="status" value={document.status} locale={locale} />
      </div>

      <p className="dc-doc-meta">
        {document.owner} · v{document.version} ·{" "}
        <time dateTime={document.updated_date}>
          {formatDocumentDate(document.updated_date, locale)}
        </time>
      </p>

      {document.tags.length > 0 && (
        <div className="dc-tag-row">
          {visibleTags.map((tag) => (
            <Link
              key={tag}
              href={withLocale(locale, `/documents/search?q=${encodeURIComponent(tag)}`)}
              className="dc-tag"
            >
              {tag}
            </Link>
          ))}
          {extraTags > 0 && <span className="dc-doc-meta">+{extraTags}</span>}
        </div>
      )}

      <div className="dc-doc-actions">
        {document.storage_url ? (
          <a
            href={document.storage_url}
            className="dc-btn dc-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={downloadAria}
          >
            {downloadLabel}
          </a>
        ) : (
          <span
            className="dc-btn dc-btn-primary"
            aria-disabled="true"
            title={labels.warningNoLink}
          >
            {downloadLabel}
          </span>
        )}
        <Link href={detailHref} className="dc-btn dc-btn-secondary">
          {labels.details}
        </Link>
      </div>
    </article>
  );
}

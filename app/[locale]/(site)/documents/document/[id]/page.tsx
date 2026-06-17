import Link from "next/link";
import DocumentBadge from "@/src/features/document-center/components/DocumentBadge";
import DocumentCard from "@/src/features/document-center/components/DocumentCard";
import {
  getAllDocuments,
  getCategoryById,
  getDocumentById,
  getRelatedDocuments,
} from "@/src/features/document-center/data";
import { formatDocumentDate } from "@/src/features/document-center/format";
import { uiLabels } from "@/src/features/document-center/labels";
import { isLocale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return getAllDocuments().map((doc) => ({ id: doc.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, id } = await params;
  if (!isLocale(l)) return {};
  const doc = getDocumentById(id);
  if (!doc) return {};
  return buildPageMetadata({
    locale: l,
    segment: `documents/document/${id}`,
    title: doc.title,
    description: doc.note ?? doc.title,
  });
}

function DocumentWarnings({
  locale,
  doc,
}: {
  locale: "th" | "en";
  doc: NonNullable<ReturnType<typeof getDocumentById>>;
}) {
  const labels = uiLabels[locale];
  const warnings: { key: string; className: string; text: string }[] = [];

  if (doc.status === "obsolete") {
    warnings.push({
      key: "obsolete",
      className: "dc-warning--obsolete",
      text: labels.warningObsolete,
    });
  }
  if (doc.status === "archived") {
    warnings.push({
      key: "archived",
      className: "dc-warning--archived",
      text: labels.warningArchived,
    });
  }
  if (doc.status === "draft") {
    warnings.push({
      key: "draft",
      className: "dc-warning--draft",
      text: labels.warningDraft,
    });
  }
  if (doc.visibility === "restricted") {
    warnings.push({
      key: "restricted",
      className: "dc-warning--restricted",
      text: labels.warningRestricted,
    });
  }
  if (!doc.storage_url) {
    warnings.push({
      key: "nolink",
      className: "dc-warning--nolink",
      text: labels.warningNoLink,
    });
  }

  if (warnings.length === 0) return null;

  return (
    <div className="dc-section" role="status">
      {warnings.map((w) => (
        <p key={w.key} className={`dc-warning ${w.className}`}>
          {w.text}
        </p>
      ))}
    </div>
  );
}

export default async function DocumentDetailPage({ params }: Props) {
  const { locale: l, id } = await params;
  if (!isLocale(l)) notFound();

  const doc = getDocumentById(id);
  if (!doc) notFound();

  const labels = uiLabels[l];
  const category = getCategoryById(doc.category);
  const categoryName =
    l === "th"
      ? (category?.name_th ?? doc.category)
      : (category?.name_en ?? doc.category);
  const related = getRelatedDocuments(doc);
  const downloadLabel = `${labels.download} ${doc.file_type.toUpperCase()}`;
  const downloadAria = `${labels.download} ${doc.title} v${doc.version} (${doc.file_type})`;

  return (
    <>
      <nav className="dc-breadcrumb" aria-label="Breadcrumb">
        <Link href={withLocale(l, "/documents")}>{labels.heroTitle}</Link>
        {" › "}
        <Link href={withLocale(l, `/documents/category/${doc.category}`)}>
          {categoryName}
        </Link>
        {" › "}
        <span>{doc.title}</span>
      </nav>

      <DocumentWarnings locale={l} doc={doc} />

      <header className="dc-section">
        <h1 className="dc-page-title">{doc.title}</h1>
        <div className="dc-badge-row">
          <DocumentBadge kind="status" value={doc.status} locale={l} />
          <DocumentBadge kind="visibility" value={doc.visibility} locale={l} />
          <span className="dc-file-type">{doc.file_type}</span>
        </div>
      </header>

      <div className="dc-section">
        {doc.storage_url ? (
          <a
            href={doc.storage_url}
            className="dc-btn dc-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={downloadAria}
          >
            {downloadLabel}
          </a>
        ) : (
          <span className="dc-btn dc-btn-primary" aria-disabled="true">
            {downloadLabel}
          </span>
        )}
      </div>

      <section className="dc-section card-panel" aria-labelledby="dc-metadata-heading">
        <h2 id="dc-metadata-heading" className="section-heading">
          {labels.metadata}
        </h2>
        <dl className="dc-detail-grid">
          <div className="dc-detail-row">
            <dt>{labels.documentId}</dt>
            <dd>{doc.id}</dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.filterCategory}</dt>
            <dd>
              <Link href={withLocale(l, `/documents/category/${doc.category}`)}>
                {categoryName}
              </Link>
            </dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.owner}</dt>
            <dd>{doc.owner}</dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.version}</dt>
            <dd>v{doc.version}</dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.filterStatus}</dt>
            <dd>{doc.status}</dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.filterVisibility}</dt>
            <dd>{doc.visibility}</dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.updated}</dt>
            <dd>
              <time dateTime={doc.updated_date}>
                {formatDocumentDate(doc.updated_date, l)}
              </time>
            </dd>
          </div>
          <div className="dc-detail-row">
            <dt>{labels.onedrivePath}</dt>
            <dd className="dc-path-mono">{doc.onedrive_path}</dd>
          </div>
        </dl>
      </section>

      {doc.tags.length > 0 && (
        <section className="dc-section" aria-label="Tags">
          <div className="dc-tag-row">
            {doc.tags.map((tag) => (
              <Link
                key={tag}
                href={withLocale(l, `/documents/search?q=${encodeURIComponent(tag)}`)}
                className="dc-tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {doc.note && (
        <section className="dc-section card-panel" aria-labelledby="dc-note-heading">
          <h2 id="dc-note-heading" className="section-heading">
            {labels.note}
          </h2>
          <p className="panel-text">{doc.note}</p>
        </section>
      )}

      {related.length > 0 && (
        <section className="dc-section" aria-labelledby="dc-related-docs">
          <h2 id="dc-related-docs" className="section-heading">
            {labels.relatedDocuments}
          </h2>
          <div className="dc-doc-grid">
            {related.map((relatedDoc) => (
              <DocumentCard key={relatedDoc.id} locale={l} document={relatedDoc} />
            ))}
          </div>
        </section>
      )}

      <p className="dc-section">
        <Link href={withLocale(l, "/documents")} className="dc-btn dc-btn-secondary">
          {labels.backToHub}
        </Link>
      </p>
    </>
  );
}

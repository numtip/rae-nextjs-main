import Link from "next/link";
import DocumentCard from "@/src/features/document-center/components/DocumentCard";
import DocumentCategoryCard from "@/src/features/document-center/components/DocumentCategoryCard";
import DocumentHero from "@/src/features/document-center/components/DocumentHero";
import DocumentKpiStrip from "@/src/features/document-center/components/DocumentKpiStrip";
import {
  countDocumentsByCategory,
  getDocumentKpis,
  getDistinctFileTypes,
  getEnabledCategories,
  getPublicDocuments,
} from "@/src/features/document-center/data";
import { uiLabels } from "@/src/features/document-center/labels";
import { isLocale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const labels = uiLabels[l];
  return buildPageMetadata({
    locale: l,
    segment: "documents",
    title: labels.heroTitle,
    description: labels.heroSubtitle,
  });
}

export default async function DocumentsHubPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  const labels = uiLabels[l];
  const kpis = getDocumentKpis();
  const categories = getEnabledCategories();
  const documents = getPublicDocuments();
  const fileTypes = getDistinctFileTypes();
  const quickFilterTitle = l === "th" ? "ตัวกรองด่วน" : "Quick filters";

  return (
    <>
      <DocumentHero locale={l} />

      <DocumentKpiStrip
        locale={l}
        totalDocuments={kpis.totalDocuments}
        totalCategories={kpis.totalCategories}
        latestUpdated={kpis.latestUpdated}
        fileTypeCount={kpis.fileTypeCount}
      />

      <section className="dc-section" aria-labelledby="dc-quick-filters-heading">
        <h2 id="dc-quick-filters-heading" className="section-heading">
          {quickFilterTitle}
        </h2>
        <div className="dc-related-chips" aria-label={quickFilterTitle}>
          <Link href={withLocale(l, "/documents")} className="dc-related-chip">
            {labels.all}
          </Link>
          <Link href={withLocale(l, "/documents/search")} className="dc-related-chip">
            {labels.searchButton}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={withLocale(l, `/documents/category/${category.id}`)}
              className="dc-related-chip"
            >
              {l === "th" ? category.name_th : category.name_en}
            </Link>
          ))}
          {fileTypes.map((fileType) => (
            <Link
              key={fileType}
              href={withLocale(
                l,
                `/documents/search?file_type=${encodeURIComponent(fileType)}`,
              )}
              className="dc-related-chip"
            >
              {fileType.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <section className="dc-section" aria-labelledby="dc-categories-heading">
        <h2 id="dc-categories-heading" className="section-heading">
          {labels.categoriesTitle}
        </h2>
        <div className="dc-category-grid">
          {categories.map((category) => (
            <DocumentCategoryCard
              key={category.id}
              locale={l}
              category={category}
              documentCount={countDocumentsByCategory(category.id)}
            />
          ))}
        </div>
      </section>

      <section className="dc-section" aria-labelledby="dc-all-documents-heading">
        <h2 id="dc-all-documents-heading" className="section-heading">
          {labels.allDocumentsTitle}
        </h2>
        <div className="dc-doc-grid">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} locale={l} document={doc} />
          ))}
        </div>
        <p className="dc-section">
          <Link
            href={withLocale(l, "/documents/search")}
            className="dc-btn dc-btn-secondary"
          >
            {labels.viewAll}
          </Link>
        </p>
      </section>

      <section className="dc-section card-panel dc-help-panel" aria-labelledby="dc-help-heading">
        <h2 id="dc-help-heading" className="section-heading">
          {labels.helpTitle}
        </h2>
        <p className="panel-text">{labels.helpText}</p>
      </section>
    </>
  );
}

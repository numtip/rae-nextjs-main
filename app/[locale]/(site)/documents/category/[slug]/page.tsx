import Link from "next/link";
import DocumentCard from "@/src/features/document-center/components/DocumentCard";
import DocumentSearchBox from "@/src/features/document-center/components/DocumentSearchBox";
import {
  countDocumentsByCategory,
  getCategoryById,
  getDocumentsByCategory,
  getEnabledCategories,
  getRelatedCategories,
} from "@/src/features/document-center/data";
import { uiLabels } from "@/src/features/document-center/labels";
import { isLocale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getEnabledCategories().map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params;
  if (!isLocale(l)) return {};
  const category = getCategoryById(slug);
  if (!category?.enabled) return {};
  const title = l === "th" ? category.name_th : category.name_en;
  return buildPageMetadata({
    locale: l,
    segment: `documents/category/${slug}`,
    title,
    description: category.description_th,
  });
}

export default async function DocumentsCategoryPage({ params }: Props) {
  const { locale: l, slug } = await params;
  if (!isLocale(l)) notFound();

  const category = getCategoryById(slug);
  if (!category?.enabled) notFound();

  const labels = uiLabels[l];
  const documents = getDocumentsByCategory(slug);
  const related = getRelatedCategories(category);
  const title = l === "th" ? category.name_th : category.name_en;

  return (
    <>
      <nav className="dc-breadcrumb" aria-label="Breadcrumb">
        <Link href={withLocale(l, "/documents")}>{labels.heroTitle}</Link>
        {" › "}
        <span>{title}</span>
      </nav>

      <h1 className="dc-page-title">{title}</h1>
      <p className="dc-page-lead">{category.description_th}</p>
      <p className="dc-doc-meta">
        {countDocumentsByCategory(slug)} {labels.documents} · {labels.ownerGroup}:{" "}
        {category.owner_group}
      </p>

      <div className="dc-section">
        <DocumentSearchBox locale={l} variant="inline" />
      </div>

      {documents.length === 0 ? (
        <div className="dc-empty card-panel">
          <p>{labels.emptyCategory}</p>
          <Link href={withLocale(l, "/documents")} className="dc-btn dc-btn-secondary">
            {labels.backToHub}
          </Link>
        </div>
      ) : (
        <div className="dc-doc-grid dc-section">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} locale={l} document={doc} />
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="dc-section" aria-labelledby="dc-related-categories">
          <h2 id="dc-related-categories" className="section-heading">
            {labels.relatedCategories}
          </h2>
          <div className="dc-related-chips">
            {related.map((c) => (
              <Link
                key={c.id}
                href={withLocale(l, `/documents/category/${c.id}`)}
                className="dc-related-chip"
              >
                {l === "th" ? c.name_th : c.name_en}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

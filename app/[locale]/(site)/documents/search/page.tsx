import { Suspense } from "react";
import DocumentSearchResults from "@/src/features/document-center/components/DocumentSearchResults";
import { uiLabels } from "@/src/features/document-center/labels";
import { isLocale } from "@/lib/locale";
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
    segment: "documents/search",
    title: labels.searchButton,
    description: labels.heroSubtitle,
  });
}

export default async function DocumentsSearchPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  const labels = uiLabels[l];

  return (
    <>
      <h1 className="dc-page-title">{labels.searchButton}</h1>
      <p className="dc-page-lead">{labels.heroSubtitle}</p>
      <Suspense fallback={<p className="dc-doc-meta">{labels.searchButton}…</p>}>
        <DocumentSearchResults locale={l} />
      </Suspense>
    </>
  );
}

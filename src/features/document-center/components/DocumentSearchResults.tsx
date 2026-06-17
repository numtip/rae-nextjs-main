"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/locale";
import {
  getAllDocuments,
  getCategoryById,
  getDistinctFileTypes,
  getEnabledCategories,
  getDocumentSearchText,
  sortByUpdatedDateDesc,
} from "../data";
import type { DocumentRecord, DocumentStatus } from "../types";
import { uiLabels } from "../labels";
import DocumentCard from "./DocumentCard";
import DocumentSearchBox from "./DocumentSearchBox";

type Props = {
  locale: Locale;
};

function matchesQuery(doc: DocumentRecord, q: string, locale: Locale): boolean {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  const category = getCategoryById(doc.category);
  const categoryText = `${category?.name_th ?? ""} ${category?.name_en ?? ""}`.toLowerCase();

  return (
    doc.title.toLowerCase().includes(needle) ||
    doc.owner.toLowerCase().includes(needle) ||
    (doc.note?.toLowerCase().includes(needle) ?? false) ||
    getDocumentSearchText(doc.id).toLowerCase().includes(needle) ||
    categoryText.includes(needle) ||
    doc.tags.some((tag) => tag.includes(needle))
  );
}

export default function DocumentSearchResults({ locale }: Props) {
  const searchParams = useSearchParams();
  const labels = uiLabels[locale];

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const fileType = searchParams.get("file_type") ?? "";
  const status = (searchParams.get("status") ?? "current") as DocumentStatus | "";
  const visibility = searchParams.get("visibility") ?? "";

  const categories = getEnabledCategories();
  const fileTypes = getDistinctFileTypes();
  const allDocuments = getAllDocuments();

  const results = useMemo(() => {
    let docs = [...allDocuments];

    if (status) {
      docs = docs.filter((d) => d.status === status);
    } else {
      docs = docs.filter((d) => d.status === "current");
    }

    if (visibility) {
      docs = docs.filter((d) => d.visibility === visibility);
    } else if (!status || status === "current") {
      docs = docs.filter(
        (d) => d.visibility === "public" || d.visibility === "internal",
      );
    }

    if (category) {
      docs = docs.filter((d) => d.category === category);
    }

    if (fileType) {
      docs = docs.filter((d) => d.file_type === fileType);
    }

    docs = docs.filter((d) => matchesQuery(d, q, locale));
    return sortByUpdatedDateDesc(docs);
  }, [allDocuments, category, fileType, locale, q, status, visibility]);

  return (
    <div className="dc-section">
      <DocumentSearchBox locale={locale} defaultQuery={q} variant="inline" />

      <form className="dc-filter-bar dc-section" method="get" aria-label={labels.filterCategory}>
        <input type="hidden" name="q" value={q} />

        <div>
          <label className="dc-filter-label" htmlFor="dc-filter-category">
            {labels.filterCategory}
          </label>
          <select
            id="dc-filter-category"
            name="category"
            className="dc-filter-select"
            defaultValue={category}
          >
            <option value="">{labels.all}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {locale === "th" ? c.name_th : c.name_en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="dc-filter-label" htmlFor="dc-filter-file-type">
            {labels.filterFileType}
          </label>
          <select
            id="dc-filter-file-type"
            name="file_type"
            className="dc-filter-select"
            defaultValue={fileType}
          >
            <option value="">{labels.all}</option>
            {fileTypes.map((ft) => (
              <option key={ft} value={ft}>
                {ft}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="dc-filter-label" htmlFor="dc-filter-status">
            {labels.filterStatus}
          </label>
          <select
            id="dc-filter-status"
            name="status"
            className="dc-filter-select"
            defaultValue={status || "current"}
          >
            <option value="current">current</option>
            <option value="obsolete">obsolete</option>
            <option value="archived">archived</option>
            <option value="draft">draft</option>
          </select>
        </div>

        <div>
          <label className="dc-filter-label" htmlFor="dc-filter-visibility">
            {labels.filterVisibility}
          </label>
          <select
            id="dc-filter-visibility"
            name="visibility"
            className="dc-filter-select"
            defaultValue={visibility}
          >
            <option value="">{labels.all}</option>
            <option value="public">public</option>
            <option value="internal">internal</option>
            <option value="restricted">restricted</option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit" className="dc-btn dc-btn-primary">
            {labels.searchButton}
          </button>
        </div>
      </form>

      <p className="dc-doc-meta" aria-live="polite">
        {labels.resultsCount}: {results.length}
      </p>

      {results.length === 0 ? (
        <div className="dc-empty card-panel">
          <p className="section-heading">{labels.noResults}</p>
          <p>{labels.noResultsHint}</p>
        </div>
      ) : (
        <div className="dc-doc-grid">
          {results.map((doc) => (
            <DocumentCard key={doc.id} locale={locale} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

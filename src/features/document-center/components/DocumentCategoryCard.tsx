import Link from "next/link";
import type { DocumentCategory } from "../types";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { uiLabels } from "../labels";

type Props = {
  locale: Locale;
  category: DocumentCategory;
  documentCount: number;
};

export default function DocumentCategoryCard({
  locale,
  category,
  documentCount,
}: Props) {
  const labels = uiLabels[locale];
  const href = withLocale(locale, `/documents/category/${category.id}`);

  return (
    <Link
      href={href}
      className="card-panel dc-category-card"
      aria-label={`${category.name_th} — ${documentCount} ${labels.documents}`}
    >
      <h3 className="dc-category-card-title">{category.name_th}</h3>
      <p className="dc-category-card-en">{category.name_en}</p>
      <p className="dc-category-card-desc">{category.description_th}</p>
      <p className="dc-category-card-meta">
        {documentCount} {labels.documents}
      </p>
    </Link>
  );
}

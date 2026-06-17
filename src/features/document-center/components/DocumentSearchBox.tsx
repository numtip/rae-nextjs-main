"use client";

import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { uiLabels } from "../labels";

type Props = {
  locale: Locale;
  defaultQuery?: string;
  variant?: "hero" | "inline";
};

export default function DocumentSearchBox({
  locale,
  defaultQuery = "",
  variant = "hero",
}: Props) {
  const labels = uiLabels[locale];
  const action = withLocale(locale, "/documents/search");

  return (
    <form
      className="dc-search-form"
      action={action}
      method="get"
      role="search"
      aria-label={labels.searchButton}
    >
      <label htmlFor={`dc-search-${variant}`} className="sr-only">
        {labels.searchPlaceholder}
      </label>
      <input
        id={`dc-search-${variant}`}
        className={
          variant === "hero" ? "dc-search-input" : "dc-search-input dc-search-input--neutral"
        }
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder={labels.searchPlaceholder}
        autoComplete="off"
      />
      <button type="submit" className="dc-search-btn">
        {labels.searchButton}
      </button>
    </form>
  );
}

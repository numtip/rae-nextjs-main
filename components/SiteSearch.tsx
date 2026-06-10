"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import {
  type SearchHit,
  type SearchKind,
  filterSearchHits,
  searchHitsByLocale,
} from "@/data/search-corpus";
import { searchKindLabels, searchPageUi } from "@/data/search-ui";

const KIND_ORDER: SearchKind[] = ["news", "document", "service", "personnel"];

function groupByKind(hits: SearchHit[]): Record<SearchKind, SearchHit[]> {
  const out: Record<SearchKind, SearchHit[]> = {
    news: [],
    document: [],
    service: [],
    personnel: [],
  };
  for (const h of hits) {
    out[h.kind].push(h);
  }
  return out;
}

function highlightText(text: string, query: string): React.ReactNode {
  const raw = query.trim().split(/\s+/).filter(Boolean);
  if (raw.length === 0) return text;
  const esc = raw.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`(${esc})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) => {
    if (!part) return null;
    const isMatch = raw.some((t) => part.toLowerCase() === t.toLowerCase());
    return isMatch ? (
      <mark key={i} className="search-highlight">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

export default function SiteSearch({
  locale,
  labelledBy,
}: {
  locale: Locale;
  /** Optional id of page h1 for aria-labelledby on the search landmark */
  labelledBy?: string;
}) {
  const allHits = searchHitsByLocale[locale];
  const ui = searchPageUi[locale];
  const labels = searchKindLabels[locale];
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const filtered = useMemo(
    () => (activeQuery.trim() ? filterSearchHits(allHits, activeQuery) : []),
    [allHits, activeQuery],
  );
  const grouped = useMemo(() => groupByKind(filtered), [filtered]);

  function runSearch() {
    setActiveQuery(query);
  }

  const statusMessage = !activeQuery.trim()
    ? `${ui.emptyTitle}. ${ui.emptyDetail}`
    : filtered.length === 0
      ? `${ui.noResults}. ${ui.noResultsHint}`
      : `${ui.resultsPrefix}: ${filtered.length}`;

  return (
    <section
      className="site-search"
      role="search"
      aria-labelledby={labelledBy}
    >
      <p id="search-hint" className="panel-text search-hint">
        {ui.hint}
      </p>
      <form
        className="search-form"
        aria-label={ui.formLabel}
        aria-describedby="search-hint"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch();
        }}
      >
        <label htmlFor="site-search-query" className="sr-only">
          {ui.formLabel}
        </label>
        <input
          id="site-search-query"
          type="search"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.placeholder}
          autoComplete="off"
          enterKeyHint="search"
        />
        <button type="submit" className="search-submit">
          {ui.submit}
        </button>
      </form>

      <div
        id="search-results-landmark"
        role="region"
        aria-label={ui.resultsRegionLabel}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="sr-only" role="status">
          {ui.resultsStatusLabel}: {statusMessage}
        </p>

        {!activeQuery.trim() ? (
          <div className="search-empty panel-text search-status" aria-labelledby="search-empty-title">
            <p id="search-empty-title" className="search-empty-title">
              {ui.emptyTitle}
            </p>
            <p className="search-empty-detail">{ui.emptyDetail}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="search-empty panel-text search-status" aria-labelledby="search-none-title">
            <p id="search-none-title" className="search-empty-title">
              {ui.noResults}
            </p>
            <p className="search-empty-detail">{ui.noResultsHint}</p>
          </div>
        ) : (
          <>
            <p className="search-results-count" aria-hidden="true">
              {ui.resultsPrefix}: <strong>{filtered.length}</strong>
            </p>
            <div className="search-results">
              {KIND_ORDER.map((kind) => {
                const rows = grouped[kind];
                if (rows.length === 0) return null;
                return (
                  <section
                    key={kind}
                    className="search-group"
                    aria-labelledby={`search-gr-${kind}`}
                  >
                    <h2 id={`search-gr-${kind}`} className="search-group-title">
                      {labels[kind]}{" "}
                      <span className="search-group-count">({rows.length})</span>
                    </h2>
                    <ul className="search-group-list">
                      {rows.map((hit) => (
                        <li key={hit.id}>
                          <Link
                            href={withLocale(locale, hit.href)}
                            className="search-hit-link"
                          >
                            <span className="search-hit-title">
                              {highlightText(hit.title, activeQuery)}
                            </span>
                            {hit.category ? (
                              <span className="search-hit-meta">
                                {highlightText(hit.category, activeQuery)}
                              </span>
                            ) : null}
                            <span className="search-hit-excerpt">
                              {highlightText(hit.excerpt, activeQuery)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

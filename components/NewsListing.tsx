import Link from "next/link";
import { newsListUi } from "@/data/news-ui";
import { publishedSortedByDateDesc, slugForNewsIndex } from "@/data/news-registry";
import { localizeNews } from "@/lib/news-i18n";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

function formatPublishDate(isoDate: string, locale: Locale): string {
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function NewsListing({ locale }: { locale: Locale }) {
  const rows = publishedSortedByDateDesc();
  const ui = newsListUi[locale];
  const base = withLocale(locale, "/news-events/");

  return (
    <section className="section-block news-listing" aria-labelledby="news-list-heading">
      <h2 id="news-list-heading" className="section-heading">
        {ui.listingTitle}
      </h2>
      <p className="section-subtext">{ui.listingSub}</p>
      <ul className="news-list card-panel">
        {rows.map(({ index, record }) => {
          const v = localizeNews(record, locale);
          return (
            <li key={slugForNewsIndex(index)} className="news-list-item">
              <div className="news-list-meta">
                <span className="news-category">{v.category}</span>
                <time dateTime={v.publish_date}>{formatPublishDate(v.publish_date, locale)}</time>
              </div>
              <h3 className="news-list-title">
                <Link href={`${base}${slugForNewsIndex(index)}/`}>{v.title}</Link>
              </h3>
              <p className="panel-text news-list-summary">{v.summary}</p>
              <div className="news-tags">
                {v.tags.map((t) => (
                  <span key={t} className="news-tag">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

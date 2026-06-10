import Link from "next/link";
import { getHomeNewsPreview, newsHomeLabels, newsSection } from "@/data/newsHighlights";
import { slugForNewsIndex } from "@/data/news-registry";
import { localizeNews } from "@/lib/news-i18n";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

function formatPublishDate(isoDate: string, locale: Locale): string {
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export default function NewsHighlights({ locale }: { locale: Locale }) {
  const items = getHomeNewsPreview();
  const sec = newsSection[locale];
  const labels = newsHomeLabels(locale);
  const newsBase = withLocale(locale, "/news-events/");

  return (
    <section
      className="section-block news-highlights-section"
      id="news-highlights"
      aria-labelledby="news-highlights-heading"
    >
      <h2 id="news-highlights-heading" className="section-heading">
        {sec.heading}
      </h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-three news-grid">
        {items.map(({ index, record }) => {
          const v = localizeNews(record, locale);
          const articleHref = `${newsBase}${slugForNewsIndex(index)}/`;
          const readLabel = `${labels.readMore}: ${v.title}`;
          return (
            <article key={slugForNewsIndex(index)} className="card-panel news-card">
              <p className="news-card-meta">
                <span className="news-category">{v.category}</span>
                <time dateTime={v.publish_date}>{formatPublishDate(v.publish_date, locale)}</time>
              </p>
              <h3 className="panel-title">{v.title}</h3>
              <p className="panel-text">{v.summary}</p>
              <Link href={articleHref} className="news-card-cta" aria-label={readLabel}>
                <span className="news-card-cta-label">{labels.readMore}</span>
                <span className="news-card-chevron" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          );
        })}
      </div>
      <p className="news-index-link">
        <Link href={newsBase} className="news-index-cta" aria-label={labels.viewAll}>
          <span>{labels.viewAll}</span>
          <span className="news-card-chevron" aria-hidden="true">
            →
          </span>
        </Link>
      </p>
    </section>
  );
}

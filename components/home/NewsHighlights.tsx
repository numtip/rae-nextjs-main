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
    <section className="section-block" id="news-highlights">
      <h2 className="section-heading">{sec.heading}</h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-three">
        {items.map(({ index, record }) => {
          const v = localizeNews(record, locale);
          return (
            <article key={slugForNewsIndex(index)} className="card-panel">
              <p className="news-card-meta">
                <span className="news-category">{v.category}</span>
                <time dateTime={v.publish_date}>{formatPublishDate(v.publish_date, locale)}</time>
              </p>
              <h3 className="panel-title">{v.title}</h3>
              <p className="panel-text">{v.summary}</p>
              <p className="news-card-more">
                <Link href={`${newsBase}${slugForNewsIndex(index)}/`}>{labels.readMore}</Link>
              </p>
            </article>
          );
        })}
      </div>
      <p className="news-index-link">
        <Link href={newsBase}>{labels.viewAll}</Link>
      </p>
    </section>
  );
}

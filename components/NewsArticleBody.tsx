import type { NewsRecord } from "@/data/content-models";
import { newsListUi } from "@/data/news-ui";
import { localizeNews } from "@/lib/news-i18n";
import type { Locale } from "@/lib/locale";

function formatPublishDate(isoDate: string, locale: Locale): string {
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function NewsArticleBody({ record, locale }: { record: NewsRecord; locale: Locale }) {
  const v = localizeNews(record, locale);
  const ui = newsListUi[locale];
  const paragraphs = v.content.split(/\n\n+/).filter(Boolean);

  return (
    <article className="section-block news-article card-panel">
      <header className="news-article-header">
        <p className="news-article-meta">
          <span className="news-category">{v.category}</span>
          <time dateTime={v.publish_date}>{formatPublishDate(v.publish_date, locale)}</time>
          <span className="news-status">
            {ui.statusPrefix} {v.status}
          </span>
        </p>
        <h1 className="news-article-title">{v.title}</h1>
        <p className="panel-text news-article-summary">{v.summary}</p>
        <div className="news-tags">
          {v.tags.map((t) => (
            <span key={t} className="news-tag">
              {t}
            </span>
          ))}
        </div>
      </header>
      <div className="news-article-content">
        {paragraphs.map((p, i) => (
          <p key={i} className="panel-text news-article-p">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}

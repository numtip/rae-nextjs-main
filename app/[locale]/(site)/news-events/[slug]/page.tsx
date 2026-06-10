import Link from "next/link";
import { notFound } from "next/navigation";
import NewsArticleBody from "@/components/NewsArticleBody";
import { newsListUi } from "@/data/news-ui";
import { newsRegistry, parseNewsSlug, publishedNewsIndices, slugForNewsIndex } from "@/data/news-registry";
import { isLocale } from "@/lib/locale";
import { localizeNews } from "@/lib/news-i18n";
import { withLocale } from "@/lib/paths";

export function generateStaticParams() {
  return publishedNewsIndices().map((index) => ({
    slug: slugForNewsIndex(index),
  }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, locale: loc } = await params;
  if (!isLocale(loc)) return {};
  const idx = parseNewsSlug(slug);
  if (idx === null) return { title: newsListUi[loc].listingTitle };
  const record = newsRegistry[idx];
  if (record.status !== "published") return { title: newsListUi[loc].listingTitle };
  const v = localizeNews(record, loc);
  const suffix = loc === "th" ? "ข่าวและกิจกรรม" : "News & events";
  return { title: `${v.title} · ${suffix}` };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug, locale: l } = await params;
  if (!isLocale(l)) notFound();
  const idx = parseNewsSlug(slug);
  if (idx === null) notFound();
  const record = newsRegistry[idx];
  if (record.status !== "published") notFound();
  const ui = newsListUi[l];
  const listHref = withLocale(l, "/news-events/");

  return (
    <>
      <nav className="news-breadcrumb section-block" aria-label="Breadcrumb">
        <Link href={listHref}>{ui.backToList}</Link>
      </nav>
      <NewsArticleBody record={record} locale={l} />
    </>
  );
}

import type { NewsRecord } from "@/data/content-models";
import type { Locale } from "@/lib/locale";

export type LocalizedNews = {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  publish_date: string;
  status: string;
};

export function localizeNews(record: NewsRecord, locale: Locale): LocalizedNews {
  if (locale === "en" && record.translation_en) {
    const t = record.translation_en;
    return {
      title: t.title,
      summary: t.summary,
      content: t.content,
      category: t.category,
      tags: t.tags,
      publish_date: record.publish_date,
      status: record.status,
    };
  }
  return {
    title: record.title,
    summary: record.summary,
    content: record.content,
    category: record.category,
    tags: record.tags,
    publish_date: record.publish_date,
    status: record.status,
  };
}

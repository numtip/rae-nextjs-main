import { publishedSortedByDateDesc } from "@/data/news-registry";
import type { Locale } from "@/lib/locale";

export const newsSection: Record<Locale, { heading: string; subtext: string }> = {
  th: {
    heading: "ข่าวและกำหนดการ",
    subtext: "สรุปจากรายการข่าวที่เผยแพร่อย่างเป็นทางการ — ดูทั้งหมดได้ที่หน้าข่าวและกิจกรรม",
  },
  en: {
    heading: "News & calendar",
    subtext: "Highlights from officially published items — see the News & events page for the full list",
  },
};

export function getHomeNewsPreview() {
  return publishedSortedByDateDesc().slice(0, 3);
}

export function newsHomeLabels(locale: Locale) {
  return locale === "th"
    ? { readMore: "อ่านเพิ่มเติม", viewAll: "ดูรายการข่าวทั้งหมด" }
    : { readMore: "Read more", viewAll: "View all news" };
}

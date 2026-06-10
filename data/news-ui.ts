import type { Locale } from "@/lib/locale";

export const newsListUi: Record<
  Locale,
  { listingTitle: string; listingSub: string; backToList: string; statusPrefix: string }
> = {
  th: {
    listingTitle: "รายการข่าวและกิจกรรม",
    listingSub: "แสดงเฉพาะรายการที่เผยแพร่แล้ว เรียงจากวันที่เผยแพร่ล่าสุด",
    backToList: "← ข่าวและกิจกรรมทั้งหมด",
    statusPrefix: "สถานะ ·",
  },
  en: {
    listingTitle: "News & events listing",
    listingSub: "Published items only, newest publish date first",
    backToList: "← All news & events",
    statusPrefix: "Status ·",
  },
};

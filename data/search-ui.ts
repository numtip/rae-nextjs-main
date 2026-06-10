import type { Locale } from "@/lib/locale";
import type { SearchKind } from "@/data/search-corpus";

export const searchKindLabels: Record<Locale, Record<SearchKind, string>> = {
  th: {
    news: "ข่าวและกิจกรรม",
    document: "แบบฟอร์มและเอกสาร",
    service: "บริการวิจัยและบริการวิชาการ",
    personnel: "บุคลากรและข้อมูลติดต่อ",
  },
  en: {
    news: "News & events",
    document: "Forms & documents",
    service: "Research & academic services",
    personnel: "Personnel & contacts",
  },
};

export const searchPageUi: Record<
  Locale,
  {
    formLabel: string;
    placeholder: string;
    submit: string;
    hint: string;
    emptyTitle: string;
    emptyDetail: string;
    noResults: string;
    noResultsHint: string;
    resultsPrefix: string;
    resultsRegionLabel: string;
    resultsStatusLabel: string;
  }
> = {
  th: {
    formLabel: "ค้นหาในเว็บไซต์สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    placeholder: "เช่น จริยธรรม แบบฟอร์ม บริการวิจัย ชื่อบุคลากร",
    submit: "ค้นหา",
    hint: "ค้นหาได้จากหัวข้อ คำอธิบายสั้น หมวด และแท็ก ข้อมูลไม่ถูกส่งไปเซิร์ฟเวอร์",
    emptyTitle: "เริ่มค้นหา",
    emptyDetail:
      "พิมพ์คำหรือหลายคำที่คั่นด้วยช่องว่าง จากนั้นกดปุ่ม «ค้นหา» หรือกด Enter ระบบจะแสดงเฉพาะรายการที่มีทุกคำปรากฏในข้อความที่เกี่ยวข้อง",
    noResults: "ไม่พบรายการที่ตรงกับทุกคำที่พิมพ์",
    noResultsHint: "ลองใช้คำสั้นลง คำพ้อง หรือค้นทีละคำ แล้วค่อยแคบลง",
    resultsPrefix: "พบทั้งหมด",
    resultsRegionLabel: "ผลการค้นหา",
    resultsStatusLabel: "สถานะผลการค้นหา",
  },
  en: {
    formLabel: "Search this site (The Office of Agricultural Research and Extension, Maejo University)",
    placeholder: "e.g. ethics, form, research service, staff name",
    submit: "Search",
    hint: "Matches titles, short descriptions, categories, and tags. Nothing is sent to the server.",
    emptyTitle: "Start a search",
    emptyDetail:
      "Type one or more words separated by spaces, then press Search or Enter. Every word must appear somewhere in the matched text.",
    noResults: "No items matched all of your words",
    noResultsHint: "Try shorter terms, synonyms, or search one keyword at a time.",
    resultsPrefix: "Total matches",
    resultsRegionLabel: "Search results",
    resultsStatusLabel: "Search status",
  },
};

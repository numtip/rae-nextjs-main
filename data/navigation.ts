import type { Locale } from "@/lib/locale";

export type NavItemDef = {
  path: string;
  label: Record<Locale, string>;
};

/** Site map order (no locale prefix) — keep labels aligned with org naming rules */
export const mainNav: NavItemDef[] = [
  { path: "/", label: { th: "หน้าแรก", en: "Home" } },
  { path: "/about/", label: { th: "เกี่ยวกับเรา", en: "About" } },
  { path: "/research-services/", label: { th: "บริการวิจัย", en: "Research services" } },
  { path: "/academic-services/", label: { th: "บริการวิชาการ", en: "Academic services" } },
  { path: "/research-systems/", label: { th: "ระบบวิจัย", en: "Research systems" } },
  { path: "/news-events/", label: { th: "ข่าวและกิจกรรม", en: "News & events" } },
  { path: "/forms-documents/", label: { th: "แบบฟอร์มและเอกสาร", en: "Forms & documents" } },
  { path: "/search/", label: { th: "ค้นหา", en: "Search" } },
  { path: "/green-office/", label: { th: "กรีนออฟฟิศ", en: "Green office" } },
  { path: "/contact/", label: { th: "ติดต่อเรา", en: "Contact" } },
];

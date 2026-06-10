import type { Locale } from "@/lib/locale";

export type NavGroup = "primary" | "secondary" | "utility";

export type NavItemDef = {
  path: string;
  label: Record<Locale, string>;
  group?: NavGroup;
};

/** Site map order (no locale prefix) — keep labels aligned with org naming rules */
export const mainNav: NavItemDef[] = [
  { path: "/", label: { th: "หน้าแรก", en: "Home" }, group: "primary" },
  { path: "/about/", label: { th: "เกี่ยวกับเรา", en: "About" }, group: "primary" },
  { path: "/research-services/", label: { th: "บริการวิจัย", en: "Research services" }, group: "primary" },
  { path: "/academic-services/", label: { th: "บริการวิชาการ", en: "Academic services" }, group: "primary" },
  { path: "/research-systems/", label: { th: "ระบบวิจัย", en: "Research systems" }, group: "secondary" },
  { path: "/news-events/", label: { th: "ข่าวและกิจกรรม", en: "News & events" }, group: "secondary" },
  { path: "/forms-documents/", label: { th: "แบบฟอร์มและเอกสาร", en: "Forms & documents" }, group: "utility" },
  { path: "/search/", label: { th: "ค้นหา", en: "Search" }, group: "utility" },
  { path: "/green-office/", label: { th: "กรีนออฟฟิศ", en: "Green office" }, group: "secondary" },
  { path: "/contact/", label: { th: "ติดต่อเรา", en: "Contact" }, group: "primary" },
];

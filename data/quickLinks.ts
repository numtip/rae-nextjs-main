import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

type InternalLink = { kind: "internal"; path: string; label: Record<Locale, string> };
type ExternalLink = { kind: "external"; href: string; label: Record<Locale, string> };
type QLink = InternalLink | ExternalLink;

export type QuickGroup = { title: Record<Locale, string>; links: QLink[] };

export const quickLinkGroups: QuickGroup[] = [
  {
    title: {
      th: "โครงสร้างเว็บไซต์",
      en: "Site structure",
    },
    links: [
      { kind: "internal", path: "/about/", label: { th: "เกี่ยวกับเรา", en: "About" } },
      { kind: "internal", path: "/research-services/", label: { th: "บริการวิจัย", en: "Research services" } },
      { kind: "internal", path: "/academic-services/", label: { th: "บริการวิชาการ", en: "Academic services" } },
      { kind: "internal", path: "/research-systems/", label: { th: "ระบบวิจัย", en: "Research systems" } },
      { kind: "internal", path: "/news-events/", label: { th: "ข่าวและกิจกรรม", en: "News & events" } },
      { kind: "internal", path: "/search/", label: { th: "ค้นหา", en: "Search" } },
      { kind: "internal", path: "/forms-documents/", label: { th: "แบบฟอร์มและเอกสาร", en: "Forms & documents" } },
      { kind: "internal", path: "/green-office/", label: { th: "กรีนออฟฟิศ", en: "Green office" } },
      { kind: "internal", path: "/contact/", label: { th: "ติดต่อเรา", en: "Contact" } },
    ],
  },
  {
    title: {
      th: "บริการดิจิทัลภายในองค์กร",
      en: "Internal digital services",
    },
    links: [
      { kind: "external", href: "/dashboard/", label: { th: "แดชบอร์ดภาพรวม", en: "Dashboard" } },
      { kind: "external", href: "/attendance/", label: { th: "ระบบลงเวลา", en: "Attendance" } },
      { kind: "external", href: "/admin/dashboard/", label: { th: "ผู้ดูแลระบบ", en: "Admin" } },
      { kind: "external", href: "/n8n/", label: { th: "อัตโนมัติเวิร์กโฟลว์ (n8n)", en: "Workflow (n8n)" } },
      { kind: "external", href: "/metabase/", label: { th: "รายงานข้อมูล", en: "Metabase" } },
      { kind: "external", href: "/royalplot/", label: { th: "Royalplot", en: "Royalplot" } },
    ],
  },
];

export const quickLinksSection: Record<Locale, { heading: string; subtext: string }> = {
  th: {
    heading: "ลิงก์ด่วน",
    subtext: "ทางเข้าหน้าหลักของเว็บไซต์ และบริการดิจิทัลที่ใช้ประจำ",
  },
  en: {
    heading: "Quick links",
    subtext: "Primary site sections and frequently used digital services",
  },
};

export function resolveQuickHref(link: QLink, locale: Locale): string {
  if (link.kind === "external") return link.href;
  return withLocale(locale, link.path);
}

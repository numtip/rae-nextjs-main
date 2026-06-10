import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

export type CtaBlock = {
  title: string;
  text: string;
  buttonLabel: string;
  buttonPath: string;
};

export const documentsCta: Record<Locale, CtaBlock> = {
  th: {
    title: "ศูนย์แบบฟอร์มและเอกสาร",
    text:
      "รวมแบบฟอร์ม คู่มือ และเอกสารอ้างอิงสำหรับงานวิจัยและบริการวิชาการของสำนักฯ จัดหมวดตามตารางรีจีสตรีบนเว็บ",
    buttonLabel: "ไปหน้าแบบฟอร์มและเอกสาร",
    buttonPath: "/forms-documents/",
  },
  en: {
    title: "Forms & documents centre",
    text:
      "Forms, manuals, and reference documents for OARE research and academic services, matching the on-site document registry.",
    buttonLabel: "Open forms & documents",
    buttonPath: "/forms-documents/",
  },
};

export const researchSystemsCta: Record<Locale, CtaBlock> = {
  th: {
    title: "ศูนย์ระบบวิจัย",
    text:
      "สรุปทางเข้าระบบสารสนเทศด้านงานวิจัยและรายงาน ใช้ร่วมกับหน้า «ระบบวิจัย» เพื่อนำทางไปยังแต่ละระบบ",
    buttonLabel: "ดูระบบวิจัยทั้งหมด",
    buttonPath: "/research-systems/",
  },
  en: {
    title: "Research systems hub",
    text:
      "Entry points to research-related information systems and reporting. Use together with the Research systems page for full navigation.",
    buttonLabel: "View research systems",
    buttonPath: "/research-systems/",
  },
};

export function ctaHref(locale: Locale, block: CtaBlock): string {
  return withLocale(locale, block.buttonPath);
}

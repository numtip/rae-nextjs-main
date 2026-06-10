import type { Locale } from "@/lib/locale";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

export const hero: Record<
  Locale,
  {
    kicker: string;
    title: string;
    text: string;
    primaryCta: { label: string; hash: string };
    secondaryCta: { label: string; hash: string };
  }
> = {
  th: {
    kicker: "Research & Academic Gateway",
    title: `ประตูบริการดิจิทัล ${ORG_NAME_TH}`,
    text:
      "รวมลิงก์บริการ แบบฟอร์ม เอกสาร และระบบสารสนเทศที่ใช้ในภารกิจของสำนักฯ จัดโครงสร้างตามหมวดหลักของเว็บไซต์ เพื่อการค้นหาและใช้งานที่สะดวก",
    primaryCta: { label: "ลิงก์ด่วน", hash: "#quick-links" },
    secondaryCta: { label: "ระบบวิจัย", hash: "#research-gateway" },
  },
  en: {
    kicker: "Research & Academic Gateway",
    title: `Digital gateway — ${ORG_NAME_EN}`,
    text:
      "Central access to services, forms, documents, and information systems supporting the mandate of The Office of Agricultural Research and Extension, Maejo University. Content follows the site structure for clarity and ease of use.",
    primaryCta: { label: "Quick links", hash: "#quick-links" },
    secondaryCta: { label: "Research systems", hash: "#research-gateway" },
  },
};

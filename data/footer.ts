import type { Locale } from "@/lib/locale";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

export type FooterModel = {
  contactLabel: string;
  description: string;
  publicPath: string;
  anchors: { hash: string; label: string }[];
};

export const footer: Record<Locale, FooterModel> = {
  th: {
    contactLabel: "ติดต่อ",
    description: `${ORG_NAME_TH} · เส้นทางสาธารณะ `,
    publicPath: "/rae-landing/",
    anchors: [
      { hash: "#hero", label: "บทนำ" },
      { hash: "#quick-links", label: "ลิงก์ด่วน" },
      { hash: "#services-overview", label: "ภาพรวมบริการ" },
      { hash: "#research-gateway", label: "ระบบวิจัย" },
      { hash: "#impact-metrics", label: "ผลงานและผลกระทบ" },
      { hash: "#news-highlights", label: "ข่าว" },
      { hash: "#forms-documents", label: "แบบฟอร์ม/เอกสาร" },
      { hash: "#green-office", label: "กรีนออฟฟิศ" },
    ],
  },
  en: {
    contactLabel: "Contact",
    description: `${ORG_NAME_EN} · Public path `,
    publicPath: "/rae-landing/",
    anchors: [
      { hash: "#hero", label: "Introduction" },
      { hash: "#quick-links", label: "Quick links" },
      { hash: "#services-overview", label: "Services" },
      { hash: "#research-gateway", label: "Research systems" },
      { hash: "#impact-metrics", label: "Impact" },
      { hash: "#news-highlights", label: "News" },
      { hash: "#forms-documents", label: "Forms & documents" },
      { hash: "#green-office", label: "Green office" },
    ],
  },
};

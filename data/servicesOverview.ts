import type { Locale } from "@/lib/locale";
import type { ServiceCard } from "@/data/content-models";

export const servicesSection: Record<Locale, { heading: string; subtext: string }> = {
  th: {
    heading: "ภาพรวมบริการหลัก",
    subtext: "สอดคล้องโครงสร้างกอง/งาน ภายใต้สำนักวิจัยฯ ตามที่เผยแพร่บนเว็บไซต์สำนัก (งานวิจัย — งานบริการวิชาการ — ระบบสารสนเทศ)",
  },
  en: {
    heading: "Core services",
    subtext: "Aligned with the Office’s public structure: research administration, academic services, and research information systems",
  },
};

export const serviceCards: Record<Locale, ServiceCard[]> = {
  th: [
    {
      title: "บริการวิจัย",
      text:
        "สนับสนุนแผนงานวิจัย การบริหารทุน การติดตามและประเมินผล และการเผยแพร่ผลงานให้เกิดการใช้ประโยชน์",
      path: "/research-services/",
    },
    {
      title: "บริการวิชาการ",
      text:
        "บริการวิชาการแก่ภายนอก ความร่วมมือ การถ่ายทอดองค์ความรู้ และการอบรม/ที่ปรึกษาทางวิชาการ",
      path: "/academic-services/",
    },
    {
      title: "ระบบวิจัย",
      text: "ทางเข้าระบบสารสนเทศด้านงานวิจัย รายงาน และข้อมูลประกอบการบริหาร",
      path: "/research-systems/",
    },
  ],
  en: [
    {
      title: "Research services",
      text:
        "Support for research planning, fund administration, monitoring and evaluation, and dissemination for impact.",
      path: "/research-services/",
    },
    {
      title: "Academic services",
      text:
        "External academic services, partnerships, knowledge transfer, and training or advisory engagements.",
      path: "/academic-services/",
    },
    {
      title: "Research systems",
      text: "Access to information systems for research administration, reporting, and decision support.",
      path: "/research-systems/",
    },
  ],
};

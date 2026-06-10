import type { Locale } from "@/lib/locale";

export type KpiMetric = {
  value: string;
  label: Record<Locale, string>;
  context?: Record<Locale, string>;
  /** Gold accent — at most one per strip */
  highlight?: boolean;
};

export const kpiImpactSection: Record<Locale, { heading: string; subtext: string }> = {
  th: {
    heading: "ผลงานและผลกระทบ",
    subtext: "ตัวชี้วัดเชิงบริหารที่สะท้อนการสนับสนุนงานวิจัยและบริการวิชาการของสำนัก",
  },
  en: {
    heading: "Impact at a glance",
    subtext: "Administrative indicators reflecting research support and academic service delivery",
  },
};

export const kpiMetrics: KpiMetric[] = [
  {
    value: "120+",
    label: { th: "โครงการวิจัยที่สนับสนุน", en: "Research projects supported" },
    context: { th: "รอบปีงบประมาณล่าสุด", en: "Latest fiscal cycle" },
  },
  {
    value: "85",
    label: { th: "ผลงานตีพิมพ์/เผยแพร่", en: "Publications & outputs" },
    context: { th: "บทความ รายงาน และสื่อความรู้", en: "Articles, reports, and knowledge products" },
    highlight: true,
  },
  {
    value: "40+",
    label: { th: "กิจกรรมอบรม/ถ่ายทอด", en: "Training & outreach events" },
    context: { th: "ภายในและภายนอกมหาวิทยาลัย", en: "On- and off-campus programmes" },
  },
  {
    value: "25",
    label: { th: "หน่วยงานพันธมิตร", en: "Partner organisations" },
    context: { th: "ความร่วมมือวิชาการและวิจัย", en: "Academic and research collaboration" },
  },
];

import type { Locale } from "@/lib/locale";

export type KpiDataSource = "placeholder";
export type KpiDataStatus = "pending-live-source";

export type KpiMetric = {
  value: string;
  label: Record<Locale, string>;
  context?: Record<Locale, string>;
  /** Gold accent — at most one per strip */
  highlight?: boolean;
  source: KpiDataSource;
  status: KpiDataStatus;
};

export const kpiStripMeta = {
  source: "placeholder" as const,
  status: "pending-live-source" as const,
};

export const kpiImpactSection: Record<
  Locale,
  { heading: string; subtext: string; placeholderNotice: string }
> = {
  th: {
    heading: "ผลงานและผลกระทบ",
    subtext: "ตัวชี้วัดเชิงบริหารที่สะท้อนการสนับสนุนงานวิจัยและบริการวิชาการของสำนัก",
    placeholderNotice:
      "ตัวเลขด้านล่างเป็นข้อมูลตัวอย่าง (placeholder) — รอเชื่อมแหล่งข้อมูลจริง",
  },
  en: {
    heading: "Impact at a glance",
    subtext: "Administrative indicators reflecting research support and academic service delivery",
    placeholderNotice:
      "Figures below are sample placeholders — pending connection to a live data source",
  },
};

export const kpiMetrics: KpiMetric[] = [
  {
    value: "120+",
    label: { th: "โครงการวิจัยที่สนับสนุน", en: "Research projects supported" },
    context: { th: "รอบปีงบประมาณล่าสุด", en: "Latest fiscal cycle" },
    source: "placeholder",
    status: "pending-live-source",
  },
  {
    value: "85",
    label: { th: "ผลงานตีพิมพ์/เผยแพร่", en: "Publications & outputs" },
    context: { th: "บทความ รายงาน และสื่อความรู้", en: "Articles, reports, and knowledge products" },
    highlight: true,
    source: "placeholder",
    status: "pending-live-source",
  },
  {
    value: "40+",
    label: { th: "กิจกรรมอบรม/ถ่ายทอด", en: "Training & outreach events" },
    context: { th: "ภายในและภายนอกมหาวิทยาลัย", en: "On- and off-campus programmes" },
    source: "placeholder",
    status: "pending-live-source",
  },
  {
    value: "25",
    label: { th: "หน่วยงานพันธมิตร", en: "Partner organisations" },
    context: { th: "ความร่วมมือวิชาการและวิจัย", en: "Academic and research collaboration" },
    source: "placeholder",
    status: "pending-live-source",
  },
];

import type { NewsRecord } from "@/data/content-models";

/**
 * Curated news (static). Slug = `${publish_date}-${indexInThisArray}`.
 */
export const newsRegistry: NewsRecord[] = [
  {
    title: "แจ้งปรับแนวทาง/แบบฟอร์มการพิจารณาจริยธรรมการวิจัยในคน ประจำปีงบประมาณ พ.ศ. 2569",
    summary:
      "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ แจ้งปรับเอกสารแนวทางและแบบฟอร์มที่ใช้คู่กระบวนการพิจารณา สอดคล้องมติคณะกรรมการฯ และหลักเกณฑ์แห่งชาติ",
    content:
      "เพื่อให้การยื่นขอพิจารณาจริยธรรมการวิจัยในคนเป็นไปอย่างถูกต้อง ครบถ้วน และสอดคล้องกับแนวทางที่คณะกรรมการจริยธรรมการวิจัยในคน มหาวิทยาลัยแม่โจ้ และสำนักงานคณะกรรมการสุขภาพแห่งชาติกำหนด สำนักฯ จึงสรุปรายการแบบฟอร์ม/หลักฐานอ้างอิงฉบับล่าสุด\n\nท่านวางแผนจัดทำโครงการวิจัยที่มีการศึกษาในคน โปรดดาวน์โหลดเวอร์ชันล่าสุดจากหน้า «แบบฟอร์มและเอกสาร» บนเว็บนี้ก่อนยื่น และตรวจสอบรายการแนบตามแนวทางที่ประกาศฉบับเต็ม\n\nสอบถามรายละเอียดงานนี้ ผ่านกองบริหารงานวิจัย/เจ้าหน้าที่ผู้รับผิดชอบ ตามช่องทางที่สำนักฯ ประกาศ หรือโทร 0 5387 3400",
    category: "ประกาศ",
    tags: ["จริยธรรมการวิจัย", "แบบฟอร์ม", "งานวิจัย"],
    publish_date: "2026-01-10",
    status: "published",
    translation_en: {
      title: "Human research ethics: updated guidance and forms (FY2026)",
      summary:
        "Revised OARE guidance and forms for human research ethics review, aligned with the university committee and national frameworks.",
      content:
        "The Office of Agricultural Research and Extension, Maejo University, summarises the latest forms and reference materials for review of research involving human participants, consistent with the university ethics committee and national health ethics requirements.\n\nIf your study includes human subjects, download the current versions from the Forms & documents page before submission, and use the published checklist in the full notice.\n\nFor details, follow the contact channels in the OARE notice, or call the main office at +66 53 873 400.",
      category: "Announcement",
      tags: ["Research ethics", "Forms", "Research"],
    },
  },
  {
    title: "รับข้อเสนอโครงการบริการวิชาการ/ถ่ายทอดเทคโนโลยีต่อชุมชน รอบที่ 1/2569",
    summary:
      "เชิญคณะ/หน่วยงานภายใน ม.แม่โจ้ ยื่นข้อเสนอโครงการที่เน้นผลลัพธ์ต่อชุมชนและเศรษฐกิจฐานราก สอดคล้องบรรทัดฐานหัวข้องานที่สำนักฯ ประกาศ ณ รอบปฏิทิน",
    content:
      "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ เปิดรับข้อเสนอสำหรับโครงการบริการวิชาการและแนวทาง BCG/ชุมชนเป้าหมาย รอบที่ 1 ปีงบประมาณ 2569 โดยเน้นแผนถ่ายทอดองค์ความรู้ ตัวชี้วัดผลลัพธ์ และแผนเงินลงทุนอย่างตรวจวัดได้\n\nจัดทำเอกสารตามแบบฟอร์มที่กำหนด แนบหนังสือรับรองหน่วยงานต้นสังกัดและแผนงบ ภายในกำหนดเวลาในประกาศฉบับเต็ม\n\nผลการคัดเลือกและขั้นตอนแจ้งตามมติคณะกรรมการฯ โดยอ้างอิงหลักเกณฑ์ที่สำนักฯ ใช้กับกิจกรรมเสวนา/รายงานความก้าวหน้าโครงการตามรอบปฏิทิน",
    category: "โครงการ",
    tags: ["บริการวิชาการ", "ชุมชน", "ทุนสนับสนุน"],
    publish_date: "2025-12-18",
    status: "published",
    translation_en: {
      title: "Community academic service & knowledge-transfer proposals — Round 1/2026",
      summary:
        "Call for internal Maejo units to submit proposals with community impact and BCG-relevant themes, using OARE’s published scope.",
      content:
        "OARE invites project proposals (Round 1, FY2026) for academic services, technology transfer, and BCG-style community work, with explicit knowledge-transfer plans, indicators, and budgets.\n\nUse the official forms, parent-unit endorsement, and financial plans, submitted by the deadline in the full call.\n\nOutcomes and timelines follow the review committee and align with the Office’s public seminar and progress-reporting cycle.",
      category: "Programme",
      tags: ["Academic services", "Community", "Funding"],
    },
  },
  {
    title: "อบรมเชิงปฏิบัติการ: จัดทำรายงานความก้าวหน้าโครงการวิจัย ให้สอดคล้องเงื่อนไขทุนและมาตรฐาน ม.แม่โจ้",
    summary:
      "สำหรับหัวหน้าโครงการ/เลขานุการ — รับจำกัดต่อรุ่น; อ้างอิงรูปแบบรายงานตามรอบเสวนา/บูรณาการงบฯ ที่สำนักฯ จัด",
    content:
      "กองบริหารงานวิจัย ร่วมกับเครือข่ายนักวิจัย จัดฝึกอบรมเชิงปฏิบัติการเรื่องการจัดทำรายงานความก้าวหน้าโครงการ ให้สอดคล้องกับประกาศผู้ให้ทุน แนวทาง ม.แม่โจ้ และแบบรวบรวมรายงานฯ ที่สำนักฯ ใช้ติดตามแผนงาน\n\nเอกสารอ้างอิง แบบร่างตาราง ตัวชี้วัด และกรณีตัวอย่างจะเผยแพร่ในวันอบรม/หนังสือเวียนภายในหน่วยงาน\n\nรายละเอียดเวลา สถานที่ และการลงทะเบียน อ้างอิงประกาศฉบับเต็มบน www สำนักฯ และอีเมลหน่วยงาน ตามแนวกิจกรรมเสวนา «ความก้าวหน้า/ปัญหาอุปสรรค» ที่จัดสม่ำเสมอ",
    category: "กิจกรรม",
    tags: ["อบรม", "รายงาน", "โครงการวิจัย"],
    publish_date: "2025-11-28",
    status: "published",
    translation_en: {
      title: "Workshop: research progress reporting aligned with funders and Maejo rules",
      summary:
        "For project leaders and project secretariats. Limited seats; aligned with OARE’s progress seminars.",
      content:
        "OARE’s research administration team runs a practice-based workshop on progress reporting that matches funder conditions, Maejo University standards, and the reporting formats used in OARE’s routine monitoring and budget seminars.\n\nHandouts, table templates, and examples are shared in the session or by memo.\n\nTimes, venue, and registration follow the full notice on the OARE website and email lists, in line with the “progress and obstacles” seminar series published on rae.mju.ac.th.",
      category: "Event",
      tags: ["Training", "Reporting", "Research"],
    },
  },
  {
    title: "แนวทางการจัดเก็บเอกสารประกอบการเบิกจ่ายงบวิจัย (ฉบับร่าง — รับความเห็นภายใน)",
    summary:
      "ฉบับร่างสำหรับหัวหน้าหน่วยงานและงานการเงิน ช่วงมกราคม 2569; ฉบับสมบูรณ์จะประกาศหลังรวมความเห็น",
    content:
      "กองบริหารงานสำนักฯ/งานเงิน ร่างแนวทางจัดตั้งแฟ้มหลักฐานเบิกจ่ายงบวิจัย ให้ตรวจสอบย้อนกลับและสอดคล้องแนวทางผู้ให้ทุน โดยสรุปรายการแนบ การลงนาม และลำดับเอกสาร\n\nฉบับนี้ยังไม่มีผลบังคับ จนกว่าลงนามอนุมัติตามขั้นของมหาวิทยาลัย/สำนักฯ\n\nข้อเสนอส่งตามหนังสือเวียนหน่วย หรือสอบถาม 0 5387 3400",
    category: "ประกาศภายใน",
    tags: ["การเงิน", "เอกสาร", "ฉบับร่าง"],
    publish_date: "2026-01-05",
    status: "draft",
    translation_en: {
      title: "Draft guideline for research disbursement file management (internal comment)",
      summary:
        "Internal draft (January 2026) for unit heads and finance staff; a final version will follow consultation.",
      content:
        "OARE’s administration team drafted guidance on how to structure disbursement files for research grants, including attachments, sign-off, and chronological order, so audits align with funder and university requirements.\n\nThe draft is not final until the approved notice is published.\n\nSend comments as instructed in the internal memo, or call +66 53 873 400 for enquiries.",
      category: "Internal notice",
      tags: ["Finance", "Documents", "Draft"],
    },
  },
];

const SLUG_RE = /^(\d{4}-\d{2}-\d{2})-(\d+)$/;

export function slugForNewsIndex(index: number): string {
  const row = newsRegistry[index];
  if (!row) throw new Error("invalid news index");
  return `${row.publish_date}-${index}`;
}

export function parseNewsSlug(slug: string): number | null {
  const m = slug.match(SLUG_RE);
  if (!m) return null;
  const idx = parseInt(m[2], 10);
  if (!Number.isInteger(idx) || idx < 0 || idx >= newsRegistry.length) return null;
  if (slugForNewsIndex(idx) !== slug) return null;
  return idx;
}

export function publishedNewsIndices(): number[] {
  return newsRegistry
    .map((r, i) => (r.status === "published" ? i : -1))
    .filter((i) => i >= 0);
}

export function publishedSortedByDateDesc(): { index: number; record: NewsRecord }[] {
  return publishedNewsIndices()
    .map((index) => ({ index, record: newsRegistry[index] }))
    .sort((a, b) => (a.record.publish_date < b.record.publish_date ? 1 : -1));
}

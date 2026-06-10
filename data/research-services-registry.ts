import type { ServiceRecord } from "@/data/content-models";
import { ORG_NAME_EN } from "@/lib/org-names";

export const researchServicesRegistry: ServiceRecord[] = [
  {
    name: "สนับสนุนการจัดทำและพัฒนาโครงการวิจัย",
    description:
      "ให้คำแนะนำแนวทางการจัดทำข้อเสนอโครงการ การกำหนดกรอบวิธีวิจัย และการเชื่อมโยงผลลัพธ์กับนโยบายของมหาวิทยาลัยและหน่วยงานต้นสังกัด ให้สอดคล้องกับมาตรฐานงานวิจัยของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    steps: [
      "ยื่นคำขอหรือนัดหมายเพื่อรับคำปรึกษาเบื้องต้น พร้อมสรุปประเด็นโครงการ",
      "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ ประเมินความพร้อมและแจ้งเอกสารหรือข้อมูลที่ต้องเตรียมเพิ่มเติม",
      "ร่วมปรับแต่งข้อเสนอและติดตามความก้าวหน้าตามกรอบเวลาที่ตกลง",
    ],
    contact_point:
      "กองบริหารงานวิจัย สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 3400 (สำนักงาน) / 0 5387 3405 (สายผู้อำนวยการ)",
    translation_en: {
      name: "Support for research project development",
      description: `Guidance on proposal design, methodological framing, and alignment with university and supervisory policies, consistent with research standards of ${ORG_NAME_EN}.`,
      steps: [
        "Submit an initial request or appointment with a short summary of your project idea.",
        `${ORG_NAME_EN} reviews readiness and lists any documents or data you still need.`,
        "We refine the proposal together and track progress against agreed timelines.",
      ],
      contact_point: `Research Administration Division, ${ORG_NAME_EN} · Tel. +66 53 873 400 (main) / +66 53 873 405 (director)`,
    },
  },
  {
    name: "ประสานการขอรับทุนและการรายงานตามเงื่อนไขผู้ให้ทุน",
    description:
      "ประสานงานการยื่นขอรับทุน การจัดท้ายโครงการ การส่งงบประมาณและรายงานความก้าวหน้า ให้เป็นไปตามประกาศหรือข้อตกลงของแหล่งทุน และแนวทางของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    steps: [
      "แจ้งแหล่งทุนและกำหนดเวลาที่ต้องปฏิบัติตาม พร้อมแนบเอกสารที่มีอยู่",
      "ตรวจสอบความครบถ้วนของแบบฟอร์มและหลักฐานประกอบก่อนส่งอย่างเป็นทางการ",
      "ติดตามการอนุมัติและจัดทำรายงานระหว่างทางหรือหลังปิดโครงการตามข้อกำหนด",
    ],
    contact_point:
      "กองบริหารงานวิจัย (งานเงินและรายงาน) สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 3400",
    translation_en: {
      name: "Funding applications and funder reporting",
      description: `Coordination of funding applications, financial reporting, and progress reports in line with funder rules and guidelines of ${ORG_NAME_EN}.`,
      steps: [
        "Share the funding scheme and deadlines, with documents you already hold.",
        "We check forms and supporting evidence before formal submission.",
        "We track approvals and produce interim or final reports as required.",
      ],
      contact_point: `Research fund administration, ${ORG_NAME_EN}.`,
    },
  },
  {
    name: "ส่งเสริมการเผยแพร่และการใช้ประโยชน์จากผลงานวิจัย",
    description:
      "สนับสนุนการนำเสนอผลงาน การจัดทำสรุปเชิงนโยบาย หรือการเชื่อมโยงผลการวิจัยกับภาคีและชุมชนเป้าหมาย ภายใต้กรอบของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    steps: [
      "ระบุรูปแบบการเผยแพร่ที่ต้องการ (เช่น บทความ สรุปผู้บริหาร อบรมถ่ายทอด)",
      "จัดทำหรือปรับข้อความให้เหมาะกับกลุ่มเป้าหมายและช่องทางที่เลือก",
      "ประเมินผลการนำไปใช้และบันทึกข้อเสนอแนะสำหรับโครงการถัดไป",
    ],
    contact_point:
      "กองบริหารงานวิจัย/เครือข่ายเผยแพร่ สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 3400",
    translation_en: {
      name: "Dissemination and uptake of research outputs",
      description: `Support for presenting results, policy-oriented summaries, and linking findings to partners and communities, within frameworks established by ${ORG_NAME_EN}.`,
      steps: [
        "Choose dissemination formats (e.g. article, executive summary, training).",
        "We help tailor messaging for the audience and channel.",
        "We capture uptake feedback and lessons for follow-on work.",
      ],
      contact_point: `Research dissemination and transfer unit, ${ORG_NAME_EN}.`,
    },
  },
];

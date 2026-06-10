import type { ServiceRecord } from "@/data/content-models";
import { ORG_NAME_EN } from "@/lib/org-names";

export const academicServicesRegistry: ServiceRecord[] = [
  {
    name: "บริการให้คำปรึกษาทางวิชาการแก่หน่วยงานภายนอก",
    description:
      "จัดเตรียมการประชุมเชิงปฏิบัติการหรือการให้คำปรึกษาโดยผู้เชี่ยวชาญจากมหาวิทยาลัย ให้สอดคล้องกับขอบเขตงานที่สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ รับผิดชอบประสาน",
    steps: [
      "ส่งหนังสือหรือคำขออย่างเป็นทางการ พร้อมสรุปประเด็นและระยะเวลาที่ต้องการ",
      "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ ประเมินความเหมาะสมและแต่งตั้งผู้รับผิดชอบประสานงานภายใน",
      "ดำเนินการให้คำปรึกษาตามข้อตกลงและจัดทำสรุปผลหรือข้อเสนอแนะตามตกลง",
    ],
    contact_point:
      "กองบริหารงานบริการวิชาการ สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 4293 (ตามประกาศกิจกรรม) หรือ 0 5387 3400 (สำนักงาน)",
    translation_en: {
      name: "Academic advisory services for external organisations",
      description: `Workshops or expert advice delivered by university specialists, coordinated by ${ORG_NAME_EN} within agreed scope.`,
      steps: [
        "Send a formal letter or request with topics and preferred timing.",
        `${ORG_NAME_EN} assesses fit and assigns an internal coordinator.`,
        "Delivery follows the agreed plan, with a summary or recommendations as contracted.",
      ],
      contact_point: `Academic Services Division, ${ORG_NAME_EN} · Tel. +66 53 873 4293 (as in activity notices) or +66 53 873 400 (main office)`,
    },
  },
  {
    name: "การจัดหรือสนับสนุนการอบรม สัมมนา และถ่ายทอดองค์ความรู้",
    description:
      "ออกแบบกิจกรรมถ่ายทอดเทคโนโลยีและองค์ความรู้ทางการเกษตร ให้เหมาะกับกลุ่มเป้าหมาย โดยประสานผ่านสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    steps: [
      "กำหนดวัตถุประสงค์ จำนวนผู้เข้าร่วม สถานที่ และช่วงเวลาโดยสังเขป",
      "จัดทำโครงร่างเนื้อหา วิทยากร และอุปกรณ์ประกอบร่วมกับหน่วยงานที่เกี่ยวข้อง",
      "ดำเนินการจัดกิจกรรมและรวบรวมข้อมูลประเมินผลเพื่อรายงานตามข้อตกลง",
    ],
    contact_point:
      "กองบริหารงานบริการวิชาการ สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 4293 หรือ 0 5387 3400",
    translation_en: {
      name: "Training, seminars, and knowledge transfer events",
      description: `Design of agricultural technology and knowledge transfer activities for target audiences, coordinated through ${ORG_NAME_EN}.`,
      steps: [
        "Define objectives, audience size, venue, and timing in outline.",
        "Draft content, speakers, and logistics with relevant units.",
        "Run the event and collect evaluation data for agreed reporting.",
      ],
      contact_point: `Academic Services Division, ${ORG_NAME_EN} · Tel. +66 53 873 4293 or +66 53 873 400`,
    },
  },
  {
    name: "การประสานความร่วมมือทางวิชาการกับภาคีและชุมชน",
    description:
      "สนับสนุนการเชื่อมโยงความร่วมมือระหว่างคณะ/หน่วยงานภายในมหาวิทยาลัยกับภาครัฐ เอกชน หรือชุมชน ภายใต้กรอบบริการของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
    steps: [
      "นำเสนอความต้องการความร่วมมือและผลประโยชน์ที่คาดหวังอย่างชัดเจน",
      "จับคู่หน่วยงานที่เหมาะสมและจัดทำร่างขอบเขตงานหรือบันทึกความเข้าใจเบื้องต้น",
      "ติดตามการดำเนินงานร่วมและสนับสนุนการรายงานผลหรือการต่ออายุความร่วมมือ",
    ],
    contact_point:
      "กองบริหารงานบริการวิชาการ (ความร่วมมือ) สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 3400",
    translation_en: {
      name: "Academic partnership brokering",
      description: `Linking faculties and internal units with government, private sector, or community partners under service frameworks of ${ORG_NAME_EN}.`,
      steps: [
        "Share partnership goals and expected outcomes clearly.",
        "We match suitable units and draft an initial scope or memorandum outline.",
        "We support joint delivery and reporting or renewal discussions.",
      ],
      contact_point: `Academic Services Division (partnerships), ${ORG_NAME_EN} · Tel. +66 53 873 400`,
    },
  },
  {
    name: "การจัดเตรียมเอกสารและข้อมูลประกอบการให้บริการวิชาการ",
    description:
      "จัดทำหรือรวบรวมเอกสารอ้างอิง แบบฟอร์ม และข้อมูลสนับสนุนการให้บริการ ให้สอดคล้องกับแนวทางของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ และแหล่งข้อมูลที่ได้รับการรับรอง",
    steps: [
      "แจ้งรายการเอกสารหรือชุดข้อมูลที่ต้องการ พร้อมวัตถุประสงค์การใช้งาน",
      "ตรวจสอบแหล่งที่มาและความเป็นปัจจุบันของข้อมูลก่อนเผยแพร่หรือส่งมอบ",
      "ส่งมอบไฟล์หรือลิงก์ตามรูปแบบที่ตกลง และบันทึกเวอร์ชันสำหรับการอ้างอิง",
    ],
    contact_point:
      "กองบริหารงานบริการวิชาการ (เอกสาร) สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ · โทร. 0 5387 3400",
    translation_en: {
      name: "Documentation and information for academic service delivery",
      description: `Preparation or collation of reference materials, forms, and supporting data aligned with guidance from ${ORG_NAME_EN} and authoritative sources.`,
      steps: [
        "List required documents or datasets and how they will be used.",
        "We verify sources and currency before release or handover.",
        "We deliver files or links as agreed and record versions for citation.",
      ],
      contact_point: `Academic Services Division (documentation), ${ORG_NAME_EN} · Tel. +66 53 873 400`,
    },
  },
];

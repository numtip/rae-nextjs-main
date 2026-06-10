import type { Locale } from "@/lib/locale";

export type InnerPage = {
  title: string;
  lead: string;
  bullets?: string[];
};

export const innerPages: Record<Locale, Record<string, InnerPage>> = {
  th: {
    about: {
      title: "เกี่ยวกับเรา",
      lead:
        "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ ดำเนินงานตามปรัชญา วิสัยทัศน์ พันธกิจ และทิศทางยุทธศาสตร์มหาวิทยาลัย โดยมุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม ด้วยการเกษตรเป็นรากฐาน ตามที่เผยแพร่บนเว็บไซต์สำนักฯ ณ รอบปฏิทิน",
      bullets: [
        "ปรัชญา: มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม โดยมีการเกษตรเป็นรากฐาน",
        "วิสัยทัศน์: เป็นศูนย์กลางการพัฒนางานวิจัยและบริการวิชาการ เพื่อผลักดันมหาวิทยาลัยสู่ระดับนานาชาติ",
        "ทำงานร่วมกับคณะ หน่วยงานภายในมหาวิทยาลัย และพันธมิตรด้านนโยบายและทุน",
      ],
    },
    "research-services": {
      title: "บริการวิจัย",
      lead:
        "งานบริการด้านการวิจัยครอบคลุมการให้คำปรึกษาแนวทางการจัดทำโครงการ การสนับสนุนการยื่นขอทุน การติดตามความก้าวหน้า และการจัดทำรายงานหรือข้อมูลประกอบการบริหาร ตามกรอบนโยบายของมหาวิทยาลัยและหน่วยงานต้นสังกัด",
      bullets: [
        "สนับสนุนการจัดทำและพัฒนาโครงการวิจัย",
        "ประสานการขอรับทุนและการส่งงบ/รายงานตามเงื่อนไขผู้ให้ทุน",
        "ส่งเสริมการเผยแพร่และการใช้ประโยชน์จากผลงานวิจัย",
      ],
    },
    "academic-services": {
      title: "บริการวิชาการ",
      lead:
        "บริการวิชาการมุ่งตอบสนองความต้องการของหน่วยงานภายนอกและชุมชน ผ่านการถ่ายทอดองค์ความรู้ การให้คำปรึกษาเชิงวิชาการ และการจัดกิจกรรมที่สอดคล้องกับศักยภาพของมหาวิทยาลัย",
      bullets: [
        "ประสานความร่วมมือทางวิชาการกับภาคีภายนอก",
        "จัดหรือสนับสนุนการอบรม สัมมนา และการให้คำปรึกษา",
        "จัดเตรียมเอกสารและข้อมูลประกอบการให้บริการ",
      ],
    },
    "research-systems": {
      title: "ระบบวิจัย",
      lead:
        "หน้านี้สรุปทางเข้าระบบสารสนเทศด้านงานวิจัยและรายงานตามที่สำนักฯ และมหาวิทยาลัยกำหนด รายการลิงก์รายละเอียดจะปรับให้สอดคล้องประกาศ/คู่มือล่าสุดของสำนักฯ",
      bullets: [
        "เข้าสู่ระบบที่เกี่ยวข้องผ่านบัญชีผู้ใช้ตามสิทธิ์ที่ได้รับ",
        "หากไม่สามารถเข้าใช้งานได้ โปรดติดต่อผู้ดูแลระบบของหน่วยงาน",
      ],
    },
    "news-events": {
      title: "ข่าวและกิจกรรม",
      lead:
        "รวมหัวข้อข่าว ประกาศ และกิจกรรมเชิงปฏิบัติการที่เผยแพร่ผ่านเว็บไซต์นี้ โดยสอดคล้องกับบรรทัดฐานเนื้อหาหลักที่สำนักฯ ใช้บนเว็บไซต์หลัก (rae.mju.ac.th) — รายการนี้เป็นชุด static สำหรับ /rae-landing",
      bullets: [
        "คลิกหัวข้อเพื่ออ่านรายละเอียดเต็มในหน้ารอง",
        "ตรวจสอบหมวดและวันที่เผยแพร่ก่อนนำไปอ้างอิงทางการ",
      ],
    },
    "forms-documents": {
      title: "แบบฟอร์มและเอกสาร",
      lead:
        "ศูนย์รวมแบบฟอร์ม คู่มือปฏิบัติงาน และเอกสารอ้างอิงสำหรับงานของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ ตารางด้านล่างสะท้อนไฟล์ static ที่ฝากไว้บนเว็บ (หากตรวจรับฉบับลงนาม ให้ยึดฉบับที่ www สำนักฯ ประกาศ)",
      bullets: [
        "ใช้เฉพาะไฟล์ที่มีเวอร์ชันและวันที่ปรับปรุงตรงกับตารางด้านล่าง",
        "หากพบไฟล์เก่าในเครื่อง ให้ดาวน์โหลดชุดล่าสุดจากหน้านี้",
      ],
    },
    "green-office": {
      title: "กรีนออฟฟิศ",
      lead:
        "กรีนออฟฟิศเป็นกรอบการดำเนินงานเพื่อลดผลกระทบต่อสิ่งแวดล้อม ส่งเสริมการใช้ทรัพยากรอย่างรับผิดชอบ และสร้างวัฒนธรรมองค์กรที่ยั่งยืน ตามนโยบายมหาวิทยาลัย — รายงานและกิจกรรมที่เกี่ยวข้องเผยแพร่ตามรอบของสำนักฯ บนเว็บไซต์หลัก",
      bullets: [
        "ลดการใช้กระดาษและของเสียจากการปฏิบัติงาน",
        "ประหยัดพลังงานและทรัพยากรสิ้นเปลืองในพื้นที่ทำงาน",
      ],
    },
    search: {
      title: "ค้นหา",
      lead:
        "ค้นหาข่าวที่เผยแพร่ แบบฟอร์ม เอกสาร รายการบริการ และข้อมูลบุคลากรของสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ — ประมวลผลบนเครื่องของคุณ ไม่ส่งข้อมูลออกนอกอุปกรณ์",
    },
    contact: {
      title: "ติดต่อเรา",
      lead:
        "ติดต่อสำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ ตามข้อมูลด้านล่าง (สอดคล้องกับที่เผยแพร่บนเว็บไซต์สำนักฯ) รายละเอียดงานเฉพาะด้านโปรดแจ้งหัวข้อเพื่อให้งานรับผิดชอบประสานกลับ",
      bullets: [
        "ที่ตั้ง: ชั้น 3 อาคารเฉลิมพระเกียรติสมเด็จพระเทพรัตนราชสุดา 63 หมู่ 4 ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290",
        "โทรศัพท์สำนักงาน: 0 5387 3400 · สายตรงผู้อำนวยการ: 0 5387 3405 (ตามรายชื่อผู้อำนวยการสำนัก ม.แม่โจ้)",
        "เวลาทำการ: วันจันทร์–ศุกร์ เว้นวันหยุดนักขัตฤกษ์ ตามประกาศมหาวิทยาลัย",
      ],
    },
  },
  en: {
    about: {
      title: "About",
      lead:
        "The Office of Agricultural Research and Extension, Maejo University, operates in line with the university’s direction and the philosophy and vision published on the OARE site: developing research and academic services to society, with agriculture as a foundation, and serving as a hub that advances Maejo’s international role.",
      bullets: [
        "Philosophy: develop research and academic services to society, with agriculture as a foundation",
        "Vision: be a leading hub for research and academic services, advancing the university internationally",
        "Collaborate with faculties, internal units, and policy and funding partners",
      ],
    },
    "research-services": {
      title: "Research services",
      lead:
        "Research services cover guidance on project design, support for funding applications, progress monitoring, and reporting in line with university and supervisory agency policies.",
      bullets: [
        "Support the development and delivery of research projects",
        "Coordinate submissions and reports required by funders",
        "Encourage dissemination and use of research outputs",
      ],
    },
    "academic-services": {
      title: "Academic services",
      lead:
        "Academic services respond to external organisations and communities through knowledge transfer, expert advice, and activities aligned with university strengths.",
      bullets: [
        "Facilitate academic collaboration with external partners",
        "Support seminars, training, and advisory work",
        "Prepare documentation and information for service delivery",
      ],
    },
    "research-systems": {
      title: "Research systems",
      lead:
        "Entry points to research-related information systems and reporting, as defined by the Office and the university. Specific URLs and guidance are updated when the Office publishes revised notices or handbooks.",
      bullets: [
        "Access systems using the accounts and permissions assigned to you",
        "If you cannot sign in, contact your unit system administrator",
      ],
    },
    "news-events": {
      title: "News & events",
      lead:
        "Headlines, notices, and events on this /rae-landing static site, aligned with themes the Office publishes on rae.mju.ac.th. It is a fixed schedule of items for this gateway, not a live copy of the full news database.",
      bullets: [
        "Open a headline to read the full article",
        "Check category and publish date before formal citation",
      ],
    },
    "forms-documents": {
      title: "Forms & documents",
      lead:
        "Central forms, manuals, and reference documents for The Office of Agricultural Research and Extension, Maejo University. The table below lists static files on this site; when in doubt, follow the version posted on the Office’s official site.",
      bullets: [
        "Use files whose version and date match the registry",
        "If you have older copies, download the latest set from this page",
      ],
    },
    "green-office": {
      title: "Green office",
      lead:
        "The green office framework supports environmentally responsible operations and sustainable resource use in line with university policy. Reports and related activities are published on the main Office site through the board’s regular meeting cycle.",
      bullets: [
        "Reduce paper use and operational waste",
        "Save energy and consumables in the workplace",
      ],
    },
    search: {
      title: "Search",
      lead:
        "Search published news, forms, documents, service listings, and staff contacts from The Office of Agricultural Research and Extension, Maejo University. All matching runs locally in your browser; nothing is sent to a server.",
    },
    contact: {
      title: "Contact",
      lead:
        "Contact The Office of Agricultural Research and Extension, Maejo University, using the information below (consistent with the Office’s public site). For specific service topics, name the subject so the right unit can respond.",
      bullets: [
        "Address: 3rd floor, Chalerm Phra Kiet Somdet Phra Thepparat Ratchasuda Building, 63 Moo 4, Nong Han, Sansai, Chiang Mai 50290",
        "Main office: +66 53 873 400 · Director line: +66 53 873 405 (Maejo “Office Directors” list)",
        "Office hours: Monday–Friday, except public holidays per university notice",
      ],
    },
  },
};
